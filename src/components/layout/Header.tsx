"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Code2,
  HelpCircle,
  PhoneCall,
  User,
  ShieldCheck,
  FileSpreadsheet,
  Award,
  Sparkles,
  BookOpen,
  Laptop,
  Layers,
  Search,
  Command,
  LogOut
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const SEARCH_ITEMS = [
    { title: "Stack Visualizer", desc: "LIFO stack operations, push/pop/peek", href: "/data-structures/stack", cat: "Data Structures" },
    { title: "Queue Visualizer", desc: "FIFO, Circular buffer & Priority queue", href: "/data-structures/queue", cat: "Data Structures" },
    { title: "Linked List Visualizer", desc: "Singly & Doubly pointer chaining", href: "/data-structures/linked-list", cat: "Data Structures" },
    { title: "Binary Search Tree", desc: "Hierarchical BST traversals (Inorder/Pre/Post/BFS)", href: "/data-structures/binary-tree", cat: "Data Structures" },
    { title: "Binary Heap Visualizer", desc: "Min/Max heaps with dual tree & array view", href: "/data-structures/heap", cat: "Data Structures" },
    { title: "Graph Visualizer", desc: "BFS, DFS & Dijkstra shortest pathfinding", href: "/data-structures/graph", cat: "Data Structures" },
    { title: "Hash Table Visualizer", desc: "Separate chaining & linear probing", href: "/data-structures/hash-table", cat: "Data Structures" },
    { title: "Sorting Algorithm Visualizer", desc: "Interactive Bubble, Quick, Merge, Heap sort", href: "/sorting-algorithm", cat: "Algorithms" },
    { title: "Coding Practice Web IDE", desc: "Multi-language in-browser coding playground", href: "/practice", cat: "Tools" },
    { title: "15s Live Challenge Quiz", desc: "Interactive time-bound skill test", href: "/quiz", cat: "Challenges" },
    { title: "Assignments Portal", desc: "Academic homework and lab tasks", href: "/assignment", cat: "Academics" },
    { title: "All Learning Resources", desc: "Curated student guides and tools", href: "/resources", cat: "Resources" },
  ];

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar - Brand Theme Navy */}
      <div
        className="text-xs py-2 px-4 border-b transition-colors header-top-bar"
        style={{
          backgroundColor: "#173E67",
          color: "#ffffff",
          borderBottom: "1px solid #133355"
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "#ffffff" }}>Home</Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/developer-list" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>Developers</Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/about-us" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>About Us</Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/login" className="flex items-center gap-1 hover:text-accent-400 transition-colors font-medium" style={{ color: "#ffffff" }}>
              <User className="w-3.5 h-3.5" style={{ color: "#FF8000" }} />
              <span style={{ color: "#ffffff" }}>Login</span>
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/data-structures" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>Data Structures</Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/sorting-algorithm" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>Sorting Technique</Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/faqs" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>FAQs</Link>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <Link href="/contact" className="hover:text-accent-400 transition-colors font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 border-b border-slate-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/60 py-3"
          : "bg-white py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative w-40 sm:w-48 h-10 transition-transform group-hover:scale-105">
              <Image
                src="/assets/brand/logo.png"
                alt="Student World Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-medium text-slate-900">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/" ? "text-brand-500 font-bold bg-brand-50" : "text-slate-900 hover:text-accent-500 hover:bg-slate-100"
              }`}
            >
              Home
            </Link>

            {/* Department Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("department")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-900 hover:text-accent-500 hover:bg-slate-100 transition-colors"
                aria-expanded={activeDropdown === "department"}
              >
                <span className="text-slate-900 font-medium">Department</span>
                <ChevronDown className="w-4 h-4 text-slate-700 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden p-2 text-slate-900">
                  <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Departments</span>
                    <Link href="/departments" className="text-brand-600 hover:text-accent-500 font-bold lowercase">view all</Link>
                  </div>
                  <Link
                    href="/departments/engineering"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-brand-500" />
                    <div>
                      <div className="font-semibold text-sm">Engineering</div>
                      <div className="text-xs text-slate-400">CSE, ECE, Civil &amp; Mech</div>
                    </div>
                  </Link>
                  <Link
                    href="/departments/non-technical"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold text-sm">Public Health</div>
                      <div className="text-xs text-slate-400">Health &amp; Life Sciences</div>
                    </div>
                  </Link>
                  <Link
                    href="/departments/management"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold text-sm">Management &amp; Commerce</div>
                      <div className="text-xs text-slate-400">Finance &amp; Operations</div>
                    </div>
                  </Link>
                  <Link
                    href="/departments/other"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <Award className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="font-semibold text-sm">Arts &amp; Designs</div>
                      <div className="text-xs text-slate-400">UI/UX &amp; Multimedia</div>
                    </div>
                  </Link>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link href="/departments" className="block px-3 py-2 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors text-xs font-bold text-center">Explore All Departments</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("membership")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-900 hover:text-accent-500 hover:bg-slate-100 transition-colors"
              >
                <span className="text-slate-900 font-medium">Membership</span>
                <ChevronDown className="w-4 h-4 text-slate-700 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-60 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden p-2 text-slate-900">
                  <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Membership</span>
                    <Link href="/membership" className="text-brand-600 hover:text-accent-500 font-bold lowercase">view all</Link>
                  </div>
                  <Link href="/membership#bronze" className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-amber-600 transition-colors text-sm">🥉 Bronze Tier (Free)</Link>
                  <Link href="/membership#silver" className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-600 transition-colors text-sm">🥈 Silver Tier (Scholar)</Link>
                  <Link href="/membership#gold" className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-brand-600 transition-colors text-sm">🥇 Gold Tier (Popular)</Link>
                  <Link href="/membership#premium" className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-accent-500 font-semibold transition-colors text-sm">💎 Premium VIP</Link>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link href="/membership" className="block px-3 py-2 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors text-xs font-bold text-center">Compare All Plans</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-900 hover:text-accent-500 hover:bg-slate-100 transition-colors"
              >
                <span className="text-slate-900 font-medium">Resource</span>
                <ChevronDown className="w-4 h-4 text-slate-700 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden p-2 text-slate-900">
                  <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Resources</span>
                    <Link href="/resources" className="text-brand-600 hover:text-accent-500 font-bold lowercase">view all</Link>
                  </div>
                  <Link
                    href="/practice"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-brand-500" />
                    <div>
                      <div className="font-semibold text-sm">Coding Practice</div>
                      <div className="text-xs text-slate-400">Interactive Web IDE</div>
                    </div>
                  </Link>
                  <Link
                    href="/quiz"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold text-sm">Interactive Quiz</div>
                      <div className="text-xs text-slate-400">15s Live Challenge</div>
                    </div>
                  </Link>
                  <Link
                    href="/data-structures"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-violet-500" />
                    <div>
                      <div className="font-semibold text-sm">Data Structures</div>
                      <div className="text-xs text-slate-400">Interactive Lab</div>
                    </div>
                  </Link>
                  <Link
                    href="/sorting-algorithm"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <Laptop className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="font-semibold text-sm">Sorting Visualizer</div>
                      <div className="text-xs text-slate-400">Real-time Algorithms</div>
                    </div>
                  </Link>
                  <Link
                    href="/assignment"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-semibold text-sm">Assignments</div>
                      <div className="text-xs text-slate-400">Tasks & Guidelines</div>
                    </div>
                  </Link>
                  <Link
                    href="/assignment-upload"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 hover:text-accent-500 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold text-sm">Assignment Upload</div>
                      <div className="text-xs text-slate-400">Direct Submission</div>
                    </div>
                  </Link>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link href="/resources" className="block px-3 py-2 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors text-xs font-bold text-center">Explore All Learning Tools</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/about-us"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/about-us" ? "text-brand-500 font-bold bg-brand-50" : "text-slate-900 hover:text-accent-500 hover:bg-slate-100"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/contact" ? "text-brand-500 font-bold bg-brand-50" : "text-slate-900 hover:text-accent-500 hover:bg-slate-100"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Interactive Search & CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-all shadow-xs"
              title="Quick Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Quick Search</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Profile Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                aria-label="User Profile"
                title="Account & Profile"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-xs">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:flex flex-col items-start pr-1 text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">Vivek Kumar</span>
                  <span className="text-[10px] text-slate-400 font-medium">Student</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-sm">
                      VK
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-sm text-slate-900 truncate">Vivek Kumar</div>
                      <div className="text-xs text-slate-400 truncate">vivek@studentworld.edu</div>
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    <Link
                      href="/membership"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent-600 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile &amp; Membership</span>
                    </Link>
                    <Link
                      href="/practice"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent-600 rounded-xl transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-emerald-500" />
                      <span>Web IDE &amp; Submissions</span>
                    </Link>
                    <Link
                      href="/quiz"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent-600 rounded-xl transition-colors"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Quiz Rank &amp; Badges</span>
                    </Link>
                    <Link
                      href="/assignment"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent-600 rounded-xl transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                      <span>Assignments Portal</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 p-1 mt-1 space-y-0.5">
                    <Link
                      href="/login"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent-600 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-slate-400" />
                      <span>Sign In / Switch Account</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-brand-500" />
                      <span>Register New Account</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-900 hover:text-accent-500 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-lg">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500"
            >
              Home
            </Link>
            <div className="px-3 py-1 font-bold text-xs text-brand-500 uppercase tracking-wider">
              Departments
            </div>
            <div className="pl-4 space-y-1">
              <Link href="/departments" onClick={closeMenu} className="block py-1.5 text-sm font-semibold text-brand-600 hover:text-accent-500">View All Departments</Link>
              <Link href="/departments/engineering" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Engineering (CSE/ECE/Civil)</Link>
              <Link href="/departments/non-technical" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Public Health</Link>
              <Link href="/departments/management" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Management &amp; Commerce</Link>
              <Link href="/departments/other" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Arts &amp; Designs</Link>
            </div>

            <div className="px-3 py-1 font-bold text-xs text-brand-500 uppercase tracking-wider">
              Membership
            </div>
            <div className="pl-4 space-y-1">
              <Link href="/membership" onClick={closeMenu} className="block py-1.5 text-sm font-semibold text-brand-600 hover:text-accent-500">View All Plans</Link>
              <Link href="/membership#bronze" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Bronze Tier (Free)</Link>
              <Link href="/membership#silver" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Silver Tier (Scholar)</Link>
              <Link href="/membership#gold" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Gold Tier (Popular)</Link>
              <Link href="/membership#premium" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Premium VIP</Link>
            </div>

            <div className="px-3 py-1 font-bold text-xs text-brand-500 uppercase tracking-wider">
              Resources
            </div>
            <div className="pl-4 space-y-1">
              <Link href="/resources" onClick={closeMenu} className="block py-1.5 text-sm font-semibold text-brand-600 hover:text-accent-500">View All Resources</Link>
              <Link href="/practice" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Coding Practice</Link>
              <Link href="/quiz" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Interactive Quiz</Link>
              <Link href="/data-structures" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500 font-medium">Data Structures Visualizer</Link>
              <Link href="/sorting-algorithm" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Sorting Visualizer</Link>
              <Link href="/assignment" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Assignments</Link>
              <Link href="/assignment-upload" onClick={closeMenu} className="block py-1.5 text-sm text-slate-900 hover:text-accent-500">Assignment Upload</Link>
            </div>

            <Link
              href="/developer-list"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500"
            >
              Developers List
            </Link>
            <Link
              href="/about-us"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500"
            >
              Contact Us
            </Link>
            <div className="pt-2 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  VK
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Vivek Kumar</div>
                  <div className="text-[10px] text-slate-400">vivek@studentworld.edu</div>
                </div>
              </div>
              <Link
                href="/membership"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500 text-xs font-semibold"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile &amp; Membership</span>
              </Link>
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-900 hover:bg-slate-100 hover:text-accent-500 text-xs font-semibold"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                <span>Sign In / Switch Account</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Interactive Quick Command Search Modal (⌘K) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search data structures, visualizers, quiz, tools... (Esc to close)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filtered Search Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No visualizer or resource matching &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-violet-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                      {item.cat}
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* Keyboard Hint Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono">Esc</kbd> to close</span>
              <span>Navigate with click or enter</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
