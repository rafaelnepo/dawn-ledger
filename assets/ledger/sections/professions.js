import { chgs, esc, fmt, load, page, ROOT } from "../core.js";
import { table, wireTable, nav } from "../ui.js";
import { LOCAL } from "../build.js";
import { icon } from "../kit/icon.js";
import { viewOf, viewToggle, wireView } from "../kit/gallery.js";

// ---------- Professions (session 99: the Tradeskill DB folded in) ----------
// #/professions: every profession as a card (its trade icon, its recipes, trainers, recipe items and nodes), the table on the switch;
// #/professions/<craft>[/<classic|forever|changes>/<step>]: a craft rank by rank in one game at a time (sections/craft.js, the
// Tradeskill DB's journey); #/professions/<craft>/table: its every recipe of both games side by side (sections/crafttable.js). The
// crafts' pages are this Mac's (their data in tradeskill/data/, their icons Blizzard's); the public copy keeps the list.
const CRAFT = { Alchemy: "alchemy", Blacksmithing: "blacksmithing", Enchanting: "enchanting", Engineering: "engineering", Leatherworking: "leatherworking",
  Tailoring: "tailoring", Cooking: "cooking", "First Aid": "first-aid", Mining: "mining" };
const ELSEWHERE = { Herbalism: "#/gathering/herbs", Skinning: "#/gathering/skinning", Fishing: "#/gathering/fishing", Lockpicking: "#/lockpicking" };
const ICON = { Alchemy: "Trade_Alchemy", Blacksmithing: "Trade_BlackSmithing", Enchanting: "Trade_Engraving", Engineering: "Trade_Engineering",
  Leatherworking: "Trade_LeatherWorking", Tailoring: "Trade_Tailoring", Herbalism: "Trade_Herbalism", Mining: "Trade_Mining", Skinning: "INV_Misc_Pelt_Wolf_01",
  Cooking: "INV_Misc_Food_15", "First Aid": "Spell_Holy_SealOfSacrifice", Fishing: "Trade_Fishing", Lockpicking: "Spell_Nature_MoonKey", Poisons: "Trade_BrewPoison" };
