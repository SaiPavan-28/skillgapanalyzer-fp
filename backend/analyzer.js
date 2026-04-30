const skillsDb = require("./skillsDb");
const resourcesDb = require("./resourcesDb");


/**
 * Normalize text: lowercase, remove special chars
 */
function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s.#+]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Extract skills from text using keyword matching
 */
function extractSkills(text) {
  const normalized = normalizeText(text);
  const found = new Set();

  for (const skill of skillsDb) {
    // Use word boundary matching (handle multi-word skills too)
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");
    if (regex.test(normalized)) {
      found.add(skill);
    }
  }
  return Array.from(found);
}

/**
 * Compute match score & categorize skills
 */
function analyzeSkills(resumeSkills, jdSkills) {
  const resumeSet = new Set(resumeSkills);
  const matched = jdSkills.filter((s) => resumeSet.has(s));
  const missing = jdSkills.filter((s) => !resumeSet.has(s));
  const score = jdSkills.length > 0 ? Math.round((matched.length / jdSkills.length) * 100) : 0;
  return { matched, missing, score };
}

/**
 * Generate human-readable feedback based on gaps
 */
function generateFeedback(matched, missing, score) {
  const feedback = [];

  if (score >= 80) {
    feedback.push("🎉 Excellent match! Your skills closely align with this job description.");
  } else if (score >= 60) {
    feedback.push("✅ Good match! You meet most requirements but have a few gaps to address.");
  } else if (score >= 40) {
    feedback.push("⚠️ Moderate match. Significant skill gaps detected — targeted upskilling recommended.");
  } else {
    feedback.push("🔴 Low match. This role requires substantial new skills. Consider a structured learning plan.");
  }

  // Group missing skills into categories
  const groups = {
    "backend": ["node", "nodejs", "express", "django", "flask", "fastapi", "spring", "rest", "graphql", "microservices"],
    "frontend": ["react", "angular", "vue", "html", "css", "tailwind", "nextjs", "javascript", "typescript"],
    "cloud": ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci/cd"],
    "database": ["sql", "mysql", "postgresql", "mongodb", "redis", "dynamodb", "firebase"],
    "data science & ML": ["machine learning", "deep learning", "tensorflow", "pytorch", "pandas", "numpy", "data analysis"],
    "mobile": ["android", "ios", "react native", "flutter", "swift", "kotlin"],
    "devops": ["jenkins", "github actions", "ansible", "helm", "prometheus"],
    "security": ["cybersecurity", "oauth", "jwt", "encryption"],
  };

  const missingSet = new Set(missing);
  const identified = new Set();

  for (const [category, skills] of Object.entries(groups)) {
    const gapInCategory = skills.filter((s) => missingSet.has(s));
    if (gapInCategory.length >= 1) {
      identified.add(category);
      feedback.push(`📌 You lack ${category} experience — specifically: ${gapInCategory.join(", ")}.`);
    }
  }

  // Unclassified missing skills
  const unclassified = missing.filter(
    (s) => !Object.values(groups).flat().includes(s)
  );
  if (unclassified.length > 0) {
    feedback.push(`📌 Additional skills required: ${unclassified.join(", ")}.`);
  }

  if (matched.length > 0) {
    feedback.push(`✔️ Your strengths include: ${matched.slice(0, 5).join(", ")}${matched.length > 5 ? " and more" : ""}.`);
  }

  return feedback;
}

/**
 * Generate personalized week-by-week learning roadmap
 */
