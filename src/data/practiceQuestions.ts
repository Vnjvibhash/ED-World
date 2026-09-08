export type SupportedLanguage = "c" | "cpp" | "python" | "java" | "javascript" | "web";

export interface TestCase {
  id: string;
  label: string;
  input: string;
  expectedOutput: string;
  isSample?: boolean;
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Algorithms" | "Math" | "Strings" | "Data Structures" | "Web Dev";
  acceptance: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  testCases: TestCase[];
  starterCodes: Record<SupportedLanguage, string>;
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: "two-sum",
    title: "1. Two Sum Problem",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "52.4%",
    description:
      "Given an array of integers `nums` and an integer `target`, return the two numbers' 0-based indices that add up to `target`. Print the indices separated by a space (smaller index first).\n\nYou may assume each input would have exactly one solution, and you may not use the same element twice.",
    inputFormat: "Line 1: N (number of elements)\nLine 2: N space-separated integers\nLine 3: target integer",
    outputFormat: "Two space-separated indices: i j",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      {
        id: "tc1",
        label: "Case 1 (Sample)",
        input: "4\n2 7 11 15\n9",
        expectedOutput: "0 1",
        isSample: true,
      },
      {
        id: "tc2",
        label: "Case 2 (Target at End)",
        input: "3\n3 2 4\n6",
        expectedOutput: "1 2",
        isSample: true,
      },
      {
        id: "tc3",
        label: "Case 3 (Duplicates)",
        input: "2\n3 3\n6",
        expectedOutput: "0 1",
      },
      {
        id: "tc4",
        label: "Case 4 (Negative values)",
        input: "4\n-3 4 3 90\n0",
        expectedOutput: "0 2",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>

// User function skeleton:
// Find indices i, j such that nums[i] + nums[j] == target
// Print the result as: printf("%d %d\\n", i, j);
void findTwoSum(int nums[], int n, int target) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target;
    scanf("%d", &target);

    findTwoSum(nums, n, target);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

// User function skeleton:
// Return pair<int, int> of indices that sum to target
pair<int, int> findTwoSum(const vector<int>& nums, int target) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return {-1, -1};
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    pair<int, int> res = findTwoSum(nums, target);
    cout << res.first << " " << res.second << endl;
    return 0;
}`,
      python: `import sys

def find_two_sum(nums, target):
    """
    User Function Skeleton:
    Args:
        nums (List[int]): Array of numbers
        target (int): Target sum
    Returns:
        tuple (i, j): 0-based indices where nums[i] + nums[j] == target
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return -1, -1

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    target = int(tokens[n+1])

    i, j = find_two_sum(nums, target)
    print(f"{i} {j}")

if __name__ == "__main__":
    main()`,
      java: `import java.util.*;

public class Main {
    // User method skeleton:
    // Return an array of size 2 with the indices that sum to target
    public static int[] findTwoSum(int[] nums, int target) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        int[] result = findTwoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} [i, j]
 */
function findTwoSum(nums, target) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return [-1, -1];
}

function main() {
  const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
  if (input.length <= 1) return;
  const n = parseInt(input[0]);
  const nums = input.slice(1, n + 1).map(Number);
  const target = parseInt(input[n + 1]);

  const [i, j] = findTwoSum(nums, target);
  console.log(\`\${i} \${j}\`);
}

main();`,
      web: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
    .card { background: white; padding: 20px; border-radius: 12px; max-width: 400px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    button { background: #ff8000; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h3>Two Sum Solver</h3>
    <p>Nums: [2, 7, 11, 15], Target: 9</p>
    <button onclick="calculateTwoSum()">Find Indices</button>
    <p id="output" style="font-weight: bold; color: #173E67;"></p>
  </div>
  <script>
    function calculateTwoSum() {
      // TODO: Implement your interactive DOM logic here
      document.getElementById('output').innerText = 'Output will show here';
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "palindrome-check",
    title: "2. Valid Palindrome",
    difficulty: "Easy",
    category: "Strings",
    acceptance: "78.1%",
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nPrint `true` if it is a palindrome, or `false` otherwise.",
    inputFormat: "A single line containing the string S",
    outputFormat: "`true` or `false`",
    constraints: ["1 <= S.length <= 2 * 10^5", "S consists only of printable ASCII characters."],
    testCases: [
      {
        id: "pal_1",
        label: "Case 1 (Standard)",
        input: "A man, a plan, a canal: Panama",
        expectedOutput: "true",
        isSample: true,
      },
      {
        id: "pal_2",
        label: "Case 2 (Not Palindrome)",
        input: "race a car",
        expectedOutput: "false",
        isSample: true,
      },
      {
        id: "pal_3",
        label: "Case 3 (Single space)",
        input: " ",
        expectedOutput: "true",
      },
      {
        id: "pal_4",
        label: "Case 4 (Numbers)",
        input: "0P",
        expectedOutput: "false",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

// User function skeleton:
// Return true if string s is a palindrome (ignoring case & non-alphanumerics)
bool isPalindrome(const char* s) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return false;
}

int main() {
    char s[200005];
    if (!fgets(s, sizeof(s), stdin)) {
        printf("true\\n");
        return 0;
    }
    printf("%s\\n", isPalindrome(s) ? "true" : "false");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// User function skeleton:
bool isPalindrome(const string& s) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return false;
}

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << "true" << endl;
        return 0;
    }
    cout << (isPalindrome(s) ? "true" : "false") << endl;
    return 0;
}`,
      python: `import sys

def is_palindrome(s: str) -> bool:
    """
    User Function Skeleton:
    Return True if s is a palindrome, ignoring non-alphanumerics and case.
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return False

def main():
    s = sys.stdin.read().strip()
    print("true" if is_palindrome(s) else "false")

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    // User method skeleton:
    public static boolean isPalindrome(String s) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        System.out.println(isPalindrome(s) ? "true" : "false");
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return false;
}

