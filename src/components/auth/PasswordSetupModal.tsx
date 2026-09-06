"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  KeyRound,
  X,
  Sparkles,
  Loader2,
  Database
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function PasswordSetupModal() {
  const { user, profile, isPasswordModalOpen, closePasswordModal, savePasswordHash } =
    useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation rules
  const hasMinLength = password.length >= 8;
  const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const isMatching = password.length > 0 && password === confirmPassword;

  // Password strength calculation
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (hasMinLength) score++;
    if (hasNumberOrSpecial) score++;
    if (hasUppercase) score++;

    if (score <= 1) return { text: "Weak", color: "bg-rose-500", width: "w-1/4" };
    if (score === 2) return { text: "Fair", color: "bg-amber-500", width: "w-2/4" };
    if (score === 3) return { text: "Good", color: "bg-blue-500", width: "w-3/4" };
    return { text: "Strong & Secure", color: "bg-emerald-500", width: "w-full" };
  }, [password, hasMinLength, hasNumberOrSpecial, hasUppercase]);

  const canSubmit = hasMinLength && isMatching && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!hasMinLength) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (!isMatching) {
      setErrorMessage("Password and Re-entered password do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await savePasswordHash(password);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword("");
        setConfirmPassword("");
        closePasswordModal();
      }, 1600);
    } else {
      setErrorMessage(result.error || "Failed to save password. Please try again.");
    }
  };

  if (!isPasswordModalOpen || !user) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={closePasswordModal}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 p-6 text-white relative">
          <button
            onClick={closePasswordModal}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <KeyRound className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  {profile?.hasPasswordSet ? "Update Master Password" : "Set Security Password"}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  Firestore
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Google authenticated • Setup account security
              </p>
            </div>
          </div>

          {/* Authenticated User pill */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2.5 text-xs text-white/90">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Google User"
                width={26}
                height={26}
                className="rounded-full border border-white/40"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-[11px] font-bold">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <div className="overflow-hidden truncate">
              <span className="font-semibold">{user.displayName || "Google User"}</span>{" "}
              <span className="opacity-75 font-mono text-[11px]">({user.email})</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Password Successfully Hashed &amp; Stored!
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Salted SHA-256 master hash has been safely committed to Firestore under your user account profile.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Firestore Record Updated</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-2.5">
                <Database className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>
                  Please enter and re-enter your security password. It will be validated and cryptographically hashed with <b className="text-slate-800">SHA-256 + Salt</b> before storing in Firestore.
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Enter Password *</span>
                  {password.length > 0 && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      Strength: <span className="font-bold">{strength.text}</span>
                    </span>
                  )}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter at least 8 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strength.color} ${strength.width} transition-all duration-300 rounded-full`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Re-Enter Password for Validation *
                  </label>
                  {confirmPassword.length > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-bold">
                      {isMatching ? (
                        <span className="text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Matches
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-0.5">
                          <XCircle className="w-3.5 h-3.5" /> Does not match
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type your password"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all ${
                      confirmPassword.length > 0
                        ? isMatching
                          ? "border-emerald-500 focus:border-emerald-600 bg-emerald-50/20"
                          : "border-rose-300 focus:border-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:border-brand-500 focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Requirement Checklist */}
              <div className="space-y-1.5 pt-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  {hasMinLength ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                  <span>At least 8 characters length</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isMatching ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  )}
                  <span>Both password fields match identically</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    canSubmit
                      ? "bg-gradient-to-r from-brand-600 to-accent-500 hover:opacity-95 shadow-brand-500/25 cursor-pointer active:scale-[0.99]"
                      : "bg-slate-300 text-slate-500 shadow-none cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Hashing &amp; Storing to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Validate &amp; Save Hash to Firestore</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Skip for Now (Set Later in Profile)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
