// components/ui/Skeletons.tsx
import React from "react";

export function HeroSkeleton() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 w-full">
            <div className="h-12 md:h-16 bg-zinc-800/50 rounded-lg animate-pulse mb-4 w-3/4" />
            <div className="h-6 bg-zinc-800/50 rounded animate-pulse mb-2 w-full" />
            <div className="h-6 bg-zinc-800/50 rounded animate-pulse mb-2 w-5/6" />
            <div className="h-6 bg-zinc-800/50 rounded animate-pulse mb-6 w-4/6" />
            
            <div className="flex flex-wrap gap-2">
              <div className="h-10 w-32 bg-zinc-800/50 rounded-full animate-pulse" />
              <div className="h-10 w-28 bg-zinc-800/50 rounded-full animate-pulse" />
              <div className="h-10 w-28 bg-zinc-800/50 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-zinc-800/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="h-8 w-40 bg-zinc-800/50 rounded animate-pulse mb-6" />
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-800/50 backdrop-blur bg-zinc-900/30 p-5 md:p-6">
            <div className="h-6 w-3/4 bg-zinc-800/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-zinc-800/50 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-4 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-zinc-800/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="h-8 w-32 bg-zinc-800/50 rounded animate-pulse mb-6" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-800/50 backdrop-blur bg-zinc-900/30 p-5">
            <div className="h-6 w-3/4 bg-zinc-800/50 rounded animate-pulse mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-4 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-zinc-800/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkeletonLoader() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-zinc-950/60 border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="h-6 w-24 bg-zinc-800/50 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-zinc-800/50 rounded-full animate-pulse" />
            <div className="h-10 w-24 bg-zinc-800/50 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <HeroSkeleton />
      
      {/* Skills Skeleton */}
      <section className="border-y border-zinc-800 bg-neutral-950/40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-24 bg-zinc-800/50 rounded-full animate-pulse shrink-0" />
          ))}
        </div>
      </section>

      <ExperienceSkeleton />
      <ProjectsSkeleton />
      
      {/* Footer Skeleton */}
      <footer className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-4 w-64 bg-zinc-800/50 rounded animate-pulse mx-auto" />
      </footer>
    </main>
  );
}