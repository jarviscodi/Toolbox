
"use client";

import { useState } from "react";
import styles from "./ToolWorkspace.module.css";

import {
  downloadBlob,
  formatBytes,
  getToolProcessor,
} from "@toolbox/file-engine";

import type { ToolDefinition } from "@toolbox/tools";

interface ToolWorkspaceProps {
  files: File[];
  tool: ToolDefinition;
}

export default function ToolWorkspace({
  files,
  tool,
}: ToolWorkspaceProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const isMergePdf = tool.id === "merge-pdf";

  const handleProcess = async () => {
    if (isMergePdf && files.length < 2) {
      setError("Select at least two PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setCompleted(false);

    try {
      const processor = getToolProcessor(tool.id);
      const result = await processor(files);

      downloadBlob(result.blob, result.filename);
      setCompleted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while processing your files.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className={styles.workspace}>
      <div className={styles.fileInfo}>
        {files.map((file, index) => (
          <div key={`${file.name}-${index}`}>
            <strong>{file.name}</strong>
            <p>
              {file.type || "Unknown type"} · {formatBytes(file.size)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.toolInfo}>
        <span className={styles.category}>{tool.category}</span>
        <h2>{tool.name}</h2>
        <p>{tool.description}</p>
      </div>

      {isMergePdf && files.length < 2 && (
        <p>Select at least two PDF files to use this tool.</p>
      )}

      <button
        type="button"
        className={styles.convertButton}
        onClick={handleProcess}
        disabled={isProcessing || (isMergePdf && files.length < 2)}
      >
        {isProcessing
          ? "Processing..."
          : isMergePdf
            ? "Merge PDFs"
            : "Convert to PDF"}
      </button>

      {completed && (
        <div className={styles.success}>
          ✓ {tool.name} completed successfully. Your download should have started.
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </section>
  );
}
