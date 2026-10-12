# ForeverUI as a reskin of the game's own frames: plan

Written 2026-09-26, after the user's direction: "reskin all the assets used in 1.14.2 with the new UIs", switchable between the
old and new skins from the addon, with the other addons fixed where the new skin breaks them. Based on two read-only studies:
1.14.2's own world map and quest log code (`(private files)`, Vanilla files: WorldMap XML 4216458, Lua
4216078; QuestLogFrame XML 4216412, Lua 4216312; UIParent 4216112; MapCanvas 1383755/1383756/2026010), and the installed addons'
code (Questie 6.9.0, Leatrix Maps and Leatrix Plus 1.14.38, AI_VoiceOver 1.4.5, GatherMate2, Immersion, Bagnon, SexyMap,
AtlasLootClassic). Status: **agreed 2026-09-26** (the user took the recommended option on all four decisions, section 8).

## 1. What changes

Until 0.9.0 ForeverUI built its own windows next to the game's (character, bags, spell book, professions): the game's windows stay
as they are and other addons that hook them never see ours. From now on a frame gets Forever's look by **restyling the game's own
frame**: same frame, same named children, same functions; Forever's art, layout and extra pieces laid over and around it. Other
addons keep hooking what they always hooked.

## 2. The switch

- `ForeverUIDB.skin` = `"forever"` or `"classic"`, plus one setting per skinned frame (`/fui skin map off`).
- `/fui skin forever | classic` saves the choice and asks to reload the UI (a StaticPopup with "Reload"). A skin is applied once,
  after login; switching back needs a reload. Tearing a skin off live would mean restoring every anchor, size and texture of the
  game's frames and of what other addons did to them afterwards; a reload is what other skin addons do and can't leave half a skin.
- With `"classic"` nothing of the game's frames is touched (the skin modules don't run).
- The own-frame windows built so far keep their own switches (`/fui on|off`, `/fui bags`, `/fui crafting`) until they are migrated
  (section 7).

## 3. Rules for touching the game's frames (from the studies)

1. **Never replace** a Blizzard function, mixin method, or `UIPanelWindows` entry (`ToggleWorldMap`, `ToggleQuestLog`,
   `WorldMapMixin.*`, `QuestLog_Update`...): the open/close path runs through the secure `FramePositionDelegate` and a tainted
   path makes the map and the quest log "Interface action blocked" in combat. Use `hooksecurefunc` and `HookScript` only.
