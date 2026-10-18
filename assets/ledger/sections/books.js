import { esc, load } from "../core.js";
import { listPage, nav } from "../ui.js";
import { LOCAL } from "../build.js";
import { icon } from "../kit/icon.js";

// ---------- books (session 99, the last of the categories' planned sections; session 100, the visual pass) ----------
// Every book, letter and plaque you can read (ledger.py's books(): the book reader's collect()): its kind, pages and where it lies or
// comes from, never its text (Blizzard's words stay in the game). Cards with each book's icon (a readable item its own, a book or a
// plaque in the world by its page's material); the filter bar's kind, page and place; on this Mac a card opens the book reader, inside
// the Console.
const KINDS = ["Plaques and books in the world", "Books and notes", "Letters that start a quest", "Quest papers"];
const reader = (key) => `http://localhost:8777/#open/${encodeURIComponent(`http://localhost:8777/dbsite/mockups/books/?book=${key}`)}`;
const place = (p) => `${esc(p[0])}${p.length > 3 ? ` <span class="note">${p[2]}, ${p[3]}</span>` : ""}`;
const where = (b) => (b.at.length ? b.at[0][0] + (b.at.length + b.more > 1 ? ` and ${b.at.length + b.more - 1} more` : "") : b.src[0] || "");
const card = (b) => {
  const inner = `${icon(b.ic, { q: b.q, size: "l" })}<span class="in qn${b.q}">${esc(b.name)}</span><span class="is">${b.pages} page${b.pages === 1 ? "" : "s"} · ${esc(b.mat)}` +
    `${where(b) ? ` · ${esc(where(b))}` : ""}</span>`;
  return LOCAL ? `<a class="icard bcardk" href="${reader(b.key)}" target="_top" title="Read it in the book reader">${inner}</a>` : `<div class="icard bcardk">${inner}</div>`;
};
export async function books() {
  nav("books");
  const d = await load("books");
  listPage({
    sec: "books", title: "Books", unit: "books", listTitle: "The books", placeholder: "Search by title or place…",
    lead: `Every book, letter and plaque you can read in the world, and where it lies.${LOCAL ? " A card opens it in the book reader." : " Their words stay in the game."}`,
    rows: d.books, key: (b) => b.key, text: (b) => [b.name, ...b.at.map((p) => p[0]), ...b.src].join(" "), card, gridCls: "bgridk",
    facets: [{ k: "kind", label: "Kind", icons: true, get: (b) => b.kind, order: KINDS },
      { k: "mat", label: "The page", icons: true, get: (b) => b.mat, order: ["Parchment", "Bronze", "Silver", "Marble", "Stone"] },
      { k: "zone", label: "Place", all: "Every place", get: (b) => b.at.map((p) => p[0]) }],
    cols: [
      ["name", "Book", "nm", (b) => b.name, (b) => `<span class="iname">${icon(b.ic, { q: b.q, size: "s" })}<span class="qn${b.q}">${esc(b.name)}</span></span>`],
      ["pages", "Pages", "num", (b) => b.pages, (b) => b.pages],
      ["where", "Where", "", (b) => (b.at[0] || b.src || [""])[0], (b) => (b.at.length ? place(b.at[0]) + (b.at.length + b.more > 1 ? `<span class="sub">and ${b.at.length + b.more - 1} more</span>` : "") : `<span class="note">${esc(b.src[0] || "")}</span>`)],
      ["mat", "Page", "hide-sm", (b) => b.mat, (b) => `<span class="note">${esc(b.mat)}</span>`],
    ],
    more: (b) => `<div class="facts">
      ${b.at.length ? `<span class="k">Where</span><span>${b.at.map(place).join("<br>")}${b.more ? `<br><span class="note">and ${b.more} more</span>` : ""}</span>` : ""}
      ${b.src.length ? `<span class="k">Found</span><span>${b.src.map(esc).join("<br>")}</span>` : ""}
      ${LOCAL ? `<span class="k">Read it</span><span><a href="${reader(b.key)}" target="_top">In the book reader →</a></span>` : ""}</div>`,
  });
}
