"use client";

import React, { useState, useEffect } from "react";
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
  Percent,
  CheckCheck
} from "lucide-react";
import {
  membershipTiers,
  comparisonCategories,
  membershipFaqs,
  MembershipTier
} from "@/data/memberships";

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("gold");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedModalPlan, setSelectedModalPlan] = useState<MembershipTier | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCollege, setStudentCollege] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  // Read URL hash on load (e.g. #bronze, #silver, #gold, #premium)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (["bronze", "silver", "gold", "premium"].includes(hash)) {
        setSelectedPlanId(hash);
      }
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getPrice = (tier: MembershipTier) => {
    if (tier.monthlyPrice === 0) return 0;
    if (billingCycle === "annual") {
      return Math.round(tier.annualPrice / 12);
    }
    return tier.monthlyPrice;
  };

  const activeSelectedTier =
    membershipTiers.find((t) => t.id === selectedPlanId) || membershipTiers[2];

  const handleSelectPlan = (tierId: string) => {
    setSelectedPlanId(tierId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tierId}`);
    }
  };

  const handleEnrollClick = (tier: MembershipTier) => {
    setSelectedPlanId(tier.id);
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
    <div className="min-h-screen bg-slate-50 text-slate-700 py-12 px-4 sm:px-6 lg:px-8 pb-32">
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
            Select the plan tailored for your engineering milestones. Click any plan below to activate your selection with dynamic plan features and instant checkout.
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
            TIER CARDS GRID WITH DYNAMIC SELECTION & LOGO COLOR CHANGES
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch pt-4">
          {membershipTiers.map((tier) => {
            const price = getPrice(tier);
            const isPopular = tier.popular;
            const isSelected = selectedPlanId === tier.id;

            // Render Dynamic Logo / Icon with state-dependent color
            const renderTierLogo = () => {
              if (tier.id === "bronze") {
                return (
                  <div
                    className={`p-3 rounded-2xl transition-all duration-300 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/20 scale-110"
                        : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}
                  >
                    <Shield className="w-6 h-6" />
                  </div>
                );
              }
              if (tier.id === "silver") {
                return (
                  <div
                    className={`p-3 rounded-2xl transition-all duration-300 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-600/40 ring-4 ring-slate-400/25 scale-110"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                );
              }
              if (tier.id === "gold") {
                return (
                  <div
                    className={`p-3 rounded-2xl transition-all duration-300 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-br from-[#FF8000] to-[#ff9933] text-white shadow-xl shadow-orange-500/50 ring-4 ring-orange-400/35 scale-110"
                        : "bg-white/15 text-accent-300 border border-white/20"
                    }`}
                  >
                    <Zap className="w-6 h-6" />
                  </div>
                );
              }
              // Premium VIP
              return (
                <div
                  className={`p-3 rounded-2xl transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/40 ring-4 ring-cyan-400/25 scale-110"
                      : "bg-cyan-50 text-cyan-700 border border-cyan-200"
                  }`}
                >
                  <Crown className="w-6 h-6" />
                </div>
              );
            };

            return (
              <div
                key={tier.id}
                id={tier.id}
                onClick={() => handleSelectPlan(tier.id)}
                className={
                  isPopular
                    ? `relative rounded-3xl p-7 bg-gradient-to-br from-[#173E67] to-[#0e2742] shadow-2xl flex flex-col justify-between dark-card text-white cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "border-2 border-accent-400 ring-4 ring-accent-400/40 scale-105 z-20"
                          : "border border-slate-700/80 hover:border-slate-500 hover:scale-[1.02] z-10"
                      }`
                    : `relative rounded-3xl p-7 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "border-2 border-accent-500 ring-4 ring-accent-500/25 scale-105 z-20 shadow-xl"
                          : "border border-slate-200 hover:border-slate-300 hover:scale-[1.02]"
                      }`
                }
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-accent-500/30">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Header with Dynamic Logo & Selection Status */}
                  <div className="flex items-start justify-between gap-3">
                    {renderTierLogo()}

                    <div className="flex flex-col items-end gap-1.5">
                      {isSelected ? (
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md animate-fade-in"
                          style={{
                            backgroundColor: "#FF8000",
                            color: "#ffffff",
                            border: "1px solid #ea6c00",
                            boxShadow: "0 4px 12px rgba(255, 128, 0, 0.35)"
                          }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                          <span style={{ color: "#ffffff", fontWeight: 700 }}>SELECTED</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPlan(tier.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            isPopular
                              ? "hover:bg-white/20"
                              : "hover:bg-slate-200"
                          }`}
                          style={{
                            backgroundColor: isPopular ? "rgba(255, 255, 255, 0.15)" : "#f1f5f9",
                            color: isPopular ? "#ffffff" : "#475569",
                            border: isPopular ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid #cbd5e1"
                          }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full border border-current" />
                          <span style={{ color: isPopular ? "#ffffff" : "#475569" }}>Select Plan</span>
                        </button>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isPopular ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold ${isPopular ? "text-white" : "text-slate-900"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed ${isPopular ? "text-slate-200" : "text-slate-500"}`}>
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
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

                {/* CTA Action Button */}
                <div className="pt-8">
                  {isSelected ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnrollClick(tier);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg selected-card-btn cursor-pointer"
                      style={{
                        backgroundColor: "#FF8000",
                        backgroundImage: "linear-gradient(135deg, #FF8000 0%, #ea6c00 100%)",
                        color: "#ffffff",
                        border: "1px solid #ea6c00",
                        boxShadow: "0 10px 25px -5px rgba(255, 128, 0, 0.45)"
                      }}
                    >
                      <CheckCheck className="w-4 h-4 shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                      <span className="font-bold tracking-wide" style={{ color: "#ffffff" }}>
                        Proceed
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(tier.id);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all unselected-card-btn cursor-pointer"
                      style={{
                        backgroundColor: isPopular ? "rgba(255, 255, 255, 0.15)" : "#f1f5f9",
                        color: isPopular ? "#ffffff" : "#0f172a",
                        border: isPopular ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid #cbd5e1"
                      }}
                    >
                      <span style={{ color: isPopular ? "#ffffff" : "#0f172a" }}>Select {tier.name}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" style={{ color: isPopular ? "#ffffff" : "#0f172a" }} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================
            FEATURE COMPARISON MATRIX - DYNAMICALLY HIGHLIGHTS SELECTED
            ============================================================ */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Detailed Plan Comparison
            </h2>
            <p className="text-slate-500 text-sm">
              Currently viewing comparison for{" "}
              <strong className="text-brand-600 font-bold">{activeSelectedTier.name}</strong>{" "}
              (Selected).
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900 w-2/5">Features &amp; Modules</th>
                    <th
                      onClick={() => handleSelectPlan("bronze")}
                      className={`py-4 px-4 font-bold text-center cursor-pointer transition-colors w-3/20 ${
                        selectedPlanId === "bronze"
                          ? "bg-amber-50 text-amber-700 border-x-2 border-amber-400"
                          : "text-amber-600 hover:bg-slate-100"
                      }`}
                    >
                      🥉 Bronze {selectedPlanId === "bronze" && "✓"}
                    </th>
                    <th
                      onClick={() => handleSelectPlan("silver")}
                      className={`py-4 px-4 font-bold text-center cursor-pointer transition-colors w-3/20 ${
                        selectedPlanId === "silver"
                          ? "bg-slate-100 text-slate-900 border-x-2 border-slate-400"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      🥈 Silver {selectedPlanId === "silver" && "✓"}
                    </th>
                    <th
                      onClick={() => handleSelectPlan("gold")}
                      className={`py-4 px-4 font-bold text-center cursor-pointer transition-colors w-3/20 ${
                        selectedPlanId === "gold"
                          ? "bg-brand-50 text-brand-700 border-x-2 border-brand-500"
                          : "text-brand-600 hover:bg-slate-100"
                      }`}
                    >
                      🥇 Gold {selectedPlanId === "gold" && "✓"}
                    </th>
                    <th
                      onClick={() => handleSelectPlan("premium")}
                      className={`py-4 px-4 font-bold text-center cursor-pointer transition-colors w-3/20 ${
                        selectedPlanId === "premium"
                          ? "bg-accent-50 text-accent-700 border-x-2 border-accent-400"
                          : "text-accent-600 hover:bg-slate-100"
                      }`}
                    >
                      💎 VIP {selectedPlanId === "premium" && "✓"}
                    </th>
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
                          <td
                            className={`py-3.5 px-4 text-center text-xs ${
                              selectedPlanId === "bronze"
                                ? "bg-amber-50/40 font-semibold text-slate-900 border-x-2 border-amber-300"
                                : "text-slate-600"
                            }`}
                          >
                            {item.bronze === "Included" ? (
                              <Check className="w-4 h-4 text-brand-500 mx-auto" />
                            ) : (
                              item.bronze
                            )}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-center text-xs ${
                              selectedPlanId === "silver"
                                ? "bg-slate-100/60 font-semibold text-slate-900 border-x-2 border-slate-300"
                                : "text-slate-600"
                            }`}
                          >
                            {item.silver === "Included" ? (
                              <Check className="w-4 h-4 text-brand-500 mx-auto" />
                            ) : (
                              item.silver
                            )}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-center text-xs ${
                              selectedPlanId === "gold"
                                ? "bg-brand-50/50 font-bold text-slate-900 border-x-2 border-brand-400"
                                : "text-slate-700"
                            }`}
                          >
                            {item.gold === "Included" ? (
                              <Check className="w-4 h-4 text-brand-600 mx-auto" />
                            ) : (
                              item.gold
                            )}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-center text-xs ${
                              selectedPlanId === "premium"
                                ? "bg-accent-50/50 font-bold text-accent-700 border-x-2 border-accent-400"
                                : "text-slate-700"
                            }`}
                          >
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
            <button
              onClick={() => handleEnrollClick(activeSelectedTier)}
              className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/30 transition-all text-sm flex items-center gap-2"
            >
              <span>Proceed with {activeSelectedTier.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
          FLOATING BOTTOM BAR - ACTIVE SELECTION CONFIRMATION
          ============================================================ */}
      <div className="selected-plan-floating-bar animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent-50 text-accent-600 shrink-0 hidden sm:block">
            <Sparkles className="w-5 h-5 text-accent-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span>Active Plan Selection:</span>
              <span className="font-extrabold text-slate-900">{activeSelectedTier.name}</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              ₹{getPrice(activeSelectedTier).toLocaleString("en-IN")}{" "}
              <span className="text-xs font-normal text-slate-500">
                {activeSelectedTier.monthlyPrice === 0 ? "/ forever free" : `/ month (${billingCycle})`}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleEnrollClick(activeSelectedTier)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all shadow-md cursor-pointer"
          style={{
            backgroundColor: "#FF8000",
            backgroundImage: "linear-gradient(135deg, #FF8000 0%, #ea6c00 100%)",
            color: "#ffffff",
            border: "1px solid #ea6c00",
            boxShadow: "0 4px 15px rgba(255, 128, 0, 0.35)"
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: 700 }}>Continue with {activeSelectedTier.name}</span>
          <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
        </button>
      </div>

      {/* ============================================================
          ENROLLMENT / CHECKOUT MODAL
          ============================================================ */}
      {selectedModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative overflow-hidden popup-form-container modal-content-animate">
            {/* Top Brand Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-accent-500 to-accent-400" />

            <button
              onClick={() => setSelectedModalPlan(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {modalSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
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

                <form onSubmit={handleModalSubmit} className="space-y-4 text-slate-900">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">University / College (Optional)</label>
                    <input
                      type="text"
                      value={studentCollege}
                      onChange={(e) => setStudentCollege(e.target.value)}
                      placeholder="e.g. Chandigarh University / NIT"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 shadow-sm transition-all"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-semibold">Total Payable Today:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{billingCycle === "annual" && selectedModalPlan.monthlyPrice > 0
                        ? selectedModalPlan.annualPrice.toLocaleString("en-IN")
                        : selectedModalPlan.monthlyPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-white stroke-white" />
                    <span className="text-white">Proceed to Access Setup</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-500 font-medium">
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
