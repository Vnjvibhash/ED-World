// Multi-language starter codes and official solutions for TypeScript, Go, Rust, C#, PHP, and Ruby

export interface ExtraLangData {
  starters: Record<string, string>;
  solutions: Record<string, string>;
}

export const ADDITIONAL_LANG_DATA: Record<string, ExtraLangData> = {
  "two-sum": {
    starters: {
      typescript: `import * as fs from "fs";

// User function skeleton:
// Find indices i, j such that nums[i] + nums[j] == target
function findTwoSum(nums: number[], target: number): [number, number] {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    return [-1, -1];
}

function main() {
    const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
    if (input.length < 3) return;
    const n = parseInt(input[0], 10);
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(input[i + 1], 10));
    const target = parseInt(input[n + 1], 10);
    const [i, j] = findTwoSum(nums, target);
    console.log(\`\${i} \${j}\`);
}

main();`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

// User function skeleton:
// Find indices i, j such that nums[i] + nums[j] == target
func findTwoSum(nums []int, target int) (int, int) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    return -1, -1
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    var n int
    if _, err := fmt.Fscan(reader, &n); err != nil {
        return
    }
    nums := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Fscan(reader, &nums[i])
    }
    var target int
    fmt.Fscan(reader, &target)
    i, j := findTwoSum(nums, target)
    fmt.Printf("%d %d\\n", i, j)
}`,
      rust: `use std::io::{self, Read};

// User function skeleton:
// Find indices i, j such that nums[i] + nums[j] == target
fn find_two_sum(nums: &[i32], target: i32) -> (usize, usize) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    (0, 0)
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let mut tokens = input.split_whitespace();
        if let Some(n_str) = tokens.next() {
            let n: usize = n_str.parse().unwrap_or(0);
            let mut nums = Vec::with_capacity(n);
            for _ in 0..n {
                if let Some(tok) = tokens.next() {
                    nums.push(tok.parse::<i32>().unwrap_or(0));
                }
            }
            if let Some(t_str) = tokens.next() {
                let target: i32 = t_str.parse().unwrap_or(0);
                let (i, j) = find_two_sum(&nums, target);
                println!("{} {}", i, j);
            }
        }
    }
}`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    // User function skeleton:
    // Find indices i, j such that nums[i] + nums[j] == target
    static int[] FindTwoSum(int[] nums, int target) {
        // ============================================
        // TODO: Write your logic here
        // ============================================
        return new int[] { -1, -1 };
    }

    static void Main() {
        var input = Console.In.ReadToEnd();
        if (string.IsNullOrWhiteSpace(input)) return;
        var tokens = input.Split(new char[] { ' ', '\\n', '\\r', '\\t' }, StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length < 3) return;
        int n = int.Parse(tokens[0]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = int.Parse(tokens[i + 1]);
        int target = int.Parse(tokens[n + 1]);
        var res = FindTwoSum(nums, target);
        Console.WriteLine($"{res[0]} {res[1]}");
    }
}`,
      php: `<?php
// User function skeleton:
// Find indices i, j such that nums[i] + nums[j] == target
function findTwoSum($nums, $target) {
    // ============================================
    // TODO: Write your logic here
    // ============================================
    return [-1, -1];
}

$input = trim(file_get_contents('php://stdin'));
if (!empty($input)) {
    $tokens = preg_split('/\\s+/', $input);
    $n = (int)$tokens[0];
    $nums = [];
    for ($i = 0; $i < $n; $i++) {
        $nums[] = (int)$tokens[$i + 1];
    }
    $target = (int)$tokens[$n + 1];
    $res = findTwoSum($nums, $target);
    echo $res[0] . " " . $res[1] . "\\n";
}
?>`,
      ruby: `def find_two_sum(nums, target)
  # ============================================
  # TODO: Write your logic here
  # ============================================
  [-1, -1]
end

input = $stdin.read.split
if input.length >= 3
  n = input[0].to_i
  nums = input[1..n].map(&:to_i)
  target = input[n + 1].to_i
  i, j = find_two_sum(nums, target)
  puts "#{i} #{j}"
end`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function findTwoSum(nums: number[], target: number): [number, number] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            return [map.get(comp)!, i];
        }
        map.set(nums[i], i);
    }
    return [-1, -1];
}

