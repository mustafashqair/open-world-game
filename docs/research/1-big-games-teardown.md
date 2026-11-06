# Browser 3D game teardown: settings worth copying into Three.js

2026-11-06. Target application: an open-world Three.js game, Samsung Galaxy A14 / 4 GB / Mali-G57, **30 fps = 33.3 ms per frame**.

The most useful recovered patterns are **independent distance/detail/resolution controls, short shadow coverage, bounded terrain and instance caches, reusable effects, and simulation separated from presentation**. The strongest open-world evidence came from shipped JavaScript and serialized Unity settings. Ghidra contributed one genuine, targeted physics-function decompilation. It did not recover a secret universal mobile preset.

## Scope and evidence quality

Five games were inspected: Swooop, PolyTrack 0.6.3, Slow Roads 2.4.2, Rally Point 3, and Madalin Stunt Cars 2. Three contain real WASM targets: two Unity IL2CPP engines and PolyTrack's custom native physics module. Swooop and Slow Roads are JavaScript counterexamples, retained because their settings are directly applicable. No Unreal/Godot engine was successfully examined.

**This is not a validated cohort of five games running smoothly on an A14.** Swooop flying and PolyTrack driving were verified. Other loader/gameplay checks and their failures are recorded below. The requested admission criterion—every target reaches gameplay and is known smooth on weak phones—was not fully met. Accessible public builds were favored over claiming access to blocked ones. Do not turn this report into an A14 performance ranking.

Confidence labels used throughout:

- **H**: value exists at the stated source, or an observed runtime result. Scope is explicit: a stored setting is not automatically the active mobile setting.
- **M**: interpretation supported by neighboring code, but runtime selection/causal benefit is not established.
- **U**: not recovered or not verified; no number supplied.

All paths below are relative to this report's evidence archive. `method/commands.md` records tool setup, exact bounded Ghidra requests, failures, and extraction scripts. `unity-settings-provenance.json` identifies serialized source files and object path IDs. `evidence/source-manifest.json` maps capture filenames to URLs and hashes. No complete game binaries, models, textures, or bundles are redistributed.

## Tool results before conclusions

**REA 6.8.0 was installed and used.** Its successful CDP analyses captured a PolyTrack wrapper and a Slow Roads script inventory. The wrapper inventory did not traverse the game iframe. A subsequent direct PolyTrack attempt hit the fixed CDP discovery timeout. REA's static route inventory did not itself recover the tuning values in this report. **Playwright/CDP is the explicitly labeled fallback/supplement for response capture, screenshots, and runtime inspection.** JavaScript excerpts were then examined directly; Unity data was decoded with UnityPy 1.25.4. See `rea-*-run-summary.json`.

**Ghidra was installed and used headlessly.** Official 12.2 ZIP SHA-256 matched its release; the third-party WASM extension failed on a changed API. The matching official Ghidra 12.0 ZIP was downloaded and checksum verified, and run on 64-bit JDK 25. Full tool provenance is in `method/commands.md`. Ghidra's successful targeted result is distinct from UnityPy extraction and ordinary string mining.

## 1. Swooop — small scene, deliberately bounded presentation

**Entry:** https://playcanv.as/p/JtL2iqIH/ → https://playcanv.as/apps/R2axJfsc/index.html

**Build evidence:** `playcanvas-stable.min.js`, `pc.script.create(...)` game scripts, `config.json`, scene `334645.json`. PlayCanvas JavaScript engine, not a WASM engine. The inspected config lists 196 assets: 70 textures, 47 models, 40 materials, 34 audio clips, 3 animations, 2 JSON entries. No Unity-style `.data`, WASM heap, pthread setup, or compiled native module was observed. This is a lightweight reference, not an example of a huge compiled game.

**Gameplay:** verified after pressing the play button; `swooop-verify.png` shows flying, score HUD, and pause control. Mobile UA with touch, 640×360 verification viewport. Earlier 960×540 / DPR 2 inspection observed a **1280×720** canvas, independent of DPR.

