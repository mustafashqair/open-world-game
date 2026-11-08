import assert from 'node:assert/strict';import {compare,hash,coverage} from './compare.mjs';
const a=[{tick:0,state:{player:{x:1,z:2},camera:{yaw:0},npc:[{index:0,values:{x:3,z:4}}]}},{tick:30,state:{player:{x:2,z:2},camera:{yaw:0},npc:[{index:0,values:{x:3,z:4}}]}}];
for(const r of a)for(const k of ['wolf','animal','fauna','bandit','vehicle'])r.state[k]=[];
assert.equal(compare(a,structuredClone(a)).status,'sampled-state-match');const b=structuredClone(a);b[1].state.npc[0].values.x+=1e-6;
assert.equal(compare(a,b).path,'$.state.npc[0].values.x');assert.notEqual(hash(a),hash(b));assert.throws(()=>coverage([],'city'));assert.throws(()=>coverage([{state:{player:{x:0,z:0},camera:{},npc:[]}},{state:{player:{x:0,z:0},camera:{},npc:[]}}],'city'));assert.throws(()=>coverage(a,'wild'));
const missing=structuredClone(a);delete missing[0].state.vehicle;assert.throws(()=>coverage(missing,'city'));
assert.equal(compare([],[]).status,'inconclusive');assert.notEqual(hash(-0),hash(0));assert.notEqual(hash(NaN),hash(null));console.log('PASS: 1e-6 mutation located, hashes differ, empty and zero-NPC traces rejected, missing wild coverage rejected, -0/NaN preserved.');
