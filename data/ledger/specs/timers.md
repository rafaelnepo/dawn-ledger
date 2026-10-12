# The timers: Forever's mirror timers, the quest timers' box, the durability figure

Built 2026-09-29 (session 35, unattended; the P3 list's item 26). ForeverUI 0.110.0, skin part `timers` (in `SkinCastBar.lua`).
Sources: Forever's `Blizzard_MirrorTimer\Mainline\MirrorTimer.xml / .lua`; 1.14.2's `MirrorTimer.xml` (804698) and
`QuestTimerFrame` (2321542); the durability art of both games (compared pixel for pixel). No Forever shot.

## Forever and 1.14.2

- **Breath, fatigue, feign death (MirrorTimer1-3).** Forever's are the cast bar's pieces: the background, the text box under the
  bar with the label (GameFontHighlightSmall), the frame, a fill by the timer (breath `ui-castingbar-filling-applyingcrafting`,
  fatigue and death `-filling-standard`, feign death `-filling-channel`). 1.14.2's are vanilla's: the old cast bar border, a black
  backing, the label on the bar, a plain bar tinted by MirrorTimerColors.
- **Quest timers.** 1.14.2 lists timed quests in a small dialog box under the minimap; Forever shows them in its objective tracker
  (no box). The box stays (the tracker here has no timers) in the pop-ups' diamond chrome with a "Quest Timers" header.
- **Durability figure.** The same art in both games (`Interface\Durability`): untouched.

## The skin

- Each mirror timer: its textures at alpha 0, Forever's background, text box, frame; our own fill, cut to the bar's value
  (texture coordinates, as the cast bar's: a StatusBar would stretch the whole piece), picked by the timer after the game's
  `MirrorTimer_Show`; the label under the bar. The game keeps the timing, the labels, showing and hiding.
- The quest timers' box: its gold border and header out, `ns.CreateDialogChrome` with the header.
- Art: one piece added (`ui-castingbar-filling-applyingcrafting`).

## In game (2026-09-29)

Shown from the chat (MirrorTimer_Show for breath and fatigue, paused; QuestTimerFrame:Show), then a /reload: as described. The
quest timers' box sits under the minimap where the game anchors it (MinimapCluster's bottom right), its header over the
coordinates line. Not tried: real breath under water, a real timed quest.