const GROUPS = [["Crafts", ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Leatherworking", "Tailoring"]], ["Gathering", ["Herbalism", "Mining", "Skinning"]],
  ["Secondary", ["Cooking", "First Aid", "Fishing"]], ["The rogue’s", ["Lockpicking", "Poisons"]]];
const href = (name) => (!LOCAL ? null : CRAFT[name] ? `#/professions/${CRAFT[name]}` : ELSEWHERE[name] || null);

export async function professions(arg) {
  nav("professions");
  if (arg && LOCAL) return craftPage(arg);
  const d = await load("professions");
  const render = () => {
    const cards = viewOf("professions") === "cards";
    const rs = (r) => (r ? `${r.items} items<span class="sub">${[["vendors", r.vendors], ["drops", r.drops], ["quests", r.quests], ["chests and boxes", r.chests]].filter(([, n]) => n).map(([k, n]) => `${n} from ${k}`).join(" · ")}</span>` : "");
    const cols = [
      ["name", "Profession", "nm", (p) => p.name, (p) => `<span class="iname">${icon(ICON[p.name], { size: "s" })}<span>${href(p.name) ? `<a href="${href(p.name)}">${esc(p.name)}</a>` : esc(p.name)}<span class="sub solo">${esc(p.note)}</span></span></span>`],
      ["recipes", "Recipes", "num", (p) => p.recipes, (p) => fmt(p.recipes)],
      ["trainers", "Trainers", "num", (p) => p.trainers || 0, (p) => (p.trainers == null ? "" : fmt(p.trainers))],
      ["items", "Recipe items", "hide-sm", (p) => (p.recipe_items ? p.recipe_items.items : 0), (p) => rs(p.recipe_items)],
      ["nodes", "In the world", "num hide-sm", (p) => p.nodes || 0, (p) => (p.nodes ? `${fmt(p.nodes)}<span class="sub">${p.name === "Skinning" ? "skinnable kinds" : p.name === "Fishing" ? "schools" : "nodes"}</span>` : "")],
      ["changes", "Changes", "", (p) => p.changes.length, (p) => chgs(p.changes)],
    ];
    const card = (p) => {
      const facts = [p.recipes ? `${fmt(p.recipes)} recipes` : "", p.trainers ? `${fmt(p.trainers)} trainers` : "", p.nodes ? `${fmt(p.nodes)} ${p.name === "Skinning" ? "skinnable kinds" : p.name === "Fishing" ? "schools" : "nodes"}` : ""].filter(Boolean).join(" · ");
      const inner = `${icon(ICON[p.name], { size: "l" })}<span class="in">${esc(p.name)}</span><span class="is">${esc(facts)}</span>`;
      return href(p.name) ? `<a class="icard pcard" href="${href(p.name)}">${inner}</a>` : `<div class="icard pcard">${inner}</div>`;
    };
    const groups = GROUPS.map(([t, names]) => [t, d.professions.filter((p) => names.includes(p.name))]);
    page.innerHTML = `<h1 class="display">Professions</h1>
      <p class="lead">${LOCAL ? "Every craft and gathering skill, rank by rank: its recipes and trainers, here and in WoW Forever." : "Every craft and gathering skill: its recipes, its trainers and where each recipe comes from."}</p>
      <h2 class="sec">The professions</h2>
      <div class="filters">${viewToggle("professions")}</div>
      ${cards ? groups.map(([t, ps]) => `<h3 class="grp-h">${esc(t)}</h3><div class="ggrid pgrid">${ps.map(card).join("")}</div>`).join("")
        : `<div class="panel">${table("tprof", cols, groups, {})}</div>`}`;
    wireView(page, "professions", render);
    if (!cards) wireTable("tprof", render, [], {});
  };
  render();
}

// ---------- one craft: the Tradeskill DB's libraries loaded once, its data, its journey or its table ----------
let libs = null;
const script = (src) => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => no(new Error(src)); document.head.append(s); });
const loadLibs = () => (libs = libs || script(`${ROOT}tradeskill/assets/tooltip.js`).then(() => script(`${ROOT}tradeskill/assets/wowframe.js`)).then(() => { window.TSDB_BASE = ROOT + "tradeskill/"; }));
const data = {};
async function craftPage(arg) {
  const [slug, a, b] = arg.split("/");
  try {
    await loadLibs();
    data[slug] = data[slug] || await fetch(`${ROOT}tradeskill/data/${slug}.json`, { cache: "no-cache" }).then((r) => { if (!r.ok) throw new Error(`tradeskill/data/${slug}.json ${r.status}`); return r.json(); });
  } catch (e) {
    page.innerHTML = `<p class="empty">This craft couldn’t be read (${esc(e.message)}). Build it with <code>python3 tradeskill-db/build/build.py</code>.</p>`;
    return;
  }
  const back = `<p class="crumbs"><a href="#/professions">Professions</a> · <span class="white">${esc(data[slug].profession.name)}</span></p>`;
  if (a === "table") {
    page.innerHTML = `<div class="tsdb">${back}<div class="wrap"><header class="site"><a class="brand" href="#/professions/${slug}">the journey</a>
      <h1 id="title"></h1><span class="sub">Classic Era 1.14.2 (the local server) compared with WoW Forever (its own game files)</span></header>
      <div class="tiles" id="tiles"></div>
      <div class="filters"><input id="q" type="search" placeholder="Search recipes" aria-label="Search recipes"><div class="seg" id="brackets" aria-label="Skill bracket"></div><span class="count" id="count"></span></div>
      <div class="tablewrap"><table><thead><tr><th>Recipe</th><th colspan="2" class="side">1.14.2: learn at · yellow / green / grey · source</th>
        <th colspan="2" class="side">Forever: yellow / green / grey · category · source</th><th>Reagents</th><th>What changed</th></tr></thead>
        <tbody id="rows"></tbody></table></div>
      <footer>Hover an item or a reagent for its tooltip; with both clients shown, highlighted lines differ and struck-through lines exist only in the other client.
        Forever’s stats and armor are computed from its item level and quality as its client does; its durability and the source of its patterns are not in its game
        files. Forever’s tables also hold <span id="sod">?</span> Season of Discovery recipes, left out here. Data built <span id="generated">?</span>.</footer></div></div>`;
    const { recipeTable } = await import("./crafttable.js");
    recipeTable(page.querySelector(".tsdb"), slug, data[slug]);
    return;
  }
  page.innerHTML = `<div class="tsdb">${back}<header class="jhead"><div class="jtop"><div class="envs" role="tablist" aria-label="Game">
      <button role="tab" data-env="old">Classic Era 1.14.2</button><button role="tab" data-env="new">WoW Forever</button><button role="tab" data-env="changes">What changed</button></div>
      <a class="brand" href="#/professions/${slug}/table">every recipe in one table</a></div>
    <h1 class="display" id="title"></h1><p class="lede" id="lede"></p><nav class="chapters" id="chapters"></nav></header>
    <main id="journey"></main>
    <footer class="wrap">Hover an icon or a name for its tooltip. The 1.14.2 side is the local server (its trainers, vendors, quests and loot); the Forever side is
      WoW Forever’s own game files, which don’t say where a trainer is or what a recipe costs to learn: a Forever recipe’s learn skill is its pattern’s, marked ≈ when
      estimated. Data built <span id="generated">?</span>.</footer></div>`;
  const { journey } = await import("./craft.js");
  journey(page.querySelector(".tsdb"), slug, data[slug], { game: a, step: b });
}
