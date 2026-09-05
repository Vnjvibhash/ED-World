export interface QuizQuestion {
  numb: number;
  category: "General Web" | "Python" | "Data Structures" | "SQL & DB";
  question: string;
  answer: string;
  options: string[];
  explanation?: string;
}

export const quizCategories = ["All", "General Web", "Python", "Data Structures", "SQL & DB"] as const;

export const quizQuestions: QuizQuestion[] = [
  {
    numb: 1,
    category: "General Web",
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    explanation: "HTML is standard markup language for creating web documents."
  },
  {
    numb: 2,
    category: "General Web",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ],
    explanation: "CSS describes how HTML elements are to be displayed on screen."
  },
  {
    numb: 3,
    category: "General Web",
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ],
    explanation: "PHP is a recursive acronym for 'PHP: Hypertext Preprocessor'."
  },
  {
    numb: 4,
    category: "SQL & DB",
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ],
    explanation: "SQL is domain-specific language used in programming and designed for managing data held in an RDBMS."
  },
  {
    numb: 5,
    category: "General Web",
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ],
    explanation: "XML is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable."
  },
  {
    numb: 6,
    category: "Data Structures",
    question: "What is the average time complexity of QuickSort?",
    answer: "O(n log n)",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(log n)"
    ],
    explanation: "QuickSort has an average time complexity of O(n log n) using divide-and-conquer partitioning."
  },
  {
    numb: 7,
    category: "Data Structures",
    question: "Which data structure operates on a Last In First Out (LIFO) principle?",
    answer: "Stack",
    options: [
      "Queue",
      "Stack",
      "Array",
      "Linked List"
    ],
    explanation: "A Stack works on the LIFO principle where elements added last are popped first."
  },
  {
    numb: 8,
    category: "Python",
    question: "Which keyword is used to define a function in Python?",
    answer: "def",
    options: [
      "function",
      "func",
      "def",
      "define"
    ],
    explanation: "In Python, the 'def' keyword introduces a function definition."
  }
];
