import { PDFDocument } from "pdf-lib";
import type { ProcessedFile } from "../types";

export async function jpgToPdf(
  file: File,
): Promise<ProcessedFile> {
  if (file.type !== "image/jpeg") {
    throw new Error("Only JPG/JPEG files are supported.");
  }

  const imageBytes = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.create();

  const jpgImage = await pdfDoc.embedJpg(imageBytes);

  const { width, height } = jpgImage.scale(1);

  const page = pdfDoc.addPage([width, height]);

  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width,
    height,
  });

  const pdfBytes = await pdfDoc.save();

const pdfBuffer = new ArrayBuffer(pdfBytes.byteLength);
new Uint8Array(pdfBuffer).set(pdfBytes);

const blob = new Blob([pdfBuffer], {
  type: "application/pdf",
});
  const baseName = file.name.replace(/\.[^/.]+$/, "");

  return {
    blob,
    filename: `${baseName}.pdf`,
    mimeType: "application/pdf",
  };
}