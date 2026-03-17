import productIdentity from "@/assets/product-identity.jpg";
import productDiscipline from "@/assets/product-discipline.jpg";
import productFinancial from "@/assets/product-financial.jpg";
import productConfidence from "@/assets/product-confidence.jpg";

export interface Product {
  id: string;
  phase: string;
  title: string;
  price: string;
  priceNumber: string;
  image: string;
  description: string;
  fullDescription: string;
  features: string[];
  duration: string;
  format: string;
  tagline: string;
  color: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "sovereign-mindset",
    phase: "PHASE 01",
    title: "The Sovereign Mindset",
    price: "$97",
    priceNumber: "97",
    image: productIdentity,
    tagline: "Reprogram. Rebuild. Reign.",
    description: "Reprogram your identity at the neural level. 21-day cognitive restructuring protocol.",
    fullDescription:
      "Most women are running software installed by someone else — their parents, their past, their pain. The Sovereign Mindset is a 21-day protocol to delete that programming and install one that serves your highest version. Through neuroscience-backed journaling, identity work, and daily cognitive drills, you will no longer ask for permission to exist loudly.",
    features: [
      "21-Day Identity Restructuring Protocol",
      "Neuroscience-Backed Journaling System",
      "Daily Cognitive Rewiring Drills",
      "Limiting Belief Demolition Framework",
      "Sovereign Morning Ritual Blueprint",
      "Private Mindset Audit Workbook",
      "Lifetime Access + Future Updates",
    ],
    duration: "21 Days",
    format: "Digital Course + Workbook",
    color: "#FF1493",
  },
  {
    id: "discipline-protocol",
    phase: "PHASE 02",
    title: "The Discipline Protocol",
    price: "$127",
    priceNumber: "127",
    image: productDiscipline,
    tagline: "No motivation needed. Only systems.",
    description: "The 90-day system that eliminates procrastination and installs military-grade habits.",
    fullDescription:
      "Motivation is a myth. Discipline is a skill. The Discipline Protocol is a 90-day operating system engineered to eliminate the gap between who you are and who you're capable of being. No more waiting to feel ready. No more starting over on Monday. This is the architecture of the woman who simply gets it done — every single day.",
    features: [
      "90-Day Habit Architecture System",
      "Anti-Procrastination Neural Rewire",
      "Weekly Accountability Audit Sheets",
      "Energy & Time Sovereignty Map",
      "Trigger-Routine-Reward Engineering",
      "Emergency Reset Protocol",
      "Priority Matrix for High-Performers",
    ],
    duration: "90 Days",
    format: "Digital Course + Templates",
    color: "#E91E8C",
  },
  {
    id: "financial-sovereignty",
    phase: "PHASE 03",
    title: "Financial Sovereignty",
    price: "$197",
    priceNumber: "197",
    image: productFinancial,
    tagline: "Your first $100K is a decision.",
    description: "Build your first $100K. Investment frameworks, multiple income streams, wealth psychology.",
    fullDescription:
      "Money is not the goal — sovereignty is. Financial Sovereignty teaches you the psychology, strategy, and systems to build your first $100K and beyond. From emergency funds to investment portfolios, from digital income streams to negotiation scripts — this is the wealth education your school never gave you. You will never feel powerless about money again.",
    features: [
      "Build Your First $100K Roadmap",
      "Wealth Psychology Reprogramming",
      "Multiple Income Stream Blueprints",
      "Investment Framework for Beginners",
      "Budget Architecture That Actually Works",
      "Salary & Rate Negotiation Scripts",
      "Generational Wealth Primer",
    ],
    duration: "Self-Paced",
    format: "Digital Course + Spreadsheets",
    color: "#FF006E",
  },
  {
    id: "confidence-armour",
    phase: "PHASE 04",
    title: "The Confidence Armour",
    price: "$77",
    priceNumber: "77",
    image: productConfidence,
    tagline: "Own every room you walk into.",
    description: "Body language mastery, vocal authority, and the psychology of commanding any room.",
    fullDescription:
      "Confidence is not a personality trait — it is a skill you build, a posture you train, and a frequency you calibrate. The Confidence Armour is the complete system for mastering your physical presence, vocal authority, and social power. You will walk into any room, board room, or camera and immediately command attention — not by being loud, but by being undeniably, magnetically you.",
    features: [
      "Body Language Mastery Masterclass",
      "Vocal Authority Training (Audio)",
      "Social Power Dynamics Framework",
      "Anti-Anxiety Pre-Event Protocol",
      "Personal Aura Calibration System",
      "Difficult Conversations Playbook",
      "Public Speaking Confidence Drills",
    ],
    duration: "14 Days",
    format: "Video + Audio Course",
    color: "#C2185B",
  },
];
