import { chgs, esc, fmt, load, page, state } from "../core.js";
import { table, wireTable, nav } from "../ui.js";

// ---------- zones ----------
export async function zones() {
  nav("zones");
  const d = await load("zones");
  const st = (state.zones = state.zones || { open: null });
  const render = () => {
    const roles = (z) => [["quests", "quest givers"], ["vendor", "vendors"], ["trainer", "trainers"], ["flight master", "flight masters"], ["innkeeper", "inns"]]
      .filter(([k]) => z.roles[k]).map(([k, l]) => `${z.roles[k]} ${l}`).join(" · ");
    const cols = [
      ["name", "Zone", "nm", (z) => z.name, (z) => esc(z.name)],
      ["levels", "Levels", "num", (z) => z.levels[0], (z) => (z.levels[0] === z.levels[1] ? z.levels[0] : `${z.levels[0]}–${z.levels[1]}`)],
      ["side", "Side", "", (z) => z.side, (z) => `<span class="side ${esc(z.side)}">${esc(z.side)}</span>`],
      ["foes", "Foes", "num", (z) => z.foes, (z) => fmt(z.foes)],
      ["roles", "People", "hide-sm", (z) => z.npcs, (z) => `<span class="note">${roles(z)}</span>`],
      ["quests", "Quests", "num", (z) => z.quests, (z) => `${fmt(z.quests)}${z.ours ? `<span class="sub">${z.ours} ours</span>` : ""}`],
      ["chests", "Chests", "num", (z) => z.chests, (z) => (z.chests ? fmt(z.chests) : "")],
      ["finds", "Finds", "num hide-sm", (z) => z.finds, (z) => (z.finds ? fmt(z.finds) : "")],
      ["changes", "Changes", "", (z) => z.changes.length, (z) => chgs(z.changes.slice(0, 5)) + (z.changes.length > 5 ? `<span class="note">+${z.changes.length - 5}</span>` : "")],
    ];
    const go = (sec, key, val) => `<a href="#/${sec}" data-go="${sec}|${key}|${esc(val)}">`;
    const more = (z) => `<p>${go("npcs", "zone", z.name)}The NPCs here →</a> &nbsp; ${go("quests", "zone", z.name)}The quests here →</a> &nbsp;
      ${go("chests", "q", z.name)}The chests here →</a> &nbsp; ${go("loot", "zone", z.name)}What its creatures drop →</a></p>
      ${z.changes.length ? `<p><span class="note">Every change here:</span> ${chgs(z.changes)}</p>` : ""}`;
    page.innerHTML = `<h1 class="display">Zones</h1>
      <p class="lead">Every zone and dungeon: its levels and side, how many foes and people (and what the people do), its quests (ours
      marked), chests and finds, and every change that reached something in it. A zone opens to its NPCs, quests, chests and loot.</p>
      <h2 class="sec">The zones and dungeons</h2>
      <div class="panel">${table("tzones", cols, [["Capitals", d.zones.filter((z) => z.kind === "capital")], ["Zones", d.zones.filter((z) => z.kind === "zone")], ["Dungeons", d.zones.filter((z) => z.kind === "dungeon")]], { more, open: (z) => st.open === z.name })}</div>`;
    wireTable("tzones", render, [], {});
    page.querySelectorAll("#tzones tr.row").forEach((tr) => tr.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; const n = tr.querySelector("td.nm").textContent; st.open = st.open === n ? null : n; render();
    }));
    page.querySelectorAll("a[data-go]").forEach((a) => a.addEventListener("click", () => {
      const [sec, key, val] = a.dataset.go.split("|"); state[sec] = Object.assign(state[sec] || {}, { [key]: val, page: 0 });
    }));
  };
  render();
}
