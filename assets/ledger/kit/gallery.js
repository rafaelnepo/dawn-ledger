import { state } from "../core.js";
import { setView } from "./pagebar.js";

// ---------- the visual view and the table (session 99, the Archive's kit) ----------
// A list opens as cards (the user: "a visual documentation style where we see the actual content"); one click turns it to the
// table for sorting. The choice is kept per section while you move about.
export const viewOf = (sec) => (state["view:" + sec] = state["view:" + sec] || "cards");
// the switch itself sits in the page header since session 100 (kit/pagebar.js): viewToggle draws nothing in the page, wireView puts it there
export const viewToggle = () => "";
export const wireView = (root, sec, rerender) => setView(sec, rerender);

// a grid of cards drawn a batch at a time: the first batch at once, the next whenever the end of the grid comes into view
export function grid(id, rows, card, o = {}) {
  const per = o.batch || 120;
  return `<div class="ggrid ${o.cls || ""}" id="${id}" data-shown="${Math.min(per, rows.length)}">${rows.slice(0, per).map(card).join("")}</div>` +
    (rows.length > per ? `<div class="gmore" id="${id}-more" aria-hidden="true"></div>` : "") +
    (rows.length ? "" : `<p class="empty">Nothing matches.</p>`);
}
export function wireGrid(id, rows, card, o = {}) {
  const per = o.batch || 120, el = document.getElementById(id), end = document.getElementById(id + "-more");
  if (!el || !end) return;
  const io = new IntersectionObserver((es) => {
    if (!es.some((e) => e.isIntersecting)) return;
    const n = +el.dataset.shown;
    el.insertAdjacentHTML("beforeend", rows.slice(n, n + per).map(card).join(""));
    el.dataset.shown = Math.min(rows.length, n + per);
    if (+el.dataset.shown >= rows.length) { io.disconnect(); end.remove(); }
  }, { rootMargin: "600px" });
  io.observe(end);
}
