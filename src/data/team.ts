export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  designation: string;
  image: string;
  bio: string;
  degree: string;
  skills: string[];
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
    name: "Vivek Kumar",
    role: "Full-Stack Developer",
    title: "CTO & Founder",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Vivekajee.jpg",
    bio: "Vivek Kumar, as Founder & Chief Technology Officer, sets and evolves the strategic direction for ED-World and its platform architecture. Holds Bachelor of Engineering in Computer Science and Engineering with specialization in full-stack web and cloud architectures.",
    degree: "Bachelor of Engineering - Computer Science and Engineering",
    skills: ["Next.js", "React", "Node.js", "Laravel", "Python", "Cloud Architecture", "System Design"],
    social: {
      linkedin: "https://www.linkedin.com/in/vivekajee/",
      twitter: "https://twitter.com/Vnjvibhash",
      instagram: "https://www.instagram.com/Vivekajee/",
      facebook: "https://www.facebook.com/vivekajee",
    }
  },
  {
    id: "sagar-saini",
    name: "Sagar Saini",
    role: "AI Developer",
    title: "CEO & Co-Founder",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Sagarsaini.jpeg",
    bio: "Sagar Saini leads Artificial Intelligence, machine learning models, and curriculum innovation at ED-World, ensuring cutting-edge AI concepts and tools are seamlessly accessible for engineering students.",
    degree: "Bachelor of Engineering - Computer Science (AI & ML)",
    skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Algorithm Design"],
    social: {
      linkedin: "https://www.linkedin.com/in/sagar-saini-038979192/",
    }
  },
  {
    id: "versha-kumari",
    name: "Versha Kumari",
    role: "Report Analyst",
    title: "Content & Research Lead",
    designation: "Certificate from Karnataka Board",
    image: "/assets/team/white-Versha.jpeg",
    bio: "Versha Kumari is the Lead Content Specialist and Report Analyst at ED-World, focusing on educational research, quality benchmarks, syllabus tracking, and performance analytics.",
    degree: "Bachelor of Engineering - Information Technology",
    skills: ["Data Analysis", "Content Strategy", "Educational Research", "Technical Writing"],
    social: {
      linkedin: "https://www.linkedin.com/in/versha-kumari-57a4b4230/",
    }
  }
];
