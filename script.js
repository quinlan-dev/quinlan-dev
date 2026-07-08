/* ============================================================
   Renders the site from projects.js and drives the 3D sphere.
   You should never need to edit this file to add content —
   edit projects.js instead.
   ============================================================ */

/* ---------- theme ---------- */
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeBtn.setAttribute("aria-checked", document.documentElement.dataset.theme === "light");

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  themeBtn.setAttribute("aria-checked", next === "light");
  sphereRefreshColors();
});

/* ---------- helpers ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function link(href, text, className) {
  const a = el("a", className, text);
  a.href = href;
  if (href.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}

/* keycap buttons wrap their label in a span for styling hooks */
function keyBtn(href, text, primary) {
  const a = link(href, "", "key-btn" + (primary ? " key-btn-primary" : ""));
  a.appendChild(el("span", "", text));
  return a;
}

/* ---------- hero ---------- */
document.title = `${SITE.name} — ${SITE.role}`;
document.getElementById("hero-name").textContent = SITE.name;
document.getElementById("hero-role").textContent = SITE.role;
document.getElementById("hero-pitch").textContent = SITE.pitch;
document.getElementById("nav-brand").textContent = SITE.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .toUpperCase();

const heroActions = document.getElementById("hero-actions");
if (SITE.github) heroActions.appendChild(keyBtn(SITE.github, "GitHub"));
if (SITE.linkedin) heroActions.appendChild(keyBtn(SITE.linkedin, "LinkedIn"));
if (SITE.resume) heroActions.appendChild(keyBtn(SITE.resume, "Resume"));

/* ---------- experience timeline ---------- */
const timeline = document.getElementById("experience-timeline");
(typeof EXPERIENCE !== "undefined" ? EXPERIENCE : []).forEach((xp) => {
  const item = el("div", "timeline-item");
  const card = el("div", "xp-card");

  const head = el("div", "xp-head");
  head.appendChild(el("span", "xp-company", xp.company));
  head.appendChild(el("span", "xp-period", xp.period));
  card.appendChild(head);

  const sub = el("div", "xp-head");
  sub.appendChild(el("span", "xp-role", xp.role));
  if (xp.location) sub.appendChild(el("span", "xp-location", xp.location));
  card.appendChild(sub);

  if (xp.bullets && xp.bullets.length) {
    const ul = el("ul", "xp-bullets");
    xp.bullets.forEach((b) => ul.appendChild(el("li", "", b)));
    card.appendChild(ul);
  }

  if (xp.tags && xp.tags.length) {
    const tags = el("div", "xp-tags");
    xp.tags.forEach((t) => tags.appendChild(el("span", "tag", t)));
    card.appendChild(tags);
  }

  item.appendChild(card);
  timeline.appendChild(item);
});

/* ---------- education ---------- */
const eduList = document.getElementById("education-list");
(typeof EDUCATION !== "undefined" ? EDUCATION : []).forEach((ed) => {
  const card = el("div", "edu-card");
  const head = el("div", "xp-head");
  head.appendChild(el("span", "edu-school", ed.school));
  head.appendChild(el("span", "xp-period", ed.period));
  card.appendChild(head);
  card.appendChild(el("div", "edu-degree", ed.degree));
  if (ed.detail) card.appendChild(el("div", "edu-detail", ed.detail));
  eduList.appendChild(card);
});

/* ---------- projects ---------- */
const grid = document.getElementById("project-grid");
const filtersBox = document.getElementById("project-filters");

function projectCard(p) {
  const card = el("article", "project-card" + (p.featured ? " featured" : ""));

  const head = el("div", "card-head");
  head.appendChild(el("h3", "card-title", p.name));
  if (p.status) head.appendChild(el("span", "card-status", p.status));
  card.appendChild(head);

  if (p.tagline) card.appendChild(el("p", "card-tagline", p.tagline));
  if (p.description) card.appendChild(el("p", "card-desc", p.description));

  if (p.highlights && p.highlights.length) {
    const ul = el("ul", "card-highlights");
    p.highlights.forEach((h) => ul.appendChild(el("li", "", h)));
    card.appendChild(ul);
  }

  if (p.tags && p.tags.length) {
    const tags = el("div", "card-tags");
    p.tags.forEach((t) => tags.appendChild(el("span", "tag", t)));
    card.appendChild(tags);
  }

  const links = el("div", "card-links");
  if (p.links?.github) links.appendChild(link(p.links.github, "Code ↗"));
  if (p.links?.demo) links.appendChild(link(p.links.demo, "Live Demo ↗"));
  if (p.links?.writeup) links.appendChild(link(p.links.writeup, "Write-up ↗"));
  if (links.children.length) card.appendChild(links);

  return card;
}

function renderProjects(filter) {
  grid.innerHTML = "";
  PROJECTS.filter((p) => !filter || (p.tags || []).includes(filter)).forEach(
    (p) => grid.appendChild(projectCard(p))
  );
}

/* filter chips — built from all tags in use; hidden if few projects */
const allTags = [...new Set(PROJECTS.flatMap((p) => p.tags || []))].sort();
if (PROJECTS.length > 3 && allTags.length > 1) {
  const allChip = el("button", "filter-chip active", "All");
  filtersBox.appendChild(allChip);
  const chips = [allChip];

  function setActive(chip, tag) {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderProjects(tag);
  }
  allChip.addEventListener("click", () => setActive(allChip, null));

  allTags.forEach((tag) => {
    const chip = el("button", "filter-chip", tag);
    chip.addEventListener("click", () => setActive(chip, tag));
    filtersBox.appendChild(chip);
    chips.push(chip);
  });
}
renderProjects(null);

