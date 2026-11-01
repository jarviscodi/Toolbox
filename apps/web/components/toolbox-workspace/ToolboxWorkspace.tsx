
"use client";

import { useEffect, useState } from "react";
import styles from "./ToolboxWorkspace.module.css";

import FileUploader from "../file-uploader/FileUploader";
import ToolWorkspace from "../tool-workspace/ToolWorkspace";

import {
  getToolsForFile,
  type ToolDefinition,
} from "@toolbox/tools";

const acceptedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function ToolboxWorkspace() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedTool, setSelectedTool] =
    useState<ToolDefinition | null>(null);
  const [requestedToolId, setRequestedToolId] = useState<string | null>(null);

  useEffect(() => {
    const handleToolSelection = (event: Event) => {
      const customEvent = event as CustomEvent<{ toolId: string }>;
      setRequestedToolId(customEvent.detail.toolId);
      setSelectedFiles([]);
      setSelectedTool(null);
    };

    window.addEventListener("toolbox:select-tool", handleToolSelection);

    return () => {
      window.removeEventListener("toolbox:select-tool", handleToolSelection);
    };
  }, []);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setSelectedTool(null);
  };

  const availableTools =
    selectedFiles.length > 0
      ? getToolsForFile(selectedFiles[0].type)
      : [];

  useEffect(() => {
    if (!requestedToolId || selectedFiles.length === 0) {
      return;
    }

    const tool = availableTools.find(
      (item) => item.id === requestedToolId,
    );

    if (tool) {
      setSelectedTool(tool);
      setRequestedToolId(null);
    }
  }, [requestedToolId, selectedFiles, availableTools]);

  if (selectedFiles.length === 0) {
    return (
      <div>
        {requestedToolId && (
          <p className={styles.heading}>
            Selected tool: {requestedToolId}. Choose the required file(s) below.
          </p>
        )}

        <FileUploader
          accept={acceptedMimeTypes}
          maxSizeBytes={25 * 1024 * 1024}
          multiple
          onFilesSelected={handleFilesSelected}
        />
      </div>
    );
  }

  if (selectedTool) {
    return (
      <div>
        <ToolWorkspace files={selectedFiles} tool={selectedTool} />

        <button
          type="button"
          className={styles.changeTool}
          onClick={() => setSelectedTool(null)}
        >
          ← Choose another tool
        </button>

        <button
          type="button"
          className={styles.changeFile}
          onClick={() => {
            setSelectedFiles([]);
            setSelectedTool(null);
          }}
        >
          ← Choose other files
        </button>
      </div>
    );
  }

  return (
    <div className={styles.toolSelector}>
      <div className={styles.selectedFile}>
        <div>
          <strong>
            {selectedFiles.length === 1
              ? selectedFiles[0].name
              : `${selectedFiles.length} files selected`}
          </strong>
          {selectedFiles.length > 1 && (
            <p>{selectedFiles.map((file) => file.name).join(", ")}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedFiles([]);
            setSelectedTool(null);
          }}
        >
          Remove
        </button>
      </div>

      <div className={styles.heading}>
        <span>FILES READY</span>
        <h2>What would you like to do?</h2>
        <p>Choose an available tool for your uploaded file.</p>
      </div>

      {availableTools.length > 0 ? (
        <div className={styles.toolGrid}>
          {availableTools.map((tool) => (
            <button
              type="button"
              className={styles.toolCard}
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
            >
              <span className={styles.toolCategory}>{tool.category}</span>
              <strong>{tool.name}</strong>
              <p>{tool.description}</p>
              <span className={styles.openTool}>Open tool →</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.noTools}>
          <h3>No tools available yet</h3>
          <p>We don't have a compatible tool for this file type yet.</p>
        </div>
      )}
    </div>
  );
}
