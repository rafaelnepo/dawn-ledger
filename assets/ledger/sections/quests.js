import { STATUS, chgs, esc, fmt, load, money, status, uniq } from "../core.js";
import { listPage, nav } from "../ui.js";

// ---------- quests ----------
export async function quests() {
  nav("quests");
  const d = await load("quests");
  listPage({
    sec: "quests", title: "Quests", unit: "quests", listTitle: "The quests", placeholder: "Search a quest or its giver…", levers: "quests",
    lead: `Every quest: its level, where it belongs, who it is for, what it pays (money, reputation, items) and who gives it, with ours
      (from 60000) and the ones we changed marked. The client never shows a quest’s reputation reward; it is here.`,
    rows: d.quests, key: (r) => r[0], text: (r) => r[1] + " " + r[12],
    filters: [{ k: "zone", label: "Every zone or kind", values: uniq(d.quests.map((r) => r[4])), get: (r) => r[4] },
      { k: "side", label: "Every side", values: uniq(d.quests.map((r) => r[6])), get: (r) => r[6] },
      { k: "type", label: "Every type", values: uniq(d.quests.map((r) => r[5])), get: (r) => r[5] }],
    checks: [{ k: "ours", label: "Ours", test: (r) => r[15] }, { k: "changed", label: "Changed", test: (r) => r[13].length || r[15] },
      { k: "rep", label: "Gives reputation", test: (r) => r[10].length }, { k: "repeat", label: "Repeatable", test: (r) => r[8].length }],
    cols: [
      ["title", "Quest", "nm", (r) => r[1], (r) => `${esc(r[1])}${r[12] ? `<span class="sub">${esc(r[12])}</span>` : ""}`],
      ["level", "Level", "num", (r) => r[2], (r) => `${r[2]}<span class="sub">from ${r[3]}</span>`],
      ["zone", "Zone", "hide-sm", (r) => r[4], (r) => esc(r[4])],
      ["side", "Side", "", (r) => r[6], (r) => `<span class="side ${esc(r[6])}">${esc(r[6])}</span>${r[7] ? `<span class="sub">${esc(r[7])}</span>` : ""}`],
      ["type", "Kind", "hide-sm", (r) => r[5], (r) => `${esc(r[5])}${r[8].length ? `<span class="sub">${esc(r[8].join(", "))}</span>` : ""}`],
      ["reward", "Pays", "", (r) => r[10].reduce((a, x) => a + x[1], 0), (r) => `<span class="note">${[r[9] > 0 ? money(r[9]) : "", ...r[10].map(([f, v]) => `${esc(f)} ${v > 0 ? "+" : ""}${fmt(v)}`), r[11] ? "items" : ""].filter(Boolean).join(" · ")}</span>`],
      ["changes", "Changes", "", (r) => r[13].length, (r) => (r[15] ? `<span class="badge">ours</span>` : "") + chgs(r[13])],
      ["status", "Status", "", (r) => Object.keys(STATUS).indexOf(r[14]), (r) => status(r[14])],
    ],
    more: (r) => `<div class="facts"><span class="k">In the database</span><span>quest ${r[0]} · <a href="#/quest/${r[0]}">its own page</a></span>
      ${r[7] ? `<span class="k">Classes</span><span>${esc(r[7])}</span>` : ""}
      ${r[13].length ? `<span class="k">Changed by</span><span>${chgs(r[13])}</span>` : ""}</div>`,
  });
}
