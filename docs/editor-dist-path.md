# Editor Dist Path Usage

This project now publishes the built lesson Editor to two locations inside the `deploy/` output used by Netlify (or GitHub Pages), and the `Editor/dist` directory is now tracked in the Git repository so Netlify (or GitHub Pages without a build step) can serve it directly if needed:

1. Lowercase SPA path: `/editor/` (original)
2. Explicit dist path (capitalized & including build folder): `/Editor/dist/`

Purpose: The explicit path lets you point directly at the generated `index.html` artifact (`/Editor/dist/index.html`) if you prefer a more literal mapping to the source repository layout or want to bypass SPA-style redirect rules.

## Build Script Behavior
`scripts/build-all.js` performs these steps (even though `Editor/dist` is committed, the build regenerates it to stay current):
- Runs `npm install` and `npm run build` inside `Editor/`
- Copies `Editor/dist` to both:
  - `deploy/editor/`
  - `deploy/Editor/dist/`

So after `npm run build` at the root, both URLs will exist in the deployed site:
- `/editor/index.html`
- `/Editor/dist/index.html`

## Which URL Should I Use?
Use `/Editor/dist/index.html` when:
- You explicitly want the physical build output path.
- You're debugging build artifact differences.

Use `/editor/` when:
- Relying on SPA redirects (Netlify redirect rules already reference lowercase `/editor/*`).

## Subject Page Navigation
`Teacher/subject_math.html` now sends users to:
- Local development: `http://localhost:5173/?subject=subject_math` (Vite dev server)
- Production: `/Editor/dist/index.html?subject=subject_math`

If you also want other subject pages to follow this pattern, replicate the updated IIFE script block.

## Adding Redirect (Optional)
If you later want `/Editor/*` paths to behave like the lowercase SPA route (e.g., deep linking inside the editor bundle), you can add this to `netlify.toml`:
```
[[redirects]]
  from = "/Editor/*"
  to = "/Editor/dist/index.html"
  status = 200
```
Currently this is not required because we only navigate to the root `index.html` with query parameters.

## Cache Busting
Because both folders contain identical content, browsers might cache assets twice. Generally this is harmless. To avoid duplication you could eventually deprecate one path once you're confident which canonical route you prefer.

## Maintenance Recommendation
Long-term, prefer a single canonical path (`/editor/`) and a redirect or alias for the other, to reduce duplication. Once confident Netlify builds are reliable, you can optionally remove `Editor/dist` from source control again (re-add ignore rules) and rely solely on the build step.

---
Last updated: (auto) – Adjust if further changes are made.
