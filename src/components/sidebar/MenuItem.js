"use client";
import { useDispatch, useSelector } from "react-redux";
import { setActive, closeSidebar } from "@/store/slices/uiSlice";
import Link from "next/link";

export default function MenuItem({ icon, label }) {
  const dispatch = useDispatch();
  const active = useSelector((s) => s.ui.active);
  const isActive = active === label;

  // Corrected routes map
  const routes = {
    Overview: "/",
    Balances: "/accounts",
    Transactions: "/transactions",
    Bills: "/bills",
    Expenses: "/expenses/linegraph",
    Goals: "/goals",
    Settings: "/profile", // 🔥 fixed here
  };

  const handleClick = () => {
    dispatch(setActive(label));
    dispatch(closeSidebar());
  };

  return (
    <Link
      href={routes[label] || "/"}
      onClick={handleClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-sm transition-colors
        ${
          isActive
            ? "bg-teal-900/30 border-teal-800 text-white"
            : "bg-[#161b22] border-[#1f2937] text-slate-300 hover:border-slate-600"
        }
      `}
    >
      <span
        className={`grid place-items-center ${
          isActive ? "text-teal-400" : "text-slate-400"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
