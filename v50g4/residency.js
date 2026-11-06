// Estimated GPU residency, including shared world/model resources, not just chunks.
export function createResidency(THREE, enabled, getScene, getRenderer, getBudget) {
  const roots = new Set(), tracked = new WeakSet(), cold = new WeakSet();
  const targets = new Set(), seenTargets = new WeakSet();
  const renderer = getRenderer(), setTarget = renderer.setRenderTarget;
  renderer.setRenderTarget = function (target, ...args) {
    if (enabled() && target && !seenTargets.has(target)) {
      seenTargets.add(target); const ref = new WeakRef(target); targets.add(ref);
      target.addEventListener('dispose', () => { targets.delete(ref); seenTargets.delete(target); });
    }
    return setTarget.call(this, target, ...args);
  };
  const st = { bytes: 0, liveBytes: 0, pinnedBytes: 0, budget: 0, evictions: 0, overBudget: 0, stale: 0, textures: 0, geometries: 0 };
  const remember = root => { if (root && !tracked.has(root)) { tracked.add(root); roots.add(new WeakRef(root)); } };
  function scan(evict = true) {
    if (!enabled()) return st;
    const scene = getScene(), renderer = getRenderer(), all = new Map(), live = new Set(), seenArrays = new Set();
    const add = (r, bytes, visible) => { if (!r) return; if (!all.has(r) && bytes) all.set(r, bytes); if (visible) { live.add(r); cold.delete(r); } };
    const texBytes = t => {
      if (t.mipmaps?.length && t.isCompressedTexture) return t.mipmaps.reduce((n, m) => n + (m.data?.byteLength || 0), 0);
      const images = Array.isArray(t.image) ? t.image : [t.image];
      const bytes = images.reduce((n, im) => n + (im?.data?.byteLength || (im?.width || 0) * (im?.height || 0) * (im?.depth || 1) * 4 * (t.type === THREE.FloatType ? 4 : t.type === THREE.HalfFloatType ? 2 : 1)), 0);
      return bytes * (t.generateMipmaps ? 4 / 3 : 1);
    };
    const texture = (t, vis) => { if (t?.isTexture && !t.isRenderTargetTexture) add(t, texBytes(t), vis); };
    const walk = (o, visible) => {
      visible = visible && o.visible;
      if (o.geometry) { let b = 0; for (const a of [...Object.values(o.geometry.attributes), o.geometry.index, ...Object.values(o.geometry.morphAttributes).flat()]) { const arr = a?.array || a?.data?.array; if (arr && !seenArrays.has(arr)) { seenArrays.add(arr); b += arr.byteLength; } } add(o.geometry, b, visible); }
      for (const a of [o.instanceMatrix, o.instanceColor]) if (a) add(a, a.array.byteLength, visible);
      if (o.skeleton?.boneTexture) texture(o.skeleton.boneTexture, visible);
      for (const m of [].concat(o.material || [])) { for (const v of Object.values(m)) texture(v, visible); for (const u of Object.values(m.uniforms || {})) texture(u?.value, visible); }
      for (const ch of o.children) walk(ch, visible);
    };
    walk(scene, true); texture(scene.environment, true); texture(scene.background, true);
    for (const ref of roots) { const root = ref.deref(); if (!root) roots.delete(ref); else if (root !== scene) walk(root, false); }
    st.textures = st.geometries = st.bytes = st.liveBytes = 0;
    for (const [r, b] of all) { if (r.isTexture) st.textures++; if (r.isBufferGeometry) st.geometries++; if (!cold.has(r)) st.bytes += b; if (live.has(r)) st.liveBytes += b; }
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
    if (evict && st.bytes > st.budget) for (const [r, b] of all) {
      if (st.bytes <= st.budget) break;
      if (live.has(r) || cold.has(r) || !(r.isTexture || r.isBufferGeometry)) continue;
      r.dispose(); cold.add(r); st.bytes -= b; st.evictions++;
    }
    st.overBudget = Math.max(0, st.bytes - st.budget);
    return st;
  }
  return { st, remember, scan, pressure: () => enabled() && st.bytes > st.budget && st.budget > 0 };
}
