import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer id="contact" className="border-t px-6 md:px-12 py-16" style={{ borderColor: "rgba(255,20,147,0.15)" }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
            THEBOSSIPGIRL
          </Link>
          <p className="text-label mt-2" style={{ color: "rgba(255,182,193,0.7)" }}>
            DIGITAL BLUEPRINTS FOR IDENTITY SHIFTING & FINANCIAL SOVEREIGNTY
          </p>
        </div>

        <div className="flex gap-8">
          <a
            href="https://www.instagram.com/thebossipgirl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label hover-underline transition-colors"
            style={{ color: "rgba(255,182,193,0.7)" }}
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.pinterest.com/mylittlepinbook/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label hover-underline transition-colors"
            style={{ color: "rgba(255,182,193,0.7)" }}
          >
            PINTEREST
          </a>
        </div>
      </div>

      {/* Email CTA strip */}
      <div
        className="mt-12 py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,20,147,0.06), rgba(255,105,180,0.04))",
          border: "1px solid rgba(255,20,147,0.15)",
        }}
      >
        <p className="font-display text-2xl md:text-3xl tracking-tighter text-foreground italic">
          Ready to stop blending in?
        </p>
        <Link
          to="/#circle"
          className="flex-shrink-0 px-8 py-3 font-ui text-xs tracking-[0.2em] uppercase text-foreground transition-all hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(255,20,147,0.85), rgba(255,105,180,0.9))",
            border: "1px solid rgba(255,20,147,0.5)",
            boxShadow: "0 0 20px rgba(255,20,147,0.2)",
          }}
        >
          JOIN THE INNER CIRCLE →
        </Link>
      </div>

      <div className="mt-8 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span className="text-label" style={{ color: "rgba(255,182,193,0.5)" }}>
          © 2024 THEBOSSIPGIRL. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-8">
          <a href="#" className="text-label hover-underline" style={{ color: "rgba(255,182,193,0.5)" }}>
            PRIVACY
          </a>
          <a href="#" className="text-label hover-underline" style={{ color: "rgba(255,182,193,0.5)" }}>
            TERMS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