2. **Hide, never remove**: named globals and child keys stay (other code finds them by name: `WorldMapZoomOutButton`,
   the three map dropdowns, `QuestLogTitle1..n` with `NormalText` and `Check`, `QuestLogListScrollFrame`, `QuestLogDummyText`,
   `QuestLogDetailScrollFrame`, `EmptyQuestLogFrame`, the quest log's buttons...). Old art is hidden by walking `GetRegions()`
   (most of it has no name) and matching the texture file, not by region index (Leatrix Plus already reuses indices 3-6).
3. **Keep the canvas whole**: `WorldMapFrame.ScrollContainer`, its canvas, `pinPools`, `dataProviders` stay as they are; the
   canvas is resized only through its anchors, then `WorldMapFrame:OnFrameSizeChanged()` (nothing in 1.14.2 does that on a size
   change). Pins from Questie, GatherMate2 and Leatrix Maps follow the canvas, so they keep working.
4. **Our art on our own child frames** (a chrome frame parented to the game's frame), except where a piece of the game's frame
   is restyled in place (a button's textures, a font string's font).
5. **Apply last**: Leatrix Plus changes the quest log at PLAYER_LOGIN, Leatrix Maps the map at PLAYER_ENTERING_WORLD, both after
   ForeverUI's own login code (addons load alphabetically). The skin applies at PLAYER_ENTERING_WORLD plus one frame, and
   re-checks its layout on each `OnShow`.
6. **Combat**: the map and the quest log aren't protected, so restyling works in combat; only the open/close path must stay
   untainted (rule 1).

## 4. The other addons (what each needs; `docs/addons/README.md` gets a compatibility section)

| Addon | What it does to these frames | What the skin does |
|---|---|---|
| Questie | pins on the canvas (HereBeDragons-Pins); icons re-parented to `WorldMapFrame` at its level + 7 (not clipped); its map coordinates written every 0.5 s into the **first font string of `WorldMapFrame.BorderFrame`** (an error every 0.5 s if there is none); `Questie_Toggle` anchored left of `WorldMapFrameCloseButton`; replaces `QuestLogTitleButton_OnClick`; opens the log with `ShowUIPanel(QuestLogFrame)` | keep that font string as `BorderFrame`'s first text and place it where Forever shows the coordinates; put the quest-log panel above the icons' level; place `Questie_Toggle` in Forever's nav bar area; keep the rows' IDs and the faux scroll frame |
| Leatrix Maps (your settings: Remove map border ON, Unlock map frame ON, scale 0.9) | hides `BorderFrame`, moves the close button into the canvas, scale 0.9 and its own position, takes the map out of the UI panel layout, replaces `IsMaximized` and `HandleUserActionToggleSelf`, its own coordinates strip, zoom and reveal | conflicts with any new border and size: see decision 2 |
| Leatrix Plus (Enhance quest log ON, quest levels ON) | quest log 714 x 487 with 22 rows, its own `UIPanelWindows` entry (re-places the frame on every open), level prefixes in the titles | conflicts with moving the log into the map window: see decision 2; the level prefixes stay (they hook `QuestLog_Update`) |
| AI_VoiceOver | play buttons on the quest rows (`QuestLogTitle%d`), **only while `QuestLogFrame:IsShown()`** | the quest-log panel is `QuestLogFrame` itself, moved and restyled, never a copy |
| GatherMate2 | its own data provider and pins on the canvas | nothing needed |
| Immersion, Bagnon, SexyMap, AtlasLoot (its map button is off in its TOC), MTSL, WhatsTraining | nothing on these frames that the skin changes | nothing needed |

## 5. First reskin: the Map & Quest Log

What 1.14.2 has (the study): `WorldMapFrame` is a 1024 x 768 full-screen UI panel (`ignoreParentScale`, strata FULLSCREEN, the
canvas 1002 x 668 at (11, -70)), with dropdowns and a zoom-out button, a black backdrop, 12 border textures and a title; no nav
bar, no quest pins (Questie's), no coordinates, no minimize button. `QuestLogFrame` is a separate 384 x 512 panel (6 rows of
16 px, a faux scroll frame, a detail pane under it); while the map sits in the full-screen slot no other panel opens, and opening
the map hides the quest log. Forever's window is 1035 x 534: the map part 702 wide with the canvas at (2, 67)-(699, 532), the nav
bar, and the quest log panel 333 wide on the right (list with headers, quests and their objectives; details with a Back button).

The reskin, in commits:
1. **Switch and frame.** The skin framework (section 2); `WorldMapFrame` at 1035 x 534 in Forever's place and scale, out of the
   full-screen slot (the attribute route Leatrix Maps uses, `UIPanelLayout-*` frame attributes, checked against UIParent.lua
   first so the toggle path stays untainted), its backdrop and border art hidden, the canvas anchored to Forever's rectangle,
   Forever's chrome (metal frame, portrait, title "Map & Quest Log", close button restyled in place, the inner top line), the
   coordinates line at Forever's spot (Questie's font string, or ours).
2. **Nav bar** (ours: 1.14.2 has no usable one): Home (the world map), the map's parents as breadcrumbs, each with Forever's
   arrow dropdown listing its child maps (replacing the hidden dropdowns), the tracking button.
3. **Quest log panel**: `QuestLogFrame` anchored into the right 333 px of the map window and shown with it (L opens the map window
   with the log); its art hidden; Forever's search box, counter, gear, border, background, scroll bar; the rows restyled as
   Forever's headers and quests (collapse art, difficulty colours, the tracked box). The game's row model stays (fixed-height
   rows, the faux scroll frame): Forever lists each quest's objectives under it, which the game's rows can't hold. See decision 3.
4. **Details**: the detail pane restyled as Forever's (parchment, title and texts in Forever's fonts, rewards box, Back, Abandon,
   Share, Track), shown instead of the list when a quest is selected.
5. **Compatibility pass** with Questie, AI_VoiceOver and the Leatrix addons as decided, and an in-game checklist.

