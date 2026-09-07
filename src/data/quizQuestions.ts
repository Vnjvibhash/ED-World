export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizStageNumber = 1 | 2 | 3;

export type QuizCategory =
  | "General Web"
  | "Python"
  | "Data Structures"
  | "SQL & DB"
  | "Operating Systems"
  | "Computer Networks"
  | "Java & OOP"
  | "C / C++"
  | "Electrical & Electronics"
  | "Mechanical Engineering"
  | "Civil Engineering"
  | "AI & Machine Learning"
  | "Cybersecurity";

export const quizCategories = [
  "All",
  "Data Structures",
  "AI & Machine Learning",
  "Cybersecurity",
  "Operating Systems",
  "Computer Networks",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Java & OOP",
  "C / C++",
  "Python",
  "General Web",
  "SQL & DB",
] as const;

export const difficultyMeta = {
  easy: {
    label: "Easy",
    stageTitle: "Stage 1: Fundamentals",
    badgeColor: "emerald",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    textLight: "text-emerald-700",
    accentGrad: "from-emerald-500 to-teal-600",
    timerSeconds: 20,
    pointValue: 100,
    desc: "Core concepts, language basics, and fundamental syntax",
    icon: "🌱",
  },
  medium: {
    label: "Medium",
    stageTitle: "Stage 2: Practical Logic",
    badgeColor: "amber",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    textLight: "text-amber-700",
    accentGrad: "from-amber-500 to-orange-600",
    timerSeconds: 25,
    pointValue: 200,
    desc: "Algorithmic logic, data manipulation, methods & queries",
    icon: "⚡",
  },
  hard: {
    label: "Hard",
    stageTitle: "Stage 3: Advanced Mastery",
    badgeColor: "rose",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    textLight: "text-rose-700",
    accentGrad: "from-rose-500 to-purple-600",
    timerSeconds: 30,
    pointValue: 300,
    desc: "Runtime complexity, tricky edge cases, and internals",
    icon: "🔥",
  },
} as const;

export const stageNames: Record<QuizStageNumber, { title: string; subtitle: string }> = {
  1: { title: "Round 1: Foundations", subtitle: "Essential syntax & definitions" },
  2: { title: "Round 2: Applied Logic", subtitle: "Practical mechanics & code analysis" },
  3: { title: "Round 3: Mastery Arena", subtitle: "Complex challenges & optimization" },
};

