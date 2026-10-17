import { chgs, esc, fmt, load, page, state } from "../core.js";
import { fcol, wireChips, nav } from "../ui.js";

// ---------- factions ----------
// (session 77, the user: "modules with each faction's crest, grouped as reputation-groups.json, the horizontal filter columns on
// top"): a card per reputation (its crest, the lore line, the introduction and facts as the game's Reputation tab shows them,
// then what raises it here), under our categories; the filter columns: search, Category, Side (the stamps and levers left for the
// Watcher's Console, session 95)
export function factionCard(e) {
  const L = e.lore, n = (k) => (e[k] && e[k].n ? e[k].n : 0);
  const vend = Object.values(e.vendor).reduce((a, b) => a + b, 0);
  const crest = e.crest ? `<img class="fcrest${e.crest[1] ? " major" : ""}" src="${esc(e.crest[0])}" alt="" loading="lazy">` : `<span class="fcrest none"></span>`;
  const raise = [n("quests") ? `${fmt(e.quests.n)} quests<span class="n">${fmt(e.quests.total)} rep</span>` : "",
    n("kills") ? `${fmt(e.kills.n)} kills<span class="n">${e.kills.median} each</span>` : "", vend ? `${fmt(vend)} items sold` : ""].filter(Boolean).join("");
  return `<article class="mod fmod panel">
    <a class="fhead" href="#/faction/${e.id}">${crest}<span><h3>${esc(e.name)}</h3>${L ? `<span class="flore">${esc(L.lore)}</span>` : ""}</span></a>
    <p class="mt">${esc(L ? L.intro : e.solo || e.note || "")}</p>
    ${L ? `<div class="ffacts"><div><span class="ml">${esc(L.leader[0])}</span><span class="white">${esc(L.leader[1])}</span>${L.leader[2] ? `<span class="n">– ${esc(L.leader[2])} –</span>` : ""}</div></div>` : ""}
    <div class="mrow"><span class="ml">Starts</span><span class="mv sv">${e.start.map(([w, st]) => `<span><b>${esc(st)}</b> ${esc(w)}</span>`).join("")}</span></div>
    ${raise ? `<div class="mrow"><span class="ml">Raised by</span><span class="mv">${raise}</span></div>` : ""}
    ${L && e.solo ? `<p class="mlimit">${esc(e.solo)}</p>` : ""}
    ${e.changes.length ? `<footer><span class="note">Changed by us:</span> ${chgs(e.changes)}</footer>` : ""}
  </article>`;
}
export async function factions() {
  nav("factions");
  const d = await load("factions");
  const st = (state.factions = Object.assign({ q: "", cat: "", side: "" }, state.factions || {}));
  const all = d.groups.flatMap((g) => g.factions);
  all.forEach((e) => { e.hay = [e.name, e.dbc, e.cat, e.sub, e.solo, e.note, e.lore && e.lore.lore, e.lore && e.lore.intro,
    ...(e.lore ? e.lore.leader : [])].filter(Boolean).join(" ").toLowerCase(); });
  const SIDES = [["Alliance", "Alliance"], ["Horde", "Horde"], ["both", "Both sides"]];
  const sideOf = (e) => e.side || "both";
  const render = () => {
    const q = st.q.toLowerCase();
    const pass = (e, skip) => (skip === "cat" || !st.cat || e.cat === st.cat) && (skip === "side" || !st.side || sideOf(e) === st.side) && (!q || e.hay.includes(q));
    const count = (skip, f) => all.filter((e) => pass(e, skip) && f(e)).length;
    const rows = all.filter((e) => pass(e));
    const cats = d.cats.concat(all.some((e) => !e.cat) ? [{ name: "", subs: [""] }] : []);
    const body = cats.map((c) => {
      const subs = c.subs.map((s) => [s, rows.filter((e) => e.cat === c.name && (e.sub || "") === s)]).filter(([, xs]) => xs.length);
      if (!subs.length) return "";
      const n = subs.reduce((a, [, xs]) => a + xs.length, 0);
      return `<section class="mcat"><h2 class="sec">${esc(c.name || "Not in the game’s list")}<span class="n">${n}</span></h2>` +
        subs.map(([s, xs]) => `${s ? `<h3 class="msub">${esc(s)}</h3>` : ""}<div class="mods fmods">${xs.map(factionCard).join("")}</div>`).join("") + "</section>";
    }).join("");
    page.innerHTML = `<h1 class="display">Factions</h1>
      <p class="lead">Every reputation the game lists, under the categories of Forever UI’s Reputation tab: its crest, its lore as the tab shows it,
      where it starts, what raises it on this server, and what we changed. The rules for all reputation are under the cards.</p>
      <div class="fcols panel cols3">
        <div class="fsearch"><input type="search" id="fq" placeholder="Search the factions…" value="${esc(st.q)}" aria-label="Search the factions"></div>
        ${fcol("fcat", "Category", d.cats.map((c) => [c.name, c.name, count("cat", (e) => e.cat === c.name)]), st.cat, "Every category", count("cat", () => true), "wide")}
        ${fcol("fside", "Side", SIDES.map(([k, t]) => [k, t, count("side", (e) => sideOf(e) === k)]), st.side, "Every side", count("side", () => true))}
      </div>
      ${rows.length ? body : `<p class="empty">Nothing matches.</p>`}
      <h2 class="sec">The rules for all reputation</h2>
      <div class="rules">${d.global.map((g) => `<div class="rule panel"><h4>${esc(g.title)}</h4><p>${esc(g.text)}</p>${g.note ? `<p class="note">${esc(g.note)}</p>` : ""}</div>`).join("")}</div>
      <p class="note" style="margin-top:10px">Not listed: ${esc(d.hidden_note)} (${d.hidden.map((h) => esc(h[1].trim())).join(", ")}).</p>`;
    ["cat", "side"].forEach((k) => wireChips(page, "f" + k, (v) => { st[k] = v; render(); }));
    const qi = page.querySelector("#fq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#fq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
  };
  render();
}
export async function factionPage(id) {
  nav("factions");
  const [d, c] = await Promise.all([load("factions"), load("changes")]);
  const e = d.groups.flatMap((g) => g.factions).find((x) => x.id === +id);
  if (!e) { page.innerHTML = `<p class="empty">No reputation ${esc(id)}.</p>`; return; }
  const byId = new Map(c.changes.map((x) => [x.id, x]));
  const ranks = ["Hated", "Hostile", "Unfriendly", "Neutral", "Friendly", "Honored", "Revered", "Exalted"];
  page.innerHTML = `<p class="note"><a href="#/factions">Factions</a> › ${esc(e.parent || "Other")}</p>
    <h1 class="display" style="font-size:40px">${esc(e.name)}</h1>
    ${e.solo ? `<p class="lead">${esc(e.solo)}</p>` : ""}${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
    <div class="panel panel-body"><div class="facts">
      <span class="k">Starts at</span><span>${e.start.map(([w, s, v]) => `${esc(s)} (${fmt(v)}) for ${esc(w)}`).join("; ")}</span>
      <span class="k">Quests</span><span>${e.quests ? `${fmt(e.quests.n)} quests give it (levels ${e.quests.levels[0]} to ${e.quests.levels[1]}): ${fmt(e.quests.total)} in all once, ${e.quests.repeat} repeatable${e.quests.neg ? `; ${e.quests.neg} take it away` : ""}` : "none"}</span>
      <span class="k">Kills</span><span>${e.kills ? `${fmt(e.kills.n)} creatures give it, ${e.kills.median} each (typical), up to ${Object.entries(e.kills.max).map(([k, n]) => `${k} (${n})`).join(", ")}${e.kills.neg ? `; ${e.kills.neg} take it away` : ""}` : "none"}</span>
      <span class="k">Sold at</span><span>${Object.keys(e.vendor).length ? ranks.filter((r) => e.vendor[r]).map((r) => `${e.vendor[r]} items at ${r}`).join(", ") : "nothing"}</span>
      <span class="k">Spillover</span><span>${e.spill.length ? e.spill.map(([n, r]) => `${esc(n)} ${Math.round(r * 100)} %`).join(", ") : "none"}</span>
      ${e.rate ? `<span class="k">Its own rate</span><span>quests ×${e.rate[0]}, kills ×${e.rate[1]}, spells ×${e.rate[2]} (reputation_reward_rate)</span>` : ""}
      <span class="k">In the client</span><span>${esc(e.dbc)} (faction ${e.id})</span>
    </div></div>
    ${e.changes.length ? `<p class="emarks"><span class="note">Changed by us:</span> ${chgs(e.changes)}</p>` : `<p class="note">As Blizzard made it.</p>`}
`;
}
