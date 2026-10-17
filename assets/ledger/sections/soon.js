import { esc, page } from "../core.js";
import { nav } from "../ui.js";

// ---------- the sections still to be written (session 98, the Journal plan's Step 5): each a line and its source named, built one
// at a time later ----------
const SOON = {
  itemsets: ["Item sets", "The sets of gear that belong together, their pieces and the bonuses they give.",
    "the item sets the Dressing Room already shows (its 172 sets)"],
  books: ["Books", "Every book, letter and plaque you can read in the world, and where it lies.",
    "the world’s readable texts (worlddata.extra(); the book window's web copy, win_books.py)"],
};
export function soon(key) {
  return async () => {
    nav(key);
    const [title, about, source] = SOON[key];
    page.innerHTML = `<h1 class="display">${esc(title)}</h1><p class="lead">${esc(about)}</p>
      <div class="panel"><p class="note">This section is still to be written. Its source: ${esc(source)}.</p></div>`;
  };
}
export const SOON_KEYS = Object.keys(SOON);
