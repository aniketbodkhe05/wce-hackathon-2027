export const eventData = {
  name: "WCE HACKATHON 2027",
  edition: "2027",
  tagline: "CODE · CREATE · CONQUER",
  headline: "BUILD WHAT MATTERS.",
  supportingText: "A 24-hour hackathon by WCE ACM.",

  institution: "Walchand College of Engineering, Sangli",
  institutionShort: "WCE Sangli",
  institutionEst: "Established 1947",
  chapter: "WCE ACM Student Chapter",
  chapterCharter: "Authorized by ACM India Council · March 18, 2016",
  symposium: "VISION 2027 Technical Symposium",
  format: "24-hour offline hackathon",
  location: "Walchand College of Engineering, A/P Vishrambag, Sangli, Maharashtra 416415",
  contactEmail: "wceacmsc@gmail.com",
  officialWebsite: "https://www.wcehackathon.in/",
  registrationStatus: "Pre-registration open",

  socials: {
    youtube: "https://www.youtube.com/@wceacm?sub_confirmation=1",
    instagram: "https://www.instagram.com/wce_acm/",
    twitter: "https://twitter.com/wce_acm",
    linkedin: "https://www.linkedin.com/company/wce-acm-student-chapter/mycompany/",
  },

  leads: [
    { name: "Afnan Sayyad", role: "Student Coordinator", phone: "+91 8459039945" },
    { name: "Siddhi Verma", role: "Student Coordinator", phone: "+91 8010596040" },
    { name: "Sanika Pawar", role: "Student Coordinator", phone: "+91 7558780903" },
  ],

  patron: {
    name: "Dr. S. S. Rathod",
    role: "Director, Walchand College of Engineering, Sangli",
  },

  navItems: [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "about", label: "About", href: "#about" },
    { id: "highlights", label: "GLIMPSES", href: "#highlights" },
    { id: "domains", label: "Tracks", href: "#domains" },
    { id: "timeline", label: "Timeline", href: "#timeline" },
    { id: "prizes", label: "Prizes", href: "#prizes" },
    { id: "sponsors", label: "Sponsors", href: "#sponsors" },
    { id: "journey", label: "Journey", href: "#journey" },
    { id: "faq", label: "FAQ", href: "#faq" },
  ],

  highlights: [
    {
      code: "01",
      title: "24-Hour Sprint",
      description: "Build continuously from kickoff to final demo.",
      metric: "24 HOURS",
    },
    {
      code: "02",
      title: "Two Tracks",
      description: "Choose the Novice or Expert problem track.",
      metric: "2 TRACKS",
    },
    {
      code: "03",
      title: "Two Checkpoints",
      description: "Review progress with mentors and faculty.",
      metric: "2 REVIEWS",
    },
    {
      code: "04",
      title: "Meals & Hospitality",
      description: "Meals, refreshments, and workspace provided on campus.",
      metric: "ON CAMPUS",
    },
    {
      code: "05",
      title: "Verified Certificates",
      description: "Digital credentials for eligible participants.",
      metric: "CERTIFIED",
    },
    {
      code: "06",
      title: "Since 1947",
      description: "Hosted at WCE Sangli, with WCE ACM since 2016.",
      metric: "EST. 1947",
    },
  ],

  domains: [
    {
      id: "novice-iot",
      track: "novice",
      title: "Smart Campus & IoT",
      tagline: "Connected systems for campus operations",
      description: "Build hardware or IoT solutions for energy, attendance, safety, or automation.",
      tags: ["IoT", "Microcontrollers", "Automation", "Embedded"],
      sampleIdeas: [
        "Low-cost automated campus resource and light monitoring",
        "Sensor-based laboratory safety and equipment tracking",
        "Smart attendance validation using embedded edge devices",
      ],
    },
    {
      id: "novice-fintech",
      track: "novice",
      title: "FinTech & Financial Literacy",
      tagline: "Secure tools for everyday money management",
      description: "Create accessible solutions for budgeting, payments, fraud prevention, or financial education.",
      tags: ["FinTech", "Web3", "Micro-finance", "Security"],
      sampleIdeas: [
        "Student budgeting engine with predictive recurring expense alerts",
        "Fraud-resistant digital wallet architecture for campus economies",
        "Gamified interactive micro-investing and financial literacy modules",
      ],
    },
    {
      id: "novice-edtech",
      track: "novice",
      title: "EdTech & Simulation",
      tagline: "Interactive tools for better learning",
      description: "Design learning simulations, gamified lessons, or adaptive study platforms.",
      tags: ["EdTech", "Gamification", "Simulations", "Web-XR"],
      sampleIdeas: [
        "Interactive 3D science experiment simulator with real-time physics",
        "Adaptive peer study graph with synchronized problem solving",
        "Visual algorithm execution workbench for junior engineers",
      ],
    },
    {
      id: "novice-health",
      track: "novice",
      title: "Health & Assistive Tech",
      tagline: "Technology for wellbeing and accessibility",
      description: "Build health trackers, accessibility tools, or assistive applications.",
      tags: ["Digital Health", "Accessibility", "Telemetry", "UI/UX"],
      sampleIdeas: [
        "Personalized habit and circadian cycle scheduler for students",
        "Smart visual aid app with edge audio cues for campus navigation",
        "Emergency health alert network with verified medical consent",
      ],
    },
    {
      id: "novice-social",
      track: "novice",
      title: "Civic & Community Impact",
      tagline: "Software for public and community needs",
      description: "Solve local challenges in collaboration, reporting, welfare, or volunteering.",
      tags: ["Civic Tech", "Crowdsourcing", "Public Welfare", "GIS"],
      sampleIdeas: [
        "Community municipal hazard reporting with geolocation verification",
        "Surplus food distribution network connecting mess halls to shelters",
        "Volunteer skills-matching portal for non-profit grassroots campaigns",
      ],
    },
    {
      id: "novice-sustainability",
      track: "novice",
      title: "Environmental Sustainability",
      tagline: "Tools for cleaner resource use",
      description: "Optimize energy, water, waste, or sustainable campus operations.",
      tags: ["CleanTech", "Energy Efficiency", "Green AI", "Sustainability"],
      sampleIdeas: [
        "IoT-based energy drain audit for college computer centers",
        "Smart rainwater harvesting and storage capacity forecaster",
        "Campus e-waste exchange and refurbishing registry",
      ],
    },
    {
      id: "expert-graphmind",
      track: "expert",
      title: "Long-Term Agent Memory",
      tagline: "Graph and vector memory for AI agents",
      description: "Build user-scoped memory with traceable retrieval and source citations.",
      tags: ["Knowledge Graphs", "Hybrid RAG", "Memory Isolation", "Cypher/Neo4j"],
      deliverables: [
        "Deterministic user-scoped graph memory schema (facts, entities, relations)",
        "Sub-100ms graph traversal retrieval time (excluding generative inference)",
        "Cryptographic user namespace isolation preventing cross-tenant leakage",
        "Auditable citation graph tracing answers to exact memory nodes",
      ],
    },
    {
      id: "expert-versioning",
      track: "expert",
      title: "Dataset Versioning",
      tagline: "Reproducible ML data workflows",
      description: "Create immutable, content-addressed version control for text datasets.",
      tags: ["Systems Programming", "Merkle Trees", "MLOps", "Reproducibility"],
      deliverables: [
        "Filesystem-based content-addressable storage (strictly no SQL/NoSQL databases)",
        "Deterministic hashing pipeline for raw and tokenized corpora",
        "Visual side-by-side version comparison with semantic explanation delta",
        "Python + NumPy + Pandas strict execution target with automated audit",
      ],
    },
    {
      id: "expert-rag",
      track: "expert",
      title: "Grounded RAG",
      tagline: "Answers with verifiable citations",
      description: "Build retrieval-augmented QA with section-level source attribution.",
      tags: ["Dense Vectors", "BM25 Hybrid", "Provenance", "Re-ranking"],
      deliverables: [
        "Section-aware hierarchical chunking preserves table and header context",
        "Hybrid Top-K dense-vector (FAISS/Qdrant) + BM25 reciprocal rank fusion",
        "Strict hallucination barrier: return deterministic fallback if unsupported by context",
        "Automated CSV benchmark evaluation against golden evaluation splits",
      ],
    },
  ],

  timeline: [
    {
      step: "01",
      phase: "Registration",
      title: "Abstract Submission",
      timeframe: "Announcement period",
      highlights: [
        "Teams of 2–4 undergraduate students",
        "Choose Novice or Expert track",
        "Round 1 is free",
      ],
    },
    {
      step: "02",
      phase: "Shortlisting",
      title: "Finalist Announcement",
      timeframe: "Post-evaluation",
      highlights: [
        "Top teams selected per track",
        "₹400 team fee confirms campus entry",
      ],
    },
    {
      step: "03",
      phase: "Build",
      title: "24-Hour Hackathon",
      timeframe: "Day 1 · 10:00 AM",
      highlights: [
        "Kickoff and team verification",
        "Meals, refreshments, and workspace",
      ],
    },
    {
      step: "04",
      phase: "Review",
      title: "Mentor Checkpoints",
      timeframe: "Day 1 · 6:00 PM & 2:00 AM",
      highlights: [
        "Architecture and feasibility review",
        "Code and prototype audit",
      ],
    },
    {
      step: "05",
      phase: "Demo",
      title: "Demos & Awards",
      timeframe: "Day 2 · 12:00 PM",
      highlights: [
        "5-minute demo and jury Q&A",
        "Trophies, cash prizes, and internships",
      ],
    },
  ],

  prizes: [
    {
      id: "podium",
      title: "Track Champions",
      category: "EXPERT & NOVICE TRACKS",
      description: "Cash prizes, trophies, and certificates for top teams.",
      perks: [
        "Champion trophy and certificate",
        "Cash prizes for the top three teams",
        "Interview fast-tracks with sponsors",
        "Recognition from ACM India and WCE",
      ],
      highlight: true,
    },
    {
      id: "internships",
      title: "Industry Internships",
      category: "CAREER OPPORTUNITIES",
      description: "Internship opportunities with partner companies.",
      perks: [
        "Interviews with sponsoring firms",
        "Mentorship from technical leads",
        "Recommendation letters",
      ],
    },
    {
      id: "uiux",
      title: "Best UI/UX",
      category: "NOVICE TRACK",
      description: "Award for the most intuitive and accessible interface.",
      perks: [
        "Design trophy and goodies",
        "Reviewed on usability and responsiveness",
        "Featured in WCE ACM publications",
      ],
    },
    {
      id: "social",
      title: "Best Social Presence",
      category: "CROSS-TRACK AWARD",
      description: "Award for strong documentation and community engagement.",
      perks: [
        "Commendation and merch kit",
        "Creative posts tagging @wce_acm",
        "Judged on reach and engagement",
      ],
    },
    {
      id: "certificates",
      title: "Verified Certificates",
      category: "ALL PARTICIPANTS",
      description: "Digital certificates for active participants.",
      perks: [
        "Verifiable VISION credential",
        "Institutional participation record",
        "Useful for resumes and academics",
      ],
    },
  ],

  sponsorshipTiers: [
    {
      tier: "Title & Platinum",
      badge: "KEYNOTE & RECRUITMENT",
      status: "Open for 2027",
      perks: [
        "Brand presence in press and keynotes",
        "Own a custom challenge track",
        "Recruitment booth and resume access",
        "Logo on stage, merch, and website",
      ],
    },
    {
      tier: "Gold Partner",
      badge: "MENTORSHIP & TECH",
      status: "Open for 2027",
      perks: [
        "Mentor at checkpoints and judging",
        "Showcase APIs or SDKs to participants",
        "Website and banner placement",
        "Access to participant resumes",
      ],
    },
    {
      tier: "Community Partner",
      badge: "TOOLS & ECOSYSTEM",
      status: "Open for 2027",
      perks: [
        "Distribute credits, APIs, or cloud vouchers",
        "Logo on website and certificates",
        "Mention at the closing ceremony",
      ],
    },
  ],

  pastPartners: [
    {
      name: "Zenteiq",
      role: "Previous Edition Sponsor",
      logo: "/assets/zenteiq_logo-D6AvpBZd.png",
    },
    {
      name: "Unstop",
      role: "Registration Partner",
      logo: "",
    },
  ],

  journey: [
    {
      step: "01",
      title: "Choose a Problem",
      subtitle: "RESEARCH",
      description: "Review the problem statements and define a clear user need.",
      keyOutputs: [
        "Select a track and problem",
        "Identify the target user",
        "Define the core solution",
      ],
    },
    {
      step: "02",
      title: "Plan the Build",
      subtitle: "ARCHITECTURE",
      description: "Choose the stack and map the system before coding.",
      keyOutputs: [
        "Create an architecture diagram",
        "Finalize the tech stack",
        "Submit the Round 1 proposal",
      ],
    },
    {
      step: "03",
      title: "Build for 24 Hours",
      subtitle: "DEVELOPMENT",
      description: "Code, test, and iterate through the offline sprint at WCE Sangli.",
      keyOutputs: [
        "Build a working prototype",
        "Commit progress to Git",
        "Prepare for checkpoints",
      ],
    },
    {
      step: "04",
      title: "Review & Refine",
      subtitle: "MENTORSHIP",
      description: "Use mentor feedback to improve the product before judging.",
      keyOutputs: [
        "Architecture review",
        "Code and prototype audit",
        "Fix critical issues",
      ],
    },
    {
      step: "05",
      title: "Present to the Jury",
      subtitle: "DEMO",
      description: "Show a working demo and explain your technical choices.",
      keyOutputs: [
        "5-minute live demo",
        "Jury Q&A",
        "Awards and closing ceremony",
      ],
    },
  ],

  faqs: [
    {
      category: "general",
      question: "What is WCE Hackathon 2027?",
      answer: "A 24-hour national hackathon by WCE ACM at WCE Sangli, held under VISION.",
    },
    {
      category: "tracks",
      question: "What are the two tracks?",
      answer: "Novice for 1st–2nd year students; Expert for 3rd year and above or experienced developers.",
    },
    {
      category: "tracks",
      question: "Who can participate?",
      answer: "Undergraduate engineering students. Cross-college teams are welcome."
    },
    {
      category: "rules",
      question: "What is the team size?",
      answer: "2–4 members per team."
    },
    {
      category: "rules",
      question: "What does it cost?",
      answer: "Round 1 is free. Shortlisted teams pay ₹400 per team for offline logistics."
    },
    {
      category: "logistics",
      question: "What should we bring?",
      answer: "Laptop, charger, college ID, and required hardware. Network and workspace are provided."
    },
    {
      category: "logistics",
      question: "Are meals provided?",
      answer: "Yes. Meals, midnight refreshments, and beverages are provided."
    },
    {
      category: "general",
      question: "Can beginners participate?",
      answer: "Yes. The Novice Track includes mentors and structured checkpoints."
    },
    {
      category: "rules",
      question: "Can we use existing code?",
      answer: "Core logic must be written during the event. Open-source libraries and APIs are allowed. Git histories are audited."
    },
  ],
};
