# Forza Horizon 5

Scope: Launch console rendering, November 2021. Later PC RT/TAA changes are outside this evidence scope.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] F1 documents new bent-normal shading on car occluded regions and richer visual tiers. Launch RT in specified viewing/photo situations is not evidence for full-world RT GI. [استنتاج] Exact GI/probes, scene AO, cascade layout and contact shadows are unknown here.

Cost estimate [استنتاج]: Low/moderate for authored bent-normal/occlusion data and environment lighting; high for dynamic shadows or reflections.

Sources: [F1: The technology of Forza Horizon 5](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

## Atmosphere — fog, volumes, aerial perspective and clouds

[تحليل صحفي] F2 reports developer sky capture using synchronized cameras and weather presets. [استنتاج] A captured sky is a viable visual reference; exact cloud layering, local volumetrics and aerial perspective are not established by that report. Captured skies still need lighting/exposure matching.

Cost estimate [استنتاج]: Low runtime for a sky texture/dome, with residency cost; high for additional dynamic volumes. Do not compare capture storage size to shipped GPU memory.

Sources: [F2: FH5 art team explains skies](https://www.videogameschronicle.com/news/forza-horizon-5s-art-team-explains-how-it-got-the-skies-to-look-so-realistic/).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] F1 describes car clearcoat light response and bent normals. [استنتاج] Exact terrain/road blend, detail-normal and wetness equations are unverified. Restrict expensive layered materials to surfaces whose screen area warrants them.

Cost estimate [استنتاج]: Moderate for clearcoat and local detail samples; high for full-scene reflections. Environment data quality often beats raising texture resolution.

Sources: [F1: The technology of Forza Horizon 5](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

## Vegetation — density, wind and LOD

[تحليل صحفي] F1 highlights preserved distant silhouettes and richer quality-mode scenery; it also notes organic scenery shimmering under MSAA. [استنتاج] Wind field and numeric density budgets are unknown. Roadside motion makes consistent distant shading essential.

Cost estimate [استنتاج]: High for dense coverage and shadow passes; moderate with grouped instances and far proxies.

Sources: [F1: The technology of Forza Horizon 5](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] F1 identifies 4x MSAA across the launch console versions and observes it is less effective on organic scenery. [استنتاج] Exact tone mapping, bloom, grading, sharpening and DOF are unknown in the accessible part; do not claim launch TAA from later patches.

Cost estimate [استنتاج]: High memory/resolve cost for multisampling; low for grade, moderate for bloom/DOF. MSAA alone cannot solve shader/specular or alpha-tested foliage aliasing.

Sources: [F1: The technology of Forza Horizon 5](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

## Draw distance and LOD transitions

[تحليل صحفي] F1 separates quality/performance scenery tiers while keeping the world legible at high driving speeds. [استنتاج] Exact fade logic/distance thresholds are unknown. Maintain terrain/crown silhouettes; reduce fine roadside coverage before skyline detail.

Cost estimate [استنتاج]: High streaming pressure under fast traversal; LOD proxies save work only if their data replaces or bounds high-detail residency.

Sources: [F1: The technology of Forza Horizon 5](https://www.digitalfoundry.net/articles/digitalfoundry-2021-forza-horizon-5-xbox-series-technology-showcase).

## Transfer to this repository

[استنتاج] Use authored skies, carefully calibrated surface response and strong silhouettes. Do not assume all attractive skies need volumetric clouds or that 4x MSAA solves foliage. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
