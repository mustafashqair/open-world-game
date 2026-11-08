# «العالم المفتوح»: big-game study and «فائقة» design

I could not run the commercial games or produce RenderDoc/Ghidra captures of them in this environment; this report uses public sources and a read-only inspection of the requested repository baseline.

## Decision in brief

[inferred] Start ULTRA with three coherent changes: an isolated linear-HDR/colour pipeline, bounded sky–lighting–reflection agreement, and analytic height haze. Keep the other seven visual candidates deferred until desktop screenshots and GPU measurements justify them. Do not increase pixel count, vegetation, view distance and shadow-map dimensions simultaneously. LOW/vlow improvements below are a separate research ranking, not changes authorized as part of ULTRA.

No runtime code, branches, pull requests, shaders, game assets or deployment were changed for this study. This is design only. Implementation must wait for Mustafa’s approval and use draft branches `wabi/ultra-1..N`.

### Evidence contract

- [cited]: a public source or inspected repository text supports the stated observation. Published third-party captures are still [cited], never our [captured].
- [inferred]: proposed adaptation, qualitative cost, ranking or engineering budget. These are not benchmarks.
- [captured]: reserved for our own actual GPU/game capture. There are none in this report.
- Public articles describe particular releases/platforms, not every build. A title appearing here does not mean it achieves high FPS on weak hardware. Elden Ring, for example, is a counterexample to that premise.
- All repository line numbers below refer only to `tab/v50g3` at full commit `65fc5d3628908efc89ecac7496f2b93998bf6c53`, retrieved during this study. Paths beginning `p0`, `p1`, `p2` mean `v50g3/code/part-000.txt`, `part-001.txt`, `part-002.txt` respectively. Public branch tips and PR heads can change.

## 1. Comma PR #6: keep, replace, and boundaries

