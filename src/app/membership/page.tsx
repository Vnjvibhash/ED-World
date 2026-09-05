"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Shield,
  Award,
  Zap,
  Crown,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Users,
  GraduationCap,
  Briefcase,
  PhoneCall,
  CheckCircle2,
  Lock,
  Percent
} from "lucide-react";
import {
  membershipTiers,
  comparisonCategories,
  membershipFaqs,
  MembershipTier
} from "@/data/memberships";

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedModalPlan, setSelectedModalPlan] = useState<MembershipTier | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCollege, setStudentCollege] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getPrice = (tier: MembershipTier) => {
    if (tier.monthlyPrice === 0) return 0;
    if (billingCycle === "annual") {
      // Show monthly effective price when annual
      return Math.round(tier.annualPrice / 12);
    }
    return tier.monthlyPrice;
  };

  const handleEnrollClick = (tier: MembershipTier) => {
    setSelectedModalPlan(tier);
    setModalSuccess(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setSelectedModalPlan(null);
      setModalSuccess(false);
      setStudentName("");
      setStudentEmail("");
      setStudentCollege("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>TRANSPARENT &amp; ACCESSIBLE PLANS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Invest in Your Career with{" "}
            <span className="text-brand-500">ED-World</span> Membership
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Flexible academic and coding tiers designed for university students, competitive programmers, and placement aspirants. Level up with verified CTO code reviews, live mock interviews, and verifiable credentials.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex items-center gap-2">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-accent-500 text-white shadow-md shadow-accent-500/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                  SAVE 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            TIER CARDS GRID
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch pt-4">
          {membershipTiers.map((tier) => {
            const price = getPrice(tier);
            const isPopular = tier.popular;

            // Render Icon
            const renderIcon = () => {
              switch (tier.icon) {
                case "Shield":
                  return <Shield className="w-6 h-6 text-amber-500" />;
                case "Award":
                  return <Award className="w-6 h-6 text-slate-500" />;
                case "Zap":
                  return <Zap className="w-6 h-6 text-accent-400" />;
                case "Crown":
                  return <Crown className="w-6 h-6 text-accent-500" />;
                default:
                  return <Sparkles className="w-6 h-6 text-brand-500" />;
              }
            };

            return (
              <div
                key={tier.id}
                id={tier.id}
                className={
                  isPopular
                    ? "relative rounded-3xl p-7 bg-gradient-to-br from-[#173E67] to-[#0e2742] border-2 border-brand-500 shadow-2xl flex flex-col justify-between dark-card text-white scale-105 z-10"
                    : "relative rounded-3xl p-7 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
                }
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-accent-500/30">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-2xl ${isPopular ? "bg-white/10" : "bg-slate-100"} shrink-0`}>
                      {renderIcon()}
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isPopular
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold ${isPopular ? "text-white" : "text-slate-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed ${isPopular ? "text-slate-200" : "text-slate-500"}`}>
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 pb-1 border-y border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isPopular ? "text-white" : "text-slate-900"}`}>
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-xs font-medium ${isPopular ? "text-slate-300" : "text-slate-500"}`}>
                        {tier.monthlyPrice === 0 ? "/ forever" : "/ month"}
                      </span>
                    </div>
                    {billingCycle === "annual" && tier.monthlyPrice > 0 && (
                      <p className={`text-[11px] mt-1 ${isPopular ? "text-accent-300" : "text-emerald-600 font-semibold"}`}>
                        Billed annually at ₹{tier.annualPrice.toLocaleString("en-IN")}/yr
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isPopular ? "text-slate-300" : "text-slate-400"}`}>
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? "text-accent-400" : "text-brand-500"}`} />
                          <span className={isPopular ? "text-slate-100" : "text-slate-600"}>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Not Included Features */}
                    {tier.notIncluded && tier.notIncluded.length > 0 && (
                      <div className="pt-3 space-y-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isPopular ? "text-slate-400" : "text-slate-400"}`}>
                          Not Included:
                        </span>
                        <ul className="space-y-1.5 text-xs">
                          {tier.notIncluded.map((notFeat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 opacity-50">
                              <X className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                              <span className={isPopular ? "text-slate-300" : "text-slate-500"}>{notFeat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleEnrollClick(tier)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      isPopular
                        ? "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white shadow-accent-500/30 glow-hover"
                        : "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================
            FEATURE COMPARISON MATRIX
            ============================================================ */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Detailed Plan Comparison
            </h2>
            <p className="text-slate-500 text-sm">
              See what makes each tier unique and choose the right level of support for your goals.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900 w-2/5">Features &amp; Modules</th>
                    <th className="py-4 px-4 font-bold text-amber-600 text-center w-3/20">🥉 Bronze</th>
                    <th className="py-4 px-4 font-bold text-slate-600 text-center w-3/20">🥈 Silver</th>
                    <th className="py-4 px-4 font-bold text-brand-600 text-center w-3/20 bg-brand-50/50">🥇 Gold</th>
                    <th className="py-4 px-4 font-bold text-accent-600 text-center w-3/20">💎 VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonCategories.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="bg-slate-100/70">
                        <td colSpan={5} className="py-2.5 px-6 font-bold text-xs uppercase tracking-wider text-slate-700">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item, itemIdx) => (
                        <tr key={itemIdx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-900">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs text-slate-600">
                            {item.bronze === "Included" ? (
                              <Check className="w-4 h-4 text-brand-500 mx-auto" />
                            ) : (
                              item.bronze
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs text-slate-600">
                            {item.silver === "Included" ? (
                              <Check className="w-4 h-4 text-brand-500 mx-auto" />
                            ) : (
                              item.silver
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs font-semibold text-slate-900 bg-brand-50/30">
                            {item.gold === "Included" ? (
                              <Check className="w-4 h-4 text-brand-600 mx-auto" />
                            ) : (
                              item.gold
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs font-semibold text-accent-600">
                            {item.premium === "Included" ? (
                              <Check className="w-4 h-4 text-accent-500 mx-auto" />
                            ) : (
                              item.premium
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ============================================================
            INSTITUTIONAL / CAMPUS BANNER
            ============================================================ */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand-600 border border-brand-200">
              <GraduationCap className="w-4 h-4 text-brand-500" />
              <span>COLLEGES &amp; UNIVERSITY COHORTS</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Are you an educator or university department head?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We offer campus-wide enterprise licenses with customized curriculum mapping, private batch code tests, teacher admin dashboards, and up to 40% institutional group discounts.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Admissions</span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            MEMBERSHIP FAQS
            ============================================================ */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm">
              Common questions regarding our membership tiers, upgrades, and payment security.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {membershipFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-accent-500 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-accent-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            FINAL ENROLLMENT CTA
            ============================================================ */}
        <div className="rounded-3xl bg-gradient-to-r from-[#173E67] via-[#15385d] to-[#0f2844] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden dark-card text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Accelerate Your Technical Journey?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base">
              Join thousands of scholars mastering core algorithms, software architecture, and landing top placements.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/30 transition-all text-sm flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/practice"
              className="px-6 py-3.5 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-sm"
            >
              Try Coding IDE First
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          ENROLLMENT / CHECKOUT MODAL
          ============================================================ */}
      {selectedModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedModalPlan(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {modalSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enrollment Initiated!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you, <strong className="text-slate-900">{studentName}</strong>. You have selected the{" "}
                  <strong className="text-brand-600">{selectedModalPlan.name}</strong>. A verification link and access confirmation has been sent to your email.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">ENROLLMENT STEP</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Join {selectedModalPlan.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    {selectedModalPlan.tagline} •{" "}
                    <strong className="text-slate-900">
                      ₹{getPrice(selectedModalPlan).toLocaleString("en-IN")}/mo
                    </strong>{" "}
                    ({billingCycle === "annual" ? "Annual Plan" : "Monthly Plan"})
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">University / College (Optional)</label>
                    <input
                      type="text"
                      value={studentCollege}
                      onChange={(e) => setStudentCollege(e.target.value)}
                      placeholder="e.g. Chandigarh University / NIT"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm text-slate-900"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Total Payable Today:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{billingCycle === "annual" && selectedModalPlan.monthlyPrice > 0
                        ? selectedModalPlan.annualPrice.toLocaleString("en-IN")
                        : selectedModalPlan.monthlyPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Access Setup</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    🔒 256-bit encrypted checkout. 7-day unconditional money back guarantee.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
