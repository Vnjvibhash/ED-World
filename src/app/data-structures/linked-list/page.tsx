"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutList,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  RotateCcw,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";

type ListType = "singly" | "doubly";

interface ListNode {
  id: string;
  value: number;
  status: "idle" | "visiting" | "found" | "inserting" | "deleting";
}

const PSEUDOCODE = {
  insertHead: [
    "function insertHead(val):",
    "  newNode = new Node(val)",
    "  newNode.next = head",
    "  if doubly: head.prev = newNode",
    "  head = newNode",
    "  length++",
  ],
  insertTail: [
    "function insertTail(val):",
    "  newNode = new Node(val)",
    "  if head is null: head = newNode; return",
    "  curr = head",
    "  while curr.next != null: curr = curr.next",
    "  curr.next = newNode",
  ],
  deleteVal: [
    "function delete(val):",
    "  if head == null: return",
    "  if head.val == val: head = head.next; return",
    "  curr = head",
    "  while curr.next and curr.next.val != val: curr = curr.next",
    "  if curr.next: curr.next = curr.next.next",
  ],
  search: [
    "function search(val):",
    "  curr = head; index = 0",
    "  while curr != null:",
    "    if curr.val == val: return index",
    "    curr = curr.next; index++",
    "  return -1 // not found",
  ],
};

