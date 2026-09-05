"use client";

import React, { useState } from "react";
import { MessageCircle, Bot, X, PhoneCall } from "lucide-react";

export function FloatingWidgets() {
  const [showBot, setShowBot] = useState(false);

  const openWhatsApp = () => {
    window.open("https://wa.me/917762974716?text=Hello%20ED-World%20Team", "_blank");
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 text-sm font-semibold group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </button>

        {/* AI Assistant Button */}
        <button
          onClick={() => setShowBot(!showBot)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-xl hover:shadow-brand-500/30 transition-all transform hover:-translate-y-1 text-sm font-semibold group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">AI Help</span>
        </button>
      </div>

      {/* Embedded Dialogflow Assistant Modal */}
      {showBot && (
        <div className="fixed bottom-20 left-6 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-400" />
              <span className="font-semibold text-sm">ED-World AI Assistant</span>
            </div>
            <button
              onClick={() => setShowBot(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-96 w-full bg-slate-950">
            <iframe
              allow="microphone;"
              width="100%"
              height="100%"
              src="https://console.dialogflow.com/api-client/demo/embedded/421c0947-33b9-4b9b-95d7-d666efab5813"
              className="border-none"
              title="Dialogflow Chatbot"
            />
          </div>
        </div>
      )}
    </>
  );
}
