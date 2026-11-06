# Browser 3D games: breadth pass 2

6 November 2026. Evidence collected from public builds; requester source pinned to `b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b` on `main` (`v50g2`).

## Result and limits

The primary comparison contains **13 peer games: the five inherited studies plus eight new targets**, and a separate first-class row for the requester's game. The CSV also retains an Unreal engine probe and three additional access attempts, for 18 rows. Cohort labels prevent those extra attempts from inflating the 13-game denominator.

The new targets are Venge.io, Voxiom.io, Bloxd.io, Smash Karts, Narrow One, Shell Shockers, Dodge the Dumps: Flush Hour, and Tribals.io. Bloxd and Voxiom are voxel worlds; Tribals is an island survival/building world; Narrow One has numerous separate arena maps. Together with Slow Roads, Madalin and the requester's terrain world, the comparison is not restricted to tiny scenes. **World size and mobile suitability were not measured independently.**

This pass establishes artifact breadth and adds useful compiled evidence from **two different binaries**. It does **not** establish sustained gameplay or acceptable low-end-phone frame rates for the new targets. Attempts reached menus, joining/loading, wake-up or connection failures, as listed below. No menu canvas, title scene or disconnected scene is presented as a gameplay benchmark. The requested confirmation that some new games run acceptably on low-end phones therefore remains **unverified**, not silently satisfied by a mobile landing page.

**No physical A14 measurement is involved.** Browser captures used desktop Linux Chromium 158.0.8127.18 with SwiftShader, an Android mobile UA, viewport 854×480 and emulated DPR 2. The UA contains an SM-A015F identifier; this does not mean that device was tested. UA client hints and GPU characteristics remain those of desktop Chromium. Desktop fallback captures are identified. No peer FPS, physical-phone rank or A14 FPS gain is claimed.

The requester's software-renderer numbers were supplied with the task, not remeasured here: desktop Chromium + SwiftShader + 4× CPU throttle. They must not be directly compared to browser sessions without the same workload and renderer.

## What is new

- REA `rea-agents` 6.8.0 captured public page structure, scripts, workers and attach-window evidence. Playwright supplied navigation, input attempts, screenshots and navigation-wide response headers. REA cannot retroactively observe requests completed before it attached; the two evidence sources are kept distinct.
- New engine coverage: Unity WebGL, Godot web export, PlayCanvas, a Babylon.js backend, custom Three.js modules and custom Rust/wasm-bindgen physics. An Unreal HTML5 template was reached as a supplementary export probe, not counted as a peer game. No active WebGPU game was established.
- Venge and Tribals expose the same 659,433-byte Ammo WASM, verified by SHA-256. Reusing its analysis is appropriate; counting it as two independent decompilation discoveries is not.
- Bloxd's small custom physics WASM is a better tuning target than a monolithic IL2CPP export. Its JS call sites supply meaning for the decompiled fields.
- Current artifacts can differ even within a short capture session: Smash Karts changed WASM hashes between visits. Sizes, headers and memory declarations below refer to the named initial build, not a synthetic combination of builds.
- The requester's source and supplied playable-checkpoint measurements are in the same CSV, with a direct comparison below.

## Evidence rules

`H` means strong recovered evidence for the listed facts; the five older `H (inherited)` rows rely on the task's supplied depth-pass findings, whose original artifacts were not available here. `M` means useful static evidence or partial runtime evidence, often a menu. `U` means access failed or important facts were unavailable. An `M` does not certify gameplay. The original pass's full flag rubric was not supplied, so these operational definitions are stated explicitly.

`not recovered` means unknown. A library supporting KTX2, shadows, workers or WebGPU does not establish use. A `.glb` URL does not prove Draco or meshopt. WebP is image/transfer compression, not proof of a GPU block-compressed texture. A Unity `.bundle` or Godot `.pck` may contain compressed textures without any `.ktx2` request. No such internal format was inferred from its container extension.

WASM sizes are bytes where measured. `Content-Length` is a response-body length, not all HTTP/TLS overhead. Missing lengths are unknown. The inherited Rally Point sizes retain the supplied MB units. WASM memory declarations are address-space/linear-memory limits, not JS heap, GPU memory, resident set or total game memory. Pool-size fields do not prove that threads ran.