/* ---------- skills ---------- */
const skillsGrid = document.getElementById("skills-grid");
Object.entries(SITE.skills || {}).forEach(([group, items]) => {
  const box = el("div", "skill-group");
  box.appendChild(el("h3", "", group));
  const chips = el("div", "skill-chips");
  items.forEach((s) => chips.appendChild(el("span", "tag", s)));
  box.appendChild(chips);
  skillsGrid.appendChild(box);
});

/* ---------- contact & footer ---------- */
const contact = document.getElementById("contact-links");
if (SITE.email) contact.appendChild(keyBtn(`mailto:${SITE.email}`, "Email Me", true));
if (SITE.github) contact.appendChild(keyBtn(SITE.github, "GitHub"));
if (SITE.linkedin) contact.appendChild(keyBtn(SITE.linkedin, "LinkedIn"));

document.getElementById("footer-text").textContent =
  `© ${new Date().getFullYear()} ${SITE.name} · Built with plain HTML/CSS/JS`;

/* ============================================================
   3D PARTICLE SPHERE BACKGROUND
   A wireframe-ish sphere of glowing points (fibonacci-
   distributed), slowly rotating, with nearby points linked by
   faint lines. Follows the mouse with a gentle parallax and
   picks up the theme's accent color. Disabled automatically
   under prefers-reduced-motion (see styles.css).
   ============================================================ */
(function sphere() {
  const canvas = document.getElementById("sphere-bg");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");

  const N = 220;                  // number of points
  const LINK_DIST = 0.42;         // link points closer than this (unit-sphere units)
  const points = [];

  /* fibonacci sphere — evenly distributed points */
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }

  /* precompute link pairs once (they're rotation-invariant) */
  const pairs = [];
  const LD2 = LINK_DIST * LINK_DIST;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      if (dx * dx + dy * dy + dz * dz < LD2) pairs.push([i, j]);
    }
  }

  let W, H, CX, CY, R;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // sphere sits right of center on desktop, centered on mobile
    CX = W > 760 ? W * 0.72 : W * 0.5;
    CY = H * 0.42;
    R = Math.min(W, H) * (W > 760 ? 0.34 : 0.42);
  }
  window.addEventListener("resize", resize);
  resize();

  /* theme colors — re-read when the toggle fires */
  let accentRGB = [88, 166, 255];
  window.sphereRefreshColors = function () {
    const c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    // parse #rrggbb
    if (/^#[0-9a-f]{6}$/i.test(c)) {
      accentRGB = [
        parseInt(c.slice(1, 3), 16),
        parseInt(c.slice(3, 5), 16),
        parseInt(c.slice(5, 7), 16),
      ];
    }
  };
  sphereRefreshColors();

  /* mouse parallax */
  let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
  window.addEventListener("pointermove", (e) => {
    targetRY = (e.clientX / W - 0.5) * 0.9;
    targetRX = (e.clientY / H - 0.5) * 0.6;
  });

  const proj = new Array(N);
  const FOV = 3.2; // perspective strength

  function frame(t) {
    ctx.clearRect(0, 0, W, H);

    // ease parallax toward the mouse
    curRX += (targetRX - curRX) * 0.04;
    curRY += (targetRY - curRY) * 0.04;

    const ay = t * 0.00012 + curRY;             // slow spin + mouse
    const ax = 0.35 + curRX;
    const pulse = 1 + Math.sin(t * 0.0006) * 0.03; // gentle breathing

    const cosY = Math.cos(ay), sinY = Math.sin(ay);
    const cosX = Math.cos(ax), sinX = Math.sin(ax);
    const [r, g, b] = accentRGB;

    for (let i = 0; i < N; i++) {
      const p = points[i];
      // rotate Y then X
      let x = p.x * cosY + p.z * sinY;
      let z = -p.x * sinY + p.z * cosY;
      let y = p.y * cosX - z * sinX;
      z = p.y * sinX + z * cosX;

      const s = FOV / (FOV + z);               // perspective
      proj[i] = {
        x: CX + x * R * pulse * s,
        y: CY + y * R * pulse * s,
        z,
        s,
      };
    }

    // links first (under the dots)
    ctx.lineWidth = 1;
    for (let k = 0; k < pairs.length; k++) {
      const a = proj[pairs[k][0]];
      const c2 = proj[pairs[k][1]];
      const depth = 1 - (a.z + c2.z + 2) / 4;   // 0 far → 1 near
      ctx.strokeStyle = `rgba(${r},${g},${b},${(0.03 + depth * 0.12).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(c2.x, c2.y);
      ctx.stroke();
    }

    // glowing dots
    for (let i = 0; i < N; i++) {
      const p = proj[i];
      const depth = 1 - (p.z + 1) / 2;          // 0 far → 1 near
      const size = 0.8 + depth * 2.2;
      ctx.fillStyle = `rgba(${r},${g},${b},${(0.15 + depth * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * p.s, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* no-op fallback if the sphere never initialized (reduced motion) */
if (!window.sphereRefreshColors) window.sphereRefreshColors = function () {};
