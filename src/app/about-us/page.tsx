"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Calendar,
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { teamMembers } from "@/data/team";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Breadcrumb Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-14 shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Who We Are</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              About <span className="text-accent-500">Student World Academy</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are engineered for students, to the students, and by the students. Empowering learners globally through interactive engineering curriculum and practical code mastery.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Mission & Fast Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Democratizing <span className="text-accent-500">Higher Education &amp; Coding</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Education empowers lives and builds generational wealth. In all the disciplines of education, literacy and technical prowess in the southern and northern parts of India represent transformational mediums that connect students around the world.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Student World has brought this opportunity for eager learners to master technical programming, engineering subjects, algorithms, and management skills. You have access to interactive classes, curated online curriculum for beginners, senior engineering grades, and open coding tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                <span>Govt of India Certified Entity</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                <span>Direct Mentorship from CTO &amp; Leads</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                <span>Interactive In-Browser Visualizers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                <span>100% Free Open Educational Modules</span>
              </div>
            </div>
          </div>

          {/* Fast Facts Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-accent-600">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">Fast Facts of Student World</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">Founded</span>
                <p className="text-slate-900 font-semibold">December 2021</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">Official Registration</span>
                <p className="text-slate-900 font-semibold leading-relaxed">
                  Student World Academy India Pvt Ltd was registered under the Government of India on 31st December 2021.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">Key Leadership</span>
                <p className="text-slate-900 font-semibold leading-relaxed">
                  Founder &amp; CTO: Vivek Kumar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">LEADERSHIP &amp; FACULTY</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Meet Our <span className="text-accent-500">Team</span></h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Passionate software engineers and educators dedicated to student excellence.
            </p>
          </div>

          <div className={teamMembers.length === 1 ? "max-w-md mx-auto" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-accent-500/50 transition-all glow-hover flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-accent-500/40 p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-accent-600">{member.title}</p>
                  <p className="text-xs text-slate-500 mt-2">{member.degree}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/developer-list"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-xs sm:text-sm shadow-sm"
            >
              <span>View Full Team Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
