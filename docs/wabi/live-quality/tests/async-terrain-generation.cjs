'use strict';
// Model-level regression for the generation protocol in async-terrain-pr-42.patch.
// This test does not execute the game's bundled worker or prove full-game parity.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const patch = fs.readFileSync(require('node:path').join(__dirname, '../integration/async-terrain-pr-42.patch'), 'utf8');
for (const fragment of [
  'gen:d.gen', 'gen: j.gen', 'e.data.gen !== terrainGen',
  "LIVEPRESET.on('terrain-jobs', () => { terrainGen++; queue = []; pending.clear(); updateChunks(); });"
]) assert.ok(patch.includes(fragment), `missing source guard: ${fragment}`);

let generation = 0;
const pending = new Set(), queue = [], chunks = new Map();
function queueChunk(key) { pending.add(key); queue.push({ key, gen: generation }); }
function switchPreset(key) {
  generation++;
  queue.length = 0;
  pending.clear();
  queueChunk(key);
}
function reply(job, payload) {
  if (job.gen !== generation) return false;
  pending.delete(job.key);
  chunks.set(job.key, payload);
  return true;
}
queueChunk('0,0');
const oldInFlight = queue.shift(); // dispatched by an old preset
switchPreset('0,0');
const currentQueued = queue.shift();
assert.equal(reply(oldInFlight, { preset: 'old' }), false, 'late old reply must be discarded');
assert.ok(pending.has('0,0'), 'old reply must not clear current-generation pending state');
assert.equal(chunks.has('0,0'), false, 'old reply must not replace terrain');
assert.equal(reply(currentQueued, { preset: 'new' }), true);
assert.equal(pending.has('0,0'), false);
assert.deepEqual(chunks.get('0,0'), { preset: 'new' });

queueChunk('1,0');
const twiceOld = queue.shift();
switchPreset('1,0');
const latest = queue.shift();
switchPreset('1,0');
const latestAgain = queue.shift();
assert.equal(reply(twiceOld, { preset: 'stale-0' }), false);
assert.equal(reply(latest, { preset: 'stale-1' }), false);
assert.ok(pending.has('1,0'));
assert.equal(reply(latestAgain, { preset: 'final' }), true);
assert.deepEqual(chunks.get('1,0'), { preset: 'final' });
console.log('async terrain generation model and patch guards: PASS');
