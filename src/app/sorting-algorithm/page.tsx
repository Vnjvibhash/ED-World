"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  BarChart3,
  Info,
  ChevronRight,
  ArrowDownUp,
  CheckCircle2,
  Shuffle
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
  pseudoCode: string[];
}

const algorithmsData: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    bestTime: "O(n)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: true,
    description: "Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order.",
    pseudoCode: [
      "for i = 0 to n-1:",
      "  for j = 0 to n-i-2:",
      "    if arr[j] > arr[j+1]:",
      "      swap(arr[j], arr[j+1])"
    ]
  },
  selection: {
    name: "Selection Sort",
    bestTime: "O(n²)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: false,
    description: "Finds the minimum element from the unsorted portion of the array and places it at the beginning.",
    pseudoCode: [
      "for i = 0 to n-1:",
      "  minIdx = i",
      "  for j = i+1 to n:",
      "    if arr[j] < arr[minIdx]: minIdx = j",
      "  swap(arr[i], arr[minIdx])"
    ]
  },
  insertion: {
    name: "Insertion Sort",
    bestTime: "O(n)",
    avgTime: "O(n²)",
    worstTime: "O(n²)",
    space: "O(1)",
    stable: true,
    description: "Builds the sorted array one element at a time by inserting the current element into its correct position.",
    pseudoCode: [
      "for i = 1 to n-1:",
      "  key = arr[i], j = i - 1",
      "  while j >= 0 and arr[j] > key:",
      "    arr[j+1] = arr[j], j--",
      "  arr[j+1] = key"
    ]
  },
  merge: {
    name: "Merge Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n log n)",
    space: "O(n)",
    stable: true,
    description: "A divide-and-conquer algorithm that recursively divides the array in half, sorts each half, and merges them.",
    pseudoCode: [
      "function mergeSort(arr, left, right):",
      "  if left >= right: return",
      "  mid = (left + right) / 2",
      "  mergeSort(arr, left, mid)",
      "  mergeSort(arr, mid+1, right)",
      "  merge(arr, left, mid, right)"
    ]
  },
  quick: {
    name: "Quick Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n²)",
    space: "O(log n)",
    stable: false,
    description: "Selects a pivot element and partitions the array such that elements smaller than the pivot precede it.",
    pseudoCode: [
      "function quickSort(arr, low, high):",
      "  if low < high:",
      "    pi = partition(arr, low, high)",
      "    quickSort(arr, low, pi - 1)",
      "    quickSort(arr, pi + 1, high)"
    ]
  },
  heap: {
    name: "Heap Sort",
    bestTime: "O(n log n)",
    avgTime: "O(n log n)",
    worstTime: "O(n log n)",
    space: "O(1)",
    stable: false,
    description: "Converts the array into a max-heap structure and repeatedly extracts the root to construct the sorted array.",
    pseudoCode: [
      "buildMaxHeap(arr)",
      "for i = n-1 down to 1:",
      "  swap(arr[0], arr[i])",
      "  heapify(arr, 0, i)"
    ]
  }
};

