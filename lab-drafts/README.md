# Lab drafts (not deployed)

Lab material kept out of `public/`, so none of it is served on msdo.us.

The working demos for all three published Lab projects live here, not on the site: visitors see the recorded walkthroughs and an "I'm interested" form instead. Keep them for re-recording walkthroughs and captures:

- `demos/healthwise/`: Healthwise for Function, fictional sample data
- `demos/mri-explorer/`: MRI Explorer
- `demos/supplement-stack/`: Supplement Stack, fictional "Sam Avery" sample data
- `demos/healthwise-full/` and `images/healthwise/`: the earlier full-version Healthwise demo and captures, for reference

Build and recording tools for each demo are in `tools/`.

To add a new Lab project: put its images in `public/images/lab/<slug>/`, its demo here in `demos/<slug>/`, add `src/pages/lab/<slug>.astro`, and set `published: true` in `src/lib/lab.ts`.
