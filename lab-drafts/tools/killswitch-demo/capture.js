// Four hero views + thumbnail source from the demo. usage: node capture.js <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const out = process.argv[2]; fs.mkdirSync(out, {recursive:true});
const G = '/home/claude/fonts/node_modules/@fontsource/gelasio/files/';
const face = (w, st) => `@font-face{font-family:'Georgia';font-weight:${w};font-style:${st};src:url(data:font/woff2;base64,${fs.readFileSync(G+`gelasio-latin-${w}-${st}.woff2`).toString('base64')}) format('woff2');}`;
const FONTS = [400,500,600,700].flatMap(w => [face(w,'normal'), face(w,'italic')]).join('\n') + "\n.ks-demo-bar{display:none!important}";
const CW = 'crunchwise-meal-kits';
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}, deviceScaleFactor:2})).newPage();
  const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8811/index.html'); await p.addStyleTag({content:FONTS}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(900);
  const shot = async n => { await p.waitForTimeout(350); await p.evaluate(() => { const t = document.getElementById('kwToast'); if (t) t.style.display = 'none'; }); await p.screenshot({path:`${out}/${n}.png`}); };
  const until = async (fn, arg) => { await p.waitForFunction(fn, arg, {timeout:60000}); };
  const sc = () => p.evaluate(() => { const m = document.getElementById('kwMain'); return m && m.scrollHeight > m.clientHeight + 4 ? 'main' : 'doc'; });
  // 1. The dashboard alone, agent column hidden (the walkthrough's opening frame)
  await shot('a-dashboard');
  // 2. Details of one subscription, agent column open
  const idx = await p.evaluate(() => M.findIndex(m => m.name === 'Crunchwise Meal Kits'));
  await p.click(`#expbtn-${idx}`); await p.waitForTimeout(900);
  await p.evaluate(i => { const r = document.getElementById('row-'+i), m = document.getElementById('kwMain'), s = m && m.scrollHeight > m.clientHeight + 4 ? m : document.scrollingElement; s.scrollTop += r.getBoundingClientRect().top - 300; }, idx);
  await shot('b-details');
  // 3. Asks for your go-ahead (red module)
  await p.click('#kwAgent >> text=/Cancel subscription/i');
  await until(s => kwState(KWL.kills[s]) === 'blocked', CW);
  await p.fill('#kwaInput', 'Can you figure it out? I want it canceled, not paused.'); await p.press('#kwaInput', 'Enter');
  await until(s => kwState(KWL.kills[s]) === 'ready_to_commit', CW);
  await p.waitForTimeout(600);
  await p.evaluate(() => { const f = document.getElementById('kwaFeed'); if (f) f.scrollTop = f.scrollHeight; });
  await shot('c-goahead');
  // 4. Canceled and verified (green module), savings up top
  await p.click('#kwAgent >> text=/^Yes, click/i');
  await until(s => kwState(KWL.kills[s]) === 'verified_live', CW);
  await p.waitForTimeout(700);
  await p.evaluate(() => { const m = document.getElementById('kwMain'); if (m) m.scrollTop = 0; document.scrollingElement.scrollTop = 0; });
  await shot('d-canceled');
  console.log(errs.join('\n') || 'ok');
  await b.close();
})();
