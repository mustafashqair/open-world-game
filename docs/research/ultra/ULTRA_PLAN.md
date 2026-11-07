# ULTRA research and implementation proposal — WebGL2 / Three.js r170

## Scope, evidence and approval boundary

There is no AAA game installed in this sandbox. This study used public developer presentations, published technical analyses and this repository's source. No commercial executable was downloaded, disassembled or captured with Ghidra/RenderDoc; no DRM bypass, proprietary code, shader or asset copying occurred. Techniques below are independently implementable ideas, not reconstructed game implementations. The older REA/Ghidra research wording in COMMA_TASKS.md does not override these limits.

This commit contains research only. Phase 2 must wait for explicit approval of this plan **in the same Task**. No runtime files, dependencies, shaders, assets, service worker or deployment are changed. There are no measured GPU times or FPS results from this phase. Memory arithmetic below is allocation modelling, not observed residency; pass counts describe the proposed browser graph, not commercial games.

Evidence labels: [مصدر أولي/محاضرة مطور] primary/developer; [تحليل صحفي] journalistic; [استنتاج] inference/design proposal. All browser mappings, priorities and cost estimates are [استنتاج] unless explicitly identified as repository observations. Exact GI/probe, cascade, wetness or temporal details absent from the sources stay unknown in the individual studies. This does not mean those games lack the effect.

Read the ten studies in requested order:

