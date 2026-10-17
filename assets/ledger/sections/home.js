import { fmt, load, page } from "../core.js";
import { LOCAL } from "../build.js";
import { nav } from "../ui.js";

// ---------- home: the Archive's contents (session 84), each section a line with dotted leaders to its count (the stamps' tallies and the
// key left for the Watcher's Console, session 95) ----------
export async function home() {
  nav("");
  const names = ["factions", "chests", "loot", "items", "npcs", "quests", "zones", "professions", "pvp"];
  const D = Object.fromEntries(await Promise.all(names.map((n) => load(n).then((d) => [n, d]))));
  const facs = D.factions.groups.flatMap((g) => g.factions);
  const line = (k, title, n, unit, about, ts) => `<li><a class="te" href="#/${k}"><span class="tt">${title}</span><span class="tl" aria-hidden="true"></span>
    <span class="tn">${n}<small>${unit}</small></span></a><p class="td">${about}</p>${ts ? `<div class="ts">${ts}</div>` : ""}</li>`;
  page.innerHTML = `<h1>The Archive of Norgannon</h1>
    <p class="preface">${LOCAL
      ? "The game’s data as this server holds it, read from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what we changed. Our work on it lives in the Watcher’s Console."
      : "Dawn is a World of Warcraft Classic server for a single player. This archive is its game data as the server holds it, read from its own database: every item, creature, quest, place and reputation, what each drops and pays, and the marks of what was changed to fit the game to one person."}</p>
    <div class="toc">
      <section class="wide"><h2 class="sec">The game</h2><ol class="c2">
        ${line("items", "Items", fmt(D.items.items.length), "items", "Where each comes from, what it costs, and the ones the client shows from our own copy.")}
        ${line("npcs", "NPCs", fmt(D.npcs.npcs.length), "creatures", "Everyone standing in the world: what they do for you, where, and how many.")}
        ${line("quests", "Quests", fmt(D.quests.quests.length), "quests", `What each pays, reputation included; ${fmt(D.quests.quests.filter((q) => q[15]).length)} of them are ours.`)}
        ${line("zones", "Zones", fmt(D.zones.zones.length), "zones", "The capitals, the lands and the dungeons, with their people, quests, chests and changes.")}
        ${line("factions", "Factions", fmt(facs.length), "reputations", "Where each one starts and what raises it on this server.")}
        ${line("chests", "Chests and boxes", fmt(D.chests.chests.length), "kinds", "Every chest, footlocker and box: where, how many, how soon it returns, and what it holds.")}
        ${line("loot", "Loot", fmt(D.loot.creatures.length), "creatures", `What every creature drops, from the server’s own tables; ${D.loot.rules.length} rules for all.`)}
        ${line("professions", "Professions", fmt(D.professions.professions.length), "skills", "The crafts, the gathering skills and the rogue’s: recipes, trainers and where recipes come from.")}
        ${line("pvp", "PvP and honor", "14", "ranks", `The ranks and their rewards, ${D.pvp.battlegrounds.length} battlegrounds and the bots that fill them, ${D.pvp.changes.length} changes.`)}
      </ol></section>
    </div>
`;
}
