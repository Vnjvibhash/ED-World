import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon
} from "@/components/common/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 relative footer-wrapper">
      {/* Top Contact & Quick Info Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Contact details */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">CONTACT US</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Get in Touch</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-brand-600 shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Campus Address</div>
                  <p className="text-slate-600">Kharar, Mohali (Punjab), India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-brand-600 shadow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Contact Numbers</div>
                  <p className="text-slate-600">Primary: +91 8951091449</p>
                  <p className="text-slate-600">Secondary: +91 6202055728</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-brand-600 shadow-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Email Address</div>
                  <p className="text-slate-600">support@edlearn.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 footer-section-title">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  Play with Quiz
                </Link>
              </li>
              <li>
                <Link href="/practice" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  Coding Practice
                </Link>
              </li>
              <li>
                <Link href="/sorting-algorithm" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  Sorting Visualizer
                </Link>
              </li>
              <li>
                <Link href="/assignment" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  Assignments Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-slate-600 hover:text-accent-600 font-medium transition-colors group footer-link-item">
                  <ChevronRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Call to Action Card (Dark Card with pure white text) */}
          <div className="md:col-span-5">
            <div className="bg-gradient-to-br from-[#173E67] to-[#0f2844] border border-[#173E67]/60 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden dark-card footer-card-cta text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-xl font-bold text-white mb-2">ED-World for Students</h4>
              <p className="text-slate-100 text-sm leading-relaxed mb-6">
                Now you can accelerate your technical &amp; career journey with curated engineering resources, live mentorship, and interactive coding challenges.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/25 glow-hover transition-all"
              >
                <span>Become A User</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 footer-bottom-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-slate-600">
              © {new Date().getFullYear()} ED-World — Designed &amp; Developed by{" "}
              <span className="text-brand-600 font-bold">Innovateria</span>. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/vivekajee"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-brand-600 hover:bg-slate-200 border border-slate-200 transition-colors footer-social-btn"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/Vivekajee/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-pink-600 hover:bg-slate-200 border border-slate-200 transition-colors footer-social-btn"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCe-PjlLkxdQYBWUioMuZkdg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200 border border-slate-200 transition-colors footer-social-btn"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/Vnjvibhash"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-brand-600 hover:bg-slate-200 border border-slate-200 transition-colors footer-social-btn"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/vivekajee/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-brand-600 hover:bg-slate-200 border border-slate-200 transition-colors footer-social-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
              Privacy &amp; Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms-conditions" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
