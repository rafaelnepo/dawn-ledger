import { LOCAL } from "./build.js";
import { esc, fmt, page, state, ROOT } from "./core.js";
import { grid, viewOf, viewToggle, wireGrid, wireView } from "./kit/gallery.js";
import { filterBar, filtered, readAddress, wireBar, writeAddress } from "./kit/filters.js";

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
// ---------- a long list: the faceted filter bar (kit/filters.js, session 100), the cards or the paged table, sorting, a row that opens ----------
// o.facets: the filter bar's facets (icon toggles or dropdowns); o.filters (the older shape: dropdowns) still works
export function listPage(o) {
  const facets = o.facets || (o.filters || []).map((f) => Object.assign({ icons: false }, f));
  // a link from another page may have set a filter already (a zone's "The NPCs here"): the defaults fill the rest
  const st = (state[o.sec] = Object.assign({ q: "", page: 0, open: null, sort: null, dir: 1 }, state[o.sec] ? {} : o.defaults || {}, state[o.sec] || {}));
  const fo = { rows: o.rows, text: o.text, facets, checks: o.checks || [], placeholder: o.placeholder, unit: o.unit };
  readAddress(fo, st);   // a shared link's choices win
  const PER = 100;
  const render = () => {
    let rows = filtered(fo, st);
    if (st.sort) { const c = o.cols.find((x) => x[0] === st.sort); rows = rows.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * st.dir; }); }
    // the visual view (session 99): every match as a card, drawn a batch at a time as you scroll; the table keeps its pages
    const cards = o.card && viewOf(o.sec) === "cards";
    const pages = cards ? 1 : Math.max(1, Math.ceil(rows.length / PER));
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
      ${filterBar(Object.assign({ count: rows.length }, fo), st, o.card ? viewToggle(o.sec) : "")}
      ${cards ? grid("g" + o.sec, rows, o.card, { cls: o.gridCls }) : `<div class="panel">${h}</div>
      <div class="pager"><button id="pp"${st.page ? "" : " disabled"}>Back</button><span>Page ${st.page + 1} of ${pages}</span><button id="pn"${st.page < pages - 1 ? "" : " disabled"}>Next</button></div>`}`;
    writeAddress(o.sec, fo, st);
    wireBar(page, fo, st, render);
    if (o.card) wireView(page, o.sec, render);
    if (cards) wireGrid("g" + o.sec, rows, o.card);
    page.querySelectorAll(`#t${o.sec} th[data-sort]`).forEach((th) => th.addEventListener("click", () => {
      const k = th.dataset.sort; if (st.sort === k) st.dir = -st.dir; else { st.sort = k; st.dir = 1; } st.page = 0; render();
    }));
    if (o.more) page.querySelectorAll(`#t${o.sec} tr.row`).forEach((tr) => tr.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; const r = slice[+tr.dataset.i]; st.open = st.open === o.key(r) ? null : o.key(r); render();
    }));
    const qi = page.querySelector("#fq");
    qi.addEventListener("input", () => { st.q = qi.value; st.page = 0; render(); const i = page.querySelector("#fq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    if (cards) return;
    page.querySelector("#pp").addEventListener("click", () => { st.page--; render(); window.scrollTo(0, page.querySelector(".fbar").offsetTop - 60); });
    page.querySelector("#pn").addEventListener("click", () => { st.page++; render(); window.scrollTo(0, page.querySelector(".fbar").offsetTop - 60); });
  };
  render();
}
// ---------- PvP and honor ----------
// a page's tabs (session 76, the user: "tabs to switch between each block of content"): links, so Back and a shared link work
export const ptabs = (sec, list, cur) => `<nav class="ptabs" aria-label="Sections">${list.map(([k, t, n]) =>
  `<a href="#/${sec}/${k}"${k === cur ? ' aria-current="page"' : ""}>${esc(t)}${n != null ? `<span class="n">${n}</span>` : ""}</a>`).join("")}</nav>`;

// ---------- the sections' links: the game (our work moved to the Watcher's Console, session 95) ----------
// the rail by category (session 98, the Journal plan's Step 5; the user: two words at most, short and simple): the Archive is the
// game's database only, the records of your adventure moved to the Adventurer's Journal (:8793). A section is [key, name] (its
// page in index.html's hash) or ["@page.html", name, icon] (a book of its own, on this Mac only: it reads the local art and data).
// the books brought into the one page (session 99): their data is this Mac's, so the public copy neither lists nor opens them
export const LOCAL_ONLY = new Set(["trainers", "festivals", "dungeons", "lockpicking", "beasts", "gathering", "drops", "zone", "tradeskill", "names"]);   // names: session 107 (some of Blizzard's own)
export const NAV = [
  ["World", [["zones", "Zones"], ["dungeons", "Dungeons"], ["festivals", "Festivals"], ["flightpaths", "Flight paths"]]],
  ["Creatures", [["npcs", "NPCs"], ["beasts", "Beasts"], ["loot", "Loot"]]],   // the Drops inside Loot since session 100
  ["Items", [["items", "Items"], ["itemsets", "Item sets"], ["chests", "Chests and boxes"]]],
  ["Quests", [["quests", "Quests"], ["books", "Books"]]],
  ["Crafts", [["professions", "Professions"], ["lockpicking", "Lockpicking"]]],   // the Tradeskill DB inside Professions since session 99, its Trainers and Gathering since 100
  ["Heroes", [["classes", "Classes"], ["races", "Races"], ["names", "Names"], ["mounts", "Mounts"], ["pets", "Pets"]]],
  ["Factions", [["factions", "Factions"], ["pvp", "PvP and honor"]]],
];
const HERE = location.pathname.split("/").pop();
export const SPA = (!HERE || HERE === "index.html") && !ROOT;   // the game's sections live in index.html's hash; the books are pages
export const counts = {};
// a section's icon left of its page's title (session 95, the user: "add icons to the titles of the pages"): the first h1 of root,
// once; a section without an icon (the home page, an entry's own page) keeps its title alone
const TITLED = new Set(["trainers", "tradeskill", "dungeons", "festivals", "beasts", "gathering", "lockpicking", "drops", "zones", "items", "npcs",
  "quests", "factions", "chests", "loot", "professions", "pvp", "flightpaths", "itemsets", "books", "classes", "races", "mounts", "pets"]);
export function titleIcon(root, key) {
  const h = root && root.querySelector("h1");
  if (!h || !TITLED.has(key) || h.closest(".titled")) return;
  // the user: the icon beside the title and its description, the two flush left beside it
  const d = h.nextElementSibling && h.nextElementSibling.tagName === "P" ? h.nextElementSibling : null;
  const box = document.createElement("div");
  box.className = "titled";
  h.before(box);
  box.innerHTML = `<img class="hic" src="${ROOT}assets/ledger/icons/${key}.png" alt="" aria-hidden="true"><div class="ttl"></div>`;
  const tt = box.lastChild;
  tt.append(h);
  if (d) tt.append(d);   // the icon one size everywhere, the description two lines (shell.css, session 100)
}   // a section's number beside its name (the Review's waiting ones); main.js fills it once
export function nav(cur) {
  const pre = SPA ? "" : ROOT + "index.html";
  const mine = HERE, here = cur;   // every book a section since session 99, their old pages gone in session 100
  // each section's own icon (session 95: our ring icons, docs/specs/ring-icon-style.md; tools/asset-extract/ring_icons.py archive)
  const icon = (k) => `<img class="nic" src="${ROOT}assets/ledger/icons/${k}.png" alt="" aria-hidden="true">`;
  const link = ([k, t, ic]) => k[0] === "@"
    ? `<a href="${ROOT}${k.slice(1)}"${!SPA && mine === k.slice(1) ? ' aria-current="page"' : ""}><span class="ni">${icon(ic)}<span>${t}</span></span></a>`
    : `<a href="${pre}#/${k}"${here === k && SPA ? ' aria-current="page"' : ""}><span class="ni">${icon(k)}<span>${t}</span></span>${counts[k] ? `<span class="nc${k === "review" ? " hot" : ""}">${counts[k]}</span>` : ""}</a>`;
  document.getElementById("nav").innerHTML = NAV.map(([h, xs]) => {
    const shown = xs.filter(([k]) => LOCAL || (k[0] !== "@" && !LOCAL_ONLY.has(k)));   // the books stay on this Mac: the public copy lists the sections only
    return shown.length ? `<div class="ngroup"><div class="nh">${h}</div>${shown.map(link).join("")}</div>` : "";
  }).join("");
  if (!SPA) return;   // a book keeps the title its own script gives it
  document.title = (cur && document.querySelector(`#nav a[aria-current] span`) ? document.querySelector(`#nav a[aria-current] span`).textContent + " · " : "") + "The Archive of Norgannon · Dawn";
}

