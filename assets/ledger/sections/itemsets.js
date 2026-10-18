import { chgs, esc, load, page, state, uniq } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";
import { icon } from "../kit/icon.js";
import { viewOf, viewToggle, wireView } from "../kit/gallery.js";

// ---------- item sets (session 99, the fifth of the categories' planned sections) ----------
// Every item set as the server reads it (ledger.py's itemsets(): ItemSet.dbc 1.12, item_template, the loot, quest, vendor and craft
// tables), filed by where most of its pieces come from. Cards first (the visual pass): each set as the game lists it in a piece's
// tooltip as if every piece were worn (its pieces lit, every bonus green), its pieces' icons above it, each its own tooltip; the
// table on the switch, a row a set, opened to its pieces' ways and its bonuses.
const ways = (p) => p[5].map(([how, what, at]) => `${how} ${what}${at ? ` (${at})` : ""}`).join("; ") || "No source here";
function card(x) {
  const n = x.pieces.length, worn = n;
  const meta = [x.classes.length ? x.classes.join(", ") : "Any class", x.level ? `level ${x.level}` : "", x.skill ? `${x.skill[0]} ${x.skill[1]}` : ""].filter(Boolean).join(" · ");
  return `<article class="setcard" data-set="${x.id}">
    <div class="seticons">${x.pieces.map((p) => icon(p[6], { q: p[2], attrs: `data-item="${p[0]}" data-src="${esc(ways(p))}" tabindex="0"`, label: p[1] })).join("")}</div>
    <div class="tbox"><div class="tn gq${x.q}">${esc(x.name)}</div><div class="tl k-gr">${esc(meta)}</div>
      <div class="tset"><div class="tl k-gold"><span>Pieces (${n}/${n})</span></div>
      ${x.pieces.map((p, i) => `<div class="tl tpiece ${i < worn ? "on" : "off"}" data-item="${p[0]}" data-src="${esc(ways(p))}">${esc(p[1])}</div>`).join("")}
      <div class="tgap"></div>
      ${x.bonus.map(([k, t]) => `<div class="tl tbonus ${worn >= k ? "on" : "off"}" data-k="${k}">(${k}) Set: ${esc(t)}</div>`).join("")}</div></div>
    ${x.changes.length ? `<div class="meta">Changed by us: ${chgs(x.changes)}</div>` : ""}
  </article>`;
}
export async function itemsets() {
  nav("itemsets");
  const d = await load("itemsets");
  const st = (state.itemsets = Object.assign({ q: "", cls: "", open: null }, state.itemsets || {}));
  // the places in the order of their best set: the raids first, then the dungeons and the rest
  const top = {};
  d.sets.forEach((x) => (top[x.where] = Math.max(top[x.where] || 0, x.ilvl)));
  const places = Object.keys(top).sort((a, b) => top[b] - top[a] || a.localeCompare(b));
  const classes = uniq(d.sets.flatMap((x) => x.classes));
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = d.sets.filter((x) => (!st.cls || x.classes.includes(st.cls) || (st.cls === "any" && !x.classes.length)) &&
      (!q || [x.name, x.where, ...x.pieces.map((p) => p[1])].join(" ").toLowerCase().includes(q)));
    const cols = [
      ["name", "Set", "nm", (x) => x.name, (x) => `<span class="qn${x.q}">${esc(x.name)}</span><span class="sub">${x.classes.length ? esc(x.classes.join(", ")) : "any class"}${x.skill ? ` · ${esc(x.skill[0])} ${x.skill[1]}` : ""}</span>`],
      ["pieces", "Pieces", "num", (x) => x.pieces.length, (x) => x.pieces.length],
      ["level", "Level", "num", (x) => x.level, (x) => x.level || ""],
      ["ilvl", "Item level", "num hide-sm", (x) => x.ilvl, (x) => x.ilvl],
      ["bonus", "Bonuses", "num", (x) => x.bonus.length, (x) => x.bonus.length],
      ["changes", "Changes", "hide-sm", (x) => x.changes.length, (x) => chgs(x.changes)],
    ];
    const more = (x) => `<div class="setx"><div><h4>The pieces</h4><ul class="traits">${x.pieces.map(([id, n, qq, il, lv, ways]) =>
      `<li><a class="qn${qq}" href="#/item/${id}">${esc(n)}</a><span class="n">item level ${il}</span>${ways.map(([how, what, at]) =>
        `<span class="tt">${esc(how)} ${esc(what)}${at ? ` <span class="note">(${esc(at)})</span>` : ""}</span>`).join("") || `<span class="tt note">No source here</span>`}</li>`).join("")}</ul></div>
      <div><h4>The bonuses</h4><ul class="traits">${x.bonus.map(([n, t]) => `<li><b>${n} pieces</b><span class="tt">${esc(t)}</span></li>`).join("")}</ul></div></div>`;
    const groups = places.map((p) => [p, rows.filter((x) => x.where === p)]);
    const cards = viewOf("itemsets") === "cards";
    page.innerHTML = `<h1 class="display">Item sets</h1>
      <p class="lead">The sets of gear that belong together, their pieces and the bonuses they give.</p>
      <h2 class="sec">The sets</h2>
      <div class="filters">${chips("scls", [["any", "Any class", d.sets.filter((x) => !x.classes.length).length], ...classes.map((c) => [c, c, d.sets.filter((x) => x.classes.includes(c)).length])], st.cls, "Every set")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search by set, piece or place…" value="${esc(st.q)}" aria-label="Search the item sets">${viewToggle("itemsets")}</div>
      ${cards ? groups.filter(([, rs]) => rs.length).map(([g, rs]) => `<h3 class="grp-h">${esc(g)} <span class="n">${rs.length}</span></h3>
        <div class="setcards">${rs.map((x) => card(x)).join("")}</div>`).join("") || `<p class="empty">Nothing matches.</p>`
        : `<div class="panel">${table("tsets", cols, groups, { more, open: (x) => st.open === x.id })}</div>`}
      <h2 class="sec">How sets work</h2>
      <div class="panel panel-body"><div class="facts">
        <span class="k">Bonuses</span><span>Each bonus comes on when you wear the number of pieces it names, and the ones before it stay.</span>
        <span class="k">Where it is filed</span><span>Under the place most of its pieces come from: a raid or dungeon, PvP rewards, quests or crafts.</span>
        <span class="k">The text</span><span>The bonuses as the server’s own spell data gives them; the 1.14.2 client may word a tooltip its own way.</span>
      </div></div>`;
    wireChips(page, "scls", (v) => { st.cls = v; render(); });
    wireView(page, "itemsets", render);
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ts = state.tsets;
    const ordered = groups.flatMap(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; return c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs; });
    if (!cards) wireTable("tsets", render, ordered, { click: (x) => { st.open = st.open === x.id ? null : x.id; render(); } });
  };
  render();
}
