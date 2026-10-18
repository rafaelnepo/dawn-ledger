import { chgs, esc, load, page, state } from "../core.js";
import { table, wireTable, nav } from "../ui.js";
import { icon } from "../kit/icon.js";
import { viewOf, wireView } from "../kit/gallery.js";
import { filterBar, filtered, readAddress, slug, uiIcon, wireBar, writeAddress } from "../kit/filters.js";
import { dress } from "../kit/model3d.js";

// ---------- item sets (session 99; session 100, the player's review: "the probability of looking for gear for their specific class is
// huge") ----------
// Every item set as the server reads it (ledger.py's itemsets(): ItemSet.dbc 1.12, item_template, the loot, quest, vendor and craft
// tables, each piece's chance per kill by the server's own loot rules), filed by where most of its pieces come from.
// It opens on the classes, big buttons with their crests: most people look for their own. A class's sets as cards: each set worn by a
// race of your choosing (only the races that class can be; male or female), its tooltip as the game draws it with every bonus, and
// where each piece comes from with its chance. PvP sets come in an Alliance and a Horde version: both shown, side toggles to narrow, each
// worn by a race of its side. The table on the header's switch.
const CLASSES = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"];
const RACES = [["human", "Human", "Alliance"], ["dwarf", "Dwarf", "Alliance"], ["nightelf", "Night Elf", "Alliance"], ["gnome", "Gnome", "Alliance"],
  ["orc", "Orc", "Horde"], ["scourge", "Undead", "Horde"], ["tauren", "Tauren", "Horde"], ["troll", "Troll", "Horde"]];
const CAN = { Warrior: "human dwarf nightelf gnome orc scourge tauren troll", Paladin: "human dwarf", Hunter: "dwarf nightelf orc tauren troll",
  Rogue: "human dwarf nightelf gnome orc scourge troll", Priest: "human dwarf nightelf scourge troll", Shaman: "orc tauren troll",
  Mage: "human gnome scourge troll", Warlock: "human gnome orc scourge", Druid: "nightelf tauren" };
