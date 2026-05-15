---
name: new-cheatsheet
description: Scaffold a new command-style cheat sheet (data file, route, home card, view-switcher tab, color theme, tests) in the Шпаргалка React+Vite app. Use when the user asks to add a new methodology page, add a cheat sheet, create a shpargalka, scaffold a methodology, "добавить шпаргалку", "новая методология", or wire a new page like the existing GSD/Git ones. Applies to command-style methodologies (Docker, npm, Make, kubectl, terraform, etc.) — not to dashboard-style ones like Superpowers.
---

# New Cheatsheet

Add a new command-style methodology page to the existing Шпаргалка app. The generic `CommandCheatSheet` component is already in place — this skill produces the data file and wires every place a new route needs to be registered.

## Process

1. **Gather the spec interactively.** Don't ask everything at once. First request: have the user dump raw notes about the methodology, then fill the structured slots. Required slots (see REFERENCE.md for shape):
   - `shortName` (e.g. "Docker") — also used as URL slug after lowercase.
   - `eyebrow` (default "Шпаргалка"), one-line `subtitle`.
   - Three `heroSignals` — the main daily-cycle triad (e.g. `["build", "run", "push"]`).
   - Six core `commands`: `label`, `command`, `purpose`, `when`, `output`, `guardrail`.
   - Three `principles`: `title`, `description`.
   - One `pipelineExample`: `productName`, `premise`, six steps (`command`, `phase`, `when`, `output`, `example`).
   - Eight to twelve `advancedCommands` grouped by `category`.
   - Base color hex for the theme (skill derives soft/border variants).
   Reject placeholders. If a slot is short, ask the user to expand before proceeding.

2. **Write the data file** at `src/data/<slug>.ts` using the template in REFERENCE.md. Import the `CheatSheet*` types from `../types`. Russian descriptions, English command literals.

3. **Update `src/data/index.ts`** — re-export `<slug>Commands`, `<slug>Principles`, `<slug>PipelineExample`, `<slug>AdvancedCommands`. Keep alphabetical order with existing exports.

4. **Update `src/App.tsx`** — five precise edits (see REFERENCE.md for exact anchors):
   - Add the slug literal to the `Route` union.
   - Add a `pathname === "/<slug>"` branch in `getRouteFromPath`.
   - Add `useState` for `selected<Slug>CommandId`.
   - Add the home-page `<a>` card with `methodology-card--<slug>` and a `lucide-react` icon.
   - Add the view-switcher tab and the render block `<CommandCheatSheet shortName="..." ... />`.

5. **Update `src/styles.css`** — two locations:
   - Early section (around `.methodology-card--gsd:hover`): add `--<slug>` hover/focus border color and icon background/color.
   - Home-page override section (around `.methodology-card--gsd::before`): add `--<slug>::before` gradient and icon overrides.
   - If the methodology count goes past three, widen the grid (`width: min(100%, 1140px)` was sized for three).

6. **Update `src/App.test.tsx`** — add four tests: navigation from home card, page heading, command selection, advanced commands+pipeline. Update the "all methodology cards" test to include the new card link.

7. **Verify.** Run `npx tsc -b && npm test` from project root. Both must be clean. Fix and retry on failure — do not declare done with red tests.

8. **Commit.** Stage all changes and create one focused commit. Message template: `feat(<slug>): add <ShortName> cheat sheet`. Add a short body listing key file paths. Skip pre-existing untracked junk (`vite.config.ts.timestamp-*.mjs` etc. — already in `.gitignore`).

9. **Push to deploy.** `git push origin main`. Vercel is wired to the remote and rebuilds on push — no manual deploy command needed. After push, surface the Vercel project URL (read it from `.vercel/project.json` if present, otherwise tell the user to check the dashboard).

## Output format

A working `/<slug>` route with full visual parity to `/git` and `/gsd`, committed and pushed. End the run with a one-line summary: files touched, test count before/after, commit SHA (short), and the live URL once the push completes.

## Edge cases

- Fewer than 6 commands or 3 principles provided → ask for the missing items. Never invent.
- `src/data/<slug>.ts` already exists → ask: overwrite, or pick a new slug?
- Methodology is dashboard-style (skills + workflow + artifacts like Superpowers) → say so and stop. This skill is for command-style sheets only.
- User dumps notes in Russian → restructure into the slots without changing meaning. Commands stay English.
- After every Edit, do not Read the file back; Edit errors if the match fails.
- No `.git` directory or no `origin` remote → stop before the commit step and tell the user. The skill assumes git is initialised and pointed at a Vercel-connected remote.
- Dirty working tree at the start (unrelated uncommitted changes) → ask the user how to handle them before adding new files.
- `git push` rejected (remote ahead) → run `git pull --rebase origin main`, resolve any conflicts, retry push. Don't force-push.

## Behavior notes

- All user-facing strings in the data file (descriptions, principles, pipeline narratives): Russian.
- Code identifiers, file names, command literals: English.
- Match the tone of existing data files (`src/data/gsd.ts`, `src/data/git.ts`) — concise, opinionated, no filler.
- Don't trigger this skill for Superpowers-style requests.
- Color derivation rules and exact anchor lines are in REFERENCE.md.
