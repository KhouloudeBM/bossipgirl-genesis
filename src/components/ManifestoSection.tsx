import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const manifestoLines = [
  "You were not born to blend in.",
  "You were designed to dominate.",
  "Discipline is your currency.",
  "Identity is your weapon.",
  "The old version of you is dead.",
  "Welcome to the upgrade.",
];

const ManifestoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative py-[20vh] md:py-[30vh] px-6 md:px-12 grain-overlay"
    >
      {/* Animated vertical line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-foreground/5">
        <motion.div
          className="w-full bg-primary origin-top"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />
      </div>

      <div className="pl-8 md:pl-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-label-gold">THE MANIFESTO</span>
          <div className="flex-1 h-px bg-foreground/10 max-w-24" />
        </motion.div>

        <div className="max-w-5xl space-y-2">
          {manifestoLines.map((line, i) => {
            const start = i / manifestoLines.length;
            const end = (i + 1) / manifestoLines.length;
            return (
              <ManifestoLine
                key={i}
                text={line}
                progress={scrollYProgress}
                start={start * 0.6}
                end={end * 0.6}
                index={i}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 grid grid-cols-3 gap-0 max-w-2xl"
        >
          {[
            { value: "47+", label: "WOMEN UPGRADED" },
            { value: "4.9★", label: "AVERAGE RATING" },
            { value: "∞", label: "POTENTIAL", gold: true },
          ].map((stat, i) => (
            <div key={i} className={`pr-8 ${i > 0 ? "pl-8 border-l border-foreground/10" : ""}`}>
              <span className={`font-display text-5xl md:text-7xl tracking-tighter ${stat.gold ? "text-gold glow-gold" : "text-foreground"}`}>
                {stat.value}
              </span>
              <p className="text-label text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ManifestoLine = ({
  text,
  progress,
  start,
  end,
  index,
}: {
  text: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  index: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const x = useTransform(progress, [start, end], [-20, 0]);

  return (
    <motion.p
      style={{ opacity, x, color: "#FFB6C1" }}
      className="font-display text-3xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95]"
    >
      {index === 5 ? <em style={{ color: "#FF69B4" }}>{text}</em> : text}
    </motion.p>
  );
};

export default ManifestoSection;
