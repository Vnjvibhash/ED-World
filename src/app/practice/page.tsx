"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  Download,
  Terminal,
  Code2,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  ChevronRight,
  BookOpen,
  Laptop,
  AlertTriangle,
  Clock,
  Cpu,
  Search,
  Zap,
  Globe,
  HelpCircle,
} from "lucide-react";
import {
  PRACTICE_PROBLEMS,
  PracticeProblem,
  SupportedLanguage,
  TestCase,
} from "@/data/practiceQuestions";

const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  { name: string; ext: string; badge: string; icon: string; compiler: string }
> = {
  cpp: { name: "C++", ext: "cpp", badge: "G++ 17/20", icon: "⚡", compiler: "GNU C++ Compiler (GCC)" },
  c: { name: "C", ext: "c", badge: "GCC 14", icon: "🔧", compiler: "GNU C Compiler (GCC)" },
  python: { name: "Python 3", ext: "py", badge: "Python 3.12", icon: "🐍", compiler: "CPython 3 Runtime" },
  java: { name: "Java", ext: "java", badge: "OpenJDK 17", icon: "☕", compiler: "Java Development Kit (JDK)" },
  javascript: { name: "JavaScript", ext: "js", badge: "Node.js 24", icon: "🟨", compiler: "Node.js V8 Engine" },
  web: { name: "HTML / CSS / JS", ext: "html", badge: "Live TryIt", icon: "🌐", compiler: "In-Browser Webview" },
};

interface TestResult {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  exitCode: number;
  passed: boolean;
  executionTimeMs: number;
}

