import * as THREE from './three170.mjs';import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const text=fs.readFileSync('v50g3/code/part-002.txt','utf8');const src=text.slice(text.indexOf('const LAM ='),text.indexOf('window.__C23'))+'\nwindow.test={LAM,G2L};';
let passed=0;
for(const start of ['vlow','low','medium','high'])for(const end of ['vlow','low','medium','high'])if(start!==end)for(const l3 of [true,false]) {
 const hooks=new Map(),S={preset:start},scene=new THREE.Scene(),GLB_MAT=new Set(),window={__QUALITY:'mobile',__LIVEPRESET:{enabled:true,on:(n,f)=>hooks.set(n,f)}};
 const material=new THREE.MeshStandardMaterial({color:0x123456});const tex=new THREE.Texture();material.map=tex;const mesh=new THREE.Mesh(new THREE.BoxGeometry(),material);scene.add(mesh);for(let i=0;i<7;i++){const l=new THREE.PointLight(0xffffff,1);l.position.x=i;scene.add(l);}scene.updateMatrixWorld(true);const camera=new THREE.PerspectiveCamera();camera.updateMatrixWorld();
 let textureDisposed=0;tex.addEventListener('dispose',()=>textureDisposed++);const renderer={render(){},compile(){},compileAsync(){return Promise.resolve()},properties:{get:()=>({})}};
 const context={location:{search:''},THREE,scene,renderer,S,GLB_MAT,window,WeakRef,console,Q4:new URLSearchParams(),G2V:()=>S.preset==='vlow',G3V:()=>l3&&S.preset==='vlow',L3AMB:{inject(){},k:1}};vm.runInNewContext(src,context);const {LAM,G2L}=window.test;
 LAM.apply(scene);assert.equal(mesh.material.type,start==='vlow'?'MeshLambertMaterial':'MeshStandardMaterial');
 S.preset=end;for(const f of hooks.values())f();
 assert.equal(mesh.material.type,end==='vlow'?'MeshLambertMaterial':'MeshStandardMaterial');assert.equal(G2L.on,end==='vlow');assert.equal(G2L.L3,l3&&end==='vlow');
 const wrapper=renderer.render;let disposedLights=0;const created=[];
 for(let i=0;i<20;i++){S.preset=i%2?'high':'vlow';for(const l of scene.children)if(l.userData.g2d&&!created.includes(l)){created.push(l);l.addEventListener('dispose',()=>disposedLights++);}for(const f of hooks.values())f();renderer.render(scene,camera);assert(scene.children.filter(o=>o.isPointLight&&!o.userData.g2d).every(o=>o.visible===true));assert.equal(scene.children.filter(o=>o.userData.g2d).length,S.preset==='vlow'&&!l3?4:0);}
 assert.equal(GLB_MAT.size,0);assert.equal(textureDisposed,0);assert.equal(mesh.material,material);if(G2L.on)assert.equal(renderer.render,wrapper);
 // dispose materials while test context still owns them; reset prototype hook for independent next case
 delete THREE.PointLight.prototype.visible;passed++;
}
console.log(`PASS ${passed} directional/configuration cases with 20 back-and-forth switches each: real Three.js materials restored, dummy light count bounded, original textures never disposed. Mock renderer only; no GPU assertion.`);
