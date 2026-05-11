# Superpowers Progress Design

Date: 2026-05-06
Status: Design approved; pending written spec review

## Purpose

Superpowers Progress is a local web dashboard for understanding and practicing the Superpowers development workflow. The project is both a learning tool about Superpowers and an example of using Superpowers to build software.

The first version should make the workflow visible:

Idea -> Brainstorming -> Design Spec -> Implementation Plan -> Build -> Verification -> Finish

The dashboard should open directly into a working interface, not a landing page. A user should immediately see the active workflow stage, the relevant skills, expected gates, next action, and artifacts.

## Scope

Version 1 is a static local web app with demo data. It does not read real `SKILL.md` files, inspect git state, parse specs, or run commands. The data model should still be shaped so those real integrations can be added later without redesigning the UI.

In scope:

- A single-page dashboard.
- A skill map with key Superpowers skills and statuses.
- A workflow timeline showing stages, gates, and current progress.
- A next action panel that updates based on the selected skill or stage.
- An artifacts list for specs, plans, verification notes, commits, or PRs.
- Local verification with a production build and visual browser check.

Out of scope for v1:

- Backend service.
- File system scanning.
- Git integration.
- Authentication.
- Persistence across reloads.
- Multi-project management.

## Product Model

The app has four core concepts.

`Skill` represents a Superpowers skill such as `using-superpowers`, `brainstorming`, or `verification-before-completion`. It includes a name, purpose, trigger, status, and related workflow stages.

`WorkflowStage` represents one step in the development process. It includes a label, description, status, gate, blockers, and next action.

`Artifact` represents something created or expected during the workflow, such as a design spec, implementation plan, verification log, commit, or PR.

`NextAction` is the practical recommendation shown to the user for the current state.

## User Experience

The first screen is a focused work dashboard.

The left side contains the Skill Map. It lists important skills for the first workflow:

- `using-superpowers`
- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `verification-before-completion`
- `finishing-a-development-branch`

Each skill shows a compact status: available, active, gated, or next.

The center contains the Workflow Timeline:

Idea -> Brainstorm -> Spec -> Plan -> Build -> Verify -> Finish

The active stage is visually highlighted. Each stage can show its gate, such as user approval for a spec or verification output before completion.

The right side contains the Next Action Panel. It shows the current stage, next action, blocker, and short explanation. Selecting a skill or stage updates this panel.

Below the main workflow area, the Artifacts section lists expected files or outputs. It should be easy to see which artifacts exist in the demo model and which are still pending.

## Architecture

Use Vite, React, and TypeScript.

Recommended structure:

```text
src/
  App.tsx
  data/
    artifacts.ts
    skills.ts
    workflow.ts
  components/
    ArtifactsList.tsx
    NextActionPanel.tsx
    SkillMap.tsx
    WorkflowTimeline.tsx
```

`src/data/` contains static typed objects for skills, stages, gates, artifacts, and next actions.

`src/components/` contains presentation components with clear props. Components should avoid hidden global state and should be understandable from their public interface.

`src/App.tsx` owns selected state for `selectedSkillId` and `selectedStageId`, derives the active next action, and composes the dashboard.

## Data Flow

The app loads static arrays from `src/data/`. `App.tsx` keeps the selected skill and selected workflow stage in React state.

When a user selects a skill or stage:

- The selected item becomes active.
- The timeline highlights the related stage.
- The next action panel shows the relevant gate, blocker, and recommendation.
- The artifacts list can emphasize related artifacts.

The data model should use domain names that will still make sense when replaced by real project inputs: `trigger`, `gate`, `status`, `artifacts`, `nextAction`, and `blockers`.

## Error Handling And Empty States

Because v1 uses static local data, error handling is mostly defensive UI behavior.

If no skill is selected, the right panel shows the current workflow-level next action.

If no stage is selected, the app defaults to the active stage.

If a stage has no artifacts, the artifacts area shows a quiet empty state: "No artifacts expected for this stage."

If an artifact references a missing stage, the UI does not crash. It displays the artifact in the general list without stage-specific emphasis.

TypeScript should catch most model mismatches during development. A runtime error boundary is not required for v1.

## Visual Design Direction

The interface should feel like a serious local development tool: dense, calm, and practical. Avoid a marketing hero, decorative cards inside cards, oversized type, or a one-note color palette.

Use restrained panels, clear hierarchy, compact labels, and familiar controls. The first viewport must communicate the product immediately through the dashboard itself.

## Testing And Verification

The required verification for v1 is:

- `npm run build` succeeds.
- The local dev server opens successfully.
- The dashboard renders without overlapping text on desktop and mobile widths.
- Selecting skills and workflow stages updates the next action panel.
- The first screen is the working dashboard, not a landing page.

Unit tests are optional for v1. They become more valuable once real file parsing, filtering, or command integrations are added.

## Future Extensions

Potential later phases:

- Read installed `SKILL.md` metadata from the file system.
- Detect current workflow stage from `docs/superpowers/specs/`, plans, git state, and verification logs.
- Add a CLI command that recommends the next applicable skill.
- Track multiple projects.
- Show unresolved gates and review checkpoints.
