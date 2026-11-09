// ================= Content you can edit =================
const PHONE_INTL = "972526545250";

const HERO = [
  { id: "beit-asaf-032", he: "מכינת בית אסף", en: "Beit Asaf Academy" },
  { id: "malka-013", he: "מלכה, עגלת קפה", en: "Malka coffee cart" },
  { id: "bw-portraits-005", he: "פורטרייט", en: "Portrait" },
  { id: "drone-003", he: "צילומי זוגיות, ים המלח", en: "Save the date, Dead Sea" },
  { id: "beit-asaf-009", he: "מסע מדבר", en: "Desert trek" },
  { id: "architecture-001", he: "עזריאלי, תל אביב", en: "Azrieli, Tel Aviv" },
];

const SERVICES = [
  {
    key: "events", cover: "beit-asaf-010",
    he: "אירועים וארגונים", en: "Events & organizations",
    heText: "מכינות, תנועות נוער, טיולים שנתיים, ימי חברה וספורט מוטורי. מתעד את האנרגיה, לא רק את מי שהגיע.",
    enText: "Pre-army academies, youth groups, school trips, company days and motorsport. I capture the energy, not just who showed up.",
  },
  {
    key: "portraits", cover: "portraits-003",
    he: "פורטרייטים וזוגות", en: "Portraits & couples",
    heText: "פורטרייט אישי וצילומי זוגיות לפני החתונה, כולל רחפן. תמונות שנראות כמוך ביום הכי טוב שלך.",
    enText: "Personal portraits, couple shoots and save-the-dates, drone included. Photos that look like you on your best day.",
  },
  {
    key: "business", cover: "malka-002",
    he: "תוכן לעסקים", en: "Business & social content",
    heText: "צילומי אוכל, מקום ואנשים, ורילסים ערוכים לאינסטגרם וטיקטוק. צילום ועריכה אצל אותו אדם.",
    enText: "Food, venue and people shots, plus edited reels for Instagram and TikTok. Shooting and editing from one person.",
  },
  {
    key: "property", cover: "architecture-006",
    he: "נדל״ן ואדריכלות", en: "Real estate & architecture",
    heText: "מבנים, חללים וצילומי רחפן למתווכים, צימרים, דירות להשכרה ואדריכלים.",
    enText: "Buildings, spaces and drone shots for realtors, holiday rentals and architects.",
  },
];

const PROJECTS = [
  {
    key: "beit-asaf", service: "events", cover: "beit-asaf-009", reel: "desert-trek",
    he: "מכינת בית אסף", en: "Beit Asaf Pre-Army Academy",
    heSub: "מסע מדבר, אימוני חוף ושקיעות. תמונות וסרט אירוע.",
    enSub: "Desert trek, beach training and sunsets. Photos and an event film.",
    photos: () => P.services.events.filter((id) => id.startsWith("beit-asaf")),
  },
  {
    key: "malka", service: "business", cover: "malka-021",
    he: "מלכה, עגלת קפה", en: "Malka coffee cart",
    heSub: "אוכל, מקום ואנשים לרשתות החברתיות של העסק.",
    enSub: "Food, place and people for the business's social media.",
    photos: () => P.services.business,
  },
  {
    key: "flash", service: "portraits", cover: "flash-001",
    he: "צילום פלאש לילי", en: "Night flash shoot",
    heSub: "צילומי אופנה ופורטרייט בפלאש ישיר, ברחוב בלילה.",
    enSub: "Fashion and portraits with direct flash, on the street at night.",
    photos: () => ["flash-001", "flash-002", "flash-003", "flash-004"],
  },
  {
    key: "save-the-date", service: "portraits", cover: "drone-003", reel: "save-the-date",
    he: "צילומי זוגיות, ים המלח", en: "Save the date, Dead Sea",
    heSub: "צילום זוגי מהקרקע ומהאוויר על איי המלח.",
    enSub: "A couple shoot from the ground and the air on the salt islands.",
    photos: () => ["drone-003", "drone-002", "street-024", "drone-004", "street-025"],
  },
  {
    key: "drift", service: "events", cover: "transport-013",
    he: "יום דריפט", en: "Drift day",
    heSub: "סיקור אירוע ספורט מוטורי: מכוניות, פיטים ואבק.",
    enSub: "Motorsport event coverage: cars, pits and smoke.",
    photos: () => ["transport-013", "transport-014", "transport-003", "transport-006", "transport-009", "transport-012"],
  },
];

