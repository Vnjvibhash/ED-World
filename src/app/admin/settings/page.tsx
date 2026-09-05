"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Save, ArrowLeft, CheckCircle2, Bell, Shield, Database, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("ED-World Academy");
  const [supportEmail, setSupportEmail] = useState("support@edlearn.com");
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [autoApproveStudents, setAutoApproveStudents] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Settings</h1>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-400" />
              <span>General Platform Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Platform Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Support Contact Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-400" />
              <span>User Enrollment &amp; Permissions</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div>
                  <div className="text-white font-medium">Allow New Student Registrations</div>
                  <div className="text-slate-400 text-xs">Public users can register through /register</div>
                </div>
                <input
                  type="checkbox"
                  checked={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.checked)}
                  className="w-4 h-4 accent-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div>
                  <div className="text-white font-medium">Auto-Approve Student Accounts</div>
                  <div className="text-slate-400 text-xs">Immediately activate accounts without admin verification</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoApproveStudents}
                  onChange={(e) => setAutoApproveStudents(e.target.checked)}
                  className="w-4 h-4 accent-brand-500"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-brand-500 hover:bg-brand-400 transition-colors shadow-md shadow-brand-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
