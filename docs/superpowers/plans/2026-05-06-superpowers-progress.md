# Superpowers Progress Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v1 Superpowers Progress dashboard as a local React web app with static workflow data, selectable skills/stages, visible gates, next actions, and artifacts.

**Architecture:** Use a Vite React TypeScript app with static typed data in `src/data/`, pure selector helpers in `src/lib/`, and focused UI components in `src/components/`. `src/App.tsx` owns selected skill/stage state and composes the dashboard.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, lucide-react.

---

## File Structure

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and test configuration.
- Create `src/main.tsx`: React entrypoint.
- Create `src/App.tsx`: app-level selected state and dashboard composition.
- Create `src/App.test.tsx`: integration test for selecting skills and stages.
- Create `src/setupTests.ts`: Testing Library matcher setup.
- Create `src/styles.css`: complete dashboard styling and responsive layout.
- Create `src/types.ts`: shared domain types.
- Create `src/data/workflow.ts`: static workflow stages.
- Create `src/data/skills.ts`: static Superpowers skill metadata.
- Create `src/data/artifacts.ts`: static artifact metadata.
- Create `src/data/index.ts`: data barrel exports.
- Create `src/data/model.test.ts`: data consistency tests.
- Create `src/lib/workflowSelectors.ts`: pure helpers for active stage, selected skill, panel state, and artifact filtering.
- Create `src/lib/workflowSelectors.test.ts`: selector tests.
- Create `src/components/SkillMap.tsx`: selectable skill list.
- Create `src/components/WorkflowTimeline.tsx`: selectable workflow stage timeline.
- Create `src/components/NextActionPanel.tsx`: current stage, blocker, gate, and recommendation.
- Create `src/components/ArtifactsList.tsx`: related artifact list and empty state.
- Create `src/components/StatusBadge.tsx`: compact status badge shared by dashboard components.
- Create `src/components/DashboardHeader.tsx`: compact product header with current workflow summary.
- Create `src/vite-env.d.ts`: Vite client typing.

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/vite-env.d.ts`
- Create: `src/setupTests.ts`

- [ ] **Step 1: Create npm project configuration**

Create `package.json`:

```json
{
  "name": "superpowers-progress",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "lucide-react": "^0.468.0",
    "vite": "^6.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and npm exits with code 0.

- [ ] **Step 3: Add TypeScript and Vite configuration**

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts"
  }
});
```

- [ ] **Step 4: Add the minimal app shell**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Superpowers Progress</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Create `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `src/styles.css`:

```css
:root {
  color: #18201c;
  background: #f5f1e8;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button {
  font: inherit;
}
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <h1>Superpowers Progress</h1>
      <p>Dashboard scaffold ready.</p>
    </main>
  );
}
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Verify scaffold builds**

Run: `npm run build`

Expected: PASS. Output includes TypeScript completing and Vite producing a `dist/` directory.

- [ ] **Step 6: Commit scaffold**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src
git commit -m "chore: scaffold vite react app"
```

## Task 2: Domain Model And Static Data

**Files:**
- Create: `src/types.ts`
- Create: `src/data/workflow.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/artifacts.ts`
- Create: `src/data/index.ts`
- Create: `src/data/model.test.ts`

- [ ] **Step 1: Write failing data model tests**

Create `src/data/model.test.ts`:

```ts
import { artifacts, skills, workflowStages } from ".";

describe("static workflow model", () => {
  it("has exactly one active workflow stage", () => {
    expect(workflowStages.filter((stage) => stage.status === "active")).toHaveLength(1);
  });

  it("only links skills to existing workflow stages", () => {
    const stageIds = new Set(workflowStages.map((stage) => stage.id));

    for (const skill of skills) {
      expect(skill.stageIds.length).toBeGreaterThan(0);
      for (const stageId of skill.stageIds) {
        expect(stageIds.has(stageId)).toBe(true);
      }
    }
  });

  it("only links artifacts to existing workflow stages", () => {
    const stageIds = new Set(workflowStages.map((stage) => stage.id));

    for (const artifact of artifacts) {
      expect(stageIds.has(artifact.stageId)).toBe(true);
    }
  });

  it("includes the core Superpowers skills from the design spec", () => {
    expect(skills.map((skill) => skill.id)).toEqual([
      "using-superpowers",
      "brainstorming",
      "writing-plans",
      "test-driven-development",
      "verification-before-completion",
      "finishing-a-development-branch"
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/data/model.test.ts`

