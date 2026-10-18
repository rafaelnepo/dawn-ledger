import { LOCAL } from "../build.js";
import { esc, json, load, money, ROOT } from "../core.js";
import { iconUrl } from "./icon.js";

// ---------- the game's tooltips (session 99, the Archive's kit) ----------
// Anything with data-item="<id>" (and data-src: where it comes from, added under the lines) shows the item's tooltip as the game draws it: its icon beside a dark box, the name in its quality's
// color and the lines ledger.py's tips() wrote from the live item_template (itemdata.tooltip: n white, g green, gold, gr grey, q the
// yellow quote, need the slot and type, lvl the level asked, sell the price), then its set as the game lists it. The lines come in
// shards of 256 ids (data/ledger/tips/<id >> 8>.json), each fetched once, on the first hover over one of its items.
const shards = {};
export async function itemData(id) {
  const k = id >> 8;
  shards[k] = shards[k] || json(`${ROOT}data/ledger/tips/${k}.json`).catch(() => ({}));
  return (await shards[k])[id];
}
let SETS = null;
export function clearTips() {   // the game changed (live.js): read the shards and the sets again
  for (const k in shards) delete shards[k];
  SETS = null;
}
export async function setData(id) {
  SETS = SETS || load("itemsets").then((d) => Object.fromEntries(d.sets.map((s) => [s.id, s])));
  return (await SETS)[id];
}

// the game's colors on its dark box live in css/kit.css (--gq0..5, --gt-*): the lines carry classes, the names their quality's class
export const coins = money;   // the game's own coins (core.js's money: one form everywhere)
function line(l) {
  const [k, a, b] = l;
  if (k === "sell") return `<div class="tl tsell">Sell Price: ${coins(a)}</div>`;
  const right = k !== "lvl" && b != null && b !== "" ? `<span class="tr">${esc(b)}</span>` : "";
  return `<div class="tl k-${esc(k)}">${esc(a)}${right}</div>`;
}
// the set as the game lists it under a piece: its name and how many of its pieces are worn, each piece, then each bonus with the
// pieces it asks ("(2) Set: ..."); worn: the ids worn (the Archive wears none, so all are grey; the Item sets page lights them)
export function setLines(set, worn = new Set()) {
  const n = set.pieces.filter((p) => worn.has(p[0])).length;
  return `<div class="tset"><div class="tl k-gold">${esc(set.name)} (${n}/${set.pieces.length})</div>` +
    set.pieces.map((p) => `<div class="tl tpiece ${worn.has(p[0]) ? "on" : "off"}">${esc(p[1])}</div>`).join("") +
    `<div class="tgap"></div>` +
    set.bonus.map(([k, t]) => `<div class="tl tbonus ${n >= k ? "on" : "off"}">(${k}) Set: ${esc(t)}</div>`).join("") + "</div>";
}
// the whole tooltip: the icon (on this Mac) beside the box; src: where it comes from, under the game's lines (data-src on the element)
export function tipHtml(e, set, worn, src) {
  const lines = e.tt.filter((l) => LOCAL || l[0] !== "q");    // the item's quote is the game's own words: this Mac only
  const u = iconUrl(e.i);
  return (u ? `<span class="ticon q${e.q}"><img src="${u}" alt=""></span>` : "") +
    `<div class="tbox"><div class="tn gq${e.q}">${esc(e.n)}</div>${lines.map(line).join("")}` +
    (set ? setLines(set, worn) : "") + (src ? `<div class="tsrc">${esc(src)}</div>` : "") + "</div>";
}

// ---------- the one tooltip on the page, following the pointer (or the focused element) ----------
let tip, cur = null, mx = 0, my = 0;
function place() {
  const r = tip.getBoundingClientRect(), W = innerWidth, H = innerHeight;
  let x = mx + 18, y = my + 14;
  if (x + r.width > W - 8) x = Math.max(8, mx - r.width - 14);
  if (y + r.height > H - 8) y = Math.max(8, H - r.height - 8);
  tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
}
async function show(el) {
  cur = el;
  const id = +el.dataset.item;
  const e = await itemData(id);
  if (cur !== el || !e) return;
  const set = e.set ? await setData(e.set) : null;
  if (cur !== el) return;
  tip.innerHTML = tipHtml(e, set, undefined, el.dataset.src);
  tip.classList.add("show");
  place();
}
function hide() { cur = null; if (tip) tip.classList.remove("show"); }
export function wireTips() {
  if (tip) return;
  tip = document.createElement("div");
  tip.className = "gtip";
  tip.setAttribute("role", "tooltip");
  document.body.append(tip);
  document.addEventListener("mouseover", (ev) => { const el = ev.target.closest("[data-item]"); if (el && el !== cur) { mx = ev.clientX; my = ev.clientY; show(el); } });
  document.addEventListener("mousemove", (ev) => { mx = ev.clientX; my = ev.clientY; if (cur) place(); }, { passive: true });
  document.addEventListener("mouseout", (ev) => { if (cur && !cur.contains(ev.relatedTarget)) hide(); });
  document.addEventListener("focusin", (ev) => { const el = ev.target.closest("[data-item]"); if (el) { const r = el.getBoundingClientRect(); mx = r.right; my = r.top; show(el); } });
  document.addEventListener("focusout", hide);
  addEventListener("hashchange", hide);
  addEventListener("scroll", () => { if (cur) hide(); }, { passive: true });
}
