#!/usr/bin/env python3
"""Real Basis/UASTC KTX2 only. Requires Pillow and KTX-Software's toktx 4.x."""
import json, shutil, subprocess, tempfile
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]
encoder = shutil.which('toktx')
if not encoder:
    raise SystemExit('Install KTX-Software 4.x (toktx) and put toktx on PATH; no manifest was changed.')
assets = {}
# External world textures only; do not alter GLB skins or any HIGH-only -hq assets.
for folder in ('city', 'village/v4', 'landmarks'):
    for source in sorted((ROOT / folder).glob('*.webp')):
        if '-hq' in source.stem:
            continue
        image = Image.open(source).convert('RGBA')
        if max(image.size) < 512:
            continue
        normal = source.stem.endswith(('_n', '_n-l'))
        key = source.relative_to(ROOT).as_posix()
        assets[key] = {}
        for tier, cap in (('low', 512), ('vlow', 256)):
            resized = image.copy()
            resized.thumbnail((cap, cap), Image.Resampling.LANCZOS)
            out = ROOT / 'v50g4' / 'textures' / tier / Path(key).with_suffix('.ktx2')
            out.parent.mkdir(parents=True, exist_ok=True)
            with tempfile.TemporaryDirectory() as tmp:
                png, ktx = Path(tmp)/'input.png', Path(tmp)/'output.ktx2'
                resized.save(png)
                command = [encoder, '--t2', '--encode', 'uastc', '--uastc_quality', '2', '--zcmp', '18', '--genmipmap', '--lower_left_maps_to_s0t0', '--assign_oetf', 'linear' if normal else 'srgb']
                if normal: command += ['--normal_mode']
                subprocess.run(command + [str(ktx), str(png)], check=True)
                if ktx.read_bytes()[:12] != b'\xabKTX 20\xbb\r\n\x1a\n':
                    raise SystemExit(f'Not KTX2: {ktx}')
                shutil.copyfile(ktx, out)
            assets[key][tier] = out.relative_to(ROOT).as_posix()
manifest = ROOT / 'v50g4/textures-manifest.json'
temp = manifest.with_suffix('.tmp')
temp.write_text(json.dumps({'version': 1, 'assets': assets}, indent=2)+'\n')
temp.replace(manifest)
print(f'Encoded {len(assets)*2} real KTX2 files. Commit the textures AND manifest together.')
