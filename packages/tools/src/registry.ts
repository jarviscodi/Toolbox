import type { ToolDefinition } from "./types";

export const toolRegistry: ToolDefinition[] = [
  {
    id: "jpg-to-pdf",
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    category: "PDF",
    description: "Convert JPG images into a PDF.",
    execution: "client",
    inputMimeTypes: ["image/jpeg"],
    outputMimeTypes: ["application/pdf"],
  },

  {
    id: "md5-generator",
    slug: "md5-generator",
    name: "MD5 Hash Generator",
    category: "Hash & Security",
    description: "Generate an MD5 hash from text.",
    execution: "client",
  },

  {
    id: "sha256-generator",
    slug: "sha256-generator",
    name: "SHA-256 Hash Generator",
    category: "Hash & Security",
    description: "Generate a SHA-256 hash from text.",
    execution: "client",
  },

  {
  id: "merge-pdf",
  slug: "merge-pdf",
  name: "Merge PDF",
  category: "PDF",
  description: "Combine multiple PDF files into one PDF.",
  execution: "client",
  inputMimeTypes: ["application/pdf"],
  outputMimeTypes: ["application/pdf"],
  acceptsMultipleFiles: true,
},
];