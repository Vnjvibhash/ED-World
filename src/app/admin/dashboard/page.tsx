"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingDown,
  UserPlus,
  PieChart,
  Users,
  Settings,
  ArrowRight,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  Layers,
  GraduationCap
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "New Orders / Enrollments",
      value: "150",
      change: "+12% this month",
      icon: ShoppingBag,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/users"
    },
    {
      title: "Platform Bounce Rate",
      value: "53%",
      change: "-4.2% improved",
      icon: TrendingDown,
      color: "from-emerald-500 to-teal-500",
      link: "#"
    },
    {
      title: "User Registrations",
      value: "44",
      change: "+8 new today",
      icon: UserPlus,
      color: "from-amber-500 to-orange-500",
      link: "/admin/users"
    },
    {
      title: "Unique Daily Visitors",
      value: "65",
      change: "+28% organic traffic",
      icon: PieChart,
      color: "from-rose-500 to-pink-500",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Top Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Platform Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Users className="w-4 h-4 text-brand-600" />
              <span>User Directory</span>
            </Link>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4 text-brand-600" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-brand-500/50 transition-all glow-hover flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">{st.title}</span>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${st.color} text-white shadow`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">{st.value}</div>
                  <div className="text-xs text-brand-600 font-medium">{st.change}</div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link
                    href={st.link}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium"
                  >
                    <span>More info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics & Quick Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Submissions */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600" />
                <span>Recent Student Activity &amp; Submissions</span>
              </h3>
              <Link href="/admin/users" className="text-xs text-brand-600 hover:underline font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Rahul Sharma submitted Assignment 2</div>
                  <div className="text-xs text-slate-500">CSE Semester 4 • 10 minutes ago</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                  Graded (48/50)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Priya Patel completed General Web Quiz</div>
                  <div className="text-xs text-slate-500">Score: 5/5 • 42 minutes ago</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                  100% Score
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Aman Verma enrolled in Bronze Membership</div>
                  <div className="text-xs text-slate-500">Department: Management • 2 hours ago</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  New Member
                </span>
              </div>
            </div>
          </div>

          {/* Quick System Status */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">System Status</h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Compiler Server</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">● Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Quiz Engine</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">● 99.9% Uptime</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Cloud Storage</span>
                <span className="text-brand-600 font-bold">14.2 GB / 100 GB</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Framework</span>
                <span className="text-slate-600 font-mono">Next.js 15 (App Router)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
