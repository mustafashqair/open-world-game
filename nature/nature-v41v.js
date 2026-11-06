/* nature.js — Levantine nature pack scatter for «العالم المفتوح» (three@0.160)
   Self-contained ES module. Assets: nature-plants(.glb|-lite.glb) = bushes + grass only (v34: tree meshes and nature-impostors.glb deleted), nature-rocks(.glb|-lite.glb).
   Usage (see PLACEMENT.md):
     import { createNature } from './nature.js';
     const nature = await createNature({ THREE, scene, loader, baseUrl, tier, heightAt, origin, world, seed });
     // every frame:  nature.update(camera, player.x, player.z, dt)
     // collision:    nature.solidsNear(x, z, ext, outArray)   -> pushes [x, z, r] circles (trunks + big rocks)
   Draw calls: tree-hi 1, tree-lite 1, impostors 1, rock-hi 1, rock-lite 1, grass/flowers ≤4  (= ≤9; low tier ≤5).
*/
const TIERS = {
  low:    { pack: 'lite', hiR: 0,  liteR: 40, farR: 200, rockHiR: 0,  rockR: 110, grassR: 0,  grassStep: 1.9, shadows: false, wild: 0.6 },
  mobile: { pack: 'full', hiR: 18, liteR: 42, farR: 210, rockHiR: 24, rockR: 130, grassR: 20, grassStep: 1.45, shadows: false, wild: 1 },
  high:   { pack: 'full', hiR: 30, liteR: 80, farR: 420, rockHiR: 40, rockR: 220, grassR: 34, grassStep: 1.0, shadows: true, wild: 1 },
};
// tree kinds -> node names in the GLBs; r = crown radius used for spacing; t = trunk collision radius
export const KINDS = {   /* v34: الأشجار القديمة (زيتون/خرّوب/سرو/نخيل/صنوبر قديم/يابسة) حُذفت نهائياً؛ مواضعها تُعطى للصنوبر v4 والقيقب (يرسمهما ملف اللعبة) */
  pine33: { r: 4.4, t: 0.3 }, maple33: { r: 3.1, t: 0.26 }, willow33: { r: 3.6, t: 0.32 },
  bush_myrtle: { r: 1.0, t: 0 }, bush_oleander: { r: 1.3, t: 0 }, bush_broom: { r: 0.9, t: 0 },
};
const SIZES33 = ['small', 'medium', 'large', 'dense'];
const R33 = { pine33: [3.2, 4.4, 5.2, 6.4], maple33: [2.6, 3.1, 3.5, 3.5], willow33: [3.3, 3.7, 5.0, 4.7] };   // نصف قطر التاج لكل حجم (م) للتباعد
export const ROCKS = { rock_small: { r: 0.35, solid: 0 }, rock_medium: { r: 0.75, solid: 0.6 }, boulder: { r: 1.35, solid: 1.1 }, boulder_flat: { r: 2.1, solid: 1.8 }, cliff_chunk: { r: 4.0, solid: 3.3 }, pebbles: { r: 0.8, solid: 0 } };

// ---------- deterministic hash ----------
function hash2(ix, iz, salt, seed) { let n = Math.imul(ix | 0, 73856093) ^ Math.imul(iz | 0, 19349663) ^ Math.imul(salt | 0, 83492791) ^ seed;
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; }
function vnoise(x, z, seed) { const ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz, 7, seed), b = hash2(ix + 1, iz, 7, seed), c = hash2(ix, iz + 1, 7, seed), d = hash2(ix + 1, iz + 1, 7, seed);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz; }

