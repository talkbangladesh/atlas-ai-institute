# Vercel deployment notes

Checked against official documentation on 2026-11-18.

Vercel’s Vite guide supports static Vite projects and documents `vercel.json` as the configuration point for output and routing. It notes that a catch-all rewrite to `/index.html` is for SPA deep links; this site instead prerenders route-specific HTML and `404.html`, so the Vercel config deliberately does not add a catch-all rewrite. See [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json), and [Vercel custom error pages](https://vercel.com/docs/custom-error-pages).

The configuration pins Vercel’s supported Node `22.x` runtime, the same major version used for the successful local build. Vercel documents Node 26.x as its default at the time checked and supports 22.x as an available version. Vercel also documents `package-lock.json` as the npm lockfile and associates npm 10 with Node 22; this repository has an explicit `npm ci` install command. See [supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) and [package managers](https://vercel.com/docs/package-managers).

The Deploy Button URL includes `repository-url`, `project-name`, and `repository-name`. Per Vercel’s documentation, its project-creation flow clones the source repository into the chosen Git account. Therefore, the button uses the default clone name `atlas-ai-institute-vercel` to avoid the source repository name. To connect the source repository itself and get automatic deployments for its pushes, import it through Vercel’s Git integration. See [Deploy Button source parameters](https://vercel.com/docs/deploy-button/source) and [deploying Git repositories](https://vercel.com/docs/git).

Web3Forms documents its access keys as public for client-side submissions. It also notes that some free provider subdomains may be blocked until a domain is reviewed; the Vercel build itself requires no form secrets. See [Web3Forms troubleshooting](https://docs.web3forms.com/getting-started/troubleshooting).
