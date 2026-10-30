#!/usr/bin/env python3
"""Make a demo copy of the live build_dashboard.py: same layout and features,
with every personal line swapped for Sam Avery sample copy.
usage: patch_builder.py <build_dashboard.py> <out.py>"""
import sys, re
src, out = sys.argv[1], sys.argv[2]
s = open(src).read()

def sub(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, f'expected {count} of {old[:70]!r}, found {n}'
    s = s.replace(old, new)

def resub(pat, new):
    global s
    s2, n = re.subn(pat, lambda m: new, s, flags=re.S)
    assert n == 1, f'pattern {pat[:60]!r} matched {n}'
    s = s2

sub("BASE=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))", "BASE=os.environ['SS_BASE']")
sub("PJSON=f'{BASE}/products.json'; OUT=f'{BASE}/dashboard.html'", "PJSON=f'{BASE}/products.json'; OUT=os.environ['SS_OUT']")
sub("order_tabs=['1318','122118','102019','112019','12021','111022','62825']", "order_tabs=['t1','t2','t3','t4','t5','t6','t7']")
sub("date_lbl={'1318':'2018-01','122118':'2018-12','102019':'2019-10','112019':'2019-11','12021':'2021-01','111022':'2022-11','62825':'2025-06'}",
    "date_lbl={'t1':'2021-03','t2':'2021-11','t3':'2022-06','t4':'2023-02','t5':'2023-10','t6':'2024-05','t7':'2025-04'}")
sub("date_cols=[date_lbl[t] for t in order_tabs]+['2026-06']", "date_cols=[date_lbl[t] for t in order_tabs]+['2026-10']")
sub("['Creatine','Ultimate Omega','Methyl Protect','Iron+']", "['Creatine','Fish Oil']")

resub(r"today_rules=\(.*?\n# ===== /TODAY_PROTOCOL_BLOCK", """today_rules=('<b>Legend:</b> NEW = added since 2026-07-30 &middot; ⭐ strongest evidence for Sam\\'s goals &middot; '
 '<span style="color:var(--high)">Mg</span> = magnesium source &middot; chips on a row are pending changes. '
 '<b>Open decision:</b> three products now supply magnesium, which puts the daily total near the upper limit (see Safety).')
# ===== /TODAY_PROTOCOL_BLOCK""")

resub(r"recs=\{.*?\n\}\ngoals=\[.*?'\)\]\n", """recs={
 'KEEP (core)':['Fish Oil','Vitamin D3','Creatine','Whey Protein','Acacia Fiber','Magnesium Glycinate','Tart Cherry','Multivitamin'],
 'ADJUST':['Magnesium glycinate 2 caps to 1 (total drops to 240 mg)','Switch to a multi with 10 mg or less of B6','Fiber to 2 tbsp, 2 h away from other capsules'],
 'ADD':['Glycine 3 g at bedtime if sleep stays under 7 h','Lipid panel recheck in January before any heart-health add'],
 'OPTIONAL':['Electrolytes (rides over 90 min)','Beet root (race days only)'],
 'TRIM / REVIEW':['Glucosamine: weak evidence, review in 8 wk','Zinc picolinate: multi already covers it','Aged garlic: reassess after lipid recheck'],
}
goals=[('Heart health','LDL-C was 128 mg/dL at the March 2026 physical (sample value). Fish oil, soluble fiber and aged garlic support it alongside diet and Zone 2 cardio. Recheck the lipid panel in January before adding anything new.'),
 ('Sleep','Averaging 6 h 40 min on the tracker, target 7 h 15 min. Evening magnesium and the wind-down powder are the anchors; caffeine cutoff moved to noon in August.'),
 ('Recovery','Four strength sessions and two long rides per week. Whey and creatine after training, tart cherry on hard days. Knee soreness after long rides is the thing to watch.'),
 ('Keep it simple','Fewer products, same coverage. The goal for 2027 is under 12 daily items and under $150 a month without losing anything that matters.')]
""")

sub('<div class="metric"><div class="m-name">Prices to verify</div><div class="m-val">{nflag}</div><div class="m-target">see cost-report.md</div></div>',
    '<div class="metric"><div class="m-name">Prices to verify</div><div class="m-val">{nflag}</div><div class="m-target">read off a brand site</div></div>')
resub(r'<div class="note">Snapshot \{cdate\}\..*?</div>\n</div>"""',
      '<div class="note">Snapshot {cdate}. Sample list prices, normalized to the daily dose, 30.4 days a month. Items tagged <i>brand site</i> could not be priced on Amazon; hover the tag for the note. Trimming the three review items saves about $32 a month.</div>\n</div>"""')
sub('<title>Supplement Stack — Dashboard</title>', '<title>Supplement Stack · MSDO Lab demo</title>')
resub(r'<div class="sub">Your full supplement picture.*?</div>',
      '<div class="sub">Sam Avery, 48. The full supplement picture: goals, dosing safety, recommendations, cost, and how the stack has changed since 2021. Updated 2026-10-15.</div>')
sub("<div class=\"note\">Read-only reference — what to take and when. Nothing to check off here; just tell me in chat what you <b>skipped or changed</b> and the weekly sync handles the rest.</div>",
    '<div class="note">A read-only reference for what to take and when. Skips and swaps get logged in chat, and the weekly sync updates this card.</div>')
sub('Combined daily totals — flags', 'Combined daily totals: flags')
resub(r'<div class="note"><b>These totals reflect the prior stack.*?</div></section>',
      '<div class="note">Totals add every product that contains the nutrient at its daily dose, using label amounts, and compare it to the adult upper limit for supplements. Cutting magnesium glycinate to one capsule brings magnesium to 240 mg; most of the B6 comes from the multivitamin.</div></section>')
sub("Timeline — what you've taken, mapped", "Timeline: what Sam has taken, mapped")
resub(r'<div class="note">Names are consolidated across the old sheets.*?\(the old sheets have no amounts\)\.</div>',
      '<div class="note">By product: products start collapsed; click one to see its ingredients. "Current stack only" hides anything not taken in 2026. By ingredient: every ingredient across all products. Both alphabetical. '
      'The <b>2026</b> cell color sums every current product at its daily dose and compares the total to a target range: the ceiling is the upper limit or an evidence ceiling, and a floor is set only where the stack is meant to cover the nutrient. Hover a 2026 cell for the total, the range, which products contribute, and why. Earlier columns show presence only.</div>')
resub(r'<div class="foot">.*?</div>\n</div>\n<script>',
      '<div class="foot"><span class="star">✳</span> Supplement Stack &middot; MSDO Lab demo. Sam Avery is a fictional person and every product, dose, price and lab value on this page is sample data. This dashboard illustrates a design and is not medical advice.</div>\n</div>\n'
      '<div class="demo-banner" role="note"><svg class="ico" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>Demo with sample data · Not medical advice</div>\n<script>')
sub('.star{{color:var(--accent)}}',
    '.star{{color:var(--accent)}}\n.demo-banner{{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:500;color:var(--muted);background:var(--card);border:1px solid var(--border-strong);border-radius:var(--radius-pill);padding:6px 14px;box-shadow:var(--shadow);white-space:nowrap}}\n@media(max-width:640px){{.demo-banner{{font-size:10.5px;bottom:10px}}.wrap{{padding:40px 18px 80px}}}}')
open(out, 'w').write(s)
print('patched ->', out)
