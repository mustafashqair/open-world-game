# Assassin’s Creed Origins

Scope: 2017 console analysis; early report has explicit reconstruction uncertainty.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] O1 reports a major lighting upgrade and broadly similar shadow quality across platforms. [استنتاج] Sunlit open terrain needs directional shadow structure plus sky fill. Exact GI/probe system, AO, cascade count and contact shadows are not established. A1 documents AC4 probes, not Origins probes.

Cost estimate [استنتاج]: Moderate for directional plus environment light; high for large caster coverage or dynamic indirect evaluation.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis), [A1: Assassin’s Creed IV: Road to next-gen graphics](https://bartwronski.com/wp-content/uploads/2014/03/ac4_gdc.pdf).

## Atmosphere — fog, volumes, aerial perspective and clouds

[استنتاج] The desert-scale visibility discussed in O1 motivates distance-dependent haze tied to sun/sky colour. O1 does not identify Origins volumetric grid, cloud renderer or aerial-perspective equations. Anvil’s earlier public volumetric work is context only, not a verified attribution.

Cost estimate [استنتاج]: Low for analytic haze fused into shading; high for shadowed volumes or cloud ray marching. No game-specific timing available.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis), [A1: Assassin’s Creed IV: Road to next-gen graphics](https://bartwronski.com/wp-content/uploads/2014/03/ac4_gdc.pdf).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] O1 observes improved materials and increased clarity of ground/rock texture detail with higher pixel counts, while texture filtering is similar. [استنتاج] PBR calibration, terrain blending and distance-faded normals are sensible adaptations; exact BRDF, blend masks and wetness equations remain unknown.

Cost estimate [استنتاج]: Low for calibration; moderate texture bandwidth for terrain/detail layers. Raising texture resolution increases residency even when shading time barely changes.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis).

## Vegetation — density, wind and LOD

[تحليل صحفي] O1 highlights abundant grass/plants and excellent consistency in motion, alongside heavier foliage scenes. [استنتاج] Density must be paired with stable sampling; wind and leaf LOD construction are unknown. Use only allowed existing species.

Cost estimate [استنتاج]: Moderate to high from foliage alpha overdraw, geometry and shadow casting; thin blades amplify AA requirements.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] O1 argues the evidence points to temporal AA, with reduced shimmer but softness; checkerboarding is explicitly unresolved in that report. [استنتاج] Exact tone mapper, bloom, LUT/grading, sharpening and DOF implementation are not established. Avoid presenting the analyst’s tentative AA conclusion as a developer disclosure.

Cost estimate [استنتاج]: Low for grade; moderate for bloom/DOF; temporal AA requires history traffic and rejection logic.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis).

## Draw distance and LOD transitions

[تحليل صحفي] O1 reports extended draw distances with less pop-in than predecessors and occasional streaming issues in cutscenes. [استنتاج] Exact transition technique is unknown. Keep far landforms while reducing small-object detail rather than blindly raising view radius.

Cost estimate [استنتاج]: High for residency/visibility growth; LOD and batching can reduce repeated draw work but do not remove streaming cost.

Sources: [O1: Digital Foundry — Origins PS4/Pro analysis](https://www.digitalfoundry.net/articles/digitalfoundry-2017-assassins-creed-origins-performance-analysis).

## Transfer to this repository

[استنتاج] Adopt coherent daylight, broad terrain readability and motion stability. Do not inherit AC4 implementation claims or any prohibited vegetation. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