function main() {
    const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
    if (input.length < 3) return;
    const n = parseInt(input[0], 10);
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(input[i + 1], 10));
    const target = parseInt(input[n + 1], 10);
    const [i, j] = findTwoSum(nums, target);
    console.log(\`\${i} \${j}\`);
}

main();`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func findTwoSum(nums []int, target int) (int, int) {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, exists := seen[complement]; exists {
            return idx, i
        }
        seen[num] = i
    }
    return -1, -1
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    var n int
    if _, err := fmt.Fscan(reader, &n); err != nil {
        return
    }
    nums := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Fscan(reader, &nums[i])
    }
    var target int
    fmt.Fscan(reader, &target)
    i, j := findTwoSum(nums, target)
    fmt.Printf("%d %d\\n", i, j)
}`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};

fn find_two_sum(nums: &[i32], target: i32) -> (usize, usize) {
    let mut map = HashMap::new();
    for (i, &val) in nums.iter().enumerate() {
        let comp = target - val;
        if let Some(&prev_idx) = map.get(&comp) {
            return (prev_idx, i);
        }
        map.insert(val, i);
    }
    (0, 0)
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let mut tokens = input.split_whitespace();
        if let Some(n_str) = tokens.next() {
            let n: usize = n_str.parse().unwrap_or(0);
            let mut nums = Vec::with_capacity(n);
            for _ in 0..n {
                if let Some(tok) = tokens.next() {
                    nums.push(tok.parse::<i32>().unwrap_or(0));
                }
            }
            if let Some(t_str) = tokens.next() {
                let target: i32 = t_str.parse().unwrap_or(0);
                let (i, j) = find_two_sum(&nums, target);
                println!("{} {}", i, j);
            }
        }
    }
}`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static int[] FindTwoSum(int[] nums, int target) {
        var map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int comp = target - nums[i];
            if (map.ContainsKey(comp)) {
                return new int[] { map[comp], i };
            }
            map[nums[i]] = i;
        }
        return new int[] { -1, -1 };
    }

    static void Main() {
        var input = Console.In.ReadToEnd();
        if (string.IsNullOrWhiteSpace(input)) return;
        var tokens = input.Split(new char[] { ' ', '\\n', '\\r', '\\t' }, StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length < 3) return;
        int n = int.Parse(tokens[0]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = int.Parse(tokens[i + 1]);
        int target = int.Parse(tokens[n + 1]);
        var res = FindTwoSum(nums, target);
        Console.WriteLine($"{res[0]} {res[1]}");
    }
}`,
      php: `<?php
function findTwoSum($nums, $target) {
    $map = [];
    foreach ($nums as $i => $num) {
        $comp = $target - $num;
        if (isset($map[$comp])) {
            return [$map[$comp], $i];
        }
        $map[$num] = $i;
    }
    return [-1, -1];
}

$input = trim(file_get_contents('php://stdin'));
if (!empty($input)) {
    $tokens = preg_split('/\\s+/', $input);
    $n = (int)$tokens[0];
    $nums = [];
    for ($i = 0; $i < $n; $i++) {
        $nums[] = (int)$tokens[$i + 1];
    }
    $target = (int)$tokens[$n + 1];
    $res = findTwoSum($nums, $target);
    echo $res[0] . " " . $res[1] . "\\n";
}
?>`,
      ruby: `def find_two_sum(nums, target)
  map = {}
  nums.each_with_index do |num, i|
    comp = target - num
    return [map[comp], i] if map.key?(comp)
    map[num] = i
  end
  [-1, -1]
end

input = $stdin.read.split
if input.length >= 3
  n = input[0].to_i
  nums = input[1..n].map(&:to_i)
  target = input[n + 1].to_i
  i, j = find_two_sum(nums, target)
  puts "#{i} #{j}"
end`,
    },
  },

  "palindrome-check": {
    starters: {
      typescript: `import * as fs from "fs";

function isPalindrome(s: string): boolean {
    // TODO: Write your logic here
    return false;
}