// Videos in media/video/<id>.mp4 (+ -loop.mp4 and .jpg). "highlights" = a short cut from a longer film.
const REELS = [
  { id: "save-the-date", layout: "", he: "סרטון זוגי בים המלח", en: "Dead Sea save-the-date", heType: "רחפן · זוגות", enType: "Drone · Couples" },
  { id: "coach-reel", layout: "tall", he: "רילס למאמן כושר", en: "Fitness coach reel", heType: "עריכה · גרפיקה", enType: "Edit · Motion graphics" },
  { id: "crypto-reel", layout: "tall", he: "רילס תוכן, פיננסים", en: "Finance creator reel", heType: "עריכה · גרפיקה", enType: "Edit · Motion graphics" },
  { id: "desert-trek", layout: "", he: "מסע המדבר, בית אסף", en: "Desert trek, Beit Asaf", heType: "סרט אירוע · קטעים", enType: "Event film · Highlights" },
  { id: "gym-promo", layout: "", he: "פרומו לחדר כושר", en: "No Days Off, gym promo", heType: "פרומו לעסק", enType: "Brand promo" },
  { id: "rock-n-roll", layout: "", he: "״תנו לי רוקנרול״, תיכון צרעה", en: "“Give me rock'n'roll”, Tzora High", heType: "קליפ · קטעים", enType: "Music video · Highlights" },
];
const REEL_LEN = { "save-the-date": 45, "coach-reel": 43, "crypto-reel": 22, "desert-trek": 32, "gym-promo": 29, "rock-n-roll": 32 };

const FILTERS = [
  { key: "selected", he: "נבחרות", en: "Selected" },
  { key: "events", he: "אירועים", en: "Events" },
  { key: "portraits", he: "פורטרייטים", en: "Portraits" },
  { key: "business", he: "עסקים", en: "Business" },
  { key: "property", he: "נדל״ן ואדריכלות", en: "Real estate" },
  { key: "personal", he: "רחוב ואישי", en: "Street & personal" },
];
const SERVICE_LABEL = Object.fromEntries(FILTERS.map((f) => [f.key, f]));
// ========================================================

const P = window.PHOTOS;
const $ = (s, el = document) => el.querySelector(s);
const thumb = (id) => `media/thumb/${id}.jpg`;
const full = (id) => `media/full/${id}.jpg`;
let lang = "he";
const t = (o, k = "") => o[lang + k] ?? o[(lang === "he" ? "he" : "en") + k];
const tt = (he, en) => (lang === "en" ? en : he);

// ---------- Language ----------
function initLang() {
  let saved = new URLSearchParams(location.search).get("lang");
  if (!saved) { try { saved = localStorage.getItem("lang"); } catch (e) {} }
  document.querySelectorAll("[data-en]").forEach((el) => (el.dataset.he = el.innerHTML));
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => (el.dataset.hePlaceholder = el.placeholder));
  setLang(saved === "en" ? "en" : "he", false);
  $("#langBtn").onclick = () => setLang(lang === "en" ? "he" : "en", true);
}
function setLang(l, remember) {
  lang = l;
  const html = document.documentElement;
  html.lang = l; html.dir = l === "en" ? "ltr" : "rtl";
  document.querySelectorAll("[data-en]").forEach((el) => (el.innerHTML = l === "en" ? el.dataset.en : el.dataset.he));
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => (el.placeholder = l === "en" ? el.dataset.enPlaceholder : el.dataset.hePlaceholder));
  $("#langBtn").textContent = l === "en" ? "עב" : "EN";
  $("#langBtn").setAttribute("aria-label", l === "en" ? "עברית" : "Switch to English");
  document.title = l === "en" ? "Zohar Katzeff · Stills & Video" : "Zohar Katzeff · צילום סטילס ווידאו";
  if (remember) { try { localStorage.setItem("lang", l); } catch (e) {} }
  renderAll();
}

