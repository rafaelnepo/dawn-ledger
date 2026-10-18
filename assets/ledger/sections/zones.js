import { chgs, esc, fmt, json, load, page, state, ROOT } from "../core.js";
import { LOCAL } from "../build.js";
import { table, wireTable, nav } from "../ui.js";
import { viewOf, wireView } from "../kit/gallery.js";
import { filterBar, filtered, readAddress, slug, uiIcon, wireBar, writeAddress } from "../kit/filters.js";

// ---------- zones (session 100, the player's review: the capitals and the dungeons apart from the zones, the user) ----------
// The zones as cards, each its map (this Mac's art) with its levels, side and what you meet there; the capitals in a row of their own
// above them; the dungeons live in Dungeons. Filters: side, continent and the levels you are (a zone belongs to every band it
// touches). A card opens the land's page, its map first. The table on the header's switch.
const BANDS = [[1, 10], [10, 20], [20, 30], [30, 40], [40, 50], [50, 60]];
const band = (z) => BANDS.filter(([a, b]) => z.levels[0] <= b && z.levels[1] >= a).map(([a, b]) => `${a}–${b}`);
const lv = (z) => (z.levels[0] === z.levels[1] ? `${z.levels[0]}` : `${z.levels[0]}–${z.levels[1]}`);
export async function zones() {
  nav("zones");
  const d = await load("zones");
  // a land's own pages and maps (#/zone/<slug>, this Mac only, session 99): the lands the zone builder writes
  const idx = LOCAL ? await json(ROOT + "data/index.json").then((x) => Object.fromEntries(x.zones.map((z) => [z.name, z]))).catch(() => ({})) : {};
  const st = (state.zones = Object.assign({ q: "", open: null }, state.zones || {}));
  const fo = { text: (z) => z.name, placeholder: "Search a zone…", unit: "places",
    facets: [{ k: "side", label: "Side", icons: true, get: (z) => z.side, order: ["Alliance", "Horde", "Contested"], pic: (v) => (v === "Contested" ? "side-both" : "side-" + slug(v)),
      title: (v) => ({ Alliance: "The Alliance’s own lands", Horde: "The Horde’s own lands", Contested: "Both sides fight over it" }[v] || v) },
      { k: "continent", label: "Continent", icons: true, get: (z) => z.continent, order: ["Eastern Kingdoms", "Kalimdor"] },
      { k: "lv", label: "Your level", icons: true, get: band, order: BANDS.map(([a, b]) => `${a}–${b}`) }] };
  readAddress(fo, st);
  const roles = (z) => [["quests", "quest givers"], ["vendor", "vendors"], ["trainer", "trainers"], ["flight master", "flight masters"], ["innkeeper", "inns"]]
    .filter(([k]) => z.roles[k]).map(([k, l]) => `${z.roles[k]} ${l}`).join(" · ");
  const card = (z) => {
    const ix = idx[z.name], href = ix ? `#/zone/${ix.slug}` : "";
    const pic = ix && ix.map ? `<span class="zpic" style="background-image:url('${ROOT}data/${esc(ix.map)}')"></span>` : `<span class="zpic none"></span>`;
    return `<${href ? `a href="${href}"` : "div"} class="zcard">${pic}<span class="zt"><span class="zn">${esc(z.name)}</span>` +
      `<span class="zs">${uiIcon(z.side === "Contested" ? "side-both" : z.side === "Alliance" || z.side === "Horde" ? "side-" + slug(z.side) : "")}<span>${esc(z.side)}</span><span class="num">· levels ${lv(z)}</span></span>` +
      `<span class="zr">${fmt(z.quests)} quests · ${fmt(z.npcs)} people · ${fmt(z.foes)} foes${z.chests ? ` · ${fmt(z.chests)} chests` : ""}</span></span></${href ? "a" : "div"}>`;
  };
  const render = () => {
    fo.rows = d.zones.filter((z) => z.kind !== "dungeon");
    const rows = filtered(fo, st);
    const caps = rows.filter((z) => z.kind === "capital"), lands = rows.filter((z) => z.kind === "zone").sort((a, b) => a.levels[0] - b.levels[0] || a.name.localeCompare(b.name));
    const cards = viewOf("zones") === "cards";
    const cols = [
      ["name", "Zone", "nm", (z) => z.name, (z) => (idx[z.name] ? `<a href="#/zone/${idx[z.name].slug}">${esc(z.name)}</a>` : esc(z.name))],
      ["levels", "Levels", "num", (z) => z.levels[0], lv],
      ["side", "Side", "", (z) => z.side, (z) => `<span class="side ${esc(z.side)}">${esc(z.side)}</span>`],
      ["foes", "Foes", "num", (z) => z.foes, (z) => fmt(z.foes)],
      ["roles", "People", "hide-sm", (z) => z.npcs, (z) => `<span class="note">${roles(z)}</span>`],
      ["quests", "Quests", "num", (z) => z.quests, (z) => `${fmt(z.quests)}${z.ours ? `<span class="sub">${z.ours} ours</span>` : ""}`],
      ["chests", "Chests", "num", (z) => z.chests, (z) => (z.chests ? fmt(z.chests) : "")],
      ["changes", "Changes", "", (z) => z.changes.length, (z) => chgs(z.changes.slice(0, 5)) + (z.changes.length > 5 ? `<span class="note">+${z.changes.length - 5}</span>` : "")],
    ];
    const more = (z) => `<p><a href="#/npcs?zone=${encodeURIComponent(z.name)}">The NPCs here →</a> &nbsp; <a href="#/quests?zone=${encodeURIComponent(z.name)}">The quests here →</a>
      &nbsp; <a href="#/chests?q=${encodeURIComponent(z.name)}">The chests here →</a></p>${z.changes.length ? `<p><span class="note">Every change here:</span> ${chgs(z.changes)}</p>` : ""}`;
    page.innerHTML = `<h1 class="display">Zones</h1>
      <p class="lead">Every land and capital: its map, its levels and side, and what you meet there. The dungeons are in Dungeons.</p>
      <h2 class="sec">The lands</h2>
      ${filterBar(Object.assign({ count: rows.length }, fo), st)}
      ${cards ? `${caps.length ? `<h3 class="grp-h">Capitals <span class="n">${caps.length}</span></h3><div class="zcards caps">${caps.map(card).join("")}</div>` : ""}
        ${lands.length ? `<h3 class="grp-h">Zones <span class="n">${lands.length}</span></h3><div class="zcards">${lands.map(card).join("")}</div>` : ""}
        ${rows.length ? "" : `<p class="empty">Nothing matches.</p>`}`
        : `<div class="panel">${table("tzones", cols, [["Capitals", caps], ["Zones", lands]], { more, open: (z) => st.open === z.name })}</div>`}
      <p class="note">Below the world: <a href="#/dungeons">every dungeon and raid</a>.</p>`;
    writeAddress("zones", fo, st);
    wireBar(page, fo, st, render);
    wireView(page, "zones", render);
    const qi = page.querySelector("#fq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#fq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    if (!cards) {
      wireTable("tzones", render, [], {});
      page.querySelectorAll("#tzones tr.row").forEach((tr) => tr.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; const n = tr.querySelector("td.nm").textContent; st.open = st.open === n ? null : n; render();
      }));
    }
  };
  render();
}
