/**
 * ============================================================
 *  Md. Masum Rana – Portfolio CONFIG
 *  ----------------------------------------------------------
 *  এই ফাইলটাই তোমার পুরো পোর্টফোলিওর “কন্ট্রোল সেন্টার”।
 *  যেকোনো টেক্সট, লিংক, স্কিল, প্রজেক্ট, ব্লগ, অ্যাক্টিভিটি
 *  এখান থেকেই চেঞ্জ করতে পারবে।
 *
 *  ছবি বদলাতে:
 *  1. images/ ফোল্ডারে নতুন ছবি রাখো
 *  2. নিচের path আপডেট করো
 * ============================================================
 */

const PORTFOLIO_CONFIG = {

  // ========== BASIC INFO ==========
  personal: {
    fullName: "Md. Masum Rana",
    shortName: "MASUM RANA",
    title: "Software Implementor | ERP & AI Engineer",
    tagline: "Delivering end-to-end ERP implementations, stakeholder-driven system analysis, AI-powered solutions, and multifunctional software testing.",
    location: "Dhaka, Bangladesh",
    email: "masumrana449@gmail.com",
    phone: "+880 1831-981996",
    whatsapp: "8801831981996",
    linkedin: "https://www.linkedin.com/in/masum-rana-b96506203",
    github: "https://github.com/masumrana01",
    address: "House-13, Road-1, Block-G, Mirpur-2, Dhaka",
    status: "Available for opportunities",
    currentRole: "Software Implementor at Nineteen Alpha",
    // Images (relative path from index.html)
    avatar: "images/profile-formal.png",       // Hero portrait
    aboutImage: "images/profile-full.png",     // About section
  },

  // ========== ABOUT ==========
  about: {
    heading: "Bridging Software Engineering & Real-World Operations",
    paragraphs: [
      "I am a results-driven Computer Science & Engineering graduate from the University of Information Technology & Sciences (UITS), with strong academic credentials including Golden GPA 5.00 in both HSC (Adamjee Cantonment College) and SSC.",
      "Currently serving as a Software Implementor at Nineteen Alpha, I specialize in end-to-end ERP implementation — from stakeholder requirement analysis and data migration to user training, on-site support, and technical documentation. I also led the thesis project on AI-based financial fraud prevention and have hands-on experience in end-to-end multifunctional software testing."
    ],
    stats: [
      { value: "Golden 5.0", label: "HSC & SSC Result" },
      { value: "ERP Expert", label: "Nineteen Alpha" },
      { value: "AI + Testing", label: "Fraud Detection & QA" }
    ]
  },

  // ========== EXPERIENCE ==========
  experience: [
    {
      role: "Software Implementor",
      company: "Nineteen Alpha",
      location: "Dhaka",
      period: "July 2026 – Present",
      current: true,
      description: "Responsible for end-to-end Enterprise Resource Planning (ERP) software implementation with a focus on the CSD Bangladesh ERP Software project. Involved in stakeholder coordination, business requirement analysis, data preparation, user adoption, and technical documentation.",
      highlights: [
        "Stakeholder meetings & requirement clarification",
        "Business workflow alignment with ERP modules",
        "User training on critical ERP modules",
        "On-site implementation support & issue resolution",
        "Data migration & data cleansing",
        "Implementation documentation & continuity",
        "End-to-end multifunctional software testing",
        "System analysis & technical problem resolution"
      ]
    }
  ],

  // ========== SKILLS ==========
  skills: [
    {
      title: "ERP & Implementation",
      icon: "fa-gears",
      color: "accent",
      items: ["ERP Implementation", "Requirement Analysis", "Stakeholder Coordination", "User Training", "On-site Support", "Data Migration", "Data Cleansing", "Documentation", "Software Testing"]
    },
    {
      title: "Languages & Web",
      icon: "fa-code",
      color: "blue",
      items: ["Python", "PHP", "JavaScript", "HTML5 / CSS3", "MySQL", "SQLite"]
    },
    {
      title: "AI & Data Science",
      icon: "fa-brain",
      color: "emerald",
      items: ["XGBoost", "SHAP Explainability", "Scikit-Learn", "Pandas & NumPy", "Graph Feature Eng.", "Concept Drift"]
    },
    {
      title: "Tools & Professional",
      icon: "fa-screwdriver-wrench",
      color: "cyan",
      items: ["Git & GitHub", "VS Code", "Google Colab", "MS Office Suite", "Team Leadership", "Communication", "System Analysis"]
    }
  ],

  // ========== PROJECTS ==========
  projects: [
    {
      id: "p1",
      category: "ai",
      title: "AI Financial Fraud Detection",
      badge: "AI / Machine Learning",
      badgeColor: "emerald",
      icon: "fa-shield-halved",
      shortDesc: "Academic thesis project (Team Leader) on intelligent financial transaction monitoring and fraud prevention. Demonstrated at the 3rd SISE organized by IEEE UITS.",
      note: "Received certification for project demonstration",
      tech: ["Python", "XGBoost", "SHAP", "Graph Features"],
      details: [
        "Led the project team developing an AI-based approach to financial transaction monitoring and fraud prevention.",
        "Built predictive XGBoost models specialized for imbalanced financial fraud datasets.",
        "Implemented graph-based feature extraction to model relational transaction paths.",
        "Integrated SHAP (Explainable AI) to provide transparent risk metrics for regulatory compliance.",
        "Configured concept drift monitoring to track shifts in fraud behavior over time.",
        "Successfully demonstrated the project as Team Leader at the 3rd SISE organized by IEEE UITS and received certification."
      ]
    },
    {
      id: "p2",
      category: "web",
      title: "Inventory Management System",
      badge: "Web Application",
      badgeColor: "blue",
      icon: "fa-boxes-stacked",
      shortDesc: "Full-stack web application for product & stock tracking, real-time sales logging, supplier management, and structured relational database design.",
      tech: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3"],
      details: [
        "Full-stack web application designed for enterprise product and inventory management.",
        "Implemented stock tracking, sales order logging, and supplier management interfaces.",
        "Optimized MySQL relational database structure for fast queries and historical reporting.",
        "Focused on clean data organization and practical business workflow support."
      ]
    },
    {
      id: "p3",
      category: "web",
      title: "Hospital Management System",
      badge: "Web Application",
      badgeColor: "blue",
      icon: "fa-hospital",
      shortDesc: "Centralized healthcare workflow application covering patient records, doctor appointment scheduling, prescription histories, and billing processes.",
      tech: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3"],
      details: [
        "Centralized hospital software automating patient registrations and doctor scheduling.",
        "Integrated appointment tracking and structured billing generation modules.",
        "Engineered relational database design with attention to patient data integrity and security.",
        "Covered core healthcare workflows including prescription histories."
      ]
    }
  ],

  // ========== EDUCATION ==========
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institute: "University of Information Technology & Sciences (UITS)",
      year: "Graduation Completed: 16 August 2026",
      detail: "Computer Science & Eng.",
      accent: "accent",
      icon: "fa-graduation-cap"
    },
    {
      degree: "HSC (Higher Secondary)",
      institute: "Adamjee Cantonment College, Dhaka",
      year: "Passing Year: 2021",
      detail: "GPA: 5.00 / 5.00 (Golden)",
      accent: "emerald",
      icon: "fa-award"
    },
    {
      degree: "SSC (Secondary School)",
      institute: "Betil ML School & College, Sirajgonj",
      year: "Passing Year: 2019",
      detail: "GPA: 5.00 / 5.00 (Golden)",
      accent: "blue",
      icon: "fa-medal"
    }
  ],

  // ========== BLOGS (Editable from Admin) ==========
  // You can add more posts here or use the Admin panel on the website
  blogs: [
    {
      id: "b1",
      title: "My Journey into ERP Implementation",
      date: "2026-09-15",
      excerpt: "Starting as a Software Implementor at Nineteen Alpha taught me how real business workflows meet technology. Here's what I learned in the first months...",
      content: "Working on the CSD Bangladesh ERP project opened my eyes to the complexity of real-world system implementation. From stakeholder meetings to data migration and user training — every step requires patience, clear communication, and attention to detail.\n\nOne of the biggest lessons was understanding that technology is only as good as the people who use it. Proper training and on-site support make the difference between a successful rollout and a failed one.",
      image: "", // optional: put image path or leave empty
      tags: ["ERP", "Career", "Learning"]
    },
    {
      id: "b2",
      title: "Building Explainable AI for Fraud Detection",
      date: "2026-08-20",
      excerpt: "How we used XGBoost + SHAP to create transparent fraud detection models that regulators can actually trust.",
      content: "Black-box models are no longer acceptable in financial services. During our thesis we focused heavily on explainability using SHAP values so that every high-risk prediction could be justified.\n\nCombining graph-based features with concept drift monitoring made the system more robust against evolving fraud patterns.",
      image: "",
      tags: ["AI", "Machine Learning", "XGBoost"]
    }
  ],

  // ========== EXTRA CURRICULAR / ACTIVITIES ==========
  activities: [
    {
      id: "a1",
      title: "Team Leader – Thesis Demonstration at 3rd SISE (IEEE UITS)",
      date: "2026",
      description: "Successfully led and demonstrated the AI-Based Financial Transaction Monitoring & Fraud Prevention project at the 3rd Student Innovation & Showcase Event organized by IEEE UITS. Received certification.",
      image: "", // add path later e.g. "images/sise-event.jpg"
      category: "Leadership"
    },
    {
      id: "a2",
      title: "Golden GPA Achievement",
      date: "2019 & 2021",
      description: "Achieved Golden GPA 5.00 in both SSC and HSC examinations — a reflection of consistent academic excellence.",
      image: "",
      category: "Academic"
    }
  ],

  // ========== THEME (Pleasant Color Grading) ==========
  theme: {
    // Soft pleasant dark theme
    background: "#0B1120",
    card: "#111827",
    surface: "#1F2937",
    accent: "#38BDF8",       // soft cyan
    accentHover: "#7DD3FC",
    emerald: "#34D399",
    blue: "#60A5FA",
    text: "#F1F5F9",
    muted: "#94A3B8",
    border: "rgba(148, 163, 184, 0.12)"
  }
};

// Make it available globally
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
