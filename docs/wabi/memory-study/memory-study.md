# 4 GB phone memory study — code evidence, diagnostic patch and three independent candidate savings

Baseline: mustafashqair/open-world-game, tab/v50g3, 65fc5d3628908efc89ecac7496f2b93998bf6c53. `p0/p1/p2` below mean `v50g3/code/part-000/001/002.txt`. The entry HTML at this commit is root `index.html` (there is no v50g3/index.html).

## Evidence and completion boundary

No A14, MatePad, Android browser or Play+60-second runtime memory capture was performed in this task. This is a source-level inventory, not the requested complete measured resident inventory or a measured top-retainer ranking. The package includes an executable diagnostic patch and exact capture runner so that missing evidence can be obtained. Patch syntax, hunk application and a synthetic ledger unit test passed; GPU lifetime, gameplay, screenshots, frame-time and real memory savings remain untested. A diagnostic draft PR publishes this report and exact text patches; runtime game sources are not changed by that documentation PR.

[measured: user-supplied emulator] 129 MB before Play on vlow and 161 MB on LOW are network transfer observations, not resident RAM or GPU allocation totals. Their exact MB/MiB convention is not established here. Do not subtract either from 4 GB to calculate safe memory headroom.

## Source-level memory inventory

| Category / retained owner | Creation and lifetime evidence | Size / what remains unknown |
|---|---|---|
| Scene objects, NPCS/ANIMALS, model templates, material caches, village state | p0:977–1100 model load/normalization; p1:1398–1402 village disposal | [from the code] Live JS graph; top retainers and actual count at Play+60 unknown. Models intentionally keep shared geometry/textures. Heap snapshot needed. |
| EMB42 aggregate + its fulfilled Promise | p0:1041–1044 create aggregate, return AB as `ready` fulfillment; p0:1088–1089 parses independent `AB.slice` results and calls free | [from the code] 10,508,040 bytes / 10.02 MiB aggregate. `free` only nulls AB, not `EMB42.ready` fulfillment; buffer can stay reachable. Not a proved peak or actual reclaimed amount. |
| GLB parse inputs, temporary quantized VAT inputs | p0:1088 parses model slices; p2:1585–1595 `vatLoad` reads source, slices arrays and creates textures/geometry | [from the code] Some locals become GC-eligible after async return; GLTFLoader/parser internal retention must be checked. Do not free geometry attribute arrays blindly: CPU raycasting, rebuilding and context restore may need them. |
| VAT data textures + CPU backing arrays | p2:1585–1595, referenced by CW.V and shader uniforms at p2:1603–1610 | [from the code + repository headers] male-0 5903×40, male-1 2545×40, female-0 5822×40, female-1 2439×40; RGBA32F position (16 B/texel) + RGBA8 normal (4 B/texel), no mips. Sum 13,367,200 bytes = 12.75 MiB nominal texture payload. Same P/NN arrays remain CPU-side too. Actual GPU allocation padding/driver overhead unknown; residency depends on crowd loading. |
| Crowd source pictures retained in CW.tex | p2:1597–1601 converts image to vertex colors/mask; p2:1736–1738 loads/stores two textures; vatMat `map` argument unused at p2:1603–1611 | [from repository image dimensions] Two 512×512 WebP sources. RGBA-equivalent decoded pixels total 2,097,152 bytes / 2 MiB; actual browser decoded storage/GC timing unknown. Not claimed as GPU saving: the maps are not sampled by the crowd material. |
| Crowd geometry / instancing | p2:1593–1601 vertex attributes; p2:1694–1697 geometry clones, aAnim/aTint and instanceMatrix | [from the code] Each instance needs 16 matrix floats plus 8 animation/tint floats = 96 nominal bytes per capacity slot, plus shared/static vertex/index arrays. Exact cap and active total need runtime capture. |
| Near nature merged streaming buffer NB.g | p2:1546 HQ uses `window.__QUALITY`; p2:1569 allocates position/normal/uv/color floats | [from the code] Mobile asset tier capacity 120,000 vertices ×11 floats×4 = 5,280,000 bytes / 5.04 MiB CPU attributes, mirrored as GPU buffers when uploaded. High asset tier doubles it. This is asset-tier dependent, not simply `S.preset`. Active lower draw range does not shrink allocated capacity. |
| Terrain chunk geometries and workers | p1:245–288 scheduler/creation; PR #18 owns budget changes | [from the code] Worker data and CPU attributes can coexist with GPU buffers. Current active chunks, transient messages and full geometry bytes need capture. Do not duplicate residency policy in this patch set. |
| Tree impostor atlas / render target | p1:71–95 bakeBill, RT at 76 | [from the code] 2048×1024 RGBA8 nominal color 8 MiB; full mip chain about 10.67 MiB, depth attachment extra/implementation-dependent. PR #27 already owns shrinking it; not redone. Atlas retained for tree drawing; source tree models shared. |
| Shadows | p1:4355–4365 applySettings; p2:CSM setup near 3780–3830 | [from the code] S.shadow drives dimensions. HIGH→LOW leaves old sun shadow RT allocated when S.shadow becomes zero (only >0 branch disposes map). Captured dimensions/format/sample count needed. The separate live-quality-switching task covers this region; no overlapping patch supplied here. |
| FX render targets | p2:3863–3889 fxBuild/fxFree | [from the code] Scene HalfFloat RGBA color = 8wh bytes, UnsignedInt depth nominal 4wh, LDR RGBA = 4wh, plus optional AO buffers. 16wh is only known main-target payload, not a device total. fxFree is an explicit disposal path. Tier, drawing-buffer dimensions and actual allocation at +60 unknown. |
| Sky PMREM/environment and water targets | p2:3783–3794 PMREM refresh/disposal; p2:4124 water target | [from the code] Targets have explicit owners; prior PMREM target disposed on replacement. Need runtime size/format/mip ledger. Sharing with scene.environment and materials prevents indiscriminate disposal. |
| Frozen static-object registry FZ | p2:3566–3579 | [from the code] Strong references and transform snapshots; old code checks transforms, not attachment to scene. Detached subtrees can remain referenced. Byte count unknown. |
| Building LOD registry LOD16.E | p1:2373–2385; disposal p1:1398–1402 | [from the code] Entries retain L, det, gq and instance lists. `drop(L)` exists at 2384 but baseline has no call. Tick skips detached groups without deleting records. Stale retain depends on geometry reuse/visited world; not a measured monotonic leak. |
| City kept hidden, shared GLB assets | p1:4297; p2:3587 `G50.keep` | [from the code] Hiding is not unloading. Intentionally retained to avoid rebuild stalls; not automatically a leak. |

