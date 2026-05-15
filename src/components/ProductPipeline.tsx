import { Boxes, FileCheck2, MessageSquareText } from "lucide-react";
import type { ProductPipelineStep } from "../types";

interface ProductPipelineProps {
  productName: string;
  premise: string;
  steps: ProductPipelineStep[];
}

export function ProductPipeline({ productName, premise, steps }: ProductPipelineProps) {
  return (
    <section className="panel product-pipeline" aria-labelledby="product-pipeline-title">
      <div className="product-pipeline__intro">
        <div>
          <span className="panel__eyebrow">Наглядный сценарий</span>
          <h2 id="product-pipeline-title">Пример pipeline продукта</h2>
          <p>{premise}</p>
        </div>
        <div className="product-pipeline__product" aria-label="Пример продукта">
          <Boxes aria-hidden="true" size={20} />
          <strong>{productName}</strong>
        </div>
      </div>

      <div className="product-pipeline__legend" aria-label="Структура примера">
        <span>Скилл</span>
        <span>Что попросить</span>
        <span>Артефакт</span>
      </div>

      <div className="product-pipeline__steps">
        {steps.map((step) => (
          <article className="product-pipeline__step" key={step.id}>
            <div className="product-pipeline__phase">
              <span>{step.phase}</span>
              <strong>{step.skill}</strong>
            </div>
            <div className="product-pipeline__prompt">
              <MessageSquareText aria-hidden="true" size={17} />
              <p>{step.prompt}</p>
            </div>
            <div className="product-pipeline__artifact">
              <FileCheck2 aria-hidden="true" size={17} />
              <div>
                <strong>{step.artifact}</strong>
                <p>{step.outcome}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
