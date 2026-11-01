
import ToolboxWorkspace from "../components/toolbox-workspace/ToolboxWorkspace";
import PopularTools from "../components/popular-tools/PopularTools";

export default function HomePage() {
  return (
    <main>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="/">
            ToolBox
          </a>

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
            Convert, compress, edit and organize PDFs, images and
            documents in one simple place.
          </p>

          <div id="tool-workspace">
            <ToolboxWorkspace />
          </div>
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

        <PopularTools />
      </section>

      <section className="container section categories">
        <p className="eyebrow">TOOL CATEGORIES</p>

        <h2>One platform. Many everyday tasks.</h2>

        <div className="categoryGrid">
          {[
            "PDF Tools",
            "Image Tools",
            "Document Tools",
            "Developer Tools",
            "Hash & Security",
            "Calculators",
          ].map((item) => (
            <div className="categoryCard" key={item}>
              {item}
              <span>→</span>
            </div>
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
