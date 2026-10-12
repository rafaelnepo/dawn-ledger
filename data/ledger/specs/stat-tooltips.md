# The attribute tooltips: information architecture

Study of 2026-10-03 (session 57), from the user's report: some character-sheet tooltips have double spaces between lines (Spirit,
Critical Strike, Attack Power, Ranged Attack Power), and the attributes need one standard. Source: `addons/ForeverUI/StatTooltips.lua`
(28 tooltips: 23 of the player's, 5 of the pet's). Preview of the options: http://127.0.0.1:8777/dbsite/mockups/stat-tooltips/
(`dbsite/build/win_stat_tooltips.py`).

## 1. Why it looks messy today

- **The double space** is `gap()`: a whole blank line (`AddLine(" ")`, 12 px Friz plus the 2 px spacing) between parts. A
  tooltip with five parts has four of them, and Spirit and Critical Strike put one between lines of the same kind.
- **The notes wrap early** and are balanced into two short lines (“Mana Regeneration from Spirit is / halted for 5 sec…”),
  so a one-sentence note looks like a paragraph.
- **The same kind of line is written five ways**: “Increased by [Agility]”, “Maximum increased by [Stamina]”, “Increased by
  [Defense]; Block Value by [Strength]”, “Increased by [Agility] for Attacks”, and none at all (Spell Power, Hit Chance).
- **Rules and curiosities are mixed**: “Every 14 Attack Power adds 1 DPS” (a conversion) sits in the same grey as “Periodic
  effects cannot critically strike” (a mechanic) and “Damage reduction from Armor cannot exceed 75.00%” (a cap).
- **Some effects are sentences** (Defense: one line of 30 words), others are short lines.

## 2. The kinds of information (every tooltip, line by line)

Seven kinds, always in this order. Each is optional; a tooltip has the ones it needs.

| # | Kind | What it answers | Example |
|---|---|---|---|
| 1 | **Title** | what and how much | Spirit 110 (70+40) |
| 2 | **Definition** | what it is, for the stats that aren't self-evident | Resource used to cast Spells and Abilities |
| 3 | **Effects** | what it gives you, with numbers | Increases Mana Regeneration by 92 per 5 sec |
| 4 | **Breakdown** | a table of figures | Attack Speed 2.80 · Damage 57–59 · DPS 20.7 |
| 5 | **Sources** | what raises it | From Agility (attacks) and Intellect (spells) |
| 6 | **Rules** | how it converts, its caps and requirements | Every 14 Attack Power adds 1 DPS · Cannot exceed 75% · Requires a shield |
| 7 | **Notes** | situations and curiosities | Halted for 5 sec after spending Mana · Periodic effects cannot critically strike |

## 3. The inventory

