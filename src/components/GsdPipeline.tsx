import type { CheatSheetPipelineStep } from "../types";
import { CommandPipeline } from "./CommandPipeline";

// Thin wrapper preserved for backward compatibility — delegates to the generic
// CommandPipeline with the GSD short name.
interface GsdPipelineProps {
  productName: string;
  premise: string;
  steps: CheatSheetPipelineStep[];
}

export function GsdPipeline({ productName, premise, steps }: GsdPipelineProps) {
  return (
    <CommandPipeline
      shortName="GSD"
      productName={productName}
      premise={premise}
      steps={steps}
    />
  );
}
