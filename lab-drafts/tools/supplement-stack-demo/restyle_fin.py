"""Restyle a built Supplement Stack dashboard to the Fin.ai design system.

usage: python3 restyle_fin.py <in.html> <out.html> [--name "Sam"]

Works on the output of build_dashboard.py (live or the sample-data demo):
swaps the stylesheet for fin.css, drops dark mode, moves the KPI row into the
header, gives every section a mono eyebrow row and a two-tone title, turns the
emoji and pills into Fin's square marks, recolors the cost chart, and opens the
timeline on "Current stack only". Data and scripts are left alone.
"""
import re, sys, pathlib

src, dst = sys.argv[1], sys.argv[2]
HERE = pathlib.Path(__file__).parent
t = pathlib.Path(src).read_text()

# a stray wrapper document some exports carry
if t.startswith('<!doctype html><html><head><meta charset=utf8>'):
    t = t.split('\n', 1)[1]
t = re.sub(r'(</body></html>\s*){2,}$', '</body></html>\n', t)


def sub(pat, rep, s, flags=0, need=True):
    out, n = re.subn(pat, rep, s, flags=flags)
    if need and n == 0:
        sys.exit(f'restyle_fin: no match for {pat!r}')
    return out


FONTS = ('<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500'
         '&family=Geist+Mono:wght@400&family=Newsreader:opsz,wght@6..72,300&display=swap" rel="stylesheet">')
t = sub(r'<link href="https://fonts.googleapis.com/css2[^>]*>', FONTS, t)
css = (HERE / 'fin.css').read_text()
t = sub(r'<style>\n.*?</style>', lambda m: '<style>\n' + css + '</style>', t, flags=re.S)

# light only
t = sub(r'<button class="toggle"[^\n]*</button>\n', '', t)
t = sub(r'function apply\(t\)[^\n]*\n', '', t)
t = sub(r'function tg\(\)[^\n]*\n', '', t)
t = sub(r"\(function\(\)\{var t;try\{t=localStorage.getItem\('ss-theme'\)[^\n]*\n", '', t)

# header: eyebrow, title, short sub, KPI row, all in one white card
m = re.search(r'<div class="eyebrow">.*?</div>\n<h1 class="title">.*?</h1>\n<div class="sub">(.*?)</div>\n\n'
              r'<section><div class="grid g4">\n(.*?)\n</div></section>', t, re.S)
if not m:
    sys.exit('restyle_fin: header not found')
sub_text = m.group(1)
# keep who and when, drop the list of what's inside
sub_text = re.sub(r'(?:Your full|The full) supplement picture\s*[:—-][^.]*\.', 'Your full supplement picture.', sub_text)
sub_text = re.sub(r'(refreshed \d{4}-\d\d-\d\d):[^<]*$', r'\1.', sub_text)
hero = ('<header class="hero marks">\n<div class="eyebrow"><i class="sq"></i>Supplement Stack</div>\n'
        '<h1 class="title">Supplement dashboard</h1>\n'
        f'<div class="sub">{sub_text}</div>\n<div class="grid g4 kpis">\n{m.group(2)}\n</div>\n</header>')
t = t[:m.start()] + hero + t[m.end():]

# section rows + two-tone titles (keyed by the builder's label and title start)
TWO_TONE = [
    ('Daily', "Today", "Today's protocol,", 'what to take and when'),
    ('Goals', 'What we optimize', 'What we optimize for', "and why it's on the card"),
    ('Safety', 'Combined daily', 'Combined daily totals', 'flagged against target ranges'),
    ('Plan', 'Recommendations', 'Recommendations:', 'keep, adjust, add, trim'),
    ('History', 'Stack size', 'Stack size', 'over time'),
    ('History', 'Timeline', 'Timeline,', None),
    ('Spend', 'Cost', 'Cost,', 'and where it goes'),
]
first_year = re.search(r'<table class="tl"><thead><tr><th>[^<]*</th><th[^>]*>(\d{4})', t)
since = f'since {first_year.group(1)}' if first_year else 'over the years'


def section_head(mm):
    label, title = mm.group(1), mm.group(2)
    for lab, start, black, muted in TWO_TONE:
        if lab == label and title.startswith(start):
            if muted is None:
                who = re.search(r'what (\w+) has taken', title)
                muted = f"what {who.group(1) + ' has' if who else 'you’ve'} taken {since}".replace('’', "'")
            title = f'{black} <span class="mute">{muted}</span>'
            break
    return (f'<section><div class="sec-row"><span>Supplement Stack</span><span>{label}</span></div>'
            f'<h2 class="sec-title">{title}</h2>')


