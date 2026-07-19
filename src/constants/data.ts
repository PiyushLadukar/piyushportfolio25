import lokdrishti from "@/assets/projects/lokdrishti.png";
import aatankdrishti from "@/assets/projects/aatankdrishti.png";
import whyfarmer from "@/assets/projects/whyfarmer.png";
import anomax from "@/assets/projects/anomax.jpg";
import qrscanner from "@/assets/projects/qrscanner.jpg";
import secondbrain from "@/assets/projects/secondbrain.jpg";
import blocksbypi from "@/assets/projects/blocksbypi.jpg";
import orbit from "@/assets/projects/orbit.png";

export const PROFILE = {
  name: "Piyush Rajendra Ladukar",
  shortName: "Piyush Ladukar",
  username: "PiyushLadukar",
  avatar: "https://github.com/PiyushLadukar.png",
  title: "Full-Stack Engineer · Backend · AI · Data Science",
  email: "work.piyushladukar@gmail.com",
  phone: "+91 8668720984",
  resume: "/Piyush_Rajendra_Ladukar_Resume.pdf",
  socials: {
    github: "https://github.com/PiyushLadukar",
    linkedin: "https://www.linkedin.com/in/piyush-ladukar/",
    portfolio: "https://piyushladukar.vercel.app/",
    email: "mailto:work.piyushladukar@gmail.com",
  },
  roles: [
    "AI Engineer",
    1800,
    "Backend Developer",
    1800,
    "Full Stack Builder",
    1800,
    "Open Source Contributor",
    1800,
    "Hackathon Builder",
    1800,
  ],
};

export const ABOUT = {
  intro:
    "B.Tech CSE student at Jhulelal Institute Of Technology with a CGPA of 8.4. I build at the intersection of backend engineering, AI systems, civic-tech, and full-stack development — shipping things that matter.",
  bullets: [
    "Passionate about AI Agents, RAG, Vector Databases and intelligent workflows",
    "Strong in FastAPI, Node, scalable backends and clean architecture",
    "Loves civic-tech, data-driven products and hackathon-speed building",
  ],
  stats: [
    { label: "CGPA", value: 8.4, suffix: "" },
    { label: "Hackathons", value: 12, suffix: "+" },
    { label: "Projects Shipped", value: 7, suffix: "+" },
    { label: "Gold Medals", value: 2, suffix: "" },
  ],
};

