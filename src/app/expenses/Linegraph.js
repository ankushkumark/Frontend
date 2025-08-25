"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "May 01", thisMonth: 4000, lastMonth: 2400 },
  { date: "May 05", thisMonth: 3200, lastMonth: 2800 },
  { date: "May 10", thisMonth: 2800, lastMonth: 3000 },
  { date: "May 15", thisMonth: 3600, lastMonth: 2600 },
  { date: "May 20", thisMonth: 3900, lastMonth: 2700 },
  { date: "May 25", thisMonth: 3700, lastMonth: 2500 },
  { date: "May 30", thisMonth: 4200, lastMonth: 2600 },
];

export default function ExpensesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold">Saving Summary</h2>
          <div className="text-gray-500 text-sm">Mar 2022 ▼</div>
        </div>

        <div className="mt-4 h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{ borderRadius: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="thisMonth"
                stroke="#0ea5e9"
                strokeWidth={2}
                fillOpacity={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lastMonth"
                stroke="#cbd5e1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="block w-4 h-1 rounded bg-sky-500"></span>
            This month
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="block w-4 h-1 rounded bg-gray-300"></span>
            Same period last month
          </div>
        </div>
      </div>
    </div>
  );
}
