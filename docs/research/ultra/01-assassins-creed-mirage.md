# Assassin’s Creed Mirage

Scope: 2023 current-gen console comparison, with PC settings references.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] M2 describes dynamic time of day and bounced illumination; M1 compares shadow quality across console modes. [استنتاج] A consistent warm sun/cool sky relationship is a useful adaptation. The exact GI representation, probe placement, AO algorithm, cascade count and contact-shadow method are unknown; Anvil ancestry does not prove AC4 techniques survived unchanged.

Cost estimate [استنتاج]: Moderate for sun plus environment lighting; high if GI and long shadow coverage are evaluated dynamically. Shadow-map storage and caster redraw scale with coverage/resolution.

Sources: [M1: Digital Foundry — Mirage, current-gen console analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles), [M2: IGN — Mirage Performance Review](https://me.ign.com/en/assassins-creed-mirage/214254/feature/assassins-creed-mirage-performance-review), [A1: Assassin’s Creed IV: Road to next-gen graphics](https://bartwronski.com/wp-content/uploads/2014/03/ac4_gdc.pdf).

## Atmosphere — fog, volumes, aerial perspective and clouds

[تحليل صحفي] M1 reports volumetric fog preserved between modes; M2 describes dense fog and crepuscular rays. [استنتاج] Their visual function is separating Baghdad roof/sky layers. Exact volumetric grid, cloud representation and aerial-scattering model are unknown.

Cost estimate [استنتاج]: High for volumetric sampling; lower-resolution evaluation is the useful trade. Analytic depth/height haze is a cheaper approximation, not the same effect.

Sources: [M1: Digital Foundry — Mirage, current-gen console analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles), [M2: IGN — Mirage Performance Review](https://me.ign.com/en/assassins-creed-mirage/214254/feature/assassins-creed-mirage-performance-review).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] M2 identifies physically based materials in its accessible opening. [استنتاج] Roughness separation between masonry, fabric and metal explains more than texture size alone. Terrain blend weights, detail-normal layering and wetness response are not documented by these sources; treat any browser versions as independent designs.

Cost estimate [استنتاج]: Low for parameter calibration; moderate for added detail/terrain texture samples; wetness can be low with an existing weather uniform, expensive with reflections.

Sources: [M2: IGN — Mirage Performance Review](https://me.ign.com/en/assassins-creed-mirage/214254/feature/assassins-creed-mirage-performance-review).

## Vegetation — density, wind and LOD

[تحليل صحفي] M1 observes plant/tree LOD reductions in faster modes, especially Series S. [استنتاج] Retain silhouette and restrained wind rather than matching species or density. Wind field and leaf shading internals are unknown. The repository forbids palms and cypress even if references contain them.

Cost estimate [استنتاج]: Moderate to high: alpha coverage and shadow casters often dominate; instance count alone is insufficient to predict cost.

Sources: [M1: Digital Foundry — Mirage, current-gen console analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] M3 documents DOF toggles and DLSS/FSR/XeSS settings. [استنتاج] Warm grading and restrained highlight bloom are design lessons; exact tone curve, bloom chain and native temporal resolve are unknown here. Upsampler availability does not identify all native AA paths. Sharpening must be judged in motion.

Cost estimate [استنتاج]: Low for a fused grade; moderate for bloom/DOF; high working-set and validation burden for temporal reconstruction.

Sources: [M3: TechPowerUp — Mirage graphics settings](https://www.techpowerup.com/review/assassin-s-creed-mirage-benchmark-test-performance-analysis/3.html), [M1: Digital Foundry — Mirage, current-gen console analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles).

## Draw distance and LOD transitions

[تحليل صحفي] M1 reports geometry/plant LOD reductions at 60fps, similar textures and fog, and smooth city streaming in the tested scenes. [استنتاج] Prioritize readable roof silhouettes before increasing distant clutter. Fade timing, hysteresis and exact distances are unknown.

Cost estimate [استنتاج]: High if visibility radius grows indiscriminately; bounded LOD selection is moderate, with CPU streaming and upload costs too.

Sources: [M1: Digital Foundry — Mirage, current-gen console analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2023-assassins-creed-mirage-delivers-a-polished-experience-on-all-current-gen-consoles).

## Transfer to this repository

[استنتاج] Use atmospheric depth and stable building silhouettes first. Keep existing content exclusions; no Baghdad objects or vegetation species are requested. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
