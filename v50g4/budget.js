// v50g4 shared frame budget (Tab): ONE main-thread budget per rendered frame for all v50g4 background
// work - the upload/compile queue (v50g4-1) and the residency scan/evictions (v50g4-3) charge the same
// pool, so a scan frame and an upload frame never stack. Frame identity = the rAF timestamp
// (document.timeline.currentTime is constant inside one animation frame).
export function frameBudget(ms = 2) {
  const B = globalThis.__g4Budget || (globalThis.__g4Budget = { ms, frame: null, used: 0, st: { frames: 0, maxUsed: 0, over: 0 } });
  return B;
}
function sync(B) {
  const f = typeof document !== 'undefined' && document.timeline ? document.timeline.currentTime : Math.floor(performance.now() / 16);
  if (f !== B.frame) { if (B.used > B.ms) B.st.over++; B.frame = f; B.used = 0; B.st.frames++; }
}
export function budgetLeft(B) { sync(B); return B.ms - B.used; }
export function budgetCharge(B, ms) { sync(B); B.used += ms; if (B.used > B.st.maxUsed) B.st.maxUsed = B.used; }
