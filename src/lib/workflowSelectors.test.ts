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
    expect(getStageById(workflowStages, "plan")?.label).toBe("План");
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
