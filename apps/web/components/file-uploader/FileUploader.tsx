"use client";
import styles from "./FileUploader.module.css";
import { useRef, useState } from "react";
import {
  formatBytes,
  getFileMetadata,
  validateFile,
  type FileMetadata,
} from "@toolbox/file-engine";

interface FileUploaderProps {
  accept?: string[];
  maxSizeBytes?: number;
  multiple?: boolean;
  onFilesSelected?: (files: File[]) => void;
}

export default function FileUploader({
  accept = [],
  maxSizeBytes = 25 * 1024 * 1024,
  multiple = false,
  onFilesSelected,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState<FileMetadata[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    const fileErrors: string[] = [];

    selectedFiles.forEach((file) => {
      const result = validateFile(file, {
        allowedMimeTypes: accept.length > 0 ? accept : undefined,
        maxSizeBytes,
      });

      if (result.valid) {
        validFiles.push(file);
      } else {
        fileErrors.push(`${file.name}: ${result.errors.join(" ")}`);
      }
    });

    setErrors(fileErrors);
    setFiles(validFiles);
    setMetadata(validFiles.map(getFileMetadata));

    onFilesSelected?.(validFiles);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length > 0) {
      processFiles(multiple ? selectedFiles : [selectedFiles[0]]);
    }

    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    if (droppedFiles.length > 0) {
      processFiles(multiple ? droppedFiles : [droppedFiles[0]]);
    }
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setMetadata(updatedFiles.map(getFileMetadata));
    setErrors([]);

    onFilesSelected?.(updatedFiles);
  };

  return (
    <div className={styles.fileUploader}>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept={accept.join(",")}
        onChange={handleInputChange}
      />

      <div
        className={`${styles.uploadBox} ${isDragging ? styles.dragging : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={handleBrowse}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleBrowse();
          }
        }}
      >
        <div className={styles.uploadIcon}>↑</div>

        <h3>Drop your file here</h3>

        <p>or click to browse from your device</p>

        <span>Maximum file size: {formatBytes(maxSizeBytes)}</span>
      </div>

      {errors.length > 0 && (
        <div className={styles.errorBox}>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      {metadata.length > 0 && (
        <div className={styles.fileList}>
          {metadata.map((file, index) => (
            <div className={styles.fileItem} key={`${file.name}-${index}`}>
              <div>
                <strong>{file.name}</strong>

                <small>
                  {file.type || "Unknown type"} · {formatBytes(file.size)}
                </small>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile(index);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
