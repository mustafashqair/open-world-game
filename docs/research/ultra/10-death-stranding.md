# Death Stranding

Scope: Kojima 2017 atmosphere presentation and 2020 PC release analysis, not the sequel.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] D1 identifies SSAO and SSR options, texture caching and ambiguous local shadow-resolution changes; the analyst found no clear medium/high shadow difference. [مصدر أولي/محاضرة مطور] D2 describes Decima lighting research but explicitly distinguishes techniques developed after HZD and work for Death Stranding. [استنتاج] Final GI/probe scheme, sun cascades and contact shadows remain unknown here.

Cost estimate [استنتاج]: Moderate for SSAO and environment data; high for additional local shadow/SSR work. Never transfer D1 percentage results to this repository or a phone.

Sources: [D1: Death Stranding PC tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review), [D2: Decima lighting and anti-aliasing](https://www.realtimerendering.com/advances/s2017/DecimaSiggraph2017.pdf).

## Atmosphere — fog, volumes, aerial perspective and clouds

[مصدر أولي/محاضرة مطور] D2 presents Kojima’s analytic height fog combined with precomputed atmospheric scattering, sharing sky/sun information to support realistic air and art-directed dense fog. [استنتاج] Shipping cloud ray-march/volumetric budgets are not established; the talk is development-era evidence, not proof of every final setting.

Cost estimate [استنتاج]: Low/moderate for analytic fog and LUT reads, much less structural work than a fully sampled volume. Clouds remain a separate potentially high-cost system.

Sources: [D2: Decima lighting and anti-aliasing](https://www.realtimerendering.com/advances/s2017/DecimaSiggraph2017.pdf).

## Materials — PBR, terrain, detail normals and wetness

[استنتاج] Large terrain forms with restrained roughness variation and local surface detail are transferable visual goals; D1/D2 do not establish final terrain layer equations, detail normals or rain wetness. D2’s GGX area-light discussion is engine research, not a complete final material inventory. No snow is proposed for this repository.

Cost estimate [استنتاج]: Moderate for near-field terrain/detail textures; high for reflection/refraction or displacement. Keep distant terrain frequency low and use mips.

Sources: [D1: Death Stranding PC tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review), [D2: Decima lighting and anti-aliasing](https://www.realtimerendering.com/advances/s2017/DecimaSiggraph2017.pdf).

## Vegetation — density, wind and LOD

[استنتاج] These sources do not quantify plant density or wind internals. Sparse terrain/vegetation composition is a useful alternative to filling every metre with grass; exact plant LOD transitions remain unknown.

Cost estimate [استنتاج]: Low/moderate when sparse and bounded, high if alpha overlap grows. Asset distribution matters as much as instancing.

Sources: [D1: Death Stranding PC tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] D1 documents TAA/FXAA, DLSS and CAS options, per-object motion blur, HDR and DOF. TAA can ghost; low internal DOF resolution can flicker even at high output resolution. [استنتاج] Exact tone curve, bloom and colour-grade implementation are unknown. D2 Horizon AA details are not automatically DS implementation details.

Cost estimate [استنتاج]: Low for a fused grade; moderate for DOF; history traffic/engineering for TAA. Neural DLSS is unavailable in standard WebGL2.

Sources: [D1: Death Stranding PC tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review), [D2: Decima lighting and anti-aliasing](https://www.realtimerendering.com/advances/s2017/DecimaSiggraph2017.pdf).

## Draw distance and LOD transitions

[تحليل صحفي] D1 shows model quality changes highest-LOD selection distance and finds only modest visual/load differences in its tests; texture settings mostly affect cache capacity until the lowest setting. [استنتاج] Exact crossfade algorithm unknown.

Cost estimate [استنتاج]: Moderate for local LOD range changes, potentially high residency pressure when texture cache and world range rise together.

Sources: [D1: Death Stranding PC tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2020-death-stranding-pc-tech-review).

## Transfer to this repository

[استنتاج] Choose analytic height fog, believable terrain scale and stable near-field detail. The atmosphere lesson fits this repository’s existing LUT-based system without rebuilding a native engine. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
