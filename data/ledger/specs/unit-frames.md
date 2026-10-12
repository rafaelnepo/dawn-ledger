# The unit frames: Forever's player, target, pet and party for 1.14.2

Started 2026-09-28 evening (the user, unattended: "I'd love to have the player and party frames that wowforever has"; open item
#6, held until Forever's art could be read: the Forever client was closed, checked before reading). ForeverUI 0.98.0, skin part
`unitframes`, `SkinUnitFrames.lua`. Sources: Forever's own code (`(private files)
blizzard_unitframe/`: the mainline PlayerFrame.xml, TargetFrame.xml, PartyFrameTemplates.xml and PetFrame.xml, the Camelot
overrides PlayerFrame.lua, TargetFrameUtils.lua and the two templates files), its atlas tables (UiTextureAtlas: the pieces on
Forever's own file 8036204 and retail's 4631591 / 4681512 / 8116745), and 1.14.2's own FrameXML (PlayerFrame.xml 804722,
TargetFrame.xml 4216069, PetFrame.xml 804717, PartyMemberFrame.xml 804736 and their Lua). The earlier playground prototype
(`addons/playground/unit-frames/`, 2026-09-26, from screenshots) is superseded by this.

## What Forever shows

Forever's unit frames are retail's Dragonflight frames with Camelot's own plates: a round portrait at the frame's outer corner
(the player's at the left, the target's at the right), a metal plate over it with the bars' slots cut out and a dark band for the
name, the health bar 20 tall with the power bar 10 tall under it, the level in a small circle at the plate's inner bottom corner
(white digits; Camelot re-anchors the level text there in `PlayerFrame_OnLoad`), the target's reaction as a tinted band behind its
name, a gold ring over an elite's portrait frame, a silver winged ring and a star for a rare or rare elite (Camelot's
`GetBossPortraitFrameData`: rares take the silver ring too, unlike retail), a lighter "minus" plate for a trivial mob. The pet
and the target's target share one small plate (120 x 49, the target-of-target's), the party members another of the same size.

## The numbers (Forever's XML, in the frame's units from its top-left; the target's from its top-right)

| Frame | Portrait | Plate | Name | Health | Power | Level circle |
|---|---|---|---|---|---|---|
| Player 232 x 100 | 60 at (24, -19), mask `UI-HUD-UnitFrame-Player-Portrait-Mask` | `Player-PortraitOn` 198 x 71 centred | (88, -27) 96 x 12, left | (85, -40) 124 x 20 | (85, -61) 124 x 10 | BOTTOMLEFT (13, 7), 39 |
| Target 232 x 100 | 58 at TOPRIGHT (-26, -19), `CircleMask` | `Target-PortraitOn` 192 x 67 centred; `MinusMob` for trivial | in the band: TOPLEFT of its TOPRIGHT (-106, -1) 90 x 12 | BOTTOMRIGHT at (148, -48) 126 x 20 | TOPRIGHT at (156, -49) 134 x 10 | BOTTOMRIGHT (-13, 7) |
| Target's target 93 x 45 | 37 at (5, -5) in a 120 x 49 box | `TargetofTarget-PortraitOn` centred on the box | right of the portrait (2, 0) 68 x 10 | BOTTOMRIGHT at (114, -27) 70 x 10 | (40, -28) 74 x 7 | none |
| Pet 128 x 53 | the same box 4 in, 2 down | the same | the same | the same | the same | none |
| Party 128 x 53 | 37 at (6, -4) in the box at (1, -2) | `Party-PortraitOn` at the box's top left | (45, -4) 57 x 12 | (44, -17) 70 x 10 | (40, -28) 74 x 7 | none |

The reaction band `Target-PortraitOn-Type` 135 x 18 at TOPRIGHT (-75, -25). The rings at TOPRIGHT (-11, -8) plus Camelot's
offsets: elite `Boss-Gold` (0, 1), rare and rare elite `Boss-Rare-Silver-Winged` (8, -7), world boss `Boss-Gold-Winged` (11, -4).
The bar fills by power: `-Bar-Health`, `-Bar-Mana`, `-Bar-Rage`, `-Bar-Energy`, `-Bar-Focus` of each frame's own set; their
masks (`-Bar-Health-Mask` 128 x 32 for the player and target, 128 x 16 for the party and the small frames; `-Bar-Mana-Mask`
128 x 16, the target's 256 x 16) centred on the bar. The player's rest glow `Player-PortraitOn-Status` at (17, -14); the party
member's combat flash `Party-PortraitOn-InCombat` on the plate.

## What 1.14.2 has, and what the skin does with it

1.14.2's frames are vanilla's: 232 x 100 diamonds (`UI-TargetingFrame`), the portrait 64 at (42, -12), the bars 119 x 12 at
(106, -41) and (106, -52), the level text re-anchored in code at every level check, the name over the bars, the target's name
background tinted by reaction (`TargetFrame_CheckFaction`), its plate swapped by classification (`TargetFrame_CheckClassification`:
Elite, Rare, Rare-Elite, Minus), the pet 128 x 53 under the player frame, the party members 128 x 53 stacked at the left. All of
them are `SecureUnitButtonTemplate` buttons: protected, with their children implicitly protected too, so nothing of theirs is
moved or sized in combat.

The skin keeps every frame where the game puts it and at its size, and restyles the pieces:

- **The vanilla art** (the diamond, the black background, the small frames' plates) at alpha 0, never removed: the game keeps
  showing, hiding and swapping it (`PetFrame_Update` sets the pet's texture on every update; the alpha stays).
- **The portrait**: the game's own texture sized and placed at Forever's spot, round with Forever's mask (a MaskTexture on the
  frame). The game keeps drawing the unit's face into it and tinting it (dead, tapped).
- **The plate**: Forever's atlas piece on the frame's BACKGROUND layer, sublevel 2: over the portrait (sublevel 0) and over the
  fills (sublevel 1), so the bars show through its cut-outs; under the frame's texts and icons.
- **The bars**: the game's status bars sized and placed at Forever's spots (their values, texts and events untouched); their own
  fill texture at alpha 0 and Forever's drawn on the frame under the plate, cut by the value on every change (`OnValueChanged`,
  `OnMinMaxChanged`, `OnShow`: a status bar crops its texture by the value, which the padded art can't take; the cast bar skin
  does the same). The game's tint read on our fill by a hook on `SetStatusBarColor`: the plain colour (health's green, the power's
  own from `PowerBarColor`) shows as white so the art's own colour shows; any other tint (tapped grey, a class colour the user
  turned on) is kept. The power art follows the unit's power type (`UnitPowerType`). The bars' texts anchored to the bars.
- **The name**: the game's FontString at Forever's place; the target's inside its reaction band, which is the game's own
  name-background texture in Forever's band art (the game keeps tinting it).
- **The level**: Forever's small circle on the frame one draw sublevel under the level text, the text centred on it; the game's
  own re-anchoring (`PlayerFrame_UpdateLevelTextAnchor`, `TargetFrame_UpdateLevelTextAnchor`) hooked to centre it again. The
  player's level white, as Camelot draws it. The skull for an unknown level in Forever's icon (18 x 23).
- **The classification**: after the game's `TargetFrame_CheckClassification` and on the frame's show, the plate (normal or
  minus) and the ring and star by `UnitClassification`.
- **The rest and attack icons** at the portrait's top right (24 square), the rest glow in Forever's status art, the PvP icon
  small at the portrait's lower left.
- **The target's target** skinned when the game builds it (a hook on `TargetFrame_CreateTargetofTarget`), the pet and the four
  party members at login (each in its 120 x 49 box).
- **Combat**: the layout runs out of combat, or waits for `PLAYER_REGEN_ENABLED`; a value or colour change in combat only cuts
  or tints our own textures (never a protected object).

Not done: Forever's target auras row (the game's buff buttons stay), the rest flipbook animation (the game's static icon), the
combat icon (the game's crossed swords stay), the party pets' small frames (as the game draws them), the group indicator, the
player's corner embellishment, Forever's per-class portrait icons, the ping and threat pieces (not in 1.14.2).

## Checks

Offline: `addons/tests/foreverui/31-unit-frames.lua` (stand-ins for the five frames in `addons/tests/stub/30-unitframes.lua`):
the plates and their sizes, the portraits' places and masks, the bars' places, fills, masks, cuts and tints, the level circles
and the game's re-anchoring, the classification's plate, ring and star, the target's target on demand, the pet and party
frames, nothing blocked in combat. The browser page: `python3 tools/asset-extract/unitframes_preview.py`, then
http://localhost:8777/ui-forever/unit-frames/. In game: checklist 161.

## Fixes 2026-09-28 night (the user's shot)

- The level circle on the BORDER layer over the plate (it sat one sublevel under the level text, on the text's own low layer,
  and the portrait's ring cut into it); the level text raised to OVERLAY over it. The target's the same.
- The rest and attack icons 30 px at TOPLEFT (59, -1): Forever's PlayerRestLoop is a 30 px flipbook centred on a 20 px frame at
  (64, -6); 24 px read too small.

## The first look in game (2026-09-28 late night, session 35: Claude drove the client)

- Right: the player (ring, level circle, rest icon, bars), the pet, the party.
- The target was half skinned. 1.14.2's TargetFrame.xml (4216069) puts `$parentName`, `$parentLevelText`, `$parentHighLevelTexture`
  and `$parentPVPIcon` inside `$parentTextureFrame`, so their names are `TargetFrameTextureFrameName` and so on; the skin looked
  for `TargetFrameName` (the stub had copied the same names), so the name stayed at its vanilla place, the level had no circle,
  the skull and the PvP icon stayed vanilla. The target's target's name the same (`TargetFrameToTTextureFrameName`). Fixed; the
  PvP icon 34 px, TOP at the frame's TOPRIGHT (-26, -50) as Forever's TargetFrame.xml.
- The game's flat fills showed over our plate on the target: something re-shows a bar's own texture (the mana bar's
  `UnitFrameManaBar_UpdateType` sets it again). Now hidden again at every layout and after `SetStatusBarTexture` / `SetStatusBarAtlas`.
- The values on the bars: Forever's shot shows "363 / 363" on every bar. The game's Status Text (`statusText` 1,
  `statusTextDisplay` NUMERIC) is turned on once (`ForeverUIDB.statusTextSet`); the game's Interface options switch it back and
  it stays so. The texts in Forever's TextStatusBarText (`SystemFont_Outline_Small`: Friz 10, outlined), white; 1.14.2's
  NumberFontNormal (14) overflowed the 10 px power bars. Forever's pet shows its two values touching, as ours.

## The target's name box: how wide for the names (2026-09-29)

Measured by `tools/ui-measure/name_widths.py` (every creature name from the world database in GameFontNormalSmall, calibrated on
the client's own GetStringWidth). Today's box is Camelot's 117 points, from 26 in to 143, and the portrait's ring starts about
148: room for about 122 without the name running under the ring.

| Names | Fits 90% | Fits 95% | Fits 99% | Fits 100% | 117 fits |
|---|---|---|---|---|---|
| Placed in the world (7,306; internal ones left out) | 119 | 129 | 152 | 213 ("Chief Expeditionary Requisitioner Enkles") | 89.0% |
| Every creature in the database (10,379) | 129 | 146 | 184 | 270 (an internal spawner) | 83.4% |
