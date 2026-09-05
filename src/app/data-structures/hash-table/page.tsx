"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Hash,
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
  ArrowRight,
  Database,
} from "lucide-react";

type CollisionStrategy = "chaining" | "linear" | "quadratic";

interface HashEntry {
  key: string;
  value: string;
}

interface Bucket {
  index: number;
  entries: HashEntry[];
}

const PSEUDOCODE = {
  insert: [
    "function put(key, value):",
    "  idx = hash(key) % capacity",
    "  if strategy == 'chaining':",
    "    bucket[idx].append((key, value))",
    "  else if strategy == 'linear':",
    "    while table[idx] is occupied:",
    "      idx = (idx + 1) % capacity // probe",
    "    table[idx] = (key, value)",
  ],
  search: [
    "function get(key):",
    "  idx = hash(key) % capacity",
    "  if strategy == 'chaining':",
    "    for entry in bucket[idx]:",
    "      if entry.key == key: return entry.val",
    "  else:",
    "    while table[idx] is not null:",
    "      if table[idx].key == key: return val",
    "      idx = (idx + 1) % capacity",
    "  return null // not found",
  ],
};

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export default function HashTableVisualizerPage() {
  const [capacity, setCapacity] = useState<number>(8);
  const [strategy, setStrategy] = useState<CollisionStrategy>("chaining");
  const [buckets, setBuckets] = useState<Bucket[]>(() => {
    const init = Array.from({ length: 8 }, (_, i) => ({ index: i, entries: [] as HashEntry[] }));
    init[1].entries.push({ key: "alpha", value: "101" });
    init[3].entries.push({ key: "beta", value: "202" });
    init[3].entries.push({ key: "omega", value: "303" }); // collision on idx 3 for chaining
    init[6].entries.push({ key: "gamma", value: "404" });
    return init;
  });

  const [keyInput, setKeyInput] = useState<string>("delta");
  const [valInput, setValInput] = useState<string>("505");
  const [activeTab, setActiveTab] = useState<"insert" | "search">("insert");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [activeBucketIdx, setActiveBucketIdx] = useState<number | null>(null);
  const [hashComputation, setHashComputation] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Hash Table initialized. Array of buckets with key-value hashing.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized hash table with capacity 8",
  ]);
  const [isBusy, setIsBusy] = useState(false);

  const addLog = (log: string) => {
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Count total stored items
  const totalItems = buckets.reduce((sum, b) => sum + b.entries.length, 0);
  const loadFactor = (totalItems / capacity).toFixed(2);

  const handleInsert = async () => {
    if (isBusy) return;
    const key = keyInput.trim();
    const val = valInput.trim();
    if (!key || !val) {
      setMessage({ text: "Please provide both Key and Value.", type: "error" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);

    const rawHash = simpleHash(key);
    const targetIdx = rawHash % capacity;
    setHashComputation(`hash("${key}") = ${rawHash} -> index = ${rawHash} % ${capacity} = ${targetIdx}`);
    setActiveBucketIdx(targetIdx);
    await sleep(550);

    const newBuckets = JSON.parse(JSON.stringify(buckets)) as Bucket[];

    if (strategy === "chaining") {
      setHighlightLine(3);
      const existing = newBuckets[targetIdx].entries.find((e) => e.key === key);
      if (existing) {
        existing.value = val;
        setMessage({ text: `Updated key "${key}" with new value "${val}".`, type: "info" });
        addLog(`🔄 Updated key "${key}" = ${val}`);
      } else {
        newBuckets[targetIdx].entries.push({ key, value: val });
        setMessage({ text: `Inserted ("${key}", "${val}") into bucket ${targetIdx}.`, type: "success" });
        addLog(`➕ Inserted "${key}" into Bucket [${targetIdx}]`);
      }
      setBuckets(newBuckets);
    } else {
      // Open Addressing (Linear Probing)
      setHighlightLine(5);
      let probeIdx = targetIdx;
      let inserted = false;
      let attempts = 0;

      while (attempts < capacity) {
        setActiveBucketIdx(probeIdx);
        await sleep(350);

        if (newBuckets[probeIdx].entries.length === 0 || newBuckets[probeIdx].entries[0].key === key) {
          newBuckets[probeIdx].entries = [{ key, value: val }];
          inserted = true;
          setMessage({
            text: `Placed ("${key}", "${val}") at slot ${probeIdx} (${attempts} collisions resolved).`,
            type: "success",
          });
          addLog(`➕ Placed "${key}" at slot ${probeIdx} (probed ${attempts} times)`);
          break;
        }
        probeIdx = (probeIdx + (strategy === "linear" ? 1 : (attempts + 1) * (attempts + 1))) % capacity;
        attempts++;
      }

      if (!inserted) {
        setMessage({ text: "Hash Table is completely full! Cannot insert.", type: "error" });
        addLog("❌ Hash table full: insertion failed");
      } else {
        setBuckets(newBuckets);
      }
    }

    await sleep(600);
    setActiveBucketIdx(null);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleSearch = async () => {
    if (isBusy) return;
    const key = keyInput.trim();
    if (!key) return;

    setIsBusy(true);
    setActiveTab("search");
    setHighlightLine(1);

    const rawHash = simpleHash(key);
    const targetIdx = rawHash % capacity;
    setHashComputation(`hash("${key}") = ${rawHash} -> search at index ${targetIdx}`);
    setActiveBucketIdx(targetIdx);
    await sleep(550);

    let foundVal: string | null = null;

    if (strategy === "chaining") {
      setHighlightLine(3);
      const match = buckets[targetIdx].entries.find((e) => e.key === key);
      if (match) foundVal = match.value;
    } else {
      setHighlightLine(5);
      let probeIdx = targetIdx;
      let attempts = 0;
      while (attempts < capacity) {
        setActiveBucketIdx(probeIdx);
        await sleep(350);
        if (buckets[probeIdx].entries.length === 0) break;
        if (buckets[probeIdx].entries[0].key === key) {
          foundVal = buckets[probeIdx].entries[0].value;
          break;
        }
        probeIdx = (probeIdx + 1) % capacity;
        attempts++;
      }
    }

    if (foundVal !== null) {
      setMessage({ text: `Key "${key}" found with value: "${foundVal}"!`, type: "success" });
      addLog(`✅ Found "${key}" -> "${foundVal}"`);
    } else {
      setMessage({ text: `Key "${key}" does not exist in hash table.`, type: "error" });
      addLog(`❌ Key "${key}" not found`);
    }

    await sleep(700);
    setActiveBucketIdx(null);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleDelete = () => {
    if (isBusy) return;
    const key = keyInput.trim();
    if (!key) return;

    const rawHash = simpleHash(key);
    const targetIdx = rawHash % capacity;
    const newBuckets = JSON.parse(JSON.stringify(buckets)) as Bucket[];

    if (strategy === "chaining") {
      newBuckets[targetIdx].entries = newBuckets[targetIdx].entries.filter((e) => e.key !== key);
    } else {
      for (let i = 0; i < capacity; i++) {
        if (newBuckets[i].entries.length > 0 && newBuckets[i].entries[0].key === key) {
          newBuckets[i].entries = [];
          break;
        }
      }
    }

    setBuckets(newBuckets);
    setMessage({ text: `Deleted key "${key}" from hash table.`, type: "info" });
    addLog(`➖ Deleted key "${key}"`);
  };

  const handleRandom = () => {
    const words = ["star", "moon", "sun", "cloud", "comet", "orbit", "planet", "galaxy"];
    const randKey = words[Math.floor(Math.random() * words.length)];
    const randVal = Math.floor(Math.random() * 900 + 100).toString();
    setKeyInput(randKey);
    setValInput(randVal);
  };

  const handleClear = () => {
    if (isBusy) return;
    setBuckets(Array.from({ length: capacity }, (_, i) => ({ index: i, entries: [] })));
    setHashComputation(null);
    setMessage({ text: "Hash table cleared.", type: "info" });
    addLog("🗑 Cleared all entries");
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-600 to-slate-800 flex items-center justify-center text-white shadow-md shadow-slate-700/30">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Hash Table Visualizer</h1>
                <p className="text-xs text-slate-400">Key-Value Associative Memory & Hashing</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setStrategy("chaining")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                strategy === "chaining" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Chaining
            </button>
            <button
              onClick={() => setStrategy("linear")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                strategy === "linear" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Linear Probing
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="ds-container">
        {/* Metric Bar */}
        <div className="ds-stats-grid">
          <div className="ds-stat-card">
            <div className="ds-stat-label">Stored Key-Values</div>
            <div className="ds-stat-value text-slate-800">{totalItems}</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Table Capacity</div>
            <div className="ds-stat-value text-slate-900">{capacity} slots</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Load Factor (n / k)</div>
            <div className="ds-stat-value text-xs font-bold font-mono">
              <span className={parseFloat(loadFactor) > 0.75 ? "text-rose-600" : "text-emerald-600"}>
                {loadFactor}
              </span>
              <span className="text-slate-400 text-[10px] ml-1 font-normal">(threshold 0.75)</span>
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Average Lookup</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-emerald-600">
              O(1) Constant Time
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
              : "bg-slate-100 border-slate-300 text-slate-900"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
          {message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          {message.type === "info" && <Info className="w-5 h-5 text-slate-600 shrink-0" />}
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
                    type="text"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="Key"
                    disabled={isBusy}
                    className="w-24 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                  <input
                    type="text"
                    value={valInput}
                    onChange={(e) => setValInput(e.target.value)}
                    placeholder="Val"
                    disabled={isBusy}
                    className="w-24 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                  <button
                    onClick={handleInsert}
                    disabled={isBusy}
                    className="ds-btn bg-slate-800 hover:bg-slate-900 text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Put
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Search className="w-4 h-4" />
                    Get
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isBusy}
                    className="ds-btn bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                  >
                    <Minus className="w-4 h-4" />
                    Del
                  </button>
                  <button
                    onClick={handleRandom}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleClear}
                  disabled={isBusy}
                  className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Hash Computation Pipeline */}
              {hashComputation && (
                <div className="p-3 bg-slate-100/80 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 flex items-center gap-2 overflow-x-auto">
                  <Database className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{hashComputation}</span>
                </div>
              )}

              {/* Buckets Stage */}
              <div className="ds-stage min-h-[380px] bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 flex-col items-stretch justify-start gap-2.5 overflow-y-auto">
                {buckets.map((bucket) => {
                  const isActive = activeBucketIdx === bucket.index;
                  return (
                    <div
                      key={bucket.index}
                      className={`w-full p-2.5 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                        isActive
                          ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300 scale-[1.01]"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      {/* Bucket Index Marker */}
                      <div className="shrink-0 w-12 h-10 rounded-lg bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm">
                        [{bucket.index}]
                      </div>

                      {/* Entries List / Chain */}
                      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                        {bucket.entries.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">Empty slot</span>
                        ) : (
                          bucket.entries.map((entry, idx) => (
                            <React.Fragment key={idx}>
                              <div className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 text-white font-mono text-xs flex items-center gap-2 shadow-sm border border-slate-600">
                                <span className="font-bold text-amber-300">{entry.key}</span>
                                <span className="opacity-60">:</span>
                                <span className="text-cyan-200">{entry.value}</span>
                              </div>
                              {strategy === "chaining" && idx < bucket.entries.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                            </React.Fragment>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
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
                  <Code2 className="w-4 h-4 text-slate-700" />
                  <h3 className="text-sm font-bold text-slate-900">Pseudocode</h3>
                </div>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
                  {(["insert", "search"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setHighlightLine(null);
                      }}
                      className={`px-2 py-1 font-semibold rounded capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-slate-800 shadow-sm"
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
                        ? "bg-slate-700 text-amber-300 font-bold border-l-2 border-amber-400"
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
                <Info className="w-4 h-4 text-slate-600" />
                Hash Properties
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Average Search</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Worst Case Search</span>
                  <span className="font-mono font-bold text-rose-600">O(n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Average Insert</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
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
                <li>JavaScript Objects & Python Dictionaries (`dict`)</li>
                <li>Database hash indexing (PostgreSQL, MongoDB)</li>
                <li>In-memory caches (Redis, Memcached)</li>
                <li>Cryptographic hashes & symbol tables in compilers</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
