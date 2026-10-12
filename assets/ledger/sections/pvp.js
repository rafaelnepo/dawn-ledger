import { BG_REPS, changeCard, vendorCard } from "../cards.js";
import { esc, kindOf, load, money, page, state, status, statusCounts } from "../core.js";
import { fcol, leversPanel, ptabs, table, wireChips, wireTable, nav } from "../ui.js";

export async function pvp(tab) {
  nav("pvp");
  const [d, c] = await Promise.all([load("pvp"), load("changes")]);
  const byId = new Map(c.changes.map((x) => [x.id, x]));
  const TABS = [["ranks", "Ranks", d.ranks.length], ["battlegrounds", "Battlegrounds", d.battlegrounds.length], ["vendors", "Reward vendors", d.vendors.length],
    ["classes", "Class restrictions", null], ["changes", "Our changes", d.changes.length], ["findings", "Findings", d.findings.length], ["levers", "What can change"]];
  let pc = null;
  try { pc = await load("pvp-classes"); } catch (e) { pc = { items: [] }; }
  TABS.find((t) => t[0] === "classes")[2] = pc.items.filter((z) => z.state === "restrict").length;
  if (!TABS.some((t) => t[0] === tab)) tab = "ranks";
  const st = (state.pvp = state.pvp || { side: "", for: "", vsort: "group", kind: "", csort: "new", fstatus: "" });
  const priceText = (p) => (p ? (p[0] === p[1] ? money(p[0]) : money(p[0]) + " to " + money(p[1])) : "");
  const render = () => {
    let body = "";
    if (tab === "ranks") {
      body = `<p class="note">The fourteen ranks, the level each waits for on this server, and what each one’s quartermasters sell. Click a column to sort.</p>
        <div class="panel">${table("tranks", [
          ["rank", "Rank", "num", (r) => r.rank, (r) => r.rank],
          ["alliance", "Alliance", "nm", (r) => r.alliance, (r) => esc(r.alliance)],
          ["horde", "Horde", "nm", (r) => r.horde, (r) => esc(r.horde)],
          ["level", "Opens at level", "num", (r) => r.level, (r) => r.level],
          ["items", "Rewards", "num", (r) => r.items, (r) => r.items || ""],
          ["price", "Prices", "", (r) => (r.price ? r.price[0] : -1), (r) => priceText(r.price)],
        ], [["", d.ranks]], { sort: "rank" })}</div>`;
    } else if (tab === "battlegrounds") {
      body = `<p class="note">Each battleground by the levels it opens to; below, the bots that fill them.</p>
        <div class="panel">${table("tbgs", [
          ["name", "Battleground", "nm", (b) => b.name, (b) => esc(b.name)],
          ["levels", "Levels", "num", (b) => b.levels[0] * 100 + b.levels[1], (b) => `${b.levels[0]}–${b.levels[1]}`],
          ["min", "A side needs", "num", (b) => b.min, (b) => b.min],
          ["max", "At most", "num", (b) => b.max, (b) => b.max],
        ], [["", d.battlegrounds]], { sort: "levels" })}</div>
        <h2 class="sec">The bots by bracket</h2>
        <p class="note">Every random bot of level 10 and up, online or not (a bracket shares one game: Warsong Gulch needs 5 a side). Under 5 in red.</p>
        <div class="panel">${table("tbots", [
          ["b", "Bracket", "nm", (r) => (r[0] === "60" ? 60 : parseInt(r[0], 10)), (r) => esc(r[0])],
          ["a", "Alliance", "num", (r) => r[1], (r) => (r[1] < 5 ? `<span class="hot-amber">${r[1]}</span>` : r[1])],
          ["h", "Horde", "num", (r) => r[2], (r) => (r[2] < 5 ? `<span class="hot-amber">${r[2]}</span>` : r[2])],
        ], [["", d.bots]], { sort: "b" })}</div>`;
    } else if (tab === "vendors") {
      const GROUPS = [["Honor rank", "The ranks’ quartermasters", ["Honor rank"]], ...d.battlegrounds.map((b) => [b.name, b.name, BG_REPS[b.name] || []])];
      const groupOf = (v) => GROUPS.find((g) => g[2].includes(v.for)) || GROUPS[0];
      const pass = (v, skip) => (skip === "side" || !st.side || v.side === st.side) && (skip === "for" || !st.for || groupOf(v)[0] === st.for);
      const count = (skip, f) => d.vendors.filter((v) => pass(v, skip) && f(v)).length;
      const rows = d.vendors.filter((v) => pass(v));
      const sideN = (v) => (v.side === "Alliance" ? 0 : v.side === "Horde" ? 1 : 2);
      const KEYS = { name: [(v) => v.name, 1], rank: [(v) => (v.ranks ? v.ranks[0] : 99), 1], items: [(v) => v.items, -1], price: [(v) => v.price[1], -1], side: [sideN, 1] };
      let list;
      if (st.vsort === "group") {
        list = GROUPS.map(([k, t, reps]) => {
          const vs = rows.filter((v) => reps.includes(v.for)).sort((a, b) => sideN(a) - sideN(b) || reps.indexOf(a.for) - reps.indexOf(b.for));
          return vs.length ? `<h3 class="msub">${esc(t)}${reps[0] !== "Honor rank" ? ` <span class="n">${reps.map(esc).join(" · ")}</span>` : ""}</h3><div class="mods">${vs.map(vendorCard).join("")}</div>` : "";
        }).join("");
      } else {
        const [key, dir] = KEYS[st.vsort];
        list = `<div class="mods">${rows.slice().sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * dir || a.name.localeCompare(b.name); }).map(vendorCard).join("")}</div>`;
      }
      body = `<p class="note">The rank quartermasters (items that ask for an honor rank) and the battlegrounds’ supply officers (their reputation’s
        rewards): each one’s side, where they stand, and what they sell.</p>
        <div class="fcols panel cols3">
          ${fcol("vside", "Side", ["Alliance", "Horde"].map((k) => [k, k, count("side", (v) => v.side === k)]), st.side, "Both sides", count("side", () => true))}
          ${fcol("vfor", "Sells for", GROUPS.map(([k, t]) => [k, k === "Honor rank" ? "Honor rank" : t, count("for", (v) => groupOf(v)[0] === k)]), st.for, "Everything", count("for", () => true))}
          ${fcol("vsort", "Sort", [["group", "By what they sell for"], ["side", "Side"], ["rank", "Lowest rank"], ["items", "Most items"], ["price", "Dearest"], ["name", "Name"]], st.vsort)}
        </div>${rows.length ? list : `<p class="empty">Nothing matches.</p>`}`;
    } else if (tab === "classes") {
      // the proposal (tools/server-data/pvp_class_patch.py propose): each open reward's role and the classes it would be for
      const ROLE = { held: "Held off-hand", caster: "Spell damage", healer: "Healing", hybrid: "Hybrid", strength: "Strength", agility: "Agility", physical: "Physical", ranged: "Ranged", tank: "Tank", open: "No role" };
      const CL = (c) => c[0] + c.slice(1).toLowerCase();
      const pass = (z, skip) => (skip === "pstate" || !st.pstate || z.state === st.pstate) && (skip === "prole" || !st.prole || z.role === st.prole) &&
        (skip === "pcls" || !st.pcls || z.classes.includes(st.pcls));
      const count = (skip, f) => pc.items.filter((z) => pass(z, skip) && f(z)).length;
      const rows = pc.items.filter((z) => pass(z));
      body = `<p class="note">A proposal, nothing applied yet: the PvP rewards that belong to some classes by nature (the held off-hand tomes and nature pieces), each given the classes its magic is for,
        then narrowed to the classes that can equip it. A piece every wearer fits stays open. Review it here and in the vendor window
        (the tooltips show the proposed “Classes:” line); say what to change, then the patch follows.</p>
        <div class="fcols panel cols3">
          ${fcol("pstate", "Proposal", [["restrict", "Restrict", count("pstate", (z) => z.state === "restrict")], ["open", "Leave open", count("pstate", (z) => z.state === "open")]], st.pstate, "Every item", count("pstate", () => true))}
          ${fcol("prole", "Role", Object.keys(ROLE).map((k) => [k, ROLE[k], count("prole", (z) => z.role === k)]).filter((x) => x[2]), st.prole, "Every role", count("prole", () => true))}
          ${fcol("pcls", "For the class", ["WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN", "MAGE", "WARLOCK", "DRUID"].map((c) => [c, CL(c), count("pcls", (z) => z.classes.includes(c))]), st.pcls, "Every class", count("pcls", () => true))}
        </div>
        <div class="panel">${table("tpcls", [
          ["name", "Item", "nm", (z) => z.name, (z) => `<span class="qn${z.quality || 0}">${esc(z.name)}</span><span class="sub">item ${z.id}</span>`],
          ["role", "Role", "", (z) => z.role, (z) => esc(ROLE[z.role] || z.role)],
          ["classes", "Proposed classes", "", (z) => z.classes.join(), (z) => (z.state === "open" ? `<span class="note">Open to all</span>` : z.classes.map((c) => `<span class="badge">${CL(c)}</span>`).join(""))],
          ["why", "Why", "hide-sm", (z) => z.why, (z) => `<span class="note">${esc(z.why)}</span><span class="sub">can wear it: ${z.wear.map(CL).join(", ")}</span>`],
        ], [["", rows]], { sort: null })}</div>`;
    } else if (tab === "changes") {
      const xs = d.changes.map((k) => [k, byId.get(k)]);
      const kc = statusCounts(xs.map(([k]) => kindOf(k)));
      const rows = xs.filter(([k]) => !st.kind || kindOf(k) === st.kind);
      const KEYS = { new: [([k, x]) => (x && x.date) || "", -1], old: [([k, x]) => (x && x.date) || "", 1], session: [([k, x]) => (x && x.session) || 0, -1], name: [([k, x]) => (x ? x.title : k).toLowerCase(), 1] };
      const [key, dir] = KEYS[st.csort];
      rows.sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * dir; });
      body = `<div class="fcols panel cols2">
          ${fcol("ckind", "Kind", [["world", "World database"], ["server", "Server source"], ["proxy", "HermesProxy"], ["config", "Config"]].filter(([k]) => kc[k]).map(([k, t]) => [k, t, kc[k]]), st.kind, "Every kind", xs.length)}
          ${fcol("csort", "Sort", [["new", "Newest first"], ["old", "Oldest first"], ["session", "By session"], ["name", "Name"]], st.csort)}
        </div><div class="mods">${rows.map(([k, x]) => changeCard(x, k)).join("")}</div>`;
    } else if (tab === "findings") {
      const fc = statusCounts(d.findings.map((f) => f[2]));
      const rows = d.findings.filter((f) => !st.fstatus || f[2] === st.fstatus);
      body = `<div class="fcols panel cols2">${fcol("fstatus", "Status", Object.keys(fc).map((k) => [k, k[0].toUpperCase() + k.slice(1), fc[k]]), st.fstatus, "Every status", d.findings.length)}</div>
        <div class="panel">${table("tpfind", [
          ["id", "Finding", "nm", (f) => f[0], (f) => esc(f[0])],
          ["t", "What", "", (f) => f[1], (f) => esc(f[1])],
          ["s", "Status", "", (f) => f[2], (f) => (f[2] === "open" ? status("review") : status("seen"))],
        ], [["", rows]], { sort: "id", dir: -1 })}</div>`;
    } else {
      body = leversPanel("pvp").replace(/^<h2 class="sec">[^<]*<\/h2>/, "");
    }
    page.innerHTML = `<h1 class="display">PvP and honor</h1>
      <p class="lead">The ranks and what each opens and sells, the level each rank waits for on this server, the battlegrounds and the bots that
      fill them, who sells the rewards, and every change we made to honor. The rules: docs/server/pvp.md.</p>
      ${ptabs("pvp", TABS, tab)}<div class="ptab">${body}</div>`;
    ["tranks", "tbgs", "tbots", "tpfind", "tpcls"].forEach((id) => wireTable(id, render, [], {}));
    wireChips(page, "pstate", (v) => { st.pstate = v; render(); });
    wireChips(page, "prole", (v) => { st.prole = v; render(); });
    wireChips(page, "pcls", (v) => { st.pcls = v; render(); });
    wireChips(page, "vside", (v) => { st.side = v; render(); });
    wireChips(page, "vfor", (v) => { st.for = v; render(); });
    wireChips(page, "vsort", (v) => { st.vsort = v || "group"; render(); });
    wireChips(page, "ckind", (v) => { st.kind = v; render(); });
    wireChips(page, "csort", (v) => { st.csort = v || "new"; render(); });
    wireChips(page, "fstatus", (v) => { st.fstatus = v; render(); });
  };
  render();
}
