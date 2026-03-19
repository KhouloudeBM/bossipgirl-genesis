import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import heroImage from "@/assets/hero-main.jpg";

const PARTICLES = [
  { left: "6%",  delay: 0,    size: 2, dur: 18 },
  { left: "13%", delay: 2.5,  size: 3, dur: 22 },
  { left: "21%", delay: 5,    size: 2, dur: 19 },
  { left: "31%", delay: 1,    size: 4, dur: 25 },
  { left: "40%", delay: 7,    size: 2, dur: 20 },
  { left: "50%", delay: 3.5,  size: 3, dur: 17 },
  { left: "58%", delay: 9,    size: 2, dur: 23 },
  { left: "67%", delay: 4,    size: 4, dur: 21 },
  { left: "75%", delay: 6,    size: 2, dur: 18 },
  { left: "83%", delay: 1.5,  size: 3, dur: 24 },
  { left: "91%", delay: 8,    size: 2, dur: 19 },
  { left: "97%", delay: 3,    size: 3, dur: 22 },
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
      {/* Background Image — hoofd + laptop zichtbaar */}
      <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
        <img
          src={heroImage}
          alt="TheBossipGirl editorial"
          className="h-full w-full object-cover transition-all duration-1000 ease-in-out"
          style={{
            objectPosition: "center 38%",
            filter: hovered ? "grayscale(0%) contrast(105%)" : "grayscale(100%) contrast(115%)",
            willChange: "filter",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        {/* Pink tint overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, rgba(255,20,147,0.12) 0%, transparent 70%)",
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(255,20,147,0.04) 0%, transparent 70%)`
          ),
        }}
      />

      {/* Floating pink particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* Decorative vertical line right */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute right-12 top-24 bottom-24 w-px origin-top hidden md:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,20,147,0.4), transparent)" }}
      />

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block"
      >
        <span className="text-label tracking-[0.4em]" style={{ color: "rgba(255,182,193,0.65)" }}>SCROLL TO EXPLORE</span>
      </motion.div>

      {/* Hero Text */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-[12vh]">

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-4 mb-8"
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
              className="font-display text-foreground leading-[0.82] tracking-tighter glitch-text"
              style={{ fontSize: "clamp(3.5rem, 11vw, 15rem)" }}
            >
              THE UPGRADE
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              animate={{ y: hovered ? 0 : "100%" }}
              transition={{ delay: 0.07, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-foreground leading-[0.82] tracking-tighter italic"
              style={{ fontSize: "clamp(3.5rem, 11vw, 15rem)" }}
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
              style={{ fontSize: "clamp(3.5rem, 11vw, 15rem)" }}
            >
              OPTIONAL
            </motion.h1>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
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
          </div>

          {/* Mini stats */}
          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              <div
                className="font-display text-2xl tracking-tighter text-foreground"
                style={{ textShadow: "0 0 30px rgba(255,20,147,0.5)" }}
              >
                47+
              </div>
              <div className="text-label mt-0.5" style={{ color: "rgba(255,182,193,0.7)" }}>WOMEN UPGRADED</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
