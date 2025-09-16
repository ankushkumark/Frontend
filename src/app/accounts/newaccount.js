"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddAccountModal from "./AddAccountModal";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const fetchedOnce = useRef(false);

  //  Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      if (fetchedOnce.current) return;
      fetchedOnce.current = true;

      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("userId missing. Login dobara kar.");
        router.push("/login");
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/accounts/user/${userId}`
      );
      if (!res.ok) {
        console.error("Fetch accounts failed:", await res.text());
        return;
      }
      const data = await res.json();
      setAccounts(data);
    };

    fetchAccounts();
  }, [router]);

  const handleAddAccount = async (newAcc) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in again.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAcc, userId }),
      });

      if (res.ok) {
        const saved = await res.json();
        setAccounts((prev) => [...prev, saved]);
      } else {
        console.error("Add account failed:", await res.text());
      }
    } catch (e) {
      console.error("❌ Error adding account:", e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          All Accounts
        </h1>

        <div className="flex gap-3">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="bg-teal-600 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Back
          </button>

          {/*  Add Account Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          >
            Add Account
          </button>
        </div>
      </div>

      {/*  Render accounts from DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <Card
            key={acc._id}
            className="rounded-xl bg-white shadow-md hover:shadow-lg transition"
          >
            <CardContent
              className={`rounded-t-xl p-4 sm:p-5 text-white ${acc.color}`}
            >
              <h3 className="text-base sm:text-lg font-semibold">{acc.type}</h3>
              <p className="text-[11px] sm:text-xs mt-0.5">{acc.number}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold">
                  {acc.balance}
                </span>
                <span className="text-lg">💳</span>
              </div>
            </CardContent>

            <div className="flex-end p-3">
              <button
                onClick={() => router.push(`/accounts/${acc._id}`)} //  real Mongo _id
                className="bg-teal-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-teal-700 transition"
              >
                Add Details
              </button>
            </div>
          </Card>
        ))}
      </div>

      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAccount}
      />
    </div>
  );
}
