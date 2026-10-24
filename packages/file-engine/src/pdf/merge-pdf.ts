
import { PDFDocument } from "pdf-lib";
import type { ProcessedFile } from "../types";

export async function mergePdfs(
  files: File[],
): Promise<ProcessedFile> {
  if (files.length < 2) {
    throw new Error("Select at least two PDF files to merge.");
  }

  for (const file of files) {
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      throw new Error(
        `"${file.name}" is not a PDF file.`,
      );
    }

    if (file.size === 0) {
      throw new Error(
        `"${file.name}" is empty.`,
      );
    }
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    let sourcePdf: PDFDocument;

    try {
      const bytes = await file.arrayBuffer();
      sourcePdf = await PDFDocument.load(bytes);
    } catch {
      throw new Error(
        `Could not read "${file.name}". The PDF may be damaged or encrypted.`,
      );
    }

    const pageIndices = sourcePdf.getPageIndices();

    const copiedPages = await mergedPdf.copyPages(
      sourcePdf,
      pageIndices,
    );

    for (const page of copiedPages) {
      mergedPdf.addPage(page);
    }
  }

  const pdfBytes = await mergedPdf.save();

  // Copy to an ArrayBuffer for TypeScript BlobPart compatibility.
  const pdfBuffer = new ArrayBuffer(pdfBytes.byteLength);
  new Uint8Array(pdfBuffer).set(pdfBytes);

  return {
    blob: new Blob([pdfBuffer], {
      type: "application/pdf",
    }),
    filename: "merged.pdf",
    mimeType: "application/pdf",
  };
}
