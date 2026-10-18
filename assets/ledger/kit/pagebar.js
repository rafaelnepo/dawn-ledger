import { state } from "../core.js";

// ---------- the page header (session 100; the user: "a fixed header on the top of the pages that will stay fixed some things like the
// search bar, a button to change font from serif to sans serif, adjust font-size, change from cards to table … the header is page-level
// changes") ----------
// Fixed over the page: Find anything (find.js), the typeface, the text size, Cards or Table (on a page that has both: a page asks for it
// with setView) and the sounds' switch (feel.js puts it in .feel-slot). The typeface and the size are kept in this browser
// (archive:font, archive:size) and applied before the first paint by index.html's head.
const SIZES = [0.9, 1, 1.1, 1.2, 1.35];
const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* a private window: kept for this visit only */ } } };
const root = document.documentElement;

function drawFont() {
  const f = root.dataset.font === "sans" ? "sans" : "serif";
  document.querySelectorAll("#pagebar [data-font]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.font === f)));
}
function drawSize() {
  const z = +getComputedStyle(root).getPropertyValue("--ts") || 1, i = SIZES.indexOf(z);
  const out = document.getElementById("pbsize"); if (out) out.textContent = Math.round(z * 100) + "%";
  const [dn, up] = document.querySelectorAll("#pagebar [data-size]");
  if (dn) dn.disabled = i <= 0; if (up) up.disabled = i >= SIZES.length - 1;
}
export function wirePagebar() {
  const bar = document.getElementById("pagebar"); if (!bar) return;
  bar.addEventListener("click", (e) => {
    const f = e.target.closest("button[data-font]");   // (<html> carries data-font too)
    if (f) { if (f.dataset.font === "sans") root.dataset.font = "sans"; else delete root.dataset.font; store.set("archive:font", f.dataset.font); drawFont(); return; }
    const z = e.target.closest("button[data-size]");
    if (z) {
      const cur = +getComputedStyle(root).getPropertyValue("--ts") || 1;
      const i = Math.max(0, Math.min(SIZES.length - 1, (SIZES.indexOf(cur) < 0 ? 1 : SIZES.indexOf(cur)) + +z.dataset.size));
      root.style.setProperty("--ts", SIZES[i]); store.set("archive:size", String(SIZES[i])); drawSize();
    }
  });
  drawFont(); drawSize();
}

// ---------- Cards or Table: the page that has both draws its switch here ----------
export function setView(sec, rerender) {
  const slot = document.getElementById("pbview"); if (!slot) return;
  const v = (state["view:" + sec] = state["view:" + sec] || "cards");
  slot.innerHTML = `<span class="pbseg" role="group" aria-label="View">${[["cards", "Cards"], ["table", "Table"]].map(([k, t]) =>
    `<button type="button" data-view="${k}" aria-pressed="${v === k}">${t}</button>`).join("")}</span>`;
  slot.onclick = (e) => {
    const b = e.target.closest("[data-view]"); if (!b || state["view:" + sec] === b.dataset.view) return;
    state["view:" + sec] = b.dataset.view; rerender();
  };
}
export function clearView() { const slot = document.getElementById("pbview"); if (slot) { slot.innerHTML = ""; slot.onclick = null; } }
