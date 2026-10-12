# Talents, passives and buffs the Character window doesn't show

Session 58 (2026-10-03). The user: “check every single talent and skill from every single class to see what’s missing info for the
player”, then “items and food buffs etc might also be missing”. This is the audit, from the server’s own data; what to build from it
is the user’s decision (section 4).

## 1. How it was done

- `tools/server-data/talent_audit.py`: every talent (Talent.dbc, 432 across 9 classes) and every class or racial passive (the class
  and Racial skill lines in SkillLineAbility.dbc, 59), each with its effects as the server applies them (the world database’s
  spell_template, triggered spells followed) and its description (Spell.dbc). Aura names from the server’s SpellAuraDefines.h.
- `tools/server-data/talent_coverage.py`: sorts each effect: **shown** (the server sends it, or Forever UI works it out since
  0.235.5), **missing** (a number the player can’t see anywhere), or **the spellbook’s** (it changes one ability: its cost, cast
  time, damage, cooldown, a proc, the ability itself). The appendix is its output.
- Items: every passive Equip: effect (about 4,500, session 58’s earlier survey, docs/specs/stat-tooltips.md section 8) and every
  consumable’s Use: spell (819: food, drink, potions, elixirs, flasks, scrolls).

Of 432 talents at their last rank: **66** change something the sheet shows, **70** change something it doesn’t, **296** belong to
the spellbook (abilities, procs, one spell’s numbers). The 1.14.2 client applies the server’s spell modifiers to the spellbook’s
tooltips, so those are already visible there (to be checked in game).

## 2. The user’s three examples

- **Master of Deception** (Rogue): +15 stealth at 5/5 (Feral Instinct is the same for a druid’s Prowl, and Shadowmeld’s passive
  +5 for night elves). How stealth works on this server (ObjectVisibility.cpp, Unit::IsVisibleForOrDetect): an enemy sees you only
  in front of it, and only within **0.3 yards × (30 + 5 × (its level − 1) + its detection − your stealth)**. Stealth’s ranks
  match their levels, so an enemy **of your level sees you at 7.5 yards**; each level it has above yours adds **1.5 yards**;
  Master of Deception takes **4.5 yards** off; an alerted enemy looks 8% + 1.5 yards further; behind it, never. Forever simplified
  this the same way: a distance. Shown nowhere today.
- **Sleight of Hand** (Rogue): −2% chance to be crit by melee and ranged attacks. Not shown: the Defense tooltip counts only
  Defense’s own crit reduction.
- **Heightened Senses** (Rogue): +6 stealth detection (other rogues and druids show up 1.8 yards further) and −4% chance to be hit
  by spells and ranged attacks. Neither shown.

## 3. What’s missing, by kind

| Kind | Talents and passives | Buffs and items |
|---|---|---|
| **Crit chance of a school** (Critical Mass, Arcane Instability, Holy Specialization, Devastation, Tidal Mastery, Force of Will) and of some spells (Improved Backstab, Improved Overpower…) | 22 | — |
| **Spell hit of a school** (Elemental Precision, Arcane Focus, Shadow Focus, Suppression) | 7 | — |
| **Threat** (stances, forms, Defiance, Silent Resolve, Arcane Subtlety, Healing Grace…) | 16 | Blessing of Salvation |
| **Spell damage %** (Arcane Power, Demonic Sacrifice, Fire Power-like school bonuses) | 8 | — |
| **Crit damage** (Ruin, Ice Shards, Lethality, Impale, Mortal Shots, Vengeance, Elemental Fury) | 7 | — |
| **Damage taken** (Defensive and Berserker Stance, Spell Warding, Elemental Warding…) | 6 | Blessing of Sanctuary, protection potions (absorbs) |
| **Resisting stuns, fears and other effects** (Hardiness, Iron Will, Unbreakable Will, Unyielding Faith, Surefooted) | 5 | Free Action Potion |
| **Against a kind of creature** (Monster and Humanoid Slaying, Murder: damage and crit %) | 4 | Elixir of Demonslaying (gear’s Attack Power already shown since 0.235.6) |
| **Stealth** and **stealth detection** | 3 + 2 | Catseye Elixir, invisibility potions |
| **Chance to be crit** (Sleight of Hand) and **chance to be hit** (Heightened Senses) | 2 | — |
| **Armor penetration** (Serrated Blades) | 1 | — |
| **Spell Power and Healing from Spirit** (Spiritual Guidance: the server adds it per spell, so Spell Power and Bonus Healing don’t include it) | 1 | — |
| **Health Regen** (the Troll’s Regeneration: +10%, and 10% in combat) | 1 | Troll’s Blood potions (read since 0.235.6) |
| **Rage** (Anger Management: 1 rage every 3 sec) | 1 | — |
| Safe fall, mounted speed, reputation (Diplomacy) | 4 | — |

