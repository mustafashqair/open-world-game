# Behaviour-identity rig — result and limits

Status: partial delivery. A source patch, runner, exact commands, source audit and fail-closed comparator are provided. The requested complete deterministic game mode and PR identity certification are NOT established. No game-source change was published as executable code. The experimental source patch, runner and evidence are being published in a documentation-only draft PR against the requested base.

## Results

| Check | Observed result | Meaning |
|---|---|---|
| Comparator deliberate mutation | PASS: an NPC x change of 1e-6 is located; SHA-256 changes | Component test on explicit fixture state, not a game trace |
| Coverage guards | PASS: empty/short trace, missing entity category, zero NPC trace, and absent wild wolf/bandit coverage reject | It cannot claim success by hashing an empty trace |
| Numeric encoding | PASS: -0 differs from +0; NaN differs from null | Canonical logs preserve those distinctions |
| Isolated browser scheduler | PASS: two seeded runs match, timer/RAF order, 30 ticks, medium/master/off guards | Standalone Chromium page, not the game |
| Combined patched game syntax and whitespace | PASS: node --check on the concatenated parts; git diff --check | Parsing/static checks only |
| Baseline vs baseline | INCONCLUSIVE: no gameplay trace | Initial and longer-watchdog attempts did not establish readiness. After fixing runner clock progression and async commit scheduling, two additional A/A runs still stopped in G50 base at 10.8% and 17.3% progress, with 12 and 18 fixed ticks respectively; no state rows were emitted. The exact JSON is in `results/repair-final/`. |
| Base vs #26 | NOT RUN: baseline prerequisite not passed | No identity/equivalence claim |
| Base vs #29 | NOT RUN: baseline prerequisite not passed | No identity/equivalence claim |
| Base vs combined #33–#37 | NOT RUN: baseline prerequisite not passed | No identity/equivalence claim |

Watchdog values above are configured harness limits [from the code], not game load-time measurements. The smoke evidence is from localhost Chromium/SwiftShader, not an A14, 4G, production performance or a 60-second gameplay test.

## What this patch actually controls

With the pre-navigation runner and `?det=1&detPreset=vlow` or `low`, seed Math.random and test-only crypto, virtualize Date/performance, RAF and JS timers, inject fixed dt, choose a fixed weather/time/camera/input and real map anchor, and expose a state adapter. It reads scalar player and ST state, scalar NPC/animal/wolf/bandit/fauna/mount state, selected nested goals/paths/home/chat, camera and environment. It does not prove all hidden state has been captured.

Normal runs do not install the init script; the patched branches take their original dt/frame-cap expressions when DET1 is disabled. The early scheduler excludes MEDIUM/HIGH. This is code inspection, not a runtime byte-identity certificate. The text patch changes three source files only. It adds no entities, scene assets, placements or visible game UI.

The comparator and hashes use unrounded canonical numeric values. The default runner records every frame; `--every 30` is sampled-only. Native rendering/frame pacing, simulation under production variable dt, visible output and Android correctness are outside this test's claim.

## Why it is not a complete deterministic implementation yet

1. Terrain worker completions now have a ticketed ordered-commit mechanism in the patch, and the standalone scheduler test verifies reversed completion order commits in request order without blocking ticks. Full-game readiness still fails, so this change is not proven to control all terrain/asset ordering.
2. GLB/EMB42, image decode and callback-triggered fauna spawn ordering (`part-000:40–58,1041–1090`; `part-002:1300–1308`) remain native asynchronous operations. A shared seeded RNG alone cannot remove the effect of different callback order. Record and replay an asset/decode manifest at logical barriers; failed requests must invalidate a run.
3. Time-budgeted work now sees the virtual clock. For example `part-002:3306` advances a merge generator while a clock budget permits, and `part-002:3496` slices texture uploads by time. A fixed clock can collapse multiple production slices into one test tick. That changes scheduling and can make software-rendered boot expensive. Replace such budgets with deterministic item quotas in test mode before calling this schedule complete; do not disable work to obtain a pass. This is a source-based risk, not a proven cause of the observed watchdog.
4. World identity after bootstrap must be demonstrated before recording scenarios. The runner intentionally refuses PR comparisons until baseline repeatability succeeds. It does not reset/randomize away divergent game state to manufacture a match.
5. The inventory is a lexical source index of the four requested files, not a semantic proof covering external modules/decoder workers/audio/native tasks. Nested closure state, animations and object-reference AI targets are not fully represented.

## Files and reproducible commands

See README.md for installation, scenario extension and interpretation. From the unpacked folder:

```sh
npm install
npx playwright install --with-deps chromium
node selftest.mjs
node scheduler-test.mjs > scheduler-test-results-local.json
node run.mjs --repo /absolute/path/open-world-game --fetch --out results-new
```

The final command builds local scratch overlays and attempts the requested base/#26/#29/gc6 matrix for vlow/low and village/city/wild. It is an experimental attempt, not a guarantee it will finish on the receiving machine. Use a fresh output directory. Only the part files are overlaid; root HTML/assets/external scripts must be identical baseline content. A gc6 patch conflict is an error, not an automatic merge. The existing startup/menu readiness gates are used, not bypassed.

## Edited-file MD5 [computed]

These are the three local files after applying `det1.patch` to the specified base, not remote commit checksums. MD5 is supplied for reproducibility, not security. SHA256SUMS covers the delivered artifact files.

- `v50g3/code/part-000.txt`: `2f2cc26a54138f2f43a81b6ea0ebe300`
- `v50g3/code/part-001.txt`: `a572c1e89bfeb547d7f2931cee2dc770`
- `v50g3/code/part-002.txt`: `ffa2f8761e19c161240ebb6b5b22dd59`

MD5 is supplied for reproducibility as requested; it is not a security signature. SHA256SUMS covers the delivered artifacts.

## Remaining work

Resolve deterministic asynchronous completion and item-budget scheduling; expand hidden-state coverage; complete a baseline A/A run and all coverage checks; only then evaluate PR identity across the requested builds and scenarios. Latest two A/A runs remain incomplete, so no #26/#29/#33–#37 identity claim is supported. No pass/fail conclusion about #26, #29 or gc6 is supported by the current evidence.
