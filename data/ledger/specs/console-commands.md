# Console commands and CVars of the 1.14.2 client (the /console tab)

Research of 2026-10-02 (read-only; nothing in the addon or the client changed). The user's plan: one window with three tabs on the
right, merging /fui and /gm and adding a **/console** tab "to add all the console commands ... organized and sorted into categories
like the other ones", the commands in three buckets from the most common to the least. This page is the client side: the CVars that
`/console <name> <value>` sets and the few real console commands. The server's GM commands and server weather are another agent's
page.

## Sources

- **The client binary** (`(a file on the server's Mac) of Warcraft Classic.app/Contents/MacOS/`, build 1.14.2.42597):
  `strings` gives each CVar's name next to its one-line help, grouped the way the engine registers them (game/UI, sound, nameplates,
  camera, graphics, console). The help lines are Blizzard's text: kept privately in
  `(private files)`; the descriptions below are ours.
- **The interface code** (`(private files)`, files by id): 270 CVar names read or set by the UI (most are
  retail leftovers); the Video panel (948936: the presets), the Interface panels (4216416: the sliders' ranges), the console API
  (1861172: `C_Console`).
- **The client's settings**: `WTF/Config.wtf` (machine-wide; 90 lines) and `WTF/Account/NEPO/config-cache.wtf` (account-wide; 32
  lines). Read only.
- **Forever UI's Options** (`addons/ForeverUI/OptionsData.lua`): 164 CVars already have a row there (listed at the end).

## How CVars work in 1.14.2 (what the tab must know)

- **Setting one.** `/console name value` in chat, `SetCVar("name", value)` from an addon (out of combat for the protected ones), or
  `ConsoleExec("name value")`. A value outside its range is refused with a message.
- **Reading one.** `GetCVar(name)`, `GetCVarBool(name)`, `C_CVar.GetCVarDefault(name)` (the coded default) and `GetCVarInfo(name)`
  (value, default, and whether it is saved per account or per character). So the tab never needs our own table of defaults: it asks.
- **The whole list, live.** `C_Console.GetAllCommands()` returns every command and CVar with its help line and the client's own
  category (Debug, Graphics, Console, Combat, Game, Default, Net, Sound). Blizzard's dev console uses it for auto-complete. Bucket
  3 can be built from it at runtime instead of from a list we keep.
- **The event.** `CVAR_UPDATE` fires when one changes, so the tab can follow changes made elsewhere (the Video panel, chat).
- **When it applies.** Most apply at once. The `gx*` display CVars wait for `gxRestart` (a console command; the screen blinks). A few
  need the client restarted (`textLocale`, `audioLocale`, `processAffinityMask`, `sortDiskReads`).
- **Presets overwrite.** Each graphics slider of the Video panel is a preset that writes several raw CVars (below). Moving the
  slider again overwrites a hand-set raw value; for example Particle Density rewrites `weatherDensity`. The tab should say so next
  to every raw graphics CVar.
