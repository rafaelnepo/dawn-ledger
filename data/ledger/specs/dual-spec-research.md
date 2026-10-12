# Dual spec: research (2026-09-27, for later)

The user asked whether dual spec is easy to add, the side tabs switching between the two (no search).

## What exists

- **The server:** CMaNGOS's Classic core has one talent set per character. There is no second spec, no `m_activeSpec` and no
  switch packet (grep of `mangos/src/game`, 2026-09-27). The later cores (TBC, WotLK) have it; porting it into the Classic core is a
  server change (database columns, packets, the talent code), not an addon's.
- **The client:** 1.14.2 has no dual spec API (GetActiveTalentGroup and friends came with Classic Era 1.15). The talent API it has
  works through HermesProxy: GetTalentInfo, LearnTalent (the talent window uses them).
- **A free reset:** `.reset talents` (Level3.cpp HandleResetTalentsCommand) calls `resetTalents(true)`, which resets at no cost. It
  needs SEC_ADMINISTRATOR (GM level 3). Both `nepo` accounts are GM level 3 (docs/server/operations.md, line 73; set with `account set gmlevel
  <user> 3`).

## An addon-only dual spec (feasible)

Two saved builds per character, switched from the side tabs:

1. **Saving:** each build is the talents in the order they were learned (tab, index), kept in the saved variables per character.
   The active build follows every change (CHARACTER_POINTS_CHANGED).
2. **Switching** (out of combat, not in a fight or a group's pull): send `.reset talents` as a chat command (SendChatMessage: not
   protected), wait for the points to come back, then learn the other build point by point in its saved order (tier by tier, so the
   server's checks pass), a short timer between points.
3. **Without GM rights:** the same, after a reset at a class trainer (it costs gold, as the game always charges); the addon then
   offers "Learn Primary build".

## What to watch

- **Action bars:** talent spells leave the bars when unlearned. Saving each build's bar layout with it (as spec-switching addons
  do) and putting it back after the switch covers that; the bar slots are protected, so only out of combat.
- **Pace:** 31 or more LearnTalent calls in a row; send them one at a time and wait for each to land (the points change) rather
  than all at once, so a lost one is retried.
- **Honesty with the player:** it is a switch that resets and relearns, not the server's own dual spec. A switch in a dungeon is
  fine; in combat it waits.

## Effort

Addon side: a few hours (the saving, the switcher with its queue, the side tabs, a confirmation, the action bars). A server-side
dual spec in the Classic core: a real project (days), and it would need the server rebuilt.
