import { ArrowRight, CheckCircle2, GitPullRequest, ShieldCheck, Terminal } from "lucide-react";
import type {
  CheatSheetAdvancedCommand,
  CheatSheetCommand,
  CheatSheetPipelineStep,
  CheatSheetPrinciple
} from "../types";
import { CommandPipeline } from "./CommandPipeline";

interface CommandCheatSheetProps {
  // Short methodology name (e.g., "GSD", "Git"). Used in aria-labels and derived headings.
  shortName: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  // Up to three short tokens that summarise the main cycle ("discuss" → "plan" → "ship").
  heroSignals: string[];
  commands: CheatSheetCommand[];
  principles: CheatSheetPrinciple[];
  advancedCommands: CheatSheetAdvancedCommand[];
  pipelineExample: {
    productName: string;
    premise: string;
    steps: CheatSheetPipelineStep[];
  };
  selectedCommandId: string;
  onSelectCommand: (commandId: string) => void;
}

export function CommandCheatSheet({
  shortName,
  eyebrow,
  title,
  subtitle,
  heroSignals,
  commands,
  principles,
  advancedCommands,
  pipelineExample,
  selectedCommandId,
  onSelectCommand
}: CommandCheatSheetProps) {
  const selectedCommand = commands.find((command) => command.id === selectedCommandId) ?? commands[0];
  const slug = shortName.toLowerCase();
  const titleId = `${slug}-title`;
  const flowTitleId = `${slug}-flow-title`;
  const detailTitleId = `${slug}-detail-title`;
  const advancedTitleId = `${slug}-advanced-title`;
  const detailLabel = `Выбранная команда ${shortName}`;
  const heroSignalLabel = `Главный цикл ${shortName}`;
  const principlesLabel = `Почему ${shortName} работает`;

  return (
    <section className="gsd-page" aria-labelledby={titleId}>
      <header className="gsd-hero">
        <div className="gsd-hero__copy">
          <span className="panel__eyebrow">{eyebrow}</span>
          <h1 id={titleId}>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="gsd-hero__signal" aria-label={heroSignalLabel}>
          <Terminal aria-hidden="true" size={22} />
          {heroSignals.map((signal, index) => (
            <span key={`${signal}-${index}`} style={{ display: "contents" }}>
              <span>{signal}</span>
              {index < heroSignals.length - 1 ? <ArrowRight aria-hidden="true" size={17} /> : null}
            </span>
          ))}
        </div>
      </header>

      <div className="gsd-layout">
        <section className="panel gsd-flow" aria-labelledby={flowTitleId}>
          <div className="panel__header">
            <span className="panel__eyebrow">Цикл</span>
            <h2 id={flowTitleId}>Команды по порядку</h2>
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

        <aside className="panel gsd-detail" aria-labelledby={detailTitleId}>
          <div className="panel__header">
            <span className="panel__eyebrow">Фокус</span>
            <h2 id={detailTitleId}>{detailLabel}</h2>
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

      <section className="gsd-principles" aria-label={principlesLabel}>
        {principles.map((principle) => (
          <article className="panel gsd-principle" key={principle.id}>
            <span className="panel__eyebrow">Почему работает</span>
            <h2>{principle.title}</h2>
            <p>{principle.description}</p>
          </article>
        ))}
      </section>

      <CommandPipeline
        shortName={shortName}
        productName={pipelineExample.productName}
        premise={pipelineExample.premise}
        steps={pipelineExample.steps}
      />

      <section className="panel gsd-advanced" aria-labelledby={advancedTitleId}>
        <div className="panel__header">
          <span className="panel__eyebrow">Power tools</span>
          <h2 id={advancedTitleId}>Продвинутые команды</h2>
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
