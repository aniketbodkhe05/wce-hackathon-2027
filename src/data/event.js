export const eventData = {
  name: "WCE HACKATHON 2027",
  edition: "2027",
  tagline: "CODE | CREATE | CONQUER",
  headline: "BUILD WHAT MATTERS.",
  supportingText: "One arena. Limitless possibilities.",

  institution: "Walchand College of Engineering, Sangli",
  institutionShort: "WCE Sangli",
  institutionEst: "Established 1947",
  chapter: "WCE ACM Student Chapter",
  chapterCharter: "Chartered March 18, 2016 (Authorized by ACM India Council)",
  symposium: "VISION National-Level Technical Symposium",
  format: "24-Hour Continuous Offline Hackathon",
  location: "Walchand College of Engineering, A/P Vishrambag, Sangli, Maharashtra 416415",
  contactEmail: "wceacmsc@gmail.com",
  officialWebsite: "https://www.wcehackathon.in/",
  registrationStatus: "Pre-Registration & Priority Alerts Open",

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
    { id: "hero", label: "Overview", href: "#hero" },
    { id: "about", label: "About", href: "#about" },
    { id: "highlights", label: "Highlights", href: "#highlights" },
    { id: "domains", label: "Domains", href: "#domains" },
    { id: "timeline", label: "Timeline", href: "#timeline" },
    { id: "prizes", label: "Prizes", href: "#prizes" },
    { id: "sponsors", label: "Sponsors", href: "#sponsors" },
    { id: "journey", label: "Journey", href: "#journey" },
    { id: "faq", label: "FAQ", href: "#faq" },
  ],

  highlights: [
    {
      code: "01",
      title: "24-Hour Engineering Crucible",
      description: "Continuous on-campus development sprint from kickoff to final demos. High-speed network, dedicated workstations, power, and overnight facilities.",
      metric: "24 HOURS",
    },
    {
      code: "02",
      title: "Dual Calibrated Tracks",
      description: "Tailored problem tracks: Novice Track for 1st & 2nd year undergraduates, and Expert Track featuring advanced research-grade systems engineering.",
      metric: "2 TRACKS",
    },
    {
      code: "03",
      title: "Two Checkpoint Evaluations",
      description: "Mandatory mid-sprint and prototype code freeze audits by industry engineers and faculty panels to ensure authentic Git progress.",
      metric: "2 AUDITS",
    },
    {
      code: "04",
      title: "Full Hospitality & Meals",
      description: "Nutritious meals, midnight refreshments, tea, and beverages provided for all verified offline attendees during the 24-hour sprint.",
      metric: "MEALS INCLUDED",
    },
    {
      code: "05",
      title: "National Verifiable Credentials",
      description: "Every active participant who clears offline verification and submits their project receives an official digital credential under VISION.",
      metric: "CERTIFIED",
    },
    {
      code: "06",
      title: "Autonomous Academic Heritage",
      description: "Walchand College of Engineering, Sangli has been pioneering engineering education since 1947 with an active ACM chapter since 2016.",
      metric: "EST. 1947",
    },
  ],

  domains: [
    {
      id: "novice-iot",
      track: "novice",
      title: "Smart Campus & Connected IoT",
      tagline: "Bridging hardware and automation for institutional environments",
      description: "Hardware or IoT solutions for campus operations: energy control, smart attendance, safety systems.",
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
      title: "Digital FinTech & Financial Literacy",
      tagline: "Empowering secure, accessible monetary tools",
      description: "Digital solutions for financial tasks, expense tracking, security, financial education.",
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
      title: "Interactive EdTech & Simulation",
      tagline: "Re-imagining pedagogy through interactive software",
      description: "Interactive learning simulations, gamified pathways for math and science.",
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
      title: "Health, Wellness & Assistive Tech",
      tagline: "Engineering compassionate digital wellbeing",
      description: "Health applications, habit trackers, accessibility systems, medication adherence platforms.",
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
      tagline: "Leveraging code to solve grassroots community challenges",
      description: "Civic collaboration platforms, volunteer networks, public welfare tracking.",
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
      tagline: "Optimizing energy, water, and circular material streams",
      description: "Utility management, solar telemetry, carbon tracking, waste segregation.",
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
      title: "GraphMind: User-Centric Long-Term Memory",
      tagline: "Hybrid Graph + Vector memory isolation for autonomous agents",
      description: "AI assistant with long-term memory, graph queries, provenance citations.",
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
      title: "Minimal Dataset Versioning System (Text Data)",
      tagline: "Immutable, content-addressable filesystem ML version control",
      description: "Immutable, content-addressable dataset versioning CLI with SHA-256 Merkle trees.",
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
      title: "Grounded RAG with Verified Citations",
      tagline: "Hallucination-free document QA with exact section & page provenance",
      description: "Production RAG pipeline with grounded answers, section-path metadata, page coordinates.",
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
      phase: "PHASE 1 // REGISTRATION",
      title: "Problem Reveal & Online Abstract Submission",
      timeframe: "Announcement Period",
      description: "Teams register, select track, submit proposal. Round 1 is free.",
      highlights: [
        "Select track: Novice (1st & 2nd Year) or Expert (3rd & 4th Year)",
        "Teams of 2 to 4 members across eligible colleges",
        "Submit preliminary system diagram, tech stack, and approach",
        "Evaluation by faculty and ACM technical committee",
      ],
    },
    {
      step: "02",
      phase: "PHASE 2 // SHORTLISTING",
      title: "Round 1 Results & Campus Finalist Invitations",
      timeframe: "Post-Evaluation Phase",
      description: "Acceptance notifications dispatched. Finalists confirm on-campus attendance.",
      highlights: [
        "Top percentile teams selected across each domain and track",
        "Confirmation fee of ₹400 per team for offline logistical readiness",
        "Briefcase and technical briefing package distributed",
        "Campus arrival guidance and mentor assignment",
      ],
    },
    {
      step: "03",
      phase: "PHASE 3 // THE CRUCIBLE",
      title: "24-Hour Offline Hackathon Kickoff",
      timeframe: "Day 1 — 10:00 AM",
      description: "Opening keynote at WCE Sangli. 24-hour sprint begins with network, food, facilities.",
      highlights: [
        "Badge pickup, verification, and hardware bench allocation",
        "Keynote address by WCE Director and ACM Chapter Leads",
        "Hacking timer initiated: 24 continuous hours",
        "Continuous meals, refreshments, and workspace access",
      ],
    },
    {
      step: "04",
      phase: "PHASE 4 // EVALUATION",
      title: "Mentor Checkpoints & Code Audits",
      timeframe: "Day 1 — 06:00 PM & 02:00 AM",
      description: "Two checkpoint evaluations by industry engineers and faculty panels.",
      highlights: [
        "Checkpoint 1: Architecture review and feasibility sanity check",
        "Checkpoint 2: Mid-sprint code inspection and prototype validation",
        "Direct technical feedback to optimize system throughput",
        "Anti-plagiarism and original commit history verification",
      ],
    },
    {
      step: "05",
      phase: "PHASE 5 // CONQUEST",
      title: "Final Grand Jury Demos & Winners Ceremony",
      timeframe: "Day 2 — 12:00 PM",
      description: "Teams present live demos before the jury. Trophies, cash bounties, internships awarded.",
      highlights: [
        "5-minute live working software demo + 3-minute jury Q&A",
        "Evaluation against originality, technical depth, and execution",
        "Awarding of trophies, cash bounties, and internship allocations",
        "Official participation certificates for all active contributors",
      ],
    },
  ],

  prizes: [
    {
      id: "podium",
      title: "Track Champions & Podium Rewards",
      category: "EXPERT & NOVICE TRACKS",
      description: "Trophies, certificates, and cash rewards for top solutions across both tracks.",
      perks: [
        "Official 2027 Champion Trophy & Citation of Excellence",
        "Cash bounties awarded to 1st, 2nd, and 3rd place podium finishers",
        "Direct interview fast-tracks with industry sponsors",
        "National recognition through ACM India and WCE archives",
      ],
      highlight: true,
    },
    {
      id: "internships",
      title: "Industry Internship Opportunities",
      category: "CAREER ACCELERATION",
      description: "Internship offers from leading tech partner organizations.",
      perks: [
        "Interview opportunities with sponsoring engineering firms",
        "Direct mentorship from senior technical leads",
        "Letters of recommendation and career advancement endorsements",
      ],
    },
    {
      id: "uiux",
      title: "Best UI/UX Experience Award",
      category: "NOVICE TRACK SPECIALTY",
      description: "Recognition for the most intuitive, visually stunning, accessible frontend design.",
      perks: [
        "Special Design Trophy & Goodies package",
        "Evaluated on aesthetic consistency, design system, and responsive ergonomics",
        "Design portfolio spotlight across official WCE ACM publications",
      ],
    },
    {
      id: "social",
      title: "Best Social Media Presence Award",
      category: "CROSS-TRACK RECOGNITION",
      description: "Recognition for best documentation and community engagement across social media.",
      perks: [
        "Exclusive Commendation & Hackathon Merch kit",
        "Awarded for creative documentation tagging @wce_acm",
        "Audience reach and genuine community engagement evaluation",
      ],
    },
    {
      id: "certificates",
      title: "Verified National Certificates",
      category: "ALL ELIGIBLE PARTICIPANTS",
      description: "Digitally verifiable certificate from WCE ACM and WCE Sangli for all active participants.",
      perks: [
        "Digitally verifiable credential issued under VISION Symposium",
        "Formal institutional endorsement of 24-hour technical participation",
        "Valuable credential for academic records and technical resumes",
      ],
    },
  ],

  sponsorshipTiers: [
    {
      tier: "Title & Platinum Partner",
      badge: "KEYNOTE & RECRUITMENT",
      status: "Opportunities Open for 2027",
      perks: [
        "Exclusive brand integration in all national press releases and opening keynotes",
        "Direct problem statement ownership and custom challenge track creation",
        "Dedicated recruitment booth and prioritized access to participant resumes",
        "Prime logo placement across live stages, merchandise, and digital portals",
      ],
    },
    {
      tier: "Gold Engineering Partner",
      badge: "MENTORSHIP & TECH",
      status: "Opportunities Open for 2027",
      perks: [
        "Mentorship seat in mid-sprint checkpoints and evaluation committees",
        "Tech product API / SDK showcase to 500+ top engineering participants",
        "Prominent placement on hackathon website and institutional banners",
        "Resume pool access for pre-final and final year developers",
      ],
    },
    {
      tier: "Silver & Community Supporter",
      badge: "ECOSYSTEM & TOOLS",
      status: "Opportunities Open for 2027",
      perks: [
        "Developer tooling credits, API keys, and cloud voucher distribution",
        "Logo branding on website and official participation certificates",
        "Special mention in symposium closing ceremonies and ACM publications",
      ],
    },
  ],

  pastPartners: [
    {
      name: "Zenteiq",
      role: "Previous Edition Sponsor",
      logo: "/assets/zenteiq_logo-D6AvpBZd.png",
      note: "Proud past supporter of WCE Hackathon engineering innovation",
    },
    {
      name: "Unstop",
      role: "Platform & Registration Partner",
      logo: "",
      note: "Official student engagement and evaluation platform partner",
    },
  ],

  journey: [
    {
      step: "01",
      title: "Domain Discovery",
      subtitle: "EXPLORE // DECONSTRUCT // IDENTIFY",
      description: "Immerse your team in the released challenges. Deconstruct friction points in real-world systems, whether building foundational apps in Novice domains or research-grade systems in the Expert track.",
      keyOutputs: [
        "Select track (Novice vs Expert)",
        "Pinpoint target challenge & user persona",
        "Draft core value proposition and feasibility boundaries",
      ],
    },
    {
      step: "02",
      title: "System Architecture",
      subtitle: "BLUEPRINT // SCHEMATICS // SPECIFICATION",
      description: "Translate conceptual ideas into concrete engineering specifications. Map out database schemas, data flow pipelines, API contracts, or hardware circuits before writing a single line of production code.",
      keyOutputs: [
        "Create high-level architecture diagrams",
        "Finalize tech stack and component boundaries",
        "Submit Round 1 proposal document for faculty evaluation",
      ],
    },
    {
      step: "03",
      title: "The 24-Hour Crucible",
      subtitle: "BUILD // CODE // ITERATE",
      description: "Upon clearing Round 1 shortlisting, enter the 24-hour sprint at Walchand College of Engineering campus. Build rapidly, test edge cases, and push Git commits in a high-energy collaborative environment.",
      keyOutputs: [
        "24 continuous hours of hands-on hacking",
        "Functional frontend interface + robust backend/hardware",
        "Regular checkpoint code reviews with roaming mentors",
      ],
    },
    {
      step: "04",
      title: "Mentor Checkpoints",
      subtitle: "FEEDBACK // HARDENING // REFINEMENT",
      description: "Engage with industry veterans and faculty evaluators during scheduled checkpoint reviews. Receive critical feedback on code structure, algorithmic efficiency, and live deployment resilience.",
      keyOutputs: [
        "Checkpoint 1: Concept & architecture sanity check",
        "Checkpoint 2: Mid-hack progress and code audit",
        "Strategic pivot and performance optimization",
      ],
    },
    {
      step: "05",
      title: "Live Demonstration",
      subtitle: "PITCH // DEFEND // CONQUER",
      description: "Take the main stage before the grand symposium jury. Deliver an uncompromising live demonstration of your working software or hardware prototype, defend technical choices, and celebrate achievement.",
      keyOutputs: [
        "5-minute live working demonstration",
        "Technical defense during jury questioning",
        "Recognition, awards, and networking at the closing gala",
      ],
    },
  ],

  faqs: [
    {
      category: "general",
      question: "What is WCE Hackathon 2027?",
      answer: "24-hour national-level hackathon by WCE ACM Student Chapter under VISION symposium at WCE Sangli."
    },
    {
      category: "tracks",
      question: "What are the two competition tracks?",
      answer: "Two tracks: Novice (1st–2nd year, IoT/FinTech/EdTech/Healthcare/Sustainability) and Expert (research-grade systems engineering)."
    },
    {
      category: "tracks",
      question: "Who is eligible for each track?",
      answer: "All undergraduate engineering students. Novice for 1st–2nd year; Expert for 3rd year+ or experienced hackers."
    },
    {
      category: "rules",
      question: "What is the allowed team size?",
      answer: "2–4 members per team. Inter-disciplinary and cross-college teams welcome."
    },
    {
      category: "rules",
      question: "Is there any registration or participation fee?",
      answer: "Round 1 is free. Shortlisted teams pay ₹400 per team for offline kits and logistics."
    },
    {
      category: "logistics",
      question: "What should participants bring to the offline venue?",
      answer: "Laptop, chargers, college ID, and any hardware components needed. Network and workspace provided."
    },
    {
      category: "logistics",
      question: "Will meals and refreshments be provided during the 24-hour sprint?",
      answer: "Yes. Meals, midnight refreshments, and hot beverages for all verified participants."
    },
    {
      category: "general",
      question: "I have never attended a hackathon before. Can I participate?",
      answer: "Yes. The Novice Track is designed for beginners with mentors and structured checkpoints."
    },
    {
      category: "rules",
      question: "Can we use pre-existing code?",
      answer: "Core logic must be written during the hackathon. Open-source libraries and APIs allowed. Git histories audited."
    },
  ],
};
