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

export interface GsdCommand {
  id: string;
  label: string;
  command: string;
  purpose: string;
  when: string;
  output: string;
  guardrail: string;
}

export interface GsdPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface GsdAdvancedCommand {
  id: string;
  name: string;
  command: string;
  category: string;
  description: string;
}

export interface GsdPipelineStep {
  id: string;
  command: string;
  phase: string;
  when: string;
  output: string;
  example: string;
}

export interface ProductPipelineStep {
  id: string;
  phase: string;
  skill: string;
  prompt: string;
  artifact: string;
  outcome: string;
}
