// food-v5-fire.js — real animated oven fire for food-v5.glb (three.js r150+)
// Usage:  import { addOvenFire } from './food-v5-fire.js';
//         const fire = addOvenFire(shopRoot, { light: optionalPointLight });
//         each frame: fire.update(elapsedSeconds);   // time-driven, deterministic
// Builds: layered noise flames (white-yellow core -> orange -> red edges, rising, curling tongues),
//         a hot glow in the ember bed, rising sparks/embers, smoke from the oven mouth and the chimney,
//         pulsing glowing cracks on the logs, and a flickering oven light. Hides the fallback Flame_* cards.
import * as THREE from 'three';

const NOISE = `
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*vnoise(p); p=p*2.03+vec2(17.1,9.2); a*=0.5; } return v; }`;

const FLAME_VS = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const FLAME_FS = `uniform float uTime; uniform float uSeed; uniform float uInt; uniform float uSpeed; varying vec2 vUv;
${NOISE}
void main(){
  vec2 uv=vUv; float t=uTime*uSpeed;
  vec2 q=vec2(uv.x*2.0+uSeed, uv.y*1.7 - t*1.9);
  float n=fbm(q*1.8);
  float n2=fbm(q*4.2+vec2(3.1,-t*1.2));
  float x=(uv.x-0.5)*2.0;
  x += (n-0.5)*1.1*uv.y + (n2-0.5)*0.35*uv.y + 0.08*sin(t*3.0+uSeed*7.0)*uv.y;
  float w = mix(0.9, 0.06, pow(uv.y,0.75));
  float shape = 1.0 - smoothstep(w*0.45, w, abs(x));
  float tongue = 1.0 - smoothstep(0.35, 0.95, uv.y + (n-0.5)*0.7 + (n2-0.5)*0.25);
  float base = smoothstep(0.0, 0.1, uv.y);
  float f = clamp(shape*tongue*base*1.55 - n2*0.22, 0.0, 1.0);
  vec3 c = mix(vec3(0.45,0.04,0.0), vec3(0.95,0.28,0.02), smoothstep(0.04,0.3,f));
  c = mix(c, vec3(1.0,0.66,0.16), smoothstep(0.3,0.62,f));
  c = mix(c, vec3(1.0,0.96,0.8), smoothstep(0.66,0.95,f)*(1.0-uv.y*0.8));
  float a = smoothstep(0.02,0.3,f);
  gl_FragColor = vec4(c*a*uInt, a);
}`;
const GLOW_FS = `uniform float uTime; varying vec2 vUv; ${NOISE}
void main(){ vec2 d=vUv-0.5; float r=length(d*vec2(1.0,1.6)); float n=fbm(vUv*6.0+vec2(uTime*0.7,0.0));
  float a=smoothstep(0.5,0.0,r)*(0.55+0.45*n); gl_FragColor=vec4(vec3(1.0,0.45,0.08)*a*1.1, a); }`;
const PT_VS = `attribute float aSeed; uniform float uTime; uniform float uScale; uniform float uRate; uniform vec3 uRise; uniform vec3 uSpread; uniform float uSize; uniform float uLife;
uniform float uSmoke; varying float vA; varying float vSeed;
void main(){
  float life=fract(uTime*uRate*(0.7+0.6*fract(aSeed*7.13))+aSeed);
  vec3 p=vec3((fract(aSeed*91.7)-0.5)*uSpread.x, 0.0, (fract(aSeed*53.3)-0.5)*uSpread.z);
  if(uSmoke<0.5){
    p.y += life*uRise.y; p.z += smoothstep(0.15,0.55,life)*uRise.z; p.x += sin(life*9.0+aSeed*40.0)*0.05*life;
    vA = (1.0-life)*smoothstep(0.0,0.06,life);
  } else {
    p += vec3(sin(aSeed*20.0+uTime*0.6)*0.15*life, life*uRise.y, life*uRise.z + cos(aSeed*13.0+uTime*0.4)*0.12*life);
    vA = smoothstep(0.0,0.15,life)*(1.0-life);
  }
  vSeed=aSeed;
  vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv;
  float sz = uSmoke<0.5 ? uSize*(1.0-0.6*life) : uSize*(0.35+1.4*life);
  gl_PointSize = sz*uScale/max(-mv.z,0.05);
}`;
const SPARK_FS = `varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d); float a=smoothstep(0.5,0.0,r)*vA;
  vec3 c=mix(vec3(1.0,0.35,0.04),vec3(1.0,0.9,0.55),smoothstep(0.25,0.0,r)); gl_FragColor=vec4(c*a*1.6,a); }`;
