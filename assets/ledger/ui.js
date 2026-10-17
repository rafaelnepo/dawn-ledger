import { LOCAL } from "./build.js";
import { esc, fmt, page, state } from "./core.js";

export function table(id, cols, groups, opts) {
  const st = (state[id] = state[id] || { sort: opts.sort || null, dir: opts.dir || 1 });
  const sorted = (rows) => {
    if (!st.sort) return rows;
    const c = cols.find((x) => x[0] === st.sort);
    return rows.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * st.dir; });
  };
  let h = `<table class="lt" id="${id}"><thead><tr>` + cols.map((c) =>
    `<th class="${c[2] || ""}" data-sort="${c[0]}" aria-sort="${st.sort === c[0] ? (st.dir > 0 ? "ascending" : "descending") : "none"}">${c[1]}${st.sort === c[0] ? (st.dir > 0 ? " ▴" : " ▾") : ""}</th>`).join("") + "</tr></thead><tbody>";
  let n = 0;
  for (const [title, rows, note] of groups) {
    if (!rows.length) continue;
    if (title) h += `<tr class="grp"><td colspan="${cols.length}">${esc(title)}<span class="n">${rows.length}</span>${note ? `<span class="n">${note}</span>` : ""}</td></tr>`;
    for (const r of sorted(rows)) {
      h += `<tr class="row" data-i="${n}">` + cols.map((c) => `<td class="${c[2] || ""}">${c[4](r)}</td>`).join("") + "</tr>";
      if (opts.more && opts.open && opts.open(r)) h += `<tr class="more"><td colspan="${cols.length}">${opts.more(r)}</td></tr>`;
      n++;
    }
  }
  if (!n) h += `<tr><td colspan="${cols.length}" class="empty">Nothing matches.</td></tr>`;
  return h + "</tbody></table>";
}
export function wireTable(id, rerender, rows, opts) {
  const t = document.getElementById(id);
  if (!t) return;
  t.querySelectorAll("th[data-sort]").forEach((th) => th.addEventListener("click", () => {
    const st = state[id]; const k = th.dataset.sort;
    if (st.sort === k) st.dir = -st.dir; else { st.sort = k; st.dir = 1; }
    rerender();
  }));
  if (opts && opts.click) t.querySelectorAll("tr.row").forEach((tr) => tr.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    opts.click(rows[+tr.dataset.i]);
  }));
}

// a filter as a column: its title, then one option a line with its count on the right (the user, session 76: "a column approach, no pills")
export const fcol = (name, title, items, cur, all, total, cls) =>
  `<div class="fcol ${cls || ""}" data-chips="${name}"><div class="fh">${esc(title)}</div><div class="fl">` +
  (all ? `<button class="fo" data-v="" aria-pressed="${!cur}">${esc(all)}${total != null ? `<span class="n">${total}</span>` : ""}</button>` : "") +
  items.map(([v, t, n]) => `<button class="fo" data-v="${esc(v)}" aria-pressed="${cur === v}"${n === 0 ? " disabled" : ""}>${esc(t)}${n != null ? `<span class="n">${n}</span>` : ""}</button>`).join("") + "</div></div>";
export const chips = (name, items, cur, all) =>
  `<span class="chips" data-chips="${name}">` + (all ? `<button class="chip" data-v="" aria-pressed="${!cur}">${all}</button>` : "") +
  items.map(([v, t, n]) => `<button class="chip" data-v="${esc(v)}" aria-pressed="${cur === v}">${esc(t)}${n != null ? `<span class="n">${n}</span>` : ""}</button>`).join("") + "</span>";
