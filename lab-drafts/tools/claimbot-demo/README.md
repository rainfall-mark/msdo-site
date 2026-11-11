# ClaimBot demo: build and walkthrough tools

The demo is the ClaimBot page (Nov 7 version) with a local stand-in for the claude.ai runtime (`shim.js`: in-memory db, file storage, simulated invoice reading and browser agent) and fictional data. The working demo itself is kept out of this repo, in the "ClaimBot Lab" folder beside the site project.

- `build_demo_data.py <demo dir>`: writes `seed.js` (Jordan Reyes, a fictional member with a knee injury: 17 settlement letters, 3 tracked claims, policy year from Apr 1), a sample settlement letter PDF per letter in `_blob/` (stamped "Sample data", no insurer branding), and the Tidewater Physical Therapy invoice and receipt in `files/` that the walkthrough drops in.
- Serve the demo: `cd demo && python3 -m http.server 8812`
- `capture.js <url> <dir>` then `compose.py <dir> <out>`: the four hero views (Claims, claim card, settlement letter, Benefits), `hero-grid.webp` and `thumb.webp`.
- `record.js <url> <frames>` + `encode.sh <dir containing frames/> <out>`: frame-stepped 30 fps walkthrough in the order Claims, Settlement letters, Benefits. The agent's reading and submitting are advanced by the script. Run nothing else heavy while recording: animation speed is calibrated from the first 20 frames.

After rebuilding, grep the demo and the frames for anything personal before publishing.
