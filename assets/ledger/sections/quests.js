import { chgs, esc, fmt, load, money } from "../core.js";
import { listPage, nav } from "../ui.js";
import { slug } from "../kit/filters.js";

const ALLIANCE = ["Human", "Dwarf", "Night Elf", "Gnome"];
const sideOf = (r) => (["Alliance", "Horde", "Both"].includes(r[6]) ? r[6] : r[6].split(", ").every((x) => ALLIANCE.includes(x)) ? "Alliance" : "Horde");

// ---------- quests ----------
export async function quests() {
  nav("quests");
  const d = await load("quests");
  listPage({
    sec: "quests", title: "Quests", unit: "quests", listTitle: "The quests", placeholder: "Search a quest or its giver…", levers: "quests",
    lead: `Every quest: its level, who gives it and what it pays, reputation included (the client never shows it); ours marked.`,
    rows: d.quests, key: (r) => r[0], text: (r) => r[1] + " " + r[12],
    // the filter bar (session 100, kit/filters.js): a quest for some races only counts for their side
    facets: [
      { k: "zone", label: "Zone or kind", all: "Every zone or kind", get: (r) => r[4] },
      { k: "side", label: "Side", icons: true, get: sideOf, order: ["Alliance", "Horde", "Both"], pic: (v) => "side-" + slug(v),
        title: (v) => ({ Both: "Either side may take it" }[v] || `For the ${v}, some for one race only`) },
      { k: "cls", label: "Class", icons: true, get: (r) => (r[7] ? r[7].split(", ") : []), pic: (v) => "class-" + slug(v), title: (v) => `A ${v} quest` },
      { k: "type", label: "Kind", icons: true, get: (r) => r[5] || "Normal", order: ["Normal", "Elite", "Dungeon", "Raid", "PvP"],
        pic: (v) => ({ Elite: "rank-elite", Raid: "rank-boss", PvP: "side-hostile" }[v] || "") },
    ],
    checks: [{ k: "ours", label: "Ours", test: (r) => r[15], title: "Written for this server (from 60000)" },
      { k: "changed", label: "Changed by us", test: (r) => r[13].length || r[15] },
      { k: "rep", label: "Gives reputation", test: (r) => r[10].length }, { k: "repeat", label: "Repeatable", test: (r) => r[8].length }],
    cols: [
      ["title", "Quest", "nm", (r) => r[1], (r) => `${esc(r[1])}${r[12] ? `<span class="sub">${esc(r[12])}</span>` : ""}`],
      ["level", "Level", "num", (r) => r[2], (r) => `${r[2]}<span class="sub">from ${r[3]}</span>`],
      ["zone", "Zone", "hide-sm", (r) => r[4], (r) => esc(r[4])],
      ["side", "Side", "", (r) => r[6], (r) => `<span class="side ${esc(r[6])}">${esc(r[6])}</span>${r[7] ? `<span class="sub">${esc(r[7])}</span>` : ""}`],
      ["type", "Kind", "hide-sm", (r) => r[5], (r) => `${esc(r[5])}${r[8].length ? `<span class="sub">${esc(r[8].join(", "))}</span>` : ""}`],
      ["reward", "Pays", "", (r) => r[10].reduce((a, x) => a + x[1], 0), (r) => `<span class="note">${[r[9] > 0 ? money(r[9]) : "", ...r[10].map(([f, v]) => `${esc(f)} ${v > 0 ? "+" : ""}${fmt(v)}`), r[11] ? "items" : ""].filter(Boolean).join(" · ")}</span>`],
      ["changes", "Changes", "", (r) => r[13].length, (r) => (r[15] ? `<span class="badge">ours</span>` : "") + chgs(r[13])],
    ],
    more: (r) => `<div class="facts"><span class="k">In the database</span><span>quest ${r[0]} · <a href="#/quest/${r[0]}">its own page</a></span>
      ${r[7] ? `<span class="k">Classes</span><span>${esc(r[7])}</span>` : ""}
      ${r[13].length ? `<span class="k">Changed by</span><span>${chgs(r[13])}</span>` : ""}</div>`,
  });
}
