import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import MarqueeSection from "@/components/MarqueeSection";
import ArsenalSection from "@/components/ArsenalSection";
import InnerCircleSection from "@/components/InnerCircleSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";
import AuroraBackground from "@/components/AuroraBackground";

const STRIPES = 7;

const Index = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-background min-h-screen" style={{ position: "relative" }}>
      <CustomCursor />
      <AuroraBackground />

      {/* Dramatic stripe intro reveal */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            className="fixed inset-0 z-[99999] flex flex-col pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ delay: STRIPES * 0.13 + 1.4, duration: 0.6 }}
          >
            {Array.from({ length: STRIPES }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1"
                style={{ background: i % 2 === 0 ? "#0a0a0a" : "#111" }}
                initial={{ scaleX: 1, originX: "right" }}
                animate={{ scaleX: 0 }}
                transition={{
                  delay: i * 0.13,
                  duration: 1.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
            {/* Hot pink logo flash during reveal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, times: [0, 0.2, 0.7, 1] }}
            >
              <span
                className="font-display text-4xl md:text-6xl tracking-tight"
                style={{ color: "#FF1493", textShadow: "0 0 60px rgba(255,20,147,0.9)" }}
              >
                THEBOSSIPGIRL
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <ManifestoSection />
      <ArsenalSection />
      <InnerCircleSection />
      <FooterSection />
    </div>
  );
};

export default Index;