## New target evidence

### Venge.io — PlayCanvas / Ammo

`venge/123-config.json` declares separate scenes, `FILL_WINDOW`, `AUTO`, `useDevicePixelRatio:false`, `enableSharedArrayBuffer:false`, `enableWebGpu:false`, and 46 batch groups. Runtime exposed PlayCanvas 2.16.2. The loaded engine, JSON scenes, GLB models, images and MP3 files are separate resources. Ammo WASM is 659,433 decoded bytes; Brotli response headers are present, but a transferred length was not recovered. The JS wrapper creates default initial and maximum memory of 64 MiB; a caller can override that default.

One texture has a Basis variant in the config. **No Basis/KTX2/DDS response was observed**, so the variant is availability evidence only. Atlas-named materials/textures occur in the config; these names and configured batch groups do not prove draw-call savings in the unavailable gameplay scene. MP3 was requested; MP4 is also declared among audio assets. Draco/meshopt use was not recovered.

At DPR 2, the menu canvas was 854×480 backing and CSS. Five captured menu lights had `castShadows:false`; their stored resolution 1024 and distance 16 were inactive properties, not active shadow rendering. The runtime rigidbody system reported 1/60 and ten substeps. These are engine defaults in the captured scene, not proof of the gameplay controller's update path. Disable-shadows, quality and performance-mode options exist in shipped game code. No simulation worker or offscreen renderer was established.

Evidence: `venge/network.json`, `venge/123-config.json`, `venge/19-ammo.wasm.js`, `venge/selected.txt`, `venge-play/runtime.json`, `venge-final/*`.

### Voxiom.io — Three.js / split JavaScript

The vendor chunk contains `THREE.WebGLRenderer` diagnostics; the client uses webpack chunks and requests a game GLB. That GLB and Socket.IO polling requests returned HTTP 403. Only a 300×150 loading canvas was observed. No runtime tier, actual backing policy, shadow, simulation, frame cap, worker or compressed-texture selection was recovered. No WASM response was observed in this incomplete window; that is not proof the full game never uses one. Image responses included PNG/JPEG; audio, atlas and mesh compression were not recovered.

Evidence: `voxiom/page.json`, `voxiom/network.json`, `voxiom/7-fc18594c8aa8e9402482.js`.

### Bloxd.io — Noa / Babylon.js backend / custom WASM

Shipped backend chunk `424-sgjjk6r.82.e02bdf3b.chunk.js` identifies `babylonjs@9.28.0`; the game chunk explicitly refers to prefetching Noa's Babylon backend and offers a Lite renderer path. This establishes engine/backend availability, not which backend a particular mobile gameplay session chose. Numerous separate JS chunks were actually requested.

The custom `bloxd_wasm_bg.390c99792e9107678311.wasm` is 212,744 bytes, Brotli served. Its memory section declares 17 pages (1,114,112 bytes) initially, without a declared maximum. Export names expose voxel residency/eviction and physics APIs. Atlas-building and atlas-cache code were recovered; JPG/PNG/WebP images and MP3 were requested. No KTX2/Basis/DDS response was recorded. Mesh compression is not recovered.

REA attributed one blob worker. The main bundle contains a timer-worker implementation; this alone does not place physics or rendering in that worker. Gameplay canvas, active tier, shadows, offscreen ownership and frame cap are unknown. Ghidra confirmed that `begin_tick` accepts milliseconds and converts them to seconds. Seven option doubles include a gravity vector, with a squared-magnitude test below `1e-5`; this is a **near-zero gravity** test, not a velocity threshold. A fixed tick duration and catch-up budget were not recovered.

Evidence: `bloxd/network.json`, `bloxd/module-418.wasm.meta.json`, `bloxd/decompiled.txt`, `bloxd/61-sgjjk6r.9.728724d4.chunk.js`, backend chunks 82/84, `bloxd-final/*`.

### Smash Karts — Unity WebGL / Addressables

