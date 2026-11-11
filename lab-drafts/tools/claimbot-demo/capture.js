/* ClaimBot hero views for compose.py, each at full width (Settlement letters and Benefits scrolled so the tabs sit just below the top):
   a-claims (list), b-claim (a claim opened in the details panel), c-letters (Settlement letters), d-benefits.
   usage: node capture.js <url> <outDir> */
const { chromium } = require('playwright');
const fs = require('fs');
const [url, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
  const shot = async (n, toTabs) => { await p.evaluate(t => { const tabs = document.querySelector('.tabs'); window.scrollTo(0, t ? tabs.getBoundingClientRect().top + window.scrollY - 16 : 0); }, !!toTabs); await p.mouse.move(1430, 10); await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${n}.png` }); };

  // Add the walkthrough's physio claim (dropped, read, approved, submitted) so the list leads with it
  await p.evaluate(async () => {
    const names = ['TidewaterPT-Invoice-TPT-2341.pdf', 'TidewaterPT-Receipt-2026-10-27.pdf'];
    const dt = new DataTransfer();
    for (const nm of names) { const bl = await (await fetch('/files/' + nm)).blob(); dt.items.add(new File([bl], nm, { type: 'application/pdf' })); }
    document.getElementById('drop').dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt }));
  });
  await p.waitForFunction(() => { const x = document.getElementById('createBtn'); return x && !x.disabled; });
  await p.click('#createBtn');
  await p.waitForFunction(() => window.CA_DEMO.readingPending()); await p.evaluate(() => window.CA_DEMO.finishReading());
  await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('[data-act=approve]').scrollIntoView({ block: 'center' }));
  await p.click('[data-act=approve]'); await p.waitForTimeout(400);
  for (let i = 0; i < 3; i++) { await p.evaluate(() => window.CA_DEMO.agentStep()); await p.waitForTimeout(300); }
  await p.click('#pClose'); await p.waitForTimeout(700);

  // 1. Claims list
  await shot('a-claims');
  // 2. One claim opened in the details panel
  await p.click('#claims tr:has-text("Tidewater")'); await p.waitForTimeout(800);
  await p.evaluate(() => { document.getElementById('pBody').scrollTop = 0; });
  await shot('b-claim');
  await p.click('#pClose'); await p.waitForTimeout(700);
  // 3. Settlement letters
  await p.click('button.tab[data-tab=letters]'); await p.waitForTimeout(600);
  await shot('c-letters', true);
  // 4. Benefits
  await p.click('button.tab[data-tab=benefits]'); await p.waitForTimeout(600);
  await shot('d-benefits', true);
  await b.close(); console.log('ok');
})();
