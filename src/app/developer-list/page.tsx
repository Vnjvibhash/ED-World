"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Award,
  Sparkles,
  ExternalLink,
  Mail,
  GraduationCap
} from "lucide-react";
import {
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon
} from "@/components/common/SocialIcons";
import { teamMembers } from "@/data/team";

export default function DeveloperListPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Engineering &amp; Research Team</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Meet Our <span className="text-accent-500">Developers &amp; Leadership</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The engineers, architects, analysts, and mentors powering the ED-World educational technology ecosystem.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Developer List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-accent-500/50 transition-all glow-hover flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-accent-500 text-white shadow">
                    {member.role}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs font-semibold text-accent-600 mt-0.5">{member.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{member.designation}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Competencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-brand-600 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links & Contact footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-accent-500 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
