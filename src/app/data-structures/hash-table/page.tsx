"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Hash,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  Trash2,
  Shuffle,
  Info,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
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

type CollisionStrategy = "chaining" | "linear" | "quadratic";

interface HashEntry {
  key: string;
  value: string;
}

interface Bucket {
  index: number;
  entries: HashEntry[];
}

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
  const [inputKey, setInputKey] = useState<string>("name");
  const [inputValue, setInputValue] = useState<string>("Alice");
  const [activeTab, setActiveTab] = useState<string>("insert");
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [activeBucket, setActiveBucket] = useState<number | null>(null);
  const [collisionAlert, setCollisionAlert] = useState<boolean>(false);

  const [buckets, setBuckets] = useState<Bucket[]>(() => {
    const initial: Bucket[] = Array.from({ length: 8 }, (_, i) => ({
      index: i,
      entries: [],
    }));
    initial[1].entries.push({ key: "id", value: "101" });
    initial[3].entries.push({ key: "role", value: "Engineer" });
    initial[6].entries.push({ key: "city", value: "Tokyo" });
    return initial;
  });

  const [message, setMessage] = useState<{ text: string; type: "info" | "success" | "warning" | "error" }>({
    text: "Hash Table loaded. Key-Value mapping with O(1) average lookup.",
    type: "info",
  });
  const [logs, setLogs] = useState<string[]>([
    "Initialized Hash Table (Capacity 8)",
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedEntry, setSelectedEntry] = useState<{
    id: string;
    value: string;
    index: number;
    role: string;
    extra?: Record<string, string | number>;
  } | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "insert4", title: "Insert at least 4 key-value entries", completed: false },
    { id: "collision", title: "Trigger an intentional Hash Collision in a bucket", completed: false },
    { id: "search", title: "Search and retrieve a value by its key", completed: false },
    { id: "strategy", title: "Switch between Chaining and Open Addressing (Linear Probing)", completed: false },
    { id: "inspect", title: "Click any bucket to inspect hash code calculation & memory", completed: false },
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

  const totalEntries = buckets.reduce((acc, b) => acc + b.entries.length, 0);
  const loadFactor = (totalEntries / capacity).toFixed(2);

  const handlePut = async (k?: string, v?: string) => {
    if (isBusy) return;
    const key = k ?? inputKey.trim();
    const val = v ?? inputValue.trim();
    if (!key || !val) {
      setMessage({ text: "Please enter both Key and Value.", type: "warning" });
      return;
    }

    setIsBusy(true);
    setActiveTab("insert");
    setHighlightLine(1);
    const hash = simpleHash(key);
    let idx = hash % capacity;
    playTone(450);

    setActiveBucket(idx);
    setMessage({ text: `hash("${key}") = ${hash}. Target Index: ${hash} % ${capacity} = ${idx}.`, type: "info" });
    addLog(`🔑 Hashed "${key}" → Bucket [${idx}]`);

    await sleep(550);

    // Collision check
    const currentBucket = buckets[idx];
    const isCollision = currentBucket.entries.length > 0 && !currentBucket.entries.some((e) => e.key === key);

    if (isCollision) {
      setCollisionAlert(true);
      markChallenge("collision");
      playTone(280);

      if (strategy === "chaining") {
        setHighlightLine(2);
        setMessage({
          text: `Collision detected at index ${idx}! Resolving via Chaining: appending to linked list.`,
          type: "warning",
        });
        addLog(`💥 Collision at [${idx}]! Chained in linked list.`);
      } else {
        // Linear probing
        setHighlightLine(4);
        setMessage({
          text: `Collision at index ${idx}! Resolving via Linear Probing: searching next slot...`,
          type: "warning",
        });
        let probeIdx = (idx + 1) % capacity;
        while (buckets[probeIdx].entries.length > 0 && probeIdx !== idx) {
          setActiveBucket(probeIdx);
          playTone(320);
          await sleep(400);
          probeIdx = (probeIdx + 1) % capacity;
        }
        idx = probeIdx;
      }
    } else {
      setHighlightLine(3);
    }

    await sleep(400);
    playTone(650);

    setBuckets((prev) =>
      prev.map((b) => {
        if (b.index === idx) {
          const existing = b.entries.findIndex((e) => e.key === key);
          if (existing >= 0) {
            const updated = [...b.entries];
            updated[existing] = { key, value: val };
            return { ...b, entries: updated };
          }
          return { ...b, entries: [...b.entries, { key, value: val }] };
        }
        return b;
      })
    );

    setMessage({ text: `Successfully stored ("${key}", "${val}") in bucket [${idx}].`, type: "success" });
    addLog(`✅ Stored ("${key}", "${val}") at [${idx}]`);

    if (totalEntries + 1 >= 4) {
      markChallenge("insert4");
    }

    await sleep(500);
    setActiveBucket(null);
    setCollisionAlert(false);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleGet = async () => {
    if (isBusy || !inputKey.trim()) return;
    const key = inputKey.trim();

    setIsBusy(true);
    setActiveTab("search");
    setHighlightLine(1);
    const hash = simpleHash(key);
    const idx = hash % capacity;

    setActiveBucket(idx);
    setMessage({ text: `Looking up key "${key}". hash("${key}") % ${capacity} = ${idx}...`, type: "info" });
    addLog(`🔍 Looking up "${key}" at bucket [${idx}]`);
    playTone(500);

    await sleep(600);

    const bucket = buckets[idx];
    const match = bucket.entries.find((e) => e.key === key);

    if (match) {
      setHighlightLine(3);
      playTone(720);
      setMessage({ text: `Key "${key}" found! Value: "${match.value}" at bucket [${idx}].`, type: "success" });
      addLog(`🎯 Found ("${key}": "${match.value}")`);
      markChallenge("search");
    } else {
      setHighlightLine(4);
      playTone(220);
      setMessage({ text: `Key "${key}" not found in hash table.`, type: "error" });
      addLog(`❌ Key "${key}" not found`);
    }

    await sleep(900);
    setActiveBucket(null);
    setHighlightLine(null);
    setIsBusy(false);
  };

  const handleClear = () => {
    if (isBusy) return;
    setBuckets(Array.from({ length: capacity }, (_, i) => ({ index: i, entries: [] })));
    setSelectedEntry(null);
    setMessage({ text: "Hash Table cleared.", type: "info" });
    addLog("🗑 Cleared all buckets");
    playTone(300);
  };

  // Presets
  const applyPreset = async (preset: string) => {
    if (isBusy) return;
    setIsBusy(true);

    if (preset === "collisionDemo") {
      // Pick keys that hash to the same bucket
      setMessage({ text: "Triggering intentional collision with rhyming keys...", type: "warning" });
      addLog("💥 Running collision test with keys 'cat' & 'act'");
      await handlePut("cat", "feline");
      await sleep(400);
      await handlePut("dog", "canine");
      await sleep(400);
      await handlePut("rat", "rodent");
    } else if (preset === "loadFactorAlert") {
      // Fill to overload
      const pairs = [
        ["user1", "Alex"],
        ["user2", "Beth"],
        ["user3", "Carlos"],
        ["user4", "Diana"],
        ["user5", "Ethan"],
        ["user6", "Fiona"],
        ["user7", "George"],
      ];
      for (const [k, v] of pairs) {
        await handlePut(k, v);
      }
      setMessage({
        text: `Load factor reached ${(7 / capacity).toFixed(2)} (> 0.75 threshold). In production, table would automatically rehash & double capacity!`,
        type: "warning",
      });
      addLog("⚠️ High Load Factor Triggered!");
    }

    setIsBusy(false);
  };

  const handleSelectEntry = (entry: HashEntry, bucketIdx: number) => {
    const rawHash = simpleHash(entry.key);
    setSelectedEntry({
      id: `${bucketIdx}-${entry.key}`,
      value: `"${entry.key}": "${entry.value}"`,
      index: bucketIdx,
      role: `Bucket [${bucketIdx}] Slot`,
      extra: {
        "Key String": entry.key,
        "Stored Value": entry.value,
        "Raw 32-bit Hash": rawHash,
        "Modulo Index": `${rawHash} % ${capacity} = ${bucketIdx}`,
        "Bucket Chain Depth": buckets[bucketIdx].entries.length,
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Hash Table Visualizer</h1>
                <p className="text-xs text-slate-400">Hash Functions, Bucket Arrays & Collision Resolution</p>
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
            <div className="ds-stat-label">Buckets (Capacity)</div>
            <div className="ds-stat-value text-amber-600">{capacity} Slots</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Stored Entries</div>
            <div className="ds-stat-value text-slate-900">{totalEntries} Items</div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Load Factor (α)</div>
            <div className={`ds-stat-value ${parseFloat(loadFactor) > 0.75 ? "text-rose-600" : "text-emerald-600"}`}>
              {loadFactor} <span className="text-xs font-normal text-slate-400">{parseFloat(loadFactor) > 0.75 ? "(High)" : "(Healthy)"}</span>
            </div>
          </div>
          <div className="ds-stat-card">
            <div className="ds-stat-label">Lookup Complexity</div>
            <div className="ds-stat-value text-xs font-mono font-bold text-emerald-600">O(1) Avg / O(n) Worst</div>
          </div>
        </div>

        {/* Action Status Banner */}
        <div
          className={`mb-4 p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
            collisionAlert
              ? "bg-rose-50 border-rose-200 text-rose-800 animate-pulse"
              : message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : message.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : message.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {collisionAlert && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {!collisionAlert && message.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {!collisionAlert && message.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {!collisionAlert && message.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {!collisionAlert && message.type === "info" && <Info className="w-5 h-5 text-amber-500 shrink-0" />}
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
            onClick={() => applyPreset("collisionDemo")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            💥 Collision Demonstration
          </button>
          <button
            onClick={() => applyPreset("loadFactorAlert")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ⚠️ High Load Factor (&gt; 0.75) Warning
          </button>
          <button
            onClick={() => handlePut("framework", "Next.js")}
            disabled={isBusy}
            className="ds-preset-chip"
          >
            ➕ Insert ("framework", "Next.js")
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="ds-visualizer-card">
              {/* Collision Strategy Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setStrategy("chaining");
                      markChallenge("strategy");
                    }}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      strategy === "chaining"
                        ? "bg-white text-amber-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Separate Chaining
                  </button>
                  <button
                    onClick={() => {
                      setStrategy("linear");
                      markChallenge("strategy");
                    }}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      strategy === "linear"
                        ? "bg-white text-amber-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Linear Probing
                  </button>
                </div>

                <div className="text-xs text-slate-500">
                  Hash Scheme: <span className="font-mono font-bold text-amber-700">hash(key) % {capacity}</span>
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Key"
                    disabled={isBusy}
                    className="w-24 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    disabled={isBusy}
                    className="w-28 px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handlePut()}
                    disabled={isBusy}
                    className="ds-btn ds-btn-primary bg-amber-600 hover:bg-amber-700"
                  >
                    <Plus className="w-4 h-4" />
                    Put
                  </button>
                  <button
                    onClick={handleGet}
                    disabled={isBusy}
                    className="ds-btn ds-btn-secondary"
                  >
                    <Search className="w-4 h-4" />
                    Get
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    disabled={isBusy || totalEntries === 0}
                    className="ds-btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Clear All Buckets"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Visualizer */}
              <div className="ds-stage min-h-[400px] flex-col justify-start relative bg-gradient-to-b from-slate-50 to-slate-100/60 p-5 overflow-x-auto">
                <div className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 mb-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-500" />
                    <span>Click any stored entry to inspect its 32-bit hash code & memory address</span>
                  </div>
                  <span className="font-mono text-slate-400">Array Index [0 .. {capacity - 1}]</span>
                </div>

                {/* Bucket Array Grid */}
                <div className="w-full space-y-2.5">
                  {buckets.map((b) => {
                    const isTarget = activeBucket === b.index;
                    return (
                      <div
                        key={b.index}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all duration-300 ${
                          isTarget
                            ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        {/* Index Slot Badge */}
                        <div className="w-16 flex-shrink-0 flex flex-col items-center justify-center py-1 px-2 rounded-lg bg-slate-100 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Bucket</span>
                          <span className="text-sm font-bold font-mono text-slate-800">[{b.index}]</span>
                        </div>

                        {/* Stored Entries Chain */}
                        <div className="flex-1 flex items-center gap-2 overflow-x-auto min-h-[44px]">
                          {b.entries.length === 0 ? (
                            <span className="text-xs text-slate-300 italic font-mono ml-2">Empty slot</span>
                          ) : (
                            b.entries.map((entry, eIdx) => {
                              const isSelected = selectedEntry?.id === `${b.index}-${entry.key}`;
                              return (
                                <React.Fragment key={entry.key}>
                                  {eIdx > 0 && <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                                  <div
                                    onClick={() => handleSelectEntry(entry, b.index)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-200 shadow-sm flex-shrink-0 ${
                                      isSelected
                                        ? "bg-amber-600 text-white border-amber-700 ring-2 ring-indigo-400 scale-105"
                                        : "bg-amber-50 border-amber-200 text-slate-900 hover:border-amber-400"
                                    }`}
                                  >
                                    <span className="text-xs font-bold font-mono">
                                      {entry.key}:
                                    </span>
                                    <span className="text-xs font-mono font-medium opacity-90">
                                      &quot;{entry.value}&quot;
                                    </span>
                                  </div>
                                </React.Fragment>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inspector */}
              {selectedEntry && (
                <div className="mt-4">
                  <NodeInspector
                    selectedNode={selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                    actionLabel="Search This Key"
                    onAction={() => {
                      if (selectedEntry.extra?.["Key String"]) {
                        setInputKey(selectedEntry.extra["Key String"].toString());
                        handleGet();
                      }
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
              codeMap={DATA_STRUCTURE_CODES.hashTable.code[activeTab] || DATA_STRUCTURE_CODES.hashTable.code.insert}
              activeOperation={activeTab}
              operations={DATA_STRUCTURE_CODES.hashTable.operations}
              onOperationChange={(op) => {
                setActiveTab(op);
                setHighlightLine(null);
              }}
              highlightLine={highlightLine}
            />

            <ChallengeTracker
              topicTitle="Hash Table"
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
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Search Worst (All Collide)</span>
                  <span className="font-mono font-bold text-rose-600">O(n)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Insert Average</span>
                  <span className="font-mono font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 font-medium">Rehashing (Resize)</span>
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
