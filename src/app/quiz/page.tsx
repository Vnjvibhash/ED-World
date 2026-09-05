"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Filter
} from "lucide-react";
import { quizQuestions, quizCategories, QuizQuestion } from "@/data/quizQuestions";

const TIME_PER_QUESTION = 15;

export default function QuizPage() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter questions on category change
  useEffect(() => {
    if (selectedCategory === "All") {
      setActiveQuestions(quizQuestions);
    } else {
      setActiveQuestions(quizQuestions.filter((q) => q.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Handle countdown timer during game
  useEffect(() => {
    if (gameState === "playing" && !isAnswered) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Time ran out!
        setIsAnswered(true);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, isAnswered, timeLeft]);

  const startQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(TIME_PER_QUESTION);
    setGameState("playing");
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const currentQ = activeQuestions[currentIndex];
    if (option === currentQ.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setGameState("finished");
      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];
  const timerPercentage = (timeLeft / TIME_PER_QUESTION) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>Interactive Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ED-World <span className="text-accent-500">Interactive Quiz</span>
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Test your computer science, web technologies, and programming knowledge with live countdowns.
          </p>
        </div>

        {/* 1. INTRO / RULES SCREEN */}
        {gameState === "intro" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-accent-500" />
                <span>Quiz Rules &amp; Guidelines</span>
              </h2>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2 outline-none focus:border-accent-500"
                >
                  {quizCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({cat === "All" ? quizQuestions.length : quizQuestions.filter((q) => q.category === cat).length} Qs)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-accent-600">1.</span>
                <span>You will have only <strong className="text-accent-600">15 seconds</strong> per question.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-accent-600">2.</span>
                <span>Once you select your answer, it cannot be undone.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-accent-600">3.</span>
                <span>You cannot select any option once the 15-second timer runs out.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-accent-600">4.</span>
                <span>Points are awarded based on accuracy and speed.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={startQuiz}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md shadow-accent-500/25 glow-hover transition-all"
              >
                Start Quiz Now →
              </button>
            </div>
          </div>
        )}

        {/* 2. PLAYING SCREEN */}
        {gameState === "playing" && currentQ && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Top Bar with Timer */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-accent-600">
                  {currentQ.category}
                </span>
                <div className="text-sm font-semibold text-slate-900">Awesome Quiz Challenge</div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-mono font-bold shadow-sm">
                <Clock className={`w-4 h-4 ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-accent-500"}`} />
                <span className={timeLeft <= 5 ? "text-red-500 font-bold" : "text-slate-900"}>
                  {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                </span>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? "bg-red-500" : "bg-gradient-to-r from-brand-500 to-accent-500"
                }`}
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentIndex + 1}. {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, idx) => {
                  const isCorrect = option === currentQ.answer;
                  const isUserPick = option === selectedOption;

                  let optionStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-accent-500 hover:bg-accent-50/40";

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold";
                    } else if (isUserPick) {
                      optionStyle = "bg-red-50 border-red-500 text-red-800 font-semibold";
                    } else {
                      optionStyle = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-center justify-between transition-all ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isUserPick && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {isAnswered && currentQ.explanation && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong className="text-accent-600">Explanation: </strong> {currentQ.explanation}
                </div>
              )}
            </div>

            {/* Footer with Question Progress & Next Button */}
            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">
                Question <strong className="text-slate-900">{currentIndex + 1}</strong> of <strong className="text-slate-900">{activeQuestions.length}</strong>
              </span>

              {isAnswered ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{currentIndex + 1 === activeQuestions.length ? "Finish Quiz" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-slate-500 italic">Select an option to proceed</span>
              )}
            </div>
          </div>
        )}

        {/* 3. FINISHED / RESULT SCREEN */}
        {gameState === "finished" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-500 shadow-sm">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Quiz Completed!</h2>
              <p className="text-slate-500 text-sm mt-1">Here is your performance summary</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-2">
              <div className="text-4xl font-extrabold text-accent-600">
                {score} / {activeQuestions.length}
              </div>
              <p className="text-xs text-slate-500">
                Accuracy: {Math.round((score / activeQuestions.length) * 100)}%
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-600">
                {score === activeQuestions.length
                  ? "🌟 Perfect Score! Outstanding Mastery!"
                  : score >= activeQuestions.length / 2
                  ? "👍 Great job! Keep practicing to master all topics."
                  : "💡 Keep learning and try again to improve your score."}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 transition-all text-sm shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Quiz</span>
              </button>
              <button
                onClick={() => setGameState("intro")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Change Category</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
