"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Code2,
  HelpCircle,
  Laptop,
  FileSpreadsheet,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Terminal,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Users,
  Compass,
  PlayCircle,
  FileText,
  UploadCloud,
  Check,
  Layers,
  Award
} from "lucide-react";

interface ResourceCardData {
  id: string;
  title: string;
  category: "ide" | "visualizer" | "quiz" | "assignment" | "curriculum";
  categoryLabel: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  link: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  highlights: string[];
  ctaText: string;
  stats: string;
}

const resourcesData: ResourceCardData[] = [
  {
    id: "javascript-ide",
    title: "Web & JavaScript Interactive IDE",
    category: "ide",
    categoryLabel: "Interactive Sandbox",
    description: "Write, test, and execute modern JavaScript, HTML, and CSS directly in your browser with live DOM rendering, instant console outputs, and preloaded challenges.",
    icon: <Code2 className="w-6 h-6 text-brand-500" />,
    iconBg: "bg-blue-50 border-blue-200",
    link: "/practice",
    badge: "🔥 Live Sandbox",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeColor: "text-brand-600",
    highlights: [
      "Zero installation or configuration needed",
      "Instant console logging and error diagnostics",
      "Built-in DOM playground for UI experiments",
      "Preloaded algorithm challenges and test inputs"
    ],
    ctaText: "Launch Web IDE",
    stats: "Instant Run • 0s Setup"
  },
  {
    id: "python-compiler",
    title: "Python 3 Multi-File Compiler",
    category: "ide",
    categoryLabel: "Full Compiler",
    description: "Multi-file Python 3 compiler with Trinket cloud integration. Build functions, test data structures, analyze terminal logs, and save snippets effortlessly.",
    icon: <Terminal className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
    link: "/practice",
    badge: "⚡ Python 3.x",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeColor: "text-emerald-700",
    highlights: [
      "Full Python 3 standard library compatibility",
      "Multi-tab code editor with indentation guides",
      "Interactive shell with standard input/output",
      "Optimized for algorithmic problem solving"
    ],
    ctaText: "Open Python Compiler",
    stats: "Full Cloud Runner"
  },
  {
    id: "sorting-visualizer",
    title: "Sorting Algorithm Visualizer",
    category: "visualizer",
    categoryLabel: "Algorithm Animation",
    description: "Understand complex algorithms intuitively through live graphic animations. Inspect Bubble, Selection, Insertion, Merge, and Quick Sort step-by-step.",
    icon: <Laptop className="w-6 h-6 text-purple-600" />,
    iconBg: "bg-purple-50 border-purple-200",
    link: "/sorting-algorithm",
    badge: "📊 Step-by-Step",
    badgeBg: "bg-purple-50 border-purple-200",
    badgeColor: "text-purple-700",
    highlights: [
      "Real-time speed and array size adjustments",
      "Visual bar height transitions and comparisons",
      "Time & space complexity comparison tables",
      "Audio frequency pitch indicators for swaps"
    ],
    ctaText: "Explore Visualizer",
    stats: "5 Core Algorithms"
  },
  {
    id: "interactive-quizzes",
    title: "15-Second Skill Challenge Quizzes",
    category: "quiz",
    categoryLabel: "Assessment & Practice",
    description: "Rapid-fire 15-second timed multiple choice challenges across Web Technologies, Object-Oriented Programming, and University Exam topics.",
    icon: <HelpCircle className="w-6 h-6 text-amber-500" />,
    iconBg: "bg-amber-50 border-amber-200",
    link: "/quiz",
    badge: "⏱️ Timed Quiz",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeColor: "text-amber-800",
    highlights: [
      "Dynamic 15-second countdown timer per question",
      "Real-time scoring and accuracy percentage",
      "Detailed answer rationales and key takeaways",
      "Sharable performance badges upon completion"
    ],
    ctaText: "Take Practice Quiz",
    stats: "50+ Curated Questions"
  },
  {
    id: "assignment-vault",
    title: "Semester Assignments & Guidelines",
    category: "assignment",
    categoryLabel: "Academic Tasks",
    description: "Official coursework repository with verified project guidelines, boilerplate starter code, submission deadlines, and evaluation criteria.",
    icon: <FileSpreadsheet className="w-6 h-6 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
    link: "/assignment",
    badge: "📁 Coursework",
    badgeBg: "bg-indigo-50 border-indigo-200",
    badgeColor: "text-indigo-700",
    highlights: [
      "Department-wise organized assignment directories",
      "Clear grading rubrics and test assertions",
      "Downloadable starter templates and data files",
      "Guidelines for lab vivas and term papers"
    ],
    ctaText: "Browse Assignments",
    stats: "All Departments"
  },
  {
    id: "assignment-upload",
    title: "Direct Assignment Submission Portal",
    category: "assignment",
    categoryLabel: "Submission & Grading",
    description: "Submit your final assignment solutions in PDF or ZIP archives with immediate integrity hash verification, receipts, and faculty routing.",
    icon: <ShieldCheck className="w-6 h-6 text-accent-500" />,
    iconBg: "bg-orange-50 border-orange-200",
    link: "/assignment-upload",
    badge: "🚀 Instant Receipt",
    badgeBg: "bg-orange-50 border-orange-200",
    badgeColor: "text-accent-600",
    highlights: [
      "Drag-and-drop secure file uploader",
      "Instant checksum verification receipt",
      "Direct instructor routing with timestamping",
      "Support for multi-file archives and PDF reports"
    ],
    ctaText: "Submit Assignment",
    stats: "Encrypted & Verified"
  },
  {
    id: "departments-syllabi",
    title: "Department Curricula & Syllabi Hub",
    category: "curriculum",
    categoryLabel: "Academic Syllabi",
    description: "Explore accredited university degree syllabi for Engineering (CSE, ECE, Civil), Management, Public Health, and Visual Media.",
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-50 border-blue-200",
    link: "/departments",
    badge: "🏛️ 4 Departments",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeColor: "text-blue-700",
    highlights: [
      "Semester-by-semester course mapping",
      "Downloadable syllabus PDFs and reading lists",
      "Faculty profiles and office hour schedules",
      "Cross-department elective course recommendations"
    ],
    ctaText: "Explore Departments",
    stats: "Full University Catalog"
  },
  {
    id: "developer-directory",
    title: "Mentorship & Developer Directory",
    category: "curriculum",
    categoryLabel: "Peer Network",
    description: "Connect with certified student engineers, senior alumni mentors, and open-source project leads across the ED-World academic community.",
    icon: <Users className="w-6 h-6 text-brand-500" />,
    iconBg: "bg-slate-100 border-slate-200",
    link: "/developer-list",
    badge: "🤝 Mentorship",
    badgeBg: "bg-slate-100 border-slate-200",
    badgeColor: "text-slate-800",
    highlights: [
      "Verified alumni developer profiles",
      "Direct LinkedIn and GitHub portfolio links",
      "Project collaboration and study groups",
      "Senior engineer code review channels"
    ],
    ctaText: "View Developer Directory",
    stats: "Active Student Community"
  }
];

