import { STATUS, STATUS_TIP, base, esc, fmt, lever, load, page, short, status, statusCounts } from "../core.js";
import { LOCAL } from "../build.js";
import { nav } from "../ui.js";

// ---------- home: the ledger's contents (session 84), each section a line with dotted leaders to its count, its status tallies under it ----------
export async function home() {
  nav("");
  const names = ["changes", "factions", "chests", "loot", "items", "npcs", "quests", "zones", "professions", "pvp", "interface", "review"];
  const D = Object.fromEntries(await Promise.all(names.map((n) => load(n).then((d) => [n, d]))));
  const tallies = (xs) => { const n = statusCounts(xs); return Object.keys(STATUS).filter((k) => n[k]).map((k) => `${status(k)}<span class="tc">${fmt(n[k])}</span>`).join(""); };
  const kinds = statusCounts(D.changes.changes.map((x) => x.kind));
  const facs = D.factions.groups.flatMap((g) => g.factions);
  const newest = D.changes.changes[0];
  const line = (k, title, n, unit, about, ts) => `<li><a class="te" href="#/${k}"><span class="tt">${title}</span><span class="tl" aria-hidden="true"></span>
    <span class="tn">${n}<small>${unit}</small></span></a><p class="td">${about}</p>${ts ? `<div class="ts">${ts}</div>` : ""}</li>`;
  page.innerHTML = `<h1>The Archive of Norgannon</h1>
    <p class="preface">${LOCAL
      ? "This server’s data as it stands, beside every change we made to it: what each patch touched and why, what is easy to change and what to leave alone, and what still waits for a look. For one player on this server, and for Claude, to turn to before changing anything."
      : "Dawn is a World of Warcraft Classic server for a single player. This archive shows its data as it stands, read from the server itself, beside every change made to fit the game to one person: what each change touched and why, how hard a change is, and what still waits for a look."}</p>
    <div class="toc">
      <section class="wide"><h2 class="sec">Our work</h2><ol class="c3">
        ${line("changes", "Changes", fmt(D.changes.changes.length), "patches", `${["world", "character", "realm", "server", "proxy", "config"].filter((k) => kinds[k]).map((k) => `${kinds[k]} ${k}`).join(", ")}. The newest: <a class="badge" href="#/change/${encodeURIComponent(newest.id)}">${esc(short(newest.id))}</a> ${esc((newest.copy && newest.copy.title) || newest.title)}.`)}
        ${line("review", "Review", fmt(D.review.items.length), "waiting", "Everything set to review or decided and not yet applied, the findings still open, and the open items’ headlines.", tallies(D.review.items.map((x) => x.status)))}
        ${line("interface", "Interface", esc(D.interface.version), "Forever UI", `${D.interface.files.length} files, ${D.interface.previews.length} previews and ${D.interface.specs.length} specs, as modules by what they serve.`)}
      </ol>
      </section>
      <section class="wide"><h2 class="sec">The game</h2><ol class="c2">
        ${line("items", "Items", fmt(D.items.items.length), "items", "Where each comes from, what it costs, and the ones the client shows from our own copy.", tallies(D.items.items.map((x) => x[12])))}
        ${line("npcs", "NPCs", fmt(D.npcs.npcs.length), "creatures", "Everyone standing in the world: what they do for you, where, and how many.", tallies(D.npcs.npcs.map((x) => x[12])))}
        ${line("quests", "Quests", fmt(D.quests.quests.length), "quests", `What each pays, reputation included; ${fmt(D.quests.quests.filter((q) => q[15]).length)} of them are ours.`, tallies(D.quests.quests.map((x) => x[14])))}
        ${line("zones", "Zones", fmt(D.zones.zones.length), "zones", "The capitals, the lands and the dungeons, with their people, quests, chests and changes.", tallies(D.zones.zones.map((x) => x.status)))}
        ${line("factions", "Factions", fmt(facs.length), "reputations", "Where each one starts and what raises it on this server.", tallies(facs.map((x) => x.status)))}
        ${line("chests", "Chests and boxes", fmt(D.chests.chests.length), "kinds", "Every chest, footlocker and box: where, how many, how soon it returns, and what it holds.", tallies(D.chests.chests.map((x) => x.status)))}
        ${line("loot", "Loot", fmt(D.loot.creatures.length), "creatures", `What every creature drops, from the server’s own tables; ${D.loot.rules.length} rules for all.`, tallies(D.loot.creatures.map((x) => x[11])))}
        ${line("professions", "Professions", fmt(D.professions.professions.length), "skills", "The crafts, the gathering skills and the rogue’s: recipes, trainers and where recipes come from.", tallies(D.professions.professions.map((x) => x.status)))}
        ${line("pvp", "PvP and honor", "14", "ranks", `The ranks and their rewards, ${D.pvp.battlegrounds.length} battlegrounds and the bots that fill them, ${D.pvp.changes.length} changes.`)}
      </ol></section>
    </div>
    <h2 class="sec">How to read it</h2>
      <div class="keys"><div><h3>Each entry’s status</h3><dl>${Object.keys(STATUS).map((k) => `<dt>${status(k)}</dt><dd>${STATUS_TIP[k]}.</dd>`).join("")}</dl></div>
        <div><h3>How hard a change is</h3><dl>${base.levers.scale.map((s) => `<dt>${lever(s[0])}</dt><dd>${esc(s[2])}</dd>`).join("")}</dl></div></div>
`;
}
