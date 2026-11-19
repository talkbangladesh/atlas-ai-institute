# Atlas AI Institute

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftalkbangladesh%2Fatlas-ai-institute&project-name=atlas-ai-institute&repository-name=atlas-ai-institute-vercel)

This is the public source for the Atlas AI Institute website. It is a Vite/React site that generates static HTML for its public routes during the build.

## Deploy with Vercel

Use the button above to open Vercel’s project-creation flow. The Deploy Button clones this repository to the Git provider account selected in that flow and creates a Vercel project. The default clone repository name is `atlas-ai-institute-vercel` to avoid colliding with this source repository.

To deploy this exact repository and enable automatic deployments from its `main` branch, connect GitHub in Vercel and import `talkbangladesh/atlas-ai-institute` as a new project. Vercel will build each new push after the Git connection is enabled.

The root `vercel.json` explicitly sets `npm ci`, `npm run build`, and `dist` as the static output directory. It keeps the site’s prerendered route HTML and generated `404.html`; it intentionally has no catch-all SPA rewrite. The Node build runtime is pinned to `22.x`, matching the tested local build environment. No Vercel environment variables are required to build the site.

The generated route URLs use trailing slashes. The configuration keeps those URLs canonical and maps the two legacy paths to their current destinations. The build command can also be run locally:

```sh
npm ci
npm run lint
npm run build
npm run preview
```

## Contact forms

The enquiry forms submit directly from the browser to Web3Forms. Its access keys are public client-side keys, not server secrets. Web3Forms notes that some provider subdomains, including free hosting subdomains, may need domain approval; if form submission fails on the new Vercel domain, use the custom domain or ask Web3Forms to review the domain. See the [Web3Forms troubleshooting guidance](https://docs.web3forms.com/getting-started/troubleshooting).

## Repository contents

The repository includes the Vite/React source, public assets, SEO documentation, and npm lockfile. The generated `dist/` directory is ignored by Git and recreated by Vercel from source on each deployment. `.env.example` contains only blank examples; do not commit real `.env` files or credentials.

## Current platform references

- [Deploying Vite projects on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [Vercel Deploy Button URL parameters](https://vercel.com/docs/deploy-button/source)
- [Vercel Git deployments](https://vercel.com/docs/git)
