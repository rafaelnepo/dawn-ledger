import { chg, esc, fmt, load, page } from "../core.js";
import { nav, ptabs } from "../ui.js";
import { LOCAL } from "../build.js";

// Loot's two tabs (session 100): By creature (sections/drops.js, this Mac only) and the rules
export const LOOT_TABS = (cur) => ptabs("loot", [["creatures", "By creature"], ["rules", "The rules we changed"]], cur);

// ---------- loot: the rules we changed for every creature (session 100: the creatures' list went to By creature, sections/drops.js) ----------
export async function lootRules() {
  nav("loot");
  const [d, c] = await Promise.all([load("loot"), load("changes")]);
  const byId = new Map(c.changes.map((x) => [x.id, x]));
  page.innerHTML = `<h1 class="display">Loot</h1>
    <p class="lead">What every creature drops, from the server’s own tables: the rules we changed for all of them${LOCAL ? ", and each creature" : ""}.</p>
    ${LOCAL ? LOOT_TABS("rules") : ""}
    <h2 class="sec">The rules we changed for all creatures</h2>
    <div class="rules">${d.rules.map((id) => { const x = byId.get(id); return `<div class="rule panel"><h4>${esc(x ? x.title : id)}</h4>${x && x.quote && x.quote[0] ? `<p class="quote-user">“${esc(x.quote[0])}”</p>` : ""}<div class="meta">${chg(id)} ${x ? `<span class="note">${fmt((x.touches.cloot || []).length)} creature tables</span>` : ""}</div></div>`; }).join("")}</div>`;
}
