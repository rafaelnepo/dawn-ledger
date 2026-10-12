# Options window: Forever's Options panel on 1.14.2 settings (mapping spec)

Research 2026-09-30, read-only. Data: `addons/ForeverUI/OptionsData.lua` (`ns.OptionsData`, not in the TOC yet). What Forever shows
(labels, order, control types) comes from the shots `_Inbox/Game Menu and Map/WoWScrnShot_093026_131251..131503.jpg` (34 shots,
one category each, long pages scrolled) and `docs/specs/forever-settings-ingame.md` (code, conditions); the panel look from
`docs/specs/forever-settings.md`. What 1.14.2 can do comes only from its UI code in `(private files)`. Every
CVar in the data file was grepped there (all 161 found). Out of scope: ForeverUI's own settings, key bindings (own window), AddOns tab.

**Cite keys** (FileDataID.bin, lines): **P** 4216416 InterfaceOptionsPanels.lua, **X** 4216415 its XML, **IF** 804636
InterfaceOptionsFrame.lua (`UVARINFO` defaults :311-345, redock :268), **OP** 804696 OptionsPanelTemplates.lua (tooltip rule :367),
**VD** 948936 VideoOptions data (the `VideoData[...]` entries; the brief's 948933 only declares `VideoData={}`), **VL** 948933
VideoOptionsPanels.lua (apply :262-300, network :981-1008, languages :1011-1170), **VX** 948938 its XML, **AL** 804553 AudioOptions
Lua, **AX** 804547 its XML, **AF** 804065 AudioOptionsFrame.lua, **MK** 1089708 Mac keyboard options, **CUF** 803968 / 803969
CompactUnitFrameProfiles Lua / XML.

## 0. The organisation (the user, 2026-09-30, after the first look in game)

`OptionsLayout.lua` places OptionsData.lua's rows by key: groups Gameplay and System; categories with sections (a title, or none
to run on from the one above; `columns = 2` for a run of boxes; `onlyIf = "mac" | "windows"` by the switch at the top) and
sub-categories listed under them, 10 further in. The user's three rules: two columns where there are many toggles; separate menus
where a page holds too many different things (Graphics: the display, Graphics Quality, Raids and Battlegrounds, Advanced); group,
sort, merge the tiny menus (Accessibility's three pages are one; Languages, Network and the Mac keyboard are System > General).
Key Bindings isn't a category: the top bar has Key Bindings, AddOns, Macros, then Mac / Windows.

Later the same day (0.176.1-0.177.0): the list flush left under separators (a page names its `set`, a short `name` for the list and
a full `title`), no indented sub-menus; the controls 30 units right of Forever's (CTRL_X = centre - 50: the longest labels, at the
game's text width, ~1.15x a PIL measure of FRIZQT, fit). The graphics presets (Options.lua, PRESETS): Performance, Balanced (the
Defaults of the graphics pages: GetDefaultVideoOption per graphics CVar, GetCVarDefault for filtering / AA / ray tracing),
Cinematic; the raid CVars follow; a Mac's tier from its chip (Entry M1-M2 base: Cinematic shadows High, SSAO Low, no MSAA; Mid:
no MSAA; High: SSAO Ultra, 2x MSAA); no ray-traced shadows on a Mac; Apply restarts the display.

## 1. Row fields (the data file's schema)

