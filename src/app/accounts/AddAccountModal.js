"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AddAccountModal({ isOpen, onClose, onSave }) {
  const [balance, setBalance] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [accounts, setAccounts] = useState([
    { type: "Savings", number: "**** **** **** 1234", balance: 2500 },
    { type: "Credit Card", number: "**** **** **** 5678", balance: 15000 },
  ]);

  // Random card number generate
  useEffect(() => {
    if (isOpen) {
      const num = "**** **** **** " + Math.floor(1000 + Math.random() * 9000);
      setCardNumber(num);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90%] max-w-md p-6 relative transition">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Add New Account
        </h2>

        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              disabled
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Balance
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter Balance"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => {
            const newAcc = {
              type: "Custom Account",
              number: cardNumber,
              balance: Number(balance),
              color: "bg-purple-600",
            };
            setAccounts((prev) => [...prev, newAcc]);
            onSave(newAcc);
            onClose();
          }}
          className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Save
        </button>

        {/* Account List */}
        <div className="mt-6 space-y-3">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-200">
            Saved Accounts
          </h3>
          <ul className="space-y-2">
            {accounts.map((acc, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-3 rounded-md border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {acc.type}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {acc.number}
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  ₹{acc.balance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