export default function UniversalPracticePage() {
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem>(PRACTICE_PROBLEMS[0]);
  const [language, setLanguage] = useState<SupportedLanguage>("cpp");
  const [code, setCode] = useState<string>(PRACTICE_PROBLEMS[0].starterCodes.cpp);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"testcases" | "stdin" | "preview">("testcases");
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState<number>(0);
  const [customStdin, setCustomStdin] = useState<string>("4\n2 7 11 15\n9");
  
  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [runMode, setRunMode] = useState<"single" | "all">("all");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [singleOutput, setSingleOutput] = useState<{
    stdout: string;
    stderr: string;
    exitCode: number;
    timeMs: number;
  } | null>(null);
  
  // UI preferences
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("sm");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync starter code when language or problem changes
  useEffect(() => {
    const starter = selectedProblem.starterCodes[language] || "";
    setCode(starter);
    setTestResults([]);
    setSingleOutput(null);
    if (selectedProblem.testCases[0]) {
      setCustomStdin(selectedProblem.testCases[0].input);
    }
  }, [selectedProblem, language]);

  // Handle Tab indentation inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const spaces = "    ";
      const newCode = code.substring(0, start) + spaces + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + spaces.length;
      }, 0);
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRunAll();
    }
  };

  // Run all test cases
  const handleRunAll = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunMode("all");
    setActiveConsoleTab("testcases");

    if (language === "web") {
      setIsRunning(false);
      setActiveConsoleTab("preview");
      return;
    }

    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          testCases: selectedProblem.testCases.map((tc) => ({
            id: tc.id,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
          })),
        }),
      });

      const data = await res.json();
      if (data.compilationError) {
        setSingleOutput({
          stdout: "",
          stderr: data.stderr || "Compilation Error",
          exitCode: data.exitCode || 1,
          timeMs: 0,
        });
        setActiveConsoleTab("stdin");
      } else if (data.testResults) {
        setTestResults(data.testResults);
      } else if (data.error) {
        setSingleOutput({
          stdout: "",
          stderr: data.error,
          exitCode: 1,
          timeMs: 0,
        });
        setActiveConsoleTab("stdin");
      }
    } catch (err: unknown) {
      const e = err as Error;
      setSingleOutput({
        stdout: "",
        stderr: `Network Execution Error: ${e.message}`,
        exitCode: 1,
        timeMs: 0,
      });
      setActiveConsoleTab("stdin");
    } finally {
      setIsRunning(false);
    }
  };

  // Run single testcase or custom stdin
  const handleRunSingle = async (inputToRun?: string) => {
    if (isRunning) return;
    setIsRunning(true);
    setRunMode("single");

    const inputVal = inputToRun !== undefined ? inputToRun : customStdin;

    if (language === "web") {
      setIsRunning(false);
      setActiveConsoleTab("preview");
      return;
    }

    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          stdin: inputVal,
        }),
      });

      const data = await res.json();
      setSingleOutput({
        stdout: data.stdout || "",
        stderr: data.stderr || "",
        exitCode: data.exitCode ?? (data.success ? 0 : 1),
        timeMs: data.executionTimeMs || 0,
      });
    } catch (err: unknown) {
      const e = err as Error;
      setSingleOutput({
        stdout: "",
        stderr: `Runner Error: ${e.message}`,
        exitCode: 1,
        timeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution.${LANGUAGE_CONFIG[language].ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Line numbering
  const lineCount = Math.max(code.split("\n").length, 18);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Filtered problems list
  const filteredProblems = PRACTICE_PROBLEMS.filter((p) => {
    const matchesCat = filterCategory === "All" || p.category === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const passedCount = testResults.filter((r) => r.passed).length;
  const isAllPassed = testResults.length > 0 && passedCount === testResults.length;

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all ${
        isFullscreen ? "fixed inset-0 z-50 p-2 overflow-y-auto" : "w-full"
      }`}
    >
      {/* Top Universal IDE Header */}
      <header className="w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/data-structures"
            className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1"
          >
            ← Visualizers
          </Link>
          <div className="h-5 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#173E67] to-[#FF8000] flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  Universal IDE &amp; Practice Arena
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  OnlineGDB &amp; W3 Inspired
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {LANGUAGE_CONFIG[language].compiler}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              disabled={isRunning}
              className="appearance-none bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs py-1.5 pl-3 pr-8 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF8000] cursor-pointer shadow-inner"
            >
              <option value="cpp">⚡ C++ (G++ 17/20)</option>
              <option value="c">🔧 C (GCC 14)</option>
              <option value="python">🐍 Python 3 (v3.12)</option>
              <option value="java">☕ Java (OpenJDK 17)</option>
              <option value="javascript">🟨 JavaScript (Node 24)</option>
              <option value="web">🌐 HTML / CSS / JS (W3 TryIt)</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Run Single Button */}
          <button
            onClick={() => handleRunSingle()}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95 disabled:opacity-50"
            title="Compile and run code using Custom Stdin input"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isRunning && runMode === "single" ? "Running..." : "Run"}</span>
          </button>

          {/* Run All Test Cases Button */}
          <button
            onClick={handleRunAll}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 transition-all active:scale-95 disabled:opacity-50"
            title="Run solution across all test cases (Ctrl + Enter)"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{isRunning && runMode === "all" ? "Evaluating..." : "Submit / All Tests"}</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={() => setCode(selectedProblem.starterCodes[language])}
            disabled={isRunning}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Reset to starter boilerplate"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Copy source code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Download Code */}
          <button
            onClick={handleDownload}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors hidden sm:block"
            title="Download source file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={() => {
              if (fontSize === "sm") setFontSize("base");
              else if (fontSize === "base") setFontSize("lg");
              else setFontSize("sm");
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700"
            title="Adjust editor font size"
          >
            {fontSize === "sm" ? "12px" : fontSize === "base" ? "14px" : "16px"}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Toggle Fullscreen Editor"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Studio Grid (100% View Width) */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Problem Explorer & Description (col-span-4) */}
        <aside className="lg:col-span-4 border-r border-slate-800 bg-slate-900/60 flex flex-col h-full overflow-y-auto">
          {/* Problem Search & Category Filters */}
          <div className="p-3 border-b border-slate-800 space-y-2 bg-slate-900/90 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practice challenges..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#FF8000]"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-semibold">
              {["All", "Algorithms", "Math", "Strings"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all flex-shrink-0 ${
                    filterCategory === cat
                      ? "bg-[#173E67] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Problem List Drawer */}
          <div className="p-3 space-y-1.5 border-b border-slate-800 max-h-56 overflow-y-auto">
            {filteredProblems.map((p) => {
              const isSelected = selectedProblem.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProblem(p)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-gradient-to-r from-[#173E67] to-[#1e4a77] text-white font-bold border border-blue-400/30 shadow-sm"
                      : "bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60"
                  }`}
                >
                  <span className="truncate pr-2">{p.title}</span>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                      p.difficulty === "Easy"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : p.difficulty === "Medium"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Problem Deep Details */}
          <div className="p-4 space-y-4 text-xs text-slate-300 flex-1 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#FF8000] uppercase font-bold tracking-wider">
                  {selectedProblem.category}
                </span>
                <span className="text-[10px] text-slate-400">
                  Acceptance: <strong className="text-emerald-400">{selectedProblem.acceptance}</strong>
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {selectedProblem.title}
              </h2>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedProblem.description}
            </div>

            {/* Input & Output Format */}
            <div className="space-y-2">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000]" />
                Input Format:
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                {selectedProblem.inputFormat}
              </pre>

              <div className="font-bold text-white text-xs flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Output Format:
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400">
                {selectedProblem.outputFormat}
              </pre>
            </div>

            {/* Constraints */}
            <div>
              <div className="font-bold text-white text-xs mb-1.5">Constraints:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-400 font-mono text-[11px]">
                {selectedProblem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Column: Code Editor + Dual Terminal Output (col-span-8) */}
        <main className="lg:col-span-8 flex flex-col h-full overflow-hidden bg-slate-950">
          {/* Editor Header Tab Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 font-mono text-slate-200">
                <span>solution.{LANGUAGE_CONFIG[language].ext}</span>
                <span className="text-[10px] text-slate-500 font-sans">
                  ({LANGUAGE_CONFIG[language].name})
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              {lineCount} lines | UTF-8 | Tab Indent: 4 spaces
            </div>
          </div>

          {/* Code Editor Body with Line Numbers */}
          <div className="flex-1 flex overflow-hidden relative min-h-[300px]">
            {/* Line Number Gutter */}
            <div className="w-12 bg-slate-950 text-slate-600 font-mono text-xs select-none pt-3 pb-3 pr-2 text-right border-r border-slate-900 overflow-hidden leading-relaxed">
              {lineNumbers.map((num) => (
                <div key={num} className="leading-6">
                  {num}
                </div>
              ))}
            </div>

            {/* Editor Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className={`flex-1 p-3 bg-slate-950 text-slate-100 font-mono placeholder-slate-600 outline-none resize-none leading-6 overflow-y-auto whitespace-pre ${
                fontSize === "sm"
                  ? "text-xs"
                  : fontSize === "base"
                  ? "text-sm"
                  : "text-base"
              }`}
              placeholder="// Write your solution here..."
            />
          </div>

          {/* Bottom Dual Console Panel (OnlineGDB & Test Case System) */}
          <div className="h-72 border-t border-slate-800 bg-slate-900 flex flex-col">
            {/* Console Tabs */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveConsoleTab("testcases")}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    activeConsoleTab === "testcases"
                      ? "bg-[#173E67] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Cases</span>
                  {testResults.length > 0 && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isAllPassed
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {passedCount}/{testResults.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveConsoleTab("stdin")}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    activeConsoleTab === "stdin"
                      ? "bg-[#173E67] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Custom Stdin / Terminal</span>
                </button>

                {language === "web" && (
                  <button
                    onClick={() => setActiveConsoleTab("preview")}
                    className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      activeConsoleTab === "preview"
                        ? "bg-[#173E67] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>W3 Live Preview</span>
                  </button>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {isRunning && (
                  <span className="text-amber-400 font-mono text-xs flex items-center gap-1 animate-pulse">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Executing binary...
                  </span>
                )}
                {!isRunning && isAllPassed && (
                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All Test Cases Passed! 🎉
                  </span>
                )}
              </div>
            </div>

            {/* Tab 1: Test Cases Tab */}
            {activeConsoleTab === "testcases" && (
              <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5">
                {/* Test Case Selectors */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProblem.testCases.map((tc, idx) => {
                    const result = testResults.find((r) => r.id === tc.id);
                    return (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestCaseIdx(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          activeTestCaseIdx === idx
                            ? "bg-slate-800 text-white border border-slate-600 shadow-sm"
                            : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      >
                        {result?.passed ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : result && !result.passed ? (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                        )}
                        <span>{tc.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Test Case Details */}
                {(() => {
                  const tc = selectedProblem.testCases[activeTestCaseIdx];
                  const res = testResults.find((r) => r.id === tc?.id);
                  if (!tc) return null;

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs flex-1">
                      {/* Input Box */}
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Test Input (stdin)
                        </span>
                        <pre className="font-mono text-slate-200 text-[11px] overflow-x-auto whitespace-pre-wrap flex-1">
                          {tc.input}
                        </pre>
                      </div>

                      {/* Expected Output */}
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                          Expected Output
                        </span>
                        <pre className="font-mono text-emerald-400 text-[11px] overflow-x-auto whitespace-pre-wrap flex-1">
                          {tc.expectedOutput}
                        </pre>
                      </div>

                      {/* Actual Output */}
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            Actual Output
                          </span>
                          {res && (
                            <span
                              className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                                res.passed
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-rose-500/20 text-rose-400"
                              }`}
                            >
                              {res.passed ? "Passed" : "Failed"} ({res.executionTimeMs}ms)
                            </span>
                          )}
                        </div>
                        <pre
                          className={`font-mono text-[11px] overflow-x-auto whitespace-pre-wrap flex-1 ${
                            res?.passed
                              ? "text-emerald-400"
                              : res && !res.passed
                              ? "text-rose-400"
                              : "text-slate-500"
                          }`}
                        >
                          {res
                            ? res.actualOutput || res.stderr || "(No output)"
                            : "Click 'Submit / All Tests' to evaluate this test case."}
                        </pre>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Tab 2: Custom Stdin & Realtime Terminal */}
            {activeConsoleTab === "stdin" && (
              <div className="flex-1 p-3 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Stdin Area */}
                <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-amber-400" />
                      Custom Standard Input (stdin)
                    </span>
                    <button
                      onClick={() => handleRunSingle(customStdin)}
                      disabled={isRunning}
                      className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[10px]"
                    >
                      Run with Stdin
                    </button>
                  </div>
                  <textarea
                    value={customStdin}
                    onChange={(e) => setCustomStdin(e.target.value)}
                    rows={4}
                    placeholder="Enter command-line input lines for stdin..."
                    className="w-full flex-1 bg-transparent font-mono text-[11px] text-slate-200 outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Stderr / Stdout Console */}
                <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 flex flex-col font-mono text-[11px]">
                  <div className="flex items-center justify-between mb-1.5 text-slate-400">
                    <span className="text-[10px] font-bold uppercase">Terminal Stdout / Stderr</span>
                    {singleOutput && (
                      <span className="text-[10px] text-slate-400">
                        Exit: {singleOutput.exitCode} | Time: {singleOutput.timeMs}ms
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap">
                    {singleOutput ? (
                      <>
                        {singleOutput.stdout && (
                          <div className="text-emerald-400">{singleOutput.stdout}</div>
                        )}
                        {singleOutput.stderr && (
                          <div className="text-rose-400 font-bold mt-1">
                            {singleOutput.stderr}
                          </div>
                        )}
                        {!singleOutput.stdout && !singleOutput.stderr && (
                          <div className="text-slate-500 italic">(Process exited with 0 output)</div>
                        )}
                      </>
                    ) : (
                      <span className="text-slate-500 italic">
                        Terminal output will appear here after clicking &quot;Run&quot;...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: W3Schools Style Live Webview */}
            {activeConsoleTab === "preview" && (
              <div className="flex-1 p-2 bg-white rounded-b-xl overflow-hidden">
                <iframe
                  ref={iframeRef}
                  srcDoc={code}
                  title="W3Schools Live Webview"
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
