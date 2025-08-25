"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  IconOverview, IconBalances, IconTransactions, IconBills,
  IconExpenses, IconGoals, IconSettings, IconLogout, IconDots, IconClose
} from "./Icons";
import MenuItem from "./MenuItem";
import { toggleSidebar, closeSidebar } from "@/store/slices/uiSlice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";

const MENU = [
  { label: "Overview", icon: <IconOverview /> },
  { label: "Balances", icon: <IconBalances /> },
  { label: "Transactions", icon: <IconTransactions />, path: "/transactions" }, //  added path
  { label: "Bills", icon: <IconBills />, path: "/bills" }, //  added path
  { label: "Expenses", icon: <IconExpenses />, path: "/expenses" },
  { label: "Goals", icon: <IconGoals />,  path: "/expenses/linegraph"},
  { label: "Settings", icon: <IconSettings />, path: "/profile"},
];


export default function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((s) => s.ui);
  const router = useRouter(); 
  const searchParams = useSearchParams();

  const [user, setUser] = useState(null);

  // 👇 logout
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login"); 
  };

  //  First check query params (After Google callback)
  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
  const avatar = localStorage.getItem("avatar");
    if (token) {
      localStorage.setItem("token", token);
      if (name) localStorage.setItem("name", name);
      if (email) localStorage.setItem("email", email);

      setUser({ name, email, avatar });
      window.history.replaceState({}, document.title, "/");
    }
  }, [searchParams]);

  // Load user from localStorage (refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
const avatar = localStorage.getItem("avatar");

    if (token && (name || email)) {
  setUser({ name, email, avatar });
} else if (token) {
      // fallback: backend call
      const fetchUser = async () => {
        try {
          const res = await fetch("https://backend-1-bqpk.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
  const data = await res.json();
  setUser(data.user);
  localStorage.setItem("name", data.user.name);
  localStorage.setItem("email", data.user.email);
  if (data.user.avatar) {
    localStorage.setItem("avatar", data.user.avatar); 
  }
}

        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
  const syncUser = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatar");

    setUser({ name, email, avatar });
  };

  // run once on mount
  syncUser();

  // listen for changes
  window.addEventListener("storage", syncUser);
  return () => window.removeEventListener("storage", syncUser);
}, []);


  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden fixed top-3 left-3 z-50 bg-white text-gray-900 rounded-xl shadow-md p-2"
      >
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#0f141a] text-slate-300 border-r border-[#1f2937]
        grid grid-rows-[auto_1fr_auto] p-5 overflow-y-auto
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Mobile brand header */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-teal-500 to-sky-500 ring-4 ring-[#0f141a]" />
            <span className="text-lg font-bold tracking-wide">XpenseTrakr</span>
          </div>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="text-slate-300 hover:text-white"
          >
            <IconClose />
          </button>
        </div>

        {/* Desktop brand header */}
        <div className="hidden lg:flex items-center gap-3 mb-4">
          <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-teal-500 to-sky-500 ring-4 ring-[#0f141a]" />
          <span className="text-lg font-bold tracking-wide">XpenseTrakr</span>
        </div>

        {/* Menu */}
<nav className="flex flex-col gap-2" aria-label="Main menu">
  {MENU.map((m) => (
    <div
      key={m.label}
      onClick={() => m.path && router.push(m.path)} //  navigate if path exists
    >
      <MenuItem label={m.label} icon={m.icon} />
    </div>
  ))}
</nav>


        {/* Bottom section */}
<div className="mt-4 flex flex-col gap-3">
  {/* Logout button */}
  <button
    onClick={handleLogout} 
    className="flex items-center gap-2 w-full bg-[#0e1319] border border-[#1f2937] text-slate-200 px-3 py-2 rounded-xl hover:bg-[#1a1f25] transition"
  >
    <span className="text-slate-400"><IconLogout /></span>
    <span className="truncate">Logout</span>
  </button>

  {/* Profile Card */}
  <div className="flex items-center gap-3 bg-[#161b22] border border-[#1f2937] rounded-xl p-2">
    {/* Avatar */}
    <div className="w-9 h-9 overflow-hidden rounded-full shrink-0">
  <Image
    src={
  user?.avatar?.startsWith("http")
    ? user.avatar
    : user?.avatar
    ? `https://backend-1-bqpk.onrender.com/${user.avatar}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`
}
    alt={user?.name || "User"}
    width={36}
    height={36}
    unoptimized
  />
</div>


    {/* User Info */}
    <div className="flex flex-col min-w-0 leading-tight">
      <span className="text-sm font-semibold text-white truncate max-w-[140px]">
        {user?.name || "Guest User"}
      </span>
      <span className="text-xs text-slate-400 truncate max-w-[140px]">
        {user?.email || "No email"}
      </span>
    </div>

    {/* Options button */}
    <button className="ml-auto text-slate-400 hover:text-white">
      <IconDots />
    </button>
  </div>
</div>

      </aside>

      {/* Right content wrapper */}
      <main className="flex-1 lg:ml-64 p-4">
      </main>
    </>
  );
}
