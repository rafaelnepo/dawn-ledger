# The tabard designer, the guild registrar, the charter

Built 2026-09-29 (session 35, unattended; the P4 list's item 34). ForeverUI 0.118.0, skin parts `tabard` (in `Character.lua`),
`registrar` and `petition` (in `SkinQuestFrames.lua`). Sources: 1.14.2's `TabardFrame` (804815), `GuildRegistrarFrame` (804656),
`PetitionFrame` (804716). Forever's are retail's windows: no twins, no shots.

## The skin

- Tabard designer (vanilla character art round the tabard backdrop and the model, the emblem / border / colour pickers in their
  outer frame, the cost, Accept / Cancel): the inspect window's treatment: the four unnamed vanilla art pieces out (the backdrop,
  the outer frame and the emblem pieces kept: they are the designer's own), the rock, the metal over the visible 348 x 437 with the
  portrait in the ring and the NPC's name as the title, square rotate buttons, Accept and Cancel red, Forever's close button.
- Guild registrar and charter (vanilla's quest-greeting art with the NPC's portrait and name plate): the conversation windows'
  frame (`frameOf`), the buttons in its bottom corners (registrar: Goodbye / Cancel right, Purchase left; charter: Cancel right,
  Sign or Request left, Rename beside Request), the panels' art hidden.

## In game (2026-09-29)

Lyesa Steelbrow's talk (through DialogueUI) offered no tabard option here, so the three windows were shown from the chat
(ShowUIPanel; no NPC attached, so no portrait or name): each as described. Not tried: designing a tabard, buying or signing a
charter.

## The Guild Crest (session 64, ForeverUI 0.250.0-0.253.0)

The tabard designer rebuilt as the Guild Crest (Character.lua, `ns.BuildGuildCrest`; the browser preview dbsite/build/win_guild_crest.py
came first). The character on the left on the character window's backdrop, opened on the tabard (Full Body / Tabard, the model's
five buttons, drag to turn, the wheel zooms), the emblem's and border's names under it; three tabs on the right: **Emblem** (the
170 whole, from the game's sheet `Interface\GuildFrame\GuildEmblemsLG_01` upscaled 2x by waifu2x into Art/guild_emblems_2x.tga,
white on black in a gold frame, in eight categories), **Colors** (the emblem's 17 in two lines, a rule, the 51 backgrounds a line
per colour family, light to dark) and **Border** (its colours, then the ten styles as their left half, larger); Random, Cancel,
Accept in a line, "Current Gold:" and the cost under them. The portrait: the Guild Tabard's icon by default, your crest or the guild
master from its menu. Names and categories are ours (docs/specs/guild-crest-names.json, tools/asset-extract/guild_crest_lua.py).

How a pick reaches the game: `TabardModel:CycleVariation(id, ±1)` one step at a time (1 emblem, 2 its colour, 3 border, 4 its
colour, 5 background); the emblem, its colour and the background read back from the model's file names; the border can't be read
(no call): the last accepted (saved), else the first. The flat pictures of the tabard's own files (the Border tab) read the right
half 5 rows lower: the files are cut for the body, not flat.

### New emblems and illustrations (the user's question, session 64: possible?)

- **In our window, yes:** the picker draws pictures we choose, so new illustrations could be shown, named and grouped there.
- **On the tabard itself, no (not as a new choice):** the game stores a guild's emblem as a number (0-169) and the client paints the
  chest from its own files `Textures\GuildEmblems\Emblem_NN_CC_*` for that number. A new emblem would need new files at new numbers
  inside the 1.14.2 client's storage (CASC), which an add-on can't add, and the server would have to accept the new numbers.
- **What an add-on could do:** draw our own art over our own UI wherever the guild's emblem shows (the guild window's banner,
  the guild crest in the social window, tooltips), keyed to a guild setting of ours; the 3D tabard keeps the game's emblem. Or
  replace an existing emblem's look in our windows only. Both are feasible later.