t = sub(r'<section><div class="sec-label">([^<]*)</div><div class="sec-title">([^<]*)</div>', section_head, t)

# protocol cards: inline styles to classes, emoji out
EMOJI = r'(?:[☀-➿\U0001F000-\U0001FAFF]️?\s?)'
t = sub(r'<div style="font-weight:600;font-size:13.5px;margin-bottom:6px">' + EMOJI + '?', '<div class="ph-h">', t)
t = sub(r'<div style="font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var\(--muted\);margin:10px 0 2px">' + EMOJI + '?', '<div class="psub">', t, need=False)
t = sub(r'<div style="display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid var\(--border\)">', '<div class="pi">', t)
t = sub(r'<span style="font-size:13px;">', '<span class="pn">', t)
t = sub(r'<span style="font-size:12px;color:var\(--muted\);white-space:nowrap">', '<span class="pd">', t)
t = sub(r'<span class="chip neutral" style="font-size:9px;padding:1px 6px">⭐</span>', '<i class="hv" title="High-value"></i>', t, need=False)
t = sub(r'class="chip (\w+)" style="font-size:9px;padding:1px 6px"', r'class="tag \1"', t, need=False)
t = t.replace('⭐ ', '<i class="hv"></i>').replace('⭐', '<i class="hv"></i>')
t = re.sub(r'⏸️?\s?', '', t)
t = t.replace('<div class="note" style="margin-top:12px">', '<div class="note" style="margin-top:20px">')

# cost: spacing, and a Fin palette assigned in category order
t = t.replace('<div class="grid g4" style="margin-bottom:16px">', '<div class="grid g4" style="margin-bottom:40px">')
t = t.replace('<div class="card">\n<div class="t-module">Where it goes</div>', '<div class="card costcard">\n<div class="t-module">Where it goes</div>')
t = re.sub(r'<div class="t-module" style="margin-top:18px">', '<div class="t-module" style="margin:24px 0 14px">', t)
FIN = ['#ff5600', '#672225', '#2c922a', '#f2ae7e', '#111111', '#5f69cc', '#626260', '#b9b4ab', '#e4d9c3', '#e8c34f']
segs = re.findall(r'<div class="cseg" style="width:[\d.]+%;background:(#[0-9a-fA-F]{6})" title="([^"]+?): \$', t)
old_to_new, cat_to_new = {}, {}
for i, (old, cat) in enumerate(segs):
    new = FIN[i % len(FIN)]
    cat_to_new[cat] = new
    old_to_new.setdefault(old.lower(), new)
t = re.sub(r'(<div class="cseg" style="width:[\d.]+%;background:)#[0-9a-fA-F]{6}(" title="([^"]+?): \$)',
           lambda mm: mm.group(1) + cat_to_new[mm.group(3)] + mm.group(2), t)
t = re.sub(r'(<span class="lg" style="background:)#[0-9a-fA-F]{6}(;?"></span>)([^<]+?) <b>',
           lambda mm: mm.group(1) + cat_to_new.get(mm.group(3).strip(), '#b9b4ab') + mm.group(2) + mm.group(3) + ' <b>', t)
t = re.sub(r'(<div class="cfill" style="width:[\d.]+%;background:)(#[0-9a-fA-F]{6})',
           lambda mm: mm.group(1) + old_to_new.get(mm.group(2).lower(), '#b9b4ab'), t)

# footer
t = sub(r'<div class="foot"><span class="star">✳</span> (.*?)</div>', r'<div class="foot"><i class="sq"></i><span>\1</span></div>', t, flags=re.S)
t = t.replace('styled to the Healthwise / Claude Desktop design system', 'styled to the Fin.ai design system')

# timeline opens on the current stack
t = sub(r'<button class="vt" id="curBtn"', '<button class="vt active" id="curBtn"', t)
t = sub(r'var curOnly=false;', 'var curOnly=true;', t)
t = sub(r'<div class="tlwrap">', '<div class="tlwrap curonly">', t)

# keep dates on one line in the KPI captions
t = re.sub(r'(<div class="m-target">[^<]*?)(\d{4}-\d\d-\d\d)', r'\1<span style="white-space:nowrap">\2</span>', t)

# em-dashes in body copy
t = re.sub(r' — ', ': ', t)

left = [ch for ch in ['✳', '◑', '◐', '⭐', '⏸'] if ch in t]
if left:
    sys.exit(f'restyle_fin: leftover glyphs {left}')
pathlib.Path(dst).write_text(t)
print('restyle_fin: wrote', dst, len(t))
