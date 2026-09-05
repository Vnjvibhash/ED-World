"use client";

import React, { useState } from "react";
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Laptop,
  CheckCircle,
  Copy,
  Check,
  BookOpen
} from "lucide-react";

interface CodeChallenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: string;
  sampleOutput: string;
}

const challenges: CodeChallenge[] = [
  {
    id: "fizzbuzz",
    title: "1. FizzBuzz Challenge",
    difficulty: "Easy",
    description: "Write a program that prints numbers from 1 to 20. But for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
    starterCode: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString());
  }
  return result.join(", ");
}

console.log(fizzBuzz(20));`,
    sampleOutput: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz"
  },
  {
    id: "palindrome",
    title: "2. Valid Palindrome Check",
    difficulty: "Easy",
    description: "Determine if a given string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    starterCode: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}

console.log("racecar:", isPalindrome("racecar"));
console.log("hello:", isPalindrome("hello"));`,
    sampleOutput: "racecar: true\nhello: false"
  },
  {
    id: "fibonacci",
    title: "3. Nth Fibonacci Sequence",
    difficulty: "Medium",
    description: "Generate the first N numbers in the Fibonacci sequence starting with 0, 1.",
    starterCode: `function getFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

console.log("First 10 Fib numbers:", getFibonacci(10).join(", "));`,
    sampleOutput: "First 10 Fib numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34"
  }
];

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<"ide" | "embedded">("ide");
  const [activeChallenge, setActiveChallenge] = useState<CodeChallenge>(challenges[0]);
  const [code, setCode] = useState<string>(challenges[0].starterCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectChallenge = (ch: CodeChallenge) => {
    setActiveChallenge(ch);
    setCode(ch.starterCode);
    setOutput("");
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("");

    try {
      const logs: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
      };

      // Safely evaluate javascript in sandbox
      const runFn = new Function(code);
      runFn();

      console.log = originalConsoleLog;
      setOutput(logs.length > 0 ? logs.join("\n") : "Code executed successfully (no output printed).");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOutput(`Runtime Error: ${err.message}`);
      } else {
        setOutput("An unknown error occurred while running code.");
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>Interactive Coding Playground</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Online <span className="text-accent-500">Coding Practice</span>
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Write, execute, and debug code directly in your browser or use embedded Python compilers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-200/70 border border-slate-300 rounded-2xl">
            <button
              onClick={() => setActiveTab("ide")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "ide"
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>In-Browser JavaScript IDE</span>
            </button>
            <button
              onClick={() => setActiveTab("embedded")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "embedded"
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Trinket Python Compiler</span>
            </button>
          </div>
        </div>

        {/* 1. NATIVE IN-BROWSER CODE RUNNER */}
        {activeTab === "ide" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar with Challenges */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent-500" />
                  <span>Practice Challenges</span>
                </h3>
                <div className="space-y-2">
                  {challenges.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => selectChallenge(ch)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        activeChallenge.id === ch.id
                          ? "bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{ch.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold">
                          {ch.difficulty}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Challenge Description */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs text-slate-600 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm">Problem Statement</h4>
                <p className="leading-relaxed text-slate-600">{activeChallenge.description}</p>
                <div className="pt-2">
                  <span className="font-semibold text-slate-800">Expected Output Preview:</span>
                  <pre className="mt-1 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                    {activeChallenge.sampleOutput}
                  </pre>
                </div>
              </div>
            </div>

            {/* Code Editor & Output */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                {/* Editor Header */}
                <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs font-mono text-slate-300 ml-2 font-medium">solution.js</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 font-medium"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                      <span className="text-white">{copied ? "Copied" : "Copy"}</span>
                    </button>

                    <button
                      onClick={() => setCode(activeChallenge.starterCode)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-white" />
                      <span className="text-white">Reset</span>
                    </button>

                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 shadow-md shadow-accent-500/20 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-white" />
                      <span className="text-white">{isRunning ? "Running..." : "Run Code"}</span>
                    </button>
                  </div>
                </div>

                {/* Code Textarea - dark background with pure crisp white code text */}
                <div className="p-4 bg-slate-950">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={14}
                    spellCheck={false}
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-500 outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Terminal Output Console - dark background with pure crisp white & emerald text */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-2 text-xs font-mono text-white font-medium">
                  <Terminal className="w-4 h-4 text-accent-500" />
                  <span className="text-white">Execution Output Console</span>
                </div>
                <div className="p-4 bg-slate-950/90 min-h-[100px] font-mono text-xs text-white whitespace-pre-wrap">
                  {output ? (
                    <span className="text-emerald-400">{output}</span>
                  ) : (
                    <span className="text-slate-400">Click &quot;Run Code&quot; to compile and view stdout...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. EMBEDDED PYTHON COMPILER (TRINKET) */}
        {activeTab === "embedded" && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-accent-500" />
                <span>Python 3 Interactive Compiler (Powered by Trinket)</span>
              </div>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                src="https://trinket.io/embed/python/3d8d7ce66b?start=result&showInstructions=true"
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen
                title="Python Trinket Playground"
                className="w-full bg-slate-950"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
