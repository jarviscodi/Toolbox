export interface FileValidationOptions {
  allowedMimeTypes?: string[];
  allowedExtensions?: string[];
  maxSizeBytes?: number;
  minSizeBytes?: number;
}

export interface FileValidationResult {
  valid: boolean;
  errors: string[];
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  extension: string;
}

export interface ProcessedFile {
  blob: Blob;
  filename: string;
  mimeType: string;
}