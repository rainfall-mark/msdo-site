# MSDO site — deployment notes

This project was created in Ploy and converted to a **static site for GitHub
Pages** hosting at **https://www.msdo.us**. It has been test-built successfully.

## What was changed (vs. the Ploy export)

- `astro.config.mjs` — switched from Cloudflare server mode (`output: "server"`
  + Cloudflare adapter) to `output: "static"`; set `site` to
  `https://www.msdo.us`; removed Cloudflare/edge-specific Vite settings.
- `src/pages/404.astro` — now prerendered (`prerender = true`) so GitHub Pages
  serves `dist/404.html` for unknown routes.
- `src/pages/[...slug].astro` — rewritten to prerender via `getStaticPaths()`
  instead of rendering on demand. (No `src/content/pages` exists yet, so it
  generates nothing until you add Markdown pages there.)
- `src/lib/ploy-forms/submit-form.ts` — contact form no longer posts to Ploy's
  backend (`/_ploy/form-submit`), which is gone once you leave Ploy. **See TODO.**
- Added `public/CNAME` (`www.msdo.us`) and `.github/workflows/deploy.yml`
  (GitHub Actions → GitHub Pages, using Bun).
- Removed `wrangler.jsonc` (Cloudflare-only).

## TODO before the contact form works

Open `src/lib/ploy-forms/submit-form.ts` and set `FORM_ENDPOINT`:

1. Create a free form at https://formspree.io (or https://web3forms.com).
2. Copy its endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it in place of `https://formspree.io/f/YOUR_FORM_ID`.

Everything else works without this; only the "Start a Project" form needs it.

## Publishing (summary)

1. Put this folder in your GitHub parent folder.
2. GitHub Desktop → add this as a local repository → **Publish** (name: `msdo-site`).
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.
4. **Settings → Pages → Custom domain:** `www.msdo.us` (leave "Enforce HTTPS" on).
5. DNS for msdo.us:
   - `CNAME`  host `www`  → `<your-github-username>.github.io`
   - `A` records on apex `msdo.us` → 185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153
6. Push to `main` → the Action builds and deploys automatically.

## Building locally (optional)

Requires [Bun](https://bun.sh). `bun install` then `bun run build`
(output in `dist/`), or `bun run dev` for a local preview at localhost:3000.
