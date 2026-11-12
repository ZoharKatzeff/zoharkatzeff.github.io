// ================= Content you can edit =================
const PHONE_INTL = "972526545250";

// The one photo on the home page.
const HOME_PHOTO = "self-portrait-001";

// Each category is its own page at /<slug>/ (pages are made by tools/build_pages.py).
// "lead" = the photo the home page opens with in a link made for that kind of client,
// e.g. zoharkatzeff.github.io/?for=events
// "book: false" = not offered in the booking form.
const CATEGORIES = [
  {
    key: "events", slug: "events", lead: "beit-asaf-032",
    he: "אירועים וקבוצות", en: "Events & Groups",
    heText: "צילום אירועים, קבוצות וימי חברה.",
    enText: "Photography for events, groups and company days.",
  },
  {
    key: "portraits", slug: "portraits", lead: "portraits-003",
    he: "פורטרייטים", en: "Portraits",
    heText: "צילום פורטרייטים, זוגות ואירוסין.",
    enText: "Photography for portraits, couples and engagements.",
  },
  {
    key: "commercial", slug: "commercial", lead: "malka-002",
    he: "צילום מסחרי", en: "Commercial",
    heText: "צילום לעסקים, מותגים ורשתות חברתיות.",
    enText: "Photography for businesses, brands and social media.",
  },
  {
    key: "property", slug: "real-estate", lead: "architecture-001",
    he: "נדל״ן ואדריכלות", en: "Real Estate & Architecture",
    heText: "צילום נכסים, חללים ואדריכלות.",
    enText: "Photography for properties, interiors and architecture.",
  },
  {
    key: "vehicles", slug: "vehicles", lead: "transport-013",
    he: "כלי תחבורה", en: "Vehicles",
    heText: "צילום מכוניות, רכבות, סירות ומטוסים.",
    enText: "Photography of cars, trains, boats and planes.",
  },
  {
    key: "artistic", slug: "artistic", lead: "bw-portraits-005", book: false,
    he: "אמנותי", en: "Artistic",
    heText: "צילום רחוב, שחור-לבן ופרויקטים אישיים.",
    enText: "Photography of streets, black and white, and personal projects.",
  },
];
// ========================================================

const P = window.PHOTOS;
const $ = (s, el = document) => el.querySelector(s);
const BASE = document.body.dataset.base || "";
const PAGE = document.body.dataset.page || "home";
const thumb = (id) => `${BASE}media/thumb/${id}.jpg`;
const full = (id) => `${BASE}media/full/${id}.jpg`;
const href = (path) => BASE + path || "./";
let lang = "he";
const t = (o, k = "") => o[lang + k];
const tt = (he, en) => (lang === "en" ? en : he);
const NAME = () => tt("זוהר קאצף", "Zohar Katzeff");
const cat = CATEGORIES.find((c) => c.slug === PAGE);

// ---------- Language ----------
function initLang() {
  let saved = new URLSearchParams(location.search).get("lang");
  if (saved) { try { localStorage.setItem("lang", saved); } catch (e) {} }
  else { try { saved = localStorage.getItem("lang"); } catch (e) {} }
  document.querySelectorAll("[data-en]").forEach((el) => (el.dataset.he = el.innerHTML));
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => (el.dataset.hePlaceholder = el.placeholder));
  setLang(saved === "en" ? "en" : "he", false);
}
function setLang(l, remember) {
  lang = l;
  const html = document.documentElement;
  html.lang = l; html.dir = l === "en" ? "ltr" : "rtl";
  document.querySelectorAll("[data-en]").forEach((el) => (el.innerHTML = l === "en" ? el.dataset.en : el.dataset.he));
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => (el.placeholder = l === "en" ? el.dataset.enPlaceholder : el.dataset.hePlaceholder));
  document.title = cat ? `${t(cat)} · ${NAME()}`
    : PAGE === "about" ? `${tt("אודות וצור קשר", "About & contact")} · ${NAME()}`
    : `${NAME()} · ${tt("צלם", "Photographer")}`;
  if (remember) { try { localStorage.setItem("lang", l); } catch (e) {} }
  renderAll();
}

