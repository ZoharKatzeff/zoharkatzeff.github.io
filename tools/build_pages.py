"""Writes index.html and one page per category (events/, portraits/, ...).

The pages are empty shells: app.js fills them from the CATEGORIES list.
about/index.html is written by hand (it holds the about text and the form).
Bump VERSION when you change style.css or app.js so browsers load the new files.
Run: python tools/build_pages.py
"""
import os

VERSION = 25
SITE = "https://zoharkatzeff.com/"
AREA = "משמר דוד, מחסיה, תל אביב וכל הארץ"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug, Hebrew title, English title, Hebrew description for Google  (keep in sync with CATEGORIES in app.js)
CATEGORIES = [
    ("events", "אירועים וקבוצות", "Events & Groups", "צילום אירועים, קבוצות וימי חברה"),
    ("portraits", "פורטרייטים", "Portraits", "צילום פורטרייטים, זוגות ואירוסין"),
    ("commercial", "צילום מסחרי", "Commercial", "צילום לעסקים, מותגים ורשתות חברתיות"),
    ("real-estate", "נדל״ן ואדריכלות", "Real Estate & Architecture", "צילום נכסים, חללים ואדריכלות"),
    ("vehicles", "כלי תחבורה", "Vehicles", "צילום מכוניות, רכבות, סירות ומטוסים"),
    ("artistic", "אמנותי", "Artistic", "צילום רחוב, שחור-לבן ופרויקטים אישיים"),
]

HEAD = """<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
{seo}<meta property="og:title" content="{og_title}">
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


def seo(path, extra=""):
    """Address, language versions and (home only) business details, for Google."""
    url = SITE + path
    return f"""<!-- seo -->
<link rel="canonical" href="{url}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="he_IL">
<link rel="alternate" hreflang="he" href="{url}">
<link rel="alternate" hreflang="en" href="{url}?lang=en">
<link rel="alternate" hreflang="x-default" href="{url}">
{extra}<!-- /seo -->
"""


BUSINESS = """<script type="application/ld+json">
{"@context": "https://schema.org", "@type": "ProfessionalService",
 "name": "Zohar Katzeff Photography · זוהר קאצף צלם",
 "alternateName": ["זוהר קאצף", "Zohar Katzeff"],
 "description": "צלם אירועים, אירוסין, פורטרייטים, עסקים ונדל״ן. Photographer for events, engagements, portraits, businesses and real estate.",
 "url": "https://zoharkatzeff.com/",
 "image": "https://zoharkatzeff.com/media/full/self-portrait-001.jpg",
 "telephone": "+972526545250",
 "areaServed": [{"@type": "Country", "name": "Israel"}, "משמר דוד", "מחסיה", "תל אביב"],
 "address": {"@type": "PostalAddress", "addressLocality": "Mishmar David", "addressCountry": "IL"},
 "founder": {"@type": "Person", "name": "Zohar Katzeff", "alternateName": "זוהר קאצף", "jobTitle": "Photographer"},
 "sameAs": ["https://www.instagram.com/katzeff_photos/"],
 "knowsAbout": ["Event photography", "Portrait photography", "Engagement photography", "Commercial photography", "Real estate photography", "Architecture photography"]}
</script>
"""


def page(page_id, base, main_class, title, desc, og_title, extra="", extra_fonts="", seo_html=""):
    return HEAD.format(title=title, desc=desc, og_title=og_title, base=base, v=VERSION, extra_fonts=extra_fonts, seo=seo_html) + f"""<body data-page="{page_id}" data-base="{base}">
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
    "home", "", "page home", "זוהר קאצף · צלם אירועים, פורטרייטים, עסקים ונדל״ן",
    f"זוהר קאצף, צלם אירועים, אירוסין, פורטרייטים, עסקים ונדל״ן. {AREA}. Zohar Katzeff, photographer in Israel.",
    "Zohar Katzeff · זוהר קאצף", extra_fonts="&family=Caveat:wght@500;700",  # Caveat: the name on the home page
    seo_html=seo("", BUSINESS)))

for slug, he, en, text in CATEGORIES:
    write(f"{slug}/index.html", page(
        slug, "../", "page", f"{he} · זוהר קאצף צלם", f"{text}. זוהר קאצף, צלם · {AREA}. {en} photography by Zohar Katzeff.",
        f"{en} · Zohar Katzeff", LIGHTBOX, seo_html=seo(slug + "/")))

# robots.txt + sitemap.xml: tell Google which pages exist
import datetime
today = datetime.date.today().isoformat()
paths = [""] + [c[0] + "/" for c in CATEGORIES] + ["about/"]
write("robots.txt", f"""User-agent: *
Allow: /

Sitemap: {SITE}sitemap.xml
""")
urls = "".join(
    f'  <url><loc>{SITE}{p}</loc><lastmod>{today}</lastmod>'
    f'<xhtml:link rel="alternate" hreflang="he" href="{SITE}{p}"/>'
    f'<xhtml:link rel="alternate" hreflang="en" href="{SITE}{p}?lang=en"/></url>\n' for p in paths)
write("sitemap.xml", f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
{urls}</urlset>
""")

# keep the version in about/index.html in step
about = os.path.join(ROOT, "about", "index.html")
if os.path.exists(about):
    import re
    s = open(about, encoding="utf-8").read()
    s = re.sub(r"\?v=\d+", f"?v={VERSION}", s)
    s = re.sub(r"<!-- seo -->.*?<!-- /seo -->\n", "", s, flags=re.S)
    s = s.replace('<meta property="og:title"', seo("about/") + '<meta property="og:title"', 1)
    open(about, "w", encoding="utf-8", newline="\n").write(s)
    print("updated version in about/index.html")
