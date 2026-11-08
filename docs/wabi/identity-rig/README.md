# Deterministic behaviour identity rig — experimental patch, not an identity certificate

Base: `tab/v50g3 @ 65fc5d3628908efc89ecac7496f2b93998bf6c53`.
The real entry page is root `index.html`; baseline has no `v50g3/index.html`.

## What is delivered

- `det1.patch`: opt-in fixed-dt frame hook and state adapter, plus ticketed async commit experiment. Changes the three part files; no UI/assets/placements.
- `runtime-init.js`: pre-navigation seeded RNG, Date/performance clock, RAF/timer scheduler and ordered-commit harness support; only runs with `?det=1&detPreset=vlow|low`, and not with `?v50g5=0`. Normal page runs do not install it. MEDIUM/HIGH are excluded by the pre-navigation gate.
- `run.mjs`: local static overlay server and Playwright runner, pins PR heads, creates scratch source overlays, runs baseline twice before A/B, records schema/counts/first numeric or entity difference. No push, commit or PR.
- `compare.mjs` and `selftest.mjs`: unrounded numeric state comparison, SHA-256 logs, fail-closed coverage and deliberate `1e-6` test.
- `nondeterminism-inventory.json`: baseline file:line/source for every lexical match of the documented entropy/clock/timer/async patterns in the four requested files (304 source lines; a line can have several classes). It is an auditable source index, not a claim of complete semantic closure.

## Latest test evidence

- `node selftest.mjs`: PASS; a deliberate 1e-6 NPC position difference is detected and empty/missing coverage fails closed.
- `node scheduler-test.mjs`: PASS; reversed async completion commits in ticket order while fixed ticks continue.
- Patched concatenated game source passes `node --check`; source patch passes `git diff --check` and applies to a clean checkout of the exact base.
- Full-game same-build vlow/village A/A: INCOMPLETE. Two fresh-context runs remained in G50 base at 10.8% / 17.3% progress and 12 / 18 fixed ticks; zero gameplay rows. See `results/repair-final/`. No requested PR comparisons were run.

## Important limitation

Latest observed: after fixing runner clock progression and adding an ordered async commit experiment, two base-vlow-village A/A runs still did not reach G50 ready. They stopped in G50 base at 10.8% and 17.3% progress after 12 and 18 fixed ticks, and emitted no gameplay rows. Earlier routing/watchdog issues are described in `REPORT.md` and retained results. These are incomplete test runs, not A/A or PR identity verdicts.


This is an executable experimental rig, NOT a completed deterministic implementation of the entire game. Native worker message order, image decode callbacks, third-party module initialization and Promise/I/O completion are still uncontrolled. Seeding one shared RNG is insufficient when those callbacks consume it in a different order. The runner therefore tests A vs A first, and refuses to report A/B identity if that prerequisite fails. It never calls a sampled match a complete proof. These remaining sources must be controlled before this can certify any PR. `?det=1` alone does not install early scheduler hooks: run through Playwright, otherwise the patch emits a clear missing-harness error.

## Install and run

From an unpacked bundle (Node >=20):

```sh
npm install
npx playwright install --with-deps chromium
node selftest.mjs
# Full matrix: vlow/LOW x village/city/wild; 1,800 fixed steps = 60 test seconds
node run.mjs --repo /absolute/path/open-world-game --fetch --out ./results-001
```

`--fetch` fetches only the seven named PR heads into local `refs/det/prN`; it never changes a remote. The runner reads the pinned hashes from Git objects and fails on conflicts. `gc6` applies #33, #34, #35, #36, #37 sequentially to a detached scratch worktree. It does not silently resolve conflicts. Use a new `--out` directory for each run. `base` must remain in `--variants` (default includes base/pr26/pr29/gc6). Assets are read from the supplied baseline checkout; source parts come from exact Git objects plus the same harness patch. Do not pass a checkout with changed assets as the baseline. Root HTML and non-part scripts must be identical for compared builds; this rig is specifically for these source-only PRs, not arbitrary full-site branch differences.

```sh
# Short harness smoke, not the requested sixty-second certification
node run.mjs --repo /absolute/path/open-world-game --variants base --presets vlow --scenarios village --smoke --out ./smoke-001
# Tighten to every frame; costs much more disk/serialization time
node run.mjs --repo /absolute/path/open-world-game --fetch --every 1 --out ./results-every-frame
```

Each browser gets empty storage plus the selected preset before any document script. Auto down-tier is disabled. Local HTTP serves assets with no-store. Browser uses SwiftShader and a fixed viewport, not A14 hardware. Remote third-party dependencies still need network access; errors and failed URLs are retained in run JSON. Pin/cache those dependencies before a release-grade comparison.

## Scenarios and interpretation

