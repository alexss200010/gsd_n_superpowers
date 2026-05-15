# Reference — new-cheatsheet

Concrete templates and edit anchors for scaffolding a new cheat sheet. Replace placeholders: `<slug>` (lowercase, e.g. `docker`), `<Slug>` (capitalised first letter, e.g. `Docker`), `<ShortName>` (display, e.g. `Docker`), `<icon-name>` (a `lucide-react` icon, e.g. `Container`).

---

## 1. Slug rules

- Derived from `shortName` by lowercase + ASCII-only.
- One token, no spaces. If the user gives a multi-word name, hyphenate (`github-actions`).
- Used as: file name (`src/data/<slug>.ts`), URL path (`/<slug>`), state name (`selected<Slug>CommandId`), CSS modifier (`methodology-card--<slug>`).

---

## 2. Data file template — `src/data/<slug>.ts`

```ts
import type {
  CheatSheetAdvancedCommand,
  CheatSheetCommand,
  CheatSheetPipelineStep,
  CheatSheetPrinciple
} from "../types";

export const <slug>Commands: CheatSheetCommand[] = [
  {
    id: "<command-id>",         // kebab-case
    label: "<Short Label>",      // English noun, 1-2 words
    command: "<cli command>",    // English literal
    purpose: "<RU one-liner>",   // что делает
    when: "<RU>",                // когда применять
    output: "<RU>",              // что получится
    guardrail: "<RU>"            // как не выстрелить в ногу
  }
  // Exactly 6 entries.
];

export const <slug>Principles: CheatSheetPrinciple[] = [
  {
    id: "<principle-id>",
    title: "<RU короткий заголовок>",
    description: "<RU 1-2 предложения о ценности принципа>"
  }
  // Exactly 3 entries.
];

export const <slug>PipelineExample = {
  productName: "<RU название сценария>",
  premise: "<RU одна строка — что это за пример>",
  steps: [
    {
      id: "<step-id>",
      command: "<cli command>",
      phase: "<RU название фазы>",
      when: "<RU когда запускать>",
      output: "<RU что появится>",
      example: "<RU развёрнутый пример>"
    }
    // Exactly 6 entries.
  ] satisfies CheatSheetPipelineStep[]
};

export const <slug>AdvancedCommands: CheatSheetAdvancedCommand[] = [
  {
    id: "<advanced-id>",
    name: "<Short Name EN>",     // English title-case
    command: "<cli command>",
    category: "<EN>",            // English bucket, e.g. "Networking"
    description: "<RU 1-2 предложения>"
  }
  // 8 to 12 entries.
];
```

Tone reference: read `src/data/gsd.ts` and `src/data/git.ts`. Sentences are short, opinionated, no filler.

---

## 3. `src/data/index.ts` — add one line

Existing file is a flat list of re-exports in alphabetical order. Insert one new line in the correct alphabetical position:

```ts
export { <slug>AdvancedCommands, <slug>Commands, <slug>PipelineExample, <slug>Principles } from "./<slug>";
```

---

## 4. `src/App.tsx` — five edits

### Edit 4.1 — imports

Existing line:
```ts
import { ArrowRight, BookOpen, GitBranch, Sparkles, Terminal } from "lucide-react";
```

Add `<icon-name>` to the import list (alphabetical).

Add the data import alongside `gitAdvancedCommands` etc.:
```ts
<slug>AdvancedCommands,
<slug>Commands,
<slug>PipelineExample,
<slug>Principles,
```

### Edit 4.2 — Route type

Existing:
```ts
type Route = "home" | "superpowers" | "gsd" | "git";
```

Append `| "<slug>"` at the end.

### Edit 4.3 — `getRouteFromPath`

Add a new branch before the final `return "home"`:
```ts
  if (pathname === "/<slug>") {
    return "<slug>";
  }
```

### Edit 4.4 — state

Below `const [selectedGitCommandId, ...]`:
```ts
  const [selected<Slug>CommandId, setSelected<Slug>CommandId] = useState(<slug>Commands[0].id);
```

### Edit 4.5 — home-page card

