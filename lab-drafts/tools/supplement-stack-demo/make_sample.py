#!/usr/bin/env python3
"""Sample-data inputs for the MSDO Lab Supplement Stack demo.

Sam Avery is fictional; every product, dose, price and lab value is invented.
Writes the files build_dashboard.py reads into ./base/, then builds a patched
copy of the builder (personal copy swapped for demo copy) and runs it.
"""
import json, os, re, sys, subprocess
import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(HERE, 'base')
os.makedirs(f'{BASE}/working/prices', exist_ok=True)
os.makedirs(f'{BASE}/Intake', exist_ok=True)

NEW = '2026-07-30 added'

def P(name, bucket, serving, sday, ings, status='Current', notes='', pending=None, also=None):
    d = dict(name=name, status=status, cat_bucket=bucket, serving=serving, sday=sday, ings=ings, notes=notes)
    if pending: d['pending'] = pending
    if also: d['also_buckets'] = also
    return d

# ings: [label, dose-range key, amount per serving, unit]
products = [
    # Morning: smoothie (7) and with food (2)
    P('Whey Protein (Vanilla)', 7, '1 scoop (30 g)', 1, [['Whey Protein Isolate', 'Protein', 25, 'g']]),
    P('Creatine Monohydrate', 7, '5 g', 1, [['Creatine Monohydrate', 'Creatine', 5, 'g']]),
    P('Beet Root Powder', 7, '1 scoop (5 g)', 1, [['Beet Root (nitrates)', 'Dietary nitrate', 300, 'mg'], ['Vitamin C', 'Vitamin C', 30, 'mg']], notes=NEW),
    P("Men's 40+ Multivitamin", 2, '1 tablet', 1, [
        ['Vitamin A', 'Vitamin A', 900, 'mcg'], ['Vitamin C', 'Vitamin C', 90, 'mg'], ['Vitamin D3', 'Vitamin D3', 800, 'IU'],
        ['Vitamin E', 'Vitamin E', 15, 'mg'], ['Vitamin K1', 'Vitamin K', 80, 'mcg'], ['Vitamin B6', 'Vitamin B6', 25, 'mg'],
        ['Vitamin B12', 'Vitamin B12', 50, 'mcg'], ['Folate', 'Folate', 400, 'mcg DFE'], ['Magnesium', 'Magnesium', 80, 'mg'],
        ['Zinc', 'Zinc', 11, 'mg'], ['Selenium', 'Selenium', 55, 'mcg'], ['Lycopene', 'Lycopene', 300, 'mcg']]),
    P('Fish Oil (EPA + DHA)', 2, '2 softgels', 2, [['EPA', 'EPA + DHA', 325, 'mg'], ['DHA', 'EPA + DHA', 215, 'mg']]),
    P('Vitamin D3 2,000 IU', 2, '1 softgel', 1, [['Vitamin D3', 'Vitamin D3', 2000, 'IU']]),
    P('Aged Garlic Extract 600 mg', 2, '1 capsule', 1, [['Aged Garlic Extract', 'Aged garlic extract', 600, 'mg'], ['S-Allyl Cysteine', 'S-Allyl Cysteine', 1.2, 'mg']]),
    # Mid-day with food (3)
    P('Tart Cherry 500 mg', 3, '2 capsules', 2, [['Tart Cherry Extract', 'Tart cherry extract', 500, 'mg']], notes=NEW),
    P('Glucosamine + Chondroitin', 3, '1 tablet', 1, [['Glucosamine Sulfate', 'Glucosamine', 1500, 'mg'], ['Chondroitin Sulfate', 'Chondroitin', 1200, 'mg'], ['MSM', 'MSM', 500, 'mg']],
      pending={'type': 'decide'}),
    # Mid-afternoon (9)
    P('Acacia Fiber Powder', 9, '1 tbsp (6 g)', 1, [['Acacia Gum (soluble fiber)', 'Soluble fiber', 6, 'g']]),
    # Dinner (10)
    P('Zinc Picolinate 15 mg', 10, '1 capsule', 1, [['Zinc', 'Zinc', 15, 'mg']]),
    # Bedtime (5)
    P('Magnesium Glycinate', 5, '2 caps (200 mg)', 2, [['Magnesium', 'Magnesium', 100, 'mg'], ['Glycine', 'Glycine', 500, 'mg']],
      pending={'type': 'adjust', 'note': '2 → 1 cap'}),
    P('Wind-Down Powder', 5, '1 scoop', 1, [['Magnesium', 'Magnesium', 60, 'mg'], ['Glycine', 'Glycine', 1500, 'mg'], ['Lemon Balm', 'Lemon balm', 300, 'mg'], ['Chamomile', 'Chamomile', 150, 'mg']], notes=NEW),
    # Optional
    P('Electrolyte Drink Mix', 6, '1 stick', 1, [['Sodium', 'Sodium', 500, 'mg'], ['Potassium', 'Potassium', 200, 'mg'], ['Magnesium', 'Magnesium', 60, 'mg']], status='Optional'),
    # Prior products (timeline only)
    P('Krill Oil 500 mg', 2, '', 0, [['EPA', 'EPA + DHA', 0, 'mg'], ['DHA', 'EPA + DHA', 0, 'mg'], ['Phospholipids', 'Phospholipids', 0, 'mg']], status='Prior'),
]
json.dump(products, open(f'{BASE}/products.json', 'w'), indent=1)

