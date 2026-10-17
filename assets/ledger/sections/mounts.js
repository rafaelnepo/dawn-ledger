import { chgs, esc, load, money, page, state, statusCounts } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";

// ---------- mounts and companions (session 99, the fourth of the categories' planned sections) ----------
// Every mount and companion the server has (ledger.py's mounts(): the Mounts and Companions windows' collectors): the ones you can
// get here, each with every way to it and where it stands, then the ones in the database no one gives, by why
const SIDES = [["Alliance", "Alliance"], ["Horde", "Horde"], ["Both", "Both sides"]];

const ways = (x) => `<div class="facts ways">${x.ways.map(([how, what, at, more]) => `<span class="k">${esc(how)}</span><span>${esc(what)}${at ? `<span class="sub">${esc(at)}</span>` : ""}${more ? `<span class="sub">${esc(more)}</span>` : ""}</span>`).join("")}${x.note ? `<span class="k">Note</span><span>${esc(x.note)}</span>` : ""}</div>`;

function list(id, rows, groups, cols, st) {
  return { html: `<div class="panel">${table(id, cols, groups.map((g) => [g, rows.filter((r) => r.group === g)]), { more: ways, open: (r) => st.open === id + r.id + r.name })}</div>`,
    ordered: () => { const ts = state[id]; const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null;
      return groups.flatMap((g) => { const rs = rows.filter((r) => r.group === g); return c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs; }); } };
}

export async function mounts() {
  nav("mounts");
  const d = await load("mounts");
  const st = (state.mounts = Object.assign({ side: "", q: "", open: null }, state.mounts || {}));
  const render = () => {
    const q = st.q.toLowerCase();
    const keep = (r) => (!st.side || r.side === st.side || r.side === "Both") && (!q || (r.name + " " + r.kind + " " + r.ways.flat().join(" ")).toLowerCase().includes(q));
    const ms = d.mounts.filter(keep), cs = d.companions.filter(keep);
    const sc = statusCounts([...d.mounts, ...d.companions].map((r) => r.side));
    const name = (r) => `<span class="qn${r.q || 0}">${esc(r.name)}</span><span class="sub">${esc(r.kind)}</span>`;
    const side = (r) => `<span class="side ${esc(r.side)}">${r.side === "Both" ? "both" : esc(r.side)}</span>`;
    const mcols = [
      ["name", "Mount", "nm", (r) => r.name, name],
      ["side", "Side", "", (r) => r.side, side],
      ["speed", "Speed", "num", (r) => r.speed, (r) => (r.speed ? `${r.speed}%` : "")],
      ["needs", "Needs", "hide-sm", (r) => r.level, (r) => [r.level ? `level ${r.level}` : "", r.skill, r.honor, r.rep].filter(Boolean).map(esc).join(" · ")],
      ["price", "Price", "num price", (r) => r.price, (r) => money(r.price)],
      ["changes", "Changes", "hide-sm", (r) => r.changes.length, (r) => chgs(r.changes)],
    ];
    const ccols = [
      ["name", "Companion", "nm", (r) => r.name, name],
      ["side", "Side", "", (r) => r.side, side],
      ["events", "When", "hide-sm", (r) => r.events.join(), (r) => (r.events.length ? esc(r.events.join(", ")) : `<span class="note">all year</span>`)],
      ["price", "Price", "num price", (r) => r.price, (r) => money(r.price)],
      ["changes", "Changes", "hide-sm", (r) => r.changes.length, (r) => chgs(r.changes)],
    ];
    const ml = list("tmounts", ms, [...new Set(d.mounts.map((r) => r.group))], mcols, st);
    const cl = list("tcomp", cs, [...new Set(d.companions.map((r) => r.group))], ccols, st);
    const ucols = [
      ["name", "Name", "nm", (u) => u[2], (u) => `${esc(u[2])}<span class="sub">${u[1] ? `item ${u[1]}` : "no item"}</span>`],
      ["kind", "Kind", "", (u) => u[0], (u) => esc(u[0])],
      ["why", "Why it is not in the game", "", (u) => u[3], (u) => `<span class="note">${esc(u[3])}</span>`],
    ];
    const filters = `<div class="filters">${chips("mside", SIDES.filter(([s]) => sc[s]).map(([s, t]) => [s, t, sc[s]]), st.side, "Every side")}</div>
      <div class="filters"><input type="search" class="xq" placeholder="Search by name, kind, place or seller…" value="${esc(st.q)}" aria-label="Search the mounts and companions"></div>`;
    page.innerHTML = `<h1 class="display">Mounts</h1>
      <p class="lead">Every mount and companion, and where each is bought or found.</p>
      <h2 class="sec">Mounts</h2>${filters}${ml.html}
      <h2 class="sec">Companions</h2>${filters}${cl.html}
      <h2 class="sec">Not in the game</h2>
      <p class="note">Mounts and companions the database holds that nothing sells, drops or gives here.</p>
      <div class="panel">${table("tunused", ucols, [["Mounts", d.unused.filter((u) => u[0] === "Mount")], ["Companions", d.unused.filter((u) => u[0] === "Companion")]], {})}</div>`;
    wireChips(page, "mside", (v) => { st.side = v; render(); });
    page.querySelectorAll("input.xq").forEach((qi, n) => qi.addEventListener("input", () => {
      st.q = qi.value; render(); const i = page.querySelectorAll("input.xq")[n]; i.focus(); i.setSelectionRange(i.value.length, i.value.length);
    }));
    [["tmounts", ml], ["tcomp", cl]].forEach(([id, l]) => wireTable(id, render, l.ordered(), { click: (r) => { const k = id + r.id + r.name; st.open = st.open === k ? null : k; render(); } }));
    wireTable("tunused", render, [], {});
  };
  render();
}
