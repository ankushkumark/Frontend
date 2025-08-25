"use client";
import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}
