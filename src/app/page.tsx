"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Code2,
  CheckCircle2,
  Users,
  ShieldCheck,
  Star,
  Quote,
  Laptop,
  Check,
  HelpCircle
} from "lucide-react";
import { departments } from "@/data/departments";
import { featureCourses } from "@/data/courses";

const heroSlides = [
  {
    id: 1,
    title: "Student World makes education easiest and accessible.",
    subtitle: "We are for Students, to the Students, and by the Students.",
    image: "/assets/banners/banner-1.jpg",
    ctaText: "Contact Us",
    ctaLink: "/contact",
    bulletPoints: ["Comprehensive Video Lessons", "Live Doubt Resolution", "100% Free Open Modules"]
  },
  {
    id: 2,
    title: "Learn at the comfort of your home with curated resources.",
    subtitle: "Build strong foundational habits for career excellence.",
    image: "/assets/banners/banner-2.jpg",
    ctaText: "Get Started",
    ctaLink: "/register",
    bulletPoints: ["Discipline & Punctuality", "Hands-on Projects", "Time Management & Roadmaps"]
  },
  {
    id: 3,
    title: "Coding is the heart of technical study.",
    subtitle: "Special courses and online compiler to prepare for government & private technical exams.",
    image: "/assets/banners/banner-3.jpg",
    ctaText: "Start Practice",
    ctaLink: "/practice",
    bulletPoints: ["Interactive In-Browser IDE", "Sorting Algorithm Visualizer", "Interview Level DSA"]
  },
  {
    id: 4,
    title: "Turn your dream into a high-impact engineering career.",
    subtitle: "Get trained by experienced resources across core engineering streams.",
    image: "/assets/banners/banner-4.jpg",
    ctaText: "Explore Departments",
    ctaLink: "/departments/engineering",
    bulletPoints: ["Computer Science & IT", "Electronics & Electrical", "Mechanical & Civil"]
  },
  {
    id: 5,
    title: "\"Disability is Not Inability\"",
    subtitle: "Breaking down stigma and helping children and adults enhance their technical capabilities.",
    image: "/assets/banners/banner-5.jpg",
    ctaText: "Join Our Mission",
    ctaLink: "/about-us",
    bulletPoints: ["Inclusive Learning Tools", "Accessible Audio Materials", "Empowerment Programs"]
  }
];

const testimonials = [
  {
    quote: "A big thanks to the Student World mentors for guiding our son! They have gone out of their way to make coding engaging and easy to understand. The Student World team is committed, highly receptive, and delivers whatever is promised on time.",
    author: "Parent of B.Tech CSE Student",
    role: "Engineering Aspirant Guardian"
  },
  {
    quote: "Student World has been wonderful for our daughter. Having structured practice, interactive quizzes, and assignment tracking helped her achieve a top university rank.",
    author: "Verified Student Feedback",
    role: "Electronics & Comm Student"
  },
  {
    quote: "The interactive sorting visualizer and hands-on coding playground made Data Structures crystal clear before my campus placement interviews!",
    author: "Vivek K. Alumni",
    role: "Software Development Engineer"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SLIDER */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] bg-gradient-to-br from-slate-50 via-white to-brand-50/20 overflow-hidden flex items-center border-b border-slate-200">
        {/* Subtle Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-20" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full py-12">
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-600 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    <span>Welcome to Student World Academy</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    {slide.title}
                  </h1>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                    {slide.subtitle}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {slide.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-lg shadow-accent-500/25 glow-hover transition-all text-sm sm:text-base"
                    >
                      <span className="text-white font-semibold">{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                    <Link
                      href="/quiz"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-colors text-sm sm:text-base"
                    >
                      <HelpCircle className="w-4 h-4 text-accent-500" />
                      <span className="text-slate-900 font-semibold">Take Free Quiz</span>
                    </Link>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group bg-white">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 text-slate-700 hover:bg-brand-500 hover:text-white transition-colors backdrop-blur-sm border border-slate-200 shadow-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 text-slate-700 hover:bg-brand-500 hover:text-white transition-colors backdrop-blur-sm border border-slate-200 shadow-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-accent-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. HOW IT WORKS / KEY VALUE PILLARS */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">STUDENT CENTRIC ECOSYSTEM</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">How Student World <span className="text-accent-500">Works</span></h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Engineered to take students from foundational theory to real-world code execution and verified credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/50 transition-all group glow-hover shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Connect with Top Developers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn directly from verified software engineers, CTOs, and AI specialists who build production systems every day.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-accent-500/50 transition-all group glow-hover shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-500 mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Interactive Code & Visualizers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Master complex DSA and coding with our real-time Sorting Algorithm visualizer and in-browser coding playground.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-purple-500/50 transition-all group glow-hover shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Assessed & Certified</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complete semester assignments, take timed quizzes, and earn verifiable Course Completion Certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS DIRECTORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600">CURATED LEARNING PATHWAYS</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">Search Our <span className="text-accent-500">Departments</span></h2>
            </div>
            <Link
              href="/departments/engineering"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-accent-500 transition-colors"
            >
              <span>Explore All Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                href={`/departments/${dept.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-accent-500/50 transition-all glow-hover flex flex-col shadow-sm hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-accent-500 text-white flex items-center gap-1 shadow">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>Trending</span>
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-accent-500 transition-colors mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                      {dept.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span>{dept.totalCourses} Subjects / Labs</span>
                    <span className="text-accent-500 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WEBSITE FEATURES & SELF-STUDY COURSES */}
      {/* 4. WEBSITE FEATURES & SELF-STUDY COURSES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">PREMIUM PLATFORM HIGHLIGHTS</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Featured Self-Study <span className="text-accent-500">Courses</span></h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Self-paced modules equipped with video sessions, assignments, notes, and progress analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-accent-500/50 transition-all glow-hover flex flex-col shadow-sm hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-accent-600 border border-slate-200 shadow-sm backdrop-blur-sm">
                    {course.tag}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-accent-600 uppercase">{course.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{course.title}</h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 py-2 border-y border-slate-100">
                    <span>📚 {course.lessonsCount} Modules</span>
                    <span>⏱️ {course.duration}</span>
                    <span>⭐ {course.rating} / 5.0</span>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm transition-all"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. EXAMS & CERTIFICATIONS HIGHLIGHT */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 aspect-square">
                <Image
                  src="/assets/illustrations/clip-graphic-designer.png"
                  alt="Exams & Certifications"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-600">STANDARDIZED EVALUATION</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">Exams &amp; <span className="text-accent-500">Certifications</span></h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Graded exams serve as the prescribed criteria for providing a systematic understanding of learning progress. Test your abilities, scrutinize your coding skills, and validate competencies for top recruiters.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Computer Science</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Information Tech</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Electronics &amp; Comm</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Electrical Engg</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Mechanical Engg</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-500" /> Civil Engineering</div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-md shadow-accent-500/20 glow-hover transition-all text-sm"
                >
                  <span>Apply for Certification</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-600">COMMUNITY REVIEWS</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1 mb-8">Our <span className="text-accent-500">Best Student Feedback</span></h2>

          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg relative">
            <Quote className="w-10 h-10 text-accent-500/20 absolute top-6 left-6" />
            <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed pt-4">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-base">{testimonials[currentTestimonial].author}</h4>
              <p className="text-xs text-accent-600 mt-0.5">{testimonials[currentTestimonial].role}</p>
            </div>

            {/* Testimonial Nav dots */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentTestimonial ? "w-6 bg-accent-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