// ---------- Header with the drop-down menu ----------
function renderHeader() {
  const h = $("#nav");
  const items = CATEGORIES.map((c) =>
    `<a href="${href(c.slug + "/")}" ${c === cat ? 'aria-current="page"' : ""}>${t(c)}</a>`).join("");
  h.innerHTML = `
    <a class="brand" href="${href("")}" aria-label="${NAME()}">
      <span class="brand-mark">Z</span><span class="brand-name">Zohar Katzeff</span>
    </a>
    <div class="nav-end">
      <div class="menu" id="menu">
        <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="menuList">
          <span class="menu-label">${tt("עבודות", "Work")}</span>
          <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          <svg class="menu-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="menu-list" id="menuList" hidden>
          <a class="menu-home" href="${href("")}" ${PAGE === "home" ? 'aria-current="page"' : ""}>${tt("דף הבית", "Home")}</a>
          ${items}
          <a class="menu-about" href="${href("about/")}" ${PAGE === "about" ? 'aria-current="page"' : ""}>${tt("אודות", "About")}</a>
        </div>
      </div>
      <a class="nav-link" href="${href("")}" ${PAGE === "home" ? 'aria-current="page"' : ""}>${tt("דף הבית", "Home")}</a>
      <a class="nav-link" href="${href("about/")}" ${PAGE === "about" ? 'aria-current="page"' : ""}>${tt("אודות", "About")}</a>
      <button class="lang" id="langBtn" type="button" aria-label="${tt("Switch to English", "עברית")}">${tt("EN", "עב")}</button>
      <a href="${href("about/")}#contact" class="btn btn-sm">${tt("ליצירת קשר והזמנה", "Contact &amp; Booking")}</a>
    </div>`;
  $("#langBtn").onclick = () => setLang(lang === "en" ? "he" : "en", true);
  const btn = $("#menuBtn"), list = $("#menuList");
  const setOpen = (o) => { list.hidden = !o; btn.setAttribute("aria-expanded", o); };
  btn.onclick = (e) => { e.stopPropagation(); setOpen(list.hidden); };
  document.onclick = (e) => { if (!$("#menu").contains(e.target)) setOpen(false); };
  document.onkeydown = (e) => { if (e.key === "Escape" && !list.hidden) { setOpen(false); btn.focus(); } };
}
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

function renderFooter() {
  $("#footer").innerHTML = `<span>© ${new Date().getFullYear()} Zohar Katzeff</span>
    <a href="https://instagram.com/zohar_katzeff" target="_blank" rel="noopener" dir="ltr">@zohar_katzeff</a>`;
}

// ---------- Home: one photo, the name, the menu ----------
function renderHome() {
  const forSlug = new URLSearchParams(location.search).get("for");
  const lead = CATEGORIES.find((c) => c.slug === forSlug)?.lead || HOME_PHOTO;
  const [w, h] = P.sizes[lead];
  const alt = lead === HOME_PHOTO ? NAME() : tt("צילום של זוהר קאצף", "Photo by Zohar Katzeff");
  $("#main").innerHTML = `
    <figure class="home-photo"><img src="${full(lead)}" width="${w}" height="${h}" alt="${alt}" fetchpriority="high"></figure>
    <div class="home-text">
      <header class="page-head">
        <h1>${NAME()}</h1>
        <p class="lede">${tt("צלם", "Photographer")}</p>
      </header>
      <nav class="home-cats" aria-label="${tt("קטגוריות", "Categories")}">
        ${CATEGORIES.map((c, i) => `<a href="${href(c.slug + "/")}"><span>0${i + 1}</span>${t(c)}</a>`).join("")}
      </nav>
    </div>`;
}

// ---------- Category page ----------
function renderCategory() {
  const i = CATEGORIES.indexOf(cat), next = CATEGORIES[(i + 1) % CATEGORIES.length];
  $("#main").innerHTML = `
    <header class="page-head">
      <h1>${t(cat)}</h1>
      <p class="lede">${t(cat, "Text")}</p>
    </header>
    <div class="grid" id="grid"></div>
    <div class="page-end">
      ${cat.book === false ? `<a class="btn" href="${href("about/")}#contact">${tt("ליצירת קשר והזמנה", "Contact &amp; Booking")}</a>` : `<a class="btn" href="${href("about/")}?service=${cat.key}#contact">${tt("ליצירת קשר והזמנה", "Contact &amp; Booking")}</a>`}
      <a class="btn btn-ghost" href="${href("")}"><span aria-hidden="true">${tt("→", "←")}</span> ${tt("חזרה לדף הבית", "Back to home")}</a>
      <a class="next" href="${href(next.slug + "/")}">${tt("הבא", "Next")}: ${t(next)} <span aria-hidden="true">${tt("←", "→")}</span></a>
    </div>`;
  masonry($("#grid"), P.services[cat.key]);
}

// ---------- Masonry grid ----------
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
}, { rootMargin: "0px 0px -30px 0px" });

