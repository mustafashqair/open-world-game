# URL-flag parsing audit and minimal fixes

Base: `mustafashqair/open-world-game`, `tab/v50g3` at `65fc5d3628908efc89ecac7496f2b93998bf6c53`. Scope checked: the joined three code parts and root `index.html`.

## Result

Fixed 15 unsafe/unbounded URL expressions in the three code-part files; no changes to `index.html`. No push was made. The previously inconsistent `perf` read now uses the exact same `URLSearchParams.get('perf') !== '0'` rule at both `part-000:1041` and `part-002:3051`. One intentional dual-use `fx` parameter remains flagged below: its two consumers have different value semantics (`!== '0'` versus `=== 'quarks'`); unifying them would change valid URLs, contrary to the preservation requirement. Its provider-selector expression was changed from an unbounded regex to exact `get('fx') === 'quarks'`, fixing prefix matching.

`node --check` passed on the concatenation of parts 000+001+002. `git diff --check` passed. There was no `index.html` edit, so its inline scripts were not touched or separately checked. An automated scan found 39 regex `.test(location.search)` expressions; every remaining such regex ends with `\b` after these changes.

## Inventory: every location.search / URLSearchParams read

Expression defaults are stated as the result when the flag is absent; conditional scopes (preset, localStorage, feature gates) are noted. Rows marked `OK` have exact URLSearchParams key/value reads or an end-bounded regex. `BAD→fixed` were unsafe on the base revision. `BAD†` is the unavoidable intentional dual-use case described above.

### `v50g3/code/part-000.txt`

| Line | Flag(s) / expression | Default and status |
|---|---|---|
| 14 | `V4ON(k): Q4.get(k) !== '0'`; callers: `tree4` (2144), `npc4` (1709; 4300,4304), `ter4` (p1:279), `med5` (p1:4251), `palfar` (p1:4255), `palv`,`low5`,`pal5` (p1:4278), `mc5`,`cc5` (p2:3594), `hidskip` (p2:3596), `mix4` (p2:3606), `atmo4` (p2:4162,4197). | Each defaults enabled when absent; some only apply for their stated preset. **OK** (exact key/value). |
| 15 | `v50g2` regex `!/[?&]v50g2=0\b/`; `G2V(k)` reads `g2${k}` for `g2city`,`g2pal`,`g2npc`,`g2mm`,`g2cull`,`g2pre` (`city`: p0:1959,1961; `pal`: p1:4288; `npc`: p1:4300; `mm`: p2:2385; `cull`: p2:3025; `pre`: p2:2971,3515). | `v50g2` and each `g2*` default on; G2V is active only on vlow. **OK** (end boundary / exact get). |
| 16 | `v50g3` regex `!/[?&]v50g3=0\b/`; `G3V(k)` flags `lights3` (p2:2946,2971) and `merge3` (p2:3159); `l3amb` numeric `+(get('l3amb') || 1)`. | v50g3/lights3/merge3 default on (G3V only vlow); l3amb defaults 1. **OK**. |
| 18 | `pp1` regex `!/[?&]pp1=0\b/`; `PP1(k)` flags `pp1mix` (p0:1710; p1:3612), `pp1inst` (p1:1334; p2:3180), `pp1sh` (p2:3519), `pp1fps` (p2:3628). | All default on; PP1 effects are gated to low/vlow. **OK**. |
| 22–23 | `vmdl`: `q.get('vmdl') === '0'` disables VLOW4. | No opt-out by default; VLOW4 still requires the saved preset to be vlow and not high. **OK**. |
| 35–39 | `texcap`, `texcapc`: numeric `get(k)` with contextual defaults; `?texcap=0` disables cap. | texcap defaults 256 vlow / 512 other non-high mobile / 0 high; texcapc defaults 512 low/vlow / 0 otherwise. **OK**. |
| 67–71 | `v40` (`!== 'off'`); `env`,`fx`,`csm`,`fog`,`snd` (`V40_ON && get(k)!=='0'`); `charenv` default `sky`; `fxtier` default empty; numeric `envk=.45`,`hemik=.6`,`chark=2.6`,`aer=.22`. | v40 and toggles default on; other values use listed fallback. `fx` is **BAD†** only because `fx` is also read at p2:4205 with selector semantics `=== 'quarks'`; different value-domain meanings are intentional. |
| 126 | `hf`: `!/[?&]hf=0\b/`. | On unless hf=0. **OK**. |
| 187, 194 | `lowauto`: exact `get('lowauto') !== '0'` / `=== '0'`. | Auto behavior is not disabled by default. Same flag and same exact rule. **OK**. |
| 681 | `palace3d`: `get('palace3d') !== '0'`. | On. **OK**. |
| 682 | `city2`: `!/[?&]city2=0\b/`. | On. **OK**. |
| 776 | `npckeep`: `!/[?&]npckeep=0\b/`. | On when PAL3D is on. **OK**. |
| 1041 | `perf`: now `get('perf') !== '0'` (base used unbounded `/[?&]perf=0/`). | On; now same exact rule as p2:3051. **BAD→fixed**. |

### `v50g3/code/part-001.txt`

