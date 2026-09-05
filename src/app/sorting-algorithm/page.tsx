"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  BarChart3,
  BookOpen,
  Info
} from "lucide-react";

type AlgorithmType = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

interface AlgorithmInfo {
  name: string;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  space: string;
  stable: boolean;
  description: string;
}

const algorithmsData: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    bestTime: "O(n)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: true,
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  },
  selection: {
    name: "Selection Sort",
    bestTime: "O(n²)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: false,
    description: "Finds the minimum element from the unsorted part and puts it at the beginning."
  },
  insertion: {
    name: "Insertion Sort",
    bestTime: "O(n)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: true,
    description: "Builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position."
  },
  merge: {
    name: "Merge Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n log n)",
    space: "O(n)",
    stable: true,
    description: "A divide-and-conquer algorithm that recursively divides the array into halves, sorts them, and merges the sorted halves."
  },
  quick: {
    name: "Quick Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n²)",
    space: "O(log n)",
    stable: false,
    description: "Picks an element as pivot and partitions the given array around the picked pivot."
  },
  heap: {
    name: "Heap Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n log n)",
    space: "O(1)",
    stable: false,
    description: "Converts the array into a max heap, then repeatedly extracts the maximum element to construct the sorted array."
  }
};

export default function SortingAlgorithmPage() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(25);
  const [speed, setSpeed] = useState<number>(40); // ms delay
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const stopSortingRef = useRef<boolean>(false);

  // Helper to sleep
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate random array
  const generateNewArray = (size = arraySize) => {
    stopSortingRef.current = true;
    setIsSorting(false);
    setIsSorted(false);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);

    const newArr: number[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArr);
  };

  useEffect(() => {
    generateNewArray(arraySize);
  }, [arraySize]);

  // Bubble Sort
  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopSortingRef.current) return;
        setComparingIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
  };

  // Selection Sort
  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (stopSortingRef.current) return;
        setComparingIndices([minIdx, j]);
        await sleep(speed);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
        await sleep(speed);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
  };

  // Insertion Sort
  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        if (stopSortingRef.current) return;
        setComparingIndices([j, j + 1]);
        setSwappingIndices([j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j = j - 1;
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
  };

  // Merge Sort
  const runMergeSort = async () => {
    const arr = [...array];
    const merge = async (left: number, mid: number, right: number) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);

      let i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
        if (stopSortingRef.current) return;
        setComparingIndices([k, mid + 1 + j]);
        await sleep(speed);
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setArray([...arr]);
        k++;
      }
      while (i < n1) {
        if (stopSortingRef.current) return;
        arr[k] = L[i];
        setArray([...arr]);
        i++;
        k++;
        await sleep(speed / 2);
      }
      while (j < n2) {
        if (stopSortingRef.current) return;
        arr[k] = R[j];
        setArray([...arr]);
        j++;
        k++;
        await sleep(speed / 2);
      }
    };

    const divide = async (l: number, r: number) => {
      if (l >= r || stopSortingRef.current) return;
      const m = Math.floor(l + (r - l) / 2);
      await divide(l, m);
      await divide(m + 1, r);
      await merge(l, m, r);
    };

    await divide(0, arr.length - 1);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Quick Sort
  const runQuickSort = async () => {
    const arr = [...array];
    const partition = async (low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (stopSortingRef.current) return -1;
        setComparingIndices([j, high]);
        await sleep(speed);
        if (arr[j] < pivot) {
          i++;
          setSwappingIndices([i, j]);
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSwappingIndices([i + 1, high]);
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      await sleep(speed);
      return i + 1;
    };

    const qs = async (low: number, high: number) => {
      if (low < high && !stopSortingRef.current) {
        const pi = await partition(low, high);
        if (pi === -1) return;
        setSortedIndices((prev) => [...prev, pi]);
        await qs(low, pi - 1);
        await qs(pi + 1, high);
      }
    };

    await qs(0, arr.length - 1);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Heap Sort
  const runHeapSort = async () => {
    const arr = [...array];
    const n = arr.length;

    const heapify = async (size: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < size && arr[left] > arr[largest]) largest = left;
      if (right < size && arr[right] > arr[largest]) largest = right;

      if (largest !== i) {
        if (stopSortingRef.current) return;
        setComparingIndices([i, largest]);
        setSwappingIndices([i, largest]);
        const swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        setArray([...arr]);
        await sleep(speed);
        await heapify(size, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (stopSortingRef.current) return;
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (stopSortingRef.current) return;
      setSwappingIndices([0, i]);
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      setArray([...arr]);
      setSortedIndices((prev) => [...prev, i]);
      await sleep(speed);
      await heapify(i, 0);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
  };

  const handleStartSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setIsSorted(false);
    stopSortingRef.current = false;
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);

    if (activeAlgorithm === "bubble") await runBubbleSort();
    else if (activeAlgorithm === "selection") await runSelectionSort();
    else if (activeAlgorithm === "insertion") await runInsertionSort();
    else if (activeAlgorithm === "merge") await runMergeSort();
    else if (activeAlgorithm === "quick") await runQuickSort();
    else if (activeAlgorithm === "heap") await runHeapSort();

    if (!stopSortingRef.current) {
      setComparingIndices([]);
      setSwappingIndices([]);
      setIsSorted(true);
    }
    setIsSorting(false);
  };

  const currentAlgoInfo = algorithmsData[activeAlgorithm];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>Interactive Data Structures &amp; Algorithms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sorting Technique <span className="text-accent-500">Visualizer</span>
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Watch algorithms execute step-by-step in real time with animated bar transitions, comparison tracking, and complexity analysis.
          </p>
        </div>

        {/* Algorithm Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 max-w-4xl mx-auto shadow-sm">
          {(Object.keys(algorithmsData) as AlgorithmType[]).map((algoKey) => (
            <button
              key={algoKey}
              onClick={() => {
                if (!isSorting) {
                  setActiveAlgorithm(algoKey);
                  generateNewArray();
                }
              }}
              disabled={isSorting}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeAlgorithm === algoKey
                  ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              } ${isSorting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {algorithmsData[algoKey].name}
            </button>
          ))}
        </div>

        {/* Main Visualizer Stage */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          {/* Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-6">
            {/* Play & Reset buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartSort}
                disabled={isSorting || isSorted}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 disabled:opacity-50 shadow-md shadow-accent-500/20 transition-all text-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Sorting</span>
              </button>

              <button
                onClick={() => generateNewArray()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset / Random</span>
              </button>
            </div>

            {/* Sliders for Size & Speed */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium">Array Size:</span>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={arraySize}
                  disabled={isSorting}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-brand-500 cursor-pointer"
                />
                <span className="font-mono text-brand-600 font-bold">{arraySize}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium">Speed:</span>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={155 - speed}
                  onChange={(e) => setSpeed(155 - Number(e.target.value))}
                  className="w-24 sm:w-32 accent-brand-500 cursor-pointer"
                />
                <span className="font-mono text-brand-600 font-bold">{speed}ms</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-72 sm:h-96 w-full flex items-end justify-center gap-1 sm:gap-2 px-2 pt-8 pb-2 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative">
            {array.map((value, idx) => {
              const isComparing = comparingIndices.includes(idx);
              const isSwapping = swappingIndices.includes(idx);
              const isItemSorted = sortedIndices.includes(idx);

              let barColor = "bg-brand-500 hover:bg-brand-600";
              if (isItemSorted) barColor = "bg-emerald-500 shadow-emerald-500/30 shadow-sm";
              else if (isSwapping) barColor = "bg-rose-500 shadow-rose-500/30 shadow-sm animate-pulse";
              else if (isComparing) barColor = "bg-amber-400 shadow-amber-400/30 shadow-sm";

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 transition-all duration-75 max-w-[32px]"
                  style={{ height: `${value}%` }}
                >
                  <div
                    className={`w-full h-full rounded-t-md transition-colors ${barColor}`}
                  />
                  {arraySize <= 30 && (
                    <span className="text-[10px] font-mono text-slate-500 mt-1 hidden sm:block">
                      {value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-brand-500" />
              <span>Unsorted Default</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-400" />
              <span>Comparing Elements</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-rose-500" />
              <span>Swapping / Moving</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
              <span>Sorted Position</span>
            </div>
          </div>
        </div>

        {/* Algorithm Complexity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
              <Info className="w-4 h-4" />
              <span>Algorithm Overview</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{currentAlgoInfo.name}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {currentAlgoInfo.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
              <BarChart3 className="w-4 h-4" />
              <span>Time Complexities</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Best</div>
                <div className="text-sm font-mono font-bold text-emerald-600 mt-1">{currentAlgoInfo.bestTime}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Average</div>
                <div className="text-sm font-mono font-bold text-amber-600 mt-1">{currentAlgoInfo.avgTime}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Worst</div>
                <div className="text-sm font-mono font-bold text-rose-600 mt-1">{currentAlgoInfo.worstTime}</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold">
              <Sliders className="w-4 h-4" />
              <span>Space &amp; Stability</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Space Complexity</div>
                <div className="text-sm font-mono font-bold text-brand-600 mt-1">{currentAlgoInfo.space}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Stable Sort</div>
                <div className={`text-sm font-semibold mt-1 ${currentAlgoInfo.stable ? "text-emerald-600" : "text-slate-500"}`}>
                  {currentAlgoInfo.stable ? "Yes (Stable)" : "No (Unstable)"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
