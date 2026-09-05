"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Code2,
  Briefcase,
  HeartPulse,
  Palette,
  Search,
  BookOpen,
  ArrowRight,
  Users,
  Sparkles,
  CheckCircle2,
  Layers,
  Award,
  ChevronRight,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { departments, Department } from "@/data/departments";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-brand-500" />,
  Briefcase: <Briefcase className="w-5 h-5 text-amber-500" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-emerald-500" />,
  Palette: <Palette className="w-5 h-5 text-purple-500" />,
};

// Department topic tags
const deptHighlights: Record<string, string[]> = {
  cse: ["Data Structures & Algorithms", "Full-Stack Web Dev", "Artificial Intelligence", "Cloud & DevOps"],
  management: ["Financial Analytics", "Strategic Leadership", "Digital Marketing", "Business Frameworks"],
  health: ["Epidemiology", "Healthcare Administration", "Environmental Sciences", "Community Health"],
  arts: ["UI/UX Product Design", "Digital Media Production", "Visual Architecture", "Motion Graphics"],
};

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Technical", "Management", "Non-Technical", "Arts"];

  // Filter departments based on search and category
  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesCategory =
        selectedCategory === "All" || dept.category === selectedCategory;
      const matchesSearch =
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const totalStudents = useMemo(() => {
    return departments.reduce((acc, d) => acc + d.studentsEnrolled, 0);
  }, []);

  const totalCourses = useMemo(() => {
    return departments.reduce((acc, d) => acc + d.totalCourses, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO & BREADCRUMB HEADER */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <Link href="/" className="hover:text-accent-500 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">Departments</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-accent-500" />
                <span>Academic Disciplines & Curriculums</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Explore Our Academic <span className="text-accent-500">Departments</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Discover university-accredited syllabi, semester notes, practical labs, and mentorship roadmaps engineered for students, to the students, and by the students.
              </p>

              {/* Stats Strip */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-500" />
                  <span><strong>{departments.length}</strong> Specialized Streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  <span><strong>{totalCourses}+</strong> Active Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span><strong>{totalStudents.toLocaleString()}+</strong> Enrolled Scholars</span>
                </div>
              </div>
            </div>

            {/* Quick Overview Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Direct Syllabus Access</h2>
                    <p className="text-xs text-slate-500">Free PDF syllabus, notes & code labs</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every department is maintained by verified mentors and academic contributors with up-to-date semester curriculums.
                </p>
                <Link
                  href="/departments/engineering"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md shadow-accent-500/20 transition-all"
                >
                  <span>View Engineering Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section className="sticky top-[69px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search departments or topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      active
                        ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {cat === "All" ? "All Streams" : cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS GRID */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory === "All" ? "All Disciplines" : `${selectedCategory} Stream`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Showing {filteredDepartments.length} of {departments.length} academic departments
              </p>
            </div>
          </div>

          {filteredDepartments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FolderOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No departments match your search</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try searching with another keyword or select "All Streams" to see all available curriculums.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-accent-500 hover:bg-accent-600 transition-colors shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDepartments.map((dept) => {
                const targetLink = `/departments/${dept.slug}`;
                const highlights = deptHighlights[dept.id] || [
                  "Comprehensive Syllabus",
                  "Structured Modules",
                  "Verified Notes",
                  "Semester Roadmap"
                ];

                return (
                  <div
                    key={dept.id}
                    className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Department Header Image Banner */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={dept.image}
                          alt={dept.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/95 text-slate-900 shadow-md backdrop-blur-sm flex items-center gap-1.5">
                            {iconMap[dept.iconName] || <BookOpen className="w-3.5 h-3.5 text-accent-500" />}
                            <span>{dept.category}</span>
                          </span>

                          {dept.featured && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-accent-500 text-white shadow-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-white" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>

                        {/* Bottom Banner Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-300 transition-colors drop-shadow-sm">
                            {dept.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {dept.description}
                        </p>

                        {/* Core Pillars / Topics */}
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Key Subject Areas
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {highlights.map((h, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                              >
                                <CheckCircle2 className="w-3 h-3 text-accent-500 shrink-0" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Strip */}
                    <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-brand-500" />
                          <span><strong>{dept.studentsEnrolled}+</strong> Active Students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-accent-500" />
                          <span><strong>{dept.totalCourses}</strong> Curated Modules</span>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={targetLink}
                          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-sm transition-all"
                        >
                          <span>Explore Stream</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        {dept.slug === "engineering" ? (
                          <Link
                            href="/departments/engineering"
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <span>Semester Syllabus</span>
                          </Link>
                        ) : (
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <span>Request Guide</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY STUDY OUR CURRICULUMS */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
              ACADEMIC EXCELLENCE
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Why Students Excel in Our <span className="text-accent-500">Departments</span>
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Engineered with practical skill development alongside core theoretical foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 text-brand-500 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Standardized Syllabus</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Semester-by-semester roadmaps matching top state and national university criteria.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 flex items-center justify-center font-bold">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Interactive Web Labs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Live browser compiler, interactive sorting visualizer, and code exercises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Mentor Support</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Guidance from experienced software engineers and academic contributors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verified Credentials</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Certificates of completion to showcase in internships and placement interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="department-cta-box text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/20 text-white backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Begin Learning Today</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Master Your Semester Syllabus?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Join thousands of students accessing free study materials, online compilers, and interactive quizzes on ED-World.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/register"
                  className="cta-btn-orange inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm shadow-lg transition-transform hover:scale-105"
                >
                  <span>Become A Member</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Talk to an Advisor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
