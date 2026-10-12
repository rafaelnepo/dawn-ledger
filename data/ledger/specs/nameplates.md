# Nameplates: Forever's Thin style for 1.14.2

Built 2026-09-29 (session 35, unattended; the P2 list's item 19). ForeverUI 0.105.0, skin part `nameplates`,
`SkinNameplates.lua`. Sources: Forever's `Blizzard_NamePlates` (with its `Camelot\` overrides) and
`Blizzard_SettingsDefinitions_Frame\Camelot\NamePlatesOverrides.lua`; Forever's `globalcolor.db2`; 1.14.2's `Blizzard_NamePlates`
(4216244, 4216424) and `CompactUnitFrame.lua` (804588). No Forever shot of nameplates yet; the user's Forever config sets no
nameplate cvar, so the defaults apply.

## Forever and 1.14.2

- **Forever's style:** Camelot's Settings list Thin first and mark it "Default" (then Modern "Large", Block, Cast Focus). Thin: the
  health bar 13 high (SMALL_HEALTH_BAR_HEIGHT) in `UI-HUD-CoolDownManager-Bar` on its dark backing (`-Bar-BG`, 2 out at the left, 3
  above, 6 out right and below), the name centred 2 above the bar in the outlined nameplate font (14), the target's border
  (`UI-HUD-CoolDownManager-Selected-yellow`, its white tint leaves it yellow), every other plate a little darker
  (`ui-hud-nameplates-deselected-overlay`), no bright target fill (that's the Classic style's).
- **Camelot's level box** (`Camelot\Blizzard_NamePlateLevelFrame`): 5 right of the bar, 28 x 16, `ui-hud-nameplates-levelindicator`,
  the level in the difficulty's colour (trivial grey, then easy green at -3 and below, fair yellow to +2, difficult orange to +4,
  impossible red), gold (UNIT_LEVEL_NON_ATTACKABLE, 1 / 0.82 / 0) for what can't be attacked, the skull piece for a boss, a white
  bordered rectangle on the target's (`-rectangle-selected`). The colours are Forever's GlobalColor rows.
- **1.14.2:** vanilla's plate: the Nameplate-Border with the level (written by the client) in its right end, the bar 10 high in the
  target frame's fill on a grey background, the name above, the target's fill brightened; no cast bar on Era's plate.

## The skin

- After the game sets a plate up (`DefaultCompactNamePlateFrameSetupInternal`, a secure hook: it runs on every new plate and every
  options change) the border, the grey background, the client's level and the target's glow go to alpha 0; Forever's backing,
  fill, dimming, target border and level box come on; the bar is 13 high and leaves 33 at the right for the box; the name 14,
  outlined, centred above.
- The level box and the target's marks follow the unit on NAME_PLATE_UNIT_ADDED, PLAYER_TARGET_CHANGED and UNIT_LEVEL.
- The game keeps the plates (the client makes, moves, stacks and sizes them), the health and its colours, the names, the raid
  icons. Forbidden plates (in instances) are the client's: left alone.
- Art: 7 pieces cut from Forever's own files (8165542, 8165538 read from its install with the game closed).

## In game (2026-09-29)

With friendly plates turned on for the look (Darnassus; set back to the user's 0 after): the sentinels and the companions as Thin
plates, the levels in gold in their boxes; `/target` on a sentinel: the yellow border round its bar and box, the others dimmed.
The /reload that loaded it went back to the character select once (the server and the proxy fine; Enter World brought Sashimii
back): not seen before, watch for it. Not tried: enemies (their level colours), a boss's skull, instances.
