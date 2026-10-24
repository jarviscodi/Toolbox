
import type { ProcessedFile } from "./types";
import { jpgToPdf } from "./pdf/jpg-to-pdf";
import { mergePdfs } from "./pdf/merge-pdf";

export type ToolProcessor = (
  files: File[],
) => Promise<ProcessedFile>;

const processors: Record<string, ToolProcessor> = {
  "jpg-to-pdf": async (files) => {
    const file = files[0];

    if (!file) {
      throw new Error("Select a JPG file first.");
    }

    return jpgToPdf(file);
  },

  "merge-pdf": mergePdfs,
};

export function getToolProcessor(
  toolId: string,
): ToolProcessor {
  const processor = processors[toolId];

  if (!processor) {
    throw new Error(
      `The "${toolId}" tool has not been implemented yet.`,
    );
  }

  return processor;
}
