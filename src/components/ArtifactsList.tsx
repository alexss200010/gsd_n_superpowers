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
        <span className="panel__eyebrow">Результаты</span>
        <h2 id="artifacts-title">Артефакты</h2>
      </div>
      {artifacts.length === 0 ? (
        <p className="artifacts-empty">Для этого этапа артефакты не ожидаются.</p>
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
      <p className="artifacts-panel__stage">Показаны артефакты для этапа «{stageLabel}».</p>
    </section>
  );
}
