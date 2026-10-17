import { cache, chgs, esc, fmt, load, page } from "../core.js";
import { table, wireTable, nav } from "../ui.js";

// ---------- professions ----------
export async function professions() {
  nav("professions");
  const d = await load("professions");
  const rs = (r) => (r ? `${r.items} items<span class="sub">${[["vendors", r.vendors], ["drops", r.drops], ["quests", r.quests], ["chests and boxes", r.chests]].filter(([, n]) => n).map(([k, n]) => `${n} from ${k}`).join(" · ")}</span>` : "");
  const cols = [
    ["name", "Profession", "nm", (p) => p.name, (p) => `${esc(p.name)}<span class="sub solo">${esc(p.note)}</span>`],
    ["recipes", "Recipes", "num", (p) => p.recipes, (p) => fmt(p.recipes)],
    ["trainers", "Trainers", "num", (p) => p.trainers || 0, (p) => (p.trainers == null ? "" : fmt(p.trainers))],
    ["items", "Recipe items", "hide-sm", (p) => (p.recipe_items ? p.recipe_items.items : 0), (p) => rs(p.recipe_items)],
    ["nodes", "In the world", "num hide-sm", (p) => p.nodes || 0, (p) => (p.nodes ? `${fmt(p.nodes)}<span class="sub">${p.name === "Skinning" ? "skinnable kinds" : p.name === "Fishing" ? "schools" : "nodes"}</span>` : "")],
    ["changes", "Changes", "", (p) => p.changes.length, (p) => chgs(p.changes) + (p.tradeskill_db ? `<a class="badge" href="tradeskill/index.html">Tradeskill DB</a>` : "")],
  ];
  page.innerHTML = `<h1 class="display">Professions</h1>
    <p class="lead">Every craft, the gathering skills and the rogue’s: recipes, trainers, where recipes come from and the nodes in the world.</p>
    <h2 class="sec">The professions</h2>
    <div class="panel">${table("tprof", cols, [["Crafts", d.professions.filter((p) => ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Leatherworking", "Tailoring"].includes(p.name))],
      ["Gathering", d.professions.filter((p) => ["Herbalism", "Mining", "Skinning"].includes(p.name))],
      ["Secondary", d.professions.filter((p) => ["Cooking", "First Aid", "Fishing"].includes(p.name))],
      ["The rogue’s", d.professions.filter((p) => ["Lockpicking", "Poisons"].includes(p.name))]], {})}</div>`;
  wireTable("tprof", professions, [], {});
}