Expected: FAIL because `src/data/index.ts` and model files do not exist yet.

- [ ] **Step 3: Add shared types**

Create `src/types.ts`:

```ts
export type WorkflowStatus = "complete" | "active" | "next" | "gated" | "pending";

export type ArtifactStatus = "created" | "pending" | "blocked";

export interface WorkflowStage {
  id: string;
  label: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  gate: string;
  blocker?: string;
  nextAction: string;
}

export interface Skill {
  id: string;
  name: string;
  purpose: string;
  trigger: string;
  status: WorkflowStatus;
  stageIds: string[];
}

export interface Artifact {
  id: string;
  name: string;
  type: "spec" | "plan" | "verification" | "commit" | "pr";
  stageId: string;
  status: ArtifactStatus;
  path?: string;
  description: string;
}
```

- [ ] **Step 4: Add workflow stages**

Create `src/data/workflow.ts`:

```ts
import type { WorkflowStage } from "../types";

export const workflowStages: WorkflowStage[] = [
  {
    id: "idea",
    label: "Idea",
    title: "Start With Intent",
    description: "Name the problem space before reaching for implementation.",
    status: "complete",
    gate: "A project direction is selected.",
    nextAction: "Choose the smallest useful product shape."
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    title: "Shape The Design",
    description: "Explore options, choose scope, and get user approval before writing code.",
    status: "complete",
    gate: "Design sections are approved by the user.",
    nextAction: "Write and review the design spec."
  },
  {
    id: "spec",
    label: "Spec",
    title: "Capture The Agreement",
    description: "Save the approved design as a project artifact.",
    status: "active",
    gate: "The written spec is reviewed and accepted.",
    nextAction: "Turn the spec into an implementation plan."
  },
  {
    id: "plan",
    label: "Plan",
    title: "Break Work Into Steps",
    description: "Create a task-by-task implementation plan with tests and commits.",
    status: "next",
    gate: "Plan is saved and an execution mode is chosen.",
    blocker: "Requires approved written spec.",
    nextAction: "Write the implementation plan."
  },
  {
    id: "build",
    label: "Build",
    title: "Implement In Thin Slices",
    description: "Use tests and focused commits to build the dashboard.",
    status: "pending",
    gate: "Implementation tasks pass their local checks.",
    blocker: "Requires implementation plan approval.",
    nextAction: "Execute the first implementation task."
  },
  {
    id: "verify",
    label: "Verify",
    title: "Prove It Works",
    description: "Run build checks and inspect the app in the browser.",
    status: "pending",
    gate: "Build and visual verification are complete.",
    blocker: "Requires working implementation.",
    nextAction: "Run npm checks and visual QA."
  },
  {
    id: "finish",
    label: "Finish",
    title: "Prepare Completion",
    description: "Summarize the result and choose the next integration step.",
    status: "pending",
    gate: "Worktree is clean and completion path is chosen.",
    blocker: "Requires verification evidence.",
    nextAction: "Decide whether to merge, open a PR, or continue iterating."
  }
];
```

- [ ] **Step 5: Add skills and artifacts**

Create `src/data/skills.ts`:

```ts
import type { Skill } from "../types";

export const skills: Skill[] = [
  {
    id: "using-superpowers",
    name: "using-superpowers",
    purpose: "Checks whether a skill applies before acting.",
    trigger: "Start of work or any task where a skill might apply.",
    status: "complete",
    stageIds: ["idea", "brainstorm", "spec", "plan", "build", "verify", "finish"]
  },
  {
    id: "brainstorming",
    name: "brainstorming",
    purpose: "Turns a vague idea into an approved design.",
    trigger: "Creative work, new features, or behavior changes.",
    status: "complete",
    stageIds: ["brainstorm", "spec"]
  },
  {
    id: "writing-plans",
    name: "writing-plans",
    purpose: "Turns an approved spec into executable tasks.",
    trigger: "A spec or requirements exist and code has not started.",
    status: "active",
    stageIds: ["plan"]
  },
  {
    id: "test-driven-development",
    name: "test-driven-development",
    purpose: "Keeps implementation grounded in failing tests and small passes.",
    trigger: "Feature or bugfix implementation begins.",
    status: "next",
    stageIds: ["build"]
  },
  {
    id: "verification-before-completion",
    name: "verification-before-completion",
    purpose: "Requires evidence before claiming the work is done.",
    trigger: "Before saying complete, fixed, or passing.",
    status: "pending",
    stageIds: ["verify"]
  },
  {
    id: "finishing-a-development-branch",
    name: "finishing-a-development-branch",
    purpose: "Chooses the clean handoff after verified implementation.",
    trigger: "Implementation is done and checks pass.",
    status: "pending",
    stageIds: ["finish"]
  }
];
```

