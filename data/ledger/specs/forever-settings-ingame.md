# Forever in-game Options (Settings panel) as camelot shows it: from the UI code

Read-only research, 2026-09-30, from the extracted UI code only (nothing run, client not touched). Complements
`docs/specs/forever-settings.md` (the glue/character-select view, chrome and row geometry). Paths are relative to
`(private files)`. Abbreviations: `SDF` = `blizzard_settingsdefinitions_frame/`, `SDS` =
`blizzard_settingsdefinitions_shared/`, `SP` = `blizzard_settings_shared/`, `GM` = `blizzard_gamemenu/shared/`, `AL` =
`blizzard_addonlist/`, `QK` = `blizzard_quickkeybind/`, `SX` = `blizzard_sharedxml/`. English texts come from Forever's GlobalStrings
(`(private files)`, 27,334 tags, decoded with `tools/asset-extract/wdc3.py` +
`dbd/GlobalStrings.dbd`); the tag is given in `TAG` form only where it helps. Row notation: `Label` [control] `cvar or PROXY_name`.
Controls: cb checkbox, sl slider (range, step), dd dropdown, btn button. `>` = child (indented, small font, greyed while its
parent predicate fails; SP settingcontrols.lua per forever-settings.md section 3).

## 0. Rules used to decide what camelot loads

- Game types: a `[AllowLoadGameType mainline]` tag is satisfied by camelot (camelot is in the mainline family). Proof: the same tocs
  pair `[AllowLoadGameType mainline]` with `[ExcludeLoadGameType camelot]` (`blizzard_uipanels_game.toc` CharacterFrame lines) and
  SDF's own toc keeps a `[Game]` override for camelot after every `[Family]` file (SDF toc:4-18). So `[Family]` = `mainline/`
  loads for camelot unless a line says `[ExcludeLoadGameType camelot]`; `[Game]` = `camelot/` then overrides it.
- SDF toc: `AllowLoad: Game` (:3), so nothing in this doc exists at character select. Excluded for camelot: `ControlsOverrides`
  mainline file (:6, replaced by camelot/controlsoverrides.lua :14) and `Mounts.lua` (:33, the Accessibility "Mounts" category).
  Loaded although "mainline"-tagged: `PingSystem.xml` (:25), `Accessibility.xml` (:29), `AdvancedOptions.lua` (:34), SDS `Text.lua`
  and the two preview files (SDS toc:14-18). Camelot-only files: `camelot/{nameplates,controls,social,keybindings,accessibility,
  interface}overrides.lua` (:13-18).
- Registration: every `Register()` is queued with `SettingsRegistrar:AddRegistrant` and run in file-load order after both
  `VARIABLES_LOADED` and `PLAYER_ENTERING_WORLD` (SP blizzard_settingsregistrar.lua:5-24, in game). A category's id is a counter
  taken at creation, and its default `order` = id (SP blizzard_category.lua:3-9, 29-31); the group list sorts by that order
  (SP blizzard_categorylist.lua:316-340). No stable-sort concerns: the custom orders below are unique.
- Runtime-only conditions (`C_CVar.GetCVar("x")` existence, `C_GameRules.*`, `C_VoiceChat.*`, `C_Discord.IsEnabled()` ...) cannot
  be decided from code. They are marked `[?]`. Anything marked `[?]` needs a screenshot.

## 1. Frame, tabs, groups, category order

- `SettingsPanel` 920 x 724, CENTER (SP blizzard_settingspanel.xml:4-5), title `SETTINGS_TITLE` = "Options" (SP settingspanel.lua:48).
  Bottom right: "Close" and "Apply" (Apply only shown with unapplied changes, xml:46-57, lua:67-70); header of the right pane: category
  name + "Defaults" button (SP blizzard_settingslist.xml:8-41) -> popup `GAME_SETTINGS_APPLY_DEFAULTS` with buttons "All Settings" /
  "Current Settings" / Cancel (SP blizzard_dialogs.lua:2-17). Search box bottom right (350 x 22, xml:76-81).
- Tabs (SP settingspanel.xml:26-45): **Game** (`SETTINGS_TAB_GAME`) and **AddOns** (`SETTINGS_TAB_ADDONS`). Both tabs are hidden when
  no AddOns-set category exists (settingspanel.lua:164-177): a stock Forever shows no tab strip, only the Game list. The AddOns
  list (`Settings.RegisterAddOnCategory`, SP blizzard_settings.lua:134-137) is alphabetical (blizzard_categorylist.lua:404-437).
- Group order (SDS groups.lua:5-8, in game): **Gameplay** (1), **Accessibility** (2), **System** (3); a fourth "Debug" group exists only
  for `IsGMClient()` (:9-12) and nothing registers into it. Group headers cycle the art `Options_CategoryHeader_1..3`
  (SP blizzard_categorylist.lua:30-34, 431). A hidden `NoDisplayKB` category (Gameplay group, `redirectCategory` set) holds the
  searchable keybinding rows and is skipped when the list is drawn (SDF keybindings.lua:179-218; SP categorylist.lua:414).
- Opens on the first category = Controls (SP settingspanel.lua:161-162, 829-834).

**Gameplay** (`CUSTOM_GAMEPLAY_SETTINGS_ORDER`, SDF mainline/gameplaysettingsgroup.lua:2-13; each Register calls `SetOrder`)
1. **Controls** (7) SDF controls.lua:39  2. **Interface** (8) interface.lua:15  3. **Action Bars** (9) actionbars.lua:85
4. **Combat** (10) combat.lua:12  5. **Social** (11) social.lua:81
6. **Gamepad (Alpha)** (12) SDS gamepad.lua:296-329: registered into Gameplay in game (System at glue); only if `InputUtil.IsGamepadUISupported()`
   = CVar `InputDeviceInterfaceStyle` exists (SDS gamepad.lua:333; SX mainline/inpututil.lua:7-9). The glue screenshots show Gamepad
   present (forever-settings.md:85-86), so it is expected here too.
7. **Ping System** (13) SDF pingsystem.lua:2-3  8. **Keybindings** (14) keybindings.lua:278-285
9. **Advanced Options** (15) advancedoptions.lua:7-11, registered only `if C_GameRules.IsStandard()` (:3) `[?]`. Camelot overrides exist only for this
   file's switches (camelot/interfaceoverrides.lua:40-58: swing timer + cooldown manager true, assisted combat / boss warnings /
   external defensives false), which argues that it appears.
