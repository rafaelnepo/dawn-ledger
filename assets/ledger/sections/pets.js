import { chgs, esc, load, page, state } from "../core.js";
import { table, wireTable, nav } from "../ui.js";
import { LOCAL } from "../build.js";
import { icon } from "../kit/icon.js";

// ---------- hunter pets (session 110, the user: "merge all the new infos into a page into the archive with everything about pets") ----------
// The hunter pet rework as the server runs it (ledger.py's pets(), dbsite/build/pets.py): hunger and food, the bond, the families,
// the skills, the special tames. A tab each. The favourite foods are the game's secret (found by feeding): on this Mac only, shown on
// asking; the public copy never carries them (publish.py).
const n0 = (x) => (x == null ? "" : Number(x).toLocaleString("en-US"));
const pct = (x) => (x > 0 ? `+${x}%` : x < 0 ? `−${-x}%` : "0%");
const madeBy = (ids) => `<p class="note">Made by ${chgs(ids)}</p>`;

export async function pets() {
  nav("pets");
  const d = await load("pets");
  const st = (state.pets = Object.assign({ spoil: false }, state.pets || {}));
  const render = () => {
    const H = d.hunger, B = d.bond, S = d.skills;
    // ---- hunger and food ----
    const scols = [["name", "State", "nm nw", (r) => r.from, (r) => `<b>${esc(r.name)}</b><span class="sub">was ${esc(r.was)}</span>`],
      ["bar", "The bar (of 1,000,000)", "num", (r) => r.from, (r) => `${n0(r.from)}–${n0(r.to)}`],
      ["dmg", "Damage", "num", (r) => r.damage, (r) => `${r.damage}%`],
      ["regen", "Heals out of combat", "num hide-sm", (r) => r.regen, (r) => `${r.regen}%`],
      ["tick", "Bond a tick (12 s)", "num hide-sm", (r) => r.tick, (r) => `+${r.tick}`]];
    const dcols = [["loy", "Loyalty", "nm", (r) => 0, (r) => esc(r.loyalty)],
      ["min", "Minutes a state", "num", (r) => r.minutes, (r) => `${r.minutes}`],
      ["fight", "In a fight", "num", (r) => r.minutes, (r) => `${(r.minutes / H.combat).toFixed(1).replace(".0", "")}`]];
    const bcols = [["lv", "The food’s level", "nm", (r) => 0, (r) => esc(r[0])], ["meal", "The meal", "", (r) => 0, (r) => esc(r[1])],
      ["n", "", "note", (r) => 0, (r) => esc(r[2])]];
    const wcols = [["w", "Where", "nm", (r) => 0, (r) => esc(r[0])], ["c", "WoW Classic", "", (r) => 0, (r) => esc(r[1])],
      ["o", "Ours", "", (r) => 0, (r) => esc(r[2])], ["by", "Said by", "hide-sm note", (r) => 0, (r) => esc(r[3])]];
    // ---- the bond ----
    const lcols = [["name", "Loyalty", "nm nw", (r) => r.tp, (r) => esc(r.name)],
      ["pts", "Points", "num", (r) => r.from, (r) => (r.to ? `${n0(r.from)} → ${n0(r.to)}` : `from ${n0(r.from)}`)],
      ["share", "The hunter’s stats", "num", (r) => r.share, (r) => `${r.share}%`],
      ["avoid", "Avoidance", "num hide-sm", (r) => r.avoid, (r) => `${r.avoid}%`],
      ["tp", "Training points", "num", (r) => r.tp, (r) => (r.tp ? `level × ${r.tp}` : "none")]];
    const ocols = [["s", "What", "nm", (r) => 0, (r) => esc(r[0])], ["o", "Ours", "", (r) => 0, (r) => esc(r[1])],
      ["c", "1.12", "hide-sm note", (r) => 0, (r) => esc(r[2])]];
    // ---- families ----
    const fcols = [["name", "Family", "nm nw", (r) => r.name, (r) => `<b>${esc(r.name)}</b><span class="sub">${esc(r.signature)}</span>`],
      ["at", "Attack", "num", (r) => r.attack, (r) => `${r.attack.toFixed(1)} s`],
      ["growl", "Growl", "num hide-sm", (r) => r.growl, (r) => `×${r.growl.toFixed(2)}`],
      ["dmg", "Damage", "num", (r) => r.damage, (r) => pct(r.damage)],
      ["arm", "Armor", "num hide-sm", (r) => r.armor, (r) => pct(r.armor)],
      ["hp", "Health", "num hide-sm", (r) => r.health, (r) => pct(r.health)],
      ["diet", "Eats", "hide-sm", (r) => r.diet.join(), (r) => esc(r.diet.join(", "))],
      ["side", "Tamed by", "", (r) => r.side, (r) => `<span class="side ${esc(r.side)}">${r.side === "Both" ? "both" : esc(r.side)}</span>`],
      ["buff", "A favorite meal gives", "hide-sm", (r) => r.buff, (r) => `<b>${esc(r.buff)}</b><span class="sub">${esc(r.buffText.replace(/^Well fed on a favorite meal: /, ""))}</span>`]];
    if (LOCAL && st.spoil) fcols.push(["fav", "Favorite foods", "", (r) => r.favourites.length, (r) => `<span class="sub">${esc(r.favourites.join(", "))}</span>`]);
    const types = ["Ferocity", "Tenacity", "Cunning"];
    const fgroups = types.map((t) => [t, d.families.filter((f) => f.type === t), (S.types.find((x) => x.type === t) || {}).name]);
    // ---- skills ----
    const tcols = [["t", "Type", "nm nw", (r) => r.type, (r) => `<b>${esc(r.type)}</b>`], ["p", "Its passive", "nw", (r) => r.name, (r) => esc(r.name)],
      ["x", "What it does", "", (r) => 0, (r) => esc(r.text)], ["f", "Families", "hide-sm", (r) => 0, (r) => esc(r.families.join(", "))]];
    const acols = [["r", "Rank", "num", (r) => r[0], (r) => r[0]], ["v", "Less area damage", "num", (r) => r[1], (r) => `${r[1]}%`]];
    const gcols = [["r", "Rank", "num", (r) => r[1], (r) => S.growl.indexOf(r) + 1], ["l", "From pet level", "num", (r) => r[0], (r) => r[0]]];
    const kcols = [["n", "Skill", "nm nw", (r) => r[0], (r) => `${icon(r[1], { size: "s" })} <b>${esc(r[0])}</b>`],
      ["f", "Families", "", (r) => r[2].length, (r) => (r[2].length >= 16 ? "every family" : esc(r[2].join(", ")))],
      ["k", "Ranks: training points, pet level", "hide-sm", (r) => r[3].length, (r) => r[3].map(([tp, lv], i) => `<span class="nw">${i + 1}: ${tp} at ${lv}</span>`).join(" · ")]];
    // ---- special tames ----
    const xcols = [["n", "Beast", "nm nw", (r) => r.name, (r) => `<a href="#/npc/${r.id}"><b class="${r.rare ? "rare" : ""}">${esc(r.name)}</b></a>${r.tameable ? "" : `<span class="sub">not tameable yet</span>`}`],
      ["f", "Family", "", (r) => r.family, (r) => esc(r.family)], ["l", "Level", "num", (r) => parseInt(r.level, 10), (r) => esc(r.level)],
      ["z", "Where", "hide-sm", (r) => r.zone, (r) => esc(r.zone)], ["a", "Attack", "num hide-sm", (r) => r.attack, (r) => `${r.attack.toFixed(1)} s`],
      ["s", "Damage", "", (r) => r.school, (r) => esc(r.school)], ["v", "Its Avoidance", "num", (r) => r.avoid, (r) => (r.avoid ? `+${r.avoid}%` : "")]];
    const C = d.changes;
    page.innerHTML = `<h1 class="display">Hunter pets</h1>
      <p class="lead">A hunter’s pet as this server keeps it: its hunger, the bond that grows with care, its family and type, the skills it learns, and the special beasts worth taming.</p>

      <h2 class="sec">Hunger and food</h2>
      <p>Happiness is hunger now: a pet is <b>Hungry</b>, <b>Satisfied</b> or <b>Full</b>, and its bond is apart from it. A new tame starts Hungry (${n0(H.newTame)}), and Revive Pet brings it back Hungry. No hunger is lost while it is dismissed, stabled or dead, or while you are away. A Full pet won’t eat.</p>
      <div class="panel">${table("ptstates", scols, [["", H.states.slice().reverse()]], {})}</div>
      <h3 class="grp-h">How fast it gets hungry</h3>
      <p class="note">Minutes of play from one state to the next, out of combat; ${H.combat}× faster in a fight. A new pet is hungrier.</p>
      <div class="panel">${table("ptdrain", dcols, [["", H.drain]], {})}</div>
      <h3 class="grp-h">A meal</h3>
      <div class="panel">${table("ptbands", bcols, [["", H.bands]], {})}</div>
      <h3 class="grp-h">The words</h3>
      <div class="panel">${table("ptwords", wcols, [["", H.words]], {})}</div>
      ${madeBy(C.hunger)}

      <h2 class="sec">The bond</h2>
      <p>Loyalty is the bond between hunter and pet. It grows with care and shows in how the pet fights: each level gives it a fifth more of the hunter’s strength (${B.share.map(esc).join(", ")}), and spares it more of a creature’s area attacks. A warlock’s demon is bound, not befriended: it has all of its master’s share at once, and Avoidance of ${B.demon}%.</p>
      <div class="panel">${table("ptlevels", lcols, [["", B.levels]], {})}</div>
      <h3 class="grp-h">What grows it, and what costs it</h3>
      <div class="panel">${table("ptsources", ocols, [["", B.sources]], {})}</div>
      <h3 class="grp-h">Left behind</h3>
      <p>A beast newly tamed that has had no meal after ${B.runaway} minutes of play goes back to the wild, with warnings before it does. Once Unruly or higher, a pet never leaves.</p>
      <p>A pet left in a stable waits: after ${B.stable[0]} hours of your play its bond fades a level every ${B.stable[1]} hours played, never below Unruly, and at half that pace in a capital’s stable. Time away from the game costs nothing.</p>
      ${madeBy(C.bond)}

      <h2 class="sec">Families</h2>
      <p>Each family has a type, its own attack speed and Growl, and its own lean in damage, armor and health. Special tames keep their own speed and damage. Each family loves some foods above the others: given one, the pet shows its delight and keeps the meal’s strength for 15 minutes.</p>
      ${LOCAL ? `<p class="note"><button class="kit-btn" id="ptspoil">${st.spoil ? "Hide the favorite foods" : "Show the favorite foods (they are found by feeding in the game)"}</button></p>` : ""}
      <div class="panel">${table("ptfam", fcols, fgroups, {})}</div>
      ${madeBy(C.families)}

      <h2 class="sec">Skills</h2>
      <h3 class="grp-h">The types</h3>
      <div class="panel">${table("pttypes", tcols, [["", S.types]], {})}</div>
      <h3 class="grp-h">Avoidance</h3>
      <p>Avoidance spares a pet part of a creature’s area attacks, cleaves too; a player’s never. It comes in three layers: the bond (30% at Rebellious to 60% at Best Friend), the trained ranks below (Cower’s, ${S.perRank}% each), and a special tame’s own, up to ${S.cap}%. It shows on the pet as a buff.</p>
      <div class="panel">${table("ptavoid", acols, [["", S.avoidance]], {})}</div>
      <h3 class="grp-h">Growl</h3>
      <p>Growl comes by itself: the pet has the rank its level allows, at no training points. Its power is the family’s (the tanks hold more).</p>
      <div class="panel">${table("ptgrowl", gcols, [["", S.growl]], {})}</div>
      <h3 class="grp-h">Learning from beasts</h3>
      <p>A beast that hits your pet may teach you a skill it would bring if tamed, ${S.learnChance}% of the time, once a beast a fight, when your family can learn it and you are of its level. No pet to swap.</p>
      <h3 class="grp-h">Beast Training</h3>
      ${S.training.map(([cat, skills], i) => `<p class="note">${esc(cat)}</p><div class="panel">${table("ptskills" + i, kcols, [["", skills]], {})}</div>`).join("")}
      ${madeBy(C.skills)}

      <h2 class="sec">Special tames</h2>
      <p>Beasts that keep their own speed and damage when tamed, and the rares with a gift of their own. Blue names are rare.</p>
      <div class="panel">${table("ptspecial", xcols, [["", d.specials]], {})}</div>
      ${madeBy(C.specials)}`;
    for (const id of ["ptstates", "ptdrain", "ptbands", "ptwords", "ptlevels", "ptsources", "ptfam", "pttypes", "ptavoid", "ptgrowl", "ptspecial", ...S.training.map((_, i) => "ptskills" + i)])
      wireTable(id, render, [], {});
    const b = document.getElementById("ptspoil");
    if (b) b.addEventListener("click", () => { st.spoil = !st.spoil; render(); });
  };
  render();
}