Create `src/data/artifacts.ts`:

```ts
import type { Artifact } from "../types";

export const artifacts: Artifact[] = [
  {
    id: "design-spec",
    name: "Superpowers Progress Design Spec",
    type: "spec",
    stageId: "spec",
    status: "created",
    path: "docs/superpowers/specs/2026-05-06-superpowers-progress-design.md",
    description: "Approved product design and scope for the v1 dashboard."
  },
  {
    id: "implementation-plan",
    name: "Implementation Plan",
    type: "plan",
    stageId: "plan",
    status: "pending",
    path: "docs/superpowers/plans/2026-05-06-superpowers-progress.md",
    description: "Task-by-task plan with tests, file paths, and commits."
  },
  {
    id: "build-output",
    name: "Production Build",
    type: "verification",
    stageId: "verify",
    status: "pending",
    description: "Evidence from npm run build."
  },
  {
    id: "visual-check",
    name: "Browser Visual Check",
    type: "verification",
    stageId: "verify",
    status: "pending",
    description: "Manual desktop and mobile layout inspection."
  },
  {
    id: "finish-commit",
    name: "Final Implementation Commit",
    type: "commit",
    stageId: "finish",
    status: "pending",
    description: "Clean committed state after verification."
  }
];
```

Create `src/data/index.ts`:

```ts
export { artifacts } from "./artifacts";
export { skills } from "./skills";
export { workflowStages } from "./workflow";
```

- [ ] **Step 6: Run data model tests**

Run: `npm run test -- src/data/model.test.ts`

Expected: PASS. All four model tests pass.

- [ ] **Step 7: Commit domain model**

```bash
git add src/types.ts src/data
git commit -m "feat: add superpowers workflow model"
```

## Task 3: Workflow Selectors

**Files:**
- Create: `src/lib/workflowSelectors.ts`
- Create: `src/lib/workflowSelectors.test.ts`

- [ ] **Step 1: Write failing selector tests**

Create `src/lib/workflowSelectors.test.ts`:

```ts
import { artifacts, skills, workflowStages } from "../data";
import {
  getActiveStage,
  getArtifactsForStage,
  getPanelState,
  getSkillById,
  getStageById
} from "./workflowSelectors";

describe("workflow selectors", () => {
  it("finds the active stage", () => {
    expect(getActiveStage(workflowStages)?.id).toBe("spec");
  });

  it("finds selected skill and stage by id", () => {
    expect(getSkillById(skills, "writing-plans")?.name).toBe("writing-plans");
    expect(getStageById(workflowStages, "plan")?.label).toBe("Plan");
  });

  it("filters artifacts for a stage", () => {
    expect(getArtifactsForStage(artifacts, "verify").map((artifact) => artifact.id)).toEqual([
      "build-output",
      "visual-check"
    ]);
  });

  it("uses selected skill stage as panel stage when a skill is selected", () => {
    const panel = getPanelState({
      artifacts,
      skills,
      stages: workflowStages,
      selectedSkillId: "test-driven-development",
      selectedStageId: "spec"
    });

    expect(panel.stage.id).toBe("build");
    expect(panel.skill?.id).toBe("test-driven-development");
    expect(panel.artifacts).toEqual([]);
  });

  it("falls back to selected stage and then active stage", () => {
    expect(
      getPanelState({
        artifacts,
        skills,
        stages: workflowStages,
        selectedStageId: "verify"
      }).stage.id
    ).toBe("verify");

    expect(
      getPanelState({
        artifacts,
        skills,
        stages: workflowStages
      }).stage.id
    ).toBe("spec");
  });
});
```

- [ ] **Step 2: Run selector tests to verify failure**

Run: `npm run test -- src/lib/workflowSelectors.test.ts`

Expected: FAIL because `src/lib/workflowSelectors.ts` does not exist.

- [ ] **Step 3: Implement selectors**

Create `src/lib/workflowSelectors.ts`:

