// g38: game copy of blacksmith-v7-fire.js — identical except all smith/bellows maths is in shop-root-local space, so the shop can sit anywhere in the world (floating origin)
// blacksmith-v7-fire.js — realistic forge fire, smith work loop (pump bellows -> hammer two-handed), sparks
// for blacksmith-v7*.glb + npcs-v2/blacksmith-npc.glb (v7 clips)   three.js r150+ (tested r160, WebGL2)
//
// Usage (game):
//   import { addForgeFire, SMITH_CLIPS } from './blacksmith-v7-fire.js';
//   const shop  = await loader.loadAsync('shops/blacksmith-v7.glb');   scene.add(shop.scene);
//   const smith = await loader.loadAsync('npcs-v2/blacksmith-npc.glb'); scene.add(smith.scene);
//   const forge = addForgeFire(shop.scene, { animations: shop.animations, light: true,
//       npc: smith.scene, npcAnimations: smith.animations,        // the smith works the forge by himself
//       loop: { pumps: 4, strikes: 5 },                            // optional, defaults shown
//       onImpact: (pos, n) => playClang(pos),                      // every hammer hit (world pos)
//       onPump:   (pos, n) => playWhoosh(pos) });                  // every bellows push (world pos)
//   forge.setPointScale(renderer.domElement.height, camera.fov);  // once + on resize
//   // every frame: forge.update(dt)        deterministic renders: forge.setTime(t)
//   // forge.state -> 'pump' | 'toAnvil' | 'strike' | 'toForge' ;  forge.mode = 'loop' | 'pump' | 'strike'
//
// Smith clips (in blacksmith-npc.glb, authored on its own rig):
//   PumpBellows   1.20 s loop, LEFT hand on the bellows grip: push down 0-0.50 s, lift 0.50-1.20 s; right hand holds the hammer
//   HammerTwoHand 1.60 s loop, BOTH hands on the hammer handle for the whole swing; impact at 0.40 s, head held on the iron to 0.48 s
//   Walk / Idle   the NPC's own clips, used to walk between the bellows and the anvil
// The bellows have NO clip of their own: their top board and leather move only from the smith's left hand.
// Every push blows air: the fire flares up (taller, brighter, more embers, light + coal glow up), and the iron heats.
import * as THREE from 'three';

export const SMITH_CLIPS = { pump: 'PumpBellows', strike: 'HammerTwoHand', walk: 'Walk', idle: 'Idle' };
const PUMP_D = 1.2, PUMP_DOWN = 0.5, STROKE = 0.14, STRIKE_D = 1.6, IMPACT_T = 0.40, HOLD_END = 0.48;

// ---------------------------------------------------------------- helpers
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function mkPoints(n, additive) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(n), 1));
  g.setAttribute('aCol', new THREE.BufferAttribute(new Float32Array(n * 4), 4));
  const m = new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 400 }, uSoft: { value: additive ? 0.0 : 1.0 } },
    vertexShader: `attribute float aSize; attribute vec4 aCol; varying vec4 vCol; uniform float uScale;
      void main(){ vCol=aCol; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv;
        gl_PointSize = aSize*uScale/max(0.05,-mv.z); }`,
    fragmentShader: `varying vec4 vCol; uniform float uSoft;
      float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
      void main(){ vec2 c=gl_PointCoord-0.5; float d=length(c)*2.0; if(d>1.0) discard;
        float a = uSoft>0.5 ? (1.0-smoothstep(0.2,1.0,d))*(0.75+0.25*h(floor(gl_PointCoord*6.0))) : pow(1.0-d,1.6);
        gl_FragColor=vec4(vCol.rgb*(uSoft>0.5?1.0:a), vCol.a*a); }`,
    transparent: true, depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  m.toneMapped = false;
  const p = new THREE.Points(g, m); p.frustumCulled = false; p.renderOrder = additive ? 5 : 4;
  return p;
}
const ease = (u) => u * u * (3 - 2 * u);
const strokeAt = (t) => { t = ((t % PUMP_D) + PUMP_D) % PUMP_D; return t < PUMP_DOWN ? STROKE * ease(t / PUMP_DOWN) : STROKE * (1 - ease((t - PUMP_DOWN) / (PUMP_D - PUMP_DOWN))); };

