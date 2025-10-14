"use client"

import React, { useEffect, Suspense } from "react";
import { usePortfolioData } from "@/lib/hooks/usePortfolioData";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SkeletonLoader } from "@/components/ui/Skeletons";
import ErrorState from "@/components/ui/ErrorState";
import Projects from "@/components/Project";
import { Hero } from "@/components/Hero";

function PortfolioContent() {
  const { data, loading, error } = usePortfolioData();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error || !data.profile) {
    return (
      <main className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 min-h-screen flex items-center justify-center">
        <ErrorState message={error || "Failed to load portfolio data"} />
      </main>
    );
  }

  return (
    <main className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 min-h-screen">
      <Header profile={data.profile} />
      <Hero profile={data.profile} />
      <Skills skills={data.profile.skills || []} />
      <About />
      <Experience experiences={data.experiences || []} />
      <Education educations={data.educations || []} />
      <Projects projects={data.projects || []} />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12"><p className="text-center text-zinc-500">Loading blogs...</p></div>}>
        <Blog posts={data.posts || []} />
      </Suspense>
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />
    </main>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <PortfolioContent />
    </Suspense>
  );
}