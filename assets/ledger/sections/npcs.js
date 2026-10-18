import { chgs, esc, load } from "../core.js";
import { listPage, nav } from "../ui.js";
import { stage } from "../kit/model3d.js";
import { slug } from "../kit/filters.js";

// ---------- NPCs ----------
// (session 100: the visual view first, each creature its picture from the Dressing Room's models, its 3D button to turn it)
const SIDE_TITLE = { Alliance: "Friendly to the Alliance", Horde: "Friendly to the Horde", Neutral: "Neutral to both sides: it won’t attack first",
  Both: "Friendly to both sides", Hostile: "Can be attacked: hostile to both sides" };
const lv = (r) => (r[3] === r[4] ? r[3] : `${r[3]}–${r[4]}`);
const card = (r) => `<div class="ncard">${stage(r[0], { label: r[1] })}<a class="nb" href="#/npc/${r[0]}"><span class="in">${esc(r[1])}</span>` +
  `${r[2] ? `<span class="it">&lt;${esc(r[2])}&gt;</span>` : ""}<span class="is">${[`Level ${lv(r)}`, r[5], r[6], r[9]].filter(Boolean).map(esc).join(" · ")}</span></a></div>`;
export async function npcs() {
  nav("npcs");
  const d = await load("npcs");
  listPage({
    sec: "npcs", title: "NPCs", unit: "creatures", listTitle: "The creatures in the world", placeholder: "Search a name or title…", levers: "npcs",
    lead: `Every creature standing in the world: its level, rank and side, what it does for you, where it stands and how many.`,
    rows: d.npcs, key: (r) => r[0], text: (r) => r[1] + " " + r[2], card, gridCls: "ngrid",
    // the filter bar (session 100, kit/filters.js): the zone a dropdown, the rest the game's icons; "Hostile" set apart from the sides
    facets: [
      { k: "zone", label: "Zone", all: "Every zone", get: (r) => r[9] },
      { k: "side", label: "Side", icons: true, get: (r) => r[7], order: ["Alliance", "Horde", "Neutral", "Both"], apart: ["Hostile"],
        pic: (v) => "side-" + slug(v), title: (v) => SIDE_TITLE[v] || v },
      { k: "rank", label: "Rank", icons: true, get: (r) => r[5], order: ["Elite", "Rare", "Rare elite", "Boss"], pic: (v) => "rank-" + slug(v) },
      { k: "type", label: "Type", icons: true, get: (r) => r[6], pic: (v) => "type-" + slug(v) },
      { k: "role", label: "Does", icons: true, get: (r) => r[8], pic: (v) => "role-" + slug(v) },
    ],
    checks: [{ k: "changed", label: "Changed by us", test: (r) => r[11].length, title: "Touched by one of our patches" },
      { k: "scripted", label: "Scripted", test: (r) => r[13], title: "Run by a script: better left alone" }],
    cols: [
      ["name", "NPC", "nm", (r) => r[1], (r) => `${esc(r[1])}${r[2] ? `<span class="sub">&lt;${esc(r[2])}&gt;</span>` : ""}`],
      ["level", "Level", "num", (r) => r[3], lv],
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
      <span class="k">Its drops</span><span><a href="#/drops/c/${r[0]}">every drop and its chance</a></span></div>`,
  });
}
