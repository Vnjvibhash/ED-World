"use client";

import React, { useState } from "react";
import {
  Code2,
  Sliders,
  CheckCircle2,
  Circle,
  Trophy,
  Zap,
  Copy,
  Check,
  Activity,
  Cpu,
  HelpCircle,
} from "lucide-react";

// --- 1. Speed Controller Component ---
export interface SpeedControlProps {
  speed: number;
  setSpeed: (speed: number) => void;
  disabled?: boolean;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({
  speed,
  setSpeed,
  disabled = false,
}) => {
  const speeds = [
    { label: "0.5x", val: 0.5 },
    { label: "1x", val: 1 },
    { label: "1.5x", val: 1.5 },
    { label: "2x", val: 2 },
    { label: "⚡ Turbo", val: 4 },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
      <span className="text-[11px] font-bold text-slate-500 uppercase px-1.5 flex items-center gap-1">
        <Zap className="w-3 h-3 text-amber-500" />
        Speed:
      </span>
      {speeds.map((s) => (
        <button
          key={s.val}
          onClick={() => setSpeed(s.val)}
          disabled={disabled}
          className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all ${
            speed === s.val
              ? "bg-white text-indigo-700 shadow-sm border border-slate-200/80 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

// --- 2. Multi-Language Code Viewer ---
export type LangType = "pseudocode" | "cpp" | "python" | "java" | "javascript";

export interface MultiLangCodeProps {
  codeMap: Record<LangType, string[]>;
  activeOperation: string;
  operations?: string[];
  onOperationChange?: (op: string) => void;
  highlightLine?: number | null;
}

export const MultiLangCode: React.FC<MultiLangCodeProps> = ({
  codeMap,
  activeOperation,
  operations,
  onOperationChange,
  highlightLine,
}) => {
  const [lang, setLang] = useState<LangType>("pseudocode");
  const [copied, setCopied] = useState(false);

  const currentLines = codeMap[lang] || codeMap.pseudocode || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const langs: { id: LangType; label: string }[] = [
    { id: "pseudocode", label: "Pseudo" },
    { id: "cpp", label: "C++" },
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "javascript", label: "JS" },
  ];

  return (
    <div className="ds-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-violet-600" />
          <h3 className="text-sm font-bold text-slate-900 capitalize">
            {activeOperation} Code
          </h3>
        </div>

        {operations && operations.length > 1 && onOperationChange && (
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
            {operations.map((op) => (
              <button
                key={op}
                onClick={() => onOperationChange(op)}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded capitalize transition-all ${
                  activeOperation === op
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language Selector Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg">
          {langs.map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all ${
                lang === l.id
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Editor Frame */}
      <div className="bg-slate-950 rounded-xl p-3 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
        {currentLines.map((line, idx) => (
          <div
            key={idx}
            className={`py-0.5 px-2 rounded transition-colors leading-relaxed ${
              lang === "pseudocode" && highlightLine === idx
                ? "bg-violet-600/40 text-violet-200 font-bold border-l-2 border-violet-400"
                : "text-slate-300"
            }`}
          >
            <span className="text-slate-600 select-none mr-3 text-[11px] inline-block w-4 text-right">
              {idx + 1}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. Interactive Node Memory Inspector ---
export interface NodeInspectorProps {
  selectedNode: {
    id: string | number;
    value: string | number;
    index?: number;
    role?: string;
    extra?: Record<string, string | number>;
  } | null;
  onClose: () => void;
  onAction?: (action: string) => void;
  actionLabel?: string;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  selectedNode,
  onClose,
  onAction,
  actionLabel = "Inspect Action",
}) => {
  if (!selectedNode) return null;

  // Generate simulated 64-bit Hex address from value
  const numVal = typeof selectedNode.value === "number" ? selectedNode.value : selectedNode.value.length;
  const simHex = `0x7FFEE${((numVal + 42) * 1024 + (selectedNode.index ?? 1) * 32).toString(16).toUpperCase()}`;

  return (
    <div className="bg-white rounded-2xl border-2 border-violet-400/80 shadow-xl p-4 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Node Memory Inspector
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-700 font-bold px-1.5 py-0.5 rounded hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-400">Value</div>
          <div className="text-base font-bold font-mono text-slate-900">{selectedNode.value}</div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-400">Index / ID</div>
          <div className="text-sm font-bold font-mono text-violet-700">
            {selectedNode.index !== undefined ? `[${selectedNode.index}]` : selectedNode.id}
          </div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-400">Memory Addr</div>
          <div className="text-xs font-mono font-bold text-indigo-600 truncate" title={simHex}>
            {simHex}
          </div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-400">Role / Status</div>
          <div className="text-xs font-bold text-emerald-600 capitalize truncate">
            {selectedNode.role || "Active Node"}
          </div>
        </div>
      </div>

      {selectedNode.extra && (
        <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-slate-600">
          {Object.entries(selectedNode.extra).map(([k, v]) => (
            <span key={k} className="px-2 py-0.5 bg-slate-100 rounded-md font-mono">
              <strong className="text-slate-700">{k}:</strong> {v}
            </span>
          ))}
        </div>
      )}

      {onAction && (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={() => onAction("quick")}
            className="px-3 py-1 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg text-xs font-bold border border-violet-200 transition-colors"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

// --- 4. Interactive Sandbox Challenge Tracker ---
export interface Challenge {
  id: string;
  title: string;
  completed: boolean;
}

export interface ChallengeTrackerProps {
  topicTitle: string;
  challenges: Challenge[];
  onResetChallenges?: () => void;
}

export const ChallengeTracker: React.FC<ChallengeTrackerProps> = ({
  topicTitle,
  challenges,
}) => {
  const completedCount = challenges.filter((c) => c.completed).length;
  const isMastered = completedCount === challenges.length && challenges.length > 0;

  return (
    <div className="ds-card border-slate-200 bg-gradient-to-br from-white to-slate-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className={`w-4 h-4 ${isMastered ? "text-amber-500 animate-bounce" : "text-slate-400"}`} />
          <h3 className="text-sm font-bold text-slate-900">
            Interactive Challenges
          </h3>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          {completedCount} / {challenges.length} Done
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-500 rounded-full"
          style={{ width: `${challenges.length ? (completedCount / challenges.length) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-2">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className={`flex items-start gap-2 text-xs p-2 rounded-lg transition-all ${
              ch.completed
                ? "bg-emerald-50 text-emerald-900 font-medium border border-emerald-200/80"
                : "bg-white text-slate-600 border border-slate-200/60"
            }`}
          >
            {ch.completed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
            )}
            <span>{ch.title}</span>
          </div>
        ))}
      </div>

      {isMastered && (
        <div className="mt-3 p-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 rounded-xl flex items-center gap-2 text-xs text-amber-800 font-bold">
          <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Awesome! You completed all {topicTitle} interactive lab challenges! 🎉</span>
        </div>
      )}
    </div>
  );
};
