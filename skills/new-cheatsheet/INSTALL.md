# Installation — new-cheatsheet

This skill is project-specific: it only makes sense inside the Шпаргалка repository, because it edits paths like `src/data/`, `src/App.tsx`, and the test file.

## Wire it up

Claude Code and Cowork pick up skills from `.claude/skills/` inside the project. The file was scaffolded under `skills/` (without the dot) because that path was writable by the agent. To activate it, copy or symlink the folder into `.claude/skills/`:

```bash
cd "/Users/alexshuchman/Documents/Claude/Projects/Шпаргалка Superpowers & GSD"
mkdir -p .claude/skills
ln -s "../../skills/new-cheatsheet" .claude/skills/new-cheatsheet
```

Or, if symlinks bother you:

```bash
mkdir -p .claude/skills
cp -R skills/new-cheatsheet .claude/skills/
```

After that, open a fresh Claude session in this project and the skill should auto-load. Verify by asking Claude to list available skills — `new-cheatsheet` should appear.

## Trigger the skill

The skill triggers on phrases like:
- "добавь шпаргалку по Docker"
- "новая методология"
- "scaffold a cheat sheet for npm"
- "create a methodology page like Git"

If Claude doesn't pick it up, prompt explicitly: `use the new-cheatsheet skill for Docker`.

## Updating the skill

Edit `SKILL.md` or `REFERENCE.md` in place under `skills/new-cheatsheet/`. If you used a symlink, changes propagate immediately. If you copied, copy again.

## Prerequisites for the deploy step

The skill ends with `git commit && git push origin main`, which triggers Vercel auto-build. For that to work, the project must be:

1. Initialised as a git repo (`.git` exists).
2. Connected to a remote (`git remote -v` shows `origin`).
3. That remote is linked to a Vercel project with the connected branch set to `main` (or whatever default branch you use — adjust the skill's push command if different).

If any of the three is missing, the skill will stop before commit and ask. The one-time bootstrap (init + first remote) is not part of the skill.

## Out of scope

The skill assumes the existing generic `CommandCheatSheet` component in `src/components/CommandCheatSheet.tsx`. For dashboard-style cheat sheets (like Superpowers), build a separate skill — the layout, data shape, and CSS hooks are different.
