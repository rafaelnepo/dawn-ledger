// ---------- what a class can use (session 100, the Archive's kit; the player's review: "loot by class, what the class can't use greyed") ----------
// From an item's tooltip as the kit has it (kit/tip.js's shards: its ["need", slot, type] line): the armor each class may wear and the
// weapons each may learn in 1.12 (a Warrior and a Paladin wear plate, a Hunter and a Shaman mail; a Mage, a Priest and a Warlock cloth
// alone). A Classes line, where a tooltip has one, wins. Jewelry, cloaks, trinkets and held things suit everyone.
export const CLASSES = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"];
const ARMOR = { Cloth: CLASSES, Leather: ["Warrior", "Paladin", "Hunter", "Rogue", "Shaman", "Druid"], Mail: ["Warrior", "Paladin", "Hunter", "Shaman"],
  Plate: ["Warrior", "Paladin"], Shield: ["Warrior", "Paladin", "Shaman"] };
const ONE = { Axe: ["Warrior", "Paladin", "Hunter", "Shaman"], Sword: ["Warrior", "Paladin", "Hunter", "Rogue", "Mage", "Warlock"],
  Mace: ["Warrior", "Paladin", "Rogue", "Priest", "Shaman", "Druid"], Dagger: ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"],
  "Fist Weapon": ["Warrior", "Hunter", "Rogue", "Shaman", "Druid"] };
const TWO = { Axe: ["Warrior", "Paladin", "Hunter", "Shaman"], Sword: ["Warrior", "Paladin", "Hunter"], Mace: ["Warrior", "Paladin", "Shaman", "Druid"],
  Polearm: ["Warrior", "Paladin", "Hunter"], Staff: ["Warrior", "Hunter", "Priest", "Shaman", "Mage", "Warlock", "Druid"], "Fishing Pole": CLASSES };
const RANGED = { Bow: ["Warrior", "Hunter", "Rogue"], Gun: ["Warrior", "Hunter", "Rogue"], Crossbow: ["Warrior", "Hunter", "Rogue"],
  Thrown: ["Warrior", "Hunter", "Rogue"], Wand: ["Priest", "Mage", "Warlock"] };
// true when cls may use the item whose tooltip is tip ({ tt }); an item with no such line (a potion, a recipe) suits everyone
export function usable(cls, tip) {
  if (!cls || !tip || !tip.tt) return true;
  const named = tip.tt.find((l) => typeof l[1] === "string" && /^Classes: /.test(l[1]));
  if (named) return named[1].slice(9).split(/,\s*/).includes(cls);
  const need = tip.tt.find((l) => l[0] === "need");
  if (!need) return true;
  const [, slot, type] = need;
  if (!type) return true;
  const who = ARMOR[type] || (slot === "Two-Hand" ? TWO[type] : slot === "Ranged" || slot === "Thrown" ? RANGED[type] || ONE[type] : ONE[type] || RANGED[type]);
  return !who || who.includes(cls);
}