`kind` header | check | slider | dropdown | checkslider (check + `slider = {}`) | checkdropdown (check + `dropdown = {}`, Forever's
Click-to-Move and Lock Action Bars rows) | checkbutton (check + `button = {}`, Tutorials) | button. `key` unique over the file.
`cvar` plain CVar; a check writes "1"/"0", or `on`/`off` when given; `invert` = label is the CVar's opposite. `handler` = needs an API
or more than SetCVar; `note` = 1.14.2's exact calls. `alsoSet = { { cvar, factor } }` = a second CVar written as value x factor
(1.14.2 does it: pitch speeds X:2495-2510, X:2335-2345; pet spell damage X:313-318). `uvar` = the global 1.14.2 mirrors the CVar in
(combat text and action bars read it; IF:311). `video` = VideoData key: the change waits for Apply like 1.14.2's VideoOptions.
`options = { { value, label, tip } }` values are the CVar's strings; `valueGlobal` = value is a GlobalStrings tag (timestamps).
`optionsFrom` = list built at run time (monitors, resolutions, antiAliasing, msaa, graphicsApis, adapters, soundDrivers,
voiceOutputDevices, voiceInputDevices, locales, audioLocales). `min`/`max`/`step`; `minFrom`/`maxFrom` = API for the range. `format`
string.format pattern, `"percent"` (0..1 as %), `"1to10"` (Forever's 1..10 display of min..max). `tip` GlobalStrings tag (1.14.2's
rule, OP:367: `OPTION_TOOLTIP_` + the label tag minus `_TEXT`; fall back to the label if `_G` lacks it) or plain English. `default`
only where 1.14.2's code states it, else `GetCVarDefault(cvar)`. `child` = indented small row; `parent` = the row that enables it,
`enabledWhen` = the parent values that enable it (default: on). `labelFollows`/`textOff` = label swap (Loot Key). `restart` window
(UpdateWindow) | gx (RestartGx) | sound (Sound_GameSystem_RestartSoundSystem, AF:27-30) | client (restart the game). `onlyIf`
windows | mac | voice | raidProfiles | rogueDruid (on a header/category: all of it). `tab` base | raid. `extra` = 1.14.2 setting Forever
lacks. `charSpecific` = stored on the character (server flags). `opens` = category is a link to another window.

## 2. Categories

Kept (list order = Forever's): **Gameplay** Controls 19, Interface 28, Action Bars 8, Combat 24, Social 16, Keybindings (link, 0
rows), Nameplates 17. **Accessibility** Subtitles 1, General 1, Colors 3. **System** Graphics 41, Audio 27, Languages and Social 2,
Network 3, Keyboard Options 2 (Mac only, MK:22). 192 rows, 42 of them extras.
Dropped (no row works on 1.14.2): **Gamepad (Alpha)** (no gamepad CVar in 1.14.2's UI; only `GamePadEnabled/State` in the secure
environment 804760), **Ping System**, **Advanced Options** (Click Casting, Quick Keybind, Cooldown Manager, Swing Timer, Damage
Meter, Diminishing Returns: none exist), **Accessibility > Interface** (Text Scale, Quest Text Contrast), **Audio Assist** (no TTS,
no combat audio alerts, no narrator).

## 3. Per category (Forever row -> 1.14.2; extras marked +)

**Controls** (X:84-214, P:125-243; Mouse X:2468-2618, P:1648-1760; Camera X:2279-2421, P:1529-1647)
- Sticky Targeting -> `deselectOnClick` inverted (X:92-96). Auto Cancel Away Mode -> `autoClearAFK`. Interact On Left Click ->
  `interactOnLeftClick`. Open Loot Window at Mouse -> `lootUnderMouse`. Auto Loot -> `autoLootDefault`. Loot Key -> modified click
  AUTOLOOTTOGGLE ALT/CTRL/SHIFT/None, default SHIFT, label "Auto Loot Key" while Auto Loot is off (P:137-243). + Auto Dismount in Flight
  `autoDismountFlying` (X:101).
