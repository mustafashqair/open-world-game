# Live quality switching — audit, mechanism and integration drafts

Base: `mustafashqair/open-world-game`, `tab/v50g3` at `65fc5d3628908efc89ecac7496f2b93998bf6c53`. All base line references below are at that commit, not at a changing branch tip. `p0/p1/p2` mean `v50g3/code/part-000/001/002.txt`. The requested `v50g3/index.html` does not exist at this commit; the loader is root `index.html`.

## Result and release status

Four independent open draft PRs were created, each directly against `tab/v50g3`, in a separate checkout. Only uniquely named `wabi/livepreset-*` branches were pushed. No other authors' branches, mem1–3, memhud, main, tab/* or deployments were modified.

- [#42 core](https://github.com/mustafashqair/open-world-game/pull/42): central dispatcher and opt-out.
- [#43 lifecycle](https://github.com/mustafashqair/open-world-game/pull/43): culling/merge/freeze/animation-selection state. Requires #42.
- [#44 lighting](https://github.com/mustafashqair/open-world-game/pull/44): LAM material restoration and G2L light policy. Requires #42. For a build containing #17 use the exact integration patch instead of #44.
- [#45 static village props](https://github.com/mustafashqair/open-world-game/pull/45): representation regrouping without rebuilding inhabitants/layout. Requires #42 and #43.

This is NOT a claim that every quality-dependent resource can now change live, that full-game fresh-target parity passes, or that GPU memory is globally leak-free. The reload-only asset-tier boundary, KTX2 replacement, atmosphere/reflection warm-state parity and full-game verification remain incomplete. Keep all drafts unmerged. A central event alone cannot solve asynchronous asset ownership.

## The two meanings of quality

`S.preset` and `window.__QUALITY` are separate. Presets are vlow/low/medium/high (and legacy ultra/custom entries). Root `index.html:1162` assigns an asset tier `mobile` or `high`; `__qSet` at 1192 changes a stored preference and reports whether reload is required. Changing a render preset does not change that asset tier. Thus PH/HQ/LOW values derived from __QUALITY are usually intentionally fixed, not stale S.preset checks. Rebuilding the renderer or swapping every downloaded model just because a render preset changes would alter today's fresh-load behavior and is not done here.

The tree `LOW` at p0:2141 compares the asset tier with the unreachable string `low`; p0:2143 uses it for R_LITE and initial MAX_HI. This is not repaired here; PR #29 separately fixes MAX_HI in the live `vl33` path.

## Logical inventory and switch effects

The appendices enumerate every matched base occurrence (144 source lines) and all relevant added PR occurrences. Exact original source strings are in the JSON inventories. Derived values and resources are also called out here; the occurrence list is not by itself proof that a resource is live.

| Source at base | Controls / evaluation | Switch result and disposition |
|---|---|---|
| p0:14–18, p2:2943 | VL4/G2V/G3V/PP1LOW/LOWQ are functions | Live reads; their consumers can still capture results once. URL flags are intentionally fixed. |
| p0:20–51 | VLSAVED4 snapshot; VLOW4.on checks saved preset for later GLB requests; TCAP chooses sources/caps | Startup or request-time only. Already-loaded models/textures are not swapped. Async order and pending requests can retain the previous variant. Unresolved hot replacement boundary. |
| p0:185–216; index:1162–1194 | Startup normalization/auto-tier and saved preferences | Startup only, not a hook bug. No re-running auto-tier on each switch. |
| p0:961 | WebGL context antialias selected at renderer creation from asset tier | Cannot change the context's antialias attribute live. Requires renderer replacement/reload if asset tier changes; outside S.preset parity. |
| p0:753,1709–1710,1959–1961 | distant city gate visibility, NPC LOD/mixer reduction, fog/city budget | Reads during updates. Existing LOD transition hysteresis may delay visible change. |
| p0:2081; p2:1901 | procedural vegetation density uses S.veg plus asset tier | Resource build-time. applySettings destroys/requeues chunks when veg changes (p1:4362–4365). Async replacement can show gaps; not proven transition-identical. |
| p0:2141–2144; p1:135–145; p2:3669 | tree ranges/MAX_HI; vl33 reevaluation | vl33 is called from T33.tick, itself called in frame. Live at next tree refresh (~0.5 second, from code), not immediately in setPreset. #29 preserves that model. |
| p1:279–288 | terrain resolution chosen during updateChunks | updateChunks queues a mismatched existing chunk; replacement is asynchronous. Baseline worker responses have no preset epoch. The optional exact-#42 candidate below rejects stale generations, but is not full-game validated. |
| p1:768,855;1251–1394;1456 | PH/HQ, VIL4.active, village layout/assets/materials | Asset-tier/URL decisions made on village creation, not S.preset. Do not rebuild village inhabitants to switch render preset. |
| p1:1334–1351 | PP1 static prop instancing captured once per village | HIGH→LOW previously kept separate meshes; LOW→HIGH kept instances. #45 retains source matrices and swaps representation, disposing only owned instance objects. |
| p1:2359–2361,2584,3079,3142–3196,3269; p2:2776 | asset-tier castShadow assignments on object creation | Fixed from __QUALITY, not S.preset. Switching S.shadow still changes sun shadows through applySettings. No world layout modification. |
| p1:2374,2512,2619,3886,4000,4218; p2:337,431,1546,2548,3441,3769 | asset-tier functions used by dynamic LOD/visibility/load routines | Re-read when routine runs; not S.preset stale captures. Existing loaded payloads remain. |
| p1:3867,3944,4006,4241; p2:462,1110,1823 | geometry resolution/PH/HQ/mobile constants and map/start-up resources | Creation-time asset/hardware selection. Hot replacement not implemented. |
| p1:4204,4206,4251,4278–4288 | NPC vis/mix range; palace near/far loading; one-shot precompile | Ranges/gates read live; already fetched/compiled resources stay resident. A pending async compile can complete after switch. No NPC placement change. |
| p1:4300–4304; p2:3604–3613,3654 | NPC budgets, hidden transforms, mixer update cadence | FRAME4 flags recomputed each accepted frame. G50 A6 selection cached over a frame; #43 clears its selection on switch. Existing accumulated mixer time can differ from a fresh target. |
| p1:4355–4394,4414–4416 | all preset/custom UI paths | setPreset→applySettings; #42 notifies after settings saved, including automatic step-down/custom changes. Same preset is a no-op event. |
| p2:2385 | minimap G2V budget | Live check each work pass. |
| p2:2946,2963–2971 | LAM.L3 and G2L.L3/on/N captured at init; cached material twins, dummy lights | Real stale-policy bug. #44 restores old materials, frees owned twins/dummies, recomputes policy and reapplies. Original shared textures are not disposed. |
| p2:2989–3034 | CULL23 functions plus scan membership/hysteresis caches | Predicates live but scan cache lags; #43 restores transient changes and invalidates key/scan state. |
| p2:3059 | shader prewarm/perf manager mob/WARM captures | Asset tier and URL flags, fixed. Existing shader programs remain cached; fresh counts can differ. |
| p2:3136–3321 | MERGE48 material/anchor eligibility live; job/bundle outputs persist | #43 unmerges old bundles, disposes partial generated output, clears queued work before next merge cycle. No original geometries/materials disposed. |
| p2:3457,3515–3519 | warm budget live; compiler/g2pre/finalCompile one-shot history | Startup preparation not replayed wholesale on switch. New shaders can compile on first new render: hitch risk remains. |
| p2:3541,3569–3584 | G50 menu want captured; freeze plan/snapshot once | #43 recomputes menu intent, thaws only frozen-owned nodes, cancels stale snapshots, restarts freeze on entering vlow after play. |
| p2:3648–3654 | frame cap and FRAME4 flags | Re-read every frame. #8 additionally resets pacing when interval changes / on visibility event. |
| p2:3840,4026,4069–4077 | shadow type live; reflective water target res at creation; want live | Water is hidden on low/vlow but already allocated targets may be retained. Bounded warm residency, not proof of fresh LOW memory equality. No target eviction patch included. |
| p2:4140,4162,4197 | atmosphere qualityPreset fixed from asset tier; start load once then pre checks S.preset | Can load after switching out of vlow; loaded atmosphere is not fully evicted when switching back. Async completion/visibility and fresh-target resource parity need further integration. |

## PR inventory and integration prerequisites

All #7, #8, #14, #17–#37 diffs were inspected at the exact heads recorded in `pr-quality-occurrences.json` (includes zero-match PRs). PR source line numbers in that file are at their own head, never implied base lines.

| PR | Classification / action |
|---|---|
| #7 | split-model loader; source choice/request-time, not retroactive payload swap. No event patch fabricated. |
| #8 | G4P is a function; g4PixelRatio called in applySettings/resize, pacing interval evaluated each frame. Core notification must be preserved when combining its applySettings hunk. |
| #14 | KTX2 source/transcode request selection; resident maps are not automatically replaced. Safe integration needs a texture registry, refcounts across clones, staged decode and atomic reassignment after all materials ready. NOT implemented or runtime verified. No unsafe texture-free patch supplied. |
| #17 | G4S dynamic but G2L baseline block also changed. `pr-17-lighting-live.patch` preserves PR17's LOW 12-light policy and other precompile changes. Apply on the exact #17 head plus #42; replaces #44, not additive to it. |
| #18 | terrain budget depends on tier in its periodic update path. Resident eviction/async worker generations need whole-game switch testing; do not claim fresh-load exact bytes from counts. |
| #19 | atmosphere initial gate and live pre() follow S.preset; existing loaded resources are warm. |
| #20 | raf5 tier condition is per tick; no captured S.preset patch needed. |
| #21 | GC5 master/URL enable, not preset capture. Scratch lifetime may interact with live reset/identity tests. |
| #22 | tree update rechecks tier; existing selection refresh, no duplicate fix. |
| #23 | SKY5.want called by onBeforeRender; changes shader source + needsUpdate on transition. Already live; initial compile hitch still possible. |
| #24,#25 | startup preload/animal load plan; historical fetches cannot be undone by preset event. No rerun-on-switch patch. |
| #26 | npcWalk FRAME4.cc5 path evaluated per call, already live. |
| #27 | BILL1 and atlas size captured/baked once. Exact patch re-evaluates sizes and rebakes safely with retained source, disposes old atlas only after swap; may hitch. Requires #42. |
| #28 | FIRE5 captured once. Exact patch recomputes mutable flag on event; tick already reads it. Requires #42. |
| #29 | vl33 reevaluates every tree update, already live. No overlap fix. |
| #30,#32 | loading-only decisions (WARM2/early EMB42); no reason to replay startup tour/fetch on preset event. |
| #31 | geometry merging helper choice at construction, preserves geometry values; no resident buffer conversion needed for render-preset identity. |
| #33–#37 | GC6A–E each captured once. Five exact patches replace const with mutable gate and event re-evaluation, clearing feature scratch arrays on transition. Each requires #42 and its own recorded PR head. |

Eight integration patches (#17/#27/#28/#33–37) passed exact-head `git apply --check`, apply, and joined-source Node syntax. This is not execution proof. Patch prerequisites are in `integration/README.md`; patches are not pushed to the other authors' branches. #33–#37 combined application against all authors' changes remains a separate semantic integration test, not proved by independent apply tests.

## Mechanism and GPU ownership design

`LIVEPRESET.on(name, fn)` returns unsubscribe; `notify()` runs once only when the value changed after applySettings. Event carries from/to, monotonically increasing epoch and current() for stale asynchronous completions. It does not await asynchronous handlers or promise atomic rendering during work. Error and per-hook timing telemetry are exposed at `window.__LIVEPRESET.st`; errors do not prevent other groups running. Handler ordering is source registration order; dependencies are explicit above.

For every asynchronous resource group, use: stage the target resource; after await check current(); on stale completion dispose only newly owned staged output; on current completion atomically swap; then dispose retired owned targets/textures/instance buffers/materials. Keep shared model/texture inputs until references from scene and templates are gone. No global dispose traversal. This async architecture is design for the remaining asset work, not falsely claimed as implemented by the synchronous core.

- Shadow maps: existing applySettings disposes prior sun.shadow.map when enabling/reconfiguring (p1:4359–4360). Target disabled case may retain a previous map; testing/counts must distinguish retained bounded cache from growth each switch.
- Atlas rebake: keep bake inputs; build target first, replace all billboard map references, dispose old RT and geometry only if exclusively owned. Exact #27 patch implements its particular path, not a general atlas registry. Measure rebake stall; offscreen atlas render can trigger shader compilation.
- LAM materials: restore every tracked live/offscene-mutated mesh's original material before clearing clone map; dispose owned twins, not their shared texture maps. The tracked set is cleared each transition (WeakRef preferred; strong fallback released/rebuilt then).
- G2L dummy lights: remove/dispose only owned dummies and restore transiently hidden real light visibility. Reuse one installed wrapper; do not stack renderer wrappers every switch.
- MERGE48: unmerge originals and dispose generated merge outputs; discard partial output plus jobs on switch. Source geometry/material ownership stays unchanged.
- Static prop instances: dispose instance-owned buffers via InstancedMesh.dispose; shared source geometry/materials remain. Held source mesh metadata is additional JS residency for reversible switching, not free memory.
- Reflective water/PMREM/atmosphere: output target and history ownership is a remaining boundary; changing visibility alone does not free a target or prove parity with fresh LOW.

The kill switch is `?livepreset=0`; master `?v50g5=0` also disables hooks. Disabled branches register no hooks and do not allocate per-village reversible source records. At first load hooks are dormant, so existing MEDIUM/HIGH feature policy is preserved by construction; actual rendered game screenshot identity is not yet proved.

## Validation, failures and remaining differences

All numbers here are [measured] local harness output or [from the code] constants, never Galaxy A14 results.

- [measured] Core unit harness: all 12 directions, same-preset no-op, epoch, unsubscribe, kill-switches and failure isolation passed.
- [measured] Lifecycle state-machine harness: 12 directions passed; it stubs freeze planning, not a rendered game.
- [measured] Lighting: 24 direction/config cases ×20 repeated switches passed with Three r170 objects; original texture disposal count remains zero; final materials restore original identity; dummy counts bounded. Renderer mocked in this test.
- [measured] Static props: 12 directions ×20 cycles passed; source matrices/identity match, generated instances disposed. Not GPU timing.
- [measured] Separate-page WebGL/SwiftShader fixture: independent fresh target reference pages, 24 directional/config tests and 160 repeated switch samples; pixel hashes all matched, no page errors. Fixture is one cube and seven lights at 160×90, not the game. Texture count is zero: it cannot prove texture/RT leak freedom. Material/light/geometry paths are exercised; no invisible empty hash claim.
- [measured] Last fixture run switch+first-render maximum 502.9 ms. An earlier run hit 1718.2 ms. This exceeds the requested 500 ms threshold; report as FAIL for that timing criterion, not a proven A14/game regression. No clean baseline timing comparison isolates cause. Synchronous resource rebuilding/first-use shader compile still require a staged, measured solution.
- [measured] All four patches combine and joined module syntax passes. Integration patches independently apply and joined syntax pass.

The full-game localhost SwiftShader smoke command timed out and was terminated before it saved a page-state/result file. No usable game-switch result, first-15-second trace or screenshot was obtained; the cause is unknown. `full-game-smoke.json` records only this attempt outcome, never a passing test. The synthetic fixture is not substituted for the required 12-direction full-game fresh-target visual/memory matrix.

Still different or unproved: retained model/texture variants, renderer context attributes, water/atmosphere/PMREM warm resources, cached shader-program counts, accumulated animation time, random seed/entity state/network load order, full-game behavior of the terrain generation candidate, new shaders' first-use compilation, streaming entities created while switching, old offscene template ownership, and atlas rebake timing. Thus the full request's universal parity requirement remains OPEN.

## Exact whole-game verification procedure

1. Assemble #42 then #43, choose #44 OR (#17 plus its exact lighting integration), then #45. Add exact PR-specific patches only after matching their prerequisite SHA. Do not apply both #44 and PR17 integration. Save `git rev-parse HEAD`, browser version, renderer string, asset tier, viewport, DPR, URL flags and network/cache settings.
2. Use the deterministic behavior rig to fix seed, world time, camera, entity/load ordering. Without it, image differences from changing time/NPC poses cannot be attributed to quality switching. Test both asset tiers separately, not mobile-vs-high as if they were render presets.
3. For every from in vlow/low/medium/high and every different to (12 directions): fresh-load from; wait Play and loading queues to settle; put camera/player at the exact fixture location; call `window.__G50G.setPreset(to)`; collect elapsed handler time and every presented-frame interval through at least 15 seconds. Save screenshot immediately after switch, after 3 and 10 seconds and at settled state. A >500 ms frame is reported even if final pixels match.
4. In an independent clean browser context fresh-load to with identical deterministic setup. Compare target screenshot, renderer.info.render.calls/triangles, renderer.info.memory.geometries/textures, explicit RT/texture allocation tally, hooks errors, visible entity membership and instance matrices. Capture warmed and cold shader-program counts separately. renderer.info gives counts, not bytes; performance.memory is not required/assumed on Android and never counts GPU memory.
5. Repeat each low↔high and vlow↔medium pair 20 times; also all 12 directions 20 times. Check per-target steady-state allocation counts plateau after warm-up, disposed-owned resource counts, renderer programs, stale asynchronous completions and target changes. Any monotonic target/geometry/texture growth is a failure. Stable count alone does not prove no driver leak.
6. Repeat with livepreset=0 and v50g5=0; compare today's load-time behavior, ensure no hook changes. Fresh MEDIUM/HIGH screenshots must match unmodified base (under same deterministic capture).
7. Test rapid switches while atlas decode, terrain work, atmosphere loading and shader compile are pending, village unload/reload, context loss, unsupported WeakRef fallback, resize and auto quality step-down/custom settings. Verify no missing ground or invisible entities. Confirm no changes to Arabic UI, sheikh, palace/garden placements or forbidden assets.
8. Run real Chrome Android on A14 and the exact MatePad variant separately from localhost SwiftShader. Do not promote emulator switch cost to phone performance.

## Files

`01..04-*.patch` are exact baseline diffs. `edited-file-hashes.json` contains computed MD5 and SHA256 of each edited file at each draft commit. `tests/` contains runnable isolated tests; Playwright scripts reference the installed local package path and Three r170 copy. Set that require path to your own pinned Playwright install when moving machines. `baseline-quality-occurrences.json` and `pr-quality-occurrences.json` retain exact code/line evidence. This report and machine appendices intentionally distinguish read-only inventory, implemented scope and remaining work.


## Appendix A — complete baseline occurrence table

Exact strings are in baseline-quality-occurrences.json; classify with the logical inventory above. Long code lines are represented here by a shortened source prefix, not a replacement for the full evidence.

|File|Line|Source prefix|
|---|---:|---|
|v50g3/code/part-000.txt|14|`const Q4 = new URLSearchParams(location.search), V4ON = k => Q4.get(k) !== '0', VL4 = () => S.preset === 'vlow';   // v50d4`|
|v50g3/code/part-000.txt|15|`const G2ON = !/[?&]v50g2=0\b/.test(location.search), G2V = k => G2ON && S.preset === 'vlow' && Q4.get('g2' + k) !== '0';   /* v50g2 G2V: تحس`|
|v50g3/code/part-000.txt|16|`const G3ON = G2ON && !/[?&]v50g3=0\b/.test(location.search), G3V = k => G3ON && S.preset === 'vlow' && Q4.get(k + '3') !== '0';   const L3AM`|
|v50g3/code/part-000.txt|18|`const PP1ON = G2ON && !/[?&]pp1=0\b/.test(location.search), PP1 = k => PP1ON && Q4.get('pp1' + k) !== '0', PP1LOW = () => S.preset === 'vlow`|
|v50g3/code/part-000.txt|20|`const VLSAVED4 = (() => { try { return JSON.parse(localStorage.getItem('ow_settings2') \|\| '{}').preset === 'vlow'; } catch (e) { return fals`|
|v50g3/code/part-000.txt|23|`  on() { if (q.get('vmdl') === '0' \|\| (window.__QUALITY \|\| 'mobile') === 'high') return false; try { return JSON.parse(localStorage.getItem(`|
|v50g3/code/part-000.txt|35|`  const TCAP = (() => { const q = new URLSearchParams(location.search); const ph = () => (window.__QUALITY \|\| 'mobile') !== 'high';`|
|v50g3/code/part-000.txt|51|`    try { if (VLOW4.has(key) && VLOW4.on()) { url = (VLOW4B.has(key) ? 'vlow4b/' : 'vlow4/') + key; VLOW4.n++; } } catch (x) {}`|
|v50g3/code/part-000.txt|185|`  if (S.preset === 'low') Object.assign(S, PRESETS.low); if (S.preset === 'vlow') Object.assign(S, PRESETS.vlow);`|
|v50g3/code/part-000.txt|191|`    window.__VLOWAUTO = { weak: wk, gpu: gp, mem: navigator.deviceMemory \|\| null, from: S.preset };`|
|v50g3/code/part-000.txt|192|`    if (wk && (S.preset === 'medium' \|\| S.preset === 'low' \|\| (S.preset === 'custom' && !localStorage.getItem('ow_settings2')))) { Object.as`|
|v50g3/code/part-000.txt|199|`  if (weak && (S.preset === 'medium' \|\| S.preset === 'custom' && !localStorage.getItem('ow_settings2'))) { Object.assign(S, PRESETS.low, { p`|
|v50g3/code/part-000.txt|204|`  const Q = window.__QUALITY \|\| 'mobile'; let last = null; try { last = localStorage.getItem('ow_q_applied'); } catch (e) {}`|
|v50g3/code/part-000.txt|207|`    if (S.preset !== 'high' && S.preset !== 'ultra') { try { localStorage.setItem('ow_q_prev', JSON.stringify(S)); } catch (e) {} Object.ass`|
|v50g3/code/part-000.txt|216|`  const NM = { high: 'عالية', mobile: 'خفيفة' }, pref = window.__QUALITY_PREF \|\| 'auto', run = window.__QUALITY \|\| 'mobile';`|
|v50g3/code/part-000.txt|753|`    const d = Math.hypot(PL.x - CITY.x, PL.z - (CITY.z - 40)); dg0.visible = d < Math.max(window.__QUALITY === 'high' ? 260 : 170, scene.fog`|
|v50g3/code/part-000.txt|961|`const renderer = new THREE.WebGLRenderer({ antialias: window.__QUALITY === 'high', powerPreference: 'high-performance' });`|
|v50g3/code/part-000.txt|1709|`function npcLod(G, d) { if (!G.sk) return; const fg = NPC_FAR[G.kind], lim = window.__QUALITY === 'high' ? 34 : (FRAME4.vl && V4ON('npc4')) `|
|v50g3/code/part-000.txt|1710|`  const reduced = PP1('mix') && PP1LOW();   // pp1 0b98fca`|
|v50g3/code/part-000.txt|1959|`  let far = S.view * CFG.CH * 0.95 * ENV.fogK; if (G2V('city')) { const dcE = Math.min(Math.hypot(PL.x - CITY.x, PL.z - CITY.z), Math.hypot(`|
|v50g3/code/part-000.txt|1961|`  if (G2C.k > 0 && G2V('city')) { const f = scene.fog, tf = G2C.fog; if (f.far > tf) { f.far += (tf - f.far) * G2C.k; f.near += (Math.min(f.`|
|v50g3/code/part-000.txt|2081|`  const density=(region===1?.34:region===4?.025:.0015)*(window.__NAT19!==false&&region===1&&window.__QUALITY!=='high'?0.5:1), quality=Math.m`|
|v50g3/code/part-000.txt|2141|`  const Q = window.__QUALITY \|\| 'mobile', LOW = Q === 'low';`|
|v50g3/code/part-000.txt|2143|`  let R_HI = 18, R_MID = 45, R_LITE = LOW ? 70 : 95, R_BILL = 560, R_NAT = 380, HYS = 2, MAX_HI = LOW ? 0 : 4, NB = 6000; const R0_33 = [R_M`|
|v50g3/code/part-000.txt|2144|`  const vl33 = () => { const v = S.preset === 'vlow' && V4ON('tree4'); R_MID = v ? 26 : R0_33[0]; R_LITE = v ? 48 : R0_33[1]; R_BILL = v ? 4`|
|v50g3/code/part-001.txt|279|`    const d = Math.max(Math.abs(dx), Math.abs(dz)), res = (S.preset === 'vlow' && V4ON('ter4')) ? (d <= 1 ? 32 : d <= 2 ? 16 : 8) : d <= 2 ?`|
|v50g3/code/part-001.txt|768|`  const PH = (window.__QUALITY \|\| 'mobile') !== 'high';                        // الموبايل: النسخ الخفيفة فقط (تكسترات 1024)`|
|v50g3/code/part-001.txt|855|`  const PH = (window.__QUALITY \|\| 'mobile') !== 'high', OFF = /[?&]vil4=0/.test(location.search);`|
|v50g3/code/part-001.txt|1251|`  const well = new THREE.Mesh(HG.well, STONEM); well.position.set(0, LIB.height(v.x, v.z), 0); if (!VIL4.active()) g.add(well); topOf(L.soli`|
|v50g3/code/part-001.txt|1260|`  const RING = VIL4.active() ? 15 : 18; ribbon([pol(62, ga), pol(VIL4.active() ? 13 : 9, ga)], 4.4); ribbon(circle(RING, 48), 2.6); ribbon(c`|
|v50g3/code/part-001.txt|1264|`  if (VIL4.active() && VIL4.SHK().length) { const sk = VIL4.SHK(); if (sk.length >= 3) { HK = sk.slice(0, 3); HW = [0.36, 0.3, 0.34]; } else`|
|v50g3/code/part-001.txt|1267|`    const D = HOUSE_DEFS[key], x = v.x + Math.cos(ang) * rad, z = v.z + Math.sin(ang) * rad, fr = Math.hypot(D.w, D.d) / 2 * 0.88 * (VIL4.ac`|
|v50g3/code/part-001.txt|1271|`    const dl = DIRS[D.doorSide] \|\| DIRS['+z'], yaw = Math.atan2(v.x - x, v.z - z) + (r() - 0.5) * (VIL4.active() ? 0.55 : 0.12) - Math.atan2`|
|v50g3/code/part-001.txt|1273|`    if (V3) (SH ? VIL4.shHouse : V3B.house)(L, v, key, x, z, mxh - Math.min(0.3, (mxh - mn) * 0.5) - 0.02, yaw, VIL4.active() ? VIL4.hv(x, z`|
|v50g3/code/part-001.txt|1288|`    if (V3 && VIL4.active()) try { VIL4.houseProps(L, v, key, x, z, 0, yaw, VIL4.hv(x, z).s); } catch (e) { console.warn('[vil4] props', e);`|
|v50g3/code/part-001.txt|1290|`  const n1 = VIL4.active() ? 10 : 8, a1 = [], n2 = VIL4.active() ? 15 : 10;   // v45v: قرية أكثف`|
|v50g3/code/part-001.txt|1291|`  for (let k = 0; k < n1; k++) { const ang = ga + 0.5 + (6.283 - 1.0) * (k + 0.5) / n1; a1.push(ang); place(pickKey(), (VIL4.active() ? 23.5`|
|v50g3/code/part-001.txt|1292|`  for (let k = 0; k < n2; k++) place(pickKey(), (VIL4.active() ? 40.5 + r() * 3.5 : 44 + r() * 2), ga + 0.35 + (6.283 - 0.7) * (k + 0.5) / n`|
|v50g3/code/part-001.txt|1297|`    rg.setAttribute('rq', new THREE.Float32BufferAttribute(RQ, 3)); const m = new THREE.Mesh(rg, VIL4.active() ? VIL4.LANE : ROAD_VIL); m.re`|
|v50g3/code/part-001.txt|1298|`  if (!VIL4.active()) { const P = [0, LIB.height(v.x, v.z) + 0.14, 0], I = [];`|
|v50g3/code/part-001.txt|1305|`  if (!(VIL4.active() ? VIL4.palisade(L, v, ga) : V3B.fence(L, v, ga))) { const WT = MODELS.wall && MODELS.wall.geo ? MODELS.wall : null, bx`|
|v50g3/code/part-001.txt|1320|`    const gm = new THREE.Mesh(mergeGeo(P), HM1); gm.castShadow = true; if (!VIL4.active()) gate.add(gm);`|
|v50g3/code/part-001.txt|1324|`  for (const s of (VIL4.active() ? [] : [-1, 1])) { const q = pol(62, ga + s * 4.8 / 62); L.solid.push(topOf([q[0], q[1], 0.6], gate.positio`|
|v50g3/code/part-001.txt|1327|`  const nSt = S.pop > 0.5 ? 3 : 2, types = ['general', 'bakery', 'smith'], sa = VIL4.active() ? [ga + 1.05, ga + 2.15, ga - 1.05] : [ga + 2.`|
|v50g3/code/part-001.txt|1328|`  for (let i = 0; i < nSt; i++) { const [sx, sz] = pol(VIL4.active() ? VIL4.KR : 13, sa[i]), yaw = Math.atan2(v.x - sx, v.z - sz), m = new T`|
|v50g3/code/part-001.txt|1332|`  if (VIL4.active()) try { VIL4.square(L, v, ga); } catch (e) { console.warn('[vil4] square', e); }`|
|v50g3/code/part-001.txt|1334|`  const propCells = new Map(), instanceProps = PP1('inst') && PP1LOW();`|
|v50g3/code/part-001.txt|1341|`  for (const da of (VIL4.active() ? [] : [0.9, 2.55, 3.7, 5.0])) { const [bx, bz] = pol(16.5, ga + da), yaw = Math.atan2(v.x - bx, v.z - bz)`|
|v50g3/code/part-001.txt|1346|`    if (!(VIL4.active() && VIL4.garden(L, v, x, z, y))) { const f = new THREE.Mesh(HG.field, FIELDM); f.position.set(x - v.x, y, z - v.z); a`|
|v50g3/code/part-001.txt|1348|`    const f = new THREE.Mesh(HG.stump, POSTM); f.position.set(x - v.x, y, z - v.z); if (!(VIL4.active() && VIL4.woodSpot(L, v, x, z, y))) ad`|
|v50g3/code/part-001.txt|1361|`  if (VIL4.active()) try { VIL4.hedges(L, v, ga); VIL4.lanes(L, v); } catch (e) { console.warn('[vil4] edge', e); }`|
|v50g3/code/part-001.txt|1363|`  L.roadF = (x, z) => { const rx = x - v.x, rz = z - v.z, rd = Math.hypot(rx, rz); if (rd < 9.5 \|\| Math.abs(rd - (VIL4.active() ? 15 : 18)) `|
|v50g3/code/part-001.txt|1394|`  if (VIL4.active()) try { VIL4.finish(L, v); } catch (e) { console.warn('[vil4] finish', e); }`|
|v50g3/code/part-001.txt|1456|`  const HQ = (() => { const q = window.__QUALITY; if (q === 'high' \|\| q === 'mobile') return q === 'high'; return !(matchMedia('(pointer: co`|
|v50g3/code/part-001.txt|2359|`    const geo = merge(parts, 6), mesh = new THREE.Mesh(geo, M); mesh.castShadow = window.__QUALITY === 'high'; mesh.receiveShadow = true; L.`|
|v50g3/code/part-001.txt|2361|`      arr.forEach((p, i) => im.setMatrixAt(i, m4.compose(P.set(p[0], p[1], p[2]), Q.setFromAxisAngle(UP, p[3] \|\| 0), S))); im.receiveShadow `|
|v50g3/code/part-001.txt|2374|`  const HQ = () => window.__QUALITY === 'high', modelOf = g => g && g.userData && g.userData.mk ? MODELS[g.userData.mk] : null;`|
|v50g3/code/part-001.txt|2512|`  function dynTick() { const hq = window.__QUALITY === 'high', R = hq ? 95 : 48, R2 = R * R; ST.dyn = ST.dyn.filter(D => D.L.g.parent);`|
|v50g3/code/part-001.txt|2584|`    all.computeBoundingSphere(); const km = new THREE.Mesh(all, stoneMat()); km.receiveShadow = true; km.castShadow = window.__QUALITY === '`|
|v50g3/code/part-001.txt|2619|`  const HQ = () => window.__QUALITY === 'high';`|
|v50g3/code/part-001.txt|3079|`      arr.forEach((p, i) => im.setMatrixAt(i, m4.compose(P3.set(p[0] - cx, p[1], p[2] - cz), Q.setFromAxisAngle(UP, p[3]), S3.set(p[4], p[4]`|
|v50g3/code/part-001.txt|3142|`    { const mk = key => { const m = C15.geo[key] ? new THREE.Mesh(C15.geo[key], C15.mats) : new THREE.Mesh(cityRaw(key).geo, HM1); m.castSha`|
|v50g3/code/part-001.txt|3159|`    m.position.set(bx - cx, H(bx, bz) - 0.05, bz - cz); m.rotation.y = yaw; m.castShadow = !BR.k15 \|\| window.__QUALITY === 'high'; m.receive`|
|v50g3/code/part-001.txt|3196|`    im.castShadow = key === 'cCastle' \|\| !!HREPC[key] \|\| (!!C15.geo[key] && window.__QUALITY === 'high'); im.receiveShadow = true; im.comput`|
|v50g3/code/part-001.txt|3269|`    im.castShadow = window.__QUALITY === 'high'; im.receiveShadow = false; im.computeBoundingSphere(); if (!window.__V16_TREES) { im.visible`|
|v50g3/code/part-001.txt|3555|`  const L = n.L, treeOb = []; gatherTreeSolids(n.x, n.z, 50, treeOb); const ws5 = FRAME4.cc5, walkSolid = ws5 ? null : L.solid.concat(treeOb`|
|v50g3/code/part-001.txt|3867|`  const pos = [], VC = WORLD.vclip \|\| [], RC = WORLD.rclip \|\| [], STEP = window.__QUALITY === 'high' ? 28 : 34;`|
|v50g3/code/part-001.txt|3886|`  const HQ = () => window.__QUALITY === 'high', NL = () => (HQ() ? 8 : 4);`|
|v50g3/code/part-001.txt|3944|`  const PH = (window.__QUALITY \|\| 'mobile') !== 'high';`|
|v50g3/code/part-001.txt|4000|`  const D = 'npcs/vwork/', HQ = () => window.__QUALITY === 'high';`|
|v50g3/code/part-001.txt|4204|`  const PHN = () => !hq, MIXD = () => PHN() ? (S.preset === 'vlow' ? 30 : 45) : 70, VISD = () => PHN() ? (S.preset === 'vlow' ? 40 : 50) : 9`|
|v50g3/code/part-001.txt|4206|`  function precompile(dt) { if (pcDone) return; pcT += dt; if (pcT < 2) return; pcT = 0; if (!started() \|\| window.__QUALITY === 'high') retu`|
|v50g3/code/part-001.txt|4218|`  const NEAR = () => (window.__QUALITY === 'high' ? 340 : 260);`|
|v50g3/code/part-001.txt|4241|`  function init() { inited = true; const PH = window.__QUALITY !== 'high', hi = /[?&]pal_hi\b/.test(location.search), lite = PH && !hi;`|
|v50g3/code/part-001.txt|4251|`        const as4 = (palA() \|\| (S.preset === 'medium' && V4ON('med5'))) && renderer.compileAsync; if (as4) { try { window.__LAM && __LAM.app`|
|v50g3/code/part-001.txt|4278|`  const pal4 = () => S.preset === 'vlow' && V4ON('palv'), palL5 = () => S.preset === 'low' && V4ON('low5') && V4ON('pal5'), palA = () => pal`|
|v50g3/code/part-001.txt|4287|`    if (GF4 \|\| api.nearLoad) { const dp = Math.hypot(PL.x - X, PL.z - (Z - 30)); if (!palA()) { if (GF4) GF4.visible = false; if (!st.near4)`|
|v50g3/code/part-001.txt|4288|`      else { if ((st.tk4 = (st.tk4 \|\| 0) + 1) % 40 === 1 && st.tk4 < 1000) (st.plh = st.plh \|\| []).push(Math.round(PL.x) + ',' + Math.round(`|
|v50g3/code/part-001.txt|4300|`  if (qO) qT = wP.lap('v_nearscan', qT); near.sort((a, b) => a[0] - b[0]); const MAXA = (FRAME4.vl && V4ON('npc4')) ? 5 : S.pop < 0.6 ? 8 : `|
|v50g3/code/part-001.txt|4304|`      if (FRAME4.lw && V4ON('npc4')) { const dd = Math.hypot(n.x - PL.x, n.z - PL.z); if (dd > 35 && !n.angry && !n.talking) { const k = dd `|
|v50g3/code/part-001.txt|4355|`function setPreset(p) { S.preset = p; if (p !== 'custom') Object.assign(S, PRESETS[p]); applySettings(); buildPanel(); }`|
|v50g3/code/part-001.txt|4367|`window.__G50G = { preset: () => S.preset, setPreset: p => { setPreset(p); saveSettings(); }, view: () => S.view, setView: v => { S.view = Ma`|
|v50g3/code/part-001.txt|4371|`    b.className = 'chip' + (S.preset === p ? ' on' : ''); b.textContent = NAMES[p]; b.onclick = () => setPreset(p === 'custom' ? 'custom' : `|
|v50g3/code/part-001.txt|4375|`    b.onclick = () => { S.preset = 'custom'; S.shadow = v; applySettings(); buildPanel(); }; $('shadows').appendChild(b); });`|
|v50g3/code/part-001.txt|4379|`  const cu = f => v => { S.preset = 'custom'; f(v); applySettings(); };`|
|v50g3/code/part-001.txt|4393|`$('sPr').oninput = e => { S.preset = 'custom'; S.pr = +e.target.value; applySettings(); fillRange(e.target); buildPanel(); };`|
|v50g3/code/part-001.txt|4394|`$('sView').oninput = e => { S.preset = 'custom'; S.view = +e.target.value; applySettings(); fillRange(e.target); buildPanel(); };`|
|v50g3/code/part-001.txt|4414|`  const i = ORDER.indexOf(S.preset);`|
|v50g3/code/part-001.txt|4415|`  if (i > 0) { setPreset(ORDER[i - 1]); toast('خُفِّضت الجودة تلقائياً إلى: ' + NAMES[S.preset]); }`|
|v50g3/code/part-001.txt|4416|`  else if (S.preset === 'custom' && S.view > 3) { S.view--; S.pr = Math.max(0.5, S.pr - 0.25); applySettings(); toast('خُفِّضت الجودة تلقائي`|
|v50g3/code/part-002.txt|337|`    h.vis = d < (window.__QUALITY === 'high' ? (h.pat ? 220 : 170) : (h.pat ? 110 : 90)); h.g.visible = h.vis;   // v23: أقصر على الجوال if `|
|v50g3/code/part-002.txt|431|`      const Q = window.__QUALITY \|\| 'mobile';`|
|v50g3/code/part-002.txt|462|`  const Q = window.__QUALITY \|\| 'mobile', HQ = Q === 'high';`|
|v50g3/code/part-002.txt|1110|`  const MOB = window.__QUALITY === 'mobile' \|\| (window.matchMedia && matchMedia('(pointer:coarse)').matches) \|\| Math.min(innerWidth, innerHe`|
|v50g3/code/part-002.txt|1546|`const V20 = (() => { const ST = { t: 0, lodN: 0, err: 0 }, HQ = () => window.__QUALITY === 'high', C3 = (r, g, b) => new THREE.Color(r, g, b`|
|v50g3/code/part-002.txt|1823|`    const b = landBox(), res = window.__QUALITY === 'high' ? 1280 : 900, step = Math.max(b.x1 - b.x0, b.z1 - b.z0) / res;`|
|v50g3/code/part-002.txt|1901|`    const nat = window.__NAT19 !== false, density = (region === 1 ? .34 : region === 4 ? .025 : .0015) * (nat && region === 1 && window.__QU`|
|v50g3/code/part-002.txt|2385|`    const g2m = !WM.open && G2V('mm'); if (!g2m) work(WM.open ? 6 : 3);`|
|v50g3/code/part-002.txt|2548|`  const high = () => window.__QUALITY === 'high';`|
|v50g3/code/part-002.txt|2776|`    const m = new THREE.Mesh(geo, shopDress22.mat \|\| (shopDress22.mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9,`|
|v50g3/code/part-002.txt|2943|`const LOWQ = () => S.preset === 'vlow' && !/[?&]lowcull=0\b/.test(location.search);`|
|v50g3/code/part-002.txt|2946|`  const L3 = G3V('lights'), L3BAD = /roughness\|metalness\|clearcoat\|sheen\|iridescence\|transmission\|anisotropy\|physical\|specularIntensity\|refl`|
|v50g3/code/part-002.txt|2963|`  function tick(dt) { if (!on \|\| S.preset !== 'vlow' \|\| window.__QUALITY === 'high') return; t -= dt; if (t > 0) return; t = (st.sw = (st.sw`|
|v50g3/code/part-002.txt|2964|`  function apply(root) { if (!on \|\| S.preset !== 'vlow' \|\| window.__QUALITY === 'high') return; root.traverse(o => { if (!o.isMesh \|\| !o.mat`|
|v50g3/code/part-002.txt|2967|`  function pend(m) { if (!on \|\| S.preset !== 'vlow' \|\| window.__QUALITY === 'high' \|\| !m) return false; if (m.type !== 'MeshStandardMaterial`|
|v50g3/code/part-002.txt|2971|`const G2L = (() => { const L3 = G3V('lights'), on = G2V('pre') \|\| L3, N = L3 ? 0 : Math.max(1, Math.min(9, +(Q4.get('g2pl') \|\| 4))),   /* v5`|
|v50g3/code/part-002.txt|2989|`  const mob = () => window.__QUALITY !== 'high';`|
|v50g3/code/part-002.txt|2991|`    sk.length = 0; sm.length = 0; mg.length = 0; bg.length = 0; lowOn = LOWQ() && mob(); const g2b = G2V('city'), g2l = window.G2L && G2L.on`|
|v50g3/code/part-002.txt|3016|`        if (mob()) { const dd = sp.center.distanceTo(cp) - sp.radius, lw = LOWQ(), lim = sp.radius < 2.5 ? (lw ? (VL4() ? 30 : 45) : 75) : s`|
|v50g3/code/part-002.txt|3025|`    const g2q = G2V('cull'), wP4 = window.PRF, pq = !!(wP4 && wP4.on); let tq = pq ? performance.now() : 0;`|
|v50g3/code/part-002.txt|3026|`    if (fN - lastScan > (g2q ? 45 : FRAME4.lw && !watch.size ? 60 : 15)) { lastScan = fN; try { scan(); } catch (e) {} if (pq) tq = wP4.lap(`|
|v50g3/code/part-002.txt|3027|`    kc4 = G2V('city') && G2C.k > 0 && scene.fog ? scene.fog.far + 4 : 0; pad4 = g2q;`|
|v50g3/code/part-002.txt|3034|`        for (let i = 0; i < mg.length; i += 7) { const qx = Math.max(mg[i + 1], Math.min(cp.x, mg[i + 4])), qy = Math.max(mg[i + 2], Math.mi`|
|v50g3/code/part-002.txt|3059|`  const mob = window.__QUALITY !== 'high', WARM = OPTIN('warm') \|\| OPTIN('live');`|
|v50g3/code/part-002.txt|3136|`  const mob = window.__QUALITY !== 'high', BUDGET = mob ? 3 : 4, SCAN_EVERY = 24;`|
|v50g3/code/part-002.txt|3159|`  const M3 = () => G3V('merge'), RETRY3 = new WeakMap();   /* v50g3 merge3 */`|
|v50g3/code/part-002.txt|3180|`  function anchorOf(o) { const cellOnly = PP1('inst') && PP1LOW(); for (let p = o.parent; p; p = p.parent) { if (p === scene) return scene; `|
|v50g3/code/part-002.txt|3321|`      if (zf !== frameN && frameN % ((FRAME4.lw \|\| FRAME4.md) ? SCAN_EVERY * 4 : SCAN_EVERY) === 1 \|\| !ZL.length) { zf = frameN; zeroList();`|
|v50g3/code/part-002.txt|3441|`  const hi = () => window.__QUALITY === 'high';`|
|v50g3/code/part-002.txt|3457|`  const BUD = () => (S.preset === 'vlow' ? 250000 : S.preset === 'low' ? 350000 : 600000);`|
|v50g3/code/part-002.txt|3515|`  function g2pre() { if (!G2V('pre') \|\| st.g2pre) return; st.g2pre = { n: 0, ms: 0, err: 0 }; const t0 = RN(), roots = templates();`|
|v50g3/code/part-002.txt|3519|`    if (PP1('sh') && PP1LOW() && !st.finalCompile) { st.finalCompile = { done: false, ms: 0, err: '' }; phase('final', st.step); const t0 = `|
|v50g3/code/part-002.txt|3541|`  const M = { live: false, t0: 0, last: 0, iv: 0, ema: 8, frames: 0, err: '', want: QS.get('g50live') !== '0' && S.preset !== 'vlow' };`|
|v50g3/code/part-002.txt|3569|`  function fzPlan() { if (S.preset !== 'vlow' \|\| QS.get('frz') === '0') return; const t0 = RN(), cand = [];`|
|v50g3/code/part-002.txt|3604|`  P.updateMatrixWorld = function (force) { if (FRAME4.hid && !this.visible && this.parent) { if (FRAME4.vl) return; if (this.__sk4 === undef`|
|v50g3/code/part-002.txt|3605|`  FRAME4.hidOn = on; })();`|
|v50g3/code/part-002.txt|3607|`  P.update = function (dt) { if (!on \|\| !(dt > 0) \|\| !(FRAME4.lw \|\| FRAME4.md)) return o.call(this, dt);`|
|v50g3/code/part-002.txt|3612|`    if (!vis) { if (PP1('mix') && PP1LOW()) { this.__a4 = 0; MIX5.delete(this); st.mixSkip++; return this; } if (FRAME4.vl) this.__a4 = Math`|
|v50g3/code/part-002.txt|3613|`    let k = FRAME4.vl ? (d < 14 ? 1 : d < 30 ? 2 : 4) : FRAME4.lw ? (d < 20 ? 1 : d < 40 ? 2 : 4) : 1; if (FRAME4.lw && window.__G50ON === t`|
|v50g3/code/part-002.txt|3623|`    el.textContent = 'v50g ' + S.preset + ' pr ' + renderer.getPixelRatio().toFixed(2) + '\nfps ' + fps.toFixed(1) + '  frame p50 ' + q(F.ft`|
|v50g3/code/part-002.txt|3648|`  { const fc5 = window.__G50ON === true ? (window.__G50FC \| 0) : 0, cap5 = fc5 ? (fc5 < 50 ? 25 : 12) : (S.preset === 'vlow' ? 25 : 0); if (`|
|v50g3/code/part-002.txt|3654|`  { const tn = performance.now(); if (FRAME4.t0) FRAME4.ft.push(tn - FRAME4.t0); FRAME4.t0 = tn; FRAME4.n++; FRAME4.vl = VL4(); FRAME4.lw = `|
|v50g3/code/part-002.txt|3667|`  hudT += PP1FPS ? frameMs / 1000 : HUDFIX ? rawDt : dt; if (hudT > 0.4) { hudT = 0; const fl = $('fpsL'); if (fl) { fl.hidden = !S.fps; if `|
|v50g3/code/part-002.txt|3769|`  const HQ = () => window.__QUALITY === 'high';`|
|v50g3/code/part-002.txt|3840|`    const p = S.preset; if (p === 'low' \|\| p === 'vlow' \|\| (p === 'custom' && S.shadow === 0)) return 'none';`|
|v50g3/code/part-002.txt|4026|`    const hq = window.__QUALITY === 'high', res = F.wRes \|\| (hq ? 512 : 256);`|
|v50g3/code/part-002.txt|4069|`    const want = F.water && S.preset !== 'low' && S.preset !== 'vlow';   /* v50d2: «منخفض» = الماء القديم بلا انعكاس (الانعكاس بيرسم المشهد `|
|v50g3/code/part-002.txt|4077|`    WS.every = window.__QUALITY === 'high' ? 1 : 2;`|
|v50g3/code/part-002.txt|4140|`    c.qualityPreset = window.__QUALITY === 'high' ? 'medium' : 'low';`|
|v50g3/code/part-002.txt|4162|`    if (F.atmo && !A.L && !(S.preset === 'vlow' && V4ON('atmo4'))) atmoLoad();`|
|v50g3/code/part-002.txt|4197|`  if (F.atmo && !(VLSAVED4 && V4ON('atmo4'))) setTimeout(atmoLoad, 50);`|
|index.html|1162|`  window.__QUALITY = tier; window.__QUALITY_PREF = pref;`|
|index.html|1192|`    window.__QUALITY_PREF = v; return (v === 'auto' ? autoTier() : v) !== tier;`|
|index.html|1194|`  window.__qStats = function () { return { tier: tier, pref: window.__QUALITY_PREF, auto: autoTier(), used: Object.assign({}, USED), bad: Ob`|

## Appendix B — PR head evidence

|PR|Exact inspected head|Relevant added-line matches|
|---|---|---:|
|#7|`fd7cfbb06d3ea598fd5ec86bbd0cf074e926025f`|0|
|#8|`314e72a9b82be2076dcce4e6a3678981951dd9f5`|16|
|#14|`49aa2d98d176ec48b4d081a3615a57052c6e3136`|4|
|#17|`cbc9f8a00724588ce90bcb2cc7d0039b0b5dcbe6`|24|
|#18|`33f0cdbb69dd90f37830a7f76a5b992eec33e9b6`|9|
|#19|`e3d70a685737e82615245cffb81692b4d54f3d30`|2|
|#20|`565554467dd411a865b937df63da212caea9e921`|1|
|#21|`fc9fe8218355d548aaf334ae24b8b30010873b84`|0|
|#22|`a62d8f5c8d6f73a0a2db09834aafc8d42bf5436f`|1|
|#23|`c66cc6591ea9b465ba2f95437a08c75c234a57e8`|1|
|#24|`3b344a33b6003282140bac6d0485a5f3203f6b67`|4|
|#25|`f5bb2212d7c0d46a1b9c569aba26eaa37b6d1c35`|5|
|#26|`73206f73a0a21752a17f8b6ea90464d9181c6bcb`|2|
|#27|`f5aca593ea04e3ec66c113933cc832cc7cc17e21`|2|
|#28|`8189ec87414a3905b15cad686b7691cbc5fa720b`|2|
|#29|`acc445651d1a5d7dc6a3bb48134da84d67cc7e55`|2|
|#30|`166b102e36b9ec76f4494c857cfc2e11a3e33c99`|1|
|#31|`497b0541198a84b16ee7bbdaaaa524b35c15661d`|1|
|#32|`a5ad4c9eb32b6a0be1ac4e2bca734e4cced86fde`|1|
|#33|`a3d860cb224a28fb48afdfebb3196d2438df9497`|4|
|#34|`445f76d44389ede13fe012ab71e40f4c0171a7c5`|4|
|#35|`bfafb78288610e732c359a1c0ad3e2a9a55f2a14`|3|
|#36|`34dcf17a022c90e4fa40a8a8e7349ea03624ca97`|3|
|#37|`7d3f29639d1f40131d363e6d9ce2ad56878e027e`|6|


## Integration with parallel memory work

No mem1–3 or memhud branches were modified. Reversible atlas baking retains source geometry/material metadata that a memory-saving patch might otherwise free; ownership must be reconciled before either disposal. Static-prop switching retains detached source meshes, so a memory inventory must count them and must not independently free their shared geometry/materials. LAM restores source materials and disposes only owned twins; a texture-deduplication/freeing patch needs shared-map reference accounting. Culling/MERGE48 resets invalidate or dispose generated buffers and can interact with any memory HUD or village-unload tally. These are semantic interactions identified from this code, not a reviewed compatibility claim for the parallel memory changes.


## Follow-up: publication, timing decomposition, and shadow ownership

The full report, raw test evidence, standalone patches, exact-head integration patches and test sources are now included together under `docs/wabi/live-quality/` on the dedicated report draft. This documentation draft applies no patch to the game. #42–45 are preserved unchanged.

### The >500 ms fixture result remains a failure, not erased by a retry

The original fixture's `elapsed` combines notification handlers, first render submission, a synchronous `readPixels` wait and a JavaScript pixel hash. It is not an isolated hook CPU time or an actual game frame-time capture. The original 502.9 ms latest sample and the earlier 1718.2 ms maximum remain in the evidence. We cannot attribute their cause from those aggregate measurements.

A new, separately retained SwiftShader diagnostic (`tests/gpu-timing-split.cjs`, `gpu-timing-split.json`) splits those components. [measured, this host, isolated fixture] 24 directions and 160 repeat samples still matched independent fresh-target pixel hashes with no page errors. The maximum aggregate sample was 351.3 ms, maximum hook duration 13.6 ms, maximum render-submit duration 54.3 ms and maximum synchronous readback duration 304.2 ms. These maxima can belong to different samples and must not be added together. This run shows that readback synchronization is a substantial contributor in this diagnostic. It does not prove that the earlier >500 ms events had the same cause, that compilation is the sole cause, or that an actual game quality switch stays under 500 ms. It is not a justification to merge.

### Additional optional target-release patch

`05-shadow-release.patch` is an independent text patch against the exact baseline and requires core #42. It registers `sun-shadow-targets` immediately before base `p1:4356` and runs only on a preset event while `?livepreset` and master `?v50g5` are enabled. There is no first-load resource mutation. When the target has `S.shadow <= 0`, it calls the Three r170 `LightShadow.dispose()` API and nulls both `map` and `mapPass`, making later shadow-on rendering allocate fresh targets. It does not dispose scene textures/materials or another light's resources. Baseline `applySettings` already handles map reallocation when enabling shadows.

[code/test] r170 `LightShadow.dispose` releases both owned targets (the inspected vendored module's lines 45696–45708). The object harness covers enabled/disabled registration, preserving shadow-on targets, 20 release cycles, two target-dispose events per cycle, and no repeated dispose for an already-empty target. Exact-base apply, core-plus-patch concatenated source syntax and applied-source diff checks pass. The `shadow-release-md5.txt` value explicitly describes core-plus-shadow source, not baseline or a GPU byte count. This does not prove GPU allocator reclamation, fresh-load parity or first-use hitch safety in the game. Keep it an unmerged candidate.

### Async boundaries pursued; terrain candidate is not acceptance-ready

- Terrain at base `p1:250–288`: baseline worker messages carried coordinates/resolution but no preset generation. A reply from an old preset could arrive after chunks and `pending` were rebuilt. The optional `integration/async-terrain-pr-42.patch` targets exact core #42 head `953902c76948d371b842fb1f9dccf711290f6ad8`: each job/reply carries `terrainGen`; a `terrain-jobs` event increments the generation, clears queue/pending and requeues current chunks; stale replies are discarded before `addChunk`, without clearing current-generation pending state. `git apply --check`, patch application, `git diff --check`, and joined-source `node --check` passed on a clean worktree at that exact commit. `node tests/async-terrain-generation.cjs` passed its model-level stale-reply guards, including two rapid switches. This does not execute the actual Web Worker in the game, establish race-free full-game behavior, or prove fresh-target parity; treat it as an integration candidate requiring full-game stress tests before merge.
- Texture replacement (#14): meshes, offscene templates, VAT and LAM clones can share maps. Build a staged replacement under an owner registry, swap only after the consumer set is complete, and defer old-texture disposal until all references release. A preset event is not permission to globally dispose shared textures. Existing textures selected by asset tier are distinct from S.preset policy; a fresh target must use the same asset-tier configuration.
- Water/atmosphere at `p2:4026–4197`: visibility is not allocation ownership. A completion gate alone can prevent showing stale output but cannot establish whether the module has already added targets/materials. Full module lifecycle contracts and late-result ownership are required before eviction. No claimed full async replacement or GPU-memory parity.
- Shader staging: precompiling a representative miniature fixture does not cover the full game's material/light variants. A staged prewarm should collect actual target variants without changing existing visible materials, then commit at a frame boundary; the live rig cannot currently establish that complete set. No hidden mandatory loader or replay of WARM2 was added.

### Coordination contract with memory patches

The memory work may drop LOD16/FZ records belonging to disposed villages. It must distinguish intentionally detached source meshes retained by #45 for reversible representation from destroyed-village data. #45 retains these originals and shared geometry/materials deliberately; they are part of its CPU memory budget. LAM owns clone materials but not source maps. Atlas integration retains rebake inputs; it cannot be combined with image/geometry reclamation that assumes they are dead. MERGE48 owns generated output only, not input sources. Shadow cleanup above concerns sun-owned targets only. No memory-task branches were changed; combined semantic/phone validation is still outstanding.
