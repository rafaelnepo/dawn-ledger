# The raid frames: Forever's CompactUnitFrame pieces for 1.14.2

Built 2026-09-29 (session 35, unattended; the P3 list's item 27). ForeverUI 0.111.0, skin part `raidframes` (in
`SkinUnitFrames.lua`). Sources: Forever's `Blizzard_UnitFrame\Shared\CompactUnitFrame.xml / .lua` and its GlobalColor rows;
1.14.2's `CompactUnitFrame.lua` (804588). No Forever shot of raid frames.

## Forever and 1.14.2

The same compact frames (party and raid, the Raid Profiles), drawn with other pieces: Forever's health `RaidFrame-Hp-Fill` on
`raidframe-hp-bg-white` tinted 0.078 grey (COMPACT_UNIT_FRAME_FRIENDLY_HEALTH_COLOR_BG), the power bar `_RaidFrame-Resource-Fill`
on `-Background`, the target's and aggro's borders sliced (`RaidFrame-TargetFrame`, `RaidFrame-AgroFrame`); 1.14.2's
`Raid-Bar-Hp-Fill / -Bg`, `Raid-Bar-Resource-*`, and cut-outs of `Raid-FrameHighlights`.

## The skin

After the game's `CompactUnitFrame_SetUpFrame` (a secure hook, so every set-up and profile change), for frames named Compact*
(never the nameplates): the health, background and power files are Forever's pieces (six cut by the art tool); the two highlights
are sliced frames of ours, shown, hidden and tinted with the game's (hooks on the textures' Show, Hide, SetVertexColor). The game
keeps the layout, the colours (class colours when chosen), the auras, the clicks, the Raid Profiles.

## In game (2026-09-29)

"Use raid-style party frames" turned on for the look (the user's 0 restored after, with a /reload): the five compact frames in
Forever's fill; `/target Konrad`: the target's border. Not tried: a raid, aggro, the power bars (off in the default profile).
