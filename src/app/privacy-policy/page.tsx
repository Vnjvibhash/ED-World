import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Shield className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy &amp; Policy</h1>
          <p className="text-xs text-slate-500">Last updated: September 2026 • Student World Academy India Pvt Ltd</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              Student World collects basic student information including name, email address, date of birth, chosen engineering or academic department, and assignment submissions for educational and certification verification purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Use of Student Data</h2>
            <p>
              Your data is exclusively utilized to provide structured course tracking, evaluate quiz scores, grade uploaded assignments, issue verifiable course certificates, and provide tailored academic recommendations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Data Protection &amp; Security</h2>
            <p>
              We implement industry standard encryption and security protocols to safeguard all user profiles and academic submissions against unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Contact Inquiries</h2>
            <p>
              If you have any questions or data removal requests regarding our privacy policy, please contact our administrative team at <strong>support@edlearn.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