| Recovered tuning value | Source | Confidence / interpretation |
|---|---|---|
| Fixed render size **1280×720** | `swooop-settings-excerpts.json`, `application_properties`; `swooop-runtime.json` | H: FIXED resolution. At 960×540 CSS it renders 1.333× CSS, not native DPR 2. |
| Fill mode **KEEP_ASPECT** | Same config | H: predictable aspect/resolution behavior. |
| Main camera near/far **0.3 / 500** | Scene camera entity in same excerpt | H stored; not an LOD distance. |
| Main camera FOV **60°** | Same camera | H stored. |
| Both directional lights: **castShadows=false** | Scene light components | H stored; no claim that their unused shadow maps are allocated. |
| Each light stores **1024** shadow resolution and **40** distance | Same light components | H values, **inactive** when casting is disabled. Do not count these as running shadow costs. |
| Particle ring **15 entities**: **5 gem_C, 5 gem_F, 5 star_01** | Scene-derived `particle_pool`; `swooop-particles-excerpt.js` | H: existing children disabled, reused, index wraps modulo effect count. |
| Linear fog start/end **1 / 800** | Scene render settings | H stored; far clip 500 means fog end alone does not establish visible distance. |
| Frame cap / fixed physics step / dynamic-resolution bounds | Not recovered | U. No inferred 30 fps cap. |
| Chunk dimensions / quality tier tables | Not recovered | U. Repeating obstacle patterns are not evidence of an open-world terrain chunk size. |

**Asset pipeline:** observed JPG/PNG texture assets, MP3 audio, model JSON and individual scripts. No KTX2/Basis, Draco, meshopt, native physics WASM, OffscreenCanvas renderer, or render worker was observed in this build. This is an observation boundary, not proof that every unvisited code path lacks them. Main-document canvas and PlayCanvas application startup are visible.

**What to copy:** reuse effect entities, limit the scene and backing-buffer workload, and make shadow cost an explicit artistic choice. The stylized appearance is part of its budget. Disabling shadows in an existing HIGH render would visibly change it.

## 2. PolyTrack 0.6.3 — Three.js presentation, custom WASM simulation

**Entry:** https://www.kodub.com/apps/polytrack → https://app-polytrack.kodub.com/0.6.3/

**Build evidence:** main bundle contains Three.js rendering/shaders; `simulation_worker.bundle.js` imports `lib/polytrack_physics.js`, whose Emscripten glue loads `polytrack_physics.wasm`. Captured WASM: **396,005 decoded bytes**; separate Draco decoder WASM also requested. This is a custom native physics component, **not a Unity/Unreal engine**. Main JavaScript is 1,849,402 bytes in the direct downloaded copy. Worker and decoder are separately delivered modules.

**Gameplay:** verified. `polytrack-runtime.json` records 25 km/h and a running timer after acceleration; `polytrack-gameplay.png` shows the car on the track. Fresh mobile-UA runtime used **1920×1080** backing pixels for 960×540 CSS at DPR 2. That is evidence against assuming mobile UA always triggers low resolution.

| Recovered tuning value | Source | Confidence / interpretation |
|---|---|---|
| Default **ShadowQuality=2** | `polytrack-main-excerpts.txt`, `defaultSettings` | H shipped default; persisted user settings can override it. |
| Shadow quality 1/2 → **1024** map; 3 → **2048**, 4 → **4096**, 5 → **8192** | Same excerpt, mapping function `B` | H. Highest maps are expensive and are not the default. |
| High shadow tiers 3/4/5 use **4 / 4 / 5** cascades | Same excerpt, `U` | H branch values; runtime default 2 takes a different branch. |
| High-tier shadow `maxFar` **500 / 1000 / 2000** | Same branch | H shadow coverage, **not camera far plane**. |
| Render scale clamp **0.1–2**, default **1** | Same excerpt, `N`; settings table | H configurable bounds; **no automatic dynamic-resolution controller established**. |
| Native pixel density default **true** | Settings table; runtime canvas | H: DPR participates in effective pixel ratio, capped against max texture size. |
| Simulation accumulator step **0.001 s**, catch-up clamp **0.1 s** | `polytrack-worker-excerpts.txt`, `l()` | H exact code. 1,000 simulation steps/s is not a 1,000 fps renderer. |
| Worker scheduling fallback **1000/60 ms**, stale-rAF threshold **100 ms** | Same worker excerpt | H. Worker rAF when available, timer fallback otherwise. |
| Non-realtime verification work slice **0.01 s** | Same worker excerpt, `h()` | H loop condition; not a cap on one indivisible WASM call. |
| Physics memory initial **258 pages = 16.125 MiB**, maximum **32768 pages = 2 GiB**, unshared | `polytrack-5970caf59e54-wasm-structure.json` | H declaration; maximum is a growth ceiling, not resident allocation or whole-game memory. |

