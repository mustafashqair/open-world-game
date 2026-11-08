# The Witcher 3 — next-gen

Scope: PC patch 4.0 launch analysis, 2022; distinguish raster and optional RT.

Evidence labels and access limits: [source register](SOURCES.md). Costs below are **qualitative structural estimates**, all [استنتاج]; no per-effect commercial timings were measured. “Unknown” means the consulted sources do not establish an implementation, not that the feature is absent.

## Lighting — sun/sky, GI, AO and shadows

[تحليل صحفي] W1 identifies probe-based RTXGI, RTAO, RT sun/moon shadows and reflections. It also notes screen-space shadows grounding grass and bugs involving RT shadows/HairWorks. [استنتاج] Raster cascade counts and contact-shadow implementation details are unknown. WebGL2 cannot run these hardware RT features through Three.js.

Cost estimate [استنتاج]: Very high for RT GI/reflections plus denoising; moderate for a browser probe approximation and bounded screen-space contact occlusion. These are different implementations.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Atmosphere — fog, volumes, aerial perspective and clouds

[استنتاج] Retaining depth layers across forests and open horizons is the adaptation; W1 does not establish cloud, volumetric-fog or aerial-scattering internals. Do not attribute all atmospheric appearance to RTXGI.

Cost estimate [استنتاج]: Low for analytic haze, high for ray-marched shadowed volumes; no isolated commercial timings found.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Materials — PBR, terrain, detail normals and wetness

[تحليل صحفي] W1 describes higher-resolution textures/new assets and cobbles becoming geometry; water gets SSR when RT reflections are off. [استنتاج] Exact terrain blend, detail-normal and wetness models are unknown. Roughness correctness is needed before adding reflection cost.

Cost estimate [استنتاج]: Moderate for richer textures/detail layers; high for extra geometry, SSR or RT reflections. Avoid replacing every small surface with real geometry.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Vegetation — density, wind and LOD

[تحليل صحفي] W1 shows ultra-plus increases both foliage density and distance significantly. Grass receives additional shadow grounding in the upgraded path. [استنتاج] Wind field and exact plant transition policy are unknown.

Cost estimate [استنتاج]: High: a simultaneous density and range increase compounds geometry, alpha coverage and shadow work.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Post processing — tone mapping, bloom, grading, AA and DOF

[استنتاج] A matched exposure/grade and controlled bloom are valid design goals; the consulted W1 extraction does not establish exact tone curve, DOF kernel, native TAA resolve or sharpening. Temporal upsampling should not be assumed from RTXGI presence.

Cost estimate [استنتاج]: Low for grade; moderate for bloom/DOF; high integration and history cost for robust temporal AA with moving foliage.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Draw distance and LOD transitions

[تحليل صحفي] W1 explicitly contrasts old ultra and new ultra-plus foliage distance/density. [استنتاج] It does not disclose crossfade intervals. Extend large crowns and terrain before individual blades; transition grass colour into terrain.

Cost estimate [استنتاج]: High for ultra-plus style visibility; bounded ranges plus silhouette proxies reduce working-set growth.

Sources: [W1: Digital Foundry — Witcher 3 next-gen PC](https://www.digitalfoundry.net/articles/digitalfoundry-2022-the-witcher-3s-next-gen-upgrade-is-beautiful-on-pc-but-performance-is-not-good-enough).

## Transfer to this repository

[استنتاج] Take the grass-grounding and local bounce-light lessons, using baked/local data and short screen-space effects. Do not promise RTXGI, ray tracing or Witcher-scale density in WebGL2. See the ranked [ULTRA plan](ULTRA_PLAN.md). No visual content from this game is proposed for import.
