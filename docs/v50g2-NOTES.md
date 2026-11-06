# v50g2 — very-low city performance (honest notes)

Scope: VERY-LOW only. Every change goes through `G2V(k) = !?v50g2=0 && S.preset === 'vlow' && ?g2<k> !== '0'`.
On LOW, MEDIUM and HIGH, `G2V` is false, so those presets run v50g's code paths. The off flag `?v50g2=0` turns everything back to v50g.

## What each change does (very-low)
1. **City fog / draw distance (`?g2city=0`)**: inside the city, fog closes in to ~80 m and fades back to normal between 20 and 120 m outside the wall. It is re-applied after the V17 colour pass, which had been pushing fog back out to ~240 m. CULL23 does not draw anything behind the fog.
   In the city, small props are hidden beyond 30 m (r<1.5 m) and beyond 60 m (r<5 m).
2. **Palace (`?g2pal=0`)**: the estate uses its existing far version unless the player is inside the palace/garden box (+10 m hysteresis). From the city centre this was ~200 draw calls.
3. **NPC thinking (`?g2npc=0`)**: the nearest 6 NPCs think every frame. NPCs under 30 m think every 2nd frame and NPCs 30–80 m away every 6th. Beyond 80 m they are frozen and hidden. NPCs are drawn only up to 50 m. NPCs that are angry or talking always run at full rate.
   Measured: NPC logic went from ~15 ms to ~3 ms per frame in the city.
4. **Minimap (`?g2mm=0`)**: redraws 3×/s instead of 10×/s, and background tile work runs only on those ticks. It went from ~5 ms to ~0.
5. **CULL23 throttle (`?g2cull=0`)**: the object scan runs every 45 frames instead of 15. The instance pass runs only when the camera moves 1.5 m or turns ~2.5°, with a small angular safety margin.
6. **Shader precompile + constant lights (`?g2pre=0`)**: the scene always has the same 4 point lights (nearest 4 real lights, plus zero-intensity dummies for any shortfall). Shaders therefore stay the same everywhere, and walking into the market or village no longer compiles new ones.
   The Lambert ("lite") variants of animal/NPC templates are also compiled before «لعب». New programs per spot went from 0/3/3/2 to 0/0/1/1.
7. **FPS label (all presets, label only)**: computed from real frame times instead of the 0.05 s-capped sim dt, which had floored it near 20. `?hudfix=0` gives the old label. The profiler exists only with `?prof=1`.

## Results (emulator, see LIVE.txt)
- Market 12 → 19 fps and forest 15 → 21 fps. City centre 11–12 → 15–16 fps. Draw calls in the city 328 → 124; triangles 633k → 392k.
- **The city is still under the 20 fps target in the emulator.** The 124 calls / 392k triangles are above the ≤60 / ~100k target. The far palace version plus city walls/houses inside 80 m still make up most of it.
- **Village (Tel al-Amal): no real gain.** 14.2–15.2 fps for v50g2, against a v50g baseline of 11.9 in one run and 16.6 in another. The village was not the focus, and its worst frame is noisy (260→422 ms in today's run).
- City p95 got slightly worse in today's run (104→133 ms) while p50 improved (86→63 ms). That is consistent with the throttled CULL23 scan doing its work in bigger, less frequent chunks. Worth watching on the real tablet.
- Software rendering is not a tablet GPU. The real-device fps will differ; only the v50g-vs-v50g2 ratio carries over.

## The HIGH "regression" that blocked publishing (investigated 2026-11-06)
- Symptom: in the first HIGH pixel run, v50g2 showed the city wall from the forest as a flat untextured brown slab, and the city/forest/last spots differed by 8–10%.
- Code audit: diffing game_g2 against stage-1 shows that every v50g2 hunk is behind `G2V`. G2L (constant lights) evaluates `on` once at init, and in the HIGH run its stats stayed real=0/hid=0/dum=0, so it never ran.
  The stage-1 diff against live v50g is the profiler (only with `?prof=1`) and the FPS label text.
  `?v50g2=0` and the default load the same code file, so on HIGH both take identical code paths.
- Evidence of timing noise in the old run: a burst of ~150 new shader programs happened right after Play in run B, at the market in the g2 run, and never in run A. The same thing happened today on MEDIUM, in the g2 run only.
  The old harness took its screenshot 2.5 s after teleporting, so streaming had not finished.
- Re-run with a harness that settles until the shader-program count is stable, teleports twice and waits ≥40 frames (h/px.mjs): every HIGH and MEDIUM spot is within the A-vs-B noise floor (table in LIVE.txt). The brown wall did not reproduce.
- Honest caveat: I did not find a code cause. I proved the leak is absent with a controlled re-run and a code audit. If Mustafa ever sees a flat wall on HIGH, it is a loading-timing issue that v50g has too.

## Rules kept
Sheikh stays deleted. No "!" over guards. NPCs are never near the palace/garden (frozen/hidden NPCs keep their positions). No content was deleted; far things are only hidden/simplified on very-low.
