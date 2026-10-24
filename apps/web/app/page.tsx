import FileUploader from "../components/file-uploader/FileUploader";
import ToolboxWorkspace from "../components/toolbox-workspace/ToolboxWorkspace";
const popularTools = [
  ["JPG → PDF", "Convert images into a PDF document."],
  ["PDF → JPG", "Turn PDF pages into image files."],
  ["Compress PDF", "Reduce PDF file size for sharing."],
  ["Merge PDF", "Combine multiple PDF files."],
  ["Image Compressor", "Reduce image size quickly."],
  ["Resize Image", "Resize an image to exact dimensions."],
];

export default function HomePage() {
  return (
    <main>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="/">ToolBox</a>
          <nav aria-label="Main navigation">
            <a href="/tools/pdf">PDF</a>
            <a href="/tools/image">Images</a>
            <a href="/tools/documents">Documents</a>
            <a href="/tools/developer">Developer</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container heroInner">
          <p className="eyebrow">YOUR EVERYDAY FILE WORKSPACE</p>
          <h1>Everything you need for your files.</h1>
          <p className="heroText">
            Convert, compress, edit and organize PDFs, images and documents in one simple place.
          </p>

        <ToolboxWorkspace />
        </div>
      </section>

      <section className="container section">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">START HERE</p>
            <h2>Popular tools</h2>
          </div>
          <a href="/tools">View all tools →</a>
        </div>

        <div className="toolGrid">
          {popularTools.map(([name, description]) => (
            <article className="toolCard" key={name}>
              <div className="toolIcon">◇</div>
              <h3>{name}</h3>
              <p>{description}</p>
              <span>Open tool →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="container section categories">
        <p className="eyebrow">TOOL CATEGORIES</p>
        <h2>One platform. Many everyday tasks.</h2>
        <div className="categoryGrid">
          {["PDF Tools", "Image Tools", "Document Tools", "Developer Tools", "Hash & Security", "Calculators"].map((item) => (
            <div className="categoryCard" key={item}>{item}<span>→</span></div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container footerInner">
          <span>© 2026 ToolBox</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
