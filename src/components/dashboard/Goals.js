"use client";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import GoalsModal from "./GoalsModal";

export default function Goals() {
  const [target, setTarget] = useState(0);
  const [achieved, setAchieved] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("https://backend-1-bqpk.onrender.com/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setTarget(0);
          setAchieved(0);
          return;
        }

        const data = await res.json();
        setTarget(data?.target ?? 0);
        setAchieved(data?.achieved ?? 0);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        setTarget(0);
        setAchieved(0);
      }
    };

    if (token) fetchGoals();
  }, [token]);

  const percentage = target > 0 ? achieved / target : 0;
  const angle = percentage * 180;

  const handleSave = async ({ target, achieved }) => {
    try {
      const res = await fetch("https://backend-1-bqpk.onrender.com/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ target, achieved }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setTarget(data?.target ?? 0);
      setAchieved(data?.achieved ?? 0);
    } catch (err) {
      console.error("Failed to save goal:", err);
      setTarget(0);
      setAchieved(0);
    }
  };

  return (
    <div
      className="
        w-full 
        sm:max-w-[360px] md:max-w-[380px] lg:max-w-[335px]
        ml-0
      "
    >
      {/* Heading */}
      <h2 className="text-22px font-inter text-gray-500 mb-2">Goals</h2>

<Card className="
  p-3 sm:p-4 rounded-lg shadow-sm bg-white w-full cursor-pointer 
  h-[240px] sm:h-[260px] md:h-[280px] lg:h-[245px]
">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              ${target.toLocaleString()}
            </h2>
            <Pencil
              size={16}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <span className="text-sm text-gray-500">May, 2025</span>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* Content */}
        <div className="flex justify-between flex-1">
          <div className="space-y-3 text-sm mt-6">
            <p>
              <span className="text-gray-500">Target Achieved </span>
              <span className="font-medium">
                ${achieved.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="text-gray-500">This month Target </span>
              <span className="font-medium">
                ${target.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Gauge */}
          <div className="relative w-32 sm:w-36 md:w-40 h-20 sm:h-24">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#0d9488"
                strokeWidth="8"
                strokeDasharray={`${percentage * 126} 126`}
              />
            </svg>

            <div
              className="absolute left-1/2 bottom-0 w-[2px] h-14 bg-[#0d9488] origin-bottom"
              style={{ transform: `rotate(${angle - 90}deg) translateX(-50%)` }}
            ></div>

            <div className="absolute left-1/2 bottom-0 w-3 h-3 bg-[#0d9488] rounded-full transform -translate-x-1/2"></div>

            <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 text-sm font-semibold text-gray-800">
              ${achieved.toLocaleString()}
            </div>

            <div className="absolute left-0 bottom-0 text-xs text-gray-400">
              $0
            </div>
            <div className="absolute right-0 bottom-0 text-xs text-gray-400">
              ${target.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-center text-xs font-inter text-gray-500 mt-10">
          Target vs Achievement
        </div>
      </Card>

      {/* Modal */}
      <GoalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTarget={target}
        initialAchieved={achieved}
        onSave={handleSave}
      />
    </div>
  );
}