- **Where it is saved.** Machine-wide in `Config.wtf`, account-wide in the account's `config-cache.wtf` (both written by the client
  on logout). `test_` CVars (ActionCam's) aren't saved and ask for an "experimental feature" consent the first time.

## The presets and the raw CVars they write

Read from the binary (the order it registers them). Each `graphicsX` has a `raidGraphicsX` twin writing the `RAID` variants.

| Video panel slider | Raw CVars it writes |
| --- | --- |
| Texture Resolution (`graphicsTextureResolution`) | `terrainMipLevel`, `componentTextureLevel`, `worldBaseMip` |
| Spell Density (`graphicsSpellDensity`) | `spellClutter` |
| Projected Textures (`graphicsProjectedTextures`) | `projectedTextures` |
| View Distance (`graphicsViewDistance`; no slider in Classic's panel, set by Overall Quality) | `farClip`, `horizonClip`, `horizonStart`, `wmoLodDist`, `terrainLodDist`, `terrainLodDiv`, `entityLodDist`, `entityShadowFadeScale` |
| Ground Clutter (`graphicsGroundClutter`) | `groundEffectDist`, `groundEffectDensity`, `groundEffectAnimation` |
| Environment Detail (`graphicsEnvironmentDetail`) | `lodObjectFadeScale`, `lodObjectCullSize`, `lodObjectCullDist`, `lodObjectMinSize`, `doodadLodScale` |
| Shadow Quality (`graphicsShadowQuality`) | `shadowMode`, `shadowTextureSize`, `shadowSoft` |
| Liquid Detail (`graphicsLiquidDetail`) | `waterDetail`, `reflectionMode`, `rippleDetail` |
| Particle Density (`graphicsParticleDensity`) | `particleDensity`, `particleMTDensity`, **`weatherDensity`** |
| SSAO (`graphicsSSAO`) | `ssao` |
| Sunshafts (`graphicsSunshafts`) | `sunshafts` |

## The inventory, in three buckets

The client registers about 900 names; most are internal (saved tutorial flags, tracked quests), retail leftovers with nothing to
act on in vanilla (world quests, transmog, garrisons, pet battles, arenas, Twitter, LFG), or developer tools. Those are left out of
the curated lists; `C_Console.GetAllCommands()` can still show them under an "All" search in bucket 3.

Columns: **Values** gives the range and the default where known ("preset" = written by a Video panel preset; "?" = to read from
`C_CVar.GetCVarDefault` in game). **Applies**: now, gxRestart, restart. Sorting principle inside each bucket: by category in the
tab's order (Camera, Graphics and weather, Nameplates, Combat text, Combat and targeting, Interface, Chat, Sound, Controls,
Screenshots and system, Debug), then by how often it's changed.

### Bucket 1: common (players change these often)

Things a player reaches for in the first week: how far the camera and the world go, how combat feels, what the screen shows.

| CVar or command | What it does | Values (default) | Applies | Category | Why common |
| --- | --- | --- | --- | --- | --- |
| `cameraDistanceMaxZoomFactor` (past the slider) | How far the camera can pull back. Options' slider stops at 2; the console accepts more | 1 to 3.4? (Options has 1-2) | now | Camera | The most shared console line in Classic |
| `farclip` | View distance: how far the world is drawn before the fog | ~185 to 2600? (preset) | now | Graphics and weather | Beauty or speed, the first trade-off people tune |
| `weatherDensity` | How much rain, snow or sand falls when the server says it's raining (0 = none at all) | 0-3 (preset) | now | Graphics and weather | The weather question; also a speed fix in storms |
| `ffxGlow` | The soft full-screen glow over bright areas (the dreamy vanilla look); 0 for a crisp picture | 0/1 (1) | now | Graphics and weather | A matter of taste many players change |
| `groundEffectDensity` | How thick the grass and flowers are | 16-256 (preset; yours 256) | now | Graphics and weather | Visible everywhere; costly on old machines |
| `groundEffectDist` | How far away grass is drawn | 70-? (preset; yours 320) | now | Graphics and weather | Pairs with density |
| `nameplateGlobalScale` | Size of every nameplate but yours | 0.5-2? (1) | now, out of combat | Nameplates | Plates too small or too big |
| `NamePlateHorizontalScale` / `NamePlateVerticalScale` | Width / height of the plates | (1) / (1) | now, out of combat | Nameplates | Wider bars are a common ask |
| `ShowClassColorInNameplate` | Enemy players' plates in class colors | 0/1 (1?) | now | Nameplates | PvP and duels |
| `ShowClassColorInFriendlyNameplate` | Friendly players' plates in class colors | 0/1 (?) | now | Nameplates | Groups |
| `nameplateOverlapV` | Vertical spacing when plates stack (lower = tighter) | 0.5-1.5? (1.1?) | now | Nameplates | Stacked plates in a crowd |
| `WorldTextScale` | Size of the damage numbers over targets | 0.5-2.5? (1) | now | Combat text | "Bigger numbers" |
| `SpellQueueWindow` | How early the next spell can be pressed during a cast or the global cooldown, in ms | 0-400 (400) | now | Combat and targeting | Lower = tighter feel on a fast connection; ours is local |
| `autoLootRate` | How fast auto loot takes each item, in ms | 0-? (150?) | now | Interface | "Fast loot" |
| `alwaysCompareItems` | Show the comparison tooltip without holding Shift | 0/1 (0) | now | Interface | Gear decisions all the time |
| `showTargetCastbar` | The target's cast bar under its frame | 0/1 (?) | now | Interface | Interrupts |
| `chatClassColorOverride` | Class-colored names in chat: 0 always, 1 never, 2 each channel's own setting | 0-2 (2?; yours 0) | now | Chat | Already set by Forever UI's code, not in Options |
| `screenshotFormat` | jpeg, png or tga | (jpeg) | now | Screenshots and system | We take screenshots for every doc |
| `screenshotQuality` | jpeg quality | 1-10 (3?) | now | Screenshots and system | Ditto |
| `reloadUI` (command) | Reloads the interface | - | now | Screenshots and system | Same as /reload; in the tab for completeness |

20 entries.

### Bucket 2: occasional (changed once, for a reason)

| CVar or command | What it does | Values (default) | Applies | Category | Why occasional |
| --- | --- | --- | --- | --- | --- |
| `ActionCam` (command: `basic`, `full`, `off`, `default`, `focusEnemy`, `focusInteract`, `focusAll`, `focusOff`, `headMove`, `lowHeadMove`, `noHeadMove`, `heavyHeadMove`) | The experimental action camera: the camera leads, follows the target, bobs with the head | - (off) | now; asks consent once; not saved | Camera | A look some try once (our controller work may want `basic`) |
| `cameraZoomSpeed` | How fast the wheel zooms | 1-50 (20) | now | Camera | Tuning |
| `cameraPitchMoveSpeed` | Mouse-look speed up and down (Options has left-right) | 90-270? (90?) | now | Camera | Tuning |
| `mouseInvertYaw` | Inverted left-right mouse look | 0/1 (0) | now | Camera | Rare taste |
| `horizonStart` | Where the distant fog starts | (preset) | now | Graphics and weather | Fog look |
| `volumeFog` / `volumeFogLevel` | Volumetric fog in the air (light through haze) and its quality | 0/1; 0-3 | now | Graphics and weather | Atmosphere |
| `particulatesEnabled` | Floating motes in the air (dust, pollen, embers, underwater specks) | 0/1 | now | Graphics and weather | Atmosphere |
| `SkyCloudLOD` | Resolution of the cloud textures | 0-3? | now | Graphics and weather | Sharper sky |
| `particleDensity` | How many particles spells and the world show | 10-100 (preset; yours 100) | now | Graphics and weather | Speed in crowds |
| `groundEffectAnimation` | Grass sways in the wind | 0/1 (preset) | now | Graphics and weather | Small taste/speed |
| `ffxDeath` | The grey, desaturated screen when you're dead | 0/1 (1) | now | Graphics and weather | Some find it bleak |
| `violenceLevel` | Blood amount on hits | 0-5 (2?) | now | Graphics and weather | Taste |
| `targetFPS` / `DynamicRenderScale` / `DynamicRenderScaleMin` | Lower the render scale when the frame rate drops under a target (beta in this client) | fps; 0/1 (0); 0.33-1 | now | Graphics and weather | Laptops |
| `ResampleSharpness` | Sharpening when the render scale is under 100% (FSR) | -1 to 2 | now | Graphics and weather | Pairs with RenderScale (in Options) |
| `nameplateOverlapH` | Horizontal spacing of stacked plates | (0.8?) | now | Nameplates | Crowds |
| `nameplateNotSelectedAlpha` | How faded the other plates are while you have a target | 0-1 (0.5?) | now | Nameplates | Focus |
| `nameplateSelectedScale` | Size of the target's plate | (1) | now | Nameplates | Focus |
| `nameplateMinAlpha` / `nameplateMaxAlpha` | Fading of far plates | 0-1 | now | Nameplates | Focus |
| `nameplateOtherTopInset` / `nameplateOtherBottomInset` | Keep plates on screen near its edges (-1 = let them leave) | (0.08 / 0.1?) | now | Nameplates | Large mobs |
| `nameplateShowOnlyNames` | Names without bars | 0/1 (0) | now | Nameplates | Friendly plates as names only |
| `floatingCombatTextCombatDamageDirectionalScale` | Damage numbers fly away from the hit (0 = straight up, the vanilla look) | 0-? (1?) | now | Combat text | Look |
| `floatingCombatTextCombatDamageAllAutos` | Show every auto-attack number | 0/1 (1?) | now | Combat text | Clutter |
| `TargetNearestUseNew` | Tab-targeting: 1 the newer on-screen logic, 0 the old nearest | 0/1 (1) | now | Combat and targeting | Old-school feel |
| `TargetPriorityAllowAnyOnScreen` | Tab may pick any visible target when no ideal one (2: out of range too) | 0-2 | now | Combat and targeting | Tab behavior |
| `stopAutoAttackOnTargetChange` | Stop attacking when you change target | 0/1 (0) | now | Combat and targeting | Rogues, CC |
| `assistAttack` | Start attacking after /assist | 0/1 | now | Combat and targeting | Groups |
| `autoUnshift` / `autoStand` / `autoDismount` | Leave a form, stand up or dismount by itself when a spell needs it | 0/1 (1) | now | Combat and targeting | Druids |
| `secureAbilityToggle` | Guard against double-clicking a toggled aura off | 0/1 | now | Combat and targeting | Hunters' aspects |
| `emphasizeMySpellEffects` | Others' spell impacts toned down | 0/1 | now | Combat and targeting | Raids |
| `breakUpLargeNumbers` | Commas in large numbers | 0/1 (1) | now | Interface | Taste |
| `buffDurations` | Time left under buffs | 0/1 (1) | now | Interface | Taste |
| `displayFreeBagSlots` | Free slots on the backpack button | 0/1 (1) | now | Interface | Taste (Forever UI's bags may cover it) |
| `findYourselfMode` + `findYourselfAnywhere` | Highlight your character (circle, outline or both) | 0-2; 0/1 | now | Interface | Accessibility in crowds |
| `showVKeyCastbar` | The enemy's cast bar on its nameplate | 0/1 | now | Interface | PvP |
| `mapFade` | The world map fades while you move | 0/1 (1) | now | Interface | Taste |
| `scriptErrors` | Show Lua errors in a window | 0/1 (0) | now | Interface | Addon users; useful to us |
| `cursorSizePreferred` | Cursor size (-1 auto, 0 = 32 px to 4 = 128 px) | -1 to 4 (-1) | now | Interface | Accessibility, big screens |
| `colorChatNamesByClass` | Older switch for class-colored names in chat | 0/1 | now | Chat | Superseded by `chatClassColorOverride` |
| `Sound_ListenerAtCharacter` | Hear from the character, not the camera | 0/1 (1?) | now | Sound | Taste |
| `Sound_EnableReverb` | Reverb in caves and halls | 0/1 | now | Sound | Taste |
| `Sound_EnablePositionalLowPassFilter` | Sounds behind or far away get duller | 0/1 | now | Sound | Taste |
| `Sound_EnableArmorFoleySoundForSelf` / `...ForOthers` | Armor rustle when moving | 0/1 | now | Sound | Taste |
| `FootstepSounds` | Footsteps | 0/1 (1) | now | Sound | Taste |
| `GamePadVibrationStrength` | Controller rumble strength | 0-1 | now | Controls | The DualSense |
| `GamePadFactionColor` | Controller light bar in the faction's color | 0/1 | now | Controls | The DualSense |
| `GamePadAnalogMovement` | Move in any direction, not just eight | 0/1 | now | Controls | Controller feel |
| `GamePadTurnWithCamera` | Character turns with the camera (1 in combat, 2 always) | 0-2 | now | Controls | Controller feel |
| `GamePadCursorAutoEnable` | The pad's cursor turns on when a window needs it | 0/1 | now | Controls | Controller feel |
| `GamePadTouchCursorEnable` | The touch pad moves the cursor | 0/1 | now | Controls | The DualSense |
| `EnableBlinkApplicationIcon` | Bounce the Dock icon on a whisper or ready check | 0/1 (1) | now | Screenshots and system | Taste |
| `PreventOsIdleSleep` | Keep the Mac awake while the game runs | 0/1 (0) | now | Screenshots and system | Long sessions |
| `screenshotSizeOverride` | Screenshots at a fixed size (e.g. 7680x4320); 0x0 = window | WxH (0x0) | now | Screenshots and system | Docs and wallpapers |

52 entries.

### Bucket 3: rare, expert or debug

Grouped, one line each; the tab can list them with a search box and the client's own help line (from `C_Console.GetAllCommands`).

| Group | Names | What they're for |
| --- | --- | --- |
| Console commands | `help`, `cvarlist`, `cvar_reset`, `cvar_default`, `set`, `repeat`, `fontsize`, `fontcolor`, `clear`, `closeconsole`, `quit`, `enable` | The dev console's own tools (`/console enable` opens it like the `-console` flag); reset one CVar to its startup or coded default |
| Display (wait for `gxRestart`) | `gxRestart` (command), `gxWindowedResolution`, `gxFullscreenResolution`, `gxAspect`, `windowResizeLock`, `ExclusiveWindowMode`, `ForceResolutionDefaultToMaxSize`, `hwDetect` | Window and resolution by hand; `hwDetect 1` redoes the hardware detection on the next start |
| Graphics, expert | `shadowTextureSize`, `shadowSoft`, `specular`, `maxLightCount`, `maxLightDist`, `nearclip`, `horizonClip`, `lodObjectCullSize`, `lodObjectCullDist`, `lodObjectMinSize`, `lodObjectFadeScale`, `doodadLodScale`, `entityLodDist`, `terrainLodDist`, `wmoLodDist`, `componentTextureLevel`, `worldBaseMip`, `terrainMipLevel`, `particleMTDensity`, `projectedTextures`, `waterDetail`, `rippleDetail`, `reflectionMode`, `volumeFogInterior`, `dynamicLod`, `spellClutter`, `unitClutter`, `EmitterCombatRange`, `ffxNether`, the `RAID...` twins, the `assao...` / `ssao...` tuning | What each preset writes, one by one; the raid profile; ambient occlusion internals |
| Performance | `perf` and `GxFrameStats` (commands), `maxFPSLoading`, `preloadStreamingDist...`, `worldPreload...`, `processAffinityMask` (restart), `sortDiskReads` (restart) | Frame timing and loading |
| Camera, expert | `cameraDive`, `cameraSurfacePitch`, `cameraSubmergePitch`, `cameraHeightIgnoreStandState`, `pitchLimit`, `cameraZDamp`, the `...SmoothSpeed` set, the `test_camera...` set (ActionCam's parts) | Swimming and smoothing details |
| Nameplates, expert | `nameplateMinScale`, `nameplateMaxScale`, `nameplateLargerScale`, the `...ScaleDistance` / `...AlphaDistance` set, `nameplateMotionSpeed`, `nameplateTargetBehindMaxDistance`, `clampTargetNameplateToScreen`, `nameplateOccludedAlphaMult`, the personal-nameplate set (`NameplatePersonal...`, `nameplateSelf...`) | Fine shaping |
| Targeting, expert | the `TargetPriority...` set (hold delay, combat lock, PvP priority, frustum edges) | Tab-target internals |
| Sound, expert | `Sound_OutputSampleRate`, `Sound_DSPBufferSize`, `Sound_MaxCacheableSizeInBytes`, `Sound_AlternateListener`, the `...HighpassDSPCutoff` set, the voice-chat set (`Voice...`, `ChatSoundVolume`, `ChatMusicVolume`, `ChatAmbienceVolume`) | Audio internals; voice chat isn't used on our server |
| Controls, expert | `CursorFreelookStartDelta`, `CursorFreelookCentering`, `CursorStickyCentering`, `enableWowMouse`, `ConsoleKey`, the rest of `GamePad...` (cursor speeds, touch taps, face-movement angles, `GamePadListDevices` command) | Covered by the controller pages |
| Network | `movementMaxEventLateTime` / `...EarlyTime`, `disableAutoRealmSelect`, `initialRealmListTimeout` | Movement smoothing, login |
| Debug | `taintLog` (0-2), `scriptProfile`, `scriptWarnings`, `debugGameEvents`, `fullDump`, `ErrorLevelMin` / `ErrorLevelMax` / `ErrorFilter`, `fstack_showhidden` / `_showregions` / `_showanchors`, `DebugTorsoTwist`, `combatLogUniqueFilename`, `combatLogRetentionTime`, `advancedCombatLogging` | Addon and client debugging (`taintLog` writes `Logs/taint.log`) |
| Internal, never set by hand | `flaggedTutorials`, `trackedQuests`, `minimapTrackedInfov2`, `lastCharacterIndex`, `accountList`, `engineSurvey`, `videoOptionsVersion`, `Kiosk...` | Saved state; the tab shows them read-only or not at all |

About 150 names in 12 groups.

### Already in Options (left out of the buckets)

164 CVars have a row in Forever UI's Options; the tab links to the row instead of repeating it (see
`docs/specs/options-window.md`). By page: graphics presets and display (`graphicsQuality`, every `graphicsX` and `raidGraphicsX`,
`RAIDsettingsEnabled`, `RAIDgraphicsQuality`, `gxApi`, `gxAdapter`, `gxMonitor`, `gxMaximize`, `gxMaxFrameLatency`, `vsync`,
`maxfps`, `maxfpsbk`, `RenderScale`, `resampleQuality`, `MSAAQuality`, `msaaAlphaTest`, `ffxAntiAliasingMode`, `textureFilteringMode`,
`shadowrt`, `Gamma`, `Brightness`, `Contrast`, `uiscale`, `useUiScale`); sound (`Sound_MasterVolume`, `Sound_SFXVolume`,
`Sound_MusicVolume`, `Sound_AmbienceVolume`, `Sound_DialogVolume`, every `Sound_Enable...` but reverb/low-pass/armor,
`Sound_ZoneMusicNoDelay`, `Sound_NumChannels`, `Sound_MaxCacheSizeInBytes`, `Sound_OutputDriverIndex`); camera and mouse
(`cameraDistanceMaxZoomFactor` to 2, `cameraYawMoveSpeed`, `cameraYawSmoothSpeed`, `cameraSmoothStyle`, `cameraSmoothTrackingStyle`,
`cameraTerrainTilt`, `cameraBobbing`, `cameraPivot`, `cameraWaterCollision`, `mouseSpeed`, `enableMouseSpeed`, `mouseInvertPitch`,
`ClipCursor`, `autointeract`, the Mac keys); nameplates and names (`nameplateShowEnemies`, `nameplateShowFriends`, the minion/minus
switches, `nameplateShowAll`, `nameplateMaxDistance`, `nameplateMotion`, the `UnitName...` set); combat text (`enableFloatingCombatText`,
`floatingCombatTextFloatMode` and 17 `floatingCombatText...` switches); gameplay and interface (`deselectOnClick`, `autoClearAFK`,
`interactOnLeftClick`, `lootUnderMouse`, `autoLootDefault`, `autoDismountFlying`, `autoRangedCombat`, `showTargetOfTarget`,
`doNotFlashLowHealthWarning`, `ActionButtonUseKeyDown`, `lockActionBars`, `alwaysShowActionBars`, `multiBarRightVerticalLayout`,
`countdownForCooldowns`, `statusTextDisplay`, `xpBarText`, `UberTooltips`, `showNewbieTips`, `showTutorials`, `showLoadingScreenTips`,
`rotateMinimap`, `showMinimapClock`, `autoQuestWatch`, `instantQuestText`, `hideOutdoorWorldState`, `movieSubtitle`, `enableMovePad`,
the colorblind three); chat and social (`chatStyle`, `whisperMode`, `showTimestamps`, `chatBubbles`, `chatBubblesParty`,
`profanityFilter`, `spamFilter`, `showLootSpam`, `blockTrades`, `blockChannelInvites`, `guildMemberNotify`, the `showToast...` set);
controller (`GamePadEnable`, `GamePadCameraYawSpeed`, `GamePadCameraPitchSpeed`); network and language (`useIPv6`,
`disableServerNagle`, `advancedCombatLogging`, `textLocale`, `audioLocale`). Forever UI's code also sets `chatClassColorOverride` and
`statusText` without an Options row (bucket 1 lists the first).

## Weather on the client

**Who decides the weather.** The server. CMaNGOS rolls each zone's weather and sends the client a type (rain, snow, sand/dust)
and an intensity; the client logs it ("Weather changed to ..., intensity ...") and draws it. Storms come with lightning, which
the client starts and ends with the weather. The 1.14.2 client has **no Lua call to read or set the weather** (no GetWeather or
similar) and **no CVar or command that makes it rain or snow**. Starting, stopping or forcing weather is the server's side (the
other agent's page).

**What the client can change: how weather and the sky look.**

| CVar | What it looks like | Values |
| --- | --- | --- |
| `weatherDensity` | The amount of falling rain, snow or blowing sand. 0 hides precipitation completely (the sky still darkens and the storm sounds still play); 3 is the heaviest sheets of rain and thick snow. `RAIDweatherDensity` for the raid profile | 0-3; written by the Particle Density preset |
| `farclip` | How far the land is drawn before the distance fog swallows it: low feels close and misty, high shows mountains far off | preset |
| `horizonStart` / `horizonClip` | Where the far fog starts and ends | preset |
| `volumeFog`, `volumeFogLevel`, `volumeFogInterior` | Fog with volume: light catching in haze, mist hanging in valleys and caves | 0/1, 0-3, 0/1 |
| `particulatesEnabled` | Small motes drifting in the air: dust in deserts, pollen in forests, embers near lava, specks underwater | 0/1 |
| `sunshafts` (preset `graphicsSunshafts`) | Rays of sunlight through trees and clouds | 0-2 (in Options) |
| `SkyCloudLOD` | Sharper or blurrier clouds | 0-3? |
| `ffxGlow` | A soft bloom over bright areas, the hazy vanilla glow; off is crisp and colder | 0/1 |
| `groundEffectAnimation` | Grass and flowers sway as if in wind | 0/1 |
| `waterDetail`, `rippleDetail`, `reflectionMode` | Water surface quality, ripples, what the water reflects (sky only up to sky, land and buildings) | presets |
| `particleDensity` | Spell and world particles (falling leaves, sparks, smoke) | 10-100 |
| `Sound_EnableAmbience`, `Sound_AmbienceVolume` | Rain and wind sounds belong to the ambience channel | in Options |

Time of day: the client takes the time from the server; there's no client CVar to fix the hour (the binary only knows per-map
overrides set by the game's data). Wind on particles is set inside the game's data per effect, not by a CVar.

**Suggested for the tab:** a "Weather and sky" group at the top of bucket 1's Graphics: `weatherDensity` as a 4-step slider
(None, Light, Medium, Heavy) with a note that the Particle Density preset rewrites it, `farclip`, `ffxGlow`; then bucket 2's fog,
motes and clouds. A line under it pointing to the GM tab for the server's weather (make it rain), so the two halves meet.

## Suggested tab layout

- Three sub-tabs or sections: **Common**, **Occasional**, **Expert**. Inside each, the categories in one fixed order (Camera, Graphics
  and weather, Nameplates, Combat text, Combat and targeting, Interface, Chat, Sound, Controls, Screenshots and system, Debug), the
  same order in every bucket, so a category is always found in the same place.
- Each row: our name in plain words, the CVar's name small under it, the control (checkbox, slider with its range, or a
  dropdown for the named values), and the default from `C_CVar.GetCVarDefault` with a reset button. A tag when it needs `gxRestart`
  or a restart, or is written by a preset.
- Expert: a search over `C_Console.GetAllCommands()` (name and help line), the client's own categories as filters.
- Rows already in Options: not repeated; a link "In Options: Graphics" instead.
- Protected in combat: rows that can't change in combat greyed with a reason (the house rule: never break the game in combat).

## Open questions

1. **Ranges and defaults marked "?".** Read in game with `GetCVarInfo` / `C_CVar.GetCVarDefault` (a one-off probe, the kind
   ForeverUI's tests already do; chat lines max 255 characters). The camera's console ceiling (3.4 is widely quoted for Classic)
   and `farclip`'s range above all.
2. **Which CVars refuse to change in combat** in 1.14.2 (nameplate ones are protected in later clients). The probe can try them
   and record which fail.
3. **`weatherDensity` 0 and the sound**: whether the rain sound stops with it. One test in a storm (server weather forced by the GM
   side).
4. **Bucket placement**: the user's call. Candidates to move up: `ActionCam`, `scriptErrors`, `cameraZoomSpeed`. Candidates to
   move down: `chatClassColorOverride` (Forever UI already sets it), `reloadUI`.
5. **Labels**: our plain names for each row follow docs/copywriting/style-guide.md; Blizzard's own labels exist for the ones the
   old Interface panels showed and can be used through `ns.L`.
6. **The "All" list**: show the retail leftovers (world quests, transmog, pet battles) or hide them? They do nothing in vanilla.
