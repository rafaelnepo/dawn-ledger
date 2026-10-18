import { chgs, esc, fmt, load, money, page } from "../core.js";
import { nav } from "../ui.js";
import { itemData, setData, tipHtml } from "../kit/tip.js";
import { stage, voices } from "../kit/model3d.js";

// ---------- one entry's own page (session 84): #/item/<id>, #/npc/<id>, #/quest/<id>, a link to share and to land on from the search.
// The same facts as the list's open row, then the changes of ours that touched it, a stamp each opening its card in the Console.
// what of ours touched it: a stamp a change, each opening its card in the Watcher's Console (session 95: our work lives there)
const changeList = (ids) => (ids && ids.length
  ? `<p class="emarks"><span class="note">Changed by us:</span> ${chgs(ids)}</p>`
  : `<p class="note">As Blizzard made it.</p>`);
const facts = (rows) => `<div class="panel panel-body"><div class="facts">${rows.filter(([, v]) => v !== "" && v != null && v !== false)
  .map(([k, v]) => `<span class="k">${k}</span><span>${v}</span>`).join("")}</div></div>`;
// (its stamp and lever left for the Watcher's Console, session 95)
const head = (sec, title, name, cls, sub) => `<p class="crumbs"><a href="#/${sec}">${title}</a> · <span class="white">${esc(name)}</span></p>
  <h1 class="${cls || ""}">${esc(name)}</h1>${sub ? `<p class="lead">${sub}</p>` : ""}`;
const missing = (what, id) => { page.innerHTML = `<p class="empty">No ${what} ${esc(id)} on this server.</p>`; };

export async function itemPage(id) {
  nav("items");
  const d = await load("items");
  const r = d.items.find((x) => String(x[0]) === id);
  if (!r) return missing("item", id);
  const src = r[9].map((n, i) => (n ? `${fmt(n)} ${d.sources[i]}` : "")).filter(Boolean).join(", ");
  // its tooltip as the game draws it, with its set (session 99, the visual pass)
  const e = await itemData(r[0]), set = e && e.set ? await setData(e.set) : null;
  page.innerHTML = head("items", "Items", r[1], `qn${r[2] || 0}`, `${esc(r[5])}${r[6] && r[6] !== r[5] ? " · " + esc(r[6]) : ""}`) +
    (e ? `<div class="tipstatic">${tipHtml(e, set)}</div>` : "") +
    (set ? `<p class="note">Part of <a href="#/itemsets">${esc(set.name)}</a>, ${set.pieces.length} pieces.</p>` : "") +
    `<h2 class="sec">On this server</h2>` + facts([["Item level", r[3]], ["Requires level", r[4] || ""], ["Buys for", money(r[7])], ["Sells for", money(r[8]) || "nothing"],
      ["PvP rank", r[13] ? `${r[13] - 4} (requiredhonorrank ${r[13]})` : ""], ["Comes from", src || "nowhere: no source on this server"],
      ["The client", r[11] ? "shows our hotfix row (HermesProxy), not its own copy" : "shows its own copy, which matches"], ["In the database", `item ${r[0]}`]]) +
    `${changeList(r[10])}`;
}

export async function npcPage(id) {
  nav("npcs");
  const d = await load("npcs");
  const r = d.npcs.find((x) => String(x[0]) === id);
  if (!r) return missing("creature", id);
  page.innerHTML = head("npcs", "NPCs", r[1], "", r[2] ? `&lt;${esc(r[2])}&gt;` : "") +
    stage(r[0], { size: "page", label: r[1] }) + voices(r[0]) +
    `<h2 class="sec">In the world</h2>` + facts([["Level", r[3] === r[4] ? r[3] : `${r[3]}–${r[4]}`], ["Rank", esc(r[5])], ["Type", esc(r[6])],
      ["Side", `<span class="side ${esc(r[7])}">${esc(r[7])}</span>`], ["Does", esc(r[8].join(", "))], ["Stands in", esc(r[9])], ["Spawns", r[10] || ""],
      ["Scripted", r[13] ? `${esc(r[13])}: better left alone` : ""], ["Its drops", `<a href="#/drops/c/${r[0]}">every drop and its chance</a>`], ["In the database", `creature ${r[0]}`]]) +
    `${changeList(r[11])}`;
}

export async function questPage(id) {
  nav("quests");
  const d = await load("quests");
  const r = d.quests.find((x) => String(x[0]) === id);
  if (!r) return missing("quest", id);
  const pays = [r[9] > 0 ? money(r[9]) : "", ...r[10].map(([f, v]) => `${esc(f)} ${v > 0 ? "+" : ""}${fmt(v)}`), r[11] ? "items" : ""].filter(Boolean).join(" · ");
  page.innerHTML = head("quests", "Quests", r[1], "", r[12] ? `Given by ${esc(r[12])}` : "") +
    `<h2 class="sec">The quest</h2>` + facts([["Level", `${r[2]}, from ${r[3]}`], ["Belongs to", esc(r[4])], ["Kind", esc(r[5])],
      ["For", `<span class="side ${esc(r[6])}">${esc(r[6])}</span>${r[7] ? ` · ${esc(r[7])}` : ""}`], ["Repeats", esc(r[8].join(", "))], ["Pays", pays || "nothing"],
      ["Ours", r[15] ? "yes: written for this server (from 60000)" : ""], ["In the database", `quest ${r[0]}`]]) +
    `${changeList(r[13])}`;
}
