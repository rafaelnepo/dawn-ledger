import { esc, load, page, state, statusCounts } from "../core.js";
import { chips, table, wireChips, wireTable, nav } from "../ui.js";
import { LOCAL } from "../build.js";

// ---------- books (session 99, the last of the categories' planned sections) ----------
// Every book, letter and plaque you can read (ledger.py's books(): the book reader's collect()): its kind, pages and where it lies or
// comes from, never its text (Blizzard's words stay in the game); on this Mac a book opens in the book reader, inside the Console
const KINDS = ["Plaques and books in the world", "Books and notes", "Letters that start a quest", "Quest papers"];
const reader = (key) => `http://localhost:8777/#open/${encodeURIComponent(`http://localhost:8777/dbsite/mockups/books/?book=${key}`)}`;
const place = (p) => `${esc(p[0])}${p.length > 3 ? ` <span class="note">${p[2]}, ${p[3]}</span>` : ""}`;

export async function books() {
  nav("books");
  const d = await load("books");
  const st = (state.books = Object.assign({ kind: "", q: "", open: null }, state.books || {}));
  const render = () => {
    const q = st.q.toLowerCase();
    const rows = d.books.filter((b) => (!st.kind || b.kind === st.kind) && (!q || [b.name, ...b.at.map((p) => p[0]), ...b.src].join(" ").toLowerCase().includes(q)));
    const kc = statusCounts(d.books.map((b) => b.kind));
    const cols = [
      ["name", "Book", "nm", (b) => b.name, (b) => `<span class="qn${b.q}">${esc(b.name)}</span>`],
      ["pages", "Pages", "num", (b) => b.pages, (b) => b.pages],
      ["where", "Where", "", (b) => (b.at[0] || b.src || [""])[0], (b) => (b.at.length ? place(b.at[0]) + (b.at.length + b.more > 1 ? `<span class="sub">and ${b.at.length + b.more - 1} more</span>` : "") : `<span class="note">${esc(b.src[0] || "")}</span>`)],
      ["mat", "Page", "hide-sm", (b) => b.mat, (b) => `<span class="note">${esc(b.mat)}</span>`],
    ];
    const more = (b) => `<div class="facts">
      ${b.at.length ? `<span class="k">Where</span><span>${b.at.map(place).join("<br>")}${b.more ? `<br><span class="note">and ${b.more} more</span>` : ""}</span>` : ""}
      ${b.src.length ? `<span class="k">Found</span><span>${b.src.map(esc).join("<br>")}</span>` : ""}
      ${LOCAL ? `<span class="k">Read it</span><span><a href="${reader(b.key)}" target="_top">In the book reader →</a></span>` : ""}</div>`;
    const groups = KINDS.map((k) => [k, rows.filter((b) => b.kind === k)]);
    page.innerHTML = `<h1 class="display">Books</h1>
      <p class="lead">Every book, letter and plaque you can read in the world, and where it lies.</p>
      <h2 class="sec">The books</h2>
      <div class="filters">${chips("bkind", KINDS.filter((k) => kc[k]).map((k) => [k, k, kc[k]]), st.kind, "Every kind")}</div>
      <div class="filters"><input type="search" id="xq" placeholder="Search by title or place…" value="${esc(st.q)}" aria-label="Search the books"></div>
      <p class="note">${LOCAL ? "Their words are the game’s own: open one to read it in the book reader." : "Their words are the game’s own, and stay in the game."}</p>
      <div class="panel">${table("tbooks", cols, groups, { more, open: (b) => st.open === b.key })}</div>`;
    wireChips(page, "bkind", (v) => { st.kind = v; render(); });
    const qi = page.querySelector("#xq");
    qi.addEventListener("input", () => { st.q = qi.value; render(); const i = page.querySelector("#xq"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); });
    const ts = state.tbooks;
    const ordered = groups.flatMap(([, rs]) => { const c = ts && ts.sort ? cols.find((x) => x[0] === ts.sort) : null; return c ? rs.slice().sort((a, b) => { const x = c[3](a), y = c[3](b); return (x < y ? -1 : x > y ? 1 : 0) * ts.dir; }) : rs; });
    wireTable("tbooks", render, ordered, { click: (b) => { st.open = st.open === b.key ? null : b.key; render(); } });
  };
  render();
}
