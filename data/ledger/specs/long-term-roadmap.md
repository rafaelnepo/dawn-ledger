# What to build first: professions and tooling side by side

The two plans of session 78 read together: [the professions plan](professions/README.md) and [the tooling plan](tooling/README.md),
with [the upstream updates](tooling/04-upstream-updates.md) and [the rank research](pvp-ranks/01-what-ranks-touch.md). The
question: what to build first for the biggest wins over the long term. Written 2026-10-10; nothing built for it.

## How the candidates were weighed

Each candidate scored on four things:

- **Play:** what you feel in game, alone and with alts.
- **Reach:** how many later steps it unlocks (a tool used by twenty steps beats a feature used once).
- **Cost:** sessions of work, and heavy builds on a Mac with little memory.
- **Risk:** what can break (characters, items, the world database, the client’s caches).

The biggest long-term wins are the ones with high reach that also give something to play soon.

## The plans overlap more than they differ

Most of the professions plan’s foundation **is** the tooling backlog:

| The professions plan needs | The tooling plan calls it | Also serves |
|---|---|---|
| a proof of a new recipe spell | the spell tool’s first job | food buffs, auras, any new spell |
| skill-ups for new recipes, new skill lines | the DBC module and writer | locks (Woodcutting), Survival’s tiers |
| reagents, tools and stations in the window | the three proxy loaders | every new or changed recipe |
| ranks by quest, commissions, journals’ quests | the quest and gossip kit | rank quests for PvP, Lockpicking’s design, Archaeology |
| quest → skill points | a mangosd hook | Lockpicking, every gathering rank |
| switching paths | a gossip script | — |
| the craft-yield hook | a mangosd hook | the paths’ bonuses, upgrades on craft |

And two tooling pieces serve everything without being in either plan: the **patch runner** (every step writes world patches)
and the **id registry** (every step takes ids).

## The upstream repositories

From [04](tooling/04-upstream-updates.md); `git fetch` only, nothing pulled:

| Repository | Behind | What it brings | When |
|---|---|---|---|
| mangos-classic (the core) | 0 | nothing; three small open fixes to carry as our patches (a Gnomeregan crash, a SOAP leak, the Triage quest) | when wanted |
| playerbots | 39 commits | crash and battleground fixes; our 6 files merge cleanly | the next server build; **pin it now** (a CMake reconfigure would pull it by itself) |
| classic-db | 1 commit | one row (a peasant’s sounds); its installer only reinstalls, which would drop our world patches: updates go in by hand | optional |
| HermesProxy | 133 commits | items and macros kept on the action bars after login, pets’ names after a relog, NPC texts that survive a proxy restart; 2 of our 6 code patches now upstream’s | its own step, on a branch |
| Eluna port | — | Lua on the server; merges with our patches cleanly | the trial |

**Fix first:** our saved patch copies don’t rebuild the live server. The Winterspring kill-reputation patch is cut off mid-hunk,
and one Venture Company patch replaces another. After any update, “apply the copies again” would silently lose a change. So:
regenerate it from the live source, mark the replaced one, and keep our changes as `dawn` branches in the three repositories.

## The fork in the road: Eluna

Eluna (Lua on the server) sits under several of those rows. Its hooks cover quests, gossip, chat commands and addon messages,
and its player methods teach and remove spells and set skills (to verify in a trial):

| Built in C++ without Eluna | With Eluna |
|---|---|
| quest → skill points (a mangosd patch) | a Lua quest hook setting the skill |
| the switch script (ScriptDev2) | a Lua gossip removing one path’s spells, teaching another’s |
| the bridge (a mangosd module) | Lua answering addon messages |
| the quest kit’s scripted parts (dbscripts, C++) | Lua, reloaded live without a 12–25 minute build |
| the craft-yield hook | still C++ unless Eluna has a crafting hook (to verify) |

So Eluna turns four medium C++ jobs into Lua and makes every later iteration a reload instead of a rebuild. And the upstream
check made the trial cheap: the core has **no** upstream update to take (cmangos is still at our commit), the port sits on that
same commit, and our 31-file patch merges onto it **with no conflict at all**. The cost is one long build and a round of tests.

## The ranking

### Tier 0: this week, tiny cost, felt at once

