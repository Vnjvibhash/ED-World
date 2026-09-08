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
      "Given an array of integers `nums` and an integer `target`, find the two numbers such that they add up to `target`. Print their 0-based indices separated by a space (smaller index first).",
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
        label: "Case 4 (Negative numbers)",
        input: "4\n-3 4 3 90\n0",
        expectedOutput: "0 2",
      },
    ],
    starterCodes: {
      c: `#include <stdio.h>

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &target);

    // TODO: Find indices i, j such that nums[i] + nums[j] == target
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                printf("%d %d\\n", i, j);
                return 0;
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    unordered_map<int, int> seen;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            cout << seen[complement] << " " << i << endl;
            return 0;
        }
        seen[nums[i]] = i;
    }
    return 0;
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:n+1]]
    target = int(lines[n+1])

    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            print(f"{seen[comp]} {i}")
            return
        seen[num] = i

if __name__ == "__main__":
    solve()`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                System.out.println(map.get(comp) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
      javascript: `const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);

if (input.length > 1) {
  const n = parseInt(input[0]);
  const nums = input.slice(1, n + 1).map(Number);
  const target = parseInt(input[n + 1]);

  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) {
      console.log(\`\${map.get(comp)} \${i}\`);
      process.exit(0);
    }
    map.set(nums[i], i);
  }
}`,
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
    <button onclick="calc()">Find Indices</button>
    <p id="res" style="font-weight: bold; color: #173E67;"></p>
  </div>
  <script>
    function calc() {
      document.getElementById('res').innerText = 'Indices: [0, 1] (2 + 7 = 9)';
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
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Print `true` if it is a palindrome, or `false` otherwise.",
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
        label: "Case 3 (Single character)",
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
#include <ctype.h>
#include <string.h>

int main() {
    char s[200005];
    if (!fgets(s, sizeof(s), stdin)) {
        printf("true\\n");
        return 0;
    }

    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        while (i < j && !isalnum((unsigned char)s[i])) i++;
        while (i < j && !isalnum((unsigned char)s[j])) j--;
        if (tolower((unsigned char)s[i]) != tolower((unsigned char)s[j])) {
            printf("false\\n");
            return 0;
        }
        i++;
        j--;
    }
    printf("true\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) {
        cout << "true" << endl;
        return 0;
    }

    int left = 0, right = (int)s.length() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) {
            cout << "false" << endl;
            return 0;
        }
        left++;
        right--;
    }
    cout << "true" << endl;
    return 0;
}`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    if filtered == filtered[::-1]:
        print("true")
    else:
        print("false")

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                System.out.println("false");
                return;
            }
            l++;
            r--;
        }
        System.out.println("true");
    }
}`,
      javascript: `const fs = require("fs");
const s = fs.readFileSync(0, "utf-8").trim();

const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
const reversed = clean.split("").reverse().join("");

console.log(clean === reversed ? "true" : "false");`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: Arial; padding: 20px;">
  <h2>Valid Palindrome Checker</h2>
  <input id="txt" value="racecar" style="padding: 8px; width: 220px;" />
  <button onclick="check()" style="padding: 8px 12px; background: #173E67; color: white;">Check</button>
  <div id="out" style="margin-top: 10px; font-weight: bold;"></div>

  <script>
    function check() {
      const s = document.getElementById('txt').value.toLowerCase().replace(/[^a-z0-9]/g, '');
      const rev = s.split('').reverse().join('');
      document.getElementById('out').innerText = s === rev ? '✅ Valid Palindrome!' : '❌ Not a Palindrome';
    }
    check();
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
    outputFormat: "Comma-separated string of results",
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

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) printf("FizzBuzz");
        else if (i % 3 == 0) printf("Fizz");
        else if (i % 5 == 0) printf("Buzz");
        else printf("%d", i);

        if (i < n) printf(", ");
    }
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) cout << "FizzBuzz";
            else if (i % 3 == 0) cout << "Fizz";
            else if (i % 5 == 0) cout << "Buzz";
            else cout << i;

            if (i < n) cout << ", ";
        }
        cout << endl;
    }
    return 0;
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line: return
    n = int(line)
    res = []
    for i in range(1, n + 1):
        if i % 15 == 0: res.append("FizzBuzz")
        elif i % 3 == 0: res.append("Fizz")
        elif i % 5 == 0: res.append("Buzz")
        else: res.append(str(i))
    print(", ".join(res))

