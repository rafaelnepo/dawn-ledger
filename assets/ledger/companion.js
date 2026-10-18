import { ROOT, json as getJson, money, page as sheet } from "./core.js";

// ---------- the books' shared parts, inside the one page (session 99, the plan's Milestone C) ----------
// The books (Trainers, Festivals, Dungeons, Lockpicking, the journals, the lands, the Drops) were pages of their own on
// site/assets/core.js (window.Companion); each is now a section module drawing into the Archive's page, on these parts. What went:
// the character and "My journey" (session 98: your records live in the Adventurer's Journal), the books' own search (the rail's Find
// anything) and their item tooltip (the kit's, on data-item, from the live data). Their look: site/assets/journey.css under .journey.
const store = {
  get(k, d) { try { const v = localStorage.getItem("companion." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("companion." + k, JSON.stringify(v)); } catch (e) { /* a private window: still works */ } },
};
const cache = {};
export const C = {
  store,
  esc: (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])),
  // a book's file (data/... or content/...), read once a visit
  json: (url) => (cache[url] = cache[url] || getJson(ROOT + url).catch((e) => { delete cache[url]; throw e; })),
  levels: (lo, hi) => (lo === hi ? String(lo) : lo + "–" + hi),
  list: (xs) => (xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]),
  state: { level: store.get("level", 0) },
  character: () => null,
  journeyOn: () => false,            // "My journey" left with the character (session 98): every page is written
  found: () => false,
  level(zone) { return C.state.level || (zone ? zone.levels[0] : 1); },
  // an item's name in its quality's color, its tooltip the kit's (data-item)
  item: (name, q, id) => `<span class="it qn${q >= 0 && q <= 5 ? q : 1}"${id ? ` data-item="${id}" tabindex="0"` : ""}>${C.esc(name)}</span>`,
  money,   // core.js's: the game's coins
  side: (s) => `<span class="side ${C.esc(s)}">${C.esc(s === "both" ? "Both sides" : s)}</span>`,
  // a land's map with its pins (percentages); the map picture is this Mac's (data/maps/)
  map(zone) {
    const m = document.createElement("div");
    m.className = "map"; m.setAttribute("role", "img"); m.setAttribute("aria-label", "Map of " + zone.name);
    if (zone.map) m.style.backgroundImage = `url("${ROOT}data/${zone.map}")`;
    m.setPins = (sets) => {
      m.querySelectorAll(".pin").forEach((p) => p.remove());
      const frag = document.createDocumentFragment();
      for (const s of sets) for (const p of s.pins || []) {
        const d = document.createElement("i");
        d.className = "pin k-" + s.kind + (s.dim ? " dim" : "");
        d.style.left = p[0] + "%"; d.style.top = p[1] + "%";
        frag.appendChild(d);
      }
      m.appendChild(frag);
    };
    return m;
  },
};

// what matters at a level (the rest folds into "More about this place", never removed)
const QUEST_SORT_CLASS = { "-81": "Warrior", "-82": "Shaman", "-141": "Paladin", "-161": "Mage", "-162": "Rogue", "-261": "Hunter", "-262": "Priest", "-263": "Druid", "-61": "Warlock" };
C.questClass = (q) => QUEST_SORT_CLASS[String(q.sort)] || null;
C.relevant = (kind, e, zone) => {
  const L = C.level(zone);
  switch (kind) {
    case "beasts": case "foes": case "rares": return e.lo <= L + 3 && e.hi >= L - 4;
    case "quests": {
      if (e.side && zone.side !== "Contested" && e.side !== zone.side) return false;
      if (C.questClass(e)) return false;
      return e.level >= L - 3 && e.level <= L + 4 && e.min <= L;
    }
    case "gathering": return e.skill <= Math.max(1, L * 5);
    case "critters": return false;
    default: return true;
  }
};
C.hint = () => "A page not yet written.";

