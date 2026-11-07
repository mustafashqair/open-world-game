# Kingdom Come: Deliverance 2

Scope: PC launch, February 2025.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] K1 describes sparse voxel octree cone-traced diffuse GI, increasingly coarse voxels at distance, indirect occlusion and coloured bounce; experimental mode uses two real bounces before a light cache. Specularity remains cubemap/SSR based. [استنتاج] Separate AO implementation, sun cascade count and contact shadows are unknown.

Cost estimate [استنتاج]: High for voxel data, cone tracing and updates; two-bounce mode is not an appropriate phone baseline. Baked irradiance/occlusion can approximate the result at lower dynamic fidelity.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Atmosphere — fog, volumes, aerial perspective and clouds

[استنتاج] Forest depth should retain air/light separation, but K1 does not establish the atmosphere/cloud algorithms. CryEngine branding alone is insufficient to attribute a specific volumetric path or configuration.

Cost estimate [استنتاج]: Low for analytic haze, high for cloud and shadowed fog sampling. No isolated KCD2 atmosphere timings established.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] K1 observes plausible diffuse surfaces under GI but weaker specular/reflections, including water SSR disocclusion and metallic surfaces mismatching surrounding darkness. [استنتاج] Exact BRDF, terrain blending, detail normals and wetness are unknown. Diffuse and specular environments must agree.

Cost estimate [استنتاج]: Low for consistent material values; moderate for texture layers; high for reflection fixes involving extra scene renders.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Vegetation — density, wind and LOD

[تحليل صحفي] K1 emphasizes dense vegetation working with indirect light to produce rural ambience. [استنتاج] Exact grass density, wind algorithm and vegetation LOD thresholds are unreported; do not invent blades-per-square-metre values.

Cost estimate [استنتاج]: Moderate/high from coverage, geometry and shadows; lit low-frequency canopy shape may matter more than extra blades.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Post processing — tone mapping, bloom, grading, AA and DOF

[استنتاج] K1 supports the overall colour/occlusion result but does not establish exact tone mapping, bloom, grading, TAA/sharpening or DOF kernels. Exposure should be tested at forest-to-courtyard transitions instead of hiding lighting errors in a grade.

Cost estimate [استنتاج]: Low for a grade, moderate for bloom/DOF, extra history/bandwidth for temporal filtering. No isolated per-effect measurements.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Draw distance and LOD transitions

[تحليل صحفي] K1 reports smooth traversal and consistent frame times in tested rural/urban areas, even on a mainstream CPU at medium settings. [استنتاج] This is not a universal no-stutter guarantee or a documented LOD fade algorithm. Camera motion and streaming must be tested independently from still images.

Cost estimate [استنتاج]: High potential CPU/IO/upload spikes; bounded queues and residency are prerequisite work, not evidence that voxels are cheap everywhere.

Sources: [K1: KCD2 is an old-school technical success on PC](https://www.digitalfoundry.net/articles/digitalfoundry-2025-kingdom-come-deliverance-2-is-an-old-school-technical-success-on-pc).

## Transfer to this repository

[استنتاج] Prioritize plausible occlusion/bounce in shaded areas, and match specular environment intensity to diffuse lighting. Do not build an SVOGI engine for this WebGL2 phase. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
