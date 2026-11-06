// maple-wind.js (fix 7) — maple-only wind add-on for the «العالم المفتوح» maple fix-2/fix-3 GLBs (three@0.160). Same API style as tree-wind.js.
// Fix 7 (same API, same attributes): HIGH/MID leaf cards now carry 5-lobed maple leaf CLUSTERS; cards seen edge-on fade out using the true face normal
//   (no smeared streaks at the crown edge), and HIGH/MID leaf textures sample with a small mip bias (opts.mipBias, default -0.5) so the leaf shapes stay readable.
//   New options: opts.edgeFade (default 1, 0 = off), opts.mipBias. Shader cache key: maplewind7.
// Use it INSTEAD of tree-wind.js / tree-wind-v2.js on the maple meshes (do not stack both).
// Reads the maple's own vertex attributes (GLTFLoader lower-cases them):
//   _wind  (vec3, unchanged)   x = bend weight graded by height (0 trunk base -> ~1 crown top)
//   _mwind (vec4, new)         x = per-branch phase 0..1, y = per-clump phase 0..1, z = clump weight (1 on a clump's leaves AND
//                              on the twigs/branch ends that carry it, fading to 0 toward the trunk), w = per-leaf phase 0..1
//   _mflex (vec2, new)         x = leaf tip weight (0 at the petiole row, 1 at the tip row), y = signed side across the blade (-1..1)
// Trunk bend is the same formula as tree-wind.js, so a maple next to the other trees bends with them. On top of it:
//   - each main branch swings with its own random phase; each leaf clump swings with its own random phase, and the twigs and
//     branch ends under a clump carry the SAME clump motion (so lower-crown branches move with their leaves);
//   - each leaf flaps from its petiole with its own phase, and its blade cups and twists (tips flex instead of a rigid plate).
// Leaves also get back-lit translucency (light coming through the crown) — opts.translucency (default 0.35).
// Fix 4 additions (same API, same attributes):
//   - gusts: a slow per-tree gust envelope (0..1) built from two incommensurate sines and the tree's world position;
//   - upper-trunk flex: a very slight curved bend that starts above the lower trunk and grows with height^2, driven by the gust,
//     so the trunk top and the crown above it bow a little as a unit (leaves ride with it — same formula on bark and leaves);
//   - main-limb flex: each main limb bends a little with its own phase (_mwind.x), from ~0 at the trunk union to its tip,
//     scaled by the gust; twigs and leaves carried by the limb ride along (same per-branch phase on bark and leaves);
//   - leaf flutter keeps the fix-3 formula with a soft peak limiter, so neighbouring cards touch less at gust peaks;
//   - leaf lighting: specular and cool sky/ground fill on leaves are re-tinted toward the leaf's own green (more on inner,
//     shaded cards), so inner cards seen from below no longer read pale blue-grey; soft anti-aliased alpha edges
//     (alpha-to-coverage) instead of a hard cut. Options: opts.gust (default 1), opts.trunkFlex (1), opts.limbFlex (1), opts.leafTint (1).
// Fix 5 (same API; reads one more attribute, _mlimb = distance along the wood from the trunk surface / 8 m; fix-4 GLBs read it as 0):
//   - limbs stay attached: the per-clump swing no longer slides whole limbs off the trunk (the fix-5 GLBs fade the clump weight
//     to 0 at the trunk union), and every bark/leaf term below grows from 0 at the trunk surface along the wood (_mlimb);
//   - limb / upper-trunk flex is stronger so it reads at normal speed: limbs lean downwind with the gust and sway on their own
//     phase, bending from the union outward (curved, not rigid); the upper trunk leans a little more;
//   - fine upper branches and twigs get their own gust-driven motion (faster, smaller, per clump), leaves ride with them;
//   - leaves: a little brighter than fix 4 (green kept, no blue-grey); LITE cards (opts.lite or name 'Leaves' on a *-lite GLB)
//     get a dithered, broken-up edge so the clusters blend at 30-45 m.
//   Options (all default 1; 0 turns it off): opts.limbFlex, opts.twigFlex, opts.leafLift, opts.liteSoft, plus the fix-4 ones.
// Fix 6 (same API, same attributes as fix 5):
//   - mid / lower limbs flex more (bend starts closer to the trunk and is boosted on the lower crown), still 0 at the
//     trunk surface so limb bases stay locked;
//   - every branch gets its own gust delay (0-2.2 s + travel time along the wood) and its own tempo (0.75-1.25x),
//     so branches no longer move in step;
//   - the fast per-clump swing is ~25% smaller and leaf flutter ~15% smaller, so the slow branch motion reads first;
//   - LITE: no darkened feather rim (the feathered edge no longer reads as a dark outline at 45 m), crisper alpha.
// Usage:
//   import { applyMapleWind } from './maple-wind.js';
//   const windU = { uTime: { value: 0 }, uWind: { value: 1 } };   // the SAME object you pass to applyTreeWind for other trees
//   mapleGltf.scene.traverse(o => { if (o.isMesh) applyMapleWind(o.material, windU); });
//   // each frame: windU.uTime.value = clock.elapsedTime;
// Old maple GLBs without _mwind/_mflex still work (those attributes read as 0 -> plain tree-wind.js trunk bend).
export function applyMapleWind(material, uniforms, opts = {}) {
  const amp = (opts.amplitude ?? 0.03).toFixed(4);
  const bfx = (opts.branchFlex ?? 1.0).toFixed(3);
  const lfx = (opts.leafFlex ?? 1.0).toFixed(3);
  const trans = (opts.translucency ?? 0.35).toFixed(3);
  const isLeaf = opts.leaf ?? (material.name === 'Leaves');
  const gst = (opts.gust ?? 1.0).toFixed(3);
  const tfx = (opts.trunkFlex ?? 1.0).toFixed(3);
  const lmx = (opts.limbFlex ?? 1.0).toFixed(3);
  const ltn = (opts.leafTint ?? 1.0).toFixed(3);
  const twx = (opts.twigFlex ?? 1.0).toFixed(3);
  const llf = (opts.leafLift ?? 1.0).toFixed(3);
  const lsf = (opts.liteSoft ?? 1.0).toFixed(3);
  const efd = (opts.edgeFade ?? 1.0).toFixed(3);   // fix 7
  const mbH = (opts.mipBias ?? -0.5).toFixed(3);    // fix 7 (HIGH/MID leaves only)
  const isLite = opts.lite ?? !!(material.userData && material.userData.mapleLite);
  if (isLeaf && !isLite && material.map && opts.anisotropy !== 0) material.map.anisotropy = Math.max(material.map.anisotropy || 1, opts.anisotropy ?? 8);   // fix 7: anisotropic filtering keeps cluster leaves sharp on tilted cards (renderer clamps to the GPU max)
  const prev = material.onBeforeCompile;
  material.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uTime = uniforms.uTime; sh.uniforms.uWind = uniforms.uWind;
    sh.vertexShader = 'attribute float _wind;\nattribute vec4 _mwind;\nattribute vec2 _mflex;\nattribute float _mlimb;\nuniform float uTime;\nuniform float uWind;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      {
        vec4 wp = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #ifdef USE_INSTANCING
          wp = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #endif
        float ph = dot(wp.xz, vec2(0.21, 0.17));
        float hgt = max(position.y, 0.0);
        // 1) trunk / crown bend (identical to tree-wind.js)
        float w = _wind * _wind * uWind;
        float sway = sin(uTime * 1.25 + ph) * 0.7 + sin(uTime * 2.05 + ph * 1.7) * 0.3;
        transformed.x += sway * w * hgt * ${amp};
        transformed.z += cos(uTime * 1.05 + ph * 1.3) * w * hgt * ${amp} * 0.6;
        // 1b) fix 4: gust envelope + very slight upper-trunk curvature (bark and leaves share _wind = height 0..1)
        float gph = ph * 0.37;
        float g1 = 0.5 + 0.5 * sin(uTime * 0.29 + gph) * sin(uTime * 0.47 + 1.3 + gph * 1.7);
        float gust = smoothstep(0.15, 0.95, g1) * ${gst};
        float hw = smoothstep(0.12, 1.0, _wind);
        float tb2 = hw * hw * uWind * ${tfx};
        float gs = sin(uTime * 0.83 + ph) * 0.35 + 0.65;
        transformed.x += tb2 * (0.008 * gs + 0.016 * gust * (0.8 + 0.2 * sin(uTime * 1.7 + ph)));
        transformed.z += tb2 * (0.006 * cos(uTime * 0.71 + ph * 1.3)) * (0.6 + gust);
        // 1b') fix 4: the upper trunk itself leans a touch with the gust (from ~0.5 m up), carrying limbs and crown
        float tl = smoothstep(0.06, 0.30, _wind) * uWind * ${tfx};
        transformed.x += tl * (0.0028 * gs + 0.0060 * gust);
        transformed.z += tl * 0.0022 * cos(uTime * 0.71 + ph * 1.3) * (0.5 + gust);
        // 1c) fix 5: main-limb flex — 0 at the trunk surface, grows along the wood (curved bend, not a rigid swing),
        //     each limb on its own phase, leaning downwind with the gust; carried twigs and leaves ride along
        float dl = _mlimb * 8.0;                                   // metres of wood from the trunk surface
        // fix 6: bend starts closer to the trunk, mid/lower crown boosted; each branch gets its own gust delay and tempo
        float fw = pow(clamp(dl / 2.6, 0.0, 1.0), 1.3) * (1.0 + 0.7 * (1.0 - smoothstep(0.45, 0.85, _wind))) * uWind * ${lmx};
        {
          float lr = length(position.xz);
          vec2 ldir = lr > 1e-4 ? position.xz / lr : vec2(1.0, 0.0);
          vec2 lperp = vec2(-ldir.y, ldir.x);
          float lph = _mwind.x * 6.2831 + ph;
          float bdel = fract(_mwind.x * 5.37) * 2.2 + dl * 0.35;           // per-branch gust delay (s)
          float fm = 0.75 + 0.5 * fract(_mwind.x * 3.71);                 // per-branch tempo
          float tb_ = uTime - bdel;
          float g1b = 0.5 + 0.5 * sin(tb_ * 0.29 + gph) * sin(tb_ * 0.47 + 1.3 + gph * 1.7);
          float gB = smoothstep(0.15, 0.95, g1b) * ${gst};
          float lean = (0.25 + 0.75 * gB) * (0.65 + 0.35 * sin(uTime * 0.9 * fm + lph));
          float osc  = (0.40 + 0.60 * gB) * (sin(uTime * 1.30 * fm + lph) * 0.7 + sin(uTime * 2.30 * fm + lph * 1.4) * 0.3);
          float osc2 = (0.40 + 0.60 * gB) * cos(uTime * 1.05 * fm + lph * 1.2);
          vec2 wdir = vec2(0.83, 0.56);
          transformed.xz += (wdir * lean * 0.70 + ldir * osc * 0.55 + lperp * osc2 * 0.40) * fw * 0.038;
          transformed.y  += (osc * 0.30 - lean * 0.20) * fw * 0.038;
        }
        // 1d) fix 5: fine upper branches / twigs — faster, smaller, per-clump motion that swells with the gust
        {
          float tw = smoothstep(0.42, 0.85, _wind) * smoothstep(0.8, 2.6, dl) * _mwind.z * uWind * ${twx};
          float tp = _mwind.y * 6.2831 + ph * 1.3;
          float ga = 0.20 + 0.80 * gust;
          transformed += vec3(sin(uTime * 2.9 + tp) * 0.6 + sin(uTime * 4.4 + tp * 1.9) * 0.4,
                              sin(uTime * 3.6 + tp + 0.7) * 0.45,
                              cos(uTime * 2.6 + tp * 1.6) * 0.8 + sin(uTime * 4.9 + tp * 2.3) * 0.2) * tw * ga * 0.012;
        }
        // 2) per-branch swing (random phase per main branch), grows away from the trunk
        float rad = length(position.xz);
        float bw = smoothstep(0.25, 1.6, rad) * smoothstep(0.0, 0.6, dl) * uWind * ${bfx};
        float bp = _mwind.x * 6.2831 + ph;
        transformed += vec3(sin(uTime * 1.45 + bp) * 0.75 + sin(uTime * 2.6 + bp * 1.3) * 0.25,
                            sin(uTime * 1.9 + bp + 1.0) * 0.45,
                            cos(uTime * 1.2 + bp * 1.1)) * bw * rad * 0.022;
        // 3) per-clump swing (random phase per clump) — shared by the clump's leaves and the twigs that carry them
        float cp = _mwind.y * 6.2831 + ph;
        float cw = _mwind.z * uWind * ${bfx};
        transformed += vec3(sin(uTime * 2.15 + cp) * 0.7 + sin(uTime * 3.4 + cp * 1.7) * 0.3,
                            sin(uTime * 2.7 + cp + 2.0) * 0.5,
                            cos(uTime * 1.85 + cp * 1.3) * 0.8) * cw * 0.034;   // fix 6: was 0.045
        // 4) leaf flutter (fix 3): soft, varied flutter instead of a rigid cylindrical roll.
        //    Bend grows toward the tip (tip^1.6) with a lag, every leaf card gets its own speed and amplitude,
        //    every vertex a small independent flicker (the leaves inside one spray card no longer move as one sheet),
        //    and the across-blade twist is ~1/4 of fix 2. _mflex.x already carries a per-card clearance scale
        //    (cards with a close neighbour flutter less, so they don't swing through each other).
        float tip = _mflex.x; float sd = _mflex.y;
        if (tip + abs(sd) > 0.0) {
          float lp = _mwind.w * 6.2831;
          float amp = 0.65 + 0.7 * fract(_mwind.w * 7.31);
          float fr  = 0.8 + 0.45 * fract(_mwind.w * 3.17);
          float vh  = fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          float fq = uTime * 4.6 * fr + lp;
          float tb = pow(clamp(tip, 0.0, 1.0), 1.6);
          vec3 nn = normalize(objectNormal);
          float d = (sin(fq) * 0.011 + sin(fq * 1.9 - 1.1) * 0.004) * tb * amp
                  + sin(uTime * 7.9 * fr + lp * 2.0 + vh * 6.2831) * 0.0035 * tip * amp
                  + sin(uTime * 3.1 * fr + lp) * 0.003 * sd * tip;
          d = d / (1.0 + 14.0 * abs(d));   // fix 4: soft peak limiter (less card contact at gusts)
          transformed += nn * d * 0.85 * uWind * ${lfx};   // fix 6: x0.85
          transformed.y -= (0.5 + 0.5 * sin(fq - 0.6)) * 0.003 * 0.85 * tb * amp * uWind * ${lfx};
        }
      }`);
    if (opts.keepNormals !== false) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>',
        'float faceDirection = 1.0;\nvec3 normal = normalize( vNormal );\nvec3 nonPerturbedNormal = normal;\n#ifdef USE_NORMALMAP_TANGENTSPACE\n  mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );\n#endif');
    }
    if (isLeaf && !isLite) {
      // fix 7: HIGH/MID mip bias — keeps the 5-lobed leaves inside each cluster readable at mid range
      sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#ifdef USE_MAP\n  vec4 sampledDiffuseColor = texture2D( map, vMapUv, ' + mbH + ' );\n  diffuseColor *= sampledDiffuseColor;\n#endif');
    }
    if (isLeaf && isLite) {
      // fix 6: LITE mip bias — sample one notch sharper so the leaf clusters stay crisp at 30-45 m
      sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#ifdef USE_MAP\n  vec4 sampledDiffuseColor = texture2D( map, vMapUv, -0.8 );\n  diffuseColor *= sampledDiffuseColor;\n#endif');
    }
    if (isLeaf) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <alphatest_fragment>', `
      #ifdef USE_ALPHATEST
        ${isLite ? `{ float fc = abs(dot(normalize(vNormal), normalize(-vViewPosition)));   // fix 6: LITE cards seen edge-on fade out (no smeared streaks)
          diffuseColor.a *= mix(1.0, smoothstep(0.10, 0.38, fc), ${lsf}); }` : `{ vec3 fnG = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));   // fix 7: HIGH/MID leaf-cluster cards seen edge-on fade out (true face normal, not the bent shading normal)
          float fcG = abs(dot(fnG, normalize(vViewPosition)));
          diffuseColor.a *= mix(1.0, smoothstep(0.12, 0.42, fcG), ${efd}); }`}
        { float aw = max(fwidth(diffuseColor.a), 1e-3);
          ${isLite ? `aw *= 1.0 + 0.15 * ${lsf};   // fix 6: LITE edge kept crisp (only a hair of feathering, no dark rim)` : ''}
          diffuseColor.a = clamp((diffuseColor.a - alphaTest) / aw + 0.5, 0.0, 1.0);
          if (diffuseColor.a < ${isLite ? '0.25' : '0.3'}) discard; }
      #endif`);
      sh.fragmentShader = sh.fragmentShader.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
      {
        // fix 4: inner / shaded cards (dark crown-AO vertex colour) take less cool sky/ground fill and less grey specular
        const vec3 LW = vec3(0.2126, 0.7152, 0.0722);
        float inner = 1.0;
        #if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
          inner = 1.0 - smoothstep(0.12, 0.34, dot(vColor.rgb, LW));
        #endif
        vec3 alb = diffuseColor.rgb / max(dot(diffuseColor.rgb, LW), 1e-4);
        alb = mix(vec3(1.0), clamp(alb, 0.0, 2.0), 0.85 - 0.04 * ${llf});
        float kt = (0.40 + 0.45 * inner) * ${ltn};
        reflectedLight.indirectDiffuse = mix(reflectedLight.indirectDiffuse, alb * dot(reflectedLight.indirectDiffuse, LW), kt);
        reflectedLight.directDiffuse = mix(reflectedLight.directDiffuse, alb * dot(reflectedLight.directDiffuse, LW), kt * 0.5);
        vec3 stint = mix(vec3(1.0), alb, 0.55);
        float ks = (0.45 + 0.35 * inner) * ${ltn};
        reflectedLight.directSpecular = mix(reflectedLight.directSpecular, stint * dot(reflectedLight.directSpecular, LW), ks) * (1.0 - (0.35 - 0.08 * ${llf}) * ks);
        reflectedLight.indirectSpecular = mix(reflectedLight.indirectSpecular, stint * dot(reflectedLight.indirectSpecular, LW), ks) * (1.0 - (0.5 - 0.10 * ${llf}) * ks);
        // fix 5: lift the crown a little back toward fix-3 brightness (more on inner, shaded cards), hue kept green
        reflectedLight.directDiffuse *= 1.0 + 0.045 * ${llf};
        reflectedLight.indirectDiffuse *= 1.0 + (0.06 + 0.10 * inner) * ${llf};
      }
      #if NUM_DIR_LIGHTS > 0
        { float bl = max(0.0, dot(-normal, directionalLights[0].direction));
          reflectedLight.directDiffuse += diffuseColor.rgb * vec3(0.85, 1.0, 0.45) * directionalLights[0].color * (0.06 + bl) * ${trans}; }
      #endif`);
    }
  };
  if (opts.alphaToCoverage !== false) material.alphaToCoverage = true;
  material.customProgramCacheKey = () => 'maplewind7' + efd + mbH + amp + bfx + lfx + trans + gst + tfx + lmx + ltn + twx + llf + lsf + (isLite ? 'T' : '') + (isLeaf ? 'L' : 'B');
  material.needsUpdate = true;
  return material;
}
export { applyMapleWind as applyTreeWind };