const input = fs.readFileSync(0, "utf-8").trim();
console.log(isPalindrome(input) ? "true" : "false");`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func isPalindrome(s string) bool {
    // TODO: Write your logic here
    return false
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    if scanner.Scan() {
        s := scanner.Text()
        if isPalindrome(s) {
            fmt.Println("true")
        } else {
            fmt.Println("false")
        }
    }
}`,
      rust: `use std::io::{self, Read};

fn is_palindrome(s: &str) -> bool {
    // TODO: Write your logic here
    false
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let s = input.trim_end();
        println!("{}", if is_palindrome(s) { "true" } else { "false" });
    }
}`,
      csharp: `using System;

class Program {
    static bool IsPalindrome(string s) {
        // TODO: Write your logic here
        return false;
    }

    static void Main() {
        string line = Console.ReadLine();
        if (line != null) {
            Console.WriteLine(IsPalindrome(line) ? "true" : "false");
        }
    }
}`,
      php: `<?php
function isPalindrome($s) {
    // TODO: Write your logic here
    return false;
}

$line = fgets(STDIN);
if ($line !== false) {
    $line = rtrim($line, "\\r\\n");
    echo isPalindrome($line) ? "true\\n" : "false\\n";
}
?>`,
      ruby: `def palindrome?(s)
  # TODO: Write your logic here
  false
end

line = gets
if line
  puts palindrome?(line.chomp) ? "true" : "false"
end`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
}

