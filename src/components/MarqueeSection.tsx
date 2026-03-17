const MarqueeSection = () => {
  const text = "IDENTITY · DISCIPLINE · CONFIDENCE · WEALTH · POWER · SOVEREIGNTY · ";

  return (
    <div
      className="py-8 overflow-hidden relative"
      style={{
        borderTop: "1px solid rgba(255,20,147,0.2)",
        borderBottom: "1px solid rgba(255,20,147,0.2)",
        background: "linear-gradient(90deg, transparent, rgba(255,20,147,0.03) 50%, transparent)",
      }}
    >
      {/* Row 1 — left to right, full white with subtle pink shadow */}
      <div className="animate-marquee whitespace-nowrap flex mb-3">
        <span
          className="font-display text-6xl md:text-8xl tracking-tighter text-foreground mr-4"
          style={{ textShadow: "0 0 80px rgba(255,20,147,0.15)" }}
        >
          {text}{text}
        </span>
        <span
          className="font-display text-6xl md:text-8xl tracking-tighter text-foreground mr-4"
          style={{ textShadow: "0 0 80px rgba(255,20,147,0.15)" }}
        >
          {text}{text}
        </span>
      </div>

      {/* Row 2 — right to left, blush pink italic */}
      <div className="animate-marquee-reverse whitespace-nowrap flex">
        <span className="font-display text-4xl md:text-5xl tracking-tighter italic mr-4" style={{ color: "rgba(255, 182, 193, 0.55)" }}>
          {text}{text}
        </span>
        <span className="font-display text-4xl md:text-5xl tracking-tighter italic mr-4" style={{ color: "rgba(255, 182, 193, 0.55)" }}>
          {text}{text}
        </span>
      </div>

      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(90deg, hsl(var(--background)), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, hsl(var(--background)), transparent)" }}
      />
    </div>
  );
};

export default MarqueeSection;