export default function LinkedListVisualizerPage() {
  const [listType, setListType] = useState<ListType>("singly");
  const [nodes, setNodes] = useState<ListNode[]>([
    { id: "1", value: 12, status: "idle" },
    { id: "2", value: 45, status: "idle" },
    { id: "3", value: 78, status: "idle" },
    { id: "4", value: 99, status: "idle" },
  ]);
  const [inputValue, setInputValue] = useState<string>("33");
  const [inputIndex, setInputIndex] = useState<string>("0");
  const [activeTab, setActiveTab] = useState<"insertHead" | "insertTail" | "deleteVal" | "search">("insertHead");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Linked List initialized with 4 nodes. Dynamic pointer chain.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized list: 12 -> 45 -> 78 -> 99 -> null",
  ]);
  const [isBusy, setIsBusy] = useState(false);

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInsertHead = async () => {
    if (isBusy) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    if (nodes.length >= 8) {
      setMessage({ text: "Maximum visualizer limit (8 nodes) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insertHead");
    setHighlightLine(1);

    const newNode: ListNode = {
      id: Math.random().toString(36).substring(2, 9),
      value: val,
      status: "inserting",
    };

    setNodes((prev) => [newNode, ...prev]);
    setMessage({ text: `Allocated node (${val}) and prepended as new HEAD.`, type: "success" });
    addLog(`➕ Inserted ${val} at HEAD`);

    await sleep(400);
    setHighlightLine(4);
    setNodes((prev) => prev.map((n) => (n.id === newNode.id ? { ...n, status: "idle" } : n)));
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleInsertTail = async () => {
    if (isBusy) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    if (nodes.length >= 8) {
      setMessage({ text: "Maximum visualizer limit (8 nodes) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insertTail");
    setHighlightLine(1);

    const newNode: ListNode = {
      id: Math.random().toString(36).substring(2, 9),
      value: val,
      status: "inserting",
    };

    setNodes((prev) => [...prev, newNode]);
    setMessage({ text: `Appended node (${val}) as new TAIL.`, type: "success" });
    addLog(`➕ Inserted ${val} at TAIL`);

    await sleep(400);
    setHighlightLine(5);
    setNodes((prev) => prev.map((n) => (n.id === newNode.id ? { ...n, status: "idle" } : n)));
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleDeleteHead = async () => {
    if (isBusy || nodes.length === 0) return;
    setIsBusy(true);
    const removedVal = nodes[0].value;

    setNodes((prev) => prev.map((n, idx) => (idx === 0 ? { ...n, status: "deleting" } : n)));
    setMessage({ text: `Deleting HEAD node (${removedVal})...`, type: "warning" });

    await sleep(400);
    setNodes((prev) => prev.slice(1));
    setMessage({ text: `Deleted HEAD node (${removedVal}).`, type: "success" });
    addLog(`➖ Deleted HEAD node (${removedVal})`);
    setIsBusy(false);
  };

  const handleDeleteTail = async () => {
    if (isBusy || nodes.length === 0) return;
    setIsBusy(true);
    const removedVal = nodes[nodes.length - 1].value;

    setNodes((prev) =>
      prev.map((n, idx) => (idx === prev.length - 1 ? { ...n, status: "deleting" } : n))
    );
    setMessage({ text: `Deleting TAIL node (${removedVal})...`, type: "warning" });

    await sleep(400);
    setNodes((prev) => prev.slice(0, -1));
    setMessage({ text: `Deleted TAIL node (${removedVal}).`, type: "success" });
    addLog(`➖ Deleted TAIL node (${removedVal})`);
    setIsBusy(false);
  };

  const handleSearch = async () => {
    if (isBusy || nodes.length === 0) return;
    const target = parseInt(inputValue);
    if (isNaN(target)) return;

    setIsBusy(true);
    setActiveTab("search");
    setMessage({ text: `Searching for value ${target} starting at HEAD...`, type: "info" });
    addLog(`🔍 Starting search for ${target}`);

    let foundIdx = -1;
    for (let i = 0; i < nodes.length; i++) {
      setHighlightLine(3);
      setNodes((prev) =>
        prev.map((n, idx) => ({
          ...n,
          status: idx === i ? "visiting" : "idle",
        }))
      );
      await sleep(550);

      if (nodes[i].value === target) {
        foundIdx = i;
        setHighlightLine(4);
        setNodes((prev) =>
          prev.map((n, idx) => ({
            ...n,
            status: idx === i ? "found" : "idle",
          }))
        );
        setMessage({ text: `Found ${target} at index ${i}!`, type: "success" });
        addLog(`✅ Target ${target} found at index ${i}`);
        break;
      }
    }

    if (foundIdx === -1) {
      setHighlightLine(5);
      setMessage({ text: `Value ${target} does not exist in the linked list.`, type: "error" });
      addLog(`❌ Target ${target} not found`);
      setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    }

    await sleep(1000);
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleReverse = async () => {
    if (isBusy || nodes.length < 2) return;
    setIsBusy(true);
    setMessage({ text: "Reversing pointers in place...", type: "info" });
    addLog("🔄 Reversing linked list in place");

    // Show reverse animation step
    for (let i = 0; i < nodes.length; i++) {
      setNodes((prev) =>
        prev.map((n, idx) => ({
          ...n,
          status: idx === i ? "visiting" : "idle",
        }))
      );
      await sleep(250);
    }

    setNodes((prev) => [...prev].reverse().map((n) => ({ ...n, status: "idle" })));
    setMessage({ text: "List successfully reversed! HEAD and TAIL swapped.", type: "success" });
    addLog("✅ Reversal completed");
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setNodes([]);
    setMessage({ text: "Linked list is now empty.", type: "info" });
    addLog("🗑 Cleared all nodes");
  };

  const handleRandom = () => {
    const val = Math.floor(Math.random() * 90) + 10;
    setInputValue(val.toString());
  };

  return (
    <div className="ds-page-wrapper">
      {/* Header */}
      <header className="ds-header">
        <div className="ds-header-inner">
          <div className="flex items-center gap-4">
            <Link
              href="/data-structures"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Topics
            </Link>
            <div className="h-5 w-px bg-slate-700/60" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <LayoutList className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Linked List Visualizer</h1>
                <p className="text-xs text-slate-400">Node Pointer Chain Architecture</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setListType("singly")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                listType === "singly" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Singly Linked
            </button>
            <button
              onClick={() => setListType("doubly")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                listType === "doubly" ? "bg-teal-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Doubly Linked
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ds-container">
        {/* Metric Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Total Nodes</div>
            <div className="ds-stat-value text-emerald-600">{nodes.length}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Head Node</div>
            <div className="ds-stat-value text-slate-900">
              {nodes.length > 0 ? nodes[0].value : "null"}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Tail Node</div>
            <div className="ds-stat-value text-slate-900">
              {nodes.length > 0 ? nodes[nodes.length - 1].value : "null"}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Pointers Per Node</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-teal-600">
              {listType === "singly" ? "1 (next)" : "2 (prev, next)"}
            </div>
          </div>
        </div>

        {/* Message Alert */}
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : message.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : message.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-emerald-500 shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Operations Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    disabled={isBusy}
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleInsertHead}
                    disabled={isBusy}
                    className="ds-btn bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Head
                  </button>
                  <button
                    onClick={handleInsertTail}
                    disabled={isBusy}
                    className="ds-btn bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Tail
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDeleteHead}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    Del Head
                  </button>
                  <button
                    onClick={handleDeleteTail}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    Del Tail
                  </button>
                  <button
                    onClick={handleReverse}
                    disabled={isBusy || nodes.length < 2}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Reverse List"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reverse
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Linked List Canvas */}
              <div className="ds-stage min-h-[320px] bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 overflow-x-auto">
                <div className="w-full flex items-center justify-start min-w-max py-8 px-4 gap-2">
                  {nodes.length === 0 ? (
                    <div className="w-full text-center py-12 text-slate-400">
                      <LayoutList className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-semibold">Linked List is empty (HEAD points to NULL)</p>
                    </div>
                  ) : (
                    nodes.map((node, idx) => {
                      const isHead = idx === 0;
                      const isTail = idx === nodes.length - 1;

                      return (
                        <React.Fragment key={node.id}>
                          {/* Node Card */}
                          <div className="flex flex-col items-center">
                            {/* Head/Tail Indicator */}
                            <div className="h-6 mb-1 text-[11px] font-bold uppercase tracking-wider">
                              {isHead && (
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-300">
                                  HEAD
                                </span>
                              )}
                              {isTail && !isHead && (
                                <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">
                                  TAIL
                                </span>
                              )}
                            </div>

                            {/* Node Compound Box */}
                            <div
                              className={`flex rounded-2xl overflow-hidden shadow-md border-2 transition-all duration-300 ${
                                node.status === "visiting"
                                  ? "border-amber-400 ring-4 ring-amber-300 scale-110"
                                  : node.status === "found"
                                  ? "border-emerald-500 ring-4 ring-emerald-300 scale-110"
                                  : node.status === "inserting"
                                  ? "border-cyan-400 ring-4 ring-cyan-300 scale-105"
                                  : node.status === "deleting"
                                  ? "border-rose-400 opacity-20 scale-75"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {/* Prev Pointer Block (for Doubly Linked List) */}
                              {listType === "doubly" && (
                                <div className="px-2 py-3 bg-slate-100 border-r border-slate-200 text-[10px] font-mono text-slate-400 flex items-center justify-center">
                                  {isHead ? "null" : "•"}
                                </div>
                              )}

                              {/* Data Val Cell */}
                              <div className="px-4 py-3 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-mono font-bold text-lg min-w-[50px] text-center">
                                {node.value}
                              </div>

                              {/* Next Pointer Block */}
                              <div className="px-2.5 py-3 bg-slate-100 border-l border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-center">
                                •
                              </div>
                            </div>

                            {/* Index Subtext */}
                            <div className="text-[10px] text-slate-400 font-mono mt-2">
                              idx: {idx}
                            </div>
                          </div>

                          {/* Connector Arrow */}
                          <div className="flex items-center px-1 text-slate-400">
                            {listType === "singly" ? (
                              <ArrowRight className="w-6 h-6 text-emerald-500/70" />
                            ) : (
                              <ArrowLeftRight className="w-6 h-6 text-teal-500/70" />
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}

                  {/* Terminal NULL pointer */}
                  {nodes.length > 0 && (
                    <div className="flex flex-col items-center">
                      <div className="h-6 mb-1" />
                      <div className="px-3 py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-100/60 text-slate-400 font-mono font-bold text-xs">
                        NULL
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Nodes are dynamically chained via pointers. Singly linked list flows forwards; Doubly allows bidirectional traversal.
              </div>
            </div>

            {/* History Logs */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Operation Execution History
                </h3>
                <span className="text-xs text-slate-400 font-mono">Latest first</span>
              </div>
              <div className="bg-slate-900 rounded-xl p-3 max-h-36 overflow-y-auto space-y-1 font-mono text-xs">
                {logs.map((log, index) => (
                  <div key={index} className="text-slate-300 flex items-center gap-2">
                    <span className="text-slate-600 select-none">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ds-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
                  {(["insertHead", "insertTail", "deleteVal", "search"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2 py-1 font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab.replace("insert", "ins").replace("delete", "del")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                {PSEUDOCODE[activeTab].map((line, idx) => (
                  <div
                    key={idx}
                    className={`py-1 px-2 rounded transition-colors ${
                      highlightLine === idx
                        ? "bg-emerald-600/40 text-emerald-200 font-bold border-l-2 border-emerald-400"
                        : "text-slate-300"
                    }`}
                  >
                    <span className="text-slate-600 select-none mr-3">{idx + 1}</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert at Head</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert at Tail</span>
                  <span className="font-mono font-bold text-emerald-600">O(1) with tail ptr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Delete at Head</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search / Access</span>
                  <span className="font-mono font-bold text-amber-600">O(n)</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Applications</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Dynamic memory allocation in kernels (free list)</li>
                <li>Music player playlists (next song / previous song)</li>
                <li>Hash table collision chaining (buckets)</li>
                <li>Image viewer next / previous slide carousel</li>
                <li>Polynomial arithmetic representations</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
