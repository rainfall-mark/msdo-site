/* Four hero-grid views and the thumbnail from the demo.
   usage: CHROME=/path/to/chrome node capture.js <demo.html> <outDir> <node_modules with the fonts> */
const { chromium } = require(require.resolve('playwright', { paths: ['/home/claude/msdo-site', process.cwd()] }));
const { routeFonts, launchOpts } = require('./fonts');
const [demo, out, fontRoot] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts());
  const open = async (w, h, dsf) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
    await routeFonts(ctx, fontRoot);
    const p = await ctx.newPage();
    await p.goto('file://' + demo); await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '.demo-banner{display:none!important}' });
    return p;
  };
  // hero views: each card from its top edge, with the cream page showing above and at the sides
  const p = await open(1280, 805, 2.25);
  await p.addStyleTag({ content: '.wrap{padding-left:44px;padding-right:44px}' }); // wider cream margin, like a browser window
  const top = async (sel, off) => p.evaluate(([s, o]) => window.scrollTo(0, document.querySelector(s).getBoundingClientRect().top + scrollY - o), [sel, off]);
  const shot = async name => { await p.waitForTimeout(250); await p.screenshot({ path: `${out}/${name}.png` }); };
  await shot('a-top');                                   // 1. dashboard header + KPIs
  await top('section:nth-of-type(4)', 14); await shot('b-recs');   // 2. recommendations
  // 3. timeline (opens on the current stack): expand one product and hover an ingredient's 2026 cell
  await top('section:nth-of-type(6)', 14);
  const PRODUCT = process.env.TL_PRODUCT || 'Beet Root Powder', ING = process.env.TL_ING || 'Vitamin C';
  const g = await p.evaluate(n => [...document.querySelectorAll('#vprod tr.prow')].find(e => e.textContent.trim().endsWith(n)).dataset.g, PRODUCT);
  await p.click(`#vprod tr.prow[data-g="${g}"] td.pname`);
  const m = await p.evaluate(([gg, k]) => { const r = document.querySelector(`tr.irow.${gg} td[data-k="${k}"]`).getBoundingClientRect(); return [r.left + r.width * .4, r.top + r.height * .5]; }, [g, ING]);
  await p.mouse.move(m[0], m[1]); await shot('c-timeline');
  await p.mouse.move(5, 5);
  await top('section:nth-of-type(7)', 14); await shot('d-cost');           // 4. cost
  // thumbnail: the header, closer in
  const t = await open(1280, 800, 1.25);
  await t.waitForTimeout(250); await t.screenshot({ path: `${out}/thumb-src.png` });
  await b.close();
})();
