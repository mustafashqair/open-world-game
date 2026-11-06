// hunt.js v6 (v6 = soft lips/cheeks + jaw secondary on the bite, toes curling into the prey, delayed deer body recoil on the shake, liquid blood pools with thickness and gloss; v5 = v5 = deep bite + shoulder/neck-driven tear, paw pressing into the bird, glossy bird soak, closed tail hole, splash pool) — wolf hunt behaviour + prey reactions for «العالم المفتوح» (plain JS, three.js r15x+).
// v2: no interpenetration (sphere proxies fitted to both skinned meshes, resolved every frame), teeth and claws ON the prey
// (head CCD-IK onto a skin vertex of the prey, two-bone leg IK with paws tilted to the surface, attached to the prey's
// skinned vertices so they move with it), foot planting (no paw slide), stretched leap pose, mauling (tug / shake /
// re-bite, prey jerks), blood (spurt + drips + wound stain that is part of the prey skin + ground pool), feather puffs.
// One WolfHunt drives ONE wolf against ONE prey until the prey is eaten or has escaped.
// The game keeps owning the objects; while a hunt runs, switch the game's own AI off for both animals
// (hunt.js moves them and plays their clips through the mixer you pass in).
//
//   import { WolfHunt } from './animals/hunt.js';
//   const hunt = new WolfHunt(THREE, {
//     wolf: { object: wolfObj, clips: wolfGltf.animations, mixer: wolfMixer },   // mixer optional (created if absent)
//     prey: { object: deerObj, clips: deerGltf.animations, mixer: deerMixer, kind: 'deer' }, // kind: 'deer' | 'rooster'
//     params: { escapeChance: 0.3, killTime: 6 },                                  // any HUNT_DEFAULTS key
//     groundY: (x, z) => terrain.heightAt(x, z),                                   // optional, default 0
//     avoid: (x, z) => null,                                                       // optional: return {x,z} push away from rocks/water/walls
//     onEvent: (name, info) => {}                                                  // 'notice','chase','leap','grab','knockdown','struggle','escape','kill','eat','giveup','bite' (info.spot)
//   });
//   // every frame, BEFORE rendering (do not also call wolfMixer.update / deerMixer.update yourself):
//   hunt.update(dt);
//   hunt.state  -> { wolf: 'stalk'|'chase'|'leap'|'pin'|'shaken'|'release'|'eat'|'giveup'|'idle', prey: 'unaware'|'flee'|'knocked'|'struggle'|'getup'|'dead' }
//   hunt.dispose() -> removes the blood/feather meshes (call when the carcass is removed)
//   hunt.done   -> true once the prey is dead (wolf keeps eating) or the wolf has given up; hunt.outcome = 'killed' | 'escaped'
//
// Objects: origin at the feet, facing +Z (all Tab animal GLBs). Object scale is respected (offsets are measured on the rig at start).

export const HUNT_DEFAULTS = {
  stalkSpeed: 1.3,        // m/s, wolf Walk while sneaking up
  noticeDist: 14,         // m, prey notices the wolf and bolts (or at once if the wolf is already running)
  chaseSpeed: 8.0,        // m/s, wolf Run (clip authored at 8.0)
  chaseAccel: 6.0,        // m/s²
  wolfTurnRate: 4.0,      // rad/s while running
  leapRange: 3.2,         // m, start AttackLeap when the wolf is this close to the prey (and the landing spot is reachable)
  leapMaxSpeed: 11.5,     // m/s, max horizontal speed the leap may need to land on the prey
  leapStartAt: 0.38,      // s into AttackLeapInPlace (skips the standing crouch: the leap is launched from the gallop)
  leapLandAt: 1.16,       // s, front paws touch down = the grab
  knockSlide: 0.3,        // s, prey (with the wolf hanging on) skids to a stop after the grab
  struggleCycle: 1.5,     // s, one Struggle loop = one escape attempt
  escapeChance: 0.3,      // chance per struggle cycle; multiplied by the prey's remaining strength (1 - held/killTime)
  killTime: 6.0,          // s of holding until the prey dies
  forceOutcome: null,     // null = random; 'escape' or 'kill' (demo/testing)
  escapeBoost: 1.3,       // prey speed multiplier for boostTime after breaking free
  boostTime: 6.0,
  tiredFactor: 0.75,      // wolf chase speed multiplier after a failed grab
  giveUpDist: 18,         // m, wolf gives up the chase beyond this gap (after an escape) …
  giveUpTime: 12,         // … or after chasing this long in total
  howlOnGiveUp: true,
  pinShake: 1.0,          // timeScale of the wolf's base holding clip (Eat) under the IK
  releaseTime: 1.2,       // s wolf lifts its head after the kill before eating
  preyTurnRate: 2.6,      // rad/s
  wander: 0.6,            // 0..1 how much the fleeing prey zig-zags
  arena: null,            // optional {x, z, r}: prey steers back inside this circle (keeps a demo/area tidy)
  rng: Math.random,
  // ---- v2 ----
  contact: true,          // IK/contact/collision layer (teeth + claws on the prey, no interpenetration). false = v1 behaviour
  collisionMargin: 0.012, // m, extra clearance between the wolf's and the prey's collision spheres
  maul: true,             // tug / shake / re-bite while holding and eating
  maulStrength: 1.0,      // 0..1.5 scales tug distance, head shake and prey jerks
  blood: true,            // blood spurt + drips (instanced particles)
  bloodDecals: true,      // wound stain on the prey skin + pool on the ground
  maxBloodParticles: 48,  // cap for blood droplets alive at once (one InstancedMesh)
  maxWounds: 4,           // cap for wound stains per hunt (+2 small muzzle stains on the wolf)
  feathers: true,         // feather puffs when the prey is a bird
  maxFeathers: 32,        // cap for feathers alive at once (one InstancedMesh)
  fxParent: null,         // Object3D for the blood/feather meshes (default: the wolf's parent)
  // ---- v3 ----
  biteSink: 0.006,        // m, the teeth sink this far into the skin while the jaw holds (gums stay outside)
  leanTol: 0.02,          // m, extra overlap allowed between the wolf's neck/upper-forearm proxies and the prey proxies (leaning on it)
  headProxyTol: 0.03,     // m, overlap allowed between the wolf's skull/chin/ear proxies and the prey proxies before the head eases off
  hopMax: 0.45,           // m, while the prey goes down the wolf may carry its body over it (it lands on the wrong side and swings over the back)
  rideMax: 0.1,           // m, the most the wolf body is lifted over the prey's folding legs
  headAlign: 0.3,         // 0..1 how hard the snout is turned into the skin (the neck does the rest of the reach)
  neckLimits: null,       // [[swing, twist] rad] for neck1, neck2, head from the clip pose; null = [[0.7,0.14],[0.7,0.14],[0.5,0.16]]
  // ---- v4 ----
  bloodStyle: 'soak',     // 'soak' = blood dyes the prey's own fur / feathers (material clone per hunt, runs + spatter); 'decal' = v3 wound sheets
  dents: true,            // soft skin dents under the teeth and the front paws while holding (vertex shader + CPU mirror, no extra meshes)
  dentScale: 1.0,         // scales every dent depth
  tailFlex: true,         // bird prey: tail feathers bend under pressure, spring back and flutter in the struggle
  groundClear: true,      // bird prey: the pinned / dead bird never goes below the ground (root lifted, measured on its skin)
  // ---- v5 ----
  deepBite: true,         // canines go into the neck (per-prey biteSink / jawHold / deeper dent with a skin bulge around the muzzle)
  bodyDrive: true,        // tug / shake are driven from the shoulders and neck (spine pitch + counter-roll with lag, body leans back), not the head alone
  pawPress: true,         // bird prey: the wolf crouches so the pinning paw reaches the body and the pads press into the feathers (no air gap)
  capHoles: true,         // bird prey: open holes in the bird mesh (e.g. under the tail) are closed at runtime with a skinned feather dome
  poolStyle: 'liquid',    // v6 'liquid' = the v5 splash shape built as a thin domed liquid film (real height + rounded meniscus edge, clear-coat gloss and sky reflection) with domed bead drops; 'splash' = v5 flat pool; 'disc' = v4 pool
  // ---- v6 ----
  lipFlex: true,          // wolf: runtime morph targets on the wolf body (upper-lip snarl/retract, nose wrinkle, cheek bulge L/R) + a small jaw spring, driven by the bite / tug / shake (no GLB change)
  toeGrip: true,          // wolf: runtime toe-curl morph on each front paw; a paw holding the prey curls its toes and claw tips down into the fur / feathers
  preyRecoil: true,       // prey (deer profile): a delayed, very light spring recoil through the spine, shoulders and legs that follows the wolf's shake and tug
  poolEnv: true,          // liquid pools reflect a small built-in sky (set false, or pass params.envMap, when the game scene has its own environment map)
  envMap: null,           // optional texture the liquid blood reflects instead of the built-in sky
};

const PREY_PROFILES = {
  deer: { flee: 'Flee', fleeClipSpeed: 9.0, fleeSpeed: 7.0, idle: ['Graze', 'Idle'], knock: 'KnockedDown', struggle: 'Struggle', getup: 'GetUpEscape', getupMoveFrom: 0.75, death: 'Death',
          grab: 'throat', pinYawDeg: -60, mouthGap: 0.004, reachK: 0.95,
          impactLocal: [0.78, 0.05], impactYawDeg: -25,                       // the leap lands at the deer's LEFT shoulder (it falls onto its left side, back toward the wolf)
          // contact spots, picked on the prey skin by a ray from a bone along a prey-local direction (pose at the moment of picking)
          biteGrab: { n: 'withers', bone: 'neck1', t: 0.1, dir: [0.75, 0.65, 0.1], yaw: -60 },
          pawGrab: [{ n: 'shoulderL', bone: 'spine2', t: 0.0, dir: [1, 0.15, 0.25] }, { n: 'shoulderL2', bone: 'spine1', t: 0.6, dir: [1, 0.15, 0] }],
          spots: [ { n: 'withers', bone: 'neck1', t: 0.1, dir: [0.75, 0.65, 0.1], yaw: -60 },
                   { n: 'shoulder', bone: 'spine2', t: 0.4, dir: [0.75, 0.65, 0], yaw: -60 },
                   { n: 'flank', bone: 'spine1', t: 0.5, dir: [0.8, 0.6, 0], yaw: -60 } ],
          woundR: 0.15, poolR: 0.45, bloodScale: 1.0,
          dentBite: 0.02, dentBiteR: 0.07, dentPaw: 0.016, dentPawR: 0.065, holdBend: 0.07,
          v5: { biteSink: 0.017, jawHold: 0.17, dentBite: 0.034, dentBiteR: 0.085, bulge: 0.34, gapeR: 0.075, tugBack: 0.11 },
          recoil: { side: 0.045, tug: 0.05, leg: 1.8 } },
  rooster: { flee: '@roosterFlee', fleeClipSpeed: 0.5, fleeSpeed: 3.2, idle: ['Peck', 'Idle'], knock: '@roosterDown', struggle: '@roosterDown', getup: null, death: '@roosterDead',
             grab: 'body', pinYawDeg: 75, mouthGap: 0.003, reachK: 1.0, mesh: /^rooster(_\d+)?$/,
             biteGrab: { n: 'neck', bone: 'neck1', t: 0.4, dir: [0, 1, 0.2], mesh: /^rooster(?!_wings)/ },
             spots: [ { n: 'neck', bone: 'neck1', t: 0.4, dir: [-0.6, 0.8, 0], mesh: /^rooster(?!_wings)/ },
                      { n: 'back', bone: 'chest', t: 0.0, dir: [-0.6, 0.8, 0], mesh: /^rooster(?!_wings)/ },
                      { n: 'breast', bone: 'pelvis', t: 0.5, dir: [-0.3, 1, 0], mesh: /^rooster(?!_wings)/ } ],
             onePaw: true, woundR: 0.075, poolR: 0.22, bloodScale: 0.7,
             dentBite: 0.008, dentBiteR: 0.03, dentPaw: 0.02, dentPawR: 0.07, dentMax: 0.026, holdBend: 0.0, pawMinUp: 0.6, pawLiftMax: 0.006, surfR2: 0.0004, groundClear: true, tail: ['tail1', 'tail2'],
             v5: { biteSink: 0.008, jawHold: 0.24, pawSink: 0.0, pawLiftMax: 0.0, crouchMax: 0.1, woundR: 0.1, soak: [0.8, 0.1, 1.7, 1.0], poolR: 0.26, tugBack: 0.08 } },
};

const WING_RE = /wing|_p\d+$|_s\d+$/i;
const _ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// =====================================================================================================
// v2: contact rig — no interpenetration, teeth/claws ON the prey surface, IK, foot planting, maul, blood
// =====================================================================================================
const _q = [], _v = [];
function _tv(T) { return new T.Vector3(); }
function _skinMeshes(o) { const out = []; o.traverse(m => { if (m.isSkinnedMesh) out.push(m); }); return out; }
function _dominant(mesh) {
  const si = mesh.geometry.attributes.skinIndex, sw = mesh.geometry.attributes.skinWeight, n = si.count;
  const dom = new Int16Array(n);
  for (let i = 0; i < n; i++) { let bi = -1, bw = -1; for (let k = 0; k < 4; k++) { const w = sw.getComponent(i, k); if (w > bw) { bw = w; bi = si.getComponent(i, k); } } dom[i] = bi; }
  return dom;
}
// rotate a bone by a WORLD-space rotation q (keeps its world position), then refresh its subtree
function _rotWorld(T, bone, q, tmpA, tmpB) {
  bone.parent.getWorldQuaternion(tmpA); bone.getWorldQuaternion(tmpB);
  tmpB.premultiply(q); tmpA.invert(); bone.quaternion.copy(tmpA.multiply(tmpB));
  bone.updateMatrixWorld(true);
}
function _setWorldQuat(T, bone, qw, tmpA) {
  bone.parent.getWorldQuaternion(tmpA); tmpA.invert(); bone.quaternion.copy(tmpA.multiply(qw)); bone.updateMatrixWorld(true);
}

// collision proxies: small spheres in bone-local space, k-means clusters of the skinned mesh's bind pose (per bone)
function _buildSpheres(T, obj, opts = {}) {
  const pct = opts.pct ?? 0.98, size = opts.size || 0.09, out = [], meshes = _skinMeshes(obj).filter(m => !opts.skipMesh || !opts.skipMesh.test(m.name));
  obj.updateMatrixWorld(true);
  for (const mesh of meshes) {
    const bones = mesh.skeleton.bones, inv = mesh.skeleton.boneInverses, dom = _dominant(mesh), pos = mesh.geometry.attributes.position;
    const groups = new Map(); const v = new T.Vector3(), M = new T.Matrix4();
    for (let i = 0; i < pos.count; i++) { const b = dom[i]; if (!groups.has(b)) groups.set(b, []); groups.get(b).push(i); }
    for (const [bi, idx] of groups) {
      const bone = bones[bi]; if (opts.skipBone && opts.skipBone.test(bone.name)) continue;
      if (idx.length < 6) continue;
      M.multiplyMatrices(inv[bi], mesh.bindMatrix);
      const step = Math.max(1, Math.floor(idx.length / 1500));
      const P = []; for (let j = 0; j < idx.length; j += step) P.push(v.fromBufferAttribute(pos, idx[j]).applyMatrix4(M).clone());
      const bb = new T.Box3().setFromPoints(P), diag = bb.getSize(new T.Vector3()).length();
      const k = Math.max(1, Math.min(opts.maxK || 12, Math.ceil(diag / size)));
      // farthest-point init + a few k-means rounds
      const C = [P[0].clone()]; const dmin = P.map(p => p.distanceToSquared(C[0]));
      while (C.length < k) { let bi2 = 0; for (let j = 1; j < P.length; j++) if (dmin[j] > dmin[bi2]) bi2 = j; C.push(P[bi2].clone()); for (let j = 0; j < P.length; j++) dmin[j] = Math.min(dmin[j], P[j].distanceToSquared(C[C.length - 1])); }
      const asg = new Int16Array(P.length);
      for (let it = 0; it < 6; it++) {
        for (let j = 0; j < P.length; j++) { let bc = 0, bd = 1e9; for (let c = 0; c < C.length; c++) { const d = P[j].distanceToSquared(C[c]); if (d < bd) { bd = d; bc = c; } } asg[j] = bc; }
        const S = C.map(() => new T.Vector3()), N = new Int32Array(C.length);
        for (let j = 0; j < P.length; j++) { S[asg[j]].add(P[j]); N[asg[j]]++; }
        for (let c = 0; c < C.length; c++) if (N[c]) C[c].copy(S[c].divideScalar(N[c]));
      }
      for (let c = 0; c < C.length; c++) {
        const ds = []; for (let j = 0; j < P.length; j++) if (asg[j] === c) ds.push(P[j].distanceTo(C[c]));
        if (ds.length < 3) continue; ds.sort((x, y) => x - y);
        const r = ds[Math.min(ds.length - 1, Math.floor(ds.length * pct))];
        out.push({ bone, c: C[c], r, name: bone.name, w: new T.Vector3(), rw: r });
      }
    }
  }
  return out;
}
function _updSpheres(list) { const sc = new Map(); for (const s of list) { let k = sc.get(s.bone); if (k === undefined) { k = s.bone.matrixWorld.getMaxScaleOnAxis(); sc.set(s.bone, k); } s.w.copy(s.c).applyMatrix4(s.bone.matrixWorld); s.rw = s.r * k; } }

// blood / feather effects (instanced, capped, cheap)

// =====================================================================================================
// v4: blood that SOAKS INTO the fur / feathers (no decal sheet) + soft dents under teeth and claws.
// One SoakSkin per skinned mesh patches a per-hunt CLONE of its material (shared GLB materials are never touched):
//  - fragment: wound fields in the mesh's bind space (so they bend with the body) darken + redden the fur's own albedo
//    (texture detail stays visible = matted, soaked fur), ragged noisy edges, rivulets that run down with gravity from the
//    moment of the bite, spatter droplets around it, wet low roughness (glossy), growing over time.
//  - vertex: up to DENT_MAX dents (skin pushed in under a tooth / paw, small squash bulge around it, normals bent so the
//    dent shades). getVertexPosition is mirrored on the mesh instance, so the contact IK and any CPU measurement see the
//    same dented surface the GPU draws.
const SOAK_MAX = 6, DENT_MAX = 4;
const _SOAK_COMMON_V = `
uniform vec4 uDC[${DENT_MAX}]; uniform vec4 uDD[${DENT_MAX}]; uniform vec4 uDB;
varying vec3 vHuntBP;
vec3 huntDent(vec3 p, inout vec3 nrm) {
  vec3 off = vec3(0.0);
  for (int j = 0; j < ${DENT_MAX}; j++) {
    float dep = uDD[j].w; if (abs(dep) < 1e-6) continue;
    vec3 rel = p - uDC[j].xyz; float r = uDC[j].w; float d = length(rel); float x = d / r; if (x > 1.8) continue;
    vec3 dir = uDD[j].xyz;
    float g = x < 1.0 ? (1.0 - x * x) * (1.0 - x * x) : 0.0; float gd = x < 1.0 ? -4.0 * x * (1.0 - x * x) / r : 0.0;
    float e = (x - 1.15) / 0.25; float b = uDB[j] * exp(-e * e); float bd = b * (-2.0 * e / 0.25) / r;
    off += dir * dep * (g - b);
    vec3 rad = rel - dot(rel, dir) * dir; float rl = length(rad);
    if (rl > 1e-6) { float hp = -dep * (gd - bd); nrm = normalize(nrm - (rad / rl) * hp); }
  }
  return off;
}`;
const _SOAK_COMMON_F = `
uniform vec4 uBW[${SOAK_MAX}]; uniform vec4 uBD[${SOAK_MAX}]; uniform vec4 uBS[${SOAK_MAX}]; uniform vec4 uBL[${SOAK_MAX}]; uniform float uBK; uniform vec4 uBX;
varying vec3 vHuntBP;
float hHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float hNoise(vec3 x) { vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hHash(i), hHash(i + vec3(1,0,0)), f.x), mix(hHash(i + vec3(0,1,0)), hHash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hHash(i + vec3(0,0,1)), hHash(i + vec3(1,0,1)), f.x), mix(hHash(i + vec3(0,1,1)), hHash(i + vec3(1,1,1)), f.x), f.y), f.z); }
`;
const _SOAK_FRAG = `
float huntWet = 0.0; float huntCore = 0.0;
{
  vec3 pm = vHuntBP * uBK; float fine = hNoise(pm * 160.0); float fur = hNoise(pm * vec3(260.0, 90.0, 260.0));
  for (int i = 0; i < ${SOAK_MAX}; i++) {
    float R = uBW[i].w; if (R <= 0.0) continue;
    vec3 rel = (vHuntBP - uBW[i].xyz) * uBK; float dist = length(rel); float runL = uBD[i].w;
    if (dist > R * 2.8 + runL) continue;
    float sd = uBS[i].x; vec3 dn = uBD[i].xyz; float hgt = dot(rel, cross(uBL[i].xyz, dn)); if (hgt > 0.07) continue; float s = dot(rel, dn); vec3 perp = rel - s * dn; float pl = length(perp);
    float n1 = hNoise(pm * 22.0 + sd), n2 = hNoise(pm * 61.0 + sd * 1.7);
    float edge = R * (0.45 + 0.45 * n1 + 0.16 * n2);
    float blob = (1.0 - smoothstep(edge * 0.45, edge, dist)) * mix(0.55 + 0.45 * smoothstep(0.25, 0.7, fur), 1.0, uBX.w * 0.7);
    // rivulets: noise stretched along the down direction -> thin streams that run down the body from the wound
    float lu = dot(rel, uBL[i].xyz);                                            // across-the-flow coordinate (surface tangent)
    float st = hNoise(vec3(lu * 52.0 + sd * 3.1, s * 1.6, sd));
    st = smoothstep(0.62 - 0.07 * (uBX.z - 1.0), 0.7 - 0.05 * (uBX.z - 1.0), st) * (0.7 + 0.3 * fur);
    float rl = runL * (0.4 + 0.8 * hNoise(vec3(lu * 21.0 + sd * 1.3, sd, 0.5)));      // every rivulet stops at its own length
    float along = smoothstep(-0.01, 0.015, s) * (1.0 - smoothstep(rl * 0.8, rl, s));
    float width = 1.0 - smoothstep(R * 0.3, R * 0.7, abs(lu));
    float run = st * along * width;
    // spatter droplets thrown around the bite
    vec3 q = rel * 85.0; vec3 cl = floor(q); vec3 fr = fract(q);
    float hc = hHash(cl + sd); vec3 cp = vec3(hHash(cl + 1.3 + sd), hHash(cl + 2.7 + sd), hHash(cl + 4.1 + sd)) * 0.6 + 0.2;
    float dd = length(fr - cp); float dr = 0.12 + 0.2 * hHash(cl + 7.7);
    float spat = step(0.8, hc) * (1.0 - smoothstep(dr * 0.6, dr, dd)) * smoothstep(R * 0.7, R * 1.0, dist) * (1.0 - smoothstep(R * 1.5, R * 2.6, dist)) * uBS[i].z;
    float f = max(blob, max(run * 0.95, spat));
    huntWet = max(huntWet, f * uBS[i].y);
    huntCore = max(huntCore, blob * (1.0 - smoothstep(0.0, edge * 0.45, dist)) * uBS[i].w);
  }
  // soaked hairs: the edge breaks up along the fur instead of a clean cut-out
  huntWet = clamp(smoothstep(0.28, 0.62, huntWet + 0.28 * (fur - 0.5) + 0.12 * (fine - 0.5)) * 1.0, 0.0, 1.0);
  if (huntWet > 0.0) {
    vec3 base = diffuseColor.rgb;
    float lum = dot(base, vec3(0.3, 0.55, 0.15));
    vec3 soaked = base * vec3(0.5, 0.11, 0.09) + vec3(0.05, 0.002, 0.0015) + vec3(0.2, 0.0, 0.0) * (1.0 - smoothstep(0.0, 0.3, lum));   // fur dyed by blood (its own detail stays)
    vec3 fresh = vec3(0.27, 0.008, 0.006) + base * vec3(0.2, 0.02, 0.02);
    soaked = mix(soaked, fresh, huntCore * 0.35);
    soaked *= 0.7 + 0.5 * fur * fine + 0.15 * fine;                                       // clumped / matted strands
    // v5: on dark / saturated plumage the dyed colour alone reads pale: lay real blood colour over it (deep wet red, darker where thick)
    vec3 bl = mix(vec3(0.10, 0.004, 0.003), vec3(0.2, 0.008, 0.005), huntCore) * (0.8 + 0.35 * fine);
    soaked = mix(soaked, bl, uBX.x * (0.55 + 0.45 * smoothstep(0.3, 0.8, huntWet)));
    diffuseColor.rgb = mix(base, soaked, huntWet);
  }
}
`;
class SoakSkin {
  constructor(T, meshes, k, look) {
    this.T = T; this.meshes = meshes; this.k = k;            // k: mesh geometry units -> metres
    const lk = look || [0, 0.28, 1, 0];                      // v5 look: [blood colour over the plumage 0..1, wet roughness, run boost, solid soak 0..1]
    this.runK = lk[2];
    const v4 = n => Array.from({ length: n }, () => new T.Vector4());
    this.u = { uBW: { value: v4(SOAK_MAX) }, uBD: { value: v4(SOAK_MAX) }, uBS: { value: v4(SOAK_MAX) }, uBL: { value: v4(SOAK_MAX) }, uBK: { value: k }, uBX: { value: new T.Vector4(lk[0], lk[1], lk[2], lk[3]) },
               uDC: { value: v4(DENT_MAX) }, uDD: { value: v4(DENT_MAX) }, uDB: { value: new T.Vector4(0.18, 0.18, 0.18, 0.18) } };
    this.wounds = []; this.dents = Array.from({ length: DENT_MAX }, () => ({ c: new T.Vector3(), dir: new T.Vector3(0, 0, -1), r: 0.05, x: 0, v: 0, target: 0, key: null }));
    this.saved = [];
    for (const m of meshes) {
      const orig = m.material; const mats = Array.isArray(orig) ? orig : [orig];
      const clones = mats.map(mt => { const c = mt.clone(); this._patch(c); return c; });
      m.material = Array.isArray(orig) ? clones : clones[0];
      const ogv = m.getVertexPosition; const self = this, pos = m.geometry.attributes.position, nv = new T.Vector3();
      m.getVertexPosition = function (i, target) {
        if (!self.anyDent) return ogv.call(this, i, target);
        target.fromBufferAttribute(pos, i); target.add(self.dentOffset(target, nv)); this.applyBoneTransform(i, target); return target;
      };
      this.saved.push({ m, orig, clones, ogv });
    }
    this.anyDent = false;
  }
  _patch(mat) {
    const u = this.u;
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, u);
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\n' + _SOAK_COMMON_V)
        .replace('#include <beginnormal_vertex>', 'vec3 objectNormal = vec3( normal );\nvec3 huntOff = huntDent(position, objectNormal);\n#ifdef USE_TANGENT\nvec3 objectTangent = vec3( tangent.xyz );\n#endif')
        .replace('#include <begin_vertex>', 'vec3 transformed = vec3( position ) + huntOff; vHuntBP = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + _SOAK_COMMON_F)
        .replace('#include <map_fragment>', '#include <map_fragment>\n' + _SOAK_FRAG)
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, uBX.y + (0.3 - 0.22 * uBX.x) * hNoise(vHuntBP * uBK * 120.0), huntWet * (0.85 + 0.15 * uBX.x));');
    };
    mat.customProgramCacheKey = () => 'huntSoak5';
    mat.needsUpdate = true;
  }
  // centre (bind space), outward normal (bind), gravity-down (bind), radius m, growth rate 1/s
  addWound(c, n, down, Rmax, rate, o = {}) {
    if (this.wounds.length >= SOAK_MAX) this.wounds.shift();
    const T = this.T; const dn = down.clone(); dn.addScaledVector(n, -dn.dot(n) * 0.6); if (dn.lengthSq() < 1e-6) dn.copy(down); dn.normalize();
    const w = { c: c.clone(), n: n.clone(), down: dn, Rmax, rate, grow: 0, age: 0, seed: (this.wounds.length * 13.37 + Math.random() * 50) % 97,
                runMax: o.runMax ?? Rmax * 2.2, runSpeed: o.runSpeed ?? 0.05, spat: o.spat ?? 1, anchor: o.anchor || null, mesh: o.mesh || null, idx: o.idx ?? -1, bleed: 1 };
    this.wounds.push(w); this._sync(); return w;
  }
  update(dt) {
    for (const w of this.wounds) { w.age += dt; if (w.grow < 1) w.grow = Math.min(1, w.grow + dt * w.rate * w.bleed); }
    // dents: damped springs (press in fast, spring back with a small overshoot when the tooth / paw lets go)
    let any = false;
    for (const d of this.dents) {
      const k = d.target > Math.abs(d.x) ? 900 : 260, c = 2 * Math.sqrt(k) * (d.target > Math.abs(d.x) ? 0.9 : 0.32);
      d.v += (k * (d.target - d.x) - c * d.v) * dt; d.x += d.v * dt; if (Math.abs(d.x) < 1e-5 && Math.abs(d.v) < 1e-4 && d.target === 0) { d.x = 0; d.v = 0; }
      if (d.x !== 0) any = true;
    }
    this.anyDent = any; this._sync();
  }
  // a dent at slot j: centre and inward direction in bind space, radius / depth in metres
  setDent(j, c, dirIn, rM, depthM, key) {
    const d = this.dents[j]; if (key !== undefined && key !== d.key && Math.abs(d.x) > 1e-4 && c) { /* moving dent: hand the old one to the spare slot so it springs back */
      const s = this.dents[DENT_MAX - 1]; if (s !== d) { s.c.copy(d.c); s.dir.copy(d.dir); s.r = d.r; s.x = d.x; s.v = d.v; s.target = 0; s.key = null; d.x = 0; d.v = 0; } }
    if (c) { d.c.copy(c); d.dir.copy(dirIn).normalize(); d.r = rM / this.k; } d.target = depthM / this.k; if (key !== undefined) d.key = key;
  }
  dentOffset(p, out) {          // JS mirror of huntDent() (bind space)
    out.set(0, 0, 0); if (!this.anyDent) return out;
    for (const d of this.dents) { if (Math.abs(d.x) < 1e-6) continue;
      const dx = p.x - d.c.x, dy = p.y - d.c.y, dz = p.z - d.c.z, x = Math.sqrt(dx * dx + dy * dy + dz * dz) / d.r; if (x > 1.8) continue;
      const g = x < 1 ? (1 - x * x) * (1 - x * x) : 0, e = (x - 1.15) / 0.25, b = this.u.uDB.value.getComponent(this.dents.indexOf(d)) * Math.exp(-e * e);
      out.addScaledVector(d.dir, d.x * (g - b)); }
    return out;
  }
  // a bind-space point carried by vertex idx's skin into world space
  toWorld(mesh, idx, pB, out) { out.copy(pB); mesh.applyBoneTransform(idx, out); return out.applyMatrix4(mesh.matrixWorld); }
  runEnd(w, out) { return out.copy(w.c).addScaledVector(w.down, (w.runMax * Math.min(1, Math.max(0, w.age - 0.25) * w.runSpeed / w.runMax)) * 0.85 / this.k); }
  _sync() {
    const u = this.u;
    for (let i = 0; i < SOAK_MAX; i++) {
      const w = this.wounds[i];
      if (!w) { u.uBW.value[i].set(0, 0, 0, 0); u.uBD.value[i].set(0, -1, 0, 0); u.uBS.value[i].set(0, 0, 0, 0); u.uBL.value[i].set(1, 0, 0, 0); continue; }
      if (!w.lat) w.lat = new this.T.Vector3().crossVectors(w.down, w.n).normalize();
      u.uBL.value[i].set(w.lat.x, w.lat.y, w.lat.z, 0);
      const g = w.grow, e = 1 - (1 - g) * (1 - g);
      const run = Math.min(w.runMax, Math.max(0, w.age - 0.25) * w.runSpeed);
      u.uBW.value[i].set(w.c.x, w.c.y, w.c.z, w.Rmax * (0.25 + 0.75 * e));
      u.uBD.value[i].set(w.down.x, w.down.y, w.down.z, run);
      u.uBS.value[i].set(w.seed, Math.min(1, 0.35 + g * 1.2), w.spat * Math.min(1, w.age * 8), Math.max(0.25, 1 - w.age / 25));
    }
    for (let j = 0; j < DENT_MAX; j++) { const d = this.dents[j]; u.uDC.value[j].set(d.c.x, d.c.y, d.c.z, d.r); u.uDD.value[j].set(d.dir.x, d.dir.y, d.dir.z, d.x); }
  }
  dispose() {
    for (const s of this.saved) { s.m.material = s.orig; s.m.getVertexPosition = s.ogv; delete s.m.getVertexPosition; for (const c of s.clones) c.dispose(); }
    this.saved = [];
  }
}