// ---------- shader patches ----------
function makeUniforms(THREE) { return { uTime: { value: 0 }, uWind: { value: 1 }, uEye: { value: new THREE.Vector3() }, uHiR: { value: 25 }, uLiteR: { value: 60 }, uFarR: { value: 300 }, uBand: { value: 5 }, uSun: { value: new THREE.Color(1, 1, 1) } }; }
const DITHER = `float natDither(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }`;
// lod: 0 none, 1 visible d<hiR, 2 visible hiR<=d<liteR, 3 visible liteR<=d<farR (impostor)
function lodVertex(lod) {
  if (!lod) return '';
  const inner = lod === 1 ? '-1.0' : lod === 2 ? 'uHiR' : 'uLiteR', outer = lod === 1 ? 'uHiR' : lod === 2 ? 'uLiteR' : 'uFarR';
  return `float natD = distance(tc.xz, uEye.xz); vNatD = natD;
  if (natD < ${inner} - uBand || natD > ${outer} + uBand) transformed = vec3(0.0);`;
}
function lodFragment(lod) {
  if (!lod) return '';
  const inner = lod === 1 ? '-100.0' : lod === 2 ? 'uHiR' : 'uLiteR', outer = lod === 1 ? 'uHiR' : lod === 2 ? 'uLiteR' : 'uFarR';
  // complementary screen-door cross-fade across each boundary R (band [R-b, R+b]): the outer tier owns pixels with th < f, the inner tier th >= f
  return `{ float th = natDither(gl_FragCoord.xy);
    float fin = clamp((vNatD - (${inner} - uBand)) / (2.0 * uBand), 0.0, 1.0);
    float fo = clamp((vNatD - (${outer} - uBand)) / (2.0 * uBand), 0.0, 1.0);
    ${lod === 3 ? 'fo = 0.0;' : ''}
    if (th >= fin || th < fo) discard; }`;
}
function patchFoliage(mat, THREE, U, lod, opts = {}) {
  mat.vertexColors = true; mat.alphaTest = opts.alphaTest ?? 0.45; mat.side = THREE.DoubleSide; mat.transparent = false; mat.roughness = 0.85; mat.metalness = 0;
  mat.customProgramCacheKey = () => 'natFol' + lod + (opts.grass ? 'g' : '');
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', `#include <common>
uniform float uTime; uniform float uWind; uniform vec3 uEye; uniform float uHiR; uniform float uLiteR; uniform float uFarR; uniform float uBand;
${lod ? 'attribute vec3 tc; varying float vNatD;' : ''}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
#ifdef USE_INSTANCING
  vec4 wp0 = modelMatrix * instanceMatrix * vec4(position, 1.0);
#else
  vec4 wp0 = modelMatrix * vec4(position, 1.0);
#endif
  float sw = color.a * uWind; float ph = wp0.x * 0.13 + wp0.z * 0.17;
  vec3 wd = vec3(sin(uTime * 1.3 + ph) + 0.35 * sin(uTime * 2.9 + ph * 1.7), 0.0, 0.6 * cos(uTime * 1.1 + ph * 0.8));
  float fl = sin(uTime * 6.0 + dot(position, vec3(3.1, 2.3, 4.7))) * 0.25;
  transformed += (wd * ${opts.grass ? '0.10' : '0.07'} + vec3(fl * 0.03, fl * 0.02, fl * 0.03)) * sw;
  ${opts.grass ? `float gd = distance(wp0.xz, uEye.xz); transformed *= smoothstep(uHiR, uHiR * 0.8, gd);` : ''}
  ${lodVertex(lod)}
}`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
uniform float uHiR; uniform float uLiteR; uniform float uFarR; uniform float uBand;
${lod ? 'varying float vNatD;' : ''}
${DITHER}`)
      .replace('#include <color_fragment>', '#if defined( USE_COLOR_ALPHA ) || defined( USE_COLOR )\n diffuseColor.rgb *= vColor.rgb;\n#endif' + (opts.grass ? '\n diffuseColor.rgb *= vec3(1.06, 0.95, 0.66); /* v19: عشب أدفأ */' : ''))
      .replace('normal *= faceDirection;', '/* bent normals: keep */')
      .replace('#include <map_fragment>', `#ifdef USE_MAP
  /* v19: لون أنعم (انحياز mip) وألفا تتسع مع البعد كي لا تتفتت الأوراق إلى نقاط */
  vec4 sampledDiffuseColor = texture2D(map, vMapUv, ${opts.grass ? '0.5' : '1.25'});
  { vec2 tsz = vec2(textureSize(map, 0)); vec2 ddx = dFdx(vMapUv * tsz), ddy = dFdy(vMapUv * tsz);
    float mipL = max(0.0, 0.5 * log2(max(dot(ddx, ddx), dot(ddy, ddy))));
    sampledDiffuseColor.a = texture2D(map, vMapUv).a * (1.0 + mipL * ${opts.grass ? '0.2' : '0.32'}); }
  diffuseColor *= sampledDiffuseColor;
#endif`)
      .replace('#include <alphatest_fragment>', `#ifdef USE_ALPHATEST
 if (diffuseColor.a < alphaTest) discard;
 diffuseColor.a = 1.0;
#endif
${lodFragment(lod)}`)
      .replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\nreflectedLight.indirectDiffuse += diffuseColor.rgb * ' + (opts.grass ? '0.06' : '0.15') + ';');
  };
  mat.needsUpdate = true; return mat;
}
function patchRock(mat, THREE, U, lod) {
  mat.vertexColors = true; mat.roughness = 0.95; mat.metalness = 0;
  mat.customProgramCacheKey = () => 'natRock' + lod;
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', `#include <common>
uniform vec3 uEye; uniform float uHiR; uniform float uLiteR; uniform float uFarR; uniform float uBand;
${lod ? 'attribute vec3 tc; varying float vNatD;' : ''}`).replace('#include <begin_vertex>', `#include <begin_vertex>
${lodVertex(lod)}`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
uniform float uHiR; uniform float uLiteR; uniform float uFarR; uniform float uBand;
${lod ? 'varying float vNatD;' : ''}
${DITHER}`).replace('#include <color_fragment>', `#if defined( USE_COLOR_ALPHA ) || defined( USE_COLOR )
 diffuseColor.rgb *= vColor.rgb;
#endif
${lodFragment(lod)}`);
  };
  mat.needsUpdate = true; return mat;
}

