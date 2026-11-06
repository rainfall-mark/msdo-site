"""Compose the walkthrough from the two screencast streams. usage: compose.py <recDir> <framesOut>"""
import json, sys, os, bisect
from PIL import Image
rec, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for f in os.listdir(out): os.remove(os.path.join(out, f))
FPS = 30
_marks = json.load(open(f'{rec}/marks.json'))
M = {m['name']: m['t'] for m in _marks}
PASSES = [(a['t'] - 0.03, b['t'] + 0.05) for a, b in zip([m for m in _marks if m['name'] == 'pass_start'], [m for m in _marks if m['name'] == 'pass_end'])]
def stream(name):
    idx = json.load(open(f'{rec}/{name}/index.json'))
    return [f'{rec}/{name}/{fn}' for fn, _ in idx], [t for _, t in idx]
main = stream('main')
app = stream('app') if os.path.exists(f'{rec}/app/index.json') else None
S = M['start']; A = M.get('app', 0)
QA1, QA2 = 11.0, 4.5
def mount_cut():
    """Where the brief is submitted: the last frame of the prompt screen, and the first frame the chat has settled
    (header up, chat centred). Everything between is the deck's own mount animation plus a frame of the un-centred chat."""
    from PIL import ImageStat
    fs, ts = main; W = H = None; feats = []
    for f, t in sorted(zip(fs, ts), key=lambda x: x[1]):
        r = t - S
        if r < M['typing'] - S or r > M['qa'] - S + 0.5: continue
        im = Image.open(f).convert('RGB'); W, H = im.size
        cards = ImageStat.Stat(im.crop((int(.05 * W), int(.55 * H), int(.6 * W), int(.7 * H))).convert('L')).mean[0]
        hdr = sum(im.getpixel((int(.905 * W), int(.044 * H)))) > 70
        row = im.crop((0, int(.24 * H), W, int(.24 * H) + 1)).convert('L')
        xs = [x for x in range(int(.15 * W), W) if row.getpixel((x, 0)) > 30]
        feats.append((r, cards > 25, hdr and bool(xs) and abs(xs[0] / W - .373) < .02))
    last_prompt = max(r for r, p, _ in feats if p)
    after = [(r, ok) for r, p, ok in feats if r > last_prompt]
    for i, (r, ok) in enumerate(after):
        if all(o for _, o in after[i:i + 8]): return last_prompt, r
    raise SystemExit('no settled frame after the brief')
GUARD = ('req_click', 'surface_ok', 'build_click', 'canvas_ok')
_dec = {}
def decorated(f):
    # the Studio header's purple Run button is there on every styled Studio frame, dimmed under a dialog or not
    if f not in _dec:
        im = Image.open(f).convert('RGB'); W = im.size[0] / 1440
        r, g, b = im.getpixel((int(1380 * W), int(40 * W)))
        _dec[f] = b - g > 15
    return _dec[f]
CUT_A, CUT_B = mount_cut()
print('mount cut', round(CUT_A, 3), round(CUT_B, 3))
# (stream, from, to, speed) in seconds relative to that stream's anchor
SEG = [
  (main, 0.0, 3.0, 1.0),                                   # 1 open
  (main, 3.0, CUT_A + 0.005, 0.9),                                  # 2 the brief types in
  ('xfade', 8),                                            #   skip the deck's mount animation and the one-frame un-centered chat
  (main, CUT_B, M['qa']-S, 0.9),
  (main, M['qa']-S, M['qa_done']-S, 1.0),                  # 3 every clarifying question, answered in real time
  (main, M['qa_done']-S, M['req_click']-S+0.08, 1.0),      # 4 Define the Requirements
  (main, M['surface_ok']-S+0.04, M['design']-S, 1.0),      #   (cut past the undecorated mount) Output opens, requirements drafted
  (main, M['design']-S, M['build_click']-S+0.12, 1.0),     # 5-6 Design, Actors, Build the flow
  (main, M['canvas_ok']-S+0.1, M['output']-S, 1.0),       # 7-8 (cut past the undecorated mount) flow builds, zoom, drag-in
  (main, M['output']-S, M['run']-S, 1.0),                  # 9 the new step written into the spec
  (main, M['run']-S, M['deploy']-S, 1.2),                  # 10 Run
  (main, M['deploy']-S, M['handoff']-S, 1.3),              # 11 Deploy
  (main, M['handoff']-S, M['end']-S, 1.1),                 # 12 hand-off, Projects, Library, Home
  ('loop', 22, 16),
]
frames = []   # list of paths
def pick(st, t):
    files, ts = st; anchor = S if st is main else A
    tt = anchor + t
    if st is main:
        for a, b in PASSES:
            if a <= tt <= b: tt = a; break
    j = bisect.bisect_right(ts, tt) - 1
    if st is main:
        # the screencast only sends a frame when the page changes, so a frame captured inside a pass can stay
        # on screen after it: step back to the last frame from before the pass
        for a, b in PASSES:
            while j > 0 and a <= ts[j] <= b: j -= 1
    return files[max(0, j)]
