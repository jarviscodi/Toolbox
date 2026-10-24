import type {
  FileValidationOptions,
  FileValidationResult,
} from "./types";

export function validateFile(
  file: File,
  options: FileValidationOptions = {},
): FileValidationResult {
  const errors: string[] = [];

  if (!file) {
    return {
      valid: false,
      errors: ["No file was provided."],
    };
  }

  if (options.minSizeBytes !== undefined && file.size < options.minSizeBytes) {
    errors.push(
      `File must be at least ${formatBytes(options.minSizeBytes)}.`,
    );
  }

  if (options.maxSizeBytes !== undefined && file.size > options.maxSizeBytes) {
    errors.push(
      `File must be smaller than ${formatBytes(options.maxSizeBytes)}.`,
    );
  }

  if (
    options.allowedMimeTypes &&
    options.allowedMimeTypes.length > 0 &&
    !options.allowedMimeTypes.includes(file.type)
  ) {
    errors.push("This file type is not supported.");
  }

  if (
    options.allowedExtensions &&
    options.allowedExtensions.length > 0
  ) {
    const extension = getFileExtension(file.name);

    if (!options.allowedExtensions.includes(extension)) {
      errors.push("This file extension is not supported.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split(".");

  if (parts.length < 2) {
    return "";
  }

  return parts.pop() ?? "";
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}