```ts
import type { Artifact, Skill, WorkflowStage } from "../types";

export interface PanelStateInput {
  artifacts: Artifact[];
  skills: Skill[];
  stages: WorkflowStage[];
  selectedSkillId?: string;
  selectedStageId?: string;
}

export interface PanelState {
  skill?: Skill;
  stage: WorkflowStage;
  artifacts: Artifact[];
}

export function getActiveStage(stages: WorkflowStage[]) {
  return stages.find((stage) => stage.status === "active") ?? stages[0];
}

export function getStageById(stages: WorkflowStage[], stageId?: string) {
  return stages.find((stage) => stage.id === stageId);
}

export function getSkillById(skills: Skill[], skillId?: string) {
  return skills.find((skill) => skill.id === skillId);
}

export function getArtifactsForStage(artifacts: Artifact[], stageId: string) {
  return artifacts.filter((artifact) => artifact.stageId === stageId);
}

export function getPanelState({
  artifacts,
  skills,
  stages,
  selectedSkillId,
  selectedStageId
}: PanelStateInput): PanelState {
  const skill = getSkillById(skills, selectedSkillId);
  const skillStage = skill ? getStageById(stages, skill.stageIds.at(-1)) : undefined;
  const selectedStage = getStageById(stages, selectedStageId);
  const stage = skillStage ?? selectedStage ?? getActiveStage(stages);

  return {
    skill,
    stage,
    artifacts: getArtifactsForStage(artifacts, stage.id)
  };
}
```

- [ ] **Step 4: Run selector tests**

Run: `npm run test -- src/lib/workflowSelectors.test.ts`

Expected: PASS. All selector tests pass.

- [ ] **Step 5: Commit selectors**

```bash
git add src/lib
git commit -m "feat: add workflow selectors"
```

## Task 4: Interactive Dashboard Components

