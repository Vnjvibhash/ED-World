# ED-World — Next-Generation Learning & Coding Ecosystem

<div align="center">

![ED-World Banner](/assets/brand/logo.png)

**An intelligent, modern, and interactive educational platform combining academic syllabus mastery, real-time code execution, algorithm visualizers, and verified mentorship.**

Designed & Developed by **Innovateria** for **ED-World Academy**.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-orange?style=flat)](#license--attribution)

</div>

---

## 📖 Executive Description

**ED-World** is an enterprise-grade, comprehensive web application re-engineered from a traditional Laravel MVC architecture into a cutting-edge **Next.js 15 App Router** single-page architecture. 

The platform bridges foundational university coursework with hands-on software engineering. Students and aspiring developers can study semester-by-semester engineering syllabi, practice live algorithmic coding directly in the browser, visualize sorting complexities in real-time, test their domain knowledge through gamified quizzes, submit coursework assignments, and interact directly with industry engineers and curriculum leaders.

### Core Objectives
- **Academic Rigor**: Provide structured university department curricula (Engineering, Public Health, Management & Commerce, Arts & Designs).
- **Interactive Computing**: Remove execution barriers by offering an zero-install browser IDE and an embedded Python runtime.
- **Visual Pedagogy**: Demystify algorithm performance (Big-O space/time complexity) through interactive animated visualizers.
- **Modern User Experience**: Deliver a fast, responsive, and beautiful light theme user interface with curated color harmony and contrast guarantees.

---

## 🎨 Design System & Visual Identity

ED-World adopts a clean, contemporary **Light Theme** aesthetic that maximizes reading comfort, focus, and visual elegance.

### 1. Brand Color Palette
- **Primary Navy (`#173E67`)**: Architectural foundation, representing academic stability, trust, and executive leadership.
- **Radiant Accent Orange (`#FF8000`)**: Dynamic accent color representing creativity, action items, primary CTAs, and hover states.
- **Canvas Neutral (`#f8fafc` / `#ffffff`)**: Crisp, distraction-free surfaces that eliminate dark-mode fatigue during long reading or coding sessions.
- **Typography Scale**: Deep slate (`#0f172a` for primary headings, `#334155` for body text, `#64748b` for subtle captions) providing accessibility compliant contrast ratios.

### 2. High-Contrast Dark Card Exception
While the entire platform is designed in a crisp light theme, specialized focal elements (such as the browser IDE terminal console, the algorithm visualizer display card, and highlighted call-to-action blocks) utilize dark backgrounds. 
- **Enforced Rule**: Any card or container with a dark background (`.dark-card`, `.terminal-window`, `.footer-card-cta`) strictly renders text in pure white (`#ffffff` / `#f1f5f9`) for peak contrast and readability.

### 3. Light Theme Footer
The footer features a light aesthetic (`#f8fafc` background with `#ffffff` bottom bar and subtle `#e2e8f0` borders), organized contact hubs, quick directory links, social media channels, and explicit developer attribution.

---

## 🌟 Comprehensive Feature Catalog

### 1. 🏠 Dynamic Landing Hub (`/`)
- **Multi-Slide Hero Carousel**: Auto-rotating showcase highlighting platform features, admissions, and coding labs with manual arrow and pill navigation.
- **3-Step Value Pipeline**: "How It Works" workflow guiding students from onboarding to verified graduation.
- **Trending Departments Catalog**: Direct preview of Engineering, Business, Design, and Health faculties.
- **Curriculum & Mentorship Showcase**: Spotlight on verified tech leaders, board credentials, and student community feedback.

### 2. 💻 In-Browser Coding Playground (`/practice`)
- **Dual-Engine Workspace**:
  - **JavaScript Engine**: Built-in Monaco-inspired editor with line numbers, code templates, and a live client-side sandbox capturing `console.log` output.
  - **Python 3 Compiler**: Embedded Trinket engine providing a full-featured Python environment without requiring local interpreters.
- **Preloaded Problem Library**: Includes popular interview challenges (Two Sum, Palindrome Check, Array Summation, String Reversal) with one-click code starter loading.

### 3. 📊 Interactive Algorithm Visualizer (`/sorting-algorithm`)
- **Supported Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort with bar transitions.
- **Interactive Parameter Controls**:
  - Array Size slider (10 to 60 elements).
  - Playback Speed slider (10ms to 250ms).
  - Array Randomizer and manual execution controls (Play, Pause, Reset).
- **Complexity Breakdown Matrix**: Instant reference cards showing Best-case $O(n)$, Average-case $O(n^2)$, Worst-case $O(n^2)$, and Auxiliary Space metrics.

### 4. 🎯 Timed Technical Quiz Engine (`/quiz`)
- **Active Testing Mode**: 15-second countdown timer per question with a real-time shrinking SVG timer bar.
- **Category Filter**: Web Development, Python, Data Structures & Algorithms, and SQL databases.
- **Instant Visual Feedback**: Selected options transition immediately to green (correct) or red (incorrect) with explanation tooltips.
- **Celebration & Scorecard**: Dynamic score tabulation with celebratory particle confetti (`canvas-confetti`) upon quiz completion.

### 5. 📚 Academic Curricula & Syllabus Explorer (`/departments` & `/engineering`)
- **Faculty Portals**: Comprehensive program directory for:
  - Department of Engineering & Technology
  - Department of Public Health & Applied Sciences
  - Department of Management & Commerce
  - Department of Arts, Humanities & Creative Designs
- **Engineering Semester Breakdown (`/engineering`)**: Interactive tabbed navigation across 8 undergraduate semesters with subject codes, credits, lecture hours, and syllabus downloads.

### 6. 📁 Assignment Submission Portal (`/assignment` & `/assignment-upload`)
- **Active Assignments Ledger**: Filterable list of department coursework, due dates, maximum marks, and assignment briefs.
- **Drag-and-Drop File Uploader**: File upload gateway validating `.zip`, `.pdf`, `.py`, `.java`, and `.docx` payloads up to 25MB.

### 7. 👥 Mentorship & Developer Directory (`/developer-list`)
- Detailed executive and technical profiles for Vivek Kumar (CTO), Shivkant Kumar (COO), Sagar Saini (CEO), and faculty mentors.
- Lists academic qualifications, industry certifications, direct contact details, and technical domains.

### 8. 🔐 Authentication & Access Control (`/login`, `/register`, `/forgot-password`)
- **Role Selector**: Instant toggle between Student, Teacher, and Administrator roles with one-click demo credentials.
- **Smart Registration Form**: Auto-calculates exact student age from Date of Birth input and provides stream selection.
- **Password Reset**: Automated step-by-step recovery workflow.

### 9. ⚙️ Administrative Command Suite (`/admin/dashboard`, `/admin/users`, `/admin/settings`)
- **KPI Metrics Dashboard**: Real-time summary tiles tracking active students, course completions, platform revenue, and server health.
- **User Management Portal**: Searchable and filterable data grid with role change actions, modal profile editor, and user removal.
- **System Settings**: Academic calendar management, assignment submission deadlines, and email notifications.

### 10. 💬 Floating Assistive Services
- **Direct WhatsApp Chat**: One-click floating trigger initiating instant chat with academic counselors.
- **Floating AI Assistant**: Expandable slide-out assistant interface providing 24/7 automated platform navigation and guidance.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Purpose / Rationale |
|---|---|---|
| **Framework** | **Next.js 15 (App Router)** | Server and Client component orchestration, route handlers, optimized bundling with Turbopack. |
| **UI Library** | **React 19** | Modern state hooks, reactive transitions, and component reusability. |
| **Language** | **TypeScript 5.0** | Strict static typing, interface contracts, and enhanced developer ergonomics. |
| **Styling** | **Tailwind CSS 3.4 & CSS Modules** | Utility-first responsive design combined with high-contrast rules and scoped component styles. |
| **Icons** | **Lucide React** | Feather-light, consistent iconography across all pages and navigation states. |
| **Visual FX** | **Canvas-Confetti** | Lightweight canvas-based confetti celebrations for quiz completions. |
| **Fonts** | **Inter (Google Fonts)** | Clean, highly legible sans-serif typography optimized for reading and interface clarity. |

---

## 📂 Project Directory Structure

```plaintext
ED-World/
├── public/
│   └── assets/
│       ├── brand/           # High-resolution logos & vector emblems
│       ├── illustrations/   # Department artwork & education vectors
│       ├── departments/     # Faculty and campus imagery
│       ├── developers/      # Mentor and executive profile portraits
│       └── courses/         # Course curriculum banners
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, HTML metadata & global providers
│   │   ├── globals.css      # Core light theme tokens & contrast enforcement
│   │   ├── page.tsx         # Home landing page with dynamic hero carousel
│   │   ├── departments/     # Faculty catalogs & dynamic slug routes
│   │   ├── engineering/     # 8-semester engineering curriculum explorer
│   │   ├── practice/        # In-browser JavaScript IDE & Python compiler
│   │   ├── sorting-algorithm/# DSA live visualizer with Big-O analytics
│   │   ├── quiz/            # Timed technical quiz module with scoring
│   │   ├── assignment/      # Active semester coursework repository
│   │   ├── assignment-upload/# Drag-and-drop submission gateway
│   │   ├── developer-list/  # Mentors, CTO & developer directory
│   │   ├── about-us/        # Institutional history, mission & milestones
│   │   ├── contact/         # Campus location, inquiry form & office hours
│   │   ├── faqs/            # Categorized searchable accordion FAQ
│   │   ├── login/           # Multi-role authentication portal
│   │   ├── register/        # Registration with auto-age calculation
│   │   ├── forgot-password/ # Account recovery & verification
│   │   ├── terms-conditions/# Institutional terms of service
│   │   ├── privacy-policy/  # Student data privacy documentation
│   │   └── admin/
│   │       ├── dashboard/   # Executive KPI analytics dashboard
│   │       ├── users/       # User management data table & edit modal
│   │       └── settings/    # Platform preferences & academic policies
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx   # Top banner, mega menus & mobile drawer
│   │   │   └── Footer.tsx   # Light theme footer with quick links & attribution
│   │   └── common/
│   │       ├── FloatingWidgets.tsx # WhatsApp button & AI Assistant drawer
│   │       └── SocialIcons.tsx     # SVG vector social network emblems
│   └── styles/              # Scoped CSS modules for pages and components
├── package.json             # NPM dependencies, scripts and engine specs
├── tailwind.config.ts       # Color extensions (Navy #173E67, Orange #FF8000)
├── tsconfig.json            # Strict TypeScript configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node `v20.x` LTS recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/vivekajee/ED-World.git
cd ED-World
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to explore the platform.

---

## 🧪 Verification & Build Commands

Ensure code health and type safety before deployments:

```bash
# Type-check TypeScript files without emitting code
npx tsc --noEmit

# Build production bundle with Next.js Turbopack compiler
npm run build

# Start production server
npm run start

# Run ESLint validation
npm run lint
```

---

## 👥 Authors & Attribution

- **Developed By**: [Innovateria](https://innovateria.com)
- **Client & Organization**: ED-World Academy India Pvt Ltd
- **Technical Lead**: Vivek Kumar (CTO)

---

## 📄 License

This software and its custom educational modules are proprietary. All rights reserved by **Innovateria** and **ED-World Academy**. Unauthorized duplication, distribution, or commercial reuse without explicit written consent is prohibited.
