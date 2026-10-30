# Lab drafts (not deployed)

Unpublished MSDO Lab material, kept out of `public/` so it isn't served.

Published projects: Healthwise (Function edition, `public/demos/healthwise/`), MRI Explorer, and Supplement Stack (`public/demos/supplement-stack/`, fictional "Sam Avery" sample data).

Kept here for reference: the earlier full-version Healthwise demo and captures (`demos/healthwise-full/`, `images/healthwise/`), and the build tools for each demo in `tools/`.

To publish a new draft:
1. Move its demo to `public/demos/<slug>/` and its images to `public/images/lab/<slug>/`.
2. Add `src/pages/lab/<slug>.astro`.
3. Set `published: true` in `src/lib/lab.ts`.