// ================= v6: runtime morph targets on the wolf (lips / cheeks / toes) =================
// Built once per hunt on a per-hunt CLONE of the wolf body geometry (the shared GLB geometry is never touched; dispose() restores it).
// Regions are found from the wolf's own bind skeleton (head, jawLower, f_ftL/R) and scaled by the head→jaw distance, so every
// Tab wolf (all colours, high + lite) gets the same shapes. Targets: snarl (upper lip lifts and pulls back at the corners, lip flares,
// nose bridge bunches, lower-lip corners drop), cheekL / cheekR (cheek bulge behind the mouth corner), toeL / toeR (toes and claw tips curl down).
class WolfMorphs {
  constructor(T, wolfObj) {
    this.T = T; this.ok = false; let m = null;
    wolfObj.traverse(o => { if (o.isSkinnedMesh && o.skeleton && o.skeleton.bones.some(b => b.name === 'head') && (!m || o.geometry.attributes.position.count > m.geometry.attributes.position.count)) m = o; });
    if (!m) return;
    const bones = m.skeleton.bones, bi = n => bones.findIndex(b => b.name === n);
    const iH = bi('head'), iJ = bi('jawLower'), iJ0 = bi('jaw'), iFL = bi('f_ftL'), iFR = bi('f_ftR');
    if (iH < 0 || iJ < 0) return;
    const bInv = new T.Matrix4().copy(m.bindMatrix).invert();
    const bpos = i => new T.Vector3().setFromMatrixPosition(new T.Matrix4().copy(m.skeleton.boneInverses[i]).invert()).applyMatrix4(bInv);
    const Hb = bpos(iH), Jb = bpos(iJ); const s = Hb.distanceTo(Jb) / 0.2626; if (!(s > 0)) return;
    const REFH = new T.Vector3(0, 0.468, 0.731);
    this.m = m; this.orig = m.geometry; const g = m.geometry.clone(); m.geometry = g;
    const pos = g.attributes.position, nor = g.attributes.normal, si = g.attributes.skinIndex, sw = g.attributes.skinWeight, n = pos.count;
    const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const D = { snarl: new Float32Array(n * 3), cheekL: new Float32Array(n * 3), cheekR: new Float32Array(n * 3), toeL: new Float32Array(n * 3), toeR: new Float32Array(n * 3) };
    const N = { snarl: null, cheekL: null, cheekR: null, toeL: new Float32Array(n * 3), toeR: new Float32Array(n * 3) };
    const feet = [];
    for (const [k, i] of [['toeL', iFL], ['toeR', iFR]]) if (i >= 0) { const F = bpos(i); feet.push({ k, i, z0: F.z + 0.05 * s, py: F.y - 0.05 * s }); }
    const p = new T.Vector3(), q = new T.Vector3(), nv = new T.Vector3();
    for (let v = 0; v < n; v++) {
      let wh = 0, wj = 0; const wf = {};
      for (let c = 0; c < 4; c++) { const w = c === 0 ? sw.getX(v) : c === 1 ? sw.getY(v) : c === 2 ? sw.getZ(v) : sw.getW(v); if (!w) continue; const b = c === 0 ? si.getX(v) : c === 1 ? si.getY(v) : c === 2 ? si.getZ(v) : si.getW(v);
        if (b === iH) wh += w; else if (b === iJ || b === iJ0) wj += w; else if (b === iFL) wf.toeL = (wf.toeL || 0) + w; else if (b === iFR) wf.toeR = (wf.toeR || 0) + w; }
      p.fromBufferAttribute(pos, v); nv.fromBufferAttribute(nor, v);
      if (wh + wj > 0.05) {
        q.copy(p).sub(Hb).divideScalar(s).add(REFH);                                     // reference-wolf coordinates (wolf-grey bind space)
        const ax = Math.abs(q.x), sg = Math.sign(q.x) || 1, upper = wh / (wh + wj), j = 3 * v;
        // upper lip: band just above the mouth line on the muzzle
        const band = 1 - ss(0.205, 0.29, q.y), front = ss(0.735, 0.80, q.z), side = ss(0.012, 0.05, ax), corner = 1 - 0.65 * ss(0.86, 0.995, q.z);
        let dx = 0, dy = 0, dz = 0;
        const fr = ss(0.84, 0.90, q.z), L = band * front * upper;                       // the lift is kept to the front (teeth behind it); at the corner the lip only rolls / slides back with the lower lip
        if (L > 0) { dy += 0.014 * L * fr * (0.55 + 0.45 * side); dz -= 0.004 * L * corner * side * (1 - 0.5 * fr); dx += sg * 0.0025 * L * side * fr; }
        const roll = (ss(0.215, 0.24, q.y) * (1 - ss(0.27, 0.31, q.y))) * front * upper * side; if (roll > 0) { dx += sg * 0.0045 * roll; dy += 0.002 * roll; }   // lip skin above the edge bulges out (soft, not a rigid shell)
        // nose bridge bunches back and up (snarl wrinkle)
        const nb = ss(0.29, 0.33, q.y) * (1 - ss(0.40, 0.44, q.y)) * ss(0.83, 0.86, q.z) * (1 - ss(0.94, 0.97, q.z)) * upper; if (nb > 0) { dy += 0.005 * nb; dz -= 0.006 * nb; }
        // lower-lip corners drop a little
        const lj = (1 - upper) * ss(0.175, 0.205, q.y) * ss(0.74, 0.80, q.z) * side; if (lj > 0) { dz -= 0.004 * lj * (1 - ss(0.84, 0.9, q.z)); dy -= 0.002 * lj * ss(0.84, 0.9, q.z); }
        D.snarl[j] = dx * s; D.snarl[j + 1] = dy * s; D.snarl[j + 2] = dz * s;
        // cheek bulge behind / above the mouth corner, along the outward normal
        const ch = Math.exp(-(((q.z - 0.775) / 0.05) ** 2 + ((q.y - 0.27) / 0.05) ** 2)) * ss(0.03, 0.07, ax) * Math.max(0, Math.min(1, nv.x * sg * 1.6)) * (0.35 + 0.65 * upper);
        if (ch > 0.002) { const A = sg > 0 ? D.cheekL : D.cheekR; A[j] = (nv.x * 0.013 * ch) * s; A[j + 1] = (nv.y * 0.013 * ch + 0.002 * ch) * s; A[j + 2] = (nv.z * 0.013 * ch - 0.0025 * ch) * s; }
      }
      for (const f of feet) { const w = wf[f.k] || 0; if (w < 0.02 || p.z < f.z0) continue;
        const u = ss(f.z0, f.z0 + 0.075 * s, p.z), a = 0.52 * u * Math.min(1, w * 1.25), ca = Math.cos(a), sa = Math.sin(a);
        const y = p.y - f.py, z = p.z - f.z0, y2 = y * ca - z * sa, z2 = y * sa + z * ca, j = 3 * v;          // rotate about the knuckle line (x axis): tips go down
        D[f.k][j + 1] = y2 - y; D[f.k][j + 2] = z2 - z;
        const ny = nv.y * ca - nv.z * sa, nz = nv.y * sa + nv.z * ca; N[f.k][j + 1] = ny - nv.y; N[f.k][j + 2] = nz - nv.z; }
    }
    // the gum strip of the upper teeth (separate rigid mesh) follows the lifted lip, so the snarl shows gum instead of a gap
    this.extra = [];
    wolfObj.traverse(o => { if (o === m || !o.isSkinnedMesh || !o.skeleton || o.geometry.attributes.position.count > 4000) return; const ih = o.skeleton.bones.findIndex(b => b.name === 'head'); if (ih < 0) return;
      const og = o.geometry, tg = og.clone(); const tp = tg.attributes.position, tc = tg.attributes.color, tsi = tg.attributes.skinIndex, tn = tp.count; const dd = new Float32Array(tn * 3); let any = false;
      for (let v = 0; v < tn; v++) { if (tsi.getX(v) !== ih) continue; if (tc && tc.getX(v) > 0.3) continue;                         // dark gum vertices only, never the teeth
        p.fromBufferAttribute(tp, v); q.copy(p).sub(Hb).divideScalar(s).add(REFH); const ax = Math.abs(q.x), side = ss(0.012, 0.05, ax), front = ss(0.735, 0.80, q.z), fr = ss(0.84, 0.90, q.z);
        const k = ss(0.207, 0.217, q.y) * front; if (k <= 0) continue; dd[3 * v + 1] = 0.014 * k * fr * (0.55 + 0.45 * side) * s; dd[3 * v + 2] = -0.004 * k * side * (1 - 0.5 * fr) * s; any = true; }
      if (!any) { tg.dispose(); return; }
      o.geometry = tg; const z = () => new T.Float32BufferAttribute(new Float32Array(tn * 3), 3);
      tg.morphAttributes.position = Object.keys(D).map(k => k === 'snarl' ? new T.Float32BufferAttribute(dd, 3) : z()); tg.morphTargetsRelative = true; o.updateMorphTargets();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(mt => mt.needsUpdate = true); this.extra.push({ o, orig: og }); });
    this.names = Object.keys(D); g.morphAttributes.position = this.names.map(k => new T.Float32BufferAttribute(D[k], 3));
    g.morphAttributes.normal = this.names.map(k => new T.Float32BufferAttribute(N[k] || new Float32Array(n * 3), 3)); g.morphTargetsRelative = true;
    m.updateMorphTargets(); this.idx = {}; this.names.forEach((k, i) => this.idx[k] = i);
    const mats = Array.isArray(m.material) ? m.material : [m.material]; for (const mt of mats) mt.needsUpdate = true;
    this.cur = {}; for (const k of this.names) this.cur[k] = 0; this.ok = true;
  }
  set(k, v) { if (!this.ok || this.idx[k] == null) return; this.cur[k] = v; this.m.morphTargetInfluences[this.idx[k]] = v; for (const e of this.extra) e.o.morphTargetInfluences[this.idx[k]] = v; }
  dispose() { if (!this.ok) return; for (const e of this.extra) { e.o.geometry.dispose(); e.o.geometry = e.orig; e.o.morphTargetInfluences = undefined; e.o.morphTargetDictionary = undefined; (Array.isArray(e.o.material) ? e.o.material : [e.o.material]).forEach(mt => mt.needsUpdate = true); } this.extra = [];
    this.m.geometry.dispose(); this.m.geometry = this.orig; this.m.morphTargetInfluences = undefined; this.m.morphTargetDictionary = undefined;
    const mats = Array.isArray(this.m.material) ? this.m.material : [this.m.material]; for (const mt of mats) mt.needsUpdate = true; this.ok = false; }
}