The table is not an exhaustive per-texture list at +60. `__MEMHUD.capture().textures` supplies an observed requested-storage row for each tracked WebGL texture, dimensions/format/mips/known bytes/source when available; buffers/renderbuffers are separate. Unknown format rows remain unknown and are counted. It does not infer bytes from file transfer size.

## Three independent savings patches (candidate, runtime review required)

1. `memlod.patch`: at disposeVillage p1:1399, call LOD16.drop(L, L.g) before ordinary teardown, only LOW/vlow, gated by `?memlod=0` and `?v50g5=0`. Removes registry strong references. The revised helper leaves instances under L.g for the existing teardown traversal, avoiding a duplicate dispose event, and disposes detached owned instances itself. Default drop(L) still disposes all owned instances. Does not dispose shared geometry/materials. A synthetic 20-cycle ownership test checks exactly one disposal per attached/detached instance and preserves unrelated owners; actual WebGL lifetime remains untested.
2. `memcrowd.patch`: p2:1696 and 1738, after all four vatPaint calls finish, dispose unused source Texture wrappers and clear CW.tex on LOW/vlow only. A nullable argument preserves future crowdSetup calls; vatMat never reads it. Gates `?memcrowd=0`, master. Rendered color/mask attributes and VAT textures are untouched. Potential source-image release is up to ~2 MiB RGBA-equivalent, not a measured RAM decrement. No `ImageBitmap.close()` is called while any asynchronous reader might need it.
3. `memfrz.patch`: p2:3568–3578, prune frozen candidates/registry entries no longer attached below scene, not merely direct-parent-null objects. Gates `?memfrz=0`, master, LOW/vlow. Does not free any visible geometry or alter attached-object transforms. Adds ancestor checks to the existing scan; CPU overhead unmeasured. Detached object matrixAutoUpdate is restored before dropping the registry reference.