Buffs and consumables that change something already shown (stats, armor, resistances, Attack Power, Spell Power, crit, dodge,
health, mana, speed) are fine: the server sends their result. Those whose numbers Forever UI works out from their text (hit, spell
hit, mana and health a 5 sec, healing) are read since 0.235.5–0.235.6; one wording isn’t yet: Moonkin Aura’s “spell critical
chance”. Food’s Well Fed buffs are stats or mana a 5 sec: covered.

## 4. Proposal (for the user to decide)

1. **Defense’s tooltip, or a small “Avoidance” group**: chance to be crit (Defense’s and Sleight of Hand’s), chance to be hit by
   melee, ranged and spells, damage taken %, resisting stuns and fears.
2. **Spell crit and Spell Hit by school**: the Critical Strike and Spell Hit tooltips list each school that differs (“Fire +6%”).
3. **A Stealth row** (rogues, druids, night elves; hidden for others): “Seen at 7.5 yd” with the tooltip’s simplified rule and
   your detection.
4. **Threat** in the tooltips of the stance, form or school it changes, or a Threat row (“−20% healing threat”).
5. **Done in 0.235.9** (the user: “Start with 5 then work your way down”). **Small fixes to numbers already shown**: Spiritual Guidance in Spell Power and Bonus Healing; the Troll’s Regeneration in
   Health Regen; Slaying talents in the “against” lines; Serrated Blades as armor ignored; Moonkin Aura’s wording.
6. **Crit damage and one spell’s numbers** stay with the spellbook.

### Step 5 as built (0.235.9)

- **Spiritual Guidance**: Spell Power and Bonus Healing + 5% of Spirit a rank (YOUR TOTAL “Gear and Buffs +N Spirit”).
- **The Troll’s Regeneration**: Health Regen out of combat × 1.1; in combat 10% of Spirit’s with the gear’s and buffs’.
- **Slaying**: Monster and Humanoid Slaying (+1% damage and crit damage a rank), Murder (+1% a rank), the Troll’s Beast Slaying
  (+5% against Beasts), in Attack Power’s and Ranged Attack Power’s BONUSES.
- **Serrated Blades**: “−300 Target Armor against your attacks” at 3/3 and level 60 (1.67, 3.34, 5 a level).
- **The buff wordings**: tested against every buff tooltip (Spell.dbc field 147) and item Equip: text (field 138) whose spell
  carries a worked-out aura: 122 of 170 buff texts read (the rest: drinks’ “per second”, places’ auras, one school’s crit, melee
  crit, texts that name only spell damage), 222 of 230 item texts (the rest: test items, one Defense line). Moonkin Aura,
  Songflower, debuffs that lower hit (“Chance to hit reduced by 50%”), Mana Spring, Warchief’s Blessing, Innervate (cast regen and
  Spirit’s regen ×5), Glyph of Deflection; the buffs’ creature bonuses melee only (Elixir of Demonslaying, Holy Mightstone).

