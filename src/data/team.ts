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
  }
];