const SMOKE_FS = `uniform float uAlpha; varying float vA; varying float vSeed; ${NOISE}
void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d); float n=fbm(gl_PointCoord*3.0+vSeed*10.0);
  float a=smoothstep(0.5,0.1,r)*(0.6+0.4*n)*vA*uAlpha; gl_FragColor=vec4(vec3(0.42,0.4,0.38)*(0.8+0.3*n),a); }`;

function seeds(n, s0){ const a=new Float32Array(n); for(let i=0;i<n;i++){ a[i]=((Math.sin((i+1)*12.9898+s0)*43758.5453)%1+1)%1; } return a; }
function points(n, s0, fs, uniforms, blending){
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));
  g.setAttribute('aSeed',new THREE.BufferAttribute(seeds(n,s0),1));
  const m=new THREE.ShaderMaterial({vertexShader:PT_VS,fragmentShader:fs,uniforms,transparent:true,depthWrite:false,blending});
  const p=new THREE.Points(g,m); p.frustumCulled=false; p.renderOrder=5;
  p.onBeforeRender=(r)=>{ const v=new THREE.Vector2(); r.getDrawingBufferSize(v); m.uniforms.uScale.value=v.y*0.5; };
  return p;
}

export function addOvenFire(root, opts={}){
  const find=(n)=>root.getObjectByName(n);
  const bed=find('fire_bed'); if(!bed) throw new Error('food-v5: fire_bed marker not found');
  const cfg=(bed.userData&&bed.userData.fire)||{width:0.62,depth:0.42,height:0.6};
  root.traverse(o=>{ if(/^Flame_\d+/.test(o.name)) o.visible=false; });
  const group=new THREE.Group(); group.name='oven_fire_fx'; bed.add(group);
  const flames=[];
  const layout=[ // x, z, width, height, seed, intensity, speed
    [-0.17, 0.06,0.30,0.46, 1.3,1.00,1.00],[ 0.03,-0.04,0.36,0.62, 4.1,1.10,0.92],[ 0.19, 0.04,0.30,0.44, 7.7,1.00,1.08],
    [-0.07,-0.13,0.32,0.55, 2.9,0.90,0.97],[ 0.11,-0.12,0.30,0.50, 9.4,0.90,1.04],[ 0.00, 0.12,0.26,0.34, 5.6,0.85,1.15],
    [-0.24,-0.06,0.22,0.30, 6.2,0.75,1.10],[ 0.25,-0.05,0.22,0.32, 8.8,0.75,0.95]];
  for(const [x,z,w,h,s,k,sp] of layout){
    const m=new THREE.ShaderMaterial({vertexShader:FLAME_VS,fragmentShader:FLAME_FS,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      uniforms:{uTime:{value:0},uSeed:{value:s},uInt:{value:k},uSpeed:{value:sp}}});
    const hh=h*1.3*(cfg.height/0.6), ww=w*1.15*(cfg.width/0.62); const geo=new THREE.PlaneGeometry(ww,hh); geo.translate(0,hh/2-0.03,0);
    const me=new THREE.Mesh(geo,m); me.position.set(x,0,z); me.renderOrder=4; me.frustumCulled=false;
    me.onBeforeRender=(r,s2,cam)=>{ const wp=new THREE.Vector3(); me.getWorldPosition(wp); const c=cam.getWorldPosition(new THREE.Vector3()); c.y=wp.y; me.lookAt(c); };
    group.add(me); flames.push(me);
  }
  const gm=new THREE.ShaderMaterial({vertexShader:FLAME_VS,fragmentShader:GLOW_FS,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uTime:{value:0}}});
  const glow=new THREE.Mesh(new THREE.PlaneGeometry(0.85,0.38),gm); glow.position.set(0,0.06,0.02); glow.renderOrder=3;
  glow.onBeforeRender=(r,s2,cam)=>{ const wp=new THREE.Vector3(); glow.getWorldPosition(wp); const c=cam.getWorldPosition(new THREE.Vector3()); c.y=wp.y; glow.lookAt(c); };
  group.add(glow);
  // sparks rise from the bed, drift out of the mouth top
  const mouthDZ = (cfg.mouth_z!==undefined) ? (cfg.mouth_z - bed.position.z) : 0.36;
  const sparks=points(64,3.7,SPARK_FS,{uTime:{value:0},uScale:{value:300},uRate:{value:0.55},uRise:{value:new THREE.Vector3(0,1.25,mouthDZ+0.25)},
    uSpread:{value:new THREE.Vector3(0.5,0,0.3)},uSize:{value:0.032},uLife:{value:1},uSmoke:{value:0}},THREE.AdditiveBlending);
  group.add(sparks);
  const smokes=[];
  const sm=find('smoke_mouth');
  if(sm){ const p=points(18,1.1,SMOKE_FS,{uTime:{value:0},uScale:{value:300},uRate:{value:0.16},uRise:{value:new THREE.Vector3(0,1.6,-0.35)},
      uSpread:{value:new THREE.Vector3(0.35,0,0.08)},uSize:{value:0.32},uLife:{value:1},uSmoke:{value:1},uAlpha:{value:0.2}},THREE.NormalBlending); sm.add(p); smokes.push(p); }
  const sc=find('smoke_chimney');
  if(sc){ const p=points(26,8.3,SMOKE_FS,{uTime:{value:0},uScale:{value:300},uRate:{value:0.12},uRise:{value:new THREE.Vector3(0,3.2,-0.6)},
      uSpread:{value:new THREE.Vector3(0.18,0,0.18)},uSize:{value:0.55},uLife:{value:1},uSmoke:{value:1},uAlpha:{value:0.38}},THREE.NormalBlending); sc.add(p); smokes.push(p); }
  const glowMats=[]; root.traverse(o=>{ if(o.isMesh&&o.material&&o.material.userData&&(o.material.userData.embers||o.material.userData.glow)){ if(!glowMats.includes(o.material)) glowMats.push(o.material); } });
  glowMats.forEach(m=>{ m.userData.base=m.emissiveIntensity; });
  const light=opts.light||null; const lightBase=light?light.intensity:0;
  function n1(t){ return 0.5*Math.sin(t*9.7)+0.3*Math.sin(t*17.3+1.3)+0.2*Math.sin(t*31.1+2.1); }
  return {
    group,
    update(t){
      flames.forEach(f=>f.material.uniforms.uTime.value=t); gm.uniforms.uTime.value=t;
      sparks.material.uniforms.uTime.value=t; smokes.forEach(p=>p.material.uniforms.uTime.value=t);
      const k=0.82+0.18*n1(t);
      glowMats.forEach(m=>{ m.emissiveIntensity=m.userData.base*(m.userData.embers? (0.75+0.35*n1(t*0.6+1.0)) : k); });
      if(light) light.intensity=lightBase*(0.8+0.2*n1(t*1.1));
    },
    dispose(){ group.removeFromParent(); smokes.forEach(p=>p.removeFromParent()); }
  };
}
