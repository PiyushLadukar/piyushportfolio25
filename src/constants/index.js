// ============================================================
// CONSTANTS — All content data for the portfolio
// ============================================================

export const PERSONAL = {
  name: "Piyush Rajendra Ladukar",
  nameShort: "Piyush",
  title: "Full-Stack Engineer | Backend | AI | Data Science",
  location: "Nagpur, India",
  phone: "+91 8668720984",
  email: "work.piyushladukar@gmail.com",       // <- ADD YOUR ACTUAL EMAIL
  github: "https://github.com/PiyushLadukar",     // <- ADD YOUR GITHUB URL
  linkedin: "https://www.linkedin.com/in/piyush-ladukar", // <- ADD YOUR LINKEDIN URL
  resumeUrl: "/resume.pdf",               // <- Place resume PDF in /public/resume.pdf
  photo: "/photo.jpg",                    // <- Place your photo in /public/photo.jpg
  bio: "B.Tech CSE student building impactful products at the intersection of AI, civic-tech, and full-stack engineering. Passionate about scalable backend systems, intelligent agents, and open-source.",
};

export const TYPING_STRINGS = [
  "AI Engineer",
  "Backend Developer",
  "Full Stack Builder",
  "Open Source Contributor",
  "Hackathon Builder",
  "Civic Tech Enthusiast",
];

export const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Experience",   href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export const SKILLS = {
  Languages: [
    { name: "JavaScript", level: 90 },
    { name: "Python",     level: 92 },
    { name: "SQL",        level: 85 },
  ],
  Frontend: [
    { name: "React.js",      level: 88 },
    { name: "HTML",          level: 95 },
    { name: "CSS / Tailwind",level: 88 },
    { name: "Figma",         level: 70 },
  ],
  Backend: [
    { name: "Node.js",    level: 85 },
    { name: "Express.js", level: 85 },
    { name: "Flask",      level: 88 },
    { name: "FastAPI",    level: 80 },
  ],
  "AI / ML": [
    { name: "Pandas",       level: 90 },
    { name: "NumPy",        level: 88 },
    { name: "Scikit-learn", level: 78 },
    { name: "OpenCV",       level: 75 },
    { name: "BeautifulSoup",level: 85 },
    { name: "LangChain",    level: 65 },
  ],
  Databases: [
    { name: "PostgreSQL", level: 85 },
    { name: "MySQL",      level: 82 },
    { name: "Supabase",   level: 80 },
    { name: "SQLAlchemy", level: 78 },
    { name: "MongoDB",    level: 72 },
  ],
  "Tools & Platforms": [
    { name: "Git / GitHub", level: 90 },
    { name: "Docker",       level: 70 },
    { name: "Postman",      level: 88 },
    { name: "Vercel",       level: 85 },
    { name: "Render",       level: 80 },
  ],
};

export const TECH_MARQUEE = [
  "React.js", "Node.js", "Python", "Flask", "FastAPI", "PostgreSQL",
  "Supabase", "Docker", "GSAP", "Framer Motion", "OpenCV", "Scikit-learn",
  "Pandas", "NumPy", "GitHub", "Vercel", "SQLAlchemy", "LangChain",
  "JWT", "REST APIs", "Git", "Postman", "MongoDB", "Figma",
];

