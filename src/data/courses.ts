export interface FeatureCourse {
  id: string;
  title: string;
  category: string;
  image: string;
  lessonsCount: number;
  duration: string;
  rating: number;
  trending: boolean;
  tag: string;
}

export const featureCourses: FeatureCourse[] = [
  {
    id: "1",
    title: "Technical Compositions & System Design",
    category: "Computer Science",
    image: "/assets/courses/courses.jpg",
    lessonsCount: 24,
    duration: "12 Weeks",
    rating: 4.9,
    trending: true,
    tag: "Self-Study"
  },
  {
    id: "2",
    title: "Non-Technical & Management Analytics",
    category: "Management",
    image: "/assets/courses/production.jpg",
    lessonsCount: 18,
    duration: "8 Weeks",
    rating: 4.8,
    trending: true,
    tag: "Self-Study"
  },
  {
    id: "6",
    title: "Creative Arts & UI/UX Foundations",
    category: "Design",
    image: "/assets/courses/competition_course.jpg",
    lessonsCount: 16,
    duration: "6 Weeks",
    rating: 4.9,
    trending: true,
    tag: "Self-Study"
  },
  {
    id: "7",
    title: "Public Health & Data Statistics",
    category: "Life Sciences",
    image: "/assets/courses/workshop_2.jpg",
    lessonsCount: 20,
    duration: "10 Weeks",
    rating: 4.7,
    trending: true,
    tag: "Self-Study"
  },
  {
    id: "25",
    title: "Full-Stack Web Dev with Next.js",
    category: "Engineering",
    image: "/assets/banners/banner-4.jpg",
    lessonsCount: 32,
    duration: "14 Weeks",
    rating: 5.0,
    trending: true,
    tag: "Most Watched"
  }
];

export interface AssignmentItem {
  id: string;
  title: string;
  department: string;
  semester: string;
  dueDate: string;
  totalMarks: number;
  status: "Open" | "In Review" | "Submitted";
  description: string;
  downloadUrl: string;
}

export const sampleAssignments: AssignmentItem[] = [
  {
    id: "assign-1",
    title: "Design & Implementation of AVL Trees and Heap Sort",
    department: "Computer Science & Engineering",
    semester: "Semester 3",
    dueDate: "2026-09-25",
    totalMarks: 50,
    status: "Open",
    description: "Implement balanced AVL search tree and benchmark execution timings with varying random datasets.",
    downloadUrl: "#"
  },
  {
    id: "assign-2",
    title: "Responsive Web Application using Next.js & REST API",
    department: "Computer Science & Engineering",
    semester: "Semester 4",
    dueDate: "2026-09-30",
    totalMarks: 100,
    status: "Open",
    description: "Create an interactive dashboard with authentication, CRUD operations, and real-time state management.",
    downloadUrl: "#"
  },
  {
    id: "assign-3",
    title: "Database Normalization (1NF to BCNF) Case Study",
    department: "Computer Science & Engineering",
    semester: "Semester 3",
    dueDate: "2026-10-05",
    totalMarks: 40,
    status: "Open",
    description: "Analyze relational schema anomalies and execute normalization steps with complete ER diagrams.",
    downloadUrl: "#"
  },
  {
    id: "assign-4",
    title: "Statistical Quality Control in Operations Management",
    department: "Management & Commerce",
    semester: "Semester 2",
    dueDate: "2026-10-12",
    totalMarks: 50,
    status: "Open",
    description: "Construct control charts for variable & attribute metrics using real-world manufacturing datasets.",
    downloadUrl: "#"
  }
];
