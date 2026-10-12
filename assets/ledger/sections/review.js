import { nav } from "../ui.js";
import { esc, load, page, status } from "../core.js";

// ---------- review ----------
export async function reviewPage() {
  nav("review");
  const d = await load("review");
  const bySec = {};
  d.items.forEach((x) => (bySec[x.section] = bySec[x.section] || []).push(x));
  page.innerHTML = `<h1 class="display">Review</h1>
    <p class="lead">Everything waiting for a look or decided and not yet applied, from every section; the findings still open; and the
    open items list’s headlines. Say “mark … ” to change a status.</p>
    ${Object.entries(bySec).map(([sec, xs]) => `<h2 class="sec">${esc(sec)}</h2><div class="panel">${xs.map((x) => `<div class="panel-body" style="border-bottom:1px solid var(--rule)">${status(x.status)} ${x.link ? `<a href="${esc(x.link)}" class="white">${esc(x.what)}</a>` : `<span class="white">${esc(x.what)}</span>`}${x.note ? `<span class="sub note">${esc(x.note)}</span>` : ""}</div>`).join("")}</div>`).join("")}
    <h2 class="sec">The open items list (docs/open-items.md)</h2>
    <div class="panel">${d.open_items.map((o) => `<div class="panel-body" style="border-bottom:1px solid var(--rule)"><span class="white">${esc(o.title)}</span>${o.text ? `<span class="sub note">${esc(o.text)}</span>` : ""}</div>`).join("")}</div>`;
}