The initial response set contains `.data.br`, `.framework.js.br`, `.wasm.br`, catalog hashes/JSON and remote Addressables bundles. The initial WASM is **47,252,828 decoded bytes / 9,583,364 response bytes**, with Brotli encoding. Initial data transfer was 13,289,292 response bytes. The module declares 256 MiB initial memory and a 2 GiB maximum. These are not observed memory consumption. A subsequent build used different hashes and a 9,577,247-byte WASM response; do not assign the initial decoded size to that new binary.

No individual compressed-texture URL was observed. GPU texture formats, atlases, codecs and mesh compression inside Unity containers were not recovered. `ccWorker.js` was observed, but its role is not proven to be simulation. The captured loading/title buffer was 1708×960 for 854×480 CSS at DPR 2. This is a counterexample to assuming every mobile build begins at CSS resolution; it says nothing about the eventual in-game tier. Active shadows, fixed step, catch-up, LOD and frame cap remain unknown.

Evidence: `smashkarts/network.json`, `smashkarts/module-54.wasm.meta.json`, `smash-play/runtime.json`, `smash-play/network.json`.

### Narrow One — custom Three.js renderer / map GLBs

ES modules, separate map GLBs, a module worker and a blob worker were observed. `DRACOLoader` is configured for WASM with `setWorkerLimit(1)`; `draco_decoder.wasm` was actually requested. Its decoded size is 283,700 bytes, with 16 MiB initial and 2 GiB maximum declared memory. This proves a requested decoder, not that every model is compressed. Meshopt was not recovered. No compressed-texture URL was seen; audio/atlas use was not recovered.

The game renderer uses `min(rawResolutionMultiplier,devicePixelRatio)` and the saved-settings default `quality:1`. A visible prejoin canvas was CSS-sized at DPR 2. Smooth filtering defaults true. Shadow code in the imported Three.js shader library is not evidence of enabled game shadows. The final attempt progressed to `loading map... 90% / gamemode: king of the hill`; no sustained gameplay or frame-cap measurement followed. Offscreen renderer ownership was not established.

Evidence: `narrowone/9-index-CGd_1Yik.js` (settings/renderer), `narrowone/11-index-e1GE0OFd.js` (Draco), `narrowone/network.json`, `narrowone/draco.wasm.meta.json`, `narrow-final/*`.

### Shell Shockers — current encrypted build / desktop fallback

The mobile UA redirects to a discontinued-mobile-service notice. That is a material negative result for selecting a current mobile comparator. The desktop version fetched encrypted `shellshock.js`, a WASM loader, Draco decoder and GLB models. REA attributed a blob worker. Current engine identity was not recovered from the encrypted payload; the game's historical Babylon attribution is not promoted to proof of the current build. Decoder presence is positive mesh-pipeline evidence. No compressed-texture response was observed. Audio/atlas use and active gameplay shadows remain unknown.

The desktop fallback canvas was 854×480 at DPR 2, before verified gameplay. This is explicitly a desktop menu observation. The final attempt remained in the menu. The CSV records actual loader/decoder file sizes. Memory limits and simulation constants were not recovered.

Evidence: `shellshockers/page.json`, `shell-desktop/network.json`, `shell-desktop/rea.json`, `shell-final/*`.

### Dodge the Dumps: Flush Hour — Godot export

The live HTML declares `index.wasm` **39,514,754 bytes** and `index-3.3.0.pck` **69,118,800 bytes**. Both were requested with Brotli response headers. Transferred lengths were not recovered. The WASM declares 32 MiB initial memory and 2 GiB maximum. `GODOT_THREADS_ENABLED=false`; pool sizes 8 and 4 are dormant configuration, not evidence of active worker pools. `canvasResizePolicy:2` is declared, but no usable gameplay buffer measurement was obtained.

Pack-internal GPU formats, audio codecs, mesh compression, atlases, active shadows, LOD, mobile preset and frame cap were not recovered. A developer article reports Godot Compatibility/WebGL2, phone support and 60 Hz physics; those are secondary assertions, not confirmation of this later live export. The article's older pack sizes differ from the current HTML and were not substituted. Ghidra opened the actual engine WASM, but a selected export timed out without useful game tuning.

