# Red Dead Redemption 2

Scope: PC launch scalability and Xbox One X equivalents, 2019.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] R1 explicitly compares lighting/GI quality, SSAO, soft shadows, far shadows, long shadows and grass shadows. [استنتاج] It does not reveal the exact GI/probe data structure, cascade layout or contact-shadow algorithm. Natural occlusion and shadow range should be tuned independently.

Cost estimate [استنتاج]: Moderate for local SSAO; high for wide shadow coverage and dynamic GI. R1 shows distant shadows can be reduced while the presentation stays convincing; no browser speedup is inferred.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

## Atmosphere — fog, volumes, aerial perspective and clouds

[تحليل صحفي] R1 identifies near/far volumetric resolution separately; console settings can sit below PC low while still looking excellent. R2 discusses fog, cloud shafts and sunset scattering. [استنتاج] Exact cloud ray march and froxel structure unknown.

Cost estimate [استنتاج]: High sampling/bandwidth workload, highly sensitive to effect resolution. This is a strong argument for low-resolution volumes, not an argument for eliminating atmospheric depth.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps), [R2: Tech Focus: Volumetric Lighting](https://www.youtube.com/watch?v=G0sYTrX3VHI).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] R1 lists ultra-equivalent textures, high POM and water-refraction quality on Xbox One X. [استنتاج] Exact PBR BRDF, terrain blend layers, detail normals and rain-wetness equations are unknown in these sources; use independent roughness/albedo weather response.

Cost estimate [استنتاج]: Moderate for surface samples, high for POM and reflection/refraction; texture residency can be large without a corresponding per-pixel ALU increase.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

## Vegetation — density, wind and LOD

[تحليل صحفي] R1 finds console grass LOD near the lower end and grass shadows modest, while geometry LOD is high. [استنتاج] Wind implementation is unknown. Large landscape silhouettes need not imply distant individual grass blades.

Cost estimate [استنتاج]: High when density, distance, shadows and alpha overlap multiply; bounded near-field grass is moderate.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] R1 identifies TAA and disabled TAA sharpening in its console-equivalent table, with FXAA/MSAA disabled. [استنتاج] Filmic highlight control, bloom, grading and DOF are useful visual goals, but exact curves/pass topology are not established by R1.

Cost estimate [استنتاج]: Low for a fused grade, moderate for blur-based bloom/DOF, moderate-to-high traffic for temporal history. Avoid stacking sharpening onto unstable vegetation.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

## Draw distance and LOD transitions

[تحليل صحفي] R1 contrasts maximum geometry LOD with low grass/tree distance detail. [استنتاج] Exact crossfade algorithm is unknown; use distance tiers plus hysteresis and fog to keep transitions unobtrusive.

Cost estimate [استنتاج]: High if everything is extended; selective silhouette LOD offers better benefit per resident byte.

Sources: [R1: Digital Foundry — RDR2 PC at 60fps](https://www.digitalfoundry.net/articles/digitalfoundry-2019-what-does-it-take-to-run-red-dead-redemption-2-at-60fps).

## Transfer to this repository

[استنتاج] The central lesson is selective spending: low-resolution atmosphere and short-range grass can coexist with convincing terrain, lighting and detailed nearby materials. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