None claims a fixed number of MB for stale scene records. GC timing, other roots and native allocations determine actual reclamation. The combination of memlod and memfrz is useful because either registry alone may keep a disposed village reachable.

Deferred larger finding: direct `membundle` fix would make EMB42.ready fulfill without AB while get() still hands independent slices to each parser. It changes PR #32's exact return line, so that patch is deliberately NOT included among the three independent patches. Integrate with #32 only after checking its separate early-parts Promise, which itself may retain the 13 buffers. Don't assume nulling AB alone fixes it.

## Proposed budget — [estimate], policy ceilings, not measured fit

| Accounted category | vlow cap MiB | LOW cap MiB |
|---|---:|---:|
| Live JS heap incl CPU attribute/backing arrays | 96 | 128 |
| Non-RT GPU texture payload | 64 | 96 |
| GPU vertex/index/instance payload | 48 | 64 |
| RT color/depth/renderbuffer payload | 16 | 32 |
| Sum of above steady accounted categories | 224 | 320 |
| Additional temporary encoded/decode staging ceiling during loading | 64 | 96 |

These intentionally count distinct CPU and GPU copies separately. JS heap measurements may not fully attribute ArrayBuffer/image backing stores; use heap snapshot + external/native evidence, not `performance.memory` alone. Browser/OS/driver allocator overhead, program binaries, compositor/default framebuffer, decoded images outside heap and caches are excluded/unknown, so 224/320 is NOT total Android process RAM. Initial engineering objective is to stay below these tracked categories, then measure real process headroom and tighten them. There is no universal safe tab threshold for a 4 GB phone. Cut confirmed stale owners first, then unneeded staging, oversized textures via the existing KTX2/atlas work, then measured residency. Do not cut spawn content or CPU data needed after context loss.

## Memory HUD and capture

`memhud.patch` inserts a diagnostic immediately after renderer creation p0:961, enabled ONLY by `?memhud=1`; normal execution exits before installing hooks. Visible strings are Arabic. It wraps actual WebGL allocation/deletion requests to tally known texture levels, mips, buffers, renderbuffers and FBO attachment subset. It reports renderer.info counts separately. RT textures are a SUBSET of total textures, never added twice. It shows JS heap only if `performance.memory` exists; on A14 it may be unavailable and GPU RAM is never exposed by that API. No exact device-wide or driver GPU memory is claimed.

Access: `window.__MEMHUD.capture()` returns serializable tables. `window.__MEMHUD.at60` records the first one-second sample at least 60 s after noticing G50.st.played. It is approximate (up to interval/scheduling delay), not an exact timer. Hook registration can add diagnostic CPU/JS overhead; benchmark with HUD off too. Failed GL requests, driver padding, shared backing, context restore, compressed subrange overloads and unknown formats require caution: this is a requested-storage ledger, not driver-confirmed occupancy. It does not hold scene objects, but diagnostic WebGL handle maps live until deletion/context-loss. Do not ship the HUD as a production memory profiler without browser testing.