10. **Nameplates** (16) nameplates.lua:328 (`NAMEPLATE_OPTIONS_LABEL`).
Dropped: Mounts is in Accessibility and excluded (SDF toc:33). Ping System and Advanced Options are mainline-tagged but load for camelot.

**Accessibility** (no `SetOrder`, so registration order = file load order: SDS files first, then SDF)
1. **Interface** (`ACCESSIBILITY_INTERFACE_LABEL`) SDS mainline/text.lua:100-109  2. **Audio Assist** SDS audioassist.lua:94-1343
3. **Subtitles** SDS subtitles.lua:68  4. **General** SDF accessibility.lua:41  5. **Colors** (`Settings.GetColorblindSettingsLabel()` returns
`COLORS_LABEL`, SDF mainline/colorblindoverrides.lua:157-159): registered by `mainline/Colorblind.lua`, which the toc reaches through
`[Family]\Colorblind.xml` (SDF toc:30; xml:3 `<Script file="Colorblind.lua"/>`) but that `.lua` is NOT in the extracted tree
(`_crawl.json` has no such path). Order (after General) and content are inferred from toc order and the strings; verify in game.

**System** (registration order in SDS toc:6-12): 1. **Graphics** (graphics.lua:759)  2. **Audio** (audio.lua:400)
3. **Languages and Social** (languages.lua:147)  4. **Network** (network.lua:6; skipped in Kiosk :2)  5. **Keyboard Options**
(`MAC_SETTINGS_LABEL`, only `IsMacClient()`, SDS mac.lua:67-72; the user's Mac: yes).
Subcategories: none registered anywhere in the tree (no `Register*Subcategory` caller outside the API files), so the list has no
expand arrows and no indent.

## 2. Categories, rows top-down (camelot)

### Controls (SDF controls.lua, camelot overrides controlsoverrides.lua)
- No section header at the top. `Sticky Targeting` cb `deselectOnClick` (value negated) :43-47
- (Auto Dismount removed: camelot `SetupAutoDismountSetting` is empty, camelot/controlsoverrides.lua:27-29; mainline had `autoDismountFlying`)
- `Auto Cancel Away Mode` cb `autoClearAFK` :52; `Interact On Left Click` cb `interactOnLeftClick` :55; `Open Loot Window at Mouse` cb `lootUnderMouse` :59;
  `Auto Loot` cb `autoLootDefault` :62; `Auto Loot Key` dd modified-click ALT/CTRL/SHIFT/NONE, default SHIFT, label flips to "Loot Key" while Auto Loot is on
  `AUTOLOOTTOGGLE` :65-67, 1-33; `Combine Bags` cb `combinedBags` `[?]` only if the cvar exists (camelot controlsoverrides.lua:31-36)
- `Enable Interact Key` cb `PROXY_ENABLE_INTERACT` (`softTargetInteract`) :73-86; a key row `Interact With Target` (label + two binding buttons, action
  INTERACTTARGET) :89-95; `Interact Key Sound Cue` cb `softTargettingInteractKeySound` :98
- Header `Mouse` :101: `Lock Cursor to Window` cb `ClipCursor` `[?]` (`SupportsClipCursor()`) :104; `Invert Mouse` cb `mouseInvertPitch` :109;
  `Mouse Look Speed` sl 90-270 step 10 shown 1-10 `PROXY_MOUSE_LOOK_SPEED` (`cameraYawMoveSpeed`, pitch = half) :118-137;
  `Enable Mouse Sensitivity` cb+sl 0.5-1.4 step .05 shown 1-10 `enableMouseSpeed` + `mouseSpeed` :140-152;
  `Click-to-Move` cb+dd `autointeract` + `cameraSmoothTrackingStyle` (Only horizontal when moving 1 / Only when moving 4 / Always adjust camera 2 / Never adjust camera 0) :155-173
- Header `Camera` :176: `Water Collision` cb `cameraWaterCollision` :179; `Auto Follow Speed` sl 90-270 step 10 shown 1-10 `PROXY_CAMERA_SPEED` :183-200;
  `Camera Following Style` dd `cameraSmoothStyle` (same four options, last text differs) :203-213
- Camelot extras (`AdjustCameraSettings`, camelot/controlsoverrides.lua:3-25): `Max Camera Distance` sl 1.0-2.0 step .1 `cameraDistanceMaxZoomFactor`;
  `Follow Terrain` cb `cameraTerrainTilt`; `Head Bob` cb `cameraBobbing`; `Smart Pivot` cb `cameraPivot`.

### Interface (SDF interface.lua:10-159; camelot/interfaceoverrides.lua)
- Header `Display` :18. In-game navigation: gone (camelot no-op, camelot/interfaceoverrides.lua:2-3). `Tutorials` cb+btn "Reset Tutorials" `showTutorials` :29-41.
  Outline: gone (:5-6). `Status Text` dd Numeric Value / Percentage / Both / None (default None) `PROXY_STATUS_TEXT` (`statusTextDisplay` + `statusText`) :47-95.
  `Chat Bubbles` cb `chatBubbles`; > `Party Chat Bubbles` `chatBubblesParty`; > `Raid Chat Bubbles` `chatBubblesRaid` :98-111.
  `Replace Player Frame Portraits` cb `ReplaceOtherPlayerPortraits` `[?]`; `Replace My Frame Portrait` cb `ReplaceMyPlayerPortrait` `[?]` :113-123.
- Header `Quests` (camelot version, camelot/interfaceoverrides.lua:8-30; base at mainline/interfaceoverrides.lua:293): only `Show Low-Level Quests` cb `PROXY_TRIVIAL_QUEST_FILTERING`
  (minimap tracking filter). The retail "account completed quests" filter is dropped.
- Header `Toasts` :131: `Show Item Toasts` `enableLootToasts`; `Show Collection Toasts` `enableCollectionToasts`; `Show Recipe Toasts` `enableLearnedRecipeToasts` (cb x3) :133-135.
- Header `Raid Frames` :140 (only if `Blizzard_CUFProfiles` is loaded, else a "disabled" label :143-147): a raid-frame preview panel (`RaidFramePreviewTemplate`,
  SDF interface.xml:3-27), then (mainline/interfaceoverrides.lua:27-186): `Display Incoming Heals` `raidFramesDisplayIncomingHeals` `[?]`; `Display Power Bars`
  `raidFramesDisplayPowerBars` > `Display Only Healer Power Bars`; `Display Aggro Highlight` `[?]`; `Display Class Colors` cb + colour swatch "Health Bar Color"
  (`raidFramesDisplayClassColor`, `raidFramesHealthBarColor`); swatch `Background Color` `raidFramesHealthBarColorBG`; `Display Pets` `raidOptionDisplayPets`;
  `Display Main Tank and Assist`; `Show Debuffs` `raidFramesDisplayDebuffs` > `Bigger Role Debuffs`, `Display Only Dispellable Debuffs`; `Center Big Defensives`;
  `Dispellable Debuff Indicator` dd (Disabled / Dispellable By Me / Show All) `raidFramesDispelIndicatorType` > `Dispellable Debuff Color` dd (Disabled / Use Debuff Color /
  Use Black), `Flashing Animation`, `Animated Border`; `Display Health Text` dd (None / Health Remaining / Health Lost / Health Percentage) `raidFramesHealthText`.
  PvP frames: none (camelot `CreatePvpFrameSettings` empty :36-38). Housing: none (:32-34).
- Header `Map Coordinates` :253 (mainline/interfaceoverrides.lua:253-262): `Player Map Coordinates` `worldMapShowPlayerCoords`; `Cursor Map Coordinates` `worldMapShowCursorCoords`;
  `Player Minimap Coordinates` `minimapShowPlayerCoords`; `Coordinates in Tenths` `coordsByTenths` (cb x4).

### Action Bars (SDF actionbars.lua)
- `Action Bar 2` ... `Action Bar 8` cb x7 `PROXY_SHOW_ACTIONBAR_2..8` (get/set via `GetActionBarToggles`), not created if `C_GameRules.IsMultiActionBarVisibilityForced()` `[?]` :7-56.
- `Lock Action Bars` cb + `Pick Up Action Key` dd (ALT/CTRL/SHIFT/NONE, default SHIFT) `lockActionBars` + `PICKUPACTION` :89-107.
- `Show Numbers for Cooldowns` cb `countdownForCooldowns` :109-112.

### Combat (SDF combat.lua, mainline/combatoverrides.lua)
- `Personal Resource Display` cb `nameplateShowSelf` (hidden if game rule PersonalResourceDisplayDisabled) combat.lua:14-17.
- `Self Highlight` dd (Circle / Outline / Icon / Circle and Outline / Circle and Icon / Outline and Icon / Circle, Outline, and Icon / Off) `PROXY_SELF_HIGHLIGHT` (`findYourself*`) combatoverrides.lua:3-49.
- `Show Silhouette when Obscured` cb `occludedSilhouettePlayer` :75-77; `Target of Target` cb `showTargetOfTarget` :31; `Do Not Flash Screen at Low Health` cb `doNotFlashLowHealthWarning` :34;
  `Loss of Control Alerts` cb `lossOfControl` `[?]` :36-39.
- `Scrolling Combat Text for Self` cb `enableFloatingCombatText`; > `Combat Text Float Mode` dd (Scroll Up / Scroll Down / Arc) `floatingCombatTextFloatMode_v2`, only if `classicStyleWorldText` is "0" `[?]` combatoverrides.lua:51-73.
- `Mouseover Cast` cb + `Mouseover Cast Key` dd (ALT/CTRL/SHIFT/NONE, default NONE) `enableMouseoverCast` + `MOUSEOVERCAST` `[?]` :47-64.
- `Self Cast` dd (None / Auto / Key Press / Auto and Key Press) `PROXY_SELF_CAST` (`autoSelfCast` + `SELFCAST`); > `Self Cast Key` dd ALT/CTRL/SHIFT, enabled for Key Press / Auto and Key Press :66-135.
- `Focus Cast Key` dd (ALT/CTRL/SHIFT/NONE, default ALT) `FOCUSCAST` :138-146.
- `Empowered Spell Input` dd (hold / tap) `empowerTapControls` `[?]` :149-159; `Spell Alert Opacity` sl 0-1 step .05 `spellActivationOverlayOpacity` `[?]` :162-174;
  `Press and Hold Casting` cb `ActionButtonUseKeyHeldSpell` `[?]` :177-180; `Enable Action Targeting` cb `PROXY_ACTION_TARGETING` (`softTargetEnemy`) :183-196.
- Mirrored into Accessibility > General: Self Highlight, Silhouette, Spell Alert Opacity, Press and Hold, Empowered Spell Input (SDF accessibility.lua:137-156).

### Social (SDF social.lua; camelot/socialoverrides.lua removes the neighborhood row). No section headers. Top to bottom:
- `Disable Chat` cb `PROXY_DISABLE_CHAT` (opens `CHAT_CONFIG_DISABLE_CHAT` popup; not modifiable when muted / age-restricted) :5-78;
  `Real Time Chat Filtering` dd (Everyone / Everyone except friends / Everyone except friends and guildmates / No one) `PROXY_CENSOR_MESSAGES` (`excludedCensorSources`) mainline/socialoverrides.lua:6-53;
  `Mature Language Filter` cb `profanityFilter` (disabled on zhCN) :88-92; `Guild Member Alert` `guildMemberNotify`; `Block Trades` `blockTrades`; `Block Guild Invites` `PROXY_BLOCK_GUILD_INVITES`;
  (`Block Neighborhood Invites` removed, camelot/socialoverrides.lua:2-4); `Restrict Calendar Invites` `restrictCalendarInvites`; `Block Chat Channel Invites` `blockChannelInvites` :95-115;
  `Online Friends` `showToastOnline`; `Offline Friends` `showToastOffline`; `Broadcast Updates` `showToastBroadcast` :118-124;
  `Location Visibility` dd (Friends and Guildmates / Friends, Recent Allies, and Guildmates) `PROXY_SOCIAL_LOCATION_VISIBILITY` `[?]` :126-151;
  `Real ID and BattleTag Friend Requests` `showToastFriendRequest`; `Show Toast Window` `showToastWindow`; `Auto Accept Quick Join Requests` `autoAcceptQuickJoinRequests` `[?]` :154-162;
  `Chat Style` dd (IM Style / Classic Style) `chatStyle` :165-174; `New Whispers` dd (New Tab / In-line / Both) `whisperMode` :177-187; `Chat Timestamps` dd (None + 6 clock formats) `showTimestamps` :190-219;
  `Connect to Pinterest` cb+btn (Sign In / Disconnect) `enableConnectToPhotoSharing` `[?]` `C_PhotoSharing.IsEnabled()` :222-275; `Reset Chat Position` btn "Reset" :278-286;
  Discord `[?]` (`C_Discord.IsEnabled()`): btn "Enable Discord %s Functionality" (Sign In) + > `Display Name` dd (Default / Last online / Global name) `discordDisplayName` :289-347.

### Gamepad (Alpha) (SDS gamepad.lua:296-329) `[?]` present only if the cvar exists
- `Enable Gamepad UI (Alpha)` cb `GAMEPAD_INTERFACE_TOGGLE` (`InputDeviceInterfaceStyle`) :303-317; `Show Input Legend` `GamepadShowPersistentInputLegend`; sections `Camera`, `HUD Modifier`,
  `Frame Focus Style`, `Action Bars`, `Targeting`, `Raid Targeting Options` (Hover Mode cb) :137-292 (rows not listed: `GamePad*` cvars, invert axes, face movement, party targeting).

### Ping System (SDF pingsystem.lua; `?` help-plate button in the header via `AssignTutorialToCategory` :12)
- `Enable Pings` cb `enablePings` :15; > `Ping Mode` dd (Quick Ping / Relaxed Ping) `pingMode` :22-33; > mirrored `Ping Sounds` cb+`Ping Volume` sl 0-1 step .05 (`Sound_EnablePingSounds`,
  `Sound_PingVolume`, from Audio) :35-41; > `Ping Target` dd (Environment / Units / Show All) `pingTarget` :44-57; `Show Pings in Chat` cb + btn "Chat Settings" `showPingsInChat` :60-69;
  `Show Pings on Raid Frames` cb `showPingsOnRaidFrames` :72; btn "Ping Keybindings" (opens Keybindings and expands the Ping System section) :75-92. `[?]` all cvars must exist in camelot.

### Advanced Options (SDF advancedoptions.lua; camelot flags from camelot/interfaceoverrides.lua:40-58) `[?] IsStandard()`
- Mirrored buttons (`Click Casting`, `Quick Keybind Mode`) :14-21. Combat Assistant section: NOT shown (`HasAssistedCombat` false, :24). Boss Warnings: NOT shown (:98).
- Header `Cooldown Manager` :315: `Enable Cooldown Manager` cb `cooldownViewerEnabled` :331; btn `Edit Mode` :343; btn `Advanced Cooldown Settings` :352.
- External Defensives: NOT shown (:358). Header `Swing Timer` :377: `Enable Swing Timer` cb `showSwingTimer` :381 (`Blizzard_SwingTimer` is camelot-only, its toc).
- Header `Damage Meter` :389: `Enable Damage Meter` cb `damageMeterEnabled` :403; `Auto Reset Damage Meter` cb `damageMeterResetOnNewInstance` :415.
- Header `Diminishing Returns  (Work in Progress)` :421 only if `C_SpellDiminish.IsSystemSupported()` `[?]`: `Diminishing Returns Tracking` cb `spellDiminishPVPEnemiesEnabled` :423;
  > `Only Castable by Me` cb `spellDiminishPVPOnlyTriggerableByMe` :425-429.

### Nameplates (SDF nameplates.lua; camelot overrides nameplatesoverrides.lua; `?` help plate :342)
- Header `Names` :346: `My Name` cb `UnitNameOwn` :351; `My Secondary Name` cb `UnitSurnameOwn` only if `RegionalUniqueNamesEnabled()` `[?]` :357 (not shown normally);
  `NPC Names` dd (Quest NPCs / Hostile and Quest NPCs / Hostile, Quest, and Interactive NPCs / All NPCs / None) `PROXY_NPC_NAMES`, default 5 (None) for the Classic preset else 3
  (camelot/nameplatesoverrides.lua:3-5) :426; `Critters and Companions` `UnitNameNonCombatCreatureName` :433; `Friendly Players` `UnitNameFriendlyPlayerName` > `Minions` `UnitNameFriendlyMinionName` :438;
  `Enemy Players` `UnitNameEnemyPlayerName` > `Minions` `UnitNameEnemyMinionName` :448.
- Header `Nameplates` :457: `Always Show Nameplates` `nameplateShowAll`; `Enemy Unit Nameplate` `nameplateShowEnemies` > `Minions` `nameplateShowEnemyMinions`, `Minor` `nameplateShowEnemyMinus` :461-476;
  `Friendly Player Nameplates` `nameplateShowFriendlyPlayers` > `Minions`, `Only Show Names`, `Use Class Color for Names` (realm-name row removed: `ShowRealmOption` false) :487-517;
  `Friendly NPC Nameplates` `nameplateShowFriendlyNpcs` :520; `Show Offscreen Nameplates` `nameplateShowOffscreen` :525;
  `Stack Nameplates` dd-of-checkboxes (Enemy Units / Friendly Units) `nameplateStackingTypes` `[?]` :529-551; then a nameplate preview panel :556.
- Then: `Size` sl `nameplateSize` (Small..Huge, step 1) :562; `Buff/Debuff Scale` sl 0.7-1.4 step .1 shown as % `nameplateAuraScale` :574; `Style` dd (Default / Large / Block / Cast Focus, camelot list, camelot/nameplatesoverrides.lua:7-14) `nameplateStyle` `[?]` :585;
  `Nameplate Information` dd-of-cb (Health Percentage / Health Value; no Rarity Icon in camelot) `nameplateInfoDisplay` :593; `Cast Bar Information` (Spell Name / Spell Icon / Spell Target / Highlight Important Casts / Flash When Targeted By Enemy) `nameplateCastBarDisplay` :625;
  `Aggro Display` (Progressive / Flash / Health Bar Color) `nameplateThreatDisplay` :658; `Enemy NPC Buffs/Debuffs` (Mob Buffs / Personal Debuffs / Shared CC) :685; `Enemy Player Buffs/Debuffs` (Buffs / Debuffs / Big Debuff) :714;
  `Friendly Player Buffs/Debuffs` :743; `Debuff Padding` sl 0-50 step 1 `nameplateDebuffPadding` :774; `Simplify Nameplates` (Minions / Minor / Friendly Players / Friendly NPCs) `nameplateSimplifiedTypes` :784;
  `Nameplate Class Color` (Friendly Players / Enemy Players; shown in camelot) `nameplateShowFriendlyClassColor` + `nameplateShowClassColor` :821-863. Each dd-of-cb sits behind `if C_CVar.GetCVar(...)` `[?]`.

### Accessibility > Interface (SDS mainline/text.lua:100-109, `Text Scale` first)
- Header `Display`: `Text Scale` dd (Small .857 / Medium 1.0 / Large 1.143 / Extra Large 1.43 / Huge 1.71 / Gigantic 2.0) `PROXY_ACCESSIBILITY_FONT_SIZE` (TextSizeManager) :56-97 (with hover preview panel);
  `Quest Text Contrast` dd (Default / Brown / Light2 / Light3 / Black) `PROXY_QUEST_TEXT_CONTRAST` (`questTextContrast`) only if the cvar exists `[?]` :18-54.

### Accessibility > Audio Assist (SDS audioassist.lua:94-1343)
- In game (`InitGameSettings`, :100-1163): header `Chat Text to Speech`: `Transcribe Voice Chat` cb `speechToText` (voice chat only); `Read Chat Text out loud` cb+btn "Configure Text to Speech" `textToSpeech`;
  `Speak for me in Voice Chat` cb `remoteTextToSpeech` > `Voice` dd (voice chat, `[?]` needs `C_VoiceChat.IsEnabled()`).
- Header `Combat Audio Alerts` (only if voice chat enabled `[?]`, :177+): `Enable Combat Audio Alerts` cb `CAAEnabled` and ~55 rows behind it (`CAA*` cvars): speaker voice/speed/volume,
  Say Combat Start / End, Pulse Your Health (+volume), Say Your Health (+format, voice, throttle, volume), Say Target Name / If Targeted / Target Health (+format, voice, throttle, volume, When Target Dies),
  Say Party Health (+voice, frequency, volume), Player Resource 1 and 2 (+format, voice, throttle, volume), Say Player Casts / Target Casts (+format, voice, min cast time, throttle, volume),
  Interrupt / Successful Interrupt alerts, Say Your Debuffs (+format, voice, min duration, volume), Debuff Self Alert. Rows are added only after the voice service connects (:1305-1340).
- "Screen Narrator" (`ENABLE_SCREEN_NARRATOR` etc., :57-92) is glue only (:1303-1313): not in game.

### Accessibility > Subtitles (SDS subtitles.lua:67-169)
- Header `Display`; preview panel; `Cinematic Subtitles` cb `movieSubtitle`; `Subtitles Background` dd (None (Default) / Dark / Light) `PROXY_MOVIE_SUBTITLE_BACKGROUND` (`movieSubtitleBackground`), shown while subtitles on;
  `Background Opacity` sl 50-100 step 10 as % `PROXY_MOVIE_SUBTITLE_BACKGROUND_ALPHA` (`movieSubtitleBackgroundAlpha`), shown while background > None.

### Accessibility > General (SDF accessibility.lua:41-229, camelot/accessibilityoverrides.lua)
- `Show Move Pad` cb `enableMovePad` :44; `Enable Photosensitivity Mode` cb `overrideScreenFlash` (camelot override :3-7); `Minimum Character Name Size` sl 0-64 step 2 `PROXY_MINIMUM_CHARACTER_NAME_SIZE` (`WorldTextMinSize`) :11-38, 51;
  `Motion Sickness` cb `PROXY_SICKNESS` :54-70; `Camera Shake` dd (None / Reduced / Full) `PROXY_SICKNESS_SHAKE` :73-115; `Cursor Size` dd (Default, 32x32 .. 128x128) `cursorSizePreferred` :118-135;
  then the mirrored Combat rows (see Combat) :137-156; `Show Target Tooltip` cb `PROXY_TARGET_TOOLTIP` :159-173; `Interact Key Icons` dd (NPCs Only (Default) / Show All / Show None) `PROXY_INTERACT_ICONS` :176-222.
  Arachnophobia: NOT shown (camelot `CreateArachnophobiaSetting` is empty, camelot/accessibilityoverrides.lua:9-11).

### Accessibility > Colors (inferred, source file missing)
- From strings + the overrides file: `Enable UI Colorblind Mode` cb (`USE_COLORBLIND_MODE`), `Colorblind Filter` dd (None / Protanopia / Deuteranopia / Tritanopia), `Adjust Strength` sl, and the panel
  `ItemQualityColorOverrides` (header "Item Quality", 8 colour swatches Poor..Heirloom, SDF mainline/colorblindoverrides.lua:3-11, colorblind.xml:26-56). Unverified: the category's own rows.

### Graphics (SDS graphics.lua:759-1655; mainline/graphicsoverrides.lua in SP)
- `Monitor` dd `PROXY_PRIMARY_MONITOR` (`gxMonitor`) :787; `Display Mode` dd (Fullscreen (Windowed) / Windowed) `gxMaximize` :811; `Resolution` dd `PROXY_RESOLUTION` :869; > `Render Scale` sl `RenderScale` :889;
  `Use UI Scale` cb + `UI Scale` sl .65-1.15 step .01 `useUiScale`/`uiscale` :929; `Vertical Sync` dd (Disabled/Enabled) `vsync` :962; `Notch Mode` dd (only if a display has a notch) :981;
  `Low Latency Mode` dd (Auto Detect / Disabled / Built-in / NVIDIA Reflex / ...) `LowLatencyMode` :991.
- `Anti-Aliasing` dd (None / Image-Based Techniques / Multisample Techniques / Advanced) `PROXY_ANTIALIASING` :1063; > `Image-Based Techniques` dd (None / FXAA Low / FXAA High / CMAA / CMAA 2) `ffxAntiAliasingMode` :1093;
  > `Multisample Techniques` dd `MSAAQuality` :1138; > `Multisample Alpha-Test` cb :1158.
- `Character Models` dd (Standard Definition / High Definition) `PROXY_CHARACTER_MODELS_TOGGLE` only if `C_GameRules.IsSDHDToggleEnabled()` `[?]` (Forever's SD/HD switch, SP mainline/graphicsoverrides.lua:83-126);
  `High Definition Textures` dd (only if available and Battle.net connected) :128-179; `Camera FOV` sl `cameraFov` `[?]` :1189.
- `Graphics Quality` expandable section :1219: tab "Base Game Quality" (slider `graphicsQuality`) and tab "Raid and Battleground" (cb "Enable Raid and Battleground Settings", `raidGraphicsQuality`), each with one dropdown per
  setting: Shadow Quality, Liquid Detail, (PBR Liquid Detail), Particle Density, SSAO, Depth Effects, Compute Effects, (Outline Mode), Texture Resolution, (Spell Density), Projected Textures, (Secondary Lighting),
  View Distance, Environment Detail, Ground Clutter, (Bloom Intensity) (SP mainline/graphicsoverrides.lua:3-68; bracketed ones behind `C_VideoOptions.Is*Supported()`).
- Header `Advanced` :1253: `Triple Buffering` cb :1270; `Texture Filtering` dd (Bilinear .. 16x Anisotropic) :1291; `Ray Traced Shadows` dd :1308; `Resample Quality` dd (Point / Bilinear / Bicubic / FidelityFX Super Resolution 1.0) :1325;
  `VRS Mode` dd :1341; `Graphics API` dd (Auto Detect / Metal / Metal Legacy on Mac) :1399; `Physics Interactions` dd `physicsLevel` `[?]` :1427; `Graphics Card` dd `gxAdapter` :1456;
  `Max Foreground FPS` / `Max Background FPS` / `Target FPS` cb+sl 8-200 step 1 :1475-1519; `Resample Sharpness` sl 0-2 step .1 (reversed) :1560; `Contrast` sl 0-100 :1572; `Brightness` sl 0-100 :1580; `Gamma` sl .3-2.8 step .1 :1588.
- Header `Compatibility Settings` :1629 with up to four cb (Optional GPU Features, Async Resource Creation, Multithreaded Rendering, Advanced Work Submit), each only if its `GxCompat*` cvar exists.

### Audio (SDS audio.lua:400-580; SP mainline/audiooverrides.lua)
- `Enable Sound` cb `Sound_EnableAllSound` :404; `Output Device` dd `Sound_OutputDriverIndex` :418; `Master Volume` sl 0-1 step .05 `Sound_MasterVolume` :431 with children `Music` / `Effects` / `Ambience` / `Dialog` volume sliders
  (`Sound_MusicVolume`, `Sound_SFXVolume`, `Sound_AmbienceVolume`, `Sound_DialogVolume`).
- `Music` cb `Sound_EnableMusic` > `Loop Music` `Sound_ZoneMusicNoDelay`, > `Pet Battle Music` (if cvar); `Sound Effects` cb `Sound_EnableSFX` > `Enable Pet Sounds`, `Emote Sounds`; `Gameplay Sound Effects` cb+sl `Sound_EnableGameplaySFX` /
  `Sound_GameplaySFX` (label "Enable audio cues during combat encounters" on the checkbox tooltip); `Dialog` cb `Sound_EnableDialog` > `Error Speech`; `Ambient Sounds`; `Sound in Background`; `Enable Reverb`; `Distance Filtering`
  (`Sound_EnablePositionalLowPassFilter`); `Audio Channels` sl 20-128 step 1 `Sound_NumChannels` :529; `Audio Cache Size` dd Small (64MB) / Large (128MB) `Sound_MaxCacheSizeInBytes` :545.
- Game only: header `Ping System`: `Ping Sounds` cb+`Ping Volume` sl, btn "Ping System Settings"; header `Boss Warnings`: `Boss Warning Sounds` cb+`Boss Warning Volume` sl (`Sound_EnableEncounterWarningsSounds`,
  `Sound_EncounterWarningsVolume`), btn "Boss Warning Settings" (audiooverrides.lua:3-68; `[?]` cvars; the button jumps to an Advanced Options section camelot hides).
- Header `Voice Chat` (added later, only once `C_VoiceChat.CanAccessSettings()`, 5 s ticker :564-577 `[?]`): Mac microphone warning, `Output Device`, > `Voice Chat Volume`, > `Voice Chat Ducking`, `Microphone Device`, > `Microphone Volume`,
  > `Microphone Sensitivity`, > test microphone, `Voice Chat Mode` dd (Push to Talk / Open Mic), > `Push to Talk Key` (custom binding button) :205-395.

### Languages and Social (SDS languages.lua:142-183; SP camelot/languagesoverrides.lua)
- Header `Languages`: `Text` dd `textLocale` (flag atlas, no steppers); `Audio` dd `audioLocale`; a "restart needed" row while `textLocale` differs :149-167. Header `Social` (in game only, camelot override, and only if `C_AccountServices` allows it `[?]`):
  `Preferred Online Language` dd + "Apply" btn, `Preferred Account Location` dd + "Apply" btn (SP blizzard_settings_preferredplaysettings.lua:91-211).

### Network (SDS network.lua:6-22) `Advanced Combat Logging` cb `advancedCombatLogging`; `Optimize Network for Speed` cb `disableServerNagle`; `Enable IPv6 when available` cb `useIPv6` (last two unless build option `DisableNagleAndIPV6Options`).
### Keyboard Options (SDS mac.lua:1-17) `Disable OS Keyboard Shortcuts` cb `MacDisableOsShortcuts` (asks for Universal Access via `MAC_OPEN_UNIVERSAL_ACCESS`); `Command left click as right click` cb `MacUseCommandLeftClickAsRightClick`.

## 3. Keybindings (SDF keybindings.lua/.xml, mainline/keybindingsoverrides.lua, camelot/keybindingsoverrides.lua; row template SP blizzard_keybindings.lua/.xml)

- Top of the page, in order: (1) cb `Character Specific Keybindings` `PROXY_CHARACTER_SPECIFIC_BINDINGS` (default `Settings.CannotDefault`; unchecking asks "Really switch to general key bindings? ..." with OK/Cancel) keybindings.lua:287-317, 6-17;
  (2) button row `Click Casting` (closes the panel, `ToggleClickBindingFrame()`) mainline/keybindingsoverrides.lua:38-55; (3) button row `Quick Keybind Mode` (closes the panel, `QuickKeybindFrame:Show()`) :57-72.
  Then the sections (`CreateKeybindingInitializers`, :231-275). All sections start collapsed (`expanded` nil; only Plunderstorm expands, keybindingsoverrides.lua:8-12). "Defaults" in the header resets this page
  (`Settings.SafeLoadBindings(Default)`, SP settingspanel.lua:546-548) after the generic "All / Current Settings" popup.
- Section order comes from `KeybindingsOverrides.AddBindingCategories` (mainline/keybindingsoverrides.lua:7-36); keys are the localized `BINDING_HEADER_*` globals:
  1 Movement Keys, 2 Interface Panel, 3 Action Bar, 4-10 Action Bar 2..8 (each shown only while its Action Bar 2..8 checkbox is on: `requiredSettingName` `PROXY_SHOW_ACTIONBAR_n`, :17-23; keybindings.lua:170-173),
  11 Extra Action Bars, 12 Chat, 13 Targeting, 14 Target Markers, 15 Vehicle Controls, 16 Camera, 17 Ping System, [Housing removed for camelot: `HasHousingCategory()` false, camelot/keybindingsoverrides.lua:2-4],
  18 Miscellaneous, 19 Other. Any other header found in the bindings list is appended after "Other" in first-seen order (e.g. Voice Chat, Movie Recording, Shaman Totem Bar Functions, Commentator..., iTunes Remote, Debug; the
  strings exist in GlobalStrings). Empty sections are skipped (:268). Bindings with no category go to "Other" (:245-247).
- Where the data comes from: the client's `GetNumBindings()` / `GetBinding(i)` = action, category token, key1, key2 (keybindings.lua:24-25); the tokens are `BINDING_HEADER_*` set by `Bindings.xml` (client data, NOT in the extracted tree: the exact
  per-section action list cannot be derived here; `BINDING_NAME_*` has 498 strings in GlobalStrings as an upper bound). Pseudo-actions starting `HEADER` become a 25 px spacer, `PREFACE` a text line (`SettingsKeybindingPrefaceTemplate`,
  GameFontHighlight, x 37) (keybindings.lua:251-255; xml:5-21). Addon bindings trigger a rebuild on `ADDON_LOADED` (:330-354).
- Section bar = `SettingsKeybindingSectionTemplate`, an expandable header 30 px tall (atlas `Options_ListExpand_Left/_Middle/Right`, `..._Right_Expanded` when open), title = the header text, optional "NEW" tag (SP settingcontrols.xml:191-232; SDF keybindings.xml:23-36;
  keybindings.lua:119-132). Expanded height = 25 x rows + 25 + 20; rows start 45 px below the bar top (:79-82, 156-163).
- Row (`KeyBindingFrameBindingTemplate`, 560 x 25, SP blizzard_keybindings.xml:41-91): label GameFontNormal at x 37, 170 px wide, no wrap (tooltip when truncated), then two 160 x 22 buttons (`Button1` at centre - 80, `Button2` right of it), text = the key
  chord (`BindingButtonTemplate_SetupBindingButton`). Left-click a button: selected highlight + listen for the next key (Esc cancels, a mouse wheel counts); right-click: unbind that slot; success text "Key Bound Successfully" and conflict messages
  come from the panel's output line (SP blizzard_keybindings.lua:76-121 for the listener; `OnKeybind*` handlers and `OutputText` at BOTTOM y 24 in SP blizzard_settingspanel.lua:98-102, 979-985; row wiring :385-450). Hover: highlights the matching action-bar / pet / stance button
  (`DetermineHighlightFrame`, SP blizzard_keybindings.lua:312-353) and adds a tooltip "name - key" (:419). `TOGGLE_VOICE_PUSH_TO_TALK` uses a custom binding button instead of slot 1 (:252-262, 399-410).
- Search: the hidden `NoDisplayKB` category exposes every binding as a row with search tags (binding name + `C_KeyBindings.GetSearchTagsForAction`) and also matches the current key text (keybindings.lua:179-218; SP blizzard_keybindings.lua:532-566).
- **Quick Keybind Mode** (`QuickKeybindFrame`, `QK quickkeybind.xml:20-89`, lua:104-253): a 450 x 250 movable DIALOG-strata frame at CENTER y +150 titled "Quick Keybind Mode", text "You are in Quick Keybind Mode. Mouse over a button and press the
  desired key to set the binding for that button." + "Canceling will remove you from Quick Keybind Mode." + an output line; a "Character Specific Keybindings" checkbox (:124-129), "Reset To Default" (popup "Do you want to reset all keybindings to their defaults?", SP blizzard_dialogs.lua:70-84),
  Okay (saves, `KeybindListener:Commit`) and Cancel (reloads the current set). While open, all action-bar grids and button highlights are forced visible (`ActionButtonUtil`, :150-156), hovering a button starts listening for it (one slot), Esc on a hovered button clears its
  primary binding, and closing re-opens the Settings panel (:159-176). It loads with `Blizzard_QuickKeybind` (`AllowLoad: Game`, depends on SettingsDefinitions_Frame).
- **Keyboard visualisation: none.** `grep -ril keyboard` over the whole tree only hits `EnableKeyboard` frame attributes, Dynamic Flight cvar names (`advFlyKeyboard*`, excluded Mounts), gamepad/HUD comments and two ExperiencePreset bullet texts; no key-grid / on-screen keyboard frame exists.
  The only "layout" UI for binding is the list above and Quick Keybind Mode on the real action bars.

## 4. AddOns list (`AL addonlist.xml/.lua`, `AllowLoad: Both`, toc)

- Frame `AddonList` (ButtonFrameTemplate, portrait hidden) 600 x 550 at CENTER (0, 24), HIGH strata (game; DIALOG at glue) addonlist.xml:120-123, lua:231-249; title "AddOn List" (`ADDON_LIST`); `UIPanelWindows` area center, whileDead (lua:33-35).
- Top bar (y -27..-31): `Dropdown` (WowStyle1, 140 wide, TOPLEFT 12,-30): "All" / the current character (in game only the logged-in character; default = the current character, lua:11-18, 637-668);
  `ForceLoad` checkbox "Load out of date AddOns" (TOP -80,-27; inverse of `C_AddOns.IsAddonVersionCheckEnabled`, lua:285-301); `SearchBox` 160 x 22 TOPRIGHT (-10,-31), filters title / group / category (lua:449-470).
- `Performance` strip (only when `C_AddOnProfiler.IsEnabled()` and in game; 55 px, xml:151-189, lua:760-773): header "AddOn Usage", then Current / Average / Peak CPU. No memory column: memory shows in the per-row tooltip ("Memory Usage: %d MB", lua:882-892; refreshed at most every 15 s, :775-786).
- List: `ScrollBox` 466 x 386 (TOP at the performance strip, LEFT 7, BOTTOMRIGHT -34,28) + `MinimalScrollBar`, tree view (indent 20, pad 5, spacing 8, lua:264-283, xml:214-227). Rows: 520 x 16.
  Category row (`AddonListCategoryTemplate`): collapse arrow (atlas `bag-arrow`) at x 13 + title GameFontNormal; collapsed state kept in `g_addonCategoriesCollapsed` (saved variable, toc). Secure addons without a Category go under "Uncategorized" (lua:478-481). Categories sorted A-Z, addons by index.
  Addon row (`AddonListEntryTemplate`): tri-state checkbox (24 px, x 5, grey tick = enabled for some characters), title at x 32 with a 20 px icon (`IconTexture`/`IconAtlas`, else the question mark) coloured gold (loadable) / red (enabled but broken) / grey (disabled)
  (lua:381-385), a warning icon for performance warnings, right-aligned status ("Out of date", "Disabled", "Dependency disabled", "Only loadable on demand", ...) or red "Requires Reload" after a change, and a "Load AddOn" button (100 x 22) for load-on-demand addons (xml:45-89, lua:307-328, 396-435).
  Left click toggles, right click opens a context menu (Enable All Dependencies / Enable-Disable Group or Category / Reset to Default, lua:928-967). Tooltip = title + version, notes, dependencies, CPU metrics (lua:851-892).
- Bottom: `Enable All` (120 x 22, BOTTOMLEFT 4,4), `Disable All`, and at BOTTOMRIGHT `Cancel` and `Okay` (80 x 22); Okay's text becomes "Reload UI" as soon as any state differs from the start state (lua:536-546); Okay saves (`C_AddOns.SaveAddOns`) and reloads, Cancel / close resets (`ResetAddOns`, lua:613-626, 674-686).
- Opened from the game menu button "AddOns" (below): `ShowUIPanel(AddonList, nil, "GameMenuFrame")`; because of the context key, closing the list re-shows the game menu (GM gamemenuframe.lua:230, 53-54, 115-119; SX uiparentpanelmanager.lua:531-533).
  The button exists only if `GameRulesUtil.ShouldShowAddOns()` (at least one AddOn present, and `IsTestBuild()` or the UserAddonsDisabled rule off, SX gamerulesutil.lua:58-67) and is DISABLED (no tooltip) when `C_AddOns.GetScriptsDisallowedForBeta()`
  is true (GM gamemenuframe.lua:229): on a beta client that forbids scripts the list cannot be opened from the menu.

## 5. Game menu (`GM gamemenuframe.lua/.xml`; template `MainMenuFrameTemplate`)

- Toc: `GameMenuFrame.lua/.xml` load for camelot (blizzard_gamemenu.toc :7, :9); the `[Game]` files are Plunderstorm-only. Opens via Esc's last-resort handler `GameMenuEscPriority.World` -> `GameMenuFrame_Show()` (`blizzard_gamemenuesc.lua:6-61, 110-111`, GM :38-41)
  or the micro-menu button (`blizzard_micromenu/mainline/mainmenubarmicrobuttons.lua:1999-2013`).
- Template (`SX mainline/frame/mainmenuframetemplates.xml:11-53`, `SX shared/frame/mainmenuframetemplates.lua:1-83`): vertical-layout frame 260 wide, padding top 48 / bottom 34 / left+right 28, spacing 0, `DialogBorderTemplate` border, header "Game Menu" (`MAINMENU_BUTTON`, font
  `GameFontNormalMed1`, GM xml:10, TOP y +11). Buttons `BigRedThreeSliceButtonTemplate` 200 x 36, `GameFontHighlightLarge`. `AddSection()` = 20 px extra top padding on the next button; `AddCloseButton` = section + a button.
- Button order for camelot (`InitButtons`, GM :163-274); every click plays a sound, hides the menu, then runs the action:
  1. [`Activities` gold-red button + section break, only if `C_ExternalEventURL.HasURL()` :178-187]
  2. `Options` -> `SettingsPanel:Open()` (with a "new" tag when `CurrentVersionHasNewUnseenSettings()`) :192-199
  3. [`Shop`, only if the store or Shop 2 is enabled `[?]` :201-208]
  -- section break (20 px) :210
  4. [`Rewards`, only if `GameRulesUtil.GetActiveAccountStore()` :216-226]  5. `AddOns` (see section 4) :228-231  6. [`What's New`, only if `ShouldShowSplashScreen()`: `IsStandard()` + splash available :233-235, SX gamerulesutil.lua:70-74]
  7. `Edit Mode` (if `EditModeManagerFrame:CanEnterEditMode()`) :237-246  8. [`Rating` only if `SetRatingsButtonShown`] :248-251  9. `Support` :253  10. `Macros` (unless game rule MacrosDisabled) :255-263
  -- section break :265
  11. `Log Out` -> `Logout()` :268  12. `Exit Game` -> `Quit()` :269 (both disabled while the "CAMP", "PLUNDERSTORM_LEAVE" or "QUIT" popup is visible :267)
  -- section break (from `AddCloseButton`, MainMenuFrameMixin lua:73-78)
  13. `Return to Game` :271 (hidden in gamepad UI :156-161).
- Confirmation: **no confirm dialog** for either button: `Logout` / `Quit` are client functions without arguments (blizzard_apidocumentationgenerated/connectiondocumentation.lua:87-93, alongside `ForceQuit`, `ForceLogout`, `CancelLogout` :10-20). The client
  then shows the timer popups (no Lua caller in the tree; texts and behaviour are defined in `blizzard_staticpopup_game/gamedialogdefs.lua`; camelot's file only overrides `GetBindWarning`):
  - `StaticPopupDialogs["CAMP"]` (:242-256): text `CAMP_TIMER` = "%d %s until logout", button2 "Cancel" only (Cancel / Esc -> `CancelLogout()`), timeout 20 s, `whileDead`, `hideOnEscape`.
  - `StaticPopupDialogs["QUIT"]` (:1441-1458): text `QUIT_TIMER` = "%d %s until exit", button1 "Exit now" (`ForceQuit()`), button2 "Cancel", timeout 20 s, `OnHide` calls `CancelLogout()` while time is left, `whileDead`, `hideOnEscape`.
  Both count seconds down through `GameDialogDefsUtil.GetDefaultExpirationText` (gamedialogdefsutil.lua:53-61). Whether they appear at all (instant logout when resting / in a city) is decided by the client, not by this code.

## 6. Surprises and caveats (short)

- Gamepad sits in Gameplay (order 12) in game, labelled "Gamepad (Alpha)"; at glue it was System.
- Accessibility order is derived, not observed: Interface, Audio Assist, Subtitles, General, Colors (Colors' registration file `Colorblind.lua` is missing from the extraction).
- Advanced Options is gated on `C_GameRules.IsStandard()`; Ping System and every `[?]` row needs its cvar to exist in camelot (`Settings.RegisterCVarSetting` errors on a missing cvar, SP blizzard_setting.lua:273-277).
- Camelot removes: Auto Dismount, Account-completed quest filter, Housing / PvP frames, neighborhood invites, arachnophobia, Mounts, Combat Assistant, Boss Warnings (but Audio still lists Boss Warning sounds), External Defensives, keybinding Housing section, Nameplate realm/rarity options.
- Camelot adds: Max Camera Distance / Follow Terrain / Head Bob / Smart Pivot, nameplate class colors, Swing Timer, Cooldown Manager, Cast Focus nameplate style, `Character Models` SD/HD switch (Graphics).
- Bindings.xml (the real binding list and headers) is not in the extracted code; only the section order (19 known headers) is.
