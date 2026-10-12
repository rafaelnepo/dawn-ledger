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

  // the local art layer: Forever's own parchment and Friz Quadrata over our CSS (data/ is the private folder, never published)
  if (LOCAL) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "data/art/art.css"; document.head.append(l); }
}

// each time a page draws (a filter redraws it too): the public build's pass; on a new page, the words settle onto the paper
const LOCAL_ONLY = 'a[href^="drops.html"], a[href^="journey.html"], a[href*="127.0.0.1"], a[href*="localhost"]';
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