[cited] [PR #6](https://github.com/mustafashqair/open-world-game/pull/6), inspected at head `2043b666`, is documentation/research, not a working ULTRA implementation. Its ten-game set is AAA-focused (Mirage, Origins, RDR2, Witcher next-gen, Ghost, Forbidden West, Cyberpunk, Kingdom Come 2, Forza Horizon 5, Death Stranding). Its plan already distinguishes source evidence from estimates and models an isolated HDR graph. Its document also records an earlier implementation hold and a restricted ranks-1–3 scope; this report does not interpret those recorded statements as fresh permission.

| Keep from #6 | Replace or tighten for this brief |
|---|---|
| Public-source learning; no proprietary code/assets; explicit unknowns | Add mobile coverage and the requested exact `[cited]` / `[inferred]` / `[captured]` vocabulary |
| One meaning for preset key `ultra`; Arabic label «فائقة» | Do not describe it as a completely absent key: the baseline already contains an `ultra` tuple and ORDER entry |
| Linear HDR, colour management, bounded PMREM, analytic haze as the first coherent package | Do not attach new temporal/volumetric/probe systems as hidden prerequisites |
| Separate render graph; legacy identity tests; extension fallbacks | Gate imports, allocations, material mutations and updates, not merely final-pass visibility |
| Allocation modelling and independent one-feature tests | Report GPU-time numbers as proposed acceptance ceilings, not measured gain/ms or A14 performance |
| Desktop-first | No A14 “ULTRA-lite” here; no ULTRA on A14/MatePad, and automatic tiering must never pick it on phones |

[inferred] This report replaces neither the existing PR’s text nor its branch. It supplies a fresh design against the requested base and current brief; it does not reopen an old implementation hold.

## 2. Eleven games: performance and high-quality rendering

Each numbered entry answers A and B separately. Techniques not mentioned in the cited evidence remain unknown—not absent. Sources are linked at the claim, with a consolidated register below.

### 2.1 GTA V — PC DX11 frame study, 2015

A. [cited] Courrèges describes distance-dependent mesh LOD and culling, with distant small vegetation omitted. In this PC pipeline the selection step is compute-driven; opaque geometry is rendered front-to-back so early depth rejection can avoid expensive fragment shading. His analysis explicitly contrasts this with PS3 work being performed on Cell/SPUs. These are scoped pipeline observations, not proof of smoothness on a modern entry-level phone. [GTA](https://www.adriancourreges.com/blog/2015/11/02/gta-v-graphics-study/)

B. [cited] The published frame uses deferred rendering with HDR buffers and five G-buffer render targets; its later lighting/post stages build the finished image. The author reports 4,155 draw calls, 1,113 involved textures and 88 render targets for that one frame, not a normal budget for our browser. We did not capture or independently reproduce those counts. [GTA](https://www.adriancourreges.com/blog/2015/11/02/gta-v-graphics-study/)

[inferred] Transfer spatial selection, early rejection and bounded small-object visibility; do not transplant its five-target deferred renderer or compute culler into Three.js.

### 2.2 Red Dead Redemption 2 — 2018 consoles / 2019 PC

A. [cited] Digital Foundry’s PC console-equivalence analysis identifies grass/tree LOD, volumetric quality, shadows and related settings as meaningful scalability levers. This supports selective quality tuning rather than turning every slider to maximum; it does not establish an exact residency algorithm. [RDR-PC](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps)

B. [cited] Rockstar’s SIGGRAPH 2019 presentation documents volumetric fog/cloud work, ray-marched scattering/transmittance and ambient/reflection lighting integration; DF describes TAA, detailed materials, volumetric atmosphere and shadow behaviour. The public talk is evidence for those techniques, not an A14 timing prediction. [RDR-TALK](https://www.advances.realtimerendering.com/s2019/index.htm) [RDR-TECH](https://www.digitalfoundry.net/articles/digitalfoundry-2018-red-dead-redemption-2-tech-analysis)

[inferred] A browser should first borrow coherent sky lighting and cheap depth/height haze; full production volumetrics have a much larger bandwidth and temporal-reconstruction burden.

### 2.3 The Witcher 3 — original-generation visibility/streaming

A. [cited] The GDC Umbra presentation is specifically about solving open-world visibility and streaming in Witcher 3: automatic occlusion and scalable visibility are the subject, not merely frustum culling. It supports the principle of avoiding submission/streaming of hidden content. It does not provide our current scene’s occluder data. [W3-VIS](https://www.gdcvault.com/play/1020231/Solving-Visibility-and-Streaming-in)

B. [cited] DF’s 2014 build analysis describes dynamic image-based lighting, materials, changing weather/water, temporal AA, shadows and light shafts. That is an early build analysis, not proof of the final release’s exact render graph or next-gen ray-tracing implementation. [W3-TECH](https://www.digitalfoundry.net/articles/digitalfoundry-2014-the-witcher-3-tech-analysis)

[inferred] Use conservative CPU cell visibility and the existing environment-light path; do not call it “Umbra” without an independent implementation and visibility validation.

### 2.4 Horizon Zero Dawn — Decima / PS4

A. [cited] Guerrilla’s visibility presentation describes PS4 visibility work using asynchronous compute and batching of object instances. Its temporal/checkerboard presentation documents reconstruction as a way to obtain a higher-resolution image without shading every final pixel independently. These mechanisms are platform-specific. [HZD-VIS](https://www.guerrilla-games.com/read/decima-engine-visibility-in-horizon-zero-dawn) [HZD-TEMP](https://advances.realtimerendering.com/s2017/index.html)

B. [cited] Guerrilla’s Nubis presentation describes artist-authorable, real-time volumetric cloudscapes and weather. The often-quoted “under 2 ms on PS4” applies to the early prototype discussed there; it is not the cost of every production cloud setup or of a WebGL port. [HZD-CLOUD](https://www.guerrilla-games.com/read/nubis-authoring-real-time-volumetric-cloudscapes-with-the-decima-engine)

[inferred] InstancedMesh and screen-space budgeting transfer; asynchronous compute and Decima’s production reconstruction do not transfer directly to WebGL2.

### 2.5 Ghost of Tsushima — PS4-era rendering

A. [cited] DF reports PS4 Pro modes trading image resolution against consistency: the quality mode is 3200×1800 with checkerboarding described as likely, while the performance mode uses 1080p; both target 30 FPS. This is not an example of a guaranteed 60-FPS weak-device mode. [GHOST-DF](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review)

B. [cited] Sucker Punch’s developer presentation covers relit spherical-harmonic lighting/probes, sky visibility, interior masks, reflection probes, sky and tone mapping. DF discusses the visual combination of wind/weather, cascaded and screen-space shadow detail, and reflections. Exact probe layouts and memory in Mustafa’s world are not established by that talk. [GHOST-DEV](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html) [GHOST-DF](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review)

[inferred] The valuable lesson is coherent art direction and lighting, not “add every cinematic effect.” Preserve gameplay readability; DOF/motion blur are not ULTRA prerequisites.

### 2.6 Elden Ring — launch patch 1.02 current-gen console analysis

A. [cited] DF reports performance-mode dynamic resolution (1512p–2160p on PS5/Series X, 1008p–1440p on Series S) and variable frame rates rather than a stable 60. Quality mode prioritizes higher fixed resolution. Dynamic resolution is therefore a tool, not proof of smoothness or a solution to CPU stalls. [ELDEN](https://www.digitalfoundry.net/articles/digitalfoundry-2022-elden-ring-ps5-xbox-series-tech-report)

B. [cited] The same analysis compares foliage, water/reflection and shadow presentation across modes. It is observational console analysis, not an engine pass breakdown; undocumented GI/occlusion algorithms are unknown here. [ELDEN](https://www.digitalfoundry.net/articles/digitalfoundry-2022-elden-ring-ps5-xbox-series-tech-report)

[inferred] Do not solve a CPU-bound frame by simply reducing render resolution; log CPU work and GPU timing separately.

### 2.7 Cyberpunk 2077 — modern PC ray-tracing/path-tracing options

A. [cited] CDPR’s requirements distinguish raster, ray-tracing and overdrive targets; its NVIDIA collaboration describes reconstruction/frame-generation technology on supported hardware. These are hardware-dependent scalability choices, not a technique that makes a weak phone run path tracing. Generated frame rate also is not identical to lower simulation/input latency. [CP-REQ](https://support.cdprojektred.com/en/cyberpunk/pc/sp-technical/issue/1556/cyberpunk-2077-system-requirements) [CP-LIGHT](https://www.cyberpunk.net/en/news/49747/lighting-up-the-dark-future-with-nvidia-and-cyberpunk-2077)

B. [cited] CDPR describes path-traced unified lighting, shadows, reflections and ambient occlusion in the advanced mode. This is a high-end reference for lighting consistency, not a feasible WebGL2 implementation recipe. [CP-LIGHT](https://www.cyberpunk.net/en/news/49747/lighting-up-the-dark-future-with-nvidia-and-cyberpunk-2077)

[inferred] Approximate consistency using sky IBL, limited AO and bounded reflections. Hardware RT, DLSS and frame-generation integration are out of scope.

### 2.8 Assassin’s Creed Unity — GPU-driven geometry

A. [cited] The SIGGRAPH 2015 abstract documents Unity’s per-material instance batching, mesh clustering for effective GPU culling, shadow occlusion and precomputed triangle back-face rejection. The same session separately presents RedLynx’s async-compute/indirect pipeline; those RedLynx details must not be mislabeled as Unity’s implementation. [AC-GPU](https://advances.realtimerendering.com/s2015/index.html)

B. [cited] NVIDIA’s game-specific guide documents selectable HBAO+, PCSS and texture/shadow quality, among other visual settings. Those branded PC features are not all browser-ready or needed simultaneously. [AC-GUIDE](https://www.nvidia.com/en-us/geforce/news/assassins-creed-unity-graphics-and-performance-guide/)

[inferred] Keep material/geometry batching and selective shadows; replace GPU-driven submission with browser-appropriate instancing, CPU visibility and modest object budgets.

### 2.9 Zelda: Breath of the Wild — Switch / Wii U

A. [cited] DF documents dynamic resolution scaling in stressed views: 90% on each axis in its observations. The article cautions that handheld-vs-docked performance is not explained simply by dynamic resolution, because both modes scale; it considers memory-bandwidth contention as a theory, not a proven cause. [ZELDA](https://www.digitalfoundry.net/articles/digitalfoundry-2017-zelda-breath-of-the-wild-uses-dynamic-resolution-scaling)

B. [cited] DF’s later Tears of the Kingdom review explicitly identifies volumetric lighting/light scatter and robust interactive wind as features retained from Breath of the Wild. These are published visual observations, not an exact shader/pass disclosure; Nintendo’s precise GI, fog and water algorithms remain unknown here. [ZELDA-VIS](https://www.digitalfoundry.net/articles/the-legend-of-zelda-tears-of-the-kingdom-the-digital-foundry-verdict)

[inferred] Strong silhouettes, a consistent palette and stable presentation can matter more than expensive post effects; this is an artistic inference, not a claim that Nintendo uses our proposed shaders.

### 2.10 Genshin Impact — mobile-first title with separate pipelines

A. [cited] miHoYo’s technical director explicitly describes separate Android/iOS and PC/console pipelines, with mobile as the primary development platform and platform runtime cost constraining technology selection. On the console pipeline, cached/interleaved cascades reduce repeated shadow work. The source does not establish the mobile cascade count or mobile streaming/animation scheduler; those stay unknown. [GENSHIN](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi)

B. [cited] The presentation documents stylized PBR, real-time time-of-day/weather, console reflection/ambient probes, and up to eight console shadow cascades with selective updates and penumbra-only soft-shadow work. Its numerical shadow pass times are console observations, not mobile costs. Do not advertise these console features as identical Android features. [GENSHIN](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi)

[inferred] Transfer platform separation and selective refresh, not eight cascades. Mustafa already has three cascades and a far-cascade cadence; improve that only after measurement.

### 2.11 Call of Duty Mobile — Samsung Adaptive Performance case study

A. [cited] Samsung documents tuning shadow distance, foliage LOD, animation LOD and target frame rate before thermal throttling. In its particular three-battle BR comparison it reports roughly 7% higher average FPS and lower temperature; that is not an A14 result and cannot be assumed for a browser. [CODM](https://developer.samsung.com/galaxy-gamedev/gamedev-blog/cod.html)

B. [cited] The same case study shows visual-quality knobs being reduced selectively rather than rendering every system at one global maximum. It establishes these exposed quality trade-offs, not a complete lighting/GI/post graph; exact top-quality pipeline internals remain unknown. [CODM](https://developer.samsung.com/galaxy-gamedev/gamedev-blog/cod.html)

[inferred] Browsers do not expose Samsung’s native temperature/frequency APIs. Use sustained frame-time evidence and user-approved pacing, not a fictional browser thermal sensor. No anti-cheat game was instrumented.

## 3. What this baseline actually has

[cited] The source contradicts a simple “four presets and no ULTRA” premise. `p0:173–180` already defines `ultra` (`pr:2.5`, `view:13`, `shadow:4096`, `veg:1.5`) and puts it in ORDER, labelled «فائق». That is a parameter tuple, not proof that all subsystems have a distinct ULTRA path. For example, `csmWant()` caps the CSM size at 2048 and `fxWant()` maps high/ultra to the same FX tier (`p2:3805`, `3837–3843`). The proposal replaces this key’s meaning and changes only its label to the requested «فائقة»; it must not duplicate the key.

| [cited] System | Actual code anchor | Consequence for design |
|---|---|---|
| Two asset tiers, not five presets | `index.html:1149–1162` autoTier returns mobile/high; `p0:203–212` applies HIGH defaults | Keep autoTier free of ULTRA; do not confuse asset tier with render preset |
| Settings and saved values | `p0:181–201`; `p1:4355–4373`; stepDown `p1:4413–4417` | Settings mutation, persistence, downgrade and both UI paths require tests |
| Renderer / tone mapping | `p0:961–972` | Antialias is based on `__QUALITY`, not directly LOW; preserve legacy ACES/output behaviour |
| Terrain | `p0:1968–1977` | Vertex-colour material with procedural colour noise, not an existing textured terrain-layer stack |
| Road/material textures | `p0:900–930`, `1124–1128` | Anisotropy and normal maps already exist in selected paths; inspect per-material before claiming “new” |
| Tree LOD / instancing | `p0:2141–2144`; `p1:130–163` | Count/range and buffer rebuilding are existing systems; do not redo #22/#29 |
| Chunk streaming | `p0:1984+`; `p1:250–288` | Streaming exists; CPU residency work is not a new ULTRA effect |
| Sky/IBL | `p0:1880–1900`; `p2:3772–3801` | PMREM from sky and character-environment replacement already exist |
| Shadows | `p2:3803–3827` | Three cascades; first two auto-update; far cascade updates every fourth tick. The nearby code comment must not override those actual assignments |
| AO/post | `p2:3836–3907` | GTAO at half width/height using scene depth; bloom, grade and SMAA already exist on HIGH |
| Current colour graph | `p2:3868–3872` | Half-float sRT is deliberately marked isXRRenderTarget so materials apply ACES before the final grade. “Half float” does not mean a clean un-tonemapped HDR scene |
| Water | `p2:4022–4048`, `4069–4083` | Planar Water.js reflection already exists; 512/256 default sizes; near/far cadence and reflection exclusions; LOW/vlow excluded |
| Atmosphere | `p2:4085–4164` | External atmosphere/LUT work exists; do not layer a duplicate atmosphere blindly |
| Frame scheduling / visibility cache | `p2:3643–3674`, `3019–3034` | Performance work has explicit existing owners in open PRs |

Repository permalinks: [index](https://github.com/mustafashqair/open-world-game/blob/65fc5d3628908efc89ecac7496f2b93998bf6c53/index.html), [p0](https://github.com/mustafashqair/open-world-game/blob/65fc5d3628908efc89ecac7496f2b93998bf6c53/v50g3/code/part-000.txt), [p1](https://github.com/mustafashqair/open-world-game/blob/65fc5d3628908efc89ecac7496f2b93998bf6c53/v50g3/code/part-001.txt), [p2](https://github.com/mustafashqair/open-world-game/blob/65fc5d3628908efc89ecac7496f2b93998bf6c53/v50g3/code/part-002.txt).

## 4. Technique-by-technique browser translation

Everything in the following cost columns is [inferred], relative cost/risk—not milliseconds measured on those devices. D = a midrange desktop GPU; A = Galaxy A14 Mali-G57 as specified by Mustafa; M = MatePad SE, exact SoC/RAM/browser not verified. “A/M avoid” means exclude the proposed quality addition, not that the current game necessarily lacks the effect. Native APIs and GPU architectures do not imply that the browser exposes them.

| Technique / study lead | WebGL2 translation; current anchor | D vs A vs M cost | Verdict |
|---|---|---|---|
| Mesh LOD / HLOD / impostors [GTA](https://www.adriancourreges.com/blog/2015/11/02/gta-v-graphics-study/) [HZD-VIS](https://www.guerrilla-games.com/read/decima-engine-visibility-in-horizon-zero-dawn) | CPU distance/cell selection + InstancedMesh; existing tree LOD/billboards `p0:2141`, `p1:54–163` | D low CPU; A/M useful if batching and transitions remain cheap | HIGH-and-below perf win; not reimplement #22/#29 |
| Streaming / bounded residency [W3-VIS](https://www.gdcvault.com/play/1020231/Solving-Visibility-and-Streaming-in) | Existing workers/chunks `p1:250–288`; cap in-flight decode/upload and retain nearby cells | D moderate CPU/VRAM; A/M high memory/GC sensitivity | HIGH-and-below perf win; #17/#18 own related work |
| Frustum / conservative occlusion / portal cells [W3-VIS](https://www.gdcvault.com/play/1020231/Solving-Visibility-and-Streaming-in) | CPU visibility/cells; current CULL23 `p2:3019–3034`; portals only if scene semantics support them | D CPU cost vs draw savings; A/M must save more than tests cost | HIGH-and-below perf win; no blind all-mesh frustum toggle |
| GPU compute / indirect culling [GTA](https://www.adriancourreges.com/blog/2015/11/02/gta-v-graphics-study/) [AC-GPU](https://advances.realtimerendering.com/s2015/index.html) | Core WebGL2 lacks compute shaders/SSBO/indirect-draw submission. Use CPU selection + instancing | No literal port on D/A/M browser | Not applicable literally |
| Instancing / material batching [AC-GPU](https://advances.realtimerendering.com/s2015/index.html) | InstancedMesh trees and merged world meshes already exist `p1:130–163`, `p0:1989–2001` | D CPU draw savings; A/M good but huge batches weaken culling | HIGH-and-below perf win |
| Crowd/NPC/animation LOD [CODM](https://developer.samsung.com/galaxy-gamedev/gamedev-blog/cod.html) | Throttle distant/offscreen mixers/AI independently from rendering; frame loop `p2:3654–3674`, crowd `p1:5183+` | D CPU; A/M often more valuable than post reduction | HIGH-and-below perf win; do not change palace/garden placement |
| Dynamic resolution [ELDEN](https://www.digitalfoundry.net/articles/digitalfoundry-2022-elden-ring-ps5-xbox-series-tech-report) [ZELDA](https://www.digitalfoundry.net/articles/digitalfoundry-2017-zelda-breath-of-the-wild-uses-dynamic-resolution-scaling) | Adjust internal pixel ratio `p1:4357`; needs hysteresis and CPU/GPU diagnosis | D bandwidth relief; A/M large fill-rate relief, cannot fix CPU waits | Separate future perf proposal; not change legacy behaviour here |
| TAA-U / FSR-like temporal upscale [HZD-TEMP](https://advances.realtimerendering.com/s2017/index.html) | Needs stable history, jitter, motion/depth, disocclusion; absent from current SMAA path `p2:3886–3907` | D considerable engineering/history buffers; A/M bandwidth/ghosting risks | Not first ULTRA; no pretend DLSS/FSR toggle |
| Shader variants / warmup [GTA,existing repo] | Three compile/compileAsync where supported, bound permutations; current G50 `p2:3453–3465`, `3485–3534` | D driver stalls; A/M CPU and upload pressure | HIGH-and-below perf win; #17 owns overlap |
| Native PSO cache / async compute | WebGL2 driver compilation is not an explicit DX12/Vulkan PSO cache; no native async-compute queue | Not directly controllable on any browser | Not applicable literally |
| Frame pacing / thermal adaptation [CODM](https://developer.samsung.com/galaxy-gamedev/gamedev-blog/cod.html) | Single paced rendered-frame loop; no Samsung temperature APIs; `p2:3643–3674` | D low overhead; A/M sustained pacing/thermal load important | HIGH-and-below perf win; #8/#20 own overlap |
| HDR / tonemap / LUT [CP-LIGHT](https://www.cyberpunk.net/en/news/49747/lighting-up-the-dark-future-with-nvidia-and-cyberpunk-2077) [GHOST-DEV](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html) | Isolated linear target and final output; current ACES-in-sRT must be separated `p2:3868–3872` | D modest bandwidth; A/M float-target risk/high bandwidth | ULTRA rank 1; legacy untouched |
| Sky IBL / reflection agreement [GHOST-DEV](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html) | Bounded PMREM; already `p2:3772–3801` | D update spikes; A/M avoid new captures/residency | ULTRA rank 2; not a new GI system |
| Analytic height/aerial haze [RDR-TALK](https://www.advances.realtimerendering.com/s2019/index.htm) | Fuse cheap depth/height attenuation into ULTRA atmosphere graph; `p2:3829–3834`, `4085–4164` | D modest fill; A/M avoid extra pass | ULTRA rank 3 |
| Full volumetric fog/clouds [HZD-CLOUD](https://www.guerrilla-games.com/read/nubis-authoring-real-time-volumetric-cloudscapes-with-the-decima-engine) | Fragment ray marching possible, but no direct compute pipeline; existing sky/atmo `p0:1880–1900`, `p2:4130+` | D high fill/history; A/M avoid | Deferred ULTRA candidate, not starting package |
| CSM/contact shadows [GENSHIN](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi) [GHOST-DF](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review) | Existing three cascades `p2:3803–3827`; stabilize/filter/cadence before adding maps | D geometry/fill; A/M shadow-free LOW must remain shadow-free | Deferred ULTRA rank 7 |
| SSAO/GTAO [AC-GUIDE](https://www.nvidia.com/en-us/geforce/news/assassins-creed-unity-graphics-and-performance-guide/) | Half-size GTAO already uses scene depth `p2:3877–3882`; tune, do not duplicate | D half-res feasible; A/M expensive bandwidth | Keep HIGH path; deferred ULTRA tuning |
| SSR [GHOST-DF](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review) | Possible fragment ray march, but needs history/depth and misses offscreen data; water already planar `p2:4022–4083` | D high fill; A/M avoid | Deferred, not needed for initial ULTRA |
| Terrain detail/blending [art-directed inference] | Add independent material variant to vertex-colour terrain `p0:1968–1977`; no borrowed textures | D extra sampling; A/M avoid cost/new assets | Deferred ULTRA rank 4 |
| Foliage/wind [GHOST-DF](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review) | Instanced vertex deformation and near-tier LOD; current trees `p1:130–163` | D vertex/alpha overdraw; A/M substantial | Deferred ULTRA ranks 5–6 |
| Texture quality / anisotropy [AC-GUIDE](https://www.nvidia.com/en-us/geforce/news/assassins-creed-unity-graphics-and-performance-guide/) | Bounded anisotropy using capability maximum; current road/character maps `p0:900–930`, `1124–1128` | D bandwidth; A/M streaming/compression matter more | ULTRA material candidate; never globally replace maps |
| Water [existing repo] | Reuse planar reflection; retain exclusions/cadence before size increase `p2:4022–4083` | D extra scene render; A/M skip new reflection | Deferred ULTRA rank 9 |
| Bloom / colour grade / AA [existing repo] | Already bloom + grade + SMAA `p2:3860–3907`; preserve only one output transform | D modest extra fill; A/M none on LOW/vlow | Refine in ULTRA, not duplicate |
| DOF / motion blur | New depth/history/velocity work not present in reviewed post graph `p2:3891–3907` | D bandwidth/latency/readability; A/M avoid | Not proposed for gameplay |
| Hardware RT/path tracing [CP-LIGHT](https://www.cyberpunk.net/en/news/49747/lighting-up-the-dark-future-with-nvidia-and-cyberpunk-2077) | No WebGL2 hardware RT API; fake approximations are not ray tracing | Not applicable on D/A/M WebGL2 | Not applicable |

## 5. Ranked tables

### 5.1 Top ten visual-gain-per-ms hypotheses for ULTRA

[inferred] This is an ordinal design ranking, not a measured numerical gain/ms ratio. Gain depends on the scene and artistic tuning. “Budget” is the maximum extra GPU time to aim for at a 1920×1080 internal render size on an RTX-3060-class desktop—not a forecast and not evidence of that GPU’s measured behaviour. Current HIGH cost is the baseline. Reject a feature that cannot meet its own cap or provide a visible benefit. Do not sum all rows into the starting package.

| Rank | Candidate / visual value | Extra GPU-time budget ceiling | Scope |
|---|---|---:|---|
| 1 | Coherent linear HDR, exposure and fused LUT/output; correct highlight roll-off and palette | 0.5 ms/frame | Initial recommendation |
| 2 | Sky/lighting/reflection agreement; bounded PMREM, avoid studio-like characters | 0.2 ms/frame amortized; ≤2 ms individual refresh target | Initial; existing system refined, not invented GI |
| 3 | Analytic height haze; depth separation and consistent distance colour | 0.5 ms/frame | Initial; no ray-marched volume |
| 4 | Near-ground material detail and slope/height blending | 1.0 ms/frame | Deferred; independent material variant, no copied assets |
| 5 | Better near silhouettes and non-popping LOD transitions | 0.8 ms/frame | Deferred; visible geometry only, bounded counts |
| 6 | Foliage wind/variation at existing density before more instances | 0.6 ms/frame | Deferred; preserve approved species/placement |
| 7 | CSM stability/contact grounding before more cascades or 4096 maps | 1.2 ms/frame | Deferred; geometry cost scene-dependent |
| 8 | Local irradiance/baked occlusion at selected static structures | 0.5 ms/frame | Deferred; authoring/data budget and leak tests required |
| 9 | Water reflection quality/cadence improvements | 1.5 ms/frame averaged; 3 ms update-frame target | Deferred; extra scene render makes spikes decisive |
| 10 | Existing bloom + AO + SMAA balance; no extra cinematic stack | 0.8 ms/frame beyond HIGH | Deferred tuning; avoid dark halos/overbloom |

[inferred] Full SSR, ray-marched volumetric clouds, temporal upscale, DOF and motion blur fall below this shortlist for the current browser/game. No source proves the ordering; desktop captures must reorder it.

### 5.2 Top five LOW/vlow smoothness hypotheses

[inferred] This ranking is the next performance-validation agenda, not a promise of speedup and not permission to change the four legacy presets during ULTRA work.

| Rank | Work to validate | Why it could help | Existing owner / acceptance evidence |
|---|---|---|---|
| 1 | Stop rebuilding/uploading unchanged tree instance buffers | Removes CPU writes and GPU uploads without changing visible trees | #22 at `p1:130–164`; compare buffer write/upload count and image identity |
| 2 | One paced rendered-frame loop for side effects; no offscreen fire work | Avoid duplicated RAF CPU work on skipped frames | #8/#20 at `p2:2519`, `2705`, `3646`; p95 frame time and animation-time correctness |
| 3 | Remove per-frame cache-key/array/Map allocation | Reduces GC-induced hitches rather than only mean frame time | #21 `p1:223–241`, `5183+`, `p2:3019–3033`; allocation/GC trace, identical culling |
| 4 | Bound residency, decode/upload bursts and prewarm work | Avoid memory pressure and one-frame stalls | #17/#18, G50 `p2:3453–3534`; cold-load/route memory, p95/p99, no missing assets |
| 5 | Use intended lower tree tier and skip unneeded atmosphere/cloud work | Cuts geometry and fragment/initialization work on limited GPUs | #29, #19/#23; `p0:2138+`, `1897+`, `p2:4158+`; actual A14 route and silhouette/weather checks |

[inferred] A14 and MatePad tests must be sustained, not a short cool-device average-FPS run. Keep a fixed route, time/weather/seed and record p50/p95/p99 frame time, long frames, loading time, heap, draw calls/triangles, and visual behaviour. Numeric savings are unknown.

## 6. ULTRA design: one preset, isolated resources

### 6.1 Eligibility, meaning and switches

[inferred] Use one existing key `ultra`, label it exactly «فائقة», above HIGH. It is manual opt-in only. No automatic upgrade path selects it on desktop or mobile. Keep `index.html:autoTier` returning only mobile/high; `qTierDefaults` can still choose HIGH, never ULTRA. Reject ULTRA on known phones/tablets, including the A14/MatePad; an existing saved `ultra` value must not bypass that eligibility check.

[inferred] Strong desktop eligibility needs a conservative capability/performance check, not just a GPU name or `deviceMemory`. Require desktop-class interaction/UA signals, WebGL2, successful target allocation/framebuffer completeness and a short representative offscreen/scene benchmark before enabling the manual option. UA, touch and memory hints alone cannot prove hardware strength. An unknown/ambiguous platform fails closed to HIGH. Do not expose diagnostics in English; if an explanation is needed, use Arabic such as «فائقة متاحة لأجهزة الكمبيوتر القوية فقط». A user may opt out; benchmark success is not consent to enable.

[inferred] `?ultra=0` or `?v50g5=0` makes the new ULTRA path inactive before optional imports or target creation. A saved/manual ULTRA request then renders through the exact existing HIGH path for that session, without silently overwriting the saved choice. Other presets ignore ULTRA entirely. `?ultra=1` must not force opt-in or bypass the desktop gate. Master-switch interaction with other PRs must be reviewed against their final merged semantics.

[inferred] Initial ULTRA inherits HIGH’s geometry, view distance, vegetation, population, water policy and shadow limits; do not adopt the baseline’s legacy ultra tuple (2.5× pixels, 13 chunks, 4096, 1.5 vegetation) blindly. Define separate new ULTRA effect settings, while using HIGH’s exact baseline values for the shared world. The 1080p budget means a measured 1920×1080 drawing buffer, not a 1080p CSS viewport multiplied by DPR. Expose supersampling later only if separately approved and budgeted.

### 6.2 Proposed pass architecture

[inferred] Legacy and new graphs are mutually exclusive, not stacked:

```
manual «فائقة» request
        |
eligibility + switches + framebuffer validation
        | no ----------------> existing HIGH path (unchanged)
        | yes
shared scene / camera / gameplay state
        |
ULTRA-only linear scene colour + scene depth
        |---- existing AO concept, only one compatible depth chain
        |---- sky PMREM resource (bounded / change-triggered)
        |
analytic height haze + existing atmosphere composition
        |
compatible bloom in linear domain
        |
exposure + tone mapping + LUT + one sRGB output transform
        |
existing SMAA-compatible presentation / screen
```

[inferred] Do not reuse HIGH’s `isXRRenderTarget` ACES trick in the ULTRA linear scene stage. Prevent double tone mapping and double sRGB conversion. All custom sky/water/atmosphere shaders need colour-domain auditing. HIGH must continue using its old graph; do not globally mutate ShaderChunk, renderer colour state, shared materials or uniform values while inactive.

### 6.3 Feature specification, memory, fallbacks and tests

All figures below are [inferred] planning ceilings, not measured allocations/times. Memory is GPU allocation modelling, not JavaScript heap or actual driver residency. MiB = 1,048,576 bytes. At 1920×1080, RGBA16F colour = 15.82 MiB; 32-bit depth = 7.91 MiB; RGBA8 = 7.91 MiB. Half width and half height is one-quarter pixel count. Add-on internals, alignment, mipmaps and multisampling can increase allocation; inventory actual targets before accepting the feature.

| Feature | Budget / memory allowance | Exact hook anchors | Missing-capability fallback | How to test |
|---|---|---|---|---|
| 1. Linear HDR + exposure/LUT/output | ≤0.5 ms additional GPU time/frame. Own scene RGBA16F + depth: 23.73 MiB model; optional LDR scratch 7.91 MiB; 32³ RGBA8 LUT 0.125 MiB. Reuse an existing compatible target rather than duplicate it; transient old+new graph peaks must be counted | Renderer `p0:961–963`; `fxWant/fxBuild/fxRender` `p2:3837–3907`; settings `p1:4355–4367` | Need `EXT_color_buffer_float`, supported target, complete FBO. If any check/import fails: dispose partial ULTRA targets and route to exact HIGH, not an untested LDR imitation | Neutral/gray ramp, saturated highlight, sun/sky/skin/water and transparent object tests; inspect values before output; toggle preset repeatedly, resize and context loss; zero difference in four legacy paths |
| 2. Sky/light/reflection agreement | ≤0.2 ms/frame amortized extra; individual refresh target ≤2 ms. Bound environment texture dimensions and total new environment residency to 8 MiB. A 256-face half-float cube mip-chain has ~4 MiB raw texels; PMREM CubeUV layout/scratch adds overhead and must be inventoried | Existing env init/update and character sweep `p2:3772–3801`; initial env `p0:972`; sky `p0:1880–1900` | Reuse existing HIGH environment if float target or PMREM build fails. No replacement probe grid and no new per-character cube captures | Fixed noon/dawn/night/storm snapshots; rotate metal/skin; record per-refresh GPU spike and peak texture allocations; no per-frame capture; disposal on exit; no light leaks into interiors |
| 3. Analytic height haze | ≤0.5 ms/frame extra. Fuse into ULTRA compatible composition, 0 additional full-screen target preferred; hard cap one half-size RGBA16F scratch = 3.96 MiB if unavoidable | Fog `p2:3829–3834`; atmosphere load/update/post `p2:4085–4164`; scene depth in `p2:3868–3872` | Core fragment/depth sampling; if required depth format/FBO is unsupported, omit new haze and use HIGH atmosphere. No dependency on an unavailable float-filtering extension | Horizon vs near visibility, uphill/downhill/underwater, far mountains, noon/night/rain, transparent water/foliage edges; avoid double fog; test debug origin shifts |
| 4. Terrain detail/blend — deferred | ≤1 ms; ≤8 MiB new texture residency; no new assets assumed approved | `p0:1968–1977` separate material variant | Existing vertex colours/noise | Slope/height seams, floating origin, grazing angle, shadowed ground; no texture tiling illusion or shimmer |
| 5. Silhouette LOD — deferred | ≤0.8 ms; ≤16 MiB incremental geometry allowance; counts must be measured | `p0:2141–2144`, `p1:54–163`; chunks `p1:250–288` | Existing HIGH LOD | Identical route forward/back, slow threshold crossing, silhouette transitions, teleport; no new asset/species |
| 6. Foliage wind/variation — deferred | ≤0.6 ms; ≤4 MiB per-instance/geometry extra | `p1:130–163`; tree material `p0:2006+` | HIGH material/instances | Vertex displacement bounds, shadow/culling agreement, alpha overdraw, calm/storm; no cypress/palms/snow |
| 7. CSM/contact — deferred | ≤1.2 ms; no automatic 4096 maps. Three 2048²×4-byte shadow images alone model 48 MiB before separate depth attachments/overhead; actual Three shadow packing must be inventoried. Do not add a second set | `p2:3803–3827`, V40 shader integration `p0:73–96` | Existing HIGH CSM/sun shadow | Contact acne/peter-panning, cascade transitions, moving actors, far-update cadence, rapid camera rotation; actual texture formats and extra passes inspected |
| 8. Local irradiance/occlusion — deferred | ≤0.5 ms; ≤8 MiB authored lighting-data allowance | Sky env `p2:3772–3801`, material hook `p0:1968+` | Existing sky IBL | Doorways/interiors, time/weather relighting, probes/light leakage; no unsupported “dynamic GI” claim |
| 9. Water refinement — deferred | ≤1.5 ms avg extra; ≤3 ms update-frame target; ≤16 MiB extra including reflection depth, not only colour | `p2:4022–4083` | Existing HIGH Water.js sizes/cadence | Reflection cost with town/trees in view, far-water cadence, resize, transparency, sun specular and hide-list restoration |
| 10. AO/bloom/AA balance — deferred | ≤0.8 ms beyond HIGH; ≤16 MiB incremental allowance; inventory GTAOPass/bloom/SMAA internal targets | `p2:3877–3907` | Existing HIGH FX unchanged; failed optional feature is disabled in ULTRA or whole profile returns to HIGH | AO halos/thin geometry, bloom fire/sun, foliage shimmer, camera motion, no double AA/output conversion |

[inferred] Rank-1–3 initial incremental memory acceptance ceiling: 48 MiB steady-state over current HIGH, 64 MiB transient while switching, subject to real target inventory. These are constraints to reject an over-budget implementation, not evidence that 48 MiB is enough on every driver. Shader/program, geometry and texture peak counts must be reported separately. Missing timer-query extension means GPU milliseconds are unavailable; CPU submission duration must not be renamed GPU time.

### 6.4 Identity, settings and world rules

[inferred] “Byte-identical in behaviour” cannot mean the entire source files remain byte-identical after adding a preset. Treat it as: preserve the old four preset tuples and code paths verbatim wherever possible; with ULTRA inactive, no extra imports/targets/RAF/updates/material mutation; same settings output, gameplay events and deterministic rendered results. Pixel identity is tested on the same browser/GPU/build and deterministic state; cross-device identical pixels are not a valid guarantee.

[inferred] Both old panel (`p1:4370–4373`) and the active G50 settings path must be tested; the gear already dispatches to `SG50.open` when present (`p1:4353`). Do not claim the old panel alone proves the visible UI. Inspect the G50 UI provider before implementation rather than guessing a second settings label. A preset API also exists at `p1:4367`; saved settings and programmatic setters must obey eligibility/switches.

[inferred] Do not alter terrain population, animal/NPC spawning, palace/garden exclusion regions or asset selection. No cypress, palms, snow, sheikh or NPCs near palace/garden. ULTRA changes presentation of the existing permitted world; it does not authorize new content. Verify those restrictions in scene snapshots and placement data, not only UI text.

## 7. Collision audit against current PRs

[cited] PR file lists and patches were inspected read-only. Ranges below are changed-hunk base ranges, not a proof of semantic independence. Header-only proximity is not the same as changing the same statements.

| PR | Observed changed areas | ULTRA interaction / rule |
|---|---|---|
| [#7](https://github.com/mustafashqair/open-world-game/pull/7) | README, `tools/join_large_files.py` | No runtime hunk overlap; do not change join workflow |
| [#8](https://github.com/mustafashqair/open-world-game/pull/8) | `p0:14+`, `p1:4354–4360,4415+`, `p2:3643–3670` | Direct settings-hook overlap with ULTRA; preserve its pacing handler and rebase narrowly |
| [#17](https://github.com/mustafashqair/open-world-game/pull/17) | Imports/flags, `p1:254+,4229+`, `p2:2968+,3426+,3452–3538,3650+`, v50g4 upload budget modules | Do not add new warmup/upload scheduler or rewrite G50; optional ULTRA resource preparation must integrate, not fork it |
| [#18](https://github.com/mustafashqair/open-world-game/pull/18) | Imports/flags, `p1:190+,245–277,700+,5156+`, frame-loop hooks, v50g4 residency modules | No replacement residency manager; do not increase chunk/view pressure initially |
| [#19](https://github.com/mustafashqair/open-world-game/pull/19) | `p2:4158–4165,4194+` | Direct atmosphere vicinity; preserve LOW/vlow skip/import gating |
| [#20](https://github.com/mustafashqair/open-world-game/pull/20) | `p1:244+`, `p2:2519+,2705+,3646+` | No new independent RAF; leave side-effect scheduling to this work |
| [#21](https://github.com/mustafashqair/open-world-game/pull/21) | `p1:223–241,5183+`, `p2:3019–3033` | Do not redo cache allocation/crowd/culling work |
| [#22](https://github.com/mustafashqair/open-world-game/pull/22) | `p1:130–164` | Deferred LOD/wind candidate touches same tree system; no changes in initial package |
| [#23](https://github.com/mustafashqair/open-world-game/pull/23) | `p0:1897+`, `p2:3772+` | Direct sky/environment vicinity; preserve below-horizon LOW optimization and avoid duplicated shader-string rewrites |
| [#29](https://github.com/mustafashqair/open-world-game/pull/29) | `p0:2138–2144` | Preserve LOW tree cap; no shared high-detail budget mutation |

[cited] The supplied history also establishes recent loading draft PRs #30–#32. Their retrieved file lists put changes in warmup gating, geometry merge allocation and earlier EMB42 requests. [inferred] ULTRA must not touch those concerns; final conflict testing should include them if they remain active. No claim of a merge-clean result is made: no design code exists to merge.



Inspected PR head SHAs (frozen audit provenance):

- #6: `2043b6665d032051c523e8d8c4a4fc7b9f7473a3`
- #7: `fd7cfbb06d3ea598fd5ec86bbd0cf074e926025f`
- #8: `314e72a9b82be2076dcce4e6a3678981951dd9f5`
- #17: `cbc9f8a00724588ce90bcb2cc7d0039b0b5dcbe6`
- #18: `33f0cdbb69dd90f37830a7f76a5b992eec33e9b6`
- #19: `e3d70a685737e82615245cffb81692b4d54f3d30`
- #20: `565554467dd411a865b937df63da212caea9e921`
- #21: `fc9fe8218355d548aaf334ae24b8b30010873b84`
- #22: `a62d8f5c8d6f73a0a2db09834aafc8d42bf5436f`
- #23: `c66cc6591ea9b465ba2f95437a08c75c234a57e8`
- #29: `acc445651d1a5d7dc6a3bb48134da84d67cc7e55`

## 8. Validation and possible draft-PR sequence after approval

[inferred] Proposed sequence, not authorization:

1. `wabi/ultra-1`: eligibility/switch/resource-lifecycle skeleton plus isolated HDR/grade, with no extra scene content. Prove all four legacy paths and exact HIGH fallback first.
2. `wabi/ultra-2`: bounded environment agreement on that approved graph. Record refresh spikes and residency.
3. `wabi/ultra-3`: analytic haze, reusing depth and atmosphere correctly. No new volumetric/cloud system.
4. Ranks 4–10 remain research candidates. New measurement-driven approval is needed before their implementation.

[inferred] Before each draft, refresh baseline and affected PR heads and document exact changed statements. The user has not requested independence between these future ULTRA PRs; choose stacked or independent structure explicitly in the approved implementation plan rather than silently assuming either.

### Test matrix

- [inferred] Fixed seeded route and camera bookmarks: spawn, palace/garden exterior, town street, village, forest edge, shore/water, far horizon and representative interior. Never add NPCs to exclusion zones to make a test look busy.
- [inferred] Same time/weather snapshots: noon, sunset, night, cloud/rain; same browser/GPU, dimensions and input. Compare HIGH vs ULTRA one feature at a time.
- [inferred] Legacy matrix: vlow/low/medium/high, q=mobile/high as applicable, fresh and saved settings, ULTRA on/off/master off, failed import/extension, repeated switching, resize, context loss/restore. Compare images and event/state traces; assert no new inactive imports, targets, programs or loops.
- [inferred] Real desktop: report hardware/browser/driver, actual drawing buffer, warm and cold tests, GPU times via `EXT_disjoint_timer_query_webgl2` only when available, discard disjoint samples. CPU frame/logic durations separately; collect p50/p95/p99, update spikes, draw/triangle counts and actual target inventory. Renderer texture counts are not byte-residency measurements.
- [inferred] Real A14 and exact MatePad variant: ULTRA must remain unavailable/never automatic; verify unchanged LOW/vlow loading, gameplay and sustained route. Emulated mobile UA or SwiftShader is not device validation.
- [inferred] Release gate: visible improvement demonstrated, no legacy regression, budget adherence in the representative worst view, fallback/disposal success, Arabic strings correct, no forbidden content changes. If a desktop test cannot be performed, the PR remains an unvalidated draft.

## 9. What could not be verified

1. No own RenderDoc capture, Ghidra examination of a commercial game, proprietary executable/assets, anti-cheat instrumentation or DRM bypass. No source game pass was reproduced. Published captures and source articles are only [cited].
2. No real RTX-3060-class desktop GPU measurement, A14 measurement or MatePad measurement. No measured visual-gain/ms ratio. Proposed ms/memory ceilings are design constraints, not results.
3. MatePad SE’s exact generation/SoC/RAM/browser and actual device GPU capabilities were not established; the name covers variants. No Mali-G57 device results were inferred from desktop/software rendering.
4. No playable session of Mustafa’s baseline was used for this report’s image identity, appearance, NPC placement, actual FBO layout, GPU residency or peak-memory claims. Static source inspection does not prove runtime success.
5. No guarantee that the retrieved PR heads will remain current or merge cleanly. Collision audit is statement/patch planning, not an actual merge or a behavioural conflict test.
6. Genshin mobile internals, Zelda GI/fog/water internals and CoD Mobile’s full high-quality render graph remain incompletely documented by the selected public evidence. Unknowns are not filled with generic engine assumptions.
7. HZD prototype cloud timings, Genshin console shadow timings, GTA V single-frame counts and Samsung’s native CoD test cannot be transferred numerically to this browser or devices.
8. PR #6’s recorded prior approvals/hold are documentation, not newly authenticated user instructions. This study does not lift them. The current brief itself requires stopping before code.
9. Input preview limitation: the retained conversation contains an unavailable earlier media preview and omitted historical excerpts. They were not reconstructed or used as visual evidence. The repository/PR sources needed for this report were retrieved directly, so no screenshot/file interpretation depends on that missing preview.

## 10. Public source register

The research used question-focused public extracts, article excerpts and developer abstracts/decks rather than pretending to have watched every complete talk/video. Quotes/claims above are limited to those retrieved sections. A catalog abstract establishes the described topic, not an unseen pass list. None of these links grants permission to copy game data.

- GTA — Adrian Courrèges, PC DX11 published frame breakdown (2015). [Source](https://www.adriancourreges.com/blog/2015/11/02/gta-v-graphics-study/)

- RDR-PC — console-equivalent PC settings analysis. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps)

- RDR-TALK — Rockstar SIGGRAPH 2019 volumetric-rendering abstract/materials. [Source](https://www.advances.realtimerendering.com/s2019/index.htm)

- RDR-TECH — original console visual analysis. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2018-red-dead-redemption-2-tech-analysis)

- W3-VIS — Witcher 3 visibility/streaming presentation abstract. [Source](https://www.gdcvault.com/play/1020231/Solving-Visibility-and-Streaming-in)

- W3-TECH — early-build visual analysis, not next-gen. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2014-the-witcher-3-tech-analysis)

- HZD-VIS — Guerrilla visibility talk. [Source](https://www.guerrilla-games.com/read/decima-engine-visibility-in-horizon-zero-dawn)

- HZD-TEMP — Decima temporal/checkerboard presentation abstract. [Source](https://advances.realtimerendering.com/s2017/index.html)

- HZD-CLOUD — Guerrilla Nubis presentation. [Source](https://www.guerrilla-games.com/read/nubis-authoring-real-time-volumetric-cloudscapes-with-the-decima-engine)

- GHOST-DF — PS4/Pro technical review. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2020-ghost-of-tsushima-tech-review)

- GHOST-DEV — Jasmin Patry, Real-Time Samurai Cinema. [Source](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)

- ELDEN — launch patch 1.02 modes and performance. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2022-elden-ring-ps5-xbox-series-tech-report)

- CP-LIGHT — CDPR/NVIDIA lighting/reconstruction article. [Source](https://www.cyberpunk.net/en/news/49747/lighting-up-the-dark-future-with-nvidia-and-cyberpunk-2077)

- CP-REQ — official target requirements. [Source](https://support.cdprojektred.com/en/cyberpunk/pc/sp-technical/issue/1556/cyberpunk-2077-system-requirements)

- AC-GPU — GPU-driven pipelines session; Ubisoft and RedLynx portions distinguished. [Source](https://advances.realtimerendering.com/s2015/index.html)

- AC-GUIDE — PC graphics settings guide. [Source](https://www.nvidia.com/en-us/geforce/news/assassins-creed-unity-graphics-and-performance-guide/)

- ZELDA — Switch/Wii U dynamic-resolution analysis. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2017-zelda-breath-of-the-wild-uses-dynamic-resolution-scaling)

- ZELDA-VIS — Digital Foundry’s TotK review, explicitly distinguishing shared BOTW features from sequel additions. [Source](https://www.digitalfoundry.net/articles/the-legend-of-zelda-tears-of-the-kingdom-the-digital-foundry-verdict)

- GENSHIN — miHoYo technical director Zhenzhong Yi, Unity Dojo 2021; same deck also retrieved at https://www.slideshare.net/slideshow/210617-unity-dojo20211mihoyozhenzhongyi/249437133 . [Source](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi)

- CODM — Samsung Adaptive Performance case study. [Source](https://developer.samsung.com/galaxy-gamedev/gamedev-blog/cod.html)

### Browser API references for the design

[cited] WebGL2 API surface and optional extension contracts can be checked against [WebGL2 specification](https://registry.khronos.org/webgl/specs/latest/2.0/), [EXT_color_buffer_float](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_float/), [EXT_disjoint_timer_query_webgl2](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/) and [Three.js colour-management manual](https://threejs.org/manual/en/color-management.html). Optional extensions must be probed at runtime; their documentation does not establish a particular device’s support.

## Stop point

[inferred] Recommended approval package is ranks 1–3 only, desktop/manual «فائقة», exact HIGH fallback and zero changes to the other four presets. No implementation begins from this report alone.
