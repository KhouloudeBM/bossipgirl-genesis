import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface ProductCardProps {
  id: string;
  phase: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const ProductCard = ({ phase, title, price, image, description }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative aspect-[3/4] overflow-hidden border border-foreground/10 bg-muted cursor-none"
      data-cursor="VIEW"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
      />

      {/* Glare */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,20,147,0.08) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Pink border glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 40px rgba(255,20,147,0.08)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <span className="text-label-gold">{phase}</span>
        <span className="text-label text-foreground">{price}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div
          className="w-0 group-hover:w-full h-px mb-4 transition-all duration-700 ease-out"
          style={{ background: "linear-gradient(90deg, #FF1493, rgba(255,20,147,0.3))" }}
        />
        <h3 className="font-display text-3xl md:text-4xl tracking-tighter text-foreground leading-[0.9]">
          {title}
        </h3>
        <p className="text-label text-muted-foreground mt-3 leading-relaxed normal-case tracking-normal opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {description}
        </p>
        <div className="mt-5 overflow-hidden">
          <span
            className="text-label text-foreground hover-underline inline-flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          >
            VIEW BLUEPRINT <span style={{ color: "#FF1493" }}>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
