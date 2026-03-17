import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

const ArsenalSection = () => {
  return (
    <section id="arsenal" className="relative py-[15vh] md:py-[20vh] px-6 md:px-12 grain-overlay">
      <div className="flex items-end justify-between mb-16">
        <div>
          <span className="text-label-gold">THE ARSENAL</span>
          <h2 className="font-display text-5xl md:text-8xl tracking-tighter text-foreground mt-4 leading-[0.85]">
            YOUR
            <br />
            <span className="italic">BLUEPRINTS</span>
          </h2>
        </div>
        <div className="hidden md:flex flex-col items-end gap-3">
          <span className="text-label" style={{ color: "rgba(255,182,193,0.7)" }}>04 DIGITAL PRODUCTS</span>
          <Link
            to="/reviews"
            className="font-ui text-xs tracking-[0.25em] uppercase text-primary hover-underline flex items-center gap-2"
          >
            READ RESULTS →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Link to={`/product/${product.id}`}>
              <ProductCard
                id={product.id}
                phase={product.phase}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-16 flex flex-col md:flex-row items-center justify-between border-t pt-10 gap-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="font-display text-2xl md:text-3xl tracking-tighter text-foreground italic">
          "The best investment you'll ever make is in yourself."
        </p>
        <Link
          to="/reviews"
          className="flex-shrink-0 px-8 py-3 font-ui text-xs tracking-[0.2em] uppercase text-white transition-all"
          style={{ background: "rgba(255,20,147,0.12)", border: "1px solid rgba(255,20,147,0.35)" }}
          data-cursor="EXPLORE"
        >
          READ EARLY RESULTS →
        </Link>
      </motion.div>
    </section>
  );
};

export default ArsenalSection;
