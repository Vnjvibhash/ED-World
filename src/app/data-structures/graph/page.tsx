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
  Code2,
  Clock,
  Sparkles,
  Compass,
} from "lucide-react";

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
  { id: "C", label: "C", x: 260, y: 190 },
  { id: "D", label: "D", x: 420, y: 70 },
  { id: "E", label: "E", x: 420, y: 210 },
  { id: "F", label: "F", x: 560, y: 130 },
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

const PSEUDOCODE = {
  bfs: [
    "function BFS(graph, start):",
    "  queue = [start]; visited = {start}",
    "  while queue is not empty:",
    "    u = queue.shift()",
    "    visit(u)",
    "    for neighbor v of u:",
    "      if v not in visited:",
    "        visited.add(v); queue.push(v)",
  ],
  dfs: [
    "function DFS(graph, start):",
    "  stack = [start]; visited = {}",
    "  while stack is not empty:",
    "    u = stack.pop()",
    "    if u not in visited:",
    "      visited.add(u); visit(u)",
    "      for neighbor v of u:",
    "        if v not in visited: stack.push(v)",
  ],
  dijkstra: [
    "function Dijkstra(graph, start):",
    "  dist[v] = Infinity for all v; dist[start] = 0",
    "  unvisited = set(all vertices)",
    "  while unvisited is not empty:",
    "    u = vertex with min dist[u]",
    "    unvisited.remove(u)",
    "    for each neighbor v of u:",
    "      alt = dist[u] + weight(u, v)",
    "      if alt < dist[v]: dist[v] = alt",
  ],
};

