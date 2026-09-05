"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ListOrdered,
  ArrowLeft,
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
  ArrowRight,
  RotateCw,
  Award,
} from "lucide-react";

type QueueMode = "linear" | "circular" | "priority";

interface QueueItem {
  id: string;
  value: number;
  priority?: number;
  status: "idle" | "entering" | "peeking" | "leaving";
}

const PSEUDOCODE = {
  enqueue: [
    "function enqueue(queue, item):",
    "  if queue.isFull():",
    "    throw QueueOverflowError",
    "  queue.rear = (queue.rear + 1) % capacity",
    "  queue.items[queue.rear] = item",
    "  queue.size++",
  ],
  dequeue: [
    "function dequeue(queue):",
    "  if queue.isEmpty():",
    "    throw QueueUnderflowError",
    "  item = queue.items[queue.front]",
    "  queue.front = (queue.front + 1) % capacity",
    "  queue.size--",
    "  return item",
  ],
  peek: [
    "function peek(queue):",
    "  if queue.isEmpty():",
    "    return null",
    "  return queue.items[queue.front]",
  ],
};

export default function QueueVisualizerPage() {
  const [mode, setMode] = useState<QueueMode>("linear");
  const [items, setItems] = useState<QueueItem[]>([
    { id: "1", value: 10, priority: 2, status: "idle" },
    { id: "2", value: 25, priority: 1, status: "idle" },
    { id: "3", value: 40, priority: 3, status: "idle" },
  ]);
  const [inputValue, setInputValue] = useState<string>("55");
  const [inputPriority, setInputPriority] = useState<number>(2);
  const [capacity, setCapacity] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<"enqueue" | "dequeue" | "peek">("enqueue");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Queue initialized. FIFO (First In, First Out) structure.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Queue initialized with values [10, 25, 40]",
  ]);
  const [isBusy, setIsBusy] = useState(false);

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const handleEnqueue = (valToEnqueue?: number, customPriority?: number) => {
    if (isBusy) return;
    const num = valToEnqueue ?? parseInt(inputValue);
    if (isNaN(num)) {
      setMessage({ text: "Please provide a valid number to enqueue.", type: "error" });
      return;
    }

    if (items.length >= capacity) {
      setActiveTab("enqueue");
      setHighlightLine(1);
      setMessage({ text: `Queue is Full! Max capacity is ${capacity}.`, type: "error" });
      addLog(`❌ Queue Overflow: cannot enqueue ${num}`);
      return;
    }

    setIsBusy(true);
    setActiveTab("enqueue");
    setHighlightLine(3);

    const newItem: QueueItem = {
      id: Math.random().toString(36).substring(2, 9),
      value: num,
      priority: customPriority ?? inputPriority,
      status: "entering",
    };

    if (mode === "priority") {
      // In priority queue, elements are sorted by priority ascending (1 = highest)
      const updated = [...items, newItem].sort((a, b) => (a.priority || 0) - (b.priority || 0));
      setItems(updated);
      setMessage({ text: `Enqueued ${num} (Priority: ${newItem.priority}) in priority order.`, type: "success" });
      addLog(`➕ Enqueued ${num} [P:${newItem.priority}] into Priority Queue`);
    } else {
      setItems((prev) => [...prev, newItem]);
      setMessage({ text: `Enqueued ${num} at Rear position.`, type: "success" });
      addLog(`➕ Enqueued ${num} at Rear (index ${items.length})`);
    }

    setTimeout(() => {
      setHighlightLine(4);
      setItems((prev) => prev.map((it) => (it.id === newItem.id ? { ...it, status: "idle" } : it)));
      setHighlightLine(null);
      setIsBusy(false);
    }, 400);
  };

  const handleDequeue = () => {
    if (isBusy) return;
    if (items.length === 0) {
      setActiveTab("dequeue");
      setHighlightLine(1);
      setMessage({ text: "Queue Underflow! Cannot dequeue from an empty queue.", type: "error" });
      addLog("❌ Queue Underflow: empty queue");
      return;
    }

    setIsBusy(true);
    setActiveTab("dequeue");
    setHighlightLine(3);

    const frontItem = items[0];
    setItems((prev) =>
      prev.map((item, idx) => (idx === 0 ? { ...item, status: "leaving" } : item))
    );
    setMessage({ text: `Dequeuing Front element (${frontItem.value})...`, type: "warning" });

    setTimeout(() => {
      setHighlightLine(4);
      setItems((prev) => prev.slice(1));
      setMessage({ text: `Dequeued element ${frontItem.value} from the Front.`, type: "success" });
      addLog(`➖ Dequeued ${frontItem.value} from Front`);
      setHighlightLine(null);
      setIsBusy(false);
    }, 450);
  };

  const handlePeek = () => {
    if (isBusy) return;
    setActiveTab("peek");
    if (items.length === 0) {
      setHighlightLine(1);
      setMessage({ text: "Peek returned null: Queue is empty.", type: "warning" });
      addLog("👁 Peek: queue is empty");
      return;
    }

    setIsBusy(true);
    setHighlightLine(3);
    const frontItem = items[0];

    setItems((prev) =>
      prev.map((it, idx) => (idx === 0 ? { ...it, status: "peeking" } : it))
    );
    setMessage({ text: `Front element is ${frontItem.value}.`, type: "info" });
    addLog(`👁 Peeked at Front: ${frontItem.value}`);

    setTimeout(() => {
      setItems((prev) => prev.map((it) => ({ ...it, status: "idle" })));
      setHighlightLine(null);
      setIsBusy(false);
    }, 700);
  };

  const handleClear = () => {
    if (isBusy) return;
    setItems([]);
    setMessage({ text: "Queue has been cleared.", type: "info" });
    addLog("🗑 Cleared the entire queue");
  };

  const handleRandom = () => {
    const val = Math.floor(Math.random() * 90) + 10;
    const pri = Math.floor(Math.random() * 3) + 1;
    handleEnqueue(val, pri);
  };

  const frontValue = items.length > 0 ? items[0].value : "null";
  const rearValue = items.length > 0 ? items[items.length - 1].value : "null";

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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <ListOrdered className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Queue Visualizer</h1>
                <p className="text-xs text-slate-400">FIFO (First In, First Out) Architecture</p>
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setMode("linear")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                mode === "linear" ? "bg-blue-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setMode("circular")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                mode === "circular" ? "bg-cyan-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Circular
            </button>
            <button
              onClick={() => setMode("priority")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                mode === "priority" ? "bg-purple-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Priority
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ds-container">
        {/* Statistics Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Queue Size</div>
            <div className="ds-stat-value text-blue-600">
              {items.length} <span className="text-xs text-slate-400 font-normal">/ {capacity}</span>
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Front (Next Out)</div>
            <div className="ds-stat-value text-slate-900">{frontValue}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Rear (Last In)</div>
            <div className="ds-stat-value text-slate-900">{rearValue}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Current Mode</div>
            <div className="ds-stat-value text-xs font-bold uppercase tracking-wider text-cyan-600">
              {mode} Queue
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : message.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : message.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>

        {/* Visualizer Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {mode === "priority" && (
                    <select
                      value={inputPriority}
                      onChange={(e) => setInputPriority(parseInt(e.target.value))}
                      disabled={isBusy}
                      className="px-2 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                    >
                      <option value={1}>P1 (High)</option>
                      <option value={2}>P2 (Med)</option>
                      <option value={3}>P3 (Low)</option>
                    </select>
                  )}
                  <button
                    onClick={() => handleEnqueue()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  >
                    <Plus className="w-4 h-4" />
                    Enqueue
                  </button>
                  <button
                    onClick={handleRandom}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Shuffle className="w-4 h-4" />
                    Random
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDequeue}
                    disabled={isBusy || items.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                    Dequeue
                  </button>
                  <button
                    onClick={handlePeek}
                    disabled={isBusy || items.length === 0}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Eye className="w-4 h-4" />
                    Peek
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || items.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Visual Display */}
              <div className="ds-stage min-h-[360px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 overflow-x-auto">
                {mode === "circular" ? (
                  // Circular Queue Ring View
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-64 h-64 rounded-full border-4 border-dashed border-cyan-300 flex items-center justify-center shadow-inner">
                      <div className="absolute text-center">
                        <RotateCw className="w-8 h-8 mx-auto text-cyan-500 opacity-60 mb-1" />
                        <div className="text-xs font-bold uppercase text-slate-600">Circular Buffer</div>
                        <div className="text-[10px] text-slate-400">Idx 0..{capacity - 1}</div>
                      </div>

                      {Array.from({ length: capacity }).map((_, idx) => {
                        const angle = (idx / capacity) * 2 * Math.PI - Math.PI / 2;
                        const radius = 100;
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);
                        const hasItem = idx < items.length;
                        const item = hasItem ? items[idx] : null;

                        return (
                          <div
                            key={idx}
                            className={`absolute w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs shadow-md transition-all ${
                              item
                                ? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white ring-2 ring-cyan-300"
                                : "bg-white border-2 border-slate-200 text-slate-400"
                            }`}
                            style={{
                              transform: `translate(${x}px, ${y}px)`,
                            }}
                          >
                            <span>{item ? item.value : idx}</span>
                            {item && (
                              <span className="text-[8px] font-normal opacity-80">[{idx}]</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Linear & Priority Horizontal Tube
                  <div className="w-full flex flex-col items-center gap-6">
                    {/* Direction Flow Labels */}
                    <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 px-4">
                      <span className="flex items-center gap-1 text-emerald-600">
                        ← FRONT (Exit / Dequeue)
                      </span>
                      <span className="flex items-center gap-1 text-blue-600">
                        REAR (Entry / Enqueue) →
                      </span>
                    </div>

                    {/* Tube Row */}
                    <div className="w-full min-h-[110px] p-3 rounded-2xl bg-white/80 border-2 border-slate-200 shadow-sm flex items-center gap-3 overflow-x-auto">
                      {items.length === 0 ? (
                        <div className="w-full text-center py-6 text-slate-400">
                          <ListOrdered className="w-10 h-10 mx-auto mb-1 opacity-40" />
                          <p className="text-xs font-semibold">Queue is currently empty</p>
                        </div>
                      ) : (
                        items.map((item, idx) => {
                          const isFront = idx === 0;
                          const isRear = idx === items.length - 1;

                          return (
                            <div
                              key={item.id}
                              className={`shrink-0 w-24 h-24 rounded-2xl p-2.5 flex flex-col justify-between text-white font-bold shadow-md transition-all duration-300 ${
                                item.priority === 1
                                  ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                                  : item.priority === 2
                                  ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                                  : "bg-gradient-to-br from-teal-500 to-emerald-600"
                              } ${
                                item.status === "entering"
                                  ? "scale-110 ring-4 ring-cyan-300"
                                  : item.status === "leaving"
                                  ? "scale-75 opacity-0 -translate-x-6"
                                  : item.status === "peeking"
                                  ? "ring-4 ring-amber-400 scale-105"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="bg-black/20 px-1.5 py-0.5 rounded font-mono">
                                  #{idx}
                                </span>
                                {mode === "priority" && item.priority && (
                                  <span className="bg-white/20 px-1 rounded flex items-center gap-0.5">
                                    <Award className="w-2.5 h-2.5" /> P{item.priority}
                                  </span>
                                )}
                              </div>
                              <div className="text-center font-mono text-xl tracking-wider">
                                {item.value}
                              </div>
                              <div className="text-[10px] text-center font-semibold">
                                {isFront && isRear ? (
                                  <span className="bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded">
                                    Front & Rear
                                  </span>
                                ) : isFront ? (
                                  <span className="bg-emerald-400 text-slate-900 px-1.5 py-0.5 rounded">
                                    Front
                                  </span>
                                ) : isRear ? (
                                  <span className="bg-blue-300 text-slate-900 px-1.5 py-0.5 rounded">
                                    Rear
                                  </span>
                                ) : (
                                  <span className="opacity-70">Item</span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Slider Settings */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Capacity:</span>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    disabled={isBusy}
                    className="cursor-pointer accent-blue-600"
                  />
                  <span className="font-bold text-blue-600 text-sm">{capacity} slots</span>
                </div>
                <div className="text-slate-400">
                  Ideal for Task queues, print spoolers & Breadth-First Search (BFS).
                </div>
              </div>
            </div>

            {/* History Logs */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Operation History
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

          {/* Right Column: Code & Theory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ds-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                  {(["enqueue", "dequeue", "peek"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-blue-600 shadow-sm"
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
                        ? "bg-blue-600/40 text-blue-200 font-bold border-l-2 border-blue-400"
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
                <Info className="w-4 h-4 text-cyan-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Enqueue</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Dequeue</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Peek</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search</span>
                  <span className="font-mono font-bold text-amber-600">O(n)</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Use Cases</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Operating system CPU process scheduling</li>
                <li>Breadth First Search (BFS) in trees & graphs</li>
                <li>Network packet buffering & routers</li>
                <li>Message brokers (Kafka, RabbitMQ, SQS)</li>
                <li>Printer spooling queue service</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