**Compiled corroboration:** Emscripten glue binds `_updateCarModel` to export **`r`**, WASM function index **289**. Ghidra successfully decompiled it at **`ram:8002f0be`**, body 7,114 bytes. Actual returned lines include:

```
pfVar15[0x28] = fVar17 + 0.001;
fVar17 = pfVar15[0x29] + -0.001;
```

The same function also passes `0x3a83126f` (IEEE-754 float 0.001) in an indirect call. The JS worker provides the clear scheduling semantics; the compiled constants corroborate a 1 ms update family. Unnamed object fields and indirect targets remain unresolved. The full real output is retained in `ghidra12-poly-targeted.log`; no synthetic decompiled names are introduced.

**Asset/runtime pipeline:** actual network requests establish Draco decoder use, not just bundled loader availability. Simulation creates a dedicated Worker and transfers state ArrayBuffers; `updateCarModel` is invoked through `ccall`. Rendering is constructed against the document canvas in the main bundle. **Physics worker ≠ OffscreenCanvas rendering.** No render worker was established. KTX2/Basis/meshopt, a complete texture/audio inventory, object-pool limits, camera far clip, and terrain chunk dimensions were not recovered. There is no Unity data bundle.

**What to copy:** move bounded simulation work away from presentation, transfer compact state, expose independent graphics controls. **Do not copy 1,000 Hz physics** for a phone open world without a measured need for that determinism/vehicle model.

## 3. Slow Roads 2.4.2 — the most directly useful open-world settings

**Entry:** https://slowroads.io/

**Build evidence:** Svelte-style `_app/immutable` entry/chunk graph, Three.js renderer calls and custom world generation modules (`SettingsManager.a31845d6.js`, `conifers.26f84295.js`, `DevMidlineGenerator.7013ef99.js`, `DriftmasMidlineGenerator.13fc1bad.js`). A substantial custom JavaScript game, not a recovered Unity or WASM engine. SettingsManager chunk alone is **857,562 decoded bytes**, conifers **574,377**, DevMidlineGenerator **578,232** in this capture. Assets and scene modules are split; the request ledger is in `slowroads-network-sanitized.json`.

**Runtime qualification:** browser passed the initial challenge and reached the animated menu. Pressing Begin entered loading; the first captured image still said **LOADING / VEHICLE**. The later verification also remained at LOADING / VEHICLE: its console records HTTP 403 responses for vehicle `.glb` assets (including coupe_main and coupe_interior). Gameplay was not verified. Its settings below are valid shipped-code findings even where gameplay loading could not be verified.

| Recovered tuning value | Source | Confidence / interpretation |
|---|---|---|
| Mobile/touch default distance **Low=0**, detail **Medium=1** | `slowroads-default-excerpts.json`; `slowroads-settings-excerpts.txt` plus first-visit branch in `method` evidence | H source policy. UA test includes `Mobi\|Android...`; stored profiles/first-visit rules may override. |
| Render scales **[0.5, 0.75, 1, 1.5, 2]**, default index **2 = 1** | `conifers` excerpt at original character ~536600 | H. Renderer uses selected scale directly as pixel ratio. |
| Native DPR default **false** | Same default table; `slowroads-render-excerpts.json` | H. Distinct from PolyTrack's true default. |
| Frame limits **screen / 30 / 45 / 60 / 90 / 120 / 144 / 160 / 240**, default index **0 = screen** | Same table | H options; no default 30 fps claim. |
| DevMidline distance tiers `tileSize` **240 / 480 / 840 / 1500 / 2000** | `slowroads-tier-tables-excerpts.json`, original offset **389312** | H raw game units; scene-specific, not universally applicable terrain tile dimensions. |
| Corresponding heightmap cache limits **12 / 16 / 20 / 28 / 40** | Same table | H declared maximum cached entries; not MiB. |
| `lod0Horizon` **50 / 80 / 100 / 120 / 140**, `lod1Horizon` **13 / 16 / 19 / 22 / 25** | Same table | H raw config quantities; **not established as meters**. Neighboring code scales some horizons by cell resolution. |
| Imposter instance sizes **400 / 1600 / 4000 / 7500 / 16000**; tree sizes **400 / 450 / 475 / 500 / 525** | Same DevMidline table | H capacity settings; not draw calls or total resident tree count. Driftmas has different imposter values. |
| Detail shadow resolutions **256 / 512 / 1024 / 2048 / 2048** | Same table | H scene-specific tier values. |
| Lowest detail: **no 3D trees**, grass density **0**, sea waves/depth **false**; next tier enables 3D trees, grass density **0.5** | Same table | H. These settings **visibly change HIGH rendering**. |

