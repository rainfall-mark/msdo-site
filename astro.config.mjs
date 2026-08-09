// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { sitemapWithCustomPages } from "./src/lib/sitemap/sitemap-with-custom-pages-plugin.ts";

// Separate vite cache dirs so `astro dev` and `astro build`/`check` don't conflict.
const astroCommand = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
const viteCacheDir =
  astroCommand === "dev" || astroCommand === "preview"
    ? "node_modules/.vite-dev"
    : "node_modules/.vite-build";

// https://astro.build/config
// Converted from Ploy's Cloudflare (server) setup to a static build for
// GitHub Pages hosting. See DEPLOY-NOTES.md.
export default defineConfig({
  // Live site host — used for canonical URLs, sitemap, and robots.txt.
  site: "https://www.msdo.us",
  output: "static",
  // Astro defaults (directory format, trailingSlash "ignore"): emits
  // dist/about/index.html served at /about/ on GitHub Pages, with canonical
  // URLs and the sitemap consistently using the trailing-slash form.
  integrations: [mdx(), react(), ...sitemapWithCustomPages()],
  vite: {
    cacheDir: viteCacheDir,
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  devToolbar: {
    enabled: false,
  },
});