| Tooltip | Definition | Effects | Breakdown | Sources | Rules | Notes |
|---|---|---|---|---|---|---|
| Strength | | Attack Power; Block Value (warriors, paladins, shamans) | | | | |
| Agility | | Dodge, Armor, Crit Chance, Attack Power, Ranged Attack Power | | | | |
| Stamina | | Health | | | | |
| Intellect | | Mana, Spell Crit Chance (mana users); Weapon Skill improvement rate | | | | |
| Spirit | | Health Regeneration (out of combat); Mana Regeneration (not casting) | | | | halted 5 sec after spending Mana; +50% Health Regeneration sitting |
| Health | used for taking damage; death at 0 | | | Maximum: Stamina; Regeneration: Spirit | every 1 Stamina adds 10 Health | replenishes out of combat |
| Mana / Rage / Energy | resource for Spells and Abilities | | | Maximum: Intellect; Regeneration: Spirit (mana) · dealing and taking damage (rage) | every 1 Intellect adds 15 Mana · 20 Energy every 2 sec | regenerates 5 sec after spending · rage decays out of combat |
| Movement Speed | | | Run, Swim (now); base speeds: run, swim, backpedal, walk | | | |
| Main Hand / Off Hand / Ranged | | | Attack Speed, Damage, DPS, weapon skill | | | |
| Attack Power | | Melee Weapon DPS | | Strength, Agility | every 14 adds 1 DPS | |
| Ranged Attack Power | | Ranged Weapon DPS | | Agility | every 14 adds 1 DPS | |
| Hit Chance | | Melee and Ranged hit | | (gear, talents) | every 1% lowers the miss chance by 1% | |
| Critical Strike | | Melee, Ranged, Spell crit chance | | Agility (attacks), Intellect (spells) | attacks +100% damage; spells and heals +50% | periodic effects cannot crit |
| Spell Power / Bonus Healing / Spell Penetration | | spell damage / healing / resistance reduction | | (gear) | | |
| Defense | | Dodge, Block, Parry +x%; to be Hit and Critically Hit −x% | | | 440 Defense: no crits from raid bosses | creature crits deal 200%; Crushing Blows (3+ levels above) 150% |
| Dodge | | chance to dodge | | Agility, Defense | | nullifies the attack; players: from the front only; creatures: any direction |
| Parry | | chance to parry | | Defense | | nullifies the attack and speeds the defender's next swing by 40%; from the front only |
| Block | | chance to block; damage stopped | | Defense (chance), Strength (value) | requires a shield | |
| Armor | | Physical Damage taken −x% | | Agility | cannot exceed 75% | |
| Resistances | improves resistance to its school | average resistance against your level | | | | |
| The pet's Health, Armor, Main Attack, Attack Power, Movement | as the player's | | | | | |

## 4. The standard (proposed; the user chooses the look in the preview)

- **One structure** for every attribute tooltip: Title, then the kinds in the table's order, each kind a block of lines.
- **Blocks are separated by a hairline** (the client's own `Interface\COMMON\UI-TooltipDivider-Transparent`, the divider
  Forever puts inside tooltips), never by a blank line. Lines inside a block have the normal 2 px spacing.
