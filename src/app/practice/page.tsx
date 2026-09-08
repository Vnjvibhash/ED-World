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
  MessageSquare,
  ThumbsUp,
  Plus,
  Send,
  X,
  ExternalLink,
  Lightbulb,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import {
  PRACTICE_PROBLEMS,
  PracticeProblem,
  SupportedLanguage,
  TestCase,
  CommunitySolution,
  SolutionComment,
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
  
  // Left Panel Tabs: "problem" | "solution" | "community"
  const [activeLeftTab, setActiveLeftTab] = useState<"problem" | "solution" | "community">("problem");
  const [solutionLanguage, setSolutionLanguage] = useState<SupportedLanguage>("cpp");
  const [solutionCopied, setSolutionCopied] = useState(false);
  const [isProblemListCollapsed, setIsProblemListCollapsed] = useState(true);

  // Community Solutions State
  const [communityList, setCommunityList] = useState<CommunitySolution[]>(selectedProblem.communitySolutions || []);
  const [expandedCodeIds, setExpandedCodeIds] = useState<Record<string, boolean>>({});
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Submission Modal & Form
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitAuthor, setSubmitAuthor] = useState("");
  const [submitTitle, setSubmitTitle] = useState("");
  const [submitLanguage, setSubmitLanguage] = useState<SupportedLanguage>("cpp");
  const [submitTimeComplexity, setSubmitTimeComplexity] = useState("O(N)");
  const [submitSpaceComplexity, setSubmitSpaceComplexity] = useState("O(1)");
  const [submitApproach, setSubmitApproach] = useState("");
  const [submitCode, setSubmitCode] = useState("");

  // Inline Comment Inputs per Solution
  const [commentAuthors, setCommentAuthors] = useState<Record<string, string>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
  const [activeEngine, setActiveEngine] = useState<string>("Cloud & Local Engine Ready");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

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

  // Keep solutionLanguage in sync with active editor language initially
  useEffect(() => {
    setSolutionLanguage(language);
  }, [language]);

  // Load Community Submissions and Upvotes from localStorage for selected problem
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storageKey = `ed_world_community_${selectedProblem.id}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: CommunitySolution[] = JSON.parse(saved);
        const defaultSols = selectedProblem.communitySolutions || [];
        const savedIds = new Set(parsed.map((s) => s.id));
        const combined = [...parsed, ...defaultSols.filter((s) => !savedIds.has(s.id))];
        setCommunityList(combined);
      } else {
        setCommunityList(selectedProblem.communitySolutions || []);
      }
    } catch {
      setCommunityList(selectedProblem.communitySolutions || []);
    }

    try {
      const savedUpvotes = localStorage.getItem("ed_world_upvotes");
      if (savedUpvotes) {
        setUpvotedIds(JSON.parse(savedUpvotes));
      }
    } catch {}

    try {
      const savedUser = localStorage.getItem("ed_world_author_name");
      if (savedUser && !submitAuthor) {
        setSubmitAuthor(savedUser);
      }
    } catch {}
  }, [selectedProblem]);

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
      if (data.engine) setActiveEngine(data.engine);
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
      if (data.engine) setActiveEngine(data.engine);
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

  // Official Solution Handlers
  const handleCopyOfficialSolution = () => {
    const solCode = selectedProblem.officialSolutions[solutionLanguage] || "";
    navigator.clipboard.writeText(solCode);
    setSolutionCopied(true);
    setTimeout(() => setSolutionCopied(false), 2000);
    showToast("Official solution copied to clipboard!");
  };

  const handleLoadOfficialSolution = () => {
    const solCode = selectedProblem.officialSolutions[solutionLanguage] || "";
    if (solutionLanguage !== language) {
      setLanguage(solutionLanguage);
    }
    setCode(solCode);
    setSingleOutput(null);
    setTestResults([]);
    showToast(`Loaded official ${LANGUAGE_CONFIG[solutionLanguage].name} solution into editor!`);
  };

  // Community Submission Handlers
  const handleOpenSubmitModal = () => {
    setSubmitLanguage(language);
    setSubmitTitle(`Optimal ${LANGUAGE_CONFIG[language].name} Approach`);
    setSubmitCode(code);
    setSubmitApproach("");
    setSubmitTimeComplexity("O(N)");
    setSubmitSpaceComplexity("O(1)");
    setIsSubmitModalOpen(true);
  };

  const handleSubmitSolution = (e: React.FormEvent) => {
    e.preventDefault();
    const author = submitAuthor.trim() || "Anonymous Developer";
    const title = submitTitle.trim() || `${LANGUAGE_CONFIG[submitLanguage].name} Solution`;
    const approach = submitApproach.trim() || "Optimal algorithm implementation with clean structure.";
    const solCode = submitCode.trim();

    if (!solCode) {
      showToast("Please provide your solution code.");
      return;
    }

    const newSolution: CommunitySolution = {
      id: `comm_${Date.now()}`,
      problemId: selectedProblem.id,
      author,
      title,
      language: submitLanguage,
      approach,
      code: solCode,
      timeComplexity: submitTimeComplexity.trim() || "O(N)",
      spaceComplexity: submitSpaceComplexity.trim() || "O(1)",
      upvotes: 1,
      createdAt: "Just now",
      comments: [],
    };

    const updated = [newSolution, ...communityList];
    setCommunityList(updated);

    try {
      localStorage.setItem(`ed_world_community_${selectedProblem.id}`, JSON.stringify(updated));
      localStorage.setItem("ed_world_author_name", author);
    } catch {}

    setIsSubmitModalOpen(false);
    setActiveLeftTab("community");
    showToast("Your solution and comment have been posted to the community! 🚀");
  };

  const handleToggleUpvote = (solId: string) => {
    if (upvotedIds[solId]) {
      showToast("You've already upvoted this solution!");
      return;
    }
    const updated = communityList.map((s) => (s.id === solId ? { ...s, upvotes: s.upvotes + 1 } : s));
    setCommunityList(updated);
    const newUpvotes = { ...upvotedIds, [solId]: true };
    setUpvotedIds(newUpvotes);

    try {
      localStorage.setItem(`ed_world_community_${selectedProblem.id}`, JSON.stringify(updated));
      localStorage.setItem("ed_world_upvotes", JSON.stringify(newUpvotes));
    } catch {}
    showToast("Solution upvoted! 👍");
  };

  const handleAddComment = (solId: string) => {
    const author = (commentAuthors[solId] || submitAuthor || "").trim() || "Fellow Developer";
    const text = (commentTexts[solId] || "").trim();
    if (!text) {
      showToast("Please enter a comment before posting.");
      return;
    }

    const newComment: SolutionComment = {
      id: `comm_c_${Date.now()}`,
      author,
      text,
      createdAt: "Just now",
    };

    const updated = communityList.map((s) => {
      if (s.id === solId) {
        return {
          ...s,
          comments: [...(s.comments || []), newComment],
        };
      }
      return s;
    });

    setCommunityList(updated);
    setCommentTexts((prev) => ({ ...prev, [solId]: "" }));

    try {
      localStorage.setItem(`ed_world_community_${selectedProblem.id}`, JSON.stringify(updated));
      localStorage.setItem("ed_world_author_name", author);
    } catch {}
    showToast("Comment posted!");
  };

  const handleToggleExpandCode = (solId: string) => {
    setExpandedCodeIds((prev) => ({ ...prev, [solId]: !prev[solId] }));
  };

  const handleLoadCommunityCode = (solCode: string, solLang: SupportedLanguage) => {
    if (solLang !== language) {
      setLanguage(solLang);
    }
    setCode(solCode);
    setSingleOutput(null);
    setTestResults([]);
    showToast(`Loaded community ${LANGUAGE_CONFIG[solLang].name} code into editor!`);
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
                  Universal Code Lab
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
              <option value="web">🌐 HTML / CSS / JS (Live Webview)</option>
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
        {/* Left Column: Problem Explorer, Solution & Community Discussions (col-span-4) */}
        <aside className="lg:col-span-4 border-r border-slate-800 bg-slate-900/60 flex flex-col h-full overflow-hidden">
          {/* Problem Search & Category Filters */}
          <div className="p-2.5 border-b border-slate-800 space-y-2 bg-slate-900/95 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#FF8000]"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px] font-semibold">
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

          {/* Collapsible Challenges Catalog */}
          <div className="border-b border-slate-800 bg-slate-900/80">
            <button
              onClick={() => setIsProblemListCollapsed(!isProblemListCollapsed)}
              className="w-full px-3 py-2 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#FF8000]" />
                <span>Challenge Catalog ({filteredProblems.length})</span>
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                {isProblemListCollapsed ? "Switch problem" : "Collapse"}
                {isProblemListCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </span>
            </button>

            {!isProblemListCollapsed && (
              <div className="p-2 space-y-1 max-h-48 overflow-y-auto border-t border-slate-800 bg-slate-950/60">
                {filteredProblems.map((p) => {
                  const isSelected = selectedProblem.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProblem(p);
                        setIsProblemListCollapsed(true);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-gradient-to-r from-[#173E67] to-[#1e4a77] text-white font-bold border border-blue-400/30 shadow-sm"
                          : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800/60"
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
            )}
          </div>

          {/* Active Problem Meta Header */}
          <div className="p-3 border-b border-slate-800 bg-slate-950/40">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#FF8000] uppercase font-bold tracking-wider">
                {selectedProblem.category}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                    selectedProblem.difficulty === "Easy"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : selectedProblem.difficulty === "Medium"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {selectedProblem.difficulty}
                </span>
                <span className="text-[10px] text-slate-400">
                  Acceptance: <strong className="text-emerald-400">{selectedProblem.acceptance}</strong>
                </span>
              </div>
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              {selectedProblem.title}
            </h2>
          </div>

          {/* Three-Tab Switcher: Problem / Solution / Community */}
          <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/90 sticky top-0 z-20">
            <button
              onClick={() => setActiveLeftTab("problem")}
              className={`py-2 px-1 text-xs font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeLeftTab === "problem"
                  ? "border-[#FF8000] text-white bg-slate-800/80"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Problem</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("solution")}
              className={`py-2 px-1 text-xs font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeLeftTab === "solution"
                  ? "border-emerald-500 text-emerald-300 bg-emerald-950/30"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solution</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("community")}
              className={`py-2 px-1 text-xs font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeLeftTab === "community"
                  ? "border-blue-500 text-blue-300 bg-blue-950/30"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Community ({communityList.length})</span>
            </button>
          </div>

          {/* TAB 1: PROBLEM STATEMENT */}
          {activeLeftTab === "problem" && (
            <div className="p-4 space-y-4 text-xs text-slate-300 flex-1 overflow-y-auto">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedProblem.description}
              </div>

              {/* Input & Output Format */}
              <div className="space-y-2">
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000]" />
                  Input Format:
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
                  {selectedProblem.inputFormat}
                </pre>

                <div className="font-bold text-white text-xs flex items-center gap-1.5 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Output Format:
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 whitespace-pre-wrap">
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

              {/* Sample Cases Preview */}
              <div>
                <div className="font-bold text-white text-xs mb-1.5">Sample Test Cases:</div>
                <div className="space-y-2">
                  {selectedProblem.testCases.slice(0, 2).map((tc, idx) => (
                    <div key={tc.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400">Example {idx + 1}:</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div>
                          <span className="text-slate-500 text-[10px] block">Input:</span>
                          <span className="text-slate-300">{tc.input.replace(/\n/g, " ")}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">Expected Output:</span>
                          <span className="text-emerald-400">{tc.expectedOutput}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OFFICIAL SOLUTION & EXPLANATION */}
          {activeLeftTab === "solution" && (
            <div className="p-4 space-y-4 text-xs text-slate-300 flex-1 overflow-y-auto">
              {/* Solution Header & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-300 text-xs">
                    Verified Correct Solution
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyOfficialSolution}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all"
                    title="Copy official solution"
                  >
                    {solutionCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{solutionCopied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={handleLoadOfficialSolution}
                    className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all flex items-center gap-1"
                    title="Load this code into the main editor"
                  >
                    <Play className="w-3 h-3" />
                    <span>Load into Editor</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher for Solution */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400">View Solution in Language:</span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {(["cpp", "c", "python", "java", "javascript", "web"] as SupportedLanguage[]).map((langKey) => (
                    <button
                      key={langKey}
                      onClick={() => setSolutionLanguage(langKey)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 transition-all ${
                        solutionLanguage === langKey
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      <span>{LANGUAGE_CONFIG[langKey].icon}</span> {LANGUAGE_CONFIG[langKey].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time & Space Complexity Breakdown */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time Complexity</span>
                  </div>
                  <div className="text-emerald-400 font-mono font-bold text-xs">
                    {selectedProblem.solutionExplanation.timeComplexity.split(" - ")[0]}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-snug">
                    {selectedProblem.solutionExplanation.timeComplexity.split(" - ")[1] || "Optimal runtime"}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span>Space Complexity</span>
                  </div>
                  <div className="text-cyan-400 font-mono font-bold text-xs">
                    {selectedProblem.solutionExplanation.spaceComplexity.split(" - ")[0]}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-snug">
                    {selectedProblem.solutionExplanation.spaceComplexity.split(" - ")[1] || "Optimal memory"}
                  </div>
                </div>
              </div>

              {/* Algorithmic Approach & Key Takeaway */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Algorithmic Approach</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedProblem.solutionExplanation.approach}
                </p>

                <div className="pt-2 border-t border-slate-850 flex items-start gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#FF8000] px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
                    Key Takeaway
                  </span>
                  <span className="text-slate-300 text-[11px] italic">
                    &quot;{selectedProblem.solutionExplanation.keyTakeaway}&quot;
                  </span>
                </div>
              </div>

              {/* Solution Code Display */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>solution.{LANGUAGE_CONFIG[solutionLanguage].ext}</span>
                  <span>{LANGUAGE_CONFIG[solutionLanguage].badge}</span>
                </div>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-72">
                  <code>{selectedProblem.officialSolutions[solutionLanguage]}</code>
                </pre>
              </div>

              {/* Call-to-action to Submit Community Solution */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-xs">
                    Found an even more efficient solution?
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Contribute your own optimal code, time/space complexity analysis, and algorithmic comments to assist fellow learners.
                </p>
                <button
                  onClick={handleOpenSubmitModal}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Your Solution &amp; Comment</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY SUBMISSIONS & DISCUSSIONS */}
          {activeLeftTab === "community" && (
            <div className="p-4 space-y-4 text-xs text-slate-300 flex-1 overflow-y-auto">
              {/* Community Banner & CTA */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <div>
                  <div className="font-bold text-white text-xs">
                    Community Discussions &amp; Solutions
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {communityList.length} optimal submission{communityList.length === 1 ? "" : "s"} shared
                  </div>
                </div>
                <button
                  onClick={handleOpenSubmitModal}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Code &amp; Comment</span>
                </button>
              </div>

              {/* Submissions List */}
              {communityList.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <Users className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="text-slate-300 font-bold text-xs">No community submissions yet</div>
                  <p className="text-slate-500 text-[11px]">
                    Be the first learner to share your optimal algorithm and comments for this problem!
                  </p>
                  <button
                    onClick={handleOpenSubmitModal}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 mt-2"
                  >
                    <Plus className="w-3 h-3" /> Post First Solution
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {communityList.map((sol) => {
                    const isUpvoted = !!upvotedIds[sol.id];
                    const isCodeExpanded = !!expandedCodeIds[sol.id];
                    return (
                      <div
                        key={sol.id}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all shadow-sm"
                      >
                        {/* Author and Metadata Bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#173E67] to-[#FF8000] text-white font-bold flex items-center justify-center text-[10px]">
                              {sol.author.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <span>{sol.author}</span>
                                <span className="text-[10px] font-normal text-slate-500">
                                  • {sol.createdAt}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {LANGUAGE_CONFIG[sol.language]?.name || sol.language}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {sol.timeComplexity}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                  {sol.spaceComplexity}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Upvote Button */}
                          <button
                            onClick={() => handleToggleUpvote(sol.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              isUpvoted
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                            }`}
                            title="Upvote this solution"
                          >
                            <ThumbsUp className={`w-3 h-3 ${isUpvoted ? "fill-emerald-400 text-emerald-400" : ""}`} />
                            <span>{sol.upvotes}</span>
                          </button>
                        </div>

                        {/* Solution Title */}
                        <h3 className="font-bold text-slate-100 text-xs tracking-tight">
                          {sol.title}
                        </h3>

                        {/* Approach & Comment Text */}
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-850 text-slate-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                          {sol.approach}
                        </div>

                        {/* Code Toggle & Actions */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <button
                              onClick={() => handleToggleExpandCode(sol.id)}
                              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 text-[11px]"
                            >
                              <Code2 className="w-3.5 h-3.5" />
                              <span>{isCodeExpanded ? "Hide Code" : "View Submitted Code"}</span>
                            </button>

                            <button
                              onClick={() => handleLoadCommunityCode(sol.code, sol.language)}
                              className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-[10px] font-bold flex items-center gap-1 transition-all"
                              title="Load this submission into your editor"
                            >
                              <Play className="w-2.5 h-2.5 text-emerald-400" />
                              <span>Load into Editor</span>
                            </button>
                          </div>

                          {isCodeExpanded && (
                            <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-52 leading-relaxed whitespace-pre">
                              <code>{sol.code}</code>
                            </pre>
                          )}
                        </div>

                        {/* Comment Thread on this Solution */}
                        <div className="pt-2 border-t border-slate-850 space-y-2">
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                            <MessageCircle className="w-3 h-3 text-blue-400" />
                            <span>Comments ({sol.comments?.length || 0})</span>
                          </div>

                          {/* Existing Comments */}
                          {sol.comments && sol.comments.length > 0 && (
                            <div className="space-y-1.5 pl-2 border-l-2 border-slate-800">
                              {sol.comments.map((comm) => (
                                <div key={comm.id} className="text-[11px] space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-300">{comm.author}</span>
                                    <span className="text-[10px] text-slate-500">• {comm.createdAt}</span>
                                  </div>
                                  <p className="text-slate-400 leading-snug">{comm.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Comment Input */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <input
                              type="text"
                              value={commentTexts[sol.id] || ""}
                              onChange={(e) =>
                                setCommentTexts((prev) => ({ ...prev, [sol.id]: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddComment(sol.id);
                                }
                              }}
                              placeholder="Write a comment or feedback..."
                              className="flex-1 px-2.5 py-1 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => handleAddComment(sol.id)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95"
                              title="Post comment"
                            >
                              <Send className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
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

          {/* Bottom Dual Console Panel (Test Cases & Terminal System) */}
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
                    <span>Live Web Preview</span>
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

            {/* Tab 3: Interactive Live Webview */}
            {activeConsoleTab === "preview" && (
              <div className="flex-1 p-2 bg-white rounded-b-xl overflow-hidden">
                <iframe
                  ref={iframeRef}
                  srcDoc={code}
                  title="Interactive Live Webview"
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal: Submit Your Own Efficient Code & Comment */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Submit Your Efficient Solution &amp; Comment
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Share optimal code, complexity breakdown, and commentary with learners.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmitSolution} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Row 1: Name & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 flex items-center gap-1">
                    <span>Your Name / Handle</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={submitAuthor}
                    onChange={(e) => setSubmitAuthor(e.target.value)}
                    placeholder="e.g., Alex Developer"
                    required
                    className="w-full px-3 py-2 bg-slate-950 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Programming Language</label>
                  <select
                    value={submitLanguage}
                    onChange={(e) => setSubmitLanguage(e.target.value as SupportedLanguage)}
                    className="w-full px-3 py-2 bg-slate-950 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  >
                    <option value="cpp">⚡ C++ (G++ 17/20)</option>
                    <option value="c">🔧 C (GCC 14)</option>
                    <option value="python">🐍 Python 3 (v3.12)</option>
                    <option value="java">☕ Java (OpenJDK 17)</option>
                    <option value="javascript">🟨 JavaScript (Node 24)</option>
                    <option value="web">🌐 HTML / CSS / JS (Live Webview)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Solution Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1">
                  <span>Solution Title</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={submitTitle}
                  onChange={(e) => setSubmitTitle(e.target.value)}
                  placeholder="e.g., O(N) Single-Pass Hash Map with In-Place Memory"
                  required
                  className="w-full px-3 py-2 bg-slate-950 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>

              {/* Row 3: Complexities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time Complexity</span>
                  </label>
                  <input
                    type="text"
                    value={submitTimeComplexity}
                    onChange={(e) => setSubmitTimeComplexity(e.target.value)}
                    placeholder="e.g., O(N), O(N log N)"
                    className="w-full px-3 py-2 bg-slate-950 font-mono text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span>Space Complexity</span>
                  </label>
                  <input
                    type="text"
                    value={submitSpaceComplexity}
                    onChange={(e) => setSubmitSpaceComplexity(e.target.value)}
                    placeholder="e.g., O(1), O(N)"
                    className="w-full px-3 py-2 bg-slate-950 font-mono text-cyan-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                </div>
              </div>

              {/* Row 4: Approach & Commentary */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Approach Explanation &amp; Comments</span>
                </label>
                <textarea
                  value={submitApproach}
                  onChange={(e) => setSubmitApproach(e.target.value)}
                  rows={3}
                  placeholder="Explain how your solution works, key optimizations, edge cases handled, or performance comparisons..."
                  className="w-full p-2.5 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs leading-relaxed"
                />
              </div>

              {/* Row 5: Solution Code (Pre-filled from user's editor) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-300 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your Solution Code</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Imported from active editor • Editable
                  </span>
                </div>
                <textarea
                  value={submitCode}
                  onChange={(e) => setSubmitCode(e.target.value)}
                  rows={8}
                  placeholder="// Paste or refine your code here..."
                  required
                  className="w-full p-3 bg-slate-950 font-mono text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[11px] leading-relaxed whitespace-pre overflow-x-auto"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Solution &amp; Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl flex items-center gap-2.5 text-xs text-slate-100 backdrop-blur animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
