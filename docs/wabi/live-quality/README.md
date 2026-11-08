# Live quality switching — evidence and drafts

Base: `tab/v50g3` at `65fc5d3628908efc89ecac7496f2b93998bf6c53` (Three.js r170). This folder contains the complete source inventory, switching report, baseline and PR occurrence data, four independent baseline patches, exact-head integration patches, tests and recorded results.

## Draft implementation PRs

- [#42 — core live-preset dispatcher](https://github.com/mustafashqair/open-world-game/pull/42)
- [#43 — lifecycle, culling, merge and freeze](https://github.com/mustafashqair/open-world-game/pull/43), depends on #42
- [#44 — lighting/material restoration](https://github.com/mustafashqair/open-world-game/pull/44), depends on #42; for PR #17 use the exact-head integration patch instead of applying both
- [#45 — static-prop representation](https://github.com/mustafashqair/open-world-game/pull/45), depends on #42 and #43

All are separate draft PRs. Do not merge based on these isolated tests: full-game and target-device acceptance is still outstanding, and one synthetic switch+render diagnostic exceeded the 500 ms limit.

## Start here

Read `live-quality-report.md` for scope, the 144-occurrence baseline inventory, PR-head classifications, design, tests, limitations, and memory-work ownership notes. Read `tests/README.md` and `integration/README.md` for reproduction instructions. `live-quality-switching-bundle.zip` packages this folder's report, patches, evidence, tests and data files.

The report preserves the original >500 ms synthetic result (502.9 ms; earlier maximum 1718.2 ms). A separately instrumented SwiftShader diagnostic split hooks, renderer submission, readback and hashing; its aggregate maximum was 351.3 ms, but this is a different run and a tiny fixture, not the game. No actual game-wide fresh-load parity, Android timing, or gameplay acceptance is claimed. The optional `05-shadow-release.patch` is an unmerged candidate requiring #42; its object test does not prove GPU allocator reclamation or game parity.

No changes to game source are in this documentation PR. Existing PRs #42–45 remain untouched.