class HuntFX {
  constructor(T, parent, p) {
    this.T = T; this.p = p; this.parent = parent;
    this.root = new T.Group(); this.root.matrixAutoUpdate = false; this.root.name = 'huntFX'; parent.add(this.root);
    this.parts = []; this.feathers = []; this.decals = []; this.pools = []; this.soaks = [];   // v4: soaked-in blood + dents (material clones)
    const N = Math.max(1, p.maxBloodParticles | 0);
    this.pm = new T.InstancedMesh(new T.IcosahedronGeometry(1, 1), new T.MeshStandardMaterial(p.bloodStyle === 'decal' ? { color: 0xa00808, emissive: 0x300000, roughness: 0.25, metalness: 0.0 } : { color: 0x7a0606, emissive: 0x180000, roughness: 0.3, metalness: 0.0 }), N);   // v3: rounder, wet droplets
    if (p.poolStyle === 'liquid' && p.bloodStyle !== 'decal') { this.pm.material.dispose(); this.pm.material = new T.MeshPhysicalMaterial({ color: 0x5a0505, emissive: 0x120000, roughness: 0.08, clearcoat: 0.7, clearcoatRoughness: 0.04, envMap: p.envMap || (p.poolEnv ? HuntFX._skyEnv(T) : null), envMapIntensity: 0.45 }); }   // v6: glossy droplets
    this.pm.count = 0; this.pm.frustumCulled = false; this.pm.instanceMatrix.setUsage(T.DynamicDrawUsage); this.root.add(this.pm);
    const NF = Math.max(1, p.maxFeathers | 0);
    const fg = new T.PlaneGeometry(1, 0.32); fg.translate(0.5, 0, 0);
    this.fm = new T.InstancedMesh(fg, new T.MeshLambertMaterial({ color: 0xffffff, side: T.DoubleSide }), NF);
    this.fm.count = 0; this.fm.frustumCulled = false; this.fm.instanceMatrix.setUsage(T.DynamicDrawUsage); this.root.add(this.fm);
    this.tex = HuntFX._bloodTex(T); this.tex3 = HuntFX._bloodTex3(T);
    this.dm = new T.Object3D();
    this.colors = [0xf4ead2, 0xe08a2e, 0x9a4a1c, 0x5a2a12, 0xc9662a];
  }
  // v3: wet bright-to-dark red wound with drips running DOWN the texture (v-), alpha = reveal order (core first, drips last)
  static _bloodTex3(T) {
    if (HuntFX._tex3) return HuntFX._tex3;
    const S = 256, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
    const a = document.createElement('canvas'); a.width = a.height = S; const ga = a.getContext('2d');
    let sd = 4242; const R = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    g.fillStyle = '#5a0000'; g.fillRect(0, 0, S, S); ga.fillStyle = '#000'; ga.fillRect(0, 0, S, S);
    const cx = S * 0.5, cy = S * 0.42;
    // drips first (under the core): long, thin, darker toward the tip; alpha fades along the run so they "flow" as the wound grows
    for (let i = 0; i < 6; i++) {
      const x0 = cx + (R() - 0.5) * S * 0.36, w = S * (0.018 + R() * 0.03), len = S * (0.22 + R() * 0.3), y0 = cy + S * 0.04;
      const steps = 40; for (let k = 0; k < steps; k++) { const u = k / steps, y = y0 + u * len, x = x0 + Math.sin(u * 5 + i) * S * 0.008, ww = w * (1 - 0.55 * u);
        g.fillStyle = `rgb(${Math.round(175 - 70 * u)},${Math.round(10 - 6 * u)},${Math.round(10 - 6 * u)})`; g.beginPath(); g.ellipse(x, y, ww, ww * 1.4, 0, 0, 7); g.fill();
        const al = Math.round(190 * (1 - u) + 12); ga.fillStyle = `rgb(${al},${al},${al})`; ga.beginPath(); ga.ellipse(x, y, ww, ww * 1.4, 0, 0, 7); ga.fill(); }
      g.fillStyle = '#7a0202'; g.beginPath(); g.arc(x0, y0 + len, w * 0.75, 0, 7); g.fill(); ga.fillStyle = 'rgb(14,14,14)'; ga.beginPath(); ga.arc(x0, y0 + len, w * 0.75, 0, 7); ga.fill();
    }
    // core: irregular blobs, bright wet red in the middle, dark clotted rim
    for (let i = 0; i < 14; i++) { const ang = R() * 6.283, d = R() * S * 0.13, r = S * (0.06 + R() * 0.09), x = cx + Math.cos(ang) * d, y = cy + Math.sin(ang) * d * 0.8;
      const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, '#d01212'); gr.addColorStop(0.55, '#a00606'); gr.addColorStop(1, '#5c0000'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      const ar = ga.createRadialGradient(x, y, 0, x, y, r); const peak = Math.round(255 - (d / (S * 0.13)) * 50); ar.addColorStop(0, `rgb(${peak},${peak},${peak})`); ar.addColorStop(1, 'rgb(150,150,150)'); ga.fillStyle = ar; ga.beginPath(); ga.arc(x, y, r, 0, 7); ga.fill(); }
    // splatter dots around
    for (let i = 0; i < 26; i++) { const ang = R() * 6.283, d = S * (0.18 + R() * 0.17), r = S * (0.006 + R() * 0.016), x = cx + Math.cos(ang) * d, y = cy + Math.sin(ang) * d * 0.85;
      g.fillStyle = '#9a0505'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); const al = Math.round(60 + R() * 70); ga.fillStyle = `rgb(${al},${al},${al})`; ga.beginPath(); ga.arc(x, y, r, 0, 7); ga.fill(); }
    // wet highlights (light streaks catch the sun even on dark cloth)
    g.globalAlpha = 0.55; for (let i = 0; i < 5; i++) { const x = cx + (R() - 0.5) * S * 0.18, y = cy + (R() - 0.6) * S * 0.14; g.fillStyle = '#ff8a7a'; g.beginPath(); g.ellipse(x, y, S * 0.02, S * 0.008, -0.6, 0, 7); g.fill(); } g.globalAlpha = 1;
    const im = g.getImageData(0, 0, S, S), am = ga.getImageData(0, 0, S, S);
    for (let k = 0; k < S * S; k++) im.data[k * 4 + 3] = am.data[k * 4];
    g.putImageData(im, 0, 0); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; HuntFX._tex3 = t; return t;
  }

  // v5: a pool that reads as spilled blood, not a painted disc: lobed body grown from a few flows, broken edge, satellite drops
  // and a few thrown streaks; alpha = reveal order (the edge advances lobe by lobe as it grows); thick = near black, thin
  // edge = redder; normal map from the film thickness so the meniscus catches the light (wet depth).
  static _poolTex(T, seed) {
    const S = 256, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'); const img = g.createImageData(S, S);
    let sd = seed | 0 || 777; const R = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    const bl = []; const flows = 4 + ((R() * 3) | 0);
    bl.push([0.5, 0.5, 0.25, 1.0]); bl.push([0.5 + (R() - 0.5) * 0.1, 0.5 + (R() - 0.5) * 0.1, 0.2, 0.95]);
    for (let f = 0; f < flows; f++) { let a = f * 6.283 / flows + (R() - 0.5) * 1.2, x = 0.5, y = 0.5, r = 0.17 + R() * 0.04; const len = 3 + ((R() * 3) | 0);
      for (let k = 0; k < len; k++) { a += (R() - 0.5) * 0.9; const st = 0.06 + R() * 0.045; x += Math.cos(a) * st; y += Math.sin(a) * st; r *= 0.8 + R() * 0.12; bl.push([x, y, Math.max(0.035, r), 0.85 - k * 0.1]); } }
    const sat = []; for (let i = 0; i < 46; i++) { const a = R() * 6.283, d = 0.36 + R() * 0.13, r = 0.004 + R() * R() * 0.02, el = R() < 0.3 ? 1.6 + R() * 2.2 : 1; sat.push([0.5 + Math.cos(a) * d, 0.5 + Math.sin(a) * d, r, a, el, 0.12 + R() * 0.3]); }
    const vn = (x, y, s) => { const xi = Math.floor(x * s), yi = Math.floor(y * s), xf = x * s - xi, yf = y * s - yi; const h = (i, j) => { const q = Math.sin((i + seed * 0.37) * 127.1 + (j - seed * 0.11) * 311.7) * 43758.5453; return q - Math.floor(q); };
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); return (h(xi, yi) * (1 - u) + h(xi + 1, yi) * u) * (1 - v) + (h(xi, yi + 1) * (1 - u) + h(xi + 1, yi + 1) * u) * v; };
    const F = new Float32Array(S * S), A = new Float32Array(S * S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const u = (x + 0.5) / S, v = (y + 0.5) / S; let f = 0, ord = 0;
      for (const [bx, by, br, bo] of bl) { const d2 = ((u - bx) ** 2 + (v - by) ** 2) / (br * br); const e = Math.exp(-d2 * 1.6); f += e; ord = Math.max(ord, e * bo); }
      const n = vn(u, v, 9) * 0.5 + vn(u, v, 23) * 0.3 + vn(u, v, 61) * 0.2;
      f = f * (0.62 + 0.76 * n);
      let a = 0, film = 0;
      if (f > 0.42) { film = Math.min(1, (f - 0.42) / 0.9); a = 0.08 + 0.92 * Math.min(1, ord * (0.75 + 0.5 * n)); }
      for (const [sx, sy, sr, sa, se, so] of sat) { const dx = u - sx, dy = v - sy, ca = Math.cos(sa), sn = Math.sin(sa); const px = (dx * ca + dy * sn) / se, py = -dx * sn + dy * ca; const d = Math.hypot(px, py) / sr; if (d < 1) { const ff = 1 - d * d; if (ff * 0.6 > film) { film = Math.max(film, ff * 0.55); a = Math.max(a, so * (0.6 + 0.4 * ff)); } } }
      F[y * S + x] = film; A[y * S + x] = a;
    }
    for (let k = 0; k < S * S; k++) { const fl = F[k], a = A[k];
      const thick = Math.min(1, fl * 1.6);
      img.data[k * 4] = Math.round(62 + 62 * (1 - thick)); img.data[k * 4 + 1] = Math.round(3 + 6 * (1 - thick)); img.data[k * 4 + 2] = Math.round(3 + 5 * (1 - thick)); img.data[k * 4 + 3] = Math.round(255 * a); }
    g.putImageData(img, 0, 0); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
    // normal map: height = film thickness with a steep meniscus at the edge
    const nc = document.createElement('canvas'); nc.width = nc.height = S; const ng = nc.getContext('2d'); const nim = ng.createImageData(S, S);
    const Hh = (x, y) => { x = Math.max(0, Math.min(S - 1, x)); y = Math.max(0, Math.min(S - 1, y)); const f = F[y * S + x]; return Math.sqrt(Math.min(1, f * 3)); };
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const dx = (Hh(x + 1, y) - Hh(x - 1, y)) * 2.2, dy = (Hh(x, y + 1) - Hh(x, y - 1)) * 2.2; const l = Math.hypot(dx, dy, 1); const k = (y * S + x) * 4;
      nim.data[k] = Math.round((-dx / l * 0.5 + 0.5) * 255); nim.data[k + 1] = Math.round((dy / l * 0.5 + 0.5) * 255); nim.data[k + 2] = Math.round((1 / l * 0.5 + 0.5) * 255); nim.data[k + 3] = 255; }
    ng.putImageData(nim, 0, 0); const nt = new T.CanvasTexture(nc); nt.colorSpace = T.NoColorSpace;
    return [t, nt, { S, F, A, sat }];   // v6: film thickness, reveal order and satellite drops for the liquid pool geometry
  }
  static _bloodTex(T) {
    if (HuntFX._tex) return HuntFX._tex;
    const S = 128, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'); const img = g.createImageData(S, S);
    let sd = 12345; const R = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    const blobs = []; for (let i = 0; i < 9; i++) { const a = R() * 6.283, d = R() * 0.32; blobs.push([0.5 + Math.cos(a) * d, 0.5 + Math.sin(a) * d, 0.12 + R() * 0.2]); }
    for (let i = 0; i < 14; i++) { const a = R() * 6.283, d = 0.3 + R() * 0.17; blobs.push([0.5 + Math.cos(a) * d, 0.5 + Math.sin(a) * d, 0.015 + R() * 0.03]); }
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const u = (x + 0.5) / S, v = (y + 0.5) / S; let f = 0;
      for (const [bx, by, br] of blobs) { const d = Math.hypot(u - bx, v - by); f = Math.max(f, (1 - d / br) * (0.55 + 0.45 * (1 - Math.hypot(bx - 0.5, by - 0.5) / 0.5))); }
      const n = Math.sin(u * 37 + Math.sin(v * 23)) * 0.04 + Math.sin(v * 41 + u * 13) * 0.04;
      f = Math.max(0, Math.min(1, f + n));
      const k = (y * S + x) * 4, dark = 0.55 + 0.45 * (1 - f);
      img.data[k] = 70 * dark + 22; img.data[k + 1] = 3 * dark + 1; img.data[k + 2] = 4 * dark + 2; img.data[k + 3] = f > 0.004 ? Math.round(8 + f * 247) : 0;
    }
    g.putImageData(img, 0, 0); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; HuntFX._tex = t; return t;
  }
  _mat(polyUnits, tex) {
    const T = this.T;
    return new T.MeshStandardMaterial({ map: tex || this.tex, alphaTest: 0.99, roughness: 0.3, metalness: 0.05, color: 0xffffff, emissive: 0x2a0000,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: polyUnits || -4, depthWrite: true });
  }
  // a wound stain that is part of the prey's skin (skinned patch cut from its own mesh) → it bends with the body
  addWound(mesh, vIndex, Rmax, grow, opt = {}) {
    const T = this.T; if (!this.p.bloodDecals) return null;
    if (!opt.extra && this.decals.filter(d => !d.extra).length >= (this.p.maxWounds || 4)) { const i = this.decals.findIndex(d => !d.extra); const old = this.decals.splice(i, 1)[0]; old.m.parent && old.m.parent.remove(old.m); old.m.geometry.dispose(); }
    const geo = mesh.geometry, pos = geo.attributes.position, nor = geo.attributes.normal, idx = geo.index;
    const si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight;
    const a = new T.Vector3().fromBufferAttribute(pos, vIndex);
    // radius in the mesh's own units
    const sc = new T.Vector3(); mesh.matrixWorld.decompose(new T.Vector3(), new T.Quaternion(), sc); const k = 1 / (sc.x || 1);
    const R = Rmax * k;
    const n = new T.Vector3(); let cnt = 0; const tv = new T.Vector3(), tn = new T.Vector3();
    if (opt.faceB) {      // v3: centre on the outermost nearby vertex that faces the biter (cloth layer included), so the stain is on the seen side
      let best = -1e9; const a0 = a.clone(); const f = opt.faceB;
      for (let i = 0; i < pos.count; i++) { tv.fromBufferAttribute(pos, i); const d = tv.distanceTo(a0); if (d > R * 0.8) continue; tn.fromBufferAttribute(nor, i);
        const s = tn.dot(f) - 0.6 * d / R + 0.8 * tv.clone().sub(a0).dot(f) / R; if (s > best) { best = s; a.copy(tv); } }
    }
    for (let i = 0; i < pos.count; i++) { tv.fromBufferAttribute(pos, i); if (tv.distanceToSquared(a) < R * R * 0.25) { n.add(tv.fromBufferAttribute(nor, i)); cnt++; } }
    if (!cnt) n.fromBufferAttribute(nor, vIndex); n.normalize();
    if (opt.faceB) n.multiplyScalar(0.35).addScaledVector(opt.faceB, 0.65).normalize();
    // v3: texture 'up' (+v) = against gravity at the moment of the bite, so the drips run down the body
    let t2 = null;
    if (opt.downB) { t2 = opt.downB.clone().negate(); t2.addScaledVector(n, -t2.dot(n)); if (t2.lengthSq() < 1e-6) t2 = null; else t2.normalize(); }
    if (!t2) { t2 = new T.Vector3(0, 1, 0); if (Math.abs(n.y) > 0.8) t2.set(0, 0, 1); t2.addScaledVector(n, -t2.dot(n)).normalize(); }
    const t1 = new T.Vector3().crossVectors(t2, n).normalize();
    const P = [], N = [], UV = [], SI = [], SW = [];
    const A = new T.Vector3(), B = new T.Vector3(), C = new T.Vector3(), nn = new T.Vector3();
    const tri = idx ? idx.count / 3 : pos.count / 3;
    for (let f = 0; f < tri; f++) {
      const ia = idx ? idx.getX(f * 3) : f * 3, ib = idx ? idx.getX(f * 3 + 1) : f * 3 + 1, ic = idx ? idx.getX(f * 3 + 2) : f * 3 + 2;
      A.fromBufferAttribute(pos, ia); B.fromBufferAttribute(pos, ib); C.fromBufferAttribute(pos, ic);
      if (A.distanceTo(a) > R || B.distanceTo(a) > R || C.distanceTo(a) > R) continue;
      if (nn.fromBufferAttribute(nor, ia).dot(n) < 0.15) continue;                // only the outward shell facing the bite
      for (const vi of [ia, ib, ic]) {
        tv.fromBufferAttribute(pos, vi); nn.fromBufferAttribute(nor, vi);
        tv.addScaledVector(nn, (opt.lift ?? 0.006) * k);                         // v3: sits clearly above fur / barding
        P.push(tv.x, tv.y, tv.z); N.push(nn.x, nn.y, nn.z);
        const d = tv.clone().sub(a); UV.push(0.5 + d.dot(t1) / (2 * R), 0.5 + d.dot(t2) / (2 * R));
        SI.push(si.getX(vi), si.getY(vi), si.getZ(vi), si.getW(vi)); SW.push(sw.getX(vi), sw.getY(vi), sw.getZ(vi), sw.getW(vi));
      }
    }
    if (!P.length) return null;
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(P, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(N, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(UV, 2));
    g.setAttribute('skinIndex', new T.Uint16BufferAttribute(SI, 4)); g.setAttribute('skinWeight', new T.Float32BufferAttribute(SW, 4));
    const m = new T.SkinnedMesh(g, this._mat(-4, this.tex3)); m.frustumCulled = false; m.name = 'huntWound'; m.renderOrder = 2;
    mesh.parent.add(m); m.bind(mesh.skeleton, mesh.bindMatrix);
    const d = { m, grow: 0, rate: grow || 0.25, extra: !!opt.extra }; this.decals.push(d); return d;
  }
  // v6: a small sky for the blood to reflect (equirect canvas; three.js PMREMs it), shared by every hunt
  static _skyEnv(T) {
    if (HuntFX._env) return HuntFX._env;
    const W = 256, Hh = 128, c = document.createElement('canvas'); c.width = W; c.height = Hh; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, Hh); gr.addColorStop(0, '#4a6680'); gr.addColorStop(0.4, '#5d6b78'); gr.addColorStop(0.49, '#5f6862'); gr.addColorStop(0.53, '#3c4a2a'); gr.addColorStop(1, '#1c2412');
    g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
    const sun = g.createRadialGradient(W * 0.62, Hh * 0.2, 0, W * 0.62, Hh * 0.2, 22); sun.addColorStop(0, 'rgba(255,252,240,1)'); sun.addColorStop(0.35, 'rgba(255,246,220,0.9)'); sun.addColorStop(1, 'rgba(255,246,220,0)');
    g.fillStyle = sun; g.fillRect(0, 0, W, Hh);
    for (let i = 0; i < 9; i++) { g.fillStyle = 'rgba(255,255,255,0.22)'; g.beginPath(); g.ellipse((i * 53) % W, Hh * (0.18 + 0.05 * (i % 3)), 26, 6, 0, 0, 7); g.fill(); }
    const t = new T.CanvasTexture(c); t.mapping = T.EquirectangularReflectionMapping; t.colorSpace = T.SRGBColorSpace; HuntFX._env = t; return t;
  }
  _liquidPool(x, y, z, rmax) {
    const T = this.T; const [tx, nt, d] = HuntFX._poolTex(T, 1000 + this.pools.length * 7919 + ((Math.random() * 5000) | 0));
    const env = this.p.envMap || (this.p.poolEnv ? HuntFX._skyEnv(T) : null);
    const mk = (o) => new T.MeshPhysicalMaterial(Object.assign({ roughness: 0.07, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.03, ior: 1.36, specularIntensity: 0.7, specularColor: 0xff4a3a, envMap: env, envMapIntensity: 0.38 }, o));
    const mat = mk({ map: tx, normalMap: nt, normalScale: new T.Vector2(0.55, 0.55), alphaTest: 0.99, color: new T.Color(1.35, 1.1, 1.1), polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -6 });
    const G = 112, geo = new T.PlaneGeometry(2, 2, G, G), pa = geo.attributes.position, uv = geo.attributes.uv, n = pa.count, S = d.S;
    const samp = (arr, u, v) => { const fx = Math.min(S - 1.001, Math.max(0, u * S - 0.5)), fy = Math.min(S - 1.001, Math.max(0, (1 - v) * S - 0.5)); const x0 = fx | 0, y0 = fy | 0, ax = fx - x0, ay = fy - y0;
      return (arr[y0 * S + x0] * (1 - ax) + arr[y0 * S + x0 + 1] * ax) * (1 - ay) + (arr[(y0 + 1) * S + x0] * (1 - ax) + arr[(y0 + 1) * S + x0 + 1] * ax) * ay; };
    const hMax = 0.0045 * Math.sqrt(rmax / 0.45), Hgt = new Float32Array(n), Rev = new Float32Array(n);
    for (let i = 0; i < n; i++) { const u = uv.getX(i), v = uv.getY(i), f = samp(d.F, u, v); Hgt[i] = hMax * Math.sqrt(Math.min(1, f * 2.6)) * (0.85 + 0.15 * Math.min(1, f)); Rev[i] = samp(d.A, u, v); }
    const m = new T.Mesh(geo, mat); m.rotation.x = -Math.PI / 2; m.rotation.z = Math.random() * 6.28;
    m.position.set(x, y + 0.0015, z); m.scale.set(rmax * 1.25, rmax * (1.0 + Math.random() * 0.3), 1); m.updateMatrix(); m.matrixAutoUpdate = false; m.receiveShadow = true; m.name = 'huntPool';
    this.root.add(m);
    // satellite drops as domed beads (instanced, children of the pool so they share its placement)
    const bg = new T.SphereGeometry(1, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2); bg.rotateX(Math.PI / 2);
    const bm = mk({ color: 0x4a0606 }); const sats = d.sat, bead = new T.InstancedMesh(bg, bm, sats.length); bead.name = 'huntPoolBeads'; bead.frustumCulled = false; bead.receiveShadow = true;
    const sx = m.scale.x, sy = m.scale.y, bs = [];
    for (const [cx, cy, sr, sa, se, so] of sats) { const rw = sr * 2 * Math.min(sx, sy); const hz = Math.min(0.0042, Math.max(0.0012, rw * 0.42));
      bs.push({ x: (cx - 0.5) * 2, y: (0.5 - cy) * 2, rx: sr * 2 * se, ry: sr * 2, rot: -sa, h: hz, rev: so * 0.9 }); }
    m.add(bead); bead.count = sats.length;
    const pl = { m, grow: 0, rmax, splash: true, liquid: true, Hgt, Rev, bead, bs, lastThr: -1 }; this._liquidShape(pl, 1 - 0.015); this.pools.push(pl); return pl;
  }
  _liquidShape(pl, thr) {
    if (Math.abs(thr - pl.lastThr) < 0.004) return; pl.lastThr = thr;
    const pa = pl.m.geometry.attributes.position, n = pa.count, ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    for (let i = 0; i < n; i++) pa.setZ(i, pl.Hgt[i] * ss(thr, thr + 0.14, pl.Rev[i]));
    pa.needsUpdate = true; pl.m.geometry.computeVertexNormals();
    const o = new this.T.Object3D(); let k = 0;
    for (const b of pl.bs) { const g = ss(thr, thr + 0.08, b.rev); o.position.set(b.x, b.y, 0); o.rotation.set(0, 0, b.rot); o.scale.set(Math.max(1e-4, b.rx * g), Math.max(1e-4, b.ry * g), Math.max(1e-5, b.h * g)); o.updateMatrix(); pl.bead.setMatrixAt(k++, o.matrix); }
    pl.bead.instanceMatrix.needsUpdate = true;
  }
  addPool(x, y, z, rmax) {
    const T = this.T; if (!this.p.bloodDecals) return null;
    if (this.pools.length >= 2) return this.pools[this.pools.length - 1];
    if (this.p.poolStyle === 'liquid' && this.p.bloodStyle !== 'decal') return this._liquidPool(x, y, z, rmax);
    if (this.p.poolStyle === 'splash' && this.p.bloodStyle !== 'decal') {
      const [tx, nt] = HuntFX._poolTex(T, 1000 + this.pools.length * 7919 + ((Math.random() * 5000) | 0));
      const mat = new T.MeshStandardMaterial({ map: tx, normalMap: nt, normalScale: new T.Vector2(1.6, 1.6), alphaTest: 0.99, roughness: 0.1, metalness: 0.0, color: 0xffffff,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -6, depthWrite: true });
      const m = new T.Mesh(new T.PlaneGeometry(2, 2), mat); m.rotation.x = -Math.PI / 2; m.rotation.z = Math.random() * 6.28;
      m.position.set(x, y + 0.003, z); m.scale.set(rmax * 1.25, rmax * (1.0 + Math.random() * 0.3), 1); m.updateMatrix(); m.matrixAutoUpdate = false; m.receiveShadow = true; m.name = 'huntPool';
      this.root.add(m); const pl = { m, grow: 0, rmax, splash: true }; this.pools.push(pl); return pl;
    }
    const mat = this._mat(-6, this.tex); if (this.p.bloodStyle === 'decal') { mat.color.setRGB(2.3, 0.9, 0.9); mat.emissive.setHex(0x1a0000); } else { mat.color.setRGB(0.95, 0.3, 0.3); mat.emissive.setHex(0x000000); } mat.roughness = 0.22;   // v3: flat wet pool (irregular edge), not the lumpy wound texture
    const m = new T.Mesh(new T.CircleGeometry(1, 24), mat); m.rotation.x = -Math.PI / 2; m.rotation.z = Math.random() * 6.28;
    m.position.set(x, y + 0.004, z); m.scale.setScalar(rmax); m.updateMatrix(); m.matrixAutoUpdate = false; m.receiveShadow = true; m.name = 'huntPool';
    this.root.add(m); const pl = { m, grow: 0, rmax }; this.pools.push(pl); return pl;
  }
  spurt(p, n, count, speed, groundY) {
    if (!this.p.blood) return;
    for (let i = 0; i < count; i++) {
      if (this.parts.length >= this.pm.instanceMatrix.count) this.parts.shift();
      const r = new this.T.Vector3(Math.random() - 0.5, Math.random() * 0.6, Math.random() - 0.5);
      const v = n.clone().multiplyScalar(speed * (0.6 + Math.random() * 0.7)).addScaledVector(r, speed * 0.7);
      this.parts.push({ p: p.clone().addScaledVector(n, 0.01), v, life: 1.4, s: this.p.bloodStyle === 'decal' ? 0.009 + Math.random() * 0.012 : 0.0035 + Math.random() * 0.006, g: groundY });
    }
  }
  drip(p, groundY, s) {
    if (!this.p.blood) return; if (this.parts.length >= this.pm.instanceMatrix.count) return;
    this.parts.push({ p: p.clone(), v: new this.T.Vector3((Math.random() - 0.5) * 0.15, -0.1, (Math.random() - 0.5) * 0.15), life: 2.5, s: s || 0.007, g: groundY });
  }
  puff(p, count, groundY) {
    if (!this.p.feathers) return;
    for (let i = 0; i < count; i++) {
      if (this.feathers.length >= this.fm.instanceMatrix.count) this.feathers.shift();
      const a = Math.random() * 6.283, el = Math.random() * 1.2;
      const v = new this.T.Vector3(Math.cos(a) * Math.cos(el), Math.sin(el) + 0.3, Math.sin(a) * Math.cos(el)).multiplyScalar(0.8 + Math.random() * 1.4);
      this.feathers.push({ p: p.clone(), v, life: 3.5 + Math.random() * 2, s: 0.025 + Math.random() * 0.03, rot: new this.T.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6), spin: (Math.random() - 0.5) * 9, ph: Math.random() * 6, c: this.colors[(Math.random() * this.colors.length) | 0], g: groundY, rest: false });
    }
  }
  update(dt) {
    for (const sk of this.soaks) if (!sk.manual) sk.update(dt);
    const T = this.T; this.parent.updateMatrixWorld(); this.root.matrix.copy(this.parent.matrixWorld).invert(); this.root.matrixWorldNeedsUpdate = true;
    const d = this.dm; let n = 0; const up = new T.Vector3(0, 1, 0), vv = new T.Vector3();
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const q = this.parts[i]; q.life -= dt;
      if (q.life <= 0) { this.parts.splice(i, 1); continue; }
      if (!q.stuck) { q.v.y -= 9.8 * dt; q.p.addScaledVector(q.v, dt); if (q.p.y <= q.g + 0.003) { q.p.y = q.g + 0.003; q.stuck = true; q.life = Math.min(q.life, 0.35); if (this.onLand) this.onLand(q); } }
    }
    for (const q of this.parts) {
      d.position.copy(q.p); const sp = q.stuck ? 0 : q.v.length();
      if (sp > 0.05) { vv.copy(q.v).normalize(); d.quaternion.setFromUnitVectors(up, vv); } else d.quaternion.identity();
      const s = q.s * (q.stuck ? Math.max(0, q.life / 0.35) : 1);
      d.scale.set(s, q.stuck ? s * (this.p.poolStyle === 'liquid' ? 0.45 : 0.25) : s * (1 + Math.min(2.5, sp * 0.6)), s); d.updateMatrix(); this.pm.setMatrixAt(n++, d.matrix);
    }
    this.pm.count = n; this.pm.instanceMatrix.needsUpdate = true;
    let m = 0; const col = new T.Color();
    for (let i = this.feathers.length - 1; i >= 0; i--) { const f = this.feathers[i]; f.life -= dt; if (f.life <= 0) this.feathers.splice(i, 1); }
    for (const f of this.feathers) {
      if (!f.rest) {
        f.v.multiplyScalar(Math.exp(-dt * 3.2)); f.v.y -= 1.6 * dt; f.ph += dt * 5;
        f.p.addScaledVector(f.v, dt); f.p.x += Math.sin(f.ph) * 0.08 * dt; f.p.z += Math.cos(f.ph * 0.8) * 0.08 * dt;
        f.rot.x += f.spin * dt * 0.4; f.rot.y += f.spin * dt; f.rot.z = Math.sin(f.ph) * 0.6;
        if (f.p.y <= f.g + 0.004) { f.p.y = f.g + 0.004; f.rest = true; f.rot.set(-Math.PI / 2, f.rot.y, 0); }
      }
      d.position.copy(f.p); d.rotation.copy(f.rot); const s = f.s * Math.min(1, f.life / 0.6); d.scale.set(s, s, s); d.updateMatrix();
      this.fm.setMatrixAt(m, d.matrix); this.fm.setColorAt(m, col.setHex(f.c)); m++;
    }
    this.fm.count = m; this.fm.instanceMatrix.needsUpdate = true; if (this.fm.instanceColor) this.fm.instanceColor.needsUpdate = true;
    for (const w of this.decals) { if (w.grow < 1) { w.grow = Math.min(1, w.grow + dt * w.rate * (w.bleed ?? 1)); w.m.material.alphaTest = 1 - (0.03 + 0.95 * w.grow); } }
    for (const pl of this.pools) { pl.m.material.alphaTest = pl.splash ? 1 - (0.015 + 0.975 * Math.pow(Math.min(1, pl.grow), 0.8)) : 1 - (0.02 + 0.96 * Math.min(1, pl.grow)); if (pl.liquid) this._liquidShape(pl, pl.m.material.alphaTest); }
  }
  dispose() {
    this.root.parent && this.root.parent.remove(this.root);
    for (const w of this.decals) { w.m.parent && w.m.parent.remove(w.m); w.m.geometry.dispose(); w.m.material.dispose(); }
    for (const pl of this.pools) { pl.m.geometry.dispose(); if (pl.splash) { pl.m.material.map.dispose(); pl.m.material.normalMap.dispose(); } pl.m.material.dispose(); if (pl.bead) { pl.bead.geometry.dispose(); pl.bead.material.dispose(); pl.bead.dispose && pl.bead.dispose(); } }
    for (const sk of this.soaks) sk.dispose(); this.soaks = [];
    this.pm.geometry.dispose(); this.pm.material.dispose(); this.fm.geometry.dispose(); this.fm.material.dispose();
  }
}

