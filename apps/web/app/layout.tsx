import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolBox — Simple tools for your everyday files",
  description:
    "Convert, compress, edit and organize PDFs, images and documents with simple online tools.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
