const AuroraBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
    {/* Blob 1 — top right, pink */}
    <div
      style={{
        position: "absolute",
        width: "70vw",
        height: "70vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,20,147,0.07) 0%, transparent 70%)",
        top: "-30%",
        right: "-20%",
        animation: "aurora1 18s ease-in-out infinite",
      }}
    />
    {/* Blob 2 — bottom left, deep pink */}
    <div
      style={{
        position: "absolute",
        width: "55vw",
        height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,30,140,0.05) 0%, transparent 70%)",
        bottom: "10%",
        left: "-15%",
        animation: "aurora2 24s ease-in-out infinite",
      }}
    />
    {/* Blob 3 — centre, subtle */}
    <div
      style={{
        position: "absolute",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,105,180,0.04) 0%, transparent 70%)",
        top: "40%",
        left: "30%",
        animation: "aurora3 30s ease-in-out infinite",
      }}
    />
  </div>
);

export default AuroraBackground;
