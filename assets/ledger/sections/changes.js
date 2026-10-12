import { changeCard } from "../cards.js";
import { chgs, esc, fmt, load, page, short, state } from "../core.js";
import { fcol, wireChips, nav } from "../ui.js";

// ---------- changes ----------
export async function changes() {
  nav("changes");
  const d = await load("changes");
  const st = (state.changes = state.changes || { kind: "", area: "", q: "", sort: "new" });
  const areaName = Object.fromEntries(d.areas);
  const KINDS = [["world", "World database"], ["character", "Characters and realm"], ["server", "Server source"], ["proxy", "HermesProxy"], ["config", "Settings"]];
  const kindKey = (c) => (c.kind === "realm" ? "character" : c.kind);
  const hay = (c) => [c.id, c.title, c.text, c.copy && Object.values(c.copy).join(" ")].join(" ").toLowerCase();
  const render = () => {
    const q = st.q.toLowerCase();
    const pass = (c, skip) => (skip === "kind" || !st.kind || kindKey(c) === st.kind) && (skip === "area" || !st.area || c.areas.includes(st.area)) && (!q || hay(c).includes(q));
    const count = (skip, f) => d.changes.filter((c) => pass(c, skip) && f(c)).length;
    let rows = d.changes.filter((c) => pass(c));
    const title = (c) => (c.copy ? c.copy.title : c.title).toLowerCase();
    if (st.sort === "old") rows = rows.slice().reverse();
    else if (st.sort === "name") rows = rows.slice().sort((x, y) => title(x).localeCompare(title(y)));
    else if (st.sort === "kind") rows = rows.slice().sort((x, y) => KINDS.findIndex((k) => k[0] === kindKey(x)) - KINDS.findIndex((k) => k[0] === kindKey(y)));
    let body;
    if (st.sort === "new" || st.sort === "old") {
      const byDate = new Map();
      rows.forEach((c) => { const k = c.date || "The settings (ongoing)"; if (!byDate.has(k)) byDate.set(k, []); byDate.get(k).push(c); });
      body = [...byDate].map(([k, xs]) => `<h3 class="msub">${esc(k)}<span class="n">${xs.length}</span></h3><div class="mods chgs">${xs.map((c) => changeCard(c, c.id)).join("")}</div>`).join("");
    } else body = `<div class="mods chgs">${rows.map((c) => changeCard(c, c.id)).join("")}</div>`;
    page.innerHTML = `<h1 class="display">Changes</h1>
      <p class="lead">Every change we made to the game, in plain words: what it is, how it was before and how it is now. Open one for the
      technical details: the file, its undo, and everything it reaches.</p>
      <div class="fcols panel">
        <div class="fsearch"><input type="search" id="cq" placeholder="Search the changes…" value="${esc(st.q)}" aria-label="Search the changes"></div>
        ${fcol("ckind", "Kind", KINDS.map(([k, t]) => [k, t, count("kind", (c) => kindKey(c) === k)]), st.kind, "Every kind", count("kind", () => true))}
        ${fcol("csort", "Sort", [["new", "Newest first"], ["old", "Oldest first"], ["name", "Name"], ["kind", "Kind"]], st.sort)}
        ${fcol("carea", "Area", d.areas.map(([k, t]) => [k, t, count("area", (c) => c.areas.includes(k))]), st.area, "Every area", count("area", () => true), "wide")}
      </div>
      ${rows.length ? body : `<p class="empty">Nothing matches.</p>`}`;
    wireChips(page, "ckind", (v) => { st.kind = v; render(); });
    wireChips(page, "carea", (v) => { st.area = v; render(); });
    wireChips(page, "csort", (v) => { st.sort = v || "new"; render(); });
    const qi = page.querySelector("#cq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#cq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
  };
  render();
}
export function detailChange(c, areaName) {
  const t = c.touches || {};
  const list = (k, label) => (t[k] ? `<div><span class="k">${label}</span><span class="note">${fmt(t[k].length)}: ${t[k].slice(0, 24).join(", ")}${t[k].length > 24 ? "…" : ""}</span></div>` : "");
  return `<div class="detail">${c.text ? `<p>${esc(c.text)}</p>` : ""}${c.keys ? `<p class="note">${c.keys.map(esc).join("<br>")}</p>` : ""}
    <div class="facts">
      <span class="k">File</span><span><code>${esc(c.file)}</code>${c.undo && c.kind !== "config" && c.kind !== "server" && c.kind !== "proxy" ? " (its undo beside it)" : ""}</span>
      ${c.generator ? `<span class="k">Written by</span><span><code>${esc(c.generator)}</code></span>` : ""}
      ${c.session ? `<span class="k">Session</span><span>${c.session}${c.date ? ", " + c.date : ""}</span>` : ""}
      ${c.areas.length ? `<span class="k">Areas</span><span>${c.areas.map((a) => esc(areaName[a] || a)).join(", ")}</span>` : ""}
    </div>
    ${Object.keys(t).length ? `<div class="facts" style="margin-top:8px">${[["factions", "Factions"], ["quests", "Quests"], ["items", "Items"], ["creatures", "Creatures"], ["objects", "Chests and objects"], ["gloot", "Chest tables"], ["cloot", "Creature tables"], ["refs", "Loot lists"], ["pools", "Pools"], ["spawns", "Spawns"]].map(([k, l]) => list(k, l).replace("<div>", "").replace("</div>", "")).join("")}</div>` : ""}
    <p style="margin-top:8px"><a href="#/change/${encodeURIComponent(c.id)}">What it reaches in the Ledger →</a></p></div>`;
}
export async function changePage(id) {
  nav("changes");
  const [d, f, ch, l] = await Promise.all(["changes", "factions", "chests", "loot"].map(load));
  const c = d.changes.find((x) => x.id === id);
  if (!c) { page.innerHTML = `<p class="empty">No change named ${esc(id)}.</p>`; return; }
  const areaName = Object.fromEntries(d.areas);
  const facs = f.groups.flatMap((g) => g.factions).filter((x) => x.changes.includes(id));
  const chs = ch.chests.filter((x) => x.changes.includes(id));
  const cr = l.creatures.filter((x) => x[10].includes(id));
  const rule = l.rules.includes(id);
  page.innerHTML = `<p class="note"><a href="#/changes">Changes</a> › ${esc(short(id))}</p>
    <h1 class="display" style="font-size:34px">${esc(c.copy ? c.copy.title : c.title)}</h1>
    ${c.copy ? `<p class="lead" style="margin:6px 0 12px">${esc(c.copy.what)}</p><div class="ba wide"><div class="af"><span class="bl">After</span>${esc(c.copy.after)}</div><div class="b4"><span class="bl">Before</span>${esc(c.copy.before)}</div></div>` : ""}
    ${c.quote && c.quote.length ? `<p class="quote-user" style="margin:12px 0 8px">${c.quote.map((q) => `“${esc(q)}”`).join(" ")}</p>` : ""}
    <h2 class="sec">The technical details</h2>
    <div class="panel panel-body">${detailChange(c, areaName).replace(/<p style="margin-top:8px"><a[^]*?<\/p>/, "")}</div>
    <h2 class="sec">What it reaches</h2>
    ${rule ? `<p class="note">A rule for every creature’s loot (it touched ${fmt((c.touches.cloot || []).length)} creature tables): on the <a href="#/loot">Loot</a> page’s rules, not on each creature.</p>` : ""}
    ${facs.length ? `<p><span class="note">Factions:</span> ${facs.map((x) => `<a href="#/faction/${x.id}">${esc(x.name)}</a>`).join(", ")}</p>` : ""}
    ${chs.length ? `<p><span class="note">Chests and boxes:</span> ${chs.map((x) => `<a href="#/chests" data-key="${x.key}">${esc(x.name)}${x.where ? " (" + esc(x.where) + ")" : x.level ? " (level " + x.level + ")" : ""}</a>`).join(", ")}</p>` : ""}
    ${cr.length ? `<p><span class="note">Creatures:</span> ${cr.slice(0, 80).map((x) => `<a href="drops.html?c=${x[0]}">${esc(x[1])}</a>`).join(", ")}${cr.length > 80 ? ` and ${cr.length - 80} more` : ""}</p>` : ""}
    ${!facs.length && !chs.length && !cr.length && !rule ? `<p class="note">Nothing on the Ledger’s pages yet (items, quests, NPCs and zones come next).</p>` : ""}`;
}