The existing menu `SG50.play()` must reach `G50.st.played`; the runner never bypasses readiness. Scenario anchors come from the actual baseline world: nearest village to spawn, city centre, first existing bandit camp. No entities are invented or added. After teleport the script walks forward for 600 steps, right for 600, back for 600. The same start time/weather and camera angles are applied in both builds. Teleport is part of test-mode semantics; it is not a production spawn-equivalence test. Wild must actually contain both wolves and bandits in its snapshots or returns coverage failure. A camp alone does not guarantee wolf coverage.

Default records every step plus final step. Set `--every 30` for lower-frequency sampled logging. A result is “sampled-state-match” only over these samples; between-sample divergence is possible. Default `--every 1` provides a first-frame diff; with coarser sampling, “frame” is the first sampled frame, not necessarily the first true divergent frame. Snapshot projection includes all direct scalar entity fields (x/z/face/state/chat timers etc.), selected nested goal/path/POI/home data, camera transform, player, weather, camps and each array including empty mount/vehicle array. UUID/graphics trees are intentionally excluded. Nested target-object references, animation mixer internal state and closure state are not completely represented. The readout is useful for finding regression, not a mathematical proof of full hidden state.

`summary.json` has baseline repeat and requested comparisons. A mismatch returns sample index, tick and exact JSON path, e.g. `$.state.npc[17].values.x`, with both unrounded values. Full rows are in per-run JSON; `hash` is SHA-256 of canonical trace (no rounding/tolerance). `-0`, non-finite numbers and null are distinguished. Missing/empty traces and zero NPC count fail, as do missing wild wolves/bandits. An empty vehicle array is reported as zero, never vehicle coverage. No vehicle motion is claimed if none exists in the baseline.

To add a scenario, extend only the runner's anchor selection and scripted input plan, with a new name and per-scenario coverage requirement in `coverage`. Use real map anchors and existing entities. Record exact coordinates in the result. To exercise combat/dialogue, add frame-indexed keydown calls through the existing UI event handlers; do not merely set key bits for one-shot actions (J/E handlers are event based at part-001:4316-4321).

## Why fixed dt changes behaviour

The frame receives exactly 1/30 s and vlow wall-clock frame cap is bypassed in test mode. Production dt and frame pacing differ. Timers/Date/performance also follow the test clock; boot timeout decisions can differ from real loading. The test can compare two builds under the SAME artificial schedule once repeatability is demonstrated; it does not establish production, visual, performance or collision equivalence on Android. Do not globally freeze native time in a real player session. Crypto is deliberately replaced with test entropy only inside this isolated test context; never use test mode for sign-in/payment/security work.

## Source audit findings and remaining fixes

- `part-000:26` Date/performance epoch for loading/retry bookkeeping; `part-000:977` real-time city timeout; `part-002:3421-3424` G50 phase times; `part-002:3646-3656` frame cap, dt and wall-clock bookkeeping. Controlled by early clock plus dt patch.
- `part-000:1937-1953` weather/time/random lightning; `part-001:474-484` random animal/wolf setup; `part-001:526-554` random wolf decisions; `part-002:3613` animation phase randomization. Seeded, but shared stream remains sensitive to async consumption order.
- `part-001:250-258` up to three terrain Workers apply `addChunk` on message arrival. NOT fixed by this draft. Next required change: attach monotonically assigned chunk tickets, queue completion data, dispatch by request order at a fixed-step barrier; do not disable terrain or skip pending chunks merely to get a pass.
- `part-000:40-58` image-bitmap resize promises and loader callbacks; `part-000:1041-1090` EMB42 async bytes/decode; `part-002:1300-1308` fauna loader queue and callback-triggered spawns. NOT fully ordered. Required: preserve a recorded request manifest and deliver all decoded results at fixed logical asset-boundary ticks before advancing simulation; network failures must invalidate a trace.
- `part-002:2708` independent fire RAF and `part-002:4382` late-NPC interval; index `1052-1079` menu readiness timers. Captured by early scheduler. The timer ID ordering is deterministic only if async registration order also becomes deterministic.
- No `crypto` use matched in requested four source files; third-party code may use it. The early adapter supplies it for that purpose. `Math.random` grep count is matching lines, not invocation count.
- Additional modules, libraries, audio, decoder workers and native timers may introduce other entropy. The source inventory does not cover the repository's external module graph exhaustively.

## Memory/disposal and isolation

Context closes after each run, so timers/RNG overrides/resources cannot leak into next run. Runtime stores no unbounded frame history inside the game; rows are collected externally in Node. This is diagnostic overhead and must not be included in performance benchmarks. It does not change the production shader, texture or scene-disposal pathways. Do not merge before boot scheduling and baseline reproducibility are resolved. This work is being exposed as a documentation-only draft PR with the patch and test harness as review artifacts, not applied to game runtime.

## Retained longer-watchdog result

The second baseline smoke initialized the game, but stayed in G50 `base` and did not reach readiness under the configured 120-second evaluation watchdog. It produced no gameplay trace. This is not a measured production load time and does not identify the cause. Exact attempts are retained under `results/long-watchdog`; requested PR comparisons remain unrun.
