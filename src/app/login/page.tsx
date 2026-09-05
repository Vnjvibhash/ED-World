"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }, 1000);
  };

  const fillDemoAdmin = () => {
    setRole("admin");
    setEmail("admin@studentworld.edu");
    setPassword("admin12345");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-radial-gradient from-brand-500/5 via-transparent to-transparent pointer-events-none" />

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
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back!</h2>
          <p className="text-xs text-slate-500">Sign in to your student or faculty account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          {(["student", "teacher", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-all ${
                role === r
                  ? "bg-brand-500 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email Address *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@studentworld.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Password *</label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-brand-600 hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-white border-slate-300 text-brand-500" />
              <span>Remember me</span>
            </label>
            {role === "admin" && (
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="text-brand-600 hover:underline font-semibold"
              >
                Demo Admin Credentials
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25 glow-hover transition-all flex items-center justify-center gap-2"
          >
            <span className="text-white">{isLoading ? "Signing in..." : `Login as ${role.toUpperCase()}`}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-200 text-xs text-slate-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-brand-600 font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
