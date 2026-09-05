"use client";

import React from "react";
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
} from "lucide-react";

interface DSCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  operations: string[];
  complexity: string;
  color: string;
  href: string;
}

const dsTopics: DSCard[] = [
  {
    id: "stack",
    title: "Stack",
    description: "A Last-In-First-Out (LIFO) data structure. Elements are added and removed from the top only.",
    icon: <Layers className="w-7 h-7" />,
    operations: ["Push", "Pop", "Peek", "isEmpty"],
    complexity: "O(1) per operation",
    color: "from-violet-500 to-purple-600",
    href: "/data-structures/stack",
  },
  {
    id: "queue",
    title: "Queue",
    description: "A First-In-First-Out (FIFO) data structure. Elements enter from rear and exit from front.",
    icon: <ListOrdered className="w-7 h-7" />,
    operations: ["Enqueue", "Dequeue", "Peek", "Circular"],
    complexity: "O(1) per operation",
    color: "from-blue-500 to-cyan-600",
    href: "/data-structures/queue",
  },
  {
    id: "linked-list",
    title: "Linked List",
    description: "A linear collection of nodes where each node points to the next. Supports dynamic memory allocation.",
    icon: <LayoutList className="w-7 h-7" />,
    operations: ["Insert", "Delete", "Search", "Reverse"],
    complexity: "O(n) search, O(1) insert",
    color: "from-emerald-500 to-teal-600",
    href: "/data-structures/linked-list",
  },
  {
    id: "binary-tree",
    title: "Binary Search Tree",
    description: "A hierarchical tree where left child < parent < right child. Enables efficient searching and sorting.",
    icon: <GitBranch className="w-7 h-7" />,
    operations: ["Insert", "Delete", "Search", "Traversals"],
    complexity: "O(log n) average",
    color: "from-amber-500 to-orange-600",
    href: "/data-structures/binary-tree",
  },
  {
    id: "heap",
    title: "Heap",
    description: "A complete binary tree satisfying the heap property. Used for priority queues and efficient sorting.",
    icon: <Binary className="w-7 h-7" />,
    operations: ["Insert", "Extract", "Peek", "Heapify"],
    complexity: "O(log n) insert/extract",
    color: "from-rose-500 to-pink-600",
    href: "/data-structures/heap",
  },
  {
    id: "graph",
    title: "Graph",
    description: "A collection of vertices connected by edges. Models networks, maps, social connections and more.",
    icon: <Network className="w-7 h-7" />,
    operations: ["BFS", "DFS", "Dijkstra", "Add/Remove"],
    complexity: "O(V + E) traversal",
    color: "from-indigo-500 to-blue-600",
    href: "/data-structures/graph",
  },
  {
    id: "hash-table",
    title: "Hash Table",
    description: "A key-value store using hash functions for near-constant time lookups, insertions, and deletions.",
    icon: <Hash className="w-7 h-7" />,
    operations: ["Insert", "Search", "Delete", "Collision"],
    complexity: "O(1) average",
    color: "from-slate-600 to-slate-800",
    href: "/data-structures/hash-table",
  },
];

export default function DataStructuresPage() {
  return (
    <div className="ds-page-wrapper">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Interactive Learning Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Data Structure <span className="text-accent-500">Visualizer</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Master fundamental data structures through interactive, step-by-step visualizations. 
              Watch operations unfold in real-time, understand complexity, and build deep intuition 
              for how data structures work under the hood.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Database className="w-4 h-4 text-accent-500" />
                <span>7 Data Structures</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>25+ Operations</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <ArrowRight className="w-4 h-4 text-accent-500" />
                <span>Step-by-Step Animations</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Also explore Sorting */}
        <Link
          href="/sorting-algorithm"
          className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg hover:shadow-xl hover:from-brand-500 hover:to-brand-600 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Also explore: Sorting Algorithm Visualizer</p>
              <p className="text-xs text-white/70">Bubble, Selection, Insertion, Merge, Quick & Heap Sort</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dsTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="ds-topic-card group block"
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                  {topic.icon}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-accent-600 transition-colors">
                    {topic.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-200">
                    {topic.complexity}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {topic.description}
              </p>

              {/* Operations */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {topic.operations.map((op) => (
                  <span
                    key={op}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-600 border border-slate-200"
                  >
                    {op}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-accent-600 group-hover:text-accent-500 transition-colors">
                <span>Explore Visualizer</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
