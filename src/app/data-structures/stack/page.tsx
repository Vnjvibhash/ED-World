"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowLeft,
  Play,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Clock,
  Sparkles,
  ArrowUp,
  Volume2,
  VolumeX,
} from "lucide-react";

interface StackItem {
  id: string;
  value: number;
  color: string;
  status: "idle" | "entering" | "peeking" | "popping";
}

const COLOR_PALETTE = [
  "from-violet-500 to-purple-600",
  "from-indigo-500 to-blue-600",
  "from-blue-500 to-cyan-600",
  "from-teal-500 to-emerald-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-yellow-600",
  "from-orange-500 to-amber-600",
  "from-rose-500 to-pink-600",
  "from-pink-500 to-rose-600",
];

const PSEUDOCODE = {
  push: [
    "function push(stack, value):",
    "  if stack.size >= stack.capacity:",
    "    throw StackOverflowError",
    "  stack.top = stack.top + 1",
    "  stack[stack.top] = value",
    "  return true",
  ],
  pop: [
    "function pop(stack):",
    "  if stack.isEmpty():",
    "    throw StackUnderflowError",
    "  value = stack[stack.top]",
    "  stack.top = stack.top - 1",
    "  return value",
  ],
  peek: [
    "function peek(stack):",
    "  if stack.isEmpty():",
    "    return null",
    "  return stack[stack.top]",
  ],
};

