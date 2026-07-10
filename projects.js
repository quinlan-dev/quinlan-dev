/* ============================================================
   CONTENT DATA — this is the ONLY file you edit.
   PROJECTS = project cards, EXPERIENCE = work timeline,
   SITE = name/pitch/skills/links.
   Newest / most impressive first — recruiters skim.
   ============================================================

   PROJECT TEMPLATE (copy inside the PROJECTS array):
   {
     name: "Project Name",
     tagline: "One line: what it does and why it matters.",
     description: "2–3 sentences. Problem → what you built → results.",
     tags: ["Python", "React"],
     status: "Active",        // "Active" | "Completed" | "In Development"
     featured: true,          // featured projects get the full-width card
     links: { github: "", demo: "", writeup: "" },   // "" hides a link
     highlights: ["Quantified achievement", "Another one"]
   },
*/

const PROJECTS = [
  {
    name: "Hybrid Routing Proxy for Coding Agents",
    tagline: "Per-step model router that cuts coding-agent costs by sending easy steps to a local 8B model and hard ones to a frontier 32B model.",
    description:
      "A routing proxy that sits between coding agents (OpenCode) and model backends, dispatching " +
      "each request based on trajectory state, request features, and response confidence — " +
      "evaluated end-to-end on SWE-bench Lite to measure cost-vs-success tradeoffs.",
    tags: ["Python", "FastAPI", "Ollama", "NVIDIA NIM", "Docker", "SWE-bench", "AI/ML"],
    status: "Completed",
    featured: true,
    links: { github: "", demo: "", writeup: "" },
    highlights: [
      "OpenAI-compatible FastAPI server with per-trajectory state, heuristic routing, and logprob-based confidence checks",
      "Escalation path that retries low-confidence local outputs against the frontier model",
      "Evaluated on a stratified 50-issue SWE-bench Lite subset with baseline, ablation, and full-system runs through an automated harness"
    ]
  },
  {
    name: "Neural Sentiment Analyzer",
    tagline: "End-to-end ML pipeline for multi-class sentiment classification — 89% test accuracy, sub-100ms serving.",
    description:
      "A production-style ML system: reproducible training with versioned data and tracked " +
      "experiments, deployed as a containerized inference service with caching.",
    tags: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker", "Redis", "AI/ML"],
    status: "Active",
    featured: true,
    links: { github: "", demo: "", writeup: "" },
    highlights: [
      "89% accuracy on the held-out test set using PyTorch and Hugging Face Transformers",
      "Reproducible preprocessing, training, and evaluation workflows following MLOps practices",
      "Containerized FastAPI service with a Redis caching layer serving sub-100ms inference latency under load testing"
    ]
  },
  {
    name: "CollabSpace",
    tagline: "Real-time collaborative workspace with Google Docs-style multi-user editing.",
    description:
      "A distributed real-time editor using WebSockets and operational transformation to keep " +
      "multi-user edits consistent, built to scale horizontally across server instances.",
    tags: ["Node.js", "React", "WebSockets", "MongoDB", "Redis", "JWT"],
    status: "Active",
    featured: false,
    links: { github: "", demo: "", writeup: "" },
    highlights: [
      "Operational transformation keeps concurrent edits consistent across clients",
      "MongoDB persistence + Redis pub/sub broadcasting for horizontal scaling",
      "JWT auth, role-based access control, and live cursor/presence tracking"
    ]
  },
  {
    name: "AFKapply",
    tagline: "Automated job application assistant that applies while you're away from keyboard.",
    description:
      "Automates the repetitive parts of the job application pipeline — discovering postings, " +
      "tailoring materials, and submitting applications. " +
      "(Edit this description in projects.js with your real details.)",
    tags: ["Python", "Automation", "Web Scraping"],
    status: "In Development",
    featured: false,
    links: { github: "https://github.com/quinlan-dev/AFKapply", demo: "", writeup: "" },
    highlights: [
      "Automates the end-to-end job application workflow",
      "Replace with quantified achievements as the project matures"
    ]
  },
  {
    name: "NodeSense",
    tagline: "Explainable AI intrusion detection — a transformer that catches novel network attacks and explains every alert with SHAP.",
    description:
      "Signature-based IDS tools miss zero-days, and ML detectors that catch them can't explain " +
      "themselves. NodeSense does both: a transformer classifies sequences of network flows into " +
      "six traffic classes, and a live SHAP layer attributes each detection to the exact flow" +
      "features that drove it. Deployed end-to-end: ONNX serving on Hugging Face Spaces behind a " +
      "React dashboard with a real-time alert stream.",
    tags: ["Python", "PyTorch", "FastAPI", "ONNX", "SHAP", "React", "Docker", "AI/ML", "Security"],
    status: "Active",
    featured: true,
    links: {
      github: "https://github.com/quinlan-dev/NodeSense",
      demo: "https://quinlan-dev.github.io/NodeSense/",
      writeup: ""
    },
    highlights: [
      "Transformer sequence classifier (6 attack classes) exported to a 335KB ONNX model serving <5ms CPU inference",
      "Real-time KernelSHAP explanations (~120ms) computed against the served model for every alert",
      "Benchmarked against random forest (0.998 AUC) and autoencoder (0.959 AUC) baselines in one reproducible pipeline",
      "Free-tier production deploy: FastAPI + WebSockets on HF Spaces, React dashboard on GitHub Pages"
    ]
  }
];