const input = fs.readFileSync(0, "utf-8").trim();
console.log(isPalindrome(input) ? "true" : "false");`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
    "unicode"
)

func isPalindrome(s string) bool {
    runes := []rune(s)
    left, right := 0, len(runes)-1
    for left < right {
        for left < right && !unicode.IsLetter(runes[left]) && !unicode.IsDigit(runes[left]) {
            left++
        }
        for left < right && !unicode.IsLetter(runes[right]) && !unicode.IsDigit(runes[right]) {
            right--
        }
        if unicode.ToLower(runes[left]) != unicode.ToLower(runes[right]) {
            return false
        }
        left++
        right--
    }
    return true
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    if scanner.Scan() {
        s := scanner.Text()
        if isPalindrome(s) {
            fmt.Println("true")
        } else {
            fmt.Println("false")
        }
    }
}`,
      rust: `use std::io::{self, Read};

fn is_palindrome(s: &str) -> bool {
    let chars: Vec<char> = s.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_ascii_lowercase())
        .collect();
    if chars.is_empty() { return true; }
    let mut left = 0;
    let mut right = chars.len() - 1;
    while left < right {
        if chars[left] != chars[right] { return false; }
        left += 1;
        right -= 1;
    }
    true
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let s = input.trim_end();
        println!("{}", if is_palindrome(s) { "true" } else { "false" });
    }
}`,
      csharp: `using System;

class Program {
    static bool IsPalindrome(string s) {
        int left = 0, right = s.Length - 1;
        while (left < right) {
            while (left < right && !char.IsLetterOrDigit(s[left])) left++;
            while (left < right && !char.IsLetterOrDigit(s[right])) right--;
            if (char.ToLower(s[left]) != char.ToLower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }

    static void Main() {
        string line = Console.ReadLine();
        if (line != null) {
            Console.WriteLine(IsPalindrome(line) ? "true" : "false");
        }
    }
}`,
      php: `<?php
function isPalindrome($s) {
    $clean = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $s));
    return $clean === strrev($clean);
}

$line = fgets(STDIN);
if ($line !== false) {
    $line = rtrim($line, "\\r\\n");
    echo isPalindrome($line) ? "true\\n" : "false\\n";
}
?>`,
      ruby: `def palindrome?(s)
  clean = s.downcase.gsub(/[^a-z0-9]/, "")
  clean == clean.reverse
end

line = gets
if line
  puts palindrome?(line.chomp) ? "true" : "false"
end`,
    },
  },

  "fizzbuzz": {
    starters: {
      typescript: `import * as fs from "fs";

function fizzBuzz(n: number): string[] {
    // TODO: Write your logic here
    return [];
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
    const n = parseInt(input, 10);
    const res = fizzBuzz(n);
    console.log(res.join("\\n"));
}`,
      go: `package main

import (
    "fmt"
)

func fizzBuzz(n int) []string {
    // TODO: Write your logic here
    return nil
}

func main() {
    var n int
    if _, err := fmt.Scan(&n); err == nil {
        res := fizzBuzz(n)
        for _, s := range res {
            fmt.Println(s)
        }
    }
}`,
      rust: `use std::io::{self, Read};

fn fizz_buzz(n: i32) -> Vec<String> {
    // TODO: Write your logic here
    vec![]
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        if let Ok(n) = input.trim().parse::<i32>() {
            for s in fizz_buzz(n) {
                println!("{}", s);
            }
        }
    }
}`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static List<string> FizzBuzz(int n) {
        // TODO: Write your logic here
        return new List<string>();
    }

    static void Main() {
        string line = Console.ReadLine();
        if (int.TryParse(line, out int n)) {
            foreach (var s in FizzBuzz(n)) {
                Console.WriteLine(s);
            }
        }
    }
}`,
      php: `<?php
function fizzBuzz($n) {
    // TODO: Write your logic here
    return [];
}

$line = trim(fgets(STDIN));
if (!empty($line)) {
    $n = (int)$line;
    foreach (fizzBuzz($n) as $s) {
        echo $s . "\\n";
    }
}
?>`,
      ruby: `def fizz_buzz(n)
  # TODO: Write your logic here
  []
end

line = gets
if line
  n = line.to_i
  fizz_buzz(n).each { |s| puts s }
end`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function fizzBuzz(n: number): string[] {
    const res: string[] = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) res.push("FizzBuzz");
        else if (i % 3 === 0) res.push("Fizz");
        else if (i % 5 === 0) res.push("Buzz");
        else res.push(i.toString());
    }
    return res;
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
    const n = parseInt(input, 10);
    const res = fizzBuzz(n);
    console.log(res.join("\\n"));
}`,
      go: `package main

import (
    "fmt"
    "strconv"
)

func fizzBuzz(n int) []string {
    res := make([]string, n)
    for i := 1; i <= n; i++ {
        if i%15 == 0 {
            res[i-1] = "FizzBuzz"
        } else if i%3 == 0 {
            res[i-1] = "Fizz"
        } else if i%5 == 0 {
            res[i-1] = "Buzz"
        } else {
            res[i-1] = strconv.Itoa(i)
        }
    }
    return res
}

func main() {
    var n int
    if _, err := fmt.Scan(&n); err == nil {
        for _, s := range fizzBuzz(n) {
            fmt.Println(s)
        }
    }
}`,
      rust: `use std::io::{self, Read};

fn fizz_buzz(n: i32) -> Vec<String> {
    let mut res = Vec::with_capacity(n as usize);
    for i in 1..=n {
        if i % 15 == 0 {
            res.push("FizzBuzz".to_string());
        } else if i % 3 == 0 {
            res.push("Fizz".to_string());
        } else if i % 5 == 0 {
            res.push("Buzz".to_string());
        } else {
            res.push(i.to_string());
        }
    }
    res
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        if let Ok(n) = input.trim().parse::<i32>() {
            for s in fizz_buzz(n) {
                println!("{}", s);
            }
        }
    }
}`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static List<string> FizzBuzz(int n) {
        var res = new List<string>(n);
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) res.Add("FizzBuzz");
            else if (i % 3 == 0) res.Add("Fizz");
            else if (i % 5 == 0) res.Add("Buzz");
            else res.Add(i.ToString());
        }
        return res;
    }

    static void Main() {
        string line = Console.ReadLine();
        if (int.TryParse(line, out int n)) {
            foreach (var s in FizzBuzz(n)) {
                Console.WriteLine(s);
            }
        }
    }
}`,
      php: `<?php
function fizzBuzz($n) {
    $res = [];
    for ($i = 1; $i <= $n; $i++) {
        if ($i % 15 === 0) $res[] = "FizzBuzz";
        else if ($i % 3 === 0) $res[] = "Fizz";
        else if ($i % 5 === 0) $res[] = "Buzz";
        else $res[] = (string)$i;
    }
    return $res;
}