- **One wording per kind**:
  - Effects: “Increases [X] by N” (the stat's key word yellow, the number white); a condition after it in the same line
    (“per 5 sec while not casting”).
  - Breakdown: two columns, the label white on the left, the figure yellow on the right.
  - Sources: one line, “From [Agility] and [Defense]”; a qualifier in brackets after the source (“[Agility] (attacks)”).
  - Rules: short statements, white: “Every 14 Attack Power adds 1 DPS”, “Cannot exceed 75%”, “Requires a shield”.
  - Notes: short statements, white; one line each where it fits the 260 px width (decision 10 of tooltip-styles.md), wrapped
    and balanced only when longer.
- **Colors** (the user's rule, session 57): important information yellow, regular text white, no grey. Buffs green and debuffs
  red in the title, as now; a warning (Raid Bosses) red.
- **Width**: 260 px, as our description tooltips.

The three looks in the preview differ only in how the blocks are marked: (A) hairlines, (B) hairlines with a small label per
block, (C) compact columns (effects as label and figure too).

## 5. The user's choices so far (session 57; refinements still to come: build only when the user says it's ready)

- The structure of section 2 with B's labels and C's compact columns; the friendly words: YOUR TOTAL, WHAT IT IS, BONUSES,
  NUMBERS, COMES FROM, HOW IT WORKS, DID YOU KNOW; the labels white (small capitals).
- Title: the name white, the value gold. YOUR TOTAL, the first block, one line: “70 Base +30 Gear +10 Buffs” (the base gold, the
  bonuses green #20ff20; a part left out when 0). The game: the bonus from UnitStat; the gear part summed from the equipped
  items' stats, the rest buffs.
- BONUSES: number first, the numbers gold and right-aligned in a column flush with the left edge, sized to the widest; units
  after the number (+35.1 DPS); a condition on a small line under the name, slightly grey #bfbfbf.
- COMES FROM: each source on its own line, a qualifier in brackets.
- DID YOU KNOW: green #19ff19, sentences ending with a period, 4 px under each.
- Hairlines: the client's COMMON\UI-TooltipDivider tiled, 6 px above and below each (the groove on rows 3-4 of its tile).
- **The numbers update live in game**: a shown tooltip rebuilds when its stat changes (UNIT_STATS, UNIT_ATTACK_POWER,
  UNIT_RANGED_ATTACK_POWER, COMBAT_RATING-like events, UNIT_AURA, PLAYER_EQUIPMENT_CHANGED, UNIT_RESISTANCES, UNIT_DAMAGE,
  UNIT_ATTACK_SPEED…), or on the tooltip's 0.2 s refresh while its owner is hovered.
- **Contextual by class (and level)** (the user, session 57): every tooltip shows only what applies to the character, with its
  own numbers. HOW IT WORKS' exchange rates come from the class's and level's formulas (StatTooltips.lua's server math: Attack
  Power per Strength and Agility, Ranged Attack Power per Agility, crit and dodge per Agility by class and level, spell crit per
  Intellect, regen per Spirit); a line that doesn't apply to the class is left out, not shown as zero (a warrior sees no Mana or
  spell crit, a hunter no Block Value, a druid's lines change with its form). The study page shows sample characters only.
- **DID YOU KNOW by class** (session 57): a fact that depends on the class reads as the character's own case (“As a Hunter,
  you gain 2 Ranged Attack Power per point”); the lines per class are in `dbsite/build/win_stat_tooltips.py` (`CLASS_TIPS`),
  from StatTooltips.lua's tables. A class with nothing to say gets no line.
- **Simple and Detailed** (session 57): a setting of Forever UI's own, **Simple attribute tooltips** (the Character window's
  settings menu, on its portrait, before Reset window position; off by default), switches the character sheet's tooltips between the detailed ones (every block) and the **simple** ones for experienced players: the title,
  YOUR TOTAL and the figures (BONUSES, NUMBERS) only, without labels; WHAT IT IS, COMES FROM, HOW IT WORKS and DID YOU KNOW
  are left out. The study page shows both columns.
- **Placed beside the row** (session 57): every character-sheet tooltip is anchored to its row's right side and centred on it
  vertically (`SetOwner(row, "ANCHOR_NONE")`, `SetPoint("LEFT", row, "RIGHT", gap, 0)`, clamped to the screen), not at the
  bottom left, so it stays next to the attribute it explains.
- **The next breakpoint in the simple tooltips** (session 57): one line at the bottom where 1.12 has a breakpoint against a
  level 63 raid boss — Defense 440 (no crits), Hit 9% (abilities never miss), Armor 17,265 (the 75% cap), a resistance 315
  (the 75% cap): “66 more Defense for no crits from raid bosses”, the number gold; once reached, a green ✓ and what it gives.
  The other stats have no simple breakpoint and show none.

## 6. Built in 0.235.0 (session 57: “Go deploy in game”)

