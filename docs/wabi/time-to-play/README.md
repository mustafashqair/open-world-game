# Reproducible Time-to-Play profiling overlay

This is temporary instrumentation against `tab/v50g3` at `65fc5d3628908efc89ecac7496f2b93998bf6c53`, not a performance optimization or merge-ready PR. It changes no assets, placements, visible Arabic strings or render settings. Profiling has overhead. `?ttpprof=1` enables collection only for saved `vlow` or `low`; `?v50g5=0` disables it. Existing production kill-switch behavior is not altered.

The requested `v50g3/index.html` does not exist at this SHA. The actual loader entry is root `index.html`; the three code files are under `v50g3/code/`. Do not silently substitute a different branch's entry point.

## GitHub delivery: quickest route

The draft `wabi/ttp-profiling-report` branch contains documents/tools only. Its game source is the unchanged baseline. Apply the diagnostic overlay to a separate baseline worktree:

```sh
git clone --branch wabi/ttp-profiling-report https://github.com/mustafashqair/open-world-game.git ttp-tools
cd ttp-tools
git worktree add --detach ../game-ttp 65fc5d3628908efc89ecac7496f2b93998bf6c53
git -C ../game-ttp apply "$PWD/docs/wabi/time-to-play/ttp-instrumentation.patch"
# Terminal 1:
python3 -m http.server 8868 --bind 127.0.0.1 --directory ../game-ttp
# Terminal 2, from ttp-tools:
cd docs/wabi/time-to-play
npm init -y
npm install --save-exact playwright@1.65.0
npx playwright install chromium
TRACE=1 SW_MODE=block node profile.cjs vlow baseline-vlow-new
TRACE=1 SW_MODE=block node profile.cjs low baseline-low-new
node summarize.cjs baseline-vlow-new.json
node summarize.cjs baseline-low-new.json
```

Use `CHROME_EXECUTABLE=/absolute/path/to/your/chrome` before the runner command to match the original emulator. Return both new `.json` files, both `-trace.json` files, and the `-enabled.png` / `-plus0.png` / `-plus3.png` / `-plus10.png` screenshots if Play is reached. A timeout still produces diagnostic JSON when the page responds; missing screenshots are a failed/unreached gameplay stage, not a pass. The checked-in `baseline-vlow.json` is the failed host evidence, not the new run.

Read the remaining instructions before interpreting results: cold cache/service-worker mode, Chrome flags, resolution, CPU policy and localhost versus 4G must match or be reported separately. Profiling itself has overhead. Three optimization fixes remain pending measured evidence.

## Apply in a disposable worktree

```sh
git clone https://github.com/mustafashqair/open-world-game.git game-ttp
cd game-ttp
git checkout --detach 65fc5d3628908efc89ecac7496f2b93998bf6c53
git apply /absolute/path/ttp-instrumentation.patch
cat v50g3/code/part-{000,001,002}.txt > /tmp/ttp-combined.mjs
node --check /tmp/ttp-combined.mjs
git diff --check
md5sum index.html v50g3/code/part-{000,001,002}.txt
```

Compare the results to `md5-manifest.json`. `instrument.py` is the exact-source replacement generator for inspection/rebasing, not something to run after applying the patch. It asserts every anchor exists and must run only against a clean baseline under a sibling directory named `repo`.

## Run on the measurement machine

Use a quiet machine and the SAME Chrome binary, resolution, CPU policy, SwiftShader flags and server configuration as the original emulator. The runner defaults to a clearly labelled, service-worker-blocked cold run. A service-worker-allowed run is different; do not mix the two. It is not an A14 or 4G measurement.

```sh
# Outside the game folder, in an empty harness folder:
npm init -y
npm install --save-exact playwright@1.65.0
npx playwright install chromium
# Place profile.cjs in this harness folder.
# Terminal 1, from game-ttp:
python3 -m http.server 8868 --bind 127.0.0.1
# Terminal 2, from harness:
TRACE=1 SW_MODE=block BASE_URL=http://127.0.0.1:8868/ node profile.cjs vlow baseline-vlow
TRACE=1 SW_MODE=block BASE_URL=http://127.0.0.1:8868/ node profile.cjs low baseline-low
# Same configuration, but service worker allowed (new context each invocation):
TRACE=1 SW_MODE=allow BASE_URL=http://127.0.0.1:8868/ node profile.cjs vlow baseline-vlow-sw
```