Evidence: `godot-index.html:114–115`, `godot/network.json`, `godot/index.wasm.meta.json`, `godot/ghidra.log`, `godot/decompiled.txt`. Secondary source: https://dodgethedumps.com/blog/godot-3d-game-in-the-browser/ .

### Tribals.io — PlayCanvas island survival world / Ammo

The public build exposes JSON scenes/config, JS engine/game scripts and Ammo. The 659,433-byte Ammo module is byte-identical to Venge's (`772899614f44ea350189c1c7f181c9d76cf6820c3ead129e8e3d3c0f46dc1799`). Its wrapper defaults therefore have the same evidence, without another independent decompilation. Initial/max default memory is 64 MiB. The config has 14 batch groups, `useDevicePixelRatio:false`, one Basis variant, and declared MP3/MP4/WAV audio. No Basis/KTX2/DDS response was observed in the initial capture. Atlas use, mesh compression and offscreen use remain unknown.

A 427×240 backing buffer for 854×480 CSS was observed at DPR 2 on loading/wake-up. A `WAKE UP` prompt and world HUD appeared; after activation, the connection closed. This is **not** a sustained gameplay measurement. Quality switches include disabling shadows and special effects; actual gameplay shadow settings and simulation selection were not recovered.

Evidence: `tribals/network.json`, `tribals/42-config.json`, `tribals/ammo.wasm.meta.json`, `tribals-final/*`.

### Supplementary Unreal export probe

The linked Unreal HTML5 SuperGrid template served `SuperGrid_ue4.UE4.js`, `UE4Game.js`, `.wasm` and `.data`. Gzip response lengths were 22,803,276 bytes for WASM and 55,204,440 for data. Decoded WASM size was not recovered. `UE4Game.js` defaults `TOTAL_MEMORY` to 33,554,432; loader MIN/MAX examples are commented out and cannot establish active limits. Preload/IndexedDB paths are visible. The author labels this a UE4.23.1 test. Gameplay was not reached. This is not counted among the 13 peer games or as evidence that a large Unreal world runs well on phones.

## Cross-game counts

Denominator: **13 primary peers**, excluding the requester, Unreal template and three supplementary access attempts. These are conservative positive-evidence counts, not estimates of prevalence among all browser games. Unknowns are not negatives. Old findings are inherited; new static/menu evidence is distinguished from active gameplay.

| Technique / evidence | Positive peers / 13 | What the count means |
|---|---:|---|
| Some explicit visual/work budget | 8 | Swooop, PolyTrack, Slow Roads, Rally Point, Madalin, Venge, Narrow One, Tribals: fixed buffers, resolution/LOD controls, shadow bounds or entity caps. Several new facts are declared or prejoin only. |
| A WASM component | 10 | PolyTrack, Rally, Madalin, Venge, Bloxd, Smash, Narrow, Shell, Godot, Tribals; includes auxiliary decoders/loaders, not ten full WASM engines. |
| Attributed/known worker use | 5 | PolyTrack inherited simulation; Bloxd/Shell blob workers; Narrow module/blob workers; Smash ccWorker. Roles differ. |
| Draco pipeline evidence | 3 | PolyTrack inherited; Narrow and Shell decoder requests. Not a count of compressed meshes. |
| Basis variants available in config | 2 | Venge and Tribals. Neither was observed requesting the variant. |
| Confirmed compressed-texture selection at runtime | 0 recovered | This is a coverage gap. Unity/Godot containers were not decoded; absence of a URL is not absence of GPU compression. |
| Configured batch groups | 2 newly recovered | Venge 46, Tribals 14. No gameplay batch-effect measurement. |
| Recovered actual game-step / catch-up facts | 3 inherited | PolyTrack, Rally, Madalin. Venge's menu engine defaults, Ammo wrappers and Bloxd's unit conversion are separately reported, not inflated into three more game loops. |
| Fixed/main visual tier controls on new mobile gameplay | 0 verified | Menu defaults and source branches are not active gameplay confirmation. |
| Full-engine thread use established for Godot web target | 0 | The recovered Godot export explicitly disables threads. |
| Active WebGPU rendering established | 0 | No positive runtime evidence. |