const s = fs.readFileSync(0, "utf-8").trim();
console.log(isPalindrome(s) ? "true" : "false");`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Palindrome Tester</h2>
  <input id="str" placeholder="Enter string" value="racecar" style="padding: 8px;" />
  <button onclick="checkPalindrome()" style="padding: 8px 12px; background: #173E67; color: white;">Test</button>
  <div id="result" style="margin-top: 10px; font-weight: bold;"></div>

  <script>
    function checkPalindrome() {
      // TODO: Complete palindrome check logic
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "fizzbuzz",
    title: "3. FizzBuzz Sequence",
    difficulty: "Easy",
    category: "Math",
    acceptance: "89.2%",
    description:
      "Given an integer `N`, print comma-separated answers for numbers from 1 to N:\n- For multiples of 3 & 5, print 'FizzBuzz'\n- For multiples of 3, print 'Fizz'\n- For multiples of 5, print 'Buzz'\n- Otherwise print the number.",
    inputFormat: "A single integer N",
    outputFormat: "Comma-separated string of results: e.g. 1, 2, Fizz, 4, Buzz",
    constraints: ["1 <= N <= 100"],
    testCases: [
      {
        id: "fb_1",
        label: "Case 1 (N = 5)",
        input: "5",
        expectedOutput: "1, 2, Fizz, 4, Buzz",
        isSample: true,
      },
      {
        id: "fb_2",
        label: "Case 2 (N = 15)",
        input: "15",
        expectedOutput: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
        isSample: true,
      },
      {
        id: "fb_3",
        label: "Case 3 (N = 1)",
        input: "1",
        expectedOutput: "1",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>

// User function skeleton:
void fizzBuzz(int n) {
    // ============================================
    // TODO: Write your logic here
    // Print comma-separated values from 1 to n
    // ============================================
    
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        fizzBuzz(n);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// User function skeleton:
void fizzBuzz(int n) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
}

int main() {
    int n;
    if (cin >> n) {
        fizzBuzz(n);
    }
    return 0;
}`,
      python: `import sys

def fizz_buzz(n: int) -> str:
    """
    User Function Skeleton:
    Return a comma-separated string from 1 to n.
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return ""

def main():
    line = sys.stdin.read().strip()
    if line:
        print(fizz_buzz(int(line)))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    // User method skeleton:
    public static String fizzBuzz(int n) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.println(fizzBuzz(n));
        }
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {number} n
 * @return {string} comma-separated FizzBuzz sequence
 */
function fizzBuzz(n) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return "";
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
  console.log(fizzBuzz(parseInt(input)));
}`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: monospace; padding: 20px;">
  <h3>Interactive FizzBuzz Generator</h3>
  <input id="num" type="number" value="15" />
  <button onclick="runFizzBuzz()">Generate</button>
  <div id="output" style="margin-top: 15px;"></div>

  <script>
    function runFizzBuzz() {
      // TODO: Populate #output with FizzBuzz sequence
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "max-subarray",
    title: "4. Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    category: "Algorithms",
    acceptance: "50.1%",
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    inputFormat: "Line 1: N (array size)\nLine 2: N space-separated integers",
    outputFormat: "A single integer representing the maximum subarray sum",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      {
        id: "kadane_1",
        label: "Case 1 (Standard)",
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        expectedOutput: "6",
        isSample: true,
      },
      {
        id: "kadane_2",
        label: "Case 2 (Single element)",
        input: "1\n1",
        expectedOutput: "1",
        isSample: true,
      },
      {
        id: "kadane_3",
        label: "Case 3 (All negative)",
        input: "5\n-5 -4 -1 -7 -8",
        expectedOutput: "-1",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>

// User function skeleton:
int maxSubArray(int nums[], int n) {
    // ============================================
    // TODO: Write your logic here (Kadane's Algorithm)
    // ============================================
    
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);

    printf("%d\\n", maxSubArray(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

// User function skeleton:
int maxSubArray(const vector<int>& nums) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    cout << maxSubArray(nums) << endl;
    return 0;
}`,
      python: `import sys

def max_sub_array(nums):
    """
    User Function Skeleton:
    Find the contiguous subarray which has the largest sum.
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return 0

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    print(max_sub_array(nums))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    // User method skeleton:
    public static int maxSubArray(int[] nums) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        System.out.println(maxSubArray(nums));
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return 0;
}

const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
if (input.length > 1) {
  const n = parseInt(input[0]);
  const nums = input.slice(1, n + 1).map(Number);
  console.log(maxSubArray(nums));
}`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h3>Kadane's Algorithm Demonstration</h3>
  <p>Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</p>
  <button onclick="computeMaxSubArray()">Calculate Max Subarray</button>
  <p id="ans"></p>
  <script>
    function computeMaxSubArray() {
      // TODO: Calculate max subarray sum and render
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "fibonacci",
    title: "5. Nth Fibonacci Number",
    difficulty: "Easy",
    category: "Math",
    acceptance: "68.9%",
    description:
      "The Fibonacci numbers form a sequence where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2) for n > 1. Given N, calculate F(N).",
    inputFormat: "A single integer N",
    outputFormat: "A single integer representing F(N)",
    constraints: ["0 <= N <= 30"],
    testCases: [
      {
        id: "fib_1",
        label: "Case 1 (N = 2)",
        input: "2",
        expectedOutput: "1",
        isSample: true,
      },
      {
        id: "fib_2",
        label: "Case 2 (N = 5)",
        input: "5",
        expectedOutput: "5",
        isSample: true,
      },
      {
        id: "fib_3",
        label: "Case 3 (N = 0)",
        input: "0",
        expectedOutput: "0",
      },
      {
        id: "fib_4",
        label: "Case 4 (N = 10)",
        input: "10",
        expectedOutput: "55",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>

// User function skeleton:
int fibonacci(int n) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        printf("%d\\n", fibonacci(n));
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// User function skeleton:
int fibonacci(int n) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return 0;
}

int main() {
    int n;
    if (cin >> n) {
        cout << fibonacci(n) << endl;
    }
    return 0;
}`,
      python: `import sys

def fibonacci(n: int) -> int:
    """
    User Function Skeleton:
    Return F(n) where F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return 0

def main():
    line = sys.stdin.read().strip()
    if line:
        print(fibonacci(int(line)))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    // User method skeleton:
    public static int fibonacci(int n) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.println(fibonacci(n));
        }
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {number} n
 * @return {number}
 */
function fibonacci(n) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return 0;
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
  console.log(fibonacci(parseInt(input)));
}`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Fibonacci Generator</h2>
  <input id="num" type="number" value="8" />
  <button onclick="calculateFib()">Calculate</button>
  <p id="result"></p>
  <script>
    function calculateFib() {
      // TODO: Complete logic to calculate F(n)
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "reverse-string",
    title: "6. Reverse a String",
    difficulty: "Easy",
    category: "Strings",
    acceptance: "85.0%",
    description:
      "Write a function that reverses a string. Print the reversed string.",
    inputFormat: "A single line containing the string S",
    outputFormat: "The reversed string S",
    constraints: ["1 <= S.length <= 10^5"],
    testCases: [
      {
        id: "rev_1",
        label: "Case 1 (Word)",
        input: "hello",
        expectedOutput: "olleh",
        isSample: true,
      },
      {
        id: "rev_2",
        label: "Case 2 (Sentence)",
        input: "Antigravity",
        expectedOutput: "ytivargitnA",
        isSample: true,
      },
      {
        id: "rev_3",
        label: "Case 3 (Single char)",
        input: "x",
        expectedOutput: "x",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>
#include <string.h>

// User function skeleton:
void reverseString(char* s) {
    // ============================================
    // TODO: Reverse the string in-place
    // ============================================
    
}

int main() {
    char s[100005];
    if (fgets(s, sizeof(s), stdin)) {
        s[strcspn(s, "\\r\\n")] = 0;
        reverseString(s);
        printf("%s\\n", s);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// User function skeleton:
string reverseString(string s) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    
    return s;
}

int main() {
    string s;
    if (getline(cin, s)) {
        cout << reverseString(s) << endl;
    }
    return 0;
}`,
      python: `import sys

def reverse_string(s: str) -> str:
    """
    User Function Skeleton:
    Return the reversed string.
    """
    # ============================================
    # TODO: Write your logic here
    # ============================================
    
    return s

def main():
    s = sys.stdin.read().strip()
    print(reverse_string(s))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    // User method skeleton:
    public static String reverseString(String s) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        
        return s;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String s = sc.nextLine();
            System.out.println(reverseString(s));
        }
    }
}`,
      javascript: `const fs = require("fs");

/**
 * User Function Skeleton:
 * @param {string} s
 * @return {string}
 */
function reverseString(s) {
  // ============================================
  // TODO: Write your logic here
  // ============================================
  
  return s;
}

const s = fs.readFileSync(0, "utf-8").trim();
console.log(reverseString(s));`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>String Inverter</h2>
  <input id="input" value="ED-World" />
  <button onclick="reverse()">Reverse</button>
  <p id="out"></p>
  <script>
    function reverse() {
      // TODO: Reverse input string and update DOM
    }
  </script>
</body>
</html>`,
    },
  },
];
