"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Send,
  X,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Code2,
  ArrowUpRight,
  ChevronDown,
  Terminal,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  contextData?: {
    problemTitle?: string;
    language?: string;
    code?: string;
  };
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome_1",
  role: "assistant",
  content: `👋 Hello! I am your **Student World AI Coding & DSA Tutor**.

I can help you with:
- 💡 **Algorithm Hints & Strategies:** Guiding your intuition without spoiling full answers.
- ⏱️ **Big-O Complexity Analysis:** Breaking down Time & Space complexities.
- 🐞 **Debugging Common Errors:** Fixing Segmentation Faults, TLE, out-of-bounds, and edge cases.
- 💻 **Syntax & Multi-Language Support:** Best practices in C++, Python, Java, C, and JavaScript.

What would you like to solve or learn today?`,
  timestamp: "Just now",
  suggestions: [
    "⚡ Two Sum Hint",
    "⏱️ Explain Big-O Complexity",
    "🔍 Binary Search vs Linear Search",
    "🐞 Help me debug an error",
    "🌲 Array vs Linked List",
  ],
};

export function AIChatBot({ isOpen, onClose, contextData }: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("ed_world_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {}
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("ed_world_chat_history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        id: `welcome_${Date.now()}`,
        timestamp: "Just now",
      },
    ]);
    try {
      localStorage.removeItem("ed_world_chat_history");
    } catch {}
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend !== undefined ? textToSend : input).trim();
    if (!userText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          context: contextData,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: data.suggestions || [],
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to receive AI response");
      }
    } catch (err: unknown) {
      const error = err as Error;
      const errorMessage: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        role: "assistant",
        content: `⚠️ Sorry, I encountered an issue: ${error.message}. Please try asking again or select a suggested topic.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: ["⚡ Two Sum Hint", "⏱️ Explain Big-O Complexity", "🐞 Debug My Code"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyCode = (codeText: string, blockId: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(blockId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Helper to render markdown-like content (code blocks, bold, lists, tables)
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, idx) => {
      // Code block
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        let languageTag = "code";
        let codeBody = part.slice(3, -3);

        if (lines[0] && !lines[0].includes(" ") && lines.length > 1) {
          languageTag = lines[0].trim();
          codeBody = lines.slice(1).join("\n");
        }

        const blockId = `code_${idx}_${codeBody.slice(0, 8)}`;
        const isCopied = copiedCodeId === blockId;

        return (
          <div key={idx} className="my-2.5 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold uppercase tracking-wider">{languageTag}</span>
              <button
                onClick={() => handleCopyCode(codeBody, blockId)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                title="Copy snippet"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-slate-200 leading-relaxed whitespace-pre">
              <code>{codeBody}</code>
            </pre>
          </div>
        );
      }

      // Regular text with inline markdown
      const lines = part.split("\n");
      return (
        <div key={idx} className="space-y-1">
          {lines.map((line, lineIdx) => {
            // Heading 3
            if (line.startsWith("### ")) {
              return (
                <h4 key={lineIdx} className="font-bold text-slate-100 text-sm mt-2 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8000]" />
                  <span>{line.replace("### ", "")}</span>
                </h4>
              );
            }
            // Heading 4
            if (line.startsWith("#### ")) {
              return (
                <h5 key={lineIdx} className="font-semibold text-white text-xs mt-1.5 mb-0.5 text-slate-200">
                  {line.replace("#### ", "")}
                </h5>
              );
            }
            // Bullet item
            if (line.startsWith("- ") || line.startsWith("* ")) {
              const text = line.slice(2);
              return (
                <div key={lineIdx} className="flex items-start gap-1.5 pl-1.5 my-0.5 text-slate-300">
                  <span className="text-[#FF8000] font-bold">•</span>
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(text) }} />
                </div>
              );
            }
            // Numbered list
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={lineIdx} className="flex items-start gap-1.5 pl-1.5 my-0.5 text-slate-300">
                  <span className="text-blue-400 font-bold">{line.match(/^\d+\./)?.[0]}</span>
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.replace(/^\d+\.\s*/, "")) }} />
                </div>
              );
            }
            // Empty line
            if (!line.trim()) {
              return <div key={lineIdx} className="h-1" />;
            }

            return (
              <p key={lineIdx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
            );
          })}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (str: string) => {
    return str
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      // Inline Code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded border border-slate-800">$1</code>');
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isExpanded
          ? "bottom-4 right-4 sm:right-6 left-4 sm:left-auto sm:w-[680px] h-[680px] max-h-[92vh]"
          : "bottom-24 right-4 sm:right-6 left-4 sm:left-auto sm:w-[420px] h-[580px] max-h-[80vh]"
      } flex flex-col bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5`}
    >
      {/* Top Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#173E67] to-[#FF8000] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Student World AI Tutor</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-[10px] text-slate-400">DSA, Code &amp; Logic Guidance</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title={isExpanded ? "Standard view" : "Expand window"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
            title="Close AI Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Problem Context Badge */}
      {contextData?.problemTitle && (
        <div className="px-3 py-1.5 bg-slate-950 border-b border-slate-850 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300 truncate">
            <Lightbulb className="w-3 h-3 text-[#FF8000] flex-shrink-0" />
            <span className="text-slate-400">Context:</span>
            <span className="font-bold text-white truncate">{contextData.problemTitle}</span>
            {contextData.language && (
              <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                {contextData.language}
              </span>
            )}
          </div>
          <button
            onClick={() => handleSendMessage(`Can you give me an algorithmic hint for ${contextData.problemTitle}?`)}
            className="text-[10px] font-bold text-blue-400 hover:text-blue-300 ml-2 flex-shrink-0"
          >
            Get Hint →
          </button>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs text-slate-200">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 px-1">
                {isUser ? (
                  <>
                    <span>You</span>
                    <span>• {msg.timestamp}</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-[#FF8000]" />
                    <span>AI Tutor</span>
                    <span>• {msg.timestamp}</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-gradient-to-r from-blue-600 to-[#173E67] text-white rounded-tr-none font-medium"
                    : "bg-slate-950/80 border border-slate-800 text-slate-300 rounded-tl-none"
                }`}
              >
                {renderFormattedContent(msg.content)}
              </div>

              {/* Follow-up Suggestion Chips (for assistant messages) */}
              {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 pl-1 max-w-[90%]">
                  {msg.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>{sug}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Animated State */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 text-xs mt-1">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
              <span>AI Tutor is formulating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
        <div className="relative flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Ask a question, request a hint, or paste code to debug..."
            className="w-full p-2.5 bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs resize-none leading-relaxed"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-[#173E67] hover:from-blue-500 hover:to-[#1e4a77] text-white shadow-md shadow-blue-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
            title="Send message (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
          <span>Press <strong>Enter</strong> to send • <strong>Shift+Enter</strong> for newline</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF8000]" />
            <span>Student World Intelligent Assistant</span>
          </span>
        </div>
      </div>
    </div>
  );
}
