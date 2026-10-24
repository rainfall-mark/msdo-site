/* MSDO Lab demo shim for Healthwise for Function.
   The real app reads Function Health through Claude's connector (window.claude: mcp, sample).
   This stand-in serves a fictional Function member's results and pre-written expert reviews
   and research briefs, so the demo runs anywhere with no account and no real health data. */
(() => {
  'use strict';
  const FIXTURE = __FIXTURE__;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const cancelled = text => Object.assign(new Error('cancelled'), { code: 'cancelled', text });

  // Stream a finished text through onText in a few chunks, like a live reply.
  async function stream(text, opts) {
    const o = opts || {}, steps = window.__demoStreamSteps || 14, delay = window.__demoStreamMs || 90;
    for (let i = 1; i <= steps; i++) {
      await wait(delay);
      if (o.signal && o.signal.aborted) throw cancelled(text.slice(0, Math.round(text.length * (i - 1) / steps)));
      if (o.onText) o.onText({ text: text.slice(0, Math.round(text.length * i / steps)) });
    }
    return { text, truncated: false };
  }

  // ── Advisor: one pre-written read per expert framework (third person, no quotes) ──
  const REVIEWS = {
    attia: { headline: 'ApoB and Lp(a) together keep long-term artery risk at the top of the list, even with the trend heading the right way.', confidence: 'high',
      focus: [['ApoB', 'Down from 118 to 92 mg/dL, but this framework aims well below 60, so a wide gap remains.'], ['Lipoprotein (a)', 'At 145 nmol/L and largely inherited, it raises the stakes on every other lipid number.'], ['LDL Particle Number', 'Particle count is falling with ApoB, a sign the changes are working on the right target.'], ['Insulin', 'Fasting insulin has roughly halved since 2023, a strong metabolic signal.']],
      takeaway: 'The metabolic side has improved a lot. The open question in this framework is whether lifestyle alone can close the ApoB gap given the elevated Lp(a).',
      ask: 'Given my Lp(a), what ApoB target makes sense for me, and how would we get there?' },
    hyman: { headline: 'Most upstream signals have improved. The next things to chase are omega-3 status and the rising mercury.', confidence: 'medium',
      focus: [['Omega-3 Total', 'Still just under range at 5.2%, and this framework wants 8% or more.'], ['Mercury, Blood', 'Up from 6.8 to 11.6 ug/L, which often tracks with eating more large fish.'], ['Homocysteine', 'Now 9.1 umol/L, inside the lab range but above this framework\'s target of 8.'], ['Vitamin D, 25-Hydroxy', 'Climbed from 22 to 44 ng/mL. The framework\'s target starts at 50.']],
      takeaway: 'Falling insulin, ALT, hs-CRP and homocysteine fit an anti-inflammatory diet that is working. Raising omega-3 while lowering mercury points to smaller, low-mercury fish.',
      ask: 'Could the rise in mercury come from my fish choices, and should we recheck after I switch?' },
    bredesen: { headline: 'Several cognitive-risk contributors are moving the right way, with homocysteine and omega-3 still short of this framework\'s targets.', confidence: 'medium',
      focus: [['Homocysteine', '9.1 umol/L is down steadily but above the framework\'s target of under 7.'], ['Omega-3 Total', '5.2% against a target above 10%.'], ['Hemoglobin A1c', '5.5% and falling, which helps the metabolic side of brain health.'], ['Mercury, Blood', 'The framework counts metals as a toxic contributor, so the upward trend matters.']],
      takeaway: 'This framework looks for many small contributors at once. Glucose and inflammation look good; B vitamins, omega-3 and mercury are the remaining levers.',
      ask: 'Is it worth looking at my B-vitamin status in more detail, given my homocysteine trend?' },
    sinclair: { headline: 'Biological age has dropped from 47.8 to 44.6 alongside lower inflammation and better glucose control.', confidence: 'medium',
      focus: [['Biological Age', 'Down 3.2 years across the last three years of draws.'], ['hs-CRP', '0.7 mg/L, now under this framework\'s target of 1.'], ['Hemoglobin A1c', '5.5%, right at the framework\'s threshold.']],
      takeaway: 'In this framework the direction of biological age is the headline, and it is moving the right way. Fasting and higher-intensity exercise are the levers it would lean on next.',
      ask: 'Is a falling biological age score meaningful on its own, or should I read it alongside my other markers?' },
    huberman: { headline: 'Hormones and stress markers look steady, with testosterone and vitamin D both rising over three years.', confidence: 'medium',
      focus: [['Testosterone, Total', '534 ng/dL, up from 412, now mid-range.'], ['Vitamin D, 25-Hydroxy', '44 ng/mL, inside the framework\'s 40 to 60 target.'], ['Cortisol', '13.2 ug/dL, comfortably in range.'], ['TSH', '2.1 mIU/L and stable across every draw.']],
      takeaway: 'Nothing here is out of line for this framework. It would credit sleep regularity, morning light and training for the hormone trend.',
      ask: 'Is my testosterone trend worth tracking against how I sleep and train?' },
    longo: { headline: 'Triglycerides have nearly halved and sit close to this framework\'s target of under 70.', confidence: 'low',
      focus: [['Triglycerides', '88 mg/dL, down from 162.'], ['Glucose', '91 mg/dL fasting, lower at nearly every draw.'], ['hs-CRP', '0.7 mg/L.']],
      takeaway: 'Inflammation and metabolic markers are in a good place. IGF-1, a core marker for this framework, is not in these results.',
      ask: 'Would periodic fasting be safe for me, and should we add IGF-1 to my next panel?' },
    patrick: { headline: 'Omega-3 is the clearest gap, and the mercury trend suggests changing which fish, not adding more.', confidence: 'high',
      focus: [['Omega-3 Total', '5.2%, short of the framework\'s 8 to 10% target.'], ['Mercury, Blood', '11.6 ug/L, now just over range.'], ['Magnesium, RBC', '5.4 mg/dL, just under the framework\'s 5.5 target.'], ['Vitamin D, 25-Hydroxy', '44 ng/mL, below the framework\'s 50 to 80.']],
      takeaway: 'Micronutrients are trending up across the board. Low-mercury omega-3 sources would close the biggest gap this framework cares about.',
      ask: 'Should we recheck omega-3 and mercury together after I change my fish choices?' },
    means: { headline: 'The metabolic picture has turned around: fasting insulin, triglycerides and ALT are all well down since 2023.', confidence: 'high',
      focus: [['Insulin', '7.4 uIU/mL, down from 14.2. The framework\'s target is under 5.'], ['Triglycerides', '88 mg/dL, against a target of under 70.'], ['Glucose', '91 mg/dL, above the framework\'s 72 to 85 range.'], ['ALT', '29 U/L, back in range after starting at 52.']],
      takeaway: 'This is the pattern of improving insulin sensitivity. Lower glycemic meals and more strength training are the levers this framework would keep pushing.',
      ask: 'Would a short trial with a glucose monitor show which meals still spike?' },
    barzilai: { headline: 'Biological age and glucose control are improving, and kidney function is steady.', confidence: 'low',
      focus: [['Biological Age', '44.6 years and falling across draws.'], ['Hemoglobin A1c', '5.5%, down from 5.8.'], ['eGFR', '93 and stable.']],
      takeaway: 'This framework treats aging itself as the target. With glucose and kidney markers healthy, it would raise geroprotector trials only with a physician.',
      ask: 'Are there clinical trials on aging that someone with my profile could join?' }
  };
  function review(prompt) {
    const ids = [...prompt.matchAll(/^\[(\w+)\] /gm)].map(m => m[1]).filter(id => REVIEWS[id]);
    return {
      consensus: 'These frameworks agree the metabolic markers have improved a lot since 2023. Where they differ is what comes next: heart-focused lenses point at ApoB and Lp(a), nutrient-focused ones at omega-3 and mercury.',
      experts: ids.map(id => { const r = REVIEWS[id]; return { id, headline: r.headline, focus: r.focus.map(([marker, note]) => ({ marker, note })), takeaway: r.takeaway, ask_your_doctor: r.ask, confidence: r.confidence }; })
    };
  }

  // ── Research: pre-written briefs for the flagged markers, a template for the rest ──
  const BRIEFS = {
    'ApoB': {
      measures: 'ApoB is a protein found on every LDL, VLDL and Lp(a) particle, one per particle. Measuring it counts all the particles that can enter the artery wall and start plaque, which LDL cholesterol only estimates.',
      evidence: ['Large genetic studies (Mendelian randomization) suggest lifelong exposure to ApoB-carrying particles drives atherosclerosis, and that particle number matters more than the cholesterol inside them.', 'The 2019 ESC/EAS dyslipidaemia guidelines recommend ApoB as a risk marker, especially with high triglycerides, diabetes or obesity.', 'When LDL cholesterol and ApoB disagree, studies generally find risk follows ApoB. I am not certain of every exact citation here.'],
      experts: { attia: 'Aims for ApoB well below 60 mg/dL, reasoning that plaque builds over decades, so lower for longer means less of it.', hyman: 'Treats ApoB as part of a wider metabolic and inflammatory picture rather than a target on its own.', bredesen: 'Counts ApoB as a vascular contributor to cognitive decline, alongside homocysteine and inflammation.', means: 'Reads high ApoB as often downstream of insulin resistance, so it starts with the metabolic markers.', sinclair: 'Says little about ApoB directly.', patrick: 'Links omega-3 intake and fitness to a healthier lipid profile, though ApoB is not its main focus.' },
      numbers: ['ApoB has fallen from 118 mg/dL in Oct 2023 to 92 mg/dL in Sep 2026, a 22% drop.', 'It is still just above Function\'s range of under 90.', 'The pace has slowed: the last three draws read 97, 94 and 92.', 'Lp(a) at 145 nmol/L adds to the particle burden and is unlikely to fall with lifestyle changes.'],
      ask: ['Given my Lp(a), what ApoB target fits my overall risk?', 'Has my ApoB plateaued enough that we should discuss other options?', 'Would a coronary calcium scan help decide how aggressive to be?']
    },
    'Lipoprotein (a)': {
      measures: 'Lp(a) is an LDL-like particle with an extra protein attached. Its level is set mostly by genetics, so it tends to stay stable for life.',
      evidence: ['Genetic and population studies link high Lp(a) to heart attack, stroke and aortic valve narrowing, independent of LDL.', 'Several guidelines, including the 2019 ESC/EAS dyslipidaemia guidelines, suggest measuring Lp(a) at least once in adulthood.', 'Drugs that lower Lp(a) specifically are in late-stage trials. Whether lowering it reduces events is not yet proven.'],
      experts: { attia: 'Sees elevated Lp(a) as a reason to push ApoB lower than otherwise, since diet barely moves Lp(a) itself.', hyman: 'Notes it is largely genetic and focuses on the inflammatory and metabolic factors around it.', bredesen: 'Counts it among vascular contributors to cognitive risk.' },
      numbers: ['Lp(a) has read 142, 138 and 145 nmol/L since 2023, essentially unchanged.', 'That is well above Function\'s range of under 75.', 'The stability is expected: lifestyle changes that lowered ApoB and triglycerides rarely move Lp(a).'],
      ask: ['How much does my Lp(a) change my overall risk estimate?', 'Should my family members get tested?', 'Are any Lp(a) trials open to someone like me?']
    },
    'Omega-3 Total': {
      measures: 'This measures EPA and DHA as a share of the fatty acids in the blood. It reflects fish and omega-3 intake over the last few months.',
      evidence: ['Higher omega-3 levels are associated with lower cardiovascular and all-cause mortality in large cohort studies.', 'Trials of omega-3 supplements for heart outcomes have mixed results, with differences in dose and formulation. I am not certain of every trial name here.'],
      experts: { patrick: 'Targets an omega-3 index of 8 to 10% or higher, citing links to heart and brain health.', hyman: 'Aims for an omega-3 index above 8% as part of an anti-inflammatory approach.', bredesen: 'Wants an index above 10%, treating DHA as important for brain structure.', attia: 'Measures it but treats it as secondary to ApoB and fitness.' },
      numbers: ['Omega-3 has risen from 4.1% in Oct 2023 to 5.2% in Sep 2026.', 'It is still just under Function\'s range of above 5.4.', 'Mercury rose over the same period, which suggests more fish but possibly higher-mercury species.'],
      ask: ['What sources would raise my omega-3 without raising mercury?', 'When should I recheck both markers?', 'Is my omega-6 to omega-3 balance worth tracking too?']
    },
    'Mercury, Blood': {
      measures: 'Blood mercury mostly reflects recent fish and seafood intake. Large predatory fish such as swordfish, shark and some tuna carry the most.',
      evidence: ['Public health agencies advise choosing low-mercury fish such as salmon, sardines and trout, especially for frequent fish eaters.', 'Blood mercury usually falls within a few months of changing fish choices.'],
      experts: { hyman: 'Treats heavy metals as an upstream toxic load worth reducing.', bredesen: 'Counts mercury among the toxic contributors to cognitive decline.', patrick: 'Favors low-mercury, high-omega-3 fish to get the benefit without the metal.' },
      numbers: ['Mercury has climbed from 6.8 ug/L in Oct 2023 to 11.6 ug/L in Sep 2026.', 'It is now just over Function\'s range of 10 or under.', 'The rise lines up with omega-3 increasing, which points to diet rather than another source.'],
      ask: ['Is my mercury level high enough to need any action beyond diet?', 'Which fish should I swap out?', 'When should I recheck?']
    }
  };
  const EXPERT_RE = /^- ([^:]+): Lens:/gm;
  function brief(prompt) {
    const name = (prompt.match(/Marker: (.+?) \(([^)]+)\)\. Function reference range/) || [])[1] || 'This marker';
    const hist = ((prompt.match(/User's results, oldest first: (.+?)\. Latest status: (.+?)\./) || [])[1] || '').split('; ').filter(Boolean);
    const status = (prompt.match(/Latest status: (.+?)\./) || [])[1] || '';
    const chosen = [...prompt.matchAll(EXPERT_RE)].map(m => m[1]);
    const idOf = n => ({ 'Peter Attia': 'attia', 'David Sinclair': 'sinclair', 'Andrew Huberman': 'huberman', 'Mark Hyman': 'hyman', 'Dale Bredesen': 'bredesen', 'Valter Longo': 'longo', 'Rhonda Patrick': 'patrick', 'Casey Means': 'means', 'Barzilai and Kaeberlein': 'barzilai' })[n];
    const b = BRIEFS[name];
    const lines = ['What it measures', ''];
    if (b) {
      lines.push(b.measures, '', 'What the evidence says', '', ...b.evidence.map(x => '- ' + x), '', 'Where the experts\' targets come from', '');
      const ex = chosen.filter(n => b.experts[idOf(n)]);
      if (ex.length) ex.forEach(n => lines.push(`${n}'s framework: ${b.experts[idOf(n)]}`, ''));
      else lines.push('The experts you follow say little about this marker directly.', '');
      lines.push('Your numbers in that light', '', ...b.numbers.map(x => '- ' + x), '', 'Questions for your clinician', '', ...b.ask.map(x => '- ' + x));
    } else {
      const first = hist[0], last = hist[hist.length - 1];
      lines.push(`${name} is one of the markers in your Function panel. This demo shows a sample brief; in the full app Claude writes the evidence summary for whichever marker you pick.`, '',
        'What the evidence says', '', '- Sample brief. Live briefs name the main trials and guidelines only where Claude is confident they are real.', '',
        'Your numbers in that light', '',
        ...(first && last ? [`- First reading ${first}, latest ${last}.`, `- Latest status: ${status}.`, `- ${hist.length} draws on record.`] : ['- No history to compare yet.']), '',
        'Questions for your clinician', '', '- Is this marker worth tracking more closely for me?', '- How does it fit with my other results?', '- When should I recheck it?');
    }
    return lines.join('\n');
  }

  async function sample(prompt, opts) { return stream(brief(prompt), opts); }
  sample.json = async (prompt, opts) => { const out = review(prompt); await stream(JSON.stringify(out), opts); return out; };

  const result = () => ({ payload: JSON.parse(JSON.stringify(FIXTURE)), cache: { storedAt: Date.now() } });
  const mcp = {
    async callTool() { await wait(window.__demoConnectMs || 900); return result(); },
    watchTool(server, tool, input, cb) { const t = setTimeout(() => cb({ type: 'data', result: result() }), 450); return () => clearTimeout(t); }
  };
  // The demo opens on the Connect step, like the real app does the first time.
  const permissions = { async state() { return 'prompt'; }, async manage() {} };
  window.claude = { use: async cap => ({ mcp, permissions, sample })[cap] || null };
})();