/* ============================================================
   EXPERIENCE — work timeline. Same idea: copy a block, edit it.
   ============================================================ */
const EXPERIENCE = [
  {
    company: "Onto Innovation",
    role: "Test Associate Engineer, Data Collections",
    period: "April 2026 – Present",
    location: "Milpitas, CA",
    tags: ["Python", "Data Collection", "Metrology"],
    bullets: [
      "Collect, validate, and debug wafer metrology and inspection data across Atlas V, G6, and additional platforms using Python in Spyder and Comet to support process control workflows.",
      "Analyze tool output and version-controlled scripts within the N2000 platform, supporting cross-functional engineers in surfacing data quality issues and configuration improvements.",
      "Write Python scripts to explore parsing and processing improvements for metrology data pipelines, while performing hardware adjustments to reproduce and characterize live tool behavior."
    ]
  },
  {
    company: "Playgo.AI",
    role: "AI Developer and Tester",
    period: "December 2023 – December 2024",
    location: "Remote",
    tags: ["AI", "Godot", "UX Testing"],
    bullets: [
      "Built an AI-driven mini-game generation system in Godot using contextual keyword analysis and user behavior signals to procedurally generate gameplay content.",
      "Ran user testing sessions and analyzed gameplay data to identify friction points, translating findings into prioritized recommendations for UX and mechanics iteration.",
      "Packaged and deployed builds across iOS and Android, validating desktop compatibility through BlueStacks emulation."
    ]
  },
  {
    company: "Polyglot",
    role: "Full-Stack Engineer Intern",
    period: "January 2024 – May 2024",
    location: "Stanford University",
    tags: ["React", "Node.js", "Voice AI"],
    bullets: [
      "Built an AI-powered language learning platform end-to-end across React frontend and Node.js backend, integrating deepfake voice synthesis to simulate native-speaker conversations.",
      "Implemented and refined the voice synthesis pipeline, connecting speech models to the live conversation flow for real-time multilingual practice.",
      "Pitched the project at Stanford as part of SSS Batch W23 and buildspace s5 to peers, mentors, and program reviewers."
    ]
  }
];

const EDUCATION = [
  {
    school: "University of California, Santa Cruz",
    degree: "M.S. in Computer Science",
    period: "September 2025 – Present",
    detail:
      "Relevant courses: Analysis of Algorithms, Computer Architecture, LLMs, Machine Learning, " +
      "Machine Learning Systems Design, Stream Processing"
  }
];

/* ============================================================
   SITE CONFIG — your name, pitch, links, skills.
   ============================================================ */
const SITE = {
  name: "Quinlan Hoang",
  role: "AI/ML · Data · Security · Software Engineering",
  pitch:
    "M.S. Computer Science student at UC Santa Cruz building at the intersection of machine " +
    "learning systems, data collection & analytics, and cybersecurity. I like turning messy " +
    "real-world data and expensive AI pipelines into fast, measurable, production-ready systems.",
  location: "San Jose, CA",
  email: "quinlanhoang14@gmail.com",
  github: "https://github.com/quinlan-dev",
  linkedin: "https://www.linkedin.com/in/quinlanhoang/",
  resume: "",   // drop resume.pdf next to index.html and set "resume.pdf"

  skills: {
    "Languages": ["Python", "C", "C++", "C#", "JavaScript", "TypeScript", "SQL", "Bash", "HTML", "CSS"],
    "AI / ML": ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face Transformers", "Pandas", "NumPy", "LLM Systems", "MLOps"],
    "Frameworks / Libraries": ["FastAPI", "Node.js", "React", "Redux"],
    "Tools / Platforms": ["Git", "Docker", "Linux", "PostgreSQL", "MongoDB", "Redis", "Spyder", "Jupyter", "Vercel"],
    "Focus Areas": ["Data Collection", "Data Analytics", "Machine Learning Systems", "Cybersecurity", "Stream Processing", "Automation"]
  }
};
