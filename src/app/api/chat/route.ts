import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Built-in intelligent knowledge engine for DSA, Coding, and Student World platform
function generateSmartCSResponse(userQuery: string, context?: { problemTitle?: string; language?: string; code?: string }) {
  const query = userQuery.toLowerCase().trim();

  // 1. Two Sum hints & help
  if (query.includes("two sum") || query.includes("twosum") || (context?.problemTitle && context.problemTitle.toLowerCase().includes("two sum"))) {
    if (query.includes("hint") || query.includes("approach") || query.includes("how to solve") || query.includes("solution") || query.includes("code")) {
      return {
        reply: `### 💡 Two Sum: Algorithmic Hints & Strategy

**Core Problem Intuition:**
For every number \`nums[i]\`, you need to find if its complement \`target - nums[i]\` exists in the array.

#### 1. Brute Force Approach:
- Check all pairs $(i, j)$ using nested loops.
- **Time Complexity:** $O(N^2)$
- **Space Complexity:** $O(1)$

#### 2. Optimal One-Pass Hash Map (Recommended):
- Maintain a hash map/dictionary of \`{ value: index }\`.
- As you iterate through each number \`num\` at index \`i\`:
  1. Calculate \`complement = target - num\`.
  2. If \`complement\` is already in your hash map, you found your pair! Return \`[map[complement], i]\`.
  3. Otherwise, insert \`map[num] = i\` and continue.
- **Time Complexity:** $O(N)$ linear time
- **Space Complexity:** $O(N)$ for the hash map

#### 3. Two-Pointer Approach (If Sorted):
- If the array were sorted, pointers at \`left = 0\` and \`right = n - 1\` could converge in $O(N)$ time with $O(1)$ space. (Note: Sorting takes $O(N \\log N)$ and original indices must be preserved).`,
        suggestions: [
          "Show C++ Hash Map implementation",
          "Show Python 3 solution",
          "Why is hash map O(1) lookup on average?",
        ],
      };
    }
  }

  // 2. Kadane's Algorithm / Maximum Subarray
  if (query.includes("kadane") || query.includes("maximum subarray") || query.includes("max subarray")) {
    return {
      reply: `### 🚀 Kadane's Algorithm Explained

Kadane's algorithm finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum.

#### 🔑 Key Insight:
At each index \`i\`, you make a choice:
1. **Extend the previous subarray:** \`currentSum + nums[i]\`
2. **Start a new subarray from here:** \`nums[i]\`

Hence:
\`\`\`
currentSum = max(nums[i], currentSum + nums[i])
maxSum = max(maxSum, currentSum)
\`\`\`

#### ⏱️ Complexity:
- **Time Complexity:** $O(N)$ — single linear pass through the array.
- **Space Complexity:** $O(1)$ — only stores \`currentSum\` and \`maxSum\`.

#### 💡 Edge Case Tip:
When all numbers are negative, initialize \`maxSum = nums[0]\` rather than \`0\`.`,
      suggestions: [
        "How to reconstruct the actual subarray in Kadane's?",
        "Show Python implementation",
        "Can Kadane's work with 2D matrices?",
      ],
    };
  }

  // 3. Big-O Complexity / Time & Space
  if (query.includes("big o") || query.includes("big-o") || query.includes("time complexity") || query.includes("space complexity") || query.includes("complexity")) {
    return {
      reply: `### ⏱️ Big-O Notation Cheatsheet for Students

Big-O measures the worst-case asymptotic growth rate of an algorithm as the input size $N$ increases.

| Complexity | Common Name | Example Algorithm |
| :--- | :--- | :--- |
| **$O(1)$** | Constant | Hash map lookup, array index access |
| **$O(\\log N)$** | Logarithmic | Binary search, balanced BST search |
| **$O(N)$** | Linear | Linear search, Kadane's, single pass |
| **$O(N \\log N)$** | Linearithmic | Merge Sort, Quick Sort (avg), Heap Sort |
| **$O(N^2)$** | Quadratic | Bubble Sort, Selection Sort, Nested Loops |
| **$O(2^N)$** | Exponential | Recursive Fibonacci, generating all subsets |
| **$O(N!)$** | Factorial | Generating all permutations, Traveling Salesperson |

#### 🧠 Quick Rule of Thumb:
- $N \\le 10^4$: $O(N^2)$ will pass within 1 second.
- $N \\le 10^6$: Aim for $O(N)$ or $O(N \\log N)$.
- $N \\le 10^8$: Aim for $O(N)$ or $O(\\log N)$.`,
      suggestions: [
        "Why is Merge Sort O(N log N)?",
        "Explain Auxiliary Space vs Space Complexity",
        "What is amortized O(1)?",
      ],
    };
  }

  // 4. Binary Search vs Linear Search
  if (query.includes("binary search") || query.includes("linear search")) {
    return {
      reply: `### 🔍 Binary Search vs Linear Search

#### 1. Linear Search:
- Traverses every element from start to finish until the target is found.
- Works on **unsorted** arrays.
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$

#### 2. Binary Search:
- **Prerequisite:** The array must be **sorted**.
- Divides the search space in half at each step by comparing target with \`mid = left + (right - left) / 2\`.
- **Time Complexity:** $O(\\log N)$
- **Space Complexity:** $O(1)$ iterative, $O(\\log N)$ recursive.

\`\`\`cpp
// Standard Binary Search in C++
int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // avoids integer overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\``,
      suggestions: [
        "What is upper_bound and lower_bound?",
        "Explain Binary Search on Answer space",
        "How to avoid mid overflow in Java/C++?",
      ],
    };
  }

  // 5. Data Structures: Array vs Linked List / Trees / Graphs
  if (query.includes("linked list") || query.includes("array vs") || query.includes("tree vs graph") || query.includes("data structure")) {
    return {
      reply: `### 🌲 Core Data Structures Overview

1. **Arrays:**
   - Contiguous memory allocation.
   - Fast random access: $O(1)$ by index.
   - Costly insertions/deletions: $O(N)$ due to shifting.

2. **Linked Lists:**
   - Nodes connected via pointers (data + next pointer).
   - Fast insertion/deletion at known position: $O(1)$.
   - Sequential access only: $O(N)$ lookup.

3. **Trees & Binary Search Trees (BST):**
   - Hierarchical data structure with a root node and child nodes.
   - A BST maintains the invariant: \`left < root < right\`.
   - Search/Insert/Delete: $O(\\log N)$ average in balanced BSTs (e.g., AVL, Red-Black).

4. **Graphs:**
   - Vertices (nodes) connected by edges (directed/undirected, weighted/unweighted).
   - Represented using **Adjacency Lists** ($O(V + E)$ space) or **Adjacency Matrices** ($O(V^2)$ space).
   - Traversal algorithms: **BFS** (Queue, shortest path in unweighted) and **DFS** (Stack/Recursion).`,
      suggestions: [
        "How to detect a cycle in a Linked List?",
        "Explain BFS vs DFS in Graphs",
        "How does a Hash Table resolve collisions?",
      ],
    };
  }

  // 6. Sorting Algorithms & Visualizers
  if (query.includes("sorting") || query.includes("bubble sort") || query.includes("quick sort") || query.includes("merge sort") || query.includes("visualizer")) {
    return {
      reply: `### 📊 Sorting Algorithms & Interactive Visualizers

You can explore live visual step-by-step animations for all key sorting algorithms right on our **[Data Structures Visualizer](/data-structures)** page!

#### Comparison of Popular Sorting Algorithms:

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| **Insertion Sort**| $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| **Selection Sort**| $O(N^2)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | No |
| **Merge Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(N)$ | Yes |
| **Quick Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N^2)$ | $O(\\log N)$ | No |
| **Heap Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(1)$ | No |

👉 Check out the **Visualizers** tab to watch array bars swap, compare, and sort with speed controls!`,
      suggestions: [
        "Go to Sorting Visualizer",
        "Why is Quick Sort preferred in-memory?",
        "When is Insertion Sort optimal?",
      ],
    };
  }

  // 7. Debugging Code / Errors
  if (query.includes("debug") || query.includes("error") || query.includes("segmentation fault") || query.includes("segfault") || query.includes("nullpointer") || query.includes("tle") || query.includes("time limit")) {
    return {
      reply: `### 🐞 Common Coding Errors & How to Fix Them

1. **Segmentation Fault (SIGSEGV) in C/C++:**
   - **Cause:** Accessing unallocated or out-of-bounds memory.
   - **Fix:** Check array bounds (e.g. iterating up to \`n\` instead of \`n - 1\`), verify pointer initialization, and ensure base cases in recursion to avoid stack overflow.

2. **Time Limit Exceeded (TLE):**
   - **Cause:** Algorithm is $O(N^2)$ or $O(2^N)$ when $N \\ge 10^5$, or an infinite \`while\` loop where variables never meet the terminating condition.
   - **Fix:** Use Hash Maps to replace nested loops, or binary search instead of linear search.

3. **Wrong Answer on Large Inputs (Integer Overflow):**
   - In C/C++ and Java, standard 32-bit \`int\` ranges from $-2 \\times 10^9$ to $2 \\times 10^9$.
   - **Fix:** Use \`long long\` in C++ or \`long\` in Java when sums exceed $2 \\times 10^9$.

4. **NullPointerException / TypeError:**
   - **Fix:** Ensure objects or map keys exist before accessing properties (e.g. \`map.count(key)\` in C++ or \`if key in map:\` in Python).`,
      suggestions: [
        "How to debug infinite loops?",
        "What causes Stack Overflow in recursion?",
        "Help review my active code",
      ],
    };
  }

  // 8. Platform Navigation & Features
  if (query.includes("platform") || query.includes("practice") || query.includes("quiz") || query.includes("student world") || query.includes("features")) {
    return {
      reply: `### 🎓 Welcome to Student World!

Here is a quick tour of our core interactive modules:

1. **💻 [Universal Practice Arena & IDE](/practice):**
   - Multi-language IDE supporting **C++, C, Python 3, Java, JavaScript, and HTML/CSS/JS Webview**.
   - Automatic multi-testcase evaluation with detailed actual vs expected output diffs.
   - Solution Tab with verified optimal code, complexity breakdown, and community code sharing.

2. **📊 [Data Structure Visualizers](/data-structures):**
   - Interactive visualizers for Sorting Algorithms, Linked Lists, Trees, and Graphs.
   - Adjust animation speed, step through algorithms, and visualize swaps in real-time.

3. **🏆 [Quiz Arena](/quiz):**
   - Real-time timed multiplayer and single-player CS quizzes across DSA, Web Dev, OS, and DBMS.

4. **👥 [Department & Dev Community](/department):**
   - Semester syllabus, study materials, project roadmaps, and community mentorship.`,
      suggestions: [
        "Open Practice Arena",
        "Go to Quiz Arena",
        "Explore Sorting Visualizer",
      ],
    };
  }

  // General / Fallback Coding Assistant Response
  return {
    reply: `Hello! I am your **Student World AI Coding & DSA Tutor**.

I can help you with:
- **Algorithmic Problem Hints:** Step-by-step guidance without spoiling full answers.
- **Complexity Analysis:** Explaining Time $O(N)$ and Space $O(1)$ complexities.
- **Code Debugging:** Diagnosing Segmentation Faults, TLE, and edge cases.
- **Multi-Language Syntax:** Best practices for C++, Python, Java, C, and JavaScript.
- **Platform Features:** Navigating our Practice IDE, DSA Visualizers, and Quiz Arena.

What topic or problem would you like to explore today?`,
    suggestions: [
      "⚡ Two Sum Hint",
      "⏱️ Big-O Complexity Guide",
      "🌲 Binary Search Tutorial",
      "🐞 Help me debug an error",
      "🚀 Platform Tour",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    const latestUserMessage = messages
      .filter((m: ChatMessage) => m.role === "user")
      .pop()?.content || "";

    // Check if external Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the friendly, expert AI Coding and DSA Tutor for "Student World", a premier educational platform for computer science students.
You specialize in Data Structures, Algorithms, C++, Python, Java, JavaScript, C, Big-O complexity, and interactive code guidance.
Guidelines:
1. Provide concise, clear, and encouraging explanations with GitHub markdown formatting (headings, code blocks, bold text, bullet points).
2. When students ask for help on practice problems (like Two Sum, Kadane's, Palindromes), provide conceptual hints, step-by-step intuition, and complexity analysis.
3. Keep branding strictly as "Student World" or "Universal Code Lab". NEVER mention third-party websites or external tools.
4. When writing code snippets, specify the language for syntax highlighting (e.g. \`\`\`cpp, \`\`\`python).`;

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const promptText = `${systemPrompt}\n\nUser Context:\n${
          context ? JSON.stringify(context) : "None"
        }\n\nConversation History:\n${messages
          .map((m: ChatMessage) => `${m.role.toUpperCase()}: ${m.content}`)
          .join("\n")}\n\nASSISTANT:`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const candidate = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            return NextResponse.json({
              reply: candidate,
              suggestions: [
                "Can you explain the time complexity?",
                "Provide an optimized version",
                "What are the edge cases to test?",
              ],
            });
          }
        }
      } catch (externalErr) {
        console.warn("External AI call failed, falling back to smart engine:", externalErr);
      }
    }

    // High-performance, deterministic Smart CS Knowledge Engine
    const smartResponse = generateSmartCSResponse(latestUserMessage, context);

    return NextResponse.json({
      reply: smartResponse.reply,
      suggestions: smartResponse.suggestions,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: `Internal Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}