## Appendix: every talent and passive whose effect isn’t shown

Generated by `tools/server-data/talent_coverage.py`; the numbers are each talent’s last rank.

#### Crit chance of a school or of some spells (22)

- **Improved Moonfire** (Druid talent, Balance, 5 ranks; at the last): Increases the damage and critical strike chance of your Moonfire spell by 10%.
- **Improved Regrowth** (Druid talent, Restoration, 5 ranks; at the last): Increases the critical effect chance of your Regrowth spell by 50%.
- **Savage Strikes** (Hunter talent, Survival, 2 ranks; at the last): Increases the critical strike chance of Raptor Strike and Mongoose Bite by 20%.
- **Incinerate** (Mage talent, Fire, 2 ranks; at the last): Increases the critical strike chance of your Fire Blast and Scorch spells by 4%.
- **Improved Flamestrike** (Mage talent, Fire, 3 ranks; at the last): Increases the critical strike chance of your Flamestrike spell by 15%.
- **Improved Arcane Explosion** (Mage talent, Arcane, 3 ranks; at the last): Increases the critical strike chance of your Arcane Explosion spell by an additional 6%.
- **Critical Mass** (Mage talent, Fire, 3 ranks; at the last): Increases the critical strike chance of your Fire spells by 6%.
- **Arcane Instability** (Mage talent, Arcane, 3 ranks; at the last): Increases your spell damage and critical strike chance by 3%.
- **Divine Favor** (Paladin talent, Holy, 1 rank; at the last): When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance.
- **Inner Focus** (Priest talent, Discipline, 1 rank; at the last): When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25% if it is capable of a critical effect.
- **Force of Will** (Priest talent, Discipline, 5 ranks; at the last): Increases your spell damage by 5% and the critical strike chance of your offensive spells by 5%.
- **Holy Specialization** (Priest talent, Holy, 5 ranks; at the last): Increases the critical effect chance of your Holy spells by 5%.
- **Cold Blood** (Rogue talent, Assassination, 1 rank; at the last): When activated, increases the critical strike chance of your next Sinister Strike, Backstab, Ambush, or Eviscerate by 100%.
- **Improved Backstab** (Rogue talent, Combat, 3 ranks; at the last): Increases the critical strike chance of your Backstab ability by 30%.
- **Improved Ambush** (Rogue talent, Subtlety, 3 ranks; at the last): Increases the critical strike chance of your Ambush ability by 45%.
- **Call of Thunder** (Shaman talent, Elemental, 5 ranks; at the last): Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 6%.
- **Elemental Mastery** (Shaman talent, Elemental, 1 rank; at the last): When activated, this spell gives your next Fire, Frost, or Nature damage spell a 100% critical strike chance and reduces the mana cost by 100%.
- **Tidal Mastery** (Shaman talent, Restoration, 5 ranks; at the last): Increases the critical effect chance of your healing and lightning spells by 5%.
- **Devastation** (Warlock talent, Destruction, 5 ranks; at the last): Increases the critical strike chance of your Destruction spells by 5%.
- **Improved Searing Pain** (Warlock talent, Destruction, 5 ranks; at the last): Increases the critical strike chance of your Searing Pain spell by 10%.
- **Improved Overpower** (Warrior talent, Arms, 2 ranks; at the last): Increases the critical strike chance of your Overpower ability by 50%.
- **Improved Flash of Light** (Holy class passive): Increases the critical effect chance of your Flash of Light spell by 6%.

#### Threat (16)

