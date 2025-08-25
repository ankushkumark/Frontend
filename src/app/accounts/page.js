"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddAccountModal from "./AddAccountModal";

//  Random Tailwind color generator
const getRandomColor = () => {
  const colors = [
    "bg-teal-600",
    "bg-blue-600",
    "bg-orange-500",
    "bg-red-500",
    "bg-purple-600",
    "bg-green-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  //  Fetch Accounts from DB
  useEffect(() => {
    const fetchAccounts = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("❌ No userId found in localStorage, redirecting...");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `https://backend-1-bqpk.onrender.com/api/accounts/user/${userId}`
        );
        if (res.ok) {
          const data = await res.json();
          setAccounts(data);
        }
      } catch (err) {
        console.error("❌ Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, [router]);

  //  Add Account
  const handleAddAccount = async (newAcc) => {
    try {
      const userId = localStorage.getItem("userId"); 
      const res = await fetch("https://backend-1-bqpk.onrender.com/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAcc,
          color: getRandomColor(),
          userId, // dynamic id
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        setAccounts((prev) => [...prev, saved]);
      }
    } catch (err) {
      console.error("❌ Error adding account:", err);
    }
  };

  //  Remove Account
  const handleRemoveAccount = async (id) => {
    try {
      const res = await fetch(`https://backend-1-bqpk.onrender.com/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAccounts((prev) => prev.filter((acc) => acc._id !== id));
      }
    } catch (err) {
      console.error("❌ Error removing account:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Top Heading + Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          All Accounts
        </h1>
        <button
          onClick={() => router.back()}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <Card
            key={acc._id}
            className="rounded-xl bg-white shadow-md hover:shadow-lg transition flex flex-col"
          >
            <CardContent
              className={`rounded-t-xl p-4 sm:p-5 text-white ${acc.color}`}
            >
              <p className="text-[11px] sm:text-xs">Account Type</p>
              <h3 className="text-base sm:text-lg font-semibold">{acc.type}</h3>
              <p className="text-[11px] sm:text-xs mt-0.5">{acc.number}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold">
                  {acc.balance}
                </span>
                <span className="text-lg">💳</span>
              </div>
            </CardContent>

            {/* Buttons Section */}
            <div className="flex justify-between p-3 mt-auto">
              {/* Left side Remove */}
              <button
                onClick={() => handleRemoveAccount(acc._id)}
                className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-700 transition"
              >
                Remove
              </button>

              {/* Right side Add Details */}
              <button
                onClick={() => router.push(`/accounts/${acc._id}`)} // ✅ singular account
                className="bg-teal-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-teal-700 transition"
              >
                Add Details
              </button>
            </div>
          </Card>
        ))}

        {/* ➕ Extra Add Account Card */}
        <Card
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl bg-white shadow-md hover:shadow-lg transition flex items-center justify-center cursor-pointer"
        >
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-teal-700 transition">
              + Add Account
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAccount}
      />
    </div>
  );
}
