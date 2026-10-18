import { esc, page } from "../core.js";
import { nav } from "../ui.js";

// ---------- the sections still to be written (session 98, the Journal plan's Step 5): each a line and its source named, built one
// at a time later; all six written in session 99, the list kept for the next one ----------
const SOON = {
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
