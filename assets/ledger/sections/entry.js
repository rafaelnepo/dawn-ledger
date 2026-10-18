import { LOCAL } from "../build.js";
import { ROOT, chgs, esc, fmt, json, load, money, page } from "../core.js";
import { nav } from "../ui.js";
import { itemData, setData, tipHtml } from "../kit/tip.js";
import { stage, voices } from "../kit/model3d.js";
import { slug, uiIcon } from "../kit/filters.js";
import { icon } from "../kit/icon.js";

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

// an NPC's own page (session 100, the player's review): at a glance what it is (its roles, side, rank and type as the game's icons, each
// opening the list of others like it), its picture and sounds beside its map; then what it sells, what it teaches, the quests it starts
// and ends, and the NPCs it works with. The details: ledger.py's npcinfo part (npc/<id >> 8>.json, the live world).
const npcShard = {};
export const clearNpcInfo = () => { for (const k in npcShard) delete npcShard[k]; };   // the game changed (live.js)
const npcInfo = (id) => (npcShard[id >> 8] = npcShard[id >> 8] || json(`${ROOT}data/ledger/npc/${id >> 8}.json`).catch(() => ({}))).then((d) => d[id] || {});
const ROLE_WORD = { quests: "Gives quests", vendor: "Vendor", trainer: "Trainer", repairs: "Repairs", "flight master": "Flight master", innkeeper: "Innkeeper",
  "stable master": "Stable master", auctioneer: "Auctioneer", banker: "Banker", battlemaster: "Battlemaster", tabards: "Tabards", "guild charters": "Guild charters",
  "spirit healer": "Spirit healer" };
