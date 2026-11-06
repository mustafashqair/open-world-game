// supply-daylight.js — runtime DAY-ONLY fill for the supply shop (supply-shop.glb / supply-shop-lite.glb)
// Wagon + shops fix 4. The baked lightmap is night-correct again (fix-2 darkness and lantern warmth);
// this module adds the daytime lift on the far shelves and lower corners only while it is day.
//
// Usage (three.js r150+):
//   import { addSupplyDaylight } from './supply-daylight.js';
//   const day = addSupplyDaylight(scene, supplyShopRoot);   // supplyShopRoot = gltf.scene of supply-shop(-lite).glb
//   ...every frame, or whenever your time of day changes:
//   day.update(dayFactor);   // 1 = full day, 0 = night (lights at 0), values in between fade (dawn/dusk)
//   day.dispose();           // when the shop is unloaded
//
// The lights are children of shopRoot, so they follow the shop's position/rotation/scale automatically.
// They stay in the scene at night with intensity 0 (no add/remove), so toggling day/night never forces a
// shader recompile. No shadows are cast (cheap on phones). Each light has a short range (distance) so it
// does not light the street outside the shop.
import * as THREE from 'three';

const LIGHTS = [
  // name,            local position (shop space, metres), base intensity, distance
  ['day_backshelves', [ 0.00, 1.35, -0.45], 2.6, 3.6],   // aimed into the far (back-wall) shelves
  ['day_corner_L',    [-1.55, 0.55, -0.85], 1.1, 2.2],   // lower-left back corner
  ['day_corner_R',    [ 1.55, 0.55, -0.85], 1.1, 2.2],   // lower-right back corner
];

export function addSupplyDaylight(scene, shopRoot, opts = {}) {
  const parent = shopRoot || scene;
  const color = new THREE.Color(opts.color ?? 0xfff2df);   // neutral, slightly warm daylight bounce
  const strength = opts.strength ?? 1.0;                   // global multiplier if the game's exposure differs
  const group = new THREE.Group();
  group.name = 'SupplyDaylight';
  const lights = LIGHTS.map(([name, p, base, dist]) => {
    const l = new THREE.PointLight(color, 0, dist, 2);
    l.name = name; l.position.set(p[0], p[1], p[2]); l.castShadow = false;
    l.userData.base = base;
    group.add(l);
    return l;
  });
  parent.add(group);
  let current = -1;
  const api = {
    group, lights, light: lights[0],
    update(dayFactor) {
      const f = Math.min(1, Math.max(0, Number(dayFactor) || 0));
      if (f === current) return;
      current = f;
      const k = f * f * (3 - 2 * f) * strength;           // smooth dawn/dusk fade
      for (const l of lights) l.intensity = l.userData.base * k;
    },
    dispose() { group.removeFromParent(); for (const l of lights) l.dispose?.(); },
  };
  api.update(opts.dayFactor ?? 1);
  return api;
}
export default addSupplyDaylight;
