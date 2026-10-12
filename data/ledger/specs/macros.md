# Macros: what 1.14.2 allows, the Macro Guide, the library and the block builder

Session 44, 2026-09-30. The goal (kickoff 31): "Controller + Ring Menu + Macros: ~80% of play without keyboard and mouse". The
player mostly *chooses* macros instead of writing them. The user's decisions this session:
- "we will completely revamp the macros menu in the game. Add tabs for classes etc."
- "Lets start by creating something like the GM Testing Suite and /fui to document Macro Documentation. Each command plus an
  explanation with an example. Create categories and subcategories and class specific infos as well. Reskin /FUI to look like the
  testing suite ui."
- The creation tab: "something like what macrobench has created (Idea, not style or design) ... modular building blocks where you
  can click from a library of macros that you can filter by type and class and use, then you see the order of operation of what
  the macro will do like lego blocks. Then we can infer what macros work in combination with other macros, to be able to gray out
  macros that dont work together, or dont follow the required order. Plan something beautiful ... using research on simple
  computer language programming for kids like scratch ... show red light green light if the macro will work and provide feedback
  as to why. Maybe show recomendations in a tooltip."

Three research passes (read-only): 1.14.2's extracted interface code (142 = (private files) by FileDataID);
the web (warcraft.wiki.gg, Wowhead, CurseForge; original pages only); block languages (Scratch, ScratchJr, Blockly, Stride,
MakeCode). Wowpedia's links redirect to fandom (402), so the same wiki's live home, warcraft.wiki.gg, was read. The old Battle.net
thread (topic 16200990425) redirects to the forum home and the Wayback Machine was blocked: not read.

## 1. What the 1.14.2 client supports (its own code)

**How a macro runs:** a line goes through the hidden MacroEditBox to `ChatEdit_ParseText`, which calls the secure commands
(`SecureCmdList`) first and every other slash command after (142 804077:2898-2918, 4808). So insecure commands work in macros too.

**The secure commands (804077:1175-1763), all present:** /startattack, /stopattack, /cast (/spell), /use, /castrandom, /userandom,
/castsequence, /stopcasting, /stopspelltarget, /cancelaura, /cancelform, /equip (/eq), /equipslot, /changeactionbar (pages 1-6),
/swapactionbar, /target (/tar), /targetexact, /targetenemy, /targetenemyplayer, /targetfriend, /targetfriendplayer, /targetparty,
/targetraid, /cleartarget, /targetlasttarget, /targetlastenemy, /targetlastfriend, /assist (/a), /focus, /clearfocus, /maintank,
/mainassist, /petattack, /petfollow, /petmoveto, /petstay, /petpassive, /petdefensive, /petaggressive, /petautocaston, /petautocastoff,
/petautocasttoggle, /petdismiss, /stopmacro, /cancelqueuedspell (/cqs), /click. Insecure but useful: /run and /script (asks once to
allow scripts: `AreDangerousScriptsAllowed`, 804077:2150), /dismount (reads conditions), /targetmarker (/tm), /follow, /random.
**Not in 1.14.2:** /worldmarker, /equipset, /usetalents. (The aliases were read from Forever's GlobalStrings; 1.14.2's own were not
extracted: to confirm in game.)

**Conditions:** the parser (`SecureCmdOptionParse`) is engine code, so no Lua lists them. The restricted environment's function list
(804760:75-95) shows the state the parser reads: stance / form, stealth, exists, dead, party, raid, modifier keys, the mouse button,
the bar's page and bonus bar, mounted, swimming, indoors / outdoors. Wowhead's Classic guide (1.13.3) uses [stance:n], [worn:type],
[nocombat], [mod:shift]. **Tried in game (section 7):** every condition above and the units (@player, @pet, @mouseover, @targettarget, @party1,
@focus) are read by 1.14.2's parser; the later games' [spec], [talent], [flyable], [pvpcombat], [petbattle], [vehicleui] and @cursor
are read but never true; [known] isn't one (the game says "Unknown macro option" and takes the choice anyway) (warcraft.wiki.gg
Macro_conditionals for when each came).