- **Subtlety** (Druid talent, Restoration, 5 ranks; at the last): Reduces the threat generated by your Healing spells by 20%.
- **Improved Tranquility** (Druid talent, Restoration, 2 ranks; at the last): Reduces threat caused by Tranquility by 100%.
- **Arcane Subtlety** (Mage talent, Arcane, 2 ranks; at the last): Reduces your target's resistance to all your spells by 10 and reduces the threat caused by your Arcane spells by 40%.
- **Burning Soul** (Mage talent, Fire, 2 ranks; at the last): Gives your Fire spells a 70% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 30%.
- **Frost Channeling** (Mage talent, Frost, 3 ranks; at the last): Reduces the mana cost of your Frost spells by 15% and reduces the threat caused by your Frost spells by 30%.
- **Silent Resolve** (Priest talent, Discipline, 5 ranks; at the last): Reduces the threat generated by your spells by 20%.
- **Shadow Affinity** (Priest talent, Shadow, 3 ranks; at the last): Reduces the threat generated by your Shadow spells by 25%.
- **Improved Fire Totems** (Shaman talent, Elemental, 2 ranks; at the last): Reduces the delay before your Fire Nova Totem activates by 2 sec. and decreases the threat generated by your Magma Totem by 50%.
- **Healing Grace** (Shaman talent, Restoration, 3 ranks; at the last): Reduces the threat generated by your healing spells by 15%.
- **Defiance** (Warrior talent, Protection, 5 ranks; at the last): Increases the threat generated by your attacks by 15% while in Defensive Stance.
- **Battle Stance Passive** (Warrior class passive): Decreases threat generated by 20%.
- **Rogue Passive (DND)** (Rogue class passive): Decreases threat generated by 29%.
- **Cat Form (Passive)** (Druid class passive): 
- **Bear Form (Passive2)** (Druid class passive): 
- **Berserker Stance Passive** (Warrior class passive): Increases crit chance by 3%. Increases all damage taken by 10%. Decreases threat generated by 20%.
- **Defensive Stance Passive** (Warrior class passive): Decreases damage taken from all sources by 10%. Decreases damage caused by 10%. Increases threat generated by 30%.

#### Spell damage % (8)

- **Bestial Wrath** (Hunter talent, Beast Mastery, 1 rank; at the last): Send your pet into a rage causing 50% additional damage for $d. While enraged, the beast does not feel pity or remorse or fear and it cannot be stopped unless killed.
- **Ranged Weapon Specialization** (Hunter talent, Marksmanship, 5 ranks; at the last): Increases the damage you deal with ranged weapons by 5%.
- **Wand Specialization** (Mage talent, Arcane, 2 ranks; at the last): Increases your damage with Wands by 25%.
- **Sanctity Aura** (Paladin talent, Retribution, 1 rank; at the last): Increases Holy damage done by party members within $a1 yards by 10%. Players may only have one Aura on them per Paladin at any one time.
- **Wand Specialization** (Priest talent, Discipline, 5 ranks; at the last): Increases your damage with Wands by 25%.
- **Power Infusion** (Priest talent, Discipline, 1 rank; at the last): Infuses the target with power, increasing their spell damage and healing by 20%. Lasts $d.
- **Shadowform** (Priest talent, Shadow, 1 rank; at the last): Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%. However, you may not cast Holy spells while in this form.
- **Defensive Stance Passive** (Warrior class passive): Decreases damage taken from all sources by 10%. Decreases damage caused by 10%. Increases threat generated by 30%.

#### Crit damage (7)

- **Vengeance** (Druid talent, Balance, 5 ranks; at the last): Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 100%.
- **Mortal Shots** (Hunter talent, Marksmanship, 5 ranks; at the last): Increases your ranged weapon critical strike damage bonus by 30%.
- **Ice Shards** (Mage talent, Frost, 5 ranks; at the last): Increases the critical strike damage bonus of your Frost spells by 100%.
- **Lethality** (Rogue talent, Assassination, 5 ranks; at the last): Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 30%.
- **Elemental Fury** (Shaman talent, Elemental, 1 rank; at the last): Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%.
- **Ruin** (Warlock talent, Destruction, 1 rank; at the last): Increases the critical strike damage bonus of your Destruction spells by 100%.
- **Impale** (Warrior talent, Arms, 2 ranks; at the last): Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 20%.