ranges = {
    '_note': 'Sample ranges for the demo.',
    'Magnesium': {'low': 150, 'high': 350, 'unit': 'mg', 'ul': True, 'why': 'The 350 mg upper limit applies to supplements only, not food. The stack is meant to cover magnesium for sleep.'},
    'Vitamin B6': {'low': None, 'high': 12, 'unit': 'mg', 'ul': True, 'why': 'EFSA set a 12 mg/day upper limit in 2023; long-term high doses are linked to nerve symptoms. Most of this comes from the multivitamin.'},
    'Zinc': {'low': None, 'high': 40, 'unit': 'mg', 'ul': True, 'why': 'Under the upper limit, but two sources. Long-term high zinc can lower copper.'},
    'Vitamin D3': {'low': 1000, 'high': 4000, 'unit': 'IU', 'ul': True, 'why': 'Last level 41 ng/mL (sample). The range keeps it there without overshooting.'},
    'EPA + DHA': {'low': 1000, 'high': 3000, 'unit': 'mg', 'ul': False, 'why': 'About 1 g a day supports the heart-health goal; above 3 g only under a doctor.'},
    'Soluble fiber': {'low': 10, 'high': None, 'unit': 'g', 'ul': False, 'why': 'About 10 g a day of soluble fiber lowers LDL-C. Diet covers some; the powder is meant to close the gap.'},
    'Folate': {'low': None, 'high': 1000, 'unit': 'mcg DFE', 'ul': True, 'why': 'Upper limit applies to folic acid from supplements.'},
    'Vitamin A': {'low': None, 'high': 3000, 'unit': 'mcg', 'ul': True, 'why': 'Preformed vitamin A upper limit.'},
    'Selenium': {'low': None, 'high': 400, 'unit': 'mcg', 'ul': True, 'why': 'Well under the upper limit.'},
    'Vitamin E': {'low': None, 'high': 1000, 'unit': 'mg', 'ul': True, 'why': 'Well under the upper limit.'},
    'Vitamin C': {'low': None, 'high': 2000, 'unit': 'mg', 'ul': True, 'why': 'Food covers vitamin C; the stack only adds a little.'},
    'Creatine': {'low': 3, 'high': 5, 'unit': 'g', 'ul': False, 'why': '3 to 5 g a day is the studied maintenance dose.'},
    'Protein': {'low': None, 'high': None, 'why': 'Counted with meals, not against a supplement range.'},
}
json.dump(ranges, open(f'{BASE}/dose-ranges.json', 'w'), indent=1)
aliases = {'EPA + DHA': ['EPA', 'DHA']}
for p in products:
    for label, key, *_ in p['ings']:
        if key != 'EPA + DHA' and label.lower() != key.lower():
            aliases.setdefault(label, [])
            if key not in aliases[label]: aliases[label].append(key)
        elif key != 'EPA + DHA' and label != key:
            aliases.setdefault(label, [key])
json.dump({'ingredients': aliases, 'products': {}}, open(f'{BASE}/timeline-aliases.json', 'w'), indent=1)

# Ledger: only the Daily Totals sheet is read; leave it empty so flags derive from the totals.
wb = openpyxl.Workbook(); ws = wb.active; ws.title = 'Daily Totals'; wb.save(f'{BASE}/stack-ledger.xlsx')