Tests: the stub grows models of `WorldMapFrame` and `QuestLogFrame` as 1.14.2 builds them (named children, anonymous art,
UIPanel attributes), plus small stand-ins for what Questie, Leatrix and AI_VoiceOver do to them (write to `BorderFrame`'s first
font string, re-anchor, hook `QuestLog_Update`), so the checks catch a skin that breaks them. Positions are checked against the
recreated pages (`map`, `map-details`), as before. Art: all 34 pieces the two pages use are on disk.

## 6. Afterwards

The guild window (Forever's Guild & Communities) becomes a reskin of the game's guild frame (in 1.14.2 the Guild tab of
`FriendsFrame`). Forever's `-c60` XP-bar art is read when the game is closed.

## 7. The windows built as own frames (0.1.0-0.9.0)

Character (with Reputation, Skills, PvP, Currency), bags, spell book, professions and the XP bars are own frames today. Migrating
them means restyling `CharacterFrame` (with its PaperDoll, Reputation, Skill and Honor frames), the container frames,
`SpellBookFrame` and `TradeSkillFrame`/`CraftFrame`; the layout and art work already done (positions, art, the widgets) carries
over, the frame logic doesn't. Proposed order, by what other addons hook: professions (Skillet and MissingTradeSkillsList hook
`TradeSkillFrame`), spell book (WhatsTraining adds a tab to it), character window, bags last (Bagnon replaces the game's bags
anyway), XP bars (already sit in the game's own slots).

## 8. Decisions (2026-09-26: the recommended option each time)

1. **Switching needs a reload** (recommended), or live switching (much more work, fragile).
2. **Leatrix Maps' "Remove map border" and "Unlock map frame", and Leatrix Plus' "Enhance quest log"**: turned off while the
   Forever skin is on (recommended: ForeverUI then owns the map's size, place and border, and the quest log's layout; it prints
   a one-time note when it finds them on), or ForeverUI adapts to them (keeps their scale, position and border choice: much
   more code and several layouts to test).
3. **Quest log rows**: keep the game's row model restyled (recommended: AI_VoiceOver, Questie and Leatrix Plus keep working
   untouched; objectives show in the details, not under each quest), or Forever's list with objectives under each quest (our own
   list over the game's rows, and AI_VoiceOver's play buttons and Leatrix's level prefixes reimplemented on it).
4. **The own-frame windows**: migrate after the Map & Quest Log and the guild window (recommended), or now, before new frames.

Chosen: 1 reload to switch; 2 the three Leatrix options off while the Forever skin is on (ForeverUI says so once when it finds
them on); 3 the game's rows restyled; 4 migrate the own-frame windows after the Map & Quest Log and the guild window.

## 9. Progress (2026-09-26 afternoon)

Done, each a tested commit: the Map & Quest Log (0.10.0-0.13.0; 0.14.2: fixes from the first in-game test, and the map out of the
full-screen slot by itself now that Leatrix Maps is disabled), the guild window for a guildless character (0.14.0), the guild
roster over the Guild tab (0.16.0, page `guild-roster`), the professions (0.17.0: our crafting page hosted on the game's
TradeSkillFrame / CraftFrame, the game's widgets kept invisible under it and used for every action), the spell book (0.18.0: the
game's 12 a page in Forever's 3 columns; the spell buttons are secure, so their layout is set out of combat only).
Learned: a skin must work from the game's own toggles (the micro buttons), not only from our keys; never write a global or field
the game's secure paths read (GUILDMEMBERS_TO_DISPLAY, SPELLS_PER_PAGE, a row's guildIndex): the reader's execution is tainted.
0.19.0: the professions' side tabs and book page on the skinned windows, as secure children of TradeSkillFrame / CraftFrame
(the windows become protected like the game's SpellBookFrame; the game's own code still shows and hides them in a fight, and our
hooks there touch only unprotected parts; a secure keeper hides the book when the window closes). Not a holder beside the window:
nothing secure could show and hide it with an unprotected window in a fight (SecureHandlerWrapScript skips unprotected frames in
combat: IsWrapEligible).
0.20.0: the character window as a skin (our tab pages on a frame over the game's CharacterFrame, the game's subframes switched
by its own ToggleCharacter, the paper doll's gear slots and model the game's own in Forever's places). Tested with a second test
file that logs in with the skin already on (`foreverui_skin_login_test.lua`, run by the main test).
0.21.0: Forever's pet page, a page of the Character tab from its sidebar's pet tab (the game's PetPaperDollFrame underneath).
Next: the bags, the XP bars.
