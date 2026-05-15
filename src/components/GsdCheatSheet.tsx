import type {
  CheatSheetAdvancedCommand,
  CheatSheetCommand,
  CheatSheetPipelineStep,
  CheatSheetPrinciple
} from "../types";
import { CommandCheatSheet } from "./CommandCheatSheet";

// Thin wrapper preserved for backward compatibility — delegates to the generic
// CommandCheatSheet. New cheat sheets should call CommandCheatSheet directly.
interface GsdCheatSheetProps {
  advancedCommands: CheatSheetAdvancedCommand[];
  commands: CheatSheetCommand[];
  pipelineExample: {
    productName: string;
    premise: string;
    steps: CheatSheetPipelineStep[];
  };
  principles: CheatSheetPrinciple[];
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
  return (
    <CommandCheatSheet
      shortName="GSD"
      eyebrow="Шпаргалка"
      title="Get Shit Done"
      subtitle="Шесть команд, чтобы держать контекст чистым и доводить фазы до ship."
      heroSignals={["discuss", "plan", "ship"]}
      commands={commands}
      principles={principles}
      advancedCommands={advancedCommands}
      pipelineExample={pipelineExample}
      selectedCommandId={selectedCommandId}
      onSelectCommand={onSelectCommand}
    />
  );
}
