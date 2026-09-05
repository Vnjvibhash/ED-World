import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/common/FloatingWidgets";

export const metadata: Metadata = {
  title: "Student World | Best Education & Coding Platform for Students",
  description: "Student World is an all-in-one educational platform engineered for students, to the students, and by the students. Learn coding, take quizzes, explore sorting algorithms, and access engineering course materials.",
  keywords: ["Student World", "Engineering", "Coding Practice", "Quiz", "Sorting Algorithms", "Computer Science", "Vivek Kumar"],
  authors: [{ name: "Vivek Kumar", url: "https://www.linkedin.com/in/vivekajee/" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
