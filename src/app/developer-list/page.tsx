"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Award,
  GraduationCap,
  Mail,
  Heart,
  Check,
  Copy,
  X,
  LayoutGrid,
  List,
  ChevronRight,
  Send,
  Briefcase,
  Code2,
  Rocket,
  Share2,
  CheckCircle2,
  Filter,
  Users,
  Terminal,
  Layers,
  ArrowRight,
  Calendar,
  Clock,
  QrCode,
  ShieldCheck,
  Play,
  RotateCcw
} from "lucide-react";
import {
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon
} from "@/components/common/SocialIcons";
import { teamMembers, TeamMember } from "@/data/team";
import "@/styles/developer-list.css";

export default function DeveloperListPage() {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // State for full profile modal
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "proficiency" | "projects" | "milestones">("overview");

  // State for direct message modal
  const [contactMember, setContactMember] = useState<TeamMember | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

  // State for 1:1 mentorship booking modal
  const [bookingMember, setBookingMember] = useState<TeamMember | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState({
    studentName: "",
    studentEmail: "",
    topic: "",
    date: "Tomorrow, 4:30 PM",
    notes: ""
  });
  const [bookingRefId, setBookingRefId] = useState<string>("");

  // State for Digital ID Card modal
  const [digitalIdMember, setDigitalIdMember] = useState<TeamMember | null>(null);

  // State for join team modal
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", role: "Full-Stack Web", portfolio: "", note: "" });

  // Endorsements counter state
  const [endorsements, setEndorsements] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    teamMembers.forEach((m) => {
      initial[m.id] = m.endorsementsCount || 150;
    });
    return initial;
  });
  const [endorsedMembers, setEndorsedMembers] = useState<Record<string, boolean>>({});

  // Interactive Developer CLI Terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd?: string; text: string; color?: string }>>([
    { text: "ED-World Engineering CLI v2.4.0 [Interactive Node Session]", color: "text-emerald-400" },
    { text: "Type 'help' to view commands or click any action pill below.", color: "text-slate-400" },
    { text: "edworld@leadership:~$ team", color: "text-accent-400" },
    { text: "Found 3 Core Leadership & Engineering Architects:\n  • Vivek Kumar (CTO & Full-Stack) -> [ONLINE]\n  • Sagar Saini (CEO & AI Dev) -> [ONLINE]\n  • Versha Kumari (Lead Content & Research) -> [ONLINE]", color: "text-slate-300" }
  ]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Unique skills across all members
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    teamMembers.forEach((m) => m.skills.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || member.category === selectedCategory;

      const matchesSkill =
        !selectedSkill || member.skills.includes(selectedSkill);

      return matchesSearch && matchesCategory && matchesSkill;
    });
  }, [searchQuery, selectedCategory, selectedSkill]);

  // Handle Endorse / Kudos
  const handleEndorse = (memberId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (endorsedMembers[memberId]) {
      setEndorsements((prev) => ({ ...prev, [memberId]: prev[memberId] - 1 }));
      setEndorsedMembers((prev) => ({ ...prev, [memberId]: false }));
    } else {
      setEndorsements((prev) => ({ ...prev, [memberId]: prev[memberId] + 1 }));
      setEndorsedMembers((prev) => ({ ...prev, [memberId]: true }));
      showToast("Thank you for endorsing! 🎉");
    }
  };

  // Handle copy to clipboard
  const handleCopy = (text: string, label: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`);
    }
  };

  // Execute terminal command
  const runTerminalCmd = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    const newLogs = [...terminalLogs, { cmd: cmdText, text: `edworld@leadership:~$ ${cmdText}`, color: "text-accent-400" }];

    if (trimmed === "help") {
      newLogs.push({
        text: "Available Commands:\n  • team                 - List all core architects & roles\n  • stack vivek          - Inspect Vivek Kumar's system design & tech stack\n  • stack sagar          - Inspect Sagar Saini's AI & ML models\n  • stack versha         - Inspect Versha Kumari's curriculum metrics\n  • office-hours         - View weekly student mentorship schedules\n  • verify               - Board certification & accreditation status\n  • clear                - Clear console log",
        color: "text-slate-300"
      });
    } else if (trimmed === "team") {
      newLogs.push({
        text: "ED-World Founding Leadership:\n1. Vivek Kumar   | CTO & Founder           | EDW-ENG-001 | [ACTIVE]\n2. Sagar Saini   | CEO & Co-Founder        | EDW-AI-002  | [ACTIVE]\n3. Versha Kumari | Content & Research Lead | EDW-RES-003 | [ACTIVE]",
        color: "text-emerald-300"
      });
    } else if (trimmed.includes("vivek")) {
      newLogs.push({
        text: "Vivek Kumar [CTO & Founder]:\n  • Core Stack: Next.js 15, React 19, Node.js, Python, Laravel, AWS\n  • Key Systems: Web IDE Playground, Sorting Visualizer, Role Auth\n  • Status: Available for Architecture Reviews (Tue/Thu 4-6 PM)",
        color: "text-blue-300"
      });
    } else if (trimmed.includes("sagar")) {
      newLogs.push({
        text: "Sagar Saini [CEO & Co-Founder]:\n  • Core Stack: Python, TensorFlow, PyTorch, LLM Tuning, Data Science\n  • Key Systems: AI Student Assistant, Automated Question Generator\n  • Status: Available for AI/ML Mentorship (Wed/Sat 3-5 PM)",
        color: "text-amber-300"
      });
    } else if (trimmed.includes("versha")) {
      newLogs.push({
        text: "Versha Kumari [Content & Research Lead]:\n  • Core Stack: Syllabus Mapping, Educational Analytics, Research QA\n  • Key Systems: 500+ Verified Study Modules, University Benchmarking\n  • Status: Available for Research Q&A (Mon/Fri 2-4 PM)",
        color: "text-purple-300"
      });
    } else if (trimmed === "office-hours" || trimmed === "schedule") {
      newLogs.push({
        text: "Mentorship Office Hours:\n  • Vivek Kumar:   Tue & Thu  • 4:00 PM - 6:00 PM IST\n  • Sagar Saini:   Wed & Sat  • 3:00 PM - 5:00 PM IST\n  • Versha Kumari: Mon & Fri  • 2:00 PM - 4:00 PM IST\n(Click 'Book Mentorship' on any developer card to reserve your slot)",
        color: "text-cyan-300"
      });
    } else if (trimmed === "verify") {
      newLogs.push({
        text: "Accreditation Status: 100% VERIFIED\n  • Certificate Authority: Karnataka Board Certified\n  • Registration: Registered under Ministry of Corporate Affairs, Govt of India\n  • Verification Seal: VALID & ACTIVE",
        color: "text-emerald-400"
      });
    } else if (trimmed === "clear") {
      setTerminalLogs([]);
      setTerminalCommand("");
      return;
    } else {
      newLogs.push({
        text: `Command not recognized: "${cmdText}". Type 'help' for available commands.`,
        color: "text-rose-400"
      });
    }

    setTerminalLogs(newLogs);
    setTerminalCommand("");
  };

  // Handle contact submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactMember(null);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      showToast("Message transmitted successfully!");
    }, 1800);
  };

  // Handle mentorship booking submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "EDW-MNT-" + Math.floor(1000 + Math.random() * 9000);
    setBookingRefId(randomId);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingMember(null);
      setBookingData({ studentName: "", studentEmail: "", topic: "", date: "Tomorrow, 4:30 PM", notes: "" });
      showToast(`Mentorship session scheduled! Ref #${randomId}`);
    }, 2200);
  };

  // Handle join team submit
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setIsJoinModalOpen(false);
      setJoinForm({ name: "", email: "", role: "Full-Stack Web", portfolio: "", note: "" });
      showToast("Application submitted successfully! We will review your portfolio.");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl border border-slate-700 modal-content-animate text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-accent-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ============================================================
            HERO HEADER BANNER WITH LIVE STATS & INTERACTIVE CLI TOGGLE
            ============================================================ */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                <span>Engineering &amp; Technical Leadership</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Meet Our <span className="text-accent-500">Developers &amp; Architects</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Connect directly with the founding engineers, AI developers, and research directors driving ED-World. Book 1:1 mentorship, inspect code architectures, or verify credentials.
              </p>
            </div>

            {/* Quick Interactive Tool Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setTerminalOpen(!terminalOpen)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  terminalOpen
                    ? "bg-slate-900 text-emerald-400 border-slate-800 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-accent-500 hover:text-accent-600"
                }`}
              >
                <Terminal className="w-4 h-4 text-accent-500" />
                <span>{terminalOpen ? "Close Developer CLI" : "Launch Developer CLI"}</span>
              </button>

              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4" />
                <span>Join Tech Team</span>
              </button>
            </div>
          </div>

          {/* Interactive Metric Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent-500/30 transition-all">
              <div className="flex items-center gap-2 text-brand-500 font-bold text-lg sm:text-xl">
                <Users className="w-4 h-4 text-accent-500" />
                <span>3 Core</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Founding Leaders</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent-500/30 transition-all">
              <div className="flex items-center gap-2 text-brand-500 font-bold text-lg sm:text-xl">
                <Terminal className="w-4 h-4 text-accent-500" />
                <span>15+ Stacks</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Technologies Mastered</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent-500/30 transition-all">
              <div className="flex items-center gap-2 text-brand-500 font-bold text-lg sm:text-xl">
                <Award className="w-4 h-4 text-accent-500" />
                <span>100% Verified</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Board Certified</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent-500/30 transition-all">
              <div className="flex items-center gap-2 text-brand-500 font-bold text-lg sm:text-xl">
                <GraduationCap className="w-4 h-4 text-accent-500" />
                <span>10,000+</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Students Mentored</p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ============================================================
            EXPANDABLE INTERACTIVE DEVELOPER CLI TERMINAL
            ============================================================ */}
        {terminalOpen && (
          <div className="dev-terminal-window modal-content-animate">
            <div className="dev-terminal-header">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-xs text-slate-400 font-mono ml-2">edworld-terminal ~ leadership-session</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                [ESC to Close]
              </button>
            </div>

            <div className="dev-terminal-body space-y-2 max-h-72 overflow-y-auto">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={`whitespace-pre-wrap ${log.color || "text-slate-300"}`}>
                  {log.text}
                </div>
              ))}

              {/* Terminal Quick Command Chips */}
              <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-800">
                <span className="text-xs text-slate-500">Quick run:</span>
                {["help", "team", "stack vivek", "stack sagar", "office-hours", "verify", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runTerminalCmd(cmd)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-accent-400 font-mono transition-colors"
                  >
                    &gt; {cmd}
                  </button>
                ))}
              </div>

              {/* Command Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (terminalCommand.trim()) {
                    runTerminalCmd(terminalCommand);
                  }
                }}
                className="flex items-center gap-2 pt-2"
              >
                <span className="text-accent-400 font-mono text-sm">&gt;</span>
                <input
                  type="text"
                  value={terminalCommand}
                  onChange={(e) => setTerminalCommand(e.target.value)}
                  placeholder="Type a command (e.g. 'team', 'stack vivek', 'help') and press Enter..."
                  className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder:text-slate-600"
                />
              </form>
            </div>
          </div>
        )}

        {/* ============================================================
            INTERACTIVE SEARCH, DOMAIN FINDER & FILTER CONTROLS
            ============================================================ */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Real-time search bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, tech stack, or bio..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-brand-500 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "list"
                      ? "bg-white text-brand-500 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Domain Matcher: "Need help with..." */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent-500" />
              Need Guidance In:
            </span>
            {[
              { label: "⚡ Web & Cloud Architecture (Vivek)", filter: "Next.js" },
              { label: "🤖 AI, ML & Algorithms (Sagar)", filter: "Machine Learning" },
              { label: "📚 Curriculum & Research (Versha)", filter: "Educational Research" }
            ].map((match) => (
              <button
                key={match.filter}
                onClick={() => setSelectedSkill(selectedSkill === match.filter ? null : match.filter)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                  selectedSkill === match.filter
                    ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-accent-500"
                }`}
              >
                {match.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills & Clickable Skills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-accent-500" />
              Role:
            </span>
            {[
              { id: "all", label: "All Leaders", count: teamMembers.length },
              { id: "leadership", label: "Full-Stack & Cloud", count: teamMembers.filter((m) => m.category === "leadership").length },
              { id: "ai", label: "Artificial Intelligence", count: teamMembers.filter((m) => m.category === "ai").length },
              { id: "research", label: "Research & Content", count: teamMembers.filter((m) => m.category === "research").length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedCategory === cat.id
                      ? "bg-brand-400 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}

            <div className="hidden lg:flex items-center gap-1 ml-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
              {allSkills.slice(0, 5).map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`dev-skill-chip ${selectedSkill === skill ? "active" : ""}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            DEVELOPER CARDS (GRID & LIST VIEWS)
            ============================================================ */}
        {filteredMembers.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Developers Match Your Filter</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your keywords or reset filters to explore all ED-World team members.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedSkill(null);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="dev-profile-card group"
              >
                <div>
                  {/* Photo Header with Live Status & Action Badges */}
                  <div className="dev-photo-header">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="dev-photo-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/15 to-transparent" />
                    
                    {/* Role Badge */}
                    <span className="dev-role-badge">
                      {member.role}
                    </span>

                    {/* Interactive Endorse Heart Button */}
                    <button
                      onClick={(e) => handleEndorse(member.id, e)}
                      className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-md ${
                        endorsedMembers[member.id]
                          ? "bg-rose-500 text-white animate-heart-pop"
                          : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500"
                      }`}
                      title="Endorse this leader"
                      aria-label="Endorse"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          endorsedMembers[member.id] ? "fill-current text-white" : "text-rose-500"
                        }`}
                      />
                      <span>{endorsements[member.id] || member.endorsementsCount}</span>
                    </button>

                    {/* Title Banner & Live Availability Dot */}
                    <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="status-pulse-dot" />
                        <span className="text-[11px] font-semibold text-emerald-300 truncate">
                          {member.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight">{member.name}</h3>
                      <p className="text-xs text-accent-300 font-medium">{member.title}</p>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-6 space-y-4">
                    {/* Office Hours & Accreditation */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        <span className="truncate">{member.officeHours}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{member.designation}</span>
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Interactive Clickable Skills */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Competencies
                        </span>
                        <span className="text-[10px] text-accent-600 font-medium">Click to filter</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.slice(0, 5).map((skill, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                            className={`dev-skill-chip ${selectedSkill === skill ? "active" : ""}`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Interactive Footer */}
                <div className="p-6 pt-0 space-y-3">
                  {/* Action 1: Book Mentorship */}
                  <button
                    onClick={() => {
                      setBookingMember(member);
                      setBookingData((prev) => ({
                        ...prev,
                        topic: member.mentorshipTopics[0] || "Code & Project Guidance"
                      }));
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book 1:1 Mentorship Session</span>
                  </button>

                  {/* Action 2: View Full Profile & Digital ID Pass */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveModalMember(member);
                        setModalTab("overview");
                      }}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100/80 border border-brand-200 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                      <span>Full Profile</span>
                    </button>

                    <button
                      onClick={() => setDigitalIdMember(member)}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5 text-brand-500" />
                      <span>Digital Pass</span>
                    </button>
                  </div>

                  {/* Social links & Copy Email */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <TwitterIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                          aria-label={`${member.name} Instagram`}
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                          aria-label={`${member.name} Facebook`}
                        >
                          <FacebookIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleCopy(member.email, `${member.name}'s Email`, e)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-accent-600 transition-colors"
                      title="Copy official email"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-accent-500/40 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border-2 border-slate-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-accent-50 text-accent-600 border border-accent-200">
                        {member.role}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="status-pulse-dot" />
                        <span>{member.status}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-brand-500">
                      {member.title} • {member.designation} • {member.officeHours}
                    </p>
                    <p className="text-xs text-slate-600 max-w-2xl line-clamp-2 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {member.skills.slice(0, 6).map((skill, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                          className={`dev-skill-chip ${selectedSkill === skill ? "active" : ""}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleEndorse(member.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      endorsedMembers[member.id]
                        ? "bg-rose-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:text-rose-500 hover:bg-rose-50"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${endorsedMembers[member.id] ? "fill-current text-white" : ""}`} />
                    <span>{endorsements[member.id] || member.endorsementsCount}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setBookingMember(member);
                        setBookingData((prev) => ({
                          ...prev,
                          topic: member.mentorshipTopics[0] || "Code & Project Guidance"
                        }));
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all"
                    >
                      Book 1:1
                    </button>
                    <button
                      onClick={() => {
                        setActiveModalMember(member);
                        setModalTab("overview");
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                    >
                      Full Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================
            COLLABORATION & JOIN THE TEAM CALLOUT
            ============================================================ */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5 text-accent-500" />
              <span>Contribute to ED-World</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Want to Join Our <span className="text-accent-500">Developer Network?</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are continually onboarding passionate student developers, technical researchers, and engineering mentors to expand our open curriculum and tools.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Apply as Developer / Mentor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl text-sm font-bold text-brand-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                General Inquiry
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* ============================================================
          INTERACTIVE 1:1 MENTORSHIP BOOKING MODAL
          ============================================================ */}
      {bookingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop-animate">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 modal-content-animate space-y-5">
            <button
              onClick={() => setBookingMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-accent-500 shrink-0">
                <Image
                  src={bookingMember.image}
                  alt={bookingMember.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-200">
                  1:1 Mentorship Session
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Book Session with <span className="text-accent-500">{bookingMember.name}</span>
                </h3>
                <p className="text-xs text-slate-500">{bookingMember.officeHours}</p>
              </div>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Session Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Your mentorship appointment has been booked. Meeting link has been dispatched to {bookingData.studentEmail}.
                </p>
                <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-800">
                  Confirmation Code: {bookingRefId}
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      value={bookingData.studentName}
                      onChange={(e) => setBookingData({ ...bookingData, studentName: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
                    <input
                      required
                      type="email"
                      value={bookingData.studentEmail}
                      onChange={(e) => setBookingData({ ...bookingData, studentEmail: e.target.value })}
                      placeholder="ananya@student.ac.in"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guidance Topic</label>
                  <select
                    value={bookingData.topic}
                    onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                  >
                    {bookingMember.mentorshipTopics.map((topic, i) => (
                      <option key={i} value={topic}>
                        {topic}
                      </option>
                    ))}
                    <option value="General Architecture Q&A">General Architecture &amp; Project Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Available Slot</label>
                  <select
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                  >
                    <option value="Tomorrow, 4:30 PM">Tomorrow • 4:30 PM - 5:00 PM IST</option>
                    <option value="This Thursday, 5:15 PM">This Thursday • 5:15 PM - 5:45 PM IST</option>
                    <option value="This Saturday, 11:00 AM">This Saturday • 11:00 AM - 11:30 AM IST</option>
                    <option value="Next Monday, 4:00 PM">Next Monday • 4:00 PM - 4:30 PM IST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Questions or GitHub Repo (Optional)</label>
                  <textarea
                    rows={2}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    placeholder="Briefly state what you need help with (e.g. review my Next.js routing code)..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingMember(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Confirm Free Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          INTERACTIVE DIGITAL ID BADGE / CREDENTIAL MODAL
          ============================================================ */}
      {digitalIdMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop-animate">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 modal-content-animate space-y-6">
            <button
              onClick={() => setDigitalIdMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                Official Credential
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Verified Digital ID Card
              </h3>
            </div>

            {/* Futuristic Hologram ID Card */}
            <div className="digital-id-card p-6 text-white space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center font-bold text-white shadow">
                    ED
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-white">ED-WORLD ACADEMY</h4>
                    <p className="text-[10px] text-accent-300">Technical Leadership Council</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent-500 shadow-md shrink-0">
                  <Image
                    src={digitalIdMember.image}
                    alt={digitalIdMember.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <h5 className="text-lg font-bold text-white leading-tight">{digitalIdMember.name}</h5>
                  <p className="text-xs font-semibold text-accent-400">{digitalIdMember.title}</p>
                  <p className="text-[11px] text-slate-300">{digitalIdMember.role}</p>
                  <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] bg-white/10 text-slate-200">
                    ID: {digitalIdMember.idNumber}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Accreditation:</span>
                  <span className="text-slate-200 font-medium">Karnataka Board Certified</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Security Status:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Active Core
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleCopy(digitalIdMember.idNumber, "ID Number")}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID Number</span>
              </button>
              <button
                onClick={() => {
                  showToast("Digital credential verified against ED-World ledger!");
                  setDigitalIdMember(null);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all"
              >
                Verify Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          INTERACTIVE DEVELOPER PROFILE MODAL
          ============================================================ */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop-animate overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden modal-content-animate my-8">
            {/* Modal Header with Background Image & Gradient */}
            <div className="relative h-44 sm:h-52 bg-gradient-to-r from-brand-700 to-brand-500 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
              <button
                onClick={() => setActiveModalMember(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 transition-all shadow"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 shrink-0">
                    <Image
                      src={activeModalMember.image}
                      alt={activeModalMember.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-white">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent-500 text-white shadow">
                      {activeModalMember.role}
                    </span>
                    <h3 className="text-2xl font-bold mt-1 leading-tight">{activeModalMember.name}</h3>
                    <p className="text-xs text-accent-200 font-medium">{activeModalMember.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleEndorse(activeModalMember.id)}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                    endorsedMembers[activeModalMember.id]
                      ? "bg-rose-500 text-white"
                      : "bg-white text-slate-700 hover:text-rose-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${endorsedMembers[activeModalMember.id] ? "fill-current" : ""}`} />
                  <span>{endorsements[activeModalMember.id]} Endorsements</span>
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: Users },
                { id: "proficiency", label: "Tech Stack", icon: Code2 },
                { id: "projects", label: "Projects", icon: Rocket },
                { id: "milestones", label: "Milestones", icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as any)}
                    className={`py-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-all ${
                      modalTab === tab.id
                        ? "border-accent-500 text-accent-600 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5">
              {modalTab === "overview" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Professional Background
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {activeModalMember.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
                        <GraduationCap className="w-4 h-4 text-brand-500" />
                        <span>Academic Degree</span>
                      </div>
                      <p className="text-xs text-slate-600">{activeModalMember.degree}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Board Accreditation</span>
                      </div>
                      <p className="text-xs text-slate-600">{activeModalMember.designation}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Core Skills &amp; Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalMember.skills.map((skill, i) => (
                        <span key={i} className="dev-skill-chip font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "proficiency" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Assessed Technical Proficiency
                  </h4>
                  <div className="space-y-3.5">
                    {activeModalMember.skillProficiency.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{item.skill}</span>
                          <span className="text-accent-600">{item.level}%</span>
                        </div>
                        <div className="proficiency-track">
                          <div
                            className="proficiency-fill"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === "projects" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Featured Systems &amp; Contributions
                  </h4>
                  {activeModalMember.featuredProjects.map((proj, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-accent-500/40 transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-slate-900">{proj.title}</h5>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-50 text-accent-600 border border-accent-200">
                          {proj.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {modalTab === "milestones" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Key Leadership Milestones
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalMember.keyMilestones.map((milestone, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(window.location.href, "Profile URL")}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Profile</span>
                </button>
                <button
                  onClick={() => handleCopy(activeModalMember.email, "Email Address")}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Email</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const target = activeModalMember;
                    setActiveModalMember(null);
                    setBookingMember(target);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Mentorship</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          INTERACTIVE JOIN THE TEAM MODAL
          ============================================================ */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop-animate">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 modal-content-animate space-y-5">
            <button
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5" />
                <span>Join Developer Network</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Apply as a <span className="text-accent-500">Developer or Mentor</span>
              </h3>
              <p className="text-xs text-slate-500">
                Collaborate with our core team on open-source educational modules and algorithms.
              </p>
            </div>

            {joinSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Application Received!</h4>
                <p className="text-xs text-slate-600">
                  Thank you for applying. Vivek Kumar and the leadership team will review your portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      placeholder="e.g. Amit Verma"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      placeholder="amit@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role of Interest</label>
                    <select
                      value={joinForm.role}
                      onChange={(e) => setJoinForm({ ...joinForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    >
                      <option value="Full-Stack Web">Full-Stack Web (Next.js/Node)</option>
                      <option value="AI & ML Engineer">AI &amp; Machine Learning</option>
                      <option value="Data & Research">Data &amp; Research Analyst</option>
                      <option value="Content & Curriculum">Content &amp; Curriculum Specialist</option>
                      <option value="Technical Mentor">Student Technical Mentor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio URL</label>
                    <input
                      type="url"
                      value={joinForm.portfolio}
                      onChange={(e) => setJoinForm({ ...joinForm, portfolio: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Introduction &amp; Skills</label>
                  <textarea
                    required
                    rows={3}
                    value={joinForm.note}
                    onChange={(e) => setJoinForm({ ...joinForm, note: e.target.value })}
                    placeholder="Tell us about projects you have built and which modules you would like to contribute to..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-accent-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm flex items-center gap-1.5"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