#### Spell hit of a school (7)

- **Trap Mastery** (Hunter talent, Survival, 2 ranks; at the last): Decreases the chance enemies will resist trap effects by 10%.
- **Improved Feign Death** (Hunter talent, Survival, 2 ranks; at the last): Reduces the chance your Feign Death ability will be resisted by 4%.
- **Arcane Focus** (Mage talent, Arcane, 5 ranks; at the last): Reduces the chance that the opponent can resist your Arcane spells by 10%.
- **Elemental Precision** (Mage talent, Frost, 3 ranks; at the last): Reduces the chance that the opponent can resist your Frost and Fire spells by 6%.
- **Shadow Focus** (Priest talent, Shadow, 5 ranks; at the last): Reduces your target's chance to resist your Shadow spells by 10%.
- **Suppression** (Warlock talent, Affliction, 5 ranks; at the last): Reduces the chance for enemies to resist your Affliction spells by 10%.
- **Improved Enslave Demon** (Warlock talent, Demonology, 5 ranks; at the last): Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 10% and reduces the resist chance by 10%.

#### Damage taken (6)

- **Spell Warding** (Priest talent, Holy, 5 ranks; at the last): Reduces all spell damage taken by 10%.
- **Shadowform** (Priest talent, Shadow, 1 rank; at the last): Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%. However, you may not cast Holy spells while in this form.
- **Elemental Warding** (Shaman talent, Elemental, 3 ranks; at the last): Reduces damage taken from Fire, Frost and Nature effects by 10%.
- **Stormstrike** (Shaman talent, Enhancement, 1 rank; at the last): Gives you an extra attack. In addition, the next 2 sources of Nature damage dealt to the target are increased by 20%. Lasts $d.
- **Berserker Stance Passive** (Warrior class passive): Increases crit chance by 3%. Increases all damage taken by 10%. Decreases threat generated by 20%.
- **Defensive Stance Passive** (Warrior class passive): Decreases damage taken from all sources by 10%. Decreases damage caused by 10%. Increases threat generated by 30%.

#### Resisting stuns, fears and other effects (5)

- **Surefooted** (Hunter talent, Survival, 3 ranks; at the last): Increases hit chance by 3% and increases the chance movement impairing effects will be resisted by an additional 15%.
- **Unyielding Faith** (Paladin talent, Holy, 2 ranks; at the last): Increases your chance to resist Fear and Disorient effects by an additional 10%.
- **Unbreakable Will** (Priest talent, Discipline, 5 ranks; at the last): Increases your chance to resist Stun, Fear, and Silence effects by an additional 15%.
- **Iron Will** (Warrior talent, Protection, 5 ranks; at the last): Increases your chance to resist Stun and Charm effects by an additional 15%.
- **Hardiness** (Orc Racial racial passive): Chance to resist Stun effects increased by an additional 25%.

#### Against a kind of creature (4)

- **Monster Slaying** (Hunter talent, Survival, 3 ranks; at the last): Increases all damage caused against Beasts, Giants and Dragonkin targets by 3% and increases critical damage caused against Beasts, Giants and Dragonkin targets by an additional 3%.
- **Humanoid Slaying** (Hunter talent, Survival, 3 ranks; at the last): Increases all damage caused against Humanoid targets by 3% and increases critical damage caused against Humanoid targets by an additional 3%.
- **Murder** (Rogue talent, Assassination, 2 ranks; at the last): Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 2%.
- **Beast Slaying** (Racial - Troll racial passive): Damage dealt versus Beasts increased by 5%.

#### Stealth (3)

- **Feral Instinct** (Druid talent, Feral Combat, 5 ranks; at the last): Increases threat caused in Bear and Dire Bear Form by 15% and reduces the chance enemies have to detect you while Prowling.
- **Master of Deception** (Rogue talent, Subtlety, 5 ranks; at the last): Reduces the chance enemies have to detect you while in Stealth mode. More effective than Master of Deception (Rank 4).
- **Shadowmeld Passive** (Night Elf Racial racial passive): 

