import productIdentity from "@/assets/product-identity.jpg";
import productDiscipline from "@/assets/product-discipline.jpg";
import productFinancial from "@/assets/product-financial.jpg";
import productConfidence from "@/assets/product-confidence.jpg";
import productIgnition from "@/assets/product-ignition.jpg";

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
  payhipUrl?: string;
  available: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "the-ignition",
    phase: "STARTER",
    title: "The Ignition",
    price: "€17",
    priceNumber: "17",
    image: productIgnition,
    tagline: "Stop lying to yourself with such elegance.",
    description: "A 7-Day Psychological Activation for the woman who already knows.",
    fullDescription:
      "This is not a workbook. This is a confrontation — structured, intentional, and designed to sit somewhere between clarity and discomfort. You don't need more information. You need to stop rerouting around the one question that matters: who are you willing to become? 7 days. 7 psychological drills. One decision that changes everything.",
    features: [
      "7-Day Psychological Activation Protocol",
      "The Identity Audit — 5 confrontational mirror questions",
      "The Loyalty Audit — breaking patterns that expired",
      "Daily Activation Prompts (no fluff, only truth)",
      "The Permission Myth — dismantled permanently",
      "Sovereign Decision Framework",
      "Immediate Digital Download (PDF)",
    ],
    duration: "7 Days",
    format: "Digital PDF Guide",
    color: "#FF1493",
    payhipUrl: "https://payhip.com/b/FmQPA",
    available: true,
  },
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
      "Most women are running software installed by someone else — their parents, their past, their pain. The Sovereign Mindset is a 21-day protocol to delete that programming and install one that serves your highest version.",
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
    available: false,
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
      "Motivation is a myth. Discipline is a skill. The Discipline Protocol is a 90-day operating system engineered to eliminate the gap between who you are and who you're capable of being.",
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
    available: false,
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
      "Money is not the goal — sovereignty is. Financial Sovereignty teaches you the psychology, strategy, and systems to build your first $100K and beyond.",
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
    available: false,
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
      "Confidence is not a personality trait — it is a skill you build, a posture you train, and a frequency you calibrate.",
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
    available: false,
  },
];
