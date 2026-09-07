"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  ArrowRight,
  GitBranch,
  Database,
  Network,
  Hash,
  LayoutList,
  ListOrdered,
  Binary,
  ChevronRight,
  Search,
  Zap,
} from "lucide-react";

interface DSCard {
  id: string;
  title: string;
  category: "linear" | "tree" | "graph";
  description: string;
  icon: React.ReactNode;
  operations: string[];
  complexity: string;
  color: string;
  href: string;
  sampleUse: string;
}

const dsTopics: DSCard[] = [
  {
    id: "stack",
    title: "Stack",
    category: "linear",
    description: "A Last-In-First-Out (LIFO) data structure. Elements are added and removed from the top only.",
    icon: <Layers className="w-7 h-7" />,
    operations: ["Push", "Pop", "Peek", "Overflow/Underflow"],
    complexity: "O(1) all ops",
    color: "from-violet-500 to-purple-600",
    href: "/data-structures/stack",
    sampleUse: "Browser History, Undo/Redo, Call Stack",
  },
  {
    id: "queue",
    title: "Queue",
    category: "linear",
    description: "A First-In-First-Out (FIFO) data structure with Linear, Circular, and Priority mode variations.",
    icon: <ListOrdered className="w-7 h-7" />,
    operations: ["Enqueue", "Dequeue", "Peek", "Circular Ring"],
    complexity: "O(1) all ops",
    color: "from-blue-500 to-cyan-600",
    href: "/data-structures/queue",
    sampleUse: "Task Scheduling, BFS Queue, Printer Buffer",
  },
  {
    id: "linked-list",
    title: "Linked List",
    category: "linear",
    description: "A dynamic chain of nodes connected via pointers. Supports Singly and Doubly linked modes with head/tail ops.",
    icon: <LayoutList className="w-7 h-7" />,
    operations: ["Insert Head", "Insert Tail", "Delete Val", "Pointer Reversal"],
    complexity: "O(1) insert, O(n) search",
    color: "from-teal-500 to-emerald-600",
    href: "/data-structures/linked-list",
    sampleUse: "Music Playlists, Memory Allocation, Undo Chains",
  },
  {
    id: "binary-tree",
    title: "Binary Search Tree",
    category: "tree",
    description: "A hierarchical node structure satisfying Left < Parent < Right. Features interactive In-Order & Pre-Order traversals.",
    icon: <GitBranch className="w-7 h-7" />,
    operations: ["Insert", "Search", "In-Order", "Pre-Order"],
    complexity: "O(log n) avg",
    color: "from-emerald-500 to-green-600",
    href: "/data-structures/binary-tree",
    sampleUse: "Database Indexing, Syntax Trees, Autocomplete",
  },
  {
    id: "heap",
    title: "Binary Heap",
    category: "tree",
    description: "A complete binary tree with parent-child ordering. Features dual Tree & Array view with Heapify animations.",
    icon: <Binary className="w-7 h-7" />,
    operations: ["Min/Max Toggle", "Heapify-Up", "Heapify-Down", "Array Mapping"],
    complexity: "O(log n) insert/extract",
    color: "from-amber-500 to-yellow-600",
    href: "/data-structures/heap",
    sampleUse: "Dijkstra Priority Queue, Heapsort, Event Timers",
  },
  {
    id: "graph",
    title: "Graph",
    category: "graph",
    description: "A network of vertices and weighted edges with interactive start node selection, BFS, and DFS traversals.",
    icon: <Network className="w-7 h-7" />,
    operations: ["BFS", "DFS", "Degree Inspector", "Cycle Detection"],
    complexity: "O(V + E) traversal",
    color: "from-pink-500 to-rose-600",
    href: "/data-structures/graph",
    sampleUse: "GPS Routing, Social Networks, Dependency Resolution",
  },
  {
    id: "hash-table",
    title: "Hash Table",
    category: "graph",
    description: "A key-value dictionary using hash functions, bucket arrays, and Separate Chaining / Linear Probing resolution.",
    icon: <Hash className="w-7 h-7" />,
    operations: ["Put", "Get", "32-bit Hash Inspector", "Collision Resolution"],
    complexity: "O(1) average lookup",
    color: "from-amber-600 to-orange-600",
    href: "/data-structures/hash-table",
    sampleUse: "Caches (Redis), Database Keys, Symbol Tables",
  },
];

export default function DataStructuresPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "linear" | "tree" | "graph">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    return dsTopics.filter((t) => {
      const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.operations.some((op) => op.toLowerCase().includes(q)) ||
        t.sampleUse.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="ds-page-wrapper">
      <main className="ds-container space-y-8">
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Interactive Data Structures Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Interactive Data Structure <span className="text-[#FF8000]">Visualizer</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Master fundamental computer science data structures through hands-on step-by-step simulations. 
              Click nodes to inspect 64-bit memory addresses, switch between Pseudocode, C++, Python, Java, and JavaScript implementations, 
              control animation speeds, and complete interactive quests!
            </p>

            {/* Quick Stats Ribbon */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <Database className="w-4 h-4 text-[#FF8000]" />
                <span>7 Full Visualizers</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <Zap className="w-4 h-4 text-[#FF8000]" />
                <span>Memory Inspector & Code in 5 Languages</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <Sparkles className="w-4 h-4 text-[#FF8000]" />
                <span>Interactive Challenges & Speed Controls</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Sorting Algorithm Cross-Link Banner */}
        <Link
          href="/sorting-algorithm"
          className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#173E67] to-[#1a4a7d] text-white shadow-md hover:shadow-xl hover:from-[#133355] hover:to-[#173E67] transition-all group border border-slate-700/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base">Also Explore: Sorting Algorithm Visualizer</p>
              <p className="text-xs text-slate-200">Interactive Bubble, Selection, Insertion, Merge, Quick & Heap Sort with audio synthesis</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-orange-400" />
        </Link>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(
              [
                { id: "all", label: "All Topics (7)" },
                { id: "linear", label: "Linear (Stack, Queue, List)" },
                { id: "tree", label: "Trees & Heaps" },
                { id: "graph", label: "Graphs & Hash Tables" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by operation or use case..."
              className="w-full pl-9 pr-4 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
            />
          </div>
        </div>

        {/* Visualizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="ds-topic-card group block flex flex-col justify-between"
            >
              <div>
                {/* Icon + Header */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF8000] transition-colors">
                      {topic.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                      {topic.complexity}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {topic.description}
                </p>

                {/* Operations Pill List */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {topic.operations.map((op) => (
                    <span
                      key={op}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-semibold text-slate-700 border border-slate-200"
                    >
                      {op}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <strong className="text-slate-700">Use Cases:</strong> {topic.sampleUse}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF8000] group-hover:text-orange-600 transition-colors">
                <span>Launch Interactive Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