Only the **high-level practice of explicit budgets** has a useful rendering-related majority in this sample. WASM also appears in a majority, but that does not establish a benefit from moving this Three.js game into WASM. There is **no recovered majority evidence** for KTX2/Basis, cascaded shadows, simulation workers, OffscreenCanvas, meshopt or aggressive streaming. It would be unsound to call any of those mandatory based on this pass.

The safest thing to copy is the control principle: bound pixels, scene residency, visible work and catch-up; make expensive effects optional; keep HIGH independent from mobile concessions. Copy exact constants only after matching scene scale and profiling a playable workload.

## Counterexamples and non-requirements

Swooop's inherited playable scene uses no shadows, a fixed buffer and a tiny particle ring; cascades and dynamic resolution are not universal requirements. Slow Roads already supplies a large-world counterexample to assuming native DPR is essential: its inherited default is CSS-scale, with finite detail/cache/instance budgets. PolyTrack demonstrates that high-quality tiers can deliberately reach 8192 shadow maps and multiple cascades; copying those settings into an open world would not imply equal cost or visual value.

The Godot export disables threads, so threads are not a prerequisite for shipping a browser export. Smash's title/loading canvas uses native DPR 2, whereas Narrow/Venge prejoin buffers use CSS pixels and Tribals loads at half CSS dimensions. These latter observations refute a universal startup-buffer rule, **not** establish equally good gameplay performance. Venge and Tribals declare a Basis alternative yet did not request it during these captures; bundled support and selected pipeline are different facts.

No newly tested title has a substantiated “runs well without X on low-end phones” result in this pass. Making that claim from these menus would exceed the evidence. The earlier playable examples are the only supplied performance counterexamples, and they too carry no physical A14 benchmark here.

## Ghidra results and exact bounds

Ghidra 12.2 with the released 12.0 WASM plugin first failed import with a `NoSuchMethodError` involving `checkAncestry`. The matching **Ghidra 12.0 / ghidra-wasm-plugin 2.4.0** combination was then used with JDK 25. A normal whole-module analysis was unproductive; selective imports avoid spending the budget on thousands of unrelated engine functions.

| Target | Wall-clock bounds | Outcome |
|---|---|---|
| Venge Ammo, initial full analysis | outer `timeout 150`; Ghidra `-analysisTimeoutPerFile 80` | Opened. Pre-analyzer reported 90.204 s and analysis timeout; outer run did not produce a useful decompilation. |
| Venge Ammo, selective | outer `timeout 100`; no global analysis; decompiler 12 s/function | Useful. `Sc` at `ram:8002d1a7` passes one substep and `0x3c888889` (float 1/60); `Tc` at `ram:8002ccb1` supplies the same default timestep; `Uc` at `ram:8002c671` forwards all arguments. Names are mapped from the shipped JS bindings. These are API defaults, not proof of active caller arguments. |
| Bloxd custom physics | outer `timeout 100`; no global analysis; 12 s/function | Useful. `physicsengine_begin_tick` at `ram:80024155` stores `param_2 / 1000.0` and tests gravity-vector squared magnitude against `1e-5`. `physicsengine_set_options` at `ram:8002ffc3` accepts exactly seven doubles; JS maps gravity to option slots 3–5. `voxelworld_evict` at `ram:8002268f` and counters were decompiled, but no safe resident cap was recovered. |
| Godot engine WASM | outer `timeout 100`; no global analysis; 12 s/function | Opened. Requested exports `of,pf`; only `pf` matched a function in the script output, at `ram:82129c96`, and decompilation timed out. No game-specific tuning recovered. No invented meaning for the other export. |
| Tribals Ammo, identity reuse | 10 s string-mining bound; no redundant Ghidra run | Same SHA-256 and JS mapping as Venge. Shared library defaults apply to that artifact. This is not a fourth independently decompiled binary. |

`Sc`'s essential recovered expression is:

```
(**(code **)((ulonglong)*(uint *)(*param_1 + 0x34) * 4))
    (param_1, param_2, 1, 0x3c888889);
```

Bloxd's essential recovered expressions are:

```
*(double *)(param_1 + 0x3e) = param_2 / 1000.0;
ABS(gx*gx + gy*gy + gz*gz) < 1e-05;
```