const badge = (pic, word, href, title) => `<a class="ebadge" href="${href}"${title ? ` title="${esc(title)}"` : ""}>${uiIcon(pic)}<span>${esc(word)}</span></a>`;
const lvl = (lo, hi) => (lo === hi ? `${lo}` : `${lo}–${hi}`);
export async function npcPage(id) {
  nav("npcs");
  const [d, qd] = await Promise.all([load("npcs"), load("quests")]);
  const r = d.npcs.find((x) => String(x[0]) === id);
  if (!r) return missing("creature", id);
  const [info, idx] = await Promise.all([npcInfo(r[0]), LOCAL ? json(`${ROOT}data/index.json`).catch(() => null) : null]);
  const byId = new Map(d.npcs.map((x) => [x[0], x])), qById = new Map(qd.quests.map((q) => [q[0], q]));
  const list = (k, v) => `#/npcs?${k}=${encodeURIComponent(v)}${r[9] ? "&zone=" + encodeURIComponent(r[9]) : ""}`;
  const badges = [
    ...r[8].map((x) => badge("role-" + slug(x), ROLE_WORD[x] || x, list("role", x), `Every ${x} in ${r[9] || "the world"}`)),
    r[7] ? badge("side-" + slug(r[7]), r[7] === "Hostile" ? "Hostile" : r[7] === "Both" ? "Friendly to both" : r[7], list("side", r[7])) : "",
    r[5] ? badge("rank-" + slug(r[5]), r[5], list("rank", r[5])) : "",
    r[6] ? badge("type-" + slug(r[6]), r[6], list("type", r[6])) : "",
  ].join("");
  // its map: the land it stands in most, every spawn a pin (the maps are this Mac's art)
  const zones = idx ? new Map(idx.zones.map((z) => [z.id, z])) : new Map();
  const where = (info.m || []).filter(([z]) => zones.has(z));
  let map = "";
  if (where.length) {
    const [zid, pins] = where[0], z = zones.get(zid);
    map = `<figure class="emap"><div class="emapart" role="img" aria-label="Map of ${esc(z.name)}" style="background-image:url('${ROOT}data/${esc(z.map)}')">` +
      pins.map(([x, y]) => `<i class="pin" style="left:${x}%;top:${y}%"></i>`).join("") + `</div><figcaption><a href="#/zone/${esc(z.slug)}">${esc(z.name)}</a> · ` +
      `${r[10] === 1 ? "stands here" : `${fmt(r[10])} spawns`}${where.length > 1 ? `, more in ${where.slice(1).map(([o]) => esc(zones.get(o).name)).join(", ")}` : ""}</figcaption></figure>`;
  }
  // what it sells: the game's icons and names (the tooltip shards), a limited stock marked
  let sells = "";
  if (info.s) {
    const items = await Promise.all(info.s.map(([i]) => itemData(i)));
    sells = `<h2 class="sec">Sells</h2><div class="egoods">${info.s.map(([i, n], k) => { const e = items[k]; if (!e) return "";
      return `<a class="egood" href="#/item/${i}" data-item="${i}">${icon(e.i, { q: e.q, size: "s" })}<span class="qn${e.q || 0}">${esc(e.n)}</span>${n ? `<span class="note">${n} at a time</span>` : ""}</a>`; }).join("")}</div>`;
  }
  // what it teaches, by the level each lesson asks (a class trainer's ninety lessons read as the game's trainer window lists them)
  let lastLv = -1;
  const teaches = info.t ? `<h2 class="sec">Teaches</h2><div class="elessons">${info.t.map(([sid, name, rank, ic, cost, lv, skill, sv]) =>
    (lv !== lastLv && info.t.length > 12 ? `<h3 class="eh elv">${(lastLv = lv) > 1 ? `Level ${lv}` : "Any level"}</h3>` : "") +
    `<div class="elesson">${icon(ic, { size: "s" })}<span class="ln">${esc(name)}${rank ? ` <span class="note">${esc(rank)}</span>` : ""}</span>` +
    `<span class="note">${sv ? `skill ${sv}` : info.t.length > 12 || lv <= 1 ? "" : `level ${lv}`}</span><span class="lc">${money(cost) || "free"}</span></div>`).join("")}</div>` : "";
  const qrow = (qid, pic) => { const q = qById.get(qid); return q ? `<a class="equest" href="#/quest/${qid}">${uiIcon(pic)}<span>${esc(q[1])}</span><span class="note num">${q[2]}</span></a>` : ""; };
  const quests = info.q || info.e ? `<h2 class="sec">Quests</h2><div class="equests">` +
    (info.q ? `<div><h3 class="eh">Starts</h3>${info.q.map((q) => qrow(q, "role-quests")).join("")}</div>` : "") +
    (info.e ? `<div><h3 class="eh">Ends</h3>${info.e.map((q) => qrow(q, "quest-turnin")).join("")}</div>` : "") + "</div>" : "";
  const mates = (info.r || []).map(([o]) => byId.get(o)).filter(Boolean);
  const works = mates.length ? `<h2 class="sec">Works with</h2><div class="ggrid ngrid emates">${mates.map((m) => `<div class="ncard">${stage(m[0], { label: m[1] })}` +
    `<a class="nb" href="#/npc/${m[0]}"><span class="in">${esc(m[1])}</span>${m[2] ? `<span class="it">&lt;${esc(m[2])}&gt;</span>` : ""}<span class="is">${esc([`Level ${lvl(m[3], m[4])}`, m[9]].filter(Boolean).join(" · "))}</span></a></div>`).join("")}</div>` : "";
  page.innerHTML = head("npcs", "NPCs", r[1], "", r[2] ? `&lt;${esc(r[2])}&gt;` : "") +
    `<div class="ebadges">${badges}</div>` +
    `<div class="etop"><div class="ecol">${stage(r[0], { size: "page", label: r[1] }) + voices(r[0])}</div>${map ? `<div class="ecol">${map}</div>` : ""}</div>` +
    sells + teaches + quests + works +
    `<h2 class="sec">In the world</h2>` + facts([["Level", lvl(r[3], r[4])], ["Stands in", esc(r[9])], ["Spawns", r[10] || ""],
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
