# Ieva Rozentāle — website MVP

This is a GitHub + Netlify launch package based on the approved three-page design and revised copy. It needs no recordings, checkout account or workshop dates to publish.

## What is ready

- **Home:** both streams, biography, LinkedIn and current work. Both stream titles match About me at every breakpoint.
- **Research & Facilitation:** services, toolkit, selected work and a clear invitation to engage through Think Change Resolve (TCR).
- **Meditation:** approach, credentials, a workshop proposal for new mothers, and email links for venues and interested participants. No dates or take-home recordings are promised.
- **Mindful organisations:** explicitly in development; enquiries route toward TCR.
- Mobile navigation, keyboard focus, page descriptions, a 404 page and a basic link checker.

The existing email and LinkedIn URL are retained. The September business concept supplies the current credentials: certified meditation teacher, 12 years of practice. The Zen group is kept separate from the commercial offer.

## Files to work with

| File/folder | Purpose |
|---|---|
| `src/pages/` | Edit website copy here. The kit page is already prepared under `practices/`. |
| `src/styles.css` | Approved visual system and responsive styling. |
| `src/assets/` | Existing collages and portrait. |
| `site.config.json` | Switch future features on and provide their links. |
| `dist/` | Built launch website. Netlify publishes **only this folder**. |
| `archive/approved-full-site/` | Exact reference snapshot from before the MVP changes. Do not publish this folder. |
| `LAUNCH-AND-KIT-GUIDE.md` | Launch checklist, restoration instructions and sales setup. |
| `netlify.toml` | Netlify build and publish settings. |

Edit `src/`, then rebuild. Direct edits to `dist/` are overwritten by the next build.

## Preview locally

Install Node.js 22 or later, then run from this folder:

```sh
npm run build
npm run check
npm run preview
```

Open http://localhost:4173. Stop with Ctrl+C. There are no npm dependencies to install. The ready-built `dist` folder is also included.

## Use the existing GitHub repository and Netlify site

1. Create an update branch from the current production branch. Keep the old version in Git history (optionally tag it `before-mvp`).
2. Add the contents of this package to the repository. Integrate with any existing files; do not discard the repository or its history. This package intentionally has no `.git` folder or Sites hosting configuration.
3. Ensure the site base directory is the package root (blank if it is the repository root). `netlify.toml` sets build command `npm run build && npm run check` and publish directory `dist`.
4. Open a pull request into the production branch. Enable Deploy Previews in the existing Netlify site if necessary. Check the preview on your phone and computer.
5. Merge when ready. The existing Netlify site should publish the update at its existing domain; no domain or DNS move is needed.

**Preview URLs are not automatically private.** This package adds `noindex` to preview deployments, but access protection requires Netlify access settings. Never place sensitive material in a public repository. The archive and templates are excluded from the deployed website, not from the repository.

For replacement of the old website, first inventory its public URLs and add redirects for renamed pages. The current old-site domain and repository were not provided, so no speculative redirects were added.

## Restoring features

Edit one settings file, preview and publish. For example, to enable the recordings:

```json
"features": { "insightTimer": true }
"links": { "insightTimerUrl": "YOUR_ACTUAL_HTTPS_PROFILE_URL" }
```

These are excerpts: change the matching entries in the existing JSON; keep all other fields and valid commas. Never paste placeholder URLs into a live configuration.

The build requires a real HTTPS URL for each enabled feature. Workshop bookings also require a date and venue. It removes disabled material entirely from `dist`, rather than hiding it with CSS. Turning a feature off and rebuilding removes its generated content again.

See the guide for the complete activation map. There is no need to redesign or re-comment on every button.
