import { LOCAL } from "../build.js";
import { esc, fmt, ROOT } from "../core.js";

// ---------- the faceted filter bar (session 100, the Archive's kit; the user: "Navigation should be with clicks and filters. So if i
// select Teldrassil, then Horde should be grayed out … only show what actually exists") ----------
// Each facet narrows the others: every value shows how many rows it would leave, given everything else chosen, and a value that would
// leave none is greyed out. A short list is a row of icon toggles (the game's own pictures, data/art/ui/ on this Mac: built by
// tools/asset-extract/archive_ui_icons.py; the words alone in the public copy); a long one a dropdown. Several values of one facet
// add up (Alliance or Neutral); facets narrow each other (Teldrassil and Neutral and Beast). The choices live in the address
// (#/npcs?zone=Teldrassil&side=Neutral), so Back and a shared link find them again.
//
// A facet: { k, label, get(row) -> a value or a list of values, icons: true (toggles) or false (a dropdown), order: [values first],
//            apart: [values set off after a divider], name(v) -> the words, pic(v) -> its icon's name in data/art/ui/, title(v),
//            wcls(v) -> a class on its words (an item quality's color) }
// A check: { k, label, test(row), pic, title }: a toggle of its own, on or off.
const DIR = ROOT + ["data", "art", "ui"].join("/") + "/";
const EXT = "." + "png";
export const uiIcon = (name) => (LOCAL && name ? `<img src="${DIR}${name}${EXT}" alt="" aria-hidden="true" decoding="async">` : "");
export const slug = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const vals = (f, r) => { const v = f.get(r); return Array.isArray(v) ? v : v === "" || v == null ? [] : [v]; };
export const sel = (st, k) => (Array.isArray(st[k]) ? st[k] : st[k] ? [st[k]] : []);   // a single value set by another page counts too

// the rows that pass everything chosen but one facet (or check): what that facet's counts are taken over
function passes(r, o, st, skip) {
  if (st.q && !o.text(r).toLowerCase().includes(st.q.toLowerCase())) return false;
  for (const f of o.facets) {
    if (f.k === skip) continue;
    const s = sel(st, f.k);
    if (s.length && !vals(f, r).some((v) => s.includes(String(v)))) return false;
  }
  for (const c of o.checks || []) if (c.k !== skip && st[c.k] && !c.test(r)) return false;
  return true;
}
export const filtered = (o, st) => o.rows.filter((r) => passes(r, o, st, null));

// every facet's values with their counts (what the bar draws)
export function facetCounts(o, st) {
  const out = {};
  for (const f of o.facets) {
    const n = new Map();
    for (const r of o.rows) if (passes(r, o, st, f.k)) for (const v of vals(f, r)) n.set(String(v), (n.get(String(v)) || 0) + 1);
    if (!f._all) f._all = f.values ? f.values.map(String) : [...new Set(o.rows.flatMap((r) => vals(f, r).map(String)))];   // every value there is, once
    const all = new Set([...f._all, ...n.keys(), ...sel(st, f.k)]);
    const first = (f.order || []).map(String), apart = (f.apart || []).map(String);
    const rest = [...all].filter((v) => !first.includes(v) && !apart.includes(v));
    rest.sort(f.icons ? (a, b) => (n.get(b) || 0) - (n.get(a) || 0) || a.localeCompare(b) : (a, b) => a.localeCompare(b));
    out[f.k] = { main: [...first.filter((v) => all.has(v)), ...rest], apart: apart.filter((v) => all.has(v)), n };
  }
  for (const c of o.checks || []) out[c.k] = o.rows.reduce((a, r) => a + (passes(r, o, st, c.k) && c.test(r) ? 1 : 0), 0);
  return out;
}

