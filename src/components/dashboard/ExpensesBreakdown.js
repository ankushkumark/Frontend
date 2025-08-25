"use client";
import { useEffect, useState } from "react";
import {
  Home,
  Utensils,
  Bus,
  Film,
  ShoppingBag,
  Grid as GridIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Statistics from "./Statistics"; // ✅ import Graph

const staticExpenses = [
  { id: 1, title: "Housing", amount: 250, percent: 15, isUp: true, icon: Home },
  { id: 2, title: "Food", amount: 350, percent: 8, isUp: false, icon: Utensils },
  { id: 3, title: "Transportation", amount: 50, percent: 12, isUp: false, icon: Bus },
  { id: 4, title: "Entertainment", amount: 80, percent: 15, isUp: false, icon: Film },
  { id: 5, title: "Shopping", amount: 420, percent: 25, isUp: true, icon: ShoppingBag },
  { id: 6, title: "Others", amount: 650, percent: 23, isUp: true, icon: GridIcon },
];

export default function ExpensesBreakdown() {
  const [expenses, setExpenses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // trigger for graph reload

  // Fetch user data from DB
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    setUserId(id);

    const fetchData = async () => {
      try {
        const res = await fetch(`https://backend-1-bqpk.onrender.com/api/expenses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchData();
  }, []);

  // Get saved data for each static expense
  const getExpenseData = (item) => {
    const found = expenses.find((e) => e.key === item.title);
    return {
      amount: found ? found.amount : 0,
      percent: item.percent,
      isUp: item.isUp,
    };
  };

  // Save updated expense
  const handleSave = async () => {
    if (!userId || !selectedItem || !newAmount) return;

    try {
      const res = await fetch(
        `https://backend-1-bqpk.onrender.com/api/expenses/${userId}/${selectedItem.title}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(newAmount),
            date: new Date(),
          }),
        }
      );

      const updatedExpense = await res.json();

      setExpenses((prev) => {
        const filtered = prev.filter((e) => e.key !== selectedItem.title);
        return [updatedExpense, ...filtered];
      });

      // Refresh graph instantly
      setRefreshTrigger(Date.now());

      setSelectedItem(null);
      setNewAmount("");
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <div>
      {/* ✅ Heading */}
      

      {/* ✅ Card */}
      <div className="w-full max-w-[680px] rounded-2xl shadow-2xl bg-white mt-1 pt-7 pb-3 px-4 ml-auto">
        <h2 className="text-gray-600 text-22px sm:text-lg lg:text-xl font-inter mb-1 ml-0 mt-0">
        Expenses Breakdown
      </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {staticExpenses.map((item) => {
            const Icon = item.icon;
            const data = getExpenseData(item);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedItem(item)}
              >
                {/* Left */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                      {item.title}
                    </p>
                    <p className="text-sm sm:text-lg font-semibold whitespace-nowrap">
                      ${data.amount}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end">
                  <p
                    className={`flex items-center text-xs sm:text-sm font-medium ${
                      data.isUp ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {data.percent}%
                    {data.isUp ? (
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    )}
                  </p>
                  <span className="text-gray-400 text-sm sm:text-base leading-none">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Graph */}
      {/* <Statistics refreshTrigger={refreshTrigger} /> */}

      {/* 🔹 Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Update Amount - {selectedItem.title}
            </h3>
            <p className="mb-2 text-sm text-gray-500">
              Current: ${getExpenseData(selectedItem).amount}
            </p>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Enter new amount"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedItem(null)}
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
