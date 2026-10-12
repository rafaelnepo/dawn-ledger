import { cache, esc, fmt, lever, load, page, state } from "../core.js";
import { mdRender } from "../markdown.js";
import { fcol, leversPanel, wireChips, nav } from "../ui.js";

// ---------- the interface: modules, each a box with its Forever UI files, previews, specs and addons ----------
export const STAGE = { done: ["Complete", "changed", "In game and finished for now: the user marked it"], game: ["In game", "seen", "Forever UI or another addon runs it"], preview: ["Preview only", "review", "A web preview, not in the game yet"],
  plan: ["Planned", "decided", "A spec or research, nothing built yet"], web: ["Web tool", "blizzard", "A page of ours outside the game"] };
export const stageOf = (m) => (m.done ? "done" : m.lua.length || m.addons.length ? "game" : m.web ? "web" : m.windows.length || m.previews.length ? "preview" : "plan");
export const stageChip = (k) => `<span class="st ${STAGE[k][1]}" title="${esc(STAGE[k][2])}">${esc(STAGE[k][0])}</span>`;
export const leverOf = (m) => m.lever || (m.web ? "" : "addon");
export const fsum = (m) => { const c = {}; m.lua.forEach((f) => Object.entries(f.findings).forEach(([k, n]) => (c[k] = (c[k] || 0) + n))); return c; };
export const SORTS = [["cat", "By category"], ["name", "Name"], ["last", "Recently changed"], ["lines", "Size"], ["findings", "Findings"]];

export let SHARED = {};   // a Forever UI file named by more than one module → those modules' titles
export function moduleCard(m) {
  const k = m.stage, f = fsum(m), nf = Object.values(f).reduce((a, b) => a + b, 0);
  const row = (label, html) => (html ? `<div class="mrow"><span class="ml">${label}</span><span class="mv">${html}</span></div>` : "");
  const lua = m.lua.map((x) => { const o = (SHARED[x.file] || []).filter((t) => t !== m.title);
    return `<span class="mf" title="${esc(x.about)}${o.length ? esc(" Shared with " + o.join(", ") + ".") : ""}">${esc(x.file.replace(/\.lua$/, ""))}<span class="n">${fmt(x.lines)}${o.length ? " · shared" : ""}</span></span>`; }).join("");
  const prev = [...m.windows, ...m.previews].map((p) => `<a href="${esc(p.url)}" target="_blank" rel="noopener" title="${esc(p.note || p.kind)}">${esc(p.kind === "web window" ? p.title : p.title)}${p.kind === "web window" ? "" : `<span class="n">FUI</span>`}</a>`).join("");
  const specs = m.specs.map((x) => `<a class="ms" href="#/spec/${encodeURIComponent(x.file.split("/").pop())}" title="${esc(x.title + " · " + x.file)}">${esc(x.title.replace(/\s*[:(].*$/, "") || x.title)}</a>`).join("");
  const adds = m.addons.map((a) => `<span class="mf" title="${esc(a.notes)}">${esc(a.title.replace(/\|c\w{8}|\|r/g, ""))}${a.version ? `<span class="n">${esc(a.version)}</span>` : ""}</span>`).join("");
  const lv = leverOf(m);
  return `<article class="mod panel st-${k}" id="m-${esc(m.id)}">
    <header><h3>${esc(m.title)}</h3>${stageChip(k)}</header>
    <p class="mt">${esc(m.text || "")}</p>${m.done ? `<p class="mlimit">${esc(m.done)}</p>` : ""}
    ${row("Forever UI", lua)}${row("Addons", adds)}${row("Previews", prev)}${row("Specs", specs)}
    ${m.limit ? `<p class="mlimit">${lever("client")} ${esc(m.limit)}</p>` : ""}
    <footer>${lv ? lever(lv) : ""}${m.last ? `<span>${esc(m.last)}</span>` : ""}${m.lines ? `<span>${fmt(m.lines)} lines</span>` : ""}${nf ? `<span>${Object.entries(f).map(([s, n]) => `${n} ${s}`).join(", ")}</span>` : ""}</footer>
  </article>`;
}