| Line | Flag / expression | Default and status |
|---|---|---|
| 215 | `notb`: `!/notb\b/`; `nosh2`: `!/nosh2\b/`. | Terrain block merge and shadow update default on. **BAD→fixed**: added end boundaries. |
| 855 | `vil4=0`: `/[?&]vil4=0\b/`. | Village VIL4 modifications default on; flag opts out. **BAD→fixed**: 0-value boundary added. |
| 1007 | `gatehi=1`: `/[?&]gatehi=1\b/`. | Full gate model only selected by flag; lite remains default on non-high. **BAD→fixed**. |
| 2027 | `nofar`: `!/nofar\b/`. | Far route enabled. **BAD→fixed**. |
| 2399 | `nolod`: `!/nolod\b/`. | LOD16 enabled. **BAD→fixed**. |
| 3063 | `occ16`: `/occ16\b/`. | Diagnostic capture off. **BAD→fixed**. |
| 3955 | `kv1`,`kv2`,`kv3`,`kv4`: ordered `/[?&]kvN\b/`; first matching variant wins; fallback v5. | All off by default. **OK**. |
| 3986 | `nokiosk`: `/[?&]nokiosk\b/`. | Kiosk build on. **BAD→fixed**. |
| 3994 | `vwork=0`: `/[?&]vwork=0\b/`. | VWORK on. **OK**. |
| 4021 | `vworkfix=0`: `/[?&]vworkfix=0\b/`. | Fixes on; only applies when `only` is false. **OK**. |
| 4051 | `v50e=0`: `/[?&]v50e=0\b/`. | NOE off. **OK**. |
| 4076 | `v50f=0` or `hem5=0`: `/[?&](v50f|hem5)=0\b/`. | HEM5 on. **OK**. |
| 4105 | `v50f=0` or `surf5=0`: `/[?&](v50f|surf5)=0\b/`. | SURF5 on. **OK**. |
| 4205 | `precompile=0`: `/[?&]precompile=0\b/`. | precompile completion flag false; not yet skipped. **OK**. |
| 4227 | `novwork`: `/[?&]novwork\b/`. | VWORK build proceeds; same exact flag/rule as p2:3439. **OK**. |
| 4240 | `est_dc=0`: `/[?&]est_dc=0\b/`. | NODC false. **OK**. |
| 4241 | `pal_hi`: `/[?&]pal_hi\b/`. | Hi variant not selected; lite on non-high. **OK**. |

### `v50g3/code/part-002.txt`

| Line | Flag / expression | Default and status |
|---|---|---|
| 796 | `horsefix=0`: `/[?&]horsefix=0\b/`. | Horse fix on. **BAD→fixed**. |
| 2942 | `grassfix=0`: `/[?&]grassfix=0\b/`. | Fix on. **OK**. |
| 2943 | `lowcull=0`: `/[?&]lowcull=0\b/`. | Low culling active on vlow. **OK**. |
| 2944 | `lowlam=0`: `/[?&]lowlam=0\b/`. | LAM fix on. **OK**. |
| 3051 | `perf`: exact `Q.get('perf') !== '0'`; `perf_log`,`perf_warm`,`perf_live`,`perf_img` via `get('perf_'+k) !== '0'`; warm/live/env use `get('perf_'+k)==='1'`; `shaderlog` via truthiness `!!get('shaderlog')`. | perf and optional toggles default on; opt-in warm/live/env and shaderlog default off. `perf` now matches p0:1041 exactly. **OK**. |
| 3129 | `merge`: `get('merge') !== '0'`. | On. **OK**. |
| 3134–35 | `merge_cell` default 96, `merge_celli` 512, `merge_settle` 40 (numeric); `merge_dbg==='1'`; `merge_ic`,`merge_arr`,`merge_zero` via `get('merge_'+k)!=='0'`. | Numeric defaults listed; dbg off, feature toggles on. **OK**. |
| 3336, 3346, 3392 | `warm2 !== '0'`; `warm2_lights==='0'`; `warm2_visit==='0'`. | WARM2 and its normal visits/lights on. **OK**. |
| 3439 | `novwork`: `/[?&]novwork\b/`. | Used to satisfy readiness bypass; same rule as p1:4227. **OK**. |
| 3540–41 | `g50live !== '0'`. | Live menu enabled except vlow. **OK**. |
| 3569 | `frz === '0'`. | Freeze feature on only for vlow, unless disabled. **OK**. |
| 3581 | `anim6 !== '0'`. | On. **OK**. |
| 3594, 3596, 3606 | `mc5`,`cc5`,`hidskip`,`mix4`: `V4ON(k)`, declared at p0:14. | On when absent; see p0:14 for all call-site names. **OK**. |
| 3627 | `v50g2=0` or `hudfix=0`: `/[?&](v50g2|hudfix)=0\b/`. | HUDFIX on; v50g2 shares same 0/off meaning as p0:15. **OK**. |
| 3633 | `prof=1`: `/[?&]prof=1\b/`. | Off. **OK**. |
| 3645 | `fcap=0`: `/[?&]fcap=0\b/`. | Frame cap on. **OK**. |
| 4012–16 | `water`,`atmo`: `!== '0'`; `clouds` tri-state (`1` on, `0` off, otherwise local preference); numeric `atmos=12`,`atmok=10`,`wres=0`; `sunb=.11` when absent. | water/atmo on; clouds uses saved preference; numeric defaults shown. **OK**. |
| 4205 | `fx`: `get('fx') === 'quarks'` OR localStorage `ow_fx==='quarks'` (URL clause now exact; base was unbounded regex). | Off absent URL/localStorage choice. **BAD→fixed** for prefix values; **BAD†** dual-use with p0:69. |
| 4238 | `phys=rapier`: `/[?&]phys=rapier\b/` OR saved localStorage selection. | Off unless exact URL selection or saved selection. **BAD→fixed**. |
| 4274 | `nav=recast`: `/[?&]nav=recast\b/` OR saved localStorage selection. | Off by default. **BAD→fixed**. |
| 4308 | `sfx=howler`: `/[?&]sfx=howler\b/` OR saved localStorage selection. | Off by default. **BAD→fixed**. |
| 4334 | `combat=rapier`: `/[?&]combat=rapier\b/` OR saved localStorage selection. | Off by default. **BAD→fixed**. |