class ContactRig {
  constructor(T, hunt) {
    this.T = T; this.h = hunt; const W = hunt.wolf.o, P = hunt.prey.o; this.W = W; this.P = P;
    this.v = Array.from({ length: 14 }, () => new T.Vector3()); this.q = Array.from({ length: 6 }, () => new T.Quaternion());
    const wb = n => W.getObjectByName(n); this.wb = wb;
    this.neck = ['neck1', 'neck2', 'head'].map(wb); this.jaw = wb('jaw'); this.jawL = wb('jawLower');
    this.spine = ['spine1', 'spine2'].map(wb);
    this.jawRest = this.jawL ? this.jawL.quaternion.clone() : null;
    // [swing, twist] limits (rad) from the clip pose: neck1, neck2, head
    this.neckLim = hunt.p.neckLimits || [[0.7, 0.14], [0.7, 0.14], [0.5, 0.16]];
    this.wMeshes = _skinMeshes(W); this.pMeshes = _skinMeshes(P);
    W.updateMatrixWorld(true); P.updateMatrixWorld(true);
    // ---- wolf contact points (bone-local, from the bind pose) ----
    // v3: the upper jaw may be skinned to 'jaw' (old wolves) or to the rigid skull 'head' (hunt-v3 wolves)
    const UPPER = ['jaw', 'head'];
    const tip = (boneName, pick) => {
      let best = null, bv = -1e9; const bnames = boneName === 'jaw' ? UPPER : [boneName];
      for (const m of this.wMeshes) {
        const bis = bnames.map(n => m.skeleton.bones.findIndex(b => b.name === n)).filter(i => i >= 0); if (!bis.length) continue;
        const dom = _dominant(m), pos = m.geometry.attributes.position, v = new T.Vector3();
        for (let i = 0; i < pos.count; i++) if (bis.includes(dom[i])) { const bi = dom[i]; v.fromBufferAttribute(pos, i).applyMatrix4(m.bindMatrix); const s = pick(v); if (s > bv) { bv = s; best = { m, bi, w: v.clone() }; } }
      }
      if (!best) return null;
      const loc = best.w.clone().applyMatrix4(new T.Matrix4().multiplyMatrices(best.m.skeleton.boneInverses[best.bi], new T.Matrix4())); // bind-world -> bone local
      return { bone: best.m.skeleton.bones[best.bi], local: loc };
    };
    this.lipU = tip('jaw', v => v.z); this.lipL = tip('jawLower', v => v.z);
    const zt = Math.max(this.lipU ? this.lipU.local.clone().applyMatrix4(this.lipU.bone.matrixWorld).z : 0, 0);
    const hp = [this.lipU, this.lipL, tip('jawLower', v => -v.y + (v.z > zt - 0.05 ? 0 : -9)), tip('jaw', v => v.y + (v.z > zt - 0.03 ? 0 : -9)),
                tip('jaw', v => v.x + (v.z > zt - 0.06 ? 0 : -9)), tip('jaw', v => -v.x + (v.z > zt - 0.06 ? 0 : -9)),
                tip('jawLower', v => v.x + (v.z > zt - 0.05 ? 0 : -9)), tip('jawLower', v => -v.x + (v.z > zt - 0.05 ? 0 : -9))];
    this.headPts = hp.filter(Boolean);
    for (const m of this.wMeshes) {
      const dom = _dominant(m), pos = m.geometry.attributes.position, v = new T.Vector3(); const cand = [];
      for (const bn of ['jaw', 'head', 'jawLower']) { const bi = m.skeleton.bones.findIndex(b => b.name === bn); if (bi < 0) continue;
        for (let i = 0; i < pos.count; i++) if (dom[i] === bi) { v.fromBufferAttribute(pos, i).applyMatrix4(m.bindMatrix); if (v.z > zt - 0.13) cand.push([bi, v.clone()]); } }
      const step = Math.max(1, Math.floor(cand.length / 60));
      for (let k = 0; k < cand.length; k += step) { const [bi, w] = cand[k]; this.headPts.push({ bone: m.skeleton.bones[bi], local: w.applyMatrix4(m.skeleton.boneInverses[bi]) }); }
    }
    // paw soles + down direction in foot-bone local space
    this.legs = {};
    for (const side of ['L', 'R']) for (const fr of ['f', 'h']) {
      const names = ['_up', '_lo', '_cn', '_ft'].map(s => fr + s + side), bones = names.map(wb); if (bones.some(b => !b)) continue;
      const m = this.wMeshes[0], bi = m.skeleton.bones.indexOf(bones[3]), dom = _dominant(m), pos = m.geometry.attributes.position, v = new T.Vector3();
      let miny = 1e9; const pts = [];
      for (let i = 0; i < pos.count; i++) if (dom[i] === bi) { v.fromBufferAttribute(pos, i).applyMatrix4(m.bindMatrix); pts.push(v.clone()); miny = Math.min(miny, v.y); }
      const sole = new T.Vector3(); let c = 0; for (const p of pts) if (p.y < miny + 0.012) { sole.add(p); c++; } sole.divideScalar(Math.max(1, c)); sole.y = miny;
      const inv = m.skeleton.boneInverses[bi];
      const soleL = sole.clone().applyMatrix4(inv), downL = new T.Vector3(0, -1, 0).transformDirection(inv);
      const fwdL = new T.Vector3(0, 0, 1).transformDirection(inv);
      const low = pts.filter(p => p.y < miny + 0.025), ext = f => low.reduce((a, b) => f(b) > f(a) ? b : a, low[0]);
      const biC = m.skeleton.bones.indexOf(bones[2]), invC = m.skeleton.boneInverses[biC], cpts = [];
      for (let i = 0; i < pos.count; i++) if (dom[i] === biC) cpts.push(v.fromBufferAttribute(pos, i).applyMatrix4(m.bindMatrix).clone());
      const pawPts = [sole, ext(p => p.z), ext(p => -p.z), ext(p => p.x), ext(p => -p.x)].map(p => ({ bone: bones[3], local: p.clone().applyMatrix4(inv) }));
      { const st = Math.max(1, Math.floor(pts.length / 30)); for (let k = 0; k < pts.length; k += st) pawPts.push({ bone: bones[3], local: pts[k].clone().applyMatrix4(inv) }); }
      { const st = Math.max(1, Math.floor(cpts.length / 18)); for (let k = 0; k < cpts.length; k += st) pawPts.push({ bone: bones[2], local: cpts[k].clone().applyMatrix4(invC) }); }
      this.legs[fr + side] = { bones, soleL, downL, fwdL, pawPts, front: fr === 'f', plant: null, step: null, anchor: null, prevAnchor: null, trans: 1, w: 0 };
    }
    // ---- collision proxies ----
    this.wS = _buildSpheres(T, W, { skipMesh: /mouth/i, pct: 0.97, size: 0.08 });
    this.pS = _buildSpheres(T, P, { pct: 0.985, size: 0.09 });
    const headSet = /^(head|jaw|jawLower|earL|earR)$/;
    this.wBody = this.wS.filter(s => !headSet.test(s.name) && !/^f_(cn|ft)/.test(s.name) && !/^h_(cn|ft)/.test(s.name));
    this.wHead = this.wS.filter(s => headSet.test(s.name));
    this.wPaw = this.wS.filter(s => /^f_(cn|ft)/.test(s.name));
    this.wBodyNoL = this.wBody.filter(s => !/^f_(up|lo)L$/.test(s.name)); this.wBodyNoR = this.wBody.filter(s => !/^f_(up|lo)R$/.test(s.name));
    this.wBodyNoF = this.wBody.filter(s => !/^f_(up|lo)[LR]$/.test(s.name));
    this.wLegL = this.wS.filter(s => /^f_(lo|cn)L$/.test(s.name)); this.wLegR = this.wS.filter(s => /^f_(lo|cn)R$/.test(s.name));
    this.wPawS = {}; for (const k of ['fL', 'fR', 'hL', 'hR']) { const re = new RegExp('^' + k[0] + '_(cn|ft|lo)' + k[1] + '$'); this.wPawS[k] = this.wS.filter(s => re.test(s.name)); }
    // reverse test spheres: skull / snout / chin proxies, but not the ones around the gape (prey skin between open jaws is the bite)
    { const near = (s) => { const L = s.bone === (this.lipU && this.lipU.bone) ? this.lipU.local : s.bone === (this.lipL && this.lipL.bone) ? this.lipL.local : null; return L ? s.c.distanceTo(L) < (hunt.p.gapeR || 0.055) : false; };
      this.wJawS = this.wS.filter(s => (/^(jaw|jawLower|head)$/.test(s.name) && !near(s)) || /^(earL|earR|neck2)$/.test(s.name)); }
    // v3: the neck and upper forearms are allowed to lean on the prey (their spheres are fatter than the skin; the exact
    // mesh tests below still hold the line) — otherwise they keep the jaw a few cm off the bite
    for (const s of this.wS) if (/^(neck1|neck2)$/.test(s.name)) s.tol = hunt.p.leanTol; else if (/^f_(up|lo|cn)[LR]$/.test(s.name)) s.tol = hunt.p.leanTol * 0.6;
    this.margin = hunt.p.collisionMargin;
    this.anchors = {}; this.cands = null;
    this.rootOff = new T.Vector3(); this.maxPen = 0; this.pushed = 0;
  }
  // ---- prey surface access ----
  _skinPos(m, i, out) { m.getVertexPosition(i, out); return out.applyMatrix4(m.matrixWorld); }
  _skinNor(m, i, out) {
    const T = this.T, geo = m.geometry, si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight, nb = this.v[12].fromBufferAttribute(geo.attributes.normal, i).transformDirection(m.bindMatrix);
    out.set(0, 0, 0); const M = this._M || (this._M = new T.Matrix4()), t = this.v[13];
    for (let k = 0; k < 4; k++) { const w = sw.getComponent(i, k); if (w <= 0) continue; const b = si.getComponent(i, k); M.multiplyMatrices(m.skeleton.bones[b].matrixWorld, m.skeleton.boneInverses[b]); t.copy(nb).transformDirection(M); out.addScaledVector(t, w); }
    return out.normalize();
  }
  // current-pose surface patch around a world point (bones culled by their proxy spheres)
  _boneVerts() {
    if (this._bv) return this._bv; const bv = new Map();
    for (const m of this.pMeshes) { const dom = _dominant(m), n = dom.length; for (let i = 0; i < n; i++) { const b = m.skeleton.bones[dom[i]]; let e = bv.get(b); if (!e) bv.set(b, e = []); e.push(m, i); } }
    this._bv = bv; return bv;
  }
  patchAt(a, center, R) {
    const bv = this._boneVerts(); _updSpheres(this.pS); const bones = new Set();
    for (const s of this.pS) if (s.w.distanceTo(center) < R + s.rw) bones.add(s.bone);
    const out = [], p = this.v[0]; let cnt = 0;
    for (const b of bones) { const e = bv.get(b); if (!e) continue; const step = e.length > 1600 ? 4 : 2;
      for (let k = 0; k < e.length; k += step) { if (!e[k].visible) continue; /* v4: hidden (folded) wing cards are not a surface */ this._skinPos(e[k], e[k + 1], p); if (p.distanceToSquared(center) < R * R) out.push(e[k], e[k + 1]); } }
    // keep at most ~260 points
    const st = Math.max(1, Math.floor(out.length / 2 / 260)); const nb = []; for (let k = 0; k < out.length; k += 2 * st) nb.push(out[k], out[k + 1]);
    a.pnb = nb; a.pc = center.clone(); a.pt = this.h.t; return a;
  }
  // local surface patch around an anchor (for exact skin-depth checks of teeth / claws)
  _patch(a) {
    if (!a || a.nb) return a; const T = this.T, pos = a.m.geometry.attributes.position, c = new T.Vector3().fromBufferAttribute(pos, a.i), v = new T.Vector3();
    const sc = a.m.matrixWorld.getMaxScaleOnAxis() || 1, R = 0.13 / sc, R2 = R * R; const nb = [];
    for (let i = 0; i < pos.count; i++) if (v.fromBufferAttribute(pos, i).distanceToSquared(c) < R2) nb.push(i);
    const step = Math.max(1, Math.floor(nb.length / 160)); a.nb = nb.filter((x, k) => k % step === 0); return a;
  }
  surfDepth(a, pts, _again) {                       // min signed distance of world points to the prey skin near them
    const p = this.v[0]; let best = 1e9;
    const sp = this._sp || (this._sp = []), sn = this._sn || (this._sn = []);
    const c = (this._sdc || (this._sdc = new this.T.Vector3())).set(0, 0, 0); for (const q of pts) c.add(q); c.divideScalar(pts.length || 1);
    let fresh = false;
    if (_again || !a.pnb || this.h.t - a.pt > 0.2 || a.pc.distanceTo(c) > 0.03) { this.patchAt(a, c.clone(), 0.2 * (this.W.scale.x || 1)); fresh = true; }
    const nb = a.pnb, N = nb.length / 2;
    for (let k = 0; k < N; k++) { if (!sp[k]) { sp[k] = new this.T.Vector3(); sn[k] = new this.T.Vector3(); } this._skinPos(nb[2 * k], nb[2 * k + 1], sp[k]); this._skinNor(nb[2 * k], nb[2 * k + 1], sn[k]); }
    let near = 0;
    for (const q of pts) {
      let bd = 1e9, bk = -1; for (let k = 0; k < N; k++) { const d = sp[k].distanceToSquared(q); if (d < bd) { bd = d; bk = k; } }
      if (bk < 0 || bd > (this.h.prof.surfR2 ?? 0.01)) continue; near++; const s = p.copy(q).sub(sp[bk]).dot(sn[bk]); if (s < best) best = s;
    }
    if (!near && !fresh) return this.surfDepth(a, pts, true);
    return best;
  }
  // reverse test: how deep do prey skin points (current patch) sit inside a set of wolf spheres (shrunk)
  revDepth(a, set, shrink) {
    if (!a || !a.pnb) return 0; _updSpheres(set); const sp = this._sp; const N = a.pnb.length / 2; let worst = 0;
    for (const s of set) { const r = s.rw * (shrink || 0.8); for (let k = 0; k < N && k < sp.length; k++) { const d = r - sp[k].distanceTo(s.w); if (d > worst) worst = d; } }
    return worst;
  }
  _wpts(list, out) { for (let i = 0; i < list.length; i++) { out[i] = (out[i] || new this.T.Vector3()).copy(list[i].local).applyMatrix4(list[i].bone.matrixWorld); } out.length = list.length; return out; }
  anchorWorld(a, pos, nor) { this._skinPos(a.m, a.i, pos); if (nor) this._skinNor(a.m, a.i, nor); return pos; }
  // pick a surface vertex: ray from a prey bone point along a prey-local direction (current pose)
  pickAnchor(spec) {
    const T = this.T, P = this.P; P.updateMatrixWorld(true);
    const b = P.getObjectByName(spec.bone); if (!b) return null;
    const o = b.getWorldPosition(new T.Vector3());
    if (spec.t && b.children.length) { const c = b.children.find(x => x.isBone) || b.children[0]; o.lerp(c.getWorldPosition(new T.Vector3()), spec.t); }
    const dir = new T.Vector3(...spec.dir).normalize().transformDirection(P.matrixWorld);
    const sc = P.matrixWorld.getMaxScaleOnAxis(); let tol = (spec.tol || 0.015) * sc;
    const p = new T.Vector3(), n = new T.Vector3();
    for (let pass = 0; pass < 4; pass++, tol *= 2) {
      let best = null, bt = 1e9;
      for (const m of this.pMeshes) {
        if (spec.mesh && !spec.mesh.test(m.name)) continue;
        const cnt = m.geometry.attributes.position.count;
        for (let i = 0; i < cnt; i++) {
          this._skinPos(m, i, p); const d = p.sub(o); const along = d.dot(dir); if (along <= 0) continue;
          const perp = d.addScaledVector(dir, -along).length(); if (perp > tol) continue;
          if (along < bt) { this._skinNor(m, i, n); if (n.dot(dir) < 0.3) continue; bt = along; best = { m, i, bone: spec.bone, name: spec.n || spec.bone, yaw: spec.yaw != null ? spec.yaw * Math.PI / 180 : null }; }
        }
      }
      if (best) return best;
    }
    return null;
  }
  // candidate set for paw placement (subsampled outer surface)
  _buildCands() {
    const out = []; for (const m of this.pMeshes) { const cnt = m.geometry.attributes.position.count, step = Math.max(1, Math.floor(cnt / 900)); for (let i = 0; i < cnt; i += step) out.push({ m, i }); }
    this.cands = out;
  }
  // choose the best paw anchor near where the paw naturally is (reachable from its shoulder, surface facing up / toward the wolf)
  choosePaw(leg, opts = {}) {
    const T = this.T; if (!this.cands) this._buildCands();
    const nat = this.v[0], sh = this.v[1], p = this.v[2], n = this.v[3], toW = this.v[4];
    this._sole(leg, nat); leg.bones[0].getWorldPosition(sh);
    const wolfC = this.W.position; const sc = this.W.scale.x; const reach = (opts.reach || 0.5) * sc; _updSpheres(this.pS);
    let best = null, bs = 1e9;
    for (const c of this.cands) {
      this._skinPos(c.m, c.i, p); if (p.distanceTo(sh) > reach) continue;
      this._skinNor(c.m, c.i, n); if (n.y < (opts.minUp ?? 0.35)) continue;
      toW.copy(wolfC).sub(p); toW.y = 0; toW.normalize(); if (n.dot(toW) < (opts.minToward ?? -0.2)) continue;
      const h = p.y - this.h.groundY(p.x, p.z); if (h < (opts.minH || 0.12) * this.P.scale.x) continue;
      let blocked = false; for (const t of [0.3, 0.55, 0.8]) { const q = this.v[5].copy(sh).lerp(p, t); for (const s of this.pS) if (s.w.distanceToSquared(q) < s.rw * s.rw * 0.6) { blocked = true; break; } if (blocked) break; }
      if (blocked) continue;
      let s = p.distanceTo(nat) - n.y * 0.05;
      if (opts.avoid) for (const a of opts.avoid) if (a && p.distanceTo(a) < 0.12 * sc) s += 1;
      if (s < bs) { bs = s; best = { m: c.m, i: c.i }; }
    }
    return best;
  }
  _sole(leg, out) { return out.copy(leg.soleL).applyMatrix4(leg.bones[3].matrixWorld); }
  mouth(out) {
    const a = this.v[5].copy(this.lipU.local).applyMatrix4(this.lipU.bone.matrixWorld);
    const b = this.v[6].copy(this.lipL.local).applyMatrix4(this.lipL.bone.matrixWorld);
    return out.copy(a).add(b).multiplyScalar(0.5);
  }
  setJaw(angle) { if (!this.jawL) return; const q = this.q[0].setFromAxisAngle(this.v[7].set(1, 0, 0), angle); this.jawL.quaternion.copy(this.jawRest).multiply(q); this.jawL.updateMatrixWorld(true); }
  // ---- IK ----
  legIKSafe(leg, target, w, nrm, alignW, anchor) {
    const hint = anchor && nrm ? (this._hint || (this._hint = new this.T.Vector3())).copy(nrm).multiplyScalar(0.8).add(this.v[10].set(0, 0, -0.6).transformDirection(this.W.matrixWorld)) : null;
    const tgt = this._lt || (this._lt = new this.T.Vector3()); tgt.copy(target);
    this.legIK(leg, tgt, w, nrm, alignW, hint);
    if (!anchor || !nrm || w < 0.5) return;
    const pts = this._pp || (this._pp = []); let lift = 0; const t = (this._lt2 || (this._lt2 = new this.T.Vector3())).copy(tgt);   // v3: own vector (v[13] was shared with the head IK → bogus reach errors dropped every grip)
    let d = 0;
    for (let it = 0; it < 3; it++) {
      d = this.surfDepth(anchor, this._wpts(leg.pawPts, pts));
      if (d >= 0.0015 - (this.h.p.pawPress && this.h.v5 ? (this.h.v5.pawSink || 0) : 0) || lift >= (this.h.prof.pawLiftMax ?? 1)) break; lift = Math.min(this.h.prof.pawLiftMax ?? 1, lift + 0.0025 - d); t.copy(tgt).addScaledVector(nrm, lift); this.legIK(leg, t, w, nrm, alignW, hint);
    }
    leg.depth = this.surfDepth(anchor, this._wpts(leg.pawPts, pts)); leg.reachErr = this._sole(leg, this.v[9]).distanceTo(t); leg.lift1 = lift;
    // forearm against the prey body away from the paw's own contact: lift the paw a little (capped)
    const set = leg.bones[0].name.endsWith('L') ? this.wLegL : this.wLegR;
    const ign = this._lig || (this._lig = new Map()); ign.clear(); const sp = this._sole(leg, this.v[9]).clone();
    for (const s of set) ign.set(s.name, sp);
    const lmax = this.h.prof.pawLiftMax ?? 0.06;   // v4: a bird is pressed down by the paw (its feathers dent) instead of the paw hovering over it
    for (let it = 0; it < 3 && lift < lmax; it++) {
      const pen = this.penetration(set, null, ign); if (pen < 0.006) break;
      lift = Math.min(lmax, lift + pen * 0.6 + 0.003); t.copy(tgt).addScaledVector(nrm, lift); this.legIK(leg, t, w, nrm, alignW, hint);
    }
    this.pawLift = lift; leg.lift = lift;
  }
  legIK(leg, target, w, nrm, alignW, hint) {
    if (w <= 0.001) return;
    const T = this.T, [A, B, C, F] = leg.bones, qa = this.q[1], qb = this.q[2], qc0 = this.q[3];
    const sA = A.quaternion.clone(), sB = B.quaternion.clone(), sC = C.quaternion.clone();
    C.getWorldQuaternion(qc0);
    if (nrm && alignW > 0) {        // tilt the paw so its sole lies on the surface
      const down = this.v[8].copy(leg.downL).transformDirection(F.matrixWorld);
      const want = this.v[9].copy(nrm).negate();
      const qt = this.q[4].setFromUnitVectors(down, want); qt.slerp(this.q[5].identity(), 1 - alignW); qc0.premultiply(qt);
    }
    _setWorldQuat(T, C, qc0, this.q[5]);   // orient foot first so the sole offset is right
    const pa = A.getWorldPosition(this.v[0]), pb = B.getWorldPosition(this.v[1]), pc = C.getWorldPosition(this.v[2]);
    const sole = this._sole(leg, this.v[3]);
    const cT = this.v[4].copy(target).sub(sole).add(pc);
    const l1 = pb.distanceTo(pa), l2 = pc.distanceTo(pb);
    const dv = this.v[5].copy(cT).sub(pa); let d = dv.length(); const u = dv.divideScalar(d || 1);
    d = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(d, (l1 + l2) * 0.9995));
    const k = this.v[6].copy(pb).sub(pa); k.addScaledVector(u, -k.dot(u));
    if (k.lengthSq() < 1e-8) { k.set(0, 0, leg.front ? -1 : 1).transformDirection(this.W.matrixWorld); k.addScaledVector(u, -k.dot(u)); }
    k.normalize();
    if (hint) { const hh = this.v[11].copy(hint); hh.addScaledVector(u, -hh.dot(u)); if (hh.lengthSq() > 1e-6) { k.lerp(hh.normalize(), 0.75); k.addScaledVector(u, -k.dot(u)).normalize(); } }
    const cosA = Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))), sinA = Math.sqrt(1 - cosA * cosA);
    const pbN = this.v[7].copy(pa).addScaledVector(u, cosA * l1).addScaledVector(k, sinA * l1);
    qa.setFromUnitVectors(this.v[8].copy(pb).sub(pa).normalize(), this.v[9].copy(pbN).sub(pa).normalize());
    _rotWorld(T, A, qa, this.q[4], this.q[5]);
    B.getWorldPosition(pb); C.getWorldPosition(pc);
    const cTc = this.v[10].copy(pa).addScaledVector(u, d);
    qb.setFromUnitVectors(this.v[8].copy(pc).sub(pb).normalize(), this.v[9].copy(cTc).sub(pb).normalize());
    _rotWorld(T, B, qb, this.q[4], this.q[5]);
    _setWorldQuat(T, C, qc0, this.q[5]);
    if (w < 0.999) { A.quaternion.slerpQuaternions(sA, A.quaternion, w); B.quaternion.slerpQuaternions(sB, B.quaternion, w); C.quaternion.slerpQuaternions(sC, C.quaternion, w); A.updateMatrixWorld(true); }
  }
  // ---- v3: natural head/neck limits ----
  // the clip pose of neck1/neck2/head is the reference; IK may swing each joint only so far from it and may barely twist it,
  // so the skull never folds back on the neck, rolls onto its side or collapses (Mustafa: "the head looks crippled when it bites")
  captureNeckRef() { const r = this._nref || (this._nref = this.neck.map(() => new this.T.Quaternion())); this.neck.forEach((b, i) => r[i].copy(b.quaternion)); this._nrefOk = true; }
  _neckAxes() {
    if (this._nax) return this._nax; const T = this.T, [n1, n2, hd] = this.neck;
    const ax = [n2.position.clone().normalize(), hd.position.clone().normalize(), null];
    // head: snout direction in head-local space (bind pose)
    const m = this.wMeshes[0], bi = m.skeleton.bones.indexOf(hd);
    const lw = this.lipU.local.clone().applyMatrix4(m.skeleton.boneInverses[this.lipU.bone === hd ? bi : m.skeleton.bones.indexOf(this.lipU.bone)].clone().invert()); // bind-world
    ax[2] = lw.applyMatrix4(m.skeleton.boneInverses[bi]).normalize();
    this._nax = ax; return ax;
  }
  clampJoint(i) {
    if (!this._nrefOk) return; const T = this.T, b = this.neck[i], r = this._nref[i], lim = this.neckLim[i];
    const d = this._cq || (this._cq = new T.Quaternion()); d.copy(r).invert().multiply(b.quaternion); if (d.w < 0) { d.x = -d.x; d.y = -d.y; d.z = -d.z; d.w = -d.w; }
    const a = this._neckAxes()[i]; const p = d.x * a.x + d.y * a.y + d.z * a.z;
    const tw = this._tq || (this._tq = new T.Quaternion()); tw.set(a.x * p, a.y * p, a.z * p, d.w); const tl = tw.length(); if (tl < 1e-9) tw.identity(); else tw.normalize();
    const sw = this._sq || (this._sq = new T.Quaternion()); sw.copy(d).multiply(tw.clone().invert());
    let changed = false; const I = this._iq || (this._iq = new T.Quaternion());
    const ta = 2 * Math.acos(Math.min(1, Math.abs(tw.w))); if (ta > lim[1]) { tw.slerp(I.identity(), 1 - lim[1] / ta); changed = true; }
    const sa = 2 * Math.acos(Math.min(1, Math.abs(sw.w))); if (sa > lim[0]) { sw.slerp(I.identity(), 1 - lim[0] / sa); changed = true; }
    if (changed) { b.quaternion.copy(r).multiply(sw).multiply(tw); b.updateMatrixWorld(true); }
    this.neckDev = this.neckDev || [0, 0, 0, 0, 0, 0]; this.neckDev[i * 2] = Math.min(sa, lim[0]); this.neckDev[i * 2 + 1] = Math.min(ta, lim[1]);
  }
  legRide(all) {       // vertical lift that clears the wolf body proxies from the prey's leg proxies (all prey proxies while it goes down), capped
    _updSpheres(this.wBody); _updSpheres(this.pS); let need = 0;
    for (const b of this.pS) { if (!all && !/^(h|f)_/.test(b.name) && !/leg|thigh|shin/i.test(b.name)) continue;
      for (const a of this.wBody) { if (/^f_/.test(a.name) || (!all && /^h_/.test(a.name))) continue; const R = a.rw + b.rw + this.margin; const dx = a.w.x - b.w.x, dz = a.w.z - b.w.z, h2 = dx * dx + dz * dz; if (h2 >= R * R) continue;
        const dy = a.w.y - b.w.y; const want = Math.sqrt(R * R - h2) - dy; if (want > need) need = want; } }
    return Math.min(need, all ? this.h.p.hopMax : this.h.p.rideMax);
  }
  clampNeck() { for (let i = 0; i < 3; i++) this.clampJoint(i); }
  headIKSafe(target, w, nrm, alignW, offs, anchor) {   // head IK, then lift off along the normal until no lip / tooth point is inside the skin
    const t = this.v[13].copy(target); this.headLift = 0;
    this.headIK(t, w, nrm, alignW, offs);
    if (!anchor || !nrm || w < 0.5) return;
    const pts = this._hp || (this._hp = []);
    for (let it = 0; it < 3; it++) {
      const d = this.surfDepth(anchor, this._wpts(this.headPts, pts)), sk = this.h.p.biteSink || 0;
      if (d >= -sk - 0.0015) break;
      const up = -sk + 0.001 - d; this.headLift += up; const tt = this.v[12].copy(target).addScaledVector(nrm, this.headLift);
      this.headIK(tt, w, nrm, alignW, null);
    }
  }
  headIK(target, w, nrm, alignW, offs) {
    if (w <= 0.001 && !offs) return;
    const T = this.T, [n1, n2, hd] = this.neck; const s = this.neck.map(b => b.quaternion.clone());
    // 1) orient the head: snout into the surface (along -normal), plus maul offsets (shake / tug)
    const m = this.mouth(this.v[0]), hp = hd.getWorldPosition(this.v[1]);
    if (nrm && alignW > 0) {
      const sn = this.v[2].copy(m).sub(hp).normalize(), want = this.v[3].copy(nrm).negate();
      const q = this.q[1].setFromUnitVectors(sn, want); q.slerp(this.q[2].identity(), 1 - alignW * w); _rotWorld(T, hd, q, this.q[3], this.q[4]);
    }
    if (nrm && w > 0.5) {             // lip line (upper→lower tip) perpendicular to the surface normal: both jaws meet the skin
      const a = this.v[2].copy(this.lipU.local).applyMatrix4(this.lipU.bone.matrixWorld), b = this.v[3].copy(this.lipL.local).applyMatrix4(this.lipL.bone.matrixWorld);
      const ln = a.sub(b).normalize(), proj = this.v[4].copy(ln).addScaledVector(nrm, -ln.dot(nrm));
      if (proj.lengthSq() > 1e-6) { proj.normalize(); _rotWorld(T, hd, this.q[1].setFromUnitVectors(ln, proj), this.q[3], this.q[4]); }
    }
    if (offs) {
      const sn = this.v[2].copy(this.mouth(this.v[0])).sub(hd.getWorldPosition(this.v[1])).normalize();
      if (offs.roll) _rotWorld(T, hd, this.q[1].setFromAxisAngle(sn, offs.roll), this.q[3], this.q[4]);
      if (offs.yaw) _rotWorld(T, hd, this.q[1].setFromAxisAngle(this.v[3].set(0, 1, 0), offs.yaw), this.q[3], this.q[4]);
    }
    this.clampJoint(2);
    // 2) CCD on neck1 / neck2 / head to bring the lips onto the target
    if (w > 0.001) {
      const lim = [0.35, 0.35, 0.18];
      for (let it = 0; it < 10; it++) {
        for (let j = 2; j >= 0; j--) {
          const b = this.neck[j], jp = b.getWorldPosition(this.v[4]), e = this.mouth(this.v[5]);
          const a = this.v[6].copy(e).sub(jp).normalize(), c = this.v[7].copy(target).sub(jp).normalize();
          const q = this.q[1].setFromUnitVectors(a, c); const ang = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
          if (ang > lim[j]) q.slerp(this.q[2].identity(), 1 - lim[j] / ang);
          _rotWorld(T, b, q, this.q[3], this.q[4]); this.clampJoint(j);
        }
        if (this.mouth(this.v[5]).distanceTo(target) < 0.002) break;
      }
      if (w < 0.999) { this.neck.forEach((b, i) => b.quaternion.slerpQuaternions(s[i], b.quaternion, w)); n1.updateMatrixWorld(true); }
    }
    this.clampNeck();
  }
  // overlay rotation on a bone in the wolf's own frame (pitch about the wolf's side axis)
  pitchBone(b, ang) { if (!b || !ang) return; const ax = this.v[11].set(1, 0, 0).transformDirection(this.W.matrixWorld); _rotWorld(this.T, b, this.q[1].setFromAxisAngle(ax, ang), this.q[3], this.q[4]); }
  // ---- collisions (sphere proxies) ----
  penetration(set, outPush, ign) {
    _updSpheres(set); _updSpheres(this.pS);
    const bx = this._pbox || (this._pbox = new this.T.Box3()); bx.makeEmpty(); let rmax = 0;
    for (const b of this.pS) { bx.expandByPoint(b.w); if (b.rw > rmax) rmax = b.rw; }
    bx.expandByScalar(rmax + this.margin);
    let maxd = 0; outPush && outPush.set(0, 0, 0); const d = this.v[8];
    for (const a of set) { if (bx.distanceToPoint(a.w) > a.rw) continue; const ig = ign && ign.get(a.name); for (const b of this.pS) {
      if (ig && b.w.distanceToSquared(ig) < (b.rw + 0.06) * (b.rw + 0.06)) continue;
      d.subVectors(a.w, b.w); const dist = d.length(); const pen = a.rw + b.rw + this.margin - dist - (a.tol || 0);
      if (pen > 0) { if (pen > maxd) maxd = pen; if (outPush) { d.y = 0; const h = d.length(); if (h > 1e-5) outPush.addScaledVector(d, pen / Math.max(h, dist * 0.35) / Math.max(h, 1e-5)); } }
    } }
    return maxd;
  }
}

