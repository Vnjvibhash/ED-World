export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  color: "amber" | "slate" | "brand" | "accent";
  icon: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  ctaHref: string;
}

export const membershipTiers: MembershipTier[] = [
  {
    id: "bronze",
    name: "Bronze Tier",
    tagline: "Free Forever for Independent Learners",
    badge: "🥉 Community",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    color: "amber",
    icon: "Shield",
    features: [
      "Full access to 4 University Department Curricula",
      "In-Browser JavaScript Coding IDE (practice mode)",
      "Interactive Sorting Algorithm Visualizer",
      "Standard Community Quizzes with Timers",
      "Public Developer & Mentorship Directory",
      "Access to Open Community Discussion Forums"
    ],
    notIncluded: [
      "1-on-1 Code Review by Senior Architects",
      "Downloadable Assignment Solutions & Code Packs",
      "Verified Course Completion Certificate",
      "Direct WhatsApp Counseling & Priority Support"
    ],
    ctaText: "Get Started Free",
    ctaHref: "/register"
  },
  {
    id: "silver",
    name: "Silver Tier",
    tagline: "Semester Mastery & Exam Preparation",
    badge: "🥈 Essential Scholar",
    monthlyPrice: 499,
    annualPrice: 4499,
    popular: false,
    color: "slate",
    icon: "Award",
    features: [
      "Everything included in Bronze Tier",
      "Complete Semester Lecture Notes & Subject PDFs",
      "Official Assignment Solutions with Test Suites",
      "Python 3 Trinket IDE Multi-file Compiler",
      "Automated Code Evaluation & Edge-Case Validator",
      "Bi-Weekly Group Doubt Clearing Live Webinars",
      "Email Support with 24-hour SLA"
    ],
    notIncluded: [
      "1-on-1 Code Review by Senior Architects",
      "Verified Course Completion Certificate",
      "Direct WhatsApp Counseling & Priority Support"
    ],
    ctaText: "Choose Silver Plan",
    ctaHref: "/register?plan=silver"
  },
  {
    id: "gold",
    name: "Gold Tier",
    tagline: "Industry Ready & Placement Accelerator",
    badge: "🥇 Most Popular",
    monthlyPrice: 999,
    annualPrice: 8999,
    popular: true,
    color: "brand",
    icon: "Zap",
    features: [
      "Everything included in Silver Tier",
      "1-on-1 Monthly Technical Mentorship Session",
      "Priority Assignment Grading with Architectural Feedback",
      "Interactive DSA Interview Preparation Track",
      "AI Assistant Unlimited Hints & Code Debugger",
      "Official Verified Course Completion Certificates",
      "Live Mock Technical Interviews (DSA + System Design)",
      "Priority Ticket & Chat Support (4-hour SLA)"
    ],
    notIncluded: [
      "Direct WhatsApp Senior Architect Hotline",
      "Guaranteed Placement Referral Pipeline"
    ],
    ctaText: "Upgrade to Gold Plan",
    ctaHref: "/register?plan=gold"
  },
  {
    id: "premium",
    name: "Premium VIP",
    tagline: "Comprehensive 1-on-1 Fellowship & Placement",
    badge: "💎 Elite Fellow",
    monthlyPrice: 1999,
    annualPrice: 17999,
    popular: false,
    color: "accent",
    icon: "Crown",
    features: [
      "Everything included in Gold Tier",
      "Unlimited 1-on-1 Bi-Weekly Mentorship Calls with CTO/Leads",
      "Direct WhatsApp Line with Academic Counselors & Mentors",
      "Customized Career & Engineering Roadmap",
      "GitHub Portfolio & Resume Comprehensive Audit",
      "Direct Hiring Referrals across 50+ Partner Tech Startups",
      "Lifetime Access to Future Curriculum Upgrades",
      "Dedicated 24/7 Academic Concierge"
    ],
    ctaText: "Join Elite VIP",
    ctaHref: "/register?plan=premium"
  }
];

export const comparisonCategories = [
  {
    category: "Academic & Curriculum",
    items: [
      { name: "Department Curriculums & Syllabi", bronze: "Included", silver: "Included", gold: "Included", premium: "Included" },
      { name: "Semester Notes & PDF Modules", bronze: "Basic", silver: "All Semesters", gold: "All Semesters + Slides", premium: "All + Annotated" },
      { name: "Assignment Briefs & Problem Sets", bronze: "View Only", silver: "Solutions Included", gold: "Solutions + Test Suites", premium: "Solutions + Test Suites" }
    ]
  },
  {
    category: "Coding Labs & Visualizers",
    items: [
      { name: "Browser JavaScript Sandbox", bronze: "Standard", silver: "Standard", gold: "Advanced", premium: "Unlimited" },
      { name: "Embedded Python 3 Compiler", bronze: "Limited", silver: "Full Access", gold: "Full Access", premium: "Full Access" },
      { name: "Sorting Visualizer with Big-O Metrics", bronze: "Included", silver: "Included", gold: "Included", premium: "Included" },
      { name: "Automated Test Case Runner", bronze: "-", silver: "10 tests/day", gold: "Unlimited", premium: "Unlimited" }
    ]
  },
  {
    category: "Mentorship & Career Support",
    items: [
      { name: "1-on-1 Code Review & Mentoring", bronze: "-", silver: "-", gold: "1 Session / Month", premium: "Bi-Weekly Calls" },
      { name: "Live Mock Technical Interviews", bronze: "-", silver: "-", gold: "Quarterly", premium: "Monthly" },
      { name: "Direct WhatsApp Counselor Access", bronze: "-", silver: "-", gold: "-", premium: "24/7 Direct Access" },
      { name: "Verified Course Certificates", bronze: "-", silver: "-", gold: "Yes (Verifiable)", premium: "Yes (Honors Degree)" },
      { name: "Direct Startup Hiring Referrals", bronze: "-", silver: "-", gold: "Community Board", premium: "Guaranteed Referrals" }
    ]
  }
];

export const membershipFaqs = [
  {
    q: "Can I upgrade or downgrade my membership anytime?",
    a: "Yes, you can upgrade or modify your membership tier at any time from your account settings. When upgrading, your remaining days will be prorated automatically."
  },
  {
    q: "Do you offer university student and group discounts?",
    a: "Absolutely! We offer up to 40% institutional discounts for cohorts of 10 or more university students. Contact our academic admissions team or email support@edlearn.com for campus plans."
  },
  {
    q: "How are 1-on-1 mentorship sessions scheduled?",
    a: "Gold and Premium VIP members receive access to our mentor scheduling calendar, where you can select available slots directly with our verified CTO, lead software engineers, and subject specialists."
  },
  {
    q: "What payment options are supported?",
    a: "We support UPI (Google Pay, PhonePe, Paytm), all major Credit/Debit cards (Visa, MasterCard, RuPay), Net Banking across all Indian banks, and international cards via Stripe."
  },
  {
    q: "Is there a refund policy?",
    a: "Yes, we offer an unconditional 7-day money-back guarantee on all paid plans if you feel the materials or sessions do not meet your expectations."
  }
];