Additional evidence: sign objects return to `signPool`; chunk processing has `prioChunks=3` in the inspected manager. This is a priority setting, not an established per-frame time budget. Other scene configs differ—for example the Mars-associated table has tile sizes 300/600/1000/1700/2500. Do not mix those rows into a single universal preset.

**Asset/runtime pipeline:** custom procedural meshes, instance managers and multiple geometry LODs are present. No large WASM/data bundle was observed in the initial capture. Full KTX2/Basis/Draco/meshopt and audio codec coverage was not established. A service worker was observed; that **does not prove an off-main-thread renderer or terrain-generation worker**. Rendering code calls the document renderer's `setPixelRatio`. No OffscreenCanvas render loop was established. Physics timestep, total memory limit, camera far plane and an automatic dynamic-resolution policy remain unrecovered.

**What to copy:** independent distance and detail controls plus finite generation/cache/instance budgets. Low render density can still preserve the same scene and materials; low grass/tree/detail settings explicitly trade visual content for speed.

## 4. Rally Point 3 — Unity serialized quality tiers, not a measured mobile preset

**Entry:** https://games.crazygames.com/en_US/rally-point-3/index.html

**Build evidence:** loader URLs and actual decoded `UnityWebData1.0` directory; serialized assets identify **Unity 2020.3.16f1**. IL2CPP metadata and engine WASM. `rally-point-3-loader-config.json` points to Brotli `.wasm.br`, `.data.br`, `.framework.js.br`.

- WASM: **20,241,328 decoded bytes**, **4,140,706** HTTP Content-Length, `Content-Encoding: br`.
- Data: **21,924,247 decoded**, **13,954,505** HTTP Content-Length, Brotli.
- Framework: **509,016 decoded**, **75,844** compressed.

**Runtime qualification:** original portal and local byte-identical analysis harness were attempted. Unity logged initialization and WebGL2 creation; the fresh verification screenshot timed out. **Gameplay and active mobile tier were not confirmed.** Harness origin/SDK/streaming assets differ from the portal and cannot establish its real defaults.

| Recovered tuning value | Source | Confidence / interpretation |
|---|---|---|
| Physics timestep **0.0166666992 s ≈60 Hz** | `rally-point-3-TimeManager.json` | H serialized; code could override. |
| Maximum allowed timestep **0.333333343 s** | Same | H stored catch-up setting; not frame target. |
| Quality tiers **Low / Medium / High**, stored current index **2** | `rally-point-3-QualitySettings.json` | H stored High, **not confirmed mobile startup**. |
| LOD bias **0.4 / 1 / 2** | Same tier table | H; screen-relative selection bias, not meters. |
| Particle raycast budgets **16 / 256 / 4096** | Same | H; particle collision raycast budget, not a global physics-query budget. |
| Shadow distance **200**, cascades **4** in all three tiers | Same | H stored. Low does not reduce every shadow cost. |
| MSAA **0** in all tiers | Same `antiAliasing` | H stored quality setting, not proof of no other AA pass. |
| Async upload slice **2 ms**, buffer **4 MiB** | Same | H engine configuration; not verified GPU upload time. |
| Mip streaming **false** despite stored budget **512 MiB** | Same | H **inactive budget**; do not count it as texture streaming. |
| Default WASM heap **32 MiB**, stack **1 MiB**, imported memory minimum **512 pages** | `rally-memory-excerpts.json`; WASM structure | H JS defaults and binary minimum. No max in import; growth code limits to **2 GiB minus one WASM page**. Loader overrides/runtime peak remain unknown. |