The pinned Playwright version above is the version installed on this host; record actual Chrome version from the output `ua`. To use your emulator's installed Chromium, set `CHROME_EXECUTABLE=/absolute/path/to/chrome`. The runner supports this environment variable. `TTP_TIMEOUT` overrides the host timeout in milliseconds; it does not shorten any game gate.

For the real phone, apply only the patch, open `?ttpprof=1&q=mobile&lowauto=0`, use remote DevTools to set the saved preset before navigation, and export with `copy(window.__TTP.export())`. Use a new origin/context or clear CacheStorage AND unregister service workers for genuinely cold tests. A normal refresh, Disable cache alone, or HTTP cache clearing does not clear Service Worker caches. The in-page JSON does NOT include process-wide or GPU memory.

## Contents and interpretation

- `data.marks`: monotonic milliseconds since this navigation. Navigation start is exactly zero; code-part marks include body-to-text completion. `module-body-start` is after static imports resolve, not the beginning of JavaScript parsing.
- `EMB42-bodies-ready`: all `arrayBuffer()` consumers resolved; compare each ResourceTiming `responseEnd` before calling this network time. Main-thread blocking can delay consumers long after bytes arrive.
- `EMB42-parse-templates-end`: all embedded loader callbacks and their template-building handlers have returned; external city/NPC models are separate. This is not a pure GLTF parser CPU duration.
- Readiness marks record assignment/installation or first evaluated readiness. `cityReady-first-observed.detail.timeout` tells whether the source's timeout can make it ready. `TREESET-ready` is the baseline flag, not proof every tree asset or billboard exists.
- G50 records creation and every first phase transition. WARM2 records FX wait/start/end separately. An absent stage is pending/unobserved, not zero seconds.
- `data.tasks`: Long Tasks API with the browser's actual attribution. Attribution may be `unknown`; this is not a JavaScript stack profiler. The trace adds main-thread task, function and sampled V8 events where Chrome provides them. Open `*-trace.json` in DevTools Performance or Perfetto.
- `net`: CDP page-target response completion bytes, request initiator, times. For `SW_MODE=block`, this provides page traffic waterfall bytes including headers as reported by CDP. For `allow`, service-worker-target fetch/install traffic is not fully observed; totals are a LOWER BOUND. `data.resources` includes ResourceTiming encodedBodySize, decodedBodySize, transferSize and workerStart. Never substitute decoded size or a zero transferSize for physical network traffic.
- `snapshot`: actual preset, model counters, installed chunks, tree counters, LOADX/WARM2/G50 state, renderer.info. It helps identify a gate when Play never arrives.
- Screenshot files: enabled screen, then immediately after the click and at elapsed offsets corresponding to the requested +0/+3/+10s. Actual capture can be delayed by a blocked main thread; compare screenshot/trace timestamps, not filenames alone. The runner waits through the requested first 15s of gameplay and records RAF intervals in `data.frames`. A screenshot does not prove continuous motion or shader absence.
- `data.frames`: requestAnimationFrame gaps after the g50play event, capped to the first 15s. Maximum gap is a responsiveness proxy, not GPU render time. Use the existing GPU timer PR for real GPU durations; SwiftShader timings do not predict Mali-G57.

## Acceptance/rejection protocol

Keep baseline and each candidate on independent worktrees at the same base, run them sequentially, with a fresh browser context for every cold trial. Repeat enough times to characterize variance; publish the actual samples rather than selecting the fastest. Use the same camera and scripted movement in the first seconds. The included runner intentionally remains at the spawn camera; add approach/rotation input to validate the intended first-10s exposure.

Reject a candidate if Play+0/+3/+10 shows missing ground, NPCs or pop-in; report every >500ms first-15s frame gap, trace shader compile and max long task. Compare subsequent 4G-throttled runs separately from localhost. Save the raw JSONs, traces and screenshot images for both builds. Neither fewer transferred bytes nor a short force phase establishes a faster critical path.

The optimization shortlist needs measured stage data on the original emulator and this visual/first-frame validation before changes can honestly be called safe. No new optimization PR has been published by this profiling package.

## Build a table from an exported run

```sh
node summarize.cjs baseline-vlow.json
```

This writes baseline-vlow-summary.json. It fails on absent mark logs. Per-phase bytes are charged at response completion; crossing requests and missing CDP wall-clock mappings are explicit. Do not sum ResourceTiming body bytes and CDP transfer bytes. The initial raw host run lacks CDP wallTime fields, so its CDP entries cannot be safely attributed to phase; ResourceTiming is retained separately.
