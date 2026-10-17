import { chgs, esc, load, uniq } from "../core.js";
import { listPage, nav } from "../ui.js";

// ---------- NPCs ----------
export async function npcs() {
  nav("npcs");
  const d = await load("npcs");
  listPage({
    sec: "npcs", title: "NPCs", unit: "creatures", listTitle: "The creatures in the world", placeholder: "Search a name or title…", levers: "npcs",
    lead: `Every creature standing in the world: its level, rank and side, what it does for you, where it stands and how many.`,
    rows: d.npcs, key: (r) => r[0], text: (r) => r[1] + " " + r[2],
    filters: [{ k: "zone", label: "Every zone", values: uniq(d.npcs.map((r) => r[9])), get: (r) => r[9] },
      { k: "side", label: "Every side", values: ["Alliance", "Horde", "Both", "Neutral", "Hostile"], get: (r) => r[7] },
      { k: "role", label: "Every role", values: uniq(d.npcs.flatMap((r) => r[8])), get: (r) => r[8] },
      { k: "rank", label: "Every rank", values: uniq(d.npcs.map((r) => r[5])), get: (r) => r[5] },
      { k: "type", label: "Every type", values: uniq(d.npcs.map((r) => r[6])), get: (r) => r[6] }],
    checks: [{ k: "changed", label: "Changed only", test: (r) => r[11].length }, { k: "scripted", label: "Scripted", test: (r) => r[13] }],
    cols: [
      ["name", "NPC", "nm", (r) => r[1], (r) => `${esc(r[1])}${r[2] ? `<span class="sub">&lt;${esc(r[2])}&gt;</span>` : ""}`],
      ["level", "Level", "num", (r) => r[3], (r) => (r[3] === r[4] ? r[3] : `${r[3]}–${r[4]}`)],
      ["rank", "Rank", "hide-sm", (r) => r[5], (r) => esc(r[5])],
      ["side", "Side", "", (r) => r[7], (r) => `<span class="side ${esc(r[7])}">${esc(r[7])}</span>`],
      ["roles", "Does", "hide-sm", (r) => r[8].join(), (r) => `<span class="note">${esc(r[8].join(", "))}</span>`],
      ["zone", "Zone", "hide-sm", (r) => r[9], (r) => esc(r[9])],
      ["spawns", "Spawns", "num", (r) => r[10], (r) => r[10] || ""],
      ["changes", "Changes", "", (r) => r[11].length, (r) => chgs(r[11])],
    ],
    more: (r) => `<div class="facts"><span class="k">In the database</span><span>creature ${r[0]}${r[13] ? `, scripted (${esc(r[13])})` : ""} · <a href="#/npc/${r[0]}">its own page</a></span>
      <span class="k">Type</span><span>${esc(r[6])}</span>
      ${r[11].length ? `<span class="k">Changed by</span><span>${chgs(r[11])}</span>` : ""}
      <span class="k">Its drops</span><span><a href="drops.html?c=${r[0]}">every drop and its chance</a></span></div>`,
  });
}
