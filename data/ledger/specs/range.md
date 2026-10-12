# Range: on the buttons, on the target, a ring around you (tasks 15 and 37)

The user (session 53's close): "a spell's, a hunter's skill's and attack's range shown on the action buttons and on the selected
target; and a range circle around the hunter and the casters". Task 15 (earlier): "range by spell and the hunter's distance".
Written in session 54 as the plan before a preview; nothing built yet.

## What 1.14.2 lets an addon know

- **No exact distance.** The 1.14.2 client has no call that returns the yards to a unit (UnitDistance and the map positions of
  enemies aren't there; the player's own map position is).
- **In range or not, per spell:** IsSpellInRange(spell, unit) and IsActionInRange(slot) answer 1, 0 or nil (no range, no target).
  The game already uses this: a button's hotkey turns red out of range.
- **In range or not, per item:** IsItemInRange(item, unit) (out of combat for friendly units only in later clients; 1.14.2 allows it
  in combat). Items with known ranges (a bandage 15 yd, a net 25 yd, ...) give brackets the way LibRangeCheck does.
- **A few fixed checks:** CheckInteractDistance(unit, 1-4): inspect 28 yd, trade 11.11 yd, duel 9.9 yd, follow 28 yd.
- **The spell's range:** the spell's tooltip line ("30 yd range", "Melee range"); GetSpellInfo returns minRange and maxRange in
  1.14.2.

So the target's distance can be shown as a **bracket**: the smallest of your spells' and known items' ranges that the target is
inside, and the largest it's outside of ("20-25 yd"). With a hunter: the dead zone (under 8 yd: Auto Shot can't fire) shows too.

## The three pieces

1. **The range on the action buttons.** Each button with a ranged spell shows its range as a small number in a corner ("30"), in
   white when the target is in range, in red when it isn't (the same red the game gives the hotkey). A melee ability shows nothing
   (its range is the melee range). A setting to turn the numbers off.
2. **The distance on the target frame.** Under the target's name, the bracket ("20-25 yd"), updated a few times a second while
   there's a target; for a hunter, "Too close" under 8 yd (in red), the dead zone's own words.
3. **A ring around you.** Not on the ground (an addon can't draw in the world), but on the minimap: a thin circle at the range of
   your main spell (a hunter's Auto Shot, 35 yd; a mage's Frostbolt, 30 yd; a priest's Smite, 30 yd), sized from the minimap's
   zoom (its yards per pixel are fixed by zoom level, inside and outdoors). Optional, off by default, a colour per class.

## Choices for the user (before the preview)

- The number on the buttons: always, or only while holding a key (Alt)?
- The target's distance: under its name, or beside its level?
- The minimap ring: wanted, given it can't be on the ground? Which spell sets it (the longest one on your bars, or one you pick)?

Next: a browser preview of the three over an in-game shot, then the user's choices, then the build.

## Built (session 55, ForeverUI 0.229.0)

The user's choices after the two previews: no range numbers on the buttons ("Didnt like the icon with the range on top of it");
the target's distance as a third small circle (option B: the icon alone carries the colour); the minimap ring kept ("I liked the
minimap solution"). The code: ns.TargetRange and ns.MainRangeSpell (SkinUnitFrames.lua, the class table RANGE_SPELLS), the
circle rangeCircle (TargetFrame only, attackable targets), the ring in SkinMinimap.lua (ns.UpdateRangeRing). States: Melee (the
melee spell reaches; a sword), In range (the main spell), Too close (a spell with a minimum range, inside 10 yd: red), Out of range
(grey, desaturated). Friendly targets show no circle (healers: a later choice).
0.229.1 (the user): a hunter out of range sees the bow in its colours under a see-through red fill (red at 0.45, cut round), not
greyed; Too close stays the red-tinted bow; the other classes out of range stay grey.
0.229.2: the spells asked by name, any rank (at level 60 the rank-1 ids read as not known: the sword far from the mob); /fui range prints each spell's answer. The GM suite gains World: weather (Clear, Rain, Snow, Sandstorm).
0.230.1: a hunter's main answer falls back to Arcane Shot, Serpent Sting, Concussive Shot, then an action button holding one (IsActionInRange); the sword only for melee or a class with no ranged spell. /fui range adds the main answer. The side tabs: a note for Forever UI, the cogwheel for the console.
0.230.4 (the user's rule): a hunter sees the sword inside the duel distance (9.9 yd), the bow beyond; the red fill only when a shot answers it doesn't reach.
