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
  Clock,
  Sparkles,
  ArrowRight,
  RotateCw,
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

type QueueMode = "linear" | "circular" | "priority";

interface QueueItem {
  id: string;
  value: number;
  priority?: number;
  status: "idle" | "entering" | "peeking" | "leaving";
}

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
  const [activeTab, setActiveTab] = useState<string>("enqueue");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Queue initialized. FIFO (First In, First Out) architecture.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Queue initialized with values [10, 25, 40]",
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    value: number;
    index: number;
    role: string;
    extra?: Record<string, string | number>;
  } | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "enq4", title: "Enqueue at least 4 items into the queue", completed: false },
    { id: "deq", title: "Dequeue an element from the front", completed: false },
    { id: "circular", title: "Switch to Circular Queue mode and observe wrap-around", completed: false },
    { id: "priority", title: "Switch to Priority Queue mode and enqueue with priority", completed: false },
    { id: "inspect", title: "Click any item to inspect its memory address and role", completed: false },
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

  const handleEnqueue = async (valToEnqueue?: number, customPriority?: number) => {
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
      playTone(220);
      return;
    }

    setIsBusy(true);
    setActiveTab("enqueue");
    setHighlightLine(3);
    playTone(500);

    const prio = customPriority ?? (mode === "priority" ? inputPriority : undefined);
    const newItem: QueueItem = {
      id: Math.random().toString(36).substring(2, 9),
      value: num,
      priority: prio,
      status: "entering",
    };

    let nextItems: QueueItem[];
    if (mode === "priority") {
      nextItems = [...items, newItem].sort((a, b) => (b.priority || 0) - (a.priority || 0));
    } else {
      nextItems = [...items, newItem];
    }

    setItems(nextItems);
    setMessage({
      text: `Enqueued ${num}${prio ? ` (Priority ${prio})` : ""} at the rear.`,
      type: "success",
    });
    addLog(`➕ Enqueued ${num} (Size: ${nextItems.length})`);

    if (nextItems.length >= 4) {
      markChallenge("enq4");
    }

    await sleep(400);
    setHighlightLine(4);
    setItems((prev) =>
      prev.map((it) => (it.id === newItem.id ? { ...it, status: "idle" } : it))
    );
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleDequeue = async () => {
    if (isBusy) return;
    if (items.length === 0) {
      setActiveTab("dequeue");
      setHighlightLine(1);
      setMessage({ text: "Queue Underflow! Queue is currently empty.", type: "error" });
      addLog("❌ Queue Underflow: empty queue");
      playTone(200);
      return;
    }

    setIsBusy(true);
    setActiveTab("dequeue");
    setHighlightLine(3);
    playTone(420);

    const frontItem = items[0];
    setItems((prev) =>
      prev.map((it, idx) => (idx === 0 ? { ...it, status: "leaving" } : it))
    );
    setMessage({ text: `Dequeuing front item (${frontItem.value})...`, type: "warning" });

    await sleep(450);
    setHighlightLine(4);
    setItems((prev) => prev.slice(1));
    if (selectedItem?.id === frontItem.id) setSelectedItem(null);
    setMessage({ text: `Dequeued ${frontItem.value} from front.`, type: "success" });
    addLog(`➖ Dequeued ${frontItem.value}`);
    markChallenge("deq");
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handlePeek = async () => {
    if (isBusy) return;
    setActiveTab("peek");
    if (items.length === 0) {
      setHighlightLine(1);
      setMessage({ text: "Peek returned null: Queue is empty.", type: "warning" });
      addLog("👁 Peek: queue is empty");
      return;
    }

    setIsBusy(true);
    setHighlightLine(2);
    playTone(660);

    const frontItem = items[0];
    setItems((prev) =>
      prev.map((it, idx) => (idx === 0 ? { ...it, status: "peeking" } : it))
    );
    setMessage({ text: `Front element is ${frontItem.value}.`, type: "info" });
    addLog(`👁 Peeked at front: ${frontItem.value}`);

    await sleep(700);
    setItems((prev) => prev.map((it) => ({ ...it, status: "idle" })));
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setItems([]);
    setSelectedItem(null);
    setMessage({ text: "Queue has been cleared.", type: "info" });
    addLog("🗑 Cleared all queue elements");
    playTone(300);
  };

  // Presets
  const applyPreset = async (preset: string) => {
    if (isBusy) return;
    setIsBusy(true);

    if (preset === "random4") {
      setItems([]);
      await sleep(150);
      const newItems: QueueItem[] = [
        { id: "q1", value: Math.floor(Math.random() * 80) + 10, priority: 2, status: "idle" },
        { id: "q2", value: Math.floor(Math.random() * 80) + 10, priority: 3, status: "idle" },
        { id: "q3", value: Math.floor(Math.random() * 80) + 10, priority: 1, status: "idle" },
        { id: "q4", value: Math.floor(Math.random() * 80) + 10, priority: 2, status: "idle" },
      ];
      setItems(newItems);
      addLog("🎲 Loaded Preset: 4 Random Queue Items");
      markChallenge("enq4");
    } else if (preset === "circularDemo") {
      setMode("circular");
      markChallenge("circular");
      setItems([
        { id: "c1", value: 12, status: "idle" },
        { id: "c2", value: 24, status: "idle" },
        { id: "c3", value: 36, status: "idle" },
        { id: "c4", value: 48, status: "idle" },
      ]);
      setMessage({ text: "Circular Queue mode activated. Fixed ring buffer with modulo arithmetic.", type: "info" });
      addLog("🔄 Loaded Preset: Circular Buffer Setup");
    } else if (preset === "priorityDemo") {
      setMode("priority");
      markChallenge("priority");
      setItems([
        { id: "pr1", value: 99, priority: 3, status: "idle" },
        { id: "pr2", value: 50, priority: 2, status: "idle" },
        { id: "pr3", value: 15, priority: 1, status: "idle" },
      ]);
      setMessage({ text: "Priority Queue mode activated. Highest priority elements jump to the front!", type: "info" });
      addLog("⚡ Loaded Preset: Priority Queue (High to Low)");
    } else if (preset === "overflowDemo") {
      const full = Array.from({ length: capacity }, (_, i) => ({
        id: `full-${i}`,
        value: (i + 1) * 10,
        priority: 1,
        status: "idle" as const,
      }));
      setItems(full);
      setMessage({ text: `Queue full (${capacity}/${capacity}). Trying to enqueue next item...`, type: "warning" });
      await sleep(500);
      setActiveTab("enqueue");
      setHighlightLine(1);
      setMessage({ text: `Queue Overflow! Capacity limit (${capacity}) reached.`, type: "error" });
      addLog("❌ Queue Overflow Triggered!");
      playTone(220);
    }

    setIsBusy(false);
  };

  const handleSelectNode = (it: QueueItem, idx: number) => {
    const isFront = idx === 0;
    const isRear = idx === items.length - 1;
    setSelectedItem({
      id: it.id,
      value: it.value,
      index: idx,
      role: isFront ? "FRONT (Next Dequeued)" : isRear ? "REAR (Most Recently Enqueued)" : `Middle Member [${idx}]`,
      extra: {
        ...(it.priority ? { Priority: it.priority } : {}),
        Position: isFront ? "Front" : isRear ? "Rear" : "Transit",
      },
    });
    markChallenge("inspect");
    playTone(550);
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
                <p className="text-xs text-slate-400">FIFO (First In, First Out) Flow</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SpeedControl speed={speed} setSpeed={setSpeed} disabled={isBusy} />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio enabled" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
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
            <div className="ds-stat-value text-blue-600">
              {items.length} <span className="text-xs text-slate-400 font-normal">/ {capacity}</span>
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Front Element</div>
            <div className="ds-stat-value text-slate-900">{frontValue}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Rear Element</div>
            <div className="ds-stat-value text-slate-900">{rearValue}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Active Mode</div>
            <div className="ds-stat-value text-xs font-bold uppercase text-indigo-600 tracking-wider">
              {mode}
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
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {message.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Animation Speed: <strong className="text-blue-700">{speed}x</strong>
          </div>
        </div>

        {/* Interactive Scenario Presets */}
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
            🎲 Random 4 Items
          </button>
          <button
            onClick={() => applyPreset("circularDemo")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            🔄 Circular Ring Setup
          </button>
          <button
            onClick={() => applyPreset("priorityDemo")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ⚡ Priority Queue (High/Med/Low)
          </button>
          <button
            onClick={() => applyPreset("overflowDemo")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            🔥 Full Capacity Test
          </button>
        </div>

        {/* Visualization & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Queue Mode Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  {(["linear", "circular", "priority"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        if (m === "circular") markChallenge("circular");
                        if (m === "priority") markChallenge("priority");
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                        mode === m
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {m} Queue
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span>Capacity: {capacity}</span>
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    disabled={isBusy}
                    className="w-24 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {mode === "priority" && (
                    <select
                      value={inputPriority}
                      onChange={(e) => setInputPriority(parseInt(e.target.value))}
                      disabled={isBusy}
                      className="px-2.5 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>Low Prio (1)</option>
                      <option value={2}>Med Prio (2)</option>
                      <option value={3}>High Prio (3)</option>
                    </select>
                  )}

                  <button
                    onClick={() => handleEnqueue()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Enqueue
                  </button>

                  <button
                    onClick={() => handleEnqueue(Math.floor(Math.random() * 90) + 10)}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                    title="Enqueue Random Value"
                  >
                    <Shuffle className="w-4 h-4" />
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
                    title="Clear Queue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Visualizer */}
              <div className="ds-stage min-h-[380px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 overflow-hidden">
                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Click any item in the queue to inspect simulated memory</span>
                </div>

                {/* Linear & Priority Rendering */}
                {mode !== "circular" ? (
                  <div className="w-full flex flex-col items-center gap-4">
                    {/* Directional Flow Guide */}
                    <div className="flex items-center justify-between w-full max-w-2xl px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Dequeue (Front)</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <span>Enqueue (Rear)</span>
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pipe Track */}
                    <div className="w-full max-w-2xl border-2 border-dashed border-slate-300 bg-white/80 rounded-2xl p-4 min-h-[96px] flex items-center gap-3 overflow-x-auto shadow-inner">
                      {items.length === 0 ? (
                        <div className="m-auto text-center py-6 text-slate-400">
                          <ListOrdered className="w-10 h-10 mx-auto mb-1 opacity-30" />
                          <p className="text-xs font-medium">Queue is empty</p>
                        </div>
                      ) : (
                        items.map((it, idx) => {
                          const isFront = idx === 0;
                          const isRear = idx === items.length - 1;
                          const isSelected = selectedItem?.id === it.id;
                          return (
                            <div
                              key={it.id}
                              onClick={() => handleSelectNode(it, idx)}
                              className={`flex-shrink-0 w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-300 relative shadow-sm ${
                                isSelected
                                  ? "border-blue-600 bg-blue-100 ring-4 ring-blue-400 scale-105"
                                  : isFront
                                  ? "border-emerald-500 bg-emerald-50"
                                  : isRear
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-300 bg-white hover:border-slate-400"
                              } ${
                                it.status === "entering"
                                  ? "scale-110 ring-4 ring-blue-400 animate-pulse"
                                  : it.status === "leaving"
                                  ? "opacity-0 -translate-x-6 scale-90"
                                  : it.status === "peeking"
                                  ? "ring-4 ring-amber-400 animate-pulse"
                                  : ""
                              }`}
                            >
                              <div className="text-[10px] font-mono text-slate-400 mb-0.5">
                                [{idx}]
                              </div>
                              <div className="text-base font-bold font-mono text-slate-900">
                                {it.value}
                              </div>
                              {mode === "priority" && it.priority && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded mt-1">
                                  P{it.priority}
                                </span>
                              )}
                              {isFront && (
                                <span className="absolute -top-2.5 left-2 px-1.5 py-0.2 bg-emerald-500 text-white text-[9px] font-bold uppercase rounded-full">
                                  Front
                                </span>
                              )}
                              {isRear && (
                                <span className="absolute -bottom-2.5 right-2 px-1.5 py-0.2 bg-blue-500 text-white text-[9px] font-bold uppercase rounded-full">
                                  Rear
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                ) : (
                  /* Circular Ring Mode */
                  <div className="flex flex-col items-center justify-center relative py-6">
                    <div className="w-64 h-64 rounded-full border-4 border-dashed border-blue-300 flex items-center justify-center relative">
                      <div className="text-center">
                        <RotateCw className="w-8 h-8 mx-auto text-blue-500 animate-spin" style={{ animationDuration: "12s" }} />
                        <span className="text-xs font-bold text-slate-600 mt-1 block">Circular Buffer</span>
                        <span className="text-[10px] text-slate-400">Modulo Wrapping</span>
                      </div>

                      {Array.from({ length: capacity }).map((_, slotIdx) => {
                        const angle = (slotIdx / capacity) * 2 * Math.PI - Math.PI / 2;
                        const r = 100;
                        const x = Math.round(r * Math.cos(angle));
                        const y = Math.round(r * Math.sin(angle));
                        const itemAtSlot = items[slotIdx];

                        return (
                          <div
                            key={slotIdx}
                            onClick={() => itemAtSlot && handleSelectNode(itemAtSlot, slotIdx)}
                            className={`absolute w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${
                              itemAtSlot
                                ? "bg-blue-600 text-white border-blue-700 cursor-pointer hover:scale-110"
                                : "bg-white text-slate-300 border-slate-200"
                            }`}
                            style={{
                              transform: `translate(${x}px, ${y}px)`,
                            }}
                          >
                            {itemAtSlot ? itemAtSlot.value : slotIdx}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Inspector */}
              {selectedItem && (
                <div className="mt-4">
                  <NodeInspector
                    selectedNode={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    actionLabel="Enqueue Duplicate"
                    onAction={() => handleEnqueue(selectedItem.value)}
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

          {/* Right Column: Code & Challenges */}
          <div className="lg:col-span-4 space-y-6">
            <MultiLangCode
              codeMap={DATA_STRUCTURE_CODES.queue.code[activeTab] || DATA_STRUCTURE_CODES.queue.code.enqueue}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.queue.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Queue"
              challenges={challenges}
            />

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Enqueue Operation</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Dequeue Operation</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Peek / Front</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search</span>
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
