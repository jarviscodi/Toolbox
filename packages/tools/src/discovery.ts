import { toolRegistry } from "./registry";
import type { ToolDefinition } from "./types";

export function getToolsForFile(
  mimeType: string,
): ToolDefinition[] {
  return toolRegistry.filter((tool) => {
    if (
      !tool.inputMimeTypes ||
      tool.inputMimeTypes.length === 0
    ) {
      return false;
    }

    return tool.inputMimeTypes.includes(mimeType);
  });
}