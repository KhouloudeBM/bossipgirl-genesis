import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

const REVIEWS = [
  {
    id: 1,
    name: "Aisha K.",
    location: "Amsterdam",
    rating: 5,
    product: "The Sovereign Mindset",
    text: "I started this blueprint completely lost — living for everyone else's idea of who I should be. By day 10, I had written my first business plan. By day 21, I had handed in my notice. This is not a course. It is a detonation.",
    initials: "AK",
    size: "large",
  },
  {
    id: 2,
    name: "Imani B.",
    location: "London",
    rating: 5,
    product: "Financial Sovereignty",
    text: "I went from -€800 in my account to my first €10K saved in 4 months. The wealth psychology section alone is worth 10x the price.",
    initials: "IB",
    size: "medium",
  },
  {
    id: 3,
    name: "Priya V.",
    location: "Rotterdam",
    rating: 5,
    product: "The Discipline Protocol",
    text: "I tried every habit app, every morning routine, every motivational podcast. Nothing stuck until this. Week 1 and I was already a different woman.",
    initials: "PV",
    size: "small",
  },
  {
    id: 4,
    name: "Zara N.",
    location: "Dubai",
    rating: 5,
    product: "The Confidence Armour",
    text: "My salary increased by €18,000 within 3 months of applying the negotiation and authority principles. I walked into that boardroom like I owned it — because now I know I do.",
    initials: "ZN",
    size: "large",
  },
  {
    id: 5,
    name: "Fatoumata D.",
    location: "Paris",
    rating: 5,
    product: "The Sovereign Mindset",
    text: "The manifesto she includes in day 1 made me cry. Not because it was sad — because it was the first time someone described exactly who I was meant to be.",
    initials: "FD",
    size: "medium",
  },
  {
    id: 6,
    name: "Linh T.",
    location: "Berlin",
    rating: 5,
    product: "Financial Sovereignty",
    text: "€197 that paid back €4,300 in 6 weeks. I launched my first digital product using the income blueprint. This woman gives away more in a digital course than universities charge €30K to pretend to teach.",
    initials: "LT",
    size: "small",
  },
  {
    id: 7,
    name: "Sofia M.",
    location: "Barcelona",
    rating: 5,
    product: "The Discipline Protocol",
    text: "I used to sleep in until 10 AM every day. I'm not exaggerating when I say this protocol completely rebuilt my relationship with time. I am on fire.",
    initials: "SM",
    size: "medium",
  },
  {
    id: 8,
    name: "Camille A.",
    location: "Brussels",
    rating: 5,
    product: "The Confidence Armour",
    text: "The vocal authority audio training alone changed how I speak in every meeting. My manager asked if I had a personal coach. I said yes — I do.",
    initials: "CA",
    size: "small",
  },
  {
    id: 9,
    name: "Nadia S.",
    location: "Casablanca",
    rating: 5,
    product: "All 4 Blueprints",
    text: "I bought all four. I completed all four. I am a completely different human being. My mother asked what happened to me. I said: I happened to me.",
    initials: "NS",
    size: "large",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#FF1493" : "rgba(255,20,147,0.2)", fontSize: "12px" }}>
        ★
      </span>
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: typeof REVIEWS[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 border transition-all duration-500"
      style={{
        borderColor: hovered ? "rgba(255,20,147,0.3)" : "rgba(255,255,255,0.06)",
        background: hovered
          ? "linear-gradient(135deg, rgba(255,20,147,0.04), transparent)"
          : "rgba(255,255,255,0.01)",
        boxShadow: hovered ? "0 0 40px rgba(255,20,147,0.08)" : "none",
      }}
    >
      {/* Animated corner accent on hover */}
      <motion.div
        className="absolute top-0 left-0 w-px origin-top"
        animate={{ height: hovered ? "40px" : "0px" }}
        transition={{ duration: 0.4 }}
        style={{ background: "#FF1493" }}
      />
      <motion.div
        className="absolute top-0 left-0 h-px origin-left"
        animate={{ width: hovered ? "40px" : "0px" }}
        transition={{ duration: 0.4 }}
        style={{ background: "#FF1493" }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-ui text-xs font-bold text-white transition-all duration-300"
            style={{ background: hovered ? "#FF1493" : "rgba(255,20,147,0.2)" }}
          >
            {review.initials}
          </div>
          <div>
            <p className="font-ui text-xs text-foreground tracking-wide">{review.name}</p>
            <p className="font-ui text-[10px] text-muted-foreground tracking-widest uppercase">{review.location}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
        "{review.text}"
      </p>

      {/* Product tag */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-px bg-primary" />
        <span className="font-ui text-[9px] tracking-[0.25em] uppercase text-primary opacity-70">{review.product}</span>
      </div>
    </motion.div>
  );
};

const ReviewsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const totalReviews = REVIEWS.length;
  const avgRating = 5.0;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ position: "relative", zIndex: 1 }}>
      <CustomCursor />

      {/* Aurora */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", width: "60vw", height: "60vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,20,147,0.07) 0%, transparent 70%)",
          top: "-20%", right: "-10%", animation: "aurora1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "40vw", height: "40vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,20,147,0.05) 0%, transparent 70%)",
          bottom: "20%", left: "-10%", animation: "aurora2 24s ease-in-out infinite",
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
        <Link to="/mission" className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors">
          OUR MISSION →
        </Link>
      </nav>

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 grain-overlay" style={{ zIndex: 2 }}>
        <motion.div className="text-center max-w-4xl px-6" style={{ y: heroY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-ui text-xs tracking-[0.35em] uppercase text-primary">VERIFIED RESULTS</span>
            <div className="w-8 h-px bg-primary" />
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.82] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
            >
              THEY SPEAK
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-[0.82] tracking-tighter italic"
              style={{
                fontSize: "clamp(3rem, 9vw, 10rem)",
                color: "#FF1493",
                textShadow: "0 0 60px rgba(255,20,147,0.5)",
              }}
            >
              FOR THEMSELVES
            </motion.h1>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-16"
          >
            {[
              { value: `${avgRating}.0`, label: "AVERAGE RATING" },
              { value: `${totalReviews}+`, label: "TESTIMONIALS" },
              { value: "2K+", label: "WOMEN UPGRADED" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="font-display text-4xl md:text-6xl tracking-tighter"
                  style={{ color: "#FF1493", textShadow: "0 0 40px rgba(255,20,147,0.4)" }}
                >
                  {stat.value}
                </p>
                <p className="font-ui text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Reviews masonry grid */}
      <section className="relative z-10 px-6 md:px-12 py-[10vh]">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {REVIEWS.map((review, i) => (
            <div key={review.id} className="break-inside-avoid">
              <ReviewCard review={review} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-[15vh] px-6 md:px-12 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-display text-4xl md:text-6xl tracking-tighter text-foreground mb-4">
            Ready to write{" "}
            <span className="italic" style={{ color: "#FF1493" }}>your</span>
            {" "}story?
          </p>
          <p className="text-muted-foreground text-sm mb-10 max-w-md mx-auto">
            Join thousands of women who chose sovereignty over comfort.
          </p>
          <Link
            to="/#arsenal"
            className="inline-block px-12 py-4 font-ui text-sm tracking-[0.2em] uppercase text-white"
            style={{
              background: "#FF1493",
              boxShadow: "0 0 40px rgba(255,20,147,0.4)",
            }}
            data-cursor="EXPLORE"
          >
            EXPLORE THE BLUEPRINTS →
          </Link>
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

export default ReviewsPage;
