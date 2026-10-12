import { STATUS, base, chg, chgs, esc, fmt, lever, load, page, state, status } from "../core.js";
import { table, nav } from "../ui.js";

// ---------- loot ----------
export async function loot() {
  nav("loot");
  const [d, c] = await Promise.all([load("loot"), load("changes")]);
  const byId = new Map(c.changes.map((x) => [x.id, x]));
  const st = (state.loot = Object.assign({ q: "", zone: "", type: "", rank: "", changed: false, page: 0 }, state.loot || {}));
  const zones = [...new Set(d.creatures.map((r) => r[4]).filter(Boolean))].sort();
  const types = [...new Set(d.creatures.map((r) => r[6]).filter(Boolean))].sort();
  const ranks = [...new Set(d.creatures.map((r) => r[5]).filter(Boolean))].sort();
  const PER = 100;
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = d.creatures.filter((r) => (!q || r[1].toLowerCase().includes(q)) && (!st.zone || r[4] === st.zone) && (!st.type || r[6] === st.type) &&
      (!st.rank || r[5] === st.rank) && (!st.changed || r[10].length));
    const cols = [
      ["name", "Creature", "nm", (r) => r[1], (r) => `<a href="drops.html?c=${r[0]}" title="Every drop and its chance">${esc(r[1])}</a>`],
      ["level", "Level", "num", (r) => r[2], (r) => (r[2] === r[3] ? r[2] : `${r[2]}–${r[3]}`)],
      ["rank", "Rank", "", (r) => r[5], (r) => esc(r[5])],
      ["type", "Type", "hide-sm", (r) => r[6], (r) => esc(r[6])],
      ["zone", "Zone", "hide-sm", (r) => r[4], (r) => esc(r[4])],
      ["lines", "Drops", "num", (r) => r[7], (r) => `${r[7]}<span class="sub">${r[8]} own, ${r[9]} lists</span>`],
      ["changes", "Changes", "", (r) => r[10].length, (r) => chgs(r[10])],
      ["status", "Status", "", (r) => Object.keys(STATUS).indexOf(r[11]), (r) => status(r[11])],
    ];
    const ts = (state.tloot = state.tloot || { sort: null, dir: 1 });
    let sorted = rows;
    if (ts.sort) { const col = cols.find((x) => x[0] === ts.sort); sorted = rows.slice().sort((a, b) => { const x = col[3](a), y = col[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }); }
    const pages = Math.max(1, Math.ceil(sorted.length / PER));
    st.page = Math.min(st.page, pages - 1);
    const slice = sorted.slice(st.page * PER, st.page * PER + PER);
    const opt = (v, cur) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(v)}</option>`;
    page.innerHTML = `<h1 class="display">Loot</h1>
      <p class="lead">What every creature drops on this server, from the server’s own tables, not from what an addon once counted. The rules we
      changed for all creatures first; then each creature, with the patches that touched its own table or the lists it rolls. A creature’s
      name opens every drop and its chance.</p>
      <h2 class="sec">The rules we changed for all creatures</h2>
      <div class="rules">${d.rules.map((id) => { const x = byId.get(id); return `<div class="rule panel"><h4>${esc(x ? x.title : id)}</h4>${x && x.quote && x.quote[0] ? `<p class="quote-user">“${esc(x.quote[0])}”</p>` : ""}<div class="meta">${chg(id)} ${x ? `<span class="note">${fmt((x.touches.cloot || []).length)} creature tables</span>` : ""}</div></div>`; }).join("")}</div>
      <h2 class="sec">What is easy to change, and what to leave</h2>
      <div class="panel panel-body"><ul class="levers">${(base.levers.areas.loot || []).map(([k, t]) => `<li>${lever(k)}<span>${esc(t)}</span></li>`).join("")}</ul></div>
      <h2 class="sec">The creatures</h2>
      <div class="filters"><input type="search" id="lq" placeholder="Search a creature…" value="${esc(st.q)}" aria-label="Search the creatures">
        <select id="lz" aria-label="Zone"><option value="">Every zone</option>${zones.map((z) => opt(z, st.zone)).join("")}</select>
        <select id="lt" aria-label="Type"><option value="">Every type</option>${types.map((z) => opt(z, st.type)).join("")}</select>
        <select id="lr" aria-label="Rank"><option value="">Every rank</option>${ranks.map((z) => opt(z, st.rank)).join("")}</select>
        <label><input type="checkbox" id="lc"${st.changed ? " checked" : ""}> Changed only</label>
        <span>${fmt(rows.length)} creatures</span></div>
      <div class="panel">${table("tloot", cols, [["", slice]], {})}</div>
      <div class="pager"><button id="pp"${st.page ? "" : " disabled"}>Back</button><span>Page ${st.page + 1} of ${pages}</span><button id="pn"${st.page < pages - 1 ? "" : " disabled"}>Next</button></div>`;
    // the table sorts the whole list, not the page: its heads set the sort and render again
    document.querySelectorAll("#tloot th[data-sort]").forEach((th) => th.addEventListener("click", () => {
      const k = th.dataset.sort; if (ts.sort === k) ts.dir = -ts.dir; else { ts.sort = k; ts.dir = 1; } st.page = 0; render();
    }));
    const re = (k, v) => { st[k] = v; st.page = 0; render(); };
    const qi = page.querySelector("#lq");
    qi.addEventListener("input", () => { re("q", qi.value); const i = page.querySelector("#lq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    page.querySelector("#lz").addEventListener("change", (e) => re("zone", e.target.value));
    page.querySelector("#lt").addEventListener("change", (e) => re("type", e.target.value));
    page.querySelector("#lr").addEventListener("change", (e) => re("rank", e.target.value));
    page.querySelector("#lc").addEventListener("change", (e) => re("changed", e.target.checked));
    page.querySelector("#pp").addEventListener("click", () => { st.page--; render(); });
    page.querySelector("#pn").addEventListener("click", () => { st.page++; render(); });
  };
  render();
}
