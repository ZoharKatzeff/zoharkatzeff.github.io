# Zohar Katzeff – portfolio site

Static site (no build step). Open with any static host: Netlify, GitHub Pages, Cloudflare Pages.

## Change things
- **Text, services, projects, reels, hero slideshow**: top of `app.js` (Hebrew + English side by side).
- **Static page text**: `index.html` – Hebrew is the element text, English is in `data-en="..."`.
- **Which photos go where**: `tools/build_data.py`, then run `python tools/build_data.py`.
- **New photos**: put edited JPGs in `../zohar-portfolio/media/full/`, run `python tools/build_media.py photos`, then `python tools/build_data.py`.
- **Videos**: edit the `REELS` list in `tools/build_media.py`, run `python tools/build_media.py videos`.
  Desert trek, school trip and rock'n'roll are auto-cut highlights (7 x 4.5s). Swap in proper 30s trailers when you have them.

## Preview locally
`python -m http.server 8778` in this folder, then open http://localhost:8778 (add `?lang=en` for English).

## Live site
https://zoharkatzeff.github.io (GitHub Pages, repo ZoharKatzeff/zoharkatzeff.github.io).
To publish changes: `git add -A && git commit -m "update" && git push` — live in ~1 minute.
