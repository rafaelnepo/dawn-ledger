import { page } from "../core.js";
import { nav } from "../ui.js";

// ---------- about: what Dawn is, for a visitor of the public copy (and a reminder on this Mac) ----------
export async function about() {
  nav("about");
  page.innerHTML = `<p class="crumbs"><a href="#/">The Archive of Norgannon</a> · <span class="white">About this server</span></p>
    <h1>About this server</h1>
    <div class="about">
      <p class="lead">Dawn is a World of Warcraft Classic server run for a single player on one Mac, with bots for company, changed
      bit by bit so the old game fits one person playing alone.</p>
      <h2 class="sec">What it is made of</h2>
      <ul>
        <li><b>The server:</b> CMaNGOS Classic, an open-source server for the game as it was in patch 1.12, with Eluna for scripts in Lua.</li>
        <li><b>The client:</b> Blizzard’s Classic Era client (1.14.2), connected through HermesProxy, which translates between the two.</li>
        <li><b>The interface:</b> Forever UI, an addon of ours that brings the look of a newer Classic interface to that client.</li>
        <li><b>The changes:</b> patches to the world’s data (prices, rewards, chests, quests), to the server’s code and to the proxy, each one
        kept as a file with its undo, both factions alike.</li>
      </ul>
      <h2 class="sec">What this ledger is</h2>
      <p>Before anything in the game changes, the ledger answers three questions: what is this now, what did we already do to it, and
      how hard is it to change. Its numbers are the server’s own, read from its database, not guessed from what players once
      counted. The change log is read from the patches themselves, so it can’t fall behind.</p>
      <h2 class="sec">What it is not</h2>
      <p>Not a public server, not a guide to the live game, and not made or endorsed by Blizzard Entertainment. The names and numbers
      are the game’s; the words and the changes are ours.</p>
    </div>`;
}