#### Safe fall (2)

- **Safe Fall** (Rogue class passive): Reduces damage from falling.
- **Feline Grace** (Druid class passive): Reduces damage from falling.

#### Stealth detection (2)

- **Heightened Senses** (Rogue talent, Subtlety, 2 ranks; at the last): Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 4%. More effective than Heightened Senses (Rank 1).
- **Detect Traps** (Rogue class passive): Greatly increased chance to detect traps.

#### Armor penetration (1)

- **Serrated Blades** (Rogue talent, Subtlety, 3 ranks; at the last): Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 30%. The amount of Armor reduced increases with your level.

#### Chance to be crit (1)

- **Sleight of Hand** (Rogue talent, Subtlety, 2 ranks; at the last): Reduces the chance you are critically hit by melee and ranged attacks by 2% and increases the threat reduction of your Feint ability by 20%.

#### Chance to be hit (1)

- **Heightened Senses** (Rogue talent, Subtlety, 2 ranks; at the last): Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 4%. More effective than Heightened Senses (Rank 1).

#### Health Regen (1)

- **Regeneration** (Racial - Troll racial passive): Health regeneration rate increased by 10%. 10% of total Health regeneration may continue during combat.

#### Mounted speed (1)

- **Pursuit of Justice** (Paladin talent, Retribution, 2 ranks; at the last): Increases movement and mounted movement speed by 8%. This does not stack with other movement speed increasing effects.

#### Rage (1)

- **Anger Management** (Warrior talent, Arms, 1 rank; at the last): Increases the time required for your rage to decay while out of combat by 30%.

#### Reputation (1)

- **Diplomacy** (Racial - Human racial passive): Reputation gains increased by 10%.

#### Spell Power and Healing from Spirit (1)

- **Spiritual Guidance** (Priest talent, Holy, 5 ranks; at the last): Increases spell damage and healing by up to 25% of your total Spirit.


## 5. Steps 1–4 as built (0.235.10, the user’s choices)

- **Avoidance in the Defense tooltip** (BONUSES, each with its source): Sleight of Hand (−1% to be crit a rank), Heightened Senses
  (−2% to be hit by ranged and spells a rank), Defensive Stance −10% and Berserker Stance +10% damage taken, Shadowform −15%
  physical, Spell Warding −2% a rank, Elemental Warding −4/7/10% Fire, Frost, Nature; resisting effects: Iron Will (stun, charm
  3% a rank), Unbreakable Will (stun, fear, silence 3%), Unyielding Faith (fear, disorient 5%), Surefooted (slowing, rooting 5%),
  the Orc’s Hardiness (stun 25%).
- **Crit and hit by school** in the Critical Strike and Spell Hit tooltips (“+6% Fire spells”, the talent grey under it); the rows
  take the best school-wide one (Critical Mass, Arcane Instability, Holy Specialization, Force of Will, Tidal Mastery, Devastation,
  Holy Power; Elemental Precision, Arcane Focus, Shadow Focus, Suppression), so a Fire mage’s Spell Hit row shows.
- **A Stealth row** in General after Movement Speed (rogues with Stealth, druids with Prowl, every Night Elf): “3.0 yd”, how near an
  enemy of your level gets; the tooltip: your level’s and 3 above, never from behind, the sources (a rank’s strength: its points +
  5 a level up to its last; Master of Deception and Feral Instinct +3 a rank = 0.9 yd; Shadowmeld’s passive +5), Heightened Senses’
  detection, “+1 Enemy level = +1.5 yd”, alert enemies 8% + 1.5 yd further, seen by all while attacked. Never nearer than 1.5 yd
  (“Touching”: Shadowmeld against your own level).