export default function GraphVisualizerPage() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [startNode, setStartNode] = useState<string>("A");
  const [activeTab, setActiveTab] = useState<"bfs" | "dfs" | "dijkstra">("bfs");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [visitedOrder, setVisitedOrder] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [activeEdges, setActiveEdges] = useState<string[]>([]);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [viewMode, setViewMode] = useState<"canvas" | "matrix">("canvas");
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Graph initialized with 6 vertices and 9 weighted edges.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Graph initialized: Vertices {A, B, C, D, E, F}",
  ]);
  const [isBusy, setIsBusy] = useState(false);

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Build Adjacency List
  const getAdjacencyList = () => {
    const adj: Record<string, { to: string; weight: number }[]> = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      adj[e.from]?.push({ to: e.to, weight: e.weight });
      adj[e.to]?.push({ to: e.from, weight: e.weight });
    });
    return adj;
  };

  const runBFS = async () => {
    if (isBusy) return;
    setIsBusy(true);
    setActiveTab("bfs");
    setVisitedOrder([]);
    setActiveEdges([]);
    setDistances({});
    setMessage({ text: `Starting BFS traversal from root node ${startNode}...`, type: "info" });
    addLog(`🚀 Started BFS from ${startNode}`);

    const adj = getAdjacencyList();
    const queue = [startNode];
    const visited = new Set<string>([startNode]);
    const order: string[] = [];

    setHighlightLine(1);
    await sleep(400);

    while (queue.length > 0) {
      setHighlightLine(3);
      const u = queue.shift()!;
      setCurrentNode(u);
      order.push(u);
      setVisitedOrder([...order]);
      await sleep(500);

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.to)) {
          setHighlightLine(7);
          visited.add(edge.to);
          queue.push(edge.to);
          setActiveEdges((prev) => [...prev, `${u}-${edge.to}`, `${edge.to}-${u}`]);
          await sleep(350);
        }
      }
    }

    setCurrentNode(null);
    setHighlightLine(null);
    setMessage({ text: `BFS completed! Traversal: [${order.join(" → ")}]`, type: "success" });
    addLog(`✅ BFS visited sequence: [${order.join(" → ")}]`);
    setIsBusy(false);
  };

  const runDFS = async () => {
    if (isBusy) return;
    setIsBusy(true);
    setActiveTab("dfs");
    setVisitedOrder([]);
    setActiveEdges([]);
    setDistances({});
    setMessage({ text: `Starting DFS traversal from node ${startNode}...`, type: "info" });
    addLog(`🚀 Started DFS from ${startNode}`);

    const adj = getAdjacencyList();
    const stack = [startNode];
    const visited = new Set<string>();
    const order: string[] = [];

    setHighlightLine(1);
    await sleep(400);

    while (stack.length > 0) {
      setHighlightLine(3);
      const u = stack.pop()!;
      if (!visited.has(u)) {
        visited.add(u);
        setCurrentNode(u);
        order.push(u);
        setVisitedOrder([...order]);
        await sleep(500);

        const neighbors = adj[u] || [];
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const v = neighbors[i].to;
          if (!visited.has(v)) {
            stack.push(v);
            setActiveEdges((prev) => [...prev, `${u}-${v}`, `${v}-${u}`]);
          }
        }
      }
    }

    setCurrentNode(null);
    setHighlightLine(null);
    setMessage({ text: `DFS completed! Traversal: [${order.join(" → ")}]`, type: "success" });
    addLog(`✅ DFS visited sequence: [${order.join(" → ")}]`);
    setIsBusy(false);
  };

  const runDijkstra = async () => {
    if (isBusy) return;
    setIsBusy(true);
    setActiveTab("dijkstra");
    setVisitedOrder([]);
    setActiveEdges([]);

    const dist: Record<string, number> = {};
    nodes.forEach((n) => (dist[n.id] = Infinity));
    dist[startNode] = 0;
    setDistances({ ...dist });

    setMessage({ text: `Running Dijkstra's algorithm from source ${startNode}...`, type: "info" });
    addLog(`🧭 Running Dijkstra from ${startNode}`);

    const unvisited = new Set(nodes.map((n) => n.id));
    const adj = getAdjacencyList();
    const order: string[] = [];

    while (unvisited.size > 0) {
      // Pick vertex with min dist
      let minNode: string | null = null;
      let minVal = Infinity;
      unvisited.forEach((nodeId) => {
        if (dist[nodeId] < minVal) {
          minVal = dist[nodeId];
          minNode = nodeId;
        }
      });

      if (!minNode || minVal === Infinity) break;

      unvisited.delete(minNode);
      setCurrentNode(minNode);
      order.push(minNode);
      setVisitedOrder([...order]);
      await sleep(550);

      const neighbors = adj[minNode] || [];
      for (const { to, weight } of neighbors) {
        if (unvisited.has(to)) {
          const newDist = dist[minNode] + weight;
          if (newDist < dist[to]) {
            dist[to] = newDist;
            setDistances({ ...dist });
            setActiveEdges((prev) => [...prev, `${minNode}-${to}`, `${to}-${minNode}`]);
            await sleep(400);
          }
        }
      }
    }

    setCurrentNode(null);
    setMessage({ text: "Shortest paths calculated for all reachable vertices!", type: "success" });
    addLog(`✅ Dijkstra complete. Shortest paths computed from ${startNode}.`);
    setIsBusy(false);
  };

  const handleReset = () => {
    if (isBusy) return;
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    setVisitedOrder([]);
    setActiveEdges([]);
    setCurrentNode(null);
    setDistances({});
    setMessage({ text: "Reset graph to standard configuration.", type: "info" });
    addLog("🔄 Graph reset to initial state");
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Graph Visualizer</h1>
                <p className="text-xs text-slate-400">Vertices, Edges & Pathfinding Algorithms</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg hover:text-white transition-colors border border-slate-700"
            >
              Reset Graph
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="ds-container">
        {/* Metric Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Vertices (V)</div>
            <div className="ds-stat-value text-indigo-600">{nodes.length}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Edges (E)</div>
            <div className="ds-stat-value text-slate-900">{edges.length}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Start Vertex</div>
            <div className="ds-stat-value text-slate-900">{startNode}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Time Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-indigo-600">
              O(V + E) BFS/DFS
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
              : "bg-indigo-50 border-indigo-200 text-indigo-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-indigo-500 shrink-0" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Algorithm Execution Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Start:</span>
                  <select
                    value={startNode}
                    onChange={(e) => setStartNode(e.target.value)}
                    disabled={isBusy}
                    className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                  >
                    {nodes.map((n) => (
                      <option key={n.id} value={n.id}>
                        Node {n.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={runBFS}
                    disabled={isBusy}
                    className="ds-btn bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm text-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    BFS
                  </button>
                  <button
                    onClick={runDFS}
                    disabled={isBusy}
                    className="ds-btn bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    DFS
                  </button>
                  <button
                    onClick={runDijkstra}
                    disabled={isBusy}
                    className="ds-btn bg-purple-600 hover:bg-purple-700 text-white shadow-sm text-xs"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Dijkstra
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("canvas")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      viewMode === "canvas" ? "bg-white text-indigo-600 shadow" : "text-slate-500"
                    }`}
                  >
                    Canvas
                  </button>
                  <button
                    onClick={() => setViewMode("matrix")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      viewMode === "matrix" ? "bg-white text-indigo-600 shadow" : "text-slate-500"
                    }`}
                  >
                    Matrix
                  </button>
                </div>
              </div>

              {/* Visited Sequence Stream */}
              {visitedOrder.length > 0 && (
                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 text-xs flex items-center gap-2 overflow-x-auto">
                  <span className="font-bold text-indigo-800 shrink-0">Traversal Sequence:</span>
                  <div className="flex items-center gap-1.5 font-mono">
                    {visitedOrder.map((label, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-2 py-1 rounded shadow-sm border border-indigo-300 text-indigo-900 font-bold"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage: Interactive Canvas or Matrix */}
              <div className="ds-stage min-h-[380px] bg-gradient-to-b from-slate-50 to-slate-100/60 p-4 overflow-x-auto">
                {viewMode === "canvas" ? (
                  <svg className="w-full h-[320px] min-w-[650px]">
                    {/* Render Weighted Edges */}
                    {edges.map((e, idx) => {
                      const fromNode = nodes.find((n) => n.id === e.from);
                      const toNode = nodes.find((n) => n.id === e.to);
                      if (!fromNode || !toNode) return null;

                      const isEdgeActive =
                        activeEdges.includes(`${e.from}-${e.to}`) ||
                        activeEdges.includes(`${e.to}-${e.from}`);
                      const midX = (fromNode.x + toNode.x) / 2;
                      const midY = (fromNode.y + toNode.y) / 2;

                      return (
                        <g key={idx}>
                          <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            className={`transition-all duration-300 ${
                              isEdgeActive
                                ? "stroke-indigo-500 stroke-[3.5px]"
                                : "stroke-slate-300 stroke-2"
                            }`}
                          />
                          {/* Edge Weight Pill */}
                          <rect
                            x={midX - 10}
                            y={midY - 8}
                            width="20"
                            height="16"
                            rx="4"
                            className="fill-white stroke-slate-300 stroke-[1px]"
                          />
                          <text
                            x={midX}
                            y={midY + 4}
                            textAnchor="middle"
                            className="text-[10px] font-mono font-bold fill-slate-600 select-none"
                          >
                            {e.weight}
                          </text>
                        </g>
                      );
                    })}

                    {/* Render Vertices */}
                    {nodes.map((n) => {
                      const isCurrent = currentNode === n.id;
                      const isVisited = visitedOrder.includes(n.id);
                      const dist = distances[n.id];

                      return (
                        <g key={n.id} className="cursor-pointer">
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="22"
                            className={`transition-all duration-300 ${
                              isCurrent
                                ? "fill-amber-500 stroke-amber-300 stroke-[6px]"
                                : isVisited
                                ? "fill-indigo-600 stroke-indigo-300 stroke-4"
                                : "fill-white stroke-slate-400 stroke-2"
                            }`}
                          />
                          <text
                            x={n.x}
                            y={n.y + 5}
                            textAnchor="middle"
                            className={`font-mono font-bold text-sm select-none ${
                              isCurrent || isVisited ? "fill-white font-extrabold" : "fill-slate-800"
                            }`}
                          >
                            {n.label}
                          </text>

                          {/* Shortest Distance Label for Dijkstra */}
                          {dist !== undefined && dist !== Infinity && (
                            <text
                              x={n.x}
                              y={n.y + 36}
                              textAnchor="middle"
                              className="text-[10px] font-mono font-bold fill-purple-700"
                            >
                              d={dist}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  // Adjacency Matrix View
                  <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 mb-3 text-center uppercase tracking-wider">
                      Adjacency Matrix (Weights)
                    </h4>
                    <table className="w-full text-center text-xs font-mono">
                      <thead>
                        <tr>
                          <th className="p-1 text-slate-400"></th>
                          {nodes.map((n) => (
                            <th key={n.id} className="p-1 font-bold text-indigo-600">
                              {n.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {nodes.map((row) => (
                          <tr key={row.id} className="border-t border-slate-100">
                            <td className="p-1 font-bold text-indigo-600">{row.label}</td>
                            {nodes.map((col) => {
                              const edge = edges.find(
                                (e) =>
                                  (e.from === row.id && e.to === col.id) ||
                                  (e.to === row.id && e.from === col.id)
                              );
                              return (
                                <td
                                  key={col.id}
                                  className={`p-1.5 ${
                                    edge ? "font-bold text-slate-900 bg-indigo-50/50" : "text-slate-300"
                                  }`}
                                >
                                  {edge ? edge.weight : "0"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
                  {(["bfs", "dfs", "dijkstra"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2 py-1 font-semibold rounded uppercase transition-all ${
                        activeTab === tab
                          ? "bg-white text-indigo-600 shadow-sm"
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
                        ? "bg-indigo-600/40 text-indigo-200 font-bold border-l-2 border-indigo-400"
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
                <Info className="w-4 h-4 text-indigo-500" />
                Algorithm Complexities
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">BFS (Queue)</span>
                  <span className="font-mono font-bold text-emerald-600">O(V + E)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">DFS (Stack/Recursion)</span>
                  <span className="font-mono font-bold text-emerald-600">O(V + E)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Dijkstra (with Min-Heap)</span>
                  <span className="font-mono font-bold text-indigo-600">O((V + E) log V)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Space Complexity</span>
                  <span className="font-mono font-bold text-slate-900">O(V)</span>
                </div>
              </div>
            </div>

            <div className="ds-card">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Real-World Applications</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>GPS Navigation & Google Maps shortest path routing</li>
                <li>Social networks friend recommendation graphs</li>
                <li>Web crawlers & Google PageRank indexers</li>
                <li>Internet packet routing protocols (OSPF, BGP)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