const colCount = () => (innerWidth <= 1000 ? 2 : 3);
let gridIds = null;
function masonry(grid, ids) {
  gridIds = ids;
  const cols = colCount();
  grid.dataset.cols = cols;
  grid.innerHTML = "";
  const colEls = [], heights = [];
  for (let c = 0; c < cols; c++) {
    const col = document.createElement("div");
    col.className = "col"; grid.appendChild(col); colEls.push(col); heights.push(0);
  }
  ids.forEach((id, i) => {
    const [w, h] = P.sizes[id];
    const tile = document.createElement("div");
    tile.className = "tile"; tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", `${t(cat)} ${i + 1}`);
    const img = document.createElement("img");
    img.loading = "lazy"; img.decoding = "async"; img.width = w; img.height = h; img.alt = t(cat);
    img.onload = () => img.classList.add("loaded");
    img.src = thumb(id);
    tile.appendChild(img);
    tile.onclick = () => openLb(ids, i);
    tile.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(ids, i); } };
    const c = heights.indexOf(Math.min(...heights));
    colEls[c].appendChild(tile);
    heights[c] += h / w;
    revealer.observe(tile);
  });
}
addEventListener("resize", () => {
  const g = $("#grid");
  if (g && gridIds && +g.dataset.cols !== colCount()) masonry(g, gridIds);
});

// ---------- Lightbox ----------
const lb = $("#lightbox"), lbImg = $("#lbImg");
let lbList = [], lbIdx = 0;
function setLb(i) {
  lbIdx = (i + lbList.length) % lbList.length;
  const id = lbList[lbIdx];
  lbImg.classList.add("fading");
  const pre = new Image();
  pre.onload = () => { lbImg.src = pre.src; lbImg.classList.remove("fading"); };
  pre.src = full(id);
  lbImg.alt = t(cat);
  $("#lbCount").textContent = `${lbIdx + 1} / ${lbList.length}`;
  [1, -1].forEach((d) => (new Image().src = full(lbList[(lbIdx + d + lbList.length) % lbList.length])));
}
function openLb(list, i) {
  lbList = list; setLb(i);
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked"); $("#lbClose").focus({ preventScroll: true });
}
function closeLb() {
  lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}
if (lb) {
  $("#lbNext").onclick = () => setLb(lbIdx + 1);
  $("#lbPrev").onclick = () => setLb(lbIdx - 1);
  $("#lbClose").onclick = closeLb;
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.tagName === "FIGURE") closeLb(); });
  let sx = null;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) setLb(lbIdx + ((dx > 0) === (lang !== "en") ? 1 : -1));
    sx = null;
  });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === (lang === "en" ? "ArrowRight" : "ArrowLeft")) setLb(lbIdx + 1);
    if (e.key === (lang === "en" ? "ArrowLeft" : "ArrowRight")) setLb(lbIdx - 1);
  });
}

// ---------- About page: booking form -> WhatsApp ----------
const form = $("#bookForm"), sel = $("#serviceSelect");
function renderSelect() {
  const v = sel.value || new URLSearchParams(location.search).get("service");
  sel.innerHTML = CATEGORIES.filter((c) => c.book !== false).map((c) => `<option value="${c.key}">${t(c)}</option>`).join("") +
    `<option value="other">${tt("משהו אחר", "Something else")}</option>`;
  if (v && sel.querySelector(`option[value="${v}"]`)) sel.value = v;
}
if (form) {
  $("#waJump").addEventListener("click", (e) => {
    e.preventDefault();
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => form.name.focus({ preventScroll: true }), 450);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, name = f.name.value.trim();
    $("#formErr").hidden = !!name;
    if (!name) { f.name.focus(); return; }
    const svc = sel.options[sel.selectedIndex].text;
    // Day-first date ("יום רביעי, 13/01/2027"), not the input's raw 2027-01-13 which reads backwards in Hebrew.
    let date = "";
    if (f.date.value) {
      const [y, m, d] = f.date.value.split("-").map(Number);
      const day = new Date(y, m - 1, d).toLocaleDateString(lang === "en" ? "en-GB" : "he-IL", { weekday: "long" });
      const num = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
      date = lang === "en" ? `${day} ${num}` : `${day}, ⁦${num}⁩`;
    }
    const lines = lang === "en"
      ? [`Hi Zohar, I'm ${name}.`, `I'm interested in: ${svc}.`, date && `Date: ${date}`, f.details.value.trim()]
      : [`היי זוהר, אני ${name}.`, `מתעניין/ת ב: ${svc}.`, date && `תאריך: ${date}`, f.details.value.trim()];
    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`, "_blank", "noopener");
  });
}

// ---------- Render ----------
function renderAll() {
  renderHeader(); renderFooter();
  if (PAGE === "home") renderHome();
  else if (cat) renderCategory();
  if (form) renderSelect();
}
initLang();
