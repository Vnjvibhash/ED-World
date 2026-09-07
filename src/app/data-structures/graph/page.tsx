"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Network,
  ArrowLeft,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Compass,
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

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

const INITIAL_NODES: Node[] = [
  { id: "A", label: "A", x: 100, y: 80 },
  { id: "B", label: "B", x: 260, y: 50 },
  { id: "C", label: "C", x: 260, y: 210 },
  { id: "D", label: "D", x: 420, y: 70 },
  { id: "E", label: "E", x: 420, y: 220 },
  { id: "F", label: "F", x: 570, y: 140 },
];

const INITIAL_EDGES: Edge[] = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 8 },
  { from: "C", to: "D", weight: 8 },
  { from: "D", to: "E", weight: 2 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "F", weight: 3 },
];

export default function GraphVisualizerPage() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [startNode, setStartNode] = useState<string>("A");
  const [activeTab, setActiveTab] = useState<string>("bfs");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeEdges, setActiveEdges] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Graph loaded with 6 vertices and 9 weighted edges. Ready for graph traversals.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Graph initialized with nodes [A, B, C, D, E, F]",
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    value: string;
    role: string;
    extra?: Record<string, string | number>;
  } | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "bfs", title: "Run Breadth-First Search (BFS) level by level", completed: false },
    { id: "dfs", title: "Run Depth-First Search (DFS) exploring deep paths", completed: false },
    { id: "start", title: "Select a different Start Node (e.g. C or D)", completed: false },
    { id: "inspect", title: "Click any vertex to inspect degree, adjacency, and memory", completed: false },
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

  const getNeighbors = (id: string) => {
    const list: string[] = [];
    edges.forEach((e) => {
      if (e.from === id && !list.includes(e.to)) list.push(e.to);
      if (e.to === id && !list.includes(e.from)) list.push(e.from);
    });
    return list;
  };

  const runBFS = async () => {
    if (isBusy) return;
    setIsBusy(true);
    setActiveTab("bfs");
    setVisitedNodes([]);
    setActiveEdges([]);
    setMessage({ text: `Running Breadth-First Search (BFS) starting from vertex ${startNode}...`, type: "info" });
    addLog(`🌐 BFS started from node ${startNode}`);

    const queue: string[] = [startNode];
    const visited = new Set<string>([startNode]);
    const order: string[] = [];

    while (queue.length > 0) {
      const u = queue.shift()!;
      setActiveNode(u);
      setHighlightLine(4);
      playTone(480 + order.length * 40);
      order.push(u);
      setVisitedNodes([...order]);
      await sleep(550);

      const neighbors = getNeighbors(u);
      for (const v of neighbors) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
          setActiveEdges((prev) => [...prev, `${u}-${v}`, `${v}-${u}`]);
          playTone(600);
          await sleep(350);
        }
      }
    }

    setActiveNode(null);
    setHighlightLine(null);
    setMessage({ text: `BFS Complete! Visited order: [${order.join(" → ")}].`, type: "success" });
    addLog(`✅ BFS Order: ${order.join(" → ")}`);
    markChallenge("bfs");
    setIsBusy(false);
  };

  const runDFS = async () => {
    if (isBusy) return;
    setIsBusy(true);
    setActiveTab("dfs");
    setVisitedNodes([]);
    setActiveEdges([]);
    setMessage({ text: `Running Depth-First Search (DFS) starting from vertex ${startNode}...`, type: "info" });
    addLog(`🌐 DFS started from node ${startNode}`);

    const visited = new Set<string>();
    const order: string[] = [];

    const dfsHelper = async (u: string) => {
      visited.add(u);
      setActiveNode(u);
      setHighlightLine(4);
      playTone(450 + order.length * 45);
      order.push(u);
      setVisitedNodes([...order]);
      await sleep(550);

      const neighbors = getNeighbors(u);
      for (const v of neighbors) {
        if (!visited.has(v)) {
          setActiveEdges((prev) => [...prev, `${u}-${v}`, `${v}-${u}`]);
          playTone(620);
          await sleep(350);
          await dfsHelper(v);
        }
      }
    };

    await dfsHelper(startNode);
    setActiveNode(null);
    setHighlightLine(null);
    setMessage({ text: `DFS Complete! Visited order: [${order.join(" → ")}].`, type: "success" });
    addLog(`✅ DFS Order: ${order.join(" → ")}`);
    markChallenge("dfs");
    setIsBusy(false);
  };

  const handleReset = () => {
    if (isBusy) return;
    setVisitedNodes([]);
    setActiveEdges([]);
    setActiveNode(null);
    setSelectedNode(null);
    setMessage({ text: "Graph traversal state reset.", type: "info" });
    addLog("🔄 Reset graph traversal state");
    playTone(300);
  };

  // Presets
  const applyPreset = async (preset: string) => {
    if (isBusy) return;
    setVisitedNodes([]);
    setActiveEdges([]);

    if (preset === "standard") {
      setNodes(INITIAL_NODES);
      setEdges(INITIAL_EDGES);
      setMessage({ text: "Standard weighted graph loaded.", type: "info" });
      addLog("🌐 Loaded Standard 6-Node Graph");
    } else if (preset === "cycle") {
      setNodes(INITIAL_NODES);
      setEdges([
        { from: "A", to: "B", weight: 3 },
        { from: "B", to: "C", weight: 2 },
        { from: "C", to: "A", weight: 4 },
        { from: "C", to: "D", weight: 5 },
        { from: "D", to: "E", weight: 1 },
      ]);
      setMessage({ text: "Cycle graph loaded: A - B - C form a 3-vertex closed loop cycle.", type: "warning" });
      addLog("➰ Loaded Cycle Detection Graph");
    }
  };

  const handleSelectNode = (n: Node) => {
    const neighbors = getNeighbors(n.id);
    setSelectedNode({
      id: n.id,
      value: n.label,
      role: n.id === startNode ? "Active Start Vertex" : "Graph Vertex",
      extra: {
        Degree: neighbors.length,
        "Connected Neighbors": neighbors.join(", ") || "None",
        Coordinates: `(${n.x}, ${n.y})`,
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Graph Visualizer</h1>
                <p className="text-xs text-slate-400">Vertices, Weighted Edges & Traversal Algorithms</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SpeedControl speed={speed} setSpeed={setSpeed} disabled={isBusy} />
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                soundEnabled
                  ? "bg-pink-500/20 border-pink-500/40 text-pink-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Audio active" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/30">
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
            <div className="ds-stat-label">Vertices (V)</div>
            <div className="ds-stat-value text-pink-600">{nodes.length} Vertices</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Edges (E)</div>
            <div className="ds-stat-value text-slate-900">{edges.length} Edges</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Start Vertex</div>
            <div className="ds-stat-value text-indigo-600 font-mono font-bold">{startNode}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-emerald-600">O(V + E) BFS/DFS</div>
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
              : "bg-pink-50 border-pink-200 text-pink-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {message.type === "info" && <Info className="w-5 h-5 text-pink-500 shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            Animation Speed: <strong className="text-pink-700">{speed}x</strong>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            onClick={() => applyPreset("standard")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            🌐 Standard 6-Node Graph
          </button>
          <button
            onClick={() => applyPreset("cycle")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ➰ Cycle Topology (A-B-C)
          </button>
          <button
            onClick={runBFS}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ▶️ Run BFS from {startNode}
          </button>
          <button
            onClick={runDFS}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ▶️ Run DFS from {startNode}
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Start Vertex:</span>
                  <select
                    value={startNode}
                    onChange={(e) => {
                      setStartNode(e.target.value);
                      markChallenge("start");
                    }}
                    disabled={isBusy}
                    className="px-2.5 py-1.5 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {nodes.map((n) => (
                      <option key={n.id} value={n.id}>
                        Vertex {n.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={runBFS}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-pink-600 hover:bg-pink-700"
                  >
                    <Play className="w-3.5 h-3.5" />
                    BFS Traversal
                  </button>
                  <button
                    onClick={runDFS}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Play className="w-3.5 h-3.5" />
                    DFS Traversal
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    disabled={isBusy}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Reset Traversal"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visited Sequence Output */}
              {visitedNodes.length > 0 && (
                <div className="py-2.5 px-3 bg-slate-900 rounded-xl my-4 text-xs font-mono text-white flex items-center gap-2 overflow-x-auto">
                  <span className="text-slate-400 font-bold uppercase select-none">Visited Sequence:</span>
                  <div className="flex items-center gap-1.5">
                    {visitedNodes.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 bg-pink-600/80 rounded font-bold">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Canvas Stage */}
              <div className="ds-stage min-h-[380px] flex-col justify-center relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                <div className="absolute top-3 left-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200 z-10">
                  <Info className="w-3.5 h-3.5 text-pink-500" />
                  <span>Click any vertex to inspect degree, adjacency list & memory</span>
                </div>

                <svg className="w-[680px] h-[300px] mx-auto select-none overflow-visible">
                  {/* Edges */}
                  {edges.map((e, idx) => {
                    const fromN = nodes.find((n) => n.id === e.from);
                    const toN = nodes.find((n) => n.id === e.to);
                    if (!fromN || !toN) return null;

                    const isEdgeActive =
                      activeEdges.includes(`${e.from}-${e.to}`) ||
                      activeEdges.includes(`${e.to}-${e.from}`);

                    const midX = (fromN.x + toN.x) / 2;
                    const midY = (fromN.y + toN.y) / 2;

                    return (
                      <g key={`edge-${idx}`}>
                        <line
                          x1={fromN.x}
                          y1={fromN.y}
                          x2={toN.x}
                          y2={toN.y}
                          className={`transition-all duration-300 ${
                            isEdgeActive ? "stroke-pink-500 stroke-[3.5px]" : "stroke-slate-300 stroke-[2px]"
                          }`}
                        />
                        <rect
                          x={midX - 10}
                          y={midY - 9}
                          width="20"
                          height="18"
                          rx="4"
                          className="fill-white stroke-slate-200 stroke-1"
                        />
                        <text
                          x={midX}
                          y={midY + 4}
                          textAnchor="middle"
                          className="text-[10px] font-bold font-mono fill-slate-500"
                        >
                          {e.weight}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertices */}
                  {nodes.map((n) => {
                    const isStart = n.id === startNode;
                    const isActive = activeNode === n.id;
                    const isVisited = visitedNodes.includes(n.id);
                    const isSelected = selectedNode?.id === n.id;

                    return (
                      <g
                        key={n.id}
                        onClick={() => handleSelectNode(n)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r="22"
                          className={`transition-all duration-300 ${
                            isSelected
                              ? "fill-pink-600 stroke-indigo-500 stroke-[4px]"
                              : isActive
                              ? "fill-amber-400 stroke-amber-200 stroke-[4px] animate-bounce"
                              : isVisited
                              ? "fill-pink-500 stroke-pink-300 stroke-[3px]"
                              : isStart
                              ? "fill-indigo-600 stroke-indigo-300 stroke-[3px]"
                              : "fill-white stroke-slate-300 stroke-[2.5px] hover:stroke-pink-400"
                          }`}
                        />
                        <text
                          x={n.x}
                          y={n.y + 5}
                          textAnchor="middle"
                          className={`text-xs font-mono font-bold select-none ${
                            isSelected || isActive || isVisited || isStart ? "fill-white" : "fill-slate-800"
                          }`}
                        >
                          {n.label}
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
                    actionLabel="Set as Start Vertex"
                    onAction={() => {
                      setStartNode(selectedNode.id);
                      markChallenge("start");
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
              codeMap={DATA_STRUCTURE_CODES.graph.code[activeTab] || DATA_STRUCTURE_CODES.graph.code.bfs}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.graph.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Graph Traversals"
              challenges={challenges}
            />

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Complexity Specs
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">BFS Traversal</span>
                  <span className="font-mono font-bold text-emerald-600">O(V + E)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">DFS Traversal</span>
                  <span className="font-mono font-bold text-emerald-600">O(V + E)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Space (Adjacency Matrix)</span>
                  <span className="font-mono font-bold text-rose-600">O(V²)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Space (Adjacency List)</span>
                  <span className="font-mono font-bold text-emerald-600">O(V + E)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
