import * as THREE from './three170.mjs';
import fs from 'node:fs'; import vm from 'node:vm'; import assert from 'node:assert/strict';
const patch=fs.readFileSync(process.env.SHADOW_PATCH || new URL('../05-shadow-release.patch', import.meta.url),'utf8');
const src=patch.split('\n').filter(l=>l.startsWith('+')&&!l.startsWith('+++')).map(l=>l.slice(1)).join('\n');
for(const enabled of [true,false]) {
 const hooks=new Map(),S={shadow:1024},sun=new THREE.DirectionalLight(),window={__LIVEPRESET:{enabled,on:(n,f)=>hooks.set(n,f)}};
 vm.runInNewContext(src,{window,S,sun}); assert.equal(hooks.size,enabled?1:0);
 let freed=0; const make=()=>{const rt=new THREE.WebGLRenderTarget(8,8);rt.addEventListener('dispose',()=>freed++);return rt;};
 for(let i=0;i<20;i++) {sun.shadow.map=make();sun.shadow.mapPass=make();S.shadow=1024;for(const f of hooks.values())f();assert(sun.shadow.map);S.shadow=0;for(const f of hooks.values())f();if(enabled){assert.equal(sun.shadow.map,null);assert.equal(sun.shadow.mapPass,null);assert.equal(freed,2*(i+1));for(const f of hooks.values())f();assert.equal(freed,2*(i+1));}else{sun.shadow.dispose();}}
}
console.log('PASS: disabled no-op, enabled keeps shadow-on maps, 20 release cycles, map+mapPass disposal once, repeated off no-op; Three r170 object test, not GPU allocation test');
