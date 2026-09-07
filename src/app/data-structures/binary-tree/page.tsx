"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  ArrowLeft,
  Plus,
  Search,
  RotateCcw,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Play,
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

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface PositionedNode {
  value: number;
  x: number;
  y: number;
  leftX?: number;
  leftY?: number;
  rightX?: number;
  rightY?: number;
  depth: number;
  hasLeft: boolean;
  hasRight: boolean;
}

function insertNode(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { value: val, left: null, right: null };
  if (val < root.value) {
    root.left = insertNode(root.left, val);
  } else if (val > root.value) {
    root.right = insertNode(root.right, val);
  }
  return root;
}

function calculatePositions(
  node: TreeNode | null,
  x: number,
  y: number,
  offset: number,
  depth: number = 0,
  positions: PositionedNode[] = []
): PositionedNode[] {
  if (!node) return positions;

  const currentPos: PositionedNode = {
    value: node.value,
    x,
    y,
    depth,
    hasLeft: !!node.left,
    hasRight: !!node.right,
  };

  if (node.left) {
    const leftX = x - offset;
    const leftY = y + 70;
    currentPos.leftX = leftX;
    currentPos.leftY = leftY;
    calculatePositions(node.left, leftX, leftY, Math.max(offset / 1.8, 28), depth + 1, positions);
  }

  if (node.right) {
    const rightX = x + offset;
    const rightY = y + 70;
    currentPos.rightX = rightX;
    currentPos.rightY = rightY;
    calculatePositions(node.right, rightX, rightY, Math.max(offset / 1.8, 28), depth + 1, positions);
  }

  positions.push(currentPos);
  return positions;
}

