# Icon styles (research, session 49; the guidelines to be decided with the user)

The user, session 49: "always when i ask for an icon, it never looks how i want it the first time. It would be easier to have a list
of styles i can choose from." And: "So far i haven't seen a single instance where i liked the no border approach", and the black
tips at the corners of icons drawn inside a border.

The catalogue to choose from, every style drawn with the same icon at the game's sizes (numbered F1-F18 for Forever's, U1-U4 for
ours today): `tools/asset-extract/icon_styles_preview.py`, served at http://localhost:8777/ui-forever/previews/icon-styles/
(local only, Blizzard's art). Ask for an icon by its number: "the tooltip's icon: F16".

## 1. The icon files carry their own frame (the black tips)

Every icon file (64 x 64) has a frame painted into it: a black outer line, a grey bevel about 2 px wide, a dark line inside it,
and rounded inner corners filled with black. WoW Forever did not redraw them: its copies of the old icons are the same pixels as
1.14.2's (compared side by side). New retail icons in Forever's files have the same build.

- Drawn whole inside a frame whose opening has rounded corners (the talent nodes, the item buttons), the black corners show at
  the frame's inner corners: **the tips**.
- The crop that removes the painted frame from every icon sampled (400): **5 of 64 px per side, 0.078** (Blizzard's 0.078125 /
  0.921875). 0.0625 (4/64) leaves grey specks at the corners; 0.07 the same, fainter; 0.03125 (2/64) leaves the bevel.
- A mask does the same job: Forever's action bars, spell book and circles hide the painted frame with a rounded mask, no crop.

## 2. How Forever frames icons (its interface code; paths under (private files))

Forever has no shared helper or constant for trimming icons. It trims with masks or overlapping frames, and the frame says what
the thing is.

| # | Style | Frame | Crop / mask | Where | What it says |
|---|---|---|---|---|---|
| F1 | Action bar button | `UI-HUD-ActionBar-IconFrame` over `ui-hud-actionbar-iconframe-slot` | mask `UI-HUD-ActionBar-IconFrame-Mask` | blizzard_actionbar/mainline/actionbuttontemplate.xml:20-33 | click to use |
| F2 | Spell book, active | `spellbook-item-iconframe` (outset -11/+1, +1/-7 on a 40 button) | mask `spellbook-item-spellicon-mask`, 36 in 40 | blizzard_playerspells/spellbook/blizzard_spellbookitem.xml:107-215 | an ability you have (square) |
| F3 | Passive | `talents-node-circle-*` | mask `talents-node-circle-mask` | blizzard_spellbookitem.lua:704-731 | passive (circle) |
| F4 | Talent node, square | `talents-node-square-<state>` | none, 36 in 40: **tips** | blizzard_sharedtalentui/blizzard_talentbuttonart.lua:8-21 | an active talent |
| F5 | Tree medallion | `Talents-Main-Ring-c60` | round mask | camelot/classtalents/blizzard_classtalentsframe.xml:39-70 | a title |
| F6 | Item button | `UI-Quickslot2`, quality `WhiteIconFrame` tinted | none: **tips** | blizzard_itembutton/shared/itembuttontemplate.xml:15-77 | an item you hold |
| F7 | Showcase item | `auctionhouse-itemicon-border-<quality>` | 0.078 crop, round mask | itembuttontemplate.xml:21-65 | the page's one item |
| F8 | Reagent slot | `Professions-Slot-bg`, `Professions-Slot-Frame[-quality]` | none | blizzard_professionstemplates.xml:41-60 | a slot for an item |
| F9 | Profession spell | `Profession-square-frame` | `SquareMask` inset 3 | blizzard_professionsbooktemplates.xml:4-47 | a profession's spell |
| F10 | Loot toast | `loottoast-itemborder-<quality>` | none | blizzard_framexml/itemdisplay.xml:43-55 | a celebration |
| F11 | Achievement | `ui-achievement-iconframe` | none (the frame covers the edge) | alertframesystems.xml:270-293 | an achievement |
| F12 | Debuff | `ui-debuff-border-<type>-icon` | none | blizzard_buffframe/buffframetemplates.xml:4-30 | what removes it |
| F13 | Buff | **none** | none: the file's own edge | buffframetemplates.xml:8 | small and many |
| F14 | Cooldown overlay | `UI-HUD-CoolDownManager-IconOverlay` | mask | blizzard_nameplates/blizzard_nameplateauras.xml:11-24 | the newest HUD |
| F15 | Side tab | `common-sidetab` | 0.03125 crop, `common-sidetab-mask` | blizzard_sharedxml/mainline/shareduipaneltemplates.xml:1008-1050 | a tab |
| F16 | Item in a tooltip | `WhiteIconFrame` 28, tinted | none | blizzard_gametooltip/mainline/gametooltip.xml:39-83 | the only framed tooltip icon |
| F17 | Inside text | none | none (`|T`, tooltip `AddTexture`) | blizzard_sharedxml/formattingutil.lua:190-194 | text-sized |
| F18 | Gear slot | `UI-Character-Info-GearSlot` | 0.07 crop | blizzard_uipanels_game/camelot/characterframe.xml:270-284 | the character pane's rows |

Raw icons (no frame, no crop, no mask) in Forever: buffs, a target's buffs, currency rows, inline text and the new-recipe toast;
nowhere a single icon stands alone at a large size. Forever shows no icon beside an ordinary tooltip: the one framed tooltip
icon is an item embedded in it (F16).

## 3. Forever UI today (no shared helper: each window builds its own)

| Style | Where (file:line) | As drawn |
|---|---|---|
| F2 spell book | SpellBook.lua:83, SkinSpellBook.lua:392, ProgressFeed.lua:1009 | as Forever |
| F1 frame, 0.08 crop | ProgressFeed.lua:421 (the stats' icons) | clean |
| F4 talent node | SkinTalents.lua:164, Professions.lua:2630 (the pet's tree) | **tips** |
| F9 profession spell | Professions.lua:1775 | as Forever |
| F7 showcase item | Professions.lua:962, Fishing.lua:735, GatherJournal.lua:644 | as Forever |
| F8 reagent slot (with `UI-Quickslot2`) | Professions.lua:887, Fishing.lua:664, GatherJournal.lua:576 | tips |
| F6 item (`WhiteIconFrame`) | Bags.lua:1191, SkinMicroMenu.lua:700 | tips |
| F10 loot toast | LootToasts.lua:152 | tips |
| F11 achievement | AchievementToasts.lua:129 | as Forever |
| F15 side tab | Widgets.lua:584 (every side tab) | as Forever |
| round mask, no frame | Rings.lua:118; TotemTimers.lua:47 (CircleMask, totem ring) | clean |
| U1 tooltip icon: 1 px black, 0.07 crop | Core.lua:511 (`ns.TooltipIcon`) | reads as no border |
| U2 bare, uncropped | Professions.lua:2554 (the pet's box), 3586 (Beast Journal), MacroLibrary.lua:181, SkinTrainer.lua:210, Character.lua:1067 | the file's edge |
| U3 1 px brown line | MacroWindow.lua:320 | tips |
| U4 1.14.2's book tab, 0.03 crop | Guild.lua:428 | the bevel shows |
| F17 inside text, 5/64 crop | StatusBars.lua:147 | clean |
| 0.07 crop, no frame | KeyBindings.lua:482 | grey specks |

## 4. To decide with the user (then this becomes the guideline)

- A style a context: the tooltip's icon, a list row's icon, a detail box's icon (the pet's box), a journal's entry, a tile in a
  grid (macros), a toast. The user picks from the catalogue's numbers.
- Whether every framed icon is cropped 5/64 under its frame (no tips), even where Forever leaves them (F4, F6, F8, F10, F16).
- Then one shared helper (`ns.IconStyle(texture, "F2")` or similar) so a style is asked for by name, not rebuilt per window.

**The user, session 52 (2026-10-02):** the tooltip icon (U6) and this section wait for an icon pass done together. The 5/64 crop
is not wanted: "it zooms the icon in more". Other ways to hide the painted frame (masks, frames that cover the edge) to be
studied then.