# Old dated sheets for the timeline (presence only).
TABS = [('t1', '2021-03'), ('t2', '2021-11'), ('t3', '2022-06'), ('t4', '2023-02'), ('t5', '2023-10'), ('t6', '2024-05'), ('t7', '2025-04')]
ING = {
    'Basic Daily Multivitamin': ['Vitamin A', 'Vitamin C', 'Vitamin D3', 'Vitamin E', 'Vitamin B12', 'Folate', 'Zinc', 'Selenium'],
    "Men's 40+ Multivitamin": ['Vitamin A', 'Vitamin C', 'Vitamin D3', 'Vitamin E', 'Vitamin K1', 'Vitamin B6', 'Vitamin B12', 'Folate', 'Magnesium', 'Zinc', 'Selenium', 'Lycopene'],
    'Vitamin D3 1,000 IU': ['Vitamin D3'], 'Vitamin D3 2,000 IU': ['Vitamin D3'],
    'Vitamin C 1,000 mg': ['Vitamin C', 'Rose Hips'],
    'Fish Oil (EPA + DHA)': ['EPA', 'DHA'], 'Krill Oil 500 mg': ['EPA', 'DHA', 'Phospholipids'],
    'Whey Protein (Vanilla)': ['Whey Protein Isolate'], 'Pea Protein (Chocolate)': ['Pea Protein Isolate', 'Cocoa', 'Monk Fruit'],
    'BCAA Powder (Lemon)': ['L-Leucine', 'L-Isoleucine', 'L-Valine'],
    'Pre-Workout Powder': ['Caffeine', 'Beta-Alanine', 'L-Citrulline', 'Vitamin B6'],
    'Creatine Monohydrate': ['Creatine Monohydrate'],
    'Elderberry Gummies': ['Elderberry Extract', 'Vitamin C', 'Zinc'],
    'Valerian Root 450 mg': ['Valerian Root'],
    'Magnesium Citrate 200 mg': ['Magnesium'], 'Magnesium Glycinate': ['Magnesium', 'Glycine'],
    'Glucosamine + Chondroitin': ['Glucosamine Sulfate', 'Chondroitin Sulfate', 'MSM'],
    'Electrolyte Drink Mix': ['Sodium', 'Potassium', 'Magnesium'],
    'Aged Garlic Extract 600 mg': ['Aged Garlic Extract', 'S-Allyl Cysteine'],
    'Acacia Fiber Powder': ['Acacia Gum (soluble fiber)'],
    'Zinc Picolinate 15 mg': ['Zinc'],
}
SNAP = {
    't1': ['Basic Daily Multivitamin', 'Vitamin D3 1,000 IU', 'Vitamin C 1,000 mg', 'Krill Oil 500 mg', 'Pea Protein (Chocolate)'],
    't2': ['Basic Daily Multivitamin', 'Vitamin D3 1,000 IU', 'Vitamin C 1,000 mg', 'Fish Oil (EPA + DHA)', 'Pea Protein (Chocolate)', 'Elderberry Gummies', 'Valerian Root 450 mg'],
    't3': ['Basic Daily Multivitamin', 'Vitamin D3 2,000 IU', 'Fish Oil (EPA + DHA)', 'Whey Protein (Vanilla)', 'Creatine Monohydrate', 'BCAA Powder (Lemon)', 'Elderberry Gummies', 'Valerian Root 450 mg', 'Magnesium Citrate 200 mg'],
    't4': ['Basic Daily Multivitamin', 'Vitamin D3 2,000 IU', 'Fish Oil (EPA + DHA)', 'Whey Protein (Vanilla)', 'Creatine Monohydrate', 'BCAA Powder (Lemon)', 'Pre-Workout Powder', 'Elderberry Gummies', 'Valerian Root 450 mg', 'Magnesium Citrate 200 mg', 'Glucosamine + Chondroitin', 'Vitamin C 1,000 mg'],
    't5': ["Men's 40+ Multivitamin", 'Vitamin D3 2,000 IU', 'Fish Oil (EPA + DHA)', 'Krill Oil 500 mg', 'Whey Protein (Vanilla)', 'Creatine Monohydrate', 'BCAA Powder (Lemon)', 'Pre-Workout Powder', 'Elderberry Gummies', 'Valerian Root 450 mg', 'Magnesium Glycinate', 'Glucosamine + Chondroitin', 'Vitamin C 1,000 mg', 'Electrolyte Drink Mix', 'Aged Garlic Extract 600 mg', 'Zinc Picolinate 15 mg'],
    't6': ["Men's 40+ Multivitamin", 'Vitamin D3 2,000 IU', 'Fish Oil (EPA + DHA)', 'Krill Oil 500 mg', 'Whey Protein (Vanilla)', 'Pea Protein (Chocolate)', 'Creatine Monohydrate', 'BCAA Powder (Lemon)', 'Pre-Workout Powder', 'Elderberry Gummies', 'Valerian Root 450 mg', 'Magnesium Glycinate', 'Magnesium Citrate 200 mg', 'Glucosamine + Chondroitin', 'Vitamin C 1,000 mg', 'Electrolyte Drink Mix', 'Aged Garlic Extract 600 mg', 'Zinc Picolinate 15 mg'],
    't7': ["Men's 40+ Multivitamin", 'Vitamin D3 2,000 IU', 'Fish Oil (EPA + DHA)', 'Whey Protein (Vanilla)', 'Creatine Monohydrate', 'Pre-Workout Powder', 'Elderberry Gummies', 'Magnesium Glycinate', 'Glucosamine + Chondroitin', 'Electrolyte Drink Mix', 'Aged Garlic Extract 600 mg', 'Zinc Picolinate 15 mg', 'Acacia Fiber Powder', 'Valerian Root 450 mg', 'BCAA Powder (Lemon)'],
}
owb = openpyxl.Workbook(); owb.remove(owb.active)
for tab, _ in TABS:
    ws = owb.create_sheet(tab)
    ws.append(['Product Name', 'Supplier', 'Ingredients'])
    for prod in SNAP[tab]:
        for ing in ING[prod]:
            ws.append([prod, 'Sample', ing])
