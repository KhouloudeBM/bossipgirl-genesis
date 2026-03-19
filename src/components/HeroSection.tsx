import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import heroImage from "@/assets/hero-main.jpg";

const PARTICLES = [
  { left: "6%",  delay: 0,    size: 2, dur: 18 },
  { left: "13%", delay: 2.5,  size: 3, dur: 22 },
  { left: "21%", delay: 5,    size: 2, dur: 19 },
  { left: "31%", delay: 1,    size: 4, dur: 25 },
  { left: "58%", delay: 9,    size: 2, dur: 23 },
  { left: "67%", delay: 4,    size: 4, dur: 21 },
  { left: "83%", delay: 1.5,  size: 3, dur: 24 },
  { left: "91%", delay: 8,    size: 2, dur: 19 },
];

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(useTransform(mouseX, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 20 });
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden grain-overlay"
      style={{ height: "100dvh" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor="EXPLORE"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-background" />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(700px circle at ${x} ${y}, rgba(255,20,147,0.05) 0%, transparent 70%)`
          ),
        }}
      />

      {/* Floating pink particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "rgba(255, 20, 147, 0.5)",
              boxShadow: "0 0 6px rgba(255,20,147,0.8)",
              animation: `float-particle ${p.dur}s ${p.delay}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Split layout */}
      <div className="relative z-10 flex h-full flex-col md:flex-row">

        {/* LEFT — text side */}
        <div className="flex flex-col justify-end md:justify-center w-full md:w-[52%] px-6 md:px-12 pb-10 md:pb-0 order-2 md:order-1">

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-ui text-xs md:text-sm tracking-[0.35em] uppercase text-foreground/80">
              Digital Blueprints for the Elite
            </span>
          </motion.div>

          {/* Main headline — reveals on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 24 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="overflow-hidden">
              <motion.h1
                animate={{ y: hovered ? 0 : "100%" }}
                transition={{ delay: 0, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="font-display text-foreground leading-[0.82] tracking-tighter"
                style={{ fontSize: "clamp(3rem, 7.5vw, 10rem)" }}
              >
                THE UPGRADE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                animate={{ y: hovered ? 0 : "100%" }}
                transition={{ delay: 0.07, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="font-display text-foreground leading-[0.82] tracking-tighter italic"
                style={{ fontSize: "clamp(3rem, 7.5vw, 10rem)" }}
              >
                IS{" "}
                <span style={{ color: "#FF1493", textShadow: "0 0 60px rgba(255,20,147,0.6)" }}>
                  NOT
                </span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                animate={{ y: hovered ? 0 : "100%" }}
                transition={{ delay: 0.14, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="font-display text-foreground leading-[0.82] tracking-tighter"
                style={{ fontSize: "clamp(3rem, 7.5vw, 10rem)" }}
              >
                OPTIONAL
              </motion.h1>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#arsenal"
              className="group flex items-center gap-3 px-7 py-3 font-ui text-xs tracking-[0.25em] uppercase text-foreground transition-all"
              data-magnetic
              data-cursor="SHOP"
              style={{
                background: "linear-gradient(135deg, rgba(255,20,147,0.9), rgba(255,105,180,0.95))",
                border: "1px solid rgba(255,20,147,0.6)",
                boxShadow: "0 0 30px rgba(255,20,147,0.25)",
              }}
            >
              GET THE BLUEPRINTS
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
            <a
              href="#circle"
              className="font-ui text-xs tracking-[0.25em] uppercase hover-underline"
              style={{ color: "rgba(255, 182, 193, 0.8)" }}
            >
              OR GET FREE ACCESS
            </a>
          </motion.div>

          {/* Mini stat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-8 flex items-center gap-3"
          >
            <div
              className="font-display text-3xl tracking-tighter text-foreground"
              style={{ textShadow: "0 0 30px rgba(255,20,147,0.5)" }}
            >
              47+
            </div>
            <div className="text-label" style={{ color: "rgba(255,182,193,0.7)" }}>WOMEN UPGRADED</div>
          </motion.div>
        </div>

        {/* RIGHT — Barbie image fully visible */}
        <div className="relative w-full md:w-[48%] order-1 md:order-2 flex-shrink-0" style={{ height: "45dvh", minHeight: "0" }}>
          <div className="absolute inset-0 md:inset-0" style={{ height: "100%" }}>
            {/* On mobile: top half. On desktop: full column */}
            <motion.img
              src={heroImage}
              alt="The Bossip Girl"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full"
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
                filter: hovered ? "grayscale(0%) contrast(105%)" : "grayscale(100%) contrast(115%)",
                transition: "filter 1s ease-in-out",
              }}
            />
            {/* Fade bottom edge into background */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
            />
            {/* Fade left edge into background on desktop */}
            <div
              className="absolute top-0 left-0 bottom-0 w-24 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
            />
            {/* Pink tint on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(255,20,147,0.1) 0%, transparent 70%)",
                opacity: hovered ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block z-20"
      >
        <span className="text-label tracking-[0.4em]" style={{ color: "rgba(255,182,193,0.65)" }}>SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