| Step | Play | Reach | Cost |
|---|---|---|---|
| Mail: instant between characters of the same side (decided; no mail across factions; one config line) | high: the cheapest shared bank | the Vault later | trivial |
| Professions Phase 0 (SQL only): the salt, Annora’s rank, the anvils and labs in towns, Smelt Dark Iron, the Core quests, the faction mirrors, the Goblin Mining Helmet | high: every craft reaches 300 alone | the rank quests build on it | small to medium, no code |
| Fix the patch copies; pin playerbots; our changes as `dawn` branches | none directly | protects every later update | small, no server change |
| Patch runner and id registry | none directly | every later step | small |
| The previews’ live readers | none directly | every later preview shows the real world | small to medium |
| The rank 4 mounts sold where a rank 4 can buy them (from the rank research) | medium | — | small, SQL |

### Tier 1: the decision that shapes everything after

| Step | Why now |
|---|---|
| **HermesProxy’s 133 commits**, on a branch | real play fixes (action bars, pet names, NPC texts); and addon messages pass through the proxy, so the checks below should run on the proxy we keep |
| The two checks in game (guild bank functions; addon messages both ways) | one chat line each; they decide the Guild Bank route and the bridge’s channel |
| **Eluna on a branch**, with the new playerbots: our patches over the port, one Lua NPC, one addon message both ways, one quest that sets a skill | no conflicts and nothing upstream to take first; if it works, Tiers 2–4 get cheaper |

### Tier 2: the shared foundation

| Step | Unlocks |
|---|---|
| The DBC module and writer | new skill lines, recipe skill-ups, locks |
| A general hotfix writer | spell, look, skill and faction rows without hand edits |
| The three proxy loaders (reagents, tools, stations) | crafting windows that show new recipes properly |
| The spell tool, and its first proof: a castable spell under a new id | every new recipe, buff and path marker |
| The quest kit (Lua if Eluna stays, else Python + SQL + one C++ hook) | ranks by quest, commissions, PvP rank quests, Archaeology |

### Tier 3: the biggest wins to play

| Step | Why it ranks here |
|---|---|
| **Ranks by quest and commissions**, Leatherworking first | turns the 410 grind recipes into quests every alt can do: the largest single change to how professions feel |
| **The PvP rank rework** (next session’s topic) | the three blocks spread across levels; the research is done |
| **The bridge and the Vault** (account bank, reagents) | the largest quality-of-life change for alts; spec swap, barber and transmog then ride on it |

### Tier 4: depth

Paths and trees, quality upgrades (by quest first), Survival on the client’s own line, the leathers and scales given roles,
then the Jewelcrafting slice (it tests a skill line the client never had), then the features on the bridge one at a time.

### Tier 5: later

Inscription, Archaeology, the craft-yield hook, Woodworking’s decision, the real Guild Bank (only if the check keeps it alive and
a need appears), the CASC experiment.

## A rough timeline

Sessions are the project’s working sessions; each phase ends with you playing it.

| Sessions | What |
|---|---|
| 1 | Tier 0: the patch copies and the pin, mail, Phase 0 of professions, the patch runner, the id registry |
| 2 | the PvP rank rework (as planned) |
| 3–4 | Tier 1: HermesProxy’s update, the two checks in game, the Eluna trial with the new playerbots; the previews’ live readers |
| 5–7 | Tier 2: writer, hotfix writer, loaders, spell tool, quest kit |
| 8–12 | Tier 3: ranks by quest and commissions, a craft or two per session; the bridge and the Vault |
| later | Tiers 4 and 5 |

## What not to do yet

- Switch cores (vMaNGOS, AzerothCore): months of re-porting for little gain.
- Port the real Guild Bank: weeks, a duplication risk, and it serves one side of your characters.
- Build the bridge or the quest kit in C++ before the Eluna trial: it may make them Lua.
- Start Jewelcrafting before the proofs: it depends on a skill line the client never had.

## Your decisions

1. ~~Mail~~ **decided**: instant between characters of the same side, not across factions.
2. Professions Phase 0’s five questions (the professions plan’s decisions 1–5).
3. The patch copies fixed, playerbots pinned, our changes kept as `dawn` branches: now?
4. HermesProxy: the whole upstream (recommended), or only the action-bar fix?
5. The Eluna trial: yes or no?
6. The Vault before a guild bank?
