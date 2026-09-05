export interface TeamMember {
  id: string;
  idNumber: string;
  name: string;
  role: string;
  title: string;
  designation: string;
  image: string;
  bio: string;
  degree: string;
  category: "leadership" | "engineering" | "ai" | "research";
  email: string;
  status: string;
  officeHours: string;
  mentorshipTopics: string[];
  experienceYears: number;
  endorsementsCount: number;
  projectsCount: number;
  skills: string[];
  skillProficiency: { skill: string; level: number }[];
  keyMilestones: string[];
  featuredProjects: { title: string; description: string; tag: string }[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    facebook?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "vivek-kumar",
    idNumber: "EDW-ENG-001",
    name: "Vivek Kumar",
    role: "Full-Stack Developer",
    title: "CTO & Founder",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Vivekajee.jpg",
    bio: "Vivek Kumar, as Founder & Chief Technology Officer, sets and evolves the strategic direction for ED-World and its platform architecture. Holds Bachelor of Engineering in Computer Science and Engineering with specialization in full-stack web and cloud architectures.",
    degree: "Bachelor of Engineering - Computer Science and Engineering",
    category: "leadership",
    email: "vivek@edworld.com",
    status: "Available for Architecture Reviews",
    officeHours: "Tue & Thu • 4:00 PM - 6:00 PM IST",
    mentorshipTopics: ["Next.js App Router", "Full-Stack System Design", "Cloud Infrastructure", "Database Scaling"],
    experienceYears: 5,
    endorsementsCount: 248,
    projectsCount: 18,
    skills: ["Next.js", "React", "Node.js", "Laravel", "Python", "Cloud Architecture", "System Design"],
    skillProficiency: [
      { skill: "Next.js & React", level: 96 },
      { skill: "Cloud & System Design", level: 92 },
      { skill: "Node.js & Backend", level: 90 },
      { skill: "Python & Algorithms", level: 88 },
      { skill: "Laravel & PHP", level: 94 }
    ],
    keyMilestones: [
      "Architected ED-World Next.js & Serverless Microservices ecosystem",
      "Built interactive Code Practice IDE & Sorting Algorithm Visualizer",
      "Designed secure Role-Based Access Control and Exam Module engine",
      "Engineered automated high-concurrency Quiz & Evaluation system"
    ],
    featuredProjects: [
      {
        title: "Next.js Platform Migration",
        description: "Migrated legacy monolith to blazing-fast App Router with 98+ Lighthouse score.",
        tag: "Next.js 15"
      },
      {
        title: "In-Browser Web Practice Lab",
        description: "Real-time dual-mode code execution workspace with JS sandbox & Python compiler.",
        tag: "Developer Tools"
      },
      {
        title: "Real-time Sorting Visualizer",
        description: "Interactive visual simulator demonstrating 6 fundamental sorting algorithms.",
        tag: "Algorithms"
      }
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/vivekajee/",
      twitter: "https://twitter.com/Vnjvibhash",
      instagram: "https://www.instagram.com/Vivekajee/",
      facebook: "https://www.facebook.com/vivekajee",
    }
  },
  {
    id: "sagar-saini",
    idNumber: "EDW-AI-002",
    name: "Sagar Saini",
    role: "AI Developer",
    title: "CEO & Co-Founder",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Sagarsaini.jpeg",
    bio: "Sagar Saini leads Artificial Intelligence, machine learning models, and curriculum innovation at ED-World, ensuring cutting-edge AI concepts and tools are seamlessly accessible for engineering students.",
    degree: "Bachelor of Engineering - Computer Science (AI & ML)",
    category: "ai",
    email: "sagar@edworld.com",
    status: "Available for AI / ML Guidance",
    officeHours: "Wed & Sat • 3:00 PM - 5:00 PM IST",
    mentorshipTopics: ["Machine Learning Roadmaps", "NLP & LLM Applications", "Deep Learning Foundations", "AI Career Guidance"],
    experienceYears: 4,
    endorsementsCount: 194,
    projectsCount: 14,
    skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Algorithm Design", "TensorFlow"],
    skillProficiency: [
      { skill: "Machine Learning & NLP", level: 94 },
      { skill: "Python & Data Science", level: 95 },
      { skill: "Deep Learning Architectures", level: 89 },
      { skill: "Curriculum AI Automation", level: 91 },
      { skill: "Algorithm Optimization", level: 92 }
    ],
    keyMilestones: [
      "Integrated automated AI student learning assistant & doubt responder",
      "Designed dynamic question bank generator utilizing NLP models",
      "Spearheaded ED-World AI curriculum for Computer Science & IT streams",
      "Co-developed smart assignment evaluation & plagiarism insights engine"
    ],
    featuredProjects: [
      {
        title: "ED-World AI Assistant",
        description: "Interactive conversational engine helping engineering students resolve technical doubts 24/7.",
        tag: "GenAI & NLP"
      },
      {
        title: "Automated Quiz Bank Generator",
        description: "Machine learning pipeline that synthesizes topic-specific multiple-choice assessments.",
        tag: "ML Pipeline"
      },
      {
        title: "Smart Assignment Grader",
        description: "Assisted grading models analyzing student code logic and algorithmic complexity.",
        tag: "EdTech AI"
      }
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/sagar-saini-038979192/",
    }
  },
  {
    id: "versha-kumari",
    idNumber: "EDW-RES-003",
    name: "Versha Kumari",
    role: "Report Analyst",
    title: "Content & Research Lead",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Versha.jpeg",
    bio: "Versha Kumari is the Lead Content Specialist and Report Analyst at ED-World, focusing on educational research, quality benchmarks, syllabus tracking, and performance analytics.",
    degree: "Bachelor of Engineering - Information Technology",
    category: "research",
    email: "versha@edworld.com",
    status: "Available for Syllabus & Research Q&A",
    officeHours: "Mon & Fri • 2:00 PM - 4:00 PM IST",
    mentorshipTopics: ["Technical Documentation", "Engineering Syllabus Mapping", "Research Methodologies", "Academic Benchmarking"],
    experienceYears: 4,
    endorsementsCount: 167,
    projectsCount: 12,
    skills: ["Data Analysis", "Content Strategy", "Educational Research", "Technical Writing", "Curriculum Mapping"],
    skillProficiency: [
      { skill: "Academic Research & Benchmarks", level: 95 },
      { skill: "Curriculum & Syllabus Mapping", level: 93 },
      { skill: "Student Performance Analytics", level: 90 },
      { skill: "Technical Content Strategy", level: 92 },
      { skill: "Quality Assurance & Audits", level: 94 }
    ],
    keyMilestones: [
      "Standardized 4-year engineering curriculum across 5 major technical disciplines",
      "Authored 500+ verified assessment modules and comprehensive study syllabi",
      "Implemented student performance benchmarking report dashboard",
      "Directed academic quality audits ensuring compliance with University standards"
    ],
    featuredProjects: [
      {
        title: "Engineering Syllabus Framework",
        description: "Detailed semester 1 to 8 syllabus mapping with course codes, credit distribution, and lab assignments.",
        tag: "Curriculum"
      },
      {
        title: "Student Analytics Matrix",
        description: "Performance metrics system tracking retention, quiz pass rates, and subject proficiency.",
        tag: "Data Analytics"
      },
      {
        title: "Verified Study Resource Bank",
        description: "Curated peer-reviewed technical documentation and laboratory experiment manuals.",
        tag: "Research"
      }
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/versha-kumari-57a4b4230/",
    }
  }
];
