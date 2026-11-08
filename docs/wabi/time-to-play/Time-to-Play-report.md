# Time-to-Play: measured partial audit and portable profiling patch

Status: profiling package delivered; requested three new performance fixes are NOT implemented or validated. The host did not reproduce the supplied emulator baseline. It would be misleading to select three safe optimizations or promise the requested Play targets from this run.

## Scope and source

Repository: mustafashqair/open-world-game. Baseline: tab/v50g3 at 65fc5d3628908efc89ecac7496f2b93998bf6c53. No optimization commits, branches or PRs were created during the investigation. This publication adds only the diagnostic report and tools under docs/wabi/time-to-play; the game sources remain unchanged. An isolated local checkout was used for temporary profiling changes.

The user-requested v50g3/index.html is absent at this commit. The real loader is root index.html. p0/p1/p2 below mean v50g3/code/part-000.txt, part-001.txt, part-002.txt. Lines refer to the unmodified baseline, not the inserted instrumentation.

Evidence labels: [measured: user emulator] is supplied by Mustafa, not reproduced here. [measured: host] is this Linux localhost/SwiftShader run only. [from the code] is inspected baseline text. [estimate] is a hypothesis, never a measured saving.

## Outcome and why the baseline is not reproduced

[measured: user emulator] Original Play time is about 52 s on vlow and 71–79 s on LOW; download before Play about 129 MB and 161 MB respectively. These are not A14 timings. The statement that A14 is slower is user context, not verified here.

[measured: host] The first vlow profiling run timed out waiting for Play after the runner's 240 s timeout. Export happened later, after the main thread responded. The last exported G50 state remained base, ready=false, progress approximately 0.406, step “بناء الأرض”. Play was not reached; no first-gameplay screenshots or frame-time acceptance result exists.

[measured: host] A follow-up with Service Workers blocked and trace enabled also failed to yield a complete export: the managed command ended on its runtime timeout (exit -9). Do not treat this as an OOM diagnosis or as a Play measurement. At an intermediate observation this machine had about 2 GiB RAM and about 218 MiB available, with multiple Chromium process trees. Those observations do not isolate the cause of delay. Neither run is a controlled reproduction of the original emulator.

The retained raw first-run JSON is baseline-vlow.json. It was collected with the initial profiling overlay; its misleading marker names are corrected in the portable patch: EMB42-network-end becomes EMB42-bodies-ready, and EMB42-decode-end becomes EMB42-parse-templates-end. Never interpret the old names literally.

## Timeline table

All numeric values in this table are [measured: host], elapsed seconds from this navigation, rounded for readability. Pending means absent/unobserved, not zero.

| Milestone | Elapsed | Interpretation |
|---|---:|---|
| Navigation | 0 | navigation origin |
| Code part 000 text ready | 0.933 | fetch plus text consumption |
| Code part 001 text ready | 1.001 | same |
| Code part 002 text ready | 1.152 | same |
| Main module body begins | 7.673 | after static import resolution/evaluation; not parsing start |
| EMB42 requests launched | 16.793 | after synchronous boot reached embedded pack loader |
| Last EMB42 responseEnd | 16.863 | ResourceTiming, Service Worker involved |
| G50 created | 18.900 | timing origin for its internal base measurement, not navigation |
| TREESET.ready assigned | 19.051 | baseline flag, not all tree variants uploaded |
| All EMB42 arrayBuffer continuations resolved | 92.468 | NOT network completion |
| EMB42 concatenation completed | 92.519 | callback elapsed after body completion |
| Embedded parse/template handlers completed | 105.967 | includes scheduling, decoding and template work, not isolated parser CPU |
| cityReady first evaluated true | 197.288 | may use the code's timeout; original run did not distinguish timeout vs all keys |
| MODELS.ready assigned | 247.429 | export occurred after the runner wait timeout |
| Chunk count reaches gate requirement | pending | not observed in retained marks |
| LOADX reaches gate progress | pending | not observed |
| WARM2 FX wait/start/end | pending | not reached/observed |
| G50 force / compile / warm / ready | pending | remains in base |
| g50ready / Play enabled | pending | no completion claim |

## Long poles: what the evidence supports

[measured: host] Long Tasks API recorded 140 tasks totaling 230.116 s; the largest was 77.277 s starting at navigation +7.636 s and ending at +84.913 s. Another lasted 54.588 s starting at +142.272 s. Attribution was “unknown”; the API is not a stack profiler.

[measured: host] All embedded responseEnd timestamps precede +16.864 s, yet their body continuations ran at +92.468 s. This is roughly a 75.6 s scheduling/body-consumption gap on THIS run. The large main-thread task overlaps that gap. Therefore calling the +92.468 s mark “network time” would be wrong.

- Main-thread blocking: demonstrated on the host. Exact functions and CPU versus synchronous software-GPU/driver waits are not isolated. A trace on the original measurement machine is required.
- Network-bound: not established as the host's EMB long pole. The first run used a Service Worker; page-only CDP totals omit worker traffic. Network on 4G remains unmeasured.
- GPU/compile-bound: SwiftShader is software rendering, not Mali-G57. No per-pass GPU time or isolated compile duration was obtained, so this category remains unknown.
- Pure waits/tours: visible in code, not measured in this run because the relevant milestones were not reached. Do not claim their entire nominal timeout as removable saving.

## Bytes and waterfall

[measured: host] Retained ResourceTiming has 166 entries with transferSize sum 4,057,656 bytes and decodedBodySize sum 85,342,282 bytes. These are DIFFERENT metrics and neither is an authoritative whole-page cold-download total. EMB entries report transferSize zero with Service Worker involvement while encoded bodies sum 10,508,040 bytes. This does not mean the pack used no physical network.