export default function SortingAlgorithmPage() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(24);
  const [speed, setSpeed] = useState<number>(40); // ms
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  // Highlighting indices
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  // Live Metrics
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("Ready to sort. Click 'Start Sorting' to begin.");

  // Refs to allow instant pause, stop, and dynamic speed during async execution
  const stopSortingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const speedRef = useRef<number>(speed);
  const stepTriggerRef = useRef<(() => void) | null>(null);

  // Sync speedRef when user slides speed
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Awaitable sleep that respects pause, step-forward, and abort
  const waitStep = useCallback(async () => {
    while (isPausedRef.current && !stopSortingRef.current) {
      // If paused, wait for user to hit resume or step
      await new Promise<void>((resolve) => {
        stepTriggerRef.current = resolve;
        setTimeout(resolve, 100);
      });
    }
    if (stopSortingRef.current) return;
    await new Promise((resolve) => setTimeout(resolve, Math.max(5, speedRef.current)));
  }, []);

  // Generate new array with presets
  const generateArray = useCallback((type: "random" | "reversed" | "nearly-sorted" | "few-unique" = "random", size = arraySize) => {
    stopSortingRef.current = true;
    isPausedRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
    setIsSorted(false);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setStatusMessage("New array generated. Ready to sort.");

    const newArr: number[] = [];
    if (type === "random") {
      for (let i = 0; i < size; i++) {
        newArr.push(Math.floor(Math.random() * 85) + 12);
      }
    } else if (type === "reversed") {
      const step = 85 / size;
      for (let i = size; i > 0; i--) {
        newArr.push(Math.floor(i * step) + 12);
      }
    } else if (type === "nearly-sorted") {
      const step = 85 / size;
      for (let i = 1; i <= size; i++) {
        newArr.push(Math.floor(i * step) + 12);
      }
      // Swap a few random pairs
      for (let k = 0; k < Math.max(2, Math.floor(size * 0.15)); k++) {
        const i1 = Math.floor(Math.random() * size);
        const i2 = Math.floor(Math.random() * size);
        const tmp = newArr[i1];
        newArr[i1] = newArr[i2];
        newArr[i2] = tmp;
      }
    } else if (type === "few-unique") {
      const uniqueValues = [20, 40, 60, 80, 95];
      for (let i = 0; i < size; i++) {
        newArr.push(uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
      }
    }
    setArray(newArr);
  }, [arraySize]);

  // Initial load
  useEffect(() => {
    generateArray("random", arraySize);
  }, [arraySize, generateArray]);

  // ============================================================
  // SORTING ALGORITHMS
  // ============================================================

  // Bubble Sort
  const runBubbleSort = async (arr: number[]) => {
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (stopSortingRef.current) return;

        setComparingIndices([j, j + 1]);
        setStatusMessage(`Comparing index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]})`);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          setStatusMessage(`Swapping: ${arr[j]} > ${arr[j + 1]}`);
          swapCount++;
          setSwaps(swapCount);

          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          swappedInPass = true;
          await waitStep();
          if (stopSortingRef.current) return;
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
      if (!swappedInPass) break; // Optimization
    }
  };

  // Selection Sort
  const runSelectionSort = async (arr: number[]) => {
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      setStatusMessage(`Finding minimum from index ${i} to ${n - 1}...`);
      for (let j = i + 1; j < n; j++) {
        if (stopSortingRef.current) return;

        setComparingIndices([minIdx, j]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setStatusMessage(`New minimum found: ${arr[minIdx]} at index ${minIdx}`);
        }
      }

      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        setStatusMessage(`Swapping minimum ${arr[minIdx]} into position ${i}`);
        swapCount++;
        setSwaps(swapCount);

        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
        await waitStep();
        if (stopSortingRef.current) return;
      }
      setSortedIndices((prev) => [...prev, i]);
    }
  };

  // Insertion Sort
  const runInsertionSort = async (arr: number[]) => {
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;
    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      setStatusMessage(`Inserting element ${key} into sorted portion (0 to ${i - 1})`);

      while (j >= 0) {
        if (stopSortingRef.current) return;
        setComparingIndices([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;

        if (arr[j] > key) {
          setSwappingIndices([j, j + 1]);
          swapCount++;
          setSwaps(swapCount);
          arr[j + 1] = arr[j];
          setArray([...arr]);
          j--;
          await waitStep();
          if (stopSortingRef.current) return;
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
      await waitStep();
      if (stopSortingRef.current) return;
    }
  };

  // Merge Sort
  const runMergeSort = async (arr: number[]) => {
    let compCount = 0;
    let swapCount = 0;

    const merge = async (left: number, mid: number, right: number) => {
      if (stopSortingRef.current) return;
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);

      let i = 0, j = 0, k = left;
      setStatusMessage(`Merging subarrays: [${left}..${mid}] and [${mid + 1}..${right}]`);

      while (i < n1 && j < n2) {
        if (stopSortingRef.current) return;
        setComparingIndices([left + i, mid + 1 + j]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
          swapCount++;
          setSwaps(swapCount);
        }
        setSwappingIndices([k]);
        setArray([...arr]);
        k++;
        await waitStep();
        if (stopSortingRef.current) return;
      }

      while (i < n1) {
        if (stopSortingRef.current) return;
        arr[k] = L[i];
        setArray([...arr]);
        setSwappingIndices([k]);
        i++;
        k++;
        await waitStep();
        if (stopSortingRef.current) return;
      }

      while (j < n2) {
        if (stopSortingRef.current) return;
        arr[k] = R[j];
        setArray([...arr]);
        setSwappingIndices([k]);
        j++;
        k++;
        await waitStep();
        if (stopSortingRef.current) return;
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
  };

  // Quick Sort
  const runQuickSort = async (arr: number[]) => {
    let compCount = 0;
    let swapCount = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      setStatusMessage(`Partitioning with pivot arr[${high}] = ${pivot}`);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (stopSortingRef.current) return -1;
        setComparingIndices([j, high]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return -1;

        if (arr[j] < pivot) {
          i++;
          setSwappingIndices([i, j]);
          swapCount++;
          setSwaps(swapCount);
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          await waitStep();
          if (stopSortingRef.current) return -1;
        }
      }

      setSwappingIndices([i + 1, high]);
      swapCount++;
      setSwaps(swapCount);
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      await waitStep();
      if (stopSortingRef.current) return -1;

      return i + 1;
    };

    const qs = async (low: number, high: number) => {
      if (low <= high && !stopSortingRef.current) {
        if (low === high) {
          setSortedIndices((prev) => [...prev, low]);
          return;
        }
        const pi = await partition(low, high);
        if (pi === -1 || stopSortingRef.current) return;
        setSortedIndices((prev) => [...prev, pi]);
        await qs(low, pi - 1);
        await qs(pi + 1, high);
      }
    };

    await qs(0, arr.length - 1);
  };

  // Heap Sort
  const runHeapSort = async (arr: number[]) => {
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    const heapify = async (size: number, i: number) => {
      if (stopSortingRef.current) return;
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < size) {
        setComparingIndices([left, largest]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;
        if (arr[left] > arr[largest]) largest = left;
      }

      if (right < size) {
        setComparingIndices([right, largest]);
        compCount++;
        setComparisons(compCount);
        await waitStep();
        if (stopSortingRef.current) return;
        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest !== i) {
        setSwappingIndices([i, largest]);
        swapCount++;
        setSwaps(swapCount);
        const swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        setArray([...arr]);
        await waitStep();
        if (stopSortingRef.current) return;
        await heapify(size, largest);
      }
    };

    setStatusMessage("Building initial max heap structure...");
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (stopSortingRef.current) return;
      await heapify(n, i);
    }

    setStatusMessage("Extracting max element from root to end...");
    for (let i = n - 1; i > 0; i--) {
      if (stopSortingRef.current) return;
      setSwappingIndices([0, i]);
      swapCount++;
      setSwaps(swapCount);
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      setArray([...arr]);
      setSortedIndices((prev) => [...prev, i]);
      await waitStep();
      if (stopSortingRef.current) return;
      await heapify(i, 0);
    }
  };

  // ============================================================
  // MASTER PLAY / PAUSE / RESTART CONTROLLER
  // ============================================================
  const handleStartSort = async () => {
    // If array is already sorted, automatically regenerate fresh array and run!
    if (isSorted || array.length === 0) {
      generateArray("random", arraySize);
      // Wait a tick for state to set
      await new Promise((r) => setTimeout(r, 50));
    }

    if (isPaused) {
      // Resume
      isPausedRef.current = false;
      setIsPaused(false);
      setStatusMessage("Resuming sort execution...");
      if (stepTriggerRef.current) {
        stepTriggerRef.current();
        stepTriggerRef.current = null;
      }
      return;
    }

    if (isSorting) return;

    setIsSorting(true);
    setIsPaused(false);
    setIsSorted(false);
    stopSortingRef.current = false;
    isPausedRef.current = false;
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setStatusMessage(`Running ${algorithmsData[activeAlgorithm].name}...`);

    const workingCopy = [...array];

    try {
      if (activeAlgorithm === "bubble") await runBubbleSort(workingCopy);
      else if (activeAlgorithm === "selection") await runSelectionSort(workingCopy);
      else if (activeAlgorithm === "insertion") await runInsertionSort(workingCopy);
      else if (activeAlgorithm === "merge") await runMergeSort(workingCopy);
      else if (activeAlgorithm === "quick") await runQuickSort(workingCopy);
      else if (activeAlgorithm === "heap") await runHeapSort(workingCopy);

      if (!stopSortingRef.current) {
        setComparingIndices([]);
        setSwappingIndices([]);
        setSortedIndices(Array.from({ length: workingCopy.length }, (_, i) => i));
        setIsSorted(true);
        setStatusMessage(`✨ Successfully sorted with ${algorithmsData[activeAlgorithm].name}!`);

        // Trigger celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (e) {
      console.error("Sorting visualizer error:", e);
    } finally {
      setIsSorting(false);
      setIsPaused(false);
    }
  };

  const handlePauseToggle = () => {
    if (!isSorting) return;
    if (isPaused) {
      isPausedRef.current = false;
      setIsPaused(false);
      setStatusMessage("Resuming execution...");
      if (stepTriggerRef.current) {
        stepTriggerRef.current();
        stepTriggerRef.current = null;
      }
    } else {
      isPausedRef.current = true;
      setIsPaused(true);
      setStatusMessage("Paused. Click 'Resume' or 'Step Forward' to advance.");
    }
  };

  const handleStepForward = () => {
    if (isPaused && stepTriggerRef.current) {
      stepTriggerRef.current();
      stepTriggerRef.current = null;
    }
  };

  const currentAlgoInfo = algorithmsData[activeAlgorithm];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>Interactive Data Structures &amp; Algorithms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sorting Technique <span className="text-accent-500">Visualizer</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Watch algorithms execute step-by-step in real time with comparison tracking, dynamic step controls, and complexity analysis.
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
                  generateArray("random", arraySize);
                }
              }}
              disabled={isSorting}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeAlgorithm === algoKey
                  ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              } ${isSorting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {algorithmsData[algoKey].name}
            </button>
          ))}
        </div>

        {/* Main Visualizer Stage */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {!isSorting || isPaused ? (
                <button
                  type="button"
                  onClick={handleStartSort}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md shadow-accent-500/20 transition-all text-xs sm:text-sm cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-white stroke-white" />
                  <span>{isSorted ? "Sort Again" : isPaused ? "Resume Sorting" : "Start Sorting"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePauseToggle}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-800 bg-amber-400 hover:bg-amber-300 shadow-md transition-all text-xs sm:text-sm cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-current text-slate-900" />
                  <span>Pause Sorting</span>
                </button>
              )}

              {isPaused && (
                <button
                  type="button"
                  onClick={handleStepForward}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-brand-600 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-all text-xs sm:text-sm cursor-pointer"
                  title="Execute single comparison step"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Step Forward</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => generateArray("random", arraySize)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            {/* Presets Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1">
                <Shuffle className="w-3 h-3" /> Presets:
              </span>
              {(["random", "nearly-sorted", "reversed", "few-unique"] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  disabled={isSorting}
                  onClick={() => generateArray(preset, arraySize)}
                  className="px-2.5 py-1 rounded-lg font-semibold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-xs capitalize disabled:opacity-50 cursor-pointer text-[11px]"
                >
                  {preset.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Sliders for Size & Speed */}
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">Size:</span>
                <input
                  type="range"
                  min="10"
                  max="45"
                  value={arraySize}
                  disabled={isSorting}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-20 sm:w-28 accent-brand-500 cursor-pointer"
                />
                <span className="font-mono text-brand-600 font-bold text-xs">{arraySize}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">Delay:</span>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={155 - speed}
                  onChange={(e) => setSpeed(155 - Number(e.target.value))}
                  className="w-20 sm:w-28 accent-brand-500 cursor-pointer"
                />
                <span className="font-mono text-brand-600 font-bold text-xs">{speed}ms</span>
              </div>
            </div>
          </div>

          {/* Live Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <div className={`w-2.5 h-2.5 rounded-full ${isSorting ? "bg-accent-500 animate-ping" : isSorted ? "bg-emerald-500" : "bg-slate-400"}`} />
              <span className="font-semibold text-slate-900">Status:</span>
              <span className="text-slate-600">{statusMessage}</span>
            </div>

            <div className="flex items-center gap-4 text-slate-600 font-mono text-xs">
              <div>
                <span className="text-slate-500 font-sans">Comparisons:</span>{" "}
                <strong className="text-brand-600 font-bold">{comparisons}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-sans">Swaps / Moves:</span>{" "}
                <strong className="text-accent-600 font-bold">{swaps}</strong>
              </div>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-72 sm:h-96 w-full flex items-end justify-center gap-1 sm:gap-2 px-3 pt-8 pb-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner relative overflow-hidden">
            {array.map((value, idx) => {
              const isComparing = comparingIndices.includes(idx);
              const isSwapping = swappingIndices.includes(idx);
              const isItemSorted = sortedIndices.includes(idx);

              let barClass = "bg-gradient-to-t from-[#173E67] to-[#2563eb] shadow-blue-500/20";
              if (isItemSorted) {
                barClass = "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-emerald-500/40";
              } else if (isSwapping) {
                barClass = "bg-gradient-to-t from-rose-600 to-rose-400 shadow-rose-500/50 animate-pulse";
              } else if (isComparing) {
                barClass = "bg-gradient-to-t from-amber-500 to-amber-300 shadow-amber-400/50";
              }

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end flex-1 max-w-[36px] h-full"
                >
                  {/* The actual height bar */}
                  <div
                    className={`w-full rounded-t-md transition-all duration-100 shadow-md ${barClass}`}
                    style={{ height: `${value}%` }}
                  />
                  {/* Optional value label */}
                  {arraySize <= 28 && (
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1 select-none font-bold">
                      {value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-blue-600 shadow-sm" />
              <span className="font-medium">Unsorted Element</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 shadow-sm" />
              <span className="font-medium">Comparing Indices</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-rose-500 shadow-sm" />
              <span className="font-medium">Swapping / Moving</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 shadow-sm" />
              <span className="font-medium">Sorted Position</span>
            </div>
          </div>
        </div>

        {/* Algorithm Complexity Cards & Pseudo-Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Overview */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-brand-500 text-sm font-bold">
              <Info className="w-4 h-4" />
              <span>Algorithm Overview</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{currentAlgoInfo.name}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {currentAlgoInfo.description}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Pseudocode Logic:
              </span>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                {currentAlgoInfo.pseudoCode.join("\n")}
              </pre>
            </div>
          </div>

          {/* Card 2: Time Complexities */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-500 text-sm font-bold">
                <BarChart3 className="w-4 h-4" />
                <span>Time Complexities</span>
              </div>
              <h4 className="text-sm font-bold text-slate-700 mt-1">Computational Bounds</h4>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Best Case</div>
                <div className="text-sm font-mono font-bold text-emerald-600 mt-1">{currentAlgoInfo.bestTime}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Average</div>
                <div className="text-sm font-mono font-bold text-amber-600 mt-1">{currentAlgoInfo.avgTime}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Worst Case</div>
                <div className="text-sm font-mono font-bold text-rose-600 mt-1">{currentAlgoInfo.worstTime}</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal pt-2">
              {currentAlgoInfo.bestTime === currentAlgoInfo.worstTime
                ? "This algorithm has deterministic performance regardless of input ordering."
                : "Best case occurs when elements are already arranged or near-sorted."}
            </p>
          </div>

          {/* Card 3: Space & Stability */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-500 text-sm font-bold">
                <Sliders className="w-4 h-4" />
                <span>Memory &amp; Stability</span>
              </div>
              <h4 className="text-sm font-bold text-slate-700 mt-1">Resource Overhead</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Auxiliary Space</div>
                <div className="text-sm font-mono font-bold text-brand-600 mt-1">{currentAlgoInfo.space}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] uppercase text-slate-500 font-bold">Stability</div>
                <div className={`text-sm font-bold mt-1 ${currentAlgoInfo.stable ? "text-emerald-600" : "text-amber-600"}`}>
                  {currentAlgoInfo.stable ? "Stable (Preserves Order)" : "Unstable Sort"}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-brand-50/70 border border-brand-200 text-[11px] text-brand-900 leading-normal">
              <strong>Tip for technical interviews:</strong>{" "}
              {currentAlgoInfo.stable
                ? "Stable sorts maintain the relative position of duplicate values."
                : "Unstable sorts may change the relative position of duplicate values."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
