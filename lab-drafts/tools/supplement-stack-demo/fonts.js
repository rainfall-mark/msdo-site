// Fin.ai stand-in fonts (Geist, Geist Mono, Newsreader) served from @fontsource so captures never depend on the network.
// fontRoot is a node_modules folder containing @fontsource/geist-sans, @fontsource/geist-mono, @fontsource-variable/newsreader.
const fs = require('fs');
const CSS = [
  [`Geist`, 400, '@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2', 'woff2'],
  [`Geist`, 500, '@fontsource/geist-sans/files/geist-sans-latin-500-normal.woff2', 'woff2'],
  [`Geist Mono`, 400, '@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2', 'woff2'],
  [`Newsreader`, '200 800', '@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2', 'woff2-variations'],
].map(([f, w, p, fmt]) => `@font-face{font-family:'${f}';font-style:normal;font-weight:${w};font-display:block;src:url(https://localfonts.test/${p}) format('${fmt}');}`).join('\n');
async function routeFonts(ctx, fontRoot) {
  await ctx.route(/fonts\.googleapis\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: CSS }));
  await ctx.route(/fonts\.gstatic\.com/, r => r.abort());
  await ctx.route(/localfonts\.test/, r => r.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(fontRoot + '/' + new URL(r.request().url()).pathname.slice(1)) }));
}
const launchOpts = () => (process.env.CHROME ? { executablePath: process.env.CHROME, args: ['--no-sandbox'] } : {});
module.exports = { routeFonts, launchOpts };
