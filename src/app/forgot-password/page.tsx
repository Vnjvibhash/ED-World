"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block relative w-40 h-10 mb-2">
            <Image
              src="/assets/brand/logo.png"
              alt="Student World Logo"
              fill
              className="object-contain"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your registered email and we will send recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Check Your Email</h3>
            <p className="text-xs text-slate-500">
              We have dispatched a password reset link to <strong className="text-slate-900">{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Registered Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25 glow-hover transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span className="text-white">{loading ? "Sending..." : "Send Reset Link"}</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
