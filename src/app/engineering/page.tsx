"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  Download,
  FileText,
  Sparkles,
  ArrowRight,
  Layers,
  Code2
} from "lucide-react";
import { departments } from "@/data/departments";

export default function EngineeringPage() {
  const cse = departments.find((d) => d.id === "cse") || departments[0];
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const activeSemData = cse.semesters?.find((s) => s.semester === selectedSemester);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Header */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-accent-500" />
              <span>Department of Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Computer Science &amp; <span className="text-accent-500">Engineering</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore semester-wise curriculums, standard reference notes, syllabus outlines, and laboratory assignments engineered for top academic and placement performance.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Semester Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-500" />
                <span>Semester Curriculum &amp; Notes</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Select your active semester to view course modules</p>
            </div>

            <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              {[1, 2, 3, 4].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedSemester === sem
                      ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Semester {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSemData?.subjects.map((sub) => (
              <div
                key={sub.code}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-accent-500/50 transition-all glow-hover flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-100 font-bold">
                      {sub.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Credits: {sub.credits}.0</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 pt-1">{sub.title}</h3>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Link
                    href="/practice"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Practice Labs</span>
                  </Link>

                  <Link
                    href="/assignment"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Assignments</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Departments Links */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Other Departments &amp; Streams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {departments.filter((d) => d.id !== "cse").map((dept) => (
              <Link
                key={dept.id}
                href={`/departments/${dept.slug}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:bg-white transition-all glow-hover flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-accent-500 transition-colors text-sm">{dept.name}</h4>
                  <span className="text-xs text-slate-500">{dept.category}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
