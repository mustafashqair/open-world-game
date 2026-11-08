# Memory study: experimental text patches, not measured savings

Read [the report](memory-study.md) first. This documentation-only PR does not apply changes to game sources. Every patch is independently based on `65fc5d3628908efc89ecac7496f2b93998bf6c53`. All savings candidates require browser/phone validation before merge. HUD totals are requested-storage estimates, not exact GPU or process RAM.

## Prepare a disposable test checkout

```sh
git clone --branch wabi/memory-study-patches https://github.com/mustafashqair/open-world-game.git memory-study
cd memory-study
TOOLS="$PWD/docs/wabi/memory-study"
git worktree add --detach ../memory-baseline 65fc5d3628908efc89ecac7496f2b93998bf6c53
BASE_REPO="$PWD/../memory-baseline" node "$TOOLS/test-memfixes.cjs"
node "$TOOLS/test-memhud.cjs"
cd ../memory-baseline
# HUD first; add only ONE candidate per comparison. Reset only this disposable worktree between tests.
git apply --check "$TOOLS/memhud.patch" "$TOOLS/memlod.patch"
git apply "$TOOLS/memhud.patch" "$TOOLS/memlod.patch"
cat v50g3/code/part-{000,001,002}.txt > /tmp/memory-check.mjs
node --check /tmp/memory-check.mjs
python3 -m http.server 8000
```

Run a HUD-only baseline, then memlod, memcrowd, memfrz separately. Replace `memlod.patch` above with the candidate. Own switches `memlod=0`, `memcrowd=0`, `memfrz=0` and master `v50g5=0` restore old candidate behavior. HUD is opt-in `memhud=1`. Never reset a checkout containing unrelated work.

In another terminal (absolute TOOLS path):

```sh
cd /absolute/path/to/memory-study/docs/wabi/memory-study
npm install --no-save playwright@1.56.1
npx playwright install chromium
node capture-memory.cjs http://127.0.0.1:8000/ vlow output-vlow
node capture-memory.cjs http://127.0.0.1:8000/ low output-low
```

The supplied desktop runner explicitly uses SwiftShader and a fresh context, not an Android GPU. It saves +0/+3/+10/+60 screenshots, requested-storage ledger, first-15-second RAF intervals, page errors and a separate CDP heap snapshot. A readiness timeout saves failure evidence, not a pass. Use the exact emulator environment for comparisons; do not compare these laboratory timings with A14/4G numbers.

## Actual phone procedure

Serve the patched disposable checkout to the phone on the local network. Open with `?memhud=1` and set LOW or very-low in Arabic settings. Use USB remote Chrome DevTools to evaluate `JSON.stringify(window.__MEMHUD.capture())` at +60 seconds after Play, and take a Memory heap snapshot for retained paths. `performance.memory` is optional and commonly unavailable on Android; it never represents GPU memory. WebGL exposes no standard exact resident-GPU-byte query. Use Android process/PSS tools separately, preserving their accounting definitions.

Follow identical village/city/forest routes on baseline and each candidate, 20 leave/unload/re-enter cycles, and target-tier switches. Check retained old village paths, stable active-resource counts, screenshots at +0/+3/+10, invisible meshes and first-15-second max frame gap. Report any >500 ms freeze. Test context loss/restoration. Run performance comparisons again with HUD off because diagnostic hooks add work. Do not call any memory reduction verified until actual heap/ledger/process evidence supports it.

Return the ledger JSON, heap snapshots, screenshots, route/switch description, Chrome/device version and first-15-second RAF data. Actual +60 memory inventory and measured savings remain unfinished.
