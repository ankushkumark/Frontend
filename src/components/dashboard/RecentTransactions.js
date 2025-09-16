// src/components/dashboard/RecentTransactions.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ShoppingCart,
  Shirt,
  Utensils,
  Car,
  Keyboard,
  Coffee,
  Laptop,
} from "lucide-react";

const staticTransactions = [
  { id: 1, title: "GTR 5", subtitle: "Gadget & Gear", icon: ShoppingCart },
  { id: 2, title: "Polo Shirt", subtitle: "XL fashions", icon: Shirt },
  { id: 3, title: "Biriyani", subtitle: "Hajir Biriyani", icon: Utensils },
  { id: 4, title: "Taxi Fare", subtitle: "Uber", icon: Car },
  { id: 5, title: "Keyboard", subtitle: "Gadget & Gear", icon: Keyboard },
  { id: 6, title: "Coffee", subtitle: "Starbucks", icon: Coffee },
  { id: 7, title: "MacBook", subtitle: "Apple Store", icon: Laptop },
];

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(null);

  //  Fetch from DB
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    setUserId(id);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/recent-transactions/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, []);

  // Save transaction
  const handleSave = async () => {
    if (!userId || !selectedTx || !amount) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/recent-transactions/${userId}/${selectedTx.title}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(amount),
            date: new Date(),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save transaction");

      const newTx = await res.json();

      // Update local state
      setTransactions((prev) => {
        const filtered = prev.filter((t) => t.key !== selectedTx.title);
        return [newTx, ...filtered];
      });

      setSelectedTx(null);
      setAmount("");
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  // Get saved data for static transaction
  const getTxData = (tx) => {
    if (!transactions || transactions.length === 0) {
      return { amount: 0, date: "-" };
    }

    const found = transactions.find(
      (t) => t.key === tx.title && t.userId === userId
    );
    return {
      amount: found ? found.amount : 0,
      date: found ? new Date(found.date).toLocaleDateString() : "-",
    };
  };

  return (
    <div className="w-full sm:max-w-[360px] md:max-w-[380px] lg:max-w-[335px]">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[22px] font-inter text-gray-700 dark:text-gray-300">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="text-sm text-teal-600 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Card Box */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
        {/* Tabs */}
        <div className="flex gap-6 text-gray-600 dark:text-gray-300 font-medium mb-4 text-sm">
          <span className="text-teal-600 border-b-2 border-teal-600 pb-1">
            All
          </span>
          <span className="hover:text-black dark:hover:text-white cursor-pointer">
            Revenue
          </span>
          <span className="hover:text-black dark:hover:text-white cursor-pointer">
            Expenses
          </span>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {staticTransactions.map((tx) => {
            const Icon = tx.icon;
            const txData = getTxData(tx);
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-2 rounded-md"
                onClick={() => setSelectedTx(tx)}
              >
                {/* Icon + Text */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-teal-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {tx.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tx.subtitle}
                    </p>
                  </div>
                </div>

                {/* Amount + Date */}
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    ${txData.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{txData.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-xs sm:max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Add Amount - {selectedTx.title}
            </h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
