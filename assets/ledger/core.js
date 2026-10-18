
export const base = { changes: null, areas: null };
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const json = (u) => fetch(u, { cache: "no-cache" }).then((r) => { if (!r.ok) throw new Error(u + " " + r.status); return r.json(); });
export const cache = {};
// a page one folder down (the Tradeskill DB's, session 96) says so: <meta name="archive-root" content="../">; every path below takes it
export const ROOT = (document.querySelector('meta[name="archive-root"]') || {}).content || "";
export const load = (n) => cache[n] || (cache[n] = json(`${ROOT}data/ledger/${n}.json`));
export const page = document.getElementById("page");
export const fmt = (n) => (n == null ? "" : Number(n).toLocaleString("en-US"));
export const state = {};   // each page's filters, kept while you move about

export const SECTIONS = [["changes", "Changes"], ["review", "Review"], null, ["items", "Items"], ["npcs", "NPCs"], ["quests", "Quests"],
  ["zones", "Zones"], ["factions", "Factions"], ["chests", "Chests and boxes"], ["loot", "Loot"], ["professions", "Professions"],
  ["pvp", "PvP and honor"], null, ["interface", "Interface"]];
export const SOON = [];


// a change's short name: world 012 → 012, the server's and proxy's by their date

export const short = (id) => {
  const m = /^(world|character|realm) (\d+)$/.exec(id);
  if (m) return (m[1] === "world" ? "" : m[1] + " ") + m[2];
  const d = /(\d{4})-(\d\d)-(\d\d)$/.exec(id);
  return (id.startsWith("hermesproxy") ? "proxy " : "server ") + (d ? `${d[2]}-${d[3]}` : id);
};
export const kindOf = (id) => (/^world /.test(id) ? "world" : /^(character|realm) /.test(id) ? "world" : id.startsWith("hermesproxy") ? "proxy" : /overrides/.test(id) ? "config" : "server");
// a change's badge opens its card in the Watcher's Console (session 95: our work lives there); the public copy keeps the badge as words
const CONSOLE_KIND = { world: "world", character: "character", realm: "character", server: "server", proxy: "proxy", config: "config" };
export const chg = (id) => {
  const c = base.changes && base.changes.get(id);
  const tab = CONSOLE_KIND[(c && c.kind) || kindOf(id)] || "world";
  return `<a class="badge k-${kindOf(id)}" href="http://localhost:8777/#changes/${tab}/${encodeURIComponent(id)}" target="_blank" rel="noopener" title="${esc(c ? (c.copy && c.copy.title) || c.title : id)}">${esc(short(id))}</a>`;
};
export const chgs = (ids) => (ids || []).map(chg).join("");
export const respawn = (t) => (!t || !t.length ? "" : t.map((s) => (s < 0 ? "scripted" : s >= 86400 ? Math.round(s / 3600) + " h" : s >= 3600 ? (s / 3600).toFixed(1).replace(".0", "") + " h" : s >= 60 ? Math.round(s / 60) + " min" : s + " s")).join(", "));
// money as the game writes it: each amount then its coin (session 99: one form everywhere, <i class="coin g">; on this Mac feel.css draws
// Forever UI's own coins, the public copy colored dots, kit.css)
export const money = (c) => { if (!c) return ""; const g = Math.floor(c / 10000), s = Math.floor(c / 100) % 100, k = c % 100;
  return [[g, "g"], [s, "s"], [k, "c"]].filter(([n]) => n).map(([n, u]) => `<span class="cash">${n}<i class="coin ${u}" aria-label="${{ g: "gold", s: "silver", c: "copper" }[u]}"></i></span>`).join(" "); };
export const qbar = (q) => (q || []).map((n, i) => (n ? `<span class="q q${i}" style="width:${Math.max(3, Math.min(60, n * 2))}px" title="${n} ${["gray", "white", "green", "blue", "purple", "orange"][i]}"></span>` : "")).join("");
export const statusCounts = (rows) => { const c = {}; rows.forEach((r) => (c[r] = (c[r] || 0) + 1)); return c; };
export const uniq = (xs) => [...new Set(xs.filter((x) => x !== "" && x != null))].sort();
export const QUALITY = ["Poor", "Common", "Uncommon", "Rare", "Epic", "Legendary"];
