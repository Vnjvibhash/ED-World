"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  ChevronLeft,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Clock,
  Check
} from "lucide-react";
import { departments } from "@/data/departments";

export default function DepartmentDetailPage() {
  const params = useParams();
  const slug = params?.dept as string;

  const dept = departments.find((d) => d.slug === slug) || departments[1];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-accent-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Departments</span>
        </Link>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase bg-accent-50 text-accent-600 border border-accent-200">
                <GraduationCap className="w-4 h-4 text-accent-500" />
                <span>{dept.category} Stream</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {dept.name}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {dept.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-500" />
                  <span>🎓 <strong className="text-slate-900">{dept.studentsEnrolled}+</strong> Enrolled Scholars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent-500" />
                  <span>📚 <strong className="text-slate-900">{dept.totalCourses}</strong> Active Modules</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Curriculum Highlights */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Curriculum Highlights</h2>
              <p className="text-sm text-slate-500">Essential components covered under this discipline</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 border border-brand-100 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Structured Foundation</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Step-by-step conceptual walkthroughs curated by leading academic faculty and engineering practitioners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 border border-accent-100 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Practical Case Studies</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Hands-on problem sets, code labs, and research reports applying theory directly to real-world industrial tasks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Assessment &amp; Certification</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Official course completion certificate validated for academic credits, internship applications, and job portfolios.
              </p>
            </div>
          </div>
        </div>

        {/* Semesters & Subjects if available */}
        {dept.semesters && dept.semesters.length > 0 && (
          <div className="space-y-6 pt-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Semester Course Breakdown</h2>
              <p className="text-sm text-slate-500">Official syllabus subjects and credit allocation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dept.semesters.map((sem) => (
                <div key={sem.semester} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">Semester {sem.semester}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {sem.subjects.length} Subjects
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {sem.subjects.map((sub) => (
                      <div key={sub.code} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm gap-3">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-900">{sub.title}</span>
                          <div className="text-xs text-slate-500">{sub.code} • {sub.credits} Credits</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href="/practice"
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-200 hover:bg-brand-500 hover:text-white transition-colors"
                          >
                            Practice
                          </Link>
                          <Link
                            href="/assignment"
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                          >
                            Assignment
                          </Link>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-accent-50 text-accent-600 border border-accent-100">
                            Notes
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore Other Departments */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Explore Other Departments</h3>
              <p className="text-xs text-slate-500 mt-1">Discover other academic streams and specialized curriculums</p>
            </div>
            <Link
              href="/departments"
              className="text-xs font-bold text-brand-500 hover:text-accent-500 transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {departments.filter((d) => d.slug !== slug).map((otherDept) => (
              <Link
                key={otherDept.id}
                href={`/departments/${otherDept.slug}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:bg-white transition-all glow-hover flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-accent-500 transition-colors text-sm">
                    {otherDept.name}
                  </h4>
                  <span className="text-xs text-slate-500">{otherDept.category}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-2xl font-bold text-white">Ready to enroll in {dept.name}?</h3>
            <p className="text-slate-200 text-sm mt-1">Get immediate access to course materials, mentorship roadmaps, and exams.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md transition-all text-sm"
            >
              Apply for Admission
            </Link>
            <Link
              href="/departments"
              className="px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm"
            >
              All Streams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