// ---------------------------------------------------------------- volumetric fire (ray-marched noise volume)
const VOL_VS = `varying vec3 vOrig; varying vec3 vDir;
  void main(){ vOrig = (inverse(modelMatrix) * vec4(cameraPosition,1.0)).xyz; vDir = position - vOrig;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const VOL_FS = `precision highp float; varying vec3 vOrig; varying vec3 vDir;
  uniform float uTime, uFlare, uSeed, uBright;
  float hash3(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float vnoise(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
    return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x), mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
               mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x), mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y), f.z); }
  float fbm(vec3 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*vnoise(p); p=p*2.02+vec3(3.1,1.7,5.3); a*=0.5; } return v; }
  vec2 box(vec3 ro, vec3 rd){ vec3 inv=1.0/rd; vec3 t0=(vec3(-0.5)-ro)*inv, t1=(vec3(0.5)-ro)*inv; vec3 tn=min(t0,t1), tf=max(t0,t1);
    return vec2(max(max(tn.x,tn.y),tn.z), min(min(tf.x,tf.y),tf.z)); }
  vec3 ramp(float T){ // black-body-ish: dark red -> red -> orange -> yellow -> white
    vec3 c=mix(vec3(0.35,0.02,0.0), vec3(0.95,0.18,0.02), smoothstep(0.05,0.30,T));
    c=mix(c, vec3(1.0,0.48,0.06), smoothstep(0.28,0.55,T)); c=mix(c, vec3(1.0,0.80,0.30), smoothstep(0.55,0.80,T));
    return mix(c, vec3(1.0,0.70,0.32), smoothstep(0.82,1.0,T)); }
  void main(){
    vec3 rd=normalize(vDir); vec2 tt=box(vOrig,rd); tt.x=max(tt.x,0.0); if(tt.y<=tt.x) discard;
    const int N=36; float dt=(tt.y-tt.x)/float(N);
    float jit=hash3(vec3(gl_FragCoord.xy,uTime*7.0)); float t=tt.x+dt*jit;
    vec3 acc=vec3(0.0); float trans=1.0; float time=uTime*(1.0+0.35*uFlare);
    float hmax=0.40+0.32*uFlare;                       // flames lick higher on each bellows push
    for(int i=0;i<N;i++){
      vec3 p=vOrig+rd*t; vec3 q=p+0.5;                 // 0..1 box coords, q.y = height above the coals
      vec2 c=(q.xz-0.5)*vec2(2.0,2.2); float r=length(c);
      float wob=fbm(vec3(q.x*2.0,time*0.6,q.z*2.0));
      // v7: flames rise from 7 places spread over the whole bed, each its own height and flicker, plus low flames everywhere
      float core=0.0;
      for(int k=0;k<7;k++){ float fk=float(k);
        vec2 s=vec2(fract(sin(fk*12.9+uSeed*3.1)*43758.5)*1.5-0.75, fract(sin(fk*78.2+1.3)*24634.6)*1.3-0.65);
        float ph=fract(sin(fk*39.4+2.7)*12345.6); float hk=0.45+0.55*ph;
        float fl=0.7+0.3*sin(time*(1.1+1.3*ph)+fk*2.3)*sin(time*(0.7+ph)+fk);
        float rr=length((c-s)*vec2(1.0,1.2)); core=max(core, smoothstep(0.62,0.0,rr+0.22*(wob-0.5))*hk*fl); }
      core=max(core, 0.32*smoothstep(1.0,0.45,r+0.2*(wob-0.5)));
      vec3 w=vec3(q.x*5.0+uSeed, q.y*1.7-time*2.4, q.z*5.0);
      w.x+=0.45*sin(q.y*4.0+time*1.9+q.z*3.0)*q.y; w.z+=0.35*cos(q.y*3.5-time*1.4+q.x*2.0)*q.y;   // licking sway, more at the top
      float n=fbm(w); float n2=vnoise(w*2.7+vec3(0.0,-time*3.4,0.0));
      float tongues=n*0.9+n2*0.35;
      float h=q.y/(hmax*(0.45+0.55*core));
      float d=(tongues-h*0.95-0.30+0.22*core)*smoothstep(1.0,0.75,r)*2.2; d*=smoothstep(0.0,0.06,q.y);
      if(d>0.0){
        float T=clamp(d*1.25*(1.2-h*0.7)+0.35*(1.0-h)*core-0.05,0.0,1.0);   // white-yellow core low, orange, red tips high
        vec3 em=ramp(T*0.85)*(0.18+1.15*T*T)*(1.0+0.4*uFlare);
        float a=clamp(d*dt*16.0,0.0,1.0);
        acc+=trans*em*a; trans*=1.0-a*0.5;
        if(trans<0.03) break;
      }
      t+=dt; if(t>tt.y) break;
    }
    gl_FragColor=vec4(acc*uBright,1.0);
  }`;

// ---------------------------------------------------------------- glowing coal bed
const COAL_VS = `varying vec3 vP; varying vec3 vN; void main(){ vP=position; vN=normalMatrix*normal; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const COAL_FS = `varying vec3 vP; varying vec3 vN; uniform float uTime, uHeat, uFlare;
  // v8: deep red-orange embers, no white core (Mustafa v7 note); v7: organic coal bed — two sizes of warped Voronoi lumps (no grid), every lump its own heat,
  // hot white-yellow/orange centre -> dull red -> black coal -> grey ash at the edges, ash flecks on cooler lumps
  float h2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  vec3 cell(vec2 p){ vec2 i=floor(p), f=fract(p); float d1=8.0, d2=8.0; float id=0.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){ vec2 g=vec2(x,y); vec2 o=0.15+0.7*vec2(h2(i+g),h2(i+g+17.3)); float d=length((g+o-f)*vec2(1.0,0.8+0.4*h2(i+g+3.7)));
      if(d<d1){ d2=d1; d1=d; id=h2(i+g+5.1);} else if(d<d2) d2=d; }
    return vec3(d2-d1, id, d1); }
  float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y); }
  float fb(vec2 p){ return 0.55*n2(p)+0.3*n2(p*2.07+5.2)+0.15*n2(p*4.3+1.7); }
  vec3 ramp(float T){ vec3 c=mix(vec3(0.0),vec3(0.55,0.04,0.0),smoothstep(0.02,0.25,T)); c=mix(c,vec3(1.0,0.22,0.02),smoothstep(0.2,0.5,T));
    c=mix(c,vec3(0.95,0.30,0.03),smoothstep(0.45,0.75,T)); return mix(c,vec3(1.0,0.42,0.07),smoothstep(0.75,1.0,T)); }
  void main(){
    vec2 p=vP.xz; vec2 w=p+0.09*vec2(fb(p*5.0),fb(p*5.0+9.1))-0.045;
    vec3 cL=cell(w*8.5), cS=cell(w*19.0+vec2(3.3,1.9));
    float pick=smoothstep(0.38,0.62,fb(p*2.6+11.0));                       // big lumps here, small coal there
    vec3 c=mix(cL,cS,pick);
    float crackW=0.05+0.10*n2(p*9.0);
    float crack=1.0-smoothstep(0.0,crackW,c.x);                             // glowing gaps between lumps
    vec2 d=(p-uCentre)/uHalf; float r=length(d*vec2(1.0,1.15));
    float heat=clamp(1.16-r*1.0+0.45*(fb(p*2.2+vec2(uTime*0.03,0.0))-0.5),0.0,1.0);   // graded: hot centre -> cool edges, uneven
    heat=pow(heat,1.25);
    float lumpH=heat*(0.45+0.75*c.y);                                        // each lump its own temperature
    float pulse=0.82+0.18*sin(uTime*(0.9+c.y*2.3)+c.y*40.0);
    float face=smoothstep(0.55,0.05,c.z);                                    // lump body (centre of the cell)
    float boost=(0.6+0.5*uHeat+0.9*uFlare);
    float mot=fb(p*13.0+c.y*5.0);                                             // mottled glow over each lump's surface
    float T=clamp( lumpH*(0.35+0.75*face)*(0.75+0.5*mot)*1.05*pulse + crack*heat*heat*0.55 , 0.0, 1.0)*boost;
    // dark coal body, lit from above
    float lit=0.35+0.65*max(dot(normalize(vN),vec3(0.0,1.0,0.0)),0.0);
    vec3 coal=vec3(0.045,0.04,0.038)*lit*(0.7+0.6*c.y);
    // grey/white ash: mostly at the cool edges, flecks on cooler lumps, never in the hot gaps
    float ashEdge=smoothstep(0.62,1.0,r+0.35*(n2(p*7.0)-0.5));
    float fleck=smoothstep(0.78,0.92,n2(p*31.0+c.y*7.0))*(1.0-heat*0.8);
    float ash=clamp(max(ashEdge*(0.55+0.45*c.y),fleck*0.8)*(1.0-crack*0.9)*face,0.0,1.0);
    vec3 base=mix(coal,vec3(0.40,0.385,0.37)*lit,ash);
    vec3 em=ramp(min(T,1.0))*(0.22+1.25*T*T)*(1.0-ash*0.85);
    float crust=smoothstep(0.40,0.80,n2(p*23.0+c.y*3.0))*face*(1.0-crack)*0.55; em*=1.0-crust;   // v8: dark crust patches over the lumps
    gl_FragColor=vec4(base+em*1.05,1.0);
  }`.replace('uniform float uTime, uHeat, uFlare;', 'uniform float uTime, uHeat, uFlare; uniform vec2 uCentre; uniform vec2 uHalf;');

export function addForgeFire(root, opts = {}) {
  const { animations = [], light = true, hideColliders = true, npc = null, npcAnimations = [], onImpact = null, onPump = null } = opts;
  const loopCfg = Object.assign({ pumps: 4, strikes: 5 }, opts.loop || {});
  const glowMats = [], colliders = [], markers = {}, flames = [], smokeCards = [];
  let ironMat = null, coalMesh = null;
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    if (/_collider$/.test(o.name)) { colliders.push(o); if (hideColliders) o.visible = false; return; }
    if (o.userData && o.userData.marker) markers[o.name] = o;
    if (o.isMesh) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (!m || m.userData.__fireBase !== undefined) continue;
        if (m.name === 'LanternGlow' || m.name === 'HotIron' || m.name === 'ArchGlow') { m.userData.__fireBase = m.emissiveIntensity; m.userData.__fireKind = m.name; glowMats.push(m); if (m.name === 'HotIron') ironMat = m; }
      }
      const mn = o.material && o.material.name;
      if (mn === 'Flame') flames.push(o);
      if (mn === 'Smoke') smokeCards.push(o);
      if (mn === 'Coals' && !coalMesh) coalMesh = o;
    }
  });
  const rootInv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const toLocal = (o) => { root.updateMatrixWorld(true); return root.worldToLocal(o.getWorldPosition(new THREE.Vector3())); };
  // --- flat flame cards are hidden; a ray-marched fire volume sits on the coal bed
  for (const f of flames) f.visible = false;
  const fireMats = []; let fireBox = null;
  if (coalMesh) {
    coalMesh.geometry.computeBoundingBox(); const bb = coalMesh.geometry.boundingBox.clone().applyMatrix4(coalMesh.matrixWorld).applyMatrix4(rootInv);
    const cx = (bb.min.x + bb.max.x) / 2, cz = (bb.min.z + bb.max.z) / 2, sx = (bb.max.x - bb.min.x) * 0.92, sz = (bb.max.z - bb.min.z) * 0.9, sy = 0.95;
    const mk = (seed, br) => { const m = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uFlare: { value: 0 }, uSeed: { value: seed }, uBright: { value: br } },
      vertexShader: VOL_VS, fragmentShader: VOL_FS, transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending });
      m.toneMapped = false; fireMats.push(m); return m; };
    fireBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mk(0.0, 1.0)); fireBox.name = 'ForgeFireVolume';
    fireBox.scale.set(sx, sy, sz); fireBox.position.set(cx, bb.max.y - 0.03 + sy / 2, cz); fireBox.renderOrder = 6; fireBox.frustumCulled = false; root.add(fireBox);
    // coal bed shader (cells of glowing lumps that pulse; brighter with heat/flare)
    const cl = new THREE.Vector3(); coalMesh.geometry.boundingBox.getCenter(cl);
    const cm = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uHeat: { value: 0.5 }, uFlare: { value: 0 }, uCentre: { value: new THREE.Vector2(cl.x, cl.z) }, uHalf: { value: new THREE.Vector2(Math.max(0.05,(coalMesh.geometry.boundingBox.max.x-coalMesh.geometry.boundingBox.min.x)/2), Math.max(0.05,(coalMesh.geometry.boundingBox.max.z-coalMesh.geometry.boundingBox.min.z)/2)) } }, vertexShader: COAL_VS, fragmentShader: COAL_FS });
    cm.name = 'CoalsLive'; cm.toneMapped = false; coalMesh.material = cm; fireMats.push(cm);
  }
  // --- embers + sparks rising from the coals
  const ff = markers.forge_fire; const fireLocal = ff ? toLocal(ff) : new THREE.Vector3();
  if (fireBox) fireLocal.set(fireBox.position.x, fireBox.position.y - fireBox.scale.y / 2 + 0.04, fireBox.position.z);
  const NE = 110, embers = mkPoints(NE, true); if (ff || fireBox) root.add(embers);
  // --- smoke: rising from the fire into the hood, and continuous chimney smoke
  const sm = markers.chimney_top; const smokeLocal = sm ? toLocal(sm) : new THREE.Vector3();
  const NS = 34, smoke = mkPoints(NS, false); if (sm) { root.add(smoke); for (const c of smokeCards) c.visible = false; }
  const NH = 18, hoodSmoke = mkPoints(NH, false); if (fireBox) root.add(hoodSmoke);
  // --- light
  let pl = null; const lm = markers.forge_light || root.getObjectByName('forge_light');
  if (light && lm) { let cfg = { color: '#ff7a2e', intensity: 18, distance: 10, decay: 2 };
    try { Object.assign(cfg, JSON.parse(lm.userData.pointLight || '{}')); } catch (e) {}
    pl = new THREE.PointLight(cfg.color, cfg.intensity, cfg.distance, cfg.decay); pl.castShadow = false; pl.userData.baseIntensity = cfg.intensity*0.8; lm.add(pl); }
  // --- building clips (ChimneySmoke fallback only; there is no Bellows clip and the flame-card clip is not played)
  let mixer = null;
  if (animations.length) { mixer = new THREE.AnimationMixer(root);
    for (const clip of animations) if (clip.name !== 'ForgeFire' && clip.name !== 'Bellows' && !(clip.name === 'ChimneySmoke' && sm)) mixer.clipAction(clip).setLoop(THREE.LoopRepeat, Infinity).play(); }
  // --- bellows parts (moved only by the smith)
  const bTop = root.getObjectByName('bellows_top'), bLea = root.getObjectByName('bellows_leather');
  const bTopRest = bTop ? toLocal(bTop) : null, bLeaScale = bLea ? bLea.scale.clone() : null;
  const gripM = markers.bellows_grip;
  function setBellows(off) { // off in metres (0 = at rest, 0.14 = fully pushed)
    if (bTop) { const w = bTopRest.clone(); w.y -= off; root.updateMatrixWorld(true); w.applyMatrix4(root.matrixWorld); bTop.parent.updateMatrixWorld(true); bTop.position.copy(bTop.parent.worldToLocal(w)); }
    if (bLea) { bLea.scale.copy(bLeaScale); bLea.scale.y = bLeaScale.y * (1 - 0.55 * off / STROKE); }
  }
  // --- smith
  const strikeM = markers.anvil_strike, strikeLocal = new THREE.Vector3(), strikeWorld = new THREE.Vector3();
  if (strikeM) strikeM.getWorldPosition(strikeWorld), strikeLocal.copy(strikeWorld).applyMatrix4(rootInv);
  const spotA = markers.npc_spot, spotB = markers.bellows_spot;
  let smith = null, smithMixer = null, ownSmithMixer = false, acts = {}, handY0 = 0, plan = null, mode = opts.mode || 'loop';
  const W = (o) => { root.updateMatrixWorld(true); const m = new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(o.matrixWorld), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3(); m.decompose(p, q, s); return { p, q }; };   // g38: root-local (the smith is a child of the shop root)
  function buildPlan() {
    const A = W(spotA), Bp = spotB ? W(spotB) : A; const dist = A.p.distanceTo(Bp.p); const speed = 1.15, turn = 0.45;
    const walkT = dist / speed + 2 * turn;
    const seg = []; let t = 0;
    const add = (state, d) => { seg.push({ state, t0: t, d }); t += d; };
    if (mode === 'strike') add('strike', loopCfg.strikes * STRIKE_D);
    else if (mode === 'pump') add('pump', loopCfg.pumps * PUMP_D);
    else { add('pump', loopCfg.pumps * PUMP_D); add('toAnvil', walkT); add('strike', loopCfg.strikes * STRIKE_D); add('toForge', walkT); }
    plan = { seg, D: t, A, B: Bp, dist, speed, turn, walkT };
  }
  function attachSmith(npcRoot, npcAnims, mx) {
    if (!npcRoot || !spotA) return null;
    smith = npcRoot; smith.scale.setScalar(1);
    const get = (n) => npcAnims.find((a) => a.name === n);
    if (!get(SMITH_CLIPS.strike) || !get(SMITH_CLIPS.pump)) { console.warn('blacksmith-v7-fire: NPC needs the v6 clips PumpBellows + HammerTwoHand'); }
    smithMixer = mx || new THREE.AnimationMixer(npcRoot); ownSmithMixer = !mx;
    for (const k of Object.keys(SMITH_CLIPS)) { const c = get(SMITH_CLIPS[k]); if (c) { const a = smithMixer.clipAction(c); a.play(); a.setEffectiveWeight(0); a.paused = true; acts[k] = a; } }
    buildPlan();
    // left-hand height at the start of the pump clip (bellows at rest) for the hand->bellows coupling
    if (acts.pump && spotB) { placeAt(plan.B); setWeights({ pump: 1 }, { pump: 0 }); smith.updateMatrixWorld(true); const lh = smith.getObjectByName('LeftHand'); if (lh) handY0 = root.worldToLocal(lh.getWorldPosition(new THREE.Vector3())).y; }
    return acts.strike;
  }
  function placeAt(P) { smith.position.copy(P.p); smith.quaternion.copy(P.q); smith.updateMatrixWorld(true); }
  function setWeights(w, times) { for (const k in acts) { const a = acts[k]; a.setEffectiveWeight(w[k] || 0); if (times[k] !== undefined) a.time = times[k]; } smithMixer.update(0); }
  if (npc) attachSmith(npc, npcAnimations, opts.mixer);

  // --- sparks at the anvil
  const NSP = 110, TR = 3; const sparks = mkPoints(NSP * TR, true); const flashP = mkPoints(1, true);
  const trailGeo = new THREE.BufferGeometry(); trailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NSP * 6), 3)); trailGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(NSP * 6), 3));
  const trailMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }); trailMat.toneMapped = false;
  const trails = new THREE.LineSegments(trailGeo, trailMat); trails.frustumCulled = false; trails.renderOrder = 5;
  let flashLight = null;
  if (strikeM) { root.add(sparks); root.add(trails); root.add(flashP); if (opts.flash !== false) { flashLight = new THREE.PointLight('#ffb050', 0, 6, 2); flashLight.position.copy(strikeLocal).add(new THREE.Vector3(0, 0.12, 0)); root.add(flashLight); } }   // g38: the strike flash light is optional (phones: one light less)
  const floorY = (markers.interior_center ? toLocal(markers.interior_center).y : strikeLocal.y - 0.78);
  function sparkPos(k, n, dt, out) { // deterministic spark k of impact n at dt seconds after impact
    const r1 = hash(n * 131 + k * 7.13), r2 = hash(n * 17 + k * 3.7 + 1), r3 = hash(n * 59 + k * 1.31 + 2), r4 = hash(k * 9.1 + n * 2.2 + 3);
    const ang = r1 * Math.PI * 2, sp = 1.2 + 3.3 * r2 * r2, up = 0.6 + 2.6 * r3;
    let vx = Math.cos(ang) * sp, vz = Math.sin(ang) * sp, vy = up;
    let x = strikeLocal.x, y = strikeLocal.y + 0.005, z = strikeLocal.z, t = dt; const g = 9.8, drag = 0.6;
    // analytic flight with floor bounce (one bounce)
    const f = (tt) => (1 - Math.exp(-drag * tt)) / drag;
    let px = x + vx * f(t), pz = z + vz * f(t), py = y + vy * t - 0.5 * g * t * t;
    if (py < floorY) { // time of floor hit
      const tb = (vy + Math.sqrt(vy * vy + 2 * g * (y - floorY))) / g; const t2 = t - tb;
      const bx = x + vx * f(tb), bz = z + vz * f(tb), vy2 = (vy - g * tb) * -0.32;
      px = bx + vx * 0.5 * Math.exp(-drag * tb) * f(t2); pz = bz + vz * 0.5 * Math.exp(-drag * tb) * f(t2); py = Math.max(floorY + 0.003, floorY + vy2 * t2 - 0.5 * g * t2 * t2);
    }
    out.set(px, py, pz); return 0.25 + 0.6 * r4; // life
  }
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
  function applySparks(dt, n) {
    const pa = sparks.geometry.attributes, ta = trails.geometry.attributes;
    for (let k = 0; k < NSP; k++) {
      for (let s = 0; s < TR; s++) {
        const j = k * TR + s, d = dt - s * 0.012; let life = 1, a = 0;
        if (n >= 0 && d >= 0) { life = sparkPos(k, n, d, tmp); a = Math.max(0, 1 - d / life); } else tmp.set(0, -999, 0);
        pa.position.setXYZ(j, tmp.x, tmp.y, tmp.z);
        const heat = Math.max(0, 1 - d / (life * 0.7));
        pa.aSize.setX(j, (0.03 - s * 0.007) * (0.55 + 0.45 * a));
        pa.aCol.setXYZW(j, 1.0, 0.45 + 0.5 * heat, 0.08 + 0.5 * heat * heat, a * (1 - s * 0.25));
      }
      // trail line
      const d = dt; let a = 0;
      if (n >= 0 && d >= 0) { const life = sparkPos(k, n, d, tmp); sparkPos(k, n, Math.max(0, d - 0.045), tmp2); a = Math.max(0, 1 - d / life); } else { tmp.set(0, -999, 0); tmp2.copy(tmp); }
      ta.position.setXYZ(k * 2, tmp.x, tmp.y, tmp.z); ta.position.setXYZ(k * 2 + 1, tmp2.x, tmp2.y, tmp2.z);
      ta.color.setXYZ(k * 2, 1.0 * a, 0.75 * a, 0.3 * a); ta.color.setXYZ(k * 2 + 1, 0.6 * a, 0.18 * a, 0.0);
    }
    pa.position.needsUpdate = pa.aSize.needsUpdate = pa.aCol.needsUpdate = ta.position.needsUpdate = ta.color.needsUpdate = true;
    const fl = n >= 0 && dt >= 0 ? Math.exp(-dt / 0.045) : 0;
    const fa = flashP.geometry.attributes; fa.position.setXYZ(0, strikeLocal.x, strikeLocal.y + 0.02, strikeLocal.z); fa.aSize.setX(0, 0.5 * fl); fa.aCol.setXYZW(0, 1, 0.85, 0.55, fl); fa.position.needsUpdate = fa.aSize.needsUpdate = fa.aCol.needsUpdate = true;
    if (flashLight) flashLight.intensity = 5 * fl;   // v6: smith's hands are now right over the iron, 14 blew him out
    if (ironMat) ironMat.emissiveIntensity = ironMat.userData.__fireBase * (1 + 1.6 * (n >= 0 && dt >= 0 ? Math.exp(-dt / 0.12) : 0));
  }

  function applyEmbers(t, flare) {
    const a = embers.geometry.attributes;
    for (let i = 0; i < NE; i++) {
      const extra = i >= 70; const P = (1.0 + 1.3 * hash(i * 3.1)) / (1 + 0.5 * flare), ph = hash(i * 7.7) * P, age = ((t + ph) % P), u = age / P, cyc = Math.floor((t + ph) / P);
      const r1 = hash(i * 13.3 + cyc * 1.7), r2 = hash(i * 5.9 + cyc * 2.3);
      const sx = fireBox ? fireBox.scale.x * 0.8 : 0.7, sz = fireBox ? fireBox.scale.z * 0.7 : 0.45;
      const x = fireLocal.x + (r1 - 0.5) * sx + Math.sin(t * 3 + i) * 0.06 * u, z = fireLocal.z + (r2 - 0.5) * sz + Math.cos(t * 2.3 + i) * 0.06 * u;
      a.position.setXYZ(i, x, fireLocal.y + u * (0.8 + 0.8 * r2) * (1 + 0.6 * flare), z);
      a.aSize.setX(i, 0.012 + 0.012 * r1); const f = (1 - u) * Math.min(1, u * 8) * (extra ? Math.min(1, flare * 1.2) : 1);
      a.aCol.setXYZW(i, 1.0, 0.5 + 0.35 * (1 - u), 0.12 + 0.2 * (1 - u), f);
    }
    a.position.needsUpdate = a.aSize.needsUpdate = a.aCol.needsUpdate = true;
  }
  function applySmoke(t) {
    const a = smoke.geometry.attributes, P = 6.0;
    for (let i = 0; i < NS; i++) {
      const ph = i / NS * P, age = (t + ph) % P, u = age / P, cyc = Math.floor((t + ph) / P);
      const r1 = hash(i * 3.3 + cyc * 1.1), r2 = hash(i * 8.1 + cyc * 0.7);
      const x = smokeLocal.x + (r1 - 0.5) * 0.25 + u * u * 1.6 + Math.sin(t * 0.7 + i) * 0.12 * u, z = smokeLocal.z + (r2 - 0.5) * 0.25 - u * 0.4;
      a.position.setXYZ(i, x, smokeLocal.y + 0.1 + u * 3.6, z); a.aSize.setX(i, 0.35 + 1.5 * u);
      const f = Math.min(1, u * 6) * (1 - u) * 0.55; const g = 0.42 + 0.25 * u; a.aCol.setXYZW(i, g, g * 0.98, g * 0.95, f);
    }
    a.position.needsUpdate = a.aSize.needsUpdate = a.aCol.needsUpdate = true;
  }
  function applyHoodSmoke(t, flare) {
    if (!fireBox) return; const a = hoodSmoke.geometry.attributes, P = 3.2;
    for (let i = 0; i < NH; i++) {
      const ph = i / NH * P, age = (t + ph) % P, u = age / P, cyc = Math.floor((t + ph) / P);
      const r1 = hash(i * 4.1 + cyc * 1.3), r2 = hash(i * 2.7 + cyc * 0.9);
      a.position.setXYZ(i, fireLocal.x + (r1 - 0.5) * fireBox.scale.x * 0.6 * (1 - u * 0.5), fireLocal.y + 0.45 + u * 1.5, fireLocal.z + (r2 - 0.5) * fireBox.scale.z * 0.5 + u * 0.15);
      a.aSize.setX(i, 0.18 + 0.45 * u); const f = Math.min(1, u * 4) * (1 - u) * (0.30 + 0.15 * flare); const g = 0.22 + 0.12 * u;
      a.aCol.setXYZW(i, g * 1.05, g, g * 0.95, f);
    }
    a.position.needsUpdate = a.aSize.needsUpdate = a.aCol.needsUpdate = true;
  }
  const flick = (t, a) => 0.5 + 0.22 * Math.sin(t * 13.1 + a) + 0.16 * Math.sin(t * 23.7 + a * 2.3) + 0.12 * Math.sin(t * 5.3 + a * 0.7);
  // ---------------------------------------------------------------- work loop (pure function of time -> deterministic)
  const yawOf = (q) => { const f = new THREE.Vector3(0, 0, 1).applyQuaternion(q); return Math.atan2(f.x, f.z); };
  const lerpAng = (a, b, k) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return a + d * k; };
  const qYaw = (y) => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), y);
  function stateAt(T) {
    if (!plan) return null;
    const cyc = Math.floor(T / plan.D), Tm = T - cyc * plan.D; let s = plan.seg[plan.seg.length - 1];
    for (const g of plan.seg) if (Tm >= g.t0 && Tm < g.t0 + g.d) { s = g; break; }
    const u = Tm - s.t0; const out = { state: s.state, u, cyc, w: {}, times: {}, pos: null, yaw: 0 };
    const { A, B, turn, walkT, speed, dist } = plan;
    if (s.state === 'pump') { out.pos = B.p; out.yaw = yawOf(B.q); out.w.pump = 1; out.times.pump = u % PUMP_D; out.pumpN = cyc * loopCfg.pumps + Math.floor(u / PUMP_D); }
    else if (s.state === 'strike') { out.pos = A.p; out.yaw = yawOf(A.q); out.w.strike = 1; out.times.strike = u % STRIKE_D; }
    else { // walking between spots: turn+fade, walk, turn+fade
      const from = s.state === 'toAnvil' ? B : A, to = s.state === 'toAnvil' ? A : B, prev = s.state === 'toAnvil' ? 'pump' : 'strike', next = s.state === 'toAnvil' ? 'strike' : 'pump';
      const dir = to.p.clone().sub(from.p); const travelYaw = Math.atan2(dir.x, dir.z); const wt = dist / speed;
      if (u < turn) { const k = ease(u / turn); out.pos = from.p; out.yaw = lerpAng(yawOf(from.q), travelYaw, k); out.w[prev] = 1 - k; out.w.walk = k; out.times[prev] = 0; out.times.walk = u; }
      else if (u < turn + wt) { const k = (u - turn) / wt; out.pos = from.p.clone().lerp(to.p, k); out.yaw = travelYaw; out.w.walk = 1; out.times.walk = u; }
      else { const k = ease(Math.min(1, (u - turn - wt) / turn)); out.pos = to.p; out.yaw = lerpAng(travelYaw, yawOf(to.q), k); out.w.walk = 1 - k; out.w[next] = k; out.times.walk = u; out.times[next] = 0; }
    }
    return out;
  }
  function flareAt(T) { // air from each bellows push: rises during the push, then dies away
    if (!plan) return 0; const cyc = Math.floor(T / plan.D), Tm = T - cyc * plan.D; const p0 = plan.seg[0].state === 'pump' ? plan.seg[0].t0 : -1e9;
    let f = 0; for (let k = 0; k < loopCfg.pumps; k++) { const dt = Tm - (p0 + k * PUMP_D); if (dt < 0) continue; f += dt < PUMP_DOWN ? ease(dt / PUMP_DOWN) : Math.exp(-(dt - PUMP_DOWN) / 0.75); }
    return Math.min(1.35, f);
  }
  function heatAt(st) { if (!st) return 0.7; const P = loopCfg.pumps * PUMP_D, S = loopCfg.strikes * STRIKE_D;
    if (st.state === 'pump') return 0.35 + 0.65 * Math.min(1, st.u / P); if (st.state === 'toAnvil') return 1.0; if (st.state === 'strike') return 1.0 - 0.55 * st.u / S; return 0.45 - 0.1 * Math.min(1, st.u / plan.walkT); }
  let manualImpactT = -1e9, lastImpactN = -1, lastPumpN = -1, time = 0, curState = null, bellowsOff = 0;
  const lhPos = new THREE.Vector3();
  function apply(t) {
    const st = smith ? stateAt(t) : null; curState = st ? st.state : null;
    if (st) { smith.position.copy(st.pos); smith.quaternion.copy(qYaw(st.yaw)); smith.updateMatrixWorld(true); setWeights(st.w, st.times); smith.updateMatrixWorld(true);
      // bellows follow the left hand, only while he is pumping
      bellowsOff = 0; if (st.w.pump >= 0.999) { const lh = smith.getObjectByName('LeftHand'); if (lh) { lh.getWorldPosition(lhPos); root.worldToLocal(lhPos); bellowsOff = Math.min(STROKE, Math.max(0, handY0 - lhPos.y)); } }
      if (st.pumpN !== undefined && st.pumpN !== lastPumpN && st.times.pump < 0.1) { lastPumpN = st.pumpN; if (onPump && gripM) onPump(gripM.getWorldPosition(new THREE.Vector3()), st.pumpN); }
    }
    setBellows(bellowsOff);
    const flare = smith ? flareAt(t) : 0.15 + 0.1 * Math.sin(t * 0.7), heat = heatAt(st);
    const f1 = flick(t, 0.0), f2 = flick(t, 1.9);
    for (const m of glowMats) { const b = m.userData.__fireBase, k = m.userData.__fireKind; if (k === 'LanternGlow' || k === 'ArchGlow') m.emissiveIntensity = b * (0.92 + 0.12 * f2); }
    for (const m of fireMats) { m.uniforms.uTime.value = t; m.uniforms.uFlare.value = flare; if (m.uniforms.uHeat) m.uniforms.uHeat.value = heat; }
    if (pl) pl.intensity = pl.userData.baseIntensity * (0.62 + 0.45 * f1) * (1 + 0.9 * flare);
    if (ff || fireBox) applyEmbers(t, flare);
    if (sm) applySmoke(t);
    applyHoodSmoke(t, flare);
    // impacts
    let n = -1, dt = -1;
    if (st && st.state === 'strike') { const nl = Math.floor((st.u - IMPACT_T) / STRIKE_D); if (nl >= 0) { n = st.cyc * loopCfg.strikes + nl; dt = st.u - IMPACT_T - nl * STRIKE_D; } }
    else if (st && st.state === 'toForge' && st.u < 1.0) { const S = loopCfg.strikes; n = st.cyc * S + S - 1; dt = (S - 1) * 0 + st.u + (STRIKE_D - IMPACT_T); }
    if (t - manualImpactT >= 0 && t - manualImpactT < 1.0 && (n < 0 || t - manualImpactT < dt)) { n = 100000 + Math.floor(manualImpactT * 10); dt = t - manualImpactT; }
    if (n >= 0 && n !== lastImpactN && dt < 0.1) { lastImpactN = n; if (onImpact) onImpact(strikeWorld.clone(), n); }
    if (strikeM) applySparks(dt, n);
    if (ironMat) ironMat.emissiveIntensity = ironMat.userData.__fireBase * (0.55 + 0.9 * heat) * (1 + 1.6 * (n >= 0 && dt >= 0 ? Math.exp(-dt / 0.12) : 0));
  }
  return {
    light: pl, mixer, colliders, markers, attachSmith, fireVolume: fireBox,
    get state() { return curState; }, get plan() { return plan; }, get bellowsOffset() { return bellowsOff; },
    get mode() { return mode; }, set mode(v) { mode = v; if (smith) buildPlan(); },
    stateAt, flareAt,
    triggerImpact() { manualImpactT = time; },
    update(dt) { time += dt; if (mixer) mixer.update(dt); apply(time); },
    setTime(t) { time = t; if (mixer) mixer.setTime(t); apply(t); },
    setPointScale(h, fovDeg) { const s = h / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2)); for (const p of [embers, smoke, hoodSmoke, sparks, flashP]) p.material.uniforms.uScale.value = s; },
  };
}
