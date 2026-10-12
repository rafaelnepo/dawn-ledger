# The server's rates: one focused balance pass (to tackle later)

The user, session 63 (2026-10-07): "All the server honor, reputation, and exp rates, and quest exp etc will need a focused pass
with research and balance. Merge these and document for us to tackle them later." This file merges the earlier tasks: task 44
(Reputation for solo play: gains by who you helped, doubled for solo play, a faction journal) and Rebalance honor and reputation
gains (session 59: less grind, amounts to settle). Nothing is changed yet.

## Where things stand

Every rate is the server's default (blizzlike, 1.0): `config/mangosd.overrides` sets the experience, money and rest rates to 1
("raise later if levelling with bots feels slow"); the rest come from mangosd.conf.dist. The levers, from
`(the server's checkout)`:

| Area | Settings (all 1 unless said) |
|---|---|
| Experience | `Rate.XP.Kill`, `Rate.XP.Quest`, `Rate.XP.Explore`, `Rate.Pet.XP.Kill`; rest: `Rate.Rest.InGame`, `Rate.Rest.Offline.InTavernOrCity`, `Rate.Rest.Offline.InWilderness` |
| Honor | `Rate.Honor` (the weekly ranking's own rules: docs/specs/pvp-prepare.md) |
| Reputation | `Rate.Reputation.Gain`; `Rate.Reputation.LowLevel.Kill` and `.Quest` 0.2 (grey kills and quests) |
| Money and loot | `Rate.Drop.Money`, `Rate.Drop.Item.<quality>` (Poor to Artifact, Referenced, Quest) |
| Skills | `SkillGain.Crafting / Defense / Gathering / Weapon`; `SkillChance.Orange 100, Yellow 75, Green 25, Grey 0`; `Rate.Skill.Discovery`; `Rate.Mining.Amount / Next` |
| Talents, pets | `Rate.Talent`, `Rate.Loyalty` |
| Creatures | `Rate.Creature.<rank>.Damage / SpellDamage / HP`, `Rate.Creature.Aggro` |
| Other | `Rate.Auction.Time / Deposit / Cut`, `Rate.InstanceResetTime`, `Rate.Damage.Fall`, `Death.*` (sickness from 11, corpse delays, ghost speed) |

## What the pass needs (research first, then numbers, then the user's choice)

1. **What a solo player with bots meets:** time per level now (a character's played time against its level: the test
   characters), quests per level against the experience they need, how many zones a level band has on each side (both factions
   alike).
2. **Experience:** kills, quests and exploration each; rested; whether quest experience should grow more than kills (the
   user's play is quest-led); the low-level penalty on grey quests.
3. **Reputation:** the grind factions (Timbermaw, Argent Dawn, Thorium Brotherhood, Cenarion Circle, Zandalar, the
   battleground factions): gains per kill, quest and turn-in today, hours to Exalted; task 44's idea of gains by who you helped
   and doubled for solo play; whether `.LowLevel` stays at 0.2.
4. **Honor:** the weekly ranking against a small, bot-filled population (ranks need standing among players: the bots count?);
   honor per kill and per battleground; how many weeks a rank takes; the user's "less grind".
5. **Money, loot and skills:** whether money and grey loot follow experience; skill-up chances for crafting and gathering.
6. **Where it shows:** the Adventure Journal's journals, the toasts (a bigger gain should feel like one), the GM window
   (a Rates page to read them; a change needs a mangosd restart).

The output: a page of proposals, each with today's number, the proposed one and its effect (hours saved), for the user to pick;
then `config/mangosd.overrides` and a restart (documented in docs/server/operations.md).
