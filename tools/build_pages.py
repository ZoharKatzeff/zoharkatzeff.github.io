"""Writes index.html and one page per category (events/, portraits/, ...).

The pages are empty shells: app.js fills them from the CATEGORIES list.
about/index.html is written by hand (it holds the about text and the form).
Bump VERSION when you change style.css or app.js so browsers load the new files.
Run: python tools/build_pages.py
"""
import os

VERSION = 22
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug, Hebrew title, English title  (keep in sync with CATEGORIES in app.js)
CATEGORIES = [
    ("events", "אירועים וקבוצות", "Events & Groups"),
    ("portraits", "פורטרייטים", "Portraits"),
    ("commercial", "צילום מסחרי", "Commercial"),
    ("real-estate", "נדל״ן ואדריכלות", "Real Estate & Architecture"),
    ("vehicles", "כלי תחבורה", "Vehicles"),
    ("artistic", "אמנותי", "Artistic"),
]

HEAD = """<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="צלם · Photographer">
<meta property="og:image" content="https://zoharkatzeff.com/media/full/self-portrait-001.jpg">
<meta name="theme-color" content="#f5f0e8">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23121110'/%3E%3Ctext x='32' y='45' font-family='Georgia,serif' font-size='38' fill='%23e3a75f' text-anchor='middle'%3EZ%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&family=Heebo:wght@300;400;500;600&family=Instrument+Serif:ital@0;1{extra_fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{base}style.css?v={v}">
</head>
"""

LIGHTBOX = """<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
  <button class="icon-btn lb-close" id="lbClose" aria-label="Close">✕</button>
  <button class="icon-btn lb-arrow lb-prev" id="lbPrev" aria-label="Previous">‹</button>
  <figure class="lb-figure"><img id="lbImg" alt=""><figcaption id="lbCount" dir="ltr"></figcaption></figure>
  <button class="icon-btn lb-arrow lb-next" id="lbNext" aria-label="Next">›</button>
</div>
"""


def page(page_id, base, main_class, title, desc, og_title, extra="", extra_fonts=""):
    return HEAD.format(title=title, desc=desc, og_title=og_title, base=base, v=VERSION, extra_fonts=extra_fonts) + f"""<body data-page="{page_id}" data-base="{base}">
<header class="nav" id="nav"></header>
<main class="{main_class}" id="main"></main>
<footer class="footer" id="footer"></footer>
{extra}<script src="{base}data/photos.js?v={VERSION}"></script>
<script src="{base}app.js?v={VERSION}"></script>
</body>
</html>
"""


def write(rel, html):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("wrote", rel)


write("index.html", page(
    "home", "", "page home", "זוהר קאצף · צלם",
    "זוהר קאצף, צלם. אירועים וקבוצות, פורטרייטים, צילום מסחרי, נדל״ן ואדריכלות, כלי תחבורה ואמנותי. Zohar Katzeff, photographer.",
    "Zohar Katzeff · זוהר קאצף", extra_fonts="&family=Caveat:wght@500;700"))  # Caveat: the name on the home page

for slug, he, en in CATEGORIES:
    write(f"{slug}/index.html", page(
        slug, "../", "page", f"{he} · זוהר קאצף", f"{he} · {en}. זוהר קאצף, צלם.",
        f"{en} · Zohar Katzeff", LIGHTBOX))

# keep the version in about/index.html in step
about = os.path.join(ROOT, "about", "index.html")
if os.path.exists(about):
    import re
    s = open(about, encoding="utf-8").read()
    s = re.sub(r"\?v=\d+", f"?v={VERSION}", s)
    open(about, "w", encoding="utf-8", newline="\n").write(s)
    print("updated version in about/index.html")
