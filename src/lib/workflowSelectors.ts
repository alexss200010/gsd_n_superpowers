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
  const skillStage = skill
    ? getStageById(stages, skill.stageIds[skill.stageIds.length - 1])
    : undefined;
  const selectedStage = getStageById(stages, selectedStageId);
  const stage = skillStage ?? selectedStage ?? getActiveStage(stages);

  return {
    skill,
    stage,
    artifacts: getArtifactsForStage(artifacts, stage.id)
  };
}
