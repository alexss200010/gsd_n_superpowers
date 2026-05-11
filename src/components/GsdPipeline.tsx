import { ClipboardCheck, FolderKanban, TerminalSquare } from "lucide-react";
import type { GsdPipelineStep } from "../types";

interface GsdPipelineProps {
  productName: string;
  premise: string;
  steps: GsdPipelineStep[];
}

export function GsdPipeline({ productName, premise, steps }: GsdPipelineProps) {
  return (
    <section className="panel gsd-pipeline" aria-labelledby="gsd-pipeline-title">
      <div className="gsd-pipeline__intro">
        <div>
          <span className="panel__eyebrow">Пример запуска</span>
          <h2 id="gsd-pipeline-title">Пример GSD pipeline</h2>
          <p>{premise}</p>
        </div>
        <div className="gsd-pipeline__product" aria-label="Пример продукта GSD">
          <FolderKanban aria-hidden="true" size={20} />
          <strong>{productName}</strong>
        </div>
      </div>

      <div className="gsd-pipeline__legend" aria-label="Структура GSD примера">
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
