# Controller (gamepad) support: research for a ForeverUI beta

Status: research only, 2026-09-30. Nothing built. Question from the user: study ConsolePort and WoW Forever's controller
support, and say how ForeverUI (1.14.2 client, TOC 11402, Mac arm64) could offer controller play as a **beta** feature.

Abbreviations: **142** = `(private files)`; **FV** =
`(private files)`; **CP** = github.com/seblindfors/ConsolePort.

## 1. ConsolePort

**What it is.** A suite of addons by Sebastian Lindfors (MunkDev) for playing WoW with a controller. It handles
interface navigation, action bars built for a pad, and targeting (CP README, `gh api repos/seblindfors/ConsolePort/readme`).
On CurseForge: 3.2.7 (2026-09-25), about 4.1M downloads, for Retail, Classic, TBC, MoP and "Titan Reforged Classic"
(https://www.curseforge.com/wow/addons/console-port).

**Two generations.**
- *Legacy, before Shadowlands (branch `legacy`, tags 0.9 to 1.8):* WoW could not read controllers, so an external
  mapper turned pad input into key presses and mouse moves. The mapper was WoWmapper (or WoWmapperX for ConsolePortLK),
  and the addon interpreted those keys (https://github.com/seblindfors/ConsolePort/wiki/1.-Instructions,
  https://github.com/leoaviana/WoWmapperX).
- *Native, from 9.0.1 on (tags 2.x and 3.x):* "As of Shadowlands, ConsolePort uses native gamepad controls. No external
  software is required" (CP README). It depends entirely on the client's gamepad layer:
  - `GamePadEnable` is forced on at load (CP `ConsolePort/XML/Frames/Frames.xml:4-5`, also in tag 2.4.5).
  - Pad buttons are ordinary binding keys (`PAD1..PAD6`, `PADDUP/PADDDOWN/PADDLEFT/PADDRIGHT`, `PADLSHOULDER`,
    `PADRTRIGGER`, `PADLSTICK`, `PADFORWARD`/`PADBACK` ...). Modifier layers come from CVars that make a pad button act as
    Shift, Ctrl or Alt: `GamePadEmulateShift/Ctrl/Alt/Esc` (CP `ConsolePort/Model/Gamepad/Gamepad.lua:255-262`).
  - It reads `C_GamePad` for devices, state and configs (`GetAllDeviceIDs`, `GetDeviceRawState`, `GetConfig`,
    `SetConfig`+`ApplyConfigs`, `ButtonIndexToBinding`, `GetDeviceMappedState`) and listens to `GAME_PAD_CONFIGS_CHANGED`
    and `GAME_PAD_POWER_CHANGED` (Gamepad.lua:2-6, 136-143, 327-367, 658-659).
  - Mouse emulation: `GamePadCursorLeftClick/RightClick`, `SetGamePadCursorControl`, `SetGamePadFreeLook`,
    `IsGamePadFreelookEnabled`, `IsGamePadCursorControlEnabled` (CP `ConsolePort/Controller/Mouse.lua:76-87, 276-293`).
- **Modules (master):** `ConsolePort` (core: bindings, gamepad model, radial, slash), `ConsolePort_Bar` (action bar),
  `ConsolePort_Cursor` (interface cursor, load on demand), `ConsolePort_Rings` (radial action rings), `ConsolePort_Menu`
  (game menu), `ConsolePort_Keyboard` (on-screen keyboard, LoD), `ConsolePort_World` (quick menu, loot frame, ability
  prompts), `ConsolePort_Target`, `ConsolePort_Config` (config UI, LoD). Each module's TOC Notes line lists its role.
  - The interface cursor is not a mouse pointer. It scans frames for nodes ("Leverages ConsolePortNode for interface
    scans") and hops between them. It tracks `PLAYER_REGEN_DISABLED/ENABLED` because it can't rebind in combat
    (CP `ConsolePort_Cursor/View/Cursor.lua:7-38`). It clicks by `SetOverrideBindingClick` on the focused widget (found
    in `Controller/Hooks.lua`, `Stack.lua`, `Mods.lua`, `Nudge.lua`).
  - Third-party frames join the cursor through `ConsolePort:AddInterfaceCursorFrame(frame)` (CP `API.lua:97` @2.4.5).
- **Flavors and our client.** Master's TOCs say `## Interface: 120100, 50504, 38010, 20506, 11509`. Classic Era is only
  1.15.9, not 1.14.x (CP `ConsolePort/ConsolePort.toc`).
  - Master also calls `C_GamePad.GetPowerLevel` without a guard (Gamepad.lua:138). That function isn't in the 1.14.3 API
    doc (section 2), so current ConsolePort would probably error on 1.14.2.
  - **The releases that targeted 1.14.2 are tags 2.2.1 to 2.4.5 (2022-05-26 to 2022-09-26).** Their TOCs say
    `## Interface-Classic: 11402` (checked 2.2.1, 2.3.0, 2.3.2, 2.4.0, 2.4.5). 2.4.5 is the last of them and the first to
    carry `LICENSE.md` again (license re-added 2022-09-14, commit 32cfb02).
  - Branches: `master`, `legacy`, `sdl`, `world-map`, `bugfixes`, and **`forever`**. The `forever` branch is active: 19
    commits ahead of master, the last on 2026-09-29.
  - Commit 644fb81 adds `CPAPI.IsNativeGamepadUI = C_GamepadUI ~= nil` and turns off ConsolePort's Menus module "where
    the client has native gamepad UI". So ConsolePort is adapting itself to Forever's own gamepad UI rather than replacing it.
- **License:** Artistic License 2.0, © 2022 Sebastian Lindfors (CP `LICENSE.md`; GitHub reports `Artistic-2.0`).
  - We may redistribute modified code if we document the changes, give it a different name, and keep the copyright
    notices.
  - Works that only *use* the package aren't "modified versions".
  - Tags before 2022-09-14 (2.2.1 to 2.4.0) ship **no** license file, so they're all rights reserved by default.
  - CurseForge shows "Custom License".
  - Verdict: we *may* borrow from 2.4.5 or later with attribution, but the architecture (node scanner, profile schema,
    Blizzard-style secure headers) is heavy and generic. Writing a small ForeverUI-shaped module is cleaner. Borrow ideas,
    and at most small, attributed snippets such as the per-device button tables.

## 2. What the 1.14.2 client has (checked on disk)

The 1.14.2 client already includes the Shadowlands gamepad layer. A forum claim that Classic "was built on BfA and has no
controller support" dates from March 2021, before the 1.14 Era client moved to the newer engine, and is out of date
(https://eu.forums.blizzard.com/en/wow/t/controller-support/256310).

| Evidence | File |
|---|---|
| `C_GamePad.IsEnabled`, `C_GamePad.GetDeviceMappedState` exposed to secure code | 142 804760 (RestrictedEnvironment.lua) :15-16, 186-191 |
| Frame methods `IsGamePadButtonEnabled`, `IsGamePadStickEnabled`, `EnableGamePadButton`, `EnableGamePadStick` | 142 804777 (RestrictedFrames.lua) :149-154, 607-612 |
| Script handlers `OnGamePadButtonDown/Up` in use | 142 2032765:20-21, 803944 (KeyBindingFrame) :276, 804561 (CinematicFrame) :127 |
| `CanAutoSetGamePadCursorControl` + `SetGamePadCursorControl` on panel open/close | 142 4216112 / 4216157 (UIParent) :2534-2535, 2774-2775, 3367-3425; 804584:130; 804625:226; 947514:4-5 (GameMenu) |
| Binding names and labels `KEY_PADDUP..KEY_PADSOCIAL`, styles `_LTR` (Xbox letters), `_SHP` (PlayStation shapes), `_REV` (Nintendo), abbreviations `KEY_ABBR_PAD*` ("A", "LB", "Lt") | 142 4216187 (GlobalStrings) :901-1010; 4216304 :907+ |
| `GamePadDocumentation.lua` listed in the API doc TOC (file itself not in our extraction) | 142 1579620:48 |

- **The C_GamePad function list** is taken from 1.14.3's copy, the nearest build: Gethe/wow-ui-source tag 1.14.3,
  `Interface/AddOns/Blizzard_APIDocumentation/GamePadDocumentation.lua`. Tag 1.14.2 lists the file in its TOC but the file
  is missing there as well.
  - Functions: `AddSDLMapping, ApplyConfigs, AxisIndexToConfigName, ButtonBindingToIndex, ButtonIndexToBinding,
    ButtonIndexToConfigName, ClearLedColor, DeleteConfig, GetActiveDeviceID, GetAllConfigIDs, GetAllDeviceIDs,
    GetCombinedDeviceID, GetConfig, GetDeviceMappedState, GetDeviceRawState, GetLedColor, IsEnabled, SetConfig,
    SetLedColor, SetVibration, StickIndexToConfigName, StopVibration`.
  - Events: `GAME_PAD_ACTIVE_CHANGED, GAME_PAD_CONFIGS_CHANGED, GAME_PAD_CONNECTED, GAME_PAD_DISCONNECTED`.
  - Not in 1.14.3: `GetPowerLevel`, `GAME_PAD_POWER_CHANGED`, `Get/SetAllowHoverEventsWithFreeLook` (all in Forever's
    doc, FV blizzard_apidocumentationgenerated/gamepaddocumentation.lua:207, 135, 231, 336).
- **CVars.** These live in the client binary, not in UI code, so they can't be grepped here (and we don't read the game
  install). ConsolePort 2.4.5, the 11402 build, exposes this set with no version gate. Only two `CameraFollowGamepadAdjust*`
  entries are gated to Retail (CP@2.4.5 `ConsolePort/Model/Data/Console.lua:153-164`):
  `GamePadEnable`; `GamePadEmulateShift/Ctrl/Alt/Esc`;
  `GamePadCursorLeftClick/RightClick/AutoDisableJump/AutoDisableSticks/ForTargeting/SpeedStart/SpeedAccel/SpeedMax`;
  `GamePadCameraYawSpeed/PitchSpeed/LookMaxYaw/LookMaxPitch`; `GamePadTurnWithCamera`;
  `GamePadFaceMovementMaxAngle(Combat)`; `GamePadAnalogMovement`; `GamePadTouch*`; `CameraFollowOnStick`;
  `CameraKeepCharacterCentered`; `CameraReduceUnexpectedMovement`.
  - Treat this as "very likely present", not proven. Also `GamePadCursorAutoEnable` and `GamePadCursorCenteredEmulation`
    (Mouse.lua:372-374 on master).
- **Missing in 1.14.2:** Forever's whole gamepad UI layer (`C_InputInterfaceStyle`, CVar `InputDeviceInterfaceStyle`,
  `C_GamepadUI`, `C_GamepadTargeting`, binding contexts through `C_KeyBindings.ActivateBindingContext`), `SoftTarget*`
  CVars (no `SoftTarget` string anywhere in 142), and `C_CVar.SetTempCVar`. 1.14.2 has no gamepad options panel of its own:
  in retail 9.0 it was also turned on with `/console GamePadEnable 1`.

## 3. WoW Forever's approach

Forever doesn't bolt pad support onto the mouse-and-keyboard UI. It ships a separate **console-style HUD and UI mode**,
about 20k Lua lines: `blizzard_gamepad` (3.4k lines, `AllowLoadGameType: camelot`), `blizzard_gamepadactionbars` (9.6k,
camelot), `blizzard_gamepadsharedutility` (4.9k, both), `blizzard_gamepadsmartnavigation` (2.6k, both),
`blizzard_gamepadsoftcursor` (mainline only). The TOCs are FV `<addon>/<addon>.toc`.
- **Mode switch.**
  - `InputUtil.IsGamepadUISupported()` means CVar `InputDeviceInterfaceStyle` exists, and `IsGamepadUIEnabled()` means
    `C_InputInterfaceStyle.GetCurrentStyle() == Gamepad` (FV blizzard_sharedxml/mainline/inpututil.lua:7-13).
  - The frames register `InputUtil.RegisterGamepadInit/Uninit` callbacks and swap behaviour live.
  - Entering the mode sets temporary CVars (soft targeting enemy and interact, camera follow, keep character centered)
    and activates binding context `GamepadModeInGameCore` (FV blizzard_gamepad/core.lua:1-51).
- **HUD pieces.**
  - Action bars in clusters of 8: a D-pad quad and a face-button quad (FV blizzard_gamepadactionbars/actionbarbutton.lua:32-78).
    Top, left, right and bottom bars sit on 3 pages, reached with trigger modifiers (`PageUnit`, `mainactionbarframe.lua`).
  - Friendly and hostile targeting bars, flyout radials for class, pet and spell flyouts.
  - A reticle in mid-screen to aim soft targeting (FV blizzard_gamepad/ui/reticle/gamepadreticle.lua:1-3).
  - A micro-menu radial (gamepadradial.lua:145-259), a "HUD mode" that cycles focus across HUD frames
    (gamepadhudmode.lua:130-318), and an on-screen **persistent input legend** (gamepadpersistentinputlegend.lua).
- **Menus and windows.**
  - **Smart navigation** moves a focus highlight between buttons by direction, including inside scroll frames. It's
    distance and angle based, diagonals off (FV blizzard_gamepadsmartnavigation/smartnavigation.lua:1-60). 39 other
    Blizzard addons (maps, menus, settings, unit frames, character create ...) mention SmartNavigation.
  - **Prompted-binding footers** show glyph + label rows ("(A) Select", "(B) Back") under a window. The game menu builds
    one: `CreatePromptedBindingFooter(self, "GlueMenuFooter")`, `AddStandardBackPrompt(RETURN_TO_GAME)`, and in gamepad UI
    it hides the Return to Game button (FV blizzard_gamemenu/shared/gamemenuframe.lua:77-78, 156-160, 303-319). The same
    footer appears in 47 files across 29 addons.
  - Pad constants: face buttons PAD1-4, D-pad `PADD*`, left and right modifiers mapped to `SHIFT` and `CTRL`
    (FV blizzard_sharedxml/shared/gamepadconstants.lua:1-40).
- **Settings category "Gamepad (Alpha)"** (FV blizzard_settingsdefinitions_shared/gamepad.lua; the user's screenshots
  `_Inbox/Game Menu and Map/WoWScrnShot_093026_131329/131335/131339.jpg`):
  - It sits under Gameplay after Social, and only if the CVar exists (:295-335).
  - Rows, in screenshot order, with the CVar in brackets:
    - Enable Gamepad UI (Alpha) [`InputDeviceInterfaceStyle`] (off in the shot), Show Input Legend
      [`GamepadShowPersistentInputLegend`].
    - **Camera:** Horizontal Speed 1.3 [`GamePadCameraYawSpeed`], Vertical Speed 1 [`GamePadCameraPitchSpeed`], Invert
      Horizontal/Vertical Axis [`gamepadInvertYaw/Pitch`], Follow Camera [`GamepadCameraFollowOnStick`, plus a pitch-offset
      slider], Turn Player with Camera [`GamePadTurnWithCamera` 0/1/3/2], Movement Face Angle 0 and Combat 105
      [`GamePadFaceMovementMaxAngle(Combat)`], Back Pedal Stick Threshold 0.6, Stick Run Threshold 0.5, Face Movement while
      Mounted/Swimming/Gliding.
    - **HUD Modifier:** Press to Toggle.
    - **Frame Focus Style:** Focus Glow Color (Gold/Black/Blue), Focus Opacity 0.5.
    - **Action Bars:** Show Input Prompts, Show Action Bar Highlight, Enable Action Bar Scaling, Show Empty Action Bars,
      Use Compact Action Bar, Possess Bar Override ("Special Page"), Stance Bar Override ("Page 1 Right Bar").
    - **Targeting:** Fixed Party Targeting, Swap Target Modifier Sides, Swap Friendly/Hostile Targeting Actions.
    - **Raid Targeting Options:** Hover Mode (:136-293).
  - Also summarised in docs/specs/forever-settings-ingame.md:49-50, 140-142, 302.
- **What "Alpha" means.** The label is on the category and on the checkbox itself. The mode is off by default
  (`defaultValue = PlatformIsHandheld()`, :315), and the whole HUD is gated to the camelot game type.
  - The retail BlizzCon 2026 demo reportedly showed the same in-game line, "currently in an alpha state", limited to a
    starting zone. That is second-hand: https://playday.one/2026/09/13/controller-support-coming-to-world-of-warcraft/
    quotes a tweet; confirm from an original source before relaying.
  - Reading: Blizzard is shipping it for feedback. Layout, CVars and bindings can still change, so we should copy the
    *pattern* (prompts, footers, focus glow, 8-button clusters), not chase every row.
  - Forever's glyph art (atlases like `gamepad-actionbar-circleslot-xbox-a-normal`) isn't in our extraction yet. Only 4
    `Interface/Gamepad/*.blp` are in `forever/interface_blp_manifest.json`.

## 4. macOS

- Native pad input on Mac is Blizzard's own client layer, not an addon. `C_GamePad.AddSDLMapping` suggests SDL-style
  device mappings.
  - Mac reports on retail are mixed. Dec 2020: a DualSense wasn't seen at all
    (https://eu.forums.blizzard.com/en/wow/t/game-controllers-not-working-on-macos/228999); macOS only gained DualSense
    and Xbox Series support in Big Sur 11.3 (April 2021), which likely explains it. Sep 2024: pads work but stop after
    Cmd-Tab until restart (https://us.forums.blizzard.com/en/wow/t/mac-controllergamepad-support-has-become-buggy/1943327).
  - Nothing specific to the arm64 1.14.2 Mac client was found. **Treat Mac support as unverified until probed in game.**
- Controllers to try, in order: Xbox Wireless Controller (One S/X or Series X|S, Bluetooth, current firmware); DualSense
  or DualShock 4 over Bluetooth or USB; Switch Pro (macOS 13+).
- Quit Steam (Steam Input can grab the pad) and avoid remappers (ControllerKeys, JoyMapper, Karabiner), which would put
  us back on keyboard emulation.
- Probe, as chat lines of 255 characters or fewer: `/console GamePadEnable 1`;
  `/dump C_GamePad.IsEnabled(), C_GamePad.GetActiveDeviceID()`; `/dump C_GamePad.GetAllDeviceIDs()`;
  `/dump GetBindingText("PAD1")`; `/dump C_GamePad.GetDeviceMappedState(C_GamePad.GetActiveDeviceID())` while holding A.
  Then check that a pad press fires the Key Bindings frame's `OnGamePadButtonDown`.

## 5. Recommendation for ForeverUI

**Step 0, whichever option (0.5 session):**
- Run the Mac probe above.
- Record which C_GamePad functions and CVars exist, e.g. `GetCVar("GamePadTurnWithCamera") ~= nil` for each CVar in
  section 2 plus Forever's row CVars.
- If the Mac client sees no pad, stop here. Options (b) and (c) then have nothing to run on.

**(a) Rely on ConsolePort; make ForeverUI compatible.** Effort 1 session.
- The user installs ConsolePort **2.4.5** themselves (the last 11402 build, Artistic-2.0). No download by us.
- ForeverUI changes:
  - Call `ConsolePort:AddInterfaceCursorFrame()` for each of our windows (Options, Key Bindings, journals, character, bags,
    professions) when `ConsolePort` is loaded.
  - Let ConsolePort_Bar own the bars, with our SkinActionBars off when it's loaded.
  - Keep ConsolePort_Menu off because our game menu skin replaces it.
- Risks: two skins fighting over action bars and the game menu; a 2022 ConsolePort look that isn't Forever's; bugs in a
  4-year-old build we can't fix upstream.
- Good as a stopgap and for comparison. It isn't "our version".

**(b) Minimal ForeverUI gamepad module (recommended beta).** Effort 3-4 sessions.
- New file `Gamepad.lua`, off by default. `/fui gamepad` and a **"Gamepad (Beta)"** category in our Options window, after
  Social as in Forever. It uses the existing `OptionsData.lua` CVar rows plus an `onlyIf = "gamepad"` gate, the way
  `keyboard` uses `onlyIf = "mac"`.
  - **Enable Gamepad (Beta):** sets `GamePadEnable` and, on first enable only, `GamePadEmulateShift=PADLTRIGGER` and
    `GamePadEmulateCtrl=PADRTRIGGER`, matching Forever's left and right modifiers (gamepadconstants.lua).
  - **Show Input Prompts:** on by default.
  - **Camera:** Yaw and Pitch Speed, Turn Player with Camera (1.14.2's value meanings: verify), Movement Face Angle and
    Combat, Follow Camera on `CameraFollowOnStick`. Invert and thresholds only if the probe finds their CVars.
  - **Cursor:** Left/Right Click buttons.
  - **Modifiers:** Emulate Shift/Ctrl.
  - Drop the rows that need Forever's HUD: HUD Modifier, Frame Focus Style, Targeting, Raid, Possess/Stance overrides.
- **Default layout**, applied by a "Load Forever layout" button, **out of combat only**:
  - `SetBinding` + `SaveBindings(2)`: face and D-pad to `ACTIONBUTTON1-8`.
  - `SHIFT-` / `CTRL-` layers to the MultiBar buttons, which is Forever's "pages" in stock-bar terms.
  - Left stick moves, right stick is the camera (client CVars).
  - `PADFORWARD` = game menu, `PADBACK` = `TOGGLEWORLDMAP`, stick clicks = target nearest enemy / interact
    (`INTERACTTARGET` if 1.14.2 has it, else `ASSISTTARGET`).
- **Prompts on our action buttons:** when the bound key starts with `PAD`, replace the `HotKey` text with a glyph (Xbox
  letters or PS shapes, chosen from `C_GamePad.GetDeviceRawState(id).vendorID`). Fall back to `GetBindingText(key, true)`,
  which gives "A", "LB" from `KEY_ABBR_*_LTR`. Reuse the existing HotKey font string (no shadow copy).
- **Our Key Bindings window:** accept pad presses (`EnableGamePadButton(true)` + `OnGamePadButtonDown`, as 142 803944:276
  does) and show a pad row beside the keyboard art.
- Risks:
  - `SetBinding`/`SetOverrideBinding` are blocked in combat, so the layout loader must queue until `PLAYER_REGEN_ENABLED`.
  - Everything stays on Blizzard's secure action buttons and plain bindings, so **no taint**.
  - HotKey rewrites are cosmetic, but must hook the stock update (`ActionButton_UpdateHotkeys`) instead of replacing it.
  - Glyph art: draw our own. Forever's atlases stay local and private, per the asset rule.

**(c) Fuller port with cursor navigation and footers.** Effort 8-12+ sessions.
- On top of (b):
  - A ForeverUI "smart navigation" focus for **our own** windows (Options, Key Bindings, journals, character, bags): a
    focus glow (Forever's Gold, opacity 0.5), D-pad/stick moves by nearest-in-direction as FV smartnavigation does, and
    (A) clicks.
  - Forever-style **prompted footers** ("(A) Select  (B) Back") under those windows and the game menu.
  - A micro-menu **radial** on a held button.
  - Optionally Forever's 8-button cluster bars as a Beta bar layout.
- Risks:
  - Clicking protected things (use item, cast from spell book, bag use, target unit frames) needs
    `SetOverrideBindingClick` onto a **secure** button, set out of combat. In combat the cursor must go read-only, as
    ConsolePort's does (Cursor.lua:28-38).
  - Navigation on Blizzard frames (merchant, trainer, quest) means scanning their children, which is fragile across our
    skins.
  - 1.14.2 has no soft targeting and no binding contexts, so Forever's reticle and targeting bars can't be faithful
    without ConsolePort-style macro targeting.
  - Much more to test per window.

**Order to build (b then c):**
1. Mac probe and CVar inventory; write the results into this file.
2. Browser preview (the preview-first rule): the "Gamepad (Beta)" rows beside Forever's screenshots, plus action buttons
   with Xbox and PS glyph prompts. Show an Alliance and a Horde bar.
3. `Gamepad.lua`: enable toggle, CVar rows, and the combat-safe "Load Forever layout" that binds `ACTIONBUTTON1-8` and the
   modifier layers.
4. Glyph prompts on the HotKeys.
5. Pad input in our Key Bindings window.
6. Only then the (c) items, starting with the game menu footer and focus navigation in our Options window. These are our
   own frames, so there's no taint risk.

## 6. The Mac probe (2026-09-30, session 43: `/fui gamepad probe`, Gamepad.lua)

The user's controller: a **GameSir T4N Lite** paired over Bluetooth (macOS listed it), Steam closed; a PS4 controller kept as the
fallback. The 1.14.2 client (Mac, build 42597):
- `GamePadEnable = 0` by default; `C_GamePad.IsEnabled()` false; `GetAllDeviceIDs()` empty while off, yet
  `GetActiveDeviceID()` and `GetCombinedDeviceID()` both 5.
- **`/fui gamepad on` (GamePadEnable 1) and the controller works in the game** (the user: "The controller works after i typed
  gamepad on"). No restart needed.
- `C_GamePad` has 21 functions, 1.14.3's list less `AddSDLMapping`: ApplyConfigs, AxisIndexToConfigName, ButtonBindingToIndex,
  ButtonIndexToBinding, ButtonIndexToConfigName, ClearLedColor, DeleteConfig, GetActiveDeviceID, GetAllConfigIDs, GetAllDeviceIDs,
  GetCombinedDeviceID, GetConfig, GetDeviceMappedState, GetDeviceRawState, GetLedColor, IsEnabled, SetConfig, SetLedColor,
  SetVibration, StickIndexToConfigName, StopVibration.
- **CVars present (28 with the GameSir; 31 with the DualSense connected: the three GamePadTouchTap* appear with a touchpad pad)**,
  with their defaults: GamePadEnable=0, GamePadEmulateShift=PADLTRIGGER, GamePadEmulateCtrl=PADLSHOULDER,
  GamePadEmulateAlt=none, GamePadEmulateEsc=PADBACK, GamePadCursorLeftClick=PADRTRIGGER, GamePadCursorRightClick=PADRSHOULDER,
  GamePadCursorAutoEnable=1, GamePadCursorAutoDisableJump=1, GamePadCursorAutoDisableSticks=2, GamePadCursorForTargeting=1,
  GamePadCursorCenteredEmulation=1, GamePadCursorSpeedStart=0.1, GamePadCursorSpeedAccel=2, GamePadCursorSpeedMax=1,
  GamePadCameraYawSpeed=1, GamePadCameraPitchSpeed=1, GamePadCameraLookMaxYaw=0, GamePadCameraLookMaxPitch=0,
  GamePadTurnWithCamera=1, GamePadFaceMovementMaxAngle=0, GamePadFaceMovementMaxAngleCombat=180, GamePadAnalogMovement=0,
  GamePadTouchCursorEnable=1, GamePadSingleActiveID=0, GamePadStickAxisButtons=0, GamePadAbbreviatedBindingReverse=0,
  GamePadVibrationStrength=1.
- **Missing (9 with the GameSir, 6 with the DualSense):** GamePadTouchTapButtons, GamePadTouchTapMaxMs, GamePadTouchTapOnlyClick (these
  three only without a touchpad), GamePadListDevices,
  CameraFollowOnStick, CameraKeepCharacterCentered, CameraReduceUnexpectedMovement, SoftTargetEnemy, InputDeviceInterfaceStyle
  (the last two as expected: no soft targeting, no Forever gamepad UI layer).
- So Forever's modifiers (the triggers) differ from the client's defaults: Shift is the left trigger, Ctrl the left bumper.
- **The GameSir T4N Lite's buttons** (the second watch, the index functions counted from 0): D-pad = PADDUP / RIGHT / DOWN /
  LEFT, A B X Y = PAD1-4, LB = PAD5 (likely), L3 = PADLSTICK, left stick = the Movement stick, right stick = Camera / Cursor;
  a trigger arrives as the "Gyro" stick (GStickY); RB, the other trigger, R3, Select and Start never showed. A generic pad: the
  client's modifiers (LT Shift, LB Ctrl) never fire. `/fui gamepad basic` binds it (LB held = Shift). The native fix would be a
  `C_GamePad.SetConfig` entry for its vendor / product ids (LB -> PADLSHOULDER, labelStyle "Letters").
- **The PS5 DualSense** (a first watch read nothing: GamePadEnable had been reset to 0; the watch now refuses to start with the
  switch off) maps fully, as the client's own names: ✕ ○ □ △ = PAD1-4; L1 / R1 = PADLSHOULDER / PADRSHOULDER; L2 / R2 =
  PADLTRIGGER / PADRTRIGGER (buttons, and axes 9 / 10 "LTrigger" / "RTrigger"); L3 / R3 = PADLSTICK / PADRSTICK; Create =
  PADSOCIAL; Options = PADFORWARD; the touchpad click = PADBACK (as Forever's PlayStation sheet draws PADBACK: touchpadl);
  D-pad = PADDUP / RIGHT / DOWN (/ LEFT); the sticks Movement and Camera / Cursor. The PS button (PADSYSTEM) never reached the
  game (macOS keeps it). So the client's defaults work as they are: L2 held = Shift, L1 held = Ctrl, the touchpad = Esc.

## 7. How WoW Forever does it (read from its UI code, session 43)

Paths under (private files) (FV).
- **Glyphs come from strings.** `blizzard_sharedxml/sharedconstants.lua:55-143` (SetGamepadBindingStrings) overwrites every
  `KEY_PAD*` / `KEY_ABBR_PAD*` global with atlas markup (`|A:Gamepad_<Name>_64:24:24|a`, `_32` for the short one), per style:
  Generic, `_LTR` (Xbox), `_SHP` (PlayStation), `_REV` (Nintendo); `GetBindingText(key, abbrev)` then returns glyphs everywhere
  (the Keybindings list `blizzard_settings_shared/blizzard_keybindings.lua:537-543`, the action buttons
  `blizzard_actionbar/shared/actionbutton.lua:493-517`, the HotKey widened to the button for pad keys).
- **The style** comes from `C_GamePad.GetDeviceMappedState(C_GamePad.GetActiveDeviceID()).labelStyle` ("Generic", "Letters",
  "Shapes", "Reverse"; `inputdeviceiconsetmanager.lua:36-43`), settable per device with `C_GamePad.SetConfig` (labelStyle,
  rawButtonMappings). No CVar, no vendor check.
- **Capturing a press:** `OnGamePadButtonDown` beside `OnKeyDown` while listening, `EnableGamePadButton(true)` while a binding
  button waits (`custombindingbuttonmixin.lua:112-125`); the chord from `CreateKeyChordStringUsingMetaKeyState` (the emulated
  modifiers make `IsShiftKeyDown()` true: `SHIFT-PAD1`). 1.14.2's own KeyBindingFrame does the same (142 803944:276).
- **The glyph sheets** (local PNGs at their atlas size, so boxes are pixels; the full dump of 485 rows:
  (private files) made by tools/asset-extract/gp_atlas.py): GamepadShp.png 512x256 (PlayStation: cross,
  circle, square, triangle, L1 R1 L2 R2, L3 R3, D-pad, options, touchpad, PS, share, micmute), GamepadLtr.png (Xbox), GamepadRev.png
  (Nintendo), GamepadGeneric.png 512x512 (numbers, stick directions, paddles), GamepadConsoleButtons.png (a flatter 32 px set:
  gamepad-ps-32x-*, gamepad-xb-32x-*). 1.14.2 has none of them: they go in the uncommitted Art/ (forever_addon_art.py).
- **No controller picture** in Forever's extracted textures (the Controller Map atlases hint at one not in our dump). Ours:
  ConsolePort's DS4.blp / DS5.blp / Xbox.blp (Artistic-2.0, 1024 x 1024 front views; (private files) kept local).
- **The Gamepad (Alpha) page** (`blizzard_settingsdefinitions_shared/gamepad.lua`): Enable Gamepad UI = InputDeviceInterfaceStyle
  (missing on 1.14.2); camera speeds GamePadCameraYaw/PitchSpeed (present; Forever 1.3 / 1, range 0.5-5); invert yaw / pitch
  (gamepadInvertYaw / Pitch, to probe); Follow Camera (GamepadCameraFollowOnStick, to probe); Turn with Camera (GamePadTurnWithCamera,
  Forever 3); face angles (present; Forever 0 / 105); back pedal and run thresholds (GamePadBackPedalThreshold, GamePadRunThreshold,
  to probe); face while mounted / swimming / flying (to probe); the legend, HUD modifier, focus, bars, targeting: Forever's HUD
  CVars, missing.
- **Forever's layout** (`gamepadconstants.lua:1-40`, `blizzard_gamepadactionbars/pageunit.lua:564-613`,
  `gamepadpersistentinputlegend.lua:326-431`): LT = Shift, RT = Ctrl; four bars of 8 (D-pad + face buttons): none, LT, RT,
  LT + RT; LB the friendly modifier (D-pad party members, Y marker, A self, X pet, B assist), RB the hostile one (A last hostile,
  X ranged attack); L3 autorun, R3 ping; LB + RB: D-pad right / left page the bars, up the quest tracker, down the chat, Y buffs,
  X sheathe, B bags, R3 flip camera, L3 centre it.
- **For ForeverUI:** our own `ns.PadGlyph(key)` (don't overwrite the KEY_PAD* globals: taint, and `|A:` markup can't name these
  atlases on 1.14.2) built on ns.AtlasMarkup with the style from labelStyle and an Options override; SHIFT / CTRL drawn as the pad
  buttons GamePadEmulateShift / Ctrl name; the action buttons' HotKey via hooksecurefunc("ActionButton_UpdateHotkeys"); the Key
  Bindings window's Controller view (the pad's picture, a label per button, click to bind) and pad capture (EnableGamePadButton,
  OnGamePadButtonDown, the emulated modifiers ignored as keys, GamePadEmulateEsc cancels). To check in game: whether a held
  emulated trigger reaches OnGamePadButtonDown and fires MODIFIER_STATE_CHANGED.

## Summary

1. ConsolePort is the reference controller addon (Artistic-2.0). Since Shadowlands it runs on WoW's native gamepad layer
   (`GamePadEnable`, `PAD*` bindings, `GamePadEmulate*` modifiers, `C_GamePad`), not on keyboard emulation.
2. Current ConsolePort (3.2.7) targets Era 1.15.9, not 1.14.2. Its 11402 builds are tags 2.2.1 to 2.4.5 (2022), and 2.4.5
   is the one with a license file.
3. ConsolePort has a live `forever` branch that stands down its Menus module when Forever's native `C_GamepadUI` exists.
4. The 1.14.2 client does have the gamepad layer on disk: `C_GamePad`, `OnGamePadButtonDown`, `EnableGamePadButton`,
   `SetGamePadCursorControl`, `KEY_PAD*` labels with Xbox, PS and Nintendo styles.
5. 1.14.2 lacks Forever's layers: `C_GamepadUI`, `C_GamepadTargeting`, `InputDeviceInterfaceStyle`, `SoftTarget*`,
   binding contexts.
6. Forever ships a separate console HUD: 8-button D-pad/face clusters on 3 pages, reticle, radial, input legend, smart
   navigation, and (A)/(B) prompt footers.
7. Its "Gamepad (Alpha)" settings are off by default, camelot-only and explicitly unfinished.
8. Mac pad input is Blizzard's and has known retail quirks (Cmd-Tab). It must be probed in the 1.14.2 Mac client before
   any build.
9. Recommendation: option (b), a small "Gamepad (Beta)" module with CVar rows, a combat-safe default layout on stock
   secure buttons, and Forever-style glyph prompts. No taint, 3-4 sessions.
10. Then (c) focus navigation and footers on our own windows. Option (a), ConsolePort 2.4.5 plus
    `AddInterfaceCursorFrame` hooks, stays a stopgap.
