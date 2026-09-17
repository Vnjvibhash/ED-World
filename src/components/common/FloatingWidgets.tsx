"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Bot } from "lucide-react";
import { AIChatBot } from "@/components/chat/AIChatBot";

export function FloatingWidgets() {
  const [showBot, setShowBot] = useState(false);
  const [contextData, setContextData] = useState<{
    problemTitle?: string;
    language?: string;
    code?: string;
  } | undefined>(undefined);

  const openWhatsApp = () => {
    window.open("https://wa.me/917762974716?text=Hello%20Student World%20Team", "_blank");
  };

  // Support opening AI Tutor from any page (e.g. Practice Arena) via custom event
  useEffect(() => {
    const handleOpenWithContext = (
      e: CustomEvent<{ problemTitle?: string; language?: string; code?: string }>
    ) => {
      if (e.detail) {
        setContextData(e.detail);
      }
      setShowBot(true);
    };

    window.addEventListener("open-ai-tutor" as any, handleOpenWithContext as any);
    return () => {
      window.removeEventListener("open-ai-tutor" as any, handleOpenWithContext as any);
    };
  }, []);

  return (
    <>
      {/* Floating Action Buttons (Icon/Logo Only) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="relative w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-500/40 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group"
          aria-label="Chat on WhatsApp"
          title="WhatsApp Us"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute right-14 px-2.5 py-1 bg-slate-900/90 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
            WhatsApp Us
          </span>
        </button>

        {/* AI Coding & DSA Tutor Button */}
        <button
          onClick={() => setShowBot(!showBot)}
          className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#173E67] to-[#FF8000] hover:from-[#1d4b7c] hover:to-[#f07900] text-white shadow-xl hover:shadow-orange-500/30 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group border border-white/20"
          aria-label="Open AI Coding Tutor"
          title="Student World AI Tutor"
        >
          <Bot className="w-6 h-6 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
          <span className="absolute right-14 px-2.5 py-1 bg-slate-900/90 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
            Student World AI Tutor
          </span>
        </button>
      </div>

      {/* Native Interactive AI Chatbot Window */}
      <AIChatBot
        isOpen={showBot}
        onClose={() => setShowBot(false)}
        contextData={contextData}
      />
    </>
  );
}

