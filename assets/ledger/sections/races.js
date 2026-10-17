import { esc, load, page } from "../core.js";
import { table, wireTable, nav } from "../ui.js";

// ---------- races (session 99, the second of the categories' planned sections) ----------
// The eight races as the server makes them (ledger.py's races(): playercreateinfo, its spells, player_levelstats) and the client
// describes their traits: a card a race under its side, then the classes each may be and the attributes each starts with
const CLASSES = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"];

function card(r) {
  const by = {};
  r.reps.forEach(([id, name, st]) => (by[st] = by[st] || []).push(id === r.home ? `<a href="#/faction/${id}"><b>${esc(name)}</b></a>` : `<a href="#/faction/${id}">${esc(name)}</a>`));
  const reps = Object.entries(by).map(([st, xs]) => `<span><span class="note">${esc(st)}:</span> ${xs.join(", ")}</span>`).join("");
  const row = (l, v) => `<div class="mrow"><span class="ml">${l}</span><span class="mv">${v}</span></div>`;
  return `<article class="mod race side-${r.side.toLowerCase()}">
    <header><h3>${esc(r.name)}</h3><span class="side ${esc(r.side)}">${esc(r.side)}</span></header>
    ${row("Begins", `<span>${esc(r.start[0])}<span class="n">${esc(r.start[1])}</span></span>`)}
    ${row("Capital", esc(r.capital))}
    ${row("Classes", r.classes.map(esc).join(", "))}
    ${row("Speaks", r.languages.map(esc).join(", "))}
    ${row("Starts", reps)}
    <ul class="traits">${r.traits.map(([n, kind, text]) => `<li><b>${esc(n)}</b><span class="n">${kind}</span><span class="tt">${esc(text)}</span></li>`).join("")}</ul>
  </article>`;
}

export async function races() {
  nav("races");
  const d = await load("races");
  const sides = ["Alliance", "Horde"];
  const render = () => {
    // the classes each race may be
    const ccols = [["name", "Race", "nm nw", (r) => r.name, (r) => esc(r.name)],
      ...CLASSES.map((c) => [c, c, "ctr", (r) => (r.classes.includes(c) ? 0 : 1), (r) => (r.classes.includes(c) ? `<span class="yes" aria-label="yes">●</span>` : "")])];
    // a level 1 warrior's attributes (another class shifts every race by about the same, within a point or two), the highest of each marked
    const best = d.stats.map((_, i) => Math.max(...d.races.map((r) => r.stats[i])));
    const scols = [["name", "Race", "nm nw", (r) => r.name, (r) => esc(r.name)],
      ...d.stats.map((s, i) => [s, s, "num", (r) => -r.stats[i], (r) => (r.stats[i] === best[i] ? `<b>${r.stats[i]}</b>` : r.stats[i])])];
    const groups = sides.map((s) => [s, d.races.filter((r) => r.side === s)]);
    page.innerHTML = `<h1 class="display">Races</h1>
      <p class="lead">Each race: where it begins, its racial traits and its capital, the classes it may be and what it starts with.</p>
      <h2 class="sec">The races</h2>
      ${sides.map((s) => `<h3 class="grp-h">${s === "Alliance" ? "The Alliance" : "The Horde"}</h3><div class="mods races">${d.races.filter((r) => r.side === s).map(card).join("")}</div>`).join("")}
      <h2 class="sec">Classes</h2>
      <p class="note">The classes each race may choose when a character is made.</p>
      <div class="panel">${table("trclass", ccols, groups, {})}</div>
      <h2 class="sec">Attributes</h2>
      <p class="note">A level 1 warrior of each race, as the server makes one; another class shifts every race by about the same amount. The highest of each is in bold.</p>
      <div class="panel">${table("trstats", scols, groups, {})}</div>`;
    wireTable("trclass", render, [], {});
    wireTable("trstats", render, [], {});
  };
  render();
}
