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
<<<<<<< HEAD
        const res = await fetch(`http://localhost:5000/api/expenses/${id}`);
=======
        const res = await fetch(`https://backend-1-bqpk.onrender.com/api/expenses/${id}`);
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
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
<<<<<<< HEAD
        `http://localhost:5000/api/expenses/${userId}/${selectedItem.title}`,
=======
        `https://backend-1-bqpk.onrender.com/api/expenses/${userId}/${selectedItem.title}`,
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
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
<<<<<<< HEAD
      {/* ✅ Card */}
      <div className="w-full max-w-[680px] rounded-2xl shadow-2xl bg-white dark:bg-gray-900 transition-colors duration-300 mt-1 pt-7 pb-3 px-4 ml-auto">
        <h2 className="text-gray-600 dark:text-gray-200 text-22px sm:text-lg lg:text-xl font-inter mb-1 ml-0 mt-0">
          Expenses Breakdown
        </h2>
=======
      {/* ✅ Heading */}
      

      {/* ✅ Card */}
      <div className="w-full max-w-[680px] rounded-2xl shadow-2xl bg-white mt-1 pt-7 pb-3 px-4 ml-auto">
        <h2 className="text-gray-600 text-22px sm:text-lg lg:text-xl font-inter mb-1 ml-0 mt-0">
        Expenses Breakdown
      </h2>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {staticExpenses.map((item) => {
            const Icon = item.icon;
            const data = getExpenseData(item);
            return (
              <div
                key={item.id}
<<<<<<< HEAD
                className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
=======
                className="flex items-center justify-between bg-white border rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-gray-50"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                onClick={() => setSelectedItem(item)}
              >
                {/* Left */}
                <div className="flex items-center gap-2 sm:gap-3">
<<<<<<< HEAD
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {item.title}
                    </p>
                    <p className="text-sm sm:text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-100">
=======
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                      {item.title}
                    </p>
                    <p className="text-sm sm:text-lg font-semibold whitespace-nowrap">
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
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
<<<<<<< HEAD
                  <span className="text-gray-400 dark:text-gray-500 text-sm sm:text-base leading-none">→</span>
=======
                  <span className="text-gray-400 text-sm sm:text-base leading-none">→</span>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
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
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-80 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Update Amount - {selectedItem.title}
            </h3>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
=======
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Update Amount - {selectedItem.title}
            </h3>
            <p className="mb-2 text-sm text-gray-500">
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
              Current: ${getExpenseData(selectedItem).amount}
            </p>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Enter new amount"
<<<<<<< HEAD
              className="w-full border rounded-lg px-3 py-2 mb-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
=======
              className="w-full border rounded-lg px-3 py-2 mb-4"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedItem(null)}
<<<<<<< HEAD
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
=======
                className="px-4 py-2 rounded-lg bg-gray-200"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
<<<<<<< HEAD
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition"
=======
                className="px-4 py-2 rounded-lg bg-teal-600 text-white"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
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