// ---------- Nav ----------
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
$("#year").textContent = new Date().getFullYear();

// ---------- Hero ----------
const slides = $("#heroSlides"), dots = $("#heroDots");
let heroIdx = 0, heroTimer;
HERO.forEach((h, i) => {
  const img = new Image();
  img.src = full(h.id); img.alt = "";
  if (i === 0) { img.className = "on"; img.fetchPriority = "high"; } else img.loading = "lazy";
  slides.appendChild(img);
  const b = document.createElement("button");
  b.setAttribute("aria-label", `${i + 1}`);
  if (i === 0) b.className = "on";
  b.onclick = () => showHero(i, true);
  dots.appendChild(b);
});
function showHero(i, manual) {
  slides.children[heroIdx].classList.remove("on");
  dots.children[heroIdx].classList.remove("on");
  heroIdx = (i + HERO.length) % HERO.length;
  slides.children[heroIdx].classList.add("on");
  dots.children[heroIdx].classList.add("on");
  $("#heroCaption").textContent = t(HERO[heroIdx]);
  if (manual) startHero();
}
function startHero() { clearInterval(heroTimer); heroTimer = setInterval(() => showHero(heroIdx + 1), 6000); }
startHero();

// ---------- Services ----------
function renderServices() {
  const g = $("#servicesGrid");
  g.innerHTML = "";
  SERVICES.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "service"; b.type = "button";
    b.innerHTML = `<img src="${thumb(s.cover)}" alt="" loading="lazy">
      <div class="service-body">
        <span class="service-num">0${i + 1}</span>
        <h3>${t(s)}</h3>
        <p>${t(s, "Text")}</p>
        <span class="more">${tt("לגלריה", "View")} · ${P.services[s.key].length} ${tt("תמונות", "photos")}</span>
      </div>`;
    b.onclick = () => { selectFilter(s.key); $("#gallery").scrollIntoView({ behavior: "smooth" }); };
    g.appendChild(b);
  });
}

// ---------- Projects ----------
function renderProjects() {
  const g = $("#projectsGrid");
  g.innerHTML = "";
  PROJECTS.forEach((p) => {
    const n = p.photos().length;
    const b = document.createElement("button");
    b.className = "project"; b.type = "button";
    b.innerHTML = `<div class="project-cover"><img src="${full(p.cover)}" alt="" loading="lazy">
        <span class="project-tag">${t(SERVICE_LABEL[p.service])}${p.reel ? " · " + tt("כולל וידאו", "with video") : ""}</span></div>
      <div class="project-info"><div><h3>${t(p)}</h3><p>${t(p, "Sub")}</p></div>
        <span class="project-count">${n} ${tt("תמונות", "photos")}</span></div>`;
    b.onclick = () => openProject(p);
    g.appendChild(b);
  });
}

const panel = $("#panel"), panelBody = $("#panelBody");
let openProjectKey = null;
function openProject(p) {
  openProjectKey = p.key;
  const ids = p.photos();
  panelBody.innerHTML = `<div class="panel-head"><p class="eyebrow">${t(SERVICE_LABEL[p.service])}</p><h2>${t(p)}</h2><p>${t(p, "Sub")}</p></div>
    ${p.reel ? `<div class="panel-video"><video controls playsinline preload="none" poster="media/video/${p.reel}.jpg" src="media/video/${p.reel}.mp4"></video></div>` : ""}
    <div class="grid" id="panelGrid"></div>
    <div class="panel-cta"><a class="btn" href="#contact" id="panelBook">${tt("רוצים משהו כזה? דברו איתי", "Want something like this? Get in touch")}</a></div>`;
  masonry($("#panelGrid"), ids);
  $("#panelBook").onclick = () => { closeAll(); prefillService(p.service); };
  if (!panel.classList.contains("open")) {
    openModal(panel);
    panel.querySelector(".panel-inner").scrollTop = 0;
  }
}

