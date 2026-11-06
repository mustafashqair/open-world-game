# COMMA_TASKS.md - work queue for Comma (coding agent)

Owner: Mustafa (mustafashqair). Roles agreed 2026-11-06:
- **Comma**: writes the code; analyzes other games with REA and Ghidra.
- **Tab**: reviews Comma's PRs, runs perf/pixel tests, publishes, does trailer + 3D assets.

## How to work
1. Clone this repo, then `python3 tools/join_large_files.py` (rebuilds split files under large-files/), then `python3 -m http.server`.
2. One branch per task: `comma/<task-id>` (e.g. `comma/v50g4-1-shaders`). Never push to `main`.
3. Open a PR per task. In the PR write: what changed, which presets it touches, how to switch it off (URL flag), and your own fps/draw-call numbers if you measured.
4. Every change must be behind a URL kill-switch flag (pattern used so far: `?v50g2=0`, `?v50g3=0`).

## Hard rules (Mustafa's standing decisions)
- **HIGH preset: identical output. MEDIUM: pixel-identical.** Perf changes go to **LOW and very-low only** unless proven pixel-identical.
- Arabic only in all UI text.
- Never add: the sheikh character, hy3d models, "!" over guards, NPCs near the palace or its garden, clothing clipping into the ground, cypress / palm / snow.
- Animation: real mocap only, no foot sliding.
- Don't redo what already exists: fixed-step physics (1/60, 4-step cap), very-low pixel ratio 0.55, no shadows on very-low.
- Report emulator numbers plainly as emulator numbers (not verified on the real target devices: Galaxy A14 4 GB / Mali-G57, MatePad SE 11).

## Current state
- Live build: v50g2 (very-low perf pass). v50g3 (merge3 + lights3 tint fix + perf-pass-1 patch on LOW/very-low) is being finished by Tab; it is not on `main` yet. Base your branches on `main`, and expect a rebase once v50g3 lands.

## Task queue
### v50g4 - performance, LOW + very-low only (source: docs/research/3-comparison-vs-peers.md)
1. **v50g4-1** Close shader-variant coverage + one upload/attach scheduler (~2 ms slice per frame + a byte cap) so there are **0 new linkProgram calls after Play** (currently 38).
2. **v50g4-2** KTX2/Basis for the largest textures, with pre-sized LOW and very-low variants (currently 0 KTX2, 49 WebP).
3. **v50g4-3** World-wide residency byte budget (not only terrain chunks) + reject stale terrain-worker results.
4. **v50g4-4** Real 30 fps pacing from raw timestamps (1000/30 deadline; today it's a 25 ms gate) + auto-quality from raw (unclamped) dt + optional pixel-area cap on LOW/very-low.
5. **v50g4-5** Shared active-animation budget across all NPC families on LOW/very-low.

### Later (do not start until Mustafa/Tab say so)
- ULTRA preset ("فائقة") above HIGH.
- Combat v2.5 (not live until Mustafa reviews it).
- v50h city layout; v50i KTX2 + gravel/EXR (overlaps v50g4-2).

### Research track (REA / Ghidra)
- Analyze other open-world / mobile games for techniques that fit the rules above. Write findings to `docs/research/comma-<game>.md` (what they do, evidence, how it would map to this codebase, which preset).
