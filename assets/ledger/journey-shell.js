// The Archive's frame around one of its books (a Journey page until session 98) (session 95, the user: the Traveler's Companion part of the Archive): the rail with its
// sections and Find anything, the narrow screens' menu, the footers and the local art layer, as index.html has them. The page's own
// script (core.js and its page's) draws the sheet as before.
import { wireShell } from "./shell.js";
import { wireFind } from "./find.js";
import { nav, titleIcon } from "./ui.js";

wireShell();
wireFind();
nav("");
// the book's icon left of its title (a land's page takes the zones'); some titles are drawn later by the page's script
const BOOK = /\/tradeskill\//.test(location.pathname) ? "tradeskill"   // the Tradeskill DB's pages (session 96), each under its icon
  : { "zone.html": "zones", "crafts.html": "trainers",   // the categories' names since session 98: a journal is Beasts or Gathering
      "journal.html": new URLSearchParams(location.search).get("j") === "beasts" ? "beasts" : "gathering" }[location.pathname.split("/").pop()]
    || location.pathname.split("/").pop().replace(".html", "");
const sheet = document.getElementById("sheet");
titleIcon(sheet, BOOK);
new MutationObserver(() => titleIcon(sheet, BOOK)).observe(sheet, { childList: true, subtree: true });