**Focus:** /focus and /clearfocus are registered (804077:1422, 1436), but Classic Era comments out the FocusFrame (4216069:462-484),
its key bindings and its unit-menu entries, and the restricted environment lists FocusFrame as "hidden" (804760:24). A player thread
says it does nothing (https://us.forums.blizzard.com/en/wow/t/where-is-the-focus-framefunction/1745996, no blue reply). **Tried in
game (section 7): the focus works**, only its frame and keys are hidden.

**Secure buttons (SecureTemplates.lua, 804793):** `type = "macro"` runs `macro` (an index or name: `RunMacro`) or `macrotext`
(`RunMacroText`) (415-431), **with no length limit in Lua** (the 255 is only the macro window's `letters="255"`, 804027:163; retail
capped macrotext at 255 only in 11.0.2). Other types: spell (by name or ID), item, action, pet, target, focus, assist, click, stop,
cancelaura, worldmarker. Attributes can carry modifiers and a button suffix (`shift-type1`, `type-s3`: our rings use the suffix).
SecureHandlers, RegisterStateDriver and the restricted `SetBindingClick / SetBindingMacro` are there (804782, 804796, 804777).

**The caps:** `MAX_ACCOUNT_MACROS = 120`, `MAX_CHARACTER_MACROS = 18` (4216112:18-19; Forever has 30 per character);
`CreateMacro(name, icon, body, perCharacter)` / `EditMacro` / `DeleteMacro` / `GetMacroInfo`; character macros at 121-138.
CreateMacro and EditMacro can't run in combat (warcraft.wiki.gg API_CreateMacro); the macro window's icon list is spell icons only
(the item icon calls are commented out, 804026:380-383).

## 2. Blizzard's rules (what no macro can do)

- **No decisions:** the 2.0 secure model "mandates human decision-making, particularly in combat"; no condition on health, mana,
  cooldowns or buffs (https://warcraft.wiki.gg/wiki/Secure_Execution_and_Tainting; Blizzard's original post not found).
- **One global-cooldown spell per press;** a failed one still stops the rest; off-GCD things (trinkets, /startattack, /stopcasting,
  stances) can come first; lines run at once, nothing waits (https://warcraft.wiki.gg/wiki/Making_a_macro).
- **/castsequence** doesn't advance on a failed step: a spell with a cooldown stalls it; `reset=` n seconds since the last press,
  target, combat, shift / ctrl / alt (https://warcraft.wiki.gg/wiki/MACRO_castsequence).
- **255 characters** per macro; conditions are case-sensitive; #showtooltip first.
- **Addons:** make or edit macros only out of combat; a secure button's attributes and bindings change only out of combat. Retail's
  11.0.2 rule against /click chains doesn't appear in 1.14.2's code (804077:1582); we don't rely on chains anyway.

## 3. The addons

- **Macro Bench** (Vatik, MIT, 1.9.3, 2026-09-24; flavor "Forever" only: https://www.curseforge.com/wow/addons/macro-bench): one
  chain per line read as a sentence ("[Cast] when [pressed with: shift] and [aimed at: mouseover, an enemy, alive] then
  [Polymorph]"); text and blocks both ways, live; three checks (grammar and slots, /run bodies through loadstring, "now": the
  client's own parser); 67 templates (general and per class), five tutorials; saves to a slot or an unlimited library; no automation.
  **The idea we take (the user: "idea, not style or design"):** blocks as a view of the real text, templates by class, the checks.
- **Macro+** (skov11, retail 12.x: https://www.curseforge.com/wow/addons/macro): replaces the Macro UI; 466 recommended macros "sourced
  from Icy Veins", export / import strings. Not for 1.14.2.
- **Wowhead's Classic basic macro guide** (Hazedesunna, 1.13.3: https://www.wowhead.com/classic/guide/classic-wow-basic-macro-guide-10007):
  the rank-free /cast, the [worn:] ranged macro, the Warrior stance swap, the Druid bear-and-rings macro; stance numbers.

## 4. The Macro Guide and /fui (built: 0.186.0)

**The Macro Guide** (MacroGuideData.lua, MacroGuide.lua; `/fui macros`; a Guide button on the Macros window with the revamp): the Testing
Suite's window (Help.lua: Forever's portrait frame, the list with folding headers on the left, the detail pane on the right), 800 wide
so an example fits on a line. 150 entries in 13 categories: Getting started (the basics; what macros can't do), Commands (casting and
items; targeting; your pet; the macro itself), Conditions (writing them; on whom; the target; you; keys and bars; not in Classic),
Everyday macros (healing and helping; fighting; getting around; items), then each class's own (how it works: stances, forms, paging;
macros). Your class opens by itself. Each entry: its name and the syntax (grey) in the row with a light (green: in 1.14.2; amber: to
try; grey: not in Classic Era); the pane: the explanation, the example with commands gold, conditions blue and `;` orange, the letters
used of 255, one example per side where it matters (mounts, teleports), **Chat** (a one-line example into the chat box) and **New
Macro** (a character macro from your side's example, out of combat, then the Macros window on it). New beside the Testing Suite: gold
subcategory lines between the rows and a search box over the list (right of the portrait).

**/fui reskinned** the same way (648 wide, as the Testing Suite): Help.lua's INTRO with a short name per command (the user: "add
short names to /fui rows"); a row per command (the name, the command grey), the pane with what it does, when (blue), Run and Chat.

**The preview:** `python3 tools/asset-extract/reference_windows_preview.py` then http://localhost:8777/ui-forever/reference-windows/
(both windows, your class and side to choose). The lists come from the addon through `tools/asset-extract/dump_reference_data.lua`
(LuaJIT, the offline stub): the words are kept once.

**The one shared window** (`ns.CreateReferenceWindow`, Widgets.lua): the Testing Suite's `create()` became a small builder (portrait frame, backgrounds, divider, list, pane,
footer) used by the three windows; the list gains the `sub` row kind and the search box.

## 5. The Macros window, revamped (plan)

Forever's MacroFrame has two top tabs (General, the character's) and no library (FV blizzard_macroui). Ours, in the same metal:
- **Top tabs:** General, Character (your macros, as now, with the slot count: "12 / 18"), **Library**, **Builder**, Guide (the
  Macro Guide inside the window, or a button to it).
- **Library:** a class strip (the nine class icons, yours first; plus General) and filters by type (Casting, Targeting, Pet, Items,
  Movement, Healing, Controller) and spec; cards with the icon, name, one line, the light, and what it needs (a stance, a pet, a spell
  learned at level n). A card's buttons: **Use** (onto a bar slot, a ring slice or a pad chord), **Open in Builder**, **Copy to my
  macros**.
- **Where a chosen macro lives** (the slot caps): on an action bar slot it must be a real macro (class macros in the character's 18,
  general ones in the account's 120); on a ring slice or a direct binding (the pad's B, Y) it is `macrotext` on a secure button and
  **uses no slot**. Library macros we place are recorded in `ns.db.macros` (name, body, where), so we update them (a new rank, an item
  name) and never touch the player's own.
- **Placeholders** resolved out of combat (BAG_UPDATE_DELAYED, LEARNED_SPELL_IN_TAB): `{food}`, `{water}`, `{bandage}`,
  `{healthstone}`, `{potion}`, `{mount}` (the best one in the bags), `{form:Cat Form}` (its index from GetShapeshiftFormInfo, so a
  druid without Aquatic Form still gets the right number), `{poison:Instant}`. The macro is rewritten when the answer changes.

## 6. The Builder: blocks like Scratch (plan)

**What the research says** (sources in the list at the end):
- Scratch: low floor, high ceiling, wide walls; blocks "shaped to fit together only in ways that make syntactic sense"; C-shaped
  control, hexagons for true / false, ovals for values; click a stack to run it; stray blocks allowed (Resnick et al. 2009).
- ScratchJr: a third fewer blocks, icons first, text on demand, big targets, every instruction's result visible (Flannery et al. 2013).
- Blockly: type checks on connections, a toolbox by category, warnings on the block (what, not a dialog), disabling only what is
  certainly wrong, one fixed root block (docs.blockly.com).
- Stride: structure editors that forbid too much fail ("locked into fixed workflows"); mark errors and let editing go on; grey what
  can't go at the insertion point (Kölling, Brown, Altadmri 2017).
- MakeCode, Pencil Code: text is the truth, blocks a view; what the blocks can't show stays a grey text block (Bau et al. 2015).
- Error messages: near the problem, specific, plain, with the fix, positive (NN/g); better messages cut repeated errors (Becker et al.
  2016), but wording alone isn't enough (Denny et al. 2014): what is highlighted matters as much (Marceau et al. 2011).

**Our design** (our reasoning on the above):
- **The canvas:** a vertical stack in the order the game runs it, top to bottom. On top the fixed **Button block** (the macro's icon
  and name, `#showtooltip` as a switch on it: always first, can't be moved). Under it the lines.
- **Line blocks** (stack blocks, Forever's colours by kind; an icon first, as ScratchJr): Casting (/cast, /castsequence, /castrandom),
  Items (/use, /equip), Targeting (/target, /targetenemy, /assist, /cleartarget, /tm), Attack (/startattack, /stopattack), Pet,
  Control (/stopcasting, /stopspelltarget, /stopmacro, /cancelaura, /cancelform, /dismount). Each carries a small tag: **GCD** (a
  spell that starts the global cooldown) or **free** (off it).
- **Choices inside a line:** a /cast block holds rows "when … on … cast …": the hexagon slots are conditions (chips: shift held, in a
  fight, an enemy, alive, in Cat Form…), the round slot is the unit (you, your target, its target, the pointer, party 1-4, the pet),
  the last slot the spell or item, filled from your spell book and bags by icon. "+ otherwise" adds a row (the `;`); the first true
  row wins, read top to bottom. A row "otherwise" without chips is the fallback.
- **The palette** on the left: the Library's filters (class, type) over the blocks; a block that can't go where the insertion line is
  greys out, its tooltip says why ("A spell on the global cooldown is already on this button: only one can cast per press").
- **What greys out (the rules as checks):** #showtooltip not first; a second GCD cast after one that always fires (a GCD cast after
  a conditional one stays allowed: only one fires); /targetenemy twice; /stopcasting after the cast; /stopmacro with nothing after it;
  contradictory chips in a row ([combat] with [nocombat], [help] with [harm]); a unit on a command that ignores it; a class's spell
  you don't know (greyed with "learned at level n"); a form or stance your class has none of; anything past 255 letters (the
  meter). Soft, as Stride: a block can still be dropped; it turns red with the reason; nothing is forbidden outright but the header.
- **Macros together** (the library level): each library macro declares what it needs (class, a stance, a pet, a weapon kind, a
  spell) and what it takes (a pad chord, a ring slice, a bar slot, a modifier: [mod:shift] on a button whose Shift layer the pad
  template already uses). The Library greys out a macro that clashes with what's placed ("Shift on this button is your Frost Nova")
  or can't work for you ("needs a pet": a Mage), and suggests the one that goes with it ("with Charge or Intercept, add Overpower").
- **The light:** green (it will work), amber (it will work, but: a line that can never fire, a spell not learned yet, a /castsequence
  with a cooldown spell that may stall, [@mouseover] on a controller), red (it won't: the first fault, a click jumps to its block).
  One line of why beside it, the fix in the tooltip. Live on every change, no dialogs.
- **Now:** a "Right now" strip reads the rows with the client's own parser (`SecureCmdOptionParse`, callable from our code: /dismount
  does) and lights the row that would fire with what you hold and target at this moment, as Scratch lights the running block.
- **Recommendations** in tooltips: on an empty slot the usual next step ("Add /startattack so the fight starts with the spell"); on a
  block, what it's for and its best partner.
- **Text both ways:** a Text switch shows the real macro (Macro Bench, MakeCode); pasted text becomes blocks, a line we can't read stays
  a grey text block; the text is what's saved.
- **The checker is one Lua module** used by the Builder, the Library and the tests: every Guide and Library example must be green or
  amber offline (the test suite runs it over MacroGuideData.lua).

## 7. Tried in game (the probe, `/fui macros probe`, 2026-09-30)

The probe asks the client's own parser (`SecureCmdOptionParse`: it chooses, casts nothing) each condition both ways, `[x] yes; no`
and `[nox] yes; no`, and listens to the chat for "Unknown macro option". Run twice on Sashimii (Hunter 58, her pet out, in Everlook),
the second time with an Everlook Bruiser (friendly) targeted; the answers are in ForeverUIDB.macroProbe.
- **Read by 1.14.2's parser** (the two answers differ): combat, help, harm, dead, exists, stance, stealth, mounted, indoors,
  outdoors, swimming, resting, flying, pet, pet:name, channeling, group, group:raid, worn, equipped, mod, btn, actionbar, bonusbar,
  and the units @player, @pet, @mouseover, @targettarget, @party1, @focus. With the friendly target: [help] yes, [harm] no;
  [@player,help] yes; [@pet,exists] yes; [equipped:Bows] yes.
- **Focus works.** `/focus` on the Bruiser, then `UnitName("focus")` = Everlook Bruiser, `[@focus,exists]` and `[@focus,help]` yes.
  Classic Era hides the focus frame and its key bindings only. (A focus frame of our own is possible later.)
- **Later games' conditions are read but never true:** [spec], [talent], [flyable], [pvpcombat], [petbattle], [vehicleui], @cursor.
- **[known] isn't a condition here:** the game prints "Unknown macro option: known" and takes the choice anyway ([known:Frostbolt]
  answered yes for a Hunter). No condition makes SecureCmdOptionParse throw.
- **Still to try** (amber in the Guide, 14 entries): #show; `/cast !Auto Shot`; /petmoveto and /petdismiss against the 1.12 server;
  a Paladin's auras on the stance bar; Judgement off the global cooldown; [@pet,dead] with a dead pet; Shadowform and Ghost Wolf as
  [stance:1]; a demon's spell by name (/cast Spell Lock); the Druid's powershift. Moonkin and Shadowform paging
  (`/run print(GetBonusBarOffset())`).

## 7b. The checker (MacroCheck.lua) and the Library / Builder preview (step 4)

**MacroCheck.lua** (pure Lua, not in the TOC yet): `Parse` (text to blocks: the tooltip line, each line's command with its family and
whether it starts the global cooldown, its choices, each choice's `[..]` groups and conditions and unit, the spell), `Write` (blocks
to text: every Guide example comes back unchanged), `Check` (the light: red for what can't work, amber for what works with a catch,
green; each problem with the line, why and the fix; the tips), `Evaluate` (which choice each line takes with a given state, on whom,
and the lines that wait for the global cooldown or come after /stopmacro). Tests: 83-macro-check.lua (every Guide example round-trips
and is never red; 25 cases of the rules; the tips; "right now"). Choices made on the way (Stride's lesson, and the first test run):
a command we don't list is amber, not red (emotes and addons' commands are real); a second global-cooldown spell after one that
always fires is amber ("probably never casts": the spell list of what's off the cooldown is ours and short).

**The preview** (`python3 tools/asset-extract/macros_window_preview.py`, http://localhost:8777/ui-forever/macros-window/): the
Macros window 920 x 600 with top tabs General, <Class>'s, Library, Builder, Guide; nine characters (both sides), a level, a controller
switch. The page runs MacroCheck.lua itself through Fengari (a Lua engine in JavaScript), so its lights are the game's.
- **Library:** the class strip (Everyday and the nine, yours marked), filters by kind (Casting, Healing, Targeting, Attack, Pet, Items,
  Stances: read from each macro's blocks, not tagged by hand), search; cards with the spell's icon, the light, the kinds, the letters,
  Put on bar / Open in Builder / Copy to my macros; **greyed with the reason**: another class's, a spell above your level ("Execute
  comes at level 24"), a spell already on your bar ("Frostbolt is on your bar already, in 'Frostbolt, Nova on Shift'"); amber on a
  controller for [mod] choices and [@mouseover]; the icon's tooltip lists what goes with it (the same class's macros sharing a stance,
  a form or the pet). A bar of 12 slots below.
- **Builder:** the palette on the left by family (the button, Casting, Items, Targeting, Attack, Pet, Control), each block's tooltip
  the Guide's words, dimmed with the reason when it can't go (a second always-casting spell, a second next-target command, a pet for
  a class without one); **a click snaps it where the game needs it** (targeting first; stop casting, attack, the pet, a trinket before
  the cast; the rest after). The canvas: the button block on top (icon, name, #showtooltip), then each line as a coloured block with
  its "global cooldown" / "free" tag, its choices as rows ("when [chips] on [unit] → spell", "+ otherwise"), hexagon chips for
  conditions (click: the opposite; right click: out), the spell with its icon and your spells to pick from; ▲ ▼ ✕. A problem marks
  its block (red or amber edge, "!" with the message). The right: the light, why, the fix, the other problems, the letters meter,
  Tips, **Right now** (Shift / Ctrl / Alt, in a fight, the target, the pointer, the stance, the pet: the choice that fires is lit, a line
  that waits is hatched). Show the text (edit it: the blocks follow). Save to my macros.
- Caveat: the preview's spell levels come from the server's trainers (TrainerData.lua), which don't list spells taught by quests
  (Intercept's first rank with Berserker Stance, Aquatic Form): in the game the Library asks the client what you know.

## 8. Steps

1. ~~Research~~ (this doc). ~~The Macro Guide and /fui preview~~ (section 4): the user's look and words first.
2. ~~The shared window (Widgets.lua ns.CreateReferenceWindow), the Macro Guide in game, /fui reskinned with short names, the probe~~
   (0.186.0: tests 3439 + 88 + 91 + 1105, installed; checklist 341).
3. ~~The probe's results into the Guide's lights~~ (0.186.2: 21 entries green, 14 amber left; section 7).
4. ~~A browser preview of the revamped Macros window: Library and Builder~~ (section 7b; waiting for the user's look).
5. ~~The checker (Lua) with its tests; the Library and the Builder in game~~ (0.187.0: MacroWindow.lua, MacroLibrary.lua,
   MacroBuilder.lua; tests 84-macro-window.lua; checklist 343; to see in game after a restart). Not yet: the placeholders
   ({food}, {mount}, {form:Cat Form}), the icon picker (the macros take the question mark and #showtooltip), a ring slice from the
   Library.
6. Tie-ins: the pad templates (controller-class-templates.md) take library macros for their macro slots (Back, the heals); the rings
   (ring-menus.md) take macrotext slices.

## 9. The macros window skin (session 35, 2026-09-29)

Built unattended (the P3 list's item 28, with docs/specs/settings-windows.md). ForeverUI 0.112.0, skin part `macros` (in
`SkinSpellBook.lua`). Sources: the user's Forever shot 2026-09-28 20:29:24 (`_Inbox/More and Flight Path`); Forever's
`Blizzard_MacroUI` and `SharedUIPanelTemplates` (PanelTopTabButtonTemplate); 1.14.2's `MacroFrame.xml` (804027).

- **Forever and 1.14.2:** the same ButtonFrameTemplate window (the General / character tabs over the grid, the chosen macro with
  Change Name/Icon, Save, Cancel, the text with the characters used, Delete / New / Exit). Forever's differences: Camelot's metal
  with the macro icon in the ring and no title; top tabs (PanelTopTabButtonTemplate: the panel tab upside down, 75% tall, from the
  tab's bottom, the text 4 down when open and 8 when not); every button red; the minimal scroll bars.
- **The skin:** `ns.SkinButtonFrame` (title hidden), `ns.SkinTopTab` (new in Widgets.lua, over ns.SkinPanelTab: the pieces' texture
  coordinates flipped and cut to 75%, the sides at -3 / +7 and -1 / +8, the text offsets), the six buttons red, the two scroll frames
  minimal, the settings arrow.
- **In game (2026-09-29):** `/macro` as the Forever shot (the tabs, the red buttons, the ring). Not tried: editing a macro, the icon
  picker (its popup is not skinned yet).

## Sources

- Client: 142 804077 (ChatFrame.lua), 804793 (SecureTemplates.lua), 804760 (RestrictedEnvironment.lua), 804777, 804782, 804796,
  804026 / 804027 (MacroFrame), 4216112 (constants), 4216069 / 4216488 (TargetFrame, Era).
- https://warcraft.wiki.gg/wiki/Macro_conditionals, /MACRO_castsequence, /Making_a_macro, /Macro_commands, /UnitId,
  /Secure_command_options, /SecureActionButtonTemplate, /API_CreateMacro, /API_EditMacro, /Patch_11.0.2/API_changes,
  /Secure_Execution_and_Tainting; https://www.wowhead.com/classic/guide/classic-wow-basic-macro-guide-10007;
  https://www.curseforge.com/wow/addons/macro-bench; https://www.curseforge.com/wow/addons/macro.
- Resnick et al., "Scratch: Programming for All", CACM 2009 (https://web.media.mit.edu/~mres/papers/Scratch-CACM-final.pdf);
  Flannery et al., "Designing ScratchJr", IDC 2013 (https://sites.bc.edu/devtech/wp-content/uploads/sites/181/2018/02/scratchjr_idc_2013.pdf);
  Bau et al., "Learnable Programming: Blocks and Beyond", CACM 2017 (https://arxiv.org/pdf/1705.09413); Kölling, Brown, Altadmri,
  "Frame-based editing", VLSS 2017 (http://www.ksiresearch.org/vlss/journal/VLSS2017/vlss-2017-kolling-brown-altadmri.pdf);
  Blockly: https://docs.blockly.com/guides/create-custom-blocks/type-checks, /guides/configure/web/toolbox, /guides/design/applications/,
  /guides/design/blocks/, https://blocklycodelabs.dev/codelabs/validation-and-warnings/index.html; MakeCode:
  https://arcade.makecode.com/blocks/javascript-blocks; NN/g error messages: https://www.nngroup.com/articles/error-message-guidelines/;
  Becker et al. 2016 (https://eric.ed.gov/?id=EJ1117113); Denny et al. 2014; Marceau, Fisler, Krishnamurthi 2011
  (https://cs.brown.edu/people/sk/Publications/Papers/Published/mfk-mind-lang-novice-inter-error-msg/). The Scratch TOCE 2010 paper
  didn't load (403 / 404): its claims aren't used.
