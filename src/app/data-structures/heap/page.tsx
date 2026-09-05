"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Binary,
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
  ArrowUpDown,
} from "lucide-react";

type HeapType = "min" | "max";

const PSEUDOCODE = {
  insert: [
    "function insert(heap, val):",
    "  heap.push(val)",
    "  curr = heap.length - 1",
    "  while curr > 0:",
    "    parent = floor((curr - 1) / 2)",
    "    if shouldSwap(heap[curr], heap[parent]):",
    "      swap(heap[curr], heap[parent])",
    "      curr = parent",
  ],
  extract: [
    "function extractRoot(heap):",
    "  root = heap[0]",
    "  heap[0] = heap.pop() // move last to root",
    "  heapifyDown(0) // bubble down into valid pos",
    "  return root",
  ],
};

export default function HeapVisualizerPage() {
  const [heapType, setHeapType] = useState<HeapType>("max");
  const [heap, setHeap] = useState<number[]>([90, 75, 60, 40, 55, 30, 20]);
  const [inputValue, setInputValue] = useState<string>("85");
  const [activeTab, setActiveTab] = useState<"insert" | "extract">("insert");
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

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const shouldSwap = (child: number, parent: number, type: HeapType) => {
    return type === "max" ? child > parent : child < parent;
  };

  const handleInsert = async () => {
    if (isBusy) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    if (heap.length >= 15) {
      setMessage({ text: "Visualizer limit (15 nodes) reached.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);

    const arr = [...heap, val];
    setHeap(arr);
    let curr = arr.length - 1;
    setActiveIndices([curr]);
    setMessage({ text: `Appended ${val} at index ${curr}. Starting bubble-up...`, type: "info" });
    addLog(`➕ Appended ${val} at index ${curr}`);

    await sleep(400);

    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      setActiveIndices([curr, parent]);
      setHighlightLine(5);
      await sleep(450);

      if (shouldSwap(arr[curr], arr[parent], heapType)) {
        setHighlightLine(6);
        const temp = arr[curr];
        arr[curr] = arr[parent];
        arr[parent] = temp;
        setHeap([...arr]);
        setMessage({
          text: `Swapped child ${temp} with parent ${arr[curr]} to restore heap property.`,
          type: "info",
        });
        curr = parent;
        await sleep(500);
      } else {
        break;
      }
    }

    setMessage({ text: `Heap invariant restored. ${val} placed at index ${curr}.`, type: "success" });
    addLog(`✅ Inserted ${val} successfully into ${heapType.toUpperCase()}-Heap`);
    setActiveIndices([]);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleExtract = async () => {
    if (isBusy || heap.length === 0) return;
    setIsBusy(true);
    setActiveTab("extract");
    setHighlightLine(1);

    const rootVal = heap[0];
    if (heap.length === 1) {
      setHeap([]);
      setMessage({ text: `Extracted last remaining root value ${rootVal}.`, type: "success" });
      addLog(`➖ Extracted root: ${rootVal}`);
      setIsBusy(false);
      return;
    }

    const arr = [...heap];
    const lastVal = arr.pop()!;
    arr[0] = lastVal;
    setHeap([...arr]);
    setActiveIndices([0]);
    setMessage({ text: `Extracted root ${rootVal}. Moved last element (${lastVal}) to root. Heapifying down...`, type: "warning" });
    addLog(`➖ Extracted root (${rootVal}), moved ${lastVal} to root`);

    await sleep(600);
    setHighlightLine(3);

    let curr = 0;
    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let target = curr;

      if (left < arr.length && shouldSwap(arr[left], arr[target], heapType)) {
        target = left;
      }
      if (right < arr.length && shouldSwap(arr[right], arr[target], heapType)) {
        target = right;
      }

      if (target !== curr) {
        setActiveIndices([curr, target]);
        await sleep(450);
        const temp = arr[curr];
        arr[curr] = arr[target];
        arr[target] = temp;
        setHeap([...arr]);
        curr = target;
        await sleep(500);
      } else {
        break;
      }
    }

    setMessage({ text: `Heapify complete. New root is ${arr[0]}.`, type: "success" });
    addLog(`✅ Heap property restored with new root ${arr[0]}`);
    setActiveIndices([]);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleToggleType = (type: HeapType) => {
    if (isBusy) return;
    setHeapType(type);
    // Re-heapify current values for selected type
    const arr = [...heap];
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      let curr = i;
      while (true) {
        const left = 2 * curr + 1;
        const right = 2 * curr + 2;
        let best = curr;
        if (left < arr.length && shouldSwap(arr[left], arr[best], type)) best = left;
        if (right < arr.length && shouldSwap(arr[right], arr[best], type)) best = right;
        if (best !== curr) {
          const t = arr[curr];
          arr[curr] = arr[best];
          arr[best] = t;
          curr = best;
        } else break;
      }
    }
    setHeap(arr);
    setMessage({ text: `Converted to ${type.toUpperCase()}-Heap.`, type: "info" });
    addLog(`🔄 Converted heap to ${type.toUpperCase()}-Heap`);
  };

  const handleRandom = () => {
    const val = Math.floor(Math.random() * 90) + 10;
    setInputValue(val.toString());
  };

  // Compute Tree Node Positions
  const getNodePos = (index: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, level);
    const posInLevel = index - (nodesInLevel - 1);
    const totalWidth = 650;
    const step = totalWidth / (nodesInLevel + 1);
    const x = step * (posInLevel + 1);
    const y = level * 65 + 40;
    return { x, y };
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Binary Heap Visualizer</h1>
                <p className="text-xs text-slate-400">Complete Binary Tree & Priority Array</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => handleToggleType("max")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                heapType === "max" ? "bg-rose-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Max-Heap
            </button>
            <button
              onClick={() => handleToggleType("min")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                heapType === "min" ? "bg-pink-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Min-Heap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ds-container">
        {/* Metric Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Heap Size</div>
            <div className="ds-stat-value text-rose-600">{heap.length}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Root (Peak Element)</div>
            <div className="ds-stat-value text-slate-900">
              {heap.length > 0 ? heap[0] : "null"}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Heap Invariant</div>
            <div className="ds-stat-value text-xs font-bold uppercase tracking-wider text-pink-600">
              {heapType === "max" ? "Parent >= Children" : "Parent <= Children"}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Insert / Extract Time</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-rose-600">
              O(log n) guaranteed
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
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-rose-500 shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>

        {/* Workspace */}
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
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    onClick={handleInsert}
                    disabled={isBusy}
                    className="ds-btn bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Insert
                  </button>
                  <button
                    onClick={handleExtract}
                    disabled={isBusy || heap.length === 0}
                    className="ds-btn bg-pink-500 hover:bg-pink-600 text-white shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                    Extract Root
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
                    onClick={() => setHeap([])}
                    disabled={isBusy || heap.length === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* View 1: Tree View SVG */}
              <div className="ds-stage min-h-[280px] bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                {heap.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Binary className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">Heap is empty</p>
                  </div>
                ) : (
                  <svg className="w-full h-[240px] min-w-[650px]">
                    {/* Edges from parent to children */}
                    {heap.map((_, i) => {
                      const left = 2 * i + 1;
                      const right = 2 * i + 2;
                      const p = getNodePos(i);
                      return (
                        <React.Fragment key={`edge-${i}`}>
                          {left < heap.length && (
                            <line
                              x1={p.x}
                              y1={p.y}
                              x2={getNodePos(left).x}
                              y2={getNodePos(left).y}
                              stroke="#cbd5e1"
                              strokeWidth="2.5"
                            />
                          )}
                          {right < heap.length && (
                            <line
                              x1={p.x}
                              y1={p.y}
                              x2={getNodePos(right).x}
                              y2={getNodePos(right).y}
                              stroke="#cbd5e1"
                              strokeWidth="2.5"
                            />
                          )}
                        </React.Fragment>
                      );
                    })}

                    {/* Tree Nodes */}
                    {heap.map((val, i) => {
                      const pos = getNodePos(i);
                      const isActive = activeIndices.includes(i);
                      return (
                        <g key={`node-${i}`} className="cursor-pointer">
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="20"
                            className={`transition-all duration-300 ${
                              isActive
                                ? "fill-rose-500 stroke-rose-300 stroke-[5px]"
                                : "fill-white stroke-slate-400 stroke-2"
                            }`}
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 5}
                            textAnchor="middle"
                            className={`font-mono font-bold text-xs ${
                              isActive ? "fill-white font-extrabold text-sm" : "fill-slate-800"
                            }`}
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>

              {/* View 2: Array Memory Layout */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dual Representation: Array Memory Buffer
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    left = 2i + 1, right = 2i + 2
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {heap.map((val, i) => {
                    const isActive = activeIndices.includes(i);
                    return (
                      <div
                        key={i}
                        className={`shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-between p-1 font-mono transition-all duration-300 ${
                          isActive
                            ? "bg-rose-500 text-white ring-2 ring-rose-300 scale-105"
                            : "bg-white border border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="text-[9px] opacity-60">[{i}]</span>
                        <span className="font-bold text-sm">{val}</span>
                        <span className="text-[8px] font-semibold">{i === 0 ? "Root" : ""}</span>
                      </div>
                    );
                  })}
                </div>
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
                  <Code2 className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
                  {(["insert", "extract"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2 py-1 font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-rose-600 shadow-sm"
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
                        ? "bg-rose-600/40 text-rose-200 font-bold border-l-2 border-rose-400"
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
                <Info className="w-4 h-4 text-pink-500" />
                Heap Characteristics
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert (Bubble-Up)</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Extract Root (Heapify)</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Peek Min/Max</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Build Heap (Heapify All)</span>
                  <span className="font-mono font-bold text-indigo-600">O(n)</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Applications</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Priority Queues in OS task schedulers</li>
                <li>Dijkstra&apos;s Shortest Path algorithm optimization</li>
                <li>Heap Sort (in-place O(n log n) sorting algorithm)</li>
                <li>Finding K largest/smallest elements in big data streams</li>
                <li>Huffman coding tree generation for data compression</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
