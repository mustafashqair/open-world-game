# Cyberpunk 2077

Scope: RT Overdrive preview, April 2023; do not conflate raster, hybrid RT and path-traced modes.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] C1/C2 identify path tracing as the Overdrive lighting upgrade. [استنتاج] It unifies direct/indirect visibility conceptually, but exact sampling and denoising budgets are not established by the consulted excerpts. Raster probes, separate AO, shadow cascades and contact methods cannot be inferred from this mode.

Cost estimate [استنتاج]: Very high for traced transport and reconstruction. Browser substitute: authored local bounce and reflection environments with a small number of direct lights.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Atmosphere — fog, volumes, aerial perspective and clouds

[استنتاج] Illuminated haze supports night-time light separation; the consulted Overdrive sources do not establish fog/cloud internals or whether each volumetric light participates in the path-traced solution. Treat atmospheric shafts as a separate implementation decision.

Cost estimate [استنتاج]: High for many shadowed volumes; low/moderate for bounded analytic haze or a few authored light cones.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Materials — PBR, terrain, detail normals and wetness

[استنتاج] Reflected emissive colour and roughness variation are useful goals when comparing traced lighting. Exact PBR layers, road/terrain blending, detail normals and wetness model are not established here. Never fake wetness solely by making dielectric roads metallic.

Cost estimate [استنتاج]: Low for roughness response; high for dynamic reflections and trace/denoise traffic. Local environments are cheaper but miss off-screen dynamic detail.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Vegetation — density, wind and LOD

[استنتاج] These reports focus on urban lighting, not a procedural vegetation system. Density, wind fields and plant LOD details remain unknown. The useful limitation is that a night-city lighting study does not justify denser forests in this game.

Cost estimate [استنتاج]: Moderate/high for conventional foliage and its shadows; no Cyberpunk-specific cost can be isolated from these sources.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Post processing — tone mapping, bloom, grading, AA and DOF

[تحليل صحفي] C1 places Overdrive in a high-end DLSS reconstruction context and distinguishes frame generation from reconstruction. [استنتاج] Tone curve, bloom, grade, native TAA/sharpening and DOF kernels are unknown in these sources. Neon glow is not proof of a particular bloom implementation.

Cost estimate [استنتاج]: Low for grading; moderate for bloom; very high for a complete traced/reconstructed pipeline. DLSS is not a callable WebGL2 pass.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Draw distance and LOD transitions

[استنتاج] Tracing quality depends on represented geometry and off-screen data, but these sources do not disclose streaming distances, TLAS strategy or LOD fades. In a raster browser implementation, spend on stable silhouette proxies and local reflection consistency.

Cost estimate [استنتاج]: High working-set cost for a rich traceable world; a few local probes have bounded memory at the price of spatial inaccuracy.

Sources: [C1: Cyberpunk RT Overdrive: a closer look](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-a-closer-look-at-the-path-tracing-upgrade), [C2: Cyberpunk RT Overdrive: how is path tracing possible?](https://www.digitalfoundry.net/articles/digitalfoundry-2023-cyberpunk-2077-rt-overdrive-how-is-path-tracing-possible-on-a-triple-a-game).

## Transfer to this repository

[استنتاج] Take light/material coherence and emissive highlight restraint. Reject path tracing, hardware RT and neural reconstruction as WebGL2 deliverables; this is a reference for desired light relationships, not feature parity. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
