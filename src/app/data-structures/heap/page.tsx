"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Binary,
  ArrowLeft,
  Plus,
  Minus,
  RotateCcw,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowUpDown,
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

type HeapType = "min" | "max";

export default function HeapVisualizerPage() {
  const [heapType, setHeapType] = useState<HeapType>("max");
  const [heap, setHeap] = useState<number[]>([90, 75, 60, 40, 55, 30, 20]);
  const [inputValue, setInputValue] = useState<string>("85");
  const [activeTab, setActiveTab] = useState<string>("insert");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Max-Heap loaded. Parent is always greater than or equal to its children.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized Max-Heap: [90, 75, 60, 40, 55, 30, 20]",
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
    { id: "insert", title: "Insert an element and watch Heapify-Up swap into position", completed: false },
    { id: "extract", title: "Extract the root element and watch Heapify-Down bubble down", completed: false },
    { id: "toggle", title: "Toggle between Min-Heap and Max-Heap", completed: false },
    { id: "inspect", title: "Click any node/array cell to inspect parent & child index equations", completed: false },
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

  const shouldSwap = (child: number, parent: number, type: HeapType) => {
    return type === "max" ? child > parent : child < parent;
  };

  const handleInsert = async (valToInsert?: number) => {
    if (isBusy) return;
    const val = valToInsert ?? parseInt(inputValue);
    if (isNaN(val)) return;

    if (heap.length >= 15) {
      setMessage({ text: "Visualizer limit (15 nodes) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);
    playTone(500);

    const newHeap = [...heap, val];
    setHeap(newHeap);
    let curr = newHeap.length - 1;
    setActiveIndices([curr]);
    setMessage({ text: `Appended ${val} at index ${curr}. Checking heap property...`, type: "info" });
    addLog(`➕ Added ${val} at index ${curr}`);

    await sleep(400);

    // Bubble up
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      setActiveIndices([curr, parent]);
      setHighlightLine(3);
      playTone(450);

      await sleep(500);

      if (shouldSwap(newHeap[curr], newHeap[parent], heapType)) {
        setHighlightLine(4);
        playTone(600);
        const temp = newHeap[curr];
        newHeap[curr] = newHeap[parent];
        newHeap[parent] = temp;
        setHeap([...newHeap]);
        setMessage({ text: `Swapped child ${temp} with parent ${newHeap[curr]}.`, type: "warning" });
        addLog(`🔄 Swapped [${curr}] and [${parent}]`);
        curr = parent;
        await sleep(500);
      } else {
        break;
      }
    }

    setActiveIndices([]);
    setHighlightLine(null);
    setMessage({ text: `Successfully inserted ${val} into valid heap position!`, type: "success" });
    addLog(`✅ Inserted ${val}`);
    markChallenge("insert");
    setIsBusy(false);
  };

  const handleExtract = async () => {
    if (isBusy || heap.length === 0) return;

    setIsBusy(true);
    setActiveTab("extract");
    setHighlightLine(1);
    playTone(400);

    const rootVal = heap[0];
    if (heap.length === 1) {
      setHeap([]);
      setMessage({ text: `Extracted only element ${rootVal}. Heap is now empty.`, type: "success" });
      addLog(`➖ Extracted root ${rootVal}`);
      setIsBusy(false);
      return;
    }

    const newHeap = [...heap];
    const lastVal = newHeap.pop()!;
    newHeap[0] = lastVal;
    setHeap([...newHeap]);
    setActiveIndices([0]);
    setMessage({ text: `Moved last item (${lastVal}) to root. Heapifying down...`, type: "warning" });
    addLog(`➖ Extracted ${rootVal}, placed ${lastVal} at root`);

    await sleep(500);

    // Bubble down
    let curr = 0;
    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let target = curr;

      if (left < newHeap.length && shouldSwap(newHeap[left], newHeap[target], heapType)) {
        target = left;
      }
      if (right < newHeap.length && shouldSwap(newHeap[right], newHeap[target], heapType)) {
        target = right;
      }

      if (target !== curr) {
        setActiveIndices([curr, target]);
        setHighlightLine(3);
        playTone(520);
        await sleep(500);

        const temp = newHeap[curr];
        newHeap[curr] = newHeap[target];
        newHeap[target] = temp;
        setHeap([...newHeap]);
        curr = target;
      } else {
        break;
      }
    }

    setActiveIndices([]);
    setHighlightLine(null);
    setMessage({ text: `Extracted ${rootVal}. Valid heap property restored.`, type: "success" });
    addLog(`✅ Restored heap property`);
    markChallenge("extract");
    setIsBusy(false);
  };

  const handleToggleHeapType = () => {
    if (isBusy) return;
    const nextType: HeapType = heapType === "max" ? "min" : "max";
    setHeapType(nextType);
    markChallenge("toggle");

    // Re-heapify current items
    const items = [...heap];
    for (let i = Math.floor(items.length / 2); i >= 0; i--) {
      // heapify down
      let curr = i;
      while (true) {
        const left = 2 * curr + 1;
        const right = 2 * curr + 2;
        let target = curr;
        if (left < items.length && shouldSwap(items[left], items[target], nextType)) target = left;
        if (right < items.length && shouldSwap(items[right], items[target], nextType)) target = right;
        if (target !== curr) {
          const t = items[curr];
          items[curr] = items[target];
          items[target] = t;
          curr = target;
        } else break;
      }
    }

    setHeap(items);
    setMessage({
      text: `Converted to ${nextType === "max" ? "Max-Heap (Parent ≥ Children)" : "Min-Heap (Parent ≤ Children)"}.`,
      type: "info",
    });
    addLog(`🔀 Converted to ${nextType.toUpperCase()}-Heap`);
    playTone(550);
  };

  const handleClear = () => {
    if (isBusy) return;
    setHeap([]);
    setSelectedNode(null);
    setMessage({ text: "Heap cleared.", type: "info" });
    addLog("🗑 Cleared heap");
    playTone(300);
  };

  // Node position helper for up to 3 levels (15 nodes)
  const getNodePosition = (idx: number) => {
    const level = Math.floor(Math.log2(idx + 1));
    const countInLevel = Math.pow(2, level);
    const posInLevel = idx - (countInLevel - 1);
    const totalWidth = 640;
    const x = (totalWidth / (countInLevel + 1)) * (posInLevel + 1);
    const y = 40 + level * 65;
    return { x, y };
  };

  const handleSelectNode = (val: number, idx: number) => {
    const parentIdx = idx > 0 ? Math.floor((idx - 1) / 2) : "None (Root)";
    const leftChild = 2 * idx + 1 < heap.length ? heap[2 * idx + 1] : "None";
    const rightChild = 2 * idx + 2 < heap.length ? heap[2 * idx + 2] : "None";

    setSelectedNode({
      id: `heap-${idx}`,
      value: val,
      index: idx,
      role: idx === 0 ? `Root (${heapType.toUpperCase()} element)` : `Array Index [${idx}]`,
      extra: {
        "Parent Index": typeof parentIdx === "number" ? `[${parentIdx}] (${heap[parentIdx]})` : parentIdx,
        "Left Child": leftChild !== "None" ? `[${2 * idx + 1}] (${leftChild})` : "None",
        "Right Child": rightChild !== "None" ? `[${2 * idx + 2}] (${rightChild})` : "None",
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Binary Heap Visualizer</h1>
                <p className="text-xs text-slate-400">Complete Binary Tree with Array Mapping</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SpeedControl speed={speed} setSpeed={setSpeed} disabled={isBusy} />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio active" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/30">
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
            <div className="ds-stat-label">Heap Elements</div>
            <div className="ds-stat-value text-amber-600">{heap.length} Nodes</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Root Extracted Value</div>
            <div className="ds-stat-value text-slate-900">{heap.length > 0 ? heap[0] : "NULL"}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Heap Property</div>
            <div className="ds-stat-value text-xs font-bold uppercase text-amber-600 tracking-wider">
              {heapType}-Heap Order
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Extract Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-emerald-600">O(log n)</div>
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
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {message.type === "info" && <Info className="w-5 h-5 text-amber-500 shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Animation Speed: <strong className="text-amber-700">{speed}x</strong>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            onClick={handleToggleHeapType}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            <ArrowUpDown className="w-3 h-3 text-amber-600" />
            Toggle {heapType === "max" ? "Min-Heap" : "Max-Heap"}
          </button>
          <button
            onClick={() => handleInsert(95)}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            📈 Heapify-Up Demo (Insert 95)
          </button>
          <button
            onClick={handleExtract}
            disabled={isBusy || heap.length === 0}
            className="ds-preset-chip"
          >
            📉 Heapify-Down Demo (Extract Root)
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    disabled={isBusy}
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handleInsert()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-amber-600 hover:bg-amber-700"
                  >
                    <Plus className="w-4 h-4" />
                    Insert
                  </button>
                  <button
                    onClick={() => handleInsert(Math.floor(Math.random() * 90) + 10)}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                    title="Insert Random Node"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExtract}
                    disabled={isBusy || heap.length === 0}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                    Extract Root
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || heap.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Clear Heap"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Array Backing Buffer Display */}
              <div className="my-4 p-3 bg-slate-900 rounded-xl">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Array Backing Representation (Zero-Index Buffer)</span>
                  <span className="font-mono text-amber-400">parent = floor((i - 1) / 2)</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {heap.map((val, idx) => {
                    const isActive = activeIndices.includes(idx);
                    const isSelected = selectedNode?.index === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectNode(val, idx)}
                        className={`flex flex-col items-center flex-shrink-0 cursor-pointer transition-all ${
                          isSelected
                            ? "ring-2 ring-amber-400 scale-105"
                            : isActive
                            ? "ring-2 ring-rose-400 scale-105"
                            : "hover:opacity-80"
                        }`}
                      >
                        <div
                          className={`w-11 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                            isActive
                              ? "bg-amber-500 text-white"
                              : idx === 0
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-800 text-slate-200 border border-slate-700"
                          }`}
                        >
                          {val}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 mt-1">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tree View Canvas */}
              <div className="ds-stage min-h-[360px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200 z-10">
                  <Info className="w-3.5 h-3.5 text-amber-500" />
                  <span>Click any node to inspect heap parent & child relations</span>
                </div>

                <svg className="w-[660px] h-[280px] mx-auto overflow-visible select-none">
                  {/* Edges from child to parent */}
                  {heap.map((_, idx) => {
                    if (idx === 0) return null;
                    const parentIdx = Math.floor((idx - 1) / 2);
                    const pPos = getNodePosition(parentIdx);
                    const cPos = getNodePosition(idx);

                    return (
                      <line
                        key={`edge-${idx}`}
                        x1={pPos.x}
                        y1={pPos.y}
                        x2={cPos.x}
                        y2={cPos.y}
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {heap.map((val, idx) => {
                    const pos = getNodePosition(idx);
                    const isActive = activeIndices.includes(idx);
                    const isSelected = selectedNode?.index === idx;

                    return (
                      <g
                        key={`node-${idx}`}
                        onClick={() => handleSelectNode(val, idx)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          className={`transition-all duration-300 ${
                            isSelected
                              ? "fill-amber-600 stroke-indigo-500 stroke-[4px]"
                              : isActive
                              ? "fill-amber-500 stroke-amber-300 stroke-[4px] animate-pulse"
                              : idx === 0
                              ? "fill-emerald-600 stroke-emerald-400 stroke-[3px]"
                              : "fill-white stroke-slate-300 stroke-[2.5px] hover:stroke-amber-400"
                          }`}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + 4}
                          textAnchor="middle"
                          className={`text-xs font-mono font-bold select-none ${
                            isSelected || isActive || idx === 0 ? "fill-white" : "fill-slate-800"
                          }`}
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Inspector */}
              {selectedNode && (
                <div className="mt-4">
                  <NodeInspector
                    selectedNode={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    actionLabel="Insert Similar Node"
                    onAction={() => handleInsert(selectedNode.value)}
                  />
                </div>
              )}
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
            <MultiLangCode
              codeMap={DATA_STRUCTURE_CODES.heap.code[activeTab] || DATA_STRUCTURE_CODES.heap.code.insert}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.heap.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Binary Heap"
              challenges={challenges}
            />

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Find Root (Min/Max)</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert (Heapify-Up)</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Extract (Heapify-Down)</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Build Heap (Heapify)</span>
                  <span className="font-mono font-bold text-indigo-600">O(n)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
