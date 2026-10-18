import { ROOT, esc, fmt, json, load, page } from "../core.js";
import { LOCAL } from "../build.js";
import { nav, NAV, LOCAL_ONLY } from "../ui.js";

// ---------- home (session 84; session 100, the player's review): an "I want to…" row of big buttons, each a page with the right view; what
// changed in the game lately (refresh.json: the live refresh, this Mac only); then every section as a card with its ring icon (ours:
// assets/ledger/icons, tools/asset-extract/ring_icons.py), its count and a line, by the rail's categories ----------
const ic = (k) => `<img src="${ROOT}assets/ledger/icons/${k}.png" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
const WANT = [["npcs", "Find someone", "A vendor, a trainer, a flight master", "#/npcs"], ["itemsets", "Gear up my class", "The sets for your class, on your race", "#/itemsets"],
  ["zones", "Find a place to level", "The lands by your level and side", "#/zones"], ["dungeons", "Run a dungeon", "Its map, its bosses and their loot", "#/dungeons"],
  ["professions", "Learn a craft", "Recipes, trainers and where recipes drop", "#/professions"], ["mounts", "Get a mount", "Where each is bought or earned", "#/mounts"],
  ["quests", "Find a quest", "By zone, side, class and kind", "#/quests"], ["loot", "Farm an item", "Who drops it and how often", "#/items"]];
const ago = (t) => { const s = Date.now() / 1000 - t; return s < 90 ? "just now" : s < 3600 ? `${Math.round(s / 60)} minutes ago` : s < 86400 ? `${Math.round(s / 3600)} hours ago` : `${Math.round(s / 86400)} days ago`; };
export async function home() {
  nav("");
  const names = ["factions", "chests", "loot", "items", "npcs", "quests", "zones", "professions", "pvp", "flightpaths", "races", "classes", "mounts", "itemsets", "books"];
  const [D, live] = await Promise.all([Promise.all(names.map((n) => load(n).then((d) => [n, d]))).then(Object.fromEntries),
    LOCAL ? json(`${ROOT}data/refresh.json`).catch(() => null) : null]);
  const facs = D.factions.groups.flatMap((g) => g.factions);
  // each section's card: its count and its line
  const CARD = {
    items: [fmt(D.items.items.length), "items", "Where each comes from, how likely, what it costs."],
    npcs: [fmt(D.npcs.npcs.length), "creatures", "What each does for you, where it stands, what it sells and teaches."],
    quests: [fmt(D.quests.quests.length), "quests", "Who gives each, what it asks and pays, its chain."],
    zones: [fmt(D.zones.zones.filter((z) => z.kind !== "dungeon").length), "lands", "Each land’s map with its people, tasks and finds."],
    factions: [fmt(facs.length), "reputations", "Where each starts and what raises it."],
    chests: [fmt(D.chests.chests.length), "kinds", "Every chest and box: where, how soon it returns, what it holds."],
    loot: [fmt(D.loot.creatures.length), "creatures", "What every creature drops, every kill."],
    professions: [fmt(D.professions.professions.length), "skills", "Every craft rank by rank: recipes and trainers."],
    pvp: ["14", "ranks", "The ranks and their rewards, the battlegrounds."],
    flightpaths: [fmt(D.flightpaths.points.length), "points", "Every flight master and what each flight costs."],
    itemsets: [D.itemsets.sets.length, "sets", "The sets by class, on your race, every bonus."],
    books: [D.books.books.length, "to read", "Every book, letter and plaque, and where it lies."],
    classes: [D.classes.classes.length, "classes", "What each wears, its spells by level, its talents."],
    races: [D.races.races.length, "races", "Where each begins, its traits and its capital."],
    mounts: [D.mounts.mounts.length, "mounts", `And ${D.mounts.companions.length} companions: where each is found.`],
    dungeons: ["", "", "Every dungeon and raid: its map, its bosses, their loot."],
    festivals: ["", "", "The year’s festivals: when, where and what they ask."],
    beasts: ["", "", "Every beast by family, in 3D: where it roams."],
    trainers: ["", "", "Where to learn each profession, step by step."],
    gathering: ["", "", "Herbs, veins, hides and waters by skill."],
    lockpicking: ["", "", "Every box and lock by skill."],
  };
  const card = ([k, t]) => { const c = CARD[k]; return c ? `<a class="hcard" href="#/${k}">${ic(k)}<span class="ht">${esc(t)}</span>` +
    `${c[0] !== "" ? `<span class="hn num">${c[0]} <small>${c[1]}</small></span>` : ""}<span class="hd">${esc(c[2])}</span></a>` : ""; };
  // what changed in the game lately (the live refresh: the sections rebuilt from the world's tables in the last week)
  const label = Object.fromEntries(NAV.flatMap(([, xs]) => xs));
  const recent = live ? Object.entries(live.sections || {}).filter(([k, t]) => label[k] && Date.now() / 1000 - t < 7 * 86400).sort((a, b) => b[1] - a[1]) : [];
  const strip = recent.length ? `<div class="hlive"><span class="hlt">Changed in the game</span>${recent.slice(0, 8).map(([k, t]) =>
    `<a class="hlc" href="#/${k}">${ic(k)}<span>${esc(label[k])}</span><span class="note">${ago(t)}</span></a>`).join("")}</div>` : "";
  const want = WANT.filter(([k]) => LOCAL || !LOCAL_ONLY.has(k));
  page.innerHTML = `<h1>The Archive of Norgannon</h1>
    <p class="preface">${LOCAL
      ? "The game’s data as this server holds it, read live from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what we changed. Our work on it lives in the Watcher’s Console."
      : "Dawn is a World of Warcraft Classic server for a single player. This archive is its game data as the server holds it, read from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what was changed to fit the game to one person."}</p>
    ${strip}
    <h2 class="sec">I want to…</h2>
    <div class="bigpick hwant">${want.map(([k, t, d, href]) => `<a class="bigbtn" href="${href}">${ic(k)}<span class="bt">${esc(t)}</span><span class="bn">${esc(d)}</span></a>`).join("")}</div>
    ${NAV.map(([h, xs]) => {
      const rows = xs.filter(([k]) => LOCAL || (k[0] !== "@" && !LOCAL_ONLY.has(k))).map(card).join("");
      return rows ? `<h2 class="sec">${esc(h)}</h2><div class="hcards">${rows}</div>` : "";
    }).join("")}`;
}
