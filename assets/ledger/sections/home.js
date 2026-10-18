import { fmt, load, page } from "../core.js";
import { LOCAL } from "../build.js";
import { nav, NAV, LOCAL_ONLY } from "../ui.js";

// ---------- home: the Archive's contents (session 84), each section a line with dotted leaders to its count (the stamps' tallies and the
// key left for the Watcher's Console, session 95), by the rail's categories since session 98 ----------
export async function home() {
  nav("");
  const names = ["factions", "chests", "loot", "items", "npcs", "quests", "zones", "professions", "pvp", "flightpaths", "races", "classes", "mounts", "itemsets", "books"];
  const D = Object.fromEntries(await Promise.all(names.map((n) => load(n).then((d) => [n, d]))));
  const facs = D.factions.groups.flatMap((g) => g.factions);
  const line = (k, title, n, unit, about, ts) => `<li><a class="te" href="#/${k}"><span class="tt">${title}</span><span class="tl" aria-hidden="true"></span>
    <span class="tn">${n}<small>${unit}</small></span></a><p class="td">${about}</p>${ts ? `<div class="ts">${ts}</div>` : ""}</li>`;
  const book = (u, title, about) => `<li><a class="te" href="${u}"><span class="tt">${title}</span><span class="tl" aria-hidden="true"></span>
    <span class="tn"><small>book</small></span></a><p class="td">${about}</p></li>`;
  const soon = (k, title, about) => `<li><a class="te" href="#/${k}"><span class="tt">${title}</span><span class="tl" aria-hidden="true"></span>
    <span class="tn"><small>planned</small></span></a><p class="td">${about}</p></li>`;
  const LINES = {
    items: () => line("items", "Items", fmt(D.items.items.length), "items", "Where each comes from, what it costs, and the ones the client shows from our own copy."),
    npcs: () => line("npcs", "NPCs", fmt(D.npcs.npcs.length), "creatures", "Everyone standing in the world: what they do for you, where, and how many."),
    quests: () => line("quests", "Quests", fmt(D.quests.quests.length), "quests", `What each pays, reputation included; ${fmt(D.quests.quests.filter((q) => q[15]).length)} of them are ours.`),
    zones: () => line("zones", "Zones", fmt(D.zones.zones.length), "zones", "The capitals, the lands and the dungeons, with their people, quests, chests and changes."),
    factions: () => line("factions", "Factions", fmt(facs.length), "reputations", "Where each one starts and what raises it on this server."),
    chests: () => line("chests", "Chests and boxes", fmt(D.chests.chests.length), "kinds", "Every chest, footlocker and box: where, how many, how soon it returns, and what it holds."),
    loot: () => line("loot", "Loot", fmt(D.loot.creatures.length), "creatures", `What every creature drops, from the server’s own tables; ${D.loot.rules.length} rules for all.`),
    professions: () => line("professions", "Professions", fmt(D.professions.professions.length), "skills", "The crafts, the gathering skills and the rogue’s: recipes, trainers and where recipes come from."),
    pvp: () => line("pvp", "PvP and honor", "14", "ranks", `The ranks and their rewards, ${D.pvp.battlegrounds.length} battlegrounds and the bots that fill them, ${D.pvp.changes.length} changes.`),
    dungeons: () => book("#/dungeons", "Dungeons", "Every dungeon and raid by level: its door, its masters, what they guard."),
    festivals: () => book("#/festivals", "Festivals", "The year’s festivals: when, where, who to find and what they ask."),
    beasts: () => book("#/beasts", "Beasts", "Every beast of the world by family: where each roams, what a hunter can learn from it."),
    drops: () => book("#/drops", "Drops", "What each creature drops, its chance and the world’s rarer finds."),
    trainers: () => book("#/trainers", "Trainers", "Where to learn each profession, from Apprentice to Artisan."),
    gathering: () => book("#/gathering", "Gathering", "Herbs, veins, hides and waters by the skill they ask and where they are."),
    lockpicking: () => book("#/lockpicking", "Lockpicking", "Every box and lock by skill, and where a rogue practices."),
    flightpaths: () => line("flightpaths", "Flight paths", fmt(D.flightpaths.points.length), "points", "Every flight master and the routes between them, with what each flight costs."),
    itemsets: () => line("itemsets", "Item sets", D.itemsets.sets.length, "sets", "The sets of gear that belong together, their pieces and their bonuses."),
    books: () => line("books", "Books", D.books.books.length, "to read", "Every book, letter and plaque you can read in the world, and where it lies."),
    classes: () => line("classes", "Classes", D.classes.classes.length, "classes", "Each class: what it can wear, its spells by level and its talents."),
    races: () => line("races", "Races", D.races.races.length, "races", "Each race: where it begins, its racial traits, its capital and its classes."),
    mounts: () => line("mounts", "Mounts", D.mounts.mounts.length, "mounts", `Every mount and ${D.mounts.companions.length} companions: where each is bought or found.`),
  };
  page.innerHTML = `<h1>The Archive of Norgannon</h1>
    <p class="preface">${LOCAL
      ? "The game’s data as this server holds it, read from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what we changed. Our work on it lives in the Watcher’s Console."
      : "Dawn is a World of Warcraft Classic server for a single player. This archive is its game data as the server holds it, read from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what was changed to fit the game to one person."}</p>
    <div class="toc">${NAV.map(([h, xs]) => {
      const rows = xs.filter(([k]) => LOCAL || (k[0] !== "@" && !LOCAL_ONLY.has(k))).map(([k, t]) => LINES[k] ? LINES[k]() : "").join("");
      return rows ? `<section><h2 class="sec">${h}</h2><ol class="c1">${rows}</ol></section>` : "";
    }).join("")}
    </div>
`;
}