export default function StackVisualizerPage() {
  const [stack, setStack] = useState<StackItem[]>([
    { id: "1", value: 15, color: COLOR_PALETTE[0], status: "idle" },
    { id: "2", value: 42, color: COLOR_PALETTE[1], status: "idle" },
    { id: "3", value: 87, color: COLOR_PALETTE[2], status: "idle" },
  ]);
  const [inputValue, setInputValue] = useState<string>("99");
  const [capacity, setCapacity] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<"push" | "pop" | "peek">("push");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Stack initialized with 3 elements. LIFO (Last In, First Out).",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized stack with [15, 42, 87]",
  ]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

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

  const handlePush = async (valToPush?: number) => {
    if (isBusy) return;
    const num = valToPush ?? parseInt(inputValue);
    if (isNaN(num)) {
      setMessage({ text: "Please enter a valid numeric value to push.", type: "error" });
      return;
    }

    if (stack.length >= capacity) {
      setActiveTab("push");
      setHighlightLine(1);
      setMessage({ text: `Stack Overflow! Capacity (${capacity}) reached.`, type: "error" });
      addLog(`❌ Stack Overflow: cannot push ${num}`);
      playTone(220);
      return;
    }

    setIsBusy(true);
    setActiveTab("push");
    setHighlightLine(3);
    playTone(520);

    const newItem: StackItem = {
      id: Math.random().toString(36).substring(2, 9),
      value: num,
      color: COLOR_PALETTE[(stack.length) % COLOR_PALETTE.length],
      status: "entering",
    };

    setStack((prev) => [...prev, newItem]);
    setMessage({ text: `Pushed ${num} onto the stack. Top index is now ${stack.length}.`, type: "success" });
    addLog(`➕ Pushed ${num} at index ${stack.length}`);

    setTimeout(() => {
      setHighlightLine(4);
      setStack((prev) =>
        prev.map((item) => (item.id === newItem.id ? { ...item, status: "idle" } : item))
      );
      setHighlightLine(null);
      setIsBusy(false);
    }, 400);
  };

  const handlePop = () => {
    if (isBusy) return;
    if (stack.length === 0) {
      setActiveTab("pop");
      setHighlightLine(1);
      setMessage({ text: "Stack Underflow! Cannot pop from an empty stack.", type: "error" });
      addLog("❌ Stack Underflow: stack is empty");
      playTone(200);
      return;
    }

    setIsBusy(true);
    setActiveTab("pop");
    setHighlightLine(3);
    playTone(400);

    const topItem = stack[stack.length - 1];
    setStack((prev) =>
      prev.map((item, idx) => (idx === prev.length - 1 ? { ...item, status: "popping" } : item))
    );
    setMessage({ text: `Popping top element (${topItem.value})...`, type: "warning" });

    setTimeout(() => {
      setHighlightLine(4);
      setStack((prev) => prev.slice(0, prev.length - 1));
      setMessage({ text: `Popped ${topItem.value} from the top.`, type: "success" });
      addLog(`➖ Popped ${topItem.value} from top`);
      setHighlightLine(null);
      setIsBusy(false);
    }, 450);
  };

  const handlePeek = () => {
    if (isBusy) return;
    setActiveTab("peek");
    if (stack.length === 0) {
      setHighlightLine(1);
      setMessage({ text: "Peek returned null: Stack is empty.", type: "warning" });
      addLog("👁 Peek: stack is empty");
      return;
    }

    setIsBusy(true);
    setHighlightLine(3);
    const topItem = stack[stack.length - 1];
    playTone(660);

    setStack((prev) =>
      prev.map((item, idx) => (idx === prev.length - 1 ? { ...item, status: "peeking" } : item))
    );
    setMessage({ text: `Top element is ${topItem.value} at index ${stack.length - 1}.`, type: "info" });
    addLog(`👁 Peeked at top: ${topItem.value}`);

    setTimeout(() => {
      setStack((prev) => prev.map((item) => ({ ...item, status: "idle" })));
      setHighlightLine(null);
      setIsBusy(false);
    }, 700);
  };

  const handleClear = () => {
    if (isBusy) return;
    setStack([]);
    setMessage({ text: "Stack has been cleared.", type: "info" });
    addLog("🗑 Cleared the entire stack");
    playTone(300);
  };

  const handlePushRandom = () => {
    const rand = Math.floor(Math.random() * 90) + 10;
    handlePush(rand);
  };

  const topElement = stack.length > 0 ? stack[stack.length - 1].value : "null";

  return (
    <div className="ds-page-wrapper">
      {/* Header Bar */}
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-violet-500/30">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Stack Visualizer</h1>
                <p className="text-xs text-slate-400">LIFO (Last In, First Out) Architecture</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio effects active" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30">
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
            <div className="ds-stat-label">Current Size</div>
            <div className="ds-stat-value text-violet-600">
              {stack.length} <span className="text-xs text-slate-400 font-normal">/ {capacity}</span>
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Top Element</div>
            <div className="ds-stat-value text-slate-900">{topElement}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">State</div>
            <div className="ds-stat-value text-xs font-bold uppercase tracking-wider">
              {stack.length === 0 ? (
                <span className="text-amber-600">Empty</span>
              ) : stack.length === capacity ? (
                <span className="text-rose-600">Full</span>
              ) : (
                <span className="text-emerald-600">Ready</span>
              )}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Time Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-indigo-600">O(1) All Ops</div>
          </div>
        </div>

        {/* Action Status Banner */}
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : message.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : message.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-violet-50 border-violet-200 text-violet-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-violet-500 shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>

        {/* Visualization & Controls Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visualizer Stage */}
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    disabled={isBusy}
                    className="w-24 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={() => handlePush()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    Push
                  </button>
                  <button
                    onClick={handlePushRandom}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                    title="Push Random Value"
                  >
                    <Shuffle className="w-4 h-4" />
                    Random
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePop}
                    disabled={isBusy || stack.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                    Pop
                  </button>
                  <button
                    onClick={handlePeek}
                    disabled={isBusy || stack.length === 0}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Eye className="w-4 h-4" />
                    Peek
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || stack.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Clear Stack"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stack Visual Bucket */}
              <div className="ds-stage min-h-[420px] flex-col justify-end relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 overflow-hidden">
                {/* Top Indicator Arrow */}
                {stack.length > 0 && (
                  <div
                    className="absolute right-6 flex items-center gap-2 text-xs font-bold text-violet-600 bg-violet-100/90 px-3 py-1.5 rounded-full border border-violet-300 shadow-sm transition-all duration-300"
                    style={{
                      bottom: `${(stack.length) * 52 + 16}px`,
                    }}
                  >
                    <span>TOP (Index {stack.length - 1})</span>
                    <ArrowUp className="w-4 h-4 animate-bounce" />
                  </div>
                )}

                {/* Stack Bucket Container */}
                <div
                  className="w-full max-w-sm mx-auto border-x-4 border-b-4 border-slate-400/80 rounded-b-2xl bg-white/70 shadow-inner flex flex-col-reverse items-center p-3 gap-2 transition-all relative"
                  style={{
                    minHeight: `${capacity * 52 + 24}px`,
                  }}
                >
                  {/* Capacity Marker Line */}
                  <div className="absolute top-2 right-3 text-[10px] uppercase font-bold text-slate-400">
                    Max Capacity: {capacity}
                  </div>

                  {stack.length === 0 ? (
                    <div className="m-auto text-center py-16 text-slate-400">
                      <Layers className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-medium">Stack is completely empty</p>
                      <p className="text-xs text-slate-400 mt-1">Use Push or Random button above to add elements</p>
                    </div>
                  ) : (
                    stack.map((item, index) => {
                      const isTop = index === stack.length - 1;
                      return (
                        <div
                          key={item.id}
                          className={`w-full py-3 px-4 rounded-xl text-white font-bold flex items-center justify-between shadow-md transition-all duration-300 bg-gradient-to-r ${item.color} ${
                            item.status === "entering"
                              ? "scale-105 ring-4 ring-emerald-400 translate-y-2"
                              : item.status === "popping"
                              ? "scale-90 opacity-0 -translate-y-4"
                              : item.status === "peeking"
                              ? "scale-105 ring-4 ring-amber-400 animate-pulse"
                              : isTop
                              ? "ring-2 ring-violet-400"
                              : ""
                          }`}
                          style={{ height: "46px" }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-black/20 font-mono font-medium">
                              [{index}]
                            </span>
                            <span className="text-base tracking-wide font-mono">{item.value}</span>
                          </div>
                          {isTop && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-violet-700 px-2 py-0.5 rounded-full shadow-sm">
                              Top
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Bottom of Stack (LIFO: Base Index 0)
                </div>
              </div>

              {/* Slider Settings */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Max Capacity:</span>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    disabled={isBusy}
                    className="cursor-pointer accent-violet-600"
                  />
                  <span className="font-bold text-violet-600 text-sm">{capacity} items</span>
                </div>
                <div className="text-slate-400">
                  Ideal for Undo/Redo stacks, recursion frames & expression parsers.
                </div>
              </div>
            </div>

            {/* Live Action History Log */}
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

          {/* Right Column: Pseudocode & Theory */}
          <div className="lg:col-span-4 space-y-6">
            {/* Algorithm Pseudocode Card */}
            <div className="ds-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-violet-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                  {(["push", "pop", "peek"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-violet-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab}
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
                        ? "bg-violet-600/40 text-violet-200 font-bold border-l-2 border-violet-400"
                        : "text-slate-300"
                    }`}
                  >
                    <span className="text-slate-600 select-none mr-3">{idx + 1}</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity & Key Properties */}
            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Push Operation</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Pop Operation</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Peek / Top</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search</span>
                  <span className="font-mono font-bold text-amber-600">O(n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Space Complexity</span>
                  <span className="font-mono font-bold text-indigo-600">O(n)</span>
                </div>
              </div>
            </div>

            {/* Real World Applications */}
            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Use Cases</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Browser Back / Forward navigation stack</li>
                <li>Call stack execution in V8 & JVM runtimes</li>
                <li>Undo / Redo (Ctrl+Z) in text editors</li>
                <li>Parentheses matching & syntax validation</li>
                <li>Depth First Search (DFS) graph traversal</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
