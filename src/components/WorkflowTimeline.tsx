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
        <span className="panel__eyebrow">Процесс</span>
        <h2 id="workflow-title">Этапы работы</h2>
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