[from the code] EMB42 uses 13 parts totaling 10,508,040 bytes (p0:1041–1044). Its declared pack size agrees with the observed body-size total, but that does not validate total page traffic.

The portable runner captures request start/end, initiator and CDP encodedDataLength. summarize.cjs groups completion bytes by observed milestones and explicitly lists cross-boundary requests; bytes are charged at completion, not fictitiously divided across phases. Use Service Worker blocked and allowed runs as separate experiments. Browser/worker/CDP coverage limits remain explicit.

## Exact code diagnosis and candidate plan

Read PR #30's full audit before selecting changes. Existing #30–#32 already test terrain-tour gating, mergeGeo preallocation and earlier EMB42 fetch. Do not clone those experiments under new names. Requested PR diffs #7, #8, #18, #21–#32 were retrieved for boundary checks; this profiling overlay intentionally touches gate/loader locations and is a temporary baseline overlay, not a claim of conflict-free cherry-picking into every PR.

[from the code] p0:977 makes cityReady true for the required NPC/house/shop keys plus shop readiness OR after 120000 ms. A true return does not prove all visuals exist. p0:1054–1062 finishes MODELS after loaded count or its other fallback paths; readiness likewise is not proof of every renderable asset.

[from the code] p1:4883–4898 mixes model/tree/terrain progress, advances LOADX at 0.9 per simulation second, and requires chunks.size>=12, model/tree/city readiness, progress>=0.999, WARM2.ok and G50.gate. p2:3393 may wait up to 20000 ms for FX; p2:3380–3406 tours city and nearby village and restores home. The tour prewarms objects; deleting it without proving first-gameplay coverage is unsafe.

| Priority candidate, not implemented | Required evidence and expected seconds saved | Stutter/pop-in risk | Phone memory impact |
|---|---|---|---|
| Spawn-ready gate plus bounded background warm scheduling | [estimate] Unknown until original-emulator timeline and spawn dependency set exist. Bound saving by measured non-overlapping off-spawn waits, never by summing parallel lanes. | High if an object/shader/terrain tile is needed during the initial movement or camera rotation. Keep spawn terrain, player/NPC templates, collisions and required shader variants resident and warmed. | [estimate] May reduce initial residency, but keeping background decode and spawn residency together can increase peak memory; measure before adopting. |
| Worker geometry build / decoder scheduling for a trace-proven hotspot | [estimate] Unknown. First attribute original-emulator long tasks to merge, parse, normalization, scene mutation or driver work; moving bytes is not moving all GLTFLoader work. Existing #31 already handles merge allocation. | Medium/high. Three Object3D/DOM/GPU mutations stay on the main thread; worker messages must not cause one large merge/upload burst after Play. | [estimate] Transferable ArrayBuffers can avoid copying, but transient input/output and ownership changes must be inventoried; no MB promise. |
| Split/compress required versus distant pack payload, reusing #14 where suitable | [estimate] Unknown cold-localhost saving; 4G saving requires measured transferred-byte reduction and network throughput, accounting for decode/transcode cost. #32 already starts EMB fetch earlier. | High if a supposedly distant asset is visible from spawn or asynchronously changes a template already instantiated. | [estimate] Compression can reduce residency for supported GPU textures; decompression/transcode can add transient memory. A Service Worker helps repeat visits only, not this cold target. |

[estimate] Relative to the user-supplied baseline, hitting the requested targets requires roughly 27 s improvement on vlow and 36–44 s on LOW. These are arithmetic target gaps, not predicted savings. No evidence here supports promising them. No new production fix is called safe, and no new draft performance PR is supplied. The concrete next deliverable needed is the original-emulator baseline JSON/trace/screenshots, followed by trace-directed implementation of independent candidates.

## Profiling package and MD5

Files: ttp-instrumentation.patch, profile.cjs, summarize.cjs, instrument.py, README.md, md5-manifest.json, raw baseline-vlow.json, initial-overlay.patch and this report.

The patch is temporary and enabled only by ttpprof=1 on saved vlow/low, disabled by v50g5=0. It adds no visible strings/assets/placement changes. MEDIUM/HIGH profiling collection remains off, but this is not a claim that the instrumented source bytes or execution overhead equal production. Do not merge diagnostic code as a performance fix. Joined-module syntax, runner syntax and git diff whitespace checks passed locally. The complete portable patch was not validated through a successful Play run.

Computed MD5 of each edited profiling file (not optimization file):
- index.html: e3d1f5f2b99c2f3863c90d68cb91f38b
- v50g3/code/part-000.txt: 84f76ceb630befeec7d09180b78e2d1d
- v50g3/code/part-001.txt: ee03efb55d37ccc13d3cb5dcc4ee23b2
- v50g3/code/part-002.txt: cee8348ccf24a84127eb9efa57714c55

## Verification and remaining limits

Follow README commands on the SAME quiet emulator configuration as the supplied baseline; use independent fresh contexts and report all samples. Instrument localhost and a separately specified 4G profile independently. Capture enabled Play, then Play+0/+3/+10 s; record first-15s maximum RAF gap, long tasks and actual pass timers. Add scripted camera turns and departure from spawn; the supplied runner only stays at the spawn view. Reject missing ground/NPCs, pop-in, or a delayed upload freeze, even if Play itself is earlier. Report every >500 ms gap.

Not verified: original emulator reproduction; LOW host timeline; target phone or MatePad; real 4G waterfall; full phase byte totals with Service Worker enabled; V8 stack attribution; CPU versus driver split; any successful Play; initial gameplay screenshots/frame times; memory peaks; safe worker ownership; MEDIUM/HIGH regression; or three new optimization savings. Missing milestones remain pending/unobserved, not zero or absent work.
