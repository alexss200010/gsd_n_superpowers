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

// Generic types shared across command-style cheat sheets (GSD, Git, ...).
export interface CheatSheetCommand {
  id: string;
  label: string;
  command: string;
  purpose: string;
  when: string;
  output: string;
  guardrail: string;
}

export interface CheatSheetPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface CheatSheetAdvancedCommand {
  id: string;
  name: string;
  command: string;
  category: string;
  description: string;
}

export interface CheatSheetPipelineStep {
  id: string;
  command: string;
  phase: string;
  when: string;
  output: string;
  example: string;
}

// Backward-compatible aliases — keep until all callers are migrated.
export type GsdCommand = CheatSheetCommand;
export type GsdPrinciple = CheatSheetPrinciple;
export type GsdAdvancedCommand = CheatSheetAdvancedCommand;
export type GsdPipelineStep = CheatSheetPipelineStep;

export interface ProductPipelineStep {
  id: string;
  phase: string;
  skill: string;
  prompt: string;
  artifact: string;
  outcome: string;
}
