"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function GoalsModal({ isOpen, onClose, onSave, initialTarget, initialAchieved }) {
  const [target, setTarget] = useState(initialTarget);
  const [achieved, setAchieved] = useState(initialAchieved);

  useEffect(() => {
    if (isOpen) {
      setTarget(initialTarget);
      setAchieved(initialAchieved);
    }
  }, [isOpen, initialTarget, initialAchieved]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[150%] max-w-md p-6 relative">
        
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Edit Goals</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Target Amount</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Present Amount</label>
            <input
              type="number"
              value={achieved}
              onChange={(e) => setAchieved(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => {
            onSave({ target, achieved });
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
