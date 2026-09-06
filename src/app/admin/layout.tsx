"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Redirect unauthorized users immediately to login page with reason parameter
      const targetUrl = `/login?redirect=${encodeURIComponent(
        pathname || "/admin/dashboard"
      )}&error=admin_required`;
      router.replace(targetUrl);
    }
  }, [loading, isAdmin, router, pathname]);

  // Loading state while checking authentication & role from Firestore
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/40 text-brand-400 mx-auto flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Verifying Admin Privileges</h2>
            <p className="text-xs text-slate-400">
              Checking user permissions and Firestore role credentials...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-brand-400 font-mono pt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating Admin Session</span>
          </div>
        </div>
      </div>
    );
  }

  // Unauthorized state (prevents any flash of dashboard content before redirection completes)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-5 p-8 rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl animate-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
              Access Restricted
            </span>
            <h2 className="text-2xl font-extrabold text-white">Administrator Access Only</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You do not have permission to view the Admin Dashboard. Your current account role is{" "}
              <b className="text-amber-400 uppercase font-semibold">
                {profile?.role || "Student / Guest"}
              </b>
              . Redirecting you to the login portal...
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/login?redirect=${encodeURIComponent(
                pathname || "/admin/dashboard"
              )}&error=admin_required`}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Login Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin access
  return <>{children}</>;
}
