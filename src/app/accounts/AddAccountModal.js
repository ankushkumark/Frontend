"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AddAccountModal({ isOpen, onClose, onSave }) {
  const [balance, setBalance] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // Random card number generate
  useEffect(() => {
    if (isOpen) {
      const num = "**** **** **** " + Math.floor(1000 + Math.random() * 9000);
      setCardNumber(num);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              disabled
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Balance</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter Balance"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <button
  onClick={() => {
    onSave({
      type: "Custom Account",
      number: cardNumber,
      balance: Number(balance),   // ✅ fix
      color: "bg-purple-600",
    });
    onClose();
  }}
  className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
>
  Save
</button>

      </div>
    </div>
  );
}