**Assets/loading:** serialized texture counts include DXT1/DXT5 and crunched DXT1/DXT5 formats alongside uncompressed formats; see `asset-statistics.json`. AudioClip compression enum **7 (MP3)**, 81 clips in the scanned bundle. This is native Unity texture packaging, **not KTX2/Basis**. Framework includes `WebAssembly.instantiateStreaming` and ArrayBuffer fallback. No SharedArrayBuffer or worker construction matched in the inspected framework; WASM memory import is unshared. This supports a single-threaded build assessment, not a census of every portal script. Decompression/streaming capability in loader code does not prove which path ran.

**Ghidra:** 12.0 opened this module and enumerated **54,496 functions**. The first decompilation request selected imported runtime stubs, producing bad-instruction warnings; it recovered **no usable tuning constants**. The values above came from UnityPy/JS/WASM parsing, not that failed decompilation. Strings such as `shadowDistance` at file offset **0x12fd3be** confirm engine vocabulary only.

**What to copy:** use explicit quality tables and budgets for simulation/collision and uploads. The sizeable maximum catch-up setting is something to evaluate critically, not automatically copy to a phone.

## 5. Madalin Stunt Cars 2 — short shadows, large initial memory

**Entry:** https://games.crazygames.com/en_US/madalin-stunt-cars-2/index.html

**Build evidence:** Unity loader plus actual WASM/UnityWebData, serialized **Unity 2022.3.12f1**. Decoded WASM **43,970,936 bytes**, data **158,394,589**, framework **463,015**. URLs have `.gz` suffixes, but the sampled response headers did **not** declare gzip Content-Encoding or a compressed Content-Length. `curl --compressed` obtained already valid WASM/UnityWebData. **Do not infer compressed transfer size from `.gz` alone.** This differs from Rally's explicitly documented Brotli delivery.

**Runtime qualification:** local harness reached `progress:1`, resolved `createUnityInstance`, logged single-threaded physics dispatcher and engine startup. The later fresh verification reached the title and vehicle-selection screens. Play → Single Player then displayed Loading (`madalin-after-play.png`, `madalin-driving.png`, later `madalin-final.png`); attempted acceleration is not proof that the car moved. **Initialized/menu ≠ gameplay confirmed**, and portal mobile quality remains unknown.

| Recovered tuning value | Source | Confidence / interpretation |
|---|---|---|
| Physics timestep **0.01999999955 s ≈50 Hz** | `madalin-stunt-cars-2-TimeManager.json` | H serialized. |
| Maximum allowed timestep **0.1199999973 s** | Same | H; nominally about six 20 ms steps. |
| Only stored tier **High**, current index **0** | `QualitySettings.json` | H stored, not a mobile auto-low table. |
| Shadow distance **15**, cascades **2** | Same | H much shorter stored coverage than Rally's 200; no comparable scene scale established. |
| Pixel light count **1**, MSAA **0** | Same | H per-pixel lighting/AA settings; other paths may differ. |
| LOD bias **1.5**, crossfade enabled | Same | H. |
| One serialized LODGroup thresholds **0.849371 / 0.295664** | `asset-statistics.json`, path ID **21136** | H screen-relative heights; no distance conversion without bounds and projection. |
| Mip streaming **true**, budget **512 MiB**, renderers/frame **256** | `QualitySettings.json` | H serialized policy, not a verified resident texture footprint. |
| Async upload slice **2 ms**, buffer **4 MiB** | Same | H stored. |
| Initial memory **8192 pages =512 MiB**, maximum **32768 pages =2 GiB**, unshared | WASM structure JSON | H actual declaration. A 512 MiB initial linear memory is **not a low-memory recommendation** for the requester's phone. |

**Assets/loading:** 828 Texture2D entries counted in the scanned bundle, including DXT/crunched DXT and BC7/BC5 plus uncompressed formats. MP3 enum 7 for 85 AudioClips. No KTX2 inference from these native Unity formats. Framework/source inspection did not establish pthreads or an OffscreenCanvas renderer; engine log explicitly reports `SinglethreadedJobDispatcher`. Mip streaming is not terrain streaming. A StreamingAssets URL exists, but the capture did not establish live world-chunk downloads. Dynamic resolution bounds, target fps cap, object pool sizes, and world tile sizes were not recovered.