Commands:
```
git checkout --detach 65fc5d3628908efc89ecac7496f2b93998bf6c53
git apply --check memlod.patch memcrowd.patch memfrz.patch memhud.patch
git apply memlod.patch memcrowd.patch memfrz.patch memhud.patch
cat v50g3/code/part-{000,001,002}.txt > /tmp/memory-combined.mjs
node --check /tmp/memory-combined.mjs
python3 -m http.server 8000
# In a separate directory/terminal:
npm install playwright
npx playwright install chromium
node capture-memory.cjs http://127.0.0.1:8000/ vlow output-vlow
node capture-memory.cjs http://127.0.0.1:8000/ low output-low
```
The runner is supplied and syntax-checked. A local vlow+HUD Chromium/SwiftShader attempt loaded code/assets but did not reach Play or produce a +60 capture before I stopped it. The shared laboratory had 1,983 MiB RAM with 192 MiB available and 1,626 MiB swap in use at inspection, with concurrent Chromium activity; this run is not a reliable timing or memory benchmark. No LOW run was performed. The runner now saves page errors and a pre-Play failure diagnostic on its own readiness timeout. It makes fresh browser contexts, clicks the actual enabled #sgPlay button, takes +0/3/10/60 screenshots, exports ledger and 15-second RAF intervals, then a separate post-GC desktop CDP heap snapshot. The snapshot can be opened in Chrome DevTools Memory for retainer paths. This is not an Android API. A page-error list is included. Use query switches in URL to compare each fix independently. All other patch switches should be 0 during a single-fix comparison.

Verify on actual phone: use USB remote Chrome DevTools for JavaScript heap snapshots; use Android process/PSS tools separately for process RAM and note they include browser/native/shared pages differently. WebGL has no standard exact per-texture GPU-memory query. Run fixed route to village/city/forest, wait +60, collect ledger and heap, leave/re-enter/unload 20 times and compare after GC. Confirm old LOD16/FZ retainer paths disappear, active world resources stabilize, no invisible meshes, and screenshots at +0/+3/+10 match baseline. Repeat on LOW, vlow, and kill-switches. Perform live tier transitions and context-loss/restore test. Flag >500 ms freezes; max RAF frame interval is a symptom, not GPU execution time. HUD diagnostic run and non-HUD performance run must be separated.

## Validation actually completed

- Each individual patch applies against exact baseline, combined three-part Node syntax PASS, git diff --check PASS.
- The four patches apply together; combined syntax PASS. `file-md5.json` includes individual edited-file digests and `combined-md5.txt` includes combined digests, computed from actual bytes.
- Synthetic HUD unit test passes 4×4 RGBA8 complete mip sum 84 bytes, 40-byte buffer, 32-byte depth, FBO texture subset, deletes to zero and absent performance.memory. This does NOT validate Chrome or a GPU driver.
- Source-level synthetic tests exercised the existing LOD16.drop helper over 20 disposal cycles while retaining an active owner, confirmed vatMat does not read its map argument, and checked nested detached-subtree detection. These do not prove gameplay/driver lifetime or a real 20-route-cycle leak test.
- Compared changed old-side lines of these patches with downloaded PR diffs #7, #8, #18, #21–#32: no changed-line intersection. This is not semantic compatibility proof or a merge test against every combination/head. PR heads may change.
- Baseline repository left unmodified after producing text patches. No user-visible world content, assets or UI changed except opt-in Arabic diagnostic overlay in the patch.

## Still needed

Actual +60 top JS retainers, every resident texture row, GPU allocations and process RAM; browser validation of the hooks; independent real savings; route/unload and 20-cycle leak tests; image/frame-time comparison; A14/MatePad support and stability; KTX2 transcoded format and decode peaks; visibility/identity confirmation. Text patches are review candidates, not a declaration that the memory objective is complete.

## Safety follow-up

The possible double-dispose in the first memlod draft was removed before GitHub publication. `drop(L, teardownRoot)` distinguishes descendants disposed by the existing village traversal from already detached owned instances. Attached meshes are not detached or disposed early. The default no-root helper retains its original disposal behavior. memfrz only removes references to objects outside the scene; its ancestor-walk CPU cost remains unmeasured. memcrowd does not close image bitmaps or clear any sampled VAT data. No patch is certified safe for merging without the runtime checks above.
