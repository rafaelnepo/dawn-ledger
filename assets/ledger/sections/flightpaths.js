import { chgs, esc, load, money, page, state, statusCounts } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";

// ---------- flight paths (session 99, the first of the categories' planned sections) ----------
// Every flight point the client knows and someone serves (ledger.py's flightpaths(): TaxiNodes.dbc and TaxiPath.dbc's prices, the
// flight masters from the world database), the direct routes from each with their price, and the two continents drawn as a plain
// network of our own (no Blizzard map: the points at their places on the game's taxi map, the routes as lines)
const SIDES = [["Alliance", "Alliance"], ["Horde", "Horde"], ["Both", "Both sides"]];

function network(cont, pts, all, byId, open) {
  // fitted to the continent's points (all of them, so a filter doesn't move the others), one scale for both axes
  const us = all.map((p) => p.u), vs = all.map((p) => p.v);
  const u0 = Math.min(...us), v0 = Math.min(...vs), du = Math.max(...us) - u0, dv = Math.max(...vs) - v0;
  const P = 12, k = 560 / Math.max(du, dv), W = Math.round(du * k) + 2 * P, H = Math.round(dv * k) + 2 * P;
  const at = (p) => [P + (p.u - u0) * k, P + (p.v - v0) * k];
  const seen = new Set(), shown = new Set(pts.map((p) => p.id));
  let lines = "";
  for (const p of pts) for (const [to] of p.routes) {
    const q = byId[to]; const k = [p.id, to].sort((a, b) => a - b).join("-");
    if (!q || !shown.has(to) || seen.has(k)) continue;
    seen.add(k);
    const [x1, y1] = at(p), [x2, y2] = at(q);
    const side = p.side === q.side ? p.side : "Both";
    lines += `<line class="fl ${side}${open === p.id || open === to ? " on" : ""}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  const dots = pts.map((p) => {
    const [x, y] = at(p);
    return `<a href="#/flightpaths" data-pt="${p.id}" aria-label="${esc(p.name)}, ${esc(p.zone)}"><circle class="fp ${p.side}${open === p.id ? " on" : ""}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${open === p.id ? 6.5 : 4.5}"><title>${esc(p.name)} (${esc(p.zone)}) · ${p.side === "Both" ? "both sides" : p.side}</title></circle></a>`;
  }).join("");
  return `<figure class="fmap"><figcaption>${esc(cont)}<span class="n">${pts.length} points</span></figcaption>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The flight points of ${esc(cont)} and the routes between them">${lines}${dots}</svg></figure>`;
}

export async function flightpaths() {
  nav("flightpaths");
  const d = await load("flightpaths");
  const st = (state.flightpaths = Object.assign({ side: "", q: "", open: null }, state.flightpaths || {}));
  const byId = Object.fromEntries(d.points.map((p) => [p.id, p]));
  const conts = ["Eastern Kingdoms", "Kalimdor"];
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = d.points.filter((p) => (!st.side || p.side === st.side) &&
      (!q || [p.name, p.zone, ...p.masters.map((m) => m[1])].join(" ").toLowerCase().includes(q)));
    const sc = statusCounts(d.points.map((p) => p.side));
    const cost = (p) => (p.routes.length ? p.routes[0][1] : 0);
    const cols = [
      ["name", "Flight point", "nm", (p) => p.name, (p) => `${esc(p.name)}<span class="sub">${esc(p.zone)}</span>`],
      ["side", "Side", "", (p) => p.side, (p) => `<span class="side ${esc(p.side)}">${p.side === "Both" ? "both" : esc(p.side)}</span>`],
      ["master", "Flight master", "hide-sm", (p) => p.masters[0][1], (p) => p.masters.map((m) => `<a href="#/npc/${m[0]}">${esc(m[1])}</a><span class="sub">${esc(m[2])}${p.druid ? " · druids only" : ""}</span>`).join("")],
      ["routes", "Routes", "num", (p) => p.routes.length, (p) => p.routes.length],
      ["cost", "Price", "num price", cost, (p) => (p.routes.length ? `${money(p.routes[0][1])}${p.routes.length > 1 ? `<span class="sub">to ${money(p.routes[p.routes.length - 1][1])}</span>` : ""}` : "")],
      ["changes", "Changes", "hide-sm", (p) => p.changes.length, (p) => chgs(p.changes)],
    ];
    const more = (p) => `<div class="facts">
      <span class="k">Flies to</span><span class="fto">${p.routes.map(([to, c]) => `<a href="#/flightpaths" data-pt="${to}">${esc(byId[to].name)}</a> <span class="note">${money(c) || "free"}</span>`).join("<br>")}</span>
      ${p.druid ? `<span class="k">Druids only</span><span>${esc(p.masters[0][1])} flies a druid home from Moonglade, one way; there is no flight back.</span>` : ""}
      <span class="k">In the client</span><span>flight point ${p.id} (TaxiNodes)</span></div>`;
    const groups = conts.map((c) => [c, rows.filter((p) => p.cont === c)]);
    page.innerHTML = `<h1 class="display">Flight paths</h1>
      <p class="lead">Every flight master and the routes between them, with what each flight costs.</p>
      <h2 class="sec">The flight points</h2>
      <div class="filters">${chips("side", SIDES.filter(([s]) => sc[s]).map(([s, t]) => [s, t, sc[s]]), st.side, "Every side")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search by place, zone or flight master…" value="${esc(st.q)}" aria-label="Search the flight points"></div>
      <div class="panel">${table("tflight", cols, groups, { more, open: (p) => st.open === p.id })}</div>
      <h2 class="sec">The map</h2>
      <p class="note">Each continent’s flight points where the game’s flight map puts them, and every route between two of them: blue the Alliance’s, red the Horde’s, brown both sides’. Choose a point to see its routes.</p>
      <div class="fmaps">${conts.map((c) => network(c, d.points.filter((p) => p.cont === c && (!st.side || p.side === st.side || p.side === "Both")), d.points.filter((p) => p.cont === c), byId, st.open)).join("")}</div>
      <h2 class="sec">How flying works</h2>
      <div class="panel panel-body"><div class="facts">
        <span class="k">Finding a point</span><span>Talk to its flight master once to learn it. You fly only between points you have learned, hop by hop along the routes.</span>
        <span class="k">The price</span><span>Each route has its own price. A trip of several hops costs every hop’s price added up, paid when you take off.</span>
        <span class="k">Discounts</span><span>10% off at Honored with the flight master’s faction, and another 10% from PvP rank 3, as at any vendor.</span>
        <span class="k">Both sides</span><span>Ratchet and Marshal’s Refuge fly anyone. Booty Bay, Gadgetzan, Everlook, Thorium Point, Light’s Hope Chapel, Cenarion Hold and Moonglade keep a flight master for each side.</span>
        <span class="k">Druids</span><span>Two flight masters at Nighthaven fly only druids, home to Thunder Bluff or Rut’theran Village.</span>
      </div></div>`;
    wireChips(page, "side", (v) => { st.side = v; render(); });
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ordered = [];
    const ts = state.tflight;
    groups.forEach(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; ordered.push(...(c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs)); });
    wireTable("tflight", render, ordered, { click: (p) => { st.open = st.open === p.id ? null : p.id; render(); } });
    // a destination or a point on the map opens that point in the list
    page.querySelectorAll("[data-pt]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      st.open = +a.dataset.pt; st.q = ""; st.side = "";
      state["tab:flightpaths"] = 0; state["tabt:flightpaths"] = "Flight points";
      render();
      const r = page.querySelector("#tflight tr.more");
      if (r) r.previousElementSibling.scrollIntoView({ block: "center" });
    }));
  };
  render();
}
