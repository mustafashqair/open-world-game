# Source register and evidence policy

Research date: 2026-11-07. Public sources only. No installed commercial game, executable inspection, GPU capture or proprietary asset extraction was used. No game code, shader or asset is reproduced.

[مصدر أولي/محاضرة مطور] = primary source/developer talk; [تحليل صحفي] = journalistic analysis; [استنتاج] = inference or proposed adaptation. A source link supports only the stated observation, not an entire engine family. Unknown details stay unknown. Search excerpts and partial extractions are identified below.

## M1 — Digital Foundry — Mirage, current-gen console analysis

[تحليل صحفي] Thomas Morgan, 2023-10-08. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles).

Access/scope: Full article. Geometry/plant LOD and shadows are scalability levers; volumetric fog remains across modes.

## M2 — IGN — Mirage Performance Review

[تحليل صحفي] Michael Thompson, updated 2023-10-21. [Source](https://me.ign.com/en/assassins-creed-mirage/214254/feature/assassins-creed-mirage-performance-review).

Access/scope: Accessible opening only: time of day, GI bounce, dense fog and crepuscular rays. No unpublished algorithm details inferred as facts.

## M3 — TechPowerUp — Mirage graphics settings

[تحليل صحفي] W1zzard, 2023-10-06. [Source](https://www.techpowerup.com/review/assassin-s-creed-mirage-benchmark-test-performance-analysis/3.html).

Access/scope: Search-returned settings excerpt: DOF toggle, upsamplers, adaptive resolution. Not a shader implementation source.

## O1 — Digital Foundry — Origins PS4/Pro analysis

[تحليل صحفي] David Bierton, 2017-10-28. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis).

Access/scope: Full article. Extended draw distance, foliage stability, materials and temporal-AA analysis; checkerboard attribution explicitly uncertain in this early report.

## A1 — Assassin’s Creed IV: Road to next-gen graphics

[مصدر أولي/محاضرة مطور] Bartlomiej Wronski, Ubisoft, GDC 2014. [Source](https://bartwronski.com/wp-content/uploads/2014/03/ac4_gdc.pdf).

Access/scope: Search-indexed slide excerpts and GDC abstract: irradiance probes and volumetric fog. Background only: not proof of Origins or Mirage implementation.

## R1 — Digital Foundry — RDR2 PC at 60fps

[تحليل صحفي] Richard Leadbetter and Alex Battaglia, 2019-11-11. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

Access/scope: Article including console-equivalent settings table: SSAO, GI quality, volumetrics, TAA, grass/tree LOD, shadows, POM.

## R2 — Tech Focus: Volumetric Lighting

[تحليل صحفي] Digital Foundry. [Source](https://www.youtube.com/watch?v=G0sYTrX3VHI).

Access/scope: Search-returned transcript opening explains RDR2 sunsets, cloud shafts and fog. No proprietary pass count established.

## W1 — Digital Foundry — Witcher 3 next-gen PC

[تحليل صحفي] Alex Battaglia, 2022-12-20. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

Access/scope: Article: RTXGI probes, RTAO, RT shadows/reflections, screen-space grass shadows, ultra-plus foliage, upgraded assets. Launch-build observations, not a current performance verdict.

## G1 — Real-Time Samurai Cinema

[مصدر أولي/محاضرة مطور] Jasmin Patry, Sucker Punch, SIGGRAPH 2021. [Source](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html).

Access/scope: Extracted slides: relit SH grid/location probes, sky visibility, interior masks, reflection probes, physical sky, custom tone mapping. Extraction stops within specular section; no claims about later implementation details.

## G2 — Procedural Grass in Ghost of Tsushima

[مصدر أولي/محاضرة مطور] Eric Wohllaib, Sucker Punch, GDC 2021. [Source](https://www.youtube.com/watch?v=Ibe1JBF5i5Y).

Access/scope: Search-returned developer transcript and indexed slide deck: tiles, jitter, culling, compute generation, wind and 15/7-vertex LODs. Ideas only; WebGL2 cannot directly reproduce the compute/indirect pipeline.

## H1 — Nubis, Evolved

[مصدر أولي/محاضرة مطور] Andrew Schneider, Guerrilla, SIGGRAPH 2022. [Source](https://www.guerrilla-games.com/read/nubis-evolved).

Access/scope: Full developer abstract and indexed slide deck. Separates HZD origins from HFW cloud environments; no HZD timing transferred to browser.

## H2 — Adventures with Deferred Texturing in Horizon Forbidden West

[مصدر أولي/محاضرة مطور] James McLaren, Guerrilla, 2022-07-25. [Source](https://www.guerrilla-games.com/read/adventures-with-deferred-texturing-in-horizon-forbidden-west).

Access/scope: Full developer abstract: visibility prepass, compute shading, software variable-rate shading, overlap with G-buffer and cascaded shadow maps.

## H3 — HFW upgraded performance mode

[تحليل صحفي] John Linneman with Giliam de Carpentier, 2022-06-13. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-wests-upgraded-performance-mode-delivers-a-dramatic-improvement).

Access/scope: Full article, including verbatim developer explanation of historical AA output reuse, motion vectors, history rejection and sharpening. Developer quotations qualify as primary evidence where explicitly cited.

## H4 — HFW Digital Foundry tech review

[تحليل صحفي] John Linneman, 2022-02-14. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-west-the-digital-foundry-tech-review).

Access/scope: Search-returned article and video overview establish cross-generation visual tiers; not a source of precise GI/shadow settings.

## C1 — Cyberpunk RT Overdrive: a closer look

[تحليل صحفي] Richard Leadbetter, Digital Foundry, 2023-04-11. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade).

Access/scope: Full accessible article: path-traced mode and high-end reconstruction context.

## C2 — Cyberpunk RT Overdrive: how is path tracing possible?

[تحليل صحفي] Alex Battaglia, Digital Foundry, 2023-04-22. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

Access/scope: Search-returned overview; architectural lesson, not a browser cost estimate.

## K1 — KCD2 is an old-school technical success on PC

[تحليل صحفي] Alex Battaglia and William Judd, Digital Foundry, 2025-02-20. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

Access/scope: Full article: sparse voxel cone-traced diffuse GI, experimental two-bounce setting, reflection limitations, vegetation and smooth traversal.

## F1 — The technology of Forza Horizon 5

[تحليل صحفي] John Linneman, Digital Foundry, 2021-11-04. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

Access/scope: Accessible article extraction through car shading: quality tiers, 4x MSAA, scenery shimmer, clearcoat/bent normals, launch RT limited to specified viewing modes. Later updates not generalized.

## F2 — FH5 art team explains skies

[تحليل صحفي] Chris Scullion, VGC, 2021-06-29. [Source](https://www.videogameschronicle.com/news/forza-horizon-5s-art-team-explains-how-it-got-the-skies-to-look-so-realistic/).

Access/scope: Search-returned report quoting official Let’s Go developer video: camera-captured sky presets. Source video not independently reviewed.

## D1 — Death Stranding PC tech review

[تحليل صحفي] Alex Battaglia, Digital Foundry, 2020-07-14. [Source](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review).

Access/scope: Article: SSAO, SSR, TAA/FXAA/DLSS/CAS, DOF and model-distance options, shadow-setting ambiguity, texture cache.

## D2 — Decima lighting and anti-aliasing

[مصدر أولي/محاضرة مطور] Guerrilla and Kojima Productions, SIGGRAPH 2017. [Source](https://www.realtimerendering.com/advances/s2017/DecimaSiggraph2017.pdf).

Access/scope: Read extracted opening and height-fog section. Kojima analytic height fog combined with precomputed scattering; Horizon AA section is not automatically Death Stranding implementation proof.

## Cost vocabulary

All game cost assessments are structural estimates [استنتاج], not measured milliseconds, VRAM totals or reconstructed commercial render graphs. Low: parameter/ALU changes inside an existing draw; moderate: extra texture traffic, bounded near-field geometry or low-resolution screen effect; high: repeated scene draws, substantial alpha overdraw, history buffers or long ray marching; very high: dynamic GI/path tracing and large working sets. These are workload descriptions, not comparable benchmark scores. Each game table states a cost for its whole row; unknown implementations cannot be assigned a reliable pass count. Browser allocation arithmetic is derived separately in ULTRA_PLAN.md.
