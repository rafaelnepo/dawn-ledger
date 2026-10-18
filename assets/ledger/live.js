import { LOCAL } from "./build.js";
import { cache, esc, ROOT } from "./core.js";
import { NAV } from "./ui.js";
import { clearTips } from "./kit/tip.js";
import { clearNpcInfo, clearQuestInfo } from "./sections/entry.js";

// ---------- the Archive follows the game (session 99, the plan's Milestone B) ----------
// dbsite/build/refresh.py rebuilds what a change to the world feeds (the local pages' watcher, a patch, the end of a game, the button
// below) and writes data/refresh.json: each section's last rebuild. Every 45 s while the page is seen, the Archive reads it; when a
// section it has shown was rebuilt, a quiet bar names what changed and draws it again on a click. "Read the game again" asks :8792 to
// run refresh.py now. This Mac only: the public copy has no refresh.
const NAME = Object.fromEntries(NAV.flatMap(([, xs]) => xs.map(([k, t]) => [k.replace(/^@|\.html.*$/g, ""), t])));
const HELPER = "http://127.0.0.1:8792/rebuild";

export function wireLive(route) {
  if (!LOCAL) return;
  let seen = null, timer = null;
  const bar = document.createElement("div");
  bar.className = "livebar";
  bar.setAttribute("role", "status");
  bar.hidden = true;
  document.body.append(bar);
  const foot = document.getElementById("railfoot");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "livebtn";
  if (foot) foot.prepend(btn);

  const read = () => fetch(`${ROOT}data/refresh.json?t=${Date.now()}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  function label(r) {
    const busy = r && r.running && r.running.length;
    btn.disabled = !!busy;
    btn.innerHTML = busy ? "Reading the game…" : "Read the game again";
    btn.title = r && r.built ? `Last read ${new Date(r.built * 1000).toLocaleString()}${r.waiting && r.waiting.length ? `; waiting to settle: ${r.waiting.join(", ")}` : ""}` : "";
  }
  async function check() {
    if (document.hidden) return;
    const r = await read();
    if (!r) return;
    label(r);
    if (!seen) { seen = r.sections || {}; return; }
    const changed = Object.keys(r.sections || {}).filter((k) => r.sections[k] !== seen[k]);
    if (!changed.length) return;
    const names = [...new Set(changed.map((k) => NAME[k] || k))];
    bar.innerHTML = `<span>The game changed: ${esc(names.join(", "))}.</span><button type="button">Show it</button>`;
    bar.hidden = false;
    bar.querySelector("button").onclick = () => {
      changed.forEach((k) => { delete cache[k]; });
      if (changed.includes("items") || changed.includes("itemsets")) clearTips();
      if (changed.includes("npcs")) clearNpcInfo();
      if (changed.includes("quests")) clearQuestInfo();
      seen = r.sections;
      bar.hidden = true;
      route();
    };
  }
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerHTML = "Reading the game…";
    try {
      await fetch(HELPER, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target: "archive" }) });
    } catch (e) { btn.disabled = false; btn.innerHTML = "The helper isn’t running"; return; }
    clearInterval(timer);   // follow the run closely, then back to the quiet pace
    timer = setInterval(async () => { const r = await read(); label(r); check(); if (r && !(r.running || []).length) { clearInterval(timer); timer = setInterval(check, 45000); } }, 5000);
  });
  timer = setInterval(check, 45000);
  check();
  document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
}