**Ghidra:** selected WebAssembly loader, but the **180-second import deadline expired (exit 124)** before a successful open/postscript result. No decompiled Madalin code or invented address is presented. Its engine strings were mined outside Ghidra; e.g. `UnityEngine.QualitySettings::set_pixelLightCount` at decoded WASM file offset **0x24e86aa**.

**What to copy:** restrict shadow coverage near the vehicle and give mip/LOD work explicit budgets. Do not copy its heap reservation or assume that an exposed streaming setting makes a 158 MB data bundle cheap on a 4 GB device.

## Cross-game techniques: counts with strict denominators

Denominator: **5 inspected games**. Counts mean evidence of configuration or implementation, **not five runtime-verified optimizations and not causal proof of smoothness**. Inactive settings and engine API string names are excluded.

| Technique | Games with evidence | Count | Important boundary |
|---|---|---:|---|
| Explicit backing-buffer/resolution policy | Swooop, PolyTrack, Slow Roads | 3/5 | Policies differ: fixed 720p, native DPR by default, CSS-scale by default. |
| Shadow coverage/detail bounded or shadows disabled | All five | 5/5 | Unity observations are serialized; Swooop's disabled-light map sizes do not count as active maps. |
| Quality tiers with meaningful cost changes | PolyTrack, Slow Roads, Rally | 3/5 | Madalin has one stored High tier, not a recovered multi-tier table. |
| LOD/geometry-detail policy | Slow Roads, Rally, Madalin | 3/5 | Unity biases are settings; only one Madalin LODGroup was recovered. |
| Fixed simulation timestep/accumulator | PolyTrack, Rally, Madalin | 3/5 | 1 ms, ~16.67 ms, 20 ms respectively. No universal 30 Hz rule. |
| Explicit catch-up limit | PolyTrack, Rally, Madalin | 3/5 | 100, ~333, ~120 ms; costs and semantics differ. |
| Reusable object/effect pools | Swooop, Slow Roads | 2/5 | Specific effects/sign pools; not proof all allocations are pooled. |
| Finite terrain/cache/instance capacities | Slow Roads | 1/5 | Multiple scenes/tables still count as one game. |
| Dedicated simulation worker | PolyTrack | 1/5 | No demonstrated worker renderer. |
| Compressed geometry actually requested | PolyTrack | 1/5 | Draco; not all bundled loader code counted. |
| Compressed texture formats in serialized asset inventory | Rally, Madalin | 2/5 | Native DXT/BC formats, not verified optimal Android delivery. |
| Serialized mip streaming enabled | Madalin | 1/5 | Rally explicitly false; runtime activation unconfirmed. |
| Serialized async upload budgets | Rally, Madalin | 2/5 | Configuration values, not measured upload scheduling. |
| Proven automatic dynamic resolution | None | 0/5 | A scale slider/clamp is not an automatic controller. |
| Proven OffscreenCanvas render loop | None | 0/5 | Service/simulation workers do not qualify. |
| Verified 30 fps default cap | None | 0/5 | Slow Roads offers 30 fps but defaults to matching the screen. |

## What Ghidra actually gave us

**Three distinct WASM binaries attempted; two successfully imported (Rally, PolyTrack); one genuinely useful targeted decompilation family (PolyTrack updateCarModel). Zero recovered Unity gameplay preset tables from Ghidra.**

| Run | Bound | Actual result |
|---|---|---|
| Rally / Ghidra 12.2 + WASM extension | 180 s outer | Failed `NoSuchMethodError ... checkAncestry`; compatibility failure, no successful open. |
| Rally / matching 12.0, noanalysis | 180 s; 3 functions ×10 s decompile timeout | Opened; 54,496 functions; selected import stubs, bad-instruction output; no tuning evidence. |
| PolyTrack / noanalysis | 180 s; 3 functions ×10 s | Opened; initial internal-function probe lacked necessary WASM context; unusable results. |
| PolyTrack / broad analysis | 60 s per-file, 180 s outer | Pre-analyzer ran 63.856 s then reported timeout; outer exit 124 before usable postscript output. |
| PolyTrack / PhysicsProbe | 120 s outer, one function ×20 s | Success, exit 0. Applies WASM analysis context to only export `r`, disassembles and decompiles. 1 ms numeric corroboration with JS binding and worker loop. |
| Madalin / noanalysis | 180 s outer | Timeout during import; loader selection is not successful import. |
| Swooop / Slow Roads | Not submitted as native binaries | No relevant compiled artifact captured; JS was examined as JS. |