After the Git `<a className="methodology-card methodology-card--git" ...>` block, insert:
```tsx
            <a
              className="methodology-card methodology-card--<slug>"
              href="/<slug>"
              onClick={(event) => handleRouteClick(event, "/<slug>")}
            >
              <span className="methodology-card__icon">
                <<icon-name> aria-hidden="true" size={26} />
              </span>
              <span className="methodology-card__body">
                <strong><ShortName></strong>
                <span><RU card subtitle></span>
              </span>
              <ArrowRight aria-hidden="true" className="methodology-card__arrow" size={22} />
            </a>
```

### Edit 4.6 — view-switcher tab

After the Git tab, insert:
```tsx
          <a
            aria-current={route === "<slug>" ? "page" : undefined}
            className={route === "<slug>" ? "view-switcher__button view-switcher__button--active" : "view-switcher__button"}
            href="/<slug>"
            onClick={(event) => handleRouteClick(event, "/<slug>")}
          >
            <ShortName>
          </a>
```

### Edit 4.7 — render block

After the Git `{route === "git" ? ( ... )}` block, insert:
```tsx
      {route === "<slug>" ? (
        <CommandCheatSheet
          shortName="<ShortName>"
          eyebrow="<RU eyebrow, default 'Шпаргалка'>"
          title="<RU page title>"
          subtitle="<RU subtitle>"
          heroSignals={["<sig1>", "<sig2>", "<sig3>"]}
          advancedCommands={<slug>AdvancedCommands}
          commands={<slug>Commands}
          pipelineExample={<slug>PipelineExample}
          principles={<slug>Principles}
          selectedCommandId={selected<Slug>CommandId}
          onSelectCommand={setSelected<Slug>CommandId}
        />
      ) : null}
```

---

## 5. `src/styles.css` — color theme

### Color derivation from base hex

Given user-supplied base hex `#RRGGBB`:
- `BASE_RGB = (R, G, B)` from hex.
- `border-hover` = `rgba(R, G, B, 0.4)`.
- `icon-border` = `rgba(R, G, B, 0.16)`.
- `gradient-tint` = `rgba(R, G, B, 0.14)`.
- `icon-bg-soft` = mix base toward white 92% → `#XXYYZZ`. Formula per channel: `round(C + (255 - C) * 0.92)`.
- `icon-fg` = the base hex itself (used as `color`).

Example (base `#2d4f6c`):
- `BASE_RGB = (45, 79, 108)`.
- `border-hover = rgba(45, 79, 108, 0.4)`.
- `icon-border = rgba(45, 79, 108, 0.16)`.
- `gradient-tint = rgba(45, 79, 108, 0.14)`.
- `icon-bg-soft = #e6eef4`.
- `icon-fg = #2d4f6c`.

### Edit 5.1 — early section

After the existing `.methodology-card--git` rules (around line 165-185 area), add:
```css
.methodology-card--<slug>:hover,
.methodology-card--<slug>:focus-visible {
  border-color: <border-hover>;
}

.methodology-card--<slug> .methodology-card__icon {
  background: <icon-bg-soft>;
  color: <icon-fg>;
}
```

### Edit 5.2 — home-page override section

After `.methodology-card--git::before { ... }` (around line 1320), add:
```css
.methodology-card--<slug>::before {
  background:
    linear-gradient(90deg, <gradient-tint>, transparent 42%),
    repeating-linear-gradient(
      90deg,
      rgba(21, 26, 24, 0.04) 0,
      rgba(21, 26, 24, 0.04) 1px,
      transparent 1px,
      transparent 18px
    );
}
```

And after `.methodology-card--git .methodology-card__icon` override (around line 1338), add:
```css
.methodology-card--<slug> .methodology-card__icon {
  border-color: <icon-border>;
  background: <icon-bg-soft>;
  color: <icon-fg>;
}
```

### Edit 5.3 — grid width (only if cards count > 3)

The grid was sized for three:
```css
.methodology-grid {
  width: min(100%, 1140px);
  grid-template-columns: repeat(3, minmax(0, 340px));
}
```

