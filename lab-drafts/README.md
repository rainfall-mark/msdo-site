# Lab drafts (not deployed)

Unpublished MSDO Lab experiments, kept out of `public/` so GitHub Pages doesn't serve them.

| Project | Demo | Images | Page component |
|---|---|---|---|
| Supplement Stack | `demos/supplement-stack/` | `images/supplement-stack/` | `src/components/pages/lab/supplement-stack.tsx` |

Supplement Stack uses fictional sample data ("Sam Avery"). Healthwise is published; `images/healthwise/` keeps its older captures and demo recording for reference.

To publish one:
1. `git mv lab-drafts/demos/<slug> public/demos/<slug>` and `git mv lab-drafts/images/<slug> public/images/lab/<slug>`
2. Restore `src/pages/lab/<slug>.astro` from git history.
3. Set `published: true` in `src/lib/lab.ts`.
4. Optionally switch the page to the simpler `buildLabExperiment` layout used by MRI Explorer.
