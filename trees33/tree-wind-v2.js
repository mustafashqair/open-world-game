// tree-wind-v2.js — progressive wind for the «العالم المفتوح» trees (three@0.160). Same API as tree-wind.js.
// v2 (pine fix 2): the tree no longer leans as one rigid piece. The trunk BENDS with height (lower trunk almost still,
// top moves most: offset grows with height squared), branches flex on top of that with their own lag (phase delayed
// with distance from the trunk) and a small up/down bob, and needle tips flutter. Uses the same `_WIND` attribute
// (0 at the trunk base, ~1 at the outer cards) — old GLBs keep working with it.
// Usage (identical to v1):
//   import { applyTreeWind } from './tree-wind-v2.js';
//   const windU = { uTime: { value: 0 }, uWind: { value: 1 } };
//   gltf.scene.traverse(o => { if (o.isMesh) applyTreeWind(o.material, windU); });
//   // each frame: windU.uTime.value = clock.elapsedTime;   (uWind 0 = calm, 1 = breeze, 2 = strong)
// opts: amplitude (default 0.03 = metres of top sway per metre of a 14 m tree), refHeight (14), branchFlex (1), keepNormals, alphaToCoverage.
// v2.1 (fir fix 3, backward compatible — with no opts and no material.userData the output is exactly the v2 pine wind above):
//   material.userData (filled by GLTFLoader from the GLB material "extras") or opts can switch on, per material:
//   - windProfile / opts.profile = 'lag'  -> the fir profile: the same height^2 bend, but the TOP LAGS the trunk (phase delay grows
//     with _WIND), a slow gust envelope, branch flex growing with (distance from the trunk)^1.5 with the phase travelling outward
//     (tips move most and later), plus needle flutter. opts.flex (0.014), opts.flutter (0.02).
//   - translucency / opts.translucency (0..1) and transTint ([r,g,b]) -> light transmission through the needles: sun seen THROUGH a
//     spray (view·light), light arriving on the far side of a card (wrap), and sky light through the undersides when looking up.
//     Only vertices with the _TRANS attribute = 1 (needle cards) get it; bark, twigs and cones carry 0. GLBs without _TRANS get none.
//   fir-*.glb carry { windProfile:'lag', translucency:0.6, transTint:[0.78,1,0.42] } in their material extras, so the same call works.
// v2.2 (willow fix 2, backward compatible — every material without the switch below compiles exactly as v2.1 above):
//   OPTIONAL per-strand motion for hanging foliage (willow). On only for a material whose GLB material extras carry
//   {"treeWindStrands": 1} (GLTFLoader puts that in material.userData.treeWindStrands), or when opts.strands === true.
//   In strand mode `_WIND` is read as a VEC3: x = the usual wind weight, y = per-strand random phase (0..1 -> 0..2π),
//   z = position along the hanging strand (0 at the twig it hangs from, 1 at its tip). Each strand then swings as a
//   pendulum with its own phase and a slightly different speed; the swing grows toward the tip and lags behind it,
//   so neighbouring strands no longer move in step. Strand mode always uses the 'bend' profile.
//   Strand mode also keeps thin cut-out strands from thinning out at a distance: alpha is scaled up with the texture
//   mip level once the strands are only a few pixels wide (opts.mipAlpha, default 0.22, 0 turns it off; opts.mipBias 3.0 =
//   how many mip levels down before it starts, so close-up strands keep their real width).
//   opts for strand mode: strandAmp (0.22 = metres of tip swing at uWind 1), strandLag (1.6), mipAlpha (0.22), mipBias (3).
//   willow-*.glb (fix 2) carry { treeWindStrands: 1 } on their leaf material, so the same applyTreeWind call works.
export function applyTreeWind(material, uniforms, opts = {}) {
  const amp = (opts.amplitude ?? 0.03).toFixed(4);
  const refH = (opts.refHeight ?? 14.0).toFixed(2);
  const bfx = (opts.branchFlex ?? 1.0).toFixed(3);
  const ud = material.userData || {};
  const profile = opts.profile ?? ud.windProfile ?? 'bend';
  const flex = (opts.flex ?? 0.014).toFixed(4);
  const flut = (opts.flutter ?? 0.02).toFixed(4);
  const tk = Math.max(0, +(opts.translucency ?? ud.translucency ?? 0) || 0);
  const tt = opts.transTint ?? ud.transTint ?? [0.78, 1.0, 0.42];
  const tint = `vec3(${(+tt[0]).toFixed(3)}, ${(+tt[1]).toFixed(3)}, ${(+tt[2]).toFixed(3)})`;
  const sAmp = (opts.strandAmp ?? 0.22).toFixed(4);
  const sLag = (opts.strandLag ?? 1.6).toFixed(3);
  const MIP = (opts.mipAlpha ?? 0.22).toFixed(3);
  const MIPB = (opts.mipBias ?? 3.0).toFixed(2);
  const prev = material.onBeforeCompile;
  material.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uTime = uniforms.uTime; sh.uniforms.uWind = uniforms.uWind;
    const S = strandsOn(material, opts);
    const WV = S ? '_wind.x' : '_wind';
    sh.vertexShader = (S ? 'attribute vec3 _wind;\n' : 'attribute float _wind;\n') + 'uniform float uTime;\nuniform float uWind;\n' + sh.vertexShader.replace('#include <begin_vertex>', (profile === 'lag' && !S) ? `#include <begin_vertex>
      {
        vec4 wp = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #ifdef USE_INSTANCING
          wp = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #endif
        float ph = dot(wp.xz, vec2(0.21, 0.17));
        float hgt = max(position.y, 0.0);
        float rr = length(position.xz);
        float gust = 0.78 + 0.22 * sin(uTime * 0.37 + ph * 0.5) + 0.08 * sin(uTime * 0.91 + ph);
        // 1+2) progressive bend, top lagging
        float lag = 0.55 * _wind;
        float sway = sin(uTime * 1.25 + ph - lag) * 0.7 + sin(uTime * 2.05 + ph * 1.7 - lag * 1.6) * 0.3;
        float w = _wind * _wind * uWind * gust;
        vec2 off = vec2((0.2 + sway) * w * hgt * ${amp}, cos(uTime * 1.05 + ph * 1.3 - lag) * 0.6 * w * hgt * ${amp});
        transformed.xz += off;
        transformed.y -= dot(off, off) / (2.0 * max(hgt, 1.0));
        // 3) branch flex: grows with distance from the trunk axis, phase travels outward (tips lag)
        float fk = pow(rr, 1.5) * ${flex} * uWind * gust;
        float bp = uTime * 2.2 + ph + dot(position.xz, vec2(0.37, 0.29)) - rr * 0.9;
        transformed.y += sin(bp) * fk;
        transformed.xz += vec2(sin(bp - 0.7), cos(bp * 0.9 - 0.4) * 0.6) * fk * 0.55;
        // 4) flutter of the outer needles / leaves
        float fl = (smoothstep(0.4, 2.2, rr) + max(0.0, _wind - 0.45)) * uWind * ${flut};
        float lp = dot(position, vec3(3.1, 2.3, 2.7));
        transformed += vec3(sin(uTime * 4.3 + lp), sin(uTime * 5.1 + lp * 1.3) * 0.6, cos(uTime * 3.9 + lp)) * fl;
      }` : `#include <begin_vertex>
      {
        vec4 wp = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #ifdef USE_INSTANCING
          wp = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #endif
        float ph = dot(wp.xz, vec2(0.21, 0.17));
        float hgt = max(position.y, 0.0);
        // 1) trunk bend: grows with height^2 (a cantilever), applied to every vertex so crown and trunk move together
        float bend = hgt * hgt * ${amp} / ${refH} * uWind;
        float sway = sin(uTime * 1.25 + ph) * 0.7 + sin(uTime * 2.05 + ph * 1.7) * 0.3;
        transformed.x += sway * bend;
        transformed.z += cos(uTime * 1.05 + ph * 1.3) * bend * 0.6;
        // 2) branch flex: lags behind the trunk, more toward the branch tips
        float rad = length(position.xz);
        float wb = smoothstep(0.15, 1.0, ${WV}) * uWind * ${bfx};
        float lag = rad * 0.9 + hgt * 0.12${S ? ' - _wind.y * 2.2' : ''};
        float bs = sin(uTime * 1.25 + ph - lag) * 0.7 + sin(uTime * 2.3 + ph * 1.3 - lag * 1.4) * 0.3;
        transformed.x += bs * wb * rad * 0.035;
        transformed.z += cos(uTime * 1.1 + ph * 1.3 - lag) * wb * rad * 0.025;
        transformed.y += sin(uTime * 1.7 + ph - lag * 1.2) * wb * rad * 0.022;
        // 3) needle / leaf tip flutter
        float fl = max(0.0, ${WV} - 0.45) * uWind;
        float lp = dot(position, vec3(3.1, 2.3, 2.7));
        transformed += vec3(sin(uTime * 4.3 + lp), sin(uTime * 5.1 + lp * 1.3) * 0.6, cos(uTime * 3.9 + lp)) * fl * 0.04;${S ? `
        // 4) hanging strands (strand mode only): own phase, own speed, swing grows and lags toward the tip
        float sph = _wind.y * 6.2831853;
        float st = clamp(_wind.z, 0.0, 1.0);
        float sf = 0.82 + 0.36 * fract(_wind.y * 7.31);
        float sa = st * st * uWind * ${sAmp};
        float sl = st * ${sLag};
        transformed.x += (sin(uTime * 1.3 * sf + sph - sl) * 0.75 + sin(uTime * 2.7 * sf + sph * 1.7 - sl * 1.3) * 0.25) * sa;
        transformed.z += (cos(uTime * 1.1 * sf + sph * 1.3 - sl) * 0.8 + sin(uTime * 2.2 * sf + sph * 2.3 - sl) * 0.2) * sa * 0.75;
        transformed.y += sin(uTime * 1.9 * sf + sph - sl) * sa * 0.12;` : ''}
      }`);
    if (S && +MIP > 0) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      #ifdef USE_MAP
        {
          vec2 tsz = vec2(textureSize(map, 0));
          vec2 dd = max(abs(dFdx(vMapUv * tsz)), abs(dFdy(vMapUv * tsz)));
          diffuseColor.a *= 1.0 + clamp(log2(max(max(dd.x, dd.y), 1e-4)) - ${MIPB}, 0.0, 4.0) * ${MIP};
        }
      #endif`);
    }
    if (tk > 0) {
      sh.vertexShader = 'attribute float _trans;\nvarying float vTrans;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  vTrans = _trans;');
      sh.fragmentShader = 'varying float vTrans;\n' + sh.fragmentShader.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
      {
        vec3 tV = normalize(vViewPosition);                                   // surface -> camera (view space)
        float thin = 1.0 - 0.5 * clamp((diffuseColor.a - 0.5) * 2.0, 0.0, 1.0); // thinner (more alpha-cut) needle edges pass more light
        float tw = vTrans * ${tk.toFixed(3)} * thin;
        vec3 tUp = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        float tun = vTrans * smoothstep(0.05, 0.55, dot(-tV, tUp));          // camera below, looking up at the shaded underside
        reflectedLight.directDiffuse *= 1.0 - 0.55 * tun;                     // ...so it is not lit like the sunny top
        reflectedLight.indirectDiffuse *= 1.0 - 0.35 * tun;
        tw *= 1.0 + 0.8 * tun;
        reflectedLight.indirectSpecular *= 1.0 - vTrans * (0.55 + 0.4 * tun); // needles are matte: no grey sky sheen at grazing angles
        reflectedLight.directSpecular *= 1.0 - vTrans * (0.4 + 0.5 * tun);
        #if NUM_DIR_LIGHTS > 0
          vec3 tL = directionalLights[0].direction;                           // surface -> sun
          float tsc = pow(clamp(dot(-tV, tL), 0.0, 1.0), 2.5);                // looking toward the sun through the spray
          float twr = clamp(0.5 - 0.5 * dot(normal, tL), 0.0, 1.0);           // sun on the far side of the card
          reflectedLight.directDiffuse += diffuseColor.rgb * ${tint} * directionalLights[0].color * tw * (tsc * 0.85 + twr * 0.30);
        #endif
        #if NUM_HEMI_LIGHTS > 0
          float tup = clamp(dot(-tV, tUp), 0.0, 1.0);                         // looking up at the undersides
          reflectedLight.indirectDiffuse += diffuseColor.rgb * ${tint} * hemisphereLights[0].skyColor * tw * tup * 0.45;
        #endif
      }`);
    }
    if (opts.keepNormals !== false) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>',
        'float faceDirection = 1.0;\nvec3 normal = normalize( vNormal );\nvec3 nonPerturbedNormal = normal;\n#ifdef USE_NORMALMAP_TANGENTSPACE\n  mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );\n#endif');
    }
  };
  if (opts.alphaToCoverage !== false) material.alphaToCoverage = true;
  material.customProgramCacheKey = () => 'treewind2' + amp + refH + bfx + (profile === 'lag' && !strandsOn(material, opts) ? 'L' + flex + flut : '') + (tk > 0 ? 'T' + tk + tint : '') + (strandsOn(material, opts) ? 'S' + sAmp + sLag + MIP + MIPB : '');
  material.needsUpdate = true;
  return material;
}

function strandsOn(material, opts) {
  if (opts.strands === false) return false;
  return opts.strands === true || !!(material.userData && material.userData.treeWindStrands);
}
