// Estimated GPU residency, including shared world/model resources, not just chunks.
// Tab v50g4 port of Comma's v50g4-3:
//  * textures are counted once per GPU texture (same image source + same sampler/format params share one
//    upload in three r170), so clones are not double-counted;
//  * evictions go coldest-first (longest not drawn) and skip anything drawn in the last 2 scans (less churn);
//  * when evicting cannot reach the budget, the terrain radius steps down ONE ring at a time (floor = minRadius),
//    with hysteresis, and grows back when there is room — never a collapse to the 3x3 around the player;
//  * the render-target hook is installed on the first enabled scan only (nothing is patched on HIGH/MEDIUM);
//  * the scan charges the shared per-frame budget (./budget.js), reports its own cost, and runs every 3 s instead
//    of every 1 s while the estimate is under 90 % of the budget.
import { frameBudget, budgetLeft, budgetCharge } from './budget.js';
export function createResidency(THREE, enabled, getScene, getRenderer, getBudget) {
  const roots = new Set(), tracked = new WeakSet(), cold = new WeakSet(), lastLive = new WeakMap();
  const targets = new Set(), seenTargets = new WeakSet(), B = frameBudget(2);
  let hooked = false, scanN = 0, over = 0, under = 0, radius = null, lastStep = -99;
  function hook() {
    if (hooked) return; hooked = true;
    const renderer = getRenderer(), setTarget = renderer.setRenderTarget;
    renderer.setRenderTarget = function (target, ...args) {
      if (target && !seenTargets.has(target) && enabled()) {
        seenTargets.add(target); const ref = new WeakRef(target); targets.add(ref);
        target.addEventListener('dispose', () => { targets.delete(ref); seenTargets.delete(target); });
      }
      return setTarget.call(this, target, ...args);
    };
  }
  const st = { bytes: 0, liveBytes: 0, pinnedBytes: 0, texBytes: 0, geoBytes: 0, budget: 0, evictions: 0, overBudget: 0, stale: 0, textures: 0, geometries: 0, radius: null, minRadius: null, radiusSteps: 0, scans: 0, scanMs: 0, maxScanMs: 0, deferred: 0 };
  const remember = root => { if (root && !tracked.has(root)) { tracked.add(root); roots.add(new WeakRef(root)); } };
  const P = ['wrapS', 'wrapT', 'magFilter', 'minFilter', 'anisotropy', 'format', 'type', 'colorSpace', 'flipY', 'premultiplyAlpha', 'unpackAlignment', 'generateMipmaps', 'internalFormat'];
  const gpuKey = t => (t.source ? t.source.uuid : t.uuid) + '|' + P.map(k => t[k]).join(',');
  let last = null;
  function scan(evict = true) {
    if (!enabled()) return st;
    hook();
    const t0 = performance.now(), scene = getScene(), renderer = getRenderer(), all = new Map(), live = new Set(), seenArrays = new Set(), groups = new Map();
    scanN++; st.scans = scanN;
    const add = (r, bytes, visible) => { if (!r) return; if (!all.has(r) && bytes) all.set(r, bytes); if (visible) { live.add(r); cold.delete(r); lastLive.set(r, scanN); } };
    const texBytes = t => {
      if (t.mipmaps?.length && t.isCompressedTexture) return t.mipmaps.reduce((n, m) => n + (m.data?.byteLength || 0), 0);
      const images = Array.isArray(t.image) ? t.image : [t.image];
      const bytes = images.reduce((n, im) => n + (im?.data?.byteLength || (im?.width || 0) * (im?.height || 0) * (im?.depth || 1) * 4 * (t.type === THREE.FloatType ? 4 : t.type === THREE.HalfFloatType ? 2 : 1)), 0);
      return bytes * (t.generateMipmaps ? 4 / 3 : 1);
    };
    const texture = (t, vis) => {
      if (!t?.isTexture || t.isRenderTargetTexture) return;
      const k = gpuKey(t); let g = groups.get(k);
      if (!g) { g = { key: k, bytes: texBytes(t), list: new Set(), name: t.name || t.source?.data?.src?.split('/').pop() || '', w: t.image?.width || 0, h: t.image?.height || 0 }; groups.set(k, g); }
      g.list.add(t); if (vis) { g.live = true; cold.delete(t); lastLive.set(t, scanN); }
    };
    const walk = (o, visible) => {
      visible = visible && o.visible;
      if (o.geometry) { let b = 0; for (const a of [...Object.values(o.geometry.attributes), o.geometry.index, ...Object.values(o.geometry.morphAttributes).flat()]) { const arr = a?.array || a?.data?.array; if (arr && !seenArrays.has(arr)) { seenArrays.add(arr); b += arr.byteLength; } } add(o.geometry, b, visible); }
      for (const a of [o.instanceMatrix, o.instanceColor]) if (a) add(a, a.array.byteLength, visible);
      if (o.skeleton?.boneTexture) texture(o.skeleton.boneTexture, visible);
      for (const m of [].concat(o.material || [])) { if (!m) continue; for (const v of Object.values(m)) texture(v, visible); for (const u of Object.values(m.uniforms || {})) texture(u?.value, visible); }
      for (const ch of o.children) walk(ch, visible);
    };
    walk(scene, true); texture(scene.environment, true); texture(scene.background, true);
    for (const ref of roots) { const root = ref.deref(); if (!root) roots.delete(ref); else if (root !== scene) walk(root, false); }
    st.textures = groups.size; st.geometries = 0; st.texBytes = st.geoBytes = st.bytes = st.liveBytes = 0;
    for (const g of groups.values()) { g.cold = [...g.list].every(t => cold.has(t)); if (!g.cold) st.texBytes += g.bytes; if (g.live) st.liveBytes += g.bytes; g.last = Math.max(0, ...[...g.list].map(t => lastLive.get(t) || 0)); }
    for (const [r, b] of all) { if (r.isBufferGeometry) st.geometries++; if (!cold.has(r)) st.geoBytes += b; if (live.has(r)) st.liveBytes += b; }
    st.bytes = st.texBytes + st.geoBytes;
    // Render-target storage is pinned: estimate drawing-buffer color/depth + post FX
    // separately, so it consumes the same world budget and cannot be evicted as a texture.
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    st.pinnedBytes = size.x * size.y * 8;
    for (const ref of targets) {
      const rt = ref.deref(); if (!rt) { targets.delete(ref); continue; }
      const faces = rt.isWebGLCubeRenderTarget ? 6 : 1, area = rt.width * rt.height * faces;
      for (const t of rt.textures || [rt.texture]) {
        const component = t.type === THREE.FloatType ? 4 : t.type === THREE.HalfFloatType ? 2 : 1;
        st.pinnedBytes += area * 4 * component * (t.generateMipmaps ? 4 / 3 : 1) * (1 + (rt.samples || 0));
      }
      if (rt.depthBuffer) st.pinnedBytes += area * 4 * Math.max(1, rt.samples || 0);
    }
    st.bytes += st.pinnedBytes; st.liveBytes += st.pinnedBytes; st.budget = getBudget();
    if (evict && st.bytes > st.budget) {
      // Coldest first; anything drawn during the last 2 scans stays (re-uploading it next second is a hitch).
      const cand = [];
      for (const g of groups.values()) if (!g.live && !g.cold && scanN - g.last > 2) cand.push([g.last, g.bytes, g]);
      for (const [r, b] of all) if (!live.has(r) && !cold.has(r) && r.isBufferGeometry && scanN - (lastLive.get(r) || 0) > 2) cand.push([lastLive.get(r) || 0, b, r]);
      cand.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
      for (const [, b, x] of cand) {
        if (st.bytes <= st.budget) break;
        if (x.list) { for (const t of x.list) { t.dispose(); cold.add(t); } } else { x.dispose(); cold.add(x); }
        st.bytes -= b; st.evictions++;
      }
    }
    st.overBudget = Math.max(0, st.bytes - st.budget);
    // Terrain radius: one ring at a time, only after 3 over-budget scans in a row, at most one step per 4 s;
    // back up one ring after 5 scans under 85 % of the budget.
    if (st.bytes > st.budget) { over++; under = 0; } else if (st.bytes < 0.85 * st.budget) { under++; over = 0; } else { over = under = 0; }
    if (radius !== null && st.minRadius !== null) {
      if (over >= 3 && radius > st.minRadius && scanN - lastStep >= 4) { radius--; over = 0; lastStep = scanN; st.radiusSteps++; }
      else if (under >= 5 && radius < st.view && scanN - lastStep >= 4) { radius++; under = 0; lastStep = scanN; st.radiusSteps++; }
    }
    st.radius = radius;
    last = groups;
    const ms = performance.now() - t0; st.scanMs = +ms.toFixed(2); st.maxScanMs = Math.max(st.maxScanMs, st.scanMs); budgetCharge(B, ms);
    return st;
  }
  // The terrain radius the chunk loader should use now (= view while nothing is over budget).
  function terrainRadius(view, minR) {
    st.view = view; st.minRadius = Math.min(view, minR);
    if (radius === null || radius > view) radius = view;
    if (radius < st.minRadius) radius = st.minRadius;
    return enabled() ? radius : view;
  }
  // Scan when the shared frame budget still has room this frame; otherwise next frame.
  function maybeScan() { if (budgetLeft(B) <= 0) { st.deferred++; return false; } scan(); return true; }
  function report(n = 12) {
    if (!last) return null; const top = [...last.values()].filter(g => !g.cold).sort((a, b) => b.bytes - a.bytes).slice(0, n).map(g => ({ name: g.name, w: g.w, h: g.h, MiB: +(g.bytes / 1048576).toFixed(2), live: !!g.live, n: g.list.size }));
    return { MiB: +(st.bytes / 1048576).toFixed(1), liveMiB: +(st.liveBytes / 1048576).toFixed(1), texMiB: +(st.texBytes / 1048576).toFixed(1), geoMiB: +(st.geoBytes / 1048576).toFixed(1), pinnedMiB: +(st.pinnedBytes / 1048576).toFixed(1), budgetMiB: +(st.budget / 1048576).toFixed(1), top };
  }
  // Scan every second near/over the budget; every 3 s when comfortably under (the scan is a full scene walk).
  const interval = () => (!st.scans || st.bytes > 0.9 * st.budget) ? 1 : 3;
  return { st, remember, scan, maybeScan, interval, terrainRadius, report, pressure: () => enabled() && st.bytes > st.budget && st.budget > 0 };
}
