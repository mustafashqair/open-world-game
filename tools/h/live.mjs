
import { createRequire } from 'module'; import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/user/tab/files/game-v41/work/drv/node_modules/playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms)); const out = process.argv[2]; const res = [];
const jobs = [['open-world-mustafa-v50d','vlow'],['open-world-mustafa-v50d','low'],['open-world-mustafa-v50d','medium'],['open-world-mustafa-v50d','high'],['open-world-mustafa-test-offline','vlow']];
(async () => { const b = await chromium.launch({ headless: true, args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox','--renderer-process-limit=1','--disable-dev-shm-usage','--js-flags=--max-old-space-size=2048'] });
 try { for (const [slug, pn] of jobs) { const r = { slug, pn, errs: [], warns404: 0 }; res.push(r);
  const ctx = await b.newContext({ viewport: { width: 800, height: 360 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A145F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
  const page = await ctx.newPage(); page.on('pageerror', e => r.errs.push('PAGEERR ' + e.message.slice(0, 200))); page.on('console', m => { if (m.type() === 'error') { if (/404|Failed to load resource/.test(m.text())) r.warns404++; else r.errs.push(m.text().slice(0, 200)); } });
  await page.addInitScript(([pn]) => { try { localStorage.setItem('ow_settings2', JSON.stringify({ preset: pn, auto: false, fps: true })); localStorage.setItem('ow_q_applied', 'mobile'); localStorage.setItem('ow_vlow_v50d3', '1'); localStorage.setItem('ow_lowauto_v50d2', '1'); } catch (e) {} }, [pn]);
  const t0 = Date.now(); await page.goto('https://' + slug + '.sites.tab.bot/?nc=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 300000 });
  r.ready = -1; for (let i = 0; i < 420; i++) { const ok = await page.evaluate(() => { if (window.__G50ON && window.G50 && G50.st && G50.st.on) return !!G50.st.ready; return !!(window.__dbg && __dbg.MODELS && __dbg.MODELS.ready); }).catch(() => false); if (ok) { r.ready = Date.now() - t0; break; } await sleep(1000); }
  await page.click('#sgPlay').catch(e => r.errs.push('play ' + String(e).slice(0, 100))); await sleep(12000);
  r.info = await page.evaluate(async () => ({ badge: (document.getElementById('v40badge') || {}).textContent, title: document.title, preset: window.S ? S.preset : (JSON.parse(localStorage.getItem('ow_settings2') || '{}').preset), caches: await caches.keys().catch(() => []), sw: navigator.serviceWorker && navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : null, g2: window.G2L ? G2L.on : null, fps: (document.getElementById('fpsL') || {}).textContent })).catch(e => String(e));
  await page.screenshot({ path: out.replace('.json', '_' + slug.slice(-6) + '_' + pn + '.jpg'), type: 'jpeg', quality: 70 }).catch(() => {});
  fs.writeFileSync(out, JSON.stringify(res, null, 1)); await ctx.close(); } } catch (e) { res.push({ fatal: String(e) }); } finally { await b.close(); fs.writeFileSync(out, JSON.stringify(res, null, 1)); } })();
