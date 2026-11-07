# Ghost of Tsushima

Scope: Original PS4 rendering described by developer talks, 2021.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[مصدر أولي/محاضرة مطور] G1 describes dynamic physical sky, relit quadratic SH probes on grids, tetrahedral location probes, sky visibility/bounce approximations and streamed reflection probes. Interior masks reduce light leaks. [استنتاج] AO implementation, sun cascade count and contact-shadow method are not established in the consulted extract.

Cost estimate [استنتاج]: Moderate for relit probes and streamed data; mostly local evaluation after data setup. Published PS4 microsecond figures are not portable GPU budgets for this project.

Sources: [G1: Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html).

## Atmosphere — fog, volumes, aerial perspective and clouds

[مصدر أولي/محاضرة مطور] G1 explicitly ties sky/clouds/haze/fog particles to a physical sky model and emphasizes dramatic weather. [استنتاج] Full volume dimensions and sampling rates are unknown from the consulted portion; a sun-aware analytic height haze captures part of the visual role.

Cost estimate [استنتاج]: Low-to-moderate for analytic haze; high for cloud/volume evaluation and overdraw. Keep composition and world scale coherent.

Sources: [G1: Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html).

## Materials — PBR, terrain, detail normals and wetness

[مصدر أولي/محاضرة مطور] G1 states physically based lighting/material values, some photogrammetry and deliberately adjustable art direction. [استنتاج] Exact terrain blending, detail normals and wetness are unknown here. Plausible roughness and low-frequency terrain colour variation are independent transferable designs.

Cost estimate [استنتاج]: Low for values and broad colour grouping; moderate for extra samples; photographs do not remove mip/residency costs.

Sources: [G1: Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html).

## Vegetation — density, wind and LOD

[مصدر أولي/محاضرة مطور] G2 describes tiled procedural placement, jittered grids, culling, compute-generated blade data and high/low blade topology; wind is central to art direction. Large coherent flower/grass swaths were preferred over mixed noise. [استنتاج] WebGL2 adaptation uses CPU/worker placement plus instancing, not compute or indirect draws.

Cost estimate [استنتاج]: High for widespread blade geometry and grass shadowing; moderate with tiled culling, instancing and distance tiers. CPU generation/upload cost must also be bounded.

Sources: [G2: Procedural Grass in Ghost of Tsushima](https://www.youtube.com/watch?v=Ibe1JBF5i5Y).

## Post processing — tone mapping, bloom, grading, AA and DOF

[مصدر أولي/محاضرة مطور] G1 identifies HDR, custom tone mapping, local tone mapping, white balance and a low-light colour shift in its overview. [استنتاج] Exact bloom, AA/sharpening and DOF algorithms are not verified by the consulted extract. Avoid transplanting the local-tone-map concept without testing halos.

Cost estimate [استنتاج]: Low for a global grade, moderate/high for local luminance pyramids and temporal smoothing; extra passes are not justified by cinematic appearance alone.

Sources: [G1: Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html).

## Draw distance and LOD transitions

[مصدر أولي/محاضرة مطور] G2 documents distance/frustum/occlusion culling and two blade LODs; G1 documents streamed lighting data. [استنتاج] Whole-world mesh fade timing is unknown. Instanced tiles should use shared deterministic seeds so LOD does not reshuffle placement.

Cost estimate [استنتاج]: Moderate selection overhead; high peak load if tiles retain both LODs during long fades.

Sources: [G1: Real-Time Samurai Cinema](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html), [G2: Procedural Grass in Ghost of Tsushima](https://www.youtube.com/watch?v=Ibe1JBF5i5Y).

## Transfer to this repository

[استنتاج] Rank coherent foliage grouping, shared wind and local irradiance above brute-force density. Preserve allowed tree species and palace exclusion zones. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
