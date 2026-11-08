# Horizon Forbidden West

Scope: Base game 2022 and patch 1.16. Burning Shores cloud upgrades are not treated as base-game features.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[مصدر أولي/محاضرة مطور] H2 explicitly mentions cascaded shadow map rendering in the deferred-texturing overlap. [استنتاج] These sources do not establish the exact GI/probe scheme, AO method, cascade count or contact-shadow solution. A shared sun direction and coherent sky energy are independent adaptation goals.

Cost estimate [استنتاج]: Moderate-to-high for shadows and indirect data. Native compute overlap cannot be counted as “free” in a serial browser pipeline.

Sources: [H2: Adventures with Deferred Texturing in Horizon Forbidden West](https://www.guerrilla-games.com/read/adventures-with-deferred-texturing-in-horizon-forbidden-west), [H4: HFW Digital Foundry tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-west-the-digital-foundry-tech-review).

## Atmosphere — fog, volumes, aerial perspective and clouds

[مصدر أولي/محاضرة مطور] H1 describes Nubis evolving from sky clouds into fly-through cloud environments and storm VFX in HFW, with mitigations for temporal artefacts. [استنتاج] Exact fog/aerial-perspective settings and sample budget are not given by the abstract. HZD cloud timings are not HFW or WebGL2 timings.

Cost estimate [استنتاج]: High: many 3D samples, lighting evaluation and intermediate targets. Keep cloud work lower resolution and separate from the cheaper aerial-perspective term.

Sources: [H1: Nubis, Evolved](https://www.guerrilla-games.com/read/nubis-evolved).

## Materials — PBR, terrain, detail normals and wetness

[مصدر أولي/محاضرة مطور] H2 describes a visibility-buffer prepass followed by compute analysis/shading for foliage and alpha-tested geometry. [استنتاج] This establishes a scheduling strategy, not terrain layer equations, detail normals, wetness or a particular PBR variant. Those material choices remain unverified here.

Cost estimate [استنتاج]: Moderate texture bandwidth for layered surfaces; high engineering cost for a visibility-buffer redesign. No WebGL2 compute API exists, so do not port the native architecture literally.

Sources: [H2: Adventures with Deferred Texturing in Horizon Forbidden West](https://www.guerrilla-games.com/read/adventures-with-deferred-texturing-in-horizon-forbidden-west).

## Vegetation — density, wind and LOD

[مصدر أولي/محاضرة مطور] H2 addresses foliage/alpha-tested shading cost with deferred texturing and software variable-rate shading. [تحليل صحفي] H3 shows foliage shimmer was a major launch issue. [استنتاج] Exact wind/density/mesh-LOD budgets remain unknown.

Cost estimate [استنتاج]: High overdraw and sampling cost; density without reconstruction stability can reduce perceived quality. Browser adaptation should cull tiles and limit near-field coverage.

Sources: [H2: Adventures with Deferred Texturing in Horizon Forbidden West](https://www.guerrilla-games.com/read/adventures-with-deferred-texturing-in-horizon-forbidden-west), [H3: HFW upgraded performance mode](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-wests-upgraded-performance-mode-delivers-a-dramatic-improvement).

## Post processing — tone mapping, bloom, grading, AA and DOF

[مصدر أولي/محاضرة مطور] The developer quotation in H3 explains reusing previous AA output, motion-vector improvement, history rejection, a reprojection kernel and output sharpening. Bloom/DOF ordering complicated history handling. [تحليل صحفي] H3 reports revised grading/light placement. [استنتاج] Exact tone curve and blur kernels are unknown.

Cost estimate [استنتاج]: High integration complexity and history traffic; bloom/DOF may be moderate separately. Camera-only reprojection cannot stabilize deforming foliage correctly.

Sources: [H3: HFW upgraded performance mode](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-wests-upgraded-performance-mode-delivers-a-dramatic-improvement).

## Draw distance and LOD transitions

[تحليل صحفي] H4 describes distinct cross-generation visual tiers. [استنتاج] Exact world LOD fade ranges are unknown. H2 shows saving shading work is as important as geometry reduction; horizon silhouettes and midground foliage need separate budgets.

Cost estimate [استنتاج]: High at large visible radii; moderate for bounded visibility and shading tiers. Compute/graphics overlap figures do not transfer to WebGL2.

Sources: [H2: Adventures with Deferred Texturing in Horizon Forbidden West](https://www.guerrilla-games.com/read/adventures-with-deferred-texturing-in-horizon-forbidden-west), [H4: HFW Digital Foundry tech review](https://www.digitalfoundry.net/articles/digitalfoundry-2022-horizon-forbidden-west-the-digital-foundry-tech-review).

## Transfer to this repository

[استنتاج] Use cloud composition and foliage stability as quality criteria. Keep native deferred-texturing and compute-only optimizations as inspiration, not implementation commitments. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
