import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import CustomCursor from "@/components/CustomCursor";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const [imgHovered, setImgHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/" className="text-primary hover-underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 700);
    // Open Payhip overlay if available
    if (product.payhipUrl) {
      const productId = product.payhipUrl.split("/b/")[1];
      if (typeof window !== "undefined" && (window as any).Payhip) {
        (window as any).Payhip.checkout({ product: productId });
      } else {
        window.open(product.payhipUrl, "_blank");
      }
    } else {
      setTimeout(() => setPurchased(true), 300);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay" style={{ position: "relative", zIndex: 1 }}>
      <CustomCursor />

      {/* Aurora blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", width: "60vw", height: "60vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${product.color}12 0%, transparent 70%)`,
          top: "-20%", right: "-10%", animation: "aurora1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${product.color}09 0%, transparent 70%)`,
          bottom: "20%", left: "-10%", animation: "aurora2 24s ease-in-out infinite",
        }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <Link
          to="/"
          className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
        >
          <motion.span animate={{ x: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>←</motion.span>
          BACK TO HOME
        </Link>
        <span className="font-display text-lg tracking-tight text-foreground">THEBOSSIPGIRL</span>
        <span className="font-ui text-xs tracking-[0.2em] uppercase text-primary">{product.phase}</span>
      </nav>

      {/* Hero: image left, content right */}
      <div ref={heroRef} className="min-h-screen grid md:grid-cols-2 pt-24 relative z-10">

        {/* LEFT — Image */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          data-cursor="EXPLORE"
        >
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-1000"
            style={{
              filter: imgHovered ? "grayscale(0%) contrast(105%)" : "grayscale(100%) contrast(115%)",
              y: imgY,
              minHeight: "100vh",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />

          {/* Phase watermark */}
          <div
            className="absolute bottom-12 left-8 font-display text-8xl md:text-[12rem] tracking-tighter leading-none pointer-events-none select-none"
            style={{ color: `${product.color}10`, fontStyle: "italic" }}
          >
            {product.phase.split(" ")[1]}
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-24 relative">

          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-6 h-px" style={{ background: product.color }} />
            <span className="font-ui text-xs tracking-[0.3em] uppercase" style={{ color: product.color }}>
              {product.phase}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.85] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            >
              {product.title}
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-display italic text-xl md:text-2xl mb-8"
            style={{ color: product.color }}
          >
            {product.tagline}
          </motion.p>

          {/* Price — HUGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 flex items-baseline gap-3"
          >
            <span
              className="font-display leading-none"
              style={{
                fontSize: "clamp(4rem, 10vw, 9rem)",
                color: product.color,
                textShadow: `0 0 60px ${product.color}50`,
              }}
            >
              ${product.priceNumber}
            </span>
            <div>
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-muted-foreground">One-time</p>
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-muted-foreground">investment</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm leading-relaxed text-muted-foreground mb-10 max-w-md"
          >
            {product.fullDescription}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mb-10 pb-10 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "FORMAT", value: product.format },
              { label: "DURATION", value: product.duration },
              { label: "ACCESS", value: "Lifetime" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{item.label}</p>
                <p className="font-ui text-xs text-foreground">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="relative"
            data-magnetic
          >
            <AnimatePresence mode="wait">
              {!purchased ? (
                <motion.button
                  key="buy"
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  onClick={handleBuyClick}
                  className="relative w-full md:w-auto overflow-hidden px-16 py-5 font-ui text-sm tracking-[0.2em] uppercase text-white transition-all duration-300"
                  style={{
                    background: btnHovered
                      ? `linear-gradient(135deg, ${product.color}, #FF69B4)`
                      : product.color,
                    boxShadow: btnHovered ? `0 0 60px ${product.color}60` : `0 0 30px ${product.color}30`,
                    cursor: "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="ENTER"
                >
                  GET INSTANT ACCESS →
                  {/* Ripple effects */}
                  {ripples.map((r) => (
                    <motion.span
                      key={r.id}
                      className="absolute rounded-full bg-white/30"
                      style={{ left: r.x, top: r.y, width: 4, height: 4, x: -2, y: -2 }}
                      animate={{ scale: 40, opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  ))}
                </motion.button>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-5"
                >
                  <p className="font-display text-2xl italic" style={{ color: product.color, textShadow: `0 0 40px ${product.color}60` }}>
                    Welcome to the upgrade. ✦
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-12 py-[15vh] border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-6 h-px" style={{ background: product.color }} />
              <span className="font-ui text-xs tracking-[0.3em] uppercase" style={{ color: product.color }}>
                WHAT'S INSIDE
              </span>
            </motion.div>

            <div className="space-y-4">
              {product.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="flex items-start gap-4 group"
                >
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: `${product.color}50`, background: `${product.color}15` }}
                  >
                    <span style={{ color: product.color, fontSize: "8px" }}>✦</span>
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: transformation promise */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="relative p-10 border"
              style={{
                borderColor: `${product.color}20`,
                background: `linear-gradient(135deg, ${product.color}05, transparent)`,
              }}
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 left-0 w-8 h-px" style={{ background: product.color }} />
              <div className="absolute top-0 left-0 w-px h-8" style={{ background: product.color }} />
              <div className="absolute bottom-0 right-0 w-8 h-px" style={{ background: product.color }} />
              <div className="absolute bottom-0 right-0 w-px h-8" style={{ background: product.color }} />

              <p className="font-ui text-xs tracking-[0.3em] uppercase mb-6" style={{ color: product.color }}>
                THE TRANSFORMATION
              </p>
              <p className="font-display text-3xl md:text-4xl tracking-tighter text-foreground leading-[1.1] italic">
                "You will not recognise yourself in 30 days. That is the point."
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                  style={{ background: product.color, color: "#fff" }}>K</div>
                <div>
                  <p className="font-ui text-xs text-foreground tracking-wide">KHOULOUDE</p>
                  <p className="font-ui text-[10px] text-muted-foreground tracking-widest">FOUNDER, THEBOSSIPGIRL</p>
                </div>
              </div>
            </div>

            {/* Price repeat */}
            <div className="mt-8 p-6 border border-foreground/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-ui text-xs tracking-[0.2em] uppercase text-muted-foreground">Your investment</p>
                  <p className="font-display text-4xl tracking-tighter" style={{ color: product.color }}>
                    {product.price}
                  </p>
                </div>
                <motion.button
                  onClick={handleBuyClick}
                  className="px-8 py-3 font-ui text-xs tracking-[0.2em] uppercase text-white"
                  style={{ background: product.color, cursor: "none" }}
                  whileHover={{ opacity: 0.85 }}
                  data-cursor="ENTER"
                >
                  GET ACCESS
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other products */}
      <section className="relative z-10 px-6 md:px-12 py-[10vh] border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-px bg-primary" />
          <span className="font-ui text-xs tracking-[0.3em] uppercase text-primary">COMPLETE YOUR ARSENAL</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRODUCTS.filter((p) => p.id !== id).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link to={`/product/${p.id}`} className="group block relative overflow-hidden border border-foreground/10 aspect-[4/3]" data-cursor="VIEW">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-ui text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: p.color }}>{p.phase}</p>
                  <h3 className="font-display text-2xl tracking-tighter text-foreground">{p.title}</h3>
                  <p className="font-display text-xl mt-1" style={{ color: p.color }}>{p.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <div className="relative z-10 py-12 px-6 md:px-12 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <Link to="/" className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors">
          ← BACK TO THEBOSSIPGIRL.COM
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;