// the bar over a book: its crumbs and the level its pages are curated for (the level folds what is far from it)
export function bar(el, crumbs, onChange) {
  el.innerHTML = `<span class="crumbs">${crumbs || ""}</span><span class="spacer"></span>
    <label class="levelctl">Level <input type="number" min="1" max="60" placeholder="auto" aria-label="Level the pages are curated for"></label>`;
  const lvl = el.querySelector("input");
  lvl.value = C.state.level || "";
  lvl.addEventListener("change", () => { const v = Math.max(0, Math.min(60, parseInt(lvl.value, 10) || 0)); C.state.level = v; store.set("level", v); onChange && onChange(); });
}

// ---------- a book: an index of entries in folding groups on the left, the chosen entry's page on the right ----------
// o = { sec, crumbs, title, lead, cls (the panel's own class), search (the index's search box's words, if it has one), groups: [{ title, count, folded, entries: [{ key, name, right, mark, sub }] }], chosen (a key),
// page(key) -> html }. Each entry is a link (#/<sec>/<key>), so Back and a shared link find it again.
const folded = {};
let lastSec = null;
export function book(o) {
  const all = o.groups.flatMap((g) => g.entries);
  const cur = all.find((e) => e.key === o.chosen) || all[0];
  const link = (e) => `#/${o.sec}/${encodeURIComponent(e.key)}`;
  const groups = o.groups.filter((g) => g.entries.length).map((g, i) => {
    const id = o.sec + ":" + g.title, isOpen = folded[id] == null ? !g.folded || g.entries.includes(cur) : !folded[id];
    let sub = null;
    return `<div class="cat${isOpen ? "" : " folded"}" data-cat="${C.esc(id)}"><button type="button">${C.esc(g.title)}<span class="count num">${g.count ?? g.entries.length}</span></button>
      <ul class="catbody" style="list-style:none;margin:0;padding:0">${g.entries.map((e) => {
        const head = e.sub && e.sub !== sub ? `<li class="subcat">${C.esc((sub = e.sub))}</li>` : "";
        return head + `<li class="entry${e === cur ? " on" : ""}"><a class="nm" href="${link(e)}"${e === cur ? ' aria-current="page"' : ""}>${C.esc(e.name)}${e.mark || ""}</a><span class="lv num">${e.right ?? ""}</span></li>`;
      }).join("")}</ul></div>`;
  }).join("");
  sheet.innerHTML = `<div class="journey"><header class="bar"><div class="wrap"></div></header>
    <section><div class="wrap"><h1 class="display">${o.title}</h1><p class="lead">${o.lead}</p></div></section>
    <main class="wrap"><div class="panel book${o.cls ? " " + o.cls : ""}"><nav class="index" aria-label="${C.esc(o.title)}">${o.search ? `<input type="search" placeholder="${C.esc(o.search)}" aria-label="${C.esc(o.search)}">` : ""}${groups}</nav>
      <article class="page">${cur ? o.page(cur.key) : `<p class="note">Nothing here yet.</p>`}</article></div></main></div>`;
  bar(sheet.querySelector(".bar .wrap"), o.crumbs, o.onLevel);
  sheet.querySelectorAll(".cat > button").forEach((b) => b.addEventListener("click", () => {
    const cat = b.parentElement; cat.classList.toggle("folded"); folded[cat.dataset.cat] = cat.classList.contains("folded");
  }));
  const find = sheet.querySelector(".index > input[type=search]");   // the index's own search: entries filtered, every group opened
  if (find) find.addEventListener("input", () => {
    const t = find.value.trim().toLowerCase();
    sheet.querySelectorAll(".index .catbody .entry").forEach((li) => { li.hidden = !!t && !li.textContent.toLowerCase().includes(t); });
    sheet.querySelectorAll(".index .subcat").forEach((h) => { h.hidden = !!t; });
    if (t) sheet.querySelectorAll(".index .cat").forEach((c) => c.classList.remove("folded"));
  });
  const same = lastSec === o.sec;   // another entry of the same book keeps the reader's place; a book opened anew starts at the top
  lastSec = o.sec;
  return same ? "keep" : undefined;
}
export const leftBook = () => { lastSec = null; };
// a book's data could not be read: say which builder makes it
export const unread = (what, builder, err) => {
  sheet.innerHTML = `<p class="empty">${what} couldn’t be read (${C.esc(err.message)}). Run ${builder} first.</p>`;
};
