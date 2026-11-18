# SEO implementation report

## Scope

The supplied archive is a React 19, React Router, and Vite application, not a Next.js project. The implementation retained that architecture and changed no page/component/layout/CSS source. SEO changes are limited to route metadata/JSON-LD, `llms.txt`, project documentation, and generated build output.

## Changes

- Added stable `@id` links for Atlas AI Institute, its website, and Nafiul Ahmad Rafi; the organization references the same Person entity used on his leadership profile.
- Separated the Atlas Global South AI Policy Coalition as its own Organization entity. Coalition committee profiles use `memberOf` that entity rather than `worksFor` Atlas AI Institute. Institute leadership entries use the broader `affiliation` relationship unless the displayed designation is the Founding Director role.
- Added conservative `ItemList` structured data for existing research, framework, report, and publication listings. Records are derived from the supplied publication data; author objects are included only when the record contains one unambiguous name, and publication dates use full dates only when provided.
- Expanded `public/llms.txt` to point directly to existing public research, project, tool, report, framework, and founder-profile pages.
- Added `docs/evidence-registry.csv`. It marks site assertions as self-reported and unresolved external claims as pending or unsupported; unverified superlatives and adoption claims are not added to structured data.
- Added `vercel.json` for `npm ci`, `npm run build`, `dist`, Node 22.x, trailing-slash URLs, legacy redirects, and basic response headers. No SPA catch-all rewrite is used because the build emits route-specific HTML and `404.html`.
- Added a README Deploy Button. It opens Vercel’s project flow and clones the public source into a new provider repository; the README separately explains how to import the original repository for push-triggered deployments.

## Checks actually run

- `npm ci --no-audit --no-fund`: passed.
- `npm run lint` (`tsc --noEmit`): passed.
- `npm run build`: passed; generated 46 sitemap routes and `404.html`.
- Vercel configuration sanity check: passed for JSON syntax, Node 22.x, build/output commands, redirects, no SPA rewrite, generated not-found document, and the README deployment link.
- GitHub: created and verified the public [`talkbangladesh/atlas-ai-institute`](https://github.com/talkbangladesh/atlas-ai-institute) repository; pushed the site on `main`. The push excludes generated `dist/`, `node_modules/`, and real `.env` files.
- Raw-file validation: all 46 sitemap routes had prerendered body content, a title, description, canonical URL, and parseable JSON-LD. The 404 document had `noindex, follow`; the reports list contained four Report records; robots and llms files were present.
- Frontend preservation: compared the body markup of all 48 original prerendered `index.html` files with the rebuilt package; all were byte-identical.
- Local Vite production-preview checks returned HTTP 200 for `/`, the founder profile, `/reports/`, `sitemap.xml`, `robots.txt`, and `llms.txt`.
- `npm audit` (2026-11-18): 5 high, 0 critical advisories in the locked dependency tree. Suggested changes include major-version adjustments and Vite 8 to 6.2.7; dependencies and lockfiles were not changed.

## Known blockers and work not represented as complete

The local Vite preview returns HTTP 200 and the homepage shell for an unknown path, so that preview does not prove Vercel’s status behavior. The Vercel build emits `dist/404.html`, and the Vercel config does not rewrite unknown paths to the homepage; the production HTTP 404, redirects, and headers still require verification after a Vercel deployment.

No Vercel project or production deployment was created. Mobile/desktop Lighthouse runs and screenshot comparisons were not performed. Public claims requiring independent source review remain marked pending in the evidence registry; this package does not claim to have completed that external fact-check.