**Files:**
- Create: `src/components/StatusBadge.tsx`
- Create: `src/components/DashboardHeader.tsx`
- Create: `src/components/SkillMap.tsx`
- Create: `src/components/WorkflowTimeline.tsx`
- Create: `src/components/NextActionPanel.tsx`
- Create: `src/components/ArtifactsList.tsx`
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Write failing dashboard interaction tests**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Superpowers Progress dashboard", () => {
  it("opens as a working dashboard", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Superpowers Progress" })).toBeInTheDocument();
    expect(screen.getByText("Skill Map")).toBeInTheDocument();
    expect(screen.getByText("Workflow Timeline")).toBeInTheDocument();
    expect(screen.getByText("Next Action")).toBeInTheDocument();
    expect(screen.getByText("Artifacts")).toBeInTheDocument();
  });

  it("updates the next action panel when a skill is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /test-driven-development/i }));

    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Implement In Thin Slices")).toBeInTheDocument();
    expect(screen.getByText("Execute the first implementation task.")).toBeInTheDocument();
  });

  it("updates the next action panel when a workflow stage is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /verify/i }));

    expect(screen.getByText("Verify")).toBeInTheDocument();
    expect(screen.getByText("Prove It Works")).toBeInTheDocument();
    expect(screen.getByText("Run npm checks and visual QA.")).toBeInTheDocument();
    expect(screen.getByText("Production Build")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run dashboard tests to verify failure**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because dashboard components do not exist and `App.tsx` is still the scaffold.

- [ ] **Step 3: Add shared status badge and header components**

Create `src/components/StatusBadge.tsx`:

```tsx
import type { ArtifactStatus, WorkflowStatus } from "../types";

interface StatusBadgeProps {
  status: WorkflowStatus | ArtifactStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{status}</span>;
}
```

Create `src/components/DashboardHeader.tsx`:

```tsx
import { Sparkles } from "lucide-react";
import type { WorkflowStage } from "../types";

interface DashboardHeaderProps {
  activeStage: WorkflowStage;
}

export function DashboardHeader({ activeStage }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__brand">
        <Sparkles aria-hidden="true" size={22} />
        <div>
          <h1>Superpowers Progress</h1>
          <p>Local workflow dashboard for skill-driven development.</p>
        </div>
      </div>
      <div className="dashboard-header__summary" aria-label="Current workflow stage">
        <span>Current stage</span>
        <strong>{activeStage.label}</strong>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Add Skill Map and Workflow Timeline**

Create `src/components/SkillMap.tsx`:

```tsx
import { Brain, CheckCircle2, CircleDashed, Lock, WandSparkles } from "lucide-react";
import type { Skill } from "../types";
import { StatusBadge } from "./StatusBadge";

interface SkillMapProps {
  skills: Skill[];
  selectedSkillId?: string;
  onSelectSkill: (skillId: string) => void;
}

const statusIcons = {
  complete: CheckCircle2,
  active: WandSparkles,
  next: Brain,
  gated: Lock,
  pending: CircleDashed
};

export function SkillMap({ skills, selectedSkillId, onSelectSkill }: SkillMapProps) {
  return (
    <section className="panel skill-map" aria-labelledby="skill-map-title">
      <div className="panel__header">
        <span className="panel__eyebrow">Skills</span>
        <h2 id="skill-map-title">Skill Map</h2>
      </div>
      <div className="skill-map__list">
        {skills.map((skill) => {
          const Icon = statusIcons[skill.status];
          const selected = skill.id === selectedSkillId;

          return (
            <button
              className={`skill-card${selected ? " skill-card--selected" : ""}`}
              key={skill.id}
              onClick={() => onSelectSkill(skill.id)}
              type="button"
              aria-pressed={selected}
            >
              <span className="skill-card__icon">
                <Icon aria-hidden="true" size={18} />
              </span>
              <span className="skill-card__body">
                <span className="skill-card__name">{skill.name}</span>
                <span className="skill-card__purpose">{skill.purpose}</span>
                <span className="skill-card__trigger">{skill.trigger}</span>
              </span>
              <StatusBadge status={skill.status} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
```

Create `src/components/WorkflowTimeline.tsx`:

```tsx
import type { WorkflowStage } from "../types";
import { StatusBadge } from "./StatusBadge";

interface WorkflowTimelineProps {
  stages: WorkflowStage[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}

export function WorkflowTimeline({
  stages,
  selectedStageId,
  onSelectStage
}: WorkflowTimelineProps) {
  return (
    <section className="panel workflow-panel" aria-labelledby="workflow-title">
      <div className="panel__header">
        <span className="panel__eyebrow">Flow</span>
        <h2 id="workflow-title">Workflow Timeline</h2>
      </div>
      <div className="workflow-timeline" role="list">
        {stages.map((stage, index) => {
          const selected = stage.id === selectedStageId;

          return (
            <button
              aria-pressed={selected}
              className={`workflow-step${selected ? " workflow-step--selected" : ""}`}
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              type="button"
            >
              <span className="workflow-step__index">{index + 1}</span>
              <span className="workflow-step__content">
                <span className="workflow-step__label">{stage.label}</span>
                <span className="workflow-step__title">{stage.title}</span>
                <span className="workflow-step__gate">{stage.gate}</span>
              </span>
              <StatusBadge status={stage.status} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add Next Action and Artifacts components**

Create `src/components/NextActionPanel.tsx`:

```tsx
import { ArrowRight, ShieldCheck, TriangleAlert } from "lucide-react";
import type { Skill, WorkflowStage } from "../types";
import { StatusBadge } from "./StatusBadge";

interface NextActionPanelProps {
  skill?: Skill;
  stage: WorkflowStage;
}

export function NextActionPanel({ skill, stage }: NextActionPanelProps) {
  return (
    <aside className="panel next-action" aria-labelledby="next-action-title">
      <div className="panel__header">
        <span className="panel__eyebrow">Now</span>
        <h2 id="next-action-title">Next Action</h2>
      </div>
      <div className="next-action__stage">
        <span>{stage.label}</span>
        <StatusBadge status={stage.status} />
      </div>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>
      {skill ? (
        <div className="next-action__skill">
          Selected skill: <strong>{skill.name}</strong>
        </div>
      ) : null}
      <div className="next-action__callout">
        <ArrowRight aria-hidden="true" size={18} />
        <span>{stage.nextAction}</span>
      </div>
      <div className="next-action__meta">
        <div>
          <ShieldCheck aria-hidden="true" size={17} />
          <span>{stage.gate}</span>
        </div>
        {stage.blocker ? (
          <div>
            <TriangleAlert aria-hidden="true" size={17} />
            <span>{stage.blocker}</span>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
```

Create `src/components/ArtifactsList.tsx`:

```tsx
import { FileCheck2, FileClock } from "lucide-react";
import type { Artifact } from "../types";
import { StatusBadge } from "./StatusBadge";

interface ArtifactsListProps {
  artifacts: Artifact[];
  stageLabel: string;
}

export function ArtifactsList({ artifacts, stageLabel }: ArtifactsListProps) {
  return (
    <section className="panel artifacts-panel" aria-labelledby="artifacts-title">
      <div className="panel__header">
        <span className="panel__eyebrow">Outputs</span>
        <h2 id="artifacts-title">Artifacts</h2>
      </div>
      {artifacts.length === 0 ? (
        <p className="artifacts-empty">No artifacts expected for this stage.</p>
      ) : (
        <div className="artifacts-list">
          {artifacts.map((artifact) => {
            const Icon = artifact.status === "created" ? FileCheck2 : FileClock;

            return (
              <article className="artifact-item" key={artifact.id}>
                <div className="artifact-item__icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <div>
                  <div className="artifact-item__topline">
                    <h3>{artifact.name}</h3>
                    <StatusBadge status={artifact.status} />
                  </div>
                  <p>{artifact.description}</p>
                  {artifact.path ? <code>{artifact.path}</code> : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
      <p className="artifacts-panel__stage">Showing artifacts for {stageLabel}.</p>
    </section>
  );
}
```

- [ ] **Step 6: Compose the dashboard in App**

Replace `src/App.tsx`:

```tsx
import { useMemo, useState } from "react";
import { artifacts, skills, workflowStages } from "./data";
import { ArtifactsList } from "./components/ArtifactsList";
import { DashboardHeader } from "./components/DashboardHeader";
import { NextActionPanel } from "./components/NextActionPanel";
import { SkillMap } from "./components/SkillMap";
import { WorkflowTimeline } from "./components/WorkflowTimeline";
import { getActiveStage, getPanelState } from "./lib/workflowSelectors";

export default function App() {
  const activeStage = getActiveStage(workflowStages);
  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>("writing-plans");
  const [selectedStageId, setSelectedStageId] = useState(activeStage.id);

  const panelState = useMemo(
    () =>
      getPanelState({
        artifacts,
        skills,
        stages: workflowStages,
        selectedSkillId,
        selectedStageId
      }),
    [selectedSkillId, selectedStageId]
  );

  function handleSelectSkill(skillId: string) {
    setSelectedSkillId(skillId);
  }

  function handleSelectStage(stageId: string) {
    setSelectedSkillId(undefined);
    setSelectedStageId(stageId);
  }

  return (
    <main className="app-shell">
      <DashboardHeader activeStage={panelState.stage} />
      <div className="dashboard-grid">
        <SkillMap
          skills={skills}
          selectedSkillId={selectedSkillId}
          onSelectSkill={handleSelectSkill}
        />
        <WorkflowTimeline
          stages={workflowStages}
          selectedStageId={panelState.stage.id}
          onSelectStage={handleSelectStage}
        />
        <NextActionPanel skill={panelState.skill} stage={panelState.stage} />
      </div>
      <ArtifactsList artifacts={panelState.artifacts} stageLabel={panelState.stage.label} />
    </main>
  );
}
```

- [ ] **Step 7: Run dashboard tests**

Run: `npm run test -- src/App.test.tsx`

Expected: PASS. All three dashboard tests pass.

- [ ] **Step 8: Commit components**

```bash
git add src/App.tsx src/App.test.tsx src/components
git commit -m "feat: add interactive workflow dashboard"
```

## Task 5: Visual Styling And Responsive Layout

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace scaffold CSS with full dashboard styling**

Replace `src/styles.css`:

```css
:root {
  color: #18201c;
  background: #f5f1e8;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button {
  border: 0;
  font: inherit;
}

code {
  display: inline-block;
  max-width: 100%;
  overflow-wrap: anywhere;
  border-radius: 6px;
  background: #eef2e6;
  color: #314131;
  padding: 3px 6px;
  font-size: 0.78rem;
}

.app-shell {
  min-height: 100vh;
  padding: 28px;
  background:
    linear-gradient(120deg, rgba(31, 93, 75, 0.08), transparent 34%),
    linear-gradient(260deg, rgba(170, 65, 54, 0.08), transparent 30%),
    #f5f1e8;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin: 0 auto 20px;
  max-width: 1440px;
}

.dashboard-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dashboard-header__brand svg {
  color: #1f5d4b;
}

.dashboard-header h1 {
  margin: 0;
  font-size: clamp(1.55rem, 2vw, 2.25rem);
  line-height: 1.05;
}

.dashboard-header p,
.panel p {
  margin: 0;
  color: #607066;
  line-height: 1.5;
}

.dashboard-header__summary {
  min-width: 180px;
  border: 1px solid rgba(24, 32, 28, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.54);
  padding: 10px 12px;
}

.dashboard-header__summary span {
  display: block;
  color: #607066;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.dashboard-header__summary strong {
  display: block;
  margin-top: 3px;
  font-size: 1.05rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(360px, 1.25fr) minmax(280px, 0.85fr);
  gap: 16px;
  max-width: 1440px;
  margin: 0 auto 16px;
  align-items: start;
}

.panel {
  border: 1px solid rgba(24, 32, 28, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 18px 40px rgba(61, 52, 39, 0.08);
}

.panel__header {
  border-bottom: 1px solid rgba(24, 32, 28, 0.1);
  padding: 14px 16px 12px;
}

.panel__eyebrow {
  display: block;
  color: #8a4d3f;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.panel h2 {
  margin: 3px 0 0;
  font-size: 1rem;
}

.skill-map__list,
.workflow-timeline,
.artifacts-list {
  display: grid;
  gap: 8px;
  padding: 12px;
}

.skill-card,
.workflow-step {
  width: 100%;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: start;
  text-align: left;
  border: 1px solid rgba(24, 32, 28, 0.1);
  border-radius: 8px;
  background: #fbfaf4;
  color: #18201c;
  padding: 11px;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    transform 160ms ease;
}

.skill-card:hover,
.workflow-step:hover {
  border-color: rgba(31, 93, 75, 0.36);
  background: #ffffff;
}

.skill-card:focus-visible,
.workflow-step:focus-visible {
  outline: 3px solid rgba(31, 93, 75, 0.28);
  outline-offset: 2px;
}

.skill-card--selected,
.workflow-step--selected {
  border-color: #1f5d4b;
  background: #f4fbf3;
}

.skill-card__icon,
.artifact-item__icon {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #e5efe3;
  color: #1f5d4b;
}

.skill-card__body,
.workflow-step__content {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.skill-card__name,
.workflow-step__label {
  font-weight: 750;
  overflow-wrap: anywhere;
}

.skill-card__purpose,
.skill-card__trigger,
.workflow-step__title,
.workflow-step__gate {
  color: #607066;
  font-size: 0.84rem;
  line-height: 1.35;
}

.workflow-step__index {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #1f5d4b;
  color: #fff;
  font-weight: 800;
  font-size: 0.82rem;
}

.status-badge {
  align-self: start;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.status-badge--complete,
.status-badge--created {
  background: #dcebd9;
  color: #1f5d4b;
}

.status-badge--active {
  background: #f2e3bd;
  color: #7a5815;
}

.status-badge--next,
.status-badge--pending {
  background: #e7e4de;
  color: #4f5d55;
}

.status-badge--gated,
.status-badge--blocked {
  background: #f4d8d1;
  color: #8a3c30;
}

.next-action {
  padding-bottom: 14px;
}

.next-action__stage,
.next-action h3,
.next-action p,
.next-action__skill,
.next-action__callout,
.next-action__meta {
  margin-left: 16px;
  margin-right: 16px;
}

.next-action__stage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}

.next-action__stage > span {
  font-weight: 800;
  color: #1f5d4b;
}

.next-action h3 {
  margin-top: 14px;
  margin-bottom: 6px;
  font-size: 1.35rem;
  line-height: 1.15;
}

.next-action__skill {
  margin-top: 12px;
  color: #607066;
  font-size: 0.9rem;
}

.next-action__callout {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  margin-top: 16px;
  border-radius: 8px;
  background: #183d35;
  color: #ffffff;
  padding: 12px;
  font-weight: 700;
}

.next-action__callout svg {
  flex: 0 0 auto;
  margin-top: 2px;
}

.next-action__meta {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.next-action__meta div {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: #607066;
  font-size: 0.88rem;
  line-height: 1.4;
}

.next-action__meta svg {
  flex: 0 0 auto;
  color: #8a4d3f;
  margin-top: 1px;
}

.artifacts-panel {
  max-width: 1440px;
  margin: 0 auto;
}

.artifact-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
  border: 1px solid rgba(24, 32, 28, 0.1);
  border-radius: 8px;
  background: #fbfaf4;
  padding: 12px;
}

.artifact-item__topline {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
}

.artifact-item h3 {
  margin: 0;
  font-size: 0.98rem;
}

.artifact-item p {
  margin: 5px 0 8px;
}

.artifacts-empty,
.artifacts-panel__stage {
  padding: 12px 16px;
}

.artifacts-panel__stage {
  border-top: 1px solid rgba(24, 32, 28, 0.1);
  font-size: 0.86rem;
}

@media (max-width: 1100px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .next-action {
    grid-column: 1 / -1;
  }
}

@media (max-width: 760px) {
  .app-shell {
    padding: 16px;
  }

  .dashboard-header {
    align-items: stretch;
    flex-direction: column;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .skill-card,
  .workflow-step {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .skill-card .status-badge,
  .workflow-step .status-badge {
    grid-column: 2;
    justify-self: start;
  }

  .artifact-item__topline {
    flex-direction: column;
    align-items: start;
  }
}
```

- [ ] **Step 2: Verify tests still pass with final styles**

Run: `npm run test`

Expected: PASS. Data, selector, and dashboard tests pass.

- [ ] **Step 3: Verify production build**

Run: `npm run build`

Expected: PASS. Vite emits production assets in `dist/`.

- [ ] **Step 4: Commit styling**

```bash
git add src/styles.css
git commit -m "style: polish dashboard layout"
```

## Task 6: Browser Verification And Completion Notes

**Files:**
- Modify: `docs/superpowers/plans/2026-05-06-superpowers-progress.md`

- [ ] **Step 1: Run all automated checks**

Run: `npm run test`

Expected: PASS. All tests pass.

Run: `npm run build`

Expected: PASS. Production build succeeds.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

Expected: Vite prints a local URL, usually `http://localhost:5173/`.

- [ ] **Step 3: Visually inspect desktop layout**

Open the local URL at a desktop width around `1440x900`.

Expected:

- First screen is the dashboard.
- Header, Skill Map, Workflow Timeline, Next Action, and Artifacts are visible.
- No text overlaps.
- Status badges fit inside their parent controls.
- Selecting `test-driven-development` changes the right panel to the Build stage.
- Selecting `Verify` changes the right panel to the Verify stage and shows verification artifacts.

- [ ] **Step 4: Visually inspect mobile layout**

Resize to a mobile width around `390x844`.

Expected:

- Panels stack in one column.
- Button labels wrap cleanly.
- Status badges do not overflow.
- Artifacts remain readable.

- [ ] **Step 5: Update this plan with verification notes**

Append this section to `docs/superpowers/plans/2026-05-06-superpowers-progress.md`:

```markdown
## Verification Notes

- `npm run test`: PASS
- `npm run build`: PASS
- Browser interaction check: PASS
- Stacked/mobile visual check in the in-app browser: PASS
- Wide desktop visual check: PENDING manual inspection in a wider browser viewport; the in-app browser surface available during verification rendered the responsive stacked layout.
```

- [ ] **Step 6: Commit verification notes**

```bash
git add docs/superpowers/plans/2026-05-06-superpowers-progress.md
git commit -m "docs: record dashboard verification"
```

## Self-Review

Spec coverage:

- Single-page dashboard: Task 4 implements `App.tsx` and dashboard components.
- Skill map: Task 4 implements `SkillMap.tsx` with all required skills from Task 2.
- Workflow timeline: Task 4 implements `WorkflowTimeline.tsx` with stages from Task 2.
- Next action panel: Task 4 implements `NextActionPanel.tsx` and Task 3 selector behavior.
- Artifacts list: Task 4 implements `ArtifactsList.tsx`.
- Static typed data: Task 2 implements data and consistency tests.
- Error and empty states: Task 3 and Task 4 implement active-stage fallback and empty artifact state.
- Visual direction: Task 5 implements a dense local-tool layout and responsive CSS.
- Verification: Task 6 runs tests, build, browser interaction QA, and stacked responsive QA. Wide desktop visual QA is pending manual inspection in a wider browser viewport.

Placeholder scan:

- No red-flag placeholder tokens are used.
- Code steps include exact code blocks.
- Test steps include exact commands and expected results.

Type consistency:

- `WorkflowStatus`, `ArtifactStatus`, `WorkflowStage`, `Skill`, and `Artifact` are defined in Task 2 and reused consistently.
- Selector names used in tests match the implementation in Task 3.
- Component props use the domain types defined in Task 2.

## Verification Notes

- `npm run test`: PASS
- `npm run build`: PASS
- Browser interaction check: PASS
- Stacked/mobile visual check in the in-app browser: PASS
- Wide desktop visual check: PENDING manual inspection in a wider browser viewport; the in-app browser surface available during verification rendered the responsive stacked layout.
