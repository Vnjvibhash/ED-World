"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
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
  Play,
} from "lucide-react";

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
}

const PSEUDOCODE = {
  insert: [
    "function insert(root, val):",
    "  if root is null: return new Node(val)",
    "  if val < root.val:",
    "    root.left = insert(root.left, val)",
    "  else if val > root.val:",
    "    root.right = insert(root.right, val)",
    "  return root",
  ],
  search: [
    "function search(root, target):",
    "  if root is null or root.val == target:",
    "    return root",
    "  if target < root.val:",
    "    return search(root.left, target)",
    "  return search(root.right, target)",
  ],
  inorder: [
    "function inorder(root):",
    "  if root is null: return",
    "  inorder(root.left)",
    "  visit(root.val)  // yields sorted sequence",
    "  inorder(root.right)",
  ],
  preorder: [
    "function preorder(root):",
    "  if root is null: return",
    "  visit(root.val)  // root first",
    "  preorder(root.left)",
    "  preorder(root.right)",
  ],
};

function insertNode(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { value: val, left: null, right: null };
  if (val < root.value) {
    root.left = insertNode(root.left, val);
  } else if (val > root.value) {
    root.right = insertNode(root.right, val);
  }
  return root;
}

function deleteNode(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  if (val < root.value) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.value) {
    root.right = deleteNode(root.right, val);
  } else {
    // Node with only one child or no child
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    // Node with two children: Get the inorder successor
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.value = succ.value;
    root.right = deleteNode(root.right, succ.value);
  }
  return root;
}

function getTreeHeight(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
}

function getNodeCount(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + getNodeCount(root.left) + getNodeCount(root.right);
}

// Initial demo tree: 50 -> 30, 70 -> 20, 40, 60, 80
function createInitialTree(): TreeNode {
  let root: TreeNode | null = null;
  [50, 30, 70, 20, 40, 60, 80].forEach((v) => {
    root = insertNode(root, v);
  });
  return root!;
}