- **A Threat row** at the end of Modifiers (shown when anything changes it): all threat, the server’s way (each multiplies:
  Defensive Stance +30% × Defiance 5/5 +15% = +49.5%); the tooltip lists every source, the school-only ones too (Arcane Subtlety,
  Burning Soul, Frost Channeling, Shadow Affinity, Silent Resolve, Healing Grace, Subtlety, Improved Tranquility, Improved Fire
  Totems), and the buffs (Blessing of Salvation −30%, Righteous Fury +60% Holy).
- **Block Chance** (0.235.11, the user asked): the server sends it (5% base + MOD_BLOCK_PERCENT + Defense’s 0.04% a point
  above your level’s; Player::UpdateBlockPercentage), shown with a shield; its tooltip’s YOUR TOTAL now splits it: “5% Base +5%
  Talents +2% Gear and Buffs” (Shield Specialization 1% a rank for warriors and shamans; Holy Shield, Redoubt and Equip: lines in
  the rest).

## 6. Found while checking in game (0.235.12–0.235.13)

- **Wands** (the user’s Doomfinger): the Ranged tooltip spoke of bows and an 8-yard minimum. Now by the ranged item’s subclass:
  a wand’s words (“It shoots bolts of magic”, no ammo, 0 to 30 yards: Shoot’s range 4), its school off its tooltip (“Shadow
  Damage”), Wand Specialization (Mage 12.5% a rank, Priest 5%); a throwing weapon’s own words (Throw: 8 to 30). The numbers were
  right: (146 + 27 RAP ÷ 14 × 1.5) × 1.25 Wand Specialization = 186 (the server adds Ranged Attack Power to wands too).
- **Threat “+0%”**: a mage with only Arcane Subtlety; the row now names the school when all threat is unchanged (“−40% Arcane”).
- **A grey condition line ran past the box** (the Troll’s Health Regen): conditions now wrap at the box’s width and count in it;
  the Troll’s YOUR TOTAL shows Regeneration as its own part (“72 Spirit +7 Regeneration +6 Gear”), the condition shortened.
- **Deadliness** (Rogue, 2% a rank): the server sends melee Attack Power’s % apart (UNIT_FIELD_ATTACK_POWER_MULTIPLIER) and
  HermesProxy passes on only the ranged one (UpdateHandler.cs), so the game’s melee Attack Power lacked it; Forever UI adds it
  (ns.PlayerAttackPower; YOUR TOTAL “+N Deadliness”). The damage was always right (the server’s weapon damage has it). A proxy
  patch translating the melee multiplier would fix it at the source.
- **“Wands” for the ranged row** (0.235.15, the user: “Ranged” misleads the classes that only shoot wands): with a wand in the
  ranged slot the row and its tooltip say **Wands** (ns.RangedLabel); the tooltip’s first line “A ranged attack for spellcasters.”
- **Health, Mana, Health Regen, Mana Regen** again (0.235.14: the user switched them back).
- **“Your class’s other gear”** in the Help window’s GM tab, under Tier Sets (0.235.15): a necklace, a cloak, two rings, two
  trinkets and weapons for the class (a shield, a wand, a bow, a crossbow with a quiver and arrows), picked from the world database
  to show the sheet’s numbers: hit and crit (Onyxia Tooth Pendant, Don Julio’s Band, Band of Accuria), spell hit and crit (Band of
  Forced Concentration, Eye of the Beast), healing and mana a 5 sec (Cauterizing Band, Rosewine Circle, Mindtap Talisman), health a
  5 sec (Green Dragonskin Cloak, Fluctuating Cloak), spell penetration (Veil of Eclipse, Ring of Swarming Thought, Malice Stone
  Pendant), block (Drillborer Disk, Malistar’s Defender), against undead and demons (Seal of the Dawn, Mark of the Champion), use
  and proc effects (Talisman of Ephemeral Power, Darkmoon Card: Blue Dragon, Hand of Justice). Help.lua’s GEAR lists each item.
