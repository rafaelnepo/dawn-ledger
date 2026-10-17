import { chgs, esc, load, page, state, uniq } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";

// ---------- item sets (session 99, the fifth of the categories' planned sections) ----------
// Every item set as the server reads it (ledger.py's itemsets(): ItemSet.dbc 1.12, item_template, the loot, quest, vendor and craft
// tables): filed by where most of its pieces come from, a row a set; opened, its pieces with their ways and its bonuses
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
    page.innerHTML = `<h1 class="display">Item sets</h1>
      <p class="lead">The sets of gear that belong together, their pieces and the bonuses they give.</p>
      <h2 class="sec">The sets</h2>
      <div class="filters">${chips("scls", [["any", "Any class", d.sets.filter((x) => !x.classes.length).length], ...classes.map((c) => [c, c, d.sets.filter((x) => x.classes.includes(c)).length])], st.cls, "Every set")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search by set, piece or place…" value="${esc(st.q)}" aria-label="Search the item sets"></div>
      <div class="panel">${table("tsets", cols, groups, { more, open: (x) => st.open === x.id })}</div>
      <h2 class="sec">How sets work</h2>
      <div class="panel panel-body"><div class="facts">
        <span class="k">Bonuses</span><span>Each bonus comes on when you wear the number of pieces it names, and the ones before it stay.</span>
        <span class="k">Where it is filed</span><span>Under the place most of its pieces come from: a raid or dungeon, PvP rewards, quests or crafts.</span>
        <span class="k">The text</span><span>The bonuses as the server’s own spell data gives them; the 1.14.2 client may word a tooltip its own way.</span>
      </div></div>`;
    wireChips(page, "scls", (v) => { st.cls = v; render(); });
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ts = state.tsets;
    const ordered = groups.flatMap(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; return c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs; });
    wireTable("tsets", render, ordered, { click: (x) => { st.open = st.open === x.id ? null : x.id; render(); } });
  };
  render();
}
