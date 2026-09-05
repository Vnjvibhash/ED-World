export interface Department {
  id: string;
  slug: string;
  name: string;
  category: "Technical" | "Non-Technical" | "Management" | "Arts";
  description: string;
  iconName: string;
  image: string;
  studentsEnrolled: number;
  totalCourses: number;
  featured: boolean;
  semesters?: {
    semester: number;
    subjects: {
      code: string;
      title: string;
      credits: number;
      syllabusUrl: string;
      notesAvailable: boolean;
    }[];
  }[];
}

export const departments: Department[] = [
  {
    id: "cse",
    slug: "engineering",
    name: "Computer Science & Engineering",
    category: "Technical",
    description: "Master algorithms, web development, cloud computing, artificial intelligence, and software engineering with hands-on practice.",
    iconName: "Code2",
    image: "/assets/banners/banner-3.jpg",
    studentsEnrolled: 1420,
    totalCourses: 28,
    featured: true,
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: "CS101", title: "Programming for Problem Solving (C / Python)", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "MA101", title: "Engineering Mathematics - I", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "PH101", title: "Engineering Physics", credits: 3, syllabusUrl: "#", notesAvailable: true },
          { code: "EE101", title: "Basic Electrical & Electronics", credits: 3, syllabusUrl: "#", notesAvailable: true },
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: "CS201", title: "Data Structures & Algorithms", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS202", title: "Object Oriented Programming (C++ / Java)", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "MA201", title: "Discrete Mathematics", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS203", title: "Digital Logic & Computer Design", credits: 3, syllabusUrl: "#", notesAvailable: true },
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: "CS301", title: "Database Management Systems (SQL & NoSQL)", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS302", title: "Operating Systems & Linux Kernel", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS303", title: "Computer Networks & Protocols", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS304", title: "Design and Analysis of Algorithms", credits: 4, syllabusUrl: "#", notesAvailable: true },
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: "CS401", title: "Full-Stack Web Development (Next.js & Node)", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS402", title: "Artificial Intelligence & Machine Learning", credits: 4, syllabusUrl: "#", notesAvailable: true },
          { code: "CS403", title: "Cloud Computing & DevOps", credits: 3, syllabusUrl: "#", notesAvailable: true },
          { code: "CS404", title: "Information Security & Cryptography", credits: 3, syllabusUrl: "#", notesAvailable: true },
        ]
      }
    ]
  },
  {
    id: "management",
    slug: "management",
    name: "Management & Commerce",
    category: "Management",
    description: "Explore financial analytics, organizational leadership, marketing strategy, and modern digital business frameworks.",
    iconName: "Briefcase",
    image: "/assets/banners/banner-2.jpg",
    studentsEnrolled: 890,
    totalCourses: 16,
    featured: true,
  },
  {
    id: "health",
    slug: "non-technical",
    name: "Public Health & Life Sciences",
    category: "Non-Technical",
    description: "Comprehensive resources in community wellness, epidemiology, environmental sciences, and healthcare administration.",
    iconName: "HeartPulse",
    image: "/assets/courses/courses.jpg",
    studentsEnrolled: 640,
    totalCourses: 12,
    featured: true,
  },
  {
    id: "arts",
    slug: "other",
    name: "Arts & Creative Designs",
    category: "Arts",
    description: "UI/UX design, visual communication, animation, multimedia production, and aesthetic architectural concepts.",
    iconName: "Palette",
    image: "/assets/courses/workshop_2.jpg",
    studentsEnrolled: 520,
    totalCourses: 10,
    featured: true,
  }
];