$line = trim(fgets(STDIN));
if (!empty($line)) {
    $n = (int)$line;
    foreach (fizzBuzz($n) as $s) {
        echo $s . "\\n";
    }
}
?>`,
      ruby: `def fizz_buzz(n)
  (1..n).map do |i|
    if i % 15 == 0
      "FizzBuzz"
    elsif i % 3 == 0
      "Fizz"
    elsif i % 5 == 0
      "Buzz"
    else
      i.to_s
    end
  end
end

line = gets
if line
  n = line.to_i
  fizz_buzz(n).each { |s| puts s }
end`,
    },
  },

  "max-subarray": {
    starters: {
      typescript: `import * as fs from "fs";

function maxSubArray(nums: number[]): number {
    // TODO: Write your logic here
    return 0;
}

const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
if (input.length >= 2) {
    const n = parseInt(input[0], 10);
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(input[i + 1], 10));
    console.log(maxSubArray(nums));
}`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func maxSubArray(nums []int) int {
    // TODO: Write your logic here
    return 0
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    var n int
    if _, err := fmt.Fscan(reader, &n); err != nil {
        return
    }
    nums := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Fscan(reader, &nums[i])
    }
    fmt.Println(maxSubArray(nums))
}`,
      rust: `use std::io::{self, Read};

fn max_sub_array(nums: &[i32]) -> i32 {
    // TODO: Write your logic here
    0
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let mut tokens = input.split_whitespace();
        if let Some(n_str) = tokens.next() {
            let n: usize = n_str.parse().unwrap_or(0);
            let mut nums = Vec::with_capacity(n);
            for _ in 0..n {
                if let Some(tok) = tokens.next() {
                    nums.push(tok.parse::<i32>().unwrap_or(0));
                }
            }
            println!("{}", max_sub_array(&nums));
        }
    }
}`,
      csharp: `using System;

class Program {
    static int MaxSubArray(int[] nums) {
        // TODO: Write your logic here
        return 0;
    }

    static void Main() {
        var input = Console.In.ReadToEnd();
        if (string.IsNullOrWhiteSpace(input)) return;
        var tokens = input.Split(new char[] { ' ', '\\n', '\\r', '\\t' }, StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length < 2) return;
        int n = int.Parse(tokens[0]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = int.Parse(tokens[i + 1]);
        Console.WriteLine(MaxSubArray(nums));
    }
}`,
      php: `<?php
function maxSubArray($nums) {
    // TODO: Write your logic here
    return 0;
}

$input = trim(file_get_contents('php://stdin'));
if (!empty($input)) {
    $tokens = preg_split('/\\s+/', $input);
    $n = (int)$tokens[0];
    $nums = [];
    for ($i = 0; $i < $n; $i++) {
        $nums[] = (int)$tokens[$i + 1];
    }
    echo maxSubArray($nums) . "\\n";
}
?>`,
      ruby: `def max_sub_array(nums)
  # TODO: Write your logic here
  0
end

input = $stdin.read.split
if input.length >= 2
  n = input[0].to_i
  nums = input[1..n].map(&:to_i)
  puts max_sub_array(nums)
end`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let curr = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
}

