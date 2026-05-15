import { ClipboardCheck, FolderKanban, TerminalSquare } from "lucide-react";
import type { CheatSheetPipelineStep } from "../types";

interface CommandPipelineProps {
  // Short methodology name used in aria-labels and the heading ("GSD", "Git").
  shortName: string;
  productName: string;
  premise: string;
  steps: CheatSheetPipelineStep[];
}

export function CommandPipeline({ shortName, productName, premise, steps }: CommandPipelineProps) {
  const titleId = `${shortName.toLowerCase()}-pipeline-title`;

  return (
    <section className="panel gsd-pipeline" aria-labelledby={titleId}>
      <div className="gsd-pipeline__intro">
        <div>
          <span className="panel__eyebrow">Пример запуска</span>
          <h2 id={titleId}>{`Пример ${shortName} pipeline`}</h2>
          <p>{premise}</p>
        </div>
        <div className="gsd-pipeline__product" aria-label={`Пример продукта ${shortName}`}>
          <FolderKanban aria-hidden="true" size={20} />
          <strong>{productName}</strong>
        </div>
      </div>

      <div className="gsd-pipeline__legend" aria-label={`Структура ${shortName} примера`}>
        <span>Команда</span>
        <span>Когда запускать</span>
        <span>Что появится</span>
      </div>

      <div className="gsd-pipeline__steps">
        {steps.map((step) => (
          <article className="gsd-pipeline__step" key={step.id}>
            <div className="gsd-pipeline__command">
              <span>{step.phase}</span>
              <code>{step.command}</code>
            </div>
            <div className="gsd-pipeline__when">
              <TerminalSquare aria-hidden="true" size={17} />
              <div>
                <strong>{step.when}</strong>
                <p>{step.example}</p>
              </div>
            </div>
            <div className="gsd-pipeline__output">
              <ClipboardCheck aria-hidden="true" size={17} />
              <p>{step.output}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
