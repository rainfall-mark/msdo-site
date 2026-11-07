# Supplement Stack demo: build and walkthrough tools

The live Supplement Stack dashboard is built by `working/build_dashboard.py` in Mark's Supplements folder from his real ledger. The demo uses the same builder with sample inputs.

- `make_sample.py`: writes the fictional "Sam Avery" inputs (products.json, dose ranges, aliases, old dated sheets, price snapshots) into `./base/`.
- `patch_builder.py <build_dashboard.py> <out.py>`: copies the real builder and swaps every personal line (header, legend, goals, recommendations, notes, footer) for sample copy; adds the "Demo with sample data" banner. Fails loudly if the real builder has changed where it patches.
- Build: `SS_BASE=$PWD/base SS_OUT=$PWD/index.html python3 out.py`.
- `restyle_fin.py <in.html> <out.html>`: applies the Fin.ai design system (`fin.css`: cream page, square cards, two-tone Saans-style headings, mono eyebrows, orange marks, light only, timeline opening on the current stack). Run it on the builder output, then copy to `lab-drafts/demos/supplement-stack/index.html`. Works on the live dashboard too.
- `capture.js` + `compose.py`: the four hero-grid views (dashboard, recommendations, timeline with a dose popover, cost; each card from its top edge on the cream page, 1280x805 viewport) and the thumbnail, composed into `hero-grid.webp` (2880x1818, 2x2, 18px gap) and `thumb.webp` (1600x1000).
- `record.js` + `encode.sh`: frame-stepped walkthrough and encode, same as Healthwise.
- Fonts (`fonts.js`) come from `@fontsource/geist-sans`, `@fontsource/geist-mono` and `@fontsource-variable/newsreader`, stand-ins for Fin's Saans, SaansMono and Serrif. The scripts are CommonJS: run them from a scratch folder with its own `npm i playwright` and those font packages (the repo's package.json is ESM), passing that node_modules as the font root. Set `CHROME=/path/to/chrome` to use a system browser.

After rebuilding, grep the output for anything personal before publishing.
