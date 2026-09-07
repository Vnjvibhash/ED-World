"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  Clock,
  Award,
  RotateCcw,
  LogOut,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Flame,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Play,
  Share2,
  Check,
} from "lucide-react";
import {
  quizQuestions,
  quizCategories,
  QuizQuestion,
  QuizDifficulty,
  QuizStageNumber,
  difficultyMeta,
  stageNames,
} from "@/data/quizQuestions";

interface QuestionResult {
  question: QuizQuestion;
  userAnswer: string | null;
  isCorrect: boolean;
  timeSpent: number;
}

export default function QuizPage() {
  // Game states:
  // "intro": Setup & selection lobby
  // "playing": Active question
  // "stage_transition": Interstitial celebration when a stage is cleared
  // "finished": Final results and analysis
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "stage_transition" | "finished"
  >("intro");

  // Selection configurations
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | "all">("easy");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [stageMode, setStageMode] = useState<"all_stages" | "single_stage">("all_stages");
  const [singleStageChoice, setSingleStageChoice] = useState<QuizStageNumber>(1);

  // Active runtime state
  const [currentStage, setCurrentStage] = useState<QuizStageNumber>(1);
  const [stageQuestions, setStageQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Scoring & Stats
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic timer configuration based on active question difficulty
  const activeDifficulty = useMemo<QuizDifficulty>(() => {
    if (selectedDifficulty !== "all") return selectedDifficulty;
    // In "all" gauntlet: Stage 1 is Easy, Stage 2 is Medium, Stage 3 is Hard
    if (currentStage === 1) return "easy";
    if (currentStage === 2) return "medium";
    return "hard";
  }, [selectedDifficulty, currentStage]);

  const timeLimit = difficultyMeta[activeDifficulty].timerSeconds;
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter available questions based on selections
  const getFilteredQuestionsForStage = (stageNum: QuizStageNumber): QuizQuestion[] => {
    return quizQuestions.filter((q) => {
      // Difficulty match
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // If "all" gauntlet mode, each stage corresponds to its native difficulty
      if (selectedDifficulty === "all") {
        const targetDiff: QuizDifficulty =
          stageNum === 1 ? "easy" : stageNum === 2 ? "medium" : "hard";
        if (q.difficulty !== targetDiff) return false;
      }

      // Stage match
      if (q.stage !== stageNum) return false;

      // Category match
      if (selectedCategory !== "All" && q.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  };

  // Start the entire Quiz session
  const startQuiz = () => {
    const initialStage: QuizStageNumber =
      stageMode === "single_stage" ? singleStageChoice : 1;

    const initialQs = getFilteredQuestionsForStage(initialStage);
    if (initialQs.length === 0) {
      alert("No questions found matching your filter criteria. Try selecting 'All' categories.");
      return;
    }

    setCurrentStage(initialStage);
    setStageQuestions(initialQs);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTotalPoints(0);
    setStreak(0);
    setMaxStreak(0);
    setQuestionResults([]);
    setTimeLeft(difficultyMeta[activeDifficulty].timerSeconds);
    setGameState("playing");
  };

  // Handle countdown timer
  useEffect(() => {
    if (gameState === "playing" && !isAnswered) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Time expired for this question
        handleTimeOut();
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, isAnswered, timeLeft]);

  // When time runs out
  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(null);
    setStreak(0);

    const currentQ = stageQuestions[currentQuestionIndex];
    if (currentQ) {
      setQuestionResults((prev) => [
        ...prev,
        {
          question: currentQ,
          userAnswer: null,
          isCorrect: false,
          timeSpent: timeLimit,
        },
      ]);
    }
  };

  // Option selection
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const currentQ = stageQuestions[currentQuestionIndex];
    const isCorrect = option === currentQ.answer;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      setScore((prev) => prev + 1);

      // Point calculation: base point + speed bonus + streak bonus
      const basePoints = difficultyMeta[currentQ.difficulty].pointValue;
      const speedBonus = Math.round((timeLeft / timeLimit) * 50);
      const streakBonus = Math.min(newStreak * 20, 100);
      setTotalPoints((prev) => prev + basePoints + speedBonus + streakBonus);
    } else {
      setStreak(0);
    }

    setQuestionResults((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: option,
        isCorrect,
        timeSpent: timeLimit - timeLeft,
      },
    ]);
  };

  // Progress to next question or trigger stage transition / finish
  const handleNext = () => {
    const isLastQuestionInStage = currentQuestionIndex + 1 >= stageQuestions.length;

    if (!isLastQuestionInStage) {
      // Proceed to next question in current stage
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);
      const nextQ = stageQuestions[nextIdx];
      setTimeLeft(difficultyMeta[nextQ.difficulty].timerSeconds);
    } else {
      // Last question in current stage reached!
      const canAdvanceStage = stageMode === "all_stages" && currentStage < 3;

      if (canAdvanceStage) {
        // Trigger celebratory stage transition interstitial
        try {
          confetti({
            particleCount: 60,
            spread: 55,
            origin: { y: 0.6 },
          });
        } catch {}
        setGameState("stage_transition");
      } else {
        // Finished all stages or completed chosen single stage
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch {}
        setGameState("finished");
      }
    }
  };

  // Advance from Stage Transition to the Next Stage
  const proceedToNextStage = () => {
    const nextStageNum = (currentStage + 1) as QuizStageNumber;
    const nextQuestions = getFilteredQuestionsForStage(nextStageNum);

    if (nextQuestions.length === 0) {
      setGameState("finished");
      return;
    }

    setCurrentStage(nextStageNum);
    setStageQuestions(nextQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);

    const nextDiff =
      selectedDifficulty === "all"
        ? nextStageNum === 2
          ? "medium"
          : "hard"
        : selectedDifficulty;
    setTimeLeft(difficultyMeta[nextDiff].timerSeconds);
    setGameState("playing");
  };

  const currentQ = stageQuestions[currentQuestionIndex];
  const timerPercentage = Math.max(0, (timeLeft / timeLimit) * 100);

  // Stage accuracy calculations for transition & finish
  const stageStats = useMemo(() => {
    const stats: Record<QuizStageNumber, { total: number; correct: number }> = {
      1: { total: 0, correct: 0 },
      2: { total: 0, correct: 0 },
      3: { total: 0, correct: 0 },
    };

    questionResults.forEach((r) => {
      const s = r.question.stage;
      stats[s].total += 1;
      if (r.isCorrect) stats[s].correct += 1;
    });

    return stats;
  }, [questionResults]);

  // Overall accuracy
  const totalQuestionsAnswered = questionResults.length;
  const overallAccuracy =
    totalQuestionsAnswered > 0 ? Math.round((score / totalQuestionsAnswered) * 100) : 0;

  // Mastery Rank Badge
  const masteryRank = useMemo(() => {
    if (totalQuestionsAnswered === 0) return { title: "Apprentice", icon: "🌱", color: "text-slate-600" };
    if (overallAccuracy >= 90) return { title: "Grandmaster Architect", icon: "👑", color: "text-amber-500" };
    if (overallAccuracy >= 75) return { title: "Senior Code Crafter", icon: "🥇", color: "text-emerald-500" };
    if (overallAccuracy >= 50) return { title: "Skilled Practitioner", icon: "🥈", color: "text-blue-500" };
    return { title: "Rising Apprentice", icon: "🥉", color: "text-slate-500" };
  }, [overallAccuracy, totalQuestionsAnswered]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `I scored ${score}/${totalQuestionsAnswered} (${overallAccuracy}%) with ${totalPoints} pts on Student World Interactive Quiz! Try it: ${window.location.href}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="quiz-page-wrapper">
      <div className="quiz-container px-4 sm:px-6">
        {/* ============================================================
            1. INTRO / LOBBY SCREEN (Difficulty & Stage Selection)
           ============================================================ */}
        {gameState === "intro" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Title Banner */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                <span>Multi-Tier Interactive Assessment</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Master Computer Science <br />
                <span className="text-accent-500 font-black">Stage by Stage</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Select your preferred difficulty tier or challenge the 3 progressive stages with dynamic time limits, live streaks, and instant explanations.
              </p>
            </div>

            {/* Main Selection Card */}
            <div className="quiz-main-card p-6 sm:p-8 space-y-8">
              {/* STEP 1: Select Difficulty Option */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Choose Your Challenge Difficulty
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Questions scale in depth &amp; complexity
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["easy", "medium", "hard"] as QuizDifficulty[]).map((diff) => {
                    const meta = difficultyMeta[diff];
                    const isSelected = selectedDifficulty === diff;

                    let selectedClass = "";
                    if (isSelected) {
                      if (diff === "easy") selectedClass = "selected-easy";
                      else if (diff === "medium") selectedClass = "selected-medium";
                      else if (diff === "hard") selectedClass = "selected-hard";
                    }

                    return (
                      <div
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`difficulty-selector-card ${selectedClass}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{meta.icon}</span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${meta.bgLight} ${meta.textLight}`}
                              >
                                {meta.timerSeconds}s / Q
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? diff === "easy"
                                      ? "border-emerald-500 bg-emerald-500 text-white"
                                      : diff === "medium"
                                      ? "border-amber-500 bg-amber-500 text-white"
                                      : "border-rose-500 bg-rose-500 text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          </div>

                          <h4 className="font-bold text-lg text-slate-900 mb-1">
                            {meta.label}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {meta.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                          <span className="text-accent-600 font-bold">
                            +{meta.pointValue} pts / ans
                          </span>
                          <span>3 Stages</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional "All Stages Gauntlet" option */}
                <div
                  onClick={() => setSelectedDifficulty("all")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedDifficulty === "all"
                      ? "border-accent-500 bg-accent-50/40 ring-2 ring-accent-500/20 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-500 to-amber-500 flex items-center justify-center text-white text-lg shadow-sm">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          All-Stages Gauntlet (Progressive Journey)
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-accent-100 text-accent-700 border border-accent-200">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Start at Stage 1 (Easy), climb to Stage 2 (Medium), and conquer Stage 3 (Hard) continuously!
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedDifficulty === "all"
                        ? "border-accent-500 bg-accent-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selectedDifficulty === "all" && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* STEP 2: Stage Mode & Category Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Stage Progression Mode */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Stage Progression Mode
                    </h3>
                  </div>

                  <div className="flex rounded-xl bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setStageMode("all_stages")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        stageMode === "all_stages"
                          ? "bg-white text-brand-600 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All 3 Stages (1 &rarr; 2 &rarr; 3)
                    </button>
                    <button
                      type="button"
                      onClick={() => setStageMode("single_stage")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        stageMode === "single_stage"
                          ? "bg-white text-brand-600 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Specific Stage Only
                    </button>
                  </div>

                  {stageMode === "single_stage" && (
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">Choose Stage:</span>
                      {([1, 2, 3] as QuizStageNumber[]).map((stg) => (
                        <button
                          key={stg}
                          type="button"
                          onClick={() => setSingleStageChoice(stg)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            singleStageChoice === stg
                              ? "bg-brand-500 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          Stage {stg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subject Category Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Subject Category Filter
                    </h3>
                  </div>

                  <div className="relative">
                    <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer shadow-xs"
                    >
                      {quizCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Filter across Web Dev, Python, Data Structures &amp; Algorithms, or SQL Databases.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  &larr; Back to Home
                </Link>

                <button
                  type="button"
                  onClick={startQuiz}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500 hover:opacity-95 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Challenge Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            2. PLAYING SCREEN (Active Question & Live Stepper)
           ============================================================ */}
        {gameState === "playing" && currentQ && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Stage Progression Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Stages Stepper */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {([1, 2, 3] as QuizStageNumber[]).map((stg) => {
                  const isCurrent = currentStage === stg;
                  const isCompleted = currentStage > stg;

                  return (
                    <div
                      key={stg}
                      className={`stage-step-badge ${
                        isCurrent
                          ? "bg-brand-500 text-white shadow-sm ring-2 ring-brand-500/25"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-400 opacity-70"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                          {stg}
                        </span>
                      )}
                      <span>Stage {stg}</span>
                    </div>
                  );
                })}
              </div>

              {/* Streak & Live Score */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {streak >= 2 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-accent-500 text-white text-xs font-black shadow-sm animate-streak">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>{streak}x Combo!</span>
                  </div>
                )}

                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Score
                  </div>
                  <div className="text-sm font-black text-brand-600 font-mono">
                    {totalPoints} pts
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Question Card */}
            <div className="quiz-main-card">
              {/* Question Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full ${
                      difficultyMeta[currentQ.difficulty].bgLight
                    } ${difficultyMeta[currentQ.difficulty].textLight} border ${
                      difficultyMeta[currentQ.difficulty].borderLight
                    }`}
                  >
                    {difficultyMeta[currentQ.difficulty].icon} {difficultyMeta[currentQ.difficulty].label}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">•</span>
                  <span className="text-xs font-bold text-slate-700">
                    {currentQ.category}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-colors ${
                    timeLeft <= 5
                      ? "bg-rose-100 text-rose-700 border border-rose-200 animate-timer-pulse"
                      : "bg-white text-slate-800 border border-slate-200 shadow-xs"
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? "text-rose-600" : "text-brand-500"}`} />
                  <span>{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s</span>
                </div>
              </div>

              {/* Timer Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100">
                <div
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5
                      ? "bg-rose-500"
                      : currentQ.difficulty === "easy"
                      ? "bg-emerald-500"
                      : currentQ.difficulty === "medium"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${timerPercentage}%` }}
                />
              </div>

              {/* Question Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question {currentQuestionIndex + 1} of {stageQuestions.length}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Code Snippet Box if available */}
                {currentQ.codeSnippet && (
                  <pre className="quiz-code-box">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options.map((option, idx) => {
                    const isCorrect = option === currentQ.answer;
                    const isUserPick = option === selectedOption;

                    let optionClasses = "quiz-option-btn";
                    if (isAnswered) {
                      if (isCorrect) {
                        optionClasses += " correct";
                      } else if (isUserPick) {
                        optionClasses += " incorrect";
                      } else {
                        optionClasses += " dimmed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        disabled={isAnswered}
                        className={`${optionClasses} cursor-pointer`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                              isAnswered && isCorrect
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : isAnswered && isUserPick
                                ? "bg-rose-600 text-white border-rose-600"
                                : "bg-slate-100 border-slate-200 text-slate-700"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm sm:text-base font-medium">{option}</span>
                        </div>

                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isUserPick && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Time Out Notice */}
                {isAnswered && !selectedOption && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Time ran out for this question! Keep your momentum on the next one.</span>
                  </div>
                )}

                {/* Explanation Card */}
                {isAnswered && currentQ.explanation && (
                  <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200 text-xs text-slate-700 space-y-1 animate-in fade-in duration-150">
                    <div className="font-bold text-brand-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                      <span>Key Takeaway &amp; Explanation:</span>
                    </div>
                    <p className="leading-relaxed pl-5">{currentQ.explanation}</p>
                  </div>
                )}
              </div>

              {/* Question Footer Controls */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to end your current quiz session?")) {
                      setGameState("intro");
                    }
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Quit to Lobby
                </button>

                {isAnswered ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 to-accent-500 hover:opacity-95 shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>
                      {currentQuestionIndex + 1 >= stageQuestions.length
                        ? currentStage < 3 && stageMode === "all_stages"
                          ? "Complete Stage →"
                          : "Finish Quiz →"
                        : "Next Question"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Select an answer to proceed
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            3. STAGE TRANSITION CELEBRATION (Stage-by-Stage Milestone)
           ============================================================ */}
        {gameState === "stage_transition" && (
          <div className="quiz-main-card p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200 max-w-xl mx-auto shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-accent-500 to-amber-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-accent-500/25">
              🏆
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Milestone Reached!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Stage {currentStage} Cleared!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {stageNames[currentStage].title} — {stageNames[currentStage].subtitle}
              </p>
            </div>

            {/* Stage Performance Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-400">Stage Accuracy</div>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {stageStats[currentStage].correct} / {stageStats[currentStage].total}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400">Total Points</div>
                <div className="text-xl font-black text-brand-600 font-mono">
                  {totalPoints} pts
                </div>
              </div>
            </div>

            {/* Next Stage Preview */}
            <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 text-left space-y-1">
              <div className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-brand-500" />
                <span>Up Next: Stage {currentStage + 1} ({stageNames[(currentStage + 1) as QuizStageNumber].title})</span>
              </div>
              <p className="text-xs text-slate-600 pl-5">
                Questions will escalate in complexity to test your intermediate logic and real-world implementation skills!
              </p>
            </div>

            <button
              type="button"
              onClick={proceedToNextStage}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500 hover:opacity-95 shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Advance to Stage {currentStage + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============================================================
            4. FINISHED / COMPREHENSIVE RESULTS SCREEN
           ============================================================ */}
        {gameState === "finished" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Results Card */}
            <div className="quiz-main-card p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-500 flex items-center justify-center text-4xl shadow-sm">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                  Assessment Completed!
                </h2>
                <p className="text-slate-500 text-sm">
                  Here is your performance breakdown across all evaluated stages
                </p>
              </div>

              {/* Mastery Badge Card */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-brand-500 text-white shadow-md">
                <span className="text-xl">{masteryRank.icon}</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-white/70">Mastery Rank</div>
                  <div className="text-sm font-black text-accent-300">{masteryRank.title}</div>
                </div>
              </div>

              {/* 4 Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-400">Total Score</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                    {score} / {totalQuestionsAnswered}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-400">Accuracy</div>
                  <div className="text-2xl font-black text-emerald-600 font-mono mt-0.5">
                    {overallAccuracy}%
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-400">Total Points</div>
                  <div className="text-2xl font-black text-brand-600 font-mono mt-0.5">
                    {totalPoints}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-400">Max Streak</div>
                  <div className="text-2xl font-black text-amber-500 font-mono mt-0.5">
                    {maxStreak}🔥
                  </div>
                </div>
              </div>

              {/* Stage by Stage Breakdown */}
              <div className="max-w-2xl mx-auto pt-4 border-t border-slate-100 text-left space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Stage by Stage Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([1, 2, 3] as QuizStageNumber[]).map((stg) => {
                    const st = stageStats[stg];
                    if (st.total === 0) return null;
                    const stageAcc = Math.round((st.correct / st.total) * 100);

                    return (
                      <div
                        key={stg}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Stage {stg}</span>
                          <span
                            className={
                              stageAcc >= 75
                                ? "text-emerald-600"
                                : stageAcc >= 50
                                ? "text-amber-600"
                                : "text-slate-500"
                            }
                          >
                            {stageAcc}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-brand-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${stageAcc}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-400 pt-0.5">
                          {st.correct} of {st.total} correct
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 to-accent-500 hover:opacity-95 shadow-md shadow-brand-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Quiz</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGameState("intro")}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Change Difficulty &amp; Category</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? "Copied!" : "Share Result"}</span>
                </button>
              </div>
            </div>

            {/* Expandable Question Review Section */}
            <div className="quiz-main-card p-6 sm:p-8 space-y-4">
              <button
                type="button"
                onClick={() => setReviewOpen(!reviewOpen)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Review All Questions &amp; Answers
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Inspect your selections, correct answers, and detailed explanations
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  {reviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {reviewOpen && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
                  {questionResults.map((result, idx) => {
                    const q = result.question;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border text-left space-y-2.5 ${
                          result.isCorrect
                            ? "bg-emerald-50/40 border-emerald-200"
                            : "bg-rose-50/40 border-rose-200"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 font-bold">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                                result.isCorrect ? "bg-emerald-600" : "bg-rose-600"
                              }`}
                            >
                              {result.isCorrect ? "✓" : "✗"}
                            </span>
                            <span className="text-slate-900">Question {idx + 1}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">Stage {q.stage} ({q.difficulty})</span>
                          </div>
                          <span className="text-slate-400 font-mono">{result.timeSpent}s spent</span>
                        </div>

                        <p className="font-bold text-sm text-slate-900">{q.question}</p>

                        {q.codeSnippet && (
                          <pre className="quiz-code-box text-xs">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              result.isCorrect
                                ? "bg-emerald-100/60 border-emerald-300 text-emerald-900 font-medium"
                                : "bg-rose-100/60 border-rose-300 text-rose-900 font-medium"
                            }`}
                          >
                            <span className="font-bold">Your Choice: </span>
                            {result.userAnswer || "(Timed out / No answer)"}
                          </div>
                          <div className="p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-300 text-emerald-900 font-medium">
                            <span className="font-bold">Correct Answer: </span>
                            {q.answer}
                          </div>
                        </div>

                        {q.explanation && (
                          <p className="text-xs text-slate-600 bg-white/70 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                            <strong className="text-slate-900">Explanation: </strong>
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