`addons/ForeverUI/StatTooltips.lua`: the data (each tooltip's title and blocks, from the live numbers) and its drawing in a
frame of ours, `ForeverUIStatTooltip`, in Forever's tooltip box (`ns.ForeverTooltipBox`), with the study's pixels: the title
line 17 tall (Friz 14), a 12 px line 14 tall and 2 apart, a label 10 px (white at 85%) and 1 px under it, a block 3 px + the
hairline's 8 px tile + 3 px, a condition 11 px #bfbfbf, DID YOU KNOW 4 px under each sentence; the text 266 wide, wider for a
line that never wraps (the title, YOUR TOTAL, a formula, the breakpoint; Critical Strike keeps every line whole). Character.lua's
rows open and hide it; it is rebuilt while shown on UNIT_STATS, UNIT_AURA, UNIT_ATTACK_POWER, UNIT_RANGED_ATTACK_POWER,
UNIT_RESISTANCES, UNIT_DAMAGE, UNIT_RANGEDDAMAGE, UNIT_ATTACK_SPEED, UNIT_MAXHEALTH, UNIT_MAXPOWER, UNIT_DISPLAYPOWER,
UNIT_LEVEL, PLAYER_EQUIPMENT_CHANGED, SKILL_LINES_CHANGED, UPDATE_SHAPESHIFT_FORM and CVAR_UPDATE (Movement Speed every 0.2 s:
speed has no event). Tests: `addons/tests/foreverui/03-character.lua` (the order, YOUR TOTAL, a class's lines, simple and
its menu row, the anchor, the live refresh), the class matrix (each class's lines), the skin login test (the pet's).

Next (the user's plan): separate tooltip designs for the skills and for the items, each its own study first; these are the
attributes' only.

What differs from the study, and why:

- **The box fits its text** (0.235.2, the user: “the tooltip should fit the content”): 18 px each side of its widest line,
  the text 300 at most since 0.235.4, wrapped texts balanced at the box's width (wider only for a line that never wraps); a wrapped text's lines justified left. Before that:
  **the box was 302 wide, not 288**: the study's box is 288 with its 7 px border and 11 px padding inside (252 of text), but
  nearly every tooltip in it renders 302 (its text widened to 266 by the YOUR TOTAL and formula rules). The game's box keeps the
  266 px of text and the 18 px insets, as the study draws them.
- **The breakpoint's ✓ is the client's green tick** (`RaidFrame\ReadyCheck-Ready`, 12 px): Friz Quadrata has no ✓ glyph.
- **Serial commas** (the style guide: always): “Dodge, Block, and Parry Chance”, “Your bow, gun, or crossbow.”, “none, 25%,
  50%, 75%, or all”.
- **The setting is Forever UI's own** (0.235.1; the user: “Add the simple tooltips to this settings menu”): **Simple attribute
  tooltips** in the Character window's settings menu (on its portrait), before Reset window position, saved in
  `ns.db.simpleStatTooltips` (off by default: detailed); clicking it draws a shown tooltip again. 0.235.0 read the game's
  Detailed Tooltips (`UberTooltips`), which also changes the game's own tooltips; that row in Options > Interface is the game's
  setting alone again (its tooltip the game's, `OPTION_TOOLTIP_USE_UBERTOOLTIPS`), and no longer touches these tooltips.
- **YOUR TOTAL's gear share** is the items' own stats (`GetItemStats`); an enchant's stats count with the buffs, and Defense
  from an item's equip effect may too. Armor's and the resistances' items are in the game's base (the server's BASE_VALUE): their
  YOUR TOTAL shows only with buffs or debuffs, the gear's share then taken out of the base. Health and Mana have none (no API).
- **Block Value from Strength** is the server's Strength ÷ 20 − 1 (Player::GetShieldBlockValue), not the study's ÷ 20.
- **Lines for what the samples didn't show**, in the study's voice: Rage and Energy; Intellect and Spirit without Mana; the
  avoidance line of Defense by class (Block only with shields, Parry only for warriors, paladins, rogues, hunters); Intellect's
  spell crit rate for the classes the server gives one; Spell Power's examples for classes other than mages (“A 3.5 sec spell”,
  “A 1.5 sec spell”); Dodge's rogue line as the rogue's own; Parry's sum computed (left out when it doesn't add up); the race's
  +10 for every race that has one (Night Elf and Tauren Nature, Dwarf Frost, Undead Shadow, Gnome Arcane), only the character's
  own; the pet's tooltips (its Health, Armor, Main Attack, Attack Power, Movement, resistances, with “Training can increase”).
- The labels' letter spacing (0.06 em) isn't possible in a font string; the hairline's tile is stretched (its columns are all
  alike, so it looks the same).

## 7. The numbers the server never sends (0.235.5, session 58)

The user: “Why doesn’t hit chance show up?” 1.12’s update fields have no hit, spell hit, spell crit, bonus healing or spell
penetration, and HermesProxy never fills the 1.14.2 client’s (`UiHitModifier`, `UiSpellHitModifier`, `SpellCritPercentage`,
`ModHealingDonePos`, `ModTargetResistance`), so `GetHitModifier`, `GetSpellHitModifier`, `GetSpellCritChance`,
`GetSpellBonusHealing` and `GetSpellPenetration` read 0 and their rows hid. `ns.ModifierStats` (StatTooltips.lua) works them out as
the server does (StatSystem.cpp, Unit.cpp):

- **Gear**: the equipped items’ green lines read off a hidden tooltip (Equip:, an earned Set: bonus, an enchant; not Use: or Chance
  on hit:, not a grey set bonus).
- **Talents** (Talent.dbc against spell_template, auras 54, 55, 71, 123): Surefooted (Hunter), Precision (Rogue, Paladin) and
  Nature’s Guidance (Shaman, also spell hit) +1% hit a rank; Holy Power +1% Holy spell crit a rank; Arcane Subtlety 5 penetration a rank.
- **Buffs and debuffs**: their texts (“chance to hit reduced by” counts against).
- **Spell crit**: the class’s base + Intellect ÷ (rate0 + rate1 × level) + the auras (Player::UpdateSpellCritChance).
- A real value from the game, should one ever come, is used instead.

A new **Spell Hit Chance** row after Hit Chance (hidden at 0); its breakpoint 16% (a 4% base miss, +2 for two levels, +11 for the
third: a level 63 boss; 1% always misses). Hit, Spell Hit, Bonus Healing and Spell Penetration show YOUR TOTAL by source
(“+1% Gear +2% Talents +1% Buffs”). Skills.lua’s miss chances use the worked-out hit too.

## 8. Regeneration, Block Value, against a kind of creature (0.235.6, session 58)

The user: “Where would I see the extra mp5 and hp5 from gear?” A survey of every passive Equip: effect on the server’s items (aura
types by item count) found what no row or tooltip showed: mana a 5 sec (aura 85, 345 items), health a 5 sec (161, 37), Block Value
(every shield, 158 on 21 items; 1.12 has no field, so `GetShieldBlock` reads 0), Attack Power and spell damage against a kind of
creature (102, 131, 180: 52 items); left out: damage shields (15) and stealth (17, 154).

- **Health Regen** and **Mana Regen** rows in General after Mana (Health, Mana, Health Regen, Mana Regen: the user, after trying Health Regen after Health in 0.235.7; “N / 5 sec”; Mana Regen hidden without mana): Spirit’s
  (math_.hpRegenPerSec, mpRegenPerSec) + the gear’s and buffs’ (“Restores N mana per 5 sec.”; a buff’s “every 2 sec” scaled to 5;
  drains count against). The tooltips: YOUR TOTAL “49 Spirit +5 Gear +23 Buffs”; BONUSES out of combat / in combat (health) and
  while not casting / while casting (mana: the gear’s and buffs’ and the talents’ or buffs’ share of Spirit’s: Meditation,
  Arcane Meditation, Reflection 5% a rank, Mage Armor 30%; Player::UpdateManaRegen).
- **Block Value** (Player::GetShieldBlockValue): (the shield’s “N Block” + the gear’s + Strength ÷ 20 − 1) × the talents’ %
  (Shaman Shield Specialization 5%, Paladin 10% a rank); the Block tooltip’s sum names each part.
- **Against a kind of creature**: a BONUSES line in Attack Power, Ranged Attack Power and Spell Power, on one line (“+72 Attack
  Power against Beasts”), and under it the weapon’s DPS against them (“+43.0 DPS Melee Weapon against Beasts”: the total and the
  bonus ÷ 14; 0.235.8, the user).

The server applies an item’s health a 5 sec (SPELL_AURA_MOD_HEALTH_REGEN_IN_COMBAT) every second (Player::RegenerateHealth adds
the aura’s amount × seconds), five times the item’s text; the rows show the item’s number. A server patch is open for the user.
