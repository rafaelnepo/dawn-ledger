import { esc } from "../core.js";
import { iconUrl } from "./icon.js";

// ---------- the talent calculator (session 100, the Archive's kit; the user: "talents become a calculator") ----------
// A class's three trees as the game lays them out (ledger.py's classes(): each tree's grid from TalentTreesData.lua: [name, tier, column,
// ranks, needs (its 1-based place in the tree), needs rank, icon, each rank's text]). A click spends a point, a right-click (or a long
// press) takes one back, by the game's rules: a tier asks five points more in its tree than the one before it, a talent that needs another
// waits for it to be filled, 51 points at level 60 (the first at level 10). The build lives in the address (#/classes/Mage?t=…), so a
// link shares it.
export const MAX = 51;
const spentIn = (pts) => pts.reduce((a, n) => a + n, 0);
const below = (tree, pts, tier) => tree.grid.reduce((a, g, i) => a + (g && g[1] < tier ? pts[i] : 0), 0);
// may this talent take one more point, or give one back?
function canAdd(trees, all, t, i) {
  const g = trees[t].grid[i], pts = all[t];
  if (!g || pts[i] >= g[3] || all.reduce((a, p) => a + spentIn(p), 0) >= MAX) return false;
  if (below(trees[t], pts, g[1]) < (g[1] - 1) * 5) return false;
  return !g[4] || pts[g[4] - 1] >= g[5];
}
function canRemove(trees, all, t, i) {
  const pts = all[t].slice(); if (!pts[i]) return false;
  pts[i]--;
  const tree = trees[t];
  return tree.grid.every((g, j) => !g || !pts[j] || ((below(tree, pts, g[1]) >= (g[1] - 1) * 5) && (!g[4] || pts[g[4] - 1] >= g[5])));
}
// the address's build: a tree's ranks as digits, the trees joined by "-"
export const encode = (all) => all.map((p) => p.join("").replace(/0+$/, "")).join("-");
export function decode(trees, s) {
  const parts = String(s || "").split("-");
  return trees.map((t, k) => t.grid.map((g, i) => Math.min(g ? g[3] : 0, +((parts[k] || "")[i] || 0))));
}
export function calcHtml(trees, all) {
  const total = all.reduce((a, p) => a + spentIn(p), 0);
  return `<div class="tcalc"><div class="tsum"><b class="num">${total}</b> of ${MAX} points · ${total ? `needs level ${9 + total}` : "no points spent"} · ` +
    `<span class="num">${all.map(spentIn).join(" / ")}</span><span class="tact"><button type="button" class="ft" data-treset="all"${total ? "" : " disabled"}><span class="fw">Reset</span></button>` +
    `<button type="button" class="ft" data-tlink${total ? "" : " disabled"}><span class="fw">Copy the link</span></button></span></div><div class="ttrees">${trees.map((t, k) => {
      const pts = all[k], rows = Math.max(...t.grid.filter(Boolean).map((g) => g[1]));
      return `<section class="ttree" aria-label="${esc(t.name)}"><header>${t.icon ? `<img src="${iconUrl(t.icon)}" alt="">` : ""}<h3>${esc(t.name)}</h3><span class="num">${spentIn(pts)}</span>` +
        `<button type="button" class="treset" data-treset="${k}" aria-label="Reset ${esc(t.name)}"${spentIn(pts) ? "" : " disabled"}>Reset</button></header>` +
        `<div class="tgrid" style="grid-template-rows:repeat(${rows}, auto)">${t.grid.map((g, i) => {
          if (!g) return "";
          const n = pts[i], max = g[3], add = canAdd(trees, all, k, i);
          const cls = n >= max ? "full" : n ? "some" : add ? "open" : "shut";
          return `<button type="button" class="tnode ${cls}" data-tt="${k}" data-ti="${i}" style="grid-row:${g[1]};grid-column:${g[2]}" aria-label="${esc(g[0])}, ${n} of ${max}">` +
            `${iconUrl(g[6]) ? `<img src="${iconUrl(g[6])}" alt="">` : ""}<span class="tr num">${n}/${max}</span></button>`;
        }).join("")}</div></section>`;
    }).join("")}</div><div class="ttip" hidden></div></div>`;
}
// its tooltip: the name, the rank, this rank's text and the next's, what it waits for
function tip(trees, all, k, i) {
  const t = trees[k], g = t.grid[i], n = all[k][i], max = g[3];
  const need = [];
  if (below(t, all[k], g[1]) < (g[1] - 1) * 5) need.push(`Requires ${(g[1] - 1) * 5} points in ${t.name} Talents`);
  if (g[4] && all[k][g[4] - 1] < g[5]) need.push(`Requires ${g[5]} point${g[5] > 1 ? "s" : ""} in ${t.grid[g[4] - 1][0]}`);
  return `<div class="tbox"><div class="tn">${esc(g[0])}</div><div class="tl">Rank ${n}/${max}</div>${need.map((x) => `<div class="tl ttneed">${esc(x)}</div>`).join("")}` +
    `${n ? `<div class="tl tttext">${esc(g[7][n - 1] || "")}</div>` : ""}${n < max ? `${n ? '<div class="tl k-gold ttnext">Next rank:</div>' : ""}<div class="tl tttext">${esc(g[7][n] || "")}</div>` : ""}` +
    `${n < max && canAdd(trees, all, k, i) ? '<div class="tl k-g">Click to learn</div>' : ""}${n && canRemove(trees, all, k, i) ? '<div class="tl k-gr">Right-click to unlearn</div>' : ""}</div>`;
}
// clicks: spend, take back, reset, copy the link; change(all) saves the build and draws again
export function wireCalc(root, trees, all, change) {
  const box = root.querySelector(".tcalc"); if (!box) return;
  const tipEl = box.querySelector(".ttip");
  const show = (b) => { const k = +b.dataset.tt, i = +b.dataset.ti; tipEl.innerHTML = tip(trees, all, k, i); tipEl.hidden = false;
    const r = b.getBoundingClientRect(), w = Math.min(320, innerWidth - 16); tipEl.style.width = w + "px";
    tipEl.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.right + 8)) + "px"; tipEl.style.top = Math.max(8, r.top) + "px"; };
  box.addEventListener("mouseover", (e) => { const b = e.target.closest(".tnode"); if (b) show(b); });
  box.addEventListener("mouseout", (e) => { if (e.target.closest(".tnode") && !e.relatedTarget?.closest?.(".tnode")) tipEl.hidden = true; });
  box.addEventListener("click", (e) => {
    const b = e.target.closest(".tnode");
    if (b) { const k = +b.dataset.tt, i = +b.dataset.ti; if (canAdd(trees, all, k, i)) { all[k][i]++; change(all); } return; }
    const r = e.target.closest("[data-treset]");
    if (r) { (r.dataset.treset === "all" ? all.map((_, k) => k) : [+r.dataset.treset]).forEach((k) => all[k].fill(0)); change(all); return; }
    if (e.target.closest("[data-tlink]")) { navigator.clipboard && navigator.clipboard.writeText(location.href).catch(() => {}); e.target.closest("[data-tlink]").querySelector(".fw").textContent = "Copied"; }
  });
  box.addEventListener("contextmenu", (e) => {
    const b = e.target.closest(".tnode"); if (!b) return;
    e.preventDefault();
    const k = +b.dataset.tt, i = +b.dataset.ti;
    if (canRemove(trees, all, k, i)) { all[k][i]--; change(all); }
  });
}
