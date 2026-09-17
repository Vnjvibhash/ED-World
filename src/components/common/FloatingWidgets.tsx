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
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 text-sm font-semibold group"
          aria-label="Chat on WhatsApp"
        >
          <span className="hidden sm:inline">WhatsApp Us</span>
          <MessageCircle className="w-5 h-5 text-white" />
        </button>

        {/* AI Coding & DSA Tutor Button */}
        <button
          onClick={() => setShowBot(!showBot)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#173E67] to-[#FF8000] hover:from-[#1d4b7c] hover:to-[#f07900] text-white shadow-xl hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1 text-sm font-bold group border border-white/20"
          aria-label="Open AI Coding Tutor"
        >
          <span className="hidden sm:inline">AI Tutor</span>
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
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

