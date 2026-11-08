# Reproduce isolated tests

These are scope-limited harnesses, not a full-game acceptance suite. The report gives the required whole-game matrix.

Use a separate clone/worktree, never another author's working branch. Fetch the four named wabi/livepreset-* branches; validate recorded heads in prs.json. Apply 01-core.patch, 02-lifecycle.patch, 03-lighting.patch, 04-props.patch in order to exact base 65fc5d3. Run from that combined repository root, using an absolute path to this tests directory:

```
node /path/to/tests/core.cjs
node /path/to/tests/lifecycle.cjs
node /path/to/tests/lighting.mjs
node /path/to/tests/props.mjs
```

lifecycle/props read their independent draft branches using git show; do not omit those local refs. three170.mjs is the Three.js r170 module used in object tests.

For GPU harness, install Playwright 1.65.0 in a separate tools directory and its Chromium (`npm install playwright@1.65.0; npx playwright install chromium`). Set `PLAYWRIGHT_MODULE=/absolute/tools/node_modules/playwright`. The fixture serves repository vendor/three170/build/three.module.js and writes ../deliverables/gpu-fresh.json, so create that output directory relative to the repository first. Run:

```
PLAYWRIGHT_MODULE=/absolute/tools/node_modules/playwright node /path/to/tests/gpu-fresh.cjs
```

full-game.cjs assumes the assembled repository is ../runtime relative to the working repository, and ../deliverables is output. Adapt these explicit paths when relocating. Its current attempt timed out, and it does not constitute the requested full matrix. Every Playwright run should have an outer wall-clock timeout and retain partial data before evaluating a possibly stalled page.

Additional diagnostic: run `gpu-timing-split.cjs` exactly like gpu-fresh.cjs. It retains hooks/render submission/readback/hash durations separately; it is not an actual game frame benchmark. Run `node /absolute/path/to/tests/shadow-release.mjs` for the additional optional shadow-release object test. Its default patch is the sibling `../05-shadow-release.patch`; set SHADOW_PATCH to override.