The second line is a readable restatement after JS field mapping; the raw decompiler text retains pointer fields in `bloxd/decompiled.txt`. Neither result yields an active fixed timestep for Bloxd. `tick_len` is a body-list length, not a duration; the JS call site uses `li.bodies.length`.

Exact invocations and scripts are included in `ghidra-commands.sh` and `ghidra-scripts/Selective.java`. String mining was actually run on the four artifacts with `timeout 10 strings -a ... | rg ... | head -120`; output is retained. These are time bounds, not claims that every command consumed the whole allowance. Earlier PolyTrack `updateCarModel`, `ram:8002f0be`, remains an inherited successful result and was not rerun.

## How my game ranks against the 13

This is a ranking of recovered controls and implementation gaps, **not an FPS league table**. Repo facts refer to the pinned source; supplied measurements refer to the named live build and very-low test. Deployment/source equivalence was not independently established.

| Knob | Your game | Recovered peer spread | Assessment |
|---|---|---|---|
| Pixel budget | `min(pr,DPR)`, pr .55/.75/1.5/2/2.5 | fixed 1280×720; CSS-scale; configurable clamp .1–2; prejoin CSS or half-CSS; Smash loading at native DPR | Already aggressive on very-low. At .55, pixel area is .3025 of CSS 1×. More reduction trades clarity; it is not the first fix. HIGH at 2 may render 4× CSS pixels. |
| Shadows | 0/0/1024/2048/4096; PCF soft | no shadows; PolyTrack 1024–8192 / 4–5 high cascades; Madalin 15-unit distance / 2 cascades | Sensible tier separation already exists. High 2048 is within the recovered range. Camera coverage/caster work matter more than copying a larger map. |
| Physics | 1/60; accumulator capped at 4/60 ≈66.67 ms | PolyTrack 1 ms /100 ms; Rally 60 Hz; Madalin 50 Hz /120 ms; Ammo wrapper 60 Hz default | Already bounded more tightly than the known 100/120 ms catch-up budgets. Venge menu max=10 is not its game's measured loop. |
| World residency | 128-unit chunks; radius 3/4/6/9/13; unload beyond radius+1 | Slow Roads finite heightmap cache 12–40; Bloxd explicit voxel eviction API, cap unknown | Good structural foundation. Different units make raw radii incomparable. Supplied chunks still grew 18→42 after unlock; count/byte caps and cold-cache coverage deserve scrutiny. |
| Batching / instances | static merging; instances 69→75; median107 calls | Venge46/Tribals14 configured batch groups; Slow Roads finite instance caps; peer runtime calls unknown | Ahead of a naive object-per-prop renderer. No evidence that 107 calls is the dominant bottleneck. |
| NPC/skinning | LOD≈10/22/34, hysteresis3; skinned meshes194→249 | comparable peer active skeleton counts not recovered | A concrete cost to investigate; no honest percentile rank. Bone updates, mixers and palette uploads need separate measurement. |
| Shader programs | 229→267; 38 `linkProgram` after playable checkpoint; warm-up≈91 s | comparable counts not recovered | Strong internal evidence of late specialization/compilation. Cannot call it worse than a measured peer count, but it is a direct improvement target. |
| GPU texture compression | 0; 49 WebP URLs | 0 confirmed selections recovered; Venge/Tribals each declare one Basis variant; container formats unknown | A clear missing capability in your capture, not evidence that all peers already use it. WebP still needs decoded GPU storage. |
| Geometry transfer | 108 GLB URLs; compression not established | PolyTrack Draco; Narrow/Shell requested Draco decoders | Investigate actual GLB extension/byte savings before adding a decoder. Draco reduces transfer, not scene draw/animation cost. |
| Startup / later transfer | ≈71.86 MB before unlock; no further measured transfer in supplied play window | Godot declares39.51 MB WASM +69.12 MB PCK; Smash initial WASM transfer9.58 MB +data13.29 MB, plus bundles | Unlike totals/workloads. Your capture suggests significant front-loading; neither zero later bytes nor a peer pack size proves effective spatial streaming. |
| Frame time | p50 283 ms /p95 383 ms /worst1217 ms, software rendering only | no comparable physical-phone or same-workload peer measurements | Not rankable. These are not A14 frame times. |
| Workers | 1–3 terrain workers from `hardwareConcurrency-2`, clamped | dedicated simulation worker in PolyTrack; other peers use decoder/timer/support workers | You already offload useful work. Adding another worker is not automatically the largest win. |