export const PROJECTS = [
  {
    id: 1,
    title: "LokDrishti",
    tagline: "AI-based Civic Intelligence Platform",
    description:
      "AI-powered platform analyzing Lok Sabha MP data — attendance, debates, questions, criminal records. Built scraping pipelines, structured APIs, analytics dashboards, and full deployment workflow for public parliamentary data transparency.",
    longDescription:
      "LokDrishti is a civic-tech platform that brings radical transparency to Indian parliamentary data. It scrapes, processes, and visualizes data on 543 MPs — covering debates, attendance records, criminal backgrounds, and question activity. The platform features a full analytics dashboard, REST APIs for third-party access, and is deployed with automated update pipelines.",
    tech: ["Python", "React.js", "Node.js", "Flask", "Pandas", "NumPy", "BeautifulSoup", "Supabase", "OAuth"],
    github: "https://github.com/PiyushLadukar/LokDrishti", // <- ADD GITHUB LINK
    live: "https://lokdrishti.online/",                                               // <- ADD LIVE URL if deployed
    color: "from-blue-500 to-cyan-400",
    accent: "#00d4ff",
    featured: true,
    status: "Live",
  },
  {
    id: 2,
    title: "Why-Farmers-Suicides?",
    tagline: "Data Analytics Platform",
    description:
      "Data analysis platform visualizing Maharashtra farmer suicide trends from 2014-2023. Provides district-wise and state-wise dashboards exploring debt, crop failure, weather, and financial stress patterns.",
    longDescription:
      "A data-driven research platform that visualizes one of Maharashtra's most critical social crises. Built with Flask + React, it processes district-level data across 9 years to surface patterns in farmer suicides linked to rainfall, crop prices, and debt cycles. Interactive choropleth maps and trend charts make complex government data accessible.",
    tech: ["Python", "Flask", "React.js", "Pandas", "NumPy", "BeautifulSoup"],
    github: "https://github.com/PiyushLadukar/Why-Farmer-Suicides-", // <- ADD GITHUB LINK
    live: "https://why-farmer-suicides.vercel.app",
    color: "from-green-500 to-emerald-400",
    accent: "#10b981",
    featured: true,
    status: "Live",
  },
  {
    id: 3,
    title: "AatankDrishti",
    tagline: "Global Terrorism Analytics Dashboard",
    description:
      "Large-scale terrorism data visualization dashboard using the GTD dataset with 181K+ incidents across 200+ countries. Features interactive analytics, trend visualizations, and large dataset processing pipelines.",
    longDescription:
      "AatankDrishti processes the Global Terrorism Database (GTD) with 181,000+ terrorist incidents spanning 50+ years. The platform features geospatial heatmaps, timeline visualizations, group activity trackers, and regional trend analysis — making complex security research data accessible to researchers and policymakers.",
    tech: ["Python", "Flask", "React.js", "Pandas", "NumPy", "BeautifulSoup"],
    github: "https://github.com/PiyushLadukar/AatankDrishti", // <- ADD GITHUB LINK
    live: "https://aatank-drishti.vercel.app",
    color: "from-red-500 to-orange-400",
    accent: "#f97316",
    featured: true,
    status: "Live",
  },
  {
    id: 4,
    title: "Anomax",
    tagline: "AI Anomaly Detection System",
    description:
      "AI-driven anomaly detection for unusual electricity consumption behavior using machine learning. Research published in IJVRA (International Journal of Versatile Research and Analysis).",
    longDescription:
      "Anomax applies unsupervised ML techniques (Isolation Forest, DBSCAN) to detect unusual electricity consumption patterns in smart grid data. The system identifies theft, equipment failure, and inefficiency in real-time. The research findings were peer-reviewed and published in IJVRA journal.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Flask"],
    github: "github.com/yasminsheikh3125/AnomaxR", // <- ADD GITHUB LINK
    live: "",
    paper: "https://ijpub.org/ijvra/papers/IJVRA26A4340.pdf",                         // <- ADD PAPER LINK
    color: "from-purple-500 to-violet-400",
    accent: "#7c3aed",
    featured: false,
    badge: "Research Published",
    status: "Published",
  },
  {
    id: 5,
    title: "QR-Scanner",
    tagline: "Real-Time QR Detection App",
    description:
      "Real-time QR code scanning application with live detection, decoding, clipboard utilities, and camera stream processing.",
    tech: ["Python", "OpenCV", "Pyzbar", "Flask"],
    github: "https://github.com/PiyushLadukar/QrScanByPi", // <- ADD GITHUB LINK
    live: "",
    color: "from-sky-500 to-blue-400",
    accent: "#0ea5e9",
    featured: false,
    status: "Live",
  },
  {
    id: 6,
    title: "SecondBrain",
    tagline: "Personal AI Ecosystem",
    description:
      "Personal AI ecosystem with AI agents, RAG pipelines, vector databases, and intelligent workflows inspired by LangChain/LangGraph architecture patterns.",
    tech: ["Python", "LangChain", "LangGraph", "FastAPI", "Vector DB"],
    github: "https://github.com/PiyushLadukar/SecondBrain", // <- ADD GITHUB LINK
    live: "",
    color: "from-fuchsia-500 to-pink-400",
    accent: "#ec4899",
    featured: false,
    badge: "In Development",
    status: "In Dev",
  },
];

export const EXPERIENCE = [
  {
    company: "ESM Pvt. Ltd",
    fullName: "ESM Elixir (Formally Dysmech Consultancy Services)",
    role: "Backend Developer Intern",
    type: "On-site",
    period: "Aug 2025 - Oct 2025",
    description:
      "ESM Elixir focuses on Corporate Insolvency Resolution Process (CIRP), IBC advisory, Digital Engineering, IT solutions, and IoT product development.",
    responsibilities: [
      "Developed and maintained secure REST APIs using Node.js, Express.js, and PostgreSQL for internal enterprise applications and backend services.",
      "Implemented JWT Authentication and RBAC-based authorization systems, improving secure access control and backend security workflows.",
      "Collaborated on secure enterprise systems integrating authentication, role management, and database-driven services.",
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "JWT", "RBAC", "MongoDB", "Git", "Postman"],
  },
];

// NOTE: ACHIEVEMENTS data is defined directly in Achievements.jsx using react-icons.
// It has been removed from here to avoid emoji usage in constants.

export const OPEN_SOURCE = [
  {
    name: "Rajniti",
    description: "Contributing to an open-source political and civic-tech platform focused on structured political data, analytics, and transparency tools for Indian democracy.",
    github: "https://github.com/imsks/Rajniti", // <- ADD CORRECT LINK
    role: "Contributor",
    live: "https://rajniti-app.vercel.app",
    color: "from-blue-500 to-purple-500",
  },
];

export const EDUCATION = {
  institution: "Jhulelal Institute Of Technology",
  location: "Nagpur",
  degree: "B.Tech — Computer Science Engineering",
  period: "July 2023 – Present",
  cgpa: "8.4",
};

export const FLOATING_CODE_SNIPPETS = [
  `const ai = await llm.invoke(prompt);`,
  `SELECT mp_name, attendance FROM lok_sabha;`,
  `@app.route('/api/analyze')`,
  `useEffect(() => { fetchData(); }, []);`,
  `model.fit(X_train, y_train)`,
  `async def process_query(q: Query):`,
  `git commit -m "feat: add RAG pipeline"`,
  `npm run build && vercel deploy`,
  `docker build -t anomax .`,
  `const { data } = await supabase.from('mps')`,
];