// Find anything (session 84): one box in the rail for every name the Ledger holds: changes, items, creatures, quests, factions and
// zones. The lists load the first time the box is used; a result opens its section with that entry found and open. "/" focuses it.
import { esc, load, state } from "./core.js";

let index = null;
const KINDS = [["change", "Changes"], ["faction", "Factions"], ["zone", "Zones"], ["item", "Items"], ["npc", "Creatures"], ["quest", "Quests"]];

async function build() {
  const [c, f, z, it, n, q] = await Promise.all(["changes", "factions", "zones", "items", "npcs", "quests"].map(load));
  const rows = [];
  c.changes.forEach((x) => rows.push(["change", (x.copy && x.copy.title) || x.title, x.id, `#/change/${encodeURIComponent(x.id)}`]));
  f.groups.flatMap((g) => g.factions).forEach((x) => rows.push(["faction", x.name, x.cat || "", `#/faction/${x.id}`]));
  z.zones.forEach((x) => rows.push(["zone", x.name, x.kind, "#/zones", { sec: "zones", open: x.name }]));
  it.items.forEach((r) => rows.push(["item", r[1], `${r[5]} · item ${r[0]}`, "#/items", { sec: "items", q: r[1], open: r[0], has: false }]));
  n.npcs.forEach((r) => rows.push(["npc", r[1], [r[2], r[9]].filter(Boolean).join(" · "), "#/npcs", { sec: "npcs", q: r[1], open: r[0] }]));
  q.quests.forEach((r) => rows.push(["quest", r[1], [r[4], `level ${r[2]}`].filter(Boolean).join(" · "), "#/quests", { sec: "quests", q: r[1], open: r[0] }]));
  rows.forEach((r) => (r.lc = r[1].toLowerCase()));
  return rows;
}

function search(q) {
  const s = q.toLowerCase().trim();
  if (!s) return [];
  const words = s.split(/\s+/);
  const scored = [];
  for (const r of index) {
    if (!words.every((w) => r.lc.includes(w))) continue;
    const score = r.lc === s ? 0 : r.lc.startsWith(s) ? 1 : r.lc.split(/[\s'’-]+/).some((w) => w.startsWith(words[0])) ? 2 : 3;
    scored.push([score, r[1].length, r]);
  }
  scored.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return KINDS.map(([k, t]) => [t, scored.filter((x) => x[2][0] === k).slice(0, 6).map((x) => x[2])]).filter(([, xs]) => xs.length);
}

export function wireFind() {
  const box = document.getElementById("find"), out = document.getElementById("found");
  let hits = [], sel = -1, seq = 0;
  const close = () => { out.hidden = true; box.setAttribute("aria-expanded", "false"); sel = -1; };
  const open = (r) => {
    if (r[4]) { const { sec, ...st } = r[4]; state[sec] = Object.assign(state[sec] || {}, st, { page: 0 }); }
    close(); box.value = ""; box.blur();
    document.getElementById("rail").classList.remove("open");
    if (location.hash === r[3]) window.dispatchEvent(new HashChangeEvent("hashchange")); else location.hash = r[3];
  };
  const paint = () => {
    const groups = search(box.value);
    hits = groups.flatMap(([, xs]) => xs);
    let i = 0;
    out.innerHTML = groups.length
      ? groups.map(([t, xs]) => `<div class="fgh">${t}</div>` + xs.map((r) => `<a href="${r[3]}" role="option" data-i="${i++}"><span>${esc(r[1])}</span><span class="fs">${esc(r[2])}</span></a>`).join("")).join("")
      : `<p class="fnone">Nothing by that name. Try a shorter part of it.</p>`;
    out.hidden = !box.value.trim(); box.setAttribute("aria-expanded", String(!out.hidden));
    sel = -1;
  };
  box.addEventListener("focus", async () => { if (!index) { box.placeholder = "Opening the lists…"; index = await build(); box.placeholder = "Find anything…"; if (box.value) paint(); } });
  box.addEventListener("input", () => { const my = ++seq; if (!index) return; setTimeout(() => my === seq && paint(), 60); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); box.blur(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!hits.length) return;
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length;
      out.querySelectorAll("a").forEach((a) => a.setAttribute("aria-selected", String(+a.dataset.i === sel)));
      out.querySelector(`a[data-i="${sel}"]`).scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter" && hits.length) { e.preventDefault(); open(hits[Math.max(sel, 0)]); }
  });
  out.addEventListener("click", (e) => { const a = e.target.closest("a[data-i]"); if (a) { e.preventDefault(); open(hits[+a.dataset.i]); } });
  document.addEventListener("click", (e) => { if (!out.hidden && !e.target.closest("#found, .find")) close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !e.target.closest("input, textarea, select")) { e.preventDefault(); document.getElementById("rail").classList.add("open"); box.focus(); }
  });
}
