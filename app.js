// ================= Content you can edit =================
const PHONE_INTL = "972526545250";

// Social profiles, shown in the "Follow" section (footer of every page + about page).
// To add Facebook later, copy the Instagram line and change it.
const SOCIAL = [
  { he: "אינסטגרם", en: "Instagram", handle: "@katzeff_photos", url: "https://www.instagram.com/katzeff_photos/",
    icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" class="fill"/>' },
];

// The one photo on the home page.
const HOME_PHOTO = "self-portrait-001";

// Each category is its own page at /<slug>/ (pages are made by tools/build_pages.py).
// "lead" = the photo the home page opens with in a link made for that kind of client,
// e.g. zoharkatzeff.com/?for=events
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

const socialLinks = () => SOCIAL.map((s) =>
  `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${t(s)} ${s.handle}"><svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg><span>${t(s)}</span></a>`).join("");

function renderFooter() {
  $("#footer").innerHTML = `<span>© ${new Date().getFullYear()} Zohar Katzeff</span>
    <div class="social"><span class="social-label">${tt("עקבו אחריי", "Follow me")}</span>${socialLinks()}</div>`;
  const block = $("#follow");
  if (block) block.innerHTML = `<p class="contact-label">${tt("עקבו אחריי:", "Follow me:")}</p><div class="social social-big">${socialLinks()}</div>`;
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

// ---------- Photo rows ----------
// Each row is filled edge to edge with whole photos at their own shape (nothing cropped),
// in list order, so the number in the viewer matches the order on the page.
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
}, { rootMargin: "0px 0px -30px 0px" });

// lay out again when the grid's width changes (window resize, scrollbar showing up)
let resizeT;
const gridSizer = new ResizeObserver(() => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    const g = $("#grid");
    if (g && gridIds && Math.abs(g.clientWidth - gridW) > 1) masonry(g, gridIds);
  }, 120);
});

const rowTarget = (w) => (w < 600 ? 240 : w < 1000 ? 300 : 380);
let gridIds = null, gridW = 0;
function masonry(grid, ids) {
  gridIds = ids;
  gridSizer.disconnect(); gridSizer.observe(grid);
  const W = grid.clientWidth; gridW = W;
  const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
  const H = rowTarget(W);
  const ratio = (id) => P.sizes[id][0] / P.sizes[id][1];
  const fitH = (row) => (W - gap * (row.length - 1)) / row.reduce((a, id) => a + ratio(id), 0);
  // split into rows so every row fills the width and all rows stay close to the target height
  // (tries every way of splitting and keeps the one with the most even rows)
  const best = [0], cut = [0];
  for (let j = 1; j <= ids.length; j++) {
    best[j] = Infinity;
    for (let i = Math.max(0, j - 7); i < j; i++) {
      const h = fitH(ids.slice(i, j));
      const off = Math.log(h / H);
      const cost = best[i] + off * off * 10 + (h > H * 1.6 || h < H * 0.55 ? 50 : 0);
      if (cost < best[j]) { best[j] = cost; cut[j] = i; }
    }
  }
  const rows = [];
  for (let j = ids.length; j > 0; j = cut[j]) rows.unshift(ids.slice(cut[j], j));
  grid.innerHTML = "";
  let n = 0;
  rows.forEach((r) => {
    const h = fitH(r);
    const rowEl = document.createElement("div");
    rowEl.className = "row"; rowEl.style.height = `${h}px`;
    r.forEach((id) => {
      const i = n++;
      const [w, hh] = P.sizes[id];
      const tw = Math.round(ratio(id) * h);
      const tile = document.createElement("div");
      tile.className = "tile"; tile.tabIndex = 0;
      tile.style.flex = `${ratio(id) * 100} 1 0`; // x100: grow values under 1 would not fill the row
      tile.setAttribute("role", "button");
      tile.setAttribute("aria-label", `${t(cat)} ${i + 1}`);
      const img = document.createElement("img");
      img.loading = "lazy"; img.decoding = "async"; img.width = w; img.height = hh; img.alt = t(cat);
      img.onload = () => img.classList.add("loaded");
      img.srcset = `${thumb(id)} 720w, ${full(id)} 1800w`;
      img.sizes = `${tw}px`;
      img.src = thumb(id);
      tile.appendChild(img);
      tile.onclick = () => openLb(ids, i);
      tile.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(ids, i); } };
      rowEl.appendChild(tile);
      revealer.observe(tile);
    });
    grid.appendChild(rowEl);
  });
}
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