function generateRoadmap(missing) {
  if (missing.length === 0) {
    return [
      {
        week: "Week 1–2",
        title: "Portfolio Polish",
        description: "You already have the core skills! Focus on building 2–3 portfolio projects that highlight your expertise.",
        icon: "🚀",
      },
      {
        week: "Week 3–4",
        title: "Interview Preparation",
        description: "Practice system design questions, brush up on DSA, and do mock interviews.",
        icon: "🎯",
      },
    ];
  }

  const roadmap = [];
  const chunks = chunkArray(missing, 3); // ~3 skills per week
  
  const weekPlans = {
    "python": { title: "Python Fundamentals", desc: "Learn Python syntax, data structures, and OOP. Build a small CLI project.", res: "Python.org, Automate the Boring Stuff" },
    "javascript": { title: "JavaScript Essentials", desc: "Master ES6+, async/await, and DOM manipulation.", res: "javascript.info" },
    "typescript": { title: "TypeScript Mastery", desc: "Add static typing to JS. Complete the TypeScript handbook.", res: "typescriptlang.org" },
    "react": { title: "React Development", desc: "Build component-based UIs, learn hooks, and state management.", res: "react.dev" },
    "node": { title: "Node.js Backend", desc: "Build REST APIs with Node and Express.", res: "nodejs.org" },
    "nodejs": { title: "Node.js Backend", desc: "Build REST APIs with Node and Express.", res: "nodejs.org" },
    "aws": { title: "AWS Cloud Basics", desc: "Learn EC2, S3, Lambda, and RDS. Get AWS Cloud Practitioner certified.", res: "aws.amazon.com/training" },
    "docker": { title: "Docker & Containers", desc: "Containerize apps and learn Docker Compose.", res: "docs.docker.com" },
    "kubernetes": { title: "Kubernetes Orchestration", desc: "Deploy containers at scale.", res: "kubernetes.io" },
    "sql": { title: "SQL & Databases", desc: "Master SQL queries, joins, and indexing.", res: "sqlzoo.net" },
    "mongodb": { title: "MongoDB NoSQL", desc: "Work with document databases and Mongoose.", res: "university.mongodb.com" },
    "machine learning": { title: "Machine Learning Foundations", desc: "Learn regression, classification, and scikit-learn.", res: "fast.ai, Coursera ML Specialization" },
    "tensorflow": { title: "Deep Learning with TensorFlow", desc: "Build and train neural networks.", res: "tensorflow.org/learn" },
  };

  chunks.forEach((chunk, i) => {
    const weekNum = i + 1;
    const skillNames = chunk.join(", ");
    const knownPlan = chunk.map((s) => weekPlans[s]).find(Boolean);

    roadmap.push({
      week: `Week ${weekNum}`,
      title: knownPlan ? knownPlan.title : `Learn ${skillNames}`,
      description: knownPlan
        ? knownPlan.desc
        : `Study and practice: ${skillNames}. Build a small project to demonstrate your understanding.`,
      skills: chunk,
      resources: knownPlan ? knownPlan.res : "Udemy, Coursera, official documentation",
      icon: ["📚", "💻", "🔧", "☁️", "🧪", "🎯", "🚀"][i % 7],
    });
  });

  // Final week: projects
  roadmap.push({
    week: `Week ${chunks.length + 1}`,
    title: "Build Portfolio Projects",
    description: `Apply all learned skills: ${missing.slice(0, 4).join(", ")}. Create 1–2 showcaseable projects for your resume.`,
    skills: [],
    resources: "GitHub, personal portfolio site",
    icon: "🏆",
  });

  roadmap.push({
    week: `Week ${chunks.length + 2}`,
    title: "Interview Preparation",
    description: "Practice coding challenges, mock interviews, and update your resume with your new skills.",
    skills: [],
    resources: "LeetCode, Pramp, Interviewing.io",
    icon: "🎤",
  });

  return roadmap;
}

/**
 * Analyze resume quality based on the extracted text
 */
function analyzeResumeQuality(resumeText) {
  const issues = [];
  const text = resumeText.toLowerCase();

  const sections = {
    "Skills section": ["skills", "technical skills", "core competencies", "key skills"],
    "Projects section": ["projects", "personal projects", "academic projects", "portfolio"],
    "Experience section": ["experience", "work experience", "employment", "internship"],
    "Education section": ["education", "degree", "university", "college", "bachelor", "master"],
    "Summary/Objective section": ["summary", "objective", "about me", "profile", "overview"],
    "Contact information": ["email", "phone", "linkedin", "github", "@"],
  };

  for (const [section, keywords] of Object.entries(sections)) {
    const found = keywords.some((kw) => text.includes(kw));
    if (!found) {
      issues.push({
        type: "missing",
        message: `${section} appears to be missing or not clearly labeled.`,
        severity: section.includes("Contact") || section.includes("Experience") ? "high" : "medium",
      });
    }
  }

  if (resumeText.length < 300) {
    issues.push({ type: "quality", message: "Resume appears too short. Add more detail to each section.", severity: "high" });
  }

  if (resumeText.length > 5000) {
    issues.push({ type: "quality", message: "Resume may be too long. Try to keep it to 1–2 pages.", severity: "low" });
  }

  const hasQuantifiableResults = /(\d+%|\$\d+|\d+ (users|clients|projects|teams))/i.test(resumeText);
  if (!hasQuantifiableResults) {
    issues.push({
      type: "quality",
      message: "No quantifiable achievements found. Add metrics (e.g., 'Increased performance by 30%').",
      severity: "medium",
    });
  }

  const hasActionVerbs = /(developed|built|designed|implemented|led|managed|created|improved|optimized|deployed)/i.test(resumeText);
  if (!hasActionVerbs) {
    issues.push({
      type: "quality",
      message: "Use strong action verbs (Developed, Built, Led, Optimized) to describe your experience.",
      severity: "medium",
    });
  }

  if (issues.length === 0) {
    issues.push({ type: "quality", message: "✅ Resume structure looks solid!", severity: "good" });
  }

  return issues;
}