For four cards: `width: min(100%, 1480px); grid-template-columns: repeat(4, minmax(0, 340px));`. Also update the early `repeat(3, ...)` to match.

---

## 6. `src/App.test.tsx` — additions

### Edit 6.1 — update "all methodology cards" test

Find:
```ts
    expect(screen.getByRole("link", { name: /^git/i })).toHaveAttribute("href", "/git");
```
Add below:
```ts
    expect(screen.getByRole("link", { name: /^<slug>/i })).toHaveAttribute("href", "/<slug>");
```

### Edit 6.2 — append four tests

After the last Git test, before the closing `});`:
```tsx
  it("navigates from the home card to the <ShortName> page", async () => {
    const user = userEvent.setup();
    renderAt();

    await user.click(screen.getByRole("link", { name: /^<slug>/i }));

    expect(window.location.pathname).toBe("/<slug>");
    expect(screen.getByRole("heading", { name: "<RU page title>", level: 1 })).toBeInTheDocument();
  });

  it("opens the <ShortName> cheat sheet and updates the selected command", async () => {
    const user = userEvent.setup();
    renderAt("/<slug>");

    expect(screen.getByRole("heading", { name: "<RU page title>", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("<RU subtitle>")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /<cli command of 2nd item>/i }));

    const detail = within(screen.getByRole("complementary", { name: "Выбранная команда <ShortName>" }));
    expect(detail.getByRole("heading", { name: "<label of 2nd item>" })).toBeInTheDocument();
  });

  it("shows advanced <ShortName> commands on the cheat sheet", () => {
    renderAt("/<slug>");

    expect(screen.getByRole("heading", { name: "Продвинутые команды" })).toBeInTheDocument();
    expect(screen.getByText("<name of one advanced cmd>")).toBeInTheDocument();
    expect(screen.getByText("<cli of that cmd>")).toBeInTheDocument();
  });

  it("shows a <ShortName> pipeline example on the cheat sheet", () => {
    renderAt("/<slug>");

    expect(screen.getByRole("heading", { name: "Пример <ShortName> pipeline" })).toBeInTheDocument();
    expect(screen.getByText("<productName>")).toBeInTheDocument();
    expect(screen.getByText("<premise>")).toBeInTheDocument();
  });
```

---

## 7. Verification commands

From the project root:
```bash
npx tsc -b
npm test
```

Both must complete clean. If a Russian string in a test doesn't match the data file (typos, smart quotes, etc.), fix the test or the data — pick the one closer to what the user actually wants.

---

## 8. Commit + push (deploy)

### Pre-flight

```bash
git status                            # confirm clean tree apart from new cheatsheet files
git log -1 --oneline                  # sanity-check current HEAD
git remote -v | grep origin           # confirm remote is set
```

If `git remote -v` returns empty → stop and ask the user for the remote URL.

### Stage and commit

```bash
git add src/data/<slug>.ts \
        src/data/index.ts \
        src/App.tsx \
        src/App.test.tsx \
        src/styles.css

git commit -m "feat(<slug>): add <ShortName> cheat sheet" \
           -m "- new data file at src/data/<slug>.ts" \
           -m "- route /<slug>, home card, view-switcher tab" \
           -m "- color theme in styles.css" \
           -m "- tests covering navigation, command select, advanced, pipeline"
```

Don't use `git add -A` — there might be local cruft. Stage exactly the touched files.

### Push

```bash
git push origin main
```

If push is rejected because remote moved on:
```bash
git pull --rebase origin main
# resolve conflicts if any
npx tsc -b && npm test           # re-verify after rebase
git push origin main
```

Never `git push --force` on `main`. If the user is on a different default branch, swap `main` for that branch.

### After push

Vercel auto-deploys on the push to the connected branch. To find the live URL:
```bash
cat .vercel/project.json 2>/dev/null    # contains projectId/orgId, not URL directly
```
If `.vercel/project.json` is absent, the project was deployed via the dashboard import flow — point the user to the Vercel dashboard for the URL.

Reply to the user with: short commit SHA (`git rev-parse --short HEAD`), test count delta, and a sentence telling them Vercel is now building.