### Root `index.html`

| Line | Flag / expression | Default and status |
|---|---|---|
| 556 | `v50g`: `get('v50g') !== '0'` (inside try/catch, fallback true). | On. **OK**. |
| 975, 978 | `hud`: `Q.get('hud') === '1'`. | HUD override off unless `hud=1`; other UI defaults from saved settings. **OK**. |
| 1016 | `g50demo`: `Q.get('g50demo') === '1'`. | No hold by default; released. **OK**. |
| 1148, 1161 | `q`: exact value; only `high` or `mobile` accepted, else saved/auto preference. | Default auto/saved. **OK**. |

`index.html:1210` reads `u.search` to preserve an existing resource URL's query while sharding files; it is not a read of `location.search` nor a game flag, so it is outside the requested flag inventory.

## Tests for every changed expression

The tables compare the old base expression with the patched expression. For raw regex tables, `match` means the test expression matched; the consuming code's `!` inversion (where present) is unchanged. For `perf`, values show effective EMB42 `P46E` (enabled/disabled). FX table checks only the URL clause with localStorage unset; the independent saved setting remains unchanged.

| Fixed expression | Test string | Old | New |
|---|---|---:|---:|
| p0:1041 `perf` enabled | `?perf=0` | disabled | disabled |
|  | `&perf=0` | disabled | disabled |
|  | `?perf=01` | disabled | enabled |
|  | `?perf=0x` | disabled | enabled |
|  | `?perf=0&a=1` | disabled | disabled |
|  | no flag | enabled | enabled |
| p1:215 `notb` match | `?notb` / `&notb` | match | match |
|  | `?notbad=1` | match | no match |
|  | no flag | no match | no match |
| p1:215 `nosh2` match | `?nosh2` / `&nosh2` | match | match |
|  | `?nosh20=1` | match | no match |
|  | no flag | no match | no match |
| p1:855 `vil4=0` match | `?vil4=0` / `&vil4=0` | match | match |
|  | `?vil4=01` / `?vil4=0x` | match | no match |
|  | `?vil4=0&a=1` / no flag | match / no match | match / no match |
| p1:1007 `gatehi=1` match | `?gatehi=1` / `&gatehi=1` | match | match |
|  | `?gatehi=10` / `?gatehi=1x` | match | no match |
|  | `?gatehi=1&a=1` / no flag | match / no match | match / no match |
| p1:2027 `nofar` match | `?nofar` / `&nofar` | match | match |
|  | `?nofaraway=1` | match | no match |
|  | no flag | no match | no match |
| p1:2399 `nolod` match | `?nolod` / `&nolod` | match | match |
|  | `?nolody=1` | match | no match |
|  | no flag | no match | no match |
| p1:3063 `occ16` match | `?occ16` / `&occ16` | match | match |
|  | `?occ160=1` | match | no match |
|  | no flag | no match | no match |
| p1:3986 `nokiosk` match | `?nokiosk` / `&nokiosk` | match | match |
|  | `?nokiosks=1` | match | no match |
|  | `?nokiosk=1&a=1` / no flag | match / no match | match / no match |
| p2:796 `horsefix=0` match | `?horsefix=0` / `&horsefix=0` | match | match |
|  | `?horsefix=01` / `?horsefix=0x` | match | no match |
|  | `?horsefix=0&a=1` / no flag | match / no match | match / no match |
| p2:4205 `fx=quarks` URL match | `?fx=quarks` / `&fx=quarks` | match | match |
|  | `?fx=quarksx` | match | no match |
|  | `?fx=quarks&a=1` / no flag | match / no match | match / no match |
| p2:4238 `phys=rapier` URL match | `?phys=rapier` / `&phys=rapier` | match | match |
|  | `?phys=rapierx` | match | no match |
|  | `?phys=rapier&a=1` / no flag | match / no match | match / no match |
| p2:4274 `nav=recast` URL match | `?nav=recast` / `&nav=recast` | match | match |
|  | `?nav=recastx` | match | no match |
|  | `?nav=recast&a=1` / no flag | match / no match | match / no match |
| p2:4308 `sfx=howler` URL match | `?sfx=howler` / `&sfx=howler` | match | match |
|  | `?sfx=howlerx` | match | no match |
|  | `?sfx=howler&a=1` / no flag | match / no match | match / no match |
| p2:4334 `combat=rapier` URL match | `?combat=rapier` / `&combat=rapier` | match | match |
|  | `?combat=rapierx` | match | no match |
|  | `?combat=rapier&a=1` / no flag | match / no match | match / no match |

