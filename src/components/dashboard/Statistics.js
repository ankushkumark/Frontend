"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

export default function Statistics({ refresh }) {
  const [view, setView] = useState("week"); // week | month
  const [data, setData] = useState([]);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // 🔹 Fetch stats from backend
  useEffect(() => {
    async function fetchStats() {
      try {
        const endpoint = view === "week" ? "weekly" : "monthly";
        const res = await fetch(
          `http://localhost:5000/api/stats/${endpoint}/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const stats = await res.json();
        setData(stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }

    if (userId) {
      fetchStats();

      const interval = setInterval(fetchStats, 1000);
      return () => clearInterval(interval); // cleanup
    }
  }, [view, userId]);

  return (
    <div className="w-full">
      <Card
        className="
          p-5 rounded-lg shadow-sm 
          bg-white dark:bg-gray-900 
          w-full h-[250px] mt-4
          lg:max-w-[680px] lg:h-[253px] 
          lg:ml-auto lg:mr-[-0px] lg:mt-[-525px]
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {/* ✅ Heading */}
          <h2 className="text-sm sm:text-base lg:text-lg font-inter text-gray-600 dark:text-gray-300">
            Statistics
          </h2>

          {/* ✅ Buttons */}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              onClick={() => setView("week")}
              variant={view === "week" ? "default" : "outline"}
              size="sm"
              className={`text-xs px-2 py-1 ${
                view === "week"
                  ? "bg-[#0d9488] text-white"
                  : "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
              }`}
            >
              This Week
            </Button>
            <Button
              onClick={() => setView("month")}
              variant={view === "month" ? "default" : "outline"}
              size="sm"
              className={`text-xs px-2 py-1 ${
                view === "month"
                  ? "bg-[#0d9488] text-white"
                  : "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
              }`}
            >
              Last Month
            </Button>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="75%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#374151" // dark gray lines
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "currentColor" }}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "currentColor" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              contentStyle={{
                fontSize: "12px",
                backgroundColor: "var(--tw-bg-opacity, #fff)",
                color: "var(--tw-text-opacity, #000)",
              }}
              labelStyle={{ color: "inherit" }}
            />
            <Bar
              dataKey="lastWeek"
              fill="#e5e7eb" // light gray
              className="dark:fill-gray-700"
              radius={[6, 6, 0, 0]}
              barSize={15}
            />
            <Bar
              dataKey="thisWeek"
              fill="#0d9488"
              radius={[6, 6, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