k = 0
def blend(a, b, n, tag):
    global k
    ia, ib = Image.open(a).convert('RGB'), Image.open(b).convert('RGB')
    for i in range(1, n + 1):
        p = f'{out}/x{tag}_{i:03d}.jpg'; Image.blend(ia, ib, i / (n + 1)).save(p, quality=92); frames.append(p)
from PIL import ImageDraw, ImageFont
FONT = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf', 40)
def later_frame(src, dim, alpha):
    im = src if isinstance(src, Image.Image) else Image.open(src).convert('RGB')
    im = Image.blend(im, Image.new('RGB', im.size, (0, 0, 0)), dim)
    if alpha > 0:
        layer = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
        txt = 'A few minutes later\u2026'; w = d.textlength(txt, font=FONT)
        d.text(((im.width - w) / 2, im.height / 2 - 28), txt, font=FONT, fill=(255, 255, 255, int(255 * alpha)))
        im = Image.alpha_composite(im.convert('RGBA'), layer).convert('RGB')
    return im
def later(resume_t, tag):
    a = frames[-1]; b = pick(main, resume_t); FO, HOLD, FI = 14, 44, 14
    seq = [(a, 0.5 * (i / FO), i / FO) for i in range(1, FO + 1)] + [(Image.blend(Image.open(a).convert('RGB'), Image.open(b).convert('RGB'), min(1, max(0, (i - 12) / 20))), 0.5, 1.0) for i in range(HOLD)] + [(b, 0.5 * (1 - i / FI), 1 - i / FI) for i in range(1, FI + 1)]
    for n, (src, dim, al) in enumerate(seq):
        p = f'{out}/l{tag}_{n:03d}.jpg'; later_frame(src, dim, al).save(p, quality=92); frames.append(p)
for i, seg in enumerate(SEG):
    if seg[0] == 'later':
        later(seg[1], i); continue
    if seg[0] == 'xfade':
        nxt = SEG[i + 1]; blend(frames[-1], pick(nxt[0], nxt[1]), seg[1], i); continue
    if seg[0] == 'loop':
        blend(frames[-1], frames[0], seg[1], 'loop'); frames.extend([frames[0]] * seg[2]); continue
    st, a, b, sp = seg
    n = round((b - a) / sp * FPS)
    for j in range(n):
        t = a + j * sp / FPS; f = pick(st, t)
        # around a screen change, hold the previous frame over any frame of the new screen before its styling applies
        if st is main and frames and M['qa'] - S <= t <= M['handoff'] - S and not decorated(f): f = frames[-1]
        frames.append(f)
with open(f'{out}/list.txt', 'w') as f:
    for p in frames: f.write(f"file '{os.path.abspath(p)}'\nduration {1/FPS:.6f}\n")
    f.write(f"file '{os.path.abspath(frames[-1])}'\n")
print('frames', len(frames), 'seconds', round(len(frames) / FPS, 1))
