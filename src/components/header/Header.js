"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/slices/uiSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Download,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((s) => s.ui);

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentBills, setRecentBills] = useState([]);

  //  User info load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && (name || email)) {
      setUser({ name, email });
    } else if (token) {
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
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      };
      fetchUser();
    }
  }, []);

  //  Fetch recent bills (only 2 latest)
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`https://backend-1-bqpk.onrender.com/api/bills/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
          .slice(0, 2);
        setRecentBills(sorted);
      })
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (sidebarOpen) return null;

  const today = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const downloadData = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    //  Transactions fetch 
    const res = await fetch(`https://backend-1-bqpk.onrender.com/api/recent-transactions/${userId}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      alert("No transactions found!");
      return;
    }

    //  Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    //  File save
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "transactions.xlsx");
  } catch (err) {
    console.error("Error downloading transactions:", err);
  }
};

  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Hamburger + User */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu size={22} className="text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[200px]">
              Hello, {user?.name || "Guest User"}{" "}
              <span className="mx-1 text-sm text-gray-400">&gt;&gt;</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {formattedDate}
              </span>
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 w-full sm:w-auto relative">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>

          {/* Download button */}
          <button
            onClick={downloadData}
            className="px-3 py-1.5 text-sm rounded-md bg-teal-500 text-white hover:bg-teal-600"
          >
            Download Data
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-200" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>

          {/* Notification Box */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="text-lg font-semibold text-teal-600">
                  Your Upcoming Bills
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <X size={18} className="text-gray-500 dark:text-gray-300" />
                </button>
              </div>

              {recentBills.length > 0 ? (
                <ul className="space-y-3">
                  {recentBills.map((bill) => (
                    <li
                      key={bill._id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {bill.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {bill.dueDate?.split("T")[0] || "N/A"}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ${bill.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No upcoming bills</p>
              )}
            </div>
          )}

          {/* Search */}
          <div className="relative flex-1 sm:flex-none w-full sm:w-64 md:w-80">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pr-9 pl-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <Search
              size={18}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