if __name__ == "__main__":
    main()`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        List<String> list = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) list.add("FizzBuzz");
            else if (i % 3 == 0) list.add("Fizz");
            else if (i % 5 == 0) list.add("Buzz");
            else list.add(String.valueOf(i));
        }
        System.out.println(String.join(", ", list));
    }
}`,
      javascript: `const fs = require("fs");
const n = parseInt(fs.readFileSync(0, "utf-8").trim());

const res = [];
for (let i = 1; i <= n; i++) {
  if (i % 15 === 0) res.push("FizzBuzz");
  else if (i % 3 === 0) res.push("Fizz");
  else if (i % 5 === 0) res.push("Buzz");
  else res.push(i.toString());
}
console.log(res.join(", "));`,
      web: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; }
    .badge { display: inline-block; padding: 4px 8px; margin: 2px; border-radius: 4px; font-weight: bold; }
    .fb { background: #fee2e2; color: #dc2626; }
    .fizz { background: #eff6ff; color: #2563eb; }
    .buzz { background: #ecfdf5; color: #059669; }
  </style>
</head>
<body>
  <h3>FizzBuzz Visualizer (1 to 20)</h3>
  <div id="container"></div>
  <script>
    const el = document.getElementById('container');
    for (let i = 1; i <= 20; i++) {
      let label = i, cls = '';
      if (i % 15 === 0) { label = 'FizzBuzz'; cls = 'badge fb'; }
      else if (i % 3 === 0) { label = 'Fizz'; cls = 'badge fizz'; }
      else if (i % 5 === 0) { label = 'Buzz'; cls = 'badge buzz'; }
      else { cls = 'badge'; }
      el.innerHTML += \`<span class="\${cls}">\${label}</span>\`;
    }
  </script>
</body>
</html>`,
    },
  },
  {
    id: "max-subarray",
    title: "4. Maximum Subarray (Kadane's Algorithm)",
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

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int max_so_far, current_max;
    int first;
    scanf("%d", &first);
    max_so_far = current_max = first;

    for (int i = 1; i < n; i++) {
        int x;
        scanf("%d", &x);
        current_max = (x > current_max + x) ? x : current_max + x;
        if (current_max > max_so_far) max_so_far = current_max;
    }
    printf("%d\\n", max_so_far);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int maxSoFar = nums[0];
    int currMax = nums[0];
    for (int i = 1; i < n; i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    cout << maxSoFar << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]

    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int maxSoFar = sc.nextInt();
        int currMax = maxSoFar;

        for (int i = 1; i < n; i++) {
            int x = sc.nextInt();
            currMax = Math.max(x, currMax + x);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        System.out.println(maxSoFar);
    }
}`,
      javascript: `const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
const n = parseInt(input[0]);
const nums = input.slice(1, n + 1).map(Number);

let maxSoFar = nums[0];
let currMax = nums[0];

for (let i = 1; i < nums.length; i++) {
  currMax = Math.max(nums[i], currMax + nums[i]);
  maxSoFar = Math.max(maxSoFar, currMax);
}

console.log(maxSoFar);`,
      web: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .bar { display: inline-block; width: 30px; margin: 4px; text-align: center; border-radius: 4px; color: white; font-weight: bold; }
  </style>
</head>
<body>
  <h3>Kadane's Algorithm Visualizer</h3>
  <p>Nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</p>
  <p>Maximum Subarray: [4, -1, 2, 1] &rarr; Sum = <strong>6</strong></p>
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

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    if (n == 0) { printf("0\\n"); return 0; }
    if (n == 1) { printf("1\\n"); return 0; }

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    printf("%d\\n", b);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n == 0) { cout << 0 << endl; return 0; }
    if (n == 1) { cout << 1 << endl; return 0; }

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    cout << b << endl;
    return 0;
}`,
      python: `import sys

def fib(n):
    if n <= 0: return 0
    if n == 1: return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def main():
    line = sys.stdin.read().strip()
    if line:
        print(fib(int(line)))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n <= 0) { System.out.println(0); return; }
        if (n == 1) { System.out.println(1); return; }

        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}`,
      javascript: `const fs = require("fs");
const n = parseInt(fs.readFileSync(0, "utf-8").trim());

if (n <= 0) console.log(0);
else if (n === 1) console.log(1);
else {
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  console.log(b);
}`,
      web: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Fibonacci Generator</h2>
  <input id="num" type="number" value="8" style="padding: 6px; width: 60px;" />
  <button onclick="calc()" style="padding: 6px 12px; background: #ff8000; color: white; border: none; border-radius: 4px;">Calculate</button>
  <p id="res" style="font-size: 18px; font-weight: bold; color: #173E67;"></p>
  <script>
    function calc() {
      const n = parseInt(document.getElementById('num').value);
      let a = 0, b = 1;
      for (let i = 2; i <= n; i++) { const c = a + b; a = b; b = c; }
      document.getElementById('res').innerText = 'F(' + n + ') = ' + (n === 0 ? 0 : b);
    }
    calc();
  </script>
</body>
</html>`,
    },
  },
];