Read the full `ghidra*.log` outputs and the actual Java scripts. `ram:8002f0be` is a **Ghidra code-space address**, not a download file offset, WASM linear-memory pointer, or IL2CPP method name. String dumps explicitly use decoded binary **file offsets**. Neither API strings nor arbitrary floating-point matches prove a game uses a particular preset. Dynamic call targets, stripped metadata links, and object fields need additional analysis.

## Ten ranked techniques for the Three.js game

These are implementation recommendations, **not recovered A14-safe constants**. Start with a representative route and a high-quality screenshot baseline. “HIGH impact” identifies changes visible relative to a current HIGH render.

1. **Budget pixels independently of scene quality.** Evidence: Swooop fixed 1280×720, Slow Roads defaults to scale 1/native-DPR off, PolyTrack exposes scale. Three.js: set a cap on backing-buffer pixels, not just a UA-based quality label. For example `ratio = Math.min(devicePixelRatio, Math.sqrt(pixelBudget / (cssWidth * cssHeight)))`; use `renderer.setPixelRatio(ratio)` and `setSize(cssWidth, cssHeight, false)`. Treat ~0.9 million pixels as a trial inspired by Swooop, not an A14 guarantee. **HIGH impact: softer edges/fine detail when ratio falls.**

2. **Keep dynamic shadows close and independently adjustable.** Evidence: Madalin stored shadow distance 15/two cascades, Swooop casting disabled, PolyTrack separate shadow tiers. Three.js: one primary shadowed light, tight shadow-camera bounds around the player; bake or use cheap static distant shadows. Try 1024 maps first, compare 512/2048 on device. CSM only when measured need justifies it. **HIGH impact: distant shadows or softness change.**

3. **Bound world residency before increasing world size.** Evidence: Slow Roads cache12–40 and finite instance capacities. Three.js: fixed active/prefetch rings, an LRU heightmap/geometry cache with byte limits, and explicit disposal when leaving the ring. Size chunk dimensions using travel speed, generation time and worst-case view, not by copying `tileSize=240` across unrelated coordinate systems. **HIGH impact: none if residency covers visible geometry; undersized rings cause pop-in.**

4. **Use screen-relative LOD plus separate density controls.** Evidence: Rally lodBias 0.4/1/2, Madalin screen-height thresholds, Slow Roads geometry/detail tables. Three.js: `THREE.LOD` for simple cases or projected-size thresholds with hysteresis; `InstancedMesh` for trees/props, distant imposters; independently scale grass/prop density. **HIGH impact: geometry silhouettes, vegetation density and transitions can change.**

5. **Run fixed simulation with bounded catch-up.** Evidence: PolyTrack worker 1 ms/100 ms clamp, Unity 60 Hz/~333 ms and 50 Hz/120 ms settings. Three.js: accumulator at a chosen 30–60 Hz, interpolate render transforms, cap both accepted elapsed time and steps per presentation frame. A provisional 100 ms clamp and at most 3 steps must be tested for your physics/gameplay; do not copy PolyTrack's 1,000 Hz loop. **HIGH impact: visual transforms can be preserved by interpolation; simulation/determinism changes need gameplay tests.**

6. **Pool transient effects and reuse typed buffers.** Evidence: Swooop's 15-effect ring and Slow Roads signPool. Three.js: preallocate particle/emitter slots, recycle decals/projectiles/labels, reuse `Vector3`, matrices and typed arrays in hot loops, update buffer ranges rather than recreate geometry each frame. Track pool exhaustion and replace oldest or suppress gracefully. **HIGH impact: none at adequate capacity; saturation can drop effects.**

7. **Move suitable CPU work to a worker with a compact protocol.** Evidence: PolyTrack simulation worker and transferable state buffers. Three.js: worker-based terrain generation/pathfinding/physics where CPU profiles justify it; transfer ArrayBuffers and apply interpolated results on main thread. Use a bounded pending queue and cancellation for obsolete chunks. Keep WebGL on main initially; OffscreenCanvas is not established by these peers. **HIGH impact: none intended; stale results/input latency are risks.**