- **Arcane Meditation** (0.235.16, the user asked): the number was right (5% a rank, 15% at 3/3 of Spirit’s Mana Regen kept while
  casting, Player::UpdateManaRegen), but the tooltip didn’t name it and its DID YOU KNOW said Spirit’s regen stops. Now COMES FROM
  names the class’s talent (Meditation, Arcane Meditation, Reflection) and the gear’s and buffs’ share apart, and DID YOU KNOW says
  it drops to that share.
- **Ranged Attack Power hidden for mages, priests and warlocks** (0.235.17, the user: they shoot only wands and never need it).

## 7. Two new categories (0.235.19, the user’s layout)

The user: the resist lines don’t belong in Defense; “2 new categories and adapt a couple of others”, named **Crowd Control** and
**Awareness**. The Character window’s stats now: General (Health, Mana, Health Regen, Mana Regen, Movement Speed), Primary
Attributes, Weapons, Modifiers (+ **Pushback Resist**), Defense (its tooltip: chance to be crit or hit, damage taken), **Crowd
Control** (Stun, Fear, Silence, Charm, Disorient, Slow, Root Resist: the talents’, the Orc’s Hardiness, gear and buffs’ “chance to
resist X effects”, each with its sources), **Awareness** (Threat from Modifiers, Stealth from General, **Detection**: Heightened
Senses 0.9 yd a rank, Catseye Elixir 3 yd), Resistances. Every new row hidden at 0.

- **Pushback Resist**: the best spell group’s chance to keep casting when hit: Burning Soul (Fire), Improved Arcane Missiles,
  Healing Focus (Priest 35% a rank, Shaman 14%), Spiritual Focus, Nature’s Focus, Improved Entangling Roots, Intensity, Fel
  Concentration (spell modifier 9), Concentration Aura 35% on every spell (RESIST_PUSHBACK, read off the buff).
- **Movement Speed’s tooltip**: Mount Speed by source (Pursuit of Justice 4% a rank, Carrot on a Stick and other Equip: lines), the
  Undead’s breath (Underwater Breathing, 4× longer), Safe Fall (Rogue, Feline Grace).
- Reputation Gain (Human Diplomacy) left for the Reputation window.

## 8. Absorb and Magic Taken (0.235.20), recipes out of the spellbook (0.235.21)

- **Absorb** (Defense, hidden at 0): the shields up and what each has left. 1.14.2 has no API for it and the buffs’ texts carry
  no amount, so each shield is known by its spell ID (52 ranks from spell_template: Fire, Frost and Shadow Ward, Ice Barrier, Mana
  Shield, Power Word: Shield, Sacrifice, the protection potions with their rolls), its amount + Bonus Healing × 10% × the
  low-level penalty for your own (Aura::CalculateAuraEffectValue), Improved Power Word: Shield 5% and Improved Voidwalker 10% a
  rank; then counted down from the combat log’s absorbed amounts on you (the hit’s school’s wards first, Mana Shield for physical,
  then the shields for every school). The tooltip: each shield’s left, of its total, what it guards; Improved Fire Ward and Frost
  Warding’s reflect chance. An estimate: the server’s own order between two shields isn’t known.
- **Magic Taken** (Defense, hidden without it): Amplify Magic (+15 to +75 spell damage taken, +30 to +150 healing received) or
  Dampen Magic (−10 to −90, −20 to −180), by rank.
- **Bonus Healing’s YOUR TOTAL** shows Spiritual Guidance’s Spirit part (found by the study page’s sync).
- **The spellbook** leaves out crafting recipes the client files under General (White Woolen Dress: ns.RecipeSkill’s list; the
  profession window has them), Disenchant kept.
- **The study page** (dbsite/build/win_stat_tooltips.py) now runs StatTooltips.lua for six sample characters: its In game column is
  the game’s tooltips, in Character.lua’s order with Crowd Control and Awareness.