// ---------- geometry merge ----------
function mergeInstances(THREE, items, src, origin) {
  // items: {kind, x, y, z, s, yaw}; src[kind] = BufferGeometry (indexed, position/normal/uv/color)
  let nv = 0, ni = 0;
  for (const it of items) { const g = src[it.kind]; if (!g) continue; nv += g.attributes.position.count; ni += g.index.count; }
  const P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), UV = new Float32Array(nv * 2), C = new Uint8Array(nv * 4), TC = new Float32Array(nv * 3);
  const I = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni); let vo = 0, io = 0;
  for (const it of items) {
    const g = src[it.kind]; if (!g) continue;
    const p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv, c = g.attributes.color, ix = g.index.array, cnt = p.count;
    const cs = Math.cos(it.yaw), sn = Math.sin(it.yaw), s = it.s, ox = it.x - origin.x, oz = it.z - origin.z, oy = it.y;
    const cA = c.array, cNorm = c.normalized, cIs8 = cA instanceof Uint8Array;
    for (let v = 0; v < cnt; v++) {
      const k = (vo + v) * 3, x = p.getX(v), y = p.getY(v), z = p.getZ(v), nx = n.getX(v), nz = n.getZ(v);
      P[k] = ox + (x * cs + z * sn) * s; P[k + 1] = oy + y * s; P[k + 2] = oz + (-x * sn + z * cs) * s;
      N[k] = nx * cs + nz * sn; N[k + 1] = n.getY(v); N[k + 2] = -nx * sn + nz * cs;
      TC[k] = ox; TC[k + 1] = oy; TC[k + 2] = oz;
      UV[(vo + v) * 2] = uv.getX(v); UV[(vo + v) * 2 + 1] = uv.getY(v);
      const q = (vo + v) * 4, tint = it.tint || 1;
      if (cIs8) { C[q] = Math.min(255, cA[v * 4] * tint); C[q + 1] = Math.min(255, cA[v * 4 + 1] * tint); C[q + 2] = Math.min(255, cA[v * 4 + 2] * tint); C[q + 3] = cA[v * 4 + 3]; }
      else { C[q] = Math.min(255, c.getX(v) * 255 * tint); C[q + 1] = Math.min(255, c.getY(v) * 255 * tint); C[q + 2] = Math.min(255, c.getZ(v) * 255 * tint); C[q + 3] = c.getW(v) * 255; }
    }
    for (let t = 0; t < ix.length; t++) I[io + t] = ix[t] + vo;
    vo += cnt; io += ix.length;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setAttribute('normal', new THREE.BufferAttribute(N, 3)); g.setAttribute('uv', new THREE.BufferAttribute(UV, 2));
  g.setAttribute('color', new THREE.BufferAttribute(C, 4, true)); g.setAttribute('tc', new THREE.BufferAttribute(TC, 3)); g.setIndex(new THREE.BufferAttribute(I, 1));
  g.computeBoundingSphere(); return g;
}
function unpackGeometry(THREE, g, mw) {   // meshopt-quantised attributes -> plain float/uint8 arrays (cheap, once); mw = node world matrix (carries the dequantisation scale/offset)
  const out = new THREE.BufferGeometry();
  for (const name of ['position', 'normal', 'uv']) { const a = g.attributes[name]; if (!a) continue; const n = a.count, s = a.itemSize, arr = new Float32Array(n * s);
    for (let i = 0; i < n; i++) { arr[i * s] = a.getX(i); if (s > 1) arr[i * s + 1] = a.getY(i); if (s > 2) arr[i * s + 2] = a.getZ(i); }
    const ba = new THREE.BufferAttribute(arr, s);
    if (mw && name === 'position') ba.applyMatrix4(mw);
    if (mw && name === 'normal') { ba.applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(mw)); for (let i = 0; i < n; i++) { const x = arr[i * 3], y = arr[i * 3 + 1], z = arr[i * 3 + 2], l = Math.hypot(x, y, z) || 1; arr[i * 3] = x / l; arr[i * 3 + 1] = y / l; arr[i * 3 + 2] = z / l; } }
    out.setAttribute(name, ba); }
  const c = g.attributes.color; if (c) { const n = c.count, arr = new Uint8Array(n * 4);
    for (let i = 0; i < n; i++) { arr[i * 4] = c.getX(i) * 255 + .5; arr[i * 4 + 1] = c.getY(i) * 255 + .5; arr[i * 4 + 2] = c.getZ(i) * 255 + .5; arr[i * 4 + 3] = (c.itemSize > 3 ? c.getW(i) : 1) * 255 + .5; }
    out.setAttribute('color', new THREE.BufferAttribute(arr, 4, true)); }
  out.setIndex(new THREE.BufferAttribute(Uint32Array.from(g.index.array), 1)); out.computeBoundingBox(); return out;
}

