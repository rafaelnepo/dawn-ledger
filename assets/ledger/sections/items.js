import { QUALITY, chgs, esc, fmt, load, money, uniq } from "../core.js";
import { listPage, nav } from "../ui.js";
import { icon } from "../kit/icon.js";

// ---------- items ----------
// (session 99: the visual view first, each item its icon in its quality's frame, its tooltip on hover as the game draws it)
const SLOT = { 1: "Head", 2: "Neck", 3: "Shoulder", 4: "Shirt", 5: "Chest", 6: "Waist", 7: "Legs", 8: "Feet", 9: "Wrist", 10: "Hands",
  11: "Finger", 12: "Trinket", 13: "One-Hand", 14: "Off Hand", 15: "Ranged", 16: "Back", 17: "Two-Hand", 18: "Bag", 19: "Tabard",
  20: "Chest", 21: "Main Hand", 22: "Off Hand", 23: "Held In Off-hand", 24: "Projectile", 25: "Thrown", 26: "Ranged", 28: "Relic" };
const card = (r) => `<a class="icard" href="#/item/${r[0]}" data-item="${r[0]}">${icon(r[15], { q: r[2] })}
  <span class="in qn${r[2] || 0}">${esc(r[1])}</span><span class="is">${[SLOT[r[16]], r[6] && r[6] !== r[5] ? r[6] : r[5], r[3] ? `item level ${r[3]}` : ""].filter(Boolean).map(esc).join(" · ")}</span></a>`;
export async function items() {
  nav("items");
  const d = await load("items");
  const SRC = d.sources;
  listPage({
    sec: "items", title: "Items", unit: "items", listTitle: "The items", placeholder: "Search an item…", levers: "items",
    lead: `Every item on this server: where it comes from, what it costs, and which the client shows from our copy, marked <span class="badge">hotfix</span>.`,
    rows: d.items, key: (r) => r[0], text: (r) => r[1], card,
    defaults: { has: true },
    filters: [{ k: "quality", label: "Every quality", values: QUALITY, get: (r) => QUALITY[r[2]] },
      { k: "cls", label: "Every kind", values: uniq(d.items.map((r) => r[5])), get: (r) => r[5] },
      { k: "slot", label: "Every slot", values: uniq(d.items.map((r) => SLOT[r[16]] || "")), get: (r) => SLOT[r[16]] || "" }],
    checks: [{ k: "has", label: "Has a source", test: (r) => r[9].some((n) => n) }, { k: "changed", label: "Changed only", test: (r) => r[10].length || r[11] },
      { k: "hot", label: "Hotfixed", test: (r) => r[11] }],
    cols: [
      ["name", "Item", "nm", (r) => r[1], (r) => `<span class="iname">${icon(r[15], { q: r[2], size: "s", attrs: `data-item="${r[0]}"` })}<span><span class="qn${r[2] || 0}" data-item="${r[0]}">${esc(r[1])}</span><span class="sub">${esc(r[5])}${r[6] && r[6] !== r[5] ? " · " + esc(r[6]) : ""}</span></span></span>`],
      ["ilvl", "iLvl", "num", (r) => r[3], (r) => r[3]],
      ["req", "Req", "num", (r) => r[4], (r) => r[4] || ""],
      ["src", "Comes from", "hide-sm", (r) => r[9].reduce((a, b) => a + b, 0), (r) => `<span class="note">${r[9].map((n, i) => (n ? `${fmt(n)} ${SRC[i]}` : "")).filter(Boolean).join(" · ")}</span>`],
      ["buy", "Price", "num hide-sm", (r) => r[7], (r) => money(r[7])],
      ["changes", "Changes", "", (r) => r[10].length + (r[11] ? 1 : 0), (r) => chgs(r[10]) + (r[11] ? `<span class="badge" title="The client shows our hotfix row">hotfix</span>` : "")],
    ],
    more: (r) => `<div class="facts"><span class="k">In the database</span><span>item ${r[0]} · <a href="#/item/${r[0]}">its own page</a></span>
      <span class="k">Sells for</span><span>${money(r[8]) || "nothing"}</span>
      ${r[13] ? `<span class="k">PvP rank</span><span>${r[13] - 4} (requiredhonorrank ${r[13]})</span>` : ""}
      <span class="k">Comes from</span><span>${r[9].map((n, i) => `${fmt(n)} ${SRC[i]}`).join(", ")}</span></div>`,
  });
}