// ---------- Reels ----------
const loopObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else v.pause();
  });
}, { threshold: 0.35 });
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderReels() {
  const g = $("#reelsGrid");
  g.querySelectorAll("video").forEach((v) => loopObserver.unobserve(v));
  g.innerHTML = "";
  REELS.forEach((r) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "reel " + r.layout;
    b.setAttribute("aria-label", `${t(r)}, ${tt("ניגון", "play")}`);
    const len = REEL_LEN[r.id] ? `0:${String(REEL_LEN[r.id]).padStart(2, "0")}` : "";
    b.innerHTML = `<img src="media/video/${r.id}.jpg" alt="" loading="lazy">
      ${reduceMotion ? "" : `<video muted loop playsinline preload="none" data-src="media/video/${r.id}-loop.mp4" poster="media/video/${r.id}.jpg"></video>`}
      <span class="reel-len">${len}</span>
      <span class="reel-play"><svg viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z"/></svg></span>
      <div class="reel-body"><span class="reel-type">${t(r, "Type")}</span><h3>${t(r)}</h3></div>`;
    b.onclick = () => openPlayer(r);
    const v = b.querySelector("video");
    if (v) loopObserver.observe(v);
    g.appendChild(b);
  });
  const cta = document.createElement("div");
  cta.className = "reel-cta";
  cta.innerHTML = `<h3>${tt("צריכים רילסים לעסק?", "Need reels for your business?")}</h3>
    <p>${tt("מצלם, עורך ומוסר תוכן מוכן לעלייה, עם כתוביות וגרפיקה.", "I shoot, edit and deliver ready-to-post content with captions and motion graphics.")}</p>
    <a class="btn" href="#contact">${tt("בואו נדבר", "Let's talk")}</a>`;
  cta.querySelector("a").onclick = () => prefillService("business");
  g.appendChild(cta);
}

const player = $("#player"), pv = $("#playerVideo");
function openPlayer(r) {
  pv.poster = `media/video/${r.id}.jpg`;
  pv.src = `media/video/${r.id}.mp4`;
  $("#playerCap").textContent = `${t(r)} · ${t(r, "Type")}`;
  openModal(player);
  pv.play().catch(() => {});
}

// ---------- Gallery ----------
let currentFilter = "selected";
function listFor(key) { return key === "selected" ? P.selected : P.services[key]; }
function renderFilters() {
  const f = $("#filters");
  f.innerHTML = "";
  FILTERS.forEach((x) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab"); b.dataset.key = x.key;
    b.innerHTML = `${t(x)}<small>${listFor(x.key).length}</small>`;
    b.classList.toggle("on", x.key === currentFilter);
    b.setAttribute("aria-selected", x.key === currentFilter);
    b.onclick = () => selectFilter(x.key);
    f.appendChild(b);
  });
}
function selectFilter(key) {
  currentFilter = key;
  document.querySelectorAll("#filters button").forEach((b) => {
    b.classList.toggle("on", b.dataset.key === key);
    b.setAttribute("aria-selected", b.dataset.key === key);
  });
  masonry($("#grid"), listFor(key));
}

const revealer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
}, { rootMargin: "0px 0px -30px 0px" });

const colCount = () => (innerWidth <= 1000 ? 2 : 3);
const masonries = new Map(); // grid element -> ids, so they re-flow on resize
function masonry(grid, ids) {
  masonries.set(grid, ids);
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
    tile.className = "tile";
    tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    const label = t(SERVICE_LABEL[P.primary[id]]);
    tile.setAttribute("aria-label", label);
    const img = document.createElement("img");
    img.loading = "lazy"; img.decoding = "async"; img.width = w; img.height = h; img.alt = label;
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
  masonries.forEach((ids, grid) => {
    if (!grid.isConnected) masonries.delete(grid);
    else if (+grid.dataset.cols !== colCount()) masonry(grid, ids);
  });
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
  lbImg.alt = t(SERVICE_LABEL[P.primary[id]]);
  $("#lbCat").textContent = lbImg.alt;
  $("#lbCount").textContent = `${lbIdx + 1} / ${lbList.length}`;
  [1, -1].forEach((d) => (new Image().src = full(lbList[(lbIdx + d + lbList.length) % lbList.length])));
}
function openLb(list, i) { lbList = list; setLb(i); openModal(lb); }
$("#lbNext").onclick = () => setLb(lbIdx + 1);
$("#lbPrev").onclick = () => setLb(lbIdx - 1);
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.tagName === "FIGURE") closeModal(lb); });
let sx = null;
lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", (e) => {
  if (sx === null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) setLb(lbIdx + ((dx > 0) === (lang !== "en") ? 1 : -1));
  sx = null;
});