// ---------- main ----------
export async function createNature(cfg) {
  const { THREE, scene } = cfg;
  const T = Object.assign({}, TIERS[cfg.tier || 'mobile'], cfg.tierOverrides || {});
  const seed = (cfg.seed ?? 20261024) | 0, W = cfg.world || {};
  const heightAt = cfg.heightAt, getOrigin = typeof cfg.origin === 'function' ? cfg.origin : () => (cfg.origin || { x: 0, z: 0 });
  const base = cfg.baseUrl || './', loader = cfg.loader;
  const U = makeUniforms(THREE); U.uHiR.value = T.hiR; U.uLiteR.value = T.liteR; U.uFarR.value = T.farR; U.uBand.value = cfg.band ?? 1;
  // ---- load packs
  const plantsUrl = base + (T.pack === 'lite' ? 'nature-plants-lite.glb' : 'nature-plants.glb');
  const rocksUrl = base + (T.pack === 'lite' ? 'nature-rocks-lite.glb' : 'nature-rocks.glb');
  const [gp, gr] = await Promise.all([loader.loadAsync(plantsUrl), loader.loadAsync(rocksUrl)]);
  const geo = {}, info = {}; let folMatSrc = null, rockMatSrc = null;
  gp.scene.updateMatrixWorld(true); gr.scene.updateMatrixWorld(true);
  gp.scene.traverse(o => { if (o.isMesh) { geo[o.name] = unpackGeometry(THREE, o.geometry, o.matrixWorld); info[o.name] = o.userData || {}; folMatSrc = folMatSrc || o.material; } });
  gr.scene.traverse(o => { if (o.isMesh) { geo[o.name] = unpackGeometry(THREE, o.geometry, o.matrixWorld); info[o.name] = o.userData || {}; rockMatSrc = rockMatSrc || o.material; } });
  const lodName = (k, lod) => geo[k + '_' + lod] ? k + '_' + lod : (geo[k + '_lite'] ? k + '_lite' : k + '_hi');
  const srcHi = {}, srcLite = {}, rockHi = {}, rockLite = {};
  for (const k in KINDS) { srcHi[k] = geo[lodName(k, 'hi')]; srcLite[k] = geo[lodName(k, 'lite')]; }
  for (const k in ROCKS) { rockHi[k] = geo[lodName(k, 'hi')]; rockLite[k] = geo[lodName(k, 'lite')]; }
  const matHi = patchFoliage(folMatSrc.clone(), THREE, U, 1, { alphaTest: 0.3 }), matLite = patchFoliage(folMatSrc.clone(), THREE, U, 2, { alphaTest: 0.3 });   /* v19: أوراق أكثف */
  const rmatHi = patchRock(rockMatSrc.clone(), THREE, U, 1), rmatLite = patchRock(rockMatSrc.clone(), THREE, U, 2);
  const grassMat = patchFoliage(folMatSrc.clone(), THREE, U, 0, { grass: true, alphaTest: 0.5 });
  if (T.hiR <= 0) { U.uHiR.value = -10; }
  const group = new THREE.Group(); group.name = 'nature'; scene.add(group);

  // ---- world helpers
  const roads = W.roads || [], RHW = W.roadHalfWidth ?? 3, RCELL = 96, roadIdx = new Map();
  for (const pl of roads) for (let i = 0; i + 3 < pl.length; i += 2) {
    const s = [pl[i], pl[i + 1], pl[i + 2], pl[i + 3]];
    for (let gx = Math.floor((Math.min(s[0], s[2]) - 30) / RCELL); gx <= Math.floor((Math.max(s[0], s[2]) + 30) / RCELL); gx++)
      for (let gz = Math.floor((Math.min(s[1], s[3]) - 30) / RCELL); gz <= Math.floor((Math.max(s[1], s[3]) + 30) / RCELL); gz++) { const k = gx + ',' + gz; if (!roadIdx.has(k)) roadIdx.set(k, []); roadIdx.get(k).push(s); }
  }
  const roadInfo = (x, z) => { let d = 1e9, dir = null; for (const [ax, az, bx, bz] of roadIdx.get(Math.floor(x / RCELL) + ',' + Math.floor(z / RCELL)) || []) { const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1))); const e = Math.hypot(x - ax - t * dx, z - az - t * dz); if (e < d) { d = e; dir = [dx, dz]; } } return { d, dir }; };
  const roadDist = (x, z) => roadInfo(x, z).d;
  const villages = (W.villages || []).filter(v => !v.city), city = W.city || null, courtyards = W.courtyards || [];
  const blocked = W.blocked || (() => false);
  const region = W.region || (() => 'green');
  const waterDist = W.waterDist || (() => 1e9);
  const mountain = W.mountain || (() => 0);
  const slopeAt = (x, z) => (Math.abs(heightAt(x + 1.5, z) - heightAt(x - 1.5, z)) + Math.abs(heightAt(x, z + 1.5) - heightAt(x, z - 1.5))) / 3;
  const nearVillage = (x, z) => { let best = null, bd = 1e9; for (const v of villages) { const d = Math.hypot(x - v.x, z - v.z); if (d < bd) { bd = d; best = v; } } return best ? { v: best, d: bd } : null; };
  const inCityWall = (x, z) => city && Math.hypot(x - city.x, z - city.z) < (city.wallR || 150) + 4;
  const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
  const nearGate = (x, z) => { // villages + city gates kept clear (cone of 18° and 30 m beyond the wall)
    if (city && city.gates) { const d = Math.hypot(x - city.x, z - city.z), a = Math.atan2(z - city.z, x - city.x); for (const g of city.gates) if (angDiff(a, g) < 0.3 && d < (city.wallR || 150) + 45) return true; }
    const nv = nearVillage(x, z); if (nv && nv.v.gateAngle != null && nv.d < (nv.v.r || 62) + 40 && angDiff(Math.atan2(z - nv.v.z, x - nv.v.x), nv.v.gateAngle) < 0.32) return true;
    return false; };
  const okGround0 = (x, z, r, roadClear) => !(roadDist(x, z) < RHW + (roadClear ?? 2) + r || inCityWall(x, z) || nearGate(x, z) || blocked(x, z, r));
  /* v41: لا أشجار/شجيرات/صخور داخل البحيرات — مستوى الماء (CFG.SEA) يغطي كل أرض أوطى منه، مش بس البحر؛ waterDist كان يعرف الساحل بس.
     الشرط: الأرض تحت الجذع وعلى حلقة (نصف القطر + 0.5 م) حوله كلها أعلى من الماء + 0.2 م. ?treewater=old يرجّع السلوك القديم للمقارنة. */
  const WATER_Y = W.waterY != null ? W.waterY : 0;
  let DRY = !(typeof location !== 'undefined' && /[?&]treewater=old/.test(location.search));
  const dryAt = (x, z, r) => { const lim = WATER_Y + 0.2; if (heightAt(x, z) < lim) return false; const rr = r + 0.5;
    for (let a = 0; a < 6.283; a += 0.785) if (heightAt(x + Math.cos(a) * rr, z + Math.sin(a) * rr) < lim) return false; return true; };
  const okGround = (x, z, r, roadClear) => okGround0(x, z, r, roadClear) && (!DRY || dryAt(x, z, r));

  // ---- scatter rules: per 64 m cell, deterministic
  const CELL = 64, cellCache = new Map();
  function genCell(cx, cz) {
    const key = cx + ',' + cz; let c = cellCache.get(key); if (c) return c;
    const trees = [], rocks = [], x0 = cx * CELL, z0 = cz * CELL;
    const add = (arr, kind, x, z, s, yaw, extra) => { const y = heightAt(x, z) - (arr === rocks ? 0 : 0.05); arr.push(Object.assign({ kind, x, y, z, s, yaw }, extra)); };
    const crown = t => (R33[t.kind] ? R33[t.kind][t.sz] : KINDS[t.kind].r) * t.s;
    const spaced = (x, z, r) => { for (const t of trees) if (Math.hypot(t.x - x, t.z - z) < r + crown(t) * 0.75) return false; return true; };
    const pick33 = (kind, h, big) => { const sz = big ? (h < 0.35 ? 2 : h < 0.7 ? 3 : 1) : (h < 0.4 ? 0 : h < 0.8 ? 1 : h < 0.93 ? 2 : 3); return { sz, size: SIZES33[sz] }; };
    // 1) olive groves around villages — orchard rows aligned with the village, 10 m spacing, patchy sectors
    for (const v of villages) {
      const R0 = (v.r || 62) + 14, R1 = (v.r || 62) + (W.groveDepth || 100);
      if (Math.abs(v.x - (x0 + CELL / 2)) > R1 + CELL || Math.abs(v.z - (z0 + CELL / 2)) > R1 + CELL) continue;
      const ga = (v.gateAngle || 0) + 0.15, cs = Math.cos(ga), sn = Math.sin(ga), SP = W.groveSpacing || 10;
      // lattice coords of cell corners
      let mnu = 1e9, mxu = -1e9, mnw = 1e9, mxw = -1e9;
      for (const [px, pz] of [[x0, z0], [x0 + CELL, z0], [x0, z0 + CELL], [x0 + CELL, z0 + CELL]]) { const dx = px - v.x, dz = pz - v.z, u = dx * cs + dz * sn, w = -dx * sn + dz * cs; mnu = Math.min(mnu, u); mxu = Math.max(mxu, u); mnw = Math.min(mnw, w); mxw = Math.max(mxw, w); }
      for (let iu = Math.floor(mnu / SP); iu <= Math.ceil(mxu / SP); iu++) for (let iw = Math.floor(mnw / SP); iw <= Math.ceil(mxw / SP); iw++) {
        const u = iu * SP + (hash2(iu, iw, 3, seed + v.x) - .5) * 1.6, w = iw * SP + (hash2(iu, iw, 5, seed + v.z) - .5) * 1.6;
        const x = v.x + u * cs - w * sn, z = v.z + u * sn + w * cs;
        if (x < x0 || x >= x0 + CELL || z < z0 || z >= z0 + CELL) continue;
        const d = Math.hypot(x - v.x, z - v.z); if (d < R0 || d > R1) continue;
        const sector = vnoise(Math.atan2(z - v.z, x - v.x) * 2.2 + 11, d / 70, seed + 31);   // patchy groves, open fields between
        if (sector < (W.groveCover != null ? 1 - W.groveCover : 0.42)) continue;
        if (d > R1 - 25 && hash2(iu, iw, 9, seed) < (d - (R1 - 25)) / 25) continue;           // ragged outer edge
        const rg = region(x, z); if (rg !== 'green' && rg !== 'desert') continue;
        if (slopeAt(x, z) > 0.35) continue;
        if (rg !== 'green' || hash2(iu, iw, 23, seed) < 0.45) continue;                       /* v34: بدل بساتين الزيتون والنخيل: مجموعات قيقب متفرقة (أقل كثافة) */
        const kind = 'maple33', P = pick33(kind, hash2(iu, iw, 11, seed)), s = 0.86 + hash2(iu, iw, 17, seed) * 0.26, rr = R33[kind][P.sz] * s;
        const xj = x + (hash2(iu, iw, 25, seed) - .5) * 5, zj = z + (hash2(iu, iw, 27, seed) - .5) * 5;
        if (!okGround(xj, zj, KINDS[kind].t * s + 1.2, rr * 0.85 + 0.5) || !spaced(xj, zj, rr * 0.8)) continue;   /* v19: التاج لا يغطي الطريق */
        add(trees, kind, xj, zj, s, hash2(iu, iw, 19, seed) * 6.283, { grove: 1, sz: P.sz, size: P.size, tint: 0.94 + hash2(iu, iw, 21, seed) * 0.12 });
      }
    }
    // 2) v34: صفوف السرو على الطرق حُذفت (السرو من النماذج القديمة)
    // 3) wild trees / palms near water / bushes / rocks on a jittered grid
    const G = 8;
    for (let i = 0; i < CELL / G; i++) for (let j = 0; j < CELL / G; j++) {
      const ix = cx * (CELL / G) + i, iz = cz * (CELL / G) + j;
      const x = (ix + hash2(ix, iz, 31, seed)) * G, z = (iz + hash2(ix, iz, 33, seed)) * G;
      if (W.bounds && (x < W.bounds.minX || x > W.bounds.maxX || z < W.bounds.minZ || z > W.bounds.maxZ)) continue;
      const rg = region(x, z); if (rg === 'sea' || rg === 'snow') continue;
      const h = hash2(ix, iz, 35, seed), sl = slopeAt(x, z), mt = mountain(x, z), wd = waterDist(x, z), nv = nearVillage(x, z);
      const inVill = nv && nv.d < (nv.v.r || 62) + 6, nearCity = city && Math.hypot(x - city.x, z - city.z) < (city.zoneR || 600);
      if (inVill || inCityWall(x, z)) continue;
      let kind = null;
      const wild = T.wild * (W.wildDensity ?? 1) * (nearCity ? 0.5 : 1);
      /* v34: نفس التوزيع الطبيعي لكن بالنوعين المعتمدين فقط: الصنوبر v4 (السفوح والجبال وقرب الماء) والقيقب (المروج المستوية)؛ لا أشجار في الصحراء والأراضي الحمراء/السوداء */
      if (wd > 5 && wd < 38 && rg === 'green' && sl < 0.22) { const vw = vnoise(x / 34, z / 34, seed + 71); if (vw > 0.5 && h < 0.34 * (vw - 0.35) * 2) kind = 'willow33'; else if (h < 0.06) kind = 'pine33'; }   /* v34: صفصاف v4 مجموعات صغيرة على ضفاف الماء */
      else if (wd >= 38 && wd < 70 && rg === 'green') { if (h < 0.21 * vnoise(x / 40, z / 40, seed + 5) * 1.6) kind = 'pine33'; }
      else if (rg === 'green') {
        if (mt > 8 || sl > 0.22) { if (h < 0.07 * wild) kind = 'pine33'; else if (h < 0.07 * wild + 0.03 * vnoise(x / 30, z / 30, seed + 9) * wild) kind = 'pine33'; }
        else if (sl < 0.12 && mt < 4 && vnoise(x / 45, z / 45, seed + 73) > 0.74) { if (h < 0.09 * wild) kind = 'willow33'; }   /* v34: صفصاف v4 مجموعات متفرقة في منخفضات المروج (البحر بعيد عن معظم الخريطة) */
        else if (h < 0.035 * wild) kind = 'maple33'; else if (h < 0.040 * wild) kind = 'pine33';
      }
      if (kind) { const P = pick33(kind, hash2(ix, iz, 37, seed), kind === 'pine33' && mt > 8), s = 0.86 + hash2(ix, iz, 39, seed) * 0.26, rr = R33[kind][P.sz] * s;
        if (okGround(x, z, KINDS[kind].t * s + 1, rr * 0.85) && spaced(x, z, rr * 0.8)) add(trees, kind, x, z, s, hash2(ix, iz, 41, seed) * 6.283, { sz: P.sz, size: P.size, tint: 0.94 + hash2(ix, iz, 43, seed) * 0.12 }); continue; }
      // bushes (under/near trees, field edges)
      const hb = hash2(ix, iz, 43, seed), bushP = rg === 'green' ? (nv && nv.d < (nv.v.r || 62) + 130 ? 0.32 : 0.16) : rg === 'desert' ? 0.06 : 0.03;
      if (hb < bushP * wild) { const bk = rg === 'desert' ? 'bush_broom' : (hb < bushP * 0.35 ? 'bush_oleander' : hb < bushP * 0.7 ? 'bush_myrtle' : 'bush_broom');
        const bx = x + (hash2(ix, iz, 45, seed) - .5) * 3, bz = z + (hash2(ix, iz, 47, seed) - .5) * 3, s = 0.75 + hash2(ix, iz, 49, seed) * 0.5;
        if (okGround(bx, bz, 0.9, 1) && spaced(bx, bz, 0.6)) add(trees, bk, bx, bz, s, hb * 99); }
      // rocks: slopes / hills / dry land; boulders by the city walls
      const hr = hash2(ix, iz, 51, seed); let rk = null, rs = 1;
      const steep = sl > 0.28 || mt > 8, dry = rg !== 'green';
      if (steep && hr < 0.3) { rk = hr < 0.06 ? 'cliff_chunk' : hr < 0.14 ? 'boulder' : hr < 0.2 ? 'boulder_flat' : 'rock_medium'; rs = 0.9 + hash2(ix, iz, 53, seed) * 0.7; }
      else if (hr < (dry ? 0.09 : 0.035)) { rk = hr < 0.012 ? 'boulder' : hr < 0.03 ? 'rock_medium' : 'rock_small'; rs = 0.7 + hash2(ix, iz, 53, seed) * 0.7; }
      else if (hr < (dry ? 0.22 : 0.09)) { rk = 'pebbles'; rs = 0.8 + hash2(ix, iz, 53, seed) * 0.5; }
      if (city) { const dc = Math.hypot(x - city.x, z - city.z), wr = city.wallR || 150; if (dc > wr + 9 && dc < wr + 40 && hr > 0.86) { rk = hr > 0.95 ? 'boulder' : hr > 0.9 ? 'rock_medium' : 'rock_small'; rs = 0.8 + (hr - 0.86) * 3; } }
      if (rk) { const rx = x + (hash2(ix, iz, 55, seed) - .5) * 4, rz = z + (hash2(ix, iz, 57, seed) - .5) * 4, rr = ROCKS[rk].r * rs;
        if (okGround(rx, rz, rr, 1) && spaced(rx, rz, rr * 0.8)) { rocks.push({ kind: rk, x: rx, z: rz, y: lowestUnder(rx, rz, rr) , s: rs, yaw: hash2(ix, iz, 59, seed) * 6.283 });
          if (ROCKS[rk].r > 1) for (let k = 0; k < 3; k++) { const a = hash2(ix, iz, 61 + k, seed) * 6.283, dd = rr + 0.6 + hash2(ix, iz, 71 + k, seed) * 1.5, sx = rx + Math.cos(a) * dd, sz = rz + Math.sin(a) * dd;   // outcrop: small stones at the foot
            const kk = k === 2 ? 'pebbles' : 'rock_small', ss = 0.8 + hash2(ix, iz, 81 + k, seed) * 0.9; if (okGround(sx, sz, 0.4, 1)) rocks.push({ kind: kk, x: sx, z: sz, y: lowestUnder(sx, sz, ROCKS[kk].r * ss), s: ss, yaw: a * 3 }); } } }
    }
    // 4) city courtyards: one tree + a few bushes + flowers (inside the walls ONLY here)
    for (let ci = 0; ci < courtyards.length; ci++) { const q = courtyards[ci]; if (q.x < x0 || q.x >= x0 + CELL || q.z < z0 || q.z >= z0 + CELL) continue;
      /* v34: لا شجرة في أفنية المدينة (كانت من النماذج القديمة)؛ الشجيرات والزهور باقية */
      const nb = Math.max(2, Math.min(4, Math.round((q.r || 4) * 0.8)));
      for (let k = 0; k < nb; k++) { const a = k / nb * 6.283 + ci, rr = (q.r || 4) * 0.62; add(trees, k % 2 ? 'bush_oleander' : 'bush_myrtle', q.x + Math.cos(a) * rr, q.z + Math.sin(a) * rr, 0.7, a, { court: 1 }); } }
    const t33 = trees.filter(t => R33[t.kind]); c = { trees: trees.filter(t => !R33[t.kind]), t33, rocks }; cellCache.set(key, c); if (cellCache.size > 900) cellCache.delete(cellCache.keys().next().value); return c;
  }
  function lowestUnder(x, z, r) { let m = heightAt(x, z); for (let a = 0; a < 6.28; a += 1.05) m = Math.min(m, heightAt(x + Math.cos(a) * r * 0.8, z + Math.sin(a) * r * 0.8)); return m; }  // rocks sit on the lowest point under them: never float on slopes
  function gather(x, z, R, out, which) {
    const c0x = Math.floor((x - R) / CELL), c1x = Math.floor((x + R) / CELL), c0z = Math.floor((z - R) / CELL), c1z = Math.floor((z + R) / CELL);
    for (let i = c0x; i <= c1x; i++) for (let j = c0z; j <= c1z; j++) { const c = genCell(i, j); for (const t of c[which]) { const d = Math.hypot(t.x - x, t.z - z); if (d <= R) out.push(t); } }
    return out;
  }
  // ---- grass (instanced, fixed world grid so it never swims)
  const grassKinds = ['grass_green', 'grass_dry', 'flower_poppy', 'flower_daisy'];
  const gmesh = {}, GMAX = cfg.grassMax || (T.grassR > 30 ? 4200 : 2600);
  if (T.grassR > 0) for (const k of grassKinds) { if (!geo[k]) continue; const im = new THREE.InstancedMesh(geo[k], grassMat, GMAX); im.count = 0; im.frustumCulled = false; im.castShadow = false; im.receiveShadow = true; im.name = 'nature_' + k; group.add(im); gmesh[k] = im; }
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0);
  function rebuildGrass(px, pz, org) {
    const R = T.grassR, st = T.grassStep, cnt = {}; for (const k in gmesh) cnt[k] = 0;
    const i0 = Math.floor((px - R) / st), i1 = Math.floor((px + R) / st), j0 = Math.floor((pz - R) / st), j1 = Math.floor((pz + R) / st);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const x = (i + hash2(i, j, 61, seed)) * st, z = (j + hash2(i, j, 63, seed)) * st, d = Math.hypot(x - px, z - pz); if (d > R) continue;
      const h = hash2(i, j, 65, seed), rg = region(x, z);
      if (rg === 'sea' || rg === 'snow') continue;
      let dens = rg === 'green' ? 0.85 : rg === 'desert' ? 0.12 : 0.2;
      const nv = nearVillage(x, z), field = nv && nv.d > (nv.v.r || 62) + 8 && nv.d < (nv.v.r || 62) + 140;
      if (field) dens = Math.min(0.9, dens + 0.25);
      const cty = city && Math.hypot(x - city.x, z - city.z) < (city.wallR || 150) + 4;
      let court = null; if (cty) { for (const q of courtyards) if (Math.hypot(x - q.x, z - q.z) < (q.r || 4)) { court = q; break; } if (!court) continue; dens = 0.8; }
      if (nv && nv.d < (nv.v.r || 62) + 2) dens *= 0.25;                                   // inside village walls: sparse
      dens *= 0.75 + 0.5 * vnoise(x / 9, z / 9, seed + 77);                                   // clumps and bare patches
      if (h > dens) continue;
      if (roadDist(x, z) < RHW + 0.4) continue;
      if (W.grassBlocked && W.grassBlocked(x, z)) continue;
      const f = hash2(i, j, 67, seed);
      const k = (rg === 'desert' || rg === 'red' || rg === 'black') ? 'grass_dry' : (f < (court ? 0.14 : field ? 0.045 : 0.015) ? 'flower_poppy' : f < (court ? 0.26 : field ? 0.085 : 0.03) ? 'flower_daisy' : f < 0.88 ? 'grass_green' : 'grass_dry');
      const im = gmesh[k]; if (!im || cnt[k] >= GMAX) continue;
      const s = (k[0] === 'f' ? 0.75 : 0.75) + hash2(i, j, 69, seed) * (k[0] === 'f' ? 0.35 : 0.5);
      _q.setFromAxisAngle(_up, h * 40); _p.set(x - org.x, heightAt(x, z) - 0.03, z - org.z); _s.set(s, s * (0.85 + f * 0.3), s);
      im.setMatrixAt(cnt[k]++, _m.compose(_p, _q, _s));
    }
    for (const k in gmesh) { gmesh[k].count = cnt[k]; gmesh[k].instanceMatrix.needsUpdate = true; }
  }
  // ---- impostors
  /* v34: impostors of the old trees removed (nature-impostors.glb deleted) */
  // ---- merged tiers
  const tiers = {
    treeHi: { mesh: null, mat: matHi, src: srcHi, which: 'trees', R: () => T.hiR, step: 4, cast: T.shadows },
    treeLite: { mesh: null, mat: matLite, src: srcLite, which: 'trees', R: () => T.liteR, step: 12, minR: () => T.hiR, cast: false },
    rockHi: { mesh: null, mat: rmatHi, src: rockHi, which: 'rocks', R: () => T.rockHiR, step: 5, cast: T.shadows },
    rockLite: { mesh: null, mat: rmatLite, src: rockLite, which: 'rocks', R: () => T.rockR, step: 16, minR: () => T.rockHiR, cast: false },
  };
  const last = {}; let lastOrg = { x: NaN, z: NaN };
  function rebuildTier(name, px, pz, org) {
    const tr = tiers[name], R = tr.R(); if (tr.mesh) { group.remove(tr.mesh); tr.mesh.geometry.dispose(); tr.mesh = null; }
    if (R <= 0) return;
    const minR = tr.minR ? Math.max(0, tr.minR() - tr.step - (cfg.band ?? 1) - 1) : -1;
    const items = gather(px, pz, R + tr.step + (cfg.band ?? 1) + 1, [], tr.which).filter(t => Math.hypot(t.x - px, t.z - pz) >= minR);
    if (!items.length) return;
    const g = mergeInstances(THREE, items, tr.src, org); const m = new THREE.Mesh(g, tr.mat); m.castShadow = tr.cast; m.receiveShadow = true; m.frustumCulled = false; m.name = 'nature_' + name;
    group.add(m); tr.mesh = m; tr.count = items.length;
  }
  // rock tiers need the same tier fallback (rocks have r.lods hi/lite) — U.uHiR/uLiteR are tree radii; rocks get their own uniforms:
  const UR = Object.assign({}, U, { uHiR: { value: T.rockHiR }, uLiteR: { value: T.rockR } });
  for (const m of [rmatHi, rmatLite]) { const ob = m.onBeforeCompile; m.onBeforeCompile = (sh) => { ob(sh); Object.assign(sh.uniforms, UR); }; m.customProgramCacheKey = ((k) => () => k + 'R')(m.customProgramCacheKey()); }
  if (T.rockHiR <= 0) UR.uHiR.value = -10;
  // ---- solids (trunks + big rocks) for the game's collision
  function solidsNear(x, z, ext, out) {
    const c0x = Math.floor((x - ext - 6) / CELL), c1x = Math.floor((x + ext + 6) / CELL), c0z = Math.floor((z - ext - 6) / CELL), c1z = Math.floor((z + ext + 6) / CELL);
    for (let i = c0x; i <= c1x; i++) for (let j = c0z; j <= c1z; j++) { const c = genCell(i, j);
      for (const t of c.trees.concat(c.t33)) { const r = KINDS[t.kind].t * t.s; if (r > 0 && Math.abs(x - t.x) < ext + r && Math.abs(z - t.z) < ext + r) out.push(t.sol || (t.sol = [t.x, t.z, r])); }
      for (const t of c.rocks) { const r = ROCKS[t.kind].solid * t.s; if (r > 0 && Math.abs(x - t.x) < ext + r && Math.abs(z - t.z) < ext + r) out.push(t.sol || (t.sol = [t.x, t.z, r])); } }
    return out;
  }
  let clock = 0;
  function update(camera, px, pz, dt = 0.016) {
    clock += dt; U.uTime.value = clock; UR.uTime = U.uTime;
    const org = getOrigin(); group.position.set(0, 0, 0);
    camera.getWorldPosition(U.uEye.value); // scene coords
    UR.uEye.value = U.uEye.value;
    const orgMoved = org.x !== lastOrg.x || org.z !== lastOrg.z;
    for (const name in tiers) { const tr = tiers[name], L = last[name];
      if (orgMoved || !L || Math.hypot(px - L[0], pz - L[1]) > tr.step) { rebuildTier(name, px, pz, org); last[name] = [px, pz]; } }
    if (T.grassR > 0 && (orgMoved || !last.grass || Math.hypot(px - last.grass[0], pz - last.grass[1]) > 2.5)) { rebuildGrass(px, pz, org); last.grass = [px, pz]; }
    lastOrg = { x: org.x, z: org.z };
    // grass fade radius uses uHiR in the grass material: give it its own value
  }
  // grass uses its own radius uniform
  const UG = Object.assign({}, U, { uHiR: { value: T.grassR } });
  { const ob = grassMat.onBeforeCompile; grassMat.onBeforeCompile = (sh) => { ob(sh); Object.assign(sh.uniforms, UG); }; }
  function setSunTint(c) { U.uSun.value.copy(c); }
  function stats() { let calls = 0, tris = 0; group.traverse(o => { if (!o.isMesh || !o.visible) return; const n = o.isInstancedMesh ? o.count : 1; if (!n) return; calls++; tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3 * n; });
    return { calls, tris: Math.round(tris), treesHi: tiers.treeHi.count || 0, treesLite: tiers.treeLite.count || 0, rocks: (tiers.rockLite.count || 0) + (tiers.rockHi.count || 0), impostors: 0 }; }
  function dispose() { scene.remove(group); group.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
  return { group, update, solidsNear, stats, dispose, setSunTint, refreshGrass() { last.grass = null; },   // v41b: إعادة بناء العشب (بعد بناء قرية: لا عشب داخل البيوت)
     uniforms: U, tier: T, cells: genCell, gather, waterCheck: { get on() { return DRY; }, set(v) { DRY = !!v; cellCache.clear(); }, dryAt, waterY: WATER_Y } };
}