1. [Assassin's Creed Mirage](01-assassins-creed-mirage.md)
2. [Assassin's Creed Origins](02-assassins-creed-origins.md)
3. [Red Dead Redemption 2](03-red-dead-redemption-2.md)
4. [The Witcher 3 next-gen](04-the-witcher-3-next-gen.md)
5. [Ghost of Tsushima](05-ghost-of-tsushima.md)
6. [Horizon Forbidden West](06-horizon-forbidden-west.md)
7. [Cyberpunk 2077](07-cyberpunk-2077.md)
8. [Kingdom Come: Deliverance 2](08-kingdom-come-deliverance-2.md)
9. [Forza Horizon 5](09-forza-horizon-5.md)
10. [Death Stranding](10-death-stranding.md)

**Coverage: 10 requested games; no exclusions or replacements.** Depth varies: Ghost/Horizon/Death Stranding have direct developer material; several others have journalistic evidence and explicitly unresolved internals. Each study covers six rendering categories with cost estimates and source links. The [source register](SOURCES.md) records whether full text, partial extraction or a search excerpt was available.

## Baseline audit and integration map

Inspected `main` at **e9d41bbba849dac22b134055e502ed928d08b5a7**. Read COMMA_TASKS.md and README.md; no AGENTS.md was found in the checked-out repository. Ran `tools/join_large_files.py`: 31/31 reconstructed assets passed its checks. Reconstructed assets are untracked and must never be included in this documentation commit. The repository's shared work with Tab/v50g3 may require a fresh audit/rebase before implementation.

| Actual file / symbol | Current behaviour observed in source | Implication |
|---|---|---|
| `index.html:1221` | Fetches three `v50g2/code/part-*.txt`, joins and loads them | Current game source is split text, not the older v41/v50f copies; edit active version only in phase 2 |
| `index.html:985` | New settings UI has vlow/low/medium/high presets | ULTRA must be represented coherently here too, with Arabic label `فائقة` |
| `v50g2/code/part-000.txt:171`, `ORDER`, `NAMES` | **Already contains legacy `ultra`**: pr 2.5, view 13, shadow 4096, veg 1.5; older panel exposes it | Requirement for a new ULTRA means a new isolated visual path, not another duplicate preset key or a blind increase over these values |
| `part-001.txt:4490`, `setPreset`, `applySettings` | Shared settings change pixel ratio, view/fog, shadow size; veg changes rebuild chunks | Keep all legacy presets and auto-selection paths unchanged; prevent optional ULTRA imports/allocations on those paths |
| `part-000.txt:960`, `terrainMat:1960` | ACES exposure 1.2; standard terrain with vertex colour/procedural colour detail | A new HDR graph must avoid applying tone mapping twice; do not replace terrain look globally |
| `part-002.txt:3732`, `V40`, `envTick` | Sky-derived PMREM environment; character environment handling | Improve cadence/locality in ULTRA; do not introduce a second unconditional PMREM refresh |
| `part-002.txt:3760`, `csmWant/csmSet/csmTick` | HQ three-cascade CSM; capped at 2048 even when S.shadow is 4096; high range 250, splits 18/70; far cascade periodic updates | Existing ultra table does not imply actual 4096 CSM. Tune stability/caster range before raising map size |
| `part-002.txt:3798–3880`, `fxWant/fxBuild/fxRender/fxFree` | Custom graph, **not EffectComposer**: half-float scene+depth, half-size GTAO from existing depth, bloom, grade, SMAA/FXAA; ultra shares high tier | Extend through an isolated ULTRA graph, not a second composer layered on the old output |
| `part-002.txt:3827` | `sRT.isXRRenderTarget = true` deliberately applies material ACES inside scene target | Existing pixels depend on this nonstandard workaround. Preserve it for old presets; define a separate linear-HDR contract for ULTRA |
| `part-002.txt:4046+`, `V41.atmoBuild/cloudsMake`, `v41/env-libs.js` | Existing LUT aerial perspective and CloudsEffect; clouds choose low/medium library presets based on `__QUALITY` | Atmosphere/clouds already exist. Budget/adapt them, don't implement a duplicate sky engine |
| `part-002.txt`, `V41.waterTick`, `vendor/three170/examples/jsm/objects/Water.js` | Water can re-render reflected scene; near-water detection and update cadence exist | Count reflected scene geometry/shadows separately from fullscreen passes |
| `part-000.txt:619`, `terrainLib.chunk`; `part-001.txt:335–441`, `addChunk/updateChunks/TB24` | Workers, 32/16/8 terrain LOD, chunks of 128 units, distant 3x3 batching, floating origin | Texture coordinates, fades and probe lookup must remain stable across `ORG` changes; new worker replies need generation validation |
| `part-001.txt:196+`, `TREESET`, `attachTrees`; `trees33/maple-wind.js`, `tree-wind-v2.js` | Existing loaded tree LODs and material wind patches | Add local cloned variants, don't replace shared wind/prototype hooks |
| `vendor/three170/examples/jsm/` | GTAOPass, UnrealBloomPass, SMAAPass, CSM, KTX2Loader, EXRLoader present | Use vendored APIs. EffectComposer, OutputPass, TAARenderPass and LUTPass are not present in the tracked addon set; a future use needs an explicit compatible addition |
| `sw.js`, `assets.json`, `assets-phone.json`, `tools/h/*.mjs` | Offline inventory and existing benchmark/pixel harness; scripts reference original machine paths | Phase 2 assets need offline/cache updates and adapted harness paths; none change in research |

Line numbers refer to the baseline, not stable public APIs. Symbol names are the primary integration anchors. Existing global shader-chunk patches and multiple settings surfaces make isolation the first engineering task.

## Non-negotiable contract

- ULTRA is a new explicit visual preset above HIGH, Arabic UI `فائقة`. Resolve the existing legacy key rather than creating two ULTRA meanings. It is opt-in and never chosen by legacy auto-quality.
- **HIGH, MEDIUM, LOW and very-low remain pixel-identical**, including their loading/material/render paths. Do not change their settings, shaders, exposure, time step, ordering or default assets to pay for ULTRA.
- Parse `?ultra=0` before imports, settings expansion or material changes. It disables every new feature/allocation and, when ULTRA was requested or saved, uses the **exact baseline HIGH path** for that load without rewriting the stored preference. For any other preset it behaves exactly like that baseline preset. This fallback mapping must be documented/tested, not silently interpreted as “all expensive flags off.” Existing unrelated URL flags still apply normally.
- Proposed subflags: `uGrade`, `uEnv`, `uFog`, `uTerrain`, `uLod`, `uWind`, `uShadow`, `uBounce`, `uAO`, `uBloom`, `uWet`, `uCloud`, `uWater`, `uTAA`, `uDOF`, each `=0` disables its ULTRA feature. Global `ultra=0` wins over all of them. Subflags cannot activate a feature outside ULTRA. No new network requests or optional shader compile on non-ULTRA loads.
- No cypress, palms or snow. Arabic-only UI and player-facing messages. No new characters, objects or placement near the palace or its garden. Material/light evaluation of existing surfaces is allowed; no new prop “demonstration” at the palace.
- Do not redo fixed-step physics (1/60, four-step cap), very-low ratio 0.55 or its no-shadow rule. No animation replacement. No gameplay/AI changes.
- No mutation of global ShaderChunk/prototypes for new features. Clone materials, chain existing hooks, use unique `customProgramCacheKey`, own all optional resources, and dispose on teardown. ULTRA transitions may reload the page to guarantee isolation. Test switch-away persistence and stale worker replies. Leaving ULTRA must restore exact baseline pixels, not merely similar settings.

## Two target profiles and honest feasibility

These are proposed acceptance targets, **not measured capabilities**. ULTRA refers to a coordinated visual profile, not “all settings maxed.” A lower internal resolution can make a better composed image affordable; it cannot guarantee a phone will run it.

| | Galaxy A14 / Mali-G57 / 4 GB target | Desktop reference target |
|---|---|---|
| Hardware definition | Verify actual SKU/SoC/GPU and browser: A14 branding alone is not sufficient; test the requested Mali-G57 device | Define a test machine explicitly; proposed RTX 3060-class / 6 GB+, current Chrome, 1080p; do not assume every desktop fits |
| Goal | Experimental opt-in ULTRA-lite: sustained 30fps / 33.3ms total frame interval after warm-up; if base scene cannot fit, report unsupported and retain legacy preset | 60fps / 16.7ms total frame interval at 1920x1080 |
| Resolution design | Landscape 1280x720 maximum drawing buffer, dynamic reduction only inside ULTRA; measure touch/UI separately | 1920x1080 initially; no inherited device-pixel-ratio 2.5 explosion |
| New-feature GPU time envelope | Aim for <=3ms incremental median and no >33.3ms p95 total frame time; provisional criterion, not a prediction | Aim for <=4ms incremental median and <=16.7ms p95 total after warm-up; provisional |
| New live allocations | Initial ceiling 32 MiB beyond equivalent base scene; do not exceed 64 MiB without revising plan; separately count decoded/upload staging CPU memory | Initial incremental ceiling 192 MiB; verify real resident totals and driver allocation behaviour |
| Core selection | Ranks 1–6, limited 7/8, reduced AO/bloom only if timed; no new ray-marched clouds, planar water, TAA or DOF by default | Ranks 1–12 with caps; water/TAA/DOF remain independent experimental toggles |
| Thermal test | At least 15-minute route, battery and temperature recorded, no cooling assumption | Fixed-power route with stable clocks; repeat warmed runs |

The mobile target is deliberately not the old ultra tuple (pr 2.5/view 13/4096 shadows/veg 1.5). Increased radius roughly increases chunk population with radius squared: 13 versus 9 is approximately 2.09x area before boundary/culling effects. A 2.5 versus 2 linear pixel ratio is 1.56x pixels when device ratio permits. Neither is a free visual upgrade. The phone may fail even the reduced profile because existing scene/asset cost dominates. Do not claim AAA parity or device support before measurements.

## Cost model used below

Let `P=W*H`, `Q=P/4` (half width/height), `E=P/16` (quarter width/height). RGBA16F costs 8 bytes/pixel, RGBA8 costs 4, depth assumed 4; actual depth allocation, alignment, multisampling, driver staging and browser copies can be larger. Target sizes round up. All textures below exclude mips unless stated.

| Allocation | 1280x720 | 1920x1080 |
|---|---:|---:|
| One RGBA16F full target, 8P | 7.03 MiB | 15.82 MiB |
| One full depth or RGBA8, 4P | 3.52 MiB | 7.91 MiB |
| Two RGBA16F histories, 16P | 14.06 MiB | 31.64 MiB |
| One half-size RGBA16F, 8Q | 1.76 MiB | 3.96 MiB |
| One quarter-size RGBA16F, 8E | 0.44 MiB | 0.99 MiB |
| One nominal 2048² 32-bit shadow | 16 MiB | 16 MiB |

For bandwidth, a full RGBA16F read+write is **at least 16P bytes/frame**: 14.06 MiB/frame at 720p (0.412 GiB/s at 30fps), 31.64 MiB/frame at 1080p (1.854 GiB/s at 60fps). Extra taps/depth/history reads increase logical traffic; caching, compression and tile stores change external traffic. These are not measured DRAM bandwidth or milliseconds. A fullscreen “pass” is one raster draw unless stated; a shadow/cube/reflection scene pass redraws many objects. Sharing/fusing targets can reduce allocations; do not sum every standalone row as if all are simultaneously resident.

## Ranked techniques — impact per expected cost

All implementation and cost entries in this section are [استنتاج]. Order favours broad image improvement and low marginal cost; mobile/desktop choices can differ. Dependencies (especially HDR isolation) must be implemented before the dependent effects, regardless of visual rank.

### 1. Coherent exposure, colour management and restrained grading

**Evidence:** [G1](SOURCES.md) [مصدر أولي/محاضرة مطور] custom HDR/tone mapping; [F1/M2](SOURCES.md) [تحليل صحفي] surface/light presentation. This is the cheapest broad correction, not a request to imitate a game's colour palette.

**Implementation:** Create a ULTRA-only linear HDR scene `WebGLRenderTarget` (`HalfFloatType`, `LinearSRGBColorSpace`, `DepthTexture`). Materials in this path must output untonemapped linear radiance; remove the existing XR tone-map workaround only in this new graph. Existing sky/atmosphere pre/post exposure compensation must be audited, not blindly carried into HDR. Apply one ACES-compatible output transform and one linear-to-sRGB conversion in the final `ShaderMaterial`/`FullScreenQuad`. Fuse white balance, gentle contrast/saturation and an optional 32³ RGBA8 `Data3DTexture` LUT. No auto-exposure initially; if added later, use a reduced luminance pyramid with temporal smoothing.

**Cost:** 0 incremental draws if fused into final composite; 1 LUT read/pixel, 128 KiB for a 32³ RGBA8 LUT. Core HDR target/depth is 12P (10.55/23.73 MiB) when no compatible target can be reused; a separate RGBA8 output target adds 4P. An unfused composite is >=16P logical colour bytes/frame plus input textures. These are shared core allocations, not a per-grade tax. **Mobile/desktop:** on, fixed exposure first.

**Touches:** `V40.fxBuild/fxRender`, `COMP_FS`, `V41.mkFx/atmoBuild`, renderer setup; isolated material ownership. **Risk/check:** white clothing at noon/night, emissive lamps and sky; no double ACES, no double sRGB, no change to HIGH graph.

### 2. Better sky/environment agreement and bounded PMREM refresh

**Evidence:** [G1](SOURCES.md) [مصدر أولي/محاضرة مطور] relit diffuse/specular environments; [F2](SOURCES.md) [تحليل صحفي] authored sky capture. Improve existing `envTick`, don't add an unconditional capture loop.

**Implementation:** Keep sun direction, sky radiance, `HemisphereLight` and `scene.environment` coherent. Reuse `PMREMGenerator`; refresh on sun/weather thresholds, with a minimum interval and measured spike budget. Compare two fixed time-of-day environments before adding interpolation. Precompute optional sky-only environments; a `CubeCamera` capture of geometry is not the default. Local reflection probes require material routing; `scene.environment` alone is global and has no automatic box projection.

**Cost:** No extra per-frame scene draw for static environments; existing PBR environment samples remain. Refresh uses multiple PMREM renders; measure vendor implementation rather than labelling it one pass. A raw RGBA16F cubemap is `6*N²*8`, ~4 MiB at N=256 with a full mip chain, ~1 MiB at 128. PMREM CubeUV packing has different allocation shape, so inspect actual dimensions. Keep old+new environment only during controlled replacement; no per-frame allocation. **Mobile:** 128-class prefiltered sky, rare updates; **desktop:** 256-class, optional few local environments.

**Touches:** `V40.envTick`, `charSweep`, `CHARENV`, V41 night lighting. **Risk/check:** night metals must not reflect a daylight sky; PMREM refresh frame spikes and memory disposal.

### 3. Sun-aware analytic height haze and aerial perspective

**Evidence:** [D2](SOURCES.md) [مصدر أولي/محاضرة مطور] analytic height fog plus scattering; [M1/R1](SOURCES.md) [تحليل صحفي] atmosphere survives quality reductions.

**Implementation:** Reuse existing V41 aerial LUTs and depth texture. In the ULTRA atmosphere/composite, reconstruct view/world position with camera inverse projection/world matrices and correct `ORG`; combine distance/height optical depth with sky/sun colour. Define ownership so legacy Fog, V40 fog and V41 aerial scattering are not applied twice. Handle near-horizontal rays with a stable analytic limit and sky depth separately. No shadowed volume is implied by this analytic approximation.

**Cost:** 0 additional passes if fused into aerial/composite; a few existing LUT/depth reads and ALU. If separate: 1 full draw, target 8P, >=16P colour +4P depth logical bytes. Reuse atmosphere LUTs; inspect their actual EXR GPU formats before counting incremental bytes. **Mobile:** analytic term, no new shadowed volumetric ray march; **desktop:** same foundation, optional shafts under rank 12.

**Touches:** `V40.fogTick`, `V41.atmoBuild/mkFx/post`, `ENV`, `ORG`. **Risk/check:** silhouette halos, underwater/near-plane depth, dawn/sunset horizon and recenter jumps.

### 4. Terrain macro variation, slope blending and distance-faded detail normals

**Evidence:** [O1/W1](SOURCES.md) [تحليل صحفي] material/detail improvements; specific blend algorithm is an independent design, not an attributed proprietary technique.

**Implementation:** Clone `terrainMat` in ULTRA; chain existing colour-noise/wind/shadow hooks, unique cache key. Retain broad vertex colours, add at most two slope/height-driven surface layers, packed roughness/AO and one tiled normal detail near camera. Use world XZ plus `ORG` for continuous coordinates; triplanar only on steep surfaces where justified. Fade normals with distance/mip footprint to reduce shimmer. Newly authored/licensed textures only, KTX2 via vendored `KTX2Loader` after verifying transcoder assets/offline inventory.

**Cost:** 0 screen passes. About 2–5 extra material samples per shaded terrain pixel, more with triplanar; bandwidth depends on footprint/cache. One uncompressed 1024² RGBA8 full mip chain ~5.33 MiB, two ~10.67 MiB; one 512² chain ~1.33 MiB. Compressed bytes depend on the detected transcode format, not WebP file size. **Mobile:** 512 shared packed map/normal, no blanket triplanar; **desktop:** 1024 pairs, localized triplanar. Replacing a texture should release its superseded ULTRA copy.

**Touches:** `terrainMat`, `terrainLib.chunk`, `addChunk`, `TB24`, cliffs/road materials. **Risk/check:** tile/road seams, derivative discontinuities, grazing-angle shimmer; no new placement or geometry near palace.

### 5. Silhouette-first LOD and short, deterministic transitions

**Evidence:** [M1/R1/F1](SOURCES.md) [تحليل صحفي] differentiated foliage/geometry distance; [G2](SOURCES.md) [مصدر أولي/محاضرة مطور] tiled culling/LOD.

**Implementation:** Separate terrain, canopy and grass ranges rather than raising `S.view` to 13. Keep existing worker chunk resolutions initially; add ULTRA hysteresis and deterministic dither fades only for selected tree/grass batches. Use stable world/instance seed; frame-varying noise without TAA can shimmer. CPU cell/frustum selection plus `InstancedMesh`, bounded transition overlap. Terrain boundary topology/crack treatment must be inspected before introducing geomorphs. Add generation IDs for ULTRA worker results; do not rewrite the shared legacy scheduler or overlap the queued v50g4 work without coordination.

**Cost:** 0 screen passes, scalar LOD state/instance; instance matrix alone is 64 bytes, so 10k instances ~0.61 MiB before geometry/other attributes. Crossfade draws both LODs briefly and can double that batch's draw/fragment work. View-radius residency grows with area. **Mobile:** shorter fades or hysteresis-only if dither is unstable; **desktop:** short overlapping fades and far crown proxies. No guessed draw-call savings.

**Touches:** `updateChunks/addChunk/killChunk`, `attachTrees/TREESET`, `TB24`, `ORG`. **Risk/check:** moving route, fade spikes, stale replies, recentering and silhouette holes; preserve deterministic placement/exclusion masks.

### 6. Coherent foliage wind and limited near-field density

**Evidence:** [G2](SOURCES.md) [مصدر أولي/محاضرة مطور] common wind and grouped planting; [H3/F1](SOURCES.md) [تحليل صحفي] thin foliage aliasing.

**Implementation:** Extend cloned existing maple/tree wind materials with one shared wind direction/time plus low-frequency gust noise; anchor trunk/root weights and vary phase per instance. CPU/worker-generated `InstancedBufferGeometry` grass is the WebGL2 alternative to compute+indirect generation. Separate near blades from distant low-frequency ground tint; respect existing exclusion masks and allowed species. Shadow-depth material must use the same deformation. No per-frame CPU instance-matrix rewrite for wind.

**Cost:** 0 fullscreen passes; vertex ALU/optional noise texture plus fragments/alpha overdraw. A 128² RG8 wind field is 32 KiB without mips. Geometry+instance storage must be inventoried; doubling density approximately doubles covered work only in a simple unsaturated case and may behave worse with overlap. **Mobile:** existing density or less, gust motion first, grass shadows off; **desktop:** near-field uplift under a measured coverage cap.

**Touches:** `trees33/maple-wind.js`, `tree-wind-v2.js`, `attachTrees`, grass generation. **Risk/check:** wind/depth mismatch, bounding boxes too tight, temporal shimmer, no cypress/palms/snow or new palace/garden vegetation.

### 7. Stable cascaded shadows with selective contact grounding

**Evidence:** [H2](SOURCES.md) [مصدر أولي/محاضرة مطور] CSM usage; [W1/R1](SOURCES.md) [تحليل صحفي] near grass grounding and far-shadow trade-offs.

**Implementation:** Reuse vendored `CSM` through an ULTRA-specific owner. Stabilize cascade centres to shadow texels, tune split coverage/bias and bounded caster sets; test current global `V40C` hook rather than adding a second global patch. Retain measured update schedules. Optional short depth-ray contact occlusion can share AO/composite depth, with a strict distance cap and off-screen fallback to CSM. Do not label it physically correct shadowing.

**Cost:** Each active cascade is a scene caster pass. Three 2048² nominal 32-bit maps ~48 MiB; three 1024² ~12 MiB; 4096² would be ~64 MiB **each**. Driver representations may differ. Stable maps need no new fullscreen target; contact term adds depth taps (e.g. an initial design cap of 8 samples, not a measured optimum) or 1 half-size pass + composite. **Mobile:** one tight 1024 map only if base fits, no added contacts; **desktop:** start existing 3x2048, never automatically 4096.

**Touches:** `csmWant/csmSet/csmTick`, `V40C`, caster flags, render scheduling. **Risk/check:** low-angle acne/peter-panning, cascade edge jumps and moving-leaf shadow mismatch. Keep LOW/very-low shadow rules unchanged.

### 8. Local irradiance and baked occlusion without real-time GI

**Evidence:** [G1](SOURCES.md) [مصدر أولي/محاضرة مطور] SH relighting/interior masks; [K1/W1](SOURCES.md) [تحليل صحفي] indirect bounce/occlusion improves sheltered surfaces.

**Implementation:** First calibrate hemisphere/environment. Then use small authored or independently baked SH irradiance cells and sky-visibility/interior masks for existing static spaces. `LightProbe` supports a global SH representation; **it is not a spatial probe volume interpolator**. Start CPU-selected per-zone uniforms or add shader grid sampling with wall/zone rejection. A `DataTexture` atlas stores coefficients; blend adjacent valid cells and time-of-day keys. Existing baked `lightMap/aoMap` may be simpler on static surfaces if the required UVs exist. No live voxelization, RT or copied bakes.

**Cost:** 0 scene/fullscreen passes for precomputed data; interpolation and material evaluation cost. Example 16x16x4 probes *9 coefficients *RGB half floats =54 KiB raw coefficients; two time keys 108 KiB before packing/mips. Shader evaluation/8-cell interpolation can add many fetches; CPU per-zone blending trades spatial fidelity for low GPU traffic. Bake tooling/content labour is material. **Mobile:** a few zones or global SH; **desktop:** small grid only after leak tests.

**Touches:** material lighting hooks, `hemi`, `scene.environment`, region/room classification, `ORG`. **Risk/check:** interior leaks and incorrect night bounce; no new placed lamps, characters or objects near palace.

### 9. Depth-aware AO at reduced resolution

**Evidence:** [R1/D1/W1](SOURCES.md) [تحليل صحفي] AO grounds objects; [G1](SOURCES.md) [مصدر أولي/محاضرة مطور] visibility is essential to plausible indirect illumination.

**Implementation:** Reuse existing GTAO and its shared `DepthTexture`; no second normal scene pass by default. Tune radius/thickness to world scale. Preserve sky/background and avoid dark screen-edge halos. Use `GTAOPass.updateGtaoMaterial/updatePdMaterial`, bilateral denoise and depth-aware upsample in final composite. Optional rank-7 contacts must not double-darken the same region.

**Cost:** Proposed 2 half-size fullscreen draws (AO+denoise), final composition fused; 2 RGBA16F Q targets =4P bytes (~3.52/7.91 MiB). About S depth reads per AO pixel plus denoise taps; current source uses 12 AO/12 denoise samples, not a guaranteed optimal ULTRA budget. Nominal traffic >= target reads/writes plus samples. Quarter-size can save more but amplifies halos. **Mobile:** off initially or E-sized short radius after timing; **desktop:** Q-sized, depth-derived normals first.

**Touches:** `fxBuild/fxRender`, GTAO uniforms, final composite. **Risk/check:** moving camera along thin geometry, foliage cutouts, wall/base contact versus texture AO double-counting.

### 10. Small HDR bloom pyramid fused into output

**Evidence:** [H3](SOURCES.md) [مصدر أولي/محاضرة مطور] developer discussion includes bloom in temporal ordering; appearance/pipeline choice here is independent.

**Implementation:** Preserve highlights in ULTRA HDR until bloom extraction. Either budget vendored `UnrealBloomPass` as it actually runs or write a small ULTRA-only bright/downsample and separable blur chain. Do not describe UnrealBloomPass as one draw: r170 uses five mip levels, 10 blur draws, bright extraction, mip composite and final blend (13 fullscreen draws for off-screen use). A custom two-level version can use 6 draws: threshold/downsample Q, blur H/V at Q, downsample E, blur H/V at E, with final combination fused into output. Clamp fireflies, use a soft knee and modest intensity.

**Cost:** Custom chain 6 reduced-resolution draws; two Q + two E RGBA16F scratch buffers =20Q bytes =5P (~4.39/9.89 MiB), with aliasing possible after lifetimes are proven. Sampling blur costs more than one read/write. **Mobile:** E-only 3-draw chain (~0.88 MiB two E buffers at 720p) or off; **desktop:** two levels first. Existing bloom is replaced, not stacked, only in ULTRA.

**Touches:** `X.bloom`, `fxRender`, HDR output. **Risk/check:** daylight white walls must not glow; Arabic HUD should remain outside the effect; lamps retain warm shape.

### 11. Weather-driven roughness and local wetness masks

**Evidence:** [K1](SOURCES.md) [تحليل صحفي] specular/diffuse mismatch is visibly harmful. Specific wetness algorithms in the ten games remain unverified; this entire implementation is [استنتاج].

**Implementation:** Use existing `ENV.rain` with independently authored slope/puddle mask to darken dielectric albedo slightly and lower roughness within bounds; blend detail normals, preserve metalness classification. Clone existing surfaces; no new puddle geometry or palace props. Reflection environment follows weather/time. Water refraction/SSR are not required for this step.

**Cost:** 0 passes; a uniform and one optional mask sample. 512² RGBA8 mip chain ~1.33 MiB, or pack mask into rank-4 maps for no additional texture allocation. **Mobile:** parameter/mask only; **desktop:** same plus optional local reflection environment. Real wet reflections belong to rank 13, not this cheap estimate.

**Touches:** `ENV`, material clones, terrain/roads, V41 environment. **Risk/check:** no plastic-looking stone, no permanently glowing wet metal at night, smooth weather transitions.

### 12. Budgeted cloud detail and optional short sun shafts

**Evidence:** [H1](SOURCES.md) [مصدر أولي/محاضرة مطور] cloud environments/temporal artefacts; [R1/M1](SOURCES.md) [تحليل صحفي] reduced volumetric resolution can retain atmosphere.

**Implementation:** Prefer existing `CloudsEffect` rather than a second ray marcher. Inspect r170-bundled `env-libs.js` actual quality preset internals/targets; keep noise textures/LUTs resident, lower resolution before raising steps. Explicitly cap shadow cascade resolution and cloud steps. If adding terrain/tree shafts, use a separate low-resolution depth+sun-shadow march with bilateral upsample, not a radial screen-space sun blur presented as a volume. Limit to daytime/visible sun and reject sky-depth artefacts.

**Cost:** Existing library has internal cloud/shadow/history/noise draws, so **not counted as one pass**. For a proposed custom quarter-size shaft stage: 1 march +2 bilateral draws, 2 E RGBA16F scratch =P bytes (~0.88/1.98 MiB), plus repeated depth/shadow samples and fused composite. Design experiment might start at 8 march steps; no timing guaranteed. A 128³ R8 noise texture is 2 MiB; 32³ R8 is 32 KiB, before extra channels/mips. Actual library targets must be inventoried to enforce the budget. **Mobile:** no new volumes; authored/basic sky or existing affordable path only; **desktop:** cloud detail under a measured cap, shafts optional.

**Touches:** `V41.cloudsMake`, `atmoBuild`, existing local weather/noise and sun CSM. **Risk/check:** horizon seams, flashing during sun motion, trail/ghosts; keep aerial perspective available if clouds are off.

### 13. Selective water reflection improvement

**Evidence:** [D1/K1](SOURCES.md) [تحليل صحفي] SSR limitations; [W1](SOURCES.md) [تحليل صحفي] SSR as a non-RT water path. No ray-traced reflections are proposed.

**Implementation:** Existing Water already captures reflected geometry. Restrict its reflection camera layers, clip plane and resolution; update only when visible near water, motion/lighting thresholds or a bounded cadence require it. Prefer existing sky PMREM for small/rough surfaces. Avoid a new full-world SSR implementation until water capture cost is known. Do not update pools by adding geometry near palace.

**Cost:** 1 reflected scene render per update, potentially many draw calls and shadow interactions; 512² RGBA16F +32-bit depth ~3 MiB, 256² ~0.75 MiB, excludes other existing targets. Lower cadence amortizes cost but can stutter. **Mobile:** no new reflected scene; environment only. **Desktop:** bounded 512 capture; no reflection recursion, no redundant shadow-map update in capture.

**Touches:** `V41.waterInit/waterTick/nearWater`, `Water.js`, camera layers. **Risk/check:** shoreline/clip artefacts, stale reflection during turns, reflection/light mismatch at night.

### 14. Optional robust TAA with explicit motion data — defer until core works

**Evidence:** [H3](SOURCES.md) [مصدر أولي/محاضرة مطور] history reuse needs reliable vectors/rejection; [O1/D1](SOURCES.md) [تحليل صحفي] softness/ghosting trade-off.

**Implementation:** Current SMAA is the initial ULTRA baseline. A production TAA experiment needs projection jitter, current/previous view transforms, previous depth, velocity for skinned/deforming foliage, history reprojection, neighbourhood clipping, disocclusion/reactive masks and post-resolve sharpening. `ShaderPass` plus custom GLSL3 passes and `WebGLRenderTarget` histories can implement it. WebGL2 MRT requires deliberately authored outputs/materials; it is not enabled for standard materials by simply adding render-target attachments. Camera-only reprojection is insufficient. Reset on teleport, origin shift, resize, quality switch and camera cut; update wind and skeletal previous state consistently without changing physics.

**Cost:** At least resolve + sharpen draws (sharpen can fuse output), two colour histories 16P plus previous depth 4P; a full RG16F velocity field adds 4P (total 24P ~21.09/47.46 MiB), plus current scene/depth and any reactive masks. A separate velocity pass redraws scene geometry; MRT avoids that only after material work. Resolve reads multiple histories/colour/depth taps, more than a simple 16P traffic model. **Mobile:** off; **desktop:** experimental off until motion tests pass, budget measured as a complete system.

**Touches:** camera update/render loop, material variants including skinned/wind/depth, `ORG`, fx graph. **Risk/check:** trails behind leaves/characters, shimmering disocclusion, outlines and UI. Do not ship a “TAA” label for stationary accumulation only.

### 15. Cinematic DOF as a separate photo-only option

**Evidence:** [D1](SOURCES.md) [تحليل صحفي] low internal DOF resolution flickers; [H3](SOURCES.md) [مصدر أولي/محاضرة مطور] history ordering complicates DOF.

**Implementation:** Gameplay remains sharply readable. Optional desktop photo mode: depth-derived circle of confusion, near/far-aware half-size gather, bilateral composite; clamp near blur and handle foreground coverage. Custom `ShaderPass` stages because no DOF addon is vendored. Focus control/UI text Arabic. No change to camera collision or fixed-step simulation.

**Cost:** Proposed 3 reduced-resolution draws (CoC/prefilter, gather, refinement) plus fused final composite; minimum two Q RGBA16F scratch targets =4P (~3.52/7.91 MiB), plus optional CoC mask; many gather samples. Quality near blur may require more targets/passes. **Mobile:** off; **desktop:** photo-only opt-in. Low priority versus stable world rendering.

**Touches:** ULTRA fx graph and photo-camera state only. **Risk/check:** foreground halos, thin leaves, low-res flicker; no accidental blur on Arabic menus.

## Render graph and bounded allocation plan

Proposed desktop graph: scene (linear HDR + depth) -> AO/denoise in parallel conceptually but scheduled serially -> existing budgeted atmosphere/cloud output -> optional bloom chain -> optional TAA (requires explicit validated ordering/reactive masks) -> final grade/output/AA. This is a design dependency graph, **not a promise that arbitrary post effects commute**. Finalize whether TAA happens before bloom/DOF through moving-scene tests; default uses SMAA after output and no temporal feature. Renderer shadow and reflected-water scene draws are additional. Never keep both old and new post stacks rendering the same frame.

Mobile starter: scene+depth -> analytic haze -> grade/output -> FXAA only if needed. No TAA, DOF or new planar capture. Prefer reusing existing compatible buffers. One HDR scene+depth (12P), one RGBA8 output (4P), plus optional E bloom buffers (~0.88 MiB at 720p) is about 14.94 MiB core at 720p before shadow/environment/material additions. Core may be an existing allocation rather than entirely incremental. A 1024 shadow is another nominal 4 MiB. Texture staging, existing world assets and atmosphere resources are **not** included and can still exceed device capacity. Reject features rather than silently relaxing the memory ceiling.

Desktop illustrative core at 1080p: scene+depth 23.73 MiB, RGBA8 output 7.91, two AO Q buffers 7.91, two-level bloom 9.89 =49.44 MiB before atmosphere/SMAA targets. Existing versus incremental ownership must be recorded to avoid counting baseline targets twice. Three 2048 shadows add nominal 48 MiB; optional TAA data adds 47.46, water ~3 MiB; probe/environment/cloud resources and material textures are separate. Do not enable all optional features simply because the sum is below 192 MiB: geometry, baseline assets, renderbuffer duplication and upload staging are missing from this arithmetic.

Capability gates: WebGL2, `EXT_color_buffer_float` framebuffer completeness, usable depth formats and required texture filtering must be tested. Query actual formats/dimensions. If HDR target creation fails, disable optional ULTRA graph with an Arabic explanation and fall back to exact HIGH at load. Check `MAX_TEXTURE_SIZE`, sampler counts and compressed texture support before allocation. Never assume native compute shaders, indirect draws, hardware RT, DLSS, bindless textures or asynchronous compute are available in WebGL2.

## Execution slices after approval

1. Rebase on current main; audit Tab/v50g3 and v50g4 overlap. Record untouched preset hashes/settings and fixed deterministic screenshot routes before adding features.
2. Build ULTRA ownership/capability/kill-switch shell and reconcile the legacy key/new settings UI; keep all feature code inert elsewhere. Prove `ultra=0` fallback and no non-ULTRA imports/allocations first.
3. Implement the isolated HDR graph plus ranks 1–3; validate the existing atmosphere exposure compensation. Only then add material/LOD/wind work (4–6).
4. Measure shadows/local bounce/AO (7–9), choose a device profile, then add reduced bloom/wetness (10–11). Publish side-by-side moving captures and per-feature GPU/allocation deltas.
5. Desktop experiments 12–15 are separate opt-ins with individual evidence. TAA cannot block delivery of the stable SMAA profile. No deployment or merge is authorized by approval of research alone; follow the later implementation task's delivery instructions.

No executable prototype or game code is part of this branch. Future file names/modules can be chosen in implementation; the integration anchors above are actual source, not invented existing systems.

## Measurement and acceptance gates before claiming support

- **Real devices:** requested Galaxy A14/Mali-G57/4 GB (confirm exact hardware), desktop reference and another browser. Emulator measurements must be labelled emulator-only. Record OS/browser, viewport/drawing buffer, thermal/battery state and flags.
- **Routes:** noon and sunset outside city, forest/grass motion, shaded village, night lamps/wet roads, distant skyline, water shoreline, plus observation of existing palace exterior without adding any content. Include fast pans, origin recenter, chunk crossing, resize, pause/resume and offline reload.
- **Timing:** raw rAF frame intervals (not clamped dt) median/p95/p99, CPU update/upload/link work, GPU queries via `EXT_disjoint_timer_query_webgl2` if available; discard disjoint results, collect asynchronously without `gl.finish`. If no GPU timer exists, report frame-time deltas as such rather than GPU milliseconds. 33.3/16.7ms are target frame intervals, not renderer budgets detached from CPU work.
- **Accounting:** aggregate `renderer.info` across **all** scene/shadow/reflection/fullscreen passes, not just its last reset. Track framebuffer sizes/formats, geometry/texture bytes, pool high-water mark, decoded/staging memory and allocations after switching; `renderer.info.memory.textures` is a count, not VRAM bytes. Watch program variants/linkProgram after Play and worker upload bursts; do not duplicate the queued scheduler project.
- **Visual acceptance:** side-by-side stills and short moving captures. Judge exposure/white balance, shaded colour, sky/ground agreement, temporal stability, terrain seams, shadow crawl, AO halos, cloud trail, reflection lag and wetness. Material/vegetation “more” is not an acceptance metric by itself.
- **Pixel regressions:** pin seed/time/weather/camera/assets/UI/DPR/browser/GPU, await asset completion and control async effects; compare baseline against branch for HIGH/MEDIUM/LOW/vlow, with no ultra flags, with subflags, and with `ultra=0`. Compare forced/saved ULTRA+`ultra=0` against baseline **HIGH** explicitly. On the same deterministic renderer require zero changed pixels for legacy routes; different-GPU noise cannot be silently excused as pixel identity. Existing harness needs path adaptation; no pixel tests were run in this docs-only phase.
- **Resource regression:** non-ULTRA network/module/program/target sets must match baseline; switch/reload tests must not retain ULTRA materials, histories, listeners or stale workers. Kill-switch test must show no new resources allocated, not just invisible effects.
- **Stop criteria:** measured phone p95/thermal frame budget or memory ceiling failure -> disable the offending experimental feature, reduce ULTRA-only resolution/coverage, or report ULTRA unsupported on that device. Never modify old presets to compensate. Record final per-effect costs on real hardware before enabling by default.

## Deliverable validation for this phase

Documentation review must confirm: 10 substantive game studies, sources and evidence limits for every category, 15 ranked browser adaptations, actual source anchors, analytical cost assumptions, two explicit device profiles, all standing visual/physics constraints and an implementation approval gate. Git diff must contain only `docs/research/ultra/`. Link checks should distinguish syntactic correctness from access restrictions; a URL returning a page does not prove a claim.