const input = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);
if (input.length >= 2) {
    const n = parseInt(input[0], 10);
    const nums: number[] = [];
    for (let i = 0; i < n; i++) nums.push(parseInt(input[i + 1], 10));
    console.log(maxSubArray(nums));
}`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func max(a, b int) int {
    if a > b { return a }
    return b
}

func maxSubArray(nums []int) int {
    maxSum := nums[0]
    curr := nums[0]
    for i := 1; i < len(nums); i++ {
        curr = max(nums[i], curr + nums[i])
        maxSum = max(maxSum, curr)
    }
    return maxSum
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    var n int
    if _, err := fmt.Fscan(reader, &n); err != nil {
        return
    }
    nums := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Fscan(reader, &nums[i])
    }
    fmt.Println(maxSubArray(nums))
}`,
      rust: `use std::cmp::max;
use std::io::{self, Read};

fn max_sub_array(nums: &[i32]) -> i32 {
    let mut max_sum = nums[0];
    let mut curr = nums[0];
    for &x in &nums[1..] {
        curr = max(x, curr + x);
        max_sum = max(max_sum, curr);
    }
    max_sum
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        let mut tokens = input.split_whitespace();
        if let Some(n_str) = tokens.next() {
            let n: usize = n_str.parse().unwrap_or(0);
            let mut nums = Vec::with_capacity(n);
            for _ in 0..n {
                if let Some(tok) = tokens.next() {
                    nums.push(tok.parse::<i32>().unwrap_or(0));
                }
            }
            println!("{}", max_sub_array(&nums));
        }
    }
}`,
      csharp: `using System;

class Program {
    static int MaxSubArray(int[] nums) {
        int maxSum = nums[0];
        int curr = nums[0];
        for (int i = 1; i < nums.Length; i++) {
            curr = Math.Max(nums[i], curr + nums[i]);
            maxSum = Math.Max(maxSum, curr);
        }
        return maxSum;
    }

    static void Main() {
        var input = Console.In.ReadToEnd();
        if (string.IsNullOrWhiteSpace(input)) return;
        var tokens = input.Split(new char[] { ' ', '\\n', '\\r', '\\t' }, StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length < 2) return;
        int n = int.Parse(tokens[0]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = int.Parse(tokens[i + 1]);
        Console.WriteLine(MaxSubArray(nums));
    }
}`,
      php: `<?php
function maxSubArray($nums) {
    $maxSum = $nums[0];
    $curr = $nums[0];
    for ($i = 1; $i < count($nums); $i++) {
        $curr = max($nums[$i], $curr + $nums[$i]);
        $maxSum = max($maxSum, $curr);
    }
    return $maxSum;
}

$input = trim(file_get_contents('php://stdin'));
if (!empty($input)) {
    $tokens = preg_split('/\\s+/', $input);
    $n = (int)$tokens[0];
    $nums = [];
    for ($i = 0; $i < $n; $i++) {
        $nums[] = (int)$tokens[$i + 1];
    }
    echo maxSubArray($nums) . "\\n";
}
?>`,
      ruby: `def max_sub_array(nums)
  max_sum = nums[0]
  curr = nums[0]
  (1...nums.length).each do |i|
    curr = [nums[i], curr + nums[i]].max
    max_sum = [max_sum, curr].max
  end
  max_sum
end

input = $stdin.read.split
if input.length >= 2
  n = input[0].to_i
  nums = input[1..n].map(&:to_i)
  puts max_sub_array(nums)
end`,
    },
  },

  "fibonacci": {
    starters: {
      typescript: `import * as fs from "fs";

function fib(n: number): number {
    // TODO: Write your logic here
    return 0;
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
    console.log(fib(parseInt(input, 10)));
}`,
      go: `package main

import (
    "fmt"
)

func fib(n int) int {
    // TODO: Write your logic here
    return 0
}

func main() {
    var n int
    if _, err := fmt.Scan(&n); err == nil {
        fmt.Println(fib(n))
    }
}`,
      rust: `use std::io::{self, Read};

fn fib(n: i32) -> i32 {
    // TODO: Write your logic here
    0
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        if let Ok(n) = input.trim().parse::<i32>() {
            println!("{}", fib(n));
        }
    }
}`,
      csharp: `using System;

class Program {
    static int Fib(int n) {
        // TODO: Write your logic here
        return 0;
    }

    static void Main() {
        string line = Console.ReadLine();
        if (int.TryParse(line, out int n)) {
            Console.WriteLine(Fib(n));
        }
    }
}`,
      php: `<?php
function fib($n) {
    // TODO: Write your logic here
    return 0;
}

$line = trim(fgets(STDIN));
if (!empty($line)) {
    echo fib((int)$line) . "\\n";
}
?>`,
      ruby: `def fib(n)
  # TODO: Write your logic here
  0
end

line = gets
if line
  puts fib(line.to_i)
end`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function fib(n: number): number {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
}

const input = fs.readFileSync(0, "utf-8").trim();
if (input) {
    console.log(fib(parseInt(input, 10)));
}`,
      go: `package main

import (
    "fmt"
)

func fib(n int) int {
    if n <= 1 {
        return n
    }
    a, b := 0, 1
    for i := 2; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}

func main() {
    var n int
    if _, err := fmt.Scan(&n); err == nil {
        fmt.Println(fib(n))
    }
}`,
      rust: `use std::io::{self, Read};

fn fib(n: i32) -> i32 {
    if n <= 1 { return n; }
    let (mut a, mut b) = (0, 1);
    for _ in 2..=n {
        let c = a + b;
        a = b;
        b = c;
    }
    b
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        if let Ok(n) = input.trim().parse::<i32>() {
            println!("{}", fib(n));
        }
    }
}`,
      csharp: `using System;

class Program {
    static int Fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }

    static void Main() {
        string line = Console.ReadLine();
        if (int.TryParse(line, out int n)) {
            Console.WriteLine(Fib(n));
        }
    }
}`,
      php: `<?php