The test script evaluated the old and patched predicates directly in Node. All intended forms and defaults shown stayed identical; only values/parameter names with appended word characters changed to non-match (and perf's malformed `0...` values changed back to enabled).

## Not verified / remaining

- No browser/game runtime was launched; this is a parsing-level audit, not proof of every feature's downstream behavior.
- No exhaustive Cartesian/property test of every arbitrary URL string or duplicate-parameter ordering was run; `URLSearchParams.get` uses its standard first-value behavior. The tests cover requested normal forms, defaults, and representative malformed suffixes.
- `fx` is deliberately dual-purpose (`fx=0` disables V40 FX; `fx=quarks` selects FX42). It remains flagged under the literal “same flag with two different rules” criterion; changing that contract safely requires the owner to decide whether to rename/redefine one use, explicitly outside this scope. The FX42 regex itself now uses exact key/value parsing.
- No PR, commit, push, or GitHub artifact was created; the working diff is local for the owner to apply.

## Unified diffs

### `v50g3/code/part-000.txt`

```diff
diff --git a/v50g3/code/part-000.txt b/v50g3/code/part-000.txt
index f86d678..d5e5bc5 100644
--- a/v50g3/code/part-000.txt
+++ b/v50g3/code/part-000.txt
@@ -1038,7 +1038,7 @@ function normModel(tpl, d) {                     // توحيد المقياس: 
   return wrap;
 }
 const EMBED = {};   // v42: النماذج المضمّنة صارت ملف ثنائي منفصل (v42/emb) بدل نص base64 جوّا الكود
-const EMB42 = (() => { const P46E = !/[?&]perf=0/.test(location.search); const I = {"guard":[0,566740],"male":[566740,508736],"female":[1075476,563496],"wolf":[1638972,588552],"donkey":[2227524,643520],"houseA":[2871044,57308],"houseB":[2928352,107508],"houseC":[3035860,151996],"houseD":[3187856,591168],"wall":[3779024,18272],"cCastle":[3797296,476612],"cGate":[4273908,146812],"cBarracks":[4420720,582340],"cTemple":[5003060,291532],"cFort":[5294592,42220],"cInn":[5336812,467464],"cSaw":[5804276,307992],"cStall":[6112268,63164],"cMill":[6175432,124976],"houseE":[6300408,94904],"houseF":[6395312,357640],"vMill":[6752952,135996],"viking":[6888948,289972],"berserk":[7178920,313492],"tent":[7492412,16264],"campfire":[7508676,48572],"fire":[7557248,18560],"forge":[7575808,1723720],"foodApple":[9299528,35740],"foodBread":[9335268,29316],"foodSteak":[9364584,25312],"foodBottle":[9389896,15376],"foodPot":[9405272,15016],"nhA":[9420288,174912],"nhB":[9595200,92248],"nhC":[9687448,56892],"nhD":[9744340,105568],"nhE":[9849908,73888],"nhF":[9923796,53368],"wlS":[9977164,15948],"wlG":[9993112,46836],"wlQ":[10039948,42016],"wlC":[10081964,118016],"wlR":[10199980,53020],"pSt0":[10253000,10760],"pSt1":[10263760,10760],"pSt2":[10274520,10760],"pCt0":[10285280,57636],"pCt1":[10342916,57636],"pCt2":[10400552,57636],"pWell":[10458188,16632],"pBench":[10474820,4324],"pLamp":[10479144,6584],"pT1":[10485728,7100],"pT2":[10492828,6376],"pT3":[10499204,4052],"pT4":[10503256,4784]}, N = 13, L = 10508040; let AB = null;
+const EMB42 = (() => { const P46E = new URLSearchParams(location.search).get('perf') !== '0'; const I = {"guard":[0,566740],"male":[566740,508736],"female":[1075476,563496],"wolf":[1638972,588552],"donkey":[2227524,643520],"houseA":[2871044,57308],"houseB":[2928352,107508],"houseC":[3035860,151996],"houseD":[3187856,591168],"wall":[3779024,18272],"cCastle":[3797296,476612],"cGate":[4273908,146812],"cBarracks":[4420720,582340],"cTemple":[5003060,291532],"cFort":[5294592,42220],"cInn":[5336812,467464],"cSaw":[5804276,307992],"cStall":[6112268,63164],"cMill":[6175432,124976],"houseE":[6300408,94904],"houseF":[6395312,357640],"vMill":[6752952,135996],"viking":[6888948,289972],"berserk":[7178920,313492],"tent":[7492412,16264],"campfire":[7508676,48572],"fire":[7557248,18560],"forge":[7575808,1723720],"foodApple":[9299528,35740],"foodBread":[9335268,29316],"foodSteak":[9364584,25312],"foodBottle":[9389896,15376],"foodPot":[9405272,15016],"nhA":[9420288,174912],"nhB":[9595200,92248],"nhC":[9687448,56892],"nhD":[9744340,105568],"nhE":[9849908,73888],"nhF":[9923796,53368],"wlS":[9977164,15948],"wlG":[9993112,46836],"wlQ":[10039948,42016],"wlC":[10081964,118016],"wlR":[10199980,53020],"pSt0":[10253000,10760],"pSt1":[10263760,10760],"pSt2":[10274520,10760],"pCt0":[10285280,57636],"pCt1":[10342916,57636],"pCt2":[10400552,57636],"pWell":[10458188,16632],"pBench":[10474820,4324],"pLamp":[10479144,6584],"pT1":[10485728,7100],"pT2":[10492828,6376],"pT3":[10499204,4052],"pT4":[10503256,4784]}, N = 13, L = 10508040; let AB = null;
   const one = (i, n) => fetch('./v42/emb/e-' + String(i).padStart(3, '0') + '.txt?v=74016c9b').then(r => { if (!r.ok) throw new Error('emb ' + i + ' HTTP ' + r.status); return r.arrayBuffer(); }).catch(e => { if (n > 0) return new Promise(z => setTimeout(z, 800 * (4 - n))).then(() => one(i, n - 1)); throw e; });
   const ready = Promise.all(Array.from({ length: N }, (_, i) => one(i, 3))).then(bs => { const u = new Uint8Array(L); let o = 0; for (const b of bs) { u.set(new Uint8Array(b), o); o += b.byteLength; } if (o !== L) throw new Error('emb size ' + o + ' != ' + L); AB = u.buffer; return AB; });
   return { I, ready, has: k => !!I[k], get: k => { const e = I[k]; return e && AB ? AB.slice(e[0], e[0] + e[1]) : null; }, size: k => I[k] ? I[k][1] : 0, free: () => { if (P46E) AB = null; } }; })();
```

### `v50g3/code/part-001.txt`

```diff
diff --git a/v50g3/code/part-001.txt b/v50g3/code/part-001.txt
index ca9d3e1..1dbf0f8 100644
--- a/v50g3/code/part-001.txt
+++ b/v50g3/code/part-001.txt
@@ -212,7 +212,7 @@ function addChunk(cx, cz, res, r, gr) {         // بناء شبكة القطع
 }
 
 /* ═══ v24 أداء: (١) القطع البعيدة من الأرض تُدمج في شبكة واحدة (نداء رسم واحد بدل ~٤٠)، القريبة (٣×٣) تبقى كما هي؛ (٢) خريطة الظل تُحدَّث كل إطارين ═══ */
-const TB24 = { blocks: new Map(), n: 0, on: !/notb/.test(location.search), fr: 0, sh2: !/nosh2/.test(location.search) };
+const TB24 = { blocks: new Map(), n: 0, on: !/notb\b/.test(location.search), fr: 0, sh2: !/nosh2\b/.test(location.search) };
 function tb24Build(list, ax, az) {
   let nv = 0, ni = 0; for (const m of list) { nv += m.geometry.attributes.position.count; ni += m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count; }
   const P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), Cc = new Float32Array(nv * 3), I = new Uint32Array(ni); let ov = 0, oi = 0;
@@ -852,7 +852,7 @@ window.__VIL4_SH = ["w1", "w3", "w4"];
    حصى مندمج بالتراب بتوزيع طبيعي + حصى ممسوح حقيقي، بساتين خضار وسياج نبات، تنويع البيوت (حجم، دوران، لون، أغراض حولها)، ظلال تلامس.
    قوام Poly Haven (CC0). ?vil4=0 يعيد الشكل القديم. ═══ */
 const VIL4 = (() => {
-  const PH = (window.__QUALITY || 'mobile') !== 'high', OFF = /[?&]vil4=0/.test(location.search);
+  const PH = (window.__QUALITY || 'mobile') !== 'high', OFF = /[?&]vil4=0\b/.test(location.search);
   const st = { t0: performance.now(), phone: PH, off: OFF, loaded: 0, need: 5, failed: [], built: [], tris: 0, draws: 0 };
   const sfx = PH ? '-l' : '', TL = new THREE.TextureLoader();
   const aniso = () => { try { return Math.min(PH ? 4 : 8, renderer.capabilities.getMaxAnisotropy()); } catch (e) { return 4; } };
@@ -1004,7 +1004,7 @@ const VIL4 = (() => {
     LD('trees33/oak-large-mid.glb?k=oak3', sc => { sc.name = 'oak'; const g = new THREE.Group(); g.add(sc); sc.name = 'OAK'; kitOf(g); });
     LD('nature/nature-plants-lite.glb', sc => kitOf(sc, n => /^bush_(myrtle|broom)/.test(n), 'B_'));
     // v45g: بوابة v5 — نموذج واحد بإحداثياته الأصلية (X على امتداد السور، +Z نحو داخل القرية، y=0 الأرض)
-    LD('village/v4/gate-v5' + (PH && !/[?&]gatehi=1/.test(location.search) ? '-lite' : '') + '.glb', sc => { sc.updateMatrixWorld(true); const out = [], B = new THREE.Box3();
+    LD('village/v4/gate-v5' + (PH && !/[?&]gatehi=1\b/.test(location.search) ? '-lite' : '') + '.glb', sc => { sc.updateMatrixWorld(true); const out = [], B = new THREE.Box3();
       sc.traverse(o => { if (o.isMesh) { fixMat(o.material); GLB_GEO.add(o.geometry); out.push({ geo: o.geometry, mat: o.material, m: o.matrixWorld.clone() }); B.union(new THREE.Box3().setFromObject(o)); } });
       if (out.length) { out.size = B.getSize(new THREE.Vector3()); K.H_gate = out; } }); }
   const ready = () => OFF || st.loaded >= st.need || performance.now() - st.t0 > 90000;
@@ -2024,7 +2024,7 @@ const PMQ = (() => {
     const L = ST.L; ST.inside = null;
     if (L && !ST.farHidden && L.farG && L.farG.children.length) { for (const m of L.farG.children) { const p = m.geometry && m.geometry.parameters; if (p && p.width === 40 && p.height === 17) m.visible = false; } ST.farHidden = true; }
     for (const B of ST.built) {
-      const dx = PL.x - B.ox, dz = PL.z - B.oz, d = Math.hypot(dx, dz); B.int.visible = d < B.R - 15;   /* الداخل يُرسم فقط على بعد ≤45م */ { const fd = d > ((B.far24 && B.far24.visible) ? 125 : 135), fm = fd && !/nofar/.test(location.search) ? pmqFar24(B) : null; B.ext.visible = d < 1100 && !fm; if (B.far24) B.far24.visible = d < 1100 && !!fm; }
+      const dx = PL.x - B.ox, dz = PL.z - B.oz, d = Math.hypot(dx, dz); B.int.visible = d < B.R - 15;   /* الداخل يُرسم فقط على بعد ≤45م */ { const fd = d > ((B.far24 && B.far24.visible) ? 125 : 135), fm = fd && !/nofar\b/.test(location.search) ? pmqFar24(B) : null; B.ext.visible = d < 1100 && !fm; if (B.far24) B.far24.visible = d < 1100 && !!fm; }
       if (d > B.R) continue; const c = Math.cos(B.yaw), s = Math.sin(B.yaw), lx = dx * c - dz * s, lz = dx * s + dz * c;
       for (const r of B.rooms) if (lx > r.x0 - 0.3 && lx < r.x1 + 0.3 && lz > r.z0 - 0.3 && lz < r.z1 + 0.3 && PL.y < r.ceil - 1.2) { ST.inside = { B, r, lx, lz }; break; }
     }
@@ -2396,7 +2396,7 @@ const LOD16 = (() => { const E = new Map(), V3 = THREE.Vector3, fr = new THREE.F
       for (let lv = 0; lv < 3; lv++) { const im = IM[lv]; if (!im) continue; im.count = cnt[lv]; im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true; im.castShadow = (lv === 0 || hq) && !(e.model && e.model.nsm && !hq); }
       stat.hi += cnt[0]; stat.lo += cnt[1]; stat.lo2 += cnt[2]; stat.n += e.list.length; } }
   return { addInst, addMesh, finish, drop, tick, get stat() { return stat; }, E }; })();
-window.LOD16 = LOD16; window.__LOD16_ON = !/nolod/.test(location.search);
+window.LOD16 = LOD16; window.__LOD16_ON = !/nolod\b/.test(location.search);
 
 /* ═══ v16: تكثيف المدينة — صفوف بيوت متلاصقة على حلقات بأزقة ضيقة وممرات عرضية وساحات صغيرة، تدوير/مرآة/تكبير ٠٫٩–١٫١٥ وارتفاعات مختلفة،
    خزانات ماء وقباب صغيرة ومظلات على بعض الأسطح — كلها نسخ مكررة عبر LOD16، ولكل بيت مصادم. الشوارع الرئيسية والساحة والسوق والجامع وطريق القصر والدرج تبقى فارغة ═══ */
@@ -3060,7 +3060,7 @@ const DENSE16 = (() => { let ROOF = null;
             if (rnd() < 0.35) props.awn.push([x + bx * (d / 2 + 0.05), H(x, z) + 2.5, z + bz * (d / 2 + 0.05), yaw, 1]);
             break; } } } } }
     try { L.v17fronts = V17.snap(out, props, { cx, cz, OC, cell }); } catch (e) { console.warn('[v17] snap', e); }
-    const CNT = { tries }; L.cnt16 = CNT; if (/occ16/.test(location.search)) window.__OCC16 = { N, OC: Array.from(OC) };
+    const CNT = { tries }; L.cnt16 = CNT; if (/occ16\b/.test(location.search)) window.__OCC16 = { N, OC: Array.from(OC) };
     // البيوت: نسخ عبر LOD16 + مصادم بسطح (يمكن الوقوف على السطح)
     const m4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), P3 = new THREE.Vector3(), S3 = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
     for (const q of out) { const M = MODELS[q.k], y = H(q.x, q.z) - 0.1; m4.compose(P3.set(q.x - cx, y, q.z - cz), Q.setFromAxisAngle(UP, q.yaw), S3.set(q.s * (q.mir ? -1 : 1), q.sy, q.s));
@@ -3983,7 +3983,7 @@ const KIOSK = (() => {
       L._kiosk.push({ id, x: best.x, z: best.z, yaw }); st.placed.push({ id, ok: true, x: +best.x.toFixed(1), z: +best.z.toFixed(1), r: best.r, lat: best.lat }); }
     st.placeMs = Math.round(performance.now() - t0); console.info('[kiosk] placed', JSON.stringify(st.placed), st.placeMs + 'ms');
     if (late) try { if (window.V19 && V19.NS && V19.NS.nat && V19.NS.nat.refreshGrass) V19.NS.nat.refreshGrass(); } catch (e) {} }
-  function build(L, v) { if (!isTarget(v) || /[?&]nokiosk/.test(location.search)) return; if (st.loaded >= IDS.length) place(L, v); else wait.push(() => place(L, v, true)); }
+  function build(L, v) { if (!isTarget(v) || /[?&]nokiosk\b/.test(location.search)) return; if (st.loaded >= IDS.length) place(L, v); else wait.push(() => place(L, v, true)); }
   const api = { st, T, DEF, build, ready: () => st.loaded >= IDS.length }; window.KIOSK = api; return api;
 })();
```

### `v50g3/code/part-002.txt`

```diff
diff --git a/v50g3/code/part-002.txt b/v50g3/code/part-002.txt
index b8edf56..8e18576 100644
--- a/v50g3/code/part-002.txt
+++ b/v50g3/code/part-002.txt
@@ -793,7 +793,7 @@ function riderPose(m, dt) {                       // v22: وضعية الفار
     for (const r of [22, 16, 10, 6]) for (const a of [0, 0.5, -0.5, 1, -1]) { const x = PL.x + (bx * Math.cos(a) - bz * Math.sin(a)) * r, z = PL.z + (bz * Math.cos(a) + bx * Math.sin(a)) * r;
       const L = []; gatherSolids(x, z, 2, L); if (L.some(o => sdist(o, x, z) < 1.2)) continue; if (LIB.height(x, z) < -0.5) continue; if (HFX.on && HFX.blocked(x, z, PL.x, PL.z, HFX.solids(x, z, PL.x, PL.z, 1.5), 0.8)) { if (!alt) alt = [x, z]; continue; } return [x, z]; } return strict ? null : alt; }
   // ═══ v45h HORSEFIX: الحصان المُصفَّر له يلتفّ حول الإسطبل والجدران (مسار A* على شبكة ١م) بدل الاصطدام بها، والقفز خلف الكاميرا فقط لمكان يرى اللاعب — مفتاح الإيقاف ?horsefix=0
-  const HFX = { on: !/[?&]horsefix=0/.test(location.search), path: null, pi: 0, t: 0, m: null, gx: 0, gz: 0, plans: 0, fails: 0, ms: 0 };
+  const HFX = { on: !/[?&]horsefix=0\b/.test(location.search), path: null, pi: 0, t: 0, m: null, gx: 0, gz: 0, plans: 0, fails: 0, ms: 0 };
   V19.HFX = HFX;
   HFX.solids = (x0, z0, x1, z1, pad) => { const L = []; gatherSolidsNoHorse((x0 + x1) / 2, (z0 + z1) / 2, Math.max(Math.abs(x1 - x0), Math.abs(z1 - z0)) / 2 + pad, L); return L; };
   HFX.blocked = (x0, z0, x1, z1, L, r) => { const len = Math.hypot(x1 - x0, z1 - z0), k = Math.max(1, Math.ceil(len / 0.4));
@@ -4202,7 +4202,7 @@ window.V41 = (() => {
 loadTreeModels(); updateChunks(); frame();
 
 /* ═══ v42 FX42 (three.quarks): غبار تحت الأقدام والحصان، شرار ضربة السيف، دخان نار المخيمات — مطفي افتراضياً، يشتغل بـ ?fx=quarks ═══ */
-const FX42 = (() => { const on = /[?&]fx=quarks/.test(location.search) || (() => { try { return localStorage.getItem('ow_fx') === 'quarks'; } catch (e) { return false; } })();
+const FX42 = (() => { const on = new URLSearchParams(location.search).get('fx') === 'quarks' || (() => { try { return localStorage.getItem('ow_fx') === 'quarks'; } catch (e) { return false; } })();
   const ST = { on, ok: false, err: null, dust: 0, sparks: 0, smoke: 0, systems: 0 }; if (!on) { window.FX42 = { ST, tick() {}, sparks() {} }; return window.FX42; }
   let Q = null, br = null, S = {}, dustAcc = 0, px = null, pz = null; const smokes = new Map();
   const tex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
@@ -4235,7 +4235,7 @@ const FX42 = (() => { const on = /[?&]fx=quarks/.test(location.search) || (() =>
   window.FX42 = { ST, tick, sparks }; return window.FX42; })();
 
 /* ═══ v42 PHYS42 (Rapier): صناديق وبراميل بتوقع وبتتدحرج وبتنزاح لما تمشي فيها، وزر G (أو زر «ارمِ» عالموبايل) بيرمي صندوق لقدّام — مطفي افتراضياً، يشتغل بـ ?phys=rapier ═══ */
-const PHYS42 = (() => { const on = /[?&]phys=rapier/.test(location.search) || (() => { try { return localStorage.getItem('ow_phys') === 'rapier'; } catch (e) { return false; } })();
+const PHYS42 = (() => { const on = /[?&]phys=rapier\b/.test(location.search) || (() => { try { return localStorage.getItem('ow_phys') === 'rapier'; } catch (e) { return false; } })();
   const ST = { on, ok: false, err: null, bodies: 0, thrown: 0, ground: 0, steps: 0, maxStepMs: 0 }; if (!on) { window.PHYS42 = { ST, tick() {} }; return window.PHYS42; }
   let R = null, world = null, ply = null, gnd = null, gc = null, acc = 0; const objs = [];
   const wood = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); g.fillStyle = '#8a5a2b'; g.fillRect(0, 0, 64, 64);
@@ -4271,7 +4271,7 @@ const PHYS42 = (() => { const on = /[?&]phys=rapier/.test(location.search) || ((
   window.PHYS42 = { ST, tick, throwOne, scatter, objs: () => objs.map(o => { const p = o.b.translation(); return [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)]; }) }; return window.PHYS42; })();
 
 /* ═══ v42 NAV42 (recast-navigation): أهل البلد بيمشوا على navmesh حقيقي (بيلفّوا حول البيوت والأسوار) بدل شبكة A* — مطفي افتراضياً، يشتغل بـ ?nav=recast؛ لو فشل أي شي بيرجع للـ A* القديم ═══ */
-const NAV42 = (() => { const on = /[?&]nav=recast/.test(location.search) || (() => { try { return localStorage.getItem('ow_nav') === 'recast'; } catch (e) { return false; } })();
+const NAV42 = (() => { const on = /[?&]nav=recast\b/.test(location.search) || (() => { try { return localStorage.getItem('ow_nav') === 'recast'; } catch (e) { return false; } })();
   const ST = { on, ok: false, err: null, meshes: 0, polys: [], buildMs: [], paths: 0, fallbacks: 0, pending: 0 }; if (!on) { window.NAV42 = { ST, path() { return null; } }; return window.NAV42; }
   let C = null, G = null; const cache = new Map();
   Promise.all([import('@recast-navigation/core'), import('@recast-navigation/generators')]).then(async ([c, g]) => { await c.init(); C = c; G = g; ST.ok = true; console.info('[v42] NAV42 recast ready'); })
@@ -4305,7 +4305,7 @@ const NAV42 = (() => { const on = /[?&]nav=recast/.test(location.search) || (()
   window.NAV42 = { ST, path, cache }; return window.NAV42; })();
 
 /* ═══ v42 SFX42 (Howler): صوت ضربة السيف والتلويح، خطوات (عشب/حجر)، حوافر الحصان ونخرته — مطفي افتراضياً، يشتغل بـ ?sfx=howler ═══ */
-const SFX42 = (() => { const on = /[?&]sfx=howler/.test(location.search) || (() => { try { return localStorage.getItem('ow_sfx') === 'howler'; } catch (e) { return false; } })();
+const SFX42 = (() => { const on = /[?&]sfx=howler\b/.test(location.search) || (() => { try { return localStorage.getItem('ow_sfx') === 'howler'; } catch (e) { return false; } })();
   const SS = { on, ok: false, err: null, loaded: 0, total: 0, unlocked: false, played: { hit: 0, swing: 0, grass: 0, stone: 0, hoof: 0, snort: 0 } };
   if (!on) { window.SFX42 = { ST: SS, tick() {}, hit() {}, swing() {} }; return window.SFX42; }
   const N = { hit: 3, swing: 2, grass: 4, stone: 4, hoof: 4, snort: 1 }, VOL = { hit: 0.8, swing: 0.45, grass: 0.3, stone: 0.35, hoof: 0.5, snort: 0.35 }, S = {};
@@ -4331,7 +4331,7 @@ const SFX42 = (() => { const on = /[?&]sfx=howler/.test(location.search) || (()
   window.SFX42 = { ST: SS, tick, play, hit: (x, z) => play('hit', fall(x, z)), swing: () => play('swing', 1), selftest: () => { for (const k in N) play(k, 0.01); last = {}; return { played: Object.assign({}, SS.played), ctx: window.Howler && Howler.ctx ? Howler.ctx.state : null, loaded: SS.loaded, total: SS.total }; } }; return window.SFX42; })();
 
 /* ═══ v42 HIT42 (Rapier): ضربة السيف بصندوق إصابة حقيقي بيكنس قوس قدّام اللاعب بدل المخروط، مع قوس ضوئي للضربة وحلقة عند الإصابة — مطفي افتراضياً، يشتغل بـ ?combat=rapier ═══ */
-const HIT42 = (() => { const on = /[?&]combat=rapier/.test(location.search) || (() => { try { return localStorage.getItem('ow_combat') === 'rapier'; } catch (e) { return false; } })();
+const HIT42 = (() => { const on = /[?&]combat=rapier\b/.test(location.search) || (() => { try { return localStorage.getItem('ow_combat') === 'rapier'; } catch (e) { return false; } })();
   const HS = { on, ok: false, err: null, swings: 0, hits: 0, misses: 0, fallbackCone: 0, maxMs: 0, last: null, vfx: 0 };
   if (!on) { window.HIT42 = { ST: HS, tick() {} }; return window.HIT42; }
   let R = null, world = null, blade = null; const fxs = [];
```

## Full-file MD5 (patched worktree)

| File | MD5 |
|---|---|
| `v50g3/code/part-000.txt` | `c883547193a90aaeb2bc668c7ac798b3` |
| `v50g3/code/part-001.txt` | `cf7956abc5cb6bc37381be4c93f4964c` |
| `v50g3/code/part-002.txt` | `1a175908e2aeb3f15bcf7c3fe51f26f6` |
| `index.html` | `0d9acd3cffc43c1a26a5187fca2fb3b6` |

`index.html` was not edited; its checksum is the checked-out base file checksum.