export function wireChips(root, name, set) {
  root.querySelectorAll(`[data-chips="${name}"] .chip, [data-chips="${name}"] .fo`).forEach((b) => b.addEventListener("click", () => set(b.dataset.v)));
}
// ---------- a long list, paged: search, filters, checks, sorting over the whole list, a row that opens ----------
export function listPage(o) {
  // a link from another page may have set a filter already (a zone's "The NPCs here"): the defaults fill the rest
  const st = (state[o.sec] = Object.assign({ q: "", page: 0, open: null, sort: null, dir: 1 }, state[o.sec] ? {} : o.defaults || {}, state[o.sec] || {}));
  const PER = 100;
  const opt = (v, cur) => `<option value="${esc(v)}"${String(v) === String(cur) ? " selected" : ""}>${esc(v)}</option>`;
  const render = () => {
    const q = st.q.toLowerCase();
    let rows = o.rows.filter((r) => (!q || o.text(r).toLowerCase().includes(q)) &&
      o.filters.every((f) => !st[f.k] || String(f.get(r)) === String(st[f.k]) || (Array.isArray(f.get(r)) && f.get(r).includes(st[f.k]))) &&
      o.checks.every((c) => !st[c.k] || c.test(r)));
    if (st.sort) { const c = o.cols.find((x) => x[0] === st.sort); rows = rows.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * st.dir; }); }
    const pages = Math.max(1, Math.ceil(rows.length / PER));
    st.page = Math.min(st.page, pages - 1);
    const slice = rows.slice(st.page * PER, st.page * PER + PER);
    let h = `<table class="lt" id="t${o.sec}"><thead><tr>` + o.cols.map((c) => `<th class="${c[2] || ""}" data-sort="${c[0]}">${c[1]}${st.sort === c[0] ? (st.dir > 0 ? " ▴" : " ▾") : ""}</th>`).join("") + "</tr></thead><tbody>";
    slice.forEach((r, i) => {
      h += `<tr class="row" data-i="${i}">` + o.cols.map((c) => `<td class="${c[2] || ""}">${c[4](r)}</td>`).join("") + "</tr>";
      if (o.more && st.open === o.key(r)) h += `<tr class="more"><td colspan="${o.cols.length}">${o.more(r)}</td></tr>`;
    });
    if (!slice.length) h += `<tr><td colspan="${o.cols.length}" class="empty">Nothing matches.</td></tr>`;
    h += "</tbody></table>";
    page.innerHTML = `<h1 class="display">${o.title}</h1><p class="lead">${o.lead}</p>${o.top || ""}
      <h2 class="sec">${o.listTitle}</h2>
      <div class="filters"><input type="search" id="fq" placeholder="${o.placeholder}" value="${esc(st.q)}" aria-label="${o.placeholder}">
        ${o.filters.map((f) => `<select data-f="${f.k}" aria-label="${f.label}"><option value="">${f.label}</option>${f.values.map((v) => opt(v, st[f.k])).join("")}</select>`).join("")}
        ${o.checks.map((c) => `<label><input type="checkbox" data-c="${c.k}"${st[c.k] ? " checked" : ""}> ${c.label}</label>`).join("")}
        <span>${fmt(rows.length)} ${o.unit}</span></div>
      <div class="panel">${h}</div>
      <div class="pager"><button id="pp"${st.page ? "" : " disabled"}>Back</button><span>Page ${st.page + 1} of ${pages}</span><button id="pn"${st.page < pages - 1 ? "" : " disabled"}>Next</button></div>`;
    page.querySelectorAll(`#t${o.sec} th[data-sort]`).forEach((th) => th.addEventListener("click", () => {
      const k = th.dataset.sort; if (st.sort === k) st.dir = -st.dir; else { st.sort = k; st.dir = 1; } st.page = 0; render();
    }));
    if (o.more) page.querySelectorAll(`#t${o.sec} tr.row`).forEach((tr) => tr.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; const r = slice[+tr.dataset.i]; st.open = st.open === o.key(r) ? null : o.key(r); render();
    }));
    const qi = page.querySelector("#fq");
    qi.addEventListener("input", () => { st.q = qi.value; st.page = 0; render(); const i = page.querySelector("#fq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    page.querySelectorAll("select[data-f]").forEach((sel) => sel.addEventListener("change", () => { st[sel.dataset.f] = sel.value; st.page = 0; render(); }));
    page.querySelectorAll("input[data-c]").forEach((cb) => cb.addEventListener("change", () => { st[cb.dataset.c] = cb.checked; st.page = 0; render(); }));
    page.querySelector("#pp").addEventListener("click", () => { st.page--; render(); window.scrollTo(0, page.querySelector(".filters").offsetTop - 60); });
    page.querySelector("#pn").addEventListener("click", () => { st.page++; render(); window.scrollTo(0, page.querySelector(".filters").offsetTop - 60); });
  };
  render();
}
// ---------- PvP and honor ----------
// a page's tabs (session 76, the user: "tabs to switch between each block of content"): links, so Back and a shared link work
export const ptabs = (sec, list, cur) => `<nav class="ptabs" aria-label="Sections">${list.map(([k, t, n]) =>
  `<a href="#/${sec}/${k}"${k === cur ? ' aria-current="page"' : ""}>${esc(t)}${n != null ? `<span class="n">${n}</span>` : ""}</a>`).join("")}</nav>`;

// ---------- the sections' links: the game (our work moved to the Watcher's Console, session 95) ----------
export const NAV = [
  ["The game", [["items", "Items"], ["npcs", "NPCs"], ["quests", "Quests"], ["zones", "Zones"], ["factions", "Factions"],
    ["chests", "Chests and boxes"], ["loot", "Loot"], ["professions", "Professions"], ["pvp", "PvP and honor"]]],
];
// the Journey's books (session 95, the user: the Traveler's Companion part of the Archive, its first category): pages of their own
// in the Archive's frame, on this Mac only (they read your characters). A zone's page belongs to the road.
export const JOURNEY = [["journey.html", "The road"], ["crafts.html", "Crafts"], ["dungeons.html", "Dungeons"], ["festivals.html", "Festivals"],
  ["journal.html", "Journals"], ["lockpicking.html", "Lockpicking"], ["drops.html", "Drops"]];
const HERE = location.pathname.split("/").pop();
export const SPA = !HERE || HERE === "index.html";   // the game's sections live in index.html's hash; the Journey's books are pages
const JOURNEY_OF = { "zone.html": "journey.html" };
export const counts = {};
// a section's icon left of its page's title (session 95, the user: "add icons to the titles of the pages"): the first h1 of root,
// once; a section without an icon (the home page, an entry's own page) keeps its title alone
const TITLED = new Set(["journey", "crafts", "dungeons", "festivals", "journal", "lockpicking", "drops", "zones", "items", "npcs", "quests",
  "factions", "chests", "loot", "professions", "pvp"]);
export function titleIcon(root, key) {
  const h = root && root.querySelector("h1");
  if (!h || !TITLED.has(key) || h.closest(".titled")) return;
  // the user: the icon as tall as the title and its description together, the two flush left beside it
  const d = h.nextElementSibling && h.nextElementSibling.tagName === "P" ? h.nextElementSibling : null;
  const box = document.createElement("div");
  box.className = "titled";
  h.before(box);
  box.innerHTML = `<img class="hic" src="assets/ledger/icons/${key}.png" alt="" aria-hidden="true"><div class="tt"></div>`;
  const tt = box.lastChild, img = box.firstChild;
  tt.append(h);
  if (d) tt.append(d);
  const fit = () => { img.style.height = Math.min(180, tt.offsetHeight) + "px"; };
  fit();
  new ResizeObserver(fit).observe(tt);
}   // a section's number beside its name (the Review's waiting ones); main.js fills it once
export function nav(cur) {
  const pre = SPA ? "" : "index.html";
  const mine = JOURNEY_OF[HERE] || HERE;
  // each section's own icon (session 95: our ring icons, docs/specs/ring-icon-style.md; tools/asset-extract/ring_icons.py archive)
  const icon = (k) => `<img class="nic" src="assets/ledger/icons/${k}.png" alt="" aria-hidden="true">`;
  const jlink = ([u, t]) => `<a href="${u}"${!SPA && mine === u ? ' aria-current="page"' : ""}><span class="ni">${icon(u.replace(".html", ""))}<span>${t}</span></span></a>`;
  const link = ([k, t]) => `<a href="${pre}#/${k}"${SPA && cur === k ? ' aria-current="page"' : ""}><span class="ni">${icon(k)}<span>${t}</span></span>${counts[k] ? `<span class="nc${k === "review" ? " hot" : ""}">${counts[k]}</span>` : ""}</a>`;
  document.getElementById("nav").innerHTML =
    (LOCAL ? `<div class="ngroup"><div class="nh">The Journey</div>${JOURNEY.map(jlink).join("")}</div>` : "") +
    NAV.map(([h, xs]) => `<div class="ngroup"><div class="nh">${h}</div>${xs.map(link).join("")}</div>`).join("");
  if (!SPA) return;   // a Journey page keeps the title its own script gives it
  document.title = (cur && document.querySelector(`#nav a[aria-current] span`) ? document.querySelector(`#nav a[aria-current] span`).textContent + " · " : "") + "The Archive of Norgannon · Dawn";
}
