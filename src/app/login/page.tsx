"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Lock,
  ArrowRight,
  ShieldAlert,
  Eye,
  EyeOff,
  Loader2,
  XCircle
} from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, isAdmin, signInWithGoogle, signInWithEmail, loading: authLoading } = useAuth();

  const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
  const isAccessDenied = searchParams.get("error") === "admin_required";

  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // If already logged in and has admin rights, redirect to requested admin page
  useEffect(() => {
    if (!authLoading && (user || profile) && isAdmin && isAccessDenied) {
      router.push(redirectUrl);
    }
  }, [user, profile, isAdmin, authLoading, isAccessDenied, redirectUrl, router]);

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage("");
      setIsGoogleSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setErrorMessage("Google Sign-In was interrupted or failed. Please try again.");
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const result = await signInWithEmail(email, password, role);
    setIsLoading(false);

    if (result.success) {
      if (role === "admin") {
        router.push(redirectUrl || "/admin/dashboard");
      } else {
        router.push("/");
      }
    } else {
      setErrorMessage(result.error || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md w-full space-y-5 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xl relative z-10">
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
        <p className="text-xs text-slate-500">Sign in to your student, teacher or administrator account</p>
      </div>

      {/* Access Denied Warning Banner if redirected from /admin */}
      {isAccessDenied && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-xs animate-in slide-in-from-top-2 duration-200">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-rose-900">Administrator Access Required</div>
            <div className="text-rose-700 leading-relaxed">
              The Admin Dashboard is restricted to administrators. Please sign in with an Administrator account.
            </div>
          </div>
        </div>
      )}

      {/* Error notification */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2.5 animate-in shake duration-200">
          <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Google One-Click Sign In */}
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
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
          or with credentials
        </span>
      </div>

      {/* Role Toggle */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Account Type:</label>
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          {(["student", "teacher", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                role === r
                  ? r === "admin"
                    ? "bg-rose-600 text-white shadow"
                    : "bg-brand-500 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r === "admin" ? "🛡️ Admin" : r}
            </button>
          ))}
        </div>
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
              placeholder={role === "admin" ? "admin@studentworld.edu" : "name@studentworld.edu"}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none transition-all"
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
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded bg-white border-slate-300 text-brand-500" />
            <span>Remember session</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
            role === "admin"
              ? "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-500/25"
              : "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-brand-500/25"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>{`Sign In as ${role.toUpperCase()}`}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-200 text-xs text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="text-brand-600 font-semibold hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-radial-gradient from-brand-500/5 via-transparent to-transparent pointer-events-none" />
      <Suspense
        fallback={
          <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
