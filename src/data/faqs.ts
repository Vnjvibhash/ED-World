export interface FAQItem {
  id: string;
  category: "General" | "Admissions & Courses" | "Coding Practice" | "Certifications";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is Student World and how does it benefit students?",
    answer: "Student World is an all-in-one educational platform engineered for students, to the students, and by the students. We provide structured learning resources, online coding environments, interactive quizzes, sorting algorithm visualizers, and mentorship from top developers."
  },
  {
    id: "faq-2",
    category: "General",
    question: "When was Student World founded and is it registered?",
    answer: "Student World was founded in December 2021. Student World Academy India Pvt. Ltd. was officially registered under the Government of India on 31st December 2021."
  },
  {
    id: "faq-3",
    category: "Coding Practice",
    question: "How does the Coding Practice environment work?",
    answer: "Our Coding Practice portal includes an interactive multi-language compiler supporting Python, JavaScript, C++, and Java. Students can write code, run against test inputs, view stdout/stderr, and practice algorithm challenges directly in the browser."
  },
  {
    id: "faq-4",
    category: "Certifications",
    question: "Are course completion certificates provided upon finishing exams?",
    answer: "Yes! Every student who successfully finishes their course curriculum, passes the chapter assessments, and completes required assignments will receive an official verifiable Student World Course Completion Certificate."
  },
  {
    id: "faq-5",
    category: "Admissions & Courses",
    question: "What departments and branches are currently covered?",
    answer: "We cover Computer Science & Engineering, Information Technology, Electronics, Mechanical, Civil, Management & Commerce, Public Health, and Creative Arts with semester-wise study material and syllabus tracking."
  },
  {
    id: "faq-6",
    category: "Admissions & Courses",
    question: "What are the different membership tiers?",
    answer: "We offer Bronze, Silver, Gold, and Premium membership tiers. Each tier unlocks progressive access to live mentor sessions, priority assignment grading, 1-on-1 code reviews, and advanced project roadmaps."
  }
];
