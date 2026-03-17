import { motion } from "framer-motion";
import { useState } from "react";

const InnerCircleSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="circle"
      className="relative py-[20vh] md:py-[30vh] px-6 md:px-12 grain-overlay overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] border border-foreground/3 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] border border-foreground/4 rounded-full"
        />
        <div className="absolute w-[200px] h-[200px] border border-primary/10 rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="text-label-gold">APPLICATION ONLY</span>
          <div className="w-8 h-px bg-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-5xl md:text-8xl tracking-tighter text-foreground mt-4 leading-[0.85]"
        >
          THE INNER
          <br />
          <span className="italic">CIRCLE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 max-w-md mx-auto leading-relaxed text-sm tracking-wide"
          style={{ color: "rgba(255,182,193,0.75)" }}
        >
          Early access to new blueprints. Private resources. Intelligence briefings on wealth, identity, and power. This is not a newsletter — it&apos;s an application.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL ADDRESS"
              required
              className="flex-1 bg-secondary border border-foreground/10 border-r-0 px-6 py-4 text-label text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors cursor-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,20,147,0.5)" }}
              className="px-8 py-4 text-label text-foreground transition-all cursor-none whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, rgba(255,20,147,0.85), rgba(255,105,180,0.9))",
                border: "1px solid rgba(255,20,147,0.5)",
              }}
            >
              JOIN THE CIRCLE →
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <p className="font-display text-2xl text-gold italic glow-gold">
              You&apos;re in. Welcome to the circle.
            </p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-label mt-6"
          style={{ color: "rgba(255,182,193,0.55)" }}
        >
          NO SPAM. NO BASIC ADVICE. SOVEREIGN INTELLIGENCE ONLY.
        </motion.p>
      </div>
    </section>
  );
};

export default InnerCircleSection;
