import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "MANIFESTO", href: "/#manifesto" },
  { label: "THE ARSENAL", href: "/#arsenal" },
  { label: "INNER CIRCLE", href: "/#circle" },
  { label: "REVIEWS", href: "/reviews" },
  { label: "OUR MISSION", href: "/mission" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress w-full" style={{ scaleX }} />

      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-700 ${
        scrolled ? "backdrop-blur-md bg-background/60 border-b border-foreground/5" : ""
      }`}>
        <Link
          to="/"
          className="font-display text-xl tracking-tight text-foreground"
        >
          <motion.span whileHover={{ letterSpacing: "0.08em" }} style={{ display: "inline-block", transition: "letter-spacing 0.4s" }}>
            THEBOSSIPGIRL
          </motion.span>
        </Link>

        {/* Desktop quick links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/reviews" className="font-ui text-[10px] tracking-[0.25em] uppercase hover:text-primary transition-colors" style={{ color: "rgba(255,182,193,0.7)" }}>
            REVIEWS
          </Link>
          <Link to="/mission" className="font-ui text-[10px] tracking-[0.25em] uppercase hover:text-primary transition-colors" style={{ color: "rgba(255,182,193,0.7)" }}>
            MISSION
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-label text-foreground hover-underline cursor-none group flex items-center gap-3"
        >
          <span className="flex flex-col gap-[5px] w-5">
            <span className="block h-px bg-foreground transition-all duration-300 group-hover:w-3/4" />
            <span className="block h-px bg-foreground" />
            <span className="block h-px bg-foreground transition-all duration-300 group-hover:w-1/2" />
          </span>
          [ MENU ]
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] bg-background grain-overlay flex flex-col justify-center items-center"
          >
            {/* Pink glow blob inside menu */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div style={{
                position: "absolute",
                width: "50vw", height: "50vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,20,147,0.06) 0%, transparent 70%)",
                top: "10%", right: "-10%",
              }} />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:right-12 text-label text-foreground hover-underline cursor-none"
            >
              [ CLOSE ]
            </button>

            <div className="absolute left-12 top-0 bottom-0 w-px bg-foreground/5" />
            <div className="absolute right-12 top-0 bottom-0 w-px bg-foreground/5" />

            <div className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-5xl md:text-8xl tracking-tighter text-foreground hover-underline block group"
                    >
                      <motion.span
                        className="block"
                        whileHover={{ x: 12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-label-gold mr-4 align-middle">0{i + 1}</span>
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-0 right-0 flex justify-between px-12 text-label"
              style={{ color: "rgba(255,182,193,0.55)" }}
            >
              <span>EST. 2024</span>
              <span>THEBOSSIPGIRL.COM</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
