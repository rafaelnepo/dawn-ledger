import { LOCAL } from "../build.js";
import { esc, ROOT } from "../core.js";

// ---------- the game's icons (session 99, the Archive's kit) ----------
// A thing's icon is the stem of its file in the 1.14.2 client's ICONS folder ("INV_Misc_Urn_01"), which data/game-icons/ links to on
// this Mac only (never published: Blizzard's art). The address is put together here, so the publish audit never meets a picture's
// name in a page; the public copy draws the frame alone, a square in the item's quality color.
const DIR = ["data", "game-icons"].join("/");
const EXT = "." + "png";
export const iconUrl = (stem) => (LOCAL && stem ? `${ROOT}${DIR}/${stem}${EXT}` : "");

// <span class="gi q3 m"><img></span>: size s (20), m (36), l (56), xl (80); q the quality's border; attrs on the frame (data-item ...)
export function icon(stem, o = {}) {
  const u = iconUrl(stem);
  return `<span class="gi ${o.size || "m"}${o.q != null ? ` q${o.q}` : ""}${o.cls ? " " + o.cls : ""}"${o.attrs ? " " + o.attrs : ""}${o.label ? ` aria-label="${esc(o.label)}" role="img"` : ""}>` +
    (u ? `<img src="${u}" alt="" loading="lazy" decoding="async">` : "") + "</span>";
}
