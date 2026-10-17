// The shell around every page (session 84): the rail's menu on narrow screens, the footers, the local art layer, and the public build's
// pass over each page (links to what lives only on this Mac become plain words). A page never needs to know which build it is in.
import { LOCAL } from "./build.js";

export function wireShell() {
  const rail = document.getElementById("rail"), btn = document.querySelector(".menubtn"), scrim = document.querySelector(".scrim");
  const set = (on) => { rail.classList.toggle("open", on); btn.setAttribute("aria-expanded", String(on)); };
  btn.addEventListener("click", () => set(!rail.classList.contains("open")));
  scrim.addEventListener("click", () => set(false));
  rail.addEventListener("click", (e) => { if (e.target.closest("#nav a")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });

  document.getElementById("railfoot").innerHTML = LOCAL
    ? "Built on this Mac from the server’s database, its patches and the game’s files."
    : "A copy of the Ledger, published from a solo server’s own data. Names and numbers only; the game’s art stays at home.";
  document.getElementById("deskfoot").innerHTML = LOCAL
    ? "World of Warcraft and its names belong to Blizzard Entertainment; the words on these pages are ours. This copy shows the game’s art from this Mac only."
    : "World of Warcraft and its names belong to Blizzard Entertainment. This is a fan project, not made or endorsed by Blizzard; the words on these pages are ours.";

  // the local art layer (Forever's parchment, Friz Quadrata) is linked in each page's head since session 95, before the first paint
}

// each time a page draws (a filter redraws it too): the public build's pass; on a new page, the words settle onto the paper
const LOCAL_ONLY = ['drops', 'journey', 'zone', 'crafts', 'dungeons', 'festivals', 'journal', 'lockpicking'].map((p) => `a[href^="${p}.html"]`).join(", ") +
  ', a[href*="tradeskill/"], a[href*="127.0.0.1"], a[href*="localhost"]';   // the books (this Mac only), every one since session 98
export function publicPass(page) {
  if (!LOCAL) {
    page.querySelectorAll(LOCAL_ONLY).forEach((a) => { const s = document.createElement("span"); s.className = a.className; s.innerHTML = a.innerHTML; a.replaceWith(s); });
    page.querySelectorAll("[data-shop]").forEach((b) => b.remove());
    page.querySelectorAll("img.fcrest").forEach((img) => img.replaceWith(seal(img.closest(".fhead"))));
  }
  page.querySelectorAll(".fcrest.none").forEach((s) => s.replaceWith(seal(s.closest(".fhead"))));
}
export function turn(page) { page.classList.remove("turn"); void page.offsetWidth; page.classList.add("turn"); }
function seal(head) {
  const s = document.createElement("span");
  s.className = "fseal"; s.setAttribute("aria-hidden", "true");
  const h = head && head.querySelector("h3");
  s.textContent = h ? h.textContent.replace(/^(The|the)\s+/, "").trim().charAt(0) : "";
  return s;
}

// the line-break pass (session 84, the style guide: no runts or widows): a paragraph's last two words held together, so a line
// never ends a block with one short word alone; and on a phone the filter columns fold behind one button naming what is chosen
const TAILS = ".lead, .preface, .mt, .td, .sub, .mlimit, .ba > div, .rule p, .spec p, .spec li, .about p, .keys dd, .flore, .note";
export function tails(root) {
  root.querySelectorAll(TAILS).forEach((el) => {
    if (el.dataset.t) return; el.dataset.t = "1";
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null; while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) last = walker.currentNode;
    if (!last) return;
    const v = last.nodeValue, m = /(\S+) +(\S{1,14}\s*)$/.exec(v);
    if (m && v.trim().split(/\s+/).length > 1) last.nodeValue = v.slice(0, m.index) + m[1] + " " + m[2];
  });
}
export function foldFilters(root) {
  root.querySelectorAll(".fcols").forEach((fc) => {
    if (fc.previousElementSibling && fc.previousElementSibling.classList.contains("ftoggle")) return;
    const chosen = [...fc.querySelectorAll('.fo[aria-pressed="true"]')].filter((b) => b.dataset.v).map((b) => b.firstChild.textContent.trim());
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "ftoggle"; btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `<span>Filters</span><span class="fsum">${chosen.length ? chosen.join(" · ") : "Everything shown"}</span>`;
    fc.before(btn);
    let open = false; try { open = sessionStorage.getItem("ledger:filters") === "1"; } catch (e) {}
    fc.classList.toggle("folded", !open); btn.setAttribute("aria-expanded", String(open));
    btn.addEventListener("click", () => { const now = fc.classList.toggle("folded"); btn.setAttribute("aria-expanded", String(!now));
      try { sessionStorage.setItem("ledger:filters", now ? "0" : "1"); } catch (e) {} });
  });
}
