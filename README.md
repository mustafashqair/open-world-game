# العالم المفتوح — Open World (v50g2)

**عربي:** لعبة عالم مفتوح ثلاثية الأبعاد بالمتصفح (Three.js): مدينة وقصر وسوق وقرية وغابة، شخصيات وحيوانات وقتال، وبتشتغل أوفلاين. فيها أربع جودات (منخفضة جداً، منخفضة، متوسطة، عالية).

**English:** A 3D open-world browser game built with Three.js — a walled city, palace and garden, market, village and forest, with NPCs, animals and combat. Works offline (service worker). Four quality presets: very-low, low, medium, high.

## Live / رابط اللعبة
https://open-world-mustafa-v50d.sites.tab.bot/

## URL flags / خيارات الرابط
| Flag | What it does / شو بيعمل |
|---|---|
| `?hud=1` | FPS counter / عدّاد الفريمات |
| `?prof=1` | In-game profiler (per-system timings) / قياس وقت كل نظام |
| `?v50g2=0` | Turn off all v50g2 very-low changes (= exact v50g) / رجوع لـv50g |

Per-fix off flags (very-low only): `?g2city=0` `?g2pal=0` `?g2npc=0` `?g2mm=0` `?g2cull=0` `?g2pre=0`, and `?hudfix=0` for the old FPS label. Details: [docs/v50g2-NOTES.md](docs/v50g2-NOTES.md).

## Run locally / تشغيل محلي
```bash
git clone https://github.com/mustafashqair/open-world-game.git
cd open-world-game
python3 tools/join_large_files.py   # once: rebuilds the 31 files >3 MB from large-files/
python3 -m http.server 8000
# open http://localhost:8000/
```

## Repo layout
- game files at the repo root (`index.html`, `sw.js`, `assets.json`, asset folders)
- `tools/` — publish/rollback scripts (`pubv9.py`, `pubfreshv9.py`) and the benchmark/pixel-test harness (`tools/h/*.mjs`). They reference paths on the build machine; kept for reference.
- `large-files/` — the 31 files larger than 3 MB (e.g. `palace3d/palace-v13.glb`), split into 2.8 MB parts; `tools/join_large_files.py` puts them back in place and checks SHA-256
- `docs/v50g2-NOTES.md` — what v50g2 changed and measured results
