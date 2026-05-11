import { ArrowRight, CheckCircle2, GitPullRequest, ShieldCheck, Terminal } from "lucide-react";
import type { GsdAdvancedCommand, GsdCommand, GsdPipelineStep, GsdPrinciple } from "../types";
import { GsdPipeline } from "./GsdPipeline";

interface GsdCheatSheetProps {
  advancedCommands: GsdAdvancedCommand[];
  commands: GsdCommand[];
  pipelineExample: {
    productName: string;
    premise: string;
    steps: GsdPipelineStep[];
  };
  principles: GsdPrinciple[];
  selectedCommandId: string;
  onSelectCommand: (commandId: string) => void;
}

export function GsdCheatSheet({
  advancedCommands,
  commands,
  pipelineExample,
  principles,
  selectedCommandId,
  onSelectCommand
}: GsdCheatSheetProps) {
  const selectedCommand = commands.find((command) => command.id === selectedCommandId) ?? commands[0];

  return (
    <section className="gsd-page" aria-labelledby="gsd-title">
      <header className="gsd-hero">
        <div className="gsd-hero__copy">
          <span className="panel__eyebrow">Шпаргалка</span>
          <h1 id="gsd-title">Get Shit Done</h1>
          <p>Шесть команд, чтобы держать контекст чистым и доводить фазы до ship.</p>
        </div>
        <div className="gsd-hero__signal" aria-label="Главный цикл GSD">
          <Terminal aria-hidden="true" size={22} />
          <span>discuss</span>
          <ArrowRight aria-hidden="true" size={17} />
          <span>plan</span>
          <ArrowRight aria-hidden="true" size={17} />
          <span>ship</span>
        </div>
      </header>

      <div className="gsd-layout">
        <section className="panel gsd-flow" aria-labelledby="gsd-flow-title">
          <div className="panel__header">
            <span className="panel__eyebrow">Цикл</span>
            <h2 id="gsd-flow-title">Команды по порядку</h2>
          </div>
          <div className="gsd-flow__list" role="list">
            {commands.map((command, index) => {
              const selected = command.id === selectedCommand.id;

              return (
                <button
                  aria-pressed={selected}
                  className={`gsd-command${selected ? " gsd-command--selected" : ""}`}
                  key={command.id}
                  onClick={() => onSelectCommand(command.id)}
                  type="button"
                >
                  <span className="gsd-command__index">{index + 1}</span>
                  <span className="gsd-command__body">
                    <strong>{command.label}</strong>
                    <code>{command.command}</code>
                    <span>{command.purpose}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="panel gsd-detail" aria-labelledby="gsd-detail-title">
          <div className="panel__header">
            <span className="panel__eyebrow">Фокус</span>
            <h2 id="gsd-detail-title">Выбранная команда GSD</h2>
          </div>
          <div className="gsd-detail__body">
            <code>{selectedCommand.command}</code>
            <h3>{selectedCommand.label}</h3>
            <p>{selectedCommand.purpose}</p>
            <div className="gsd-detail__meta">
              <div>
                <CheckCircle2 aria-hidden="true" size={17} />
                <span>{selectedCommand.when}</span>
              </div>
              <div>
                <GitPullRequest aria-hidden="true" size={17} />
                <span>{selectedCommand.output}</span>
              </div>
              <div>
                <ShieldCheck aria-hidden="true" size={17} />
                <span>{selectedCommand.guardrail}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="gsd-principles" aria-label="Почему GSD работает">
        {principles.map((principle) => (
          <article className="panel gsd-principle" key={principle.id}>
            <span className="panel__eyebrow">Почему работает</span>
            <h2>{principle.title}</h2>
            <p>{principle.description}</p>
          </article>
        ))}
      </section>

      <GsdPipeline
        productName={pipelineExample.productName}
        premise={pipelineExample.premise}
        steps={pipelineExample.steps}
      />

      <section className="panel gsd-advanced" aria-labelledby="gsd-advanced-title">
        <div className="panel__header">
          <span className="panel__eyebrow">Power tools</span>
          <h2 id="gsd-advanced-title">Продвинутые команды</h2>
        </div>
        <div className="gsd-advanced__grid">
          {advancedCommands.map((command) => (
            <article className="gsd-advanced-card" key={command.id}>
              <div className="gsd-advanced-card__topline">
                <span>{command.category}</span>
                <code>{command.command}</code>
              </div>
              <h3>{command.name}</h3>
              <p>{command.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
