
"use client";

const popularTools = [
  {
    name: "JPG → PDF",
    description: "Convert images into a PDF document.",
    toolId: "jpg-to-pdf",
    available: true,
  },
  {
    name: "PDF → JPG",
    description: "Turn PDF pages into image files.",
    toolId: "pdf-to-jpg",
    available: false,
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size for sharing.",
    toolId: "compress-pdf",
    available: false,
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files.",
    toolId: "merge-pdf",
    available: true,
  },
  {
    name: "Image Compressor",
    description: "Reduce image size quickly.",
    toolId: "image-compressor",
    available: false,
  },
  {
    name: "Resize Image",
    description: "Resize an image to exact dimensions.",
    toolId: "resize-image",
    available: false,
  },
];

export default function PopularTools() {
  const handleToolClick = (toolId: string) => {
    window.dispatchEvent(
      new CustomEvent("toolbox:select-tool", {
        detail: { toolId },
      }),
    );

    document.getElementById("tool-workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="toolGrid">
      {popularTools.map((tool) => (
        <article className="toolCard" key={tool.toolId}>
          <div className="toolIcon">◇</div>
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>

          {tool.available ? (
            <button
              type="button"
              className="toolCardAction"
              onClick={() => handleToolClick(tool.toolId)}
            >
              Open tool →
            </button>
          ) : (
            <span className="toolComingSoon">Coming soon</span>
          )}
        </article>
      ))}
    </div>
  );
}