export default function BSTVisualizerPage() {
  const [root, setRoot] = useState<TreeNode | null>(() => createInitialTree());
  const [inputValue, setInputValue] = useState<string>("25");
  const [activeTab, setActiveTab] = useState<"insert" | "search" | "inorder" | "preorder">("insert");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [visitedSequence, setVisitedSequence] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Binary Search Tree loaded. Left < Root < Right hierarchy.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized BST with [50, 30, 70, 20, 40, 60, 80]",
  ]);
  const [isBusy, setIsBusy] = useState(false);

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Compute 2D node coordinates for SVG rendering
  const positionedNodes: PositionedNode[] = [];
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  function layoutTree(node: TreeNode | null, depth = 0, minX = 0, maxX = 700) {
    if (!node) return null;
    const x = (minX + maxX) / 2;
    const y = depth * 65 + 40;

    const left = layoutTree(node.left, depth + 1, minX, x);
    const right = layoutTree(node.right, depth + 1, x, maxX);

    if (left) {
      lines.push({ x1: x, y1: y, x2: left.x, y2: left.y });
    }
    if (right) {
      lines.push({ x1: x, y1: y, x2: right.x, y2: right.y });
    }

    const pos: PositionedNode = {
      value: node.value,
      x,
      y,
      leftX: left ? left.x : undefined,
      leftY: left ? left.y : undefined,
      rightX: right ? right.x : undefined,
      rightY: right ? right.y : undefined,
    };
    positionedNodes.push(pos);
    return pos;
  }

  if (root) {
    layoutTree(root);
  }

  const handleInsert = async () => {
    if (isBusy) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    if (getNodeCount(root) >= 15) {
      setMessage({ text: "Max 15 nodes allowed for clear visual clarity.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);

    // Animate traversal path
    let curr = root;
    const path: number[] = [];
    while (curr) {
      path.push(curr.value);
      setHighlightedNodes([...path]);
      await sleep(400);
      if (val < curr.value) {
        setHighlightLine(3);
        curr = curr.left;
      } else if (val > curr.value) {
        setHighlightLine(5);
        curr = curr.right;
      } else {
        setMessage({ text: `Value ${val} already exists in BST (no duplicates).`, type: "warning" });
        setIsBusy(false);
        setHighlightedNodes([]);
        return;
      }
    }

    const newRoot = insertNode(JSON.parse(JSON.stringify(root)), val);
    setRoot(newRoot);
    setHighlightedNodes([val]);
    setMessage({ text: `Successfully inserted ${val} into BST.`, type: "success" });
    addLog(`➕ Inserted ${val} in BST`);

    await sleep(700);
    setHighlightedNodes([]);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleDelete = () => {
    if (isBusy || !root) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    const newRoot = deleteNode(JSON.parse(JSON.stringify(root)), val);
    setRoot(newRoot);
    setMessage({ text: `Deleted node ${val} from BST.`, type: "info" });
    addLog(`➖ Deleted ${val} from BST`);
  };

  const handleSearch = async () => {
    if (isBusy || !root) return;
    const target = parseInt(inputValue);
    if (isNaN(target)) return;

    setIsBusy(true);
    setActiveTab("search");
    setMessage({ text: `Searching for node ${target} from root...`, type: "info" });
    addLog(`🔍 Searching for ${target}`);

    let curr: TreeNode | null = root;
    const path: number[] = [];
    let found = false;

    while (curr) {
      path.push(curr.value);
      setHighlightedNodes([...path]);
      await sleep(500);

      if (curr.value === target) {
        setHighlightLine(2);
        found = true;
        setMessage({ text: `Target ${target} located! Path: [${path.join(" → ")}]`, type: "success" });
        addLog(`✅ Target ${target} found along path`);
        break;
      } else if (target < curr.value) {
        setHighlightLine(4);
        curr = curr.left;
      } else {
        setHighlightLine(5);
        curr = curr.right;
      }
    }

    if (!found) {
      setMessage({ text: `Node ${target} not found in this BST.`, type: "error" });
      addLog(`❌ Node ${target} not found`);
    }

    await sleep(1000);
    setHighlightedNodes([]);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const runTraversal = async (type: "inorder" | "preorder" | "postorder" | "levelorder") => {
    if (isBusy || !root) return;
    setIsBusy(true);
    const order: number[] = [];

    function traverseInorder(node: TreeNode | null) {
      if (!node) return;
      traverseInorder(node.left);
      order.push(node.value);
      traverseInorder(node.right);
    }

    function traversePreorder(node: TreeNode | null) {
      if (!node) return;
      order.push(node.value);
      traversePreorder(node.left);
      traversePreorder(node.right);
    }

    function traversePostorder(node: TreeNode | null) {
      if (!node) return;
      traversePostorder(node.left);
      traversePostorder(node.right);
      order.push(node.value);
    }

    function traverseLevelOrder(r: TreeNode) {
      const q: TreeNode[] = [r];
      while (q.length > 0) {
        const n = q.shift()!;
        order.push(n.value);
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
    }

    if (type === "inorder") {
      setActiveTab("inorder");
      traverseInorder(root);
    } else if (type === "preorder") {
      setActiveTab("preorder");
      traversePreorder(root);
    } else if (type === "postorder") {
      traversePostorder(root);
    } else {
      traverseLevelOrder(root);
    }

    setVisitedSequence([]);
    setMessage({ text: `Running ${type.toUpperCase()} traversal...`, type: "info" });
    addLog(`🔄 Executing ${type} traversal`);

    for (let i = 0; i < order.length; i++) {
      setHighlightedNodes([order[i]]);
      setVisitedSequence(order.slice(0, i + 1));
      await sleep(450);
    }

    setMessage({ text: `${type.toUpperCase()} traversal complete: [${order.join(", ")}]`, type: "success" });
    addLog(`✅ Traversal completed: [${order.join(", ")}]`);
    await sleep(800);
    setHighlightedNodes([]);
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setRoot(null);
    setVisitedSequence([]);
    setMessage({ text: "Tree cleared.", type: "info" });
    addLog("🗑 Cleared the entire tree");
  };

  const handleReset = () => {
    if (isBusy) return;
    setRoot(createInitialTree());
    setVisitedSequence([]);
    setMessage({ text: "Restored initial balanced BST.", type: "info" });
    addLog("🔄 Reset tree to default nodes");
  };

  const treeHeight = getTreeHeight(root);
  const nodeCount = getNodeCount(root);

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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Binary Search Tree (BST)</h1>
                <p className="text-xs text-slate-400">Hierarchical Tree Structure</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg hover:text-white transition-colors border border-slate-700"
            >
              Reset Tree
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ds-container">
        {/* Metric Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Node Count</div>
            <div className="ds-stat-value text-amber-600">{nodeCount}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Tree Height</div>
            <div className="ds-stat-value text-slate-900">{treeHeight}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Root Value</div>
            <div className="ds-stat-value text-slate-900">
              {root ? root.value : "null"}
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Search Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-orange-600">
              O(log n) avg, O(n) worst
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
              : "bg-amber-50/70 border-amber-200 text-amber-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-amber-500 shrink-0" />}
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
                    className="w-20 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleInsert}
                    disabled={isBusy}
                    className="ds-btn bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
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
                    onClick={handleDelete}
                    disabled={isBusy || !root}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                  >
                    <Minus className="w-4 h-4" />
                    Delete
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    disabled={isBusy || !root}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Traversal Controls */}
              <div className="flex flex-wrap items-center gap-2 py-3 px-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">Traversals:</span>
                <button
                  onClick={() => runTraversal("inorder")}
                  disabled={isBusy || !root}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold hover:bg-amber-50 hover:border-amber-300 text-slate-700"
                >
                  Inorder (Sorted)
                </button>
                <button
                  onClick={() => runTraversal("preorder")}
                  disabled={isBusy || !root}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold hover:bg-amber-50 hover:border-amber-300 text-slate-700"
                >
                  Preorder
                </button>
                <button
                  onClick={() => runTraversal("postorder")}
                  disabled={isBusy || !root}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold hover:bg-amber-50 hover:border-amber-300 text-slate-700"
                >
                  Postorder
                </button>
                <button
                  onClick={() => runTraversal("levelorder")}
                  disabled={isBusy || !root}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold hover:bg-amber-50 hover:border-amber-300 text-slate-700"
                >
                  Level-Order (BFS)
                </button>
              </div>

              {/* Traversal Output Sequence */}
              {visitedSequence.length > 0 && (
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs flex items-center gap-2 overflow-x-auto">
                  <span className="font-bold text-amber-800 shrink-0">Visited Sequence:</span>
                  <div className="flex items-center gap-1.5 font-mono">
                    {visitedSequence.map((val, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-2 py-1 rounded shadow-sm border border-amber-300 text-amber-900 font-bold"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SVG Tree Stage */}
              <div className="ds-stage min-h-[380px] bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                {!root ? (
                  <div className="text-center py-16 text-slate-400">
                    <GitBranch className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">Tree is empty. Click Insert to add root node.</p>
                  </div>
                ) : (
                  <svg className="w-full h-[320px] min-w-[650px]">
                    {/* Connecting Edges */}
                    {lines.map((l, i) => (
                      <line
                        key={i}
                        x1={l.x1}
                        y1={l.y1}
                        x2={l.x2}
                        y2={l.y2}
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ))}

                    {/* Nodes */}
                    {positionedNodes.map((n) => {
                      const isHighlighted = highlightedNodes.includes(n.value);
                      return (
                        <g key={n.value} className="cursor-pointer transition-all">
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="22"
                            className={`transition-all duration-300 ${
                              isHighlighted
                                ? "fill-amber-500 stroke-amber-300 stroke-[5px]"
                                : "fill-gradient-to-b fill-white stroke-slate-400 stroke-2"
                            }`}
                          />
                          <text
                            x={n.x}
                            y={n.y + 5}
                            textAnchor="middle"
                            className={`font-mono font-bold text-xs select-none transition-all ${
                              isHighlighted ? "fill-white font-extrabold text-sm" : "fill-slate-800"
                            }`}
                          >
                            {n.value}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>
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
            <div className="ds-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
                  {(["insert", "search", "inorder", "preorder"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2 py-1 font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-amber-600 shadow-sm"
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
                        ? "bg-amber-600/40 text-amber-200 font-bold border-l-2 border-amber-400"
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
                <Info className="w-4 h-4 text-orange-500" />
                BST Properties & Rules
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search / Insert (Avg)</span>
                  <span className="font-mono font-bold text-emerald-600">O(log n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search / Insert (Worst)</span>
                  <span className="font-mono font-bold text-rose-600">O(n) skewed</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Inorder Traversal</span>
                  <span className="font-mono font-bold text-indigo-600">Ascending Order</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Space Complexity</span>
                  <span className="font-mono font-bold text-slate-900">O(n)</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Applications</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Database index structures (B-Trees / Red-Black Trees)</li>
                <li>Syntax parsing trees in compilers and Linters</li>
                <li>Autocomplete dictionary search tries & prefix trees</li>
                <li>3D graphics spatial partitioning (BSP Trees)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