export interface QuizQuestion {
  id: string;
  numb: number;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  stage: QuizStageNumber;
  question: string;
  codeSnippet?: string;
  answer: string;
  options: string[];
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    "id": "e1-web-1",
    "category": "General Web",
    "difficulty": "easy",
    "stage": 1,
    "question": "What does HTML stand for?",
    "answer": "Hyper Text Markup Language",
    "options": [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    "explanation": "HTML is the standard markup language used to structure web documents.",
    "numb": 1
  },
  {
    "id": "e1-py-1",
    "category": "Python",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which keyword is used to define a function in Python?",
    "answer": "def",
    "options": [
      "function",
      "func",
      "def",
      "define"
    ],
    "explanation": "In Python, the 'def' keyword introduces a function definition.",
    "numb": 2
  },
  {
    "id": "e1-sql-1",
    "category": "SQL & DB",
    "difficulty": "easy",
    "stage": 1,
    "question": "What does SQL stand for?",
    "answer": "Structured Query Language",
    "options": [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ],
    "explanation": "SQL is domain-specific language designed for managing data held in an RDBMS.",
    "numb": 3
  },
  {
    "id": "e1-ds-1",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which data structure operates strictly on a Last In First Out (LIFO) principle?",
    "answer": "Stack",
    "options": [
      "Queue",
      "Stack",
      "Array",
      "Linked List"
    ],
    "explanation": "A Stack follows the LIFO principle where elements added last are the first to be removed.",
    "numb": 4
  },
  {
    "id": "e1-ds-2",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which data structure operates strictly on a First In First Out (FIFO) principle?",
    "answer": "Queue",
    "options": [
      "Stack",
      "Queue",
      "Priority Queue",
      "Binary Tree"
    ],
    "explanation": "A Queue processes elements in the order of their arrival (First In, First Out).",
    "numb": 5
  },
  {
    "id": "e1-ds-3",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which of the following data structures stores elements in contiguous memory locations?",
    "answer": "Array",
    "options": [
      "Linked List",
      "Array",
      "Binary Tree",
      "Graph"
    ],
    "explanation": "An array allocates a contiguous block of physical memory, allowing instant index-based calculations.",
    "numb": 6
  },
  {
    "id": "e1-ds-4",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "What is the time complexity to access an element by its index in an Array?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "Arrays allow random access in constant O(1) time using base address + (index * element_size).",
    "numb": 7
  },
  {
    "id": "e1-ds-5",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "What are the two basic components of a Node in a Singly Linked List?",
    "answer": "Data and a pointer to the next node",
    "options": [
      "Data and a pointer to the next node",
      "Data and pointers to both previous and next nodes",
      "Key, value, and hash code",
      "Parent index and child indices"
    ],
    "explanation": "Each node in a singly linked list contains data and a single pointer/reference to the next node.",
    "numb": 8
  },
  {
    "id": "e1-ds-6",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "In a Tree data structure, what is the topmost node that has no parent called?",
    "answer": "Root Node",
    "options": [
      "Leaf Node",
      "Root Node",
      "Internal Node",
      "Ancestor Node"
    ],
    "explanation": "The root node is the unique entry point and top node in a tree hierarchy without any parent.",
    "numb": 9
  },
  {
    "id": "e1-ds-7",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "In a Tree data structure, what is a node called if it has no children?",
    "answer": "Leaf Node",
    "options": [
      "Subtree",
      "Branch Node",
      "Leaf Node",
      "Root Node"
    ],
    "explanation": "Leaf nodes (also called external nodes or terminal nodes) have zero children.",
    "numb": 10
  },
  {
    "id": "e1-ds-8",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which operations are the two primary modifiers used to add and remove items from a Stack?",
    "answer": "Push and Pop",
    "options": [
      "Enqueue and Dequeue",
      "Push and Pop",
      "Insert and Delete",
      "Append and Shift"
    ],
    "explanation": "Push places a new element on top of the stack, and Pop removes the topmost element.",
    "numb": 11
  },
  {
    "id": "e1-ds-9",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which operations are the two standard primitives used to add and remove items from a Queue?",
    "answer": "Enqueue and Dequeue",
    "options": [
      "Push and Pop",
      "Enqueue and Dequeue",
      "Shift and Unshift",
      "Add and Evict"
    ],
    "explanation": "Enqueue adds an item to the back (rear) of the queue, while Dequeue removes an item from the front.",
    "numb": 12
  },
  {
    "id": "e1-ds-10",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "What is the primary role of a Hash Table (Hash Map)?",
    "answer": "To map unique keys to corresponding values for rapid retrieval",
    "options": [
      "To map unique keys to corresponding values for rapid retrieval",
      "To maintain elements in strictly sorted order at all times",
      "To connect vertices through weighted directional edges",
      "To execute recursive function calls sequentially"
    ],
    "explanation": "Hash Tables use a hash function to compute an index from a key to quickly store and retrieve values.",
    "numb": 13
  },
  {
    "id": "e1-ds-11",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 1,
    "question": "What happens when an operation attempts to push an element onto a Stack that has reached its maximum allocated capacity?",
    "answer": "Stack Overflow",
    "options": [
      "Stack Underflow",
      "Stack Overflow",
      "Null Pointer Exception",
      "Buffer Leak"
    ],
    "explanation": "Attempting to push onto a fixed-size stack that is full causes a Stack Overflow error.",
    "numb": 14
  },
  {
    "id": "e2-web-1",
    "category": "General Web",
    "difficulty": "easy",
    "stage": 2,
    "question": "What does CSS stand for?",
    "answer": "Cascading Style Sheets",
    "options": [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheets"
    ],
    "explanation": "CSS describes how HTML elements are to be styled and presented on screen.",
    "numb": 15
  },
  {
    "id": "e2-py-1",
    "category": "Python",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the correct file extension for standard Python script files?",
    "answer": ".py",
    "options": [
      ".python",
      ".py",
      ".pyt",
      ".pt"
    ],
    "explanation": "Python source files conventionally end with the '.py' extension.",
    "numb": 16
  },
  {
    "id": "e2-sql-1",
    "category": "SQL & DB",
    "difficulty": "easy",
    "stage": 2,
    "question": "Which SQL keyword is used to eliminate duplicate rows from a query result?",
    "answer": "DISTINCT",
    "options": [
      "UNIQUE",
      "DISTINCT",
      "DIFFERENT",
      "SEPARATE"
    ],
    "explanation": "The SELECT DISTINCT statement is used to return only distinct (different) values.",
    "numb": 17
  },
  {
    "id": "e2-ds-1",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "In standard zero-indexed programming languages, what is the index of the first array element?",
    "answer": "0",
    "options": [
      "0",
      "1",
      "-1",
      "null"
    ],
    "explanation": "Zero-based indexing starts counting array elements at index 0.",
    "numb": 18
  },
  {
    "id": "e2-ds-2",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the worst-case time complexity of Linear Search in an unsorted array of n elements?",
    "answer": "O(n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "explanation": "In the worst case, Linear Search must examine every element from beginning to end, taking O(n) time.",
    "numb": 19
  },
  {
    "id": "e2-ds-3",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "How does a Doubly Linked List differ from a Singly Linked List?",
    "answer": "Each node contains pointers to both the next node and previous node",
    "options": [
      "Each node contains pointers to both the next node and previous node",
      "It can store twice as many data elements per node",
      "It requires contiguous memory blocks",
      "It sorts its items automatically upon insertion"
    ],
    "explanation": "A doubly linked list node holds references to both its successor (next) and predecessor (prev) nodes.",
    "numb": 20
  },
  {
    "id": "e2-ds-4",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the maximum number of children any node can have in a standard Binary Tree?",
    "answer": "2",
    "options": [
      "1",
      "2",
      "3",
      "Unlimited"
    ],
    "explanation": "By definition, each node in a binary tree can have at most two children, termed 'left' and 'right'.",
    "numb": 21
  },
  {
    "id": "e2-ds-5",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What happens when you attempt to pop or dequeue an element from an empty data structure?",
    "answer": "Underflow",
    "options": [
      "Overflow",
      "Underflow",
      "Out of Bounds Error",
      "Garbage Collection"
    ],
    "explanation": "Popping or dequeuing from an empty structure causes an underflow error.",
    "numb": 22
  },
  {
    "id": "e2-ds-6",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is a Deque (Double-Ended Queue)?",
    "answer": "A queue where insertion and deletion can occur at both the front and rear",
    "options": [
      "A queue where insertion and deletion can occur at both the front and rear",
      "A queue that automatically doubles in size every time it gets full",
      "A queue with two separate consumer threads",
      "A queue that discards duplicate elements immediately"
    ],
    "explanation": "A Deque (Double-Ended Queue) allows items to be pushed and popped from both the head and tail in O(1) time.",
    "numb": 23
  },
  {
    "id": "e2-ds-7",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the time complexity of finding the total number of nodes in a Singly Linked List without a stored length variable?",
    "answer": "O(n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "Without a cached counter, you must traverse all n nodes from head to tail until reaching null.",
    "numb": 24
  },
  {
    "id": "e2-ds-8",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the primary advantage of a Circular Queue over a standard linear array-based queue?",
    "answer": "It reuses unoccupied space at the front without shifting elements",
    "options": [
      "It reuses unoccupied space at the front without shifting elements",
      "It automatically sorts elements in descending order",
      "It eliminates the need for pointers in memory",
      "It provides O(1) search for any arbitrary element"
    ],
    "explanation": "A circular queue wraps around using modulo arithmetic (index % capacity), recycling freed slots without element shifting.",
    "numb": 25
  },
  {
    "id": "e2-ds-9",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "In a Binary Search Tree (BST), where are keys smaller than the root node stored?",
    "answer": "In the left subtree",
    "options": [
      "In the left subtree",
      "In the right subtree",
      "In the leaf nodes only",
      "In the parent node"
    ],
    "explanation": "The BST property dictates that all nodes in the left subtree have keys smaller than the parent node.",
    "numb": 26
  },
  {
    "id": "e2-ds-10",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "In a Binary Search Tree (BST), what traversal yields the values in strictly ascending order?",
    "answer": "In-order traversal",
    "options": [
      "Pre-order traversal",
      "In-order traversal",
      "Post-order traversal",
      "Level-order traversal"
    ],
    "explanation": "In-order traversal visits left subtree -> root -> right subtree, producing strictly non-decreasing sorted order in a BST.",
    "numb": 27
  },
  {
    "id": "e2-ds-11",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is a Hash Collision?",
    "answer": "When two distinct keys produce the same hash index",
    "options": [
      "When two distinct keys produce the same hash index",
      "When a hash table exceeds its memory threshold",
      "When an invalid data type is passed to a hash function",
      "When two pointers reference the same memory address"
    ],
    "explanation": "A collision occurs when the hash function maps two distinct keys to the exact same bucket or index.",
    "numb": 28
  },
  {
    "id": "e3-web-1",
    "category": "General Web",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which HTML element is used to insert a single line break?",
    "answer": "<br>",
    "options": [
      "<break>",
      "<lb>",
      "<br>",
      "<newline>"
    ],
    "explanation": "The HTML <br> element produces a line break in text.",
    "numb": 29
  },
  {
    "id": "e3-py-1",
    "category": "Python",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the output of `type(3.14)` in Python?",
    "codeSnippet": "print(type(3.14))",
    "answer": "<class 'float'>",
    "options": [
      "<class 'float'>",
      "<class 'int'>",
      "<class 'decimal'>",
      "<class 'number'>"
    ],
    "explanation": "Numbers with a decimal point are instances of the built-in 'float' type in Python.",
    "numb": 30
  },
  {
    "id": "e3-sql-1",
    "category": "SQL & DB",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which SQL query extracts all columns from the 'students' table?",
    "answer": "SELECT * FROM students;",
    "options": [
      "SELECT * FROM students;",
      "EXTRACT ALL FROM students;",
      "FETCH * FROM students;",
      "GET ALL students;"
    ],
    "explanation": "The asterisk (*) wildcard in SQL selects all columns from the specified table.",
    "numb": 31
  },
  {
    "id": "e3-ds-1",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which data structure is best suited for implementing an 'Undo' feature in a text editor?",
    "answer": "Stack",
    "options": [
      "Queue",
      "Stack",
      "Binary Search Tree",
      "Hash Table"
    ],
    "explanation": "The most recent action needs to be undone first, making the LIFO behavior of a Stack optimal.",
    "numb": 32
  },
  {
    "id": "e3-ds-2",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which data structure is naturally used by operating systems for print spooling and CPU job scheduling?",
    "answer": "Queue",
    "options": [
      "Stack",
      "Queue",
      "Binary Tree",
      "Adjacency Matrix"
    ],
    "explanation": "Print jobs and task schedulers process requests in the order they arrive (FIFO), using a Queue.",
    "numb": 33
  },
  {
    "id": "e3-ds-3",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which data structure is universally used to check for balanced parentheses like '{[()]}' in code?",
    "answer": "Stack",
    "options": [
      "Queue",
      "Stack",
      "Heap",
      "Graph"
    ],
    "explanation": "Opening brackets are pushed to a stack; closing brackets must match and pop the topmost element.",
    "numb": 34
  },
  {
    "id": "e3-ds-4",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the visit sequence for Pre-order tree traversal?",
    "answer": "Root -> Left subtree -> Right subtree",
    "options": [
      "Root -> Left subtree -> Right subtree",
      "Left subtree -> Root -> Right subtree",
      "Left subtree -> Right subtree -> Root",
      "Right subtree -> Root -> Left subtree"
    ],
    "explanation": "Pre-order visits the current node first (Root), followed by its Left subtree and then Right subtree.",
    "numb": 35
  },
  {
    "id": "e3-ds-5",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the visit sequence for Post-order tree traversal?",
    "answer": "Left subtree -> Right subtree -> Root",
    "options": [
      "Root -> Left subtree -> Right subtree",
      "Left subtree -> Root -> Right subtree",
      "Left subtree -> Right subtree -> Root",
      "Right subtree -> Left subtree -> Root"
    ],
    "explanation": "Post-order traversal recursively visits the Left subtree, then the Right subtree, and finishes at the Root node.",
    "numb": 36
  },
  {
    "id": "e3-ds-6",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which data structure is utilized under the hood when a function makes recursive calls?",
    "answer": "Call Stack",
    "options": [
      "Call Stack",
      "Priority Queue",
      "Hash Map",
      "Doubly Linked List"
    ],
    "explanation": "Each recursive call pushes an execution frame onto the system Call Stack until base case returns.",
    "numb": 37
  },
  {
    "id": "e3-ds-7",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the time complexity to insert a new node at the very beginning (head) of a Singly Linked List?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "Inserting at the head merely requires pointing the new node to the current head and updating the head pointer.",
    "numb": 38
  },
  {
    "id": "e3-ds-8",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "How can you easily reverse a word or string using a classical data structure?",
    "answer": "Push each character onto a Stack, then pop them off",
    "options": [
      "Push each character onto a Stack, then pop them off",
      "Enqueue each character into a Queue, then dequeue them",
      "Insert them into a Min-Heap and extract min",
      "Store them in a balanced Binary Tree"
    ],
    "explanation": "Since Stack is LIFO, popping all characters reverses their original push order.",
    "numb": 39
  },
  {
    "id": "e3-ds-9",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "In an Array of size n, what is the time complexity of deleting the first element?",
    "answer": "O(n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "explanation": "Removing index 0 requires shifting all remaining (n - 1) elements one position to the left.",
    "numb": 40
  },
  {
    "id": "e3-ds-10",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the defining characteristic of a Circular Linked List?",
    "answer": "The last node points back to the first node instead of null",
    "options": [
      "The last node points back to the first node instead of null",
      "All nodes have two data values and no pointers",
      "The list can only store elements in circular geometric patterns",
      "Nodes are stored in a ring buffer in continuous RAM"
    ],
    "explanation": "In a circular linked list, the tail node's next reference connects back to the head node.",
    "numb": 41
  },
  {
    "id": "e3-ds-11",
    "category": "Data Structures",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which of the following is a non-linear data structure?",
    "answer": "Tree",
    "options": [
      "Stack",
      "Queue",
      "Array",
      "Tree"
    ],
    "explanation": "Arrays, stacks, and queues are linear (sequential) structures, whereas Trees and Graphs are hierarchical and non-linear.",
    "numb": 42
  },
  {
    "id": "m1-web-1",
    "category": "General Web",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which CSS Flexbox property aligns flex items along the cross axis?",
    "answer": "align-items",
    "options": [
      "justify-content",
      "align-items",
      "flex-direction",
      "align-content"
    ],
    "explanation": "In CSS Flexbox, 'justify-content' aligns on the main axis while 'align-items' aligns on the cross axis.",
    "numb": 43
  },
  {
    "id": "m1-py-1",
    "category": "Python",
    "difficulty": "medium",
    "stage": 1,
    "question": "What will be the output of this Python list comprehension?",
    "codeSnippet": "nums = [x * 2 for x in [1, 2, 3]]\nprint(nums)",
    "answer": "[2, 4, 6]",
    "options": [
      "[2, 4, 6]",
      "[1, 2, 3, 1, 2, 3]",
      "[2, 2, 2]",
      "[4, 4, 4]"
    ],
    "explanation": "The comprehension iterates over 1, 2, and 3, multiplying each value by 2 to yield [2, 4, 6].",
    "numb": 44
  },
  {
    "id": "m1-sql-1",
    "category": "SQL & DB",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which SQL JOIN returns all rows from the left table and matched rows from the right table?",
    "answer": "LEFT JOIN",
    "options": [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    "explanation": "A LEFT JOIN returns all records from the left table, and matching records from the right table.",
    "numb": 45
  },
  {
    "id": "m1-ds-1",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the average time complexity of Binary Search on a sorted array of size n?",
    "answer": "O(log n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "Binary Search halves the search space at each comparison step, leading to logarithmic time O(log n).",
    "numb": 46
  },
  {
    "id": "m1-ds-2",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which algorithm detects whether a linked list contains a cycle using two pointers moving at different speeds?",
    "answer": "Floyd's Tortoise and Hare algorithm",
    "options": [
      "Floyd's Tortoise and Hare algorithm",
      "Dijkstra's pointer hopping",
      "Kruskal's cycle tracing",
      "Kadane's two-speed algorithm"
    ],
    "explanation": "Floyd's Cycle-Finding algorithm moves a slow pointer by 1 step and a fast pointer by 2 steps; if they meet, a cycle exists.",
    "numb": 47
  },
  {
    "id": "m1-ds-3",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the auxiliary space complexity of an iterative Binary Search algorithm?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "Iterative binary search requires only a few pointer variables (low, high, mid), using constant O(1) space.",
    "numb": 48
  },
  {
    "id": "m1-ds-4",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "In a Max-Heap binary tree, what relationship holds between every parent node and its children?",
    "answer": "Parent key is always greater than or equal to its children's keys",
    "options": [
      "Parent key is always greater than or equal to its children's keys",
      "Parent key is always strictly less than its children's keys",
      "Left child is always greater than the right child",
      "Leaf nodes have greater values than root nodes"
    ],
    "explanation": "The Max-Heap property ensures every parent node contains a value greater than or equal to both its children.",
    "numb": 49
  },
  {
    "id": "m1-ds-5",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the time complexity to retrieve the minimum element from a Min-Heap of n elements?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "In a Min-Heap, the minimum element always resides at the root (index 0), readable in O(1) time.",
    "numb": 50
  },
  {
    "id": "m1-ds-6",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "In hash collision handling, what is the 'Chaining' method?",
    "answer": "Storing colliding entries in a linked list or bucket at that index",
    "options": [
      "Storing colliding entries in a linked list or bucket at that index",
      "Sequentially checking subsequent array slots until an empty slot is found",
      "Hashing the key a second time with a different salt",
      "Resizing the entire array to double its size immediately"
    ],
    "explanation": "Chaining attaches a linked list or dynamic bucket to each table bucket to hold all keys that produce the same hash index.",
    "numb": 51
  },
  {
    "id": "m1-ds-7",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the maximum number of nodes in a binary tree of height h (where height of single root node is 0)?",
    "answer": "2^(h + 1) - 1",
    "options": [
      "2^h",
      "2^(h + 1) - 1",
      "2^(h - 1)",
      "h^2 + 1"
    ],
    "explanation": "A full binary tree has 1 + 2 + 4 + ... + 2^h = 2^(h + 1) - 1 total nodes.",
    "numb": 52
  },
  {
    "id": "m1-ds-8",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which data structure is most commonly used as the underlying representation for a Priority Queue?",
    "answer": "Binary Heap",
    "options": [
      "Binary Heap",
      "Doubly Linked List",
      "Circular Array",
      "Hash Map"
    ],
    "explanation": "Binary Heaps provide optimal trade-offs: O(log n) insertions and extractions with O(1) peek.",
    "numb": 53
  },
  {
    "id": "m1-ds-9",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the worst-case time complexity of inserting a new key into an unbalanced Binary Search Tree?",
    "answer": "O(n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "When elements are inserted in sorted order, an unbalanced BST degenerates into a linear linked list of height n.",
    "numb": 54
  },
  {
    "id": "m1-ds-10",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "In an array representation of a binary heap, if a node is located at zero-based index i, what is the index of its left child?",
    "answer": "2 * i + 1",
    "options": [
      "2 * i",
      "2 * i + 1",
      "2 * i + 2",
      "i / 2"
    ],
    "explanation": "In zero-based binary heap indexing, the left child is at 2*i + 1, and the right child is at 2*i + 2.",
    "numb": 55
  },
  {
    "id": "m1-ds-11",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the time complexity of deleting a node from a Singly Linked List if you are only given a direct pointer to that node (and it is not the tail)?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "You can copy the next node's value into the current node and bypass the next node in O(1) time.",
    "numb": 56
  },
  {
    "id": "m2-web-1",
    "category": "General Web",
    "difficulty": "medium",
    "stage": 2,
    "question": "In JavaScript, what does `typeof null` evaluate to due to a legacy design quirk?",
    "codeSnippet": "console.log(typeof null);",
    "answer": "object",
    "options": [
      "null",
      "undefined",
      "object",
      "boolean"
    ],
    "explanation": "In the first implementation of JavaScript, null was tagged 000 in 32-bit units, which coincided with object.",
    "numb": 57
  },
  {
    "id": "m2-py-1",
    "category": "Python",
    "difficulty": "medium",
    "stage": 2,
    "question": "Which Python dictionary method retrieves a value with a fallback default if the key is missing?",
    "answer": "dict.get(key, default)",
    "options": [
      "dict.get(key, default)",
      "dict.fetch(key, default)",
      "dict.lookup(key, default)",
      "dict.find(key, default)"
    ],
    "explanation": "The `.get()` method returns the value for the key if present, or the optional default fallback without throwing a KeyError.",
    "numb": 58
  },
  {
    "id": "m2-sql-1",
    "category": "SQL & DB",
    "difficulty": "medium",
    "stage": 2,
    "question": "Which SQL aggregate function calculates the total number of non-null rows in a column?",
    "answer": "COUNT()",
    "options": [
      "SUM()",
      "COUNT()",
      "TOTAL()",
      "TALLY()"
    ],
    "explanation": "COUNT(column) counts the number of non-null values in the specified column.",
    "numb": 59
  },
  {
    "id": "m2-ds-1",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the time complexity to insert a new node at the head of a Singly Linked List?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "Inserting at the head requires only updating the new node's next pointer and head pointer, taking constant O(1) time.",
    "numb": 60
  },
  {
    "id": "m2-ds-2",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the optimal data structure to solve the classic 'Next Greater Element' problem in O(n) time?",
    "answer": "Monotonic Stack",
    "options": [
      "Monotonic Stack",
      "Priority Queue",
      "Binary Search Tree",
      "Disjoint Set"
    ],
    "explanation": "A monotonic decreasing stack keeps elements in order, popping smaller elements when a larger next element is found.",
    "numb": 61
  },
  {
    "id": "m2-ds-3",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the Load Factor of a Hash Table?",
    "answer": "Ratio of number of stored items (n) to total number of buckets (k)",
    "options": [
      "Ratio of number of stored items (n) to total number of buckets (k)",
      "Percentage of memory consumed by hash function pointers",
      "Total number of collisions divided by CPU clock speed",
      "Maximum depth of linked list chains"
    ],
    "explanation": "Load factor alpha = n / k measures how full the hash table is and dictates when rehashing/resizing occurs.",
    "numb": 62
  },
  {
    "id": "m2-ds-4",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "How do you find the k-th smallest element in a Binary Search Tree efficiently?",
    "answer": "Perform an In-order traversal and stop at the k-th visited node",
    "options": [
      "Perform an In-order traversal and stop at the k-th visited node",
      "Perform a Pre-order traversal and return the k-th node",
      "Check the k-th level of BFS traversal",
      "Query the root node's right child k times"
    ],
    "explanation": "Since in-order traversal visits BST nodes in sorted ascending order, the k-th node visited is the k-th smallest element.",
    "numb": 63
  },
  {
    "id": "m2-ds-5",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "Which algorithm uses an operator stack to convert infix arithmetic expressions (A + B * C) into postfix notation (A B C * +)?",
    "answer": "Shunting-Yard Algorithm",
    "options": [
      "Shunting-Yard Algorithm",
      "Floyd-Warshall Algorithm",
      "KMP Parsing Algorithm",
      "Tarjan's Expression Sorter"
    ],
    "explanation": "Edsger Dijkstra's Shunting-Yard algorithm uses an operator stack to parse infix expressions into postfix (RPN).",
    "numb": 64
  },
  {
    "id": "m2-ds-6",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the time complexity of Breadth-First Search (BFS) on a graph with V vertices and E edges represented as an Adjacency List?",
    "answer": "O(V + E)",
    "options": [
      "O(V + E)",
      "O(V * E)",
      "O(V^2)",
      "O(E log V)"
    ],
    "explanation": "BFS visits every vertex once (O(V)) and examines each outgoing edge once (O(E)), summing to O(V + E).",
    "numb": 65
  },
  {
    "id": "m2-ds-7",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the optimal time and auxiliary space complexity to reverse a Singly Linked List in-place iteratively?",
    "answer": "O(n) time and O(1) space",
    "options": [
      "O(n) time and O(1) space",
      "O(n) time and O(n) space",
      "O(1) time and O(1) space",
      "O(n log n) time and O(1) space"
    ],
    "explanation": "Iteratively reversing prev, curr, and next pointers takes linear time O(n) and constant O(1) extra memory.",
    "numb": 66
  },
  {
    "id": "m2-ds-8",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "In open addressing for hash tables, what is 'Linear Probing'?",
    "answer": "Probing consecutive buckets (hash + 1, hash + 2...) until an empty slot is located",
    "options": [
      "Probing consecutive buckets (hash + 1, hash + 2...) until an empty slot is located",
      "Probing buckets according to quadratic intervals (hash + 1^2, hash + 2^2...)",
      "Using a secondary hash function to calculate step size",
      "Re-sorting the entire hash table after every collision"
    ],
    "explanation": "Linear probing resolves collisions by checking the next sequential slot (hash + i) % table_size.",
    "numb": 67
  },
  {
    "id": "m2-ds-9",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the primary drawback of Linear Probing in Hash Tables?",
    "answer": "Primary Clustering",
    "options": [
      "Primary Clustering",
      "High recursion overhead",
      "Inability to store negative keys",
      "Cache misses"
    ],
    "explanation": "Linear probing tends to form contiguous blocks of occupied cells (primary clustering), degrading search time towards O(n).",
    "numb": 68
  },
  {
    "id": "m2-ds-10",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "How can you detect a cycle in a Directed Graph?",
    "answer": "DFS with three coloring / recursion call-stack tracking",
    "options": [
      "DFS with three coloring / recursion call-stack tracking",
      "Simple BFS checking for visited nodes without direction",
      "Sorting edges by weight and applying Kruskal's algorithm",
      "Computing the degree of every node"
    ],
    "explanation": "A back-edge encountered during DFS (pointing to a node currently in the active recursion stack) signifies a cycle in a directed graph.",
    "numb": 69
  },
  {
    "id": "m2-ds-11",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the level-order traversal of a binary tree equivalent to in graph theory?",
    "answer": "Breadth-First Search (BFS)",
    "options": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Topological Sort",
      "Dijkstra's Search"
    ],
    "explanation": "Traversing level by level from top to bottom matches a Breadth-First Search starting at the root vertex.",
    "numb": 70
  },
  {
    "id": "m3-web-1",
    "category": "General Web",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which modern JavaScript method is standard for attaching event listeners to DOM elements?",
    "answer": "addEventListener()",
    "options": [
      "addEventListener()",
      "attachEvent()",
      "bindEvent()",
      "onEvent()"
    ],
    "explanation": "'addEventListener()' allows multiple event handlers to be attached to an event target without overriding existing ones.",
    "numb": 71
  },
  {
    "id": "m3-py-1",
    "category": "Python",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the truth value result of `bool([])` and `bool([0])` in Python?",
    "codeSnippet": "print(bool([]), bool([0]))",
    "answer": "False and True",
    "options": [
      "False and True",
      "False and False",
      "True and True",
      "True and False"
    ],
    "explanation": "Empty collections evaluate to False (falsy), whereas a non-empty list containing element 0 evaluates to True (truthy).",
    "numb": 72
  },
  {
    "id": "m3-sql-1",
    "category": "SQL & DB",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which SQL clause is used to filter groups of records created by the GROUP BY clause?",
    "answer": "HAVING",
    "options": [
      "WHERE",
      "HAVING",
      "FILTER",
      "RESTRICT"
    ],
    "explanation": "WHERE filters rows before grouping; HAVING filters aggregated groups after the GROUP BY clause has executed.",
    "numb": 73
  },
  {
    "id": "m3-ds-1",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the average time complexity for key lookup in a well-distributed Hash Table?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "explanation": "With a uniform hash function and low load factor, average search, insert, and delete take O(1) constant time.",
    "numb": 74
  },
  {
    "id": "m3-ds-2",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the amortized time complexity of appending an element to a dynamic array (e.g., Python list or C++ std::vector)?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "Although doubling the array capacity occasionally takes O(n), amortized across n insertions each push takes O(1) on average.",
    "numb": 75
  },
  {
    "id": "m3-ds-3",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which data structure is optimal for implementing an Autocomplete or Prefix Search dictionary?",
    "answer": "Trie (Prefix Tree)",
    "options": [
      "Trie (Prefix Tree)",
      "Binary Heap",
      "Red-Black Tree",
      "Bloom Filter"
    ],
    "explanation": "A Trie represents characters as edge transitions, enabling prefix lookup in O(L) time where L is word length.",
    "numb": 76
  },
  {
    "id": "m3-ds-4",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the time complexity to build a Binary Heap from an arbitrary array of n elements using bottom-up heapify?",
    "answer": "O(n)",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(log n)",
      "O(n^2)"
    ],
    "explanation": "Bottom-up heapification sums the heights of all nodes (sum of i/2^i), which mathematically converges to O(n).",
    "numb": 77
  },
  {
    "id": "m3-ds-5",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which data structure combination is standard for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?",
    "answer": "Hash Map and Doubly Linked List",
    "options": [
      "Hash Map and Doubly Linked List",
      "Binary Search Tree and Queue",
      "Min-Heap and Array",
      "Stack and Singly Linked List"
    ],
    "explanation": "The Hash Map provides O(1) key lookups to nodes, while the Doubly Linked List enables O(1) removal and head insertion.",
    "numb": 78
  },
  {
    "id": "m3-ds-6",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the optimal data structure to compute the sliding window maximum of size k in an array of size n in O(n) total time?",
    "answer": "Monotonic Deque",
    "options": [
      "Monotonic Deque",
      "Priority Queue",
      "Balanced BST",
      "Singly Linked List"
    ],
    "explanation": "A monotonic deque maintains candidate maximum indices in decreasing order, popping expired indices in O(1) amortized time.",
    "numb": 79
  },
  {
    "id": "m3-ds-7",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What graph condition must be met for a Topological Sort to exist?",
    "answer": "The graph must be a Directed Acyclic Graph (DAG)",
    "options": [
      "The graph must be a Directed Acyclic Graph (DAG)",
      "The graph must be fully connected and undirected",
      "All edge weights must be positive",
      "The graph must have an Eulerian circuit"
    ],
    "explanation": "Topological sorting requires dependencies to be acyclic and directional (DAG), or a circular dependency deadlocks ordering.",
    "numb": 80
  },
  {
    "id": "m3-ds-8",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the space complexity comparison between an Adjacency Matrix and an Adjacency List for a sparse graph with V vertices and E edges?",
    "answer": "Adjacency Matrix uses O(V^2), while Adjacency List uses O(V + E)",
    "options": [
      "Adjacency Matrix uses O(V^2), while Adjacency List uses O(V + E)",
      "Adjacency Matrix uses O(V + E), while Adjacency List uses O(V^2)",
      "Both use O(V * E) space",
      "Both use O(V^2) space"
    ],
    "explanation": "An adjacency matrix allocates a V x V table regardless of edge count, whereas an adjacency list stores only existing edges.",
    "numb": 81
  },
  {
    "id": "m3-ds-9",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the time complexity to insert an element into a Binary Heap with n existing elements?",
    "answer": "O(log n)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "explanation": "Inserting places the node at the bottom leaf and sifts it up along the height of the tree, which is O(log n).",
    "numb": 82
  },
  {
    "id": "m3-ds-10",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "In a Binary Search Tree, how do you locate the Lowest Common Ancestor (LCA) of two node values n1 and n2 (where n1 < n2)?",
    "answer": "Walk down from the root until reaching a node whose value is between n1 and n2",
    "options": [
      "Walk down from the root until reaching a node whose value is between n1 and n2",
      "Find the midpoint in the in-order traversal array",
      "Run BFS until encountering both nodes in the same queue level",
      "Find the parent of the root node"
    ],
    "explanation": "If root > n2, LCA is in left subtree; if root < n1, LCA is in right subtree; otherwise, root is the LCA.",
    "numb": 83
  },
  {
    "id": "m3-ds-11",
    "category": "Data Structures",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the minimum number of queues needed to implement a Stack?",
    "answer": "2",
    "options": [
      "1",
      "2",
      "3",
      "Not possible"
    ],
    "explanation": "Two queues can simulate a stack by pushing into one queue and dequeuing elements to reverse arrival order.",
    "numb": 84
  },
  {
    "id": "h1-web-1",
    "category": "General Web",
    "difficulty": "hard",
    "stage": 1,
    "question": "In the JavaScript Event Loop, which queue executes immediately after the current call stack clears, before macrotasks?",
    "answer": "Microtask Queue (Promises, queueMicrotask)",
    "options": [
      "Microtask Queue (Promises, queueMicrotask)",
      "Macrotask Queue (setTimeout, setInterval)",
      "Render Frame Pipeline",
      "I/O Polling Queue"
    ],
    "explanation": "Microtasks (resolved Promise callbacks, queueMicrotask, MutationObserver) are processed immediately after the current script run.",
    "numb": 85
  },
  {
    "id": "h1-py-1",
    "category": "Python",
    "difficulty": "hard",
    "stage": 1,
    "question": "What does a Python function return when invoked if it contains the `yield` keyword?",
    "codeSnippet": "def count_up():\n    yield 1\n    yield 2\n\nc = count_up()\nprint(type(c))",
    "answer": "A Generator object",
    "options": [
      "A Generator object",
      "A List",
      "A Tuple",
      "None"
    ],
    "explanation": "Functions containing 'yield' return a generator iterator object that yields values on demand via next().",
    "numb": 86
  },
  {
    "id": "h1-sql-1",
    "category": "SQL & DB",
    "difficulty": "hard",
    "stage": 1,
    "question": "In database transaction ACID properties, what does 'I' stand for?",
    "answer": "Isolation",
    "options": [
      "Isolation",
      "Integrity",
      "Indexing",
      "Immutability"
    ],
    "explanation": "ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation prevents concurrent transactions from interfering.",
    "numb": 87
  },
  {
    "id": "h1-ds-1",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the worst-case time complexity of standard QuickSort without randomized pivot on an already sorted array?",
    "answer": "O(n^2)",
    "options": [
      "O(n^2)",
      "O(n log n)",
      "O(n)",
      "O(log n)"
    ],
    "explanation": "When picking the first or last element as pivot on a sorted array, partitions are unbalanced (0 and n-1), causing O(n^2) runtime.",
    "numb": 88
  },
  {
    "id": "h1-ds-2",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "In a Red-Black Tree, what is the maximum possible height of a tree with n nodes?",
    "answer": "2 * log2(n + 1)",
    "options": [
      "log2(n)",
      "2 * log2(n + 1)",
      "n / 2",
      "sqrt(n)"
    ],
    "explanation": "Because the longest path (alternating red and black) is at most twice the shortest path (all black), height <= 2 * log2(n + 1).",
    "numb": 89
  },
  {
    "id": "h1-ds-3",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the definition of the balance factor of a node in an AVL Tree?",
    "answer": "Height of Left Subtree - Height of Right Subtree",
    "options": [
      "Height of Left Subtree - Height of Right Subtree",
      "Total nodes in Left Subtree / Total nodes in Right Subtree",
      "Depth of node from root",
      "Number of leaf descendants"
    ],
    "explanation": "The balance factor is calculated as height(left) - height(right) and must evaluate to -1, 0, or +1 for every node.",
    "numb": 90
  },
  {
    "id": "h1-ds-4",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the amortized time complexity per operation of Disjoint Set Union (DSU) with both Path Compression and Union by Rank?",
    "answer": "O(alpha(n)) where alpha is the Inverse Ackermann function",
    "options": [
      "O(alpha(n)) where alpha is the Inverse Ackermann function",
      "O(log n)",
      "O(1) strict worst-case",
      "O(log* n) iterated logarithm"
    ],
    "explanation": "Combined Path Compression and Union by Rank bounds operation time to O(alpha(n)), which is practically <= 4 for all universe sizes.",
    "numb": 91
  },
  {
    "id": "h1-ds-5",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What are the time complexities to build and execute a range sum query on a Segment Tree with n elements?",
    "answer": "O(n) build, O(log n) query",
    "options": [
      "O(n) build, O(log n) query",
      "O(n log n) build, O(1) query",
      "O(log n) build, O(log n) query",
      "O(n^2) build, O(1) query"
    ],
    "explanation": "A segment tree is constructed in O(n) linear time bottom-up and resolves range queries in O(log n) by visiting at most 4 nodes per level.",
    "numb": 92
  },
  {
    "id": "h1-ds-6",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the primary advantage of a Fenwick Tree (Binary Indexed Tree) over a standard Segment Tree for prefix queries?",
    "answer": "Simpler implementation with O(n) memory and lower constant factors",
    "options": [
      "Simpler implementation with O(n) memory and lower constant factors",
      "Supports range queries in O(1) time",
      "Can handle arbitrary non-invertible matrix multiplications",
      "Eliminates bitwise manipulations completely"
    ],
    "explanation": "A Fenwick Tree uses an implicit flat array of size n with bitwise index jumps (i & -i), requiring much less space and code than a segment tree.",
    "numb": 93
  },
  {
    "id": "h1-ds-7",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "Which self-adjusting binary search tree moves recently accessed elements to the root via a series of tree rotations called 'splaying'?",
    "answer": "Splay Tree",
    "options": [
      "Splay Tree",
      "AVL Tree",
      "B+ Tree",
      "Treap"
    ],
    "explanation": "Splay Trees perform zig, zig-zig, and zig-zag rotations to splay any accessed node to the root, guaranteeing O(log n) amortized operations.",
    "numb": 94
  },
  {
    "id": "h1-ds-8",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the amortized time complexity of the decrease-key operation in a Fibonacci Heap?",
    "answer": "O(1)",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(alpha(n))"
    ],
    "explanation": "Fibonacci Heaps achieve O(1) amortized decrease-key using cascading cuts, speeding up Dijkstra's algorithm to O(E + V log V).",
    "numb": 95
  },
  {
    "id": "h1-ds-9",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "Which algorithm finds all Strongly Connected Components (SCCs) in a Directed Graph in a single DFS pass using low-link values?",
    "answer": "Tarjan's SCC Algorithm",
    "options": [
      "Tarjan's SCC Algorithm",
      "Kosaraju's Algorithm",
      "Dijkstra's Algorithm",
      "Prim's Algorithm"
    ],
    "explanation": "Tarjan's algorithm uses DFS discovery times and low-link values with a stack to identify SCCs in linear O(V + E) time.",
    "numb": 96
  },
  {
    "id": "h1-ds-10",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "What probabilistic data structure maintains multiple levels of linked lists to achieve O(log n) search without tree balancing rotations?",
    "answer": "Skip List",
    "options": [
      "Skip List",
      "Bloom Filter",
      "Trie",
      "Splay Tree"
    ],
    "explanation": "William Pugh's Skip List uses randomized coin tosses to promote forward shortcut pointers across hierarchical linked levels.",
    "numb": 97
  },
  {
    "id": "h1-ds-11",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 1,
    "question": "Why do relational database storage engines use B-Trees and B+ Trees instead of AVL or Red-Black Trees for on-disk indexes?",
    "answer": "High branching factor (fan-out) minimizes expensive disk I/O reads",
    "options": [
      "High branching factor (fan-out) minimizes expensive disk I/O reads",
      "They consume zero auxiliary memory",
      "They allow lock-free writes without concurrency controls",
      "Binary trees cannot store strings as keys"
    ],
    "explanation": "B-Trees have large page-sized nodes that store hundreds of keys, keeping tree height shallow (3-4 levels) to minimize disk page fetches.",
    "numb": 98
  },
  {
    "id": "h2-web-1",
    "category": "General Web",
    "difficulty": "hard",
    "stage": 2,
    "question": "In JavaScript, what mechanism allows an inner function to retain access to variables from its outer lexical scope after the outer function finishes?",
    "answer": "Closure",
    "options": [
      "Closure",
      "Hoisting",
      "Prototype Chaining",
      "Event Bubbling"
    ],
    "explanation": "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
    "numb": 99
  },
  {
    "id": "h2-py-1",
    "category": "Python",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the primary role of `@functools.wraps` when writing custom Python decorators?",
    "codeSnippet": "import functools\ndef my_dec(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper",
    "answer": "Preserves the decorated function's original name and docstring metadata",
    "options": [
      "Preserves the decorated function's original name and docstring metadata",
      "Executes the decorated function asynchronously",
      "Automatically memoizes returned outputs in memory",
      "Enforces strict runtime type verification"
    ],
    "explanation": "@functools.wraps copies the original function's attributes (__name__, __doc__, __module__) to the wrapper.",
    "numb": 100
  },
  {
    "id": "h2-sql-1",
    "category": "SQL & DB",
    "difficulty": "hard",
    "stage": 2,
    "question": "Which database index structure is most widely used by RDBMS engines (PostgreSQL, MySQL InnoDB) for efficient range scans and sorting?",
    "answer": "B+ Tree",
    "options": [
      "B+ Tree",
      "Hash Index",
      "Inverted Index",
      "Bitmap Index"
    ],
    "explanation": "B+ Trees store all records/pointers in linked leaf nodes, making range queries, inequality scans, and sorted traversals extremely efficient.",
    "numb": 101
  },
  {
    "id": "h2-ds-1",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "Which self-balancing binary search tree strictly maintains a balance factor difference of at most 1 between left and right subtree heights?",
    "answer": "AVL Tree",
    "options": [
      "AVL Tree",
      "Binary Heap",
      "B-Tree",
      "Trie"
    ],
    "explanation": "An AVL Tree strictly requires that for every node, the height difference between left and right subtrees is -1, 0, or +1.",
    "numb": 102
  },
  {
    "id": "h2-ds-2",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "In an AVL Tree, how do you rebalance a node when the imbalance is caused by an insertion into the Right subtree of its Left child (Left-Right Case)?",
    "answer": "Perform Left Rotation on Left Child, followed by Right Rotation on Unbalanced Node",
    "options": [
      "Perform Left Rotation on Left Child, followed by Right Rotation on Unbalanced Node",
      "Perform a single Right Rotation on the unbalanced node",
      "Perform a single Left Rotation on the unbalanced node",
      "Perform Right Rotation on Left Child, followed by Left Rotation on Unbalanced Node"
    ],
    "explanation": "A Left-Right imbalance requires a double rotation: first a Left rotation on the left child, then a Right rotation on the root of the subtree.",
    "numb": 103
  },
  {
    "id": "h2-ds-3",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the time complexity of the Floyd-Warshall algorithm for solving the All-Pairs Shortest Path problem on a graph with V vertices?",
    "answer": "O(V^3)",
    "options": [
      "O(V^3)",
      "O(V^2 log V)",
      "O(V * E)",
      "O(V^4)"
    ],
    "explanation": "Floyd-Warshall uses three nested loops over all vertices k, i, and j to update intermediate shortest paths, running in O(V^3) time.",
    "numb": 104
  },
  {
    "id": "h2-ds-4",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What distinct advantage does the Bellman-Ford shortest path algorithm have over Dijkstra's algorithm?",
    "answer": "It handles negative edge weights and detects negative weight cycles",
    "options": [
      "It handles negative edge weights and detects negative weight cycles",
      "It runs in O(log V) time on dense graphs",
      "It requires zero extra memory",
      "It can only be applied to undirected trees"
    ],
    "explanation": "Bellman-Ford relaxes all edges V - 1 times, allowing negative weights and discovering negative cycles if a relaxation still succeeds on step V.",
    "numb": 105
  },
  {
    "id": "h2-ds-5",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What data structure does a Treap combine to maintain balanced binary search tree operations?",
    "answer": "Binary Search Tree on keys and Heap on randomly assigned priorities",
    "options": [
      "Binary Search Tree on keys and Heap on randomly assigned priorities",
      "Trie on prefixes and Stack on depth",
      "Array on values and Red-Black tree on colors",
      "Doubly Linked List on keys and Priority Queue on timestamps"
    ],
    "explanation": "A Treap maintains the BST invariant on node keys and the Min/Max Heap invariant on randomly chosen priority values.",
    "numb": 106
  },
  {
    "id": "h2-ds-6",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the primary characteristic of a Bloom Filter?",
    "answer": "It can return false positives, but never false negatives",
    "options": [
      "It can return false positives, but never false negatives",
      "It can return false negatives, but never false positives",
      "It provides exact item counts in O(1) space",
      "It guarantees zero hash collisions"
    ],
    "explanation": "If a Bloom filter says an element is absent, it is definitively absent. If it says present, it may be a false positive due to bit overlaps.",
    "numb": 107
  },
  {
    "id": "h2-ds-7",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "Which algorithm constructs a Suffix Tree for a string of length n in linear O(n) time?",
    "answer": "Ukkonen's Algorithm",
    "options": [
      "Ukkonen's Algorithm",
      "Kasai's Algorithm",
      "Aho-Corasick Algorithm",
      "Manacher's Algorithm"
    ],
    "explanation": "Esko Ukkonen's algorithm builds a suffix tree online character-by-character in O(n) time using suffix links.",
    "numb": 108
  },
  {
    "id": "h2-ds-8",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "Which string matching data structure/automaton finds all occurrences of multiple dictionary keywords in an input text simultaneously in linear time?",
    "answer": "Aho-Corasick Automaton",
    "options": [
      "Aho-Corasick Automaton",
      "Boyer-Moore Search",
      "Rabin-Karp Rolling Hash",
      "Knuth-Morris-Pratt (KMP)"
    ],
    "explanation": "Aho-Corasick constructs a finite-state machine from a Trie with failure fallback transitions, matching all patterns in O(Text + Patterns).",
    "numb": 109
  },
  {
    "id": "h2-ds-9",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "In Robin Hood Hashing, what mechanism reduces lookup variance and eliminates long search chains?",
    "answer": "Stealing slots from rich elements (closer to probe home) to give to poorer elements",
    "options": [
      "Stealing slots from rich elements (closer to probe home) to give to poorer elements",
      "Discarding keys with odd hash codes",
      "Doubly hashing using random prime multipliers",
      "Dividing memory equally among all thread pools"
    ],
    "explanation": "When inserting, if an existing element has probed fewer steps than the incoming element, they swap, equalizing probe lengths.",
    "numb": 110
  },
  {
    "id": "h2-ds-10",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the Euler Tour Technique on trees used for?",
    "answer": "Flattening a tree into an array where subtrees correspond to contiguous index intervals",
    "options": [
      "Flattening a tree into an array where subtrees correspond to contiguous index intervals",
      "Finding an Eulerian circuit that visits every edge twice",
      "Compressing binary tree nodes into byte buffers",
      "Calculating the center of mass in 3D graphs"
    ],
    "explanation": "Recording entry and exit timestamps during a DFS flattens subtrees into ranges, allowing Segment Trees to perform subtree updates in O(log n).",
    "numb": 111
  },
  {
    "id": "h2-ds-11",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the optimal data structure to support Range Minimum Queries (RMQ) in static arrays with O(1) query time after O(n log n) preprocessing?",
    "answer": "Sparse Table",
    "options": [
      "Sparse Table",
      "Segment Tree",
      "Binary Indexed Tree",
      "Skip List"
    ],
    "explanation": "Sparse Table precomputes answers for power-of-two ranges (2^k), answering idempotent operations like min/max/gcd in O(1) time.",
    "numb": 112
  },
  {
    "id": "h3-web-1",
    "category": "General Web",
    "difficulty": "hard",
    "stage": 3,
    "question": "Which CSS property can trigger hardware GPU acceleration and create an isolated stacking context?",
    "answer": "transform: translateZ(0) / will-change: transform",
    "options": [
      "transform: translateZ(0) / will-change: transform",
      "display: block",
      "position: static",
      "box-sizing: border-box"
    ],
    "explanation": "3D transforms or 'will-change' hint the browser engine to promote the element to its own composite GPU layer.",
    "numb": 113
  },
  {
    "id": "h3-py-1",
    "category": "Python",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is the Global Interpreter Lock (GIL) in standard CPython?",
    "answer": "A mutex that allows only one native thread to execute Python bytecode at a time",
    "options": [
      "A mutex that allows only one native thread to execute Python bytecode at a time",
      "A garbage collection safety lock for circular references",
      "A security sandbox preventing arbitrary memory access",
      "A file-system lock on open file descriptors"
    ],
    "explanation": "CPython's GIL is a mutual-exclusion lock preventing multi-threading from executing Python bytecode simultaneously across multiple CPU cores.",
    "numb": 114
  },
  {
    "id": "h3-sql-1",
    "category": "SQL & DB",
    "difficulty": "hard",
    "stage": 3,
    "question": "In database isolation levels, which level guarantees complete isolation from Dirty Reads, Non-Repeatable Reads, and Phantom Reads?",
    "answer": "SERIALIZABLE",
    "options": [
      "SERIALIZABLE",
      "REPEATABLE READ",
      "READ COMMITTED",
      "READ UNCOMMITTED"
    ],
    "explanation": "SERIALIZABLE is the strictest ANSI SQL isolation level, emulating serial transaction execution and preventing phantom rows.",
    "numb": 115
  },
  {
    "id": "h3-ds-1",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "Which graph algorithm finds the shortest path from a source node in a weighted graph with non-negative edge weights in O((V + E) log V)?",
    "answer": "Dijkstra's Algorithm",
    "options": [
      "Dijkstra's Algorithm",
      "Prim's Minimum Spanning Tree",
      "Kruskal's Algorithm",
      "Floyd-Warshall Algorithm"
    ],
    "explanation": "Dijkstra's algorithm uses a min-priority queue to greedily discover the shortest path in non-negative weighted graphs.",
    "numb": 116
  },
  {
    "id": "h3-ds-2",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is a Persistent Data Structure?",
    "answer": "A data structure that preserves previous versions of itself when modified",
    "options": [
      "A data structure that preserves previous versions of itself when modified",
      "A data structure saved directly to an NVMe hard drive",
      "A structure that prevents garbage collection of deleted nodes",
      "A lock-free concurrency queue that never terminates"
    ],
    "explanation": "Persistent structures use path-copying to create new nodes only along the modified path, sharing unchanged branches with prior versions.",
    "numb": 117
  },
  {
    "id": "h3-ds-3",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is Heavy-Light Decomposition (HLD) on trees designed to achieve?",
    "answer": "Reduces any path query on a tree to O(log^2 n) queries on Segment Trees",
    "options": [
      "Reduces any path query on a tree to O(log^2 n) queries on Segment Trees",
      "Calculates the gravitational center of a tree in O(1)",
      "Compresses ternary trees into flat bit arrays",
      "Balances tree heights using random edge coloring"
    ],
    "explanation": "HLD decomposes tree edges into heavy and light chains, guaranteeing that any path between two nodes crosses at most O(log n) light edges.",
    "numb": 118
  },
  {
    "id": "h3-ds-4",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is the time complexity of operations (successor, predecessor, insert, delete) in a Van Emde Boas Tree with universe size U?",
    "answer": "O(log log U)",
    "options": [
      "O(log log U)",
      "O(log U)",
      "O(sqrt(U))",
      "O(alpha(U))"
    ],
    "explanation": "Van Emde Boas trees achieve double logarithmic O(log log U) operations by recursively partitioning the universe into sqrt(U) clusters.",
    "numb": 119
  },
  {
    "id": "h3-ds-5",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What does Cuckoo Hashing guarantee for worst-case lookup time?",
    "answer": "O(1) strict worst-case lookup",
    "options": [
      "O(1) strict worst-case lookup",
      "O(log n) worst-case lookup",
      "O(alpha(n)) lookup",
      "O(sqrt(n)) lookup"
    ],
    "explanation": "Cuckoo Hashing inspects at most two locations (hash1(key) and hash2(key)), guaranteeing constant O(1) worst-case lookup time.",
    "numb": 120
  },
  {
    "id": "h3-ds-6",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is a K-d Tree (k-dimensional tree) primarily used for?",
    "answer": "Partitioning points in k-dimensional space for nearest neighbor search",
    "options": [
      "Partitioning points in k-dimensional space for nearest neighbor search",
      "Sorting arrays with k duplicate keys",
      "Hashing k-character cryptographic hashes",
      "Finding topological orderings of k components"
    ],
    "explanation": "A K-d tree recursively cycles through dimensions (x, y, z...) at each level, enabling fast range search and nearest neighbor queries.",
    "numb": 121
  },
  {
    "id": "h3-ds-7",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is the Count-Min Sketch used for in high-throughput data streams?",
    "answer": "Probabilistic sub-linear space frequency estimation of events",
    "options": [
      "Probabilistic sub-linear space frequency estimation of events",
      "Exact median calculation in constant memory",
      "Compressing image textures on the GPU",
      "Distributed consensus synchronization"
    ],
    "explanation": "A Count-Min sketch uses a 2D array of counters with multiple hash functions to estimate item frequencies with provable error bounds.",
    "numb": 122
  },
  {
    "id": "h3-ds-8",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "Which data structure maintains a forest of dynamic trees under edge insertions, deletions, and path queries in O(log n) amortized time?",
    "answer": "Link-Cut Tree",
    "options": [
      "Link-Cut Tree",
      "Fenwick Tree",
      "Segment Tree",
      "Treap"
    ],
    "explanation": "Robert Tarjan and Daniel Sleator's Link-Cut Tree represents dynamic trees as collections of preferred paths backed by Splay Trees.",
    "numb": 123
  },
  {
    "id": "h3-ds-9",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "How does a Radix Tree (Patricia Trie) optimize standard Trie memory consumption?",
    "answer": "It merges all nodes that have only one child with their parents",
    "options": [
      "It merges all nodes that have only one child with their parents",
      "It removes the root node after construction",
      "It truncates all words longer than 16 characters",
      "It converts character pointers into 4-bit nibbles"
    ],
    "explanation": "A Radix tree compresses single-child chains into a single edge with a multi-character label, drastically shrinking node count.",
    "numb": 124
  },
  {
    "id": "h3-ds-10",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "Which algorithm constructs the Longest Common Prefix (LCP) array from a Suffix Array in linear O(n) time?",
    "answer": "Kasai's Algorithm",
    "options": [
      "Kasai's Algorithm",
      "Manacher's Algorithm",
      "Z-Algorithm",
      "KMP Algorithm"
    ],
    "explanation": "Kasai's algorithm computes LCP values in order of original string suffixes, leveraging the fact that lcp(i) >= lcp(i-1) - 1.",
    "numb": 125
  },
  {
    "id": "h3-ds-11",
    "category": "Data Structures",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is the purpose of a Dancing Links (DLX) data structure implementation of Knuth's Algorithm X?",
    "answer": "Efficiently backtracking to solve Exact Cover problems (e.g., Sudoku, Pentominoes)",
    "options": [
      "Efficiently backtracking to solve Exact Cover problems (e.g., Sudoku, Pentominoes)",
      "Balancing AVL trees with circular pointers",
      "Sorting linked lists in parallel on GPUs",
      "Detecting cycles in bipartite matching networks"
    ],
    "explanation": "Donald Knuth's Dancing Links technique uses 4-way circular doubly linked lists to rapidly cover and uncover matrix rows during backtracking.",
    "numb": 126
  },
  {
    "id": "e1-os-1",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 1,
    "question": "What is the core component of an Operating System that interacts directly with computer hardware?",
    "answer": "Kernel",
    "options": [
      "Kernel",
      "Shell",
      "Compiler",
      "File Explorer"
    ],
    "explanation": "The Kernel is the central core of an OS that manages hardware resources, CPU scheduling, and memory.",
    "numb": 127
  },
  {
    "id": "e1-os-2",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which CPU scheduling algorithm is non-preemptive and executes processes strictly in order of their arrival?",
    "answer": "First-Come, First-Served (FCFS)",
    "options": [
      "First-Come, First-Served (FCFS)",
      "Round Robin (RR)",
      "Shortest Remaining Time First (SRTF)",
      "Multilevel Feedback Queue"
    ],
    "explanation": "FCFS schedules processes strictly in FIFO queue order without preemption.",
    "numb": 128
  },
  {
    "id": "e2-os-1",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the primary role of Virtual Memory in modern operating systems?",
    "answer": "Enables processes to execute even if they exceed physical RAM capacity",
    "options": [
      "Enables processes to execute even if they exceed physical RAM capacity",
      "Increases CPU clock frequency dynamically",
      "Permanently backs up user files to the cloud",
      "Encrypts network traffic over local sockets"
    ],
    "explanation": "Virtual memory maps virtual addresses to physical RAM and secondary storage paging files, removing physical RAM limits.",
    "numb": 129
  },
  {
    "id": "e2-os-2",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the data structure maintained by an OS for each active process called?",
    "answer": "Process Control Block (PCB)",
    "options": [
      "Process Control Block (PCB)",
      "File Allocation Table",
      "Inode Map",
      "Thread Pool Vector"
    ],
    "explanation": "The PCB stores process state, PID, CPU registers, program counter, and memory boundaries.",
    "numb": 130
  },
  {
    "id": "e3-os-1",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which state does a running process transition to when waiting for an I/O operation to complete?",
    "answer": "Waiting / Blocked",
    "options": [
      "Waiting / Blocked",
      "Terminated",
      "Ready",
      "Zombie"
    ],
    "explanation": "When a process initiates an I/O request, it yields the CPU and moves to the Waiting/Blocked state until the I/O event completes.",
    "numb": 131
  },
  {
    "id": "e3-os-2",
    "category": "Operating Systems",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is Thrashing in an operating system?",
    "answer": "When the system spends more time swapping pages than executing user instructions",
    "options": [
      "When the system spends more time swapping pages than executing user instructions",
      "Rapid fragmentation of solid state drive sectors",
      "Overheating of the CPU due to overclocking",
      "Continuous generation of duplicate process IDs"
    ],
    "explanation": "Thrashing occurs when high paging activity causes the CPU utilization to collapse because pages are constantly swapped in and out.",
    "numb": 132
  },
  {
    "id": "m1-os-1",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which of the following is NOT one of Coffman's four necessary conditions for Deadlock?",
    "answer": "Preemption Allowed",
    "options": [
      "Preemption Allowed",
      "Mutual Exclusion",
      "Hold and Wait",
      "Circular Wait"
    ],
    "explanation": "Coffman's 4 conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot persist.",
    "numb": 133
  },
  {
    "id": "m1-os-2",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is a Semaphore initialized with a maximum count of 1 commonly known as?",
    "answer": "Binary Semaphore (Mutex)",
    "options": [
      "Binary Semaphore (Mutex)",
      "Counting Semaphore",
      "Spinlock Barrier",
      "Monitor Token"
    ],
    "explanation": "A binary semaphore has values 0 or 1, functioning as a mutual exclusion lock (Mutex) to protect critical sections.",
    "numb": 134
  },
  {
    "id": "m2-os-1",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 2,
    "question": "Which CPU scheduling algorithm assigns a fixed time quantum cyclically to ready processes?",
    "answer": "Round Robin (RR)",
    "options": [
      "Round Robin (RR)",
      "Shortest Job First (SJF)",
      "Priority Scheduling",
      "Earliest Deadline First"
    ],
    "explanation": "Round Robin divides CPU time into equal slices (quanta), preempting processes when their quantum expires.",
    "numb": 135
  },
  {
    "id": "m2-os-2",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 2,
    "question": "What condition causes a Page Fault interrupt?",
    "answer": "A process accesses a virtual memory page that is not present in physical RAM",
    "options": [
      "A process accesses a virtual memory page that is not present in physical RAM",
      "A hard drive sector experiences hardware corruption",
      "The CPU instruction pipeline stalls due to a branch misprediction",
      "Two processes attempt to write to the same register simultaneously"
    ],
    "explanation": "When a referenced virtual page table entry has its valid bit set to 0, hardware raises a Page Fault to load the page from disk.",
    "numb": 136
  },
  {
    "id": "m3-os-1",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is Belady's Anomaly in operating systems page replacement?",
    "answer": "Increasing the number of page frames causes more page faults in FIFO",
    "options": [
      "Increasing the number of page frames causes more page faults in FIFO",
      "Decreasing time quantum causes deadlock in Round Robin",
      "Shared memory segments corrupting swap partitions",
      "CPU cache misses increasing as clock speed rises"
    ],
    "explanation": "Belady's anomaly occurs in FIFO page replacement where giving a process more physical frames counterintuitively increases page faults.",
    "numb": 137
  },
  {
    "id": "m3-os-2",
    "category": "Operating Systems",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the purpose of the Translation Lookaside Buffer (TLB)?",
    "answer": "A hardware cache storing recent virtual-to-physical address translations",
    "options": [
      "A hardware cache storing recent virtual-to-physical address translations",
      "A buffer holding uncommitted disk writes",
      "A network packet queue inside network interface cards",
      "A register bank holding interrupt vector addresses"
    ],
    "explanation": "The TLB caches recent Page Table translations in CPU hardware, avoiding multi-level page table walks in RAM on TLB hits.",
    "numb": 138
  },
  {
    "id": "h1-os-1",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 1,
    "question": "Which deadlock avoidance algorithm tests for safety by simulating maximum possible resource claims before allocation?",
    "answer": "Banker's Algorithm",
    "options": [
      "Banker's Algorithm",
      "Peterson's Algorithm",
      "Lamport's Bakery Algorithm",
      "Dekker's Algorithm"
    ],
    "explanation": "Edsger Dijkstra's Banker's Algorithm ensures the system never enters an unsafe state by checking if a safe execution sequence exists.",
    "numb": 139
  },
  {
    "id": "h1-os-2",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the fundamental difference between a Process and a Thread regarding memory isolation?",
    "answer": "Threads in a process share the same virtual address space, while processes have isolated address spaces",
    "options": [
      "Threads in a process share the same virtual address space, while processes have isolated address spaces",
      "Processes share CPU registers, while threads have isolated registers",
      "Threads have separate open file descriptor tables",
      "Processes cannot be preempted by the OS scheduler"
    ],
    "explanation": "Threads of the same process share heap, code, and global data, while processes are partitioned into distinct virtual address spaces.",
    "numb": 140
  },
  {
    "id": "h2-os-1",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 2,
    "question": "In the Linux Completely Fair Scheduler (CFS), what data structure tracks task virtual runtimes (vruntime)?",
    "answer": "Red-Black Tree",
    "options": [
      "Red-Black Tree",
      "Min-Heap",
      "Circular Array",
      "Hash Map"
    ],
    "explanation": "Linux CFS stores runnable tasks in a time-ordered Red-Black tree keyed by `vruntime`, picking the leftmost node in O(log n) time.",
    "numb": 141
  },
  {
    "id": "h2-os-2",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is an Inverted Page Table?",
    "answer": "A page table with one entry per physical memory frame instead of per virtual page",
    "options": [
      "A page table with one entry per physical memory frame instead of per virtual page",
      "A page table that maps addresses from highest to lowest index",
      "A page table stored in flash memory rather than RAM",
      "A table that maps disk sectors directly to CPU registers"
    ],
    "explanation": "Inverted page tables have entries corresponding to physical frames rather than virtual pages, saving massive space in 64-bit address spaces.",
    "numb": 142
  },
  {
    "id": "h3-os-1",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 3,
    "question": "How is the Priority Inversion problem solved in real-time operating systems?",
    "answer": "Priority Inheritance Protocol",
    "options": [
      "Priority Inheritance Protocol",
      "Round Robin Time Slicing",
      "Disabling all interrupts permanently",
      "Dropping lower priority tasks immediately"
    ],
    "explanation": "Priority Inheritance temporarily raises the priority of a low-priority task holding a lock to the priority of the highest-priority waiting task.",
    "numb": 143
  },
  {
    "id": "h3-os-2",
    "category": "Operating Systems",
    "difficulty": "hard",
    "stage": 3,
    "question": "In Linux high-performance I/O multiplexing, what is the key difference between epoll edge-triggered (EPOLLET) and level-triggered modes?",
    "answer": "Edge-triggered notifies only on state transitions, requiring non-blocking drained reads",
    "options": [
      "Edge-triggered notifies only on state transitions, requiring non-blocking drained reads",
      "Level-triggered closes socket connections automatically after one read",
      "Edge-triggered copies all kernel memory directly into user space",
      "Level-triggered requires root user permissions to bind sockets"
    ],
    "explanation": "EPOLLET delivers an event only when new data arrives or changes state, requiring callers to loop reading with non-blocking sockets until EAGAIN.",
    "numb": 144
  },
  {
    "id": "e1-cn-1",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 1,
    "question": "How many layers are defined in the standard ISO/OSI Reference Model?",
    "answer": "7",
    "options": [
      "4",
      "5",
      "7",
      "9"
    ],
    "explanation": "The OSI model consists of 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
    "numb": 145
  },
  {
    "id": "e1-cn-2",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 1,
    "question": "What does IP stand for in the TCP/IP networking suite?",
    "answer": "Internet Protocol",
    "options": [
      "Internet Protocol",
      "Internal Packet",
      "Interface Port",
      "Interconnect Program"
    ],
    "explanation": "IP stands for Internet Protocol, responsible for addressing and routing packets across network boundaries.",
    "numb": 146
  },
  {
    "id": "e2-cn-1",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 2,
    "question": "Which layer of the OSI model does a standard Ethernet Switch operate at?",
    "answer": "Data Link Layer (Layer 2)",
    "options": [
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Physical Layer (Layer 1)",
      "Transport Layer (Layer 4)"
    ],
    "explanation": "Standard network switches operate at Layer 2 (Data Link Layer) using MAC addresses to forward Ethernet frames.",
    "numb": 147
  },
  {
    "id": "e2-cn-2",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the standard default port number for HTTPS (HTTP Secure) traffic?",
    "answer": "443",
    "options": [
      "80",
      "443",
      "8080",
      "22"
    ],
    "explanation": "Port 80 is used for unencrypted HTTP, while Port 443 is the standard default for encrypted HTTPS traffic.",
    "numb": 148
  },
  {
    "id": "e3-cn-1",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the primary role of DNS (Domain Name System)?",
    "answer": "Translates human-readable domain names into numeric IP addresses",
    "options": [
      "Translates human-readable domain names into numeric IP addresses",
      "Assigns dynamic MAC addresses to network interfaces",
      "Encrypts sensitive credit card numbers during checkout",
      "Compresses video streams for faster streaming"
    ],
    "explanation": "DNS serves as the phonebook of the Internet, resolving domain names (e.g. google.com) to IP addresses (e.g. 142.250.190.46).",
    "numb": 149
  },
  {
    "id": "e3-cn-2",
    "category": "Computer Networks",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which Transport Layer protocol is connectionless and does not guarantee packet delivery or order?",
    "answer": "UDP (User Datagram Protocol)",
    "options": [
      "UDP (User Datagram Protocol)",
      "TCP (Transmission Control Protocol)",
      "BGP",
      "SCTP"
    ],
    "explanation": "UDP sends datagrams without establishing a handshake or retransmitting lost packets, optimizing for low latency.",
    "numb": 150
  },
  {
    "id": "m1-cn-1",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the correct 3-way handshake sequence used by TCP to establish a reliable connection?",
    "answer": "SYN -> SYN-ACK -> ACK",
    "options": [
      "SYN -> SYN-ACK -> ACK",
      "ACK -> SYN -> SYN-ACK",
      "HELLO -> ACK -> CONNECT",
      "SYN -> ACK -> DATA"
    ],
    "explanation": "Client sends SYN; Server responds with SYN-ACK; Client sends ACK. The connection is then established.",
    "numb": 151
  },
  {
    "id": "m1-cn-2",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the standard dotted-decimal Subnet Mask for a /24 IPv4 CIDR prefix?",
    "answer": "255.255.255.0",
    "options": [
      "255.255.255.0",
      "255.255.0.0",
      "255.255.255.128",
      "255.255.255.255"
    ],
    "explanation": "A /24 prefix has 24 leading ones in binary (11111111.11111111.11111111.00000000), which equals 255.255.255.0.",
    "numb": 152
  },
  {
    "id": "m2-cn-1",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 2,
    "question": "Which protocol resolves a local IPv4 address to its physical hardware MAC address?",
    "answer": "ARP (Address Resolution Protocol)",
    "options": [
      "ARP (Address Resolution Protocol)",
      "DHCP",
      "DNS",
      "ICMP"
    ],
    "explanation": "ARP broadcasts a query asking 'Who has this IP?', and the corresponding host replies with its physical MAC address.",
    "numb": 153
  },
  {
    "id": "m2-cn-2",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the primary function of the Time to Live (TTL) field in an IPv4 packet header?",
    "answer": "Prevents packets from circulating indefinitely in routing loops",
    "options": [
      "Prevents packets from circulating indefinitely in routing loops",
      "Measures latency between source and destination",
      "Times out inactive TCP connections",
      "Guarantees delivery before a timestamp expires"
    ],
    "explanation": "Every router decrements TTL by 1; if TTL reaches 0, the packet is dropped and an ICMP Time Exceeded message is sent back.",
    "numb": 154
  },
  {
    "id": "m3-cn-1",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which routing protocol is the standard Exterior Gateway Protocol (EGP) used to exchange routing info between Autonomous Systems across the Internet?",
    "answer": "BGP (Border Gateway Protocol)",
    "options": [
      "BGP (Border Gateway Protocol)",
      "OSPF",
      "RIP",
      "EIGRP"
    ],
    "explanation": "BGP is a path-vector protocol that manages how packets are routed across large autonomous systems comprising the global Internet.",
    "numb": 155
  },
  {
    "id": "m3-cn-2",
    "category": "Computer Networks",
    "difficulty": "medium",
    "stage": 3,
    "question": "How does TCP Flow Control differ from TCP Congestion Control?",
    "answer": "Flow Control protects the receiver from being overwhelmed; Congestion Control protects the network from saturation",
    "options": [
      "Flow Control protects the receiver from being overwhelmed; Congestion Control protects the network from saturation",
      "Flow Control is for UDP; Congestion Control is for TCP",
      "Flow Control manages physical cabling; Congestion Control manages DNS lookups",
      "Flow Control encrypts payload; Congestion Control checks checksums"
    ],
    "explanation": "Flow Control uses the receiver's Advertised Window (`rwnd`), while Congestion Control dynamically regulates the sender's Congestion Window (`cwnd`).",
    "numb": 156
  },
  {
    "id": "h1-cn-1",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is Head-of-Line (HoL) blocking in HTTP/2 over TCP, and how does HTTP/3 solve it?",
    "answer": "TCP packet loss stalls all multiplexed streams; HTTP/3 uses QUIC over UDP with independent streams",
    "options": [
      "TCP packet loss stalls all multiplexed streams; HTTP/3 uses QUIC over UDP with independent streams",
      "HTTP/2 can only download 1 file at a time; HTTP/3 downloads 100",
      "DNS lookups block subsequent TCP handshakes",
      "Proxies cannot cache compressed HTTP headers"
    ],
    "explanation": "In HTTP/2 over TCP, a single lost packet halts all streams on that TCP connection. QUIC runs over UDP so lost packets only delay their specific stream.",
    "numb": 157
  },
  {
    "id": "h1-cn-2",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 1,
    "question": "In TCP Congestion Control, what happens during the Slow Start phase upon receiving each duplicate-free ACK?",
    "answer": "The congestion window (cwnd) increases by 1 MSS, effectively doubling cwnd every RTT",
    "options": [
      "The congestion window (cwnd) increases by 1 MSS, effectively doubling cwnd every RTT",
      "The congestion window halves to prevent queue overflow",
      "The window size remains fixed until timeout",
      "Packets are rerouted through an alternate gateway"
    ],
    "explanation": "During Slow Start, cwnd increases by 1 Maximum Segment Size for every ACK received, resulting in exponential growth per Round Trip Time.",
    "numb": 158
  },
  {
    "id": "h2-cn-1",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 2,
    "question": "How many Round Trip Times (RTT) are required for a TLS 1.3 cryptographic handshake compared to TLS 1.2?",
    "answer": "TLS 1.3 requires 1-RTT (or 0-RTT with resumption), compared to 2-RTT in TLS 1.2",
    "options": [
      "TLS 1.3 requires 1-RTT (or 0-RTT with resumption), compared to 2-RTT in TLS 1.2",
      "TLS 1.3 requires 3-RTT for quantum resistance",
      "Both require exactly 2-RTT",
      "TLS 1.3 does not require handshakes"
    ],
    "explanation": "TLS 1.3 combines key exchange with the Hello message, cutting connection setup from 2-RTT down to 1-RTT (and 0-RTT for resumed sessions).",
    "numb": 159
  },
  {
    "id": "h2-cn-2",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is Anycast routing?",
    "answer": "Routing a single destination IP address to the topologically nearest of multiple distributed server nodes",
    "options": [
      "Routing a single destination IP address to the topologically nearest of multiple distributed server nodes",
      "Broadcasting packets to every connected machine on Earth",
      "Sending duplicate packets across all optical fiber paths",
      "Encrypting packets using rotating public keys"
    ],
    "explanation": "Anycast allows multiple physical endpoints to advertise the same IP via BGP, directing client traffic to the nearest instance for low latency and DDoS mitigation.",
    "numb": 160
  },
  {
    "id": "h3-cn-1",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 3,
    "question": "How do Distance-Vector routing protocols mitigate the Count-to-Infinity problem?",
    "answer": "Split Horizon with Poison Reverse and Hold-down timers",
    "options": [
      "Split Horizon with Poison Reverse and Hold-down timers",
      "Converting the graph to a minimum spanning tree using Prim's algorithm",
      "Flooding link states to every node every second",
      "Hashing node identifiers into distributed DHT rings"
    ],
    "explanation": "Split Horizon prevents advertising a route back on the interface it was learned from; Poison Reverse explicitly advertises infinity (16 hops).",
    "numb": 161
  },
  {
    "id": "h3-cn-2",
    "category": "Computer Networks",
    "difficulty": "hard",
    "stage": 3,
    "question": "How does Path MTU Discovery (PMTUD) find the maximum packet size without IP fragmentation?",
    "answer": "Sets the Don't Fragment (DF) flag in IP headers and listens for ICMP 'Fragmentation Needed' messages",
    "options": [
      "Sets the Don't Fragment (DF) flag in IP headers and listens for ICMP 'Fragmentation Needed' messages",
      "Probes routers by sending ARP requests with varying payload sizes",
      "Uses DNS TXT records to query router interface MTUs",
      "Calculates MTU from round-trip ping time delays"
    ],
    "explanation": "When a packet with DF=1 hits a link with smaller MTU, the router drops it and replies with ICMP Type 3 Code 4 specifying its link MTU.",
    "numb": 162
  },
  {
    "id": "e1-java-1",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which pillar of Object-Oriented Programming binds data and methods together while hiding internal details?",
    "answer": "Encapsulation",
    "options": [
      "Encapsulation",
      "Polymorphism",
      "Inheritance",
      "Compilation"
    ],
    "explanation": "Encapsulation restricts direct access to object fields (e.g. using private fields with getters/setters).",
    "numb": 163
  },
  {
    "id": "e1-java-2",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which keyword is used in Java to establish inheritance between two classes?",
    "answer": "extends",
    "options": [
      "extends",
      "implements",
      "inherits",
      "subclass"
    ],
    "explanation": "In Java, a class uses `extends` to inherit state and behavior from a superclass.",
    "numb": 164
  },
  {
    "id": "e2-java-1",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the primary difference between Method Overloading and Method Overriding?",
    "answer": "Overloading defines methods with the same name but different parameters; Overriding redefines a superclass method in a subclass",
    "options": [
      "Overloading defines methods with the same name but different parameters; Overriding redefines a superclass method in a subclass",
      "Overloading is for static methods; Overriding is for constructors",
      "Overloading happens at runtime; Overriding happens at compile time",
      "There is no difference in Java"
    ],
    "explanation": "Overloading is compile-time polymorphism (differing signatures); Overriding is runtime polymorphism (replacing implementation).",
    "numb": 165
  },
  {
    "id": "e2-java-2",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 2,
    "question": "In Java, which keyword applied to a class prevents it from being subclassed (inherited)?",
    "answer": "final",
    "options": [
      "final",
      "static",
      "sealed",
      "const"
    ],
    "explanation": "A `final` class cannot be extended by any other class (for example, `java.lang.String` is final).",
    "numb": 166
  },
  {
    "id": "e3-java-1",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 3,
    "question": "Can an abstract class in Java have constructors and concrete method implementations?",
    "answer": "Yes, abstract classes can have constructors and fully implemented concrete methods",
    "options": [
      "Yes, abstract classes can have constructors and fully implemented concrete methods",
      "No, abstract classes can only contain method signatures without bodies",
      "No, abstract classes cannot have constructors",
      "Only if marked static"
    ],
    "explanation": "Abstract classes in Java can have constructors (called via `super()`) as well as concrete methods.",
    "numb": 167
  },
  {
    "id": "e3-java-2",
    "category": "Java & OOP",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is the ultimate root superclass of every class hierarchy in Java?",
    "answer": "java.lang.Object",
    "options": [
      "java.lang.Object",
      "java.lang.Class",
      "java.lang.Root",
      "java.lang.System"
    ],
    "explanation": "Every class in Java implicitly inherits from `java.lang.Object`, which provides methods like `equals()`, `hashCode()`, and `toString()`.",
    "numb": 168
  },
  {
    "id": "m1-java-1",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the difference between `==` and `.equals()` when comparing two objects in Java?",
    "codeSnippet": "String s1 = new String(\"hello\");\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));",
    "answer": "`==` checks reference memory addresses; `.equals()` checks logical value equality",
    "options": [
      "`==` checks reference memory addresses; `.equals()` checks logical value equality",
      "`==` checks logical value equality; `.equals()` checks memory addresses",
      "Both perform identical value comparisons in Java",
      "`==` works only for integers and booleans"
    ],
    "explanation": "`==` checks if both references point to the exact same heap memory address, whereas `.equals()` tests semantic content equivalence.",
    "numb": 169
  },
  {
    "id": "m1-java-2",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which interface must a Java class implement to define its natural ordering for `Collections.sort()` without an external comparator?",
    "answer": "Comparable<T>",
    "options": [
      "Comparable<T>",
      "Comparator<T>",
      "Sortable<T>",
      "Orderable<T>"
    ],
    "explanation": "Implementing `Comparable<T>` requires writing `compareTo(T o)`, providing natural sorting order for lists and tree sets.",
    "numb": 170
  },
  {
    "id": "m2-java-1",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the 'Diamond Problem' in OOP, and how does Java avoid it for classes?",
    "answer": "Ambiguity when inheriting from multiple classes with identical methods; avoided by prohibiting multiple class inheritance",
    "options": [
      "Ambiguity when inheriting from multiple classes with identical methods; avoided by prohibiting multiple class inheritance",
      "Memory corruption during multiple constructor calls; avoided by garbage collection",
      "Performance overhead of vtables; avoided by JIT compilation",
      "Infinite loops in recursion; avoided by tail-call optimization"
    ],
    "explanation": "Java disallows extending multiple classes to eliminate the diamond ambiguity, allowing multiple inheritance of type via interfaces instead.",
    "numb": 171
  },
  {
    "id": "m2-java-2",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the difference between `StringBuilder` and `StringBuffer` in Java?",
    "answer": "`StringBuffer` is thread-safe and synchronized; `StringBuilder` is unsynchronized and faster",
    "options": [
      "`StringBuffer` is thread-safe and synchronized; `StringBuilder` is unsynchronized and faster",
      "`StringBuilder` is immutable; `StringBuffer` is mutable",
      "`StringBuilder` is for files; `StringBuffer` is for network streams",
      "`StringBuffer` is deprecated in Java 17"
    ],
    "explanation": "`StringBuffer` has synchronized methods for thread safety, whereas `StringBuilder` drops synchronization for higher single-threaded speed.",
    "numb": 172
  },
  {
    "id": "m3-java-1",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the mandatory contract between `equals()` and `hashCode()` in Java?",
    "answer": "If two objects are equal according to `equals()`, their `hashCode()` values MUST be equal",
    "options": [
      "If two objects are equal according to `equals()`, their `hashCode()` values MUST be equal",
      "If two objects have the same `hashCode()`, they MUST be equal according to `equals()`",
      "`hashCode()` must return the physical memory address of the object",
      "`equals()` cannot be overridden without making the class final"
    ],
    "explanation": "Hash-based collections (HashMap, HashSet) require that equal objects produce identical hash codes to land in the same bucket.",
    "numb": 173
  },
  {
    "id": "m3-java-2",
    "category": "Java & OOP",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the primary role of the Java Virtual Machine (JVM) Garbage Collector?",
    "answer": "Automatically reclaiming heap memory allocated to unreachable objects",
    "options": [
      "Automatically reclaiming heap memory allocated to unreachable objects",
      "Defragmenting physical hard drive partitions",
      "Terminating hung background network threads",
      "Compiling Java bytecode into native machine code"
    ],
    "explanation": "The GC tracks object reachability from GC roots (threads, static variables, local stack frames), automatically freeing unreferenced heap memory.",
    "numb": 174
  },
  {
    "id": "h1-java-1",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 1,
    "question": "What guarantees does declaring a variable `volatile` provide in the Java Memory Model (JMM)?",
    "answer": "Guarantees memory visibility across threads and prevents instruction reordering around reads/writes",
    "options": [
      "Guarantees memory visibility across threads and prevents instruction reordering around reads/writes",
      "Makes compound operations like `i++` completely atomic",
      "Locks the variable with an OS-level mutex on every access",
      "Stores the variable in CPU L1 cache exclusively"
    ],
    "explanation": "Volatile establishes a happens-before relationship ensuring writes are immediately flushed to main memory and visible to other threads, but does not provide mutual exclusion.",
    "numb": 175
  },
  {
    "id": "h1-java-2",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 1,
    "question": "How does Java implement Generics without breaking backward compatibility with legacy bytecode?",
    "answer": "Type Erasure at compile time, replacing generic types with raw Object or upper bounds",
    "options": [
      "Type Erasure at compile time, replacing generic types with raw Object or upper bounds",
      "Generating separate class files for every specialized type parameter (like C++ templates)",
      "Using dynamic runtime reflection on every method call",
      "Boxing all primitives into byte arrays"
    ],
    "explanation": "Java Generics use Type Erasure: compiler enforces types and inserts synthetic casts, then strips generic type signatures for compatibility.",
    "numb": 176
  },
  {
    "id": "h2-java-1",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 2,
    "question": "How does `ConcurrentHashMap` achieve thread-safe scalability without locking the entire table in Java 8+?",
    "answer": "Synchronizes on individual bucket head nodes and uses Lock-Free Compare-And-Swap (CAS) for empty bins",
    "options": [
      "Synchronizes on individual bucket head nodes and uses Lock-Free Compare-And-Swap (CAS) for empty bins",
      "Uses a global ReentrantReadWriteLock across all buckets",
      "Clones the entire hash table into a thread-local copy on every write",
      "Routes writes through a single background worker thread"
    ],
    "explanation": "Java 8+ ConcurrentHashMap eliminates segment locks, using CAS to insert into empty bins and fine-grained synchronizing only on the first node of colliding chains/trees.",
    "numb": 177
  },
  {
    "id": "h2-java-2",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the difference between a `WeakReference` and a `SoftReference` in Java memory management?",
    "answer": "`WeakReference` is collected on the next GC run; `SoftReference` is collected only when memory is low before OutOfMemoryError",
    "options": [
      "`WeakReference` is collected on the next GC run; `SoftReference` is collected only when memory is low before OutOfMemoryError",
      "`SoftReference` is collected on next GC; `WeakReference` is never collected",
      "`WeakReference` is for native C++ memory; `SoftReference` is for heap objects",
      "`SoftReference` can only reference primitive types"
    ],
    "explanation": "SoftReferences are cleared eagerly by the JVM only when memory demand is critical (ideal for memory-sensitive caches); WeakReferences are collected promptly.",
    "numb": 178
  },
  {
    "id": "h3-java-1",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 3,
    "question": "Why must the singleton instance field be declared `volatile` in the Double-Checked Locking pattern in Java?",
    "codeSnippet": "public class Singleton {\n    private static volatile Singleton instance;\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) instance = new Singleton();\n            }\n        }\n        return instance;\n    }\n}",
    "answer": "Prevents observing a partially constructed object due to CPU instruction reordering during `new`",
    "options": [
      "Prevents observing a partially constructed object due to CPU instruction reordering during `new`",
      "Prevents multiple ClassLoaders from creating duplicates",
      "Enables Java serialization of the singleton instance",
      "Forces constructor execution on the main UI thread"
    ],
    "explanation": "`new Singleton()` involves allocation, constructor invocation, and pointer assignment. Without `volatile`, reordering can assign the pointer before initialization finishes.",
    "numb": 179
  },
  {
    "id": "h3-java-2",
    "category": "Java & OOP",
    "difficulty": "hard",
    "stage": 3,
    "question": "In the JVM G1 Garbage Collector, how are 'Humongous Objects' managed?",
    "answer": "Allocated directly into contiguous regions in Old Generation when size exceeds 50% of G1 region size",
    "options": [
      "Allocated directly into contiguous regions in Old Generation when size exceeds 50% of G1 region size",
      "Stored in off-heap DirectByteBuffer memory outside GC control",
      "Split into 1KB fragments distributed across Eden spaces",
      "Compressed using LZ4 before allocation"
    ],
    "explanation": "G1 treats objects larger than half a region size as Humongous, placing them in contiguous sequences of regions in Old Generation to avoid copying overhead.",
    "numb": 180
  },
  {
    "id": "e1-c-1",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which operator is used to obtain the memory address of a variable in C and C++?",
    "answer": "Address-of operator (&)",
    "options": [
      "Address-of operator (&)",
      "Dereference operator (*)",
      "Arrow operator (->)",
      "Scope resolution (::)"
    ],
    "explanation": "The ampersand `&` yields the memory address of an lvalue variable in C/C++.",
    "numb": 181
  },
  {
    "id": "e1-c-2",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which C standard library function is used to allocate dynamic memory on the heap?",
    "answer": "malloc()",
    "options": [
      "malloc()",
      "alloc()",
      "new()",
      "create()"
    ],
    "explanation": "`malloc(size_t size)` allocates the requested number of uninitialized bytes on the heap, returning a `void*` pointer.",
    "numb": 182
  },
  {
    "id": "e2-c-1",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is a Pointer variable in C/C++?",
    "answer": "A variable that stores the memory address of another variable",
    "options": [
      "A variable that stores the memory address of another variable",
      "A variable that only stores decimal fractions",
      "A special function that terminates the program",
      "A hardware register on the graphics card"
    ],
    "explanation": "A pointer holds the memory location (address) of data rather than holding the data directly.",
    "numb": 183
  },
  {
    "id": "e2-c-2",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is guaranteed to be the size of `char` in bytes by standard C and C++ specifications?",
    "answer": "1",
    "options": [
      "1",
      "2",
      "4",
      "Implementation defined"
    ],
    "explanation": "By definition, `sizeof(char)` is always exactly 1 in both standard C and C++.",
    "numb": 184
  },
  {
    "id": "e3-c-1",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 3,
    "question": "What causes a Segmentation Fault (SIGSEGV) in a C or C++ program?",
    "answer": "Attempting to access unauthorized, unmapped, or read-only memory",
    "options": [
      "Attempting to access unauthorized, unmapped, or read-only memory",
      "Writing to a local integer variable twice",
      "Using recursion deeper than 5 iterations",
      "Passing a float argument to a function expecting a double"
    ],
    "explanation": "A segmentation fault occurs when the hardware memory management unit (MMU) traps an illegal memory access (e.g. dereferencing a NULL or wild pointer).",
    "numb": 185
  },
  {
    "id": "e3-c-2",
    "category": "C / C++",
    "difficulty": "easy",
    "stage": 3,
    "question": "In C++, how do you allocate dynamic heap memory for an object and execute its constructor?",
    "answer": "The `new` operator",
    "options": [
      "The `new` operator",
      "malloc()",
      "calloc()",
      "realloc()"
    ],
    "explanation": "In C++, `new Type()` allocates appropriate heap memory and invokes the object constructor, unlike `malloc()` which only allocates raw bytes.",
    "numb": 186
  },
  {
    "id": "m1-c-1",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is a key difference between a Reference and a Pointer in C++?",
    "answer": "References cannot be null and cannot be reseated to bind to another variable after initialization",
    "options": [
      "References cannot be null and cannot be reseated to bind to another variable after initialization",
      "Pointers require zero memory overhead; references require 64 bytes",
      "References can point to any arbitrary memory address without type checking",
      "Pointers cannot be used as function arguments"
    ],
    "explanation": "A reference acts as an immutable alias for an existing object; it must be initialized when created, cannot be NULL, and cannot change what it refers to.",
    "numb": 187
  },
  {
    "id": "m1-c-2",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is a Memory Leak in C/C++?",
    "answer": "Allocating heap memory that is never deallocated and loses all reference pointers",
    "options": [
      "Allocating heap memory that is never deallocated and loses all reference pointers",
      "Reading past the boundary of a stack array",
      "Overwriting CPU instruction cache",
      "Dividing an integer by zero"
    ],
    "explanation": "Failing to release heap memory using `free()` or `delete` when pointers go out of scope causes memory leaks, consuming RAM indefinitely.",
    "numb": 188
  },
  {
    "id": "m2-c-1",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the core idea of RAII (Resource Acquisition Is Initialization) in C++?",
    "answer": "Tying resource lifetime (memory, file handles, locks) to object scope and lifetime via constructors/destructors",
    "options": [
      "Tying resource lifetime (memory, file handles, locks) to object scope and lifetime via constructors/destructors",
      "Initializing all variables to zero in global memory",
      "Allocating all variables on the CPU register bank at boot",
      "Compiling programs ahead of time into bytecode"
    ],
    "explanation": "RAII acquires resources in an object's constructor and guarantees their release in the destructor when the object leaves scope, even during exceptions.",
    "numb": 189
  },
  {
    "id": "m2-c-2",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 2,
    "question": "What does marking a base class member function `virtual` enable in C++?",
    "answer": "Dynamic dispatch (runtime polymorphism) via virtual method tables (vtables)",
    "options": [
      "Dynamic dispatch (runtime polymorphism) via virtual method tables (vtables)",
      "Inlines the function code into every call site",
      "Allows the function to be called without an object instance",
      "Forces execution on a separate thread pool"
    ],
    "explanation": "Virtual functions permit derived class implementations to be called through base class pointers or references via runtime vtable lookup.",
    "numb": 190
  },
  {
    "id": "m3-c-1",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the primary difference between `std::unique_ptr` and `std::shared_ptr` in modern C++?",
    "answer": "`unique_ptr` enforces exclusive ownership; `shared_ptr` enables shared ownership via reference counting",
    "options": [
      "`unique_ptr` enforces exclusive ownership; `shared_ptr` enables shared ownership via reference counting",
      "`shared_ptr` requires manual deletion; `unique_ptr` is managed by garbage collection",
      "`unique_ptr` can only store primitive integers",
      "`shared_ptr` cannot be passed between functions"
    ],
    "explanation": "`std::unique_ptr` cannot be copied (only moved) with zero overhead; `std::shared_ptr` maintains a thread-safe control block reference count.",
    "numb": 191
  },
  {
    "id": "m3-c-2",
    "category": "C / C++",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is a Dangling Pointer in C/C++?",
    "answer": "A pointer that continues to reference a memory address that has already been freed or destroyed",
    "options": [
      "A pointer that continues to reference a memory address that has already been freed or destroyed",
      "A pointer initialized explicitly to NULL or nullptr",
      "A pointer stored inside a circular linked list",
      "A pointer passed into an inline assembly function"
    ],
    "explanation": "Dereferencing a dangling pointer leads to undefined behavior because the underlying memory has been recycled or reclaimed.",
    "numb": 192
  },
  {
    "id": "h1-c-1",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 1,
    "question": "How does the C++ runtime implement dynamic dispatch for classes containing virtual functions?",
    "answer": "Compiler generates a Virtual Method Table (vtable) per class and injects a vptr into each object instance",
    "options": [
      "Compiler generates a Virtual Method Table (vtable) per class and injects a vptr into each object instance",
      "Interprets function names using a hash table string lookup at each call site",
      "Duplicates class bytecode for each instantiated object",
      "Scans the call stack backwards to locate the derived method"
    ],
    "explanation": "Each polymorphic class has a static vtable of function pointers; each instance carries a hidden `vptr` pointing to its class's vtable.",
    "numb": 193
  },
  {
    "id": "h1-c-2",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 1,
    "question": "What does `std::move` actually do in C++11 and later?",
    "codeSnippet": "std::string a = \"data\";\nstd::string b = std::move(a);",
    "answer": "It unconditionally casts an expression to an rvalue reference (`T&&`), enabling move constructors",
    "options": [
      "It unconditionally casts an expression to an rvalue reference (`T&&`), enabling move constructors",
      "It copies memory bytes directly from source to destination at hardware level",
      "It clears the source variable from CPU cache lines",
      "It creates an asynchronous background task to transfer variables"
    ],
    "explanation": "`std::move` performs no runtime byte copying; it is purely a compile-time static_cast to an rvalue reference allowing ownership transfer.",
    "numb": 194
  },
  {
    "id": "h2-c-1",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the 'Rule of Five' in modern C++ when a class manages a raw resource?",
    "answer": "Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment",
    "options": [
      "Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment",
      "Constructor, Destructor, Virtual Method, Template, Allocator",
      "New, Delete, Malloc, Free, Realloc",
      "Private, Protected, Public, Friend, Static"
    ],
    "explanation": "If you need to define any of the special member functions handling resource management, you likely need to define all 5.",
    "numb": 195
  },
  {
    "id": "h2-c-2",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is Undefined Behavior (UB) in C and C++?",
    "answer": "The language specification places no requirements on the compiler or runtime, allowing optimizations that assume UB never occurs",
    "options": [
      "The language specification places no requirements on the compiler or runtime, allowing optimizations that assume UB never occurs",
      "The program is guaranteed to print an error message and exit cleanly",
      "The compiler halts compilation immediately with an error",
      "The program switches automatically to safe interpreted mode"
    ],
    "explanation": "Undefined behavior (e.g. signed integer overflow, null pointer dereference) frees the compiler from constraints, potentially deleting code branches or causing silent errors.",
    "numb": 196
  },
  {
    "id": "h3-c-1",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is SFINAE (Substitution Failure Is Not An Error) in C++ template metaprogramming?",
    "answer": "When a substituted type fails in a template specialization signature, the compiler discards the overload without erroring",
    "options": [
      "When a substituted type fails in a template specialization signature, the compiler discards the overload without erroring",
      "Template compilation errors are silently logged to an external crash file",
      "Memory allocations in templates fall back to global malloc",
      "Template arguments are cast to void* if type deduction fails"
    ],
    "explanation": "SFINAE allows compile-time feature detection and overload resolution filtering (e.g. via `std::enable_if` or C++20 concepts).",
    "numb": 197
  },
  {
    "id": "h3-c-2",
    "category": "C / C++",
    "difficulty": "hard",
    "stage": 3,
    "question": "In C++ memory orderings, what synchronization guarantee does `std::memory_order_release` paired with `std::memory_order_acquire` provide?",
    "answer": "All memory writes before the release write in Thread A become visible to Thread B after its acquire read",
    "options": [
      "All memory writes before the release write in Thread A become visible to Thread B after its acquire read",
      "Enforces strict sequential consistency across all threads in the system",
      "Acquires a kernel-level hardware lock on the CPU bus",
      "Clears all dirty CPU cache lines across all cores simultaneously"
    ],
    "explanation": "Acquire-Release semantics synchronize threads without global sequential consistency locks, establishing a one-way synchronization barrier between producer and consumer.",
    "numb": 198
  },
  {
    "id": "e1-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 1,
    "question": "What fundamental law states that current through a conductor between two points is directly proportional to voltage across the points (V = I * R)?",
    "answer": "Ohm's Law",
    "options": [
      "Ohm's Law",
      "Faraday's Law",
      "Ampere's Law",
      "Coulomb's Law"
    ],
    "explanation": "Ohm's Law establishes that current I is proportional to potential difference V and inversely proportional to resistance R.",
    "numb": 199
  },
  {
    "id": "e1-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 1,
    "question": "Which electronic component stores electrical energy in an electric field between two conductive plates?",
    "answer": "Capacitor",
    "options": [
      "Capacitor",
      "Inductor",
      "Resistor",
      "Diode"
    ],
    "explanation": "A capacitor stores potential electrical energy electrostatically in an electric field across its dielectric medium.",
    "numb": 200
  },
  {
    "id": "e2-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 2,
    "question": "Which semiconductor component allows current to flow in primarily only one direction?",
    "answer": "Diode",
    "options": [
      "Diode",
      "Resistor",
      "Transformer",
      "Capacitor"
    ],
    "explanation": "A diode has low resistance in forward bias and very high resistance in reverse bias, acting as a one-way electrical valve.",
    "numb": 201
  },
  {
    "id": "e2-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is the standard unit of electrical capacitance?",
    "answer": "Farad (F)",
    "options": [
      "Farad (F)",
      "Henry (H)",
      "Ohm (Ω)",
      "Tesla (T)"
    ],
    "explanation": "Capacitance is measured in Farads (F), named after Michael Faraday, though microfarads (µF) and picofarads (pF) are common in practice.",
    "numb": 202
  },
  {
    "id": "e3-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which logic gate outputs TRUE (1) only when all of its input signals are TRUE (1)?",
    "answer": "AND Gate",
    "options": [
      "AND Gate",
      "OR Gate",
      "XOR Gate",
      "NOT Gate"
    ],
    "explanation": "An AND gate outputs 1 only when every one of its inputs is high (1).",
    "numb": 203
  },
  {
    "id": "e3-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "easy",
    "stage": 3,
    "question": "According to Kirchhoff's Current Law (KCL), what is the algebraic sum of currents entering any electrical circuit junction (node)?",
    "answer": "Zero",
    "options": [
      "Zero",
      "Equal to the supply voltage",
      "Infinite",
      "Dependent on wire gauge"
    ],
    "explanation": "KCL states that charge cannot accumulate at a node; hence total current entering must equal total current leaving (sum = 0).",
    "numb": 204
  },
  {
    "id": "m1-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 1,
    "question": "What type of transistor uses an electric field applied to an insulated gate terminal to modulate conductivity between source and drain?",
    "answer": "MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor)",
    "options": [
      "MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor)",
      "BJT (Bipolar Junction Transistor)",
      "SCR (Silicon Controlled Rectifier)",
      "TRIAC"
    ],
    "explanation": "MOSFETs are voltage-controlled devices where voltage on an oxide-insulated gate controls current flow in the channel.",
    "numb": 205
  },
  {
    "id": "m1-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 1,
    "question": "Which combinational digital circuit selects one of several analog or digital input signals and forwards the selected input into a single output line?",
    "answer": "Multiplexer (MUX)",
    "options": [
      "Multiplexer (MUX)",
      "Demultiplexer (DEMUX)",
      "Decoder",
      "Encoder"
    ],
    "explanation": "A Multiplexer (MUX) acts as a multiple-input, single-output switch controlled by select lines.",
    "numb": 206
  },
  {
    "id": "m2-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 2,
    "question": "In an ideal Operational Amplifier (Op-Amp), what are the assumed input impedance and open-loop gain?",
    "answer": "Infinite input impedance and infinite open-loop gain",
    "options": [
      "Infinite input impedance and infinite open-loop gain",
      "Zero input impedance and zero open-loop gain",
      "50 Ohm input impedance and unity gain",
      "Infinite output impedance and zero input impedance"
    ],
    "explanation": "An ideal op-amp draws zero input current (infinite input impedance) and provides infinite differential voltage gain.",
    "numb": 207
  },
  {
    "id": "m2-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 2,
    "question": "What is the primary function of a Karnaugh Map (K-Map) in digital logic design?",
    "answer": "Simplifying Boolean algebraic expressions to minimize the required number of physical logic gates",
    "options": [
      "Simplifying Boolean algebraic expressions to minimize the required number of physical logic gates",
      "Measuring clock skew in synchronous digital circuits",
      "Converting AC voltage waveforms into regulated DC voltages",
      "Calculating heat dissipation in semiconductor junctions"
    ],
    "explanation": "K-Maps use Gray code geometric adjacency to visually combine minterms, yielding minimal Sum-of-Products or Product-of-Sums Boolean forms.",
    "numb": 208
  },
  {
    "id": "m3-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 3,
    "question": "What sequential logic memory circuit stores a single bit of state and updates only on the rising or falling edge of a clock pulse?",
    "answer": "Flip-Flop",
    "options": [
      "Flip-Flop",
      "Latch",
      "Multiplexer",
      "Half Adder"
    ],
    "explanation": "While latches are level-triggered, flip-flops are edge-triggered bistable multivibrators storing 1 bit of data synchronously.",
    "numb": 209
  },
  {
    "id": "m3-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "medium",
    "stage": 3,
    "question": "According to Nyquist's Sampling Theorem, what is the minimum sampling frequency required to perfectly reconstruct a bandlimited signal with highest frequency f_max?",
    "answer": "2 * f_max",
    "options": [
      "2 * f_max",
      "f_max / 2",
      "4 * f_max",
      "f_max^2"
    ],
    "explanation": "The Nyquist rate requires sampling at strictly greater than twice the highest frequency component (2 * f_max) to prevent aliasing.",
    "numb": 210
  },
  {
    "id": "h1-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 1,
    "question": "In CMOS (Complementary Metal-Oxide-Semiconductor) digital design, why is static power dissipation nearly zero?",
    "answer": "NMOS and PMOS transistors are arranged in complementary pairs so one network is always OFF in steady state",
    "options": [
      "NMOS and PMOS transistors are arranged in complementary pairs so one network is always OFF in steady state",
      "CMOS gates operate purely using optical photon transitions",
      "Capacitors discharge through zero-resistance superconducting paths",
      "Static current is redirected directly to the ground plane without dissipation"
    ],
    "explanation": "In CMOS logic, the pull-up (PMOS) and pull-down (NMOS) networks never conduct simultaneously in static states, drawing current only during switching.",
    "numb": 211
  },
  {
    "id": "h1-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 1,
    "question": "What causes the 'Metastability' hazard in digital clocked registers and flip-flops?",
    "answer": "Violating setup time (t_setup) or hold time (t_hold) requirements on data transitions relative to clock edges",
    "options": [
      "Violating setup time (t_setup) or hold time (t_hold) requirements on data transitions relative to clock edges",
      "Overdriving the VDD power supply by more than 10%",
      "Using open-collector outputs without pull-up resistors",
      "Connecting more than 8 fan-out loads to an inverter"
    ],
    "explanation": "When data changes within the setup or hold aperture around a clock edge, the internal bistable latch can linger indefinitely in an undefined voltage state.",
    "numb": 212
  },
  {
    "id": "h2-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 2,
    "question": "What is the primary role of a Phase-Locked Loop (PLL) in high-speed microprocessors and communication SoCs?",
    "answer": "Generating on-chip high-frequency clock signals phase-aligned to a stable low-frequency crystal reference",
    "options": [
      "Generating on-chip high-frequency clock signals phase-aligned to a stable low-frequency crystal reference",
      "Suppressing electromagnetic interference in power delivery networks",
      "Converting single-ended serial signals into differential ECL logic",
      "Discharging electrostatic discharge (ESD) spikes to chassis ground"
    ],
    "explanation": "A PLL uses a phase detector, charge pump, loop filter, and VCO to synthesize multi-GHz clocks lock-stepped to a 25-50 MHz crystal.",
    "numb": 213
  },
  {
    "id": "h2-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 2,
    "question": "What frequency-domain transformation converts continuous-time linear differential equations into algebraic equations in complex frequency s = sigma + j*omega?",
    "answer": "Laplace Transform",
    "options": [
      "Laplace Transform",
      "Z-Transform",
      "Fast Fourier Transform (FFT)",
      "Wavelet Transform"
    ],
    "explanation": "The bilateral Laplace transform maps continuous-time differential operations d/dt to multiplication by complex frequency variable s.",
    "numb": 214
  },
  {
    "id": "h3-eee-1",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 3,
    "question": "What high-frequency transmission line phenomenon causes signal reflections when trace characteristic impedance (Z0) does not match termination impedance (ZL)?",
    "answer": "Impedance Mismatch with reflection coefficient Gamma = (ZL - Z0) / (ZL + Z0)",
    "options": [
      "Impedance Mismatch with reflection coefficient Gamma = (ZL - Z0) / (ZL + Z0)",
      "Skin Depth attenuation causing capacitive leakage",
      "Magnetic hysteresis saturation of PCB FR-4 dielectric",
      "Thermal Johnson-Nyquist noise modulation"
    ],
    "explanation": "When ZL != Z0, the voltage wave cannot be fully absorbed at the load, reflecting an echo back towards the source that causes ringing and false switching.",
    "numb": 215
  },
  {
    "id": "h3-eee-2",
    "category": "Electrical & Electronics",
    "difficulty": "hard",
    "stage": 3,
    "question": "In control systems engineering, what condition guarantees stability according to the Routh-Hurwitz criterion?",
    "answer": "All coefficients in the first column of the Routh array must have the same sign (no sign changes)",
    "options": [
      "All coefficients in the first column of the Routh array must have the same sign (no sign changes)",
      "The determinant of the system matrix must equal zero",
      "The phase margin must be negative",
      "Open-loop poles must be situated in the right half of the s-plane"
    ],
    "explanation": "The number of sign changes in the first column of the Routh array equals the number of roots in the unstable Right-Half s-Plane (RHP); zero changes implies stability.",
    "numb": 216
  },
  {
    "id": "e1-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 1,
    "question": "What does the First Law of Thermodynamics state?",
    "answer": "Energy cannot be created or destroyed, only transformed from one form to another",
    "options": [
      "Energy cannot be created or destroyed, only transformed from one form to another",
      "The entropy of an isolated system always increases over time",
      "Absolute zero temperature can never be attained by any finite procedure",
      "Heat naturally flows from colder bodies to hotter bodies"
    ],
    "explanation": "The First Law of Thermodynamics is the law of conservation of energy (delta U = Q - W).",
    "numb": 217
  },
  {
    "id": "e1-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 1,
    "question": "What physical property is defined as the force applied perpendicular to the surface of an object per unit area (P = F / A)?",
    "answer": "Pressure",
    "options": [
      "Pressure",
      "Torque",
      "Viscosity",
      "Momentum"
    ],
    "explanation": "Pressure is defined as force per unit surface area, measured in Pascals (N/m^2) or PSI.",
    "numb": 218
  },
  {
    "id": "e2-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 2,
    "question": "What is Hooke's Law in linear elasticity?",
    "answer": "Stress is directly proportional to strain within the proportional elastic limit",
    "options": [
      "Stress is directly proportional to strain within the proportional elastic limit",
      "Strain increases exponentially with applied shear force",
      "Fluid pressure decreases as flow velocity increases",
      "Frictional resistance is independent of normal load"
    ],
    "explanation": "Hooke's Law states sigma = E * epsilon, where E is Young's Modulus of Elasticity.",
    "numb": 219
  },
  {
    "id": "e2-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 2,
    "question": "What fluid property measures a fluid's internal resistance to flow and deformation?",
    "answer": "Viscosity",
    "options": [
      "Viscosity",
      "Surface Tension",
      "Specific Gravity",
      "Buoyancy"
    ],
    "explanation": "Viscosity represents internal friction between adjacent fluid layers moving past each other at different velocities.",
    "numb": 220
  },
  {
    "id": "e3-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which ideal thermodynamic cycle has the highest possible theoretical efficiency operating between two thermal reservoirs?",
    "answer": "Carnot Cycle",
    "options": [
      "Carnot Cycle",
      "Otto Cycle",
      "Diesel Cycle",
      "Rankine Cycle"
    ],
    "explanation": "Nicolas Carnot proved that no heat engine operating between two temperatures T_H and T_C can be more efficient than a reversible Carnot engine (eta = 1 - T_C/T_H).",
    "numb": 221
  },
  {
    "id": "e3-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "easy",
    "stage": 3,
    "question": "What does Bernoulli's principle state for an incompressible, non-viscous fluid in steady flow along a streamline?",
    "answer": "An increase in fluid velocity occurs simultaneously with a decrease in static pressure or potential energy",
    "options": [
      "An increase in fluid velocity occurs simultaneously with a decrease in static pressure or potential energy",
      "Fluid viscosity increases linearly with temperature",
      "Total head loss is proportional to Reynolds number",
      "Mass flow rate drops to zero in laminar flow"
    ],
    "explanation": "Bernoulli's equation expresses conservation of mechanical energy: P + (1/2)*rho*v^2 + rho*g*h = constant.",
    "numb": 222
  },
  {
    "id": "m1-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 1,
    "question": "What dimensionless quantity in fluid mechanics predicts whether flow will be laminar or turbulent?",
    "answer": "Reynolds Number (Re)",
    "options": [
      "Reynolds Number (Re)",
      "Mach Number (Ma)",
      "Prandtl Number (Pr)",
      "Nusselt Number (Nu)"
    ],
    "explanation": "Reynolds number Re = (rho * v * D) / mu measures the ratio of inertial forces to viscous forces. Values < 2300 in pipes indicate laminar flow.",
    "numb": 223
  },
  {
    "id": "m1-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the four-stroke internal combustion engine cycle that modern gasoline spark-ignition automotive engines operate on?",
    "answer": "Otto Cycle",
    "options": [
      "Otto Cycle",
      "Brayton Cycle",
      "Rankine Cycle",
      "Stirling Cycle"
    ],
    "explanation": "The ideal Otto cycle consists of isentropic compression, constant-volume heat addition, isentropic expansion, and constant-volume heat rejection.",
    "numb": 224
  },
  {
    "id": "m2-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 1,
    "question": "On a Tensile Stress-Strain curve for mild steel, what is the point where material begins plastic deformation and does not return to its original shape?",
    "answer": "Yield Point",
    "options": [
      "Yield Point",
      "Ultimate Tensile Strength",
      "Fracture Point",
      "Proportional Limit"
    ],
    "explanation": "Beyond the Yield Point (yield strength), dislocations slip irreversibly, producing permanent plastic strain.",
    "numb": 225
  },
  {
    "id": "m2-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 2,
    "question": "What thermodynamic property is described by the Second Law of Thermodynamics as always increasing in an isolated system?",
    "answer": "Entropy (S)",
    "options": [
      "Entropy (S)",
      "Enthalpy (H)",
      "Exergy",
      "Internal Energy (U)"
    ],
    "explanation": "The Second Law dictates that the total entropy (disorder) of an isolated system always increases or remains constant for reversible processes.",
    "numb": 226
  },
  {
    "id": "m3-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 3,
    "question": "Which mechanism of heat transfer does NOT require any physical material medium to propagate thermal energy?",
    "answer": "Radiation",
    "options": [
      "Radiation",
      "Conduction",
      "Convection",
      "Advection"
    ],
    "explanation": "Thermal radiation travels via electromagnetic waves (photons) governed by the Stefan-Boltzmann law and propagates across vacuum.",
    "numb": 227
  },
  {
    "id": "m3-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "medium",
    "stage": 3,
    "question": "What failure criterion for ductile metals states that yielding begins when the maximum shear stress equals half the yield strength in uniaxial tension?",
    "answer": "Tresca Yield Criterion",
    "options": [
      "Tresca Yield Criterion",
      "von Mises Criterion",
      "Rankine Criterion",
      "Mohr-Coulomb Criterion"
    ],
    "explanation": "The Tresca criterion (Maximum Shear Stress Theory) asserts yielding occurs when tau_max = (sigma_1 - sigma_3) / 2 >= sigma_y / 2.",
    "numb": 228
  },
  {
    "id": "h1-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 1,
    "question": "In structural mechanics, what formula calculates the critical buckling load for a long, slender column with pinned ends?",
    "answer": "Euler's Critical Buckling Formula: P_cr = (pi^2 * E * I) / L^2",
    "options": [
      "Euler's Critical Buckling Formula: P_cr = (pi^2 * E * I) / L^2",
      "Rankine-Gordon Formula: P = sigma_c / (1 + a*(L/k)^2)",
      "Johnson's Parabolic Equation",
      "Castigliano's Deflection Theorem"
    ],
    "explanation": "Leonhard Euler derived that slender elastic columns buckle elastically under axial load P_cr = pi^2 * E * I / (K*L)^2.",
    "numb": 229
  },
  {
    "id": "h1-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 1,
    "question": "What failure criterion in mechanical design predicts yielding in ductile metals based on Distortion Energy?",
    "answer": "von Mises Yield Criterion",
    "options": [
      "von Mises Yield Criterion",
      "Maximum Principal Stress Theory",
      "Coulomb-Mohr Theory",
      "Griffith Fracture Theory"
    ],
    "explanation": "The von Mises (maximum distortion energy) criterion states yielding occurs when octahedral shear stress exceeds that in simple tension.",
    "numb": 230
  },
  {
    "id": "h2-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 2,
    "question": "What thermodynamic cycle is the basis for modern aviation jet engines and land-based gas turbine power plants?",
    "answer": "Brayton Cycle",
    "options": [
      "Brayton Cycle",
      "Rankine Cycle",
      "Stirling Cycle",
      "Ericsson Cycle"
    ],
    "explanation": "The Brayton (or Joule) cycle comprises adiabatic compression, isobaric combustion, adiabatic turbine expansion, and isobaric exhaust.",
    "numb": 231
  },
  {
    "id": "h2-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 2,
    "question": "What dimensionless boundary layer number expresses the ratio of momentum diffusivity (kinematic viscosity) to thermal diffusivity in convective heat transfer?",
    "answer": "Prandtl Number (Pr = nu / alpha)",
    "options": [
      "Prandtl Number (Pr = nu / alpha)",
      "Nusselt Number (Nu = h * L / k)",
      "Grashof Number (Gr)",
      "Schmidt Number (Sc)"
    ],
    "explanation": "Prandtl number Pr determines the relative thickness of hydrodynamic velocity vs thermal boundary layers in fluids.",
    "numb": 232
  },
  {
    "id": "h3-mech-1",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is the governing system of non-linear partial differential equations that describes the motion of viscous fluid substances?",
    "answer": "Navier-Stokes Equations",
    "options": [
      "Navier-Stokes Equations",
      "Euler-Lagrange Equations",
      "Maxwell's Equations",
      "Hamilton-Jacobi Equations"
    ],
    "explanation": "The Navier-Stokes equations express Newton's second law for fluids, balancing convective acceleration with pressure gradients, viscous diffusion, and body forces.",
    "numb": 233
  },
  {
    "id": "h3-mech-2",
    "category": "Mechanical Engineering",
    "difficulty": "hard",
    "stage": 3,
    "question": "In mechanical vibration analysis, what phenomenon occurs when the driving excitation frequency exactly matches the natural frequency of an undamped system?",
    "answer": "Resonance, resulting in theoretically unbounded vibration amplitudes",
    "options": [
      "Resonance, resulting in theoretically unbounded vibration amplitudes",
      "Flutter instability with immediate energy decay to zero",
      "Self-damping cancellation via destructive interference",
      "Cavitation with acoustic sonic boom generation"
    ],
    "explanation": "At resonance (omega = omega_n), the phase shifts by 90 degrees and input energy continually pumps the oscillations without bound unless damped.",
    "numb": 234
  },
  {
    "id": "e1-civil-1",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 1,
    "question": "What are the three primary ingredients required to make standard concrete?",
    "answer": "Cement, aggregates (sand and gravel), and water",
    "options": [
      "Cement, aggregates (sand and gravel), and water",
      "Clay, asphalt, and lime",
      "Steel rebar, plaster, and fiberglass",
      "Silica gel, bitumen, and gypsum"
    ],
    "explanation": "Concrete is an artificial stone formed when Portland cement reacts with water (hydration) to bind fine and coarse aggregates together.",
    "numb": 235
  },
  {
    "id": "e1-civil-2",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 1,
    "question": "What is the primary role of steel rebar in Reinforced Cement Concrete (RCC)?",
    "answer": "To provide high tensile strength because plain concrete is weak in tension",
    "options": [
      "To provide high tensile strength because plain concrete is weak in tension",
      "To reduce the weight of concrete structures",
      "To speed up the chemical hydration reaction of cement",
      "To prevent moisture from entering foundation slabs"
    ],
    "explanation": "Plain concrete has strong compressive strength but poor tensile strength; steel rebar resists tensile and shear bending stresses.",
    "numb": 236
  },
  {
    "id": "e2-civil-1",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 2,
    "question": "Which field instrument is widely used in land surveying to measure both horizontal and vertical angles with high precision?",
    "answer": "Theodolite / Total Station",
    "options": [
      "Theodolite / Total Station",
      "Hydrometer",
      "Pycnometer",
      "Anemometer"
    ],
    "explanation": "Theodolites and modern electronic Total Stations measure vertical and horizontal angles and incorporate EDM for distances.",
    "numb": 237
  },
  {
    "id": "e2-civil-2",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 2,
    "question": "What property of structural materials measures their ability to deform plastically without sudden brittle fracture?",
    "answer": "Ductility",
    "options": [
      "Ductility",
      "Hardness",
      "Porosity",
      "Creep"
    ],
    "explanation": "Ductility permits structures (like steel frames) to undergo large deformations and dissipate energy during earthquakes without catastrophic collapse.",
    "numb": 238
  },
  {
    "id": "e3-civil-1",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 3,
    "question": "What standard field and laboratory test measures the consistency and workability of fresh concrete before placement?",
    "answer": "Slump Cone Test",
    "options": [
      "Slump Cone Test",
      "Proctor Compaction Test",
      "Standard Penetration Test (SPT)",
      "Vee-Bee Consistometer"
    ],
    "explanation": "The slump test uses a frustum mold to measure how many millimeters fresh concrete subsides after the mold is lifted.",
    "numb": 239
  },
  {
    "id": "e3-civil-2",
    "category": "Civil Engineering",
    "difficulty": "easy",
    "stage": 3,
    "question": "In structural beam analysis, what is a Simply Supported Beam?",
    "answer": "A beam supported by a pin support at one end and a roller support at the other",
    "options": [
      "A beam supported by a pin support at one end and a roller support at the other",
      "A beam built rigidly into a solid concrete wall at both ends",
      "A beam that overhangs both supports into open air",
      "A beam resting on a continuous elastic foundation"
    ],
    "explanation": "A simply supported beam has one pinned end (resists vertical and horizontal forces) and one roller end (resists vertical forces while allowing thermal expansion).",
    "numb": 240
  },
  {
    "id": "m1-civil-1",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the graphical representation in structural mechanics that transforms plane stress states into principal normal and maximum shear stresses?",
    "answer": "Mohr's Circle",
    "options": [
      "Mohr's Circle",
      "Wöhler Curve",
      "Goodman Diagram",
      "Bachelet Polygon"
    ],
    "explanation": "Christian Otto Mohr's circle is a 2D graphical representation of tensor transformations relating normal stresses sigma to shear stresses tau.",
    "numb": 241
  },
  {
    "id": "m1-civil-2",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 1,
    "question": "In geotechnical engineering, what does Darcy's Law describe?",
    "answer": "The laminar flow velocity of fluid through a porous soil medium (Q = -k * i * A)",
    "options": [
      "The laminar flow velocity of fluid through a porous soil medium (Q = -k * i * A)",
      "The settlement of saturated clay under sustained structural load",
      "The compaction energy curve for optimal moisture content",
      "The lateral earth pressure against retaining walls"
    ],
    "explanation": "Darcy's Law demonstrates discharge velocity through porous soils is proportional to hydraulic gradient i and hydraulic conductivity k.",
    "numb": 242
  },
  {
    "id": "m2-civil-1",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 2,
    "question": "What are the Atterberg Limits used to classify in geotechnical soil mechanics?",
    "answer": "The critical moisture contents at which fine-grained soil transitions between solid, semi-solid, plastic, and liquid states",
    "options": [
      "The critical moisture contents at which fine-grained soil transitions between solid, semi-solid, plastic, and liquid states",
      "The maximum seismic acceleration a foundation can withstand",
      "The load-carrying capacity of friction piles in gravel",
      "The rate of water evaporation from reservoir surfaces"
    ],
    "explanation": "Albert Atterberg established the Shrinkage Limit (SL), Plastic Limit (PL), and Liquid Limit (LL) to quantify clay behavior.",
    "numb": 243
  },
  {
    "id": "m2-civil-2",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 2,
    "question": "In structural analysis, what point along a loaded beam corresponds to maximum Bending Moment?",
    "answer": "The point where the Shear Force is zero or changes sign",
    "options": [
      "The point where the Shear Force is zero or changes sign",
      "The location of the exterior roller support",
      "The point of maximum beam deflection",
      "The location where axial tension equals compression"
    ],
    "explanation": "Because dM/dx = V, the derivative of bending moment with respect to distance is shear force; extrema of M occur where V = 0.",
    "numb": 244
  },
  {
    "id": "m3-civil-1",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is a Point of Contraflexure (Inflection Point) in a loaded structural beam?",
    "answer": "The section where the bending moment changes sign from sagging to hogging (M = 0)",
    "options": [
      "The section where the bending moment changes sign from sagging to hogging (M = 0)",
      "The point of catastrophic rupture",
      "The point where shear force reaches maximum amplitude",
      "The location of maximum foundation settlement"
    ],
    "explanation": "A point of contraflexure occurs where curvature reverses and the bending moment passes through zero.",
    "numb": 245
  },
  {
    "id": "m3-civil-2",
    "category": "Civil Engineering",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the difference between Shallow Foundations and Deep Foundations in structural civil engineering?",
    "answer": "Shallow foundations (footings, rafts) transfer loads near the surface; deep foundations (piles, caissons) transfer loads to deep competent strata",
    "options": [
      "Shallow foundations (footings, rafts) transfer loads near the surface; deep foundations (piles, caissons) transfer loads to deep competent strata",
      "Shallow foundations are only for wooden buildings; deep foundations are for brick walls",
      "Shallow foundations require zero concrete",
      "Deep foundations cannot be used in marine environments"
    ],
    "explanation": "When surface soil has inadequate bearing capacity, deep piles transmit structural loads down through soft layers to bedrock or dense gravel.",
    "numb": 246
  },
  {
    "id": "h1-civil-1",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 1,
    "question": "What theory in Geotechnical Engineering calculates 1D Consolidation of saturated clay under applied surcharge over time?",
    "answer": "Terzaghi's 1D Consolidation Theory",
    "options": [
      "Terzaghi's 1D Consolidation Theory",
      "Rankine's Earth Pressure Theory",
      "Coulomb's Wedge Theory",
      "Boussinesq's Stress Distribution Theory"
    ],
    "explanation": "Karl Terzaghi's consolidation theory models the rate of pore water dissipation and progressive volume compression in saturated clays.",
    "numb": 247
  },
  {
    "id": "h1-civil-2",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 1,
    "question": "What classical energy theorem states that the first partial derivative of total strain energy with respect to an applied force gives the displacement at that point?",
    "answer": "Castigliano's First Theorem",
    "options": [
      "Castigliano's First Theorem",
      "Müller-Breslau's Principle",
      "Maxwell-Betti Reciprocal Theorem",
      "Clapeyron's Theorem of Three Moments"
    ],
    "explanation": "Alberto Castigliano proved that partial derivative dU/dP_i equals the linear displacement delta_i in the direction of load P_i.",
    "numb": 248
  },
  {
    "id": "h2-civil-1",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 2,
    "question": "In structural dynamics and earthquake engineering, what does the Response Spectrum represent?",
    "answer": "A plot of the peak steady-state response (displacement, velocity, or acceleration) of single-degree-of-freedom systems across natural periods",
    "options": [
      "A plot of the peak steady-state response (displacement, velocity, or acceleration) of single-degree-of-freedom systems across natural periods",
      "The frequency spectrum of sound reverberations in auditoriums",
      "The spatial distribution of soil liquification zones",
      "The tensile strength decay of concrete over 50 years"
    ],
    "explanation": "Design response spectra allow engineers to read peak seismic base shear and accelerations for a structure based on its fundamental natural vibration period T.",
    "numb": 249
  },
  {
    "id": "h2-civil-2",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 2,
    "question": "What iterative structural analysis method distributes fixed-end moments among member joints until equilibrium is achieved without solving simultaneous equations?",
    "answer": "Moment Distribution Method (Hardy Cross Method)",
    "options": [
      "Moment Distribution Method (Hardy Cross Method)",
      "Finite Difference Method",
      "Slope-Deflection Method",
      "Kani's Method"
    ],
    "explanation": "Hardy Cross introduced the moment distribution method in 1930, using distribution factors and carry-over factors to analyze indeterminate frames.",
    "numb": 250
  },
  {
    "id": "h3-civil-1",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 3,
    "question": "What dangerous geotechnical phenomenon occurs during earthquakes when saturated cohesionless soil temporarily loses shear strength and behaves like a liquid?",
    "answer": "Soil Liquefaction",
    "options": [
      "Soil Liquefaction",
      "Differential Settlement",
      "Slaking",
      "Piping Failure"
    ],
    "explanation": "Cyclic seismic shaking builds up pore water pressure in loose saturated sand, reducing effective stress to zero and liquefying the soil.",
    "numb": 251
  },
  {
    "id": "h3-civil-2",
    "category": "Civil Engineering",
    "difficulty": "hard",
    "stage": 3,
    "question": "What principle in open channel hydraulics describes the transition from high-velocity supercritical flow (Fr > 1) to low-velocity subcritical flow (Fr < 1)?",
    "answer": "Hydraulic Jump",
    "options": [
      "Hydraulic Jump",
      "Vena Contracta",
      "Cavitation Vortex",
      "Backwater S-Curve"
    ],
    "explanation": "A hydraulic jump is a sudden standing wave phenomenon where kinetic energy is dissipated into turbulence as supercritical flow jumps to subcritical depth.",
    "numb": 252
  },
  {
    "id": "e1-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 1,
    "question": "What type of Machine Learning trains an algorithm on a dataset containing both input features and known ground-truth labels?",
    "answer": "Supervised Learning",
    "options": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Self-Organized Mapping"
    ],
    "explanation": "Supervised learning maps input features X to target labels Y using labeled training examples (e.g. classification, regression).",
    "numb": 253
  },
  {
    "id": "e1-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 1,
    "question": "What problem occurs when a machine learning model learns training data noise too closely and fails to generalize to unseen test data?",
    "answer": "Overfitting",
    "options": [
      "Overfitting",
      "Underfitting",
      "Vanishing Gradient",
      "Data Drift"
    ],
    "explanation": "Overfitting occurs when high model complexity memorizes training samples, exhibiting very low training error but high generalization error.",
    "numb": 254
  },
  {
    "id": "e2-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 2,
    "question": "Which optimization algorithm iteratively updates model weights in the opposite direction of the gradient of the loss function?",
    "answer": "Gradient Descent",
    "options": [
      "Gradient Descent",
      "Simulated Annealing",
      "Genetic Evolution",
      "Markov Chain"
    ],
    "explanation": "Gradient descent computes dLoss/dWeight and steps weights down the loss surface: w = w - learning_rate * gradient.",
    "numb": 255
  },
  {
    "id": "e2-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 2,
    "question": "In binary classification evaluation, what is the formula for Precision?",
    "answer": "True Positives / (True Positives + False Positives)",
    "options": [
      "True Positives / (True Positives + False Positives)",
      "True Positives / (True Positives + False Negatives)",
      "(True Positives + True Negatives) / Total Samples",
      "False Positives / (True Positives + False Positives)"
    ],
    "explanation": "Precision measures what fraction of items predicted as positive were actually true positives.",
    "numb": 256
  },
  {
    "id": "e3-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which non-linear activation function maps any real-valued number into the bounded range [0, 1]?",
    "answer": "Sigmoid Function",
    "options": [
      "Sigmoid Function",
      "ReLU (Rectified Linear Unit)",
      "Linear Activation",
      "Step Function"
    ],
    "explanation": "The sigmoid function sigma(z) = 1 / (1 + e^-z) outputs values between 0 and 1, standard for binary probability outputs.",
    "numb": 257
  },
  {
    "id": "e3-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "easy",
    "stage": 3,
    "question": "What popular unsupervised clustering algorithm partitions n data points into k distinct clusters based on nearest cluster centroids?",
    "answer": "K-Means Clustering",
    "options": [
      "K-Means Clustering",
      "K-Nearest Neighbors (KNN)",
      "Linear Discriminant Analysis",
      "Random Forest"
    ],
    "explanation": "K-Means iteratively assigns observations to the closest centroid and recalculates centroids until cluster assignments stabilize.",
    "numb": 258
  },
  {
    "id": "m1-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the primary advantage of the ReLU (Rectified Linear Unit) activation function over Sigmoid and Tanh in deep neural networks?",
    "answer": "It does not saturate for positive values, alleviating the Vanishing Gradient problem",
    "options": [
      "It does not saturate for positive values, alleviating the Vanishing Gradient problem",
      "It restricts outputs to negative values only",
      "It guarantees zero execution time on microcontrollers",
      "It eliminates the need for backpropagation"
    ],
    "explanation": "ReLU f(x) = max(0, x) has a constant derivative of 1 for x > 0, preventing gradients from decaying to zero across dozens of layers.",
    "numb": 259
  },
  {
    "id": "m1-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 1,
    "question": "In Machine Learning regularization, how does L1 Regularization (Lasso) differ from L2 Regularization (Ridge)?",
    "answer": "L1 adds the sum of absolute weight values and drives non-essential weights to exactly zero (feature sparsity)",
    "options": [
      "L1 adds the sum of absolute weight values and drives non-essential weights to exactly zero (feature sparsity)",
      "L1 squares weight values; L2 cubes weight values",
      "L1 increases model parameters; L2 decreases dataset size",
      "L2 can only be used with decision trees"
    ],
    "explanation": "L1 penalizes sum(|w|), creating sharp corners on constraint boundaries that push coefficients to zero for sparse feature selection.",
    "numb": 260
  },
  {
    "id": "m2-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 2,
    "question": "What algorithm computes the gradients of the loss function with respect to every weight in a multi-layer neural network using the Chain Rule of calculus?",
    "answer": "Backpropagation",
    "options": [
      "Backpropagation",
      "Forward Inference",
      "Monte Carlo Tree Search",
      "Q-Learning"
    ],
    "explanation": "Backpropagation applies the multivariate chain rule backwards from the output layer to compute partial derivatives dL/dw efficiently.",
    "numb": 261
  },
  {
    "id": "m2-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 2,
    "question": "In Convolutional Neural Networks (CNNs), what is the purpose of a Pooling layer (e.g. MaxPooling)?",
    "answer": "Downsamples spatial dimensions (width and height) to reduce parameters and provide translation invariance",
    "options": [
      "Downsamples spatial dimensions (width and height) to reduce parameters and provide translation invariance",
      "Multiplies weights by random Gaussian noise",
      "Converts color images into audio frequency spectra",
      "Replaces backpropagation with evolutionary heuristics"
    ],
    "explanation": "Pooling aggregates local feature map patches (e.g. 2x2 max), reducing spatial footprint while retaining prominent feature activations.",
    "numb": 262
  },
  {
    "id": "m3-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 3,
    "question": "What metric is the harmonic mean of Precision and Recall?",
    "answer": "F1 Score",
    "options": [
      "F1 Score",
      "ROC-AUC",
      "Mean Squared Error (MSE)",
      "Log-Loss"
    ],
    "explanation": "F1 Score = 2 * (Precision * Recall) / (Precision + Recall), giving balanced performance assessment on imbalanced datasets.",
    "numb": 263
  },
  {
    "id": "m3-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "medium",
    "stage": 3,
    "question": "What ensemble technique builds multiple decision trees on random bootstrap subsets of data and averages their predictions?",
    "answer": "Random Forest (Bagging)",
    "options": [
      "Random Forest (Bagging)",
      "Gradient Boosting (GBDT)",
      "AdaBoost",
      "Logistic Stacking"
    ],
    "explanation": "Random Forest combines Bootstrap Aggregating (Bagging) with random feature selection to reduce variance and combat overfitting.",
    "numb": 264
  },
  {
    "id": "h1-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 1,
    "question": "In the Transformer architecture ('Attention Is All You Need'), what is the formula for Scaled Dot-Product Attention?",
    "answer": "softmax((Q * K^T) / sqrt(d_k)) * V",
    "options": [
      "softmax((Q * K^T) / sqrt(d_k)) * V",
      "sigmoid(W * [Q, K]) * V",
      "(Q * V^T) / d_k",
      "tanh(Q * K + V)"
    ],
    "explanation": "Scaled Dot-Product Attention multiplies Queries Q by transposed Keys K, divides by scaling factor sqrt(d_k) to prevent gradient vanishing in softmax, then weights Values V.",
    "numb": 265
  },
  {
    "id": "h1-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 1,
    "question": "What is the key mechanism in Residual Neural Networks (ResNets) that enables training hundreds of deep layers without vanishing gradients?",
    "answer": "Skip Connections (Identity Shortcut Connections) that bypass layers: F(x) + x",
    "options": [
      "Skip Connections (Identity Shortcut Connections) that bypass layers: F(x) + x",
      "Dropping 99% of training samples at random",
      "Zero-centering weights with batch normalization only",
      "Using double-precision 128-bit floating point hardware"
    ],
    "explanation": "Skip connections allow gradients to flow backwards directly through the identity path unimpeded: d/dx [F(x) + x] = dF/dx + 1.",
    "numb": 266
  },
  {
    "id": "h2-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 2,
    "question": "What technique in training generative diffusion models reverses noise addition to generate data from pure Gaussian noise?",
    "answer": "Score-Based Denoising Diffusion Probabilistic Modeling (DDPM)",
    "options": [
      "Score-Based Denoising Diffusion Probabilistic Modeling (DDPM)",
      "Adversarial Discriminator Minimax Gaming",
      "Contrastive Latent Clustering",
      "Markov Decision Process Q-Iteration"
    ],
    "explanation": "Diffusion models add Gaussian noise via a forward Markov chain, and train a neural network to estimate the reverse score function to iteratively denoise samples.",
    "numb": 267
  },
  {
    "id": "h2-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 2,
    "question": "In modern Large Language Model (LLM) fine-tuning, how does LoRA (Low-Rank Adaptation) drastically reduce GPU VRAM requirements?",
    "answer": "Freezes pre-trained model weights and injects trainable rank decomposition matrices: delta_W = B * A",
    "options": [
      "Freezes pre-trained model weights and injects trainable rank decomposition matrices: delta_W = B * A",
      "Truncates all embedding dimensions by 50%",
      "Quantizes all float32 parameters to 1-bit integers without weights",
      "Removes attention heads and replaces them with convolutional filters"
    ],
    "explanation": "LoRA freezes weights W_0 and updates via W = W_0 + B*A where B (d x r) and A (r x k) have rank r << d, shrinking trainable parameters by 99%.",
    "numb": 268
  },
  {
    "id": "h3-ai-1",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 3,
    "question": "In Deep Reinforcement Learning, what problem does Proximal Policy Optimization (PPO) solve?",
    "answer": "Prevents destabilizing policy collapses by clipping probability ratio updates within [1 - epsilon, 1 + epsilon]",
    "options": [
      "Prevents destabilizing policy collapses by clipping probability ratio updates within [1 - epsilon, 1 + epsilon]",
      "Solves linear regression in sub-millisecond real time",
      "Eliminates reward sparsity in multi-agent environments",
      "Converts discrete state spaces into continuous Hilbert spaces"
    ],
    "explanation": "PPO uses a clipped surrogate objective to constrain policy step size changes, ensuring stable, monotonic improvement during policy gradient training.",
    "numb": 269
  },
  {
    "id": "h3-ai-2",
    "category": "AI & Machine Learning",
    "difficulty": "hard",
    "stage": 3,
    "question": "What is FlashAttention and how does it achieve 2-4x speedup over standard Transformer self-attention?",
    "answer": "Uses IO-aware tiling to fuse softmax and matrix multiplies within GPU fast SRAM, avoiding slow HBM read/write traffic",
    "options": [
      "Uses IO-aware tiling to fuse softmax and matrix multiplies within GPU fast SRAM, avoiding slow HBM read/write traffic",
      "Approximates attention by skipping 75% of query tokens",
      "Compiles Python code directly into CUDA binary strings",
      "Replaces matrix multiplication with lookup tables"
    ],
    "explanation": "FlashAttention recognizes memory bandwidth is the bottleneck, computing exact attention in SRAM tiles with online softmax normalization.",
    "numb": 270
  },
  {
    "id": "e1-sec-1",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 1,
    "question": "In cryptography, what is the key difference between Symmetric and Asymmetric encryption?",
    "answer": "Symmetric uses the same key for encryption and decryption; Asymmetric uses a public key and private key pair",
    "options": [
      "Symmetric uses the same key for encryption and decryption; Asymmetric uses a public key and private key pair",
      "Symmetric is for passwords; Asymmetric is for files",
      "Symmetric cannot be decrypted",
      "Asymmetric encryption requires no keys"
    ],
    "explanation": "Symmetric ciphers (e.g. AES) share one private key, whereas Asymmetric cryptosystems (e.g. RSA, ECC) use mathematically paired public and private keys.",
    "numb": 271
  },
  {
    "id": "e1-sec-2",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 1,
    "question": "What common web application security vulnerability allows attackers to inject malicious database statements through input forms?",
    "answer": "SQL Injection (SQLi)",
    "options": [
      "SQL Injection (SQLi)",
      "Cross-Site Scripting (XSS)",
      "Denial of Service (DoS)",
      "Man-in-the-Middle (MitM)"
    ],
    "explanation": "SQL injection happens when unsanitized user input is directly concatenated into dynamic database query strings.",
    "numb": 272
  },
  {
    "id": "e2-sec-1",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 2,
    "question": "What security vulnerability occurs when an application includes untrusted data in an HTTP response without sanitization, executing malicious JavaScript in a victim's browser?",
    "answer": "Cross-Site Scripting (XSS)",
    "options": [
      "Cross-Site Scripting (XSS)",
      "Cross-Site Request Forgery (CSRF)",
      "Buffer Overflow",
      "Server-Side Request Forgery (SSRF)"
    ],
    "explanation": "XSS allows attackers to execute unauthorized JavaScript in the user's browser context, potentially stealing session tokens or cookies.",
    "numb": 273
  },
  {
    "id": "e2-sec-2",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 2,
    "question": "What property of Cryptographic Hash Functions (like SHA-256) ensures that a minor 1-bit change in input causes a drastic, unpredictable change in output hash?",
    "answer": "Avalanche Effect",
    "options": [
      "Avalanche Effect",
      "Diffie-Hellman Property",
      "Key Stretching",
      "Tunneling Effect"
    ],
    "explanation": "The Avalanche Effect dictates that small input changes flip approximately 50% of output hash bits, preventing pattern correlation.",
    "numb": 274
  },
  {
    "id": "e3-sec-1",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 3,
    "question": "What is Multi-Factor Authentication (MFA)?",
    "answer": "Requiring two or more independent authentication factors (something you know, have, or are) to grant access",
    "options": [
      "Requiring two or more independent authentication factors (something you know, have, or are) to grant access",
      "Using a password that is longer than 20 characters",
      "Encrypting a hard drive with multiple password attempts",
      "Logging in from multiple browser tabs simultaneously"
    ],
    "explanation": "MFA combines knowledge (passwords), possession (authenticator apps, hardware keys), or inherence (biometrics) to defend against credential theft.",
    "numb": 275
  },
  {
    "id": "e3-sec-2",
    "category": "Cybersecurity",
    "difficulty": "easy",
    "stage": 3,
    "question": "Which type of malware encrypts a victim's files and demands financial payment in exchange for the decryption key?",
    "answer": "Ransomware",
    "options": [
      "Ransomware",
      "Spyware",
      "Adware",
      "Rootkit"
    ],
    "explanation": "Ransomware encrypts critical data with strong cryptography and displays a ransom demand (often in cryptocurrency) for key release.",
    "numb": 276
  },
  {
    "id": "m1-sec-1",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 1,
    "question": "What is the primary cryptographic purpose of a 'Salt' when hashing passwords?",
    "answer": "Defends against precomputed Rainbow Table attacks and ensures identical passwords produce distinct hash values",
    "options": [
      "Defends against precomputed Rainbow Table attacks and ensures identical passwords produce distinct hash values",
      "Compresses the password string into a 16-byte buffer",
      "Encrypts the database connection string",
      "Enforces password expiration policies"
    ],
    "explanation": "Adding a unique random salt before hashing guarantees that users with the same password have completely different hashes, neutralizing lookup tables.",
    "numb": 277
  },
  {
    "id": "m1-sec-2",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 1,
    "question": "What web security header instructs modern web browsers to interact with a website exclusively over secure HTTPS connections?",
    "answer": "HTTP Strict Transport Security (HSTS)",
    "options": [
      "HTTP Strict Transport Security (HSTS)",
      "Content Security Policy (CSP)",
      "X-Frame-Options",
      "Access-Control-Allow-Origin (CORS)"
    ],
    "explanation": "The `Strict-Transport-Security` header prevents SSL-stripping attacks by forcing browsers to automatically upgrade HTTP links to HTTPS.",
    "numb": 278
  },
  {
    "id": "m2-sec-1",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 2,
    "question": "What key exchange protocol allows two parties to establish a shared secret over an insecure channel without transmitting the secret itself?",
    "answer": "Diffie-Hellman Key Exchange",
    "options": [
      "Diffie-Hellman Key Exchange",
      "AES-GCM",
      "MD5 Handshake",
      "Bacon Cipher"
    ],
    "explanation": "Whitfield Diffie and Martin Hellman's protocol utilizes the discrete logarithm problem to securely agree on a shared symmetric key.",
    "numb": 279
  },
  {
    "id": "m2-sec-2",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 2,
    "question": "What security exploit occurs when an attacker tricks an authenticated user's browser into executing unwanted actions on a trusted web application?",
    "answer": "Cross-Site Request Forgery (CSRF)",
    "options": [
      "Cross-Site Request Forgery (CSRF)",
      "Server-Side Template Injection (SSTI)",
      "Broken Access Control",
      "DNS Spoofing"
    ],
    "explanation": "CSRF exploits the browser's automatic inclusion of session cookies with cross-origin requests; mitigated using anti-CSRF tokens and SameSite cookies.",
    "numb": 280
  },
  {
    "id": "m3-sec-1",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is the security architectural principle that assumes breach and requires continuous verification for all users and devices, even inside corporate networks?",
    "answer": "Zero Trust Architecture ('Never Trust, Always Verify')",
    "options": [
      "Zero Trust Architecture ('Never Trust, Always Verify')",
      "Castle-and-Moat Perimeter Security",
      "Air-Gapped Isolation",
      "Open Authentication Framework"
    ],
    "explanation": "Zero Trust eliminates implicit trust based on network perimeter, mandating strict identity validation, device health verification, and least privilege.",
    "numb": 281
  },
  {
    "id": "m3-sec-2",
    "category": "Cybersecurity",
    "difficulty": "medium",
    "stage": 3,
    "question": "What is a Buffer Overflow vulnerability in compiled languages like C/C++?",
    "answer": "Writing data past the allocated bounds of a buffer, corrupting adjacent memory and potentially overwriting return addresses",
    "options": [
      "Writing data past the allocated bounds of a buffer, corrupting adjacent memory and potentially overwriting return addresses",
      "Filling a network router buffer causing dropped UDP packets",
      "Allocating more heap memory than physical RAM available",
      "Exceeding standard database connection pool limits"
    ],
    "explanation": "Buffer overflows smash the call stack, which attackers can exploit to hijack instruction pointer (EIP/RIP) registers to execute shellcode.",
    "numb": 282
  },
  {
    "id": "h1-sec-1",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 1,
    "question": "What mathematical hardness assumption forms the security foundation of RSA public key encryption?",
    "answer": "The computational difficulty of factoring the product of two large prime numbers",
    "options": [
      "The computational difficulty of factoring the product of two large prime numbers",
      "Solving non-deterministic polynomial (NP-complete) traveling salesperson paths",
      "Calculating continuous Laplace equations on non-Euclidean manifolds",
      "Finding shortest vectors in high-dimensional lattices"
    ],
    "explanation": "RSA depends on the fact that multiplying two primes p and q to get N is easy, but factoring large N back into p and q is computationally infeasible.",
    "numb": 283
  },
  {
    "id": "h1-sec-2",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 1,
    "question": "In modern cryptography, what is Perfect Forward Secrecy (PFS)?",
    "answer": "Compromising a server's long-term private key does NOT reveal past session keys or decrypt past intercepted traffic",
    "options": [
      "Compromising a server's long-term private key does NOT reveal past session keys or decrypt past intercepted traffic",
      "A hash function that produces output keys in forward alphabetical sequence",
      "Encrypting data multiple times using nested symmetric keys",
      "A quantum-proof algorithm certified by NIST"
    ],
    "explanation": "PFS uses ephemeral key agreements (like Ephemeral Diffie-Hellman ECDHE) where session keys are discarded immediately after communication completes.",
    "numb": 284
  },
  {
    "id": "h2-sec-1",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 2,
    "question": "In symmetric block ciphers, why is Electronic Codebook (ECB) mode considered cryptographically insecure for encrypting structured data (like images)?",
    "answer": "Identical plaintext blocks encrypt to identical ciphertext blocks, preserving visual patterns",
    "options": [
      "Identical plaintext blocks encrypt to identical ciphertext blocks, preserving visual patterns",
      "It can only use 32-bit keys that can be brute forced in seconds",
      "It requires sharing private keys in unencrypted HTTP headers",
      "It corrupts initialization vectors during network transit"
    ],
    "explanation": "ECB lacks diffusion; repeating 16-byte plaintext blocks produce identical ciphertext blocks (demonstrated by the visible silhouette of the ECB Penguin).",
    "numb": 285
  },
  {
    "id": "h2-sec-2",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 2,
    "question": "What operating system memory mitigation technique randomizes the memory addresses of stack, heap, and loaded libraries on each execution?",
    "answer": "Address Space Layout Randomization (ASLR)",
    "options": [
      "Address Space Layout Randomization (ASLR)",
      "Data Execution Prevention (DEP / NX bit)",
      "Stack Smashing Protector (Canary)",
      "Control Flow Guard (CFG)"
    ],
    "explanation": "ASLR makes exploitation difficult because attackers cannot predict memory targets for Return-Oriented Programming (ROP) gadgets.",
    "numb": 286
  },
  {
    "id": "h3-sec-1",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 3,
    "question": "Why are classical public-key algorithms (RSA, ECC, Diffie-Hellman) vulnerable to Shor's Algorithm running on future fault-tolerant quantum computers?",
    "answer": "Shor's algorithm solves prime factorization and discrete logarithms in polynomial time O((log N)^3)",
    "options": [
      "Shor's algorithm solves prime factorization and discrete logarithms in polynomial time O((log N)^3)",
      "Quantum computers can guess 256-bit symmetric keys in zero time",
      "Quantum superposition alters physical copper wire resistance",
      "Shor's algorithm reverses SHA-256 hashes instantaneously"
    ],
    "explanation": "Peter Shor's quantum algorithm utilizes quantum Fourier transforms to find periods of modular exponentiation in polynomial time, breaking RSA and discrete log cryptography.",
    "numb": 287
  },
  {
    "id": "h3-sec-2",
    "category": "Cybersecurity",
    "difficulty": "hard",
    "stage": 3,
    "question": "Which cryptographic family selected by NIST for Post-Quantum Cryptography (PQC) standards (e.g. ML-KEM / Kyber) is resistant to quantum attacks?",
    "answer": "Lattice-Based Cryptography (Learning With Errors - LWE)",
    "options": [
      "Lattice-Based Cryptography (Learning With Errors - LWE)",
      "Elliptic Curve Diffie-Hellman",
      "ElGamal Multiplicative Homomorphic Rings",
      "Modular Factorization Cryptography"
    ],
    "explanation": "Lattice-based cryptography relies on the hardness of high-dimensional geometric problems (like Shortest Vector Problem and LWE), for which no efficient quantum or classical algorithms exist.",
    "numb": 288
  }
];
