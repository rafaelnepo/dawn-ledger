# Toasts and banners: the house style

Written the session after 38 (2026-09-29 night), when the user said of the level-up banner, the spells-learned banner and the loot
and money toasts: "they look beautiful. Whenever we need toasts, this is the template and style we will be using from the start."
So any new moment the game should celebrate or report (a reputation level, a quest chain done, a profession rank, an
achievement-like first) starts from here, not from a blank page. The code: `addons/ForeverUI/ProgressFeed.lua` (the banners),
`addons/ForeverUI/LootToasts.lua` (the toasts). The previews they came from: `tools/asset-extract/progressfeed_preview.py`,
`levelup_variants_preview.py`, `levelup_caption_preview.py`, `spell_learned_preview.py`.

## Two kinds

| | **Banner** | **Toast** |
|---|---|---|
| For | a moment: a level, spells learned, a milestone | a thing you got: an item, money |
| Where | the top middle, `TOP` of UIParent `-190` (retail's level-up toast place) | a stack above the bags (bottom right), newest at the bottom; money in a stack of its own (left of it until placed) |
| How many | one at a time; the others wait in a queue | up to 4 in the stack (the oldest leaves) |
| Art | retail's level-up toast as WoW Forever loads it | retail's loot toast as WoW Forever loads it (1.14.2 has the art and never shows it) |
| Size | 418 wide, as tall as its contents | 288 x 108 (an item), 288 x 56 (money) |
| On screen | in 0.3 s, Short 5 / Normal 10 / Long 20 s (Edit Mode), out over 2 s | in 0.2 s, 4.05 s, out over 1.5 s; held while the pointer is on it |

## The banner

**Art (all in `addons/ForeverUI/Art`, by atlas name):**
- The black band: `LevelUp-Shadow-Upper` (326 wide) at alpha 0.6, on the bottom, as tall as the banner.
- The gold lines: `LevelUp-Bar-Gold` (418 x 7) at the top and the bottom.
- A big moment's light: `LevelUp-Glow-Gold` (drawn 300 x 154, ADD blend), its bottom on the band's bottom gold line.
- A spell's icon: the spell book's own, the icon 36 under `spellbook-item-spellicon-mask`, `spellbook-item-iconframe` from (-11, 1)
  to (1, -7) of a 40 box; scaled for 36 (rows, grid), 48 (one spell), 64 (a milestone).
- A gain's icon: 16 px in the action buttons' bronze frame `UI-HUD-ActionBar-IconFrame`.
- What it opens (talent point, spells): `LevelUp-Icon-Arrow`, `LevelUp-Icon-Book`, a row each under the band.

**Text, top to bottom (the band's padding 24 above and below):**
1. The **gold line**, `SystemFont_Shadow_Large`, gold (1, 0.82, 0): the voice of the world (lore by race, city, milestone), or what
   happened ("New Spells Learned").
2. The **white line**, the same font, white, 3 under: the class's voice (the race's own where the lore differs).
3. The **title**, `GameFont_Gigantic`, gold, 10 under: "— Level 57 —" (em dashes), "2 New Spells", a milestone's spell.
4. The **contents**, 14 under the title: gains in columns (a row 20, columns 28 apart, three rows at most), spells in rows (46 a row, the name and rank a block centred on the icon)
   or a grid of three (124 x 70 a cell, 12 between rows, 10 under), one spell large beside its name.
5. **Under the band**, 6-8 below: what it opens, or where it came from ("Taught by Brother Sammuel · 1s 20c", "Learned from
   <quest>", "Your talent point in Holy"), `GameFontHighlight`.
6. **The caption over the band**, 5 above the top line, `GameFontHighlightSmall` in off-white (0.88, 0.86, 0.81): who and where, for
   the archive ("Uthon · Human Paladin · Northshire Valley, Elwynn Forest"; the name in the class colour), and on Regular or
   Complete a second line (how long the level took, time played; or kills, quests, deaths). Separators: " · " in grey 8a8577.

**A milestone** (the spells that make a class): the class's order or tradition small, in capitals, between em dashes, in the class's
colour (A: "— BY THE SILVER HAND —"), 8 under it its own title (C: "The Light's Mercy"), a line of lore in white, the icon 64, 14 under it the spell's name as the
title, what it opens in plain words; the glow (`LevelUp-Glow-Gold`) with its bright edge on the band's bottom gold line. Shown alone,
before the rest; its padding under the text 18 (the others 24).

**Colours:** gold 1, 0.82, 0; white; new green 1eff00; upgraded blue 7fd0ff; rank and quiet text b0a898; the caption 0.88, 0.86,
0.81; separators 8a8577. Warriors and rogues learn *abilities*, the others *spells*.

**Behaviour:**
- One at a time: a banner waits for the one showing (the level-up first), 0.5 s between.
- Gather before showing: at a trainer nothing shows until its window closes; elsewhere a second for what comes together.
- The chat line it replaces leaves the chat while the banner is on (a chat filter on that message only); hidden in Edit Mode, the
  chat line comes back.
- Its own Edit Mode box: place, show or hide, Duration (Short / Normal / Long).
- Screenshots: the caption says whose it is; a Print Screen while it shows is logged by its kind (Level Up, Milestone - <spell>,
  Spells) for `tools/screenshots/name_screenshots.py`; the automatic level-up shot hides the interface but the banner, turns the
  camera to the face, and hides the minimap for the moment.
- A command to look at it without the moment: `/fui levelup`, `/fui spell 1-6`.

## The toast

**Art:** `Interface\LootFrame\LootToast` (1024 x 256).
- An item: the template's piece (276 x 96 at 289, 148) on 288 x 108 (6 round, so the icon has room from the edges), in three
  slices without its inset box (its left end 80, a stretched middle from 60-80, its right end 20), and the box drawn on its own
  (81-255 x 38-77: ends 5 wide), 38 tall, its bottom 1 above the icon's quality frame's, the name filling it, always in its middle;
  any toast widens by what its name needs to fit on two lines, by the game's own measure of the name (the box's right end and
  the glow follow the toast's width); the item 52 x 52, 28 in and 29 down, in its quality's border `loottoast-itemborder-<gray, white,
  green, blue, purple, orange, artifact, heirloom>` 58 x 58; `loottoast-glow` (ADD, scaled with the toast) flashing as it comes in and on while the pointer is on the toast.
- Money: the template's gold piece (249 x 71 at 577, 74) in three slices (its left end 56, a stretched middle from 40-56, its right
  end 13) without its inset box, and the box drawn on its own (60-234 x 28-57: ends 5 wide, a stretched middle), 28 tall, centred,
  65 to 267; the coin `INV_Misc_Coin_02` 24 x 24, 28 in, in the gold border piece (0.7324-0.7891 x 0.5742-0.8008) 29 x 29.

**Text:** an item: "You received" (or "You won", "You created") in `GameFontNormal` 7 right of the icon, 3 up; the name in
`GameFontNormalMed3` in its quality's colour, in its box 8 in from the sides, left and middle; the count on the icon (`NumberFontNormal`); a won roll's
dice or coin 22 x 22 at the top right with the roll in green. Money, on one line, centred together across its box: "You
received" in `GameFontNormalSmall`, the amount beside it in `GameFontNormalMed3`, white.

**Behaviour:**
- Rules for what shows (Edit Mode's Loot Toasts box: Poor, Common, Uncommon, Rare, Epic and better, quest items, made items, money);
  what they leave out stays in the chat, what shows leaves it.
- The stack spaces each toast by its own height; coins looted while a money toast shows add to it.
- A summary toast uses the money toast with its own label ("Sold 8 items" when a merchant closes: everything the visit sold).
- Money toasts have their own stack and Edit Mode box (Money Toasts), placed apart from the loot.
- A command to look at every kind: `/fui loot`.

## Making a new one

1. Pick the kind: a moment (banner) or a thing got (toast). A reputation level, a quest chain, a profession rank: a banner. A
   currency, a reward: a toast.
2. Write the words first (docs/copywriting/: the in-game text rules: short, no dates, the world's voice, race and class variants
   where the lore differs), and look for Forever's own template and words (`(private files)`).
3. A browser preview in this style (the preview scripts above are the starting point), then the user's pick.
4. Build it with the same pieces: the banner's band, lines, caption and queue, or the toast stack; its Edit Mode box, the chat line
   it replaces filtered, a `/fui` command to look at it, a kind for the screenshot log, tests in `addons/tests/foreverui/`.
5. The checklist entry, the copywriting row, and this page if the style grows.

## Grown since: the professions (0.161.0)

- The spells banner has a **profession mode** (`item.prof`): a milestone's layout (Apprentice, Artisan, a specialization: the
  profession in capitals and gold, not a class colour; "Skill up to 300" quiet under the title; its spells side by side under it)
  or the one-spell layout (Journeyman, Expert); a **next rank** line, dimmed, 7 under the band, the footer 5 under it.
- Three **toast kinds** in the loot stack: *Ready to Train* (the item toast, green border, the name and a second line in the box,
  wider when that line needs it), *Skill at its Limit* (the money toast's shape, 64 tall, desaturated, grey border, no glow),
  *Artisan's Mastery* (the item toast, orange). Look at them: `/fui <profession> 1-7`.
- The **skill-up toast** (0.162.0): the money toast's slim gold shape in the loot stack, quicker (in 0.15 s, 2 s, out 0.8 s: a
  toast's own `fadeIn` / `hold` / `fadeOut`), merging the same profession's next skill-ups while it shows.


## Waiting: ideas noted, not designed yet

- **Important quest chains** (the user, session 66, with the progression research's chain bonus: a chain's steps give more
  experience and reputation, ×1.2 a step to ×2): make the moment memorable when a chain ends. A banner by this page's rule (a quest
  chain is a moment): the chain's last quest as the title, what it was ("The end of a chain of 4" or the giver's story in a few
  words), the experience and the reputation it brought (the faction's colour), the chain's steps as small marks under the band.
  To settle first: which chains count (all with 3 steps or more, or the important ones: a dungeon or elite quest, a named target,
  350+ reputation; docs/research/progression/README.md), and how the client knows a chain ended (our own data file from
  `quest_template` PrevQuestId / NextQuestInChain, as GatherData.lua is: HermesProxy sends no chain data). Then the usual steps
  above: words first, a browser preview, the user's pick.
