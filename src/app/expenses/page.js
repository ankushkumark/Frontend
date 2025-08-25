"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import useExpenses from "@/hooks/useExpenses";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Statistics() {
  const [view, setView] = useState("week");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 📌 Weekly Data
  const weeklyData = [
    { day: "Sun", thisWeek: 240000, lastWeek: 180000 },
    { day: "Mon", thisWeek: 180000, lastWeek: 220000 },
    { day: "Tue", thisWeek: 200000, lastWeek: 170000 },
    { day: "Wed", thisWeek: 220000, lastWeek: 200000 },
    { day: "Thu", thisWeek: 260000, lastWeek: 230000 },
    { day: "Fri", thisWeek: 240000, lastWeek: 190000 },
    { day: "Sat", thisWeek: 210000, lastWeek: 170000 },
  ];

  // 📌 Monthly Data
  const monthlyData = [
    { month: "Jan", thisYear: 240000, lastYear: 180000 },
    { month: "Feb", thisYear: 180000, lastYear: 220000 },
    { month: "Mar", thisYear: 200000, lastYear: 170000 },
    { month: "Apr", thisYear: 220000, lastYear: 200000 },
    { month: "May", thisYear: 260000, lastYear: 230000 },
    { month: "Jun", thisYear: 240000, lastYear: 190000 },
    { month: "Jul", thisYear: 210000, lastYear: 170000 },
    { month: "Aug", thisYear: 230000, lastYear: 180000 },
    { month: "Sep", thisYear: 250000, lastYear: 200000 },
    { month: "Oct", thisYear: 270000, lastYear: 220000 },
    { month: "Nov", thisYear: 280000, lastYear: 230000 },
    { month: "Dec", thisYear: 300000, lastYear: 250000 },
  ];

  // 📌 Data switcher
  const chartData = view === "week" ? weeklyData : monthlyData;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto w-full px-4 space-y-6">
          {/* ===== Chart Card ===== */}
          <Card className="p-4 rounded-lg shadow-sm bg-white w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <h2 className="text-sm font-semibold text-gray-600">
                  {view === "month"
                    ? "Monthly Comparison"
                    : "Weekly Comparison"}
                </h2>
                {dropdownOpen ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-7 left-0 bg-white shadow-md rounded-md border w-40 text-sm z-10">
                  <div
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setView("week");
                      setDropdownOpen(false);
                    }}
                  >
                    Weekly Comparison
                  </div>
                  <div
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setView("month");
                      setDropdownOpen(false);
                    }}
                  >
                    Monthly Comparison
                  </div>
                </div>
              )}
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey={view === "week" ? "day" : "month"}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ fontSize: "12px" }}
                />
                <Bar
                  dataKey={view === "week" ? "lastWeek" : "lastYear"}
                  fill="#e5e7eb"
                  radius={[6, 6, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey={view === "week" ? "thisWeek" : "thisYear"}
                  fill="#0d9488"
                  radius={[6, 6, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          {/* ===== Expenses Breakdown Grid ===== */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {[
    {
      title: "Housing",
      amount: 250,
      change: 15,
      trend: "up",
      items: [
        { label: "House Rent", value: 230, date: "17 May 2023" },
        { label: "Parking", value: 20, date: "17 May 2023" },
      ],
    },
    {
      title: "Food",
      amount: 350,
      change: 8,
      trend: "down",
      items: [
        { label: "Grocery", value: 230, date: "17 May 2023" },
        { label: "Restaurant bill", value: 120, date: "17 May 2023" },
      ],
    },
    {
      title: "Transportation",
      amount: 50,
      change: 12,
      trend: "down",
      items: [
        { label: "Taxi Fare", value: 30, date: "17 May 2023" },
        { label: "Metro Card bill", value: 20, date: "17 May 2023" },
      ],
    },
    {
      title: "Entertainment",
      amount: 80,
      change: 15,
      trend: "down",
      items: [
        { label: "Movie ticket", value: 30, date: "17 May 2023" },
        { label: "iTunes", value: 50, date: "17 May 2023" },
      ],
    },
    {
      title: "Shopping",
      amount: 420,
      change: 25,
      trend: "up",
      items: [
        { label: "Shirt", value: 230, date: "17 May 2023" },
        { label: "Jeans", value: 190, date: "17 May 2023" },
      ],
    },
    {
      title: "Others",
      amount: 50,
      change: 23,
      trend: "up",
      items: [
        { label: "Donation", value: 30, date: "17 May 2023" },
        { label: "Gift", value: 20, date: "17 May 2023" },
      ],
    },
  ].map((cat, idx) => (
    <Card
      key={idx}
      className="p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-600">{cat.title}</h3>
        <span
          className={`text-xs font-semibold ${
            cat.trend === "up" ? "text-red-500" : "text-green-500"
          }`}
        >
          {cat.change}% {cat.trend === "up" ? "↑" : "↓"}
        </span>
      </div>

      {/* Amount */}
      <p className="text-xl font-bold text-gray-800 mb-1">
        ${cat.amount.toFixed(2)}
      </p>
      <p className="text-xs text-gray-500 mb-3">Compare to last month</p>

      {/* Breakdown items */}
      <div className="space-y-2">
        {cat.items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm text-gray-700 border-t pt-2"
          >
            <span>{item.label}</span>
            <div className="text-right">
              <p className="font-medium">${item.value.toFixed(2)}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  ))}
</div>

        </div>
        <div className="flex justify-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
        >
          ⬅ Back
        </button>
      </div>
      </main>
    </div>
  );
}