- Mouse: Lock Cursor to Window -> `ClipCursor`, **Windows only** (X:2557-2571 hides it elsewhere; the user's Mac: hidden). Invert
  Mouse -> `mouseInvertPitch`. Mouse Look Speed -> `cameraYawMoveSpeed` 90-270/10 + `cameraPitchMoveSpeed` = v/2. Enable Mouse
  Sensitivity -> `enableMouseSpeed` + `mouseSpeed` 0.5-1.5/0.05 (Forever 0.5-1.4; 1.14.2's range kept). Click-to-Move -> `autointeract`
  + `cameraSmoothTrackingStyle` (1/4/2/0, P:1659-1760).
- Camera: Water Collision `cameraWaterCollision`; Auto Follow Speed `cameraYawSmoothSpeed` 90-270/10 + `cameraPitchSmoothSpeed` v/4;
  Camera Following Style `cameraSmoothStyle` (P:1546-1647); Max Camera Distance `cameraDistanceMaxZoomFactor` 1-2/0.1; Follow Terrain
  `cameraTerrainTilt`; Head Bob `cameraBobbing`; Smart Pivot `cameraPivot`. All seven exist on 1.14.2.
- Dropped: Combine Bags, Enable Interact Key, Interact With Target (a binding), Interact Key Sound Cue (no soft-target CVars).

**Interface** (Display X:849-1190, P:553-755; status text P:1379-1480; raid profiles CUF)
- Display: Tutorials cb + Reset Tutorials -> `showTutorials` (default 1) + CanResetTutorials()/ResetTutorials() (X:1077-1127).
  Status Text -> `statusTextDisplay` NUMERIC/PERCENT/BOTH/NONE, also `statusText` 1/0 (P:1390-1480). Chat Bubbles -> `chatBubbles`;
  > Party Chat Bubbles -> `chatBubblesParty` (1.14.2 drives both from one All/None/Exclude-party dropdown, P:657-746).
  + Show Helm, + Show Cloak (ShowHelm/ShowCloak, character flags, X:881-958); + Beginner Tooltips `showNewbieTips`; + Loading Screen
  Tips `showLoadingScreenTips`; + Rotate Minimap `rotateMinimap`; + Minimap Clock `showMinimapClock`; + Hide Zone Objective Tracker
  `hideOutdoorWorldState`.
- Quests: + Instant Quest Text `instantQuestText` (X:959); + Automatic Quest Tracking `autoQuestWatch` (X:975). (Forever's only row,
  Show Low-Level Quests, is dropped: no trivial-quest tracking on 1.14.2.)
- Raid Frames -> the active raid profile: `GetRaidProfileOption/SetRaidProfileOption(GetActiveRaidProfile(), opt, v)` then
  `CompactUnitFrameProfiles_ApplyCurrentSettings()` (CUF 803968:172, :521-528). Display Incoming Heals `displayHealPrediction`,
  Display Power Bars `displayPowerBar`, Display Aggro Highlight `displayAggroHighlight` (these two have no widget in 1.14.2's profile
  panel, only in `CUFProfileActionTable` 803968:591-620), Display Class Colors `useClassColors`, Display Pets `displayPets`, Display
  Main Tank and Assist `displayMainTankAndAssist`, Show Debuffs `displayNonBossDebuffs` > Display Only Dispellable Debuffs
  `displayOnlyDispellableDebuffs`, Display Health Text `healthText` none/health/losthealth/perc. + Keep Groups Together > Horizontal
  Groups (shown while on) / Sort By role/group/alphabetical (shown while off) (803969:488-530); + Display Border; + Frame Height 36-72/2;
  + Frame Width 72-144/2 (803969:617-633). Dropped: Display Only Healer Power Bars, the class-color and background swatches, Bigger
  Role Debuffs, Center Big Defensives, Dispellable Debuff Indicator (+ its three children), the preview.
- Dropped sections: Toasts (no loot/collection/recipe toast CVars), Map Coordinates (no coordinate CVars). Dropped rows: Raid Chat
  Bubbles, Replace Player Frame Portraits, Replace My Frame Portrait.

**Action Bars** (X:1652-1830, P:1118-1270)
- Action Bar 2..5 -> `GetActionBarToggles()` slots 1-4 (bottom left, bottom right, right, right 2) / `SetActionBarToggles(b1..b4,
  alwaysShow)` + `MultiActionBar_Update()` + `UIParent_ManageFramePositions()` (P:1152-1180); Action Bar 5 is enabled only while
  Action Bar 4 is on (X:1725). Action Bar 6/7/8: dropped (4 multibars).
- Lock Action Bars -> `lockActionBars` + Pick Up key PICKUPACTION ALT/CTRL/SHIFT/None, default SHIFT (P:1182-1270). Show Numbers for
  Cooldowns -> `countdownForCooldowns`. + Stack Right Bars Vertically `multiBarRightVerticalLayout`; + Always Show Action Bars
  `alwaysShowActionBars`.

**Combat** (X:236-846, P:245-552)
- Target of Target `showTargetOfTarget`. Do Not Flash Screen at Low Health `doNotFlashLowHealthWarning`. Scrolling Combat Text for
  Self `enableFloatingCombatText` (loads Blizzard_CombatText, X:340-360) > Combat Text Float Mode `floatingCombatTextFloatMode`
  1/2/3 (not `_v2`; P:363-440). Self Cast (None/Auto/Key Press/Auto and Key Press) -> `autoSelfCast` + SELFCAST modified click (the
  same proxy Forever uses) > Self Cast Key ALT/CTRL/SHIFT, default ALT (P:271-360). Focus Cast Key FOCUSCAST, default **NONE** on
  1.14.2 (Forever ALT) (P:442-530).
- + the twelve combat text filters, as children of Scrolling Combat Text (X:405-702; defaults IF:311): Low Mana & Health, Auras
  Gained/Lost, Fading Auras, Enter/Leave Combat, Dodge/Parry/Miss, Damage Reduction, Reputation Changes, Spell Alerts, Friendly Healer
  Names, Combo Points (Rogue/Druid only, P:1869-1880), Energy Gains, Honorable Kills. + Auto Attack/Auto Shot `autoRangedCombat`;
  + Damage Numbers `floatingCombatTextCombatDamage` > Periodic Damage, Pet Damage (+ `floatingCombatTextPetSpellDamage`); + Healing
  Numbers `floatingCombatTextCombatHealing`.
- Dropped: Personal Resource Display, Self Highlight (see open questions), Show Silhouette when Obscured, Loss of Control Alerts,
  Mouseover Cast (+ key), Empowered Spell Input, Spell Alert Opacity, Press and Hold Casting, Enable Action Targeting.

**Social** (X:1227-1606, P:756-1117)
- Mature Language Filter `profanityFilter`; Guild Member Alert `guildMemberNotify`; Block Trades `blockTrades`; Block Guild Invites
  -> Get/SetAutoDeclineGuildInvites (character flag, X:1307-1345); Block Chat Channel Invites `blockChannelInvites`; Online /
  Offline Friends, Broadcast Updates, Real ID and BattleTag Friend Requests -> `showToastOnline/Offline/Broadcast/FriendRequest` +
  `BNToastFrame:UpdateToastEvent`; Show Toast Window `showToastWindow` + `BNToastFrame:SetToastsEnabled`; Chat Style `chatStyle`
  im/classic (P:830-915); New Whispers `whisperMode` popout/inline/popout_and_inline (P:916-994); Chat Timestamps `showTimestamps`
  none + six `TIMESTAMP_FORMAT_*` (P:995-1077); Reset Chat Position -> `FCF_RedockAllWindows()` (IF:268).
- + Spam Filter `spamFilter`; + Detailed Loot Information `showLootSpam` (at the end).
- Dropped: Disable Chat, Real Time Chat Filtering, Restrict Calendar Invites, Location Visibility, Auto Accept Quick Join Requests,
  Enable Discord / Display Name. 1.14.2's Twitter row (`enableTwitter`, hidden unless the service answers) is not carried over.

**Keybindings**: kept in the list as `opens = "keybindings"` (ForeverUI's own window); no rows here.

**Nameplates** (Names panel X:1842-2246, P:1272-1378)
- Names: My Name `UnitNameOwn`; NPC Names -> `UnitNameNPC` (a checkbox on 1.14.2, Forever's is a 5-way dropdown); Critters and
  Companions `UnitNameNonCombatCreatureName`; Friendly Players `UnitNameFriendlyPlayerName` > Minions; Enemy Players > Minions.
  + Guild Names `UnitNamePlayerGuild`; + Titles `UnitNamePlayerPVPTitle`. Dropped: My Secondary Name.
- Nameplates: Always Show Nameplates `nameplateShowAll`; Enemy Unit Nameplate `nameplateShowEnemies` > Minions, Minor; Friendly Player
  Nameplates `nameplateShowFriends` > Minions; Stack Nameplates -> `nameplateMotion` 0 overlapping / 1 stacking (a check here; Forever's
  enemy/friendly multi-select has no 1.14.2 equivalent, P:1299-1350). + Nameplate Distance `nameplateMaxDistance` 20-41 (X:2196-2230).
- Dropped: Only Show Names, Use Class Color for Names, Friendly NPC Nameplates, Show Offscreen Nameplates, the preview, Size,
  Buff/Debuff Scale, Style, Nameplate Information, Cast Bar Information, Aggro Display, the three Buffs/Debuffs pickers, Debuff Padding,
  Simplify Nameplates, Nameplate Class Color.

**Accessibility**: Subtitles: Display > Cinematic Subtitles `movieSubtitle` (X:2717); Subtitles Background and Background Opacity
dropped. General: Show Move Pad `enableMovePad` + Blizzard_MovePad (X:2689-2715); dropped Photosensitivity, Minimum Character Name
Size, Motion Sickness, Camera Shake, Cursor Size, Show Target Tooltip, Interact Key Icons and the five mirrored Combat rows. Colors:
Enable UI Colorblind Mode `colorblindMode`; Colorblind Filter `colorblindSimulator` 0-3 > Adjust Strength `colorblindWeaknessFactor`
0.05-1 (enabled while the filter is not None, P:1783-1868; X:2926-2960); the Item Quality swatches dropped.

**Graphics** (VD; VX; VL). Every row waits for Apply (1.14.2 commits on Apply, VL:283-300).
- Monitor `Display_PrimaryMonitorDropDown` `gxMonitor` (index-1) [window]; Display Mode `Display_DisplayModeDropDown` `gxMaximize`
  1 Fullscreen (Windowed) / 0 Windowed [window]; Resolution `Display_ResolutionDropDown` SetScreenResolution [window] > Render Scale
  `RenderScale` (GetMin/MaxRenderScale, VX:248-310); Use UI Scale `useUiScale` + `uiscale` 0.65-1.15 (VX:1171-1260; step 0.01 as
  Forever, 1.14.2 uses 0.05); Vertical Sync `vsync` [window]; Anti-Aliasing `Display_AntiAliasingDropDown` (combined list, sets
  `ffxAntiAliasingMode` + `MSAAQuality`) > Image-Based Techniques `ffxAntiAliasingMode` > Multisample Techniques `MSAAQuality` >
  Multisample Alpha-Test `msaaAlphaTest` (VD:260-356, 836-872, 1038).
- Graphics Quality, tab Base: Base Game Quality `graphicsQuality` 1-10 (VD:6-112; moving it resets the rows below via
  `GetGraphicsDropdownIndexByMasterIndex`, VL:686-730); Shadow Quality, Legacy Liquid Detail, Particle Density, SSAO, Texture
  Resolution, Projected Textures, Environment Detail (slider 1-10), Ground Clutter (slider 1-10) -> `graphics*` CVars, value = the
  1-based dropdown index (VL:393-398); + Sunshafts `graphicsSunshafts`. Tab Raid: Raid Graphics Quality = check `RAIDsettingsEnabled`
  (+ AutoChooseCurrentGraphicsSetting, VL:603-615) + slider `RAIDgraphicsQuality`, then the same nine rows on `raidGraphics*`.
  Dropped: PBR Liquid Detail, Bloom Intensity, Depth Effects, Compute Effects, Spell Density, Secondary Lighting, View Distance.
- Advanced: Triple Buffering `gxMaxFrameLatency` 3/2 [gx] (VD:770); Texture Filtering `textureFilteringMode` 0-5; Ray Traced Shadows
  `shadowrt` 0/1/3 (validity per device, VD:904); Resample Quality `resampleQuality` 0-3; Graphics API `gxapi` GetGraphicsAPIs() [gx];
  Graphics Card `gxAdapter` [gx]; Max Foreground / Background FPS `maxfps` / `maxfpsbk` 8-200, check off = 0 (VX:1262-1397); Contrast,
  Brightness 0-100; Gamma 0.3-2.8 (VX:1398-1530).
- Dropped: Notch Mode, Low Latency Mode, Character Models, Camera FOV, VRS Mode, Physics Interactions, Target FPS, Resample Sharpness,
  the Compatibility Settings section.

**Audio** (AX:73-700, AL; voice AX:700-940, AL:200-560)
- Enable Sound `Sound_EnableAllSound`; Output Device `Sound_OutputDriverIndex` [sound]; Master Volume `Sound_MasterVolume` > Music,
  Effects, Ambience, Dialog volumes (`Sound_MusicVolume`, `Sound_SFXVolume`, `Sound_AmbienceVolume`, `Sound_DialogVolume`; 0-1, step
  0.05 as Forever); Music `Sound_EnableMusic` > Loop Music `Sound_ZoneMusicNoDelay`; Sound Effects `Sound_EnableSFX` > Enable Pet
  Sounds, Emote Sounds; Dialog `Sound_EnableDialog` > Error Speech; Ambient Sounds `Sound_EnableAmbience`; Sound in Background
  `Sound_EnableSoundWhenGameIsInBG`; Audio Channels -> `Sound_NumChannels` **dropdown 24/48/64** (1.14.2's only values, Forever has a
  20-128 slider) [sound]; Audio Cache Size `Sound_MaxCacheSizeInBytes` Small 16MB / Large 64MB (Forever 64/128) [sound].
- Voice Chat (only while `C_VoiceChat` reaches the voice service): Output Device, > Voice Chat Volume (SetOutputVolume 0-100), > Voice
  Chat Ducking (SetMasterVolumeScale, inverted 0-1), Microphone Device, > Microphone Volume, > Microphone Sensitivity, > Test
  Microphone, Voice Chat Mode (Push to Talk / Open Mic), > Push to Talk Key (the audio panel's own custom binding, AL:359-370).
- Dropped: Pet Battle Music, Gameplay Sound Effects, Enable Reverb and Distance Filtering (commented out in AX:235-264), the Ping
  System and Boss Warnings sections.

**Languages and Social**: Languages > Text `textLocale` (GetAvailableLocales), Audio `audioLocale` (GetAvailableAudioLocales, follows
Text unless set to enUS) [client restart, VL:1042-1050]. The Social section (Preferred Online Language) is dropped; the category name
stays Forever's. **Network**: Advanced Combat Logging `advancedCombatLogging`, Optimize Network for Speed `disableServerNagle`, Enable
IPv6 `useIPv6` (VX:1684-1730; Apply-committed). **Keyboard Options**: Disable OS Keyboard Shortcuts `MacDisableOsShortcuts` (needs
Universal Access, else popup MAC_OPEN_UNIVERSAL_ACCESS), Command left click as right click `MacUseCommandLeftClickAsRightClick` (MK).

## 4. Extras (42) and where they went

Controls (top): Auto Dismount in Flight. Interface > Display: Show Helm, Show Cloak, Beginner Tooltips, Loading Screen Tips, Rotate
Minimap, Minimap Clock, Hide Zone Objective Tracker. Interface > Quests: Instant Quest Text, Automatic Quest Tracking. Interface > Raid
Frames: Keep Groups Together, Horizontal Groups, Sort By, Display Border, Frame Height, Frame Width. Action Bars: Stack Right Bars
Vertically, Always Show Action Bars. Combat: 12 combat text filters (under Scrolling Combat Text for Self), Auto Attack/Auto Shot,
Damage Numbers > Periodic Damage, Pet Damage, Healing Numbers. Social: Spam Filter, Detailed Loot Information. Nameplates > Names:
Guild Names, Titles; > Nameplates: Nameplate Distance. Graphics > Graphics Quality: Sunshafts (Base and Raid tabs).
**One deviation from "extras at the end of their section"**: the combat text filters sit right under Combat Text Float Mode, as
children of Scrolling Combat Text for Self, because 1.14.2 enables them only while it is on (X:426 etc.); at the end of Combat they would
grey out far from their switch.
Not carried over (1.14.2 panel entries with no Forever home or no longer useful): `enableTwitter` (Twitter), the Stereo 3D rows (hidden
in 1.14.2 itself, VL:968-974), raid profile management and auto-activation (their own UI).

## 5. Reload / restart, character vs account

- Graphics rows are Apply-committed; `restart = "window"` rows call `UpdateWindow()`, `"gx"` rows `RestartGx()` on Apply (VL:262-300);
  Ray Traced Shadows is re-validated after a GX restart. No row needs a /reload.
- Output Device, Audio Channels, Audio Cache Size restart the sound system (AL `self.restart = true` in the three dropdowns' OnLoad, AF:27-30). Text / Audio language need a client
  restart (1.14.2 shows its "restart needed" banner).
- Character side (from the code): Show Helm / Show Cloak and Block Guild Invites are player flags (PLAYER_FLAGS_CHANGED); the
  modified-click keys (Loot, Pick Up, Self Cast, Focus Cast) are saved with `SaveBindings(GetCurrentBindingSet())`, so they follow the
  current binding set (account or character). Everything else is a CVar or a raid profile; the code does not say which CVars are per
  character.

## 6. Open questions (for the user)

1. Self Highlight: `findYourselfMode` sits in 1.14.2's DisplayPanelOptions (P:555) but its dropdown is commented out (P:597-655), so
   dropped; the addon could probe `GetCVar("findYourselfMode")` at run time and add Forever's row back (Circle 0 / Outline 2 / Circle and
   Outline 1 / Off -1).
2. CVars 1.14.2 reads but shows in no panel: `ActionButtonUseKeyDown` (cast on key down, 804076:95), `UberTooltips` (804706:390),
   `xpBarText` (always show XP text, 804658:247), `scriptErrors` (1622887). Add them as extras?
3. Raid Frames: needs `Blizzard_CUFProfiles` loaded and a raid profile; rows edit the active profile only. Are the raid frames even used
   on the user's setup (they replace party/raid frames only when enabled)?
4. Voice Chat: the local CMaNGOS server has no Blizzard voice service, so the section will likely never show. Keep or drop?
5. Labels kept as Forever wrote them although 1.14.2 differs: "Legacy Liquid Detail" (1.14.2 has only one liquid setting), "NPC Names"
   and "Stack Nameplates" as checkboxes, "Audio Channels" as a dropdown, cache sizes 16/64MB, Focus Cast Key default None.
6. Raid tab slider label "Raid Graphics Quality" is from Forever's code (`SETTINGS_RAID_GRAPHICS_QUALITY`), not seen in a shot. The
   Nameplates page below Debuff Padding and the Advanced Options page below Diminishing Returns were not in the shots (code only; all
   dropped anyway).
7. Keybindings in the list opens ForeverUI's key bindings window (no rows); confirm, or drop it from the list.
