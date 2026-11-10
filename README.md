# Zohar Katzeff – photography portfolio

Static site (no build server). Hebrew + English.

## Pages
- `/` home: Zohar's self-portrait, the name, the list of categories. Nothing written on the photo.
- `/events/`, `/portraits/`, `/commercial/`, `/real-estate/`, `/vehicles/`, `/artistic/`: one page per category, picked from the "עבודות" drop-down.
- `/about/`: about text, how it works, contact + booking form (sends a WhatsApp message).

## Links for clients
The home page can open with a different photo, so a client sees their kind of work first:
- `zoharkatzeff.github.io/?for=events`
- `zoharkatzeff.github.io/?for=portraits`
- `zoharkatzeff.github.io/?for=commercial`
- `zoharkatzeff.github.io/?for=real-estate`
- `zoharkatzeff.github.io/?for=vehicles`
- `zoharkatzeff.github.io/?for=artistic`

Or send the category page straight away, e.g. `zoharkatzeff.github.io/portraits/`.

## Change things
- **Home photo, category names/texts, client-link photos**: top of `app.js` (`HOME_PHOTO`, `CATEGORIES`).
- **About text and form**: `about/index.html` (Hebrew is the element text, English is in `data-en="..."`).
- **Which photos are in each category**: `tools/build_data.py`, then `python tools/build_data.py`.
- **New photos**: put edited JPGs in `../zohar-portfolio/media/full/`, run `python tools/build_media.py photos`, then `python tools/build_data.py`.
- **After changing style.css or app.js**: raise `VERSION` in `tools/build_pages.py` and run `python tools/build_pages.py` so browsers load the new files.

Video is off the site for now. The clips are still in `media/video/` on this computer (not published; see `.gitignore`).

## Preview locally
`python -m http.server 8778` in this folder, then open http://localhost:8778 (add `?lang=en` for English).

## Publish
https://zoharkatzeff.github.io (GitHub Pages, repo ZoharKatzeff/zoharkatzeff.github.io).
`git add -A && git commit -m "update" && git push` — live in about a minute.