8. **Treat compressed delivery and GPU residency as separate budgets.** Evidence: Rally 20.24 MB WASM becomes 4.14 MB Brotli transport; Unity textures use compressed formats; PolyTrack actually requests Draco. Three.js: Brotli/gzip for JS/WASM, KTX2Loader/Basis for device-appropriate GPU textures, DRACOLoader or meshopt for mesh delivery, and staged loading. **KTX2 is a recommendation, not a recovered commonality here.** Monitor decoded texture bytes, peak decode/upload memory, and cache eviction. **HIGH impact: texture transcoding or lossy mesh compression may alter quality; verify side-by-side.**

9. **Amortize upload, shader preparation and first-use work.** Evidence: both Unity settings specify 2 ms async upload slice/4 MiB buffer; PolyTrack decoders and modules are separate. Three.js: budget loading queues in milliseconds/bytes; prewarm representative materials with `renderer.compileAsync` where supported, spread first-use assets over frames, bound decoder concurrency. A JS time budget cannot preempt a single large driver upload, so also limit individual resource sizes. **HIGH impact: none after loading; delayed appearance needs coverage.**

10. **Design explicit, orthogonal presets and measure their actual selection.** Evidence: Slow Roads distance/detail/mobile policy and PolyTrack independent scale/shadows; Rally Low still retains 4 cascades/200 shadow distance. Three.js: separate `renderScale`, `shadowDistance`, `shadowMapSize`, `lodBias`, density, active radius and simulation budgets. Log effective settings after saved preferences, capability checks and automatic adjustments. For adaptive quality, use sustained timing plus hysteresis and change one knob at a time. **HIGH impact depends on knob. Automatic quality control is our proposed addition; none was proven in the sample.**

A starting fixed-step pattern (recommendation, not copied game code):

```js
const step = 1 / 60;
let accumulator = 0;
function update(elapsedSeconds) {
  accumulator += Math.min(elapsedSeconds, 0.100);
  let steps = 0;
  while (accumulator >= step && steps < 3) {
    simulate(step);
    accumulator -= step;
    steps++;
  }
  // Policy choice: drop excess time rather than build an unbounded backlog.
  if (accumulator >= step) accumulator %= step;
  renderInterpolated(accumulator / step);
}
```

This policy intentionally sacrifices elapsed simulation time under overload. Multiplayer authority, timers and replay determinism may require a different strategy. A 30 fps render can run 60 Hz physics at two steps/frame; presentation rate and physics rate need not match.

## Limits and physical A14 checks

Static settings reveal what was shipped, not which setting the running mobile game ultimately chose. Code can override Unity's current quality, timestep, mip streaming or light settings. A decoder present in a bundle does not prove an asset uses it; an engine symbol does not prove gameplay calls it. A `.gz` URL does not establish Content-Encoding. A worker does not establish an offscreen renderer. A512 MiB mip budget is not total RAM usage.

The browser here used desktop Linux Chromium and **SwiftShader**, with a mobile UA/touch emulation. Initial simultaneous tabs also competed for CPU/memory. Their timings are **not Mali-G57 timings**. No draw-call count, fps improvement, GPU-time attribution, memory peak, thermal stability, battery impact or low-end suitability is inferred from these runs. No prior 8-game report was available in this task, so these captures cannot be joined to its measured rows without artifact/version checks.

On a physical A14, validate the **exact hardware variant** (Galaxy A14 models differ), then:

- Run the same demanding traversal for at least 10–15 minutes, including dense town/vegetation, fast travel, combat effects, camera turns and chunk transitions. Measure warm frame-time percentiles and hitch distribution, not just average fps.
- Capture CPU profiles and a separate GPU-oriented experiment: lower resolution alone, disable shadows alone, freeze simulation alone. Use supported timer queries carefully; never assume a desktop timer maps to Android GPU behavior.
- Measure JS heap, WASM linear memory, decoded assets, WebGL texture/render-target estimates and loading peaks separately. Check Android process death/reload when backgrounding and returning.
- Compare HIGH screenshots/video before and after each visible tradeoff. Check LOD shimmer, foliage loss, shadow range, resolution blur and texture artifacts.
- Test input/physics interpolation, worker latency, offline/reconnect/loading behavior and context loss. Verify actual effective quality values after a fresh install and after saved settings.

The result is a reproducible set of peer settings and bounded negative results, plus a concrete implementation order. It is not proof that copying those numbers will deliver 30 fps on the requester's A14.