owb.save(f'{BASE}/Intake/OLD_Supplements List.xlsx')

# Cost snapshots.
CATS = {'Whey Protein (Vanilla)': 'Recovery', 'Creatine Monohydrate': 'Recovery', 'Tart Cherry 500 mg': 'Recovery', 'Beet Root Powder': 'Recovery',
        'Glucosamine + Chondroitin': 'Joints', "Men's 40+ Multivitamin": 'Foundations', 'Vitamin D3 2,000 IU': 'Foundations', 'Zinc Picolinate 15 mg': 'Foundations',
        'Fish Oil (EPA + DHA)': 'Heart health', 'Aged Garlic Extract 600 mg': 'Heart health', 'Acacia Fiber Powder': 'Heart health',
        'Magnesium Glycinate': 'Sleep', 'Wind-Down Powder': 'Sleep', 'Electrolyte Drink Mix': 'Recovery'}
# name: (price, count, unit, monthly)
PRICE = {'Whey Protein (Vanilla)': (68.00, 60, 'servings', 34), 'Beet Root Powder': (19.00, 30, 'servings', 19), 'Fish Oil (EPA + DHA)': (36.00, 120, 'softgels', 18),
         'Wind-Down Powder': (17.00, 30, 'servings', 17), 'Tart Cherry 500 mg': (24.00, 90, 'capsules', 16), 'Aged Garlic Extract 600 mg': (30.00, 60, 'capsules', 15),
         'Glucosamine + Chondroitin': (28.00, 60, 'tablets', 14), 'Magnesium Glycinate': (26.00, 120, 'capsules', 13), "Men's 40+ Multivitamin": (24.00, 60, 'tablets', 12),
         'Acacia Fiber Powder': (22.00, 60, 'servings', 11), 'Creatine Monohydrate': (27.00, 90, 'servings', 9), 'Vitamin D3 2,000 IU': (12.00, 90, 'softgels', 4),
         'Zinc Picolinate 15 mg': (9.00, 90, 'capsules', 3), 'Electrolyte Drink Mix': (24.00, 60, 'sticks', 12)}
def snapshot(date, bump):
    rows = []
    for p in products:
        if p['status'] not in ('Current', 'Optional'): continue
        price, count, unit, monthly = PRICE[p['name']]
        m = monthly * bump.get(p['name'], 1)
        src, conf, note = ('amazon', 'high', '')
        if p['name'] == 'Wind-Down Powder': src, conf, note = ('brand_site', 'medium', 'Sold on the brand site only; price read there.')
        rows.append(dict(status=p['status'], brand='', name=p['name'], cat=CATS[p['name']], price=price, count=count, unit=unit, monthly=m, source=src, confidence=conf, notes=note))
    cur = [r for r in rows if r['status'] == 'Current']
    tot = sum(r['monthly'] for r in cur)
    by = {}
    for r in cur: by[r['cat']] = by.get(r['cat'], 0) + r['monthly']
    return dict(date=date, total_current=tot, rows=rows, by_category=by)
json.dump(snapshot('2026-08-15', {'Whey Protein (Vanilla)': 0.94, 'Beet Root Powder': 0.9, 'Fish Oil (EPA + DHA)': 0.95}), open(f'{BASE}/working/prices/2026-08-15-cost.json', 'w'))
json.dump(snapshot('2026-09-15', {'Whey Protein (Vanilla)': 0.97}), open(f'{BASE}/working/prices/2026-09-15-cost.json', 'w'))
json.dump(snapshot('2026-10-15', {}), open(f'{BASE}/working/prices/2026-10-15-cost.json', 'w'))
print('sample inputs written to', BASE)
