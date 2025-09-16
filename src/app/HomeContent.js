"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import TotalBalance from "@/components/dashboard/TotalBalance";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Goals from "@/components/dashboard/Goals";
import UpcomingBills from "@/components/dashboard/UpcomingBills";
import Statistics from "@/components/dashboard/Statistics";
import ExpensesBreakdown from "@/components/dashboard/ExpensesBreakdown";

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (tokenFromUrl) {
      // Save from Google redirect
      localStorage.setItem("token", tokenFromUrl);
      if (name) localStorage.setItem("name", name);
      if (email) localStorage.setItem("email", email);

      document.cookie = `token=${tokenFromUrl}; path=/; max-age=604800`;
      router.replace("/");
      setLoading(false);
      return;
    }

    // Normal token check
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router, searchParams]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side (Header + Content) */}
      <div className="flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Top Row (4 Cards) */}
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
              <TotalBalance />
            </div>
            <div className="flex-1 min-w-[300px]">
              <Goals />
            </div>
            <div className="flex-1 min-w-[300px]">
              <UpcomingBills />
            </div>
            <div className="flex-1 min-w-[300px]">
              <RecentTransactions />
            </div>
          </div>

          {/* Weekly Comparison Chart Row */}
          <div className="mt-6">
            <Statistics />
            <ExpensesBreakdown />
          </div>
        </main>
      </div>
    </div>
  );
}