export async function interfacePage() {
  nav("interface");
  const d = await load("interface");
  const st = (state.interface = state.interface || { q: "", stage: "", lever: "", cat: "", sort: "cat" });
  const mods = [];
  SHARED = {};
  d.categories.forEach((c) => c.subs.forEach((s) => s.modules.forEach((m) => m.lua.forEach((f) => (SHARED[f.file] = SHARED[f.file] || []).push(m.title)))));
  Object.keys(SHARED).forEach((k) => SHARED[k].length < 2 && delete SHARED[k]);
  d.categories.forEach((c) => c.subs.forEach((s) => s.modules.forEach((m) => {
    m.cat = c.name; m.sub = s.name; m.stage = stageOf(m);
    m.lines = m.lua.reduce((a, f) => a + f.lines, 0);
    m.last = m.lua.map((f) => f.last).sort().pop() || "";
    m.nf = Object.values(fsum(m)).reduce((a, b) => a + b, 0);
    m.hay = [m.title, m.text, m.limit, ...m.lua.map((x) => x.file), ...m.specs.map((x) => x.title + " " + x.file), ...m.windows.map((x) => x.title + " " + x.note),
      ...m.previews.map((x) => x.title), ...m.addons.map((x) => x.title)].join(" ").toLowerCase();
    mods.push(m);
  })));
  const LEVER_F = [["addon", "Addon"], ["limits", "Has limits"], ["client", "Can’t"]];
  const leverHit = (m, v) => (v === "limits" ? !!m.limit : v === "client" ? leverOf(m) === "client" : v === "none" ? !leverOf(m) : leverOf(m) === v);
  const render = () => {
    const q = st.q.toLowerCase();
    const pass = (m, skip) => (skip === "stage" || !st.stage || (st.stage === "missing" ? m.stage === "preview" || m.stage === "plan" : m.stage === st.stage)) &&
      (skip === "lever" || !st.lever || leverHit(m, st.lever)) && (skip === "cat" || !st.cat || m.cat === st.cat) && (!q || m.hay.includes(q));
    const rows = mods.filter((m) => pass(m));
    const count = (skip, f) => mods.filter((m) => pass(m, skip) && f(m)).length;
    const stages = [["missing", "Not in game yet", count("stage", (m) => m.stage === "preview" || m.stage === "plan")],
      ...Object.keys(STAGE).map((k) => [k, STAGE[k][0], count("stage", (m) => m.stage === k)])];
    let body;
    if (st.sort === "cat") {
      body = d.categories.map((c) => {
        const subs = c.subs.map((s) => [s.name, rows.filter((m) => m.cat === c.name && m.sub === s.name)]).filter(([, xs]) => xs.length);
        if (!subs.length) return "";
        const n = subs.reduce((a, [, xs]) => a + xs.length, 0);
        return `<section class="mcat"><h2 class="sec">${esc(c.name)}<span class="n">${n}</span></h2>` +
          subs.map(([name, xs]) => `<h3 class="msub">${esc(name)}</h3><div class="mods">${xs.map(moduleCard).join("")}</div>`).join("") + "</section>";
      }).join("");
    } else {
      const key = { name: (m) => m.title.toLowerCase(), last: (m) => m.last, lines: (m) => m.lines, findings: (m) => m.nf }[st.sort];
      const dir = st.sort === "name" ? 1 : -1;
      const xs = rows.slice().sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * dir; });
      body = `<div class="mods">${xs.map((m) => moduleCard(m).replace("<header>", `<div class="mcatline">${esc(m.cat)} · ${esc(m.sub)}</div><header>`)).join("")}</div>`;
    }
    page.innerHTML = `<h1 class="display">Interface</h1>
      <p class="lead">Forever UI ${esc(d.version)} and everything around it as modules: each holds its Forever UI files, its web previews, its specs and
      the other addons that serve it. ${mods.length} modules; ${d.files.length} files, ${d.previews.length} previews, ${d.specs.length} specs, ${d.addons.length} addons.
      Forever UI’s findings: ${Object.entries(d.findings.counts).map(([k, n]) => `${n} ${k}`).join(", ")}${d.findings.open.length ? `; open: ${d.findings.open.map((f) => esc(f[0])).join(", ")}` : ""}.</p>
      <div class="fcols panel">
        <div class="fsearch"><input type="search" id="iq" placeholder="Search the modules…" value="${esc(st.q)}" aria-label="Search the modules"></div>
        ${fcol("istage", "Stage", stages, st.stage, "Every stage", count("stage", () => true))}
        ${fcol("ilever", "Change it", LEVER_F.map(([k, t]) => [k, t, count("lever", (m) => leverHit(m, k))]), st.lever, "Every kind", count("lever", () => true))}
        ${fcol("icat", "Category", d.categories.map((c) => [c.name, c.name, count("cat", (m) => m.cat === c.name)]), st.cat, "Every category", count("cat", () => true), "wide")}
        ${fcol("isort", "Sort", SORTS, st.sort)}
      </div>
      ${rows.length ? body : `<p class="empty">Nothing matches.</p>`}
      ${leversPanel("interface")}`;
    wireChips(page, "istage", (v) => { st.stage = v; render(); });
    wireChips(page, "ilever", (v) => { st.lever = v; render(); });
    wireChips(page, "icat", (v) => { st.cat = v; render(); });
    wireChips(page, "isort", (v) => { st.sort = v || "cat"; render(); });
    const qi = page.querySelector("#iq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#iq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
  };
  render();
  page.addEventListener("click", (e) => { if (e.target.closest('a[href^="#/spec/"]')) st.y = window.scrollY; });
  if (st.y) { const y = st.y; st.y = 0; requestAnimationFrame(() => window.scrollTo(0, y)); return "keep"; }
}
export async function specPage(name) {
  nav("interface");
  const r = await fetch(`data/ledger/specs/${encodeURIComponent(name)}`, { cache: "no-cache" });
  if (!r.ok) { page.innerHTML = `<p class="empty">No spec called ${esc(name)}. Build it with <code>python3 dbsite/build/ledger.py interface</code>.</p>`; return; }
  const d = await load("interface");
  let mod = null;
  const file = (d.specs.find((x) => x.file.endsWith("/" + name)) || { file: `docs/specs/${name}` }).file;
  d.categories.forEach((c) => c.subs.forEach((s) => s.modules.forEach((m) => { if (m.specs.some((x) => x.file.endsWith("/" + name))) mod = [c.name, s.name, m]; })));
  page.innerHTML = `<p class="crumbs"><a href="#/interface">Interface</a>${mod ? ` · ${esc(mod[0])} · ${esc(mod[1])} · <span class="white">${esc(mod[2].title)}</span>` : ""}</p>
    <article class="spec panel"><p class="note"><code>${esc(file)}</code></p>${mdRender(await r.text())}</article>`;
  window.scrollTo(0, 0);
}
