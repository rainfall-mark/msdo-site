"""hero-grid.webp (2880x1818, 2x2, 18px gap) and thumb.webp (1600x1000) from capture.js output.
usage: python3 compose.py <capDir> <outDir>"""
import sys
from PIL import Image, ImageDraw
cap, out = sys.argv[1], sys.argv[2]
BG = (250, 249, 246); G = 18; W, H = (2880 - G) // 2, (1818 - G) // 2; R = 24; S = 3
grid = Image.new('RGB', (2 * W + G, 2 * H + G), BG)
for i, k in enumerate(['a-top', 'b-recs', 'c-timeline', 'd-cost']):
    t = Image.open(f'{cap}/{k}.png').convert('RGB').resize((W, H), Image.LANCZOS)
    m = Image.new('L', (W * S, H * S), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W * S - 1, H * S - 1), R * S, fill=255); m = m.resize((W, H), Image.LANCZOS)
    x, y = (i % 2) * (W + G), (i // 2) * (H + G); grid.paste(t, (x, y), m)
    o = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0)); ImageDraw.Draw(o).rounded_rectangle((S, S, W * S - 1 - S, H * S - 1 - S), R * S, outline=(222, 219, 214, 255), width=2 * S)
    o = o.resize((W, H), Image.LANCZOS); grid.paste(o, (x, y), o)
grid.save(f'{out}/hero-grid.webp', quality=86, method=6)
Image.open(f'{cap}/thumb-src.png').convert('RGB').resize((1600, 1000), Image.LANCZOS).save(f'{out}/thumb.webp', quality=84, method=6)
print('ok', grid.size)
