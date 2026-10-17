import { esc, fmt, load, money, page, state, uniq } from "../core.js";
import { chips, ptabs, table, wireChips, wireTable, nav } from "../ui.js";

// ---------- classes (session 99, the third of the categories' planned sections) ----------
// A page a class (#/classes/<Name>): its races, power, base health and mana, what it may wear and wield (ledger.py's classes():
// player_classlevelstats, SkillRaceClassInfo.dbc), the spells its trainers teach by level with their price (TrainerData.lua, from the
// server's npc_trainer) and its three talent trees, each talent's row, ranks and its last rank's text
const BRACKETS = [[1, 9], [10, 19], [20, 29], [30, 39], [40, 49], [50, 60]];

export async function classes(arg) {
  nav("classes");
  const d = await load("classes");
  const st = (state.classes = Object.assign({ q: "", line: "", open: null }, state.classes || {}));
  const c = d.classes.find((x) => x.name.toLowerCase() === String(arg || "").toLowerCase()) || d.classes[0];
  if (st.cls !== c.name) Object.assign(st, { cls: c.name, q: "", line: "", open: null });
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = c.spells.filter((s) => (!st.line || s[5] === st.line) && (!q || (s[1] + " " + s[8]).toLowerCase().includes(q)));
    const lines = uniq(c.spells.map((s) => s[5]));
    const cols = [
      ["level", "Level", "num", (s) => s[3], (s) => s[3] || ""],
      ["name", "Spell", "nm", (s) => s[1], (s) => `${esc(s[1])}${s[2] ? `<span class="sub">${esc(s[2])}</span>` : ""}`],
      ["line", "School", "hide-sm", (s) => s[5], (s) => `<span class="note">${esc(s[5])}</span>`],
      ["cost", "Price", "num price", (s) => s[4], (s) => money(s[4])],
      ["needs", "Needs", "hide-sm", (s) => s[7] + s[6].join(), (s) => [s[7] ? `the talent ${esc(s[7])}` : "", s[6].length ? `${esc(s[6].join(", "))} only` : ""].filter(Boolean).join("; ")],
    ];
    const key = (s) => s[0];
    const more = (s) => `<p class="mt">${esc(s[8])}</p>`;
    const groups = [...BRACKETS.map(([a, b]) => [`Levels ${a}–${b}`, rows.filter((s) => s[3] >= a && s[3] <= b)])];
    const fact = (k, v) => `<span class="k">${k}</span><span>${v}</span>`;
    const armor = c.armor.map(([a, lv]) => (lv > 1 ? `${esc(a)} <span class="note">from level ${lv}</span>` : esc(a))).join(", ");
    page.innerHTML = `<h1 class="display">Classes</h1>
      <p class="lead">Each class: what it can wear, the spells its trainers teach by level and its talents.</p>
      ${ptabs("classes", d.classes.map((x) => [x.name, x.name]), c.name)}
      <div class="panel panel-body"><div class="facts">
        ${fact("Races", c.races.map(esc).join(", "))}
        ${fact("Power", esc(c.power))}
        ${fact("Base health", `${fmt(c.health[0])} at level 1, ${fmt(c.health[1])} at 60 <span class="note">before Stamina</span>`)}
        ${c.mana[0] ? fact("Base mana", `${fmt(c.mana[0])} at level 1, ${fmt(c.mana[1])} at 60 <span class="note">before Intellect</span>`) : ""}
        ${fact("Armor", armor)}
        ${fact("Weapons", c.weapons.map(esc).join(", "))}
      </div></div>
      <h2 class="sec">Spells by level</h2>
      <div class="filters">${chips("cline", lines.map((l) => [l, l, c.spells.filter((s) => s[5] === l).length]), st.line, "Every school")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search the spells…" value="${esc(st.q)}" aria-label="Search the spells"></div>
      <div class="panel">${table("tcspells", cols, groups, { more, open: (s) => st.open === key(s) })}</div>
      <h2 class="sec">Talents</h2>
      <p class="note">The three trees, a talent a line by its row; its text is its last rank’s.</p>
      <div class="mods trees">${c.trees.map((t) => `<article class="mod tree"><header><h3>${esc(t.name)}</h3><span class="n">${t.talents.length} talents</span></header>
        <ol class="traits">${t.talents.map(([n, row, ranks, text]) => `<li><b>${esc(n)}</b><span class="n">row ${row} · ${ranks} ${ranks === 1 ? "rank" : "ranks"}</span><span class="tt">${esc(text)}</span></li>`).join("")}</ol></article>`).join("")}</div>`;
    wireChips(page, "cline", (v) => { st.line = v; render(); });
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ordered = [];
    const ts = state.tcspells;
    groups.forEach(([, rs]) => { const x = ts && ts.sort ? cols.find((y) => y[0] === ts.sort) : null; ordered.push(...(x ? rs.slice().sort((a, b) => { const u = x[3](a), v = x[3](b); return (u < v ? -1 : u > v ? 1 : 0) * ts.dir; }) : rs)); });
    wireTable("tcspells", render, ordered, { click: (s) => { st.open = st.open === key(s) ? null : key(s); render(); } });
  };
  render();
}
