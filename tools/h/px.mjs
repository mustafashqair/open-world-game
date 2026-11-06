
import { createRequire } from 'module'; import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/user/tab/files/game-v41/work/drv/node_modules/playwright');
const [url, outf] = process.argv.slice(2); const sleep = ms => new Promise(r => setTimeout(r, ms));
const THR = +(process.env.THR || 4), PRESET = process.env.PRESET || 'vlow', DWELL = +(process.env.DWELL || 15000), AREAS = (process.env.AREAS || 'city,market,village,forest').split(',');
const W = +(process.env.VW || 800), H = +(process.env.VH || 360), DSF = +(process.env.DSF || 2);
const res = { url, PRESET, THR, viewport: [W, H, DSF], errs: [], areas: {} }; const save = () => fs.writeFileSync(outf, JSON.stringify(res, null, 1));
(async () => {
  const b = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox', '--renderer-process-limit=1', '--disable-dev-shm-usage', '--js-flags=--max-old-space-size=2048', '--enable-precise-memory-info'] });
  try {
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF, isMobile: true, hasTouch: true, serviceWorkers: 'block', userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A145F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
  const page = await ctx.newPage(); page.on('pageerror', e => res.errs.push('PAGEERR ' + e.message.slice(0, 300))); page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) res.errs.push(m.text().slice(0, 200)); });
  await page.addInitScript(([pn]) => { Object.defineProperty(navigator, 'deviceMemory', { get: () => 4 }); try { localStorage.setItem('ow_settings2', JSON.stringify({ preset: pn, auto: false, fps: true })); localStorage.setItem('ow_q_applied', 'mobile'); localStorage.setItem('ow_vlow_v50d3', '1'); localStorage.setItem('ow_lowauto_v50d2', '1'); } catch (e) {}
    const o = window.requestAnimationFrame.bind(window); const R = window.__RAF = { acc: {}, n: {}, ticks: 0, last: -1 };
    window.requestAnimationFrame = cb => o(ts => { if (ts !== R.last) { R.last = ts; R.ticks++; } const t = performance.now(); try { cb(ts); } finally { const k = cb.name || 'anon'; R.acc[k] = (R.acc[k] || 0) + performance.now() - t; R.n[k] = (R.n[k] || 0) + 1; } }); }, [PRESET]);

  const settle = async (maxS) => { let last = -1, same = 0, n = 0; for (; n < maxS; n++) { const p = await page.evaluate(() => __dbg.renderer.info.programs.length + ':' + (window.__RAF ? __RAF.ticks : 0)).catch(() => '0:0'); const pc = +p.split(':')[0]; if (pc === last) same++; else { same = 0; last = pc; } if (same >= 4 && n >= 6) break; await sleep(1000); } return [n, last]; };
  const cdp = await ctx.newCDPSession(page); if (THR > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: THR });
  const t0 = Date.now(); await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 });
  const isReady = () => page.evaluate(() => { if (window.__G50ON && window.G50 && G50.st && G50.st.on) return !!G50.st.ready; const ld = document.getElementById('load'); const gone = !ld || ld.style.opacity === '0' || ld.style.display === 'none'; return !!(window.__dbg && gone && __dbg.MODELS && __dbg.MODELS.ready); }).catch(() => false);
  res.ready = -1; for (let i = 0; i < 400; i++) { if (await isReady()) { res.ready = Date.now() - t0; break; } await sleep(1000); } save();
  res.progsReady = await page.evaluate(() => __dbg.renderer.info.programs.length).catch(() => -1); await page.click('#sgPlay').catch(e => res.errs.push('play ' + e)); await sleep(8000); res.settle0 = await settle(90);
  res.env = await page.evaluate(() => { const r = __dbg.renderer, c = r.domElement; return { pr: r.getPixelRatio(), canvas: [c.width, c.height], css: [c.clientWidth, c.clientHeight], shadows: r.shadowMap.enabled, preset: (JSON.parse(localStorage.getItem('ow_settings2')||'{}')).preset, progs: r.info.programs.length, prf: !!(window.PRF && PRF.on), shAuto: r.shadowMap.autoUpdate, shType: r.shadowMap.type, castLights: (() => { const a = []; __dbg.scene.traverse(o => { if (o.isLight && o.castShadow) a.push(o.type + ' vis=' + o.visible + ' map=' + (o.shadow && o.shadow.mapSize ? o.shadow.mapSize.x : '-')); }); return a; })() }; }).catch(e => String(e)); save();
  const places = await page.evaluate(() => { const d = __dbg, C = d.CITY, v = d.VILLAGES.find(v => /تل الأمل/.test(v.name)), P = d.PL; return { spawn: [P.x, P.z], village: [v.x - 6, v.z - 4], city: [C.x, C.z], market: [C.x + 30, C.z - 25], palace: [C.x + 8, C.z + 70], forest: [P.x + 260, P.z - 120] }; });
  res.places = places;
  for (const nm of AREAS) { const p = places[nm]; const A = res.areas[nm] = {};
    await page.evaluate(p => { __dbg.tp(p[0], p[1]); __dbg.CAM.yaw = 0.6; __dbg.CAM.pitch = 0.22; }, p);
    A.settle = await settle(45);
    await page.evaluate(p => { __dbg.tp(p[0], p[1]); __dbg.CAM.yaw = 0.6; __dbg.CAM.pitch = 0.22; window.__t0 = __RAF.ticks; }, p);
    for (let i = 0; i < 30; i++) { const t = await page.evaluate(() => __RAF.ticks - __t0); if (t >= 40 && i >= 4) break; await sleep(1000); }
    A.ticks = await page.evaluate(() => __RAF.ticks - __t0);
    await page.screenshot({ path: outf.replace('.json', '_' + nm + '.jpg'), type: 'jpeg', quality: 90 }).catch(() => {});
    A.info = await page.evaluate(() => { const r = __dbg.renderer, sc = __dbg.scene; let vis = 0, lights = 0; sc.traverseVisible(o => { if (o.isMesh) vis++; if (o.isLight) lights++; }); return { progs: r.info.programs.length, vis, lights, pl: [__dbg.PL.x, __dbg.PL.z], g2l: window.G2L && G2L.st, G2C: window.__G2C && __G2C.k, fog: [Math.round(sc.fog.near), Math.round(sc.fog.far)], night: +(__dbg.U ? __dbg.U.uNight.value : -1) }; }).catch(e => String(e));
    save(); }
  } catch (e) { res.errs.push('FATAL ' + String(e).slice(0, 300)); save(); } finally { await b.close(); save(); }
})();
