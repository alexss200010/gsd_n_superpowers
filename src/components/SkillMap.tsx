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
        <span className="panel__eyebrow">Навыки</span>
        <h2 id="skill-map-title">Карта навыков</h2>
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
