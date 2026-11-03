// Four hero views + thumbnail source from the demo. usage: node capture.js <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const out = process.argv[2]; fs.mkdirSync(out, {recursive:true});
const G = '/home/claude/fonts/node_modules/@fontsource/gelasio/files/';
const face = (w, st) => `@font-face{font-family:'Georgia';font-weight:${w};font-style:${st};src:url(data:font/woff2;base64,${fs.readFileSync(G+`gelasio-latin-${w}-${st}.woff2`).toString('base64')}) format('woff2');}`;
const FONTS = [400,500,600,700].flatMap(w => [face(w,'normal'), face(w,'italic')]).join('\n') + "\n.ks-demo-bar{display:none!important}";
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}, deviceScaleFactor:2})).newPage();
  const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8811/index.html'); await p.addStyleTag({content:FONTS}); await p.evaluate(() => { try { localStorage.clear(); } catch(e){} }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(900);
  const shot = async n => { await p.waitForTimeout(350); await p.screenshot({path:`${out}/${n}.png`}); };
  const until = async (fn, arg, t=20000) => { await p.waitForFunction(fn, arg, {timeout:t}); };
  // 1. Dashboard with the agent's overview (open the column for this one)
  await p.evaluate(() => { kwSetCollapsed(false); KWL.panel.slug = null; KWL.panel.cleared = true; kwRenderPanel(); }); await p.waitForTimeout(500);
  await shot('a-dashboard');
  // 2. Stuck on a Pause-only page, then asking the agent to figure it out
  const idx = await p.evaluate(() => M.findIndex(m => m.name === 'Crunchwise Meal Kits'));
  await p.click(`#expbtn-${idx}`); await p.waitForTimeout(600);
  await p.evaluate(i => { const r = document.getElementById('row-'+i), sc = document.getElementById('kwMain'); sc.scrollTop += r.getBoundingClientRect().top - 330; }, idx);
  await p.click('#kwAgent >> text=/Cancel subscription/i');
  await until(() => kwState(KWL.kills['crunchwise-meal-kits']) === 'blocked');
  await p.fill('#kwaInput', 'Can you figure it out? I want it canceled, not paused.'); await p.press('#kwaInput', 'Enter');
  await until(() => !KWL.panel.thinking && ((KWL.kills['crunchwise-meal-kits']||{}).feed||[]).some(f => /Looking through/.test(f.text)));
  await p.waitForTimeout(400);
  await p.waitForTimeout(2600);
  await p.evaluate(() => { const t = document.getElementById('kwToast'); if (t) t.style.display = 'none'; const f = document.getElementById('kwaFeed'); if (f) { const msgs = [...f.querySelectorAll('.kwa-msg.you')]; const last = msgs[msgs.length-1]; if (last) f.scrollTop += last.getBoundingClientRect().top - f.getBoundingClientRect().top - 12; } });
  await shot('b-chat');
  // 3. Your go-ahead
  await until(() => kwState(KWL.kills['crunchwise-meal-kits']) === 'ready_to_commit');
  await p.waitForTimeout(500);
  await p.evaluate(() => { const a = document.querySelector('#kwAgent .kwa-actions'); if (a) a.scrollTop = a.scrollHeight; const f = document.getElementById('kwaFeed'); if (f) f.scrollTop = f.scrollHeight; });
  await shot('c-goahead');
  // 4. Killed and verified, savings up
  await p.click('#kwAgent >> text=/^Yes, click/i');
  await until(() => kwState(KWL.kills['crunchwise-meal-kits']) === 'verified_live');
  await p.waitForTimeout(600);
  await p.evaluate(() => { document.getElementById('kwMain').scrollTop = 0; });
  await shot('d-killed');
  console.log(errs.join('\n') || 'ok');
  await b.close();
})();
