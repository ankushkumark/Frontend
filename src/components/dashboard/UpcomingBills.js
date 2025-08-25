// src/components/dashboard/UpcomingBills.jsx
"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react"; //  Stylish colorful icons

export default function UpcomingBills() {
  const [recentBills, setRecentBills] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`https://backend-1-bqpk.onrender.com/api/bills/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) {
          setRecentBills([]);
          return;
        }

        //  Latest 2 bills
        const sorted = data
          .sort(
            (a, b) =>
              new Date(b.dueDate || b.createdAt) -
              new Date(a.dueDate || a.createdAt)
          )
          .slice(0, 2);

        setRecentBills(sorted);
      })
      .catch((err) => console.error("Error fetching recent bills:", err));
  }, []);

  //  Icon picker for variety
  const getIcon = (index) => {
    const icons = [
      <CreditCard className="text-purple-500" size={18} key="cc" />,
      <Smartphone className="text-green-500" size={18} key="sp" />,
      <Wallet className="text-orange-500" size={18} key="wl" />,
    ];
    return icons[index % icons.length];
  };

  //  Dummy bills agar koi data nahi hai
  const dummyBills = [
    {
      id: "d1",
      dueDate: "N/A",
      title: "Netflix - Monthly",
      category: "Entertainment",
      amount: 0,
    },
    {
      id: "d2",
      dueDate: "N/A",
      title: "Spotify - Monthly",
      category: "Music",
      amount: 0,
    },
  ];

  //  Show either real or dummy bills
  const billsToShow = recentBills.length > 0 ? recentBills : dummyBills;

  return (
    <div className="w-full">
      {/* Heading (Card ke bahar) */}
      <div className="flex justify-between items-center mb-3 flex-wrap">
        <h2 className="text-22px font-inter text-gray-500 mb-2">
          Upcoming Bill
        </h2>
        <button className="text-sm text-teal-600 font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Card - fully responsive */}
      <Card
        className="
          p-4 rounded-lg shadow-sm bg-white 
          w-full h-auto
          sm:max-w-[360px] md:max-w-[380px] lg:max-w-[335px]
          min-h-[245px] mt-[-12px] flex flex-col justify-between
        "
      >
        <div className="space-y-3">
          {billsToShow.map((bill, idx) => (
            <div
              key={bill._id || bill.id}
              className="
                flex flex-col sm:flex-row sm:justify-between sm:items-center
                border rounded-lg px-3 py-2 
                hover:shadow transition
              "
            >
              {/* Left Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium">
                  {bill.dueDate?.split("T")?.[0] || "N/A"}
                </span>
                <span className="text-gray-600 text-sm truncate">
                  {bill.title}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {bill.category}
                </span>
              </div>

              {/* Amount + Colorful Icon */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
                <span className="font-semibold text-gray-800">
                  ${bill.amount}
                </span>
                {getIcon(idx)}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Bottom heading */}
        <div className="mt-4 text-center border-t pt-2">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
            Your Upcoming Bills
          </p>
        </div>
      </Card>
    </div>
  );
}
