# Controller templates by class and spec: research and plan

Session 43, 2026-09-30. The user: "prebuilt templates for each class and spec and a way to select it from the interface ... save these
variables by class. It's easier to go from your studies and default setup then refine." Two research passes (web and Forever's
extracted UI code, read-only). Provenance: every creator's or Blizzard's statement below is quoted from its original place (the
video's description or comment, the forum post) with the link; our own reasoning is labelled as ours.

## 1. What we learned

### Blizzard, in WoW Forever
- **No per-class layouts.** Forever places a newly learned spell into the next free slot in a fixed order (FV
  `blizzard_gamepadactionbars/iconintro.lua:3-11`): RT + face, LT + D-pad, LT + face, RT + D-pad, plain D-pad, LT + RT.
- **The plain face buttons are reserved** (`mainactionbarframe.lua:287-499`): A Jump, X Interact, Y Inspect / target menu, B Back
  (stop casting, then clear the target). So a page is 4 plain slots (the D-pad) + 8 (LT) + 8 (RT) + 8 (LT + RT) = **28 slots**, three
  pages. *This corrects our research doc's "four bars of 8".*
- **Stances and forms** swap the bar the `GamepadStanceBarOverride` setting names (the user's shot: the RT bar), not the plain one.
- **Class buttons, added in the beta** (Kaivax, development notes, 2026-09-24, https://us.forums.blizzard.com/en/wow/t/2360696/1):
  a shapeshift flyout for Druids, pet control and pet spell flyouts for Hunters and Warlocks, an aura flyout for Paladins, a stance
  flyout for Warriors (LB + LT and RB + RT in the code, `classactionflyout.lua`); Fixed Party Targeting (the D-pad = party 1-4 outside
  raids); "the pet bar no longer replaces the bottom gamepad action bar".
- **Targeting:** LB the friendly layer (D-pad the party, A self, X pet, B assist, Y marker), RB the hostile one (A last hostile, X a
  ranged attack).
- Paul Kubit (associate game director), interviewed 2026-09-12 (https://screenrant.com/world-of-warcraft-controller-support-blizzcon-answer/):
  retail has "a lot of design questions ... just with the amount of key binds", unlike Classic / Forever.
- Beta feedback (no blue reply): LT / RT as toggles instead of holds, rebinding Jump and Interact, four bars clipping the chat
  (Rynzer, 2026-09-17, https://us.forums.blizzard.com/en/wow/t/controller-feedback/2352898); friendly targeting in groups (Bagel,
  2026-09-19, .../2354929: Blizzard then shipped Fixed Party Targeting); ground-targeted items, bank drag and drop (Helviath,
  2026-09-18, .../2353149).

### Kinzo (https://www.youtube.com/@kinzowow), from his descriptions, posts and his own replies
Captions weren't readable from here: the layouts on screen are only in the videos (section 5 lists the ones to pull).
- Paladin: "Paladin feels made for playing WoW Forever on a controller ... my top pick in the beta" (description of
  https://www.youtube.com/watch?v=-P6drAKEgyM).
- Melee: "Absolutely, melee classes feel great on controller!" (his reply on -P6drAKEgyM, about a combat Rogue).
- Hunter: "hunter pets can be a bit tricky to manage on controller!"; Warlock: "Dotting should not be a problem but I gotta check how
  to control pets" (his replies on -P6drAKEgyM).
- Pets: a video titled "Pet Control on Controller Needs Work" (https://www.youtube.com/watch?v=s9QEU18qDnc), its description
  "a workaround for an issue I ran into ... what Blizzard still needs to fix"; on the flyout's RB + RT chord: "I hope we will get a
  customization possibility" (his reply there).
- Warrior: "macros will definitely be essential to get stances feeling smooth on controller." (reply on s9QEU18qDnc).
- Healing: "when holding L1 in a party your dpad becomes the switch between the raid frames" (reply on
  https://www.youtube.com/watch?v=fh0v812g2N4); healing on a pad "not impossible but for sure the inferior way" (reply on
  https://www.youtube.com/watch?v=nrqkvilmy-w); "40man raids will be hard for sure" and "I'm working on a new healing profile setup"
  (replies on -P6drAKEgyM).
- Tanking: raid markers are "the next big step to master for controller tanking" (reply on nrqkvilmy-w).
- Camera zoom: "hold LB and RB at the same time and move the R stick up or down" (reply on https://www.youtube.com/watch?v=EJ5hX4slvOc).
- He plans guides and a tier list for every class (replies on fh0v812g2N4, s9QEU18qDnc, -P6drAKEgyM).

### ConsolePort (the controller addon)
- Seeds one layout per *device*, not per class (`ConsolePort/Model/Gamepad/Xbox/Xbox.lua`, its generator); puts the main bar
  (ACTIONBUTTON1-12) on the easiest buttons so stances, forms and stealth page it by themselves; a Pet Ring for the pet bar; its wiki:
  "start with the default binding layout, and then customise from there" (https://github.com/seblindfors/ConsolePort/wiki/1.-Instructions).
- So **nobody ships per-class templates**: ours would be new.

## 2. Classes and specs on a controller

**From the sources:** Paladin the easiest (Kinzo); melee easy (Kinzo); pets hard (Kinzo, and Blizzard's added flyouts for Hunter and
Warlock); healing and raid healing hard (Kinzo; Bagel's thread); stances need macros (Kinzo). Blizzard's flyouts mark Druid,
Hunter, Warlock, Paladin and Warrior as the classes that need extra buttons.

**Our ranking for vanilla (our reasoning, built on the above):**

| | Class / spec | Why |
|---|---|---|
| Easiest | **Retribution Paladin** | Few buttons (Seal, Judgement, Hammer of Justice, Consecration, Exorcism); no pet, no paging; Kinzo's top pick |
| | **Combat Rogue** | Sinister Strike, Eviscerate, Slice and Dice, Kick, Blade Flurry; stealth pages the bar by itself (page 7) |
| | **Arms / Fury Warrior** | A short melee loop; stances page the bar (7, 8, 9): each stance fits on its own page |
| | **Frost Mage (levelling)** | Frostbolt, Nova, Cone of Cold, Blink: a small loop; no pet |
| | **Protection Paladin** | Few buttons; Kinzo tanks on it (nrqkvilmy-w); markers are the weak spot |
| Middle | Shadow Priest, Enhancement / Elemental Shaman, Protection Warrior, Feral Druid, Beast Mastery Hunter (with the pet layer) | More buttons; totems (four elements); taunts and target swaps; two paged forms plus caster heals; a pet |
| Hardest | **Every healer** (Holy / Discipline Priest, Restoration Druid / Shaman, Holy Paladin) | Party targeting and mouseover; raid healing |
| | **Affliction / Demonology Warlock** | Many DoTs and curses plus a pet with its own spells |
| | **Marksmanship / Survival Hunter** | Pet, aspects, traps, the melee dead zone |
| | **Fire / Arcane Mage in groups, Balance Druid** | Ground-targeted AoE (Blizzard, Flamestrike, Hurricane) and many situational spells (portals, conjures) |

## 3. What a template is

1. **A binding map** (shared by all classes): which pad chord presses which action button. After Forever's, adapted to 1.14.2:
   - Plain: A Jump; B "Back" (a macro: /stopcasting, then /cleartarget); X Interact (INTERACTTARGET); Y target nearest enemy
     (1.14.2 has no target menu); the D-pad = 4 slots.
   - LT held (Shift) = 8 slots (D-pad + face); RT held (Ctrl) = 8; LT + RT (Ctrl-Shift) = 8.
   - LB held (Alt, GamePadEmulateAlt = PADLSHOULDER): the friendly layer: the D-pad = party 1-4, A self, X pet, B assist, Y focus/marker.
   - RB: the hostile layer (nearest enemy, last hostile).
   - The class buttons: LB + LT and RB + RT (Alt-Shift / Alt-Ctrl chords) = the stance / form / aura bar (SHAPESHIFTBUTTON) or
     the pet commands and pet spells (BONUSACTIONBUTTON).
   - **The bar that pages:** in 1.14.2 only ACTIONBUTTON1-12 follow stances / forms / stealth. As Forever pages the RT bar, bind
     CTRL- (RT + face and D-pad) to ACTIONBUTTON1-8: a Warrior's RT bar changes with his stance.
2. **Placements** (per class and spec): which spell goes in which slot, by spell id (all ranks: the highest known), for page 1
   and the stance pages (Warrior 7-9, Druid Cat 7 / Bear 9, Rogue Stealth 7), placed with PickupSpell + PlaceAction out of combat.
   Spells not learned yet are skipped and placed when learned (LEARNED_SPELL_IN_TAB), Forever's push order for anything else.
   A few macros where they're the only way (heals at mouseover / party, pet attack, "Back"): as few as possible (the macro cap).
3. **Settings** per spec where they help: GamePadCursorForTargeting for ground-targeted spells (mages, healers), face angles.

Draft template contents (core slots per spec): the research report's table, kept in this doc's appendix (section 6) to fill in
spec by spec.

## 4. Plan

**The user's decisions (2026-09-30):**
- **Forever's face buttons:** A Jump, B Back (stop casting, then clear the target), X Interact, Y target (1.14.2 has no target menu);
  the plain D-pad the 4 plain slots, the rest on LT / RT / LT + RT.
- **Set it at level 1 and forget it until 30-40:** "All new skills should already have a button mapped so you don't have to keep
  dragging new skills to buttons. That's why per spec basis is nice." So a template maps **every spell the spec learns from 1 to
  60** to its slot in advance; a spell learned (LEARNED_SPELL_IN_TAB, SPELLS_CHANGED) goes straight into its slot (out of combat;
  queued in one), and the game's own automatic placing of new spells is kept out of the template's slots. The slots are ordered by
  the level a spell comes at, so the early game's buttons are the easiest ones and the layout only grows.


**Saved by class** (the user): `ns.db.padTemplates[CLASS] = { spec = "fury", applied = <time>, changes = { slot = action } }`,
account-wide by class (every Warrior shares it); the player's own changes kept as a diff on top of the template, so a template can be
re-applied or improved without losing them. The action bars as they were kept once (`ns.db.padBarsKept[character]`) to put back.

**Steps** (each: preview first, tests, then the game):
1. **Browser preview** of the Controller view with a template picker: "Layout: Warrior ▾ Fury ▾ [Preview] [Apply]"; the pad cards
   showing each button's spell icon and name for the chosen spec; a Horde and an Alliance character of that class.
2. **The binding map** (Gamepad.lua): the reserved face buttons, the four layers, LB friendly / RB hostile, the class buttons, the
   RT bar paging; `/fui gamepad forever` becomes this map. Test in game with the DualSense: Warrior stances, a Hunter's pet.
3. **Templates as data** (a new PadTemplates.lua): 9 classes x 3 specs, the core slots by spell id, the stance pages; written from
   section 6, checked against the 1.14.2 spell data (spell ids and ranks from the client's Spell tables).
4. **Apply** in the Controller view: picks the player's class, a spec dropdown (the talent tree with most points first), a preview
   on the cards (the spells' icons), Apply (out of combat; the bars kept first), Put Back.
5. **Refine and save:** the player's changes after Apply recorded per class; "Reset to template"; an Options row to turn LT / RT into
   toggles (a beta request: Rynzer).
6. **Pet classes and healers:** the pet layer (commands and pet spells on the class buttons) and the healer's party layer with
   mouseover macros, tested in a dungeon with the bots.

## 5. For the user

- **Captions to pull with DownSub** (English auto-captions only; the layouts on screen will also need screenshots):
  1. https://www.youtube.com/watch?v=s9QEU18qDnc (pet control and the workaround)
  2. https://www.youtube.com/watch?v=Xn10q2E2Wew (movement: strafing, face angles)
  3. https://www.youtube.com/watch?v=-P6drAKEgyM (why Paladin; likely his Paladin layout)
  4. https://www.youtube.com/watch?v=fh0v812g2N4 (the new Gamepad settings, healing and targeting)
  5. https://www.youtube.com/watch?v=nrqkvilmy-w (Paladin tanking)
  6. https://www.youtube.com/watch?v=EJ5hX4slvOc, https://www.youtube.com/watch?v=Eeut5eLPskE,
     https://www.youtube.com/watch?v=15zlaa-A_y8 (first impressions; his ConsolePort setup)
- **To check in game** before the templates ship: Moonkin and Shadowform paging (`/run print(GetBonusBarOffset())` in each form),
  whether the Paladin's auras sit on the stance bar in 1.14.2, GamePadCursorForTargeting with Blizzard / Flamestrike.

## 6. Appendix: core slots per class and spec (draft, our synthesis; to verify)

| Class / spec | Core slots | Paging and layers | Pet |
|---|---|---|---|
| Warrior Arms / Fury / Prot | Arms: Mortal Strike, Overpower, Rend, Heroic Strike, Charge, Hamstring, Execute, Thunder Clap. Fury: Bloodthirst, Whirlwind, Heroic Strike, Execute, Intercept, Pummel. Prot: Sunder Armor, Revenge, Shield Block, Taunt, Shield Bash / Slam, Demoralizing Shout | Pages 7 (Battle), 8 (Defensive), 9 (Berserker) each filled; stances on the class button; unpaged: Battle Shout, Bloodrage, Berserker Rage, potions | none |
| Rogue Assassination / Combat / Subtlety | Sinister Strike or Backstab, Eviscerate, Slice and Dice, Kick, Gouge, Kidney Shot, Evasion, Sprint (+ Cold Blood / Blade Flurry / Hemorrhage) | Page 7 (Stealth): Cheap Shot, Ambush, Garrote, Sap, Pick Pocket, Distract, Premeditation; unpaged: Vanish, Blind, poisons, Feint | none |
| Druid Balance / Feral / Restoration | Caster: Wrath, Starfire, Moonfire, Entangling Roots, Rejuvenation, Regrowth, Healing Touch, Insect Swarm. Cat (page 7): Claw, Shred, Rake, Rip, Ferocious Bite, Prowl, Tiger's Fury, Ravage / Pounce. Bear (page 9): Maul, Swipe, Growl, Demoralizing Roar, Bash, Enrage, Feral Charge, Frenzied Regeneration | Forms on the class button; unpaged: Innervate, Rebirth, Mark / Thorns, cures, Faerie Fire; Restoration: mouseover heals | none |
| Paladin Holy / Protection / Retribution | Holy: Flash of Light, Holy Light, Holy Shock, Cleanse, Blessing of Protection, Lay on Hands. Prot: Holy Shield, Consecration, Righteous Fury, Judgement. Ret: Seal of Command, Judgement, Hammer of Justice, Exorcism, Consecration, Repentance | No paging; auras on the class button; seals and blessings on a layer or mouseover macros | none |
| Hunter Beast Mastery / Marksmanship / Survival | Auto Shot, Arcane Shot, Serpent Sting, Hunter's Mark, Concussive Shot, Multi-Shot, Aimed Shot (MM); Raptor Strike, Mongoose Bite, Wing Clip (melee) | No paging; aspects, traps, Feign Death, Disengage, Bestial Wrath / Intimidation on layers | Attack, Follow, Stay and the modes on the class button (the pet bar); Mend, Feed, Revive, Call on a low layer |
| Warlock Affliction / Demonology / Destruction | Shadow Bolt, Corruption, Immolate, the chosen Curse, Life Tap, Drain Life, Fear, Death Coil (+ Siphon Life / Shadowburn / Conflagrate) | No paging; other curses, Drain Soul, Howl of Terror, Health Funnel, stones and summons on layers | As the Hunter; the pet's spells (Spell Lock, Sacrifice, Seduction, Torment) on the pet bar |
| Priest Discipline / Holy / Shadow | Heal: Flash Heal, Greater Heal, Renew, Power Word: Shield, Dispel Magic, Cure Disease, Prayer of Healing, Fade. Shadow: Mind Blast, Shadow Word: Pain, Mind Flay, Vampiric Embrace, Psychic Scream, Silence, Shadowform, Power Word: Shield | Shadowform paging to check; heals as mouseover / party macros with the LB layer; buffs on a layer | none |
| Shaman Elemental / Enhancement / Restoration | Ele: Lightning Bolt, Chain Lightning, Earth / Flame / Frost Shock, Elemental Mastery. Enh: Stormstrike, the shocks, Lightning Shield, Windfury Weapon. Resto: Healing Wave, Lesser Healing Wave, Chain Heal, Purge, cures | No paging; **totems on one layer, the D-pad's direction the element** (our idea: up Air, down Earth, left Fire, right Water; the face buttons the second totem of each) | none |
| Mage Arcane / Fire / Frost | Frost: Frostbolt, Frost Nova, Cone of Cold, Blink, Counterspell, Polymorph, Fire Blast, Ice Barrier. Fire: Fireball, Scorch, Fire Blast, Pyroblast, Blast Wave, Combustion. Arcane: Arcane Missiles, Arcane Explosion, Presence of Mind, Arcane Power | No paging; ground-targeted spells with the pad's cursor; conjures, portals, armors, Evocation, Ice Block, Remove Curse on a layer | none |
