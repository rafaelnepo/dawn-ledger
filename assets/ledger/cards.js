import { base, chg, chgs, esc, fmt, money, page } from "./core.js";

// ---------- PvP's cards: a reward vendor, a change ----------
export const SIDE_CLS = { Alliance: "alliance", Horde: "horde" };
export const BG_REPS = { "Warsong Gulch": ["Silverwing Sentinels", "Warsong Outriders"], "Arathi Basin": ["League of Arathor", "The Defilers"],
  "Alterac Valley": ["Stormpike Guard", "Frostwolf Clan"] };
export function vendorCard(v) {
  const where = v.places.map((p) => `${esc(p.zone)}${p.pin ? ` <span class="n">${p.pin[0]}, ${p.pin[1]}</span>` : ""}`).join("<br>") || "Not spawned";
  const sells = `${fmt(v.items)} items${v.ranks ? ` · rank ${v.ranks[0]}${v.ranks[1] !== v.ranks[0] ? "–" + v.ranks[1] : ""}` : ""}`;
  const price = v.price && v.price[1] ? (v.price[0] === v.price[1] ? money(v.price[0]) : `${money(v.price[0] || 0) || "free"} to ${money(v.price[1])}`) : "";
  return `<article class="mod panel side-${SIDE_CLS[v.side] || "both"}">
    <header><h3>${esc(v.name)}</h3><span class="side ${SIDE_CLS[v.side] || ""}">${esc(v.side)}</span></header>
    <p class="mt">${esc(v.sub)}</p>
    <div class="mrow"><span class="ml">Where</span><span class="mv">${where}</span></div>
    <div class="mrow"><span class="ml">Sells</span><span class="mv">${sells}</span></div>
    ${price ? `<div class="mrow"><span class="ml">Prices</span><span class="mv">${price}</span></div>` : ""}
    <button class="shopbtn" data-shop="${v.id}" type="button">Open the shop<span class="n">${fmt(v.items)} items</span></button>
    <footer>${v.for === "Honor rank" ? "Honor rank" : esc(v.for) + " reputation"}${v.changes.length ? `<span>${chgs(v.changes)}</span>` : ""}<span class="n">npc ${v.id}</span></footer>
  </article>`;
}
// a vendor's shop: the PvP Reward Vendors window (dbsite/build/win_pvpvendors.py, on :8777) in a dialog over the page
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-shop]");
  if (b) {
    let dlg = document.getElementById("shopdlg");
    if (!dlg) {
      dlg = document.createElement("dialog"); dlg.id = "shopdlg"; dlg.className = "shopdlg";
      dlg.innerHTML = `<div class="shophead"><span>The shop, as the game shows it: pick your class, rank and standing above the window</span><button type="button" data-shopclose aria-label="Close">Close</button></div><iframe title="The vendor's shop"></iframe>`;
      document.body.append(dlg);
      dlg.addEventListener("click", (ev) => { if (ev.target === dlg || ev.target.closest("[data-shopclose]")) dlg.close(); });
    }
    dlg.querySelector("iframe").src = `http://127.0.0.1:8777/dbsite/mockups/pvp-vendors/?npc=${b.dataset.shop}&embed`;
    dlg.showModal();
  }
});
// a change as a card (session 76, the user: "a before and after approach with different colors. A small title and description of
// what it is"): the words from content/ledger/change-copy.json, the old technical title only as a fallback
export function changeCard(x, k) {
  const c = (x && x.copy) || {}, areas = x ? x.areas : [];
  const AREA = base.areas || {};
  return `<article class="mod panel chg">
    <header><h3>${esc(c.title || (x ? x.title : k))}</h3>${chg(k)}</header>
    ${c.what ? `<p class="mt">${esc(c.what)}</p>` : ""}
    ${c.before || c.after ? `<div class="ba"><div class="af"><span class="bl">After</span>${esc(c.after || "")}</div><div class="b4"><span class="bl">Before</span>${esc(c.before || "")}</div></div>` : ""}
    <footer>${x && x.date ? `<span>${esc(x.date)}</span>` : ""}${x && x.session ? `<span>session ${x.session}</span>` : ""}${areas.slice(0, 3).map((a) => `<span class="badge">${esc(AREA[a] || a)}</span>`).join("")}<a href="#/change/${encodeURIComponent(k)}">Details</a></footer>
  </article>`;
}
