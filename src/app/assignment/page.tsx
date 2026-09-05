"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Filter
} from "lucide-react";
import { sampleAssignments } from "@/data/courses";

export default function AssignmentPage() {
  const [filterDept, setFilterDept] = useState("All");

  const filteredAssignments =
    filterDept === "All"
      ? sampleAssignments
      : sampleAssignments.filter((a) => a.department.includes(filterDept));

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Academic Submissions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Assignments &amp; <span className="text-accent-500">Tasks</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Track course problem sets, coding assignments, and semester research papers. Submit your work before the deadline to earn course credits.
            </p>
          </div>

          <Link
            href="/assignment-upload"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 shadow-lg shadow-accent-500/25 glow-hover transition-all text-sm shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Assignment</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 max-w-md shadow-sm">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          <span className="text-xs text-slate-500 font-medium">Filter Department:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-accent-500 flex-1"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science &amp; Engg</option>
            <option value="Management">Management &amp; Commerce</option>
          </select>
        </div>

        {/* Assignment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssignments.map((task) => (
            <div
              key={task.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-accent-500/50 transition-all glow-hover flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-100 text-xs font-semibold">
                    {task.semester}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due: {task.dueDate}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{task.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Department: <strong className="text-slate-800">{task.department}</strong></span>
                  <span>Marks: <strong className="text-accent-600 font-bold">{task.totalMarks} Pts</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/assignment-upload?taskId=${task.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Work</span>
                  </Link>

                  <Link
                    href="/practice"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    <span>Test in IDE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
