# Supplement Stack demo: build and walkthrough tools

The live Supplement Stack dashboard is built by `working/build_dashboard.py` in Mark's Supplements folder from his real ledger. The demo uses the same builder with sample inputs.

- `make_sample.py`: writes the fictional "Sam Avery" inputs (products.json, dose ranges, aliases, old dated sheets, price snapshots) into `./base/`.
- `patch_builder.py <build_dashboard.py> <out.py>`: copies the real builder and swaps every personal line (header, legend, goals, recommendations, notes, footer) for sample copy; adds the "Demo with sample data" banner. Fails loudly if the real builder has changed where it patches.
- Build: `SS_BASE=$PWD/base SS_OUT=$PWD/index.html python3 out.py`, then copy to `public/demos/supplement-stack/index.html`.
- `capture.js`: the four hero-grid views and the thumbnail source (compose into `hero-grid.webp` at 2880x1818, 2x2, 18px gap).
- `record.js` + `encode.sh`: frame-stepped walkthrough and encode, same as Healthwise. Fonts come from `@fontsource/inter` and `@fontsource-variable/newsreader`.

After rebuilding, grep the output for anything personal before publishing.