const faqsList = [
  {
    q: "Are these learning resources free for all students?",
    a: "Yes! All interactive tools—including the in-browser JavaScript IDE, Python compiler, Sorting Algorithm Visualizer, and general knowledge quizzes—are 100% free and open to all registered students without requiring a credit card."
  },
  {
    q: "Do I need to install any compilers or extensions on my laptop?",
    a: "No installations are necessary. All code execution runs in secure sandbox environments in your web browser. You can practice coding directly from any desktop, laptop, Chromebook, or tablet."
  },
  {
    q: "How does the Sorting Algorithm Visualizer help with exams?",
    a: "The visualizer steps through each iteration of algorithm execution (swaps, comparisons, indices) in real time. It pairs every step with time and space complexity explanations, helping you master common technical interview and university questions."
  },
  {
    q: "How are submitted assignments tracked and verified?",
    a: "When you upload through our Assignment Upload Portal, a unique verification hash receipt is generated. Your submission is timestamped and forwarded directly to your course department instructor for review."
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "ide", label: "Coding IDEs & Compilers" },
    { id: "visualizer", label: "Algorithm Visualizer" },
    { id: "quiz", label: "Skill Quizzes" },
    { id: "assignment", label: "Assignments & Submissions" },
    { id: "curriculum", label: "Curricula & Community" }
  ];

  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* ============================================================
          1. HERO BANNER
          ============================================================ */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden py-14 sm:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span>ACADEMIC &amp; PRACTICE ECOSYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Comprehensive Learning <span className="text-brand-500">Resources Hub</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore interactive coding environments, visual algorithm simulators, time-pressured skill quizzes, university assignment vaults, and official degree syllabi. Everything you need to accelerate your technical education in one place.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-2xl font-extrabold text-brand-600">2</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Coding IDEs</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-2xl font-extrabold text-purple-600">5</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Algorithm Visualizers</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-2xl font-extrabold text-emerald-600">50+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Quiz Challenges</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-2xl font-extrabold text-accent-600">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Free Student Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. SEARCH & FILTER CONTROLS
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, IDEs, quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================
            3. RESOURCE CARDS GRID
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Row: Icon + Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-3 rounded-xl border ${res.iconBg} shrink-0`}>
                    {res.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${res.badgeBg} ${res.badgeColor}`}>
                    {res.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {res.categoryLabel}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-brand-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {res.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 space-y-2">
                <Link
                  href={res.link}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all bg-slate-100 hover:bg-brand-500 text-slate-800 hover:text-white border border-slate-200 hover:border-brand-500 shadow-sm group-hover:shadow-md"
                >
                  <span>{res.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="text-center text-[10px] text-slate-400 font-medium">
                  {res.stats}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================
            4. STEP-BY-STEP LEARNING WORKFLOW
            ============================================================ */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">STRUCTURED MASTERY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How to Leverage Our Learning Tools
            </h2>
            <p className="text-slate-500 text-sm">
              Follow our recommended 4-step framework to maximize your academic performance and practical engineering competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-extrabold text-base flex items-center justify-center">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">Study Theory</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review course lecture notes, reading catalogs, and syllabus modules across academic departments.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold text-base flex items-center justify-center">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">Visualize Logic</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use the Sorting Algorithm Visualizer to see algorithms execute step-by-step and solidify intuition.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">Test Your Speed</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take the 15-second timed quizzes to evaluate your rapid recall and core foundational concepts.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-accent-500 text-white font-extrabold text-base flex items-center justify-center">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900">Code &amp; Submit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Write solutions in the in-browser IDE, solve assignment problem sets, and upload files with verified receipts.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. FEATURED CALLOUT BANNER
            ============================================================ */}
        <div className="rounded-3xl bg-gradient-to-r from-[#173E67] to-[#0f2844] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 text-white border border-white/20">
              <Zap className="w-4 h-4 text-accent-400" />
              <span>LIVE WEB IDE READY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to write your first program?
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              Launch our interactive Coding Practice Studio right now. Test JavaScript and Python code instantly with sample challenges, interactive consoles, and zero installation.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/practice"
              className="px-6 py-3.5 rounded-full font-bold text-sm text-white shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: "#FF8000",
                backgroundImage: "linear-gradient(135deg, #FF8000 0%, #ea6c00 100%)",
                border: "1px solid #ea6c00",
                boxShadow: "0 4px 15px rgba(255, 128, 0, 0.4)"
              }}
            >
              Open Web IDE Now
            </Link>
          </div>
        </div>

        {/* ============================================================
            6. RESOURCE FAQS
            ============================================================ */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm">
              Answers to common queries about utilizing our learning resources, compilers, and assignment portals.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-accent-500 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-accent-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
