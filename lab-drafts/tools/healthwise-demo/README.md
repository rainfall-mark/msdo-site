# Healthwise for Function demo: build and walkthrough tools

- `fixture.py` + `extra.py`: generate `fixture.json`, the fictional Function member's 130-marker panel.
- `shim.js`: stand-in for Claude's `mcp` / `sample` capabilities (serves the fixture, pre-written reviews and briefs).
- `build.py`: `source.html` (the real Healthwise for Function page) + shim + fixture -> `public/demos/healthwise/index.html`.
- `record.js`: frame-stepped Playwright recording of the 11-step walkthrough (needs the site's node_modules and local font files).
- `encode.sh`: frames -> walkthrough.mp4 / .webm / poster, with a dissolve back to the opening frame for a seamless loop.
