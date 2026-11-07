// One admission queue for all mixer-based NPC families. Real clips stay unchanged.
// Tab v50g4 port: by default a deferred NPC keeps moving smoothly with the simulation and only its
// skeleton pose waits for its next admission (no position steps at mid distance). hold() === true
// (?g4ahold=1) restores Comma's original behaviour: hold the whole rendered transform with the pose.
export function createAnimationBudget(THREE, enabled, getScene, getCamera, getPlayer, getOrigin, getLimit, hold = () => false) {
  const entries = new WeakMap(), pending = new Set(), restore = [], world = new THREE.Vector3(), camera = new THREE.Vector3();
  let serial = 0, tick = 0;
  const st = { limit: 0, requested: 0, active: 0, deferred: 0, hidden: 0, hiddenTotal: 0, peak: 0, frame: 0, held: 0 };
  function enqueue(mixer, dt, update) {
    if (!enabled() || !(dt > 0)) return update.call(mixer, dt);
    const root = mixer.getRoot(); let visible = true, attached = false, player = false;
    for (let p = root; p; p = p.parent) { visible &&= p.visible; if (p === getPlayer()) player = true; if (p === getScene()) { attached = true; break; } }
    // Player, inventory previews and detached bake rigs keep their exact timeline.
    if (!attached || player) return update.call(mixer, dt);
    let e = entries.get(mixer);
    if (!e) { e = { mixer, root, update, dt: 0, last: -1, id: serial++, pose: null }; entries.set(mixer, e); }
    e.dt += dt; e.visible = visible;
    if (visible) pending.add(e); else { e.dt = Math.min(e.dt, 0.6); st.hidden++; st.hiddenTotal++; }
    return mixer;
  }
  function flush() {
    if (!enabled()) { for (const e of pending) { e.update.call(e.mixer, e.dt); e.dt = 0; } pending.clear(); return; }
    tick++; getCamera().getWorldPosition(camera);
    const list = [...pending]; pending.clear();
    for (const e of list) { e.root.getWorldPosition(world); e.distance = world.distanceToSquared(camera); }
    // Nearest six always get full rate; remaining slots rotate by oldest admission.
    list.sort((a, b) => a.distance - b.distance || a.id - b.id);
    const full = list.splice(0, 6); list.sort((a, b) => a.last - b.last || a.distance - b.distance || a.id - b.id);
    const limit = getLimit(), admitted = full.concat(list.splice(0, Math.max(0, limit - full.length)));
    st.limit = limit; st.requested = admitted.length + list.length; st.active = admitted.length; st.deferred = list.length; st.peak = Math.max(st.peak, st.active); st.frame = tick;
    const origin = getOrigin(), held = hold(); st.held = held ? list.length : 0;
    for (const e of admitted) {
      e.update.call(e.mixer, e.dt); e.dt = 0; e.last = tick;
      if (held) { e.root.updateWorldMatrix(true, true); e.pose = e.root.matrixWorld.clone(); e.ox = origin.x; e.oz = origin.z; }
    }
    if (!held) { for (const e of list) e.pose = null; return; }
    for (const e of list) {
      const r = e.root;
      if (!e.pose) { r.updateWorldMatrix(true, true); e.pose = r.matrixWorld.clone(); e.ox = origin.x; e.oz = origin.z; }
      // Hold the rendered actor transform WITH its held mocap pose. Simulation keeps
      // running, but feet never translate over the ground while their pose is paused.
      r.parent?.updateWorldMatrix(true, false);
      restore.push([r, r.matrix.clone(), r.matrixAutoUpdate]);
      const pose = e.pose.clone(); pose.elements[12] += e.ox - origin.x; pose.elements[14] += e.oz - origin.z;
      r.matrix.copy(r.parent ? r.parent.matrixWorld.clone().invert().multiply(pose) : pose);
      r.matrixAutoUpdate = false; r.matrixWorldNeedsUpdate = true; r.updateMatrixWorld(true);
    }
  }
  function after() { st.hidden = 0; for (const [r, matrix, auto] of restore.reverse()) { r.matrix.copy(matrix); r.matrixAutoUpdate = auto; r.matrixWorldNeedsUpdate = true; } restore.length = 0; }
  return { enqueue, flush, after, st };
}
