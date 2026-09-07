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
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import {
  SpeedControl,
  MultiLangCode,
  NodeInspector,
  ChallengeTracker,
  Challenge,
} from "@/components/data-structures/InteractiveElements";
import { DATA_STRUCTURE_CODES } from "@/data/dataStructuresCode";

type ListType = "singly" | "doubly";

interface ListNode {
  id: string;
  value: number;
  status: "idle" | "visiting" | "found" | "inserting" | "deleting";
}

export default function LinkedListVisualizerPage() {
  const [listType, setListType] = useState<ListType>("singly");
  const [nodes, setNodes] = useState<ListNode[]>([
    { id: "1", value: 12, status: "idle" },
    { id: "2", value: 45, status: "idle" },
    { id: "3", value: 78, status: "idle" },
    { id: "4", value: 99, status: "idle" },
  ]);
  const [inputValue, setInputValue] = useState<string>("33");
  const [activeTab, setActiveTab] = useState<string>("insertHead");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Linked List initialized with 4 nodes. Dynamic pointer architecture.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Linked list initialized with [12, 45, 78, 99]",
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    value: number;
    index: number;
    role: string;
    extra?: Record<string, string | number>;
  } | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "insertHead", title: "Insert a new node at the Head (O(1))", completed: false },
    { id: "insertTail", title: "Insert a new node at the Tail", completed: false },
    { id: "search", title: "Search and traverse to locate a value in the list", completed: false },
    { id: "doubly", title: "Switch to Doubly Linked List mode", completed: false },
    { id: "inspect", title: "Click any node to inspect its next/prev pointer addresses", completed: false },
  ]);

  const markChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: true } : c))
    );
  };

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const playTone = (freq: number) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms / speed));

  const handleInsertHead = async (valToInsert?: number) => {
    if (isBusy) return;
    const num = valToInsert ?? parseInt(inputValue);
    if (isNaN(num)) return;

    if (nodes.length >= 8) {
      setMessage({ text: "Max visualizer node limit (8) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insertHead");
    setHighlightLine(1);
    playTone(520);

    const newNode: ListNode = {
      id: Math.random().toString(36).substring(2, 9),
      value: num,
      status: "inserting",
    };

    setNodes((prev) => [newNode, ...prev]);
    setMessage({ text: `Inserted node ${num} at Head. Head pointer updated.`, type: "success" });
    addLog(`➕ Inserted ${num} at Head`);
    markChallenge("insertHead");

    await sleep(400);
    setHighlightLine(3);
    setNodes((prev) =>
      prev.map((n) => (n.id === newNode.id ? { ...n, status: "idle" } : n))
    );
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleInsertTail = async (valToInsert?: number) => {
    if (isBusy) return;
    const num = valToInsert ?? parseInt(inputValue);
    if (isNaN(num)) return;

    if (nodes.length >= 8) {
      setMessage({ text: "Max visualizer node limit (8) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insertTail");
    setHighlightLine(1);
    playTone(480);

    const newNode: ListNode = {
      id: Math.random().toString(36).substring(2, 9),
      value: num,
      status: "inserting",
    };

    setNodes((prev) => [...prev, newNode]);
    setMessage({ text: `Appended node ${num} at Tail.`, type: "success" });
    addLog(`➕ Appended ${num} at Tail`);
    markChallenge("insertTail");

    await sleep(400);
    setHighlightLine(4);
    setNodes((prev) =>
      prev.map((n) => (n.id === newNode.id ? { ...n, status: "idle" } : n))
    );
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleDelete = async (valToDelete?: number) => {
    if (isBusy || nodes.length === 0) return;
    const num = valToDelete ?? parseInt(inputValue);
    if (isNaN(num)) return;

    setIsBusy(true);
    setActiveTab("deleteVal");
    setHighlightLine(3);
    playTone(380);

    const targetIdx = nodes.findIndex((n) => n.value === num);
    if (targetIdx === -1) {
      setMessage({ text: `Value ${num} not found in list to delete.`, type: "error" });
      addLog(`❌ Delete failed: ${num} not in list`);
      setIsBusy(false);
      return;
    }

    setNodes((prev) =>
      prev.map((n, i) => (i === targetIdx ? { ...n, status: "deleting" } : n))
    );
    setMessage({ text: `Deleting node with value ${num}...`, type: "warning" });

    await sleep(450);
    setHighlightLine(5);
    setNodes((prev) => prev.filter((_, i) => i !== targetIdx));
    if (selectedNode?.value === num) setSelectedNode(null);
    setMessage({ text: `Node ${num} removed. Pointers re-linked.`, type: "success" });
    addLog(`➖ Deleted node ${num}`);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleSearch = async () => {
    if (isBusy || nodes.length === 0) return;
    const num = parseInt(inputValue);
    if (isNaN(num)) return;

    setIsBusy(true);
    setActiveTab("search");
    setHighlightLine(1);
    setMessage({ text: `Beginning linear traversal search for ${num}...`, type: "info" });
    addLog(`🔍 Searching for ${num}`);

    let found = false;
    for (let i = 0; i < nodes.length; i++) {
      setHighlightLine(3);
      playTone(350 + i * 50);
      setNodes((prev) =>
        prev.map((n, idx) => (idx === i ? { ...n, status: "visiting" } : { ...n, status: "idle" }))
      );
      await sleep(500);

      if (nodes[i].value === num) {
        setHighlightLine(4);
        playTone(700);
        setNodes((prev) =>
          prev.map((n, idx) => (idx === i ? { ...n, status: "found" } : n))
        );
        setMessage({ text: `Found ${num} at index ${i} after ${i + 1} hops!`, type: "success" });
        addLog(`🎯 Found ${num} at index ${i}`);
        markChallenge("search");
        found = true;
        break;
      }
    }

    if (!found) {
      setHighlightLine(6);
      playTone(200);
      setMessage({ text: `Search completed: ${num} is not present in the list.`, type: "error" });
      addLog(`❌ Value ${num} not found`);
    }

    await sleep(900);
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setNodes([]);
    setSelectedNode(null);
    setMessage({ text: "Linked list cleared to null.", type: "info" });
    addLog("🗑 Cleared all nodes");
    playTone(300);
  };

  // Presets
  const applyPreset = async (preset: string) => {
    if (isBusy) return;
    setIsBusy(true);

    if (preset === "random4") {
      setNodes([
        { id: "l1", value: Math.floor(Math.random() * 80) + 10, status: "idle" },
        { id: "l2", value: Math.floor(Math.random() * 80) + 10, status: "idle" },
        { id: "l3", value: Math.floor(Math.random() * 80) + 10, status: "idle" },
        { id: "l4", value: Math.floor(Math.random() * 80) + 10, status: "idle" },
      ]);
      addLog("🎲 Loaded Preset: 4 Random Nodes");
      setMessage({ text: "Loaded 4 random nodes.", type: "info" });
    } else if (preset === "reverseDemo") {
      setMessage({ text: "Reversing linked list pointers...", type: "warning" });
      addLog("🔄 Executing pointer reversal");
      const rev = [...nodes].reverse();
      for (let i = 0; i < rev.length; i++) {
        playTone(400 + i * 60);
        await sleep(250);
      }
      setNodes(rev);
      setMessage({ text: "List reversed successfully! Head is now at former tail.", type: "success" });
      addLog("✅ Reversal complete");
    } else if (preset === "doublyDemo") {
      setListType("doubly");
      markChallenge("doubly");
      setNodes([
        { id: "d1", value: 10, status: "idle" },
        { id: "d2", value: 20, status: "idle" },
        { id: "d3", value: 30, status: "idle" },
      ]);
      setMessage({ text: "Doubly Linked List mode: Each node stores both NEXT and PREV memory pointers.", type: "info" });
      addLog("↔️ Loaded Preset: Doubly Linked Chain");
    }

    setIsBusy(false);
  };

  const handleSelectNode = (n: ListNode, idx: number) => {
    const isHead = idx === 0;
    const isTail = idx === nodes.length - 1;
    const nextPtr = isTail ? "NULL (0x0)" : `0x7FFEE${((nodes[idx + 1].value + 15) * 1024).toString(16).toUpperCase()}`;
    const prevPtr = isHead ? "NULL (0x0)" : `0x7FFEE${((nodes[idx - 1].value + 15) * 1024).toString(16).toUpperCase()}`;

    setSelectedNode({
      id: n.id,
      value: n.value,
      index: idx,
      role: isHead ? "Head Pointer Node" : isTail ? "Tail Node (Next -> NULL)" : `Internal Node [${idx}]`,
      extra: {
        "Next Address": nextPtr,
        ...(listType === "doubly" ? { "Prev Address": prevPtr } : {}),
      },
    });
    markChallenge("inspect");
    playTone(550);
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/30">
                <LayoutList className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Linked List Visualizer</h1>
                <p className="text-xs text-slate-400">Dynamic Pointer-Chained Memory Nodes</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SpeedControl speed={speed} setSpeed={setSpeed} disabled={isBusy} />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio active" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <Sparkles className="w-3 h-3" />
              Interactive Lab
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="ds-container">
        {/* Metric Ribbons */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Node Count</div>
            <div className="ds-stat-value text-teal-600">{nodes.length} Nodes</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Head Value</div>
            <div className="ds-stat-value text-slate-900">{nodes.length > 0 ? nodes[0].value : "NULL"}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Tail Value</div>
            <div className="ds-stat-value text-slate-900">{nodes.length > 0 ? nodes[nodes.length - 1].value : "NULL"}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Chain Architecture</div>
            <div className="ds-stat-value text-xs font-bold uppercase text-emerald-600 tracking-wider">
              {listType} linked
            </div>
          </div>
        </div>

        {/* Action Status Banner */}
        <div
          className={`mb-4 p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : message.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : message.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-teal-50 border-teal-200 text-teal-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {message.type === "info" && <Info className="w-5 h-5 text-teal-500 shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Animation Speed: <strong className="text-teal-700">{speed}x</strong>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            onClick={() => applyPreset("random4")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            🎲 Random 4 Nodes
          </button>
          <button
            onClick={() => applyPreset("reverseDemo")}
            disabled={isBusy || nodes.length < 2}
            className="ds-preset-chip"
          >
            🔄 Reverse List Flow
          </button>
          <button
            onClick={() => applyPreset("doublyDemo")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ↔️ Doubly Linked Chain
          </button>
        </div>

        {/* Visualization & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* List Type Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setListType("singly")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      listType === "singly"
                        ? "bg-white text-teal-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Singly Linked (Next →)
                  </button>
                  <button
                    onClick={() => {
                      setListType("doubly");
                      markChallenge("doubly");
                    }}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      listType === "doubly"
                        ? "bg-white text-teal-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Doubly Linked (← Prev | Next →)
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  Node Size: {nodes.length} / 8
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    disabled={isBusy}
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => handleInsertHead()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-teal-600 hover:bg-teal-700"
                  >
                    <Plus className="w-4 h-4" />
                    Head
                  </button>
                  <button
                    onClick={() => handleInsertTail()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
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
                    onClick={() => handleDelete()}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                    Delete Val
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || nodes.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Clear List"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Visualizer */}
              <div className="ds-stage min-h-[380px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 overflow-x-auto">
                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                  <Info className="w-3.5 h-3.5 text-teal-500" />
                  <span>Click any node to inspect pointer memory and pointers</span>
                </div>

                <div className="w-full flex items-center justify-start min-w-max px-4 py-8">
                  {/* Head Marker */}
                  <div className="flex flex-col items-center mr-3">
                    <span className="text-xs font-bold text-teal-700 uppercase">Head</span>
                    <ArrowRight className="w-4 h-4 text-teal-500" />
                  </div>

                  {nodes.length === 0 ? (
                    <div className="px-10 py-6 border-2 border-dashed border-slate-300 rounded-xl bg-white text-slate-400 font-mono text-xs">
                      NULL (Empty List)
                    </div>
                  ) : (
                    nodes.map((node, idx) => {
                      const isHead = idx === 0;
                      const isTail = idx === nodes.length - 1;
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <div key={node.id} className="flex items-center">
                          {/* Node Box */}
                          <div
                            onClick={() => handleSelectNode(node, idx)}
                            className={`flex flex-col items-center justify-center min-w-[90px] h-24 rounded-2xl border-2 p-2 cursor-pointer transition-all duration-300 bg-white shadow-md relative ${
                              isSelected
                                ? "border-teal-600 ring-4 ring-teal-400 scale-105"
                                : node.status === "visiting"
                                ? "border-amber-500 bg-amber-50 scale-105 animate-pulse"
                                : node.status === "found"
                                ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300 scale-110"
                                : node.status === "inserting"
                                ? "border-blue-500 bg-blue-50 animate-bounce"
                                : node.status === "deleting"
                                ? "border-rose-500 bg-rose-50 opacity-40 scale-90"
                                : "border-slate-200 hover:border-teal-300"
                            }`}
                          >
                            <div className="text-[10px] font-mono text-slate-400">
                              [{idx}]
                            </div>
                            <div className="text-lg font-bold font-mono text-slate-900">
                              {node.value}
                            </div>
                            <div className="text-[9px] font-mono text-slate-400 mt-1">
                              0x{(idx * 16 + 10).toString(16).toUpperCase()}
                            </div>

                            {isHead && (
                              <span className="absolute -top-2.5 left-2 px-1.5 py-0.2 bg-teal-600 text-white text-[9px] font-bold uppercase rounded-full">
                                Head
                              </span>
                            )}
                            {isTail && (
                              <span className="absolute -bottom-2.5 right-2 px-1.5 py-0.2 bg-slate-700 text-white text-[9px] font-bold uppercase rounded-full">
                                Tail
                              </span>
                            )}
                          </div>

                          {/* Pointer Arrow */}
                          <div className="flex flex-col items-center px-2 text-slate-400">
                            {listType === "doubly" ? (
                              <ArrowLeftRight className="w-5 h-5 text-teal-600" />
                            ) : (
                              <ArrowRight className="w-5 h-5 text-teal-500" />
                            )}
                            <span className="text-[9px] font-mono">next</span>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Null Terminator */}
                  <div className="flex flex-col items-center ml-1">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold shadow-sm">
                      NULL
                    </span>
                  </div>
                </div>
              </div>

              {/* Inspector */}
              {selectedNode && (
                <div className="mt-4">
                  <NodeInspector
                    selectedNode={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    actionLabel="Delete This Node"
                    onAction={() => handleDelete(selectedNode.value)}
                  />
                </div>
              )}
            </div>

            {/* Logs */}
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
            <MultiLangCode
              codeMap={DATA_STRUCTURE_CODES.linkedList.code[activeTab] || DATA_STRUCTURE_CODES.linkedList.code.insertHead}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.linkedList.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Linked List"
              challenges={challenges}
            />

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert at Head</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert at Tail</span>
                  <span className="font-mono font-bold text-amber-600">O(n) (or O(1) w/ tail ptr)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search Value</span>
                  <span className="font-mono font-bold text-amber-600">O(n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Delete Node</span>
                  <span className="font-mono font-bold text-amber-600">O(n)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
