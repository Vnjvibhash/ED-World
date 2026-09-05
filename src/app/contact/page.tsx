"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Clock
} from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon
} from "@/components/common/SocialIcons";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>We Are Here For You</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get in <span className="text-accent-500">Touch</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Have questions about admissions, courses, curriculum, or partnerships? Send us a message and our team will respond within 24 hours.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Campus Address</h3>
              <p className="text-xs text-slate-600 mt-1">Kharar, Mohali (Punjab)</p>
              <p className="text-xs text-slate-500">India</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-accent-50 text-accent-600 border border-accent-100 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Call Support</h3>
              <p className="text-xs text-slate-600 mt-1">Primary: +91 8951091449</p>
              <p className="text-xs text-slate-600">Secondary: +91 6202055728</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Email Us</h3>
              <p className="text-xs text-slate-600 mt-1">support@edlearn.com</p>
              <p className="text-xs text-slate-600">admissions@studentworld.edu</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Socials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Dispatched!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{form.name}</strong>. An advisor will contact you shortly via email.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", number: "", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-accent-500 hover:bg-accent-600 transition-colors shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-500 mt-1">Fill out the details below:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={form.number}
                      onChange={(e) => setForm({ ...form, number: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Message / Query *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you'd like to learn or inquire about..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md shadow-accent-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? "Sending Email..." : "Send Email"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Channels & Map Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base">Connect on Socials</h3>
              <div className="space-y-2.5">
                <a
                  href="https://www.linkedin.com/in/vivekajee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:text-accent-600 transition-all text-xs font-medium text-slate-700"
                >
                  <LinkedinIcon className="w-4 h-4 text-brand-500" />
                  <span>LinkedIn / Official Profile</span>
                </a>
                <a
                  href="https://twitter.com/Vnjvibhash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:text-accent-600 transition-all text-xs font-medium text-slate-700"
                >
                  <TwitterIcon className="w-4 h-4 text-brand-500" />
                  <span>Twitter / @Vnjvibhash</span>
                </a>
                <a
                  href="https://www.instagram.com/Vivekajee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:text-pink-600 transition-all text-xs font-medium text-slate-700"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-500" />
                  <span>Instagram / @Vivekajee</span>
                </a>
                <a
                  href="https://www.facebook.com/vivekajee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-accent-500/50 hover:text-blue-600 transition-all text-xs font-medium text-slate-700"
                >
                  <FacebookIcon className="w-4 h-4 text-brand-500" />
                  <span>Facebook / vivekajee</span>
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-accent-600 font-bold">
                <Clock className="w-4 h-4 text-accent-500" />
                <span>Operating Hours</span>
              </div>
              <p className="text-slate-800 font-medium">Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
              <p className="text-slate-500">Sunday: Closed for community development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
