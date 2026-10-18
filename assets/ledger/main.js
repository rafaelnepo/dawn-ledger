// The Ledger's entry (session 84: the one script split into modules). The router reads the hash (#/section/arg) and calls the
// section's page; core.js holds the data and the shared marks, ui.js the components, cards.js its own parts.
import { base, esc, hashPath, load, page, state } from "./core.js";
import { home } from "./sections/home.js";
import { items } from "./sections/items.js";
import { npcs } from "./sections/npcs.js";
import { quests } from "./sections/quests.js";
import { zones } from "./sections/zones.js";
import { professions } from "./sections/professions.js";
import { pvp } from "./sections/pvp.js";
import { factions, factionPage } from "./sections/factions.js";
import { chests } from "./sections/chests.js";
import { loot } from "./sections/loot.js";
import { flightpaths } from "./sections/flightpaths.js";
import { races } from "./sections/races.js";
import { classes } from "./sections/classes.js";
import { mounts } from "./sections/mounts.js";
import { itemsets } from "./sections/itemsets.js";
import { books } from "./sections/books.js";
import { soon, SOON_KEYS } from "./sections/soon.js";
import { itemPage, npcPage, questPage } from "./sections/entry.js";
import { wireShell, publicPass, turn, tails, foldFilters } from "./shell.js";
import { wireFind } from "./find.js";
import { LOCAL } from "./build.js";
import { titleIcon, LOCAL_ONLY } from "./ui.js";
import { leftBook } from "./companion.js";
import { wireTips } from "./kit/tip.js";
import { wireLive } from "./live.js";
import { wire3d, teardown } from "./kit/model3d.js";

// ---------- the router ----------
// every page by its hash: #/section or #/section/arg; a page that keeps its scroll (Interface, back from a spec) returns "keep"
const ROUTES = {
  items, npcs, quests, zones, factions, faction: factionPage, chests, loot, professions,
  pvp, flightpaths, races, classes, mounts, itemsets, books, item: itemPage, npc: npcPage, quest: questPage,
  ...Object.fromEntries(SOON_KEYS.map((k) => [k, soon(k)])),   // the categories' new sections, still to be written (session 98)
  // the books, sections since session 99 (the plan's Milestone C): loaded the first time they're opened, this Mac only (LOCAL_ONLY)
  trainers: (a) => import("./sections/trainers.js").then((m) => m.trainers(a)),
  festivals: (a) => import("./sections/festivals.js").then((m) => m.festivals(a)),
  dungeons: (a) => import("./sections/dungeons.js").then((m) => m.dungeons(a)),
  lockpicking: (a) => import("./sections/lockpicking.js").then((m) => m.lockpicking(a)),
  beasts: (a) => import("./sections/journal.js").then((m) => m.beasts(a)),
  gathering: (a) => import("./sections/journal.js").then((m) => m.gathering(a)),
  zone: (a) => import("./sections/zone.js").then((m) => m.zone(a)),
  drops: (a) => import("./sections/drops.js").then((m) => m.drops(a)),
};
// our work moved to the Watcher's Console (session 95, the user: the Archive is the game's database): an old link lands there on
// this Mac, on the home page in the public copy
const MOVED = { changes: "changes", change: "changes", review: "review", interface: "interface", spec: "interface", about: "about", plan: "plans" };   // the plan: session 96
async function route() {
  const h = hashPath();
  teardown();   // the last page's 3D: its viewer and WebGL context given back (session 100)
  try {
    if (!base.changes) { const cd = await load("changes"); base.changes = new Map(cd.changes.map((c) => [c.id, c])); base.areas = Object.fromEntries(cd.areas); }
    const [sec, arg] = [h.split("/")[0], h.split("/").slice(1).join("/")];
    if (MOVED[sec] && LOCAL) { location.replace(`http://localhost:8777/#${MOVED[sec]}`); return; }
    const go = (LOCAL || !LOCAL_ONLY.has(sec)) && ROUTES[sec] || home;
    if (!LOCAL_ONLY.has(sec)) leftBook();
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
const TABBED = { flightpaths: 1, races: 1, mounts: 1, itemsets: 1, items: 1, npcs: 1, quests: 1, zones: 1, factions: 2, chests: 1, loot: 2, professions: 1 };
const TAB_FIRST = { flightpaths: 0, races: 0, mounts: 0, itemsets: 0, factions: 2, loot: 2, items: 1, npcs: 1, quests: 1, zones: 1, chests: 1, professions: 1 };
const shortTitle = (t) => t.replace(/^What is easy to change, and what to leave$/, "What can change").replace(/^The rules (we changed )?for all (reputation|creatures)$/, "Rules for all")
  .replace(/\s*\(docs\/open-items\.md\)$/, "").replace(/^The /, "").replace(/^./, (c) => c.toUpperCase());
function applyTabs() {
  const sec = hashPath().split("/")[0] || "";
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
new MutationObserver(() => { publicPass(page); applyTabs(); tails(page); foldFilters(page); titleIcon(page, hashPath().split("/")[0]); }).observe(page, { childList: true });

wireShell();
wireFind();
wireTips();      // the game's tooltips on anything with data-item (session 99)
wireLive(route);   // the game's changes, offered as they are rebuilt (session 99)
wire3d(page);      // creatures in 3D wherever a page puts a stage (session 100)
window.addEventListener("hashchange", route);
route();