function fib($n) {
    if ($n <= 1) return $n;
    $a = 0; $b = 1;
    for ($i = 2; $i <= $n; $i++) {
        $c = $a + $b;
        $a = $b;
        $b = $c;
    }
    return $b;
}

$line = trim(fgets(STDIN));
if (!empty($line)) {
    echo fib((int)$line) . "\\n";
}
?>`,
      ruby: `def fib(n)
  return n if n <= 1
  a, b = 0, 1
  (2..n).each do
    a, b = b, a + b
  end
  b
end

line = gets
if line
  puts fib(line.to_i)
end`,
    },
  },

  "reverse-string": {
    starters: {
      typescript: `import * as fs from "fs";

function reverseString(s: string): string {
    // TODO: Write your logic here
    return "";
}

const input = fs.readFileSync(0, "utf-8").trim();
console.log(reverseString(input));`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func reverseString(s string) string {
    // TODO: Write your logic here
    return ""
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    if scanner.Scan() {
        fmt.Println(reverseString(scanner.Text()))
    }
}`,
      rust: `use std::io::{self, Read};

fn reverse_string(s: &str) -> String {
    // TODO: Write your logic here
    String::new()
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        println!("{}", reverse_string(input.trim()));
    }
}`,
      csharp: `using System;

class Program {
    static string ReverseString(string s) {
        // TODO: Write your logic here
        return "";
    }

    static void Main() {
        string line = Console.ReadLine();
        if (line != null) {
            Console.WriteLine(ReverseString(line));
        }
    }
}`,
      php: `<?php
function reverseString($s) {
    // TODO: Write your logic here
    return "";
}

$line = trim(fgets(STDIN));
echo reverseString($line) . "\\n";
?>`,
      ruby: `def reverse_string(s)
  # TODO: Write your logic here
  ""
end

line = gets
puts reverse_string(line ? line.chomp : "")`,
    },
    solutions: {
      typescript: `import * as fs from "fs";

function reverseString(s: string): string {
    return s.split("").reverse().join("");
}

const input = fs.readFileSync(0, "utf-8").trim();
console.log(reverseString(input));`,
      go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    if scanner.Scan() {
        fmt.Println(reverseString(scanner.Text()))
    }
}`,
      rust: `use std::io::{self, Read};

fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}

fn main() {
    let mut input = String::new();
    if io::stdin().read_to_string(&mut input).is_ok() {
        println!("{}", reverse_string(input.trim()));
    }
}`,
      csharp: `using System;

class Program {
    static string ReverseString(string s) {
        char[] arr = s.ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }

    static void Main() {
        string line = Console.ReadLine();
        if (line != null) {
            Console.WriteLine(ReverseString(line));
        }
    }
}`,
      php: `<?php
function reverseString($s) {
    return strrev($s);
}

$line = trim(fgets(STDIN));
echo reverseString($line) . "\\n";
?>`,
      ruby: `def reverse_string(s)
  s.reverse
end

line = gets
puts reverse_string(line ? line.chomp : "")`,
    },
  },
};
