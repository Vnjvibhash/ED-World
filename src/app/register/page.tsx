"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user, signInWithGoogle, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  // If logged in, redirect home
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  // Dynamic age calculation from DOB
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDob(selectedDate);
    if (!selectedDate) {
      setAge("");
      return;
    }
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge >= 0 ? calculatedAge : 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-radial-gradient from-brand-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-xl w-full space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block relative w-40 h-10 mb-2">
            <Image
              src="/assets/brand/logo.png"
              alt="Student World Logo"
              fill
              className="object-contain"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900">Create Student Account</h2>
          <p className="text-xs text-slate-500">Join the thousands of learners advancing with Student World</p>
        </div>

        {/* Google One-Click Registration */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleSigningIn}
          className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
        >
          {isGoogleSigningIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
            or register manually
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vivek Kumar"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email Address *</label>
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

          {/* DOB & Auto Calculated Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Date of Birth *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={handleDobChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-brand-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Calculated Age (Years)</label>
              <input
                type="text"
                readOnly
                value={age !== "" ? `${age} years old` : "Auto-calculated"}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-brand-600 font-mono font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Desired Stream / Department *</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:border-brand-500 focus:bg-white outline-none"
            >
              <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics &amp; Communication</option>
              <option value="Management & Commerce">Management &amp; Commerce</option>
              <option value="Public Health">Public Health</option>
              <option value="Arts & Creative Designs">Arts &amp; Creative Designs</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Create Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25 glow-hover transition-all flex items-center justify-center gap-2"
          >
            <span className="text-white">{isSubmitting ? "Creating Profile..." : "Register Now"}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-200 text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="text-brand-600 font-semibold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