// ---------- Modals ----------
const stack = [];
function openModal(el) {
  el.classList.add("open"); el.setAttribute("aria-hidden", "false");
  stack.push(el); document.body.classList.add("locked");
  const btn = el.querySelector(".icon-btn"); if (btn) btn.focus({ preventScroll: true });
}
function closeModal(el) {
  el.classList.remove("open"); el.setAttribute("aria-hidden", "true");
  el.querySelectorAll("video").forEach((v) => v.pause());
  if (el === player) { pv.removeAttribute("src"); pv.load(); }
  if (el === panel) openProjectKey = null;
  const i = stack.indexOf(el); if (i > -1) stack.splice(i, 1);
  if (!stack.length) document.body.classList.remove("locked");
}
function closeAll() { [...stack].reverse().forEach(closeModal); }
$("#lbClose").onclick = () => closeModal(lb);
$("#playerClose").onclick = () => closeModal(player);
$("#panelClose").onclick = () => closeModal(panel);
player.addEventListener("click", (e) => { if (e.target === player) closeModal(player); });
addEventListener("keydown", (e) => {
  const top = stack[stack.length - 1];
  if (!top) return;
  if (e.key === "Escape") closeModal(top);
  if (top === lb) {
    const fwd = lang === "en" ? "ArrowRight" : "ArrowLeft";
    const back = lang === "en" ? "ArrowLeft" : "ArrowRight";
    if (e.key === fwd) setLb(lbIdx + 1);
    if (e.key === back) setLb(lbIdx - 1);
  }
});

// ---------- Booking form -> WhatsApp ----------
$("#waJump").addEventListener("click", (e) => {
  e.preventDefault();
  $("#bookForm").scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => $("#bookForm").name.focus({ preventScroll: true }), 450);
});
const sel = $("#serviceSelect");
function renderSelect() {
  const v = sel.value;
  sel.innerHTML = SERVICES.map((s) => `<option value="${s.key}">${t(s)}</option>`).join("") +
    `<option value="other">${tt("משהו אחר", "Something else")}</option>`;
  if (v) sel.value = v;
}
function prefillService(key) { sel.value = key; }
$("#bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, name = f.name.value.trim();
  $("#formErr").hidden = !!name;
  if (!name) { f.name.focus(); return; }
  const svc = sel.options[sel.selectedIndex].text;
  // Day-first date ("יום רביעי, 13/01/2027"), not the input's raw 2027-01-13 which reads backwards in Hebrew.
  let date = "";
  if (f.date.value) {
    const [y, m, d] = f.date.value.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const day = dt.toLocaleDateString(lang === "en" ? "en-GB" : "he-IL", { weekday: "long" });
    const num = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    date = lang === "en" ? `${day} ${num}` : `${day}, ⁦${num}⁩`;
  }
  const lines = lang === "en"
    ? [`Hi Zohar, I'm ${name}.`, `I'm interested in: ${svc}.`, date && `Date: ${date}`, f.details.value.trim()]
    : [`היי זוהר, אני ${name}.`, `מתעניין/ת ב: ${svc}.`, date && `תאריך: ${date}`, f.details.value.trim()];
  const text = lines.filter(Boolean).join("\n");
  window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// ---------- Render ----------
function renderAll() {
  renderServices(); renderProjects(); renderReels(); renderFilters(); renderSelect();
  masonry($("#grid"), listFor(currentFilter));
  $("#heroCaption").textContent = t(HERO[heroIdx]);
  if (openProjectKey) openProject(PROJECTS.find((p) => p.key === openProjectKey));
}
initLang();
