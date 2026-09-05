import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 text-accent-600 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500">Effective: December 31, 2021 • ED-World Academy India Pvt Ltd</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ED-World web application, quizzes, sorting algorithm visualizers, coding practice IDE, or course repositories, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Educational Use &amp; Code of Conduct</h2>
            <p>
              Students and educators agree to use the platform in good faith, maintain academic honesty during quizzes and assignments, and respect intellectual property rights of all curriculum materials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              All proprietary algorithms, curated course materials, logos, and software architecture are the intellectual property of ED-World Academy India Pvt Ltd.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