export const SKILLS: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["JavaScript", "Python", "SQL"] },
  { category: "Frontend", items: ["React.js", "HTML", "CSS", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Flask", "FastAPI"] },
  { category: "AI / ML", items: ["Pandas", "NumPy", "Scikit-learn", "OpenCV", "LangChain", "RAG"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "Supabase", "SQLAlchemy", "MongoDB"] },
  { category: "Tools & Platforms", items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render"] },
];

export const MARQUEE = [
  "Python", "FastAPI", "React", "Node.js", "PostgreSQL", "Docker",
  "LangChain", "Supabase", "Pandas", "Flask", "JWT", "Vercel",
  "Express", "Scikit-learn", "OpenCV", "RAG", "Vector DB", "TypeScript",
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  long: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
  extra?: { label: string; href: string };
  highlight?: boolean;
  status?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "lokdrishti",
    name: "LokDrishti",
    tagline: "AI civic intelligence for India's parliament",
    description:
      "AI-based civic intelligence platform analyzing Lok Sabha MP data — attendance, debates, questions, criminal records, dashboards and APIs.",
    long: "End-to-end civic-tech platform for India's 18th Lok Sabha. Real parliamentary performance of 543 MPs with rankings, analytics, OAuth, and a full deployment workflow. Built on open data from PRS Legislative Research.",
    tech: ["Python", "React", "Node.js", "Flask", "Pandas", "BeautifulSoup", "Supabase", "OAuth"],
    image: lokdrishti,
    live: "https://lokdrishti.online",
    github: "https://github.com/PiyushLadukar/LokDrishti",
    highlight: true,
  },
  {
    id: "orbit",
    name: "Orbit",
    tagline: "Your AI job application copilot",
    description:
      "End-to-end AI workflow that automates job discovery, profile matching, resume tailoring, cover letter generation, and application drafting.",
    long: "Built with n8n, Python, and LLMs, Orbit orchestrates an intelligent job search pipeline by collecting opportunities, removing duplicate listings, ranking jobs based on profile relevance, generating ATS-optimized resumes, creating personalized cover letters, and drafting ready-to-send application emails. Designed to reduce repetitive tasks while keeping the user in control of every application.",
    tech: ["n8n", "Python", "LLMs", "OpenAI", "LinkedIn", "Gmail API", "Google Sheets"],
    image: orbit,
    github: "https://github.com/PiyushLadukar/Orbit",
  },  
  {
    id: "aatankdrishti",
    name: "AatankDrishti",
    tagline: "Global terrorism intelligence dashboard",
    description:
      "Large-scale terrorism analytics dashboard on the GTD dataset — 181K+ incidents across 200+ countries with AI clustering & ideology breakdowns.",
    long: "Analyzes 180,000+ documented incidents across 50 years. Ideology patterns, regional data, AI-discovered insights, and a research-grade explorer.",
    tech: ["Python", "Flask", "React", "Pandas", "NLP"],
    image: aatankdrishti,
    live: "https://aatank-drishti.vercel.app/",
    github: "https://github.com/PiyushLadukar/AatankDrishti",
    highlight: true,
  },
  {
    id: "whyfarmer",
    name: "Why-Farmer-Suicides?",
    tagline: "Maharashtra farmer suicide crisis, visualized",
    description:
      "Data platform visualizing Maharashtra farmer suicide trends from 2014–2023 with district-wise and state-wise dashboards.",
    long: "Maharashtra accounts for 27% of India's farmer suicides. This platform uses real government data to uncover why, with district and state dashboards and an open data explorer.",
    tech: ["Python", "Flask", "React", "Pandas"],
    image: whyfarmer,
    live: "https://why-farmer-suicides.vercel.app/",
    github: "https://github.com/PiyushLadukar/Why-Farmer-Suicides-",
  },
  {
    id: "anomax",
    name: "Anomax",
    tagline: "AI anomaly detection for electricity",
    description:
      "AI-driven anomaly detection system for electricity consumption behavior using machine learning. Published in IJVRA.",
    long: "Detects abnormal consumption patterns using ML to flag fraud, faults, and unusual behavior in real time. Research published in the International Journal of Visionary Research & Analytics.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    image: anomax,
    github: "https://github.com/yasminsheikh3125/AnomaxR",
    extra: { label: "Research Paper", href: "https://ijpub.org/ijvra/papers/IJVRA26A4340.pdf" },
  },
  {
    id: "secondbrain",
    name: "SecondBrain",
    tagline: "Personal AI ecosystem with agents & RAG",
    description:
      "An AI ecosystem with autonomous agents, RAG pipelines, vector databases and intelligent workflows built on LangChain / LangGraph concepts.",
    long: "In active development. Agentic workflows, retrieval-augmented generation, persistent memory, and orchestration across tools.",
    tech: ["Python", "LangChain", "LangGraph", "Vector DB", "FastAPI"],
    image: secondbrain,
    github: "https://github.com/PiyushLadukar/SecondBrain",
    status: "In Development",
  },
  {
    id: "qrscanner",
    name: "QR Scanner",
    tagline: "Real-time QR detection & decoding",
    description:
      "Real-time QR code scanner with live camera detection, decoding and clipboard utilities.",
    long: "Fast, lightweight QR scanning with detection + decoding pipeline and one-tap copy/utility actions.",
    tech: ["Python", "OpenCV"],
    image: qrscanner,
    github: "https://github.com/PiyushLadukar/QrScanByPi",
  },
  {
    id: "blocksbypi",
    name: "BlocksByPi",
    tagline: "Hand-tracked virtual blocks via webcam",
    description:
      "Reads your hand through a webcam, maps 21 skeletal landmarks 30+ times per second, and lets you place, move, rotate, and destroy virtual blocks — with nothing but gestures. No gloves. No sensors. Just hand, webcam, and Python.",
    long: "Real-time gesture-controlled block playground. Uses MediaPipe to track 21 hand landmarks at 30+ FPS and OpenCV for the camera pipeline. JavaScript drives the interactive scene where you place, move, rotate and destroy virtual blocks with bare-hand gestures — no gloves, no sensors, no special hardware.",
    tech: ["Python", "OpenCV", "MediaPipe", "JavaScript"],
    image: blocksbypi,
    github: "https://github.com/PiyushLadukar/BlocksByPi",
  },
];

import barkImg from "@/assets/volunteer/bark.png";
import encypheristImg from "@/assets/volunteer/encypherist.png";
import rotaractImg from "@/assets/volunteer/rotaract.png";
import photographyImg from "@/assets/volunteer/piyush-photography.png";

export type Volunteer = {
  position: string;
  organization: string;
  duration: string;
  image: string;
};

export const VOLUNTEER: Volunteer[] = [
  {
    position: "Social Media Head",
    organization: "Rotaract Club of JIT",
    duration: "Jun 2025 — May 2026 · 1 yr",
    image: rotaractImg,
  },
  {
    position: "Head of Photography",
    organization: "Rotaract Club of JIT",
    duration: "May 2024 — Jun 2025 · 1 yr 2 mos",
    image: photographyImg,
  },
  {
    position: "Senior Executive Member",
    organization: "Encypherist",
    duration: "Aug 2025 — June 2026 · 11 mos",
    image: encypheristImg,
  },
  {
    position: "Volunteer",
    organization: "The Bark Organisation",
    duration: "Feb 2025 — Present · 1 yr 4 mos",
    image: barkImg,
  },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer Intern",
    company: "Smart Start Pvt. Ltd.",
    period: "Jul 2026 — Present",
    bullets: [
      "Developed and maintained 10+ full-stack features using Python, FastAPI, React.js, and Next.js for scalable business applications",
      "Built and integrated 15+ REST API endpoints enabling seamless communication between frontend interfaces and backend services",
      "Designed and optimized 8+ database models while implementing JWT-based authentication and role-based access workflows to improve application security",
      "Collaborated with a cross-functional team using Git to develop, test, review, and deploy 20+ production-ready code changes across multiple development sprints",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Flask",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "JavaScript",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Git",
      "Docker",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "ESM Pvt. Ltd",
    period: "Aug 2025 — Nov 2025",
    bullets: [
      "Built secure REST APIs powering enterprise backend systems",
      "Implemented JWT authentication and RBAC authorization",
      "Designed and integrated PostgreSQL data layer",
      "Shipped production-ready services with Node & Express",
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "JWT", "MongoDB"],
  },
];

export const ACHIEVEMENTS = [
  { label: "Hackathons participated", value: 12, suffix: "+" },
  { label: "Hackathon events as Event Head", value: 2, suffix: "" },
  { label: "AI / Full-stack apps shipped", value: 7, suffix: "+" },
  { label: "Gold Medals · National Karate", value: 2, suffix: "" },
];

export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
