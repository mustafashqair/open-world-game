// stable-v6-horses.js — living horses for the stable v6 (العالم المفتوح)
// Puts the game's own rigged horses (files/animals/horse-*.glb, unchanged) into the 6 stalls of
// shops/stable-v6.glb and plays the stall clips from shops/stable-v6-horse-clips.glb:
//   StallLook (24 s)  head over the half-door: looks up and down the aisle, nods, snorts / head toss
//   StallDoze (18 s)  inside the stall: turns to nuzzle its flank, dozes with a cocked hind leg, head shake
//   StallEat  (18 s)  turned to the manger: muzzle in the hay, chewing, lifts its head to look around
// Every clip also has ear flicks, tail swishes, weight shifts (resting hind leg) and the Idle breathing.
// Each horse gets its own random start time and speed (0.88–1.12×), and door horses switch between
// StallLook and StallDoze at random loop ends (both clips start and end on the same pose), so no two
// horses move together. No game files are edited; this is glue code you call once.
//
//   import { addStableHorses } from './shops/stable-v6-horses.js';
//   const horses = await addStableHorses(stableGltf.scene, { base: 'animals/', clips: 'shops/stable-v6-horse-clips.glb' });
//   // game loop:  horses.update(dt, camera);
//
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const DEFAULT_PLAN = [            // stall -> horse file and mode ('door' or 'eat')
  { stall: 1, file: 'horse-bay',      mode: 'door' },
  { stall: 2, file: 'horse-black',    mode: 'eat'  },
  { stall: 3, file: 'horse-cream',    mode: 'door' },
  { stall: 4, file: 'horse-chestnut', mode: 'door' },
  { stall: 5, file: 'horse-bay',      mode: 'eat'  },
  { stall: 6, file: 'horse-black',    mode: 'door' },
];

function rng(seed) { let s = (seed >>> 0) || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export async function addStableHorses(stableRoot, opts = {}) {
  const base = opts.base ?? 'animals/';
  const clipsUrl = opts.clips ?? 'shops/stable-v6-horse-clips.glb';
  const plan = opts.plan ?? DEFAULT_PLAN;
  const lite = !!opts.lite;                         // true -> horse-*-lite.glb
  const rand = rng(opts.seed ?? (Math.random() * 1e9));
  const maxDist = opts.updateDistance ?? 45;        // metres; farther horses pause (cheap on phones)
  const loader = opts.loader ?? new GLTFLoader();
  if (!opts.loader) loader.setMeshoptDecoder(MeshoptDecoder);

  const clipGltf = await loader.loadAsync(clipsUrl);
  // keep rotations (+ pelvis/body translation); never move the root or scale bones, so the horse stays where the game's rig puts it
  for (const c of clipGltf.animations) c.tracks = c.tracks.filter(t => !t.name.endsWith('.scale') && t.name !== 'root.position');
  const clips = Object.fromEntries(clipGltf.animations.map(c => [c.name, c]));
  for (const n of ['StallLook', 'StallDoze', 'StallEat']) if (!clips[n]) throw new Error('stable-v6-horses: clip missing ' + n);

  const cache = new Map();
  const getHorse = async (file) => {
    const url = base + file + (lite ? '-lite' : '') + '.glb';
    if (!cache.has(url)) cache.set(url, loader.loadAsync(url));
    return SkeletonUtils.clone((await cache.get(url)).scene);
  };

  stableRoot.updateMatrixWorld(true);
  const parent = opts.parent ?? stableRoot;
  const inv = new THREE.Matrix4().copy(parent.matrixWorld).invert();
  const horses = [];
  for (const p of plan) {
    const marker = stableRoot.getObjectByName((p.mode === 'eat' ? 'horse_eat_spot_' : 'horse_spot_') + p.stall);
    if (!marker) { console.warn('stable-v6-horses: no marker for stall', p.stall); continue; }
    const obj = await getHorse(p.file);
    obj.name = 'stall_horse_' + p.stall;
    obj.traverse(o => { if (o.name === 'Tack' || o.parent?.name === 'Tack') o.visible = false;   // stall horses are bare
                        if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
    const m = new THREE.Matrix4().multiplyMatrices(inv, marker.matrixWorld);
    m.decompose(obj.position, obj.quaternion, new THREE.Vector3());          // marker +Z = horse forward
    parent.add(obj);

    const mixer = new THREE.AnimationMixer(obj);
    const speed = 0.88 + rand() * 0.24;
    const first = p.mode === 'eat' ? 'StallEat' : (rand() < 0.65 ? 'StallLook' : 'StallDoze');
    const actions = {};
    for (const n of (p.mode === 'eat' ? ['StallEat'] : ['StallLook', 'StallDoze'])) {
      const a = mixer.clipAction(clips[n]); a.setLoop(THREE.LoopRepeat, Infinity); actions[n] = a;
    }
    const a0 = actions[first];
    a0.play(); a0.time = rand() * clips[first].duration; mixer.timeScale = speed;
    const h = { stall: p.stall, mode: p.mode, object: obj, mixer, actions, current: first, speed };
    if (p.mode === 'door') {
      mixer.addEventListener('loop', (e) => {                 // switch clips only at a loop end
        if (e.action !== h.actions[h.current] || rand() < 0.5) return;
        const next = h.current === 'StallLook' ? 'StallDoze' : 'StallLook';
        const b = h.actions[next]; b.reset(); b.play(); h.actions[h.current].crossFadeTo(b, 0.6, false);
        h.current = next; mixer.timeScale = h.speed = 0.88 + rand() * 0.24;
      });
    }
    horses.push(h);
  }

  const tmp = new THREE.Vector3();
  return {
    horses,
    get(stall) { return horses.find(h => h.stall === stall); },
    update(dt, camera) {
      for (const h of horses) {
        if (camera && maxDist > 0) { h.object.getWorldPosition(tmp); if (tmp.distanceTo(camera.position) > maxDist) continue; }
        h.mixer.update(dt);
      }
    },
    dispose() { for (const h of horses) { h.mixer.stopAllAction(); h.object.removeFromParent(); } },
  };
}
