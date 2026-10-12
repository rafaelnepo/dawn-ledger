import { STATUS, cache, chgs, esc, fmt, load, page, status } from "../core.js";
import { mdRender } from "../markdown.js";
import { leversPanel, table, wireTable, nav } from "../ui.js";

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
    ["changes", "Changes", "", (p) => p.changes.length, (p) => chgs(p.changes) + (p.tradeskill_db ? `<a class="badge" href="http://127.0.0.1:8790/" target="_blank" rel="noopener">Tradeskill DB</a>` : "")],
    ["status", "Status", "", (p) => Object.keys(STATUS).indexOf(p.status), (p) => status(p.status)],
  ];
  page.innerHTML = `<h1 class="display">Professions</h1>
    <p class="lead">Every craft, the gathering skills and the rogue’s: how many recipes and trainers, where its recipe items come from,
    how many nodes stand in the world, and what we changed. ${esc(d.plan)}</p>
    ${leversPanel("professions")}<h2 class="sec">The professions</h2>
    <div class="panel">${table("tprof", cols, [["Crafts", d.professions.filter((p) => ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Leatherworking", "Tailoring"].includes(p.name))],
      ["Gathering", d.professions.filter((p) => ["Herbalism", "Mining", "Skinning"].includes(p.name))],
      ["Secondary", d.professions.filter((p) => ["Cooking", "First Aid", "Fishing"].includes(p.name))],
      ["The rogue’s", d.professions.filter((p) => ["Lockpicking", "Poisons"].includes(p.name))]], {})}</div>
    ${(d.plans || []).length ? `<h2 class="sec">The plan</h2>
    <div class="panel">${d.plans.map((p) => `<div class="panel-body" style="border-bottom:1px solid var(--rule)"><a class="white" href="#/plan/${encodeURIComponent(p.file)}">${esc(p.title)}</a><span class="sub note">docs/research/professions/${esc(p.file)}</span></div>`).join("")}</div>` : ""}`;
  wireTable("tprof", professions, [], {});
}
// a file of the professions plan (session 78), as a spec page
export async function planPage(name) {
  nav("professions");
  const r = await fetch(`data/ledger/plans/${encodeURIComponent(name)}`, { cache: "no-cache" });
  if (!r.ok) { page.innerHTML = `<p class="empty">No plan file called ${esc(name)}. Build it with <code>python3 dbsite/build/ledger.py</code>.</p>`; return; }
  page.innerHTML = `<p class="crumbs"><a href="#/professions">Professions</a> · <span class="white">The plan</span></p>
    <article class="spec panel">${mdRender(await r.text()).replace("</h2>", `</h2><p class="srcline"><code>docs/research/professions/${esc(name)}</code></p>`)}</article>`;
  // the plan's links to its own files open them here (mdRender made them spec links, or left them as file names)
  const files = new Set(((await load("professions")).plans || []).map((p) => p.file));
  page.querySelectorAll("article a[href]").forEach((a) => {
    const h = a.getAttribute("href"), f = decodeURIComponent(h.replace(/^#\/spec\//, "").replace(/#.*$/, ""));
    if (files.has(f)) a.setAttribute("href", "#/plan/" + encodeURIComponent(f));
  });
  window.scrollTo(0, 0);
}