const PAIR = { human: "orc", dwarf: "tauren", nightelf: "troll", gnome: "scourge", orc: "human", tauren: "dwarf", troll: "nightelf", scourge: "gnome" };
const raceWord = (k) => (RACES.find((r) => r[0] === k) || [, k])[1];
const raceSide = (k) => (RACES.find((r) => r[0] === k) || [, , ""])[2];
const racesFor = (cls) => (CAN[cls] ? CAN[cls].split(" ") : RACES.map((r) => r[0]));
// the race a set is shown on: the chosen one if it may wear it, else its counterpart on the set's side, else the first that may
function raceFor(x, chosen) {
  const ok = (k) => (!x.classes.length || x.classes.some((c) => racesFor(c).includes(k))) && (!x.side || raceSide(k) === x.side);
  if (ok(chosen)) return chosen;
  if (ok(PAIR[chosen])) return PAIR[chosen];
  return RACES.map((r) => r[0]).find(ok) || chosen;
}
const ways = (p) => p[5].map(([how, what, at]) => `${how} ${what}${at ? ` (${at})` : ""}`).join("; ") || "No source here";
// where a piece comes from, short: the likeliest creature and its chance, else the first other way
function source(p) {
  const odds = p[7] || [];
  if (odds.length) return `<a href="#/npc/${odds[0][0]}">${esc(odds[0][1])}</a> <span class="pct">${odds[0][2]}%</span>${odds.length > 1 ? `<span class="note"> and ${odds.length - 1} more</span>` : ""}`;
  const w = p[5][0];
  return w ? `<span class="note">${esc(w[0])}</span> ${esc(w[1])}${w[2] ? ` <span class="note">(${esc(w[2])})</span>` : ""}` : `<span class="note">No source here</span>`;
}
function card(x, st) {
  const n = x.pieces.length, race = raceFor(x, st.race);
  const meta = [x.classes.length ? x.classes.join(", ") : "Any class", x.side, x.level ? `level ${x.level}` : "", x.skill ? `${x.skill[0]} ${x.skill[1]}` : ""].filter(Boolean).join(" · ");
  return `<article class="setcard" data-set="${x.id}">
    <div class="setwear">${dress(x.pieces.map((p) => p[0]), { race, sex: st.sex, key: `s${x.id}-${race}-${st.sex}`, label: x.name })}
      <span class="setrace">${uiIcon(`race-${slug(raceWord(race))}-${st.sex}`)}${esc(raceWord(race))}</span></div>
    <div class="setinfo"><div class="tbox"><div class="tn gq${x.q}">${esc(x.name)}</div><div class="tl k-gr">${esc(meta)}</div>
      <div class="tset"><div class="tl k-gold"><span>Pieces (${n}/${n})</span></div>
      ${x.pieces.map((p) => `<div class="tl tpiece on" data-item="${p[0]}" data-src="${esc(ways(p))}">${esc(p[1])}</div>`).join("")}
      <div class="tgap"></div>
      ${x.bonus.map(([k, t]) => `<div class="tl tbonus on" data-k="${k}">(${k}) Set: ${esc(t)}</div>`).join("")}</div></div></div>
    <ul class="setsrc" aria-label="Where each piece comes from">${x.pieces.map((p) => `<li>${icon(p[6], { q: p[2], size: "s", attrs: `data-item="${p[0]}"` })}` +
      `<a class="qn${p[2]}" href="#/item/${p[0]}" data-item="${p[0]}">${esc(p[1])}</a><span class="ss">${source(p)}</span></li>`).join("")}</ul>
    ${x.changes.length ? `<div class="meta">Changed by us: ${chgs(x.changes)}</div>` : ""}
  </article>`;
}
// the landing: a big button a class, its crest, how many sets it has
function landing(d) {
  const n = (c) => d.sets.filter((x) => x.classes.includes(c)).length;
  const any = d.sets.filter((x) => !x.classes.length).length;
  return `<h2 class="sec">Choose a class</h2><div class="bigpick">${CLASSES.map((c) =>
    `<a class="bigbtn" href="#/itemsets?cls=${c}">${uiIcon("class-" + slug(c))}<span class="bt">${c}</span><span class="bn">${n(c)} sets</span></a>`).join("")}
    <a class="bigbtn any" href="#/itemsets?cls=any"><span class="bt">Any class</span><span class="bn">${any} sets anyone may wear</span></a>
    <a class="bigbtn any" href="#/itemsets?cls=all"><span class="bt">Every set</span><span class="bn">${d.sets.length} sets</span></a></div>`;
}
export async function itemsets() {
  nav("itemsets");
  const d = await load("itemsets");
  const st = (state.itemsets = Object.assign({ q: "", cls: "", race: "", sex: "male", open: null }, state.itemsets || {}));
  // the class, the race and the sex live in the address beside the filters (#/itemsets?cls=Druid&race=tauren&sex=female)
  const p = new URLSearchParams(location.hash.split("?")[1] || "");
  if (location.hash.includes("?")) { st.cls = p.get("cls") || ""; st.race = p.get("race") || ""; st.sex = p.get("sex") === "female" ? "female" : "male"; }
  // the places in the order of their best set: the raids first, then the dungeons and the rest
  const top = {};
  d.sets.forEach((x) => (top[x.where] = Math.max(top[x.where] || 0, x.ilvl)));
  const places = Object.keys(top).sort((a, b) => top[b] - top[a] || a.localeCompare(b));
  const fo = { text: (x) => [x.name, x.where, ...x.pieces.map((q) => q[1])].join(" "), placeholder: "Search by set, piece or place…", unit: "sets",
    facets: [{ k: "where", label: "Place", all: "Every place", get: (x) => x.where, order: places },
      { k: "side", label: "Side", icons: true, get: (x) => x.side, order: ["Alliance", "Horde"], pic: (v) => "side-" + slug(v), title: (v) => `The ${v}’s PvP sets` }] };
  readAddress(fo, st);
  const render = () => {
    const mine = st.cls === "all" ? d.sets : st.cls === "any" ? d.sets.filter((x) => !x.classes.length) : d.sets.filter((x) => x.classes.includes(st.cls));
    fo.rows = mine;
    const allowed = CLASSES.includes(st.cls) ? racesFor(st.cls) : RACES.map((r) => r[0]);
    if (!allowed.includes(st.race)) st.race = allowed.includes("nightelf") ? "nightelf" : allowed[0];
    const rows = filtered(fo, st);
    const write = () => {
      writeAddress("itemsets", fo, st);
      if (st.cls) { const u = new URL(location.href), h = u.hash.split("?"), q = new URLSearchParams(h[1] || ""); q.set("cls", st.cls); q.set("race", st.race); q.set("sex", st.sex);
        history.replaceState(history.state, "", `#/itemsets?${q}`); }
    };
    const head = `<h1 class="display">Item sets</h1>
      <p class="lead">The sets of gear that belong together: on the race you choose, every bonus, and where each piece comes from.</p>`;
    if (!st.cls && !st.q) {
      page.innerHTML = head + landing(d) + how();
      return;
    }
    const cols = [
      ["name", "Set", "nm", (x) => x.name, (x) => `<span class="qn${x.q}">${esc(x.name)}</span><span class="sub">${x.classes.length ? esc(x.classes.join(", ")) : "any class"}${x.side ? ` · ${x.side}` : ""}${x.skill ? ` · ${esc(x.skill[0])} ${x.skill[1]}` : ""}</span>`],
      ["pieces", "Pieces", "num", (x) => x.pieces.length, (x) => x.pieces.length],
      ["level", "Level", "num", (x) => x.level, (x) => x.level || ""],
      ["ilvl", "Item level", "num hide-sm", (x) => x.ilvl, (x) => x.ilvl],
      ["bonus", "Bonuses", "num", (x) => x.bonus.length, (x) => x.bonus.length],
      ["changes", "Changes", "hide-sm", (x) => x.changes.length, (x) => chgs(x.changes)],
    ];
    const more = (x) => `<div class="setx"><div><h4>The pieces</h4><ul class="traits">${x.pieces.map(([id, nm, qq, il, lv, ws, , odds]) =>
      `<li><a class="qn${qq}" href="#/item/${id}">${esc(nm)}</a><span class="n">item level ${il}</span>${(odds || []).map(([c, cn, pc]) => `<span class="tt"><a href="#/npc/${c}">${esc(cn)}</a> ${pc}%</span>`).join("")}${ws.filter((w) => w[0] !== "Drops from").map(([how, what, at]) =>
        `<span class="tt">${esc(how)} ${esc(what)}${at ? ` <span class="note">(${esc(at)})</span>` : ""}</span>`).join("") || ((odds || []).length ? "" : `<span class="tt note">No source here</span>`)}</li>`).join("")}</ul></div>
      <div><h4>The bonuses</h4><ul class="traits">${x.bonus.map(([k, t]) => `<li><b>${k} pieces</b><span class="tt">${esc(t)}</span></li>`).join("")}</ul></div></div>`;
    const groups = places.map((pl) => [pl, rows.filter((x) => x.where === pl)]);
    const cards = viewOf("itemsets") === "cards";
    const who = st.cls === "all" ? "Every set" : st.cls === "any" ? "Any class" : st.cls;
    const showOn = `<div class="fg setshow" role="group" aria-label="Shown on"><span class="fgl">Shown on</span><div class="fgb">${allowed.map((k) =>
      `<button type="button" class="ft" data-race="${k}" aria-pressed="${st.race === k}">${uiIcon(`race-${slug(raceWord(k))}-${st.sex}`)}<span class="fw">${esc(raceWord(k))}</span></button>`).join("")}
      <span class="fsep" aria-hidden="true"></span>${["male", "female"].map((x) => `<button type="button" class="ft" data-sex="${x}" aria-pressed="${st.sex === x}"><span class="fw">${x === "male" ? "Male" : "Female"}</span></button>`).join("")}</div></div>`;
    page.innerHTML = head + `<p class="crumbs setback"><a href="#/itemsets" data-back>Every class</a> · <span class="white">${uiIcon(CLASSES.includes(st.cls) ? "class-" + slug(st.cls) : "")}${esc(who)}</span></p>
      <h2 class="sec">${esc(who === "Every set" ? "Every set" : `${who}’s sets`)}</h2>
      ${filterBar(Object.assign({ count: rows.length }, fo), st)}${cards ? showOn : ""}
      ${cards ? groups.filter(([, rs]) => rs.length).map(([g, rs]) => `<h3 class="grp-h">${esc(g)} <span class="n">${rs.length}</span></h3>
        <div class="setcards">${rs.map((x) => card(x, st)).join("")}</div>`).join("") || `<p class="empty">Nothing matches.</p>`
        : `<div class="panel">${table("tsets", cols, groups, { more, open: (x) => st.open === x.id })}</div>`}` + how();
    write();
    wireBar(page, fo, st, render);
    wireView(page, "itemsets", render);
    page.querySelectorAll(".setshow [data-race]").forEach((b) => b.addEventListener("click", () => { st.race = b.dataset.race; render(); }));
    page.querySelectorAll(".setshow [data-sex]").forEach((b) => b.addEventListener("click", () => { st.sex = b.dataset.sex; render(); }));
    const back = page.querySelector("[data-back]");
    if (back) back.addEventListener("click", (e) => { e.preventDefault(); st.cls = ""; st.q = ""; fo.facets.forEach((f) => (st[f.k] = [])); history.replaceState(history.state, "", "#/itemsets"); render(); });
    const qi = page.querySelector("#fq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#fq"); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } });
    const ts = state.tsets;
    const ordered = groups.flatMap(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; return c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs; });
    if (!cards) wireTable("tsets", render, ordered, { click: (x) => { st.open = st.open === x.id ? null : x.id; render(); } });
  };
  render();
}
const how = () => `<h2 class="sec">How sets work</h2>
  <div class="panel panel-body"><div class="facts">
    <span class="k">Bonuses</span><span>Each bonus comes on when you wear the number of pieces it names, and the ones before it stay.</span>
    <span class="k">Where it is filed</span><span>Under the place most of its pieces come from: a raid or dungeon, PvP rewards, quests or crafts.</span>
    <span class="k">The chances</span><span>Per kill, as the server rolls its loot tables; a piece that drops from many creatures shows the likeliest.</span>
    <span class="k">The text</span><span>The bonuses as the server’s own spell data gives them; the 1.14.2 client may word a tooltip its own way.</span>
  </div></div>`;
