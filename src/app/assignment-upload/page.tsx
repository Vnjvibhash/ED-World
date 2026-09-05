"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { sampleAssignments } from "@/data/courses";

export default function AssignmentUploadPage() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [selectedTask, setSelectedTask] = useState(sampleAssignments[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setStudentName("");
    setStudentEmail("");
    setFile(null);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back link */}
        <Link
          href="/assignment"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments Portal</span>
        </Link>

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
            <span>Digital Submission Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Upload Your <span className="text-accent-500">Assignment</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Attach your source code files, archives, or PDF reports for instructor grading.
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Assignment Submitted Successfully!</h2>
              <p className="text-slate-600 text-sm mt-1">
                Your submission has been cataloged and queued for faculty review.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-1.5 text-slate-700 font-mono">
              <div>Student: <strong className="text-slate-900">{studentName}</strong></div>
              <div>File: <strong className="text-brand-600">{file?.name}</strong></div>
              <div>Time: <strong className="text-slate-500">{new Date().toLocaleString()}</strong></div>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm"
              >
                Submit Another File
              </button>
              <Link
                href="/assignment"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
              >
                View All Assignments
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Vivek Kumar"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Student Email / Roll No. *</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="e.g. student@studentworld.edu"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Select Assignment Title *</label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:border-brand-500 focus:bg-white outline-none"
              >
                {sampleAssignments.map((a) => (
                  <option key={a.id} value={a.id}>
                    [{a.department}] {a.title} (Due: {a.dueDate})
                  </option>
                ))}
              </select>
            </div>

            {/* Drag & Drop Area */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Upload Document / Code Archive *</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragOver
                    ? "border-accent-500 bg-accent-50/50"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  id="assignment-file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".zip,.rar,.pdf,.py,.java,.cpp,.c,.js,.docx"
                />

                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-accent-500" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-900">{file.name}</div>
                      <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="assignment-file" className="cursor-pointer space-y-3 block">
                    <div className="w-12 h-12 rounded-full bg-accent-50 text-accent-500 flex items-center justify-center mx-auto border border-accent-200">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-accent-600 hover:underline">
                        Click to upload
                      </span>{" "}
                      <span className="text-sm text-slate-500">or drag and drop your file here</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Supports ZIP, PDF, PY, JAVA, CPP, DOCX (Max 25MB)
                    </p>
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!file || isSubmitting}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/25 glow-hover transition-all disabled:opacity-50"
            >
              <span className="text-white">{isSubmitting ? "Uploading Document..." : "Submit Assignment"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
