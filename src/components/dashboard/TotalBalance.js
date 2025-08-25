"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function TotalBalance() {
  const [accounts, setAccounts] = useState([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const fetchedOnce = useRef(false);

  // ✅ Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      if (fetchedOnce.current) return;
      fetchedOnce.current = true;

      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`https://backend-1-bqpk.onrender.com/api/accounts/user/${userId}`);
        if (!res.ok) {
          console.error("Failed to fetch accounts:", await res.text());
          return;
        }
        const data = await res.json();

        if (data.length === 0) {
          setAccounts([
            {
              type: "Add Account",
              number: "**** **** **** 0000",
              balance: "$0",
              color: "bg-[#0d9488]",
            },
          ]);
        } else {
          setAccounts(data);
        }
      } catch (err) {
        console.error("❌ Error fetching accounts:", err);
        setAccounts([
          {
            type: "Dummy Account",
            number: "**** **** **** 0000",
            balance: "$0",
            color: "bg-[#0d9488]",
          },
        ]);
      }
    };

    fetchAccounts();
  }, [router]);

  const prev = () => setIndex((index - 1 + accounts.length) % accounts.length);
  const next = () => setIndex((index + 1) % accounts.length);

  if (accounts.length === 0) return null; // safeguard

  return (
  <div
    className="
      w-full 
      sm:max-w-[360px] md:max-w-[380px] lg:max-w-[335px]
      ml-0
    "
  >
    {/* Heading */}
    <h2 className="text-22px font-inter text-gray-500 mb-2">
      Total Balance
    </h2>

    <Card
      className="p-2 sm:p-3 rounded-lg bg-white shadow-sm w-full cursor-pointer"
      onClick={() => router.push("/accounts")}
    >
      {/* Total Balance Amount */}
      <p className="text-lg font-bold text-gray-900 mb-2">
        ${accounts[index].balance}
      </p>
      <CardContent className="p-0">
        {/* Active Account */}
        <div
          className={`rounded-md p-3 text-white transition-all ${
            accounts[index].color || "bg-gray-500"
          }`}
        >
          <p className="text-[10px]">Account Type</p>
          <h3 className="text-sm font-semibold">{accounts[index].type}</h3>
          <p className="text-[10px] mt-0.5">{accounts[index].number}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold">
              {accounts[index].balance}
            </span>
            <span className="text-sm">💳</span>
          </div>
        </div>
      </CardContent>

      {/* Controls + Dots */}
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-3 h-3" />
          Prev
        </button>

        <div className="flex gap-1">
          {accounts.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          Next
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </Card>
  </div>
);

}