export class WolfHunt {
  constructor(THREE, opts) {
    this.T = THREE;
    this.p = Object.assign({}, HUNT_DEFAULTS, opts.params || {});
    this.groundY = opts.groundY || (() => 0);
    this.avoid = opts.avoid || null;
    this.onEvent = opts.onEvent || (() => {});
    this.wolf = this._actor(opts.wolf);
    this.prey = this._actor(opts.prey);
    this.prof = Object.assign({}, PREY_PROFILES[opts.prey.kind || 'deer'], opts.prey.profile || {});
    // v5: per-prey tuning, applied only where the caller did not set the value itself
    { const v5 = this.prof.v5 || {}, up = opts.params || {}, pp = opts.prey.profile || {}; this.v5 = v5;
      if (this.p.deepBite) { for (const k of ['biteSink', 'gapeR']) if (v5[k] != null && up[k] == null) this.p[k] = v5[k];
        for (const k of ['dentBite', 'dentBiteR']) if (v5[k] != null && pp[k] == null) this.prof[k] = v5[k]; }
      if (this.p.pawPress && v5.pawSink != null && pp.pawLiftMax == null) this.prof.pawLiftMax = v5.pawLiftMax ?? this.prof.pawLiftMax;
      if (this.p.bloodStyle !== 'decal' && v5.woundR && pp.woundR == null) this.prof.woundR = v5.woundR;
      if (this.p.poolStyle === 'splash' && v5.poolR && pp.poolR == null) this.prof.poolR = v5.poolR; }
    if (this.prof.grab === 'body') this._buildRoosterClips();
    if (this.p.capHoles && this.prof.grab === 'body') this._capHoles();
    this.prey.speed = 0; this.wolf.speed = 0;
    this.wolf.state = 'stalk'; this.prey.state = 'unaware';
    this.t = 0; this.chaseTime = 0; this.tired = false; this.held = 0; this.done = false; this.outcome = null;
    this.wanderPhase = this.p.rng() * 100;
    this.rig = this.p.contact ? new ContactRig(THREE, this) : null;   // built before _measure (captures the rest jaw)
    this._measure();
    this.fx = null; this.ctl = { bite: 0, paws: 0, lift: 0.14, jaw: 0.06, jawCur: 0.06, spot: null, roll: 0, yaw: 0, tug: 0, side: 0 };
    this.maul = { t: 0, ph: 0, pt: 0, spotI: 0 }; this.contactW = 0; this.wounds = new Map(); this.dripT = 0; this.metrics = { gaps: {} };
    this._play(this.wolf, 'Walk', { fade: 0.2 });
    const idle = this.prof.idle.find(n => this.prey.clips[n]);
    if (idle) this._play(this.prey, idle, { fade: 0.2 });
  }

  get state() { return { wolf: this.wolf.state, prey: this.prey.state }; }

  // v5: open holes in the bird mesh (the vent under the tail of the r7/r8 rooster) are closed with a skinned feather dome:
  // boundary loops found by welding the mesh, a two-ring dome bulging out of the body, weights / UVs taken from the rim,
  // added as a SkinnedMesh on the same skeleton and bind matrix (it bends, soaks and dents with the bird). Hunt-only, no GLB change.
  _capHoles() {
    const T = this.T, P = this.prey.o; this.caps = [];
    for (const m of _skinMeshes(P)) {
      if (WING_RE.test(m.name) || /_wings/i.test(m.name)) continue;
      const g = m.geometry, pos = g.attributes.position, ix = g.index, uv = g.attributes.uv, si = g.attributes.skinIndex, sw = g.attributes.skinWeight; if (!ix || !si) continue;
      const n = pos.count, key = new Map(), wid = new Int32Array(n);
      for (let i = 0; i < n; i++) { const k = Math.round(pos.getX(i) * 1e4) + ',' + Math.round(pos.getY(i) * 1e4) + ',' + Math.round(pos.getZ(i) * 1e4); let w = key.get(k); if (w === undefined) { key.set(k, i); w = i; } wid[i] = w; }
      const I = ix.array, cnt = new Map();
      for (let t = 0; t < I.length; t += 3) for (let e = 0; e < 3; e++) { const a = wid[I[t + e]], b = wid[I[t + (e + 1) % 3]]; if (a === b) continue; const k = a < b ? a + '_' + b : b + '_' + a; cnt.set(k, (cnt.get(k) || 0) + 1); }
      const adj = new Map(); for (const [k, c] of cnt) if (c === 1) { const [a, b] = k.split('_').map(Number); (adj.get(a) || adj.set(a, []).get(a)).push(b); (adj.get(b) || adj.set(b, []).get(b)).push(a); }
      const seen = new Set(), bones = m.skeleton.bones, center = new T.Vector3(); g.computeBoundingBox(); g.boundingBox.getCenter(center);
      for (const s of adj.keys()) {
        if (seen.has(s)) continue; const comp = [], st = [s]; seen.add(s);
        while (st.length) { const x = st.pop(); comp.push(x); for (const y of adj.get(x)) if (!seen.has(y)) { seen.add(y); st.push(y); } }
        if (comp.length < 6) continue;
        // order the rim by angle around its centre in its own plane (the vent rim is star-shaped)
        const cc = new T.Vector3(); comp.forEach(i => cc.add(new T.Vector3().fromBufferAttribute(pos, i))); cc.divideScalar(comp.length);
        const od = cc.clone().sub(center).normalize(), ua = new T.Vector3().crossVectors(od, Math.abs(od.y) < 0.9 ? new T.Vector3(0, 1, 0) : new T.Vector3(1, 0, 0)).normalize(), va = new T.Vector3().crossVectors(od, ua);
        const loop = comp.map(i => { const d = new T.Vector3().fromBufferAttribute(pos, i).sub(cc); return [i, Math.atan2(d.dot(va), d.dot(ua))]; }).sort((a, b) => a[1] - b[1]).map(e => e[0]);
        let tw = 0; for (const i of loop) for (let k = 0; k < 4; k++) if (/tail/i.test(bones[si.getComponent(i, k)].name)) tw += sw.getComponent(i, k) / loop.length;
        // every open rim of the body shell: the vent under the tail and the two hip sockets the thighs come out of (all show as see-through holes when the bird lies on its back);
        // rims that belong to the lower legs (open shin tubes on the lite mesh) are left alone
        let lw = 0; for (const i of loop) for (let k = 0; k < 4; k++) if (/knee|ankle|toe|shin|foot/i.test(bones[si.getComponent(i, k)].name)) lw += sw.getComponent(i, k) / loop.length;
        if (lw > 0.35) continue;
        const L = loop.length, P0 = loop.map(i => new T.Vector3().fromBufferAttribute(pos, i)), c = new T.Vector3(); P0.forEach(p => c.add(p)); c.divideScalar(L);
        let r = 0; P0.forEach(p => { r = Math.max(r, p.distanceTo(c)); });
        const nrm = new T.Vector3(); for (let j = 0; j < L; j++) { const a = P0[j], b = P0[(j + 1) % L]; nrm.x += (a.y - b.y) * (a.z + b.z); nrm.y += (a.z - b.z) * (a.x + b.x); nrm.z += (a.x - b.x) * (a.y + b.y); }
        nrm.normalize(); const outD = c.clone().sub(center).normalize(); if (nrm.dot(outD) < 0) nrm.negate();
        // vertices: rim (shared positions), a lip just outside the rim, an inner ring, the apex — a soft feather mass
        const V = [], UV = [], SI = [], SW = [], tri = [];
        const rimW = loop.map(i => [[0, 1, 2, 3].map(k => si.getComponent(i, k)), [0, 1, 2, 3].map(k => sw.getComponent(i, k))]);
        const acc = new Map(); rimW.forEach(([a, b]) => a.forEach((bi, k) => acc.set(bi, (acc.get(bi) || 0) + b[k])));
        const top = [...acc.entries()].sort((x, y) => y[1] - x[1]).slice(0, 4), ts = top.reduce((s, e) => s + e[1], 0);
        const apexW = [top.map(e => e[0]).concat([0, 0, 0, 0]).slice(0, 4), top.map(e => e[1] / ts).concat([0, 0, 0, 0]).slice(0, 4)];
        const uvs = loop.map(i => uv ? [uv.getX(i), uv.getY(i)] : [0, 0]), um = uvs.reduce((s, u) => [s[0] + u[0] / L, s[1] + u[1] / L], [0, 0]);
        const spread = Math.max(...uvs.map(u => Math.hypot(u[0] - um[0], u[1] - um[1]))), uIn = spread < 0.12 ? um : uvs[0];
        const hsh = j => { const x = Math.sin(j * 12.9898 + L * 78.233) * 43758.5453; return x - Math.floor(x); };
        const push = (p, u, w) => { V.push(p.x, p.y, p.z); UV.push(u[0], u[1]); SI.push(...w[0]); SW.push(...w[1]); return V.length / 3 - 1; };
        const rim = [], lip = [], ring = [];
        for (let j = 0; j < L; j++) {
          const p = P0[j], rad = p.clone().sub(c);
          rim.push(push(p.clone().addScaledVector(nrm, -0.04 * r), uvs[j], rimW[j]));
          lip.push(push(p.clone().addScaledVector(rad, 0.1).addScaledVector(nrm, (0.1 + 0.06 * hsh(j)) * r), uvs[j], rimW[j]));
          const q = c.clone().lerp(p, 0.55).addScaledVector(nrm, (0.36 + 0.12 * hsh(j + 7)) * r);
          ring.push(push(q, [uvs[j][0] * 0.5 + uIn[0] * 0.5, uvs[j][1] * 0.5 + uIn[1] * 0.5], rimW[j]));
        }
        const apex = push(c.clone().addScaledVector(nrm, 0.5 * r), uIn, apexW);
        for (let j = 0; j < L; j++) { const k = (j + 1) % L;
          tri.push(rim[j], rim[k], lip[k], rim[j], lip[k], lip[j], lip[j], lip[k], ring[k], lip[j], ring[k], ring[j], ring[j], ring[k], apex); }
        const cg = new T.BufferGeometry();
        cg.setAttribute('position', new T.Float32BufferAttribute(V, 3)); cg.setAttribute('uv', new T.Float32BufferAttribute(UV, 2));
        cg.setAttribute('skinIndex', new T.Uint16BufferAttribute(SI, 4)); cg.setAttribute('skinWeight', new T.Float32BufferAttribute(SW, 4));
        // wind every triangle so it faces out of the body
        const A = new T.Vector3(), B = new T.Vector3(), C = new T.Vector3(), N = new T.Vector3(), M = new T.Vector3();
        for (let t = 0; t < tri.length; t += 3) { A.fromArray(V, tri[t] * 3); B.fromArray(V, tri[t + 1] * 3); C.fromArray(V, tri[t + 2] * 3);
          N.subVectors(B, A).cross(M.subVectors(C, A)); M.copy(A).add(B).add(C).divideScalar(3).sub(c).addScaledVector(nrm, r * 0.6);
          if (N.dot(M) < 0) { const x = tri[t + 1]; tri[t + 1] = tri[t + 2]; tri[t + 2] = x; } }
        cg.setIndex(tri); cg.computeVertexNormals();
        const mat = (Array.isArray(m.material) ? m.material[0] : m.material).clone(); mat.side = T.DoubleSide;
        const cap = new T.SkinnedMesh(cg, mat); cap.name = m.name + '_holeCap'; cap.castShadow = m.castShadow; cap.receiveShadow = m.receiveShadow; cap.frustumCulled = false;
        m.parent.add(cap); cap.position.copy(m.position); cap.quaternion.copy(m.quaternion); cap.scale.copy(m.scale); cap.bind(m.skeleton, m.bindMatrix);
        this.caps.push({ cap, host: m, rimN: L, r });
      }
    }
  }

  // ---------- actors & clips ----------
  _actor(a) {
    const T = this.T;
    const mixer = a.mixer || new T.AnimationMixer(a.object);
    mixer.stopAllAction();
    const clips = {}; for (const c of a.clips) clips[c.name] = c;
    return { o: a.object, mixer, clips, cur: [], acts: {}, yaw: a.object.rotation.y, vel: new T.Vector3() };
  }
  _split(clip, keepWings, name) {
    const tracks = clip.tracks.filter(t => WING_RE.test(t.name.split('.')[0]) === keepWings);
    return new this.T.AnimationClip(name, clip.duration, tracks);
  }
  _buildRoosterClips() {
    const c = this.prey.clips, walk = c.Walk, flap = c.Flap, death = c.Death;
    // flee: legs/body from Walk, wings from Flap (frantic run-flap)
    c['@roosterFlee'] = [this._split(walk, false, 'rfWalk'), this._split(flap, true, 'rfFlap')];
    // down: body falls over (Death body), wings keep flapping = struggling under the wolf
    c['@roosterDown'] = [this._split(death, false, 'rdBody'), this._split(flap, true, 'rdFlap')];
    c['@roosterDead'] = [this._split(death, false, 'rdBody2'), this._split(death, true, 'rdWings')];
  }
  _play(A, name, o = {}) {
    const T = this.T;
    let clips = A.clips[name]; if (!clips) return null;
    if (!Array.isArray(clips)) clips = [clips];
    const fade = o.fade ?? 0.2;
    const acts = clips.map(clip => {
      const act = A.mixer.clipAction(clip);
      act.enabled = true; act.reset();
      act.setLoop(o.once ? T.LoopOnce : T.LoopRepeat, Infinity);
      act.clampWhenFinished = !!o.once;
      act.timeScale = o.timeScale ?? 1;
      if (o.startAt) act.time = o.startAt;
      act.setEffectiveWeight(1);
      return act;
    });
    for (const old of A.cur) if (!acts.includes(old)) old.fadeOut(fade);
    for (const act of acts) { act.play(); if (A.cur.length && fade > 0) act.fadeIn(fade); }
    A.cur = acts; A.curName = name;
    return acts[0];
  }
  _time(A) { return A.cur.length ? A.cur[0].time : 0; }
  _setScale(A, s) { for (const a of A.cur) a.timeScale = s; }

  // measure rig offsets once: wolf mouth reach while eating, prey grab point while lying
  _measure() {
    const T = this.T, W = this.wolf, P = this.prey;
    const sample = (A, clipName, t, boneNames) => {
      const o = A.o, saved = { p: o.position.clone(), r: o.rotation.y };
      o.position.set(0, 0, 0); o.rotation.y = 0;
      const tmp = new T.AnimationMixer(o);
      let clips = A.clips[clipName]; clips = Array.isArray(clips) ? clips : [clips];
      for (const c of clips) { const a = tmp.clipAction(c); a.play(); }
      tmp.setTime(t); o.updateMatrixWorld(true);
      const out = [];
      for (const n of boneNames) { const b = o.getObjectByName(n); if (b) out.push(b.getWorldPosition(new T.Vector3())); }
      tmp.stopAllAction(); tmp.uncacheRoot(o);
      o.position.copy(saved.p); o.rotation.y = saved.r; o.updateMatrixWorld(true);
      return out;
    };
    const m = sample(W, 'Eat', 0.3, ['jawLower', 'jaw', 'head']);
    this.mouth = m[0] || new T.Vector3(0, 0.27, 0.53);           // wolf-local mouth point while head is down
    let g;
    const sc = P.o.scale.x;
    if (this.prof.grabPoint) {
      g = new T.Vector3(...this.prof.grabPoint).multiplyScalar(sc);
    } else if (this.prof.grab === 'throat') {
      const lying = this.prof.struggle;
      const q = sample(P, lying, 0, ['neck1', 'neck2', 'head']);
      g = q[0].clone().lerp(q[1], 0.75);                          // upper throat, lying pose
      const ref = sample(P, lying, 0, ['spine2'])[0];
      g.x += (this.prof.grabShift || 0) * P.o.scale.x;            // toward the back of the neck (the wolf's side)
      this._preyRef = ref;
    } else {
      const q = sample(P, '@roosterDown', P.clips.Death.duration * 0.999, ['pelvis', 'chest']);
      g = q[0].clone().lerp(q[1] || q[0], 0.5);
    }
    this.grabLocal = g;                                          // prey-local grab point
    const a = this.prof.pinYawDeg * Math.PI / 180;
    this.pinYaw = a;                                             // wolf yaw relative to prey yaw while holding
    // wolf origin in prey-local space while holding: grab point minus the rotated mouth reach
    const reach = this.mouth.z + (this.prof.mouthGap || 0);
    this.pinLocal = new T.Vector3(g.x - Math.sin(a) * reach, 0, g.z - Math.cos(a) * reach);
    const il = this.prof.impactLocal;
    this.impactLocal = il ? new T.Vector3(il[0] * sc, 0, il[1] * sc) : this.pinLocal.clone();
    this.impactYaw = this.prof.impactYawDeg != null ? this.prof.impactYawDeg * Math.PI / 180 : this.pinYaw;
    const wp = this.prof.waypoint;
    this.path = wp ? [new T.Vector3(wp[0] * sc, 0, wp[1] * sc), this.pinLocal.clone()] : null;
  }