/**
 * Helper: split array into chunks
 */
function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * Generate suitable job recommendations based on resume skills
 */
function generateJobRecommendations(resumeSkills) {
  const resumeSet = new Set(resumeSkills.map((s) => s.toLowerCase()));

  const jobDatabase = [
    {
      title: "Full Stack Developer",
      experienceLevel: "Mid-Senior",
      salaryRange: "$90K – $140K",
      description: "Build and maintain complete web applications, from database design to responsive UIs.",
      requiredSkills: ["react", "node", "nodejs", "sql", "mongodb", "rest", "docker", "git"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Full+Stack+Developer",
    },
    {
      title: "Frontend Developer",
      experienceLevel: "Junior-Mid",
      salaryRange: "$70K – $120K",
      description: "Craft pixel-perfect, high-performance user interfaces using modern frameworks.",
      requiredSkills: ["react", "javascript", "typescript", "html", "css", "tailwind", "nextjs"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Frontend+Developer",
    },
    {
      title: "Backend Developer",
      experienceLevel: "Mid-Senior",
      salaryRange: "$85K – $135K",
      description: "Design scalable APIs, microservices, and data pipelines for production systems.",
      requiredSkills: ["node", "nodejs", "python", "rest", "graphql", "sql", "mongodb", "docker", "redis"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Backend+Developer",
    },
    {
      title: "Data Scientist",
      experienceLevel: "Mid-Senior",
      salaryRange: "$95K – $150K",
      description: "Extract insights from large datasets using ML models and statistical analysis.",
      requiredSkills: ["python", "machine learning", "deep learning", "tensorflow", "pytorch", "pandas", "numpy", "sql", "data analysis"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data+Scientist",
    },
    {
      title: "Machine Learning Engineer",
      experienceLevel: "Senior",
      salaryRange: "$110K – $170K",
      description: "Deploy and optimize ML models at scale in production environments.",
      requiredSkills: ["machine learning", "deep learning", "tensorflow", "pytorch", "python", "docker", "kubernetes", "aws"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Machine+Learning+Engineer",
    },
    {
      title: "DevOps Engineer",
      experienceLevel: "Mid-Senior",
      salaryRange: "$95K – $145K",
      description: "Automate infrastructure, manage CI/CD pipelines, and ensure system reliability.",
      requiredSkills: ["docker", "kubernetes", "aws", "azure", "gcp", "jenkins", "terraform", "linux", "python"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=DevOps+Engineer",
    },
    {
      title: "Cloud Solutions Architect",
      experienceLevel: "Senior",
      salaryRange: "$120K – $180K",
      description: "Design and implement cloud-native architectures for enterprise-scale systems.",
      requiredSkills: ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "microservices", "security"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Cloud+Architect",
    },
    {
      title: "Data Analyst",
      experienceLevel: "Junior-Mid",
      salaryRange: "$60K – $100K",
      description: "Analyze business data, create dashboards, and deliver actionable insights.",
      requiredSkills: ["sql", "python", "pandas", "data analysis", "excel", "tableau", "power bi"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Data+Analyst",
    },
    {
      title: "React Developer",
      experienceLevel: "Junior-Mid",
      salaryRange: "$75K – $120K",
      description: "Build dynamic single-page applications with React and modern state management.",
      requiredSkills: ["react", "javascript", "typescript", "html", "css", "rest", "git"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=React+Developer",
    },
    {
      title: "Mobile App Developer",
      experienceLevel: "Mid",
      salaryRange: "$80K – $130K",
      description: "Develop cross-platform or native mobile applications for iOS and Android.",
      requiredSkills: ["react native", "flutter", "android", "ios", "swift", "kotlin", "javascript"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Mobile+App+Developer",
    },
    {
      title: "Cybersecurity Analyst",
      experienceLevel: "Mid-Senior",
      salaryRange: "$85K – $140K",
      description: "Protect systems and data from cyber threats through monitoring and incident response.",
      requiredSkills: ["cybersecurity", "linux", "python", "networking", "encryption", "oauth", "jwt"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Cybersecurity+Analyst",
    },
    {
      title: "Site Reliability Engineer",
      experienceLevel: "Senior",
      salaryRange: "$110K – $160K",
      description: "Maintain system reliability, performance, and availability at scale.",
      requiredSkills: ["kubernetes", "docker", "aws", "linux", "python", "prometheus", "terraform", "ci/cd"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Site+Reliability+Engineer",
    },
    {
      title: "Python Developer",
      experienceLevel: "Junior-Mid",
      salaryRange: "$75K – $125K",
      description: "Build automation scripts, APIs, and data processing pipelines with Python.",
      requiredSkills: ["python", "django", "flask", "fastapi", "rest", "sql", "docker"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Python+Developer",
    },
    {
      title: "QA / Test Engineer",
      experienceLevel: "Junior-Mid",
      salaryRange: "$60K – $100K",
      description: "Ensure software quality through automated and manual testing across the stack.",
      requiredSkills: ["python", "javascript", "selenium", "jest", "git", "ci/cd", "rest"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=QA+Engineer",
    },
    {
      title: "Database Administrator",
      experienceLevel: "Mid-Senior",
      salaryRange: "$80K – $130K",
      description: "Manage, optimize, and secure relational and non-relational database systems.",
      requiredSkills: ["sql", "mysql", "postgresql", "mongodb", "redis", "dynamodb", "python"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Database+Administrator",
    },
    {
      title: "UI/UX Engineer",
      experienceLevel: "Mid",
      salaryRange: "$75K – $120K",
      description: "Bridge the gap between design and engineering to create delightful user experiences.",
      requiredSkills: ["react", "javascript", "css", "html", "tailwind", "figma", "typescript"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=UI+UX+Engineer",
    },
    {
      title: "API Developer",
      experienceLevel: "Mid",
      salaryRange: "$80K – $125K",
      description: "Design, build, and document RESTful and GraphQL APIs for web and mobile clients.",
      requiredSkills: ["rest", "graphql", "node", "python", "sql", "mongodb", "docker", "jwt"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=API+Developer",
    },
    {
      title: "AI/LLM Engineer",
      experienceLevel: "Senior",
      salaryRange: "$120K – $200K",
      description: "Build and fine-tune large language models and AI-powered product features.",
      requiredSkills: ["python", "machine learning", "deep learning", "tensorflow", "pytorch", "aws", "docker"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=AI+Engineer",
    },
    {
      title: "Android Developer",
      experienceLevel: "Mid",
      salaryRange: "$80K – $130K",
      description: "Build native Android applications using Kotlin or Java for millions of users.",
      requiredSkills: ["android", "kotlin", "java", "rest", "sql", "git"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Android+Developer",
    },
    {
      title: "Technical Product Manager",
      experienceLevel: "Senior",
      salaryRange: "$110K – $170K",
      description: "Drive product strategy and work with engineering teams to ship impactful features.",
      requiredSkills: ["sql", "rest", "agile", "python", "javascript", "git"],
      applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Technical+Product+Manager",
    },
  ];

  // Score each job
  const scored = jobDatabase.map((job) => {
    const matched = job.requiredSkills.filter((s) => resumeSet.has(s.toLowerCase()));
    const matchScore = Math.round((matched.length / job.requiredSkills.length) * 100);
    return {
      ...job,
      matchScore,
      yourMatchedSkills: matched,
      missingSkills: job.requiredSkills.filter((s) => !resumeSet.has(s.toLowerCase())),
    };
  });

  // Return top 6 by match score (minimum 1 matching skill)
  return scored
    .filter((j) => j.yourMatchedSkills.length > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

/**
 * Generate learning resources for missing skills
 */
function generateResources(missing) {
  const resources = [];
  
  missing.forEach(skill => {
    const normalizedSkill = skill.toLowerCase();
    if (resourcesDb[normalizedSkill]) {
      resources.push({
        skill: skill,
        items: resourcesDb[normalizedSkill]
      });
    } else {
      // Generic fallback resources
      resources.push({
        skill: skill,
        items: [
          { type: "website", title: `${skill} Documentation`, url: `https://www.google.com/search?q=${encodeURIComponent(skill + " documentation")}` },
          { type: "youtube", title: `${skill} Tutorial`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " tutorial")}` }
        ]
      });
    }
  });

  return resources;
}

module.exports = { extractSkills, analyzeSkills, generateFeedback, generateRoadmap, analyzeResumeQuality, generateJobRecommendations, generateResources };

