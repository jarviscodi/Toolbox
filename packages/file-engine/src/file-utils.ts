import type { FileMetadata } from "./types";
import { getFileExtension } from "./validation";

export function getFileMetadata(file: File): FileMetadata {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    extension: getFileExtension(file.name),
  };
}

export function createObjectUrl(file: Blob): string {
  return URL.createObjectURL(file);
}

export function revokeObjectUrl(url: string): void {
  URL.revokeObjectURL(url);
}

export function downloadBlob(
  blob: Blob,
  filename: string,
): void {
  const url = createObjectUrl(blob);

  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  revokeObjectUrl(url);
}