export default function BinaryTreeVisualizerPage() {
  const [root, setRoot] = useState<TreeNode | null>(() => {
    let r: TreeNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => {
      r = insertNode(r, v);
    });
    return r;
  });

  const [inputValue, setInputValue] = useState<string>("25");
  const [activeTab, setActiveTab] = useState<string>("insert");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [visitingNode, setVisitingNode] = useState<number | null>(null);
  const [foundNode, setFoundNode] = useState<number | null>(null);
  const [traversalSeq, setTraversalSeq] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Binary Search Tree (BST) loaded. Left < Root < Right invariant.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "BST initialized with [50, 30, 70, 20, 40, 60, 80]",
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    value: number;
    index?: number;
    role: string;
    extra?: Record<string, string | number>;
  } | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "insert5", title: "Have a tree with at least 5 nodes", completed: true },
    { id: "inorder", title: "Run In-Order traversal to observe sorted output", completed: false },
    { id: "preorder", title: "Run Pre-Order traversal", completed: false },
    { id: "search", title: "Search and navigate binary tree for a value", completed: false },
    { id: "inspect", title: "Click any node to inspect its depth, children, and memory", completed: false },
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

  const handleInsert = async (valToInsert?: number) => {
    if (isBusy) return;
    const num = valToInsert ?? parseInt(inputValue);
    if (isNaN(num)) return;

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);
    playTone(480);

    // Animate traversal down BST
    let curr = root;
    let path: number[] = [];
    while (curr) {
      path.push(curr.value);
      setVisitingNode(curr.value);
      playTone(350 + path.length * 40);
      await sleep(350);

      if (num === curr.value) {
        setMessage({ text: `Value ${num} already exists in this BST.`, type: "warning" });
        setIsBusy(false);
        setVisitingNode(null);
        return;
      } else if (num < curr.value) {
        setHighlightLine(3);
        curr = curr.left;
      } else {
        setHighlightLine(5);
        curr = curr.right;
      }
    }

    setRoot((prev) => insertNode(prev, num));
    setVisitingNode(null);
    setFoundNode(num);
    playTone(650);
    setMessage({ text: `Inserted ${num} into BST.`, type: "success" });
    addLog(`➕ Inserted node ${num}`);
    markChallenge("insert5");

    await sleep(600);
    setFoundNode(null);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleSearch = async () => {
    if (isBusy || !root) return;
    const target = parseInt(inputValue);
    if (isNaN(target)) return;

    setIsBusy(true);
    setActiveTab("search");
    setHighlightLine(1);
    setMessage({ text: `Searching for target ${target} using BST binary decisions...`, type: "info" });
    addLog(`🔍 Searching for ${target}`);

    let curr: TreeNode | null = root;
    let found = false;
    let depth = 0;

    while (curr) {
      setVisitingNode(curr.value);
      depth++;
      playTone(400 + depth * 50);
      await sleep(500);

      if (curr.value === target) {
        setHighlightLine(2);
        setFoundNode(curr.value);
        playTone(720);
        setMessage({ text: `Found ${target} at depth ${depth}!`, type: "success" });
        addLog(`🎯 Target ${target} found at depth ${depth}`);
        markChallenge("search");
        found = true;
        break;
      } else if (target < curr.value) {
        setHighlightLine(3);
        curr = curr.left;
      } else {
        setHighlightLine(4);
        curr = curr.right;
      }
    }

    if (!found) {
      setHighlightLine(5);
      playTone(200);
      setMessage({ text: `Target ${target} is not in this BST.`, type: "error" });
      addLog(`❌ Target ${target} not found`);
    }

    await sleep(800);
    setVisitingNode(null);
    setFoundNode(null);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const runTraversal = async (type: "inorder" | "preorder") => {
    if (isBusy || !root) return;
    setIsBusy(true);
    setActiveTab(type);
    setTraversalSeq([]);
    setMessage({ text: `Executing ${type} traversal...`, type: "info" });
    addLog(`🏃 Running ${type} traversal`);

    const seq: number[] = [];

    const traverse = async (node: TreeNode | null) => {
      if (!node) return;

      if (type === "preorder") {
        setVisitingNode(node.value);
        playTone(440 + seq.length * 30);
        seq.push(node.value);
        setTraversalSeq([...seq]);
        await sleep(400);
        await traverse(node.left);
        await traverse(node.right);
      } else {
        // Inorder
        await traverse(node.left);
        setVisitingNode(node.value);
        playTone(440 + seq.length * 30);
        seq.push(node.value);
        setTraversalSeq([...seq]);
        await sleep(400);
        await traverse(node.right);
      }
    };

    await traverse(root);
    setVisitingNode(null);

    if (type === "inorder") {
      markChallenge("inorder");
      setMessage({
        text: `In-Order traversal complete: [${seq.join(", ")}]. Notice elements are in ascending sorted order!`,
        type: "success",
      });
    } else {
      markChallenge("preorder");
      setMessage({
        text: `Pre-Order traversal complete: [${seq.join(", ")}].`,
        type: "success",
      });
    }

    addLog(`✅ ${type} finished: [${seq.join(", ")}]`);
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setRoot(null);
    setSelectedNode(null);
    setTraversalSeq([]);
    setMessage({ text: "Tree cleared.", type: "info" });
    addLog("🗑 Cleared the binary tree");
    playTone(300);
  };

  // Presets
  const applyPreset = async (preset: string) => {
    if (isBusy) return;
    setIsBusy(true);
    setTraversalSeq([]);

    if (preset === "balanced") {
      let r: TreeNode | null = null;
      [50, 25, 75, 12, 37, 62, 87].forEach((v) => {
        r = insertNode(r, v);
      });
      setRoot(r);
      addLog("🎲 Loaded Preset: Balanced 3-Level BST");
      setMessage({ text: "Loaded Balanced BST. Height is O(log n).", type: "info" });
    } else if (preset === "skewed") {
      let r: TreeNode | null = null;
      [10, 20, 30, 40, 50].forEach((v) => {
        r = insertNode(r, v);
      });
      setRoot(r);
      addLog("📈 Loaded Preset: Skewed Tree (Degenerate to O(n))");
      setMessage({
        text: "Degenerate Right-Skewed BST loaded! Search becomes O(n) identical to a Linked List!",
        type: "warning",
      });
    }

    setIsBusy(false);
  };

  const positions = calculatePositions(root, 360, 50, 140);

  const handleSelectNode = (node: PositionedNode) => {
    setSelectedNode({
      id: `tree-node-${node.value}`,
      value: node.value,
      role: node.depth === 0 ? "Root of Tree" : !node.hasLeft && !node.hasRight ? "Leaf Node" : `Internal Node (Level ${node.depth})`,
      extra: {
        Depth: node.depth,
        "Has Left Child": node.hasLeft ? "Yes" : "None",
        "Has Right Child": node.hasRight ? "Yes" : "None",
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Binary Search Tree Visualizer</h1>
                <p className="text-xs text-slate-400">Hierarchical Node Split with O(log n) Search</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SpeedControl speed={speed} setSpeed={setSpeed} disabled={isBusy} />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio active" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
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
            <div className="ds-stat-label">Total Nodes</div>
            <div className="ds-stat-value text-emerald-600">{positions.length} Nodes</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Root Value</div>
            <div className="ds-stat-value text-slate-900">{root ? root.value : "NULL"}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Max Depth</div>
            <div className="ds-stat-value text-indigo-600">
              {positions.length > 0 ? Math.max(...positions.map((p) => p.depth)) : 0}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Search Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-amber-600">
              O(log n) avg / O(n) worst
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
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {message.type === "info" && <Info className="w-5 h-5 text-emerald-500 shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Speed: <strong className="text-emerald-700">{speed}x</strong>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            onClick={() => applyPreset("balanced")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ⚖️ Balanced BST
          </button>
          <button
            onClick={() => applyPreset("skewed")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            📈 Degenerate Skewed Tree
          </button>
          <button
            onClick={() => runTraversal("inorder")}
            disabled={isBusy || !root}
            className="ds-preset-chip"
          >
            ▶️ In-Order (Sorted Sequence)
          </button>
          <button
            onClick={() => runTraversal("preorder")}
            disabled={isBusy || !root}
            className="ds-preset-chip"
          >
            ▶️ Pre-Order Traversal
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
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleInsert()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4" />
                    Insert
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={isBusy || !root}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Search className="w-4 h-4" />
                    Search
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
                    onClick={() => runTraversal("inorder")}
                    disabled={isBusy || !root}
                    className="ds-btn bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                  >
                    <Play className="w-3.5 h-3.5" />
                    In-Order
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isBusy || !root}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Clear Tree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Traversal Output Sequence */}
              {traversalSeq.length > 0 && (
                <div className="py-2.5 px-3 bg-slate-900 rounded-xl my-4 text-xs font-mono text-white flex items-center gap-2 overflow-x-auto">
                  <span className="text-slate-400 font-bold uppercase select-none">Traversal Output:</span>
                  <div className="flex items-center gap-1.5">
                    {traversalSeq.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-600/80 rounded font-bold">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SVG Visual Stage */}
              <div className="ds-stage min-h-[420px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200 z-10">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Click any node in the tree to inspect memory & depth</span>
                </div>

                <svg className="w-[720px] h-[340px] mx-auto overflow-visible select-none">
                  {/* Branch Edges */}
                  {positions.map((node) => (
                    <React.Fragment key={`edge-${node.value}`}>
                      {node.leftX !== undefined && node.leftY !== undefined && (
                        <line
                          x1={node.x}
                          y1={node.y}
                          x2={node.leftX}
                          y2={node.leftY}
                          stroke="#cbd5e1"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      )}
                      {node.rightX !== undefined && node.rightY !== undefined && (
                        <line
                          x1={node.x}
                          y1={node.y}
                          x2={node.rightX}
                          y2={node.rightY}
                          stroke="#cbd5e1"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      )}
                    </React.Fragment>
                  ))}

                  {/* Nodes */}
                  {positions.map((node) => {
                    const isVisiting = visitingNode === node.value;
                    const isFound = foundNode === node.value;
                    const isSelected = selectedNode?.value === node.value;

                    return (
                      <g
                        key={`node-${node.value}`}
                        onClick={() => handleSelectNode(node)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="22"
                          className={`transition-all duration-300 ${
                            isSelected
                              ? "fill-emerald-600 stroke-indigo-500 stroke-[4px]"
                              : isFound
                              ? "fill-emerald-500 stroke-emerald-300 stroke-[4px] animate-pulse"
                              : isVisiting
                              ? "fill-amber-400 stroke-amber-200 stroke-[4px] animate-bounce"
                              : "fill-white stroke-slate-300 stroke-[2.5px] hover:stroke-emerald-400"
                          }`}
                        />
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          className={`text-xs font-mono font-bold select-none ${
                            isSelected || isFound || isVisiting ? "fill-white" : "fill-slate-800"
                          }`}
                        >
                          {node.value}
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
                    actionLabel="Search Target"
                    onAction={() => {
                      setInputValue(selectedNode.value.toString());
                      handleSearch();
                    }}
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
              codeMap={DATA_STRUCTURE_CODES.binaryTree.code[activeTab] || DATA_STRUCTURE_CODES.binaryTree.code.insert}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.binaryTree.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Binary Search Tree"
              challenges={challenges}
            />

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search Average</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search Worst (Skewed)</span>
                  <span className="font-mono font-bold text-rose-600">O(n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insertion</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n) avg</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">In-Order Traversal</span>
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