const word = (f, v) => (f.name ? f.name(v) : v.charAt(0).toUpperCase() + v.slice(1));
function toggle(f, v, n, on) {
  const dis = !n && !on;
  return `<button type="button" class="ft${dis ? " none" : ""}" data-fk="${f.k}" data-fv="${esc(v)}" aria-pressed="${on}"${dis ? " disabled" : ""}` +
    `${f.title ? ` title="${esc(f.title(v))}"` : ""}>${uiIcon(f.pic ? f.pic(v) : "")}<span class="fw${f.wcls ? " " + f.wcls(v) : ""}">${esc(word(f, v))}</span><span class="fn">${fmt(n || 0)}</span></button>`;
}
// the bar: the search, the dropdowns and the checks on one line, the icon groups under it, the count and the reset
export function filterBar(o, st, extra = "") {
  const C = facetCounts(o, st);
  const any = st.q || o.facets.some((f) => sel(st, f.k).length) || (o.checks || []).some((c) => st[c.k]);
  const drop = o.facets.filter((f) => !f.icons).map((f) => {
    const cur = sel(st, f.k)[0] || "";
    return `<select data-fk="${f.k}" aria-label="${esc(f.label)}"><option value="">${esc(f.all || "Every " + f.label.toLowerCase())}</option>` +
      C[f.k].main.map((v) => { const n = C[f.k].n.get(v) || 0; return `<option value="${esc(v)}"${v === cur ? " selected" : ""}${!n && v !== cur ? " disabled" : ""}>${esc(word(f, v))} (${fmt(n)})</option>`; }).join("") + "</select>";
  }).join("");
  const checks = (o.checks || []).map((c) => `<button type="button" class="ft fcheck" data-ck="${c.k}" aria-pressed="${!!st[c.k]}"${!C[c.k] && !st[c.k] ? " disabled" : ""}` +
    `${c.title ? ` title="${esc(c.title)}"` : ""}>${uiIcon(c.pic)}<span class="fw">${esc(c.label)}</span><span class="fn">${fmt(C[c.k])}</span></button>`).join("");
  const groups = o.facets.filter((f) => f.icons).map((f) => {
    const s = sel(st, f.k), c = C[f.k];
    return `<div class="fg" role="group" aria-label="${esc(f.label)}"><span class="fgl">${esc(f.label)}</span><div class="fgb">` +
      c.main.map((v) => toggle(f, v, c.n.get(v), s.includes(v))).join("") +
      (c.apart.length ? `<span class="fsep" aria-hidden="true"></span>` + c.apart.map((v) => toggle(f, v, c.n.get(v), s.includes(v))).join("") : "") + "</div></div>";
  }).join("");
  return `<div class="fbar"><div class="frow"><input type="search" id="fq" placeholder="${esc(o.placeholder)}" value="${esc(st.q)}" aria-label="${esc(o.placeholder)}">` +
    `${drop}${checks}<span class="fsum"><b>${fmt(o.count)}</b> ${esc(o.unit)}${any ? `<button type="button" class="freset">Clear filters</button>` : ""}</span>${extra}</div>` +
    `${groups ? `<div class="fgroups">${groups}</div>` : ""}</div>`;
}
// clicks and changes on the bar: each sets the state, then rerender() draws the page again
export function wireBar(root, o, st, rerender) {
  root.querySelectorAll(".fbar .ft[data-fk]").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.fk, v = b.dataset.fv, s = sel(st, k);
    st[k] = s.includes(v) ? s.filter((x) => x !== v) : [...s, v]; st.page = 0; rerender();
  }));
  root.querySelectorAll(".fbar .ft[data-ck]").forEach((b) => b.addEventListener("click", () => { st[b.dataset.ck] = !st[b.dataset.ck]; st.page = 0; rerender(); }));
  root.querySelectorAll(".fbar select[data-fk]").forEach((s) => s.addEventListener("change", () => { st[s.dataset.fk] = s.value ? [s.value] : []; st.page = 0; rerender(); }));
  const r = root.querySelector(".fbar .freset");
  if (r) r.addEventListener("click", () => { st.q = ""; o.facets.forEach((f) => (st[f.k] = [])); (o.checks || []).forEach((c) => (st[c.k] = false)); st.page = 0; rerender(); });
}

// ---------- the address: #/<sec>?<facet>=<value>&…&q=<words> ----------
export function readAddress(o, st) {
  const raw = location.hash, i = raw.indexOf("?");
  if (i < 0) return false;
  const p = new URLSearchParams(raw.slice(i + 1));
  st.q = p.get("q") || "";
  for (const f of o.facets) st[f.k] = p.getAll(f.k);
  for (const c of o.checks || []) st[c.k] = p.get(c.k) === "1";
  return true;
}
export function writeAddress(sec, o, st) {
  const p = new URLSearchParams();
  if (st.q) p.set("q", st.q);
  for (const f of o.facets) for (const v of sel(st, f.k)) p.append(f.k, v);
  for (const c of o.checks || []) if (st[c.k]) p.set(c.k, "1");
  const qs = p.toString(), want = `#/${sec}${qs ? "?" + qs : ""}`;
  if (location.hash !== want) history.replaceState(history.state, "", want);
}
