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
        <span className="panel__eyebrow">Сейчас</span>
        <h2 id="next-action-title">Следующее действие</h2>
      </div>
      <div className="next-action__stage">
        <span>{stage.label}</span>
        <StatusBadge status={stage.status} />
      </div>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>
      {skill ? (
        <div className="next-action__skill">
          Выбранный навык: <strong>{skill.name}</strong>
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
