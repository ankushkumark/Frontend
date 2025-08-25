"use client";
import { useEffect, useState } from "react";
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

  // 🔹 Fetch from DB
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    setUserId(id);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://backend-1-bqpk.onrender.com/api/recent-transactions/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, []);

  // 🔹 Save transaction
  const handleSave = async () => {
    if (!userId || !selectedTx || !amount) return;
    try {
      const res = await fetch(
        `https://backend-1-bqpk.onrender.com/api/recent-transactions/${userId}/${selectedTx.title}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(amount),
            date: new Date(),
          }),
        }
      );
      const newTx = await res.json();
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

  // 🔹 Get saved data for static transaction
  const getTxData = (tx) => {
    const found = transactions.find((t) => t.key === tx.title); 
    return {
      amount: found ? found.amount : 0,
      date: found ? new Date(found.date).toLocaleDateString() : "-",
    };
  };

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Section Header */}
<div className="flex items-center justify-center mb-3 relative">
  <h2 className="text-lg sm:text-xl font-inter text-teal-600 text-center">
    Recent Transactions
  </h2>

  <button className="absolute right-0 text-sm text-teal-600 font-medium hover:underline">
    View All
  </button>
</div>


      {/* Card Box */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 max-w-full sm:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-6 text-gray-600 font-medium mb-4 text-sm overflow-x-auto">
          <span className="text-teal-600 border-b-2 border-teal-600 pb-1 shrink-0">
            All
          </span>
          <span className="hover:text-black cursor-pointer shrink-0">
            Revenue
          </span>
          <span className="hover:text-black cursor-pointer shrink-0">
            Expenses
          </span>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-gray-200">
          {staticTransactions.map((tx) => {
            const Icon = tx.icon;
            const txData = getTxData(tx);
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-md"
                onClick={() => setSelectedTx(tx)}
              >
                {/* Icon + Text */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-teal-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{tx.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {tx.subtitle}
                    </p>
                  </div>
                </div>

                {/* Amount + Date */}
                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base">
                    ${txData.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{txData.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 rounded-xl bg-teal-600 text-white hover:bg-gray-700"
        >
          ← Back
        </button>
      </div>

      {/* Popup Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm sm:max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Add Amount - {selectedTx.title}
            </h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-lg bg-gray-200"
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
