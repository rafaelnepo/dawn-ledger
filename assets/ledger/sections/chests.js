import { chgs, esc, fmt, load, money, page, qbar, respawn, state, statusCounts } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";

// ---------- chests and boxes ----------
export async function chests() {
  nav("chests");
  const d = await load("chests");
  const st = (state.chests = Object.assign({ group: "", q: "", open: null }, state.chests || {}));
  const gname = Object.fromEntries(d.groups);
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = d.chests.filter((c) => (!st.group || c.group === st.group) &&
      (!q || (c.name + " " + c.where + " " + c.zones.map((z) => z[0]).join(" ")).toLowerCase().includes(q)));
    const gc = statusCounts(d.chests.map((c) => c.group));
    const cols = [
      ["name", "Chest or box", "nm", (c) => c.name + c.level, (c) => `${esc(c.name)}<span class="sub">${esc(c.where || (c.zones.length ? c.zones.slice(0, 2).map((z) => z[0]).join(", ") : c.kind === "item" ? "carried, opened" : ""))}</span>`],
      ["level", "Level", "num", (c) => c.level, (c) => c.level || ""],
      ["spots", "Spots", "num hide-sm", (c) => c.spots, (c) => (c.spots ? fmt(c.spots) : "")],
      ["out", "Out", "num", (c) => c.out, (c) => (c.spots ? fmt(c.out) : "")],
      ["respawn", "Returns", "hide-sm", (c) => (c.respawn[0] || 0), (c) => respawn(c.respawn)],
      ["lock", "Lock", "num", (c) => (typeof c.lock === "number" ? c.lock : -1), (c) => esc(c.lock)],
      ["holds", "Holds", "hide-sm", (c) => c.items, (c) => `${qbar(c.quality)} <span class="note">${c.items}</span>`],
      ["changes", "Changes", "", (c) => c.changes.length, (c) => chgs(c.changes)],
    ];
    const more = (c) => `<div class="facts">
      ${c.zones.length ? `<span class="k">Where</span><span>${c.zones.map((z) => `${esc(z[0])} (${z[1]})`).join(", ")}</span>` : ""}
      ${c.money ? `<span class="k">Money</span><span>${money(c.money[0])} to ${money(c.money[1])}</span>` : ""}
      ${c.quest_items ? `<span class="k">Quest items</span><span>${c.quest_items} (a quest needs them: left as they are)</span>` : ""}
      ${c.scripted ? `<span class="k">Scripted</span><span>A script spawns or uses it: change what it holds, not how it appears.</span>` : ""}
      <span class="k">In the database</span><span>${c.kind === "item" ? "item" : "gameobject template"} ${c.id}</span>
      <span class="k">What it holds</span><span>Every item and its chance: <a href="http://127.0.0.1:8777/dbsite/mockups/boxdrops/" target="_blank" rel="noopener">Box Drops</a></span></div>`;
    const groups = d.groups.map(([g, t]) => [t, rows.filter((c) => c.group === g)]);
    page.innerHTML = `<h1 class="display">Chests and boxes</h1>
      <p class="lead">Every chest, footlocker and box: where it stands, how many are out, how soon it returns, its lock and what it holds.</p>
      <h2 class="sec">The chests and boxes</h2>
      <div class="filters">${chips("group", d.groups.filter(([g]) => gc[g]).map(([g, t]) => [g, t, gc[g]]), st.group, "Every kind")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search by name or place…" value="${esc(st.q)}" aria-label="Search the chests"></div>
      <div class="panel">${table("tchests", cols, groups, { more, open: (c) => st.open === c.key })}</div>`;
    wireChips(page, "group", (v) => { st.group = v; render(); });
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ordered = [];
    const ts = state.tchests;
    groups.forEach(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; ordered.push(...(c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs)); });
    wireTable("tchests", render, ordered, { click: (c) => { st.open = st.open === c.key ? null : c.key; render(); } });
  };
  render();
}
