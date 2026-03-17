import { useEffect, useRef } from "react";

const TRAIL = 10;

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rSize = 40;
    let label = "";
    let rafId: number;
    const trail = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }

      // Find data-cursor attribute on hovered element or ancestor
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      label = el?.dataset.cursor ?? "";
      if (labelRef.current) {
        labelRef.current.textContent = label;
      }
    };

    const loop = () => {
      // Update trail positions
      trail.pop();
      trail.unshift({ x: mx, y: my });

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const ratio = (TRAIL - i) / TRAIL;
        el.style.transform = `translate(${trail[i].x - 3}px, ${trail[i].y - 3}px) scale(${0.3 + ratio * 0.7})`;
        el.style.opacity = String(ratio * 0.45);
      });

      // Smooth ring follow with lag
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      // Lerp ring size for smooth expand/contract
      const targetSize = label ? 120 : 40;
      rSize += (targetSize - rSize) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - rSize / 2}px, ${ry - rSize / 2}px)`;
        ringRef.current.style.width = `${rSize}px`;
        ringRef.current.style.height = `${rSize}px`;
        // Increase border opacity when expanded
        const borderAlpha = label ? 0.9 : 0.7;
        ringRef.current.style.borderColor = `rgba(255, 20, 147, ${borderAlpha})`;
        // Inner fill tint when expanded
        ringRef.current.style.backgroundColor = label
          ? "rgba(255, 20, 147, 0.08)"
          : "transparent";
      }

      if (labelRef.current) {
        labelRef.current.style.opacity = label ? "1" : "0";
        labelRef.current.style.transform = label ? "scale(1)" : "scale(0.7)";
      }

      rafId = requestAnimationFrame(loop);
    };

    // Magnetic effect: elements move slightly toward cursor on hover
    const setupMagnetic = () => {
      document.querySelectorAll("[data-magnetic]").forEach((raw) => {
        const elem = raw as HTMLElement;
        let active = false;

        elem.addEventListener("mouseenter", () => {
          active = true;
          elem.style.transition = "";
        });

        elem.addEventListener("mouseleave", () => {
          active = false;
          elem.style.transition = "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)";
          elem.style.transform = "translate(0, 0)";
        });

        elem.addEventListener("mousemove", (e: Event) => {
          if (!active) return;
          const me = e as MouseEvent;
          const rect = elem.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (me.clientX - cx) * 0.4;
          const dy = (me.clientY - cy) * 0.4;
          elem.style.transform = `translate(${dx}px, ${dy}px)`;
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    const setupTimer = setTimeout(setupMagnetic, 1000);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(setupTimer);
    };
  }, []);

  return (
    <>
      {/* Main dot — mix-blend-mode:difference inverts background color */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />

      {/* Hot pink particle trail */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9996]"
          style={{
            backgroundColor: "#FF1493",
            willChange: "transform, opacity",
            opacity: 0,
          }}
        />
      ))}

      {/* Ring with text label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: "40px",
          height: "40px",
          border: "1.5px solid rgba(255, 20, 147, 0.7)",
          willChange: "transform, width, height",
          backdropFilter: "none",
        }}
      >
        <span
          ref={labelRef}
          className="font-ui text-[9px] tracking-[0.3em] uppercase text-white"
          style={{
            opacity: 0,
            transition: "opacity 0.25s ease, transform 0.25s ease",
            color: "#FF1493",
            fontWeight: 600,
            letterSpacing: "0.25em",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
