import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";

const openPayhip = (url: string) => {
  const productId = url.split("/b/")[1];
  if (typeof window !== "undefined" && (window as any).Payhip) {
    (window as any).Payhip.checkout({ product: productId });
  } else {
    window.open(url, "_blank");
  }
};

const ArsenalSection = () => {
  const featured = PRODUCTS.find((p) => p.available);
  const coming = PRODUCTS.filter((p) => !p.available);

  return (
    <section id="arsenal" className="relative py-[15vh] md:py-[20vh] px-6 md:px-12 grain-overlay">
      {/* Header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <span className="font-ui text-xs tracking-[0.3em] uppercase" style={{ color: "#FF1493" }}>THE ARSENAL</span>
          <h2 className="font-display text-5xl md:text-8xl tracking-tighter text-foreground mt-4 leading-[0.85]">
            YOUR
            <br />
            <span className="italic">BLUEPRINTS</span>
          </h2>
        </div>
        <span className="font-ui text-xs tracking-[0.25em] uppercase hidden md:block" style={{ color: "rgba(255,182,193,0.7)" }}>
          01 AVAILABLE NOW
        </span>
      </div>

      {/* Featured Product — The Ignition */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20"
        >
          <div
            className="relative overflow-hidden grid md:grid-cols-2 border"
            style={{ borderColor: "rgba(255,20,147,0.25)", background: "rgba(255,20,147,0.03)" }}
          >
            {/* Image side */}
            <Link to={`/product/${featured.id}`} className="relative overflow-hidden aspect-[4/3] md:aspect-auto group" data-cursor="VIEW">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                style={{ minHeight: "400px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 pointer-events-none" />
              {/* NOW AVAILABLE badge */}
              <div
                className="absolute top-6 left-6 px-4 py-2 font-ui text-[10px] tracking-[0.3em] uppercase text-white"
                style={{ background: "#FF1493", boxShadow: "0 0 30px rgba(255,20,147,0.5)" }}
              >
                ✦ NOW AVAILABLE
              </div>
            </Link>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px" style={{ background: "#FF1493" }} />
                <span className="font-ui text-xs tracking-[0.3em] uppercase" style={{ color: "#FF1493" }}>
                  {featured.phase}
                </span>
              </div>

              <h3 className="font-display text-4xl md:text-6xl tracking-tighter text-foreground leading-[0.9] mb-3">
                {featured.title}
              </h3>

              <p className="font-display italic text-lg mb-6" style={{ color: "#FF1493" }}>
                {featured.tagline}
              </p>

              <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,182,193,0.8)" }}>
                {featured.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span
                  className="font-display text-6xl tracking-tighter"
                  style={{ color: "#FF1493", textShadow: "0 0 40px rgba(255,20,147,0.4)" }}
                >
                  {featured.price}
                </span>
                <div>
                  <p className="font-ui text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,182,193,0.6)" }}>One-time</p>
                  <p className="font-ui text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,182,193,0.6)" }}>investment</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Payhip buy button — opens overlay */}
                <button
                  onClick={() => featured.payhipUrl && openPayhip(featured.payhipUrl)}
                  className="px-10 py-4 font-ui text-sm tracking-[0.2em] uppercase text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FF1493, #FF69B4)",
                    boxShadow: "0 0 40px rgba(255,20,147,0.35)",
                    cursor: "none",
                  }}
                  data-cursor="ENTER"
                >
                  BUY NOW — {featured.price}
                </button>
                <Link
                  to={`/product/${featured.id}`}
                  className="font-ui text-xs tracking-[0.25em] uppercase transition-colors"
                  style={{ color: "rgba(255,182,193,0.7)" }}
                >
                  MORE INFO →
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-8 pt-6 flex items-center gap-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {["Instant Download", "Secure Payment", "Lifetime Access"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span style={{ color: "#FF1493", fontSize: "10px" }}>✦</span>
                    <span className="font-ui text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,182,193,0.6)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Coming Soon Grid */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: "rgba(255,182,193,0.3)" }} />
          <span className="font-ui text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(255,182,193,0.5)" }}>
            COMING SOON
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coming.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative overflow-hidden aspect-[3/4] border"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(100%) brightness(0.4) contrast(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="mb-3 px-3 py-1 font-ui text-[9px] tracking-[0.3em] uppercase"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,182,193,0.5)" }}
                >
                  COMING SOON
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-ui text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(255,20,147,0.4)" }}>
                  {product.phase}
                </p>
                <h4 className="font-display text-base tracking-tighter leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {product.title}
                </h4>
                <p className="font-display text-sm mt-1" style={{ color: "rgba(255,20,147,0.4)" }}>
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 flex flex-col md:flex-row items-center justify-between border-t pt-10 gap-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="font-display text-2xl md:text-3xl tracking-tighter text-foreground italic">
          "The best investment you'll ever make is in yourself."
        </p>
        <Link
          to="/reviews"
          className="flex-shrink-0 px-8 py-3 font-ui text-xs tracking-[0.2em] uppercase text-white transition-all"
          style={{ background: "rgba(255,20,147,0.12)", border: "1px solid rgba(255,20,147,0.35)" }}
          data-cursor="EXPLORE"
        >
          READ EARLY RESULTS →
        </Link>
      </motion.div>
    </section>
  );
};

export default ArsenalSection;
