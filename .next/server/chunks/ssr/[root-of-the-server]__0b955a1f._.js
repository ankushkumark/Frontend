module.exports = [
"[project]/.next-internal/server/app/expenses/linegraph/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/app/expenses/linegraph/page.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// "use client";
// import Goals from "@/components/dashboard/Goals";
// import {
//   ComposedChart,
//   Area,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import {
//   Home,
//   Utensils,
//   Bus,
//   Film,
//   ShoppingBag,
//   Grid as GridIcon,
//   ArrowUp,
//   ArrowDown,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// // ✅ Chart data
// const data = [
//   { date: "May 01", thisMonth: 4000, lastMonth: 2400 },
//   { date: "May 05", thisMonth: 3200, lastMonth: 2800 },
//   { date: "May 10", thisMonth: 2800, lastMonth: 3000 },
//   { date: "May 15", thisMonth: 3600, lastMonth: 2600 },
//   { date: "May 20", thisMonth: 3900, lastMonth: 2700 },
//   { date: "May 25", thisMonth: 3700, lastMonth: 2500 },
//   { date: "May 30", thisMonth: 4200, lastMonth: 2600 },
// ];
// // ✅ Static expense categories
// const staticExpenses = [
//   { id: 1, title: "Housing", amount: 0, percent: 15, isUp: true, icon: Home },
//   { id: 2, title: "Food", amount: 0, percent: 8, isUp: false, icon: Utensils },
//   { id: 3, title: "Transportation", amount: 0, percent: 12, isUp: false, icon: Bus },
//   { id: 4, title: "Entertainment", amount: 0, percent: 15, isUp: false, icon: Film },
//   { id: 5, title: "Shopping", amount: 0, percent: 25, isUp: true, icon: ShoppingBag },
//   { id: 6, title: "Others", amount: 0, percent: 23, isUp: true, icon: GridIcon },
// ];
// export default function SavingSummary() {
//   const [expenses, setExpenses] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [newAmount, setNewAmount] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   // 🔹 Fetch user expenses from DB
//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     if (!id) return;
//     setUserId(id);
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/expenses/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch expenses");
//         const data = await res.json();
//         setExpenses(data);
//       } catch (err) {
//         console.error("Error fetching expenses:", err);
//       }
//     };
//     fetchData();
//   }, []);
//   // 🔹 Match DB data with static categories
//   const getExpenseData = (item) => {
//     const found = expenses.find((e) => e.key === item.title);
//     return {
//       amount: found ? found.amount : item.amount,
//       percent: item.percent,
//       isUp: item.isUp,
//     };
//   };
//   // 🔹 Save updated expense
//   const handleSave = async () => {
//     if (!userId || !selectedItem || !newAmount) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/expenses/${userId}/${selectedItem.title}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: Number(newAmount),
//             date: new Date(),
//           }),
//         }
//       );
//       const updatedExpense = await res.json();
//       setExpenses((prev) => {
//         const filtered = prev.filter((e) => e.key !== selectedItem.title);
//         return [updatedExpense, ...filtered];
//       });
//       setRefreshTrigger(Date.now());
//       setSelectedItem(null);
//       setNewAmount("");
//     } catch (err) {
//       console.error("Error saving expense:", err);
//     }
//   };
//   return (
//     <div className="p-4 md:p-5 flex flex-col gap-6">
//       {/* Top Row: Goals + Saving Summary Chart */}
//       <div className="flex flex-col lg:flex-row gap-4 w-full">
//         {/* Goals Card */}
//         <div className="bg-white rounded-2xl shadow-md p-4 w-full lg:w-72">
//           <Goals />
//         </div>
//         {/* Chart Card */}
//         <div className="bg-white rounded-2xl shadow-md p-4 w-full flex-1 h-80">
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <h2 className="font-inter sm:text-lg">Saving Summary</h2>
//           </div>
//           <div className="mt-2 h-56 sm:h-64 lg:h-60 relative">
//             <div className="absolute right-2 top-[-30px] z-10 flex flex-wrap items-center gap-5 text-xs sm:text-sm">
//               <span className="flex items-center gap-2">
//                 <span className="inline-block w-3 sm:w-4 h-1.5 rounded bg-teal-600" />
//                 This month
//               </span>
//               <span className="flex items-center gap-2 text-gray-500">
//                 <span className="inline-block w-3 sm:w-4 h-1.5 rounded bg-gray-300" />
//                 Last month
//               </span>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//               <ComposedChart
//                 data={data}
//                 margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
//               >
//                 <defs>
//                   <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#0f766e" stopOpacity="0.6" />
//                     <stop offset="70%" stopColor="#0f766e" stopOpacity="0.25" />
//                     <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   stroke="#e5e7eb"
//                   strokeDasharray="3 3"
//                   vertical={false}
//                 />
//                 <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} />
//                 <YAxis
//                   domain={[0, "dataMax + 1000"]}
//                   tickCount={5}
//                   allowDecimals={false}
//                   tickLine={false}
//                   axisLine={false}
//                   tickFormatter={(v) => `$${v}`}
//                   fontSize={10}
//                 />
//                 <Tooltip
//                   formatter={(v) => [`$${v}`, ""]}
//                   contentStyle={{
//                     borderRadius: 10,
//                     border: "none",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="thisMonth"
//                   stroke="#0f766e"
//                   strokeWidth={2}
//                   fill="url(#tealFill)"
//                   dot={false}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="lastMonth"
//                   stroke="#94a3b8"
//                   strokeWidth={2}
//                   strokeDasharray="5 6"
//                   dot={false}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//       {/* ✅ Expenses Breakdown Section */}
//       <div className="bg-white rounded-2xl shadow-md p-4 w-full">
//         <h2 className="font-inter sm:text-lg mb-3">Expenses Breakdown</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//           {staticExpenses.map((item) => {
//             const Icon = item.icon;
//             const data = getExpenseData(item);
//             return (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between bg-white border rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-gray-50"
//                 onClick={() => setSelectedItem(item)}
//               >
//                 {/* Left */}
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
//                     <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
//                   </div>
//                   <div>
//                     <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
//                       {item.title}
//                     </p>
//                     <p className="text-sm sm:text-lg font-semibold whitespace-nowrap">
//                       ${data.amount}
//                     </p>
//                   </div>
//                 </div>
//                 {/* Right */}
//                 <div className="flex flex-col items-end">
//                   <p
//                     className={`flex items-center text-xs sm:text-sm font-medium ${
//                       data.isUp ? "text-red-500" : "text-green-500"
//                     }`}
//                   >
//                     {data.percent}%
//                     {data.isUp ? (
//                       <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
//                     ) : (
//                       <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
//                     )}
//                   </p>
//                   <span className="text-gray-400 text-sm sm:text-base leading-none">→</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       {/* 🔹 Popup Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">
//               Update Amount - {selectedItem.title}
//             </h3>
//             <p className="mb-2 text-sm text-gray-500">
//               Current: ${getExpenseData(selectedItem).amount}
//             </p>
//             <input
//               type="number"
//               value={newAmount}
//               onChange={(e) => setNewAmount(e.target.value)}
//               placeholder="Enter new amount"
//               className="w-full border rounded-lg px-3 py-2 mb-4"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 className="px-4 py-2 rounded-lg bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 rounded-lg bg-teal-600 text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
}),
"[project]/src/app/expenses/linegraph/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/expenses/linegraph/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b955a1f._.js.map