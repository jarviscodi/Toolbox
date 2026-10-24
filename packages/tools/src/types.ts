export type ToolExecution = "client" | "server";

export type ToolCategory =
  | "PDF"
  | "Images"
  | "Documents"
  | "Developer"
  | "Hash & Security"
  | "Calculators";

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  execution: ToolExecution;

  inputMimeTypes?: string[];
  outputMimeTypes?: string[];

  acceptsMultipleFiles?: boolean;
}