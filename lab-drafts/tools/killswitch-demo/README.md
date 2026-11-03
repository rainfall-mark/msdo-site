# Killswitch demo: build and walkthrough tools

The demo is the plugin's own live dashboard (v0.7 hosted layer) with fictional data and a local simulation in place of the private claude.ai runtime.

- `sample_data.js`: Sam Avery's fictional subscriptions (invented merchants, `.example` domains).
- `build_demo.py <out.html>`: needs, beside it, the plugin's `Dashboard_Template.html`, `build_hosted.py`, `kill_layer.js` and `kill_layer.css` (from `Killswitch/plugin-src/skills/.../templates` and `hosted/`). Splices the sample data into the template, runs `build_hosted.py`, then adds `demo_shim.js` (in-memory db, simulated browser agent, canned in-column chat) and `demo_post.js` (display tweaks) plus the "Demo with sample data" bar.
- `capture.js <dir>` then `compose.py <dir> <out>`: the four hero views, `hero-grid.webp` (2880x1818, 2x2, 48px gutters) and `thumb.webp`. Serve the demo at http://localhost:8811/index.html first.
- `record.js <url> <frames>` + `encode.sh . <out>`: frame-stepped walkthrough. The agent runs at `KS_SLOW` 2.5x and the recorder waits off-camera for each step.

Georgia renders with Gelasio (`@fontsource/gelasio`) in captures. After rebuilding, grep the output for anything personal before publishing.
