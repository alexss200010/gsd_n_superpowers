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
