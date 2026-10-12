// The Ledger's entry (session 84: the one script split into modules). The router reads the hash (#/section/arg) and calls the
// section's page; core.js holds the data and the shared marks, ui.js the components, cards.js and markdown.js their own parts.
import { base, esc, load, page, state } from "./core.js";
import { home } from "./sections/home.js";
import { items } from "./sections/items.js";
import { npcs } from "./sections/npcs.js";
import { quests } from "./sections/quests.js";
import { zones } from "./sections/zones.js";
import { professions, planPage } from "./sections/professions.js";
import { pvp } from "./sections/pvp.js";
import { interfacePage, specPage } from "./sections/interface.js";
import { reviewPage } from "./sections/review.js";
import { changes, changePage } from "./sections/changes.js";
import { factions, factionPage } from "./sections/factions.js";
import { chests } from "./sections/chests.js";
import { loot } from "./sections/loot.js";
import { about } from "./sections/about.js";
import { itemPage, npcPage, questPage } from "./sections/entry.js";
import { wireShell, publicPass, turn, tails, foldFilters } from "./shell.js";
import { wireFind } from "./find.js";
import { counts, nav } from "./ui.js";

// ---------- the router ----------
// every page by its hash: #/section or #/section/arg; a page that keeps its scroll (Interface, back from a spec) returns "keep"
const ROUTES = {
  changes, change: changePage, review: reviewPage, interface: interfacePage, spec: async (a) => { await specPage(a); return "keep"; },
  items, npcs, quests, zones, factions, faction: factionPage, chests, loot, professions, plan: async (a) => { await planPage(a); return "keep"; },
  pvp, about, item: itemPage, npc: npcPage, quest: questPage,
};
async function route() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  try {
    if (!base.levers) base.levers = await load("levers");
    if (!base.changes) { const cd = await load("changes"); base.changes = new Map(cd.changes.map((c) => [c.id, c])); base.areas = Object.fromEntries(cd.areas); }
    const [sec, arg] = [h.split("/")[0], h.split("/").slice(1).join("/")];
    const go = ROUTES[sec] || home;
    const r = await go(arg);
    turn(page);
    if (r !== "keep") window.scrollTo(0, 0);
  } catch (e) {
    page.innerHTML = `<p class="empty">The ledger couldn’t open: ${esc(e.message)}. Build it with <code>python3 dbsite/build/ledger.py</code>.</p>`;
  }
}
// ---------- tabs for every page's sections (session 76: "add tabs to the other pages too") ----------
// Each time a page draws, its sections (an h2.sec and what follows, up to the next) become tabs: one shows, the others wait.
// The page's own code is untouched (its filters still find their elements); the tab chosen is kept per page. The list a page is
// about opens first; the rules and "What is easy to change" come after it. PvP and Interface have their own tabs or filters.
const TABBED = { changes: 0, review: 0, items: 1, npcs: 1, quests: 1, zones: 1, factions: 2, chests: 1, loot: 2, professions: 1 };
const TAB_FIRST = { factions: 2, loot: 2, items: 1, npcs: 1, quests: 1, zones: 1, chests: 1, professions: 1 };
const shortTitle = (t) => t.replace(/^What is easy to change, and what to leave$/, "What can change").replace(/^The rules (we changed )?for all (reputation|creatures)$/, "Rules for all")
  .replace(/\s*\(docs\/open-items\.md\)$/, "").replace(/^The /, "").replace(/^./, (c) => c.toUpperCase());
function applyTabs() {
  const sec = (location.hash.replace(/^#\/?/, "").split("/")[0]) || "";
  if (!(sec in TABBED) || page.querySelector(":scope > .ptabs")) return;
  const heads = [...page.querySelectorAll(":scope > h2.sec")];
  if (heads.length < 2) return;
  const groups = heads.map((h) => { const els = [h]; let n = h.nextElementSibling; while (n && !(n.matches("h2.sec"))) { els.push(n); n = n.nextElementSibling; } return { title: shortTitle(h.textContent.trim()), els }; });
  const first = TAB_FIRST[sec] != null ? Math.min(TAB_FIRST[sec], groups.length - 1) : 0;
  const order = [first, ...groups.map((_, i) => i).filter((i) => i !== first)];
  let cur = state["tab:" + sec];
  if (cur == null || !groups[cur] || groups[cur].title !== state["tabt:" + sec]) cur = first;
  const bar = document.createElement("nav");
  bar.className = "ptabs"; bar.setAttribute("aria-label", "Sections");
  bar.innerHTML = order.map((i) => `<a href="#" data-tab="${i}"${i === cur ? ' aria-current="page"' : ""}>${esc(groups[i].title)}</a>`).join("");
  heads[0].before(bar);
  const show = (i) => {
    groups.forEach((g, j) => g.els.forEach((el) => { el.hidden = j !== i; }));
    groups[i].els[0].hidden = true;   // the tab names it
    bar.querySelectorAll("a").forEach((a) => (+a.dataset.tab === i ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    state["tab:" + sec] = i; state["tabt:" + sec] = groups[i].title;
  };
  bar.addEventListener("click", (e) => { const a = e.target.closest("[data-tab]"); if (!a) return; e.preventDefault(); show(+a.dataset.tab); });
  show(cur);
}
new MutationObserver(() => { publicPass(page); applyTabs(); tails(page); foldFilters(page); }).observe(page, { childList: true });

wireShell();
wireFind();
load("review").then((d) => { counts.review = d.items.length; nav(document.querySelector("#nav a[aria-current]") ? decodeURIComponent(location.hash.replace(/^#\/?/, "").split("/")[0]) : ""); }).catch(() => {});
window.addEventListener("hashchange", route);
route();