Source anchors: [preset definitions](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-000.txt#L169), [weak-device selection](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-000.txt#L185), [NPC LOD](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-000.txt#L1707), [terrain workers](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-001.txt#L397), [chunk unload](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-001.txt#L428), [actual DPR/shadow application](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-001.txt#L4492), [physics constants](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-002.txt#L981), [catch-up clamp](https://github.com/mustafashqair/open-world-game/blob/b2785f8ceb57c0925a6c6cb6ad54e51ae5328c6b/v50g2/code/part-002.txt#L1088).

Where you are ahead: explicit quality tiers, actual DPR caps, bounded physics, terrain workers, chunk disposal, instancing, static merging, tree impostors and NPC hysteresis already exist. This study does not justify rebuilding these systems just to resemble a peer.

Where the evidence points behind: your own playable trace still creates shader programs and expands scene/skinned-mesh counts after a long warm-up; it demonstrates no GPU-compressed texture pipeline. Peer ranks for these metrics are unknown. These are actionable internal gaps, not invented peer averages.

### Five highest expected benefits for this build

1. **HIGH-safe — stabilize material/program identity.** Audit the 38 post-checkpoint links; reuse material instances, texture-slot layouts and shader defines, and remove unnecessary `needsUpdate`/cache-key changes. Source already uses `compileAsync` on some paths: extend coverage only after verifying the correct light/environment/material variant, rather than compiling the same wrong variant earlier. Acceptance: substantially fewer new links on the same path, with identical HIGH captures.
2. **HIGH-safe — bound invisible animation/skinning work.** Measure mixers, bones and palette uploads for the 249 skinned meshes; stop work for genuinely invisible/unloaded characters, reuse compatible rigs and avoid duplicate skeleton updates. **LOW/MEDIUM-gated** for reducing visible NPC density, animation frequency or near geometry. Acceptance: fewer active updates with unchanged HIGH visible poses and interaction timing.
3. **HIGH-safe — stage asset preparation and spatial requests.** Keep the initial region ready; defer distant model/texture decode and GPU upload under per-frame budgets. Your existing chunk workers do not prove all model work is staged. Acceptance: lower unlock bytes/stalls, no new hitches when traversing a cold region, unchanged HIGH residency near the camera.
4. **HIGH-safe, subject to visual acceptance — add a tested KTX2/Basis path.** Start with large static albedo/normal textures, choose UASTC/ETC1S by content and inspect normals, UI and fine patterns. Preserve dimensions and retain a fallback. Acceptance: actual compressed GPU formats and lower texture memory on supported hardware, with HIGH image comparisons. Transfer size alone is not success.
5. **HIGH-safe — budget resident bytes and object lifetimes.** Inventory the 18→42 chunk and 4,977→6,923 object growth; distinguish legitimate movement from duplicate caches, listeners and retained resources. Add byte/count telemetry and reusable bounded pools. **LOW/MEDIUM-gated** for shrinking visible radii or replacing visible nearby content. Acceptance: stable memory/object plateaus on repeat routes without HIGH pop-in.

These are ranked hypotheses from the supplied trace and source, not predicted FPS percentages. Each requires a real GPU and preferably the physical A14 to validate device benefit.

## Ten changes worth applying to a Three.js open world

| Rank | Change | HIGH-preset visual impact |
|---:|---|---|
| 1 | Stabilize shader/material variants and precompile the variants actually used along the initial route | **HIGH-safe:** intended pixels unchanged; requires output comparison. |
| 2 | Stop invisible animation, skinning and scene traversal; separate update frequency from visibility | **HIGH-safe** for invisible work; visible animation throttling is **LOW/MEDIUM-gated**. |
| 3 | Stage decode, geometry construction and GPU uploads under measured frame budgets | **HIGH-safe:** same eventual assets; test traversal readiness. |
| 4 | Enforce spatial residency in bytes as well as chunk counts; dispose/refcount GPU resources | **HIGH-safe** if only out-of-view residency changes; view-distance cuts are **LOW/MEDIUM-gated**. |
| 5 | Introduce content-tested KTX2/Basis textures, with capability selection and a fallback | **HIGH-safe only after visual acceptance**; lossy normal/UI degradation is not accepted automatically. |
| 6 | Extend existing instancing/merging using shared materials and spatially bounded batches | **HIGH-safe** if transparency, lighting, culling and per-instance appearance are preserved. |
| 7 | Improve LOD/impostors and hysteresis based on projected size; retain HIGH near meshes | **LOW/MEDIUM-gated** for earlier switches/reduced detail; invisible-object LOD can be HIGH-safe. |
| 8 | Tighten shadow caster lists/frusta and reuse static shadow work | **HIGH-safe** only with equal visible coverage; shorter distance/fewer cascades/lower maps are **LOW/MEDIUM-gated**. |
| 9 | Use explicit pixel-area budgets and slow adaptive scaling, with independent HIGH controls | **LOW/MEDIUM-gated** for resolution reduction; do not silently lower HIGH clarity. Existing .55 very-low is already strong. |
| 10 | Preserve bounded fixed-step catch-up, add interpolation telemetry, move genuinely parallel workloads to workers only after profiling | **HIGH-safe** when simulation/latency match; existing four-step clamp should be retained, not replaced by an arbitrary peer value. |

WASM migration, WebGPU migration, universal cascaded shadows and OffscreenCanvas are not in the top ten: the recovered evidence does not establish them as the requester's current bottleneck.

## Access failures and incomplete gameplay

- **Voxiom:** game GLB and Socket.IO requests returned 403; remained loading. No login or regional explanation was established.
- **Mini Royale:** `miniroyale.io` returned `ERR_NAME_NOT_RESOLVED` from this environment; no game assets or gameplay.
- **Krunker:** HTTP 403, visible `ACCESS DENIED`. No bypass attempted; cause beyond server refusal unknown.
- **Shell Shockers mobile:** redirected to discontinued-mobile notice. Desktop fallback reached menu but no confirmed gameplay.
- **Venge:** menu and consent captured; subsequent play attempts did not establish gameplay. Cloudflare/third-party failures were present but are not asserted as the sole cause.
- **Bloxd:** consent dismissed in final run, but mode selection did not establish a playable world; no canvas in the final snapshot. No login requirement was proven.
- **Narrow One:** consent/ad stage, joining, then map loading at 90%; no confirmed sustained gameplay. Shader/software-renderer slowness and network completion were not isolated.
- **Smash Karts:** Unity assets, catalogs and bundles loaded, but only title/loading scene confirmed. No playable checkpoint or FPS claim.
- **Dodge the Dumps:** pack/WASM requested; browser capture was blank/stalled and produced no usable gameplay screenshot. Compiled artifact remained available for static study.
- **Tribals:** wake-up/HUD appeared; final retry reported `Connection to the server is closed`. No sustained play measurement.
- **Unreal SuperGrid:** template artifacts were served, but page stayed blank/unfinished; not a game-performance sample.
- **War Brokers:** portal/mode selector reached; client not launched. Not counted among the 13 primary peers.

None was classified as region-limited or login-walled without direct evidence. Ordinary ad-domain errors are not automatically classified as game access failures. The inherited five games were deliberately not rerun.

## Reproduction and evidence package

The evidence ZIP includes game request ledgers, relevant configs/source excerpts, REA evidence, screenshots, WASM metadata and SHA-256 identities, Ghidra logs/decompilations and the actual investigation scripts. It omits bulk ad scripts and large proprietary binary payloads; hashes and retrieval URLs remain. Code snapshots from the requester's repo are included for cited source lines. Network ledgers are response/header observations, not complete HAR payloads or a complete inventory of all worker-session traffic.

The reports retain unknowns so another pass can target the missing work: reach gameplay for each new title, identify active settings after spawn, inspect packed texture formats, and profile the same route on real phone hardware. The current material is suitable for prioritizing engineering investigations; it is not a completed mobile-performance validation study.