  // ---------- helpers ----------
  _fwd(yaw) { return new this.T.Vector3(Math.sin(yaw), 0, Math.cos(yaw)); }
  _toLocal(w, pos, yaw) { const c = Math.cos(yaw), s = Math.sin(yaw), dx = w.x - pos.x, dz = w.z - pos.z; return new this.T.Vector3(dx * c - dz * s, 0, dx * s + dz * c); }
  _toLocalP(w) { const P = this.P || this.prey; const yaw = P.yaw, c = Math.cos(yaw), s = Math.sin(yaw); const dx = w.x - P.o.position.x, dz = w.z - P.o.position.z; return new this.T.Vector3(dx * c - dz * s, 0, dx * s + dz * c); }
  _toWorld(local, pos, yaw) { const c = Math.cos(yaw), s = Math.sin(yaw); return new this.T.Vector3(pos.x + local.x * c + local.z * s, 0, pos.z - local.x * s + local.z * c); }
  _turn(A, want, rate, dt) { let d = want - A.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); A.yaw += Math.max(-rate * dt, Math.min(rate * dt, d)); }
  _apply(A) { A.o.position.y = this.groundY(A.o.position.x, A.o.position.z); A.o.rotation.y = A.yaw; }
  _dist() { return this.wolf.o.position.distanceTo(this.prey.o.position); }
  _event(n, x) { this.onEvent(n, Object.assign({ t: this.t }, x || {})); }

  // ---------- main update ----------
  update(dt) {
    dt = Math.min(dt, 0.1); this.t += dt;
    if (this._jerkSaved) { for (const [b, q] of this._jerkSaved) b.quaternion.copy(q); this._jerkSaved.clear(); }
    this._updatePrey(dt);
    this._updateWolf(dt);
    this._apply(this.wolf); this._apply(this.prey);
    this.wolf.mixer.update(dt); this.prey.mixer.update(dt);
    if (this.prof.foldWings ?? this.prof.onePaw) this._foldWings(dt);
    this._tailFlex(dt);
    if (this.preySoak) this.preySoak.update(dt);
    if (!this.rig || !this._contactState()) this._preyGround(dt);
    if (this.rig) this._post(dt);
    if (this.rig) this._v6Update(dt);
    if (this.fx) this.fx.update(dt);
  }
  dispose() { if (this.wMorph) { this.wMorph.dispose(); this.wMorph = null; } if (this.fx) { this.fx.dispose(); this.fx = null; } this.preySoak = undefined; this._wSoak = null;
    if (this.caps) { for (const c of this.caps) { c.cap.parent && c.cap.parent.remove(c.cap); c.cap.geometry.dispose(); c.cap.material.dispose(); } this.caps = []; } }
  // v3: a pinned bird's wing feather cards fold in against its body (they no longer fan out through the wolf's head and legs)
  _foldWings(dt) {
    if (!this._wingB) { this._wingB = []; this.prey.o.traverse(o => { if (o.isBone && /_(p|s)\d+$/.test(o.name)) this._wingB.push([o, o.scale.clone()]); }); }
    if (!this._wingB.length) return;
    const ws = this.wolf.state, near = this._dist() < 1.3;
    const on = (ws === 'leap' && near) || (this.grabbed && ['pin', 'pinkill', 'release', 'eat'].includes(ws));
    this._fw = Math.max(0, Math.min(1, (this._fw || 0) + (on ? dt / 0.15 : -dt / 0.6)));
    const k = 1 - 0.6 * this._fw * this._fw * (3 - 2 * this._fw);
    for (const [b, s0] of this._wingB) b.scale.set(s0.x * k, s0.y * k, s0.z * k);
    if (this._wingM === undefined) { this._wingM = []; this.prey.o.traverse(o => { if (o.isSkinnedMesh && o.skeleton && this._wingB.some(e => o.skeleton.bones.includes(e[0])) && o.skeleton.bones.length && o.geometry.attributes.position.count < 2000 && /wing/i.test(o.name)) this._wingM.push(o); }); }
    for (const m of this._wingM) m.visible = this._fw < 0.5;   // folded cards are tucked under the body cover
  }

  // ================= v2 contact layer =================

  // ================= v4: soaked blood, dents, bird ground clearance, tail flex =================
  _ensureSoak() {
    if (this.preySoak !== undefined) return this.preySoak;
    if (this.p.bloodStyle === 'decal' && !this.p.dents) return (this.preySoak = null);
    const fx = this._ensureFX(); const ms = _skinMeshes(this.prey.o); if (!fx || !ms.length) return (this.preySoak = null);
    this.prey.o.updateMatrixWorld(true);
    const S = new SoakSkin(this.T, ms, ms[0].matrixWorld.getMaxScaleOnAxis(), this.v5 && this.v5.soak); S.manual = true;
    if (this.p.deepBite && this.v5 && this.v5.bulge) S.u.uDB.value.x = this.v5.bulge;   // v5: skin bunches up around the buried muzzle
    fx.soaks.push(S); this.preySoak = S; return S;
  }
  _soakWound(a, p) {
    const S = this._ensureSoak(); if (!S) return null;
    const T = this.T, R = this.rig, m = a.m, pos = m.geometry.attributes.position, nor = m.geometry.attributes.normal;
    const bone = this._boneOf(a), bi = m.skeleton.bones.indexOf(bone);
    const Mi = new T.Matrix4().multiplyMatrices(bone.matrixWorld, m.skeleton.boneInverses[bi]).multiply(m.bindMatrix).invert();
    const downB = new T.Vector3(0, -1, 0).transformDirection(Mi);
    const mw = R.mouth(new T.Vector3()).sub(p); const faceB = mw.lengthSq() > 1e-6 ? mw.normalize().transformDirection(Mi) : null;
    const Rm = (this.prof.woundR || 0.12) * this.prey.o.scale.x, Rg = Rm / S.k;
    const a0 = new T.Vector3().fromBufferAttribute(pos, a.i), c = a0.clone(), tv = new T.Vector3(), tn = new T.Vector3(); let ci = a.i;
    if (faceB) { let best = -1e9; for (let i = 0; i < pos.count; i++) { tv.fromBufferAttribute(pos, i); const d = tv.distanceTo(a0); if (d > Rg * 0.8) continue; tn.fromBufferAttribute(nor, i);
        const s = tn.dot(faceB) - 0.6 * d / Rg + 0.8 * tv.clone().sub(a0).dot(faceB) / Rg; if (s > best) { best = s; c.copy(tv); ci = i; } } }
    const n = new T.Vector3(); let cnt = 0;
    for (let i = 0; i < pos.count; i++) { tv.fromBufferAttribute(pos, i); if (tv.distanceToSquared(c) < Rg * Rg * 0.2) { n.add(tn.fromBufferAttribute(nor, i)); cnt++; } }
    if (!cnt) n.fromBufferAttribute(nor, ci); n.normalize(); if (faceB) n.multiplyScalar(0.5).addScaledVector(faceB, 0.5).normalize();
    const w = S.addWound(c, n, downB, Rm, 0.34, { runMax: Rm * 2.4 * S.runK, runSpeed: 0.04 * S.runK, spat: 1, mesh: m, idx: ci, anchor: a });
    w.soak = true; w.Rmax0 = Rm; return w;
  }
  _dentNormal(a) {                                  // inward direction for a dent: averaged bind normal around the anchor (cached)
    const key = a.m.uuid + ':' + a.i, C = this._dnc || (this._dnc = new Map()); let n = C.get(key); if (n) return n;
    const T = this.T, pos = a.m.geometry.attributes.position, nor = a.m.geometry.attributes.normal, c = new T.Vector3().fromBufferAttribute(pos, a.i), tv = new T.Vector3(), tn = new T.Vector3();
    const r = 0.03 / (this.preySoak ? this.preySoak.k : 1); n = new T.Vector3(); const n0 = new T.Vector3().fromBufferAttribute(nor, a.i);
    for (let i = 0; i < pos.count; i++) { tv.fromBufferAttribute(pos, i); if (tv.distanceToSquared(c) < r * r) { tn.fromBufferAttribute(nor, i); if (tn.dot(n0) > 0.2) n.add(tn); } }
    if (n.lengthSq() < 1e-8) n.copy(n0); n.normalize().negate(); C.set(key, n); return n;
  }
  _dentTargets() {
    const S = this.preySoak; if (!S || !this.p.dents || !this.rig) return;
    const c = this.ctl, pr = this.prof, ds = this.p.dentScale ?? 1, w = this.contactW || 0, T = this.T, on = this._contactState();
    const cB = this._dc || (this._dc = new T.Vector3());
    if (on && c.spot && c.lift < 0.03) { cB.fromBufferAttribute(c.spot.m.geometry.attributes.position, c.spot.i);
      S.setDent(0, cB, this._dentNormal(c.spot), pr.dentBiteR || 0.05, ((pr.dentBite || 0.012) + 0.008 * Math.abs(c.tug) + 0.004 * Math.abs(c.side)) * ds * w, c.spot.m.uuid + ':' + c.spot.i); }
    else S.setDent(0, null, null, 0, 0);
    [this.rig.legs.fL, this.rig.legs.fR].forEach((L, j) => {
      if (on && L && L.anchor && L.trans >= 0.999) { cB.fromBufferAttribute(L.anchor.m.geometry.attributes.position, L.anchor.i);
        S.setDent(1 + j, cB, this._dentNormal(L.anchor), pr.dentPawR || 0.05, Math.min(pr.dentMax ?? 1, (pr.dentPaw || 0.012) * (1 + 0.6 * Math.abs(c.tug))) * ds * w, L.anchor.m.uuid + ':' + L.anchor.i); }
      else S.setDent(1 + j, null, null, 0, 0);
    });
  }
  // the held / dead bird never sinks into the ground: its lowest skinned vertex is kept on the ground (root lifted)
  _preyGround(dt) {
    if (!(this.p.groundClear && this.prof.groundClear)) return;
    const P = this.prey, st = P.state; if (!(this.grabbed || st === 'dead' || st === 'knocked' || st === 'struggle')) { this.gLift = 0; return; }
    P.o.updateMatrixWorld(true);
    const ms = this._gcM || (this._gcM = _skinMeshes(P.o)); const v = this._gv || (this._gv = new this.T.Vector3()); let lo = 1e9;
    for (const m of ms) { let o = m, vis = true; while (o) { if (!o.visible) { vis = false; break; } o = o.parent; } if (!vis) continue;
      const n = m.geometry.attributes.position.count; for (let i = (this._gcOdd = 1 - (this._gcOdd || 0)); i < n; i += 2) { m.getVertexPosition(i, v); v.applyMatrix4(m.matrixWorld); const g = v.y - this.groundY(v.x, v.z); if (g < lo) lo = g; } }
    const need = Math.max(0, 0.006 - lo);
    this.gLift = Math.max(need, (this.gLift || 0) - dt * 0.3);
    if (this.gLift > 0) { P.o.position.y += this.gLift; P.o.updateMatrixWorld(true); }
  }
  // bird tail feathers: bend and spring back (inertia, struggle flutter, pressed up by the ground, kicked by the wolf's pull)
  _tailFlex(dt) {
    if (!this.p.tailFlex || !this.prof.tail) return;
    const T = this.T, P = this.prey;
    if (!this._tail) {
      const bs = this.prof.tail.map(n => P.o.getObjectByName(n)).filter(b => b && b.isBone); this._tail = { bs };
      if (!bs.length) return;
      const m = _skinMeshes(P.o).reduce((a, b) => (b.geometry.attributes.position.count > a.geometry.attributes.position.count ? b : a));
      const last = bs[bs.length - 1], bi = m.skeleton.bones.indexOf(last), ids = bs.map(b => m.skeleton.bones.indexOf(b));
      const g = m.geometry, si = g.attributes.skinIndex, sw = g.attributes.skinWeight, pos = g.attributes.position, M = new T.Matrix4().copy(m.skeleton.boneInverses[bi]).multiply(m.bindMatrix);
      let best = 0; const tip = new T.Vector3(), v = new T.Vector3();
      for (let i = 0; i < pos.count; i++) { let tw = 0; for (let k = 0; k < 4; k++) if (ids.includes(si.getComponent(i, k))) tw += sw.getComponent(i, k); if (tw < 0.5) continue;
        v.fromBufferAttribute(pos, i).applyMatrix4(M); if (v.length() > best) { best = v.length(); tip.copy(v); } }
      Object.assign(this._tail, { tipL: tip, len: best, p: 0, pv: 0, y: 0, yv: 0, pr: 0, prv: 0, ax: new T.Vector3(1, 0, 0), lastP: null, lastV: new T.Vector3(), fl: 0, kick: 0 });
    }
    const S = this._tail; if (!S.bs.length) return;
    const pel = S.bs[0].parent; P.o.updateMatrixWorld(true);
    const wp = pel.getWorldPosition(new T.Vector3()), acc = new T.Vector3();
    if (S.lastP && dt > 1e-4) { const vel = wp.clone().sub(S.lastP).divideScalar(dt); acc.copy(vel).sub(S.lastV).divideScalar(dt); S.lastV.copy(vel); } S.lastP = wp;
    acc.clampLength(0, 30);
    const qp = pel.getWorldQuaternion(new T.Quaternion()), ax = new T.Vector3(1, 0, 0).applyQuaternion(qp), ay = new T.Vector3(0, 1, 0).applyQuaternion(qp);
    const alive = P.state !== 'dead', want = (this.grabbed && alive) || P.state === 'knocked' || P.state === 'struggle' ? 1 : (P.state === 'flee' ? 0.5 : 0);
    S.fl += (want - S.fl) * Math.min(1, dt * 4);
    const t = this.t; const tp = acc.dot(ay) * 0.012, ty = -acc.dot(ax) * 0.012;
    // flutter of the struggling bird (added directly: a spring would filter it out)
    const env = 0.6 + 0.4 * Math.sin(t * 2 * Math.PI * 0.9);
    const fp = S.fl * env * (0.28 * Math.sin(t * 2 * Math.PI * 5.3) + 0.09 * Math.sin(t * 2 * Math.PI * 9.7 + 1.3));
    const fy = S.fl * env * (0.24 * Math.sin(t * 2 * Math.PI * 3.9 + 0.7) + 0.08 * Math.sin(t * 2 * Math.PI * 8.1));
    if (S.fl > 0.3 && Math.random() < dt * 2.0) { S.pv += (Math.random() - 0.35) * 9; S.yv += (Math.random() - 0.5) * 9; }
    const tug = Math.abs(this.ctl.tug || 0); if (tug > 0.5 && !S.kicked) { S.kicked = true; S.pv -= 6 * tug; S.yv += (Math.random() - 0.5) * 4; } else if (tug < 0.2) S.kicked = false;
    const sk = this.preySoak; if (sk) { const dv = sk.dents[1].v + sk.dents[2].v; if (Math.abs(dv) > 0.3) S.pv -= dv * 0.6 * dt * 30; }   // the paw pressing down jolts the tail
    const spring = (x, v, tg, k, z) => { v += (k * (tg - x) - 2 * z * Math.sqrt(k) * v) * dt; x += v * dt; return [Math.max(-0.7, Math.min(0.7, x)), v]; };
    [S.p, S.pv] = spring(S.p, S.pv, tp, 180, 0.2); [S.y, S.yv] = spring(S.y, S.yv, ty, 180, 0.2);
    const sv = this._jerkSaved || (this._jerkSaved = new Map()); for (const b of S.bs) if (!sv.has(b)) sv.set(b, b.quaternion.clone());
    const qa = new T.Quaternion(), qb = new T.Quaternion(), share = S.bs.length > 1 ? [0.4, 0.6] : [1];
    const rot = (b, axis, ang) => _rotWorld(T, b, new T.Quaternion().setFromAxisAngle(axis, ang), qa, qb);
    S.bs.forEach((b, i) => { rot(b, ax, (S.p + fp) * share[i]); rot(b, ay, (S.y + fy) * share[i]); });
    // pressed by the ground: bend the feathers up as far as needed (fast), spring back with an overshoot when free
    const last = S.bs[S.bs.length - 1], tipW = S.tipL.clone().applyMatrix4(last.matrixWorld), base = S.bs[0].getWorldPosition(new T.Vector3());
    const gap = tipW.y - (this.groundY(tipW.x, tipW.z) + 0.008); const dir = tipW.clone().sub(base), L = dir.length();
    let ptg = 0; if (L > 1e-4) { const pax = dir.clone().cross(new T.Vector3(0, 1, 0)); if (pax.lengthSq() > 1e-6) S.ax.lerp(pax.normalize(), Math.min(1, dt * 10)).normalize();
      if (gap < 0) ptg = Math.min(0.9, S.pr + Math.asin(Math.min(1, -gap / L)) * 1.15); else ptg = Math.max(0, S.pr - Math.asin(Math.min(1, gap / L)) * 0.9); }
    const pin = ptg > S.pr; if (pin) { S.prv = 0; S.pr = ptg; } else [S.pr, S.prv] = spring(S.pr, S.prv, ptg, 120, 0.2);
    if (Math.abs(S.pr) > 1e-4) S.bs.forEach((b, i) => rot(b, S.ax, -S.pr * share[i]));
    S.bend = ((S.p + fp) ** 2 + (S.y + fy) ** 2) ** 0.5 + Math.abs(S.pr);
  }

  _yawFor() { if (this.lock) return this.prey.yaw + this.lock.yaw; const s = this.ctl.spot; return this.prey.yaw + (s && s.yaw != null ? s.yaw : this.pinYaw); }
  _contactState() { const s = this.wolf.state; return this.grabbed && (s === 'leap' || s === 'pin' || s === 'pinkill' || s === 'release' || s === 'eat'); }
  _ensureFX() {
    if (this.fx) return this.fx; const par = this.p.fxParent || this.wolf.o.parent; if (!par) return null;
    this.fx = new HuntFX(this.T, par, this.p);
    this.fx.onLand = q => { const pl = this.fx.pools[0]; if (pl) pl.grow = Math.min(1, pl.grow + 0.004); };
    return this.fx;
  }
  _boneOf(a) {                                     // the prey bone carrying an anchor vertex (highest weight)
    const g = a.m.geometry, si = g.attributes.skinIndex, sw = g.attributes.skinWeight; let bi = 0, bw = -1;
    for (let k = 0; k < 4; k++) { const w = sw.getComponent(a.i, k); if (w > bw) { bw = w; bi = si.getComponent(a.i, k); } }
    return a.m.skeleton.bones[bi];
  }
  _pickPaws(specs) {                               // assign anchors to the nearest front paws
    const R = this.rig, T = this.T, legs = [R.legs.fL, R.legs.fR].filter(Boolean); const v = new T.Vector3(), s = new T.Vector3();
    const an = specs.map(sp => R.pickAnchor(sp)).filter(Boolean);
    const used = new Set();
    for (const L of legs) {
      R._sole(L, s); let best = null, bd = 1e9;
      an.forEach((a, k) => { if (used.has(k)) return; const d = R.anchorWorld(a, v).distanceTo(s); if (d < bd) { bd = d; best = k; } });
      if (best != null) { used.add(best); this._setPaw(L, an[best], true); }
    }
  }
  _setPaw(L, a, instant) {
    const R = this.rig; if (a === L.anchor) return;
    L.from = R._sole(L, new this.T.Vector3()); L.anchor = a; L.trans = instant ? 1 : 0; L.plant = null; L.step = null;
  }
  _rechoosePaws() {
    const R = this.rig, legs = [R.legs.fL, R.legs.fR].filter(Boolean); const v = new this.T.Vector3();
    const bite = this.ctl.spot ? R.anchorWorld(this.ctl.spot, new this.T.Vector3()) : null;
    if (this.prof.onePaw) {                         // rooster: the paw nearer to the bird pins it, the other stands on the ground
      let best = null, bd = 1e9; for (const L of legs) { const d = R._sole(L, v).distanceTo(this.prey.o.position); if (d < bd) { bd = d; best = L; } }
      for (const L of legs) { if (L === best) { const a = R.choosePaw(L, { reach: 0.62, minUp: this.prof.pawMinUp ?? 0.2, minH: 0.06, avoid: [bite] }) || R.choosePaw(L, { reach: 0.62, minUp: 0.2, minH: 0.06, avoid: [bite] }); if (a) this._setPaw(L, a); } else { L.anchor = null; L.trans = 1; } }
      return;
    }
    const other = [];
    for (const L of legs) { const a = R.choosePaw(L, { reach: 0.52, minUp: 0.3, minH: 0.18, avoid: [bite, ...other] }); if (a) { this._setPaw(L, a); other.push(R.anchorWorld(a, new this.T.Vector3())); } else { L.anchor = null; } }
  }
  _rechooseFree() {
    const R = this.rig, T = this.T; const bite = this.ctl.spot ? R.anchorWorld(this.ctl.spot, new T.Vector3()) : null; const others = [];
    for (const L of [R.legs.fL, R.legs.fR]) if (L && L.anchor) others.push(R.anchorWorld(L.anchor, new T.Vector3()));
    for (const L of [R.legs.fL, R.legs.fR]) { if (!L || L.anchor) continue; if (this.prof.onePaw && others.length) continue; if (this.t - (L.freeT ?? -9) < 1.0) continue;
      const a = R.choosePaw(L, { reach: 0.52, minUp: 0.3, minH: this.prof.onePaw ? 0.06 : 0.18, avoid: [bite, ...others] }); if (a) { this._setPaw(L, a); others.push(R.anchorWorld(a, new T.Vector3())); } }
  }
  _bleed(a, big) {
    const fx = this._ensureFX(); if (!fx || !a) return;
    const R = this.rig, T = this.T, p = new T.Vector3(), n = new T.Vector3(); R.anchorWorld(a, p, n);
    const gy = this.groundY(p.x, p.z), k = this.prof.bloodScale || 1;
    fx.spurt(p, n, Math.round((big ? 18 : 5) * k + 1), big ? 1.9 : 1.1, gy);
    if (this.prof.grab === 'body') fx.puff(p, big ? 16 : 6, gy);
    const key = a.m.uuid + ':' + a.i;
    if (this.p.bloodStyle !== 'decal') {            // v4: soaked into the fur
      if (!this.wounds.has(key) && this.wounds.size < (this.p.maxWounds | 0)) { const w = this._soakWound(a, p); if (w) this.wounds.set(key, w); }
      else if (this.wounds.has(key)) { const w = this.wounds.get(key); if (w.soak) { w.Rmax = Math.min(w.Rmax * 1.12, w.Rmax0 * 1.5); w.grow = Math.min(w.grow, 0.85); w.runMax *= 1.08; } }
      if (big || this.wounds.size >= 1) this._muzzleBlood();
      if (!fx.pools.length) { const g = p.clone().addScaledVector(n, 0.05); fx.addPool(g.x, this.groundY(g.x, g.z), g.z, (this.prof.poolR || 0.4) * this.prey.o.scale.x); }
      return;
    }
    if (!this.wounds.has(key)) { const sc = this.prey.o.scale.x;
      const bone = this._boneOf(a), bi = a.m.skeleton.bones.indexOf(bone);
      const M = new T.Matrix4().multiplyMatrices(bone.matrixWorld, a.m.skeleton.boneInverses[bi]).multiply(a.m.bindMatrix).multiply(new T.Matrix4().copy(a.m.matrixWorld).invert().multiply(a.m.matrixWorld));
      const downB = new T.Vector3(0, -1, 0).transformDirection(M.clone().invert());
      // v3: the stain goes on the side of the body that faces the wolf's mouth right now (the bitten, visible side), not the bind-pose normal side
      const mw = R.mouth(new T.Vector3()).sub(p); const faceB = mw.lengthSq() > 1e-6 ? mw.normalize().transformDirection(M.clone().invert()) : null;
      const w = fx.addWound(a.m, a.i, (this.prof.woundR || 0.12) * sc * 1.35, 0.32, { downB, faceB }); if (w) w.anchor = a; this.wounds.set(key, w || { anchor: a }); }
    if (big || this.wounds.size >= 1) this._muzzleBlood();
    if (!fx.pools.length) { const g = p.clone().addScaledVector(n, 0.05); fx.addPool(g.x, this.groundY(g.x, g.z), g.z, (this.prof.poolR || 0.4) * this.prey.o.scale.x); }
  }
  // v3: red on the wolf's lips / chin after the first bites (skinned to its own jaw, grows slowly)
  _muzzleBlood() {
    if (this._muzzle || !this.fx || !this.p.bloodDecals) return; this._muzzle = true;
    const R = this.rig, T = this.T, m = R.wMeshes.reduce((a, b) => (b.geometry.attributes.position.count > a.geometry.attributes.position.count ? b : a));
    const pos = m.geometry.attributes.position, v = new T.Vector3(), wsc = this.wolf.o.scale.x;
    for (const lip of [R.lipL]) { if (!lip) continue;   // v3: lower lip / chin only (an upper-lip patch sat on the nose tip like a red ball)
      const bi = m.skeleton.bones.indexOf(lip.bone); if (bi < 0) continue;
      const target = lip.local.clone().applyMatrix4(new T.Matrix4().copy(m.skeleton.boneInverses[bi]).invert());      // bind space
      let best = -1, bd = 1e9; for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(m.bindMatrix); const d = v.distanceToSquared(target); if (d < bd) { bd = d; best = i; } }
      if (best < 0) continue;
      const M = new T.Matrix4().multiplyMatrices(lip.bone.matrixWorld, m.skeleton.boneInverses[bi]).multiply(m.bindMatrix);
      const downB = new T.Vector3(0, -1, 0).transformDirection(M.clone().invert());
      if (this.p.bloodStyle !== 'decal') {          // v4: the wolf's own chin / lip fur gets wet with blood
        if (!this._wSoak) { this._wSoak = new SoakSkin(T, [m], m.matrixWorld.getMaxScaleOnAxis()); this.fx.soaks.push(this._wSoak); }
        const nB = new T.Vector3().fromBufferAttribute(m.geometry.attributes.normal, best).normalize();
        const cB = new T.Vector3().fromBufferAttribute(pos, best);
        this._wSoak.addWound(cB, nB, downB, 0.055 * wsc, 0.2, { runMax: 0.06 * wsc, runSpeed: 0.012, spat: 0.5, mesh: m, idx: best });
        continue; }
      const w = this.fx.addWound(m, best, 0.085 * wsc, 0.22, { extra: true, lift: 0.002, downB }); if (w) w.muzzle = true; }
  }
  _drips(dt, rate) {
    const fx = this.fx; if (!fx || !rate) return; this.dripT -= dt * rate; if (this.dripT > 0) return; this.dripT = 0.16 + Math.random() * 0.12;
    const ws = [...this.wounds.values()]; if (!ws.length) return; const w = ws[(Math.random() * ws.length) | 0]; const R = this.rig, p = new this.T.Vector3(), n = new this.T.Vector3();
    if (w.soak && this.preySoak) { const S = this.preySoak, e = S.runEnd(w, new this.T.Vector3()); S.toWorld(w.mesh, w.idx, e, p); p.y -= 0.004; }   // v4: drips fall from the end of the running blood
    else { R.anchorWorld(w.anchor, p, n); p.addScaledVector(n, 0.012); p.x += (Math.random() - 0.5) * 0.04; p.z += (Math.random() - 0.5) * 0.04; }
    fx.drip(p, this.groundY(p.x, p.z), this.p.bloodStyle === 'decal' ? 0.006 + Math.random() * 0.004 : 0.0035 + Math.random() * 0.003);
    const pl = fx.pools[0]; if (pl) pl.grow = Math.min(1, pl.grow + 0.0015);
  }
  // tug / shake / re-bite schedule → this.ctl
  _jawHold() { return this.p.deepBite && this.v5 && this.v5.jawHold != null ? this.v5.jawHold : 0.3; }
  // v5: the tear is driven from the shoulders and neck. Tug: the chest rises and the spine extends back (the body leans away
  // from the bite), the shoulders brace. Shake: the shoulders counter-roll a beat behind the head, the neck base swings
  // with them, so the head yank comes out of the body; the head IK then keeps the canines in the flesh.
  _bodyDrive(dt) {
    if (!this.p.bodyDrive || !this.rig) return; const R = this.rig, c = this.ctl, T = this.T, B = this._bd || (this._bd = { r: 0, rv: 0, y: 0, yv: 0, tug: 0 });
    const k = 260, z = 0.55;   // lagging follower of the head roll / yaw (about 50-70 degrees behind at the 5 Hz shake)
    if (!this._bdStep) { B.rv += (k * (c.roll - B.r) - 2 * z * Math.sqrt(k) * B.rv) * dt; B.r += B.rv * dt; B.yv += (k * (c.yaw - B.y) - 2 * z * Math.sqrt(k) * B.yv) * dt; B.y += B.yv * dt;
      B.tug += (Math.max(0, c.tug) - B.tug) * Math.min(1, dt * 14); this._bdStep = true; }
    const w = this.contactW || 0; if (w <= 0) return; const sp = R.spine;
    const fwd = this.v5b || (this.v5b = new T.Vector3()); fwd.set(0, 0, 1).transformDirection(this.wolf.o.matrixWorld);
    const up = this.v5c || (this.v5c = new T.Vector3()); up.set(0, 1, 0);
    const q = this._bdq || (this._bdq = new T.Quaternion()), qa = this._bdqa || (this._bdqa = new T.Quaternion()), qb = this._bdqb || (this._bdqb = new T.Quaternion());
    // tug: chest up / spine extends (pitch back), small crouch of the loins
    R.pitchBone(sp[0], -0.07 * B.tug * w); R.pitchBone(sp[1], -0.13 * B.tug * w);
    // shake: shoulders counter-roll and swing behind the head
    if (sp[1]) { _rotWorld(T, sp[1], q.setFromAxisAngle(fwd, -0.42 * B.r * w), qa, qb); _rotWorld(T, sp[1], q.setFromAxisAngle(up, 0.55 * B.y * w), qa, qb); }
    if (sp[0]) _rotWorld(T, sp[0], q.setFromAxisAngle(fwd, -0.18 * B.r * w), qa, qb);
    const n1 = R.neck[0]; if (n1) _rotWorld(T, n1, q.setFromAxisAngle(up, 0.6 * B.y * w), qa, qb);
    this.wolf.o.updateMatrixWorld(true);
  }
  _maulUpdate(dt) {
    const c = this.ctl, W = this.wolf, M = this.maul, s = this.p.maul ? this.p.maulStrength : 0;
    c.roll = 0; c.yaw = 0; c.tug = 0; c.side = 0;
    const st = W.state;
    if (st === 'leap') { c.lift = Math.max(0, c.lift - dt * 1.2); c.jaw = 0.32; c.bite = 1; c.paws = 1; return; }
    if (st === 'pin' || st === 'pinkill') {
      c.lift = Math.max(0, c.lift - dt); c.jaw = this._jawHold(); c.bite = 1; c.paws = 1;
      M.t += dt; const T = 1.9, u = M.t % T, cyc = Math.floor(M.t / T);
      if (u < 0.6) { c.tug = Math.sin(Math.PI * u / 0.6) * s; if (u >= 0.3 && u - dt < 0.3) this._bleed(c.spot, false); }
      else if (u < 1.45) { const e = Math.sin(Math.PI * (u - 0.6) / 0.85), w = Math.sin((u - 0.6) * Math.PI * 2 * 5.0); c.roll = w * 0.3 * e * s; c.yaw = Math.cos((u - 0.6) * Math.PI * 2 * 5.0) * 0.1 * e * s; c.side = w * e * s; }
      this._drips(dt, 1.0); return;
    }
    if (st === 'release') { c.lift = Math.min(0.17, c.lift + dt * 0.35); c.jaw = 0.45; c.bite = 1; c.paws = 1; this._drips(dt, 1.4); return; }
    if (st === 'eat') {
      c.bite = 1; c.paws = 1; this._drips(dt, 1.2);
      const ph = [['move', 0.45], ['down', 0.35], ['tug', 0.65], ['shake', 0.95], ['tug', 0.6], ['up', 0.4]];
      M.pt += dt; while (M.pt >= ph[M.ph][1]) { M.pt -= ph[M.ph][1]; M.ph = (M.ph + 1) % ph.length; if (ph[M.ph][0] === 'move') { M.spotI++; } if (ph[M.ph][0] === 'tug') this._bleed(c.spot, false); }
      const [name, d] = ph[M.ph], u = M.pt / d;
      if (this.spotAnchors && this.spotAnchors.length) c.spot = this.spotAnchors[M.spotI % this.spotAnchors.length];
      if (name === 'move') { c.lift = 0.14; c.jaw = 0.5; }
      else if (name === 'down') { c.lift = 0.14 * (1 - _ss(0, 1, u)); c.jaw = 0.5 - 0.24 * _ss(0.4, 1, u); if (u > 0.92 && !M.bitten) { M.bitten = true; this._bleed(c.spot, true); this._event('bite', { spot: c.spot && c.spot.name }); } }
      else if (name === 'tug') { M.bitten = false; c.lift = 0; c.jaw = this._jawHold(); c.tug = Math.sin(Math.PI * u) * 1.15 * s; }
      else if (name === 'shake') { c.lift = 0; c.jaw = this._jawHold(); const e = Math.sin(Math.PI * u), w = Math.sin(M.pt * Math.PI * 2 * 5.5); c.roll = w * 0.36 * e * s; c.yaw = Math.cos(M.pt * Math.PI * 2 * 5.5) * 0.12 * e * s; c.side = w * e * s; }
      else if (name === 'up') { c.lift = 0.14 * _ss(0, 1, u); c.jaw = 0.26 + 0.24 * _ss(0, 0.5, u); }
      return;
    }
  }

  // ================= v6: soft lips / cheeks / jaw spring, toe grip, prey recoil =================
  _v6Update(dt) {
    const p = this.p; if (!(p.lipFlex || p.toeGrip)) return;
    if (this.wMorph === undefined) this.wMorph = new WolfMorphs(this.T, this.wolf.o);
    const M = this.wMorph; if (!M || !M.ok) return;
    const c = this.ctl, R = this.rig, contact = this._contactState(), ws = this.wolf.state;
    const S = this._v6 || (this._v6 = { snarl: 0, cheek: 0, rs: 0, rv: 0, toeL: 0, toeR: 0, jaw: 0 });
    const ease = (cur, tgt, up, down) => cur + (tgt - cur) * Math.min(1, dt / (tgt > cur ? up : down));
    if (p.lipFlex) {
      const biting = contact && c.lift < 0.03, leap = ws === 'leap' && !this.grabbed;
      const tug = Math.min(1, Math.max(0, c.tug || 0)), rollT = contact ? (c.roll || 0) : 0;
      // soft tissue follows the head roll with lag (≈7 Hz spring, ζ 0.35, sub-stepped)
      const nst = Math.max(1, Math.ceil(dt / 0.008)), h = dt / nst, w0 = 2 * Math.PI * 7;
      for (let i = 0; i < nst; i++) { S.rv += (w0 * w0 * (rollT - S.rs) - 2 * 0.35 * w0 * S.rv) * h; S.rs += S.rv * h; }
      const wob = S.rs - rollT * 0.35;
      S.snarl = ease(S.snarl, biting ? 0.62 + 0.38 * tug : (contact ? 0.3 : (leap ? 0.5 : 0)), 0.12, 0.4);
      S.cheek = ease(S.cheek, biting ? 0.3 + 0.55 * tug : 0, 0.1, 0.35);
      M.set('snarl', Math.max(0, S.snarl + Math.min(0.3, Math.abs(wob) * 0.45)));
      M.set('cheekL', Math.max(0, Math.min(1.3, S.cheek + wob * 1.7))); M.set('cheekR', Math.max(0, Math.min(1.3, S.cheek - wob * 1.7)));
      // jaw secondary: the lower jaw lags the shake a little and clenches on the pull (visual, after the contact solve)
      S.jaw = contact ? Math.max(-0.02, Math.min(0.03, (S.rs - rollT) * 0.06 + (biting ? -0.012 * tug : 0))) : 0;
      if (contact && R && R.jawL) R.setJaw(c.jawCur + S.jaw);
    }
    if (p.toeGrip && R && R.legs) {
      for (const [key, nm] of [['fL', 'toeL'], ['fR', 'toeR']]) { const L = R.legs[key];
        const on = !!(L && L.anchor && contact && (this.contactW || 0) > 0.5);
        S[nm] = ease(S[nm], on ? 1 + 0.12 * Math.min(1, Math.max(0, c.tug || 0)) : 0, 0.18, 0.3); M.set(nm, S[nm]); }
    }
  }
  // the prey's body answers the wolf's shake / tug a beat late: spine roll + bend, legs lag behind the body (springs, sub-stepped)
  _v6Recoil(dt, contact) {
    const A = this.prof.recoil; if (!this.p.preyRecoil || !A) return;
    const T = this.T, c = this.ctl, P = this.prey.o;
    const S = this._rc || (this._rc = { buf: [], x: 0, v: 0, y: 0, w: 0, b: 0, bv: 0, l: 0, lv: 0, rec: [] });
    const inS = contact ? (c.side || 0) * A.side : 0, inT = contact ? (c.tug || 0) * A.tug : 0;
    S.buf.push([inS, inT, dt]); let acc = 0; while (S.buf.length > 1 && acc + S.buf[S.buf.length - 1][2] < 0.07) { acc = 0; for (let i = S.buf.length - 1; i > 0; i--) acc += S.buf[i][2]; if (acc >= 0.07) S.buf.shift(); else break; }
    const [uS, uT] = S.buf[0];
    const nst = Math.max(1, Math.ceil(dt / 0.008)), h = dt / nst, wb = 2 * Math.PI * 4.2, wl = 2 * Math.PI * 2.8;
    for (let i = 0; i < nst; i++) {
      S.v += (wb * wb * (uS - S.x) - 2 * 0.32 * wb * S.v) * h; S.x += S.v * h;           // torso roll
      S.w += (wl * wl * (S.x - S.y) - 2 * 0.25 * wl * S.w) * h; S.y += S.w * h;           // legs follow the torso, later
      S.bv += (wb * wb * (uT - S.b) - 2 * 0.4 * wb * S.bv) * h; S.b += S.bv * h;          // torso bend toward the pull
      S.lv += (wl * wl * (S.b - S.l) - 2 * 0.3 * wl * S.lv) * h; S.l += S.lv * h;
    }
    this.recoilDbg = { roll: S.x, leg: S.y - S.x, bend: S.b, inS: contact ? (c.side || 0) * A.side : 0 };
    if (Math.abs(S.x) + Math.abs(S.y) + Math.abs(S.b) + Math.abs(S.l) < 1e-5) return;
    const bn = n => P.getObjectByName(n); const pel = bn('pelvis'), s1 = bn('spine1'), s2 = bn('spine2'); if (!pel || !s1 || !s2) return;
    P.updateMatrixWorld(true);
    const a0 = pel.getWorldPosition(new T.Vector3()), a1 = s2.getWorldPosition(new T.Vector3()); const ax = a1.sub(a0); if (ax.lengthSq() < 1e-8) return; ax.normalize();
    const toW = this.wolf.o.position.clone().sub(a0); toW.y = 0; if (toW.lengthSq() < 1e-8) toW.set(1, 0, 0); toW.normalize();
    const bax = new T.Vector3(0, 1, 0).cross(toW).normalize();
    const sv = this._jerkSaved || (this._jerkSaved = new Map()); const qa = new T.Quaternion(), qb = new T.Quaternion(), q = new T.Quaternion(), q2 = new T.Quaternion();
    const rot = (b, axis, ang) => { if (!b || !ang) return; if (!sv.has(b)) sv.set(b, b.quaternion.clone()); q.setFromAxisAngle(axis, ang); _rotWorld(T, b, q, qa, qb); };
    rot(s1, ax, S.x * 0.45); rot(s1, bax, -S.b * 0.4); P.updateMatrixWorld(true);
    rot(s2, ax, S.x * 0.55); rot(s2, bax, -S.b * 0.6); P.updateMatrixWorld(true);
    const lag = (S.y - S.x) * A.leg, lagB = (S.l - S.b) * A.leg;
    for (const n of ['f_upL', 'f_upR', 'h_upL', 'h_upR']) { const b = bn(n); if (!b) continue; const k = n[0] === 'f' ? 1 : 0.8; rot(b, ax, lag * k); rot(b, bax, -lagB * k * 0.8); }
    P.updateMatrixWorld(true);
  }
  // the bitten part of the prey follows the tug / shake
  _preyJerk() {
    const c = this.ctl; const hold = (this.prof.holdBend || 0) * (this._contactState() && c.lift < 0.03 ? (this.contactW || 0) : 0);   // v4: the bitten neck bends toward the pull while held
    if (!c.spot || (!c.tug && !c.side && !hold)) return;
    const T = this.T, P = this.prey.o;
    // jerk the spine/neck bone named by the spot (never the root / pelvis: those would swing the whole body)
    let b = c.spot.bone ? P.getObjectByName(c.spot.bone) : null; if (!b) return;
    if (!/neck|spine|chest|head/i.test(b.name)) return;
    const bp = b.getWorldPosition(new T.Vector3()), toW = this.wolf.o.position.clone().sub(bp); toW.y = 0; toW.normalize();
    const ax = new T.Vector3(0, 1, 0).cross(toW).normalize();
    const k = (this.prey.state === 'dead' ? 1.0 : 0.7) * (this.prof.jerk || 1);
    const q = new T.Quaternion().setFromAxisAngle(ax, -(c.tug * 0.10 + hold) * k).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), c.side * 0.06 * k));
    const qa = new T.Quaternion(), qb = new T.Quaternion(); const sv = this._jerkSaved || (this._jerkSaved = new Map());
    if (b.parent && b.parent.isBone && !sv.has(b.parent)) sv.set(b.parent, b.parent.quaternion.clone()); if (!sv.has(b)) sv.set(b, b.quaternion.clone());
    _rotWorld(T, b, q, qa, qb);
    if (b.parent && b.parent.isBone && /neck|spine|chest/i.test(b.parent.name)) _rotWorld(T, b.parent, new T.Quaternion().slerp(q, 0.4), qa, qb);
  }
  _post(dt) {
    const R = this.rig, W = this.wolf, P = this.prey, p = this.p, c = this.ctl, T = this.T;
    const contact = this._contactState();
    if (contact) { this._maulUpdate(dt); if (this.p.dents) this._ensureSoak(); }
    this._preyJerk(); this._v6Recoil(dt, contact); if (contact) this._preyGround(dt); this._dentTargets(); P.o.updateMatrixWorld(true); W.o.updateMatrixWorld(true);
    const leaping = W.state === 'leap' && !this.grabbed;
    const wantJaw = contact ? c.jaw : (leaping ? (this._time(W) > p.leapStartAt + 0.25 ? 0.52 : 0.2) : null);
    if (wantJaw != null) { c.jawCur += (wantJaw - c.jawCur) * Math.min(1, dt * 16); R.setJaw(c.jawCur); } else c.jawCur = 0.06;
    if (leaping) { R.captureNeckRef(); this._leapPose(); this.contactW = 0; return; }
    if (!contact) { this.contactW = 0; this.lock = null; for (const L of Object.values(R.legs)) { L.plant = null; L.step = null; L.anchor = null; } this._drips(dt, this.wounds.size && P.state !== 'flee' ? 0.6 : 0);
      // free running near the prey (chase, shaken, prey getting up): the wolf body never goes through it
      if (W.o.position.distanceTo(P.o.position) < 3.5 * P.o.scale.x + 1) {
        const push = new T.Vector3();
        for (let it = 0; it < 3; it++) { const pen = R.penetration(R.wS, push); if (pen < 0.003) break; push.y = 0; const L = push.length(); if (L < 1e-6) break; push.multiplyScalar(Math.min(0.2, pen + 0.004) / L); W.o.position.add(push); W.o.updateMatrixWorld(true); }
      }
      return; }
    const first = this.contactW === 0; this.contactW = Math.min(1, this.contactW + dt / 0.1);
    if (!c.spot) return;
    const tp = new T.Vector3(), tn = new T.Vector3(); R.anchorWorld(c.spot, tp, tn);
    const target = tp.clone().addScaledVector(tn, (this.prof.mouthGap || 0.004) - (c.lift < 0.01 ? (p.biteSink || 0) * 1.6 : 0) + c.lift);
    if (c.lift > 0.005) { const bk = this.wolf.o.position.clone().sub(tp); bk.y = 0; if (bk.lengthSq() > 1e-6) target.addScaledVector(bk.normalize(), c.lift * 0.9); target.y -= c.lift * 0.35; }
    // --- root: follows the bite point while the prey goes down; then locked to the prey (no wandering), pulled back by tugs ---
    const fwd = this._fwd(W.yaw), k = this.prof.reachK || 1;
    if (!this.lock && (P.state === 'struggle' || P.state === 'dead') && W.state !== 'leap') {
      const inv = this._toLocal(W.o.position, P.o.position, P.yaw); this.lock = { p: inv, yaw: Math.atan2(Math.sin(W.yaw - P.yaw), Math.cos(W.yaw - P.yaw)) };
    }
    if (this.lock) {
      W.yaw = P.yaw + this.lock.yaw; W.o.rotation.y = W.yaw;
      // slow correction of the stance only when the jaw cannot reach the bite point (and nothing pushed last frame)
      if (this.dbg && this.dbg.err > 0.008 && this.dbg.push < 0.02 && c.lift < 0.02) {
        const m = R.mouth(new T.Vector3()), dv = target.clone().sub(m); dv.y = 0; const L = Math.min(0.012, dv.length() * 0.45); if (L > 1e-5) { dv.setLength(L); const wb = this._toWorld(this.lock.p, P.o.position, P.yaw).add(dv); this.lock.p.copy(this._toLocal(wb, P.o.position, P.yaw)); }
      }
      const base = this._toWorld(this.lock.p, P.o.position, P.yaw);
      base.addScaledVector(fwd, -c.tug * (this.p.bodyDrive && this.v5 && this.v5.tugBack || 0.07) * W.o.scale.x);
      W.o.position.x = base.x; W.o.position.z = base.z;
    } else {
      const off = R.mouth(new T.Vector3()).sub(W.o.position); off.y = 0;
      const des = target.clone().addScaledVector(off, -k).addScaledVector(fwd, -c.tug * 0.07 * W.o.scale.x); des.y = W.o.position.y;
      if (first) this.rootErr = W.o.position.clone().sub(des);
      if (this.rootErr) { this.rootErr.multiplyScalar(Math.max(0, 1 - dt / 0.16)); if (this.rootErr.lengthSq() < 1e-6) this.rootErr = null; }
      const goal = des.clone(); if (this.rootErr) goal.add(this.rootErr);
      if (!this.rootBias) this.rootBias = new T.Vector3(); this.rootBias.multiplyScalar(Math.exp(-dt * 3.0)); if (this.rootBias.length() > 0.15) this.rootBias.setLength(0.15); goal.add(this.rootBias);
      const kk = first ? 1 : 1 - Math.exp(-dt * 12);
      W.o.position.x += (goal.x - W.o.position.x) * kk; W.o.position.z += (goal.z - W.o.position.z) * kk;
    }
    W.o.position.y = this.groundY(W.o.position.x, W.o.position.z);
    // v5: pinning a small bird the wolf crouches until the pinning paw reaches the body (closed loop on the paw's reach error)
    if (this.p.pawPress && this.v5.crouchMax) { const Lp = [R.legs.fL, R.legs.fR].find(L => L && L.anchor && L.trans >= 1);
      const cr = this.crouch || 0, want = Lp ? Math.max(0, Math.min(this.v5.crouchMax, cr + Math.max(-0.006, (Lp.reachErr || 0) - 0.0008) * 0.7)) : 0;
      this.crouch = cr + (want - cr) * Math.min(1, dt * (Lp ? 10 : 3)); W.o.position.y -= this.crouch * W.o.scale.x; }
    W.o.updateMatrixWorld(true);
    // v3: the prey's legs fold / kick under the wolf while it goes down — the wolf rides up over them instead of swallowing them
    { const need = R.legRide(P.state === 'knocked'); this.rideY = Math.max(need, (this.rideY || 0) - dt * 0.9); if (this.rideY > 0.0005) { W.o.position.y += this.rideY; W.o.updateMatrixWorld(true); } }
    const rootBefore = W.o.position.clone();
    // --- free front paw: look for a new grip on the body every 0.6 s ---
    if (this.p.contact && (this._needPaw || ((this.t - (this._pawT || 0)) > 0.6 && (this.prof.onePaw ? ![R.legs.fL, R.legs.fR].some(L => L && L.anchor) : [R.legs.fL, R.legs.fR].some(L => L && !L.anchor))))) { this._needPaw = false; this._pawT = this.t; this._rechooseFree(); }
    // --- feet: plant hind feet (and free front paws), steps when the body moves away ---
    this._feetPlan(dt);
    const push = new T.Vector3(); let pushSum = 0;
    for (let pass = 0; pass < 3; pass++) {
      if (pass > 0) { W.mixer.update(0); R.setJaw(c.jawCur); W.o.updateMatrixWorld(true); }
      if (pass === 0) this._bdStep = false; this._bodyDrive(dt);
      R.captureNeckRef();
      this._feetIK(dt, pass === 0);
      this._hk = this._hk || {}; R.headIKSafe(target, this.contactW, tn, p.headAlign, { roll: c.roll, yaw: c.yaw }, c.lift < 0.08 ? this._hk : null);
      const ign = this._ign || (this._ign = new Map()); ign.clear();
      for (const k of ['fL', 'fR']) { const L = R.legs[k]; if (L && L.anchor) { const pp = R._sole(L, L._sp || (L._sp = new T.Vector3())); const sd = k[1]; if (!this.prof.onePaw) ign.set('f_up' + sd, pp); ign.set('f_lo' + sd, pp); } }
      const pen = R.penetration(R.wBody, push, ign);
      R.maxPen = pen; if (pen < 0.002 || pass === 2) break;
      push.y = 0; const L = push.length(); if (L < 1e-6) break;
      push.multiplyScalar(Math.min(0.12, pen * 1.05 + 0.002) / L);
      W.o.position.add(push); W.o.updateMatrixWorld(true); pushSum += push.length(); if (!this.lock && this.rootBias) this.rootBias.add(push);
    }
    this._finalClear(target, tn);
    this.dbg = { err: +R.mouth(new T.Vector3()).distanceTo(target).toFixed(4), push: +pushSum.toFixed(4), pen: +R.maxPen.toFixed(4) };
  }
  _clearPlant(p) {                                  // move a ground foothold out from under / inside the prey body
    const R = this.rig; _updSpheres(R.pS); const pad = 0.05 * this.wolf.o.scale.x;
    for (let it = 0; it < 4; it++) { let moved = false;
      for (const s of R.pS) { const dx = p.x - s.w.x, dz = p.z - s.w.z, dy = Math.max(0, s.w.y - s.rw - p.y); const need = s.rw + pad; const h2 = dx * dx + dz * dz;
        if (dy > pad) continue; const hr = Math.sqrt(Math.max(0, need * need - dy * dy)); if (h2 >= hr * hr) continue;
        const h = Math.sqrt(h2) || 1e-4, k = (hr - h) / h; p.x += dx * k; p.z += dz * k; moved = true; }
      if (!moved) break; }
    p.y = this.groundY(p.x, p.z); return p;
  }
  // last line of defence each frame: exact skin-depth test of every paw (anchored or standing) and the jaws;
  // a paw found inside the prey lets go and stands outside it, the head backs off along the skin normal
  _finalClear(target, tn) {
    const R = this.rig, T = this.T, up = new T.Vector3(0, 1, 0);
    for (const L of Object.values(R.legs)) {
      L.pk = L.pk || {}; const pts = R._wpts(L.pawPts, L._wp || (L._wp = []));
      let d = R.surfDepth(L.pk, pts); const kk = (L.front ? 'f' : 'h') + L.bones[0].name.slice(-1);
      const press = this.p.pawPress && this.v5.pawSink != null && L.front && L.anchor && L.trans >= 1;   // v5: the pinning paw presses into the feathers
      const rv = press ? 0 : R.revDepth(L.pk, R.wPawS[kk], 0.8); if (rv > 0.004) d = Math.min(d, -rv);
      if (d > (press ? -0.026 : -0.004)) continue;
      if (L.anchor && L.trans < 1) {                      // on its way to the grip: raise the paw over the body instead of letting go
        const sole = R._sole(L, new T.Vector3()); let lift = -d + 0.008;
        for (let it = 0; it < 4; it++) { R.legIK(L, sole.clone().addScaledVector(up, lift), 1, up, 0.5); const d2 = Math.min(R.surfDepth(L.pk, R._wpts(L.pawPts, pts)), -R.revDepth(L.pk, R.wPawS[kk], 0.8)); if (d2 > -0.003) break; lift += -d2 + 0.006; }
        continue;
      }
      if (L.anchor && rv > 0.004 && d === -rv) {              // something of the prey pokes into the paw: lift it off a little and keep the grip
        const p = new T.Vector3(), n = new T.Vector3(); R.anchorWorld(L.anchor, p, n); let lift = rv + 0.004;
        for (let it = 0; it < 3; it++) { R.legIK(L, p.clone().addScaledVector(n, lift), 1, n, 0.9); R.surfDepth(L.pk, R._wpts(L.pawPts, pts)); const r2 = R.revDepth(L.pk, R.wPawS[kk], 0.8); if (r2 < 0.004) break; lift += r2 + 0.004; }
        continue;
      }
      if (L.anchor) { L.dropWhy = 'final d' + d.toFixed(3) + ' rv' + rv.toFixed(3); L.anchor = null; L.freeT = this.t; L.fails = (L.fails || 0) + 1; }
      const sole = R._sole(L, new T.Vector3()); const out = this._clearPlant(new T.Vector3(sole.x, 0, sole.z));
      // push the standing point further out until the exact test passes (max 4 tries)
      for (let it = 0; it < 4; it++) {
        L.plant = out.clone(); L.step = null; R.legIK(L, L.plant, 1, up, 0.5);
        d = R.surfDepth(L.pk, R._wpts(L.pawPts, pts)); if (d > -0.003) break;
        const c = this.prey.o.position; const dir = new T.Vector3(out.x - c.x, 0, out.z - c.z).normalize(); out.addScaledVector(dir, -d + 0.03); out.y = this.groundY(out.x, out.z);
      }
    }
    if (this._hk && this.ctl.spot) {
      const pts = R._wpts(R.headPts, this._hp2 || (this._hp2 = [])); let d = R.surfDepth(this._hk, pts); d = Math.min(d, -R.revDepth(this._hk, R.wJawS, 0.75));
      const sk = this.p.biteSink || 0;
      for (let it = 0; it < 4 && d < -0.002 - sk; it++) { R.headLift += -d - sk + 0.002; R.headIK(new T.Vector3().copy(target).addScaledVector(tn, R.headLift), 1, tn, this.p.headAlign, null); d = R.surfDepth(this._hk, R._wpts(R.headPts, pts)); d = Math.min(d, -R.revDepth(this._hk, R.wJawS, 0.75)); }
      // v3: skull / chin / ears against the prey proxies too (the exact test above only sees the skin around the bite)
      if (this.ctl.lift >= 0.01) { const tol = this.p.headProxyTol; let hp = R.penetration(R.wJawS, null);
        for (let it = 0; it < 3 && hp > tol; it++) { R.headLift += hp - tol + 0.003; R.headIK(new T.Vector3().copy(target).addScaledVector(tn, R.headLift), 1, tn, this.p.headAlign, null); hp = R.penetration(R.wJawS, null); } }
      for (let it = 0; it < 3 && d < -0.004 - sk; it++) {      // head at the end of its reach: the whole wolf eases back along the skin normal
        const back = new T.Vector3(tn.x, 0, tn.z); if (back.lengthSq() < 1e-6) back.copy(this._fwd(this.wolf.yaw)).negate(); back.normalize().multiplyScalar(-d - sk + 0.002);
        this.wolf.o.position.add(back); this.wolf.o.updateMatrixWorld(true); if (!this.lock && this.rootBias) this.rootBias.add(back);
        R.headIK(new T.Vector3().copy(target).addScaledVector(tn, R.headLift), 1, tn, this.p.headAlign, null);
        d = Math.min(R.surfDepth(this._hk, R._wpts(R.headPts, pts)), -R.revDepth(this._hk, R.wJawS, 0.75));
      }
    }
  }
  _feetPlan(dt) {
    const R = this.rig, T = this.T, W = this.wolf;
    for (const L of Object.values(R.legs)) {
      if (L.front && L.anchor) { if (L.trans < 1) L.trans = Math.min(1, L.trans + dt / 0.3); continue; }
      const nat = R._sole(L, new T.Vector3()), gy = this.groundY(nat.x, nat.z);
      if (L.step) {
        L.step.s += dt / 0.2; if (L.step.s >= 1) { L.plant = L.step.to.clone(); L.step = null; }
      } else if (!L.plant) { if (nat.y - gy < 0.045 || (L.front && this.contactW > 0)) L.plant = this._clearPlant(new T.Vector3(nat.x, gy, nat.z)); }
      else {
        const dx = nat.x - L.plant.x, dz = nat.z - L.plant.z, d = Math.hypot(dx, dz);
        if (nat.y - gy > 0.12 && !(L.front && this.contactW > 0)) L.plant = null;
        else if (d > 0.13 * W.o.scale.x) { const to = this._clearPlant(new T.Vector3(nat.x + dx * 0.35, 0, nat.z + dz * 0.35)); L.step = { from: L.plant.clone(), to, s: 0 }; }
        else { const c = this._clearPlant(L.plant.clone()); if (c.distanceTo(L.plant) > 0.03) L.step = { from: L.plant.clone(), to: c, s: 0 }; }
      }
    }
  }
  _feetIK(dt) {
    const R = this.rig, T = this.T, c = this.ctl; const up = new T.Vector3(0, 1, 0);
    for (const L of Object.values(R.legs)) {
      if (L.front && L.anchor) {
        const p = new T.Vector3(), n = new T.Vector3(); R.anchorWorld(L.anchor, p, n); p.addScaledVector(n, this.p.pawPress && this.v5.pawSink != null ? -this.v5.pawSink : 0.003);
        if (L.trans < 1 && L.from) { const u = _ss(0, 1, L.trans); p.lerp(L.from, 1 - u).addScaledVector(n, Math.sin(Math.PI * L.trans) * 0.16); }
        L.pk = L.pk || {}; L.depth = 0; L.reachErr = 0; R.legIKSafe(L, p, this.contactW * c.paws, n, 0.95 * L.trans, L.trans >= 1 ? L.pk : null);
        if (this.p.pawPress && this.v5.pawSink != null && L.trans >= 1 && this.contactW * c.paws > 0.5) {   // v5: the sole itself lands on the grip (aim corrected for the paw's tilt)
          const s = R._sole(L, new T.Vector3()), aim = p.clone(), e = new T.Vector3();
          for (let it = 0; it < 4; it++) { e.copy(p).sub(s); if (e.length() < 0.0015) break; aim.add(e); R.legIK(L, aim, this.contactW * c.paws, n, 0.95, R._hint); R._sole(L, s); }
          L.reachErr = R._sole(L, s).distanceTo(p); L.depth = R.surfDepth(L.pk, R._wpts(L.pawPts, L._wp2 || (L._wp2 = []))); }
        if (L.trans >= 1 && (L.depth < (this.p.pawPress && this.v5.pawSink != null ? -0.03 : -0.015) || L.reachErr > 0.05)) { L.bad = (L.bad || 0) + 1; if (L.bad > 2) { L.dropWhy = 'bad d' + L.depth.toFixed(3) + ' re' + L.reachErr.toFixed(3); L.anchor = null; L.bad = 0; L.freeT = this.t; this._needPaw = true; } } else L.bad = 0;
      } else if (L.step) {
        const u = _ss(0, 1, L.step.s), p = L.step.from.clone().lerp(L.step.to, u); p.y += Math.sin(Math.PI * L.step.s) * 0.07; R.legIK(L, p, 1, up, 0.4);
      } else if (L.plant) R.legIK(L, L.plant, 1, up, 0.5);
    }
  }
  _leapPose() {
    const R = this.rig, T = this.T, W = this.wolf, p = this.p, ct = this._time(W);
    const u = Math.max(0, Math.min(1, (ct - p.leapStartAt) / (p.leapLandAt - p.leapStartAt)));
    const fwd = this._fwd(W.yaw), down = new T.Vector3(0, -1, 0), sc = W.o.scale.x;
    // body stretch: chest up / hips extended in the middle of the flight
    const s = Math.sin(Math.PI * u); R.pitchBone(R.spine[0], -0.10 * s); R.pitchBone(R.spine[1], -0.08 * s);
    for (const L of Object.values(R.legs)) {
      const hip = L.bones[0].getWorldPosition(new T.Vector3());
      if (L.front) {                                // forelegs reach forward for the prey's body
        let tgt; if (L.anchor) { const nn = new T.Vector3(); tgt = R.anchorWorld(L.anchor, new T.Vector3(), nn); tgt.addScaledVector(nn, 0.07); }
        else tgt = hip.clone().addScaledVector(fwd, 0.5 * sc).addScaledVector(down, 0.22 * sc);
        const reach = hip.clone().addScaledVector(fwd, 0.55 * sc).addScaledVector(down, 0.12 * sc);
        tgt.lerp(reach, 1 - _ss(0.5, 0.95, u));
        R.legIK(L, tgt, _ss(0.05, 0.35, u), null, 0);
      } else {                                      // hind legs push back
        const tgt = hip.clone().addScaledVector(fwd, -0.52 * sc).addScaledVector(down, 0.3 * sc);
        R.legIK(L, tgt, _ss(0.0, 0.15, u) * (1 - 0.75 * _ss(0.6, 1.0, u)), null, 0);
      }
    }
    if (this.ctl.spot) { const tp = new T.Vector3(), tn = new T.Vector3(); R.anchorWorld(this.ctl.spot, tp, tn); tp.addScaledVector(tn, 0.03); R.headIK(tp, 0.85 * _ss(0.45, 1.0, u), tn, 0.3); }
    // in the air: keep the whole wolf (paws included) out of the prey's body
    const push = new T.Vector3();
    for (let it = 0; it < 3; it++) {
      const pen = R.penetration(R.wS, push); if (pen < 0.003) break; push.y = 0;
      const side = new T.Vector3(Math.cos(this.prey.yaw), 0, -Math.sin(this.prey.yaw)); const s = push.dot(side); push.copy(side).multiplyScalar(s);
      const L = push.length(); if (L < 1e-6) break;
      push.multiplyScalar(Math.min(0.15, pen + 0.004) / L); W.o.position.add(push); W.o.updateMatrixWorld(true);
    }
    // exact skin test for paws and jaws in the air: anything inside is raised out (paws) or eased back (head)
    const up = new T.Vector3(0, 1, 0);
    for (const L of Object.values(R.legs)) {
      L.pk = L.pk || {}; const pts = R._wpts(L.pawPts, L._wp || (L._wp = [])); const kk = (L.front ? 'f' : 'h') + L.bones[0].name.slice(-1);
      let d = Math.min(R.surfDepth(L.pk, pts), -R.revDepth(L.pk, R.wPawS[kk], 0.8)); if (d > -0.003) continue;
      const sole = R._sole(L, new T.Vector3()); let lift = -d + 0.01;
      for (let it = 0; it < 4; it++) { R.legIK(L, sole.clone().addScaledVector(up, lift), 1, null, 0); d = Math.min(R.surfDepth(L.pk, R._wpts(L.pawPts, pts)), -R.revDepth(L.pk, R.wPawS[kk], 0.8)); if (d > -0.003) break; lift += -d + 0.008; }
    }
    if (this.ctl.spot) {
      this._hk = this._hk || {}; const pts = R._wpts(R.headPts, this._hp2 || (this._hp2 = []));
      let d = Math.min(R.surfDepth(this._hk, pts), -R.revDepth(this._hk, R.wJawS, 0.75));
      for (let it = 0; it < 3 && d < -0.003; it++) { const back = this._fwd(W.yaw).multiplyScalar(d - 0.004); W.o.position.add(back); W.o.updateMatrixWorld(true); d = Math.min(R.surfDepth(this._hk, R._wpts(R.headPts, pts)), -R.revDepth(this._hk, R.wJawS, 0.75)); }
    }
  }

  _preySteer(dt, speed) {
    const P = this.prey, p = this.p, T = this.T;
    const away = P.o.position.clone().sub(this.wolf.o.position); away.y = 0; const d = away.length() || 1; away.divideScalar(d);
    this.wanderPhase += dt;
    const wa = p.wander * (Math.sin(this.wanderPhase * 0.9) * 0.7 + Math.sin(this.wanderPhase * 2.3 + 1.3) * 0.3);
    const dir = away.clone().applyAxisAngle(new T.Vector3(0, 1, 0), wa * 0.9);
    if (p.arena) {
      const c = new T.Vector3(p.arena.x - P.o.position.x, 0, p.arena.z - P.o.position.z); const cd = c.length();
      if (cd > p.arena.r * 0.6) dir.add(c.normalize().multiplyScalar(2.2 * (cd - p.arena.r * 0.6) / (p.arena.r * 0.4)));
    }
    if (this.avoid) { const v = this.avoid(P.o.position.x, P.o.position.z); if (v) dir.add(new T.Vector3(v.x, 0, v.z)); }
    this._turn(P, Math.atan2(dir.x, dir.z), p.preyTurnRate, dt);
    P.speed += Math.max(-8 * dt, Math.min(8 * dt, speed - P.speed));
    P.o.position.addScaledVector(this._fwd(P.yaw), P.speed * dt);
    this._setScale(P, Math.max(0.5, P.speed / this.prof.fleeClipSpeed));
  }

  _updatePrey(dt) {
    const P = this.prey, p = this.p, pr = this.prof;
    switch (P.state) {
      case 'unaware': {
        if (this._dist() < p.noticeDist || this.wolf.state === 'chase') { P.state = 'flee'; this._play(P, pr.flee, { fade: 0.15 }); this._event('notice'); }
        break;
      }
      case 'flee': {
        const boost = (this.boostUntil && this.t < this.boostUntil) ? p.escapeBoost : 1;
        this._preySteer(dt, pr.fleeSpeed * boost);
        break;
      }
      case 'knocked': {
        if (this.knockT < 0.45 && this.knockT + dt >= 0.45) this._event('knockdown');
        this.knockT += dt;
        P.speed = Math.max(0, this.knockV * (1 - this.knockT / p.knockSlide));
        P.o.position.addScaledVector(this._fwd(P.yaw), P.speed * dt);
        const kd = pr.knock && P.clips[pr.knock] && !Array.isArray(P.clips[pr.knock]) ? P.clips[pr.knock].duration : 0.6;
        if (this.knockT >= kd) {
          P.state = 'struggle'; this.strT = 0; this.held = 0;
          if (this.rig && this.wolf.state !== 'shaken') this._rechoosePaws();
          if (pr.struggle !== pr.knock) this._play(P, pr.struggle, { fade: 0.0 });
          this._event('struggle');
        }
        break;
      }
      case 'struggle': {
        this.held += dt; const before = this.strT; this.strT += dt;
        const cyc = p.struggleCycle;
        if (Math.floor(this.strT / cyc) > Math.floor(before / cyc)) {      // one struggle cycle done → escape attempt
          const strength = Math.max(0, 1 - this.held / p.killTime);
          let esc = p.rng() < p.escapeChance * strength;
          if (p.forceOutcome === 'escape') esc = this.held > cyc * 1.5;
          if (p.forceOutcome === 'kill') esc = false;
          if (esc && pr.getup) { this._escape(); break; }
        }
        if (this.held >= p.killTime) this._kill();
        break;
      }
      case 'getup': {
        this.getT += dt;
        const ga = P.clips[pr.getup].duration, mv = pr.getupMoveFrom;
        const u = Math.max(0, (this.getT - mv) / (ga - mv));
        P.speed = pr.fleeSpeed * p.escapeBoost * Math.min(1, u) * 0.8;
        P.o.position.addScaledVector(this._fwd(P.yaw), P.speed * dt);
        if (this.getT > mv) this._preySteerTurnOnly(dt);
        if (this.getT >= ga) { P.state = 'flee'; this._play(P, pr.flee, { fade: 0.1 }); this.boostUntil = this.t + p.boostTime; }
        break;
      }
      case 'dead': break;
    }
  }
  _preySteerTurnOnly(dt) {
    const P = this.prey; const away = P.o.position.clone().sub(this.wolf.o.position);
    this._turn(P, Math.atan2(away.x, away.z), this.p.preyTurnRate * 0.6, dt);
  }

  _escape() {
    const P = this.prey, W = this.wolf;
    P.state = 'getup'; this.getT = 0; this._play(P, this.prof.getup, { fade: 0.1, once: true });
    W.state = 'shaken'; this.shakenT = 0; this.lock = null; this._play(W, W.clips.Hit ? 'Hit' : 'Idle', { fade: 0.15, once: true });
    this.tired = true; this.outcome = 'escaped'; this._event('escape');
  }
  _kill() {
    const P = this.prey, W = this.wolf;
    P.state = 'dead'; this.outcome = 'killed';
    if (Array.isArray(P.clips[this.prof.death])) this._play(P, this.prof.death, { fade: 0.6, once: true, startAt: P.clips.Death.duration * 0.999 });
    else this._play(P, this.prof.death, { fade: 0.8, once: true, startAt: P.clips[this.prof.death].duration * 0.999 });
    if (W.state !== 'reposition') W.state = 'pinkill'; this.relT = 0; this._event('kill');
  }

  _updateWolf(dt) {
    const W = this.wolf, P = this.prey, p = this.p;
    switch (W.state) {
      case 'stalk': {
        const to = P.o.position.clone().sub(W.o.position); this._turn(W, Math.atan2(to.x, to.z), 2.0, dt);
        W.speed = p.stalkSpeed; W.o.position.addScaledVector(this._fwd(W.yaw), W.speed * dt);
        if (P.state === 'flee' || this._dist() < p.noticeDist * 0.9) { W.state = 'chase'; this.chaseT0 = this.t; this._play(W, 'Run', { fade: 0.25 }); this._event('chase'); }
        break;
      }
      case 'chase': {
        this.chaseTime += dt;
        // aim for the spot beside the prey where the wolf will be when it holds it
        // v3: the leap must start from the side the wolf lands on — if it is behind the wrong flank it swings wide round the rump first
        const _wl = this._toLocalP(W.o.position); const _six = Math.sign(this.impactLocal.x || 1);
        let sideOK = !this.rig || Math.abs(this.impactLocal.x) < 0.15 || (_wl.x * _six > 0.45 * P.o.scale.x);
        if (!sideOK && this._dist() < p.leapRange * 1.6) { this._sideT = (this._sideT || 0) + dt; if (this._sideT > (p.sideWait ?? 3.0)) sideOK = true; }
        const _aim = sideOK ? this.impactLocal : new this.T.Vector3(this.impactLocal.x * 1.9, 0, this.impactLocal.z - 1.3 * P.o.scale.x);
        const target = this._toWorld(_aim, P.o.position.clone().addScaledVector(this._fwd(P.yaw), P.speed * 0.35), P.yaw);
        const to = target.clone().sub(W.o.position); to.y = 0;
        this._turn(W, Math.atan2(to.x, to.z), p.wolfTurnRate, dt);
        let vmax = p.chaseSpeed * (this.tired ? p.tiredFactor : 1);
        if (this.prof.grab === 'body') vmax = Math.min(vmax, this.prof.fleeSpeed * 1.7);
        W.speed += Math.max(-p.chaseAccel * dt, Math.min(p.chaseAccel * dt, vmax - W.speed));
        W.o.position.addScaledVector(this._fwd(W.yaw), W.speed * dt);
        this._setScale(W, Math.max(0.5, Math.min(1.4, W.speed / 8.0)));
        if (this.tired && (this._dist() > p.giveUpDist || this.chaseTime > p.giveUpTime)) { this._giveUp(); break; }
        if (!this.tired || this._dist() < p.leapRange) {
          const tau = (p.leapLandAt - p.leapStartAt);
          const land = this._toWorld(this.impactLocal, P.o.position.clone().addScaledVector(this._fwd(P.yaw), P.speed * tau), P.yaw);
          const need = land.distanceTo(W.o.position) / tau;
          if (sideOK && this._dist() < p.leapRange && need < p.leapMaxSpeed && (P.state === 'flee')) {
            if (this.tired) break;                                   // a tired wolf does not leap again
            W.state = 'leap'; this.leapFrom = W.o.position.clone();
            if (this.rig) { this.ctl.spot = this.rig.pickAnchor(this.prof.biteGrab); this.ctl.lift = 0.05; if (this.prof.pawGrab) this._pickPaws(this.prof.pawGrab); }
            this._play(W, W.clips.AttackLeapInPlace ? 'AttackLeapInPlace' : 'AttackLeap', { fade: 0.08, once: true, startAt: p.leapStartAt });
            this._event('leap');
          }
        }
        break;
      }
      case 'leap': {
        const ct = this._time(W);
        if (ct < p.leapLandAt) {
          const tau = Math.max(1e-3, p.leapLandAt - ct);
          const il = this.impactLocal.clone(); if (this.rig) il.x += Math.sign(il.x || 1) * 0.5 * Math.pow(tau / (p.leapLandAt - p.leapStartAt), 1.5) * P.o.scale.x * 1.25;
          const land = this._toWorld(il, P.o.position.clone().addScaledVector(this._fwd(P.yaw), P.speed * tau), P.yaw);
          const v = land.clone().sub(W.o.position); v.y = 0;
          const need = v.length() / tau, sp = Math.min(need, p.leapMaxSpeed * 1.15);
          if (v.length() > 1e-4) W.o.position.addScaledVector(v.normalize(), sp * dt);
          this._turn(W, P.yaw + this.impactYaw, 3.0, dt);
        } else {
          if (!this.grabbed) {
            this.grabbed = true; this._event('grab');
            P.state = 'knocked'; this.knockT = 0; this.knockV = P.speed;
            this._play(P, this.prof.knock, { fade: 0.1, once: true });
            this.attachErr = W.o.position.clone().sub(this._toWorld(this.impactLocal, P.o.position, P.yaw));
          }
          if (this.rig) {                                              // v2: the contact layer keeps the jaw + paws on the prey; the root follows the bite
            // v3: ride along with the skidding prey (its translation is carried over 1:1) so the wolf never chases it through its body
            if (this._carryFrom) { const d = P.o.position.clone().sub(this._carryFrom); d.y = 0; W.o.position.add(d); }
            this._carryFrom = P.o.position.clone();
            const early = P.state === 'knocked' && this.knockT < 0.45;
            this._turn(W, early ? P.yaw + this.impactYaw : this._yawFor(), early ? 2.0 : 2.6, dt);
          } else {
          // ride along with the prey (teeth in) while it skids, fading out any landing error
          this.attachErr.multiplyScalar(Math.max(0, 1 - dt / 0.12));
          W.o.position.copy(this._toWorld(this.impactLocal, P.o.position, P.yaw)).add(this.attachErr);
          this._turn(W, P.yaw + this.impactYaw, 4.0, dt);
          }
          if (ct >= 1.45) {
            this.attachErr.set(0, 0, 0);
            if (this.path && !this.rig) { W.state = 'reposition'; this.pathI = 0; this._play(W, 'Walk', { fade: 0.25 }); }
            else { W.state = 'pin'; this._play(W, 'EatStart', { fade: 0.25, once: true, startAt: 0.15 }); this.pinT = 0; }
          }
        }
        break;
      }
      case 'reposition': {                                            // step round the fallen prey to the throat (Walk, feet stepping)
        const tgt = this._toWorld(this.path[this.pathI], P.o.position, P.yaw);
        const v = tgt.clone().sub(W.o.position); v.y = 0; const d = v.length();
        const last = this.pathI === this.path.length - 1;
        if (d > 0.04) {
          const want = last && d < 0.25 ? P.yaw + this.pinYaw : Math.atan2(v.x, v.z);
          this._turn(W, want, 5.0, dt);
          const step = Math.min(d, 1.3 * dt);
          W.o.position.addScaledVector(v.normalize(), step);
        } else if (!last) this.pathI++;
        else {
          let dy = P.yaw + this.pinYaw - W.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
          this._turn(W, P.yaw + this.pinYaw, 4.0, dt);
          if (Math.abs(dy) < 0.08) { W.state = P.state === 'dead' ? 'pinkill' : 'pin'; this.relT = 0; this.pinT = 0; this._play(W, 'EatStart', { fade: 0.25, once: true, startAt: 0.15 }); }
        }
        break;
      }
      case 'pin': case 'pinkill': {
        this.pinT = (this.pinT || 0) + dt;
        if (!this.rig) W.o.position.copy(this._toWorld(this.pinLocal, P.o.position, P.yaw));
        this._turn(W, this.rig ? this._yawFor() : P.yaw + this.pinYaw, this.rig ? 2.0 : 4.0, dt);
        if (W.curName === 'EatStart' && this._time(W) >= 0.78) this._play(W, 'Eat', { fade: 0.15, timeScale: p.pinShake });
        if (W.state === 'pinkill') {
          this.relT += dt;
          if (this.relT > 0.8 && W.curName !== 'Idle' && W.state !== 'release') { if (!this.rig) this._play(W, 'Idle', { fade: 0.4 }); W.state = 'release'; this.relT = 0; }
        }
        break;
      }
      case 'release': {
        this.relT += dt;
        if (this.rig) this._turn(W, this._yawFor(), 2.0, dt);
        if (this.relT > p.releaseTime) {
          W.state = 'eat'; this._play(W, 'EatStart', { fade: 0.25, once: true }); this.done = true; this._event('eat');
          if (this.rig) { this.spotAnchors = (this.prof.spots || []).map(s => this.rig.pickAnchor(s)).filter(Boolean); this.maul.ph = 0; this.maul.pt = 0; this.maul.spotI = 0; }
        }
        break;
      }
      case 'eat': {
        if (W.curName === 'EatStart' && this._time(W) >= 0.78) this._play(W, 'Eat', { fade: 0.15 });
        if (this.rig) this._turn(W, this._yawFor(), 2.0, dt);
        break;
      }
      case 'shaken': {
        this.shakenT += dt;
        if (this.shakenT > 0.7) { W.state = 'chase'; W.speed = 2; this._play(W, 'Run', { fade: 0.2 }); }
        break;
      }
      case 'giveup': {
        this.guT += dt;
        W.speed = Math.max(0, W.speed - 4 * dt);
        W.o.position.addScaledVector(this._fwd(W.yaw), W.speed * dt);
        if (W.speed > 1.5) this._setScale(W, Math.max(0.5, W.speed / 8));
        else if (W.curName === 'Run') this._play(W, 'Walk', { fade: 0.3 });
        if (W.speed === 0 && W.curName === 'Walk') this._play(W, p.howlOnGiveUp && W.clips.Howl ? 'Howl' : 'Idle', { fade: 0.4, once: p.howlOnGiveUp });
        break;
      }
    }
  }
  _giveUp() { const W = this.wolf; W.state = 'giveup'; this.guT = 0; this.done = true; this._event('giveup'); }
}
