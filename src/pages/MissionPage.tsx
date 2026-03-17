import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import { useScrambleText } from "@/hooks/useScrambleText";

const PILLARS = [
  {
    number: "01",
    title: "MISSION",
    headline: "Arm every woman with the tools to become ungovernable.",
    body: "TheBossipGirl exists to bridge the gap between where ambitious women are and where they are destined to be. We do not sell motivation. We sell architecture — the systems, psychology, and strategies that produce sovereign, financially free, mentally unshakeable women.",
    color: "#FF1493",
  },
  {
    number: "02",
    title: "VISION",
    headline: "A world where no woman plays small to make others comfortable.",
    body: "We envision a generation of women who walk into rooms they were never invited into, earn money that makes their ancestors weep with joy, and live lives so deliberately designed that mediocrity becomes physically impossible. That world begins with one woman deciding she's done waiting.",
    color: "#E91E8C",
  },
  {
    number: "03",
    title: "STRATEGY",
    headline: "Premium digital intelligence. No filler. No fluff.",
    body: "We deliver our mission through meticulously engineered digital products — each blueprint is a system, not a suggestion. We pair this with an exclusive community of high-calibre women, quarterly intelligence briefings, and a content ecosystem that challenges your thinking daily.",
    color: "#C2185B",
  },
];

const VALUES = [
  { title: "SOVEREIGNTY", description: "You answer to no one but your highest self." },
  { title: "PRECISION", description: "Every action is intentional. Every system is proven." },
  { title: "EXCELLENCE", description: "Mediocrity is not an option here. It never was." },
  { title: "INTEGRITY", description: "We only teach what we have lived and tested." },
  { title: "BOLDNESS", description: "The upgrade requires courage. We model it." },
  { title: "SISTERHOOD", description: "We rise together. No woman left behind." },
];

const ScrambleHeadline = ({ text }: { text: string }) => {
  const [triggered, setTriggered] = useState(false);
  const scrambled = useScrambleText(text, triggered);

  return (
    <motion.h2
      className="font-display leading-[0.85] tracking-tighter text-foreground cursor-default"
      style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
      onViewportEnter={() => setTriggered(true)}
    >
      {scrambled}
    </motion.h2>
  );
};

const MissionPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground" style={{ position: "relative", zIndex: 1 }}>
      <CustomCursor />

      {/* Aurora */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", width: "80vw", height: "80vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,20,147,0.06) 0%, transparent 70%)",
          top: "-30%", right: "-30%", animation: "aurora1 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,24,91,0.05) 0%, transparent 70%)",
          bottom: "0%", left: "-15%", animation: "aurora3 28s ease-in-out infinite",
        }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 backdrop-blur-md bg-background/60 border-b border-foreground/5">
        <Link
          to="/"
          className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
        >
          <motion.span animate={{ x: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>←</motion.span>
          BACK
        </Link>
        <span className="font-display text-lg tracking-tight text-foreground">THEBOSSIPGIRL</span>
        <Link to="/reviews" className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors">
          REVIEWS →
        </Link>
      </nav>

      {/* Hero — full viewport */}
      <div className="relative min-h-screen flex items-end pb-[12vh] px-6 md:px-12 overflow-hidden grain-overlay" style={{ zIndex: 2 }}>
        {/* Giant background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <span
            className="font-display text-[20vw] tracking-tighter leading-none"
            style={{ color: "rgba(255,20,147,0.04)", whiteSpace: "nowrap" }}
          >
            SOVEREIGN
          </span>
        </div>

        {/* Animated pink vertical line */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-foreground/5" style={{ zIndex: 2 }}>
          <motion.div
            className="w-full bg-primary origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />
        </div>

        <div className="pl-8 md:pl-16 relative" style={{ zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-primary" />
            <span className="font-ui text-xs tracking-[0.35em] uppercase text-primary">WHO WE ARE</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.82] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(4rem, 12vw, 14rem)" }}
            >
              NOT A
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.82] tracking-tighter italic"
              style={{
                fontSize: "clamp(4rem, 12vw, 14rem)",
                color: "#FF1493",
                textShadow: "0 0 80px rgba(255,20,147,0.5)",
              }}
            >
              MOVEMENT.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.82] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(4rem, 12vw, 14rem)" }}
            >
              AN UPGRADE.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Mission / Vision / Strategy sections */}
      {PILLARS.map((pillar, i) => (
        <section
          key={pillar.number}
          className="relative z-10 min-h-screen flex items-center px-6 md:px-12 py-[15vh] border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Background number */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 font-display leading-none pointer-events-none select-none"
            style={{
              fontSize: "30vw",
              color: `${pillar.color}06`,
              right: "-2vw",
            }}
          >
            {pillar.number}
          </div>

          <div className="max-w-4xl relative z-10">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-6 h-px" style={{ background: pillar.color }} />
              <span className="font-ui text-xs tracking-[0.35em] uppercase" style={{ color: pillar.color }}>
                {pillar.title}
              </span>
              <span className="font-ui text-[10px] tracking-widest text-muted-foreground">/ {pillar.number}</span>
            </motion.div>

            {/* Scramble headline */}
            <ScrambleHeadline text={pillar.headline} />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-muted-foreground text-sm md:text-base leading-relaxed mt-8 max-w-2xl"
            >
              {pillar.body}
            </motion.p>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-12 h-px origin-left"
              style={{ background: `linear-gradient(90deg, ${pillar.color}60, transparent)` }}
            />
          </div>
        </section>
      ))}

      {/* Values Grid */}
      <section className="relative z-10 px-6 md:px-12 py-[15vh] border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-6 h-px bg-primary" />
          <span className="font-ui text-xs tracking-[0.35em] uppercase text-primary">OUR VALUES</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 bg-background transition-all duration-500 hover:bg-card"
            >
              <div
                className="absolute bottom-0 left-0 w-full h-px origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100"
                style={{ background: "#FF1493" }}
              />
              <span
                className="font-ui text-[10px] tracking-[0.3em] uppercase block mb-3 transition-colors duration-300 group-hover:text-primary"
                style={{ color: "rgba(255,20,147,0.5)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-tighter text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder section */}
      <section className="relative z-10 px-6 md:px-12 py-[15vh] border-t grain-overlay" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Avatar ring */}
            <div className="relative inline-block mb-10">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center font-display text-4xl text-white mx-auto"
                style={{
                  background: "linear-gradient(135deg, #FF1493, #C2185B)",
                  boxShadow: "0 0 60px rgba(255,20,147,0.4)",
                }}
              >
                K
              </div>
              <div
                className="absolute inset-[-8px] rounded-full border border-primary/30"
                style={{ animation: "ping-pink 2.5s ease-in-out infinite" }}
              />
            </div>

            <blockquote
              className="font-display text-3xl md:text-5xl tracking-tighter text-foreground leading-[1.1] italic mb-8"
            >
              "I built this because I needed it and it didn't exist. Now it exists for you."
            </blockquote>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto mb-8">
              TheBossipGirl was born from one woman's refusal to accept that the life she wanted was out of reach.
              Every blueprint is written from lived experience — the failures, the pivots, the wins, and the strategies
              that actually moved the needle. This is not theory. This is the real thing.
            </p>

            <div>
              <p className="font-display text-xl tracking-tight text-foreground">Khouloude</p>
              <p className="font-ui text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">
                Founder & Chief Architect, TheBossipGirl
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-[12vh] px-6 md:px-12 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-display text-4xl md:text-7xl tracking-tighter text-foreground mb-10 leading-[0.85]">
            JOIN THE{" "}
            <span className="italic" style={{ color: "#FF1493", textShadow: "0 0 60px rgba(255,20,147,0.5)" }}>
              ELITE.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#arsenal"
              className="px-12 py-4 font-ui text-sm tracking-[0.2em] uppercase text-white inline-block"
              style={{ background: "#FF1493", boxShadow: "0 0 40px rgba(255,20,147,0.4)" }}
              data-cursor="EXPLORE"
            >
              EXPLORE BLUEPRINTS →
            </Link>
            <Link
              to="/reviews"
              className="px-12 py-4 font-ui text-sm tracking-[0.2em] uppercase text-foreground inline-block border border-foreground/20 hover:border-primary transition-colors"
              data-cursor="EXPLORE"
            >
              READ RESULTS
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 py-8 px-6 md:px-12 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <Link to="/" className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors">
          ← BACK TO THEBOSSIPGIRL.COM
        </Link>
      </div>
    </div>
  );
};

export default MissionPage;
