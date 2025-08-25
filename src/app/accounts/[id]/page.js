"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AccountDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState("");

  // ✅ Fetch account details
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(`https://backend-1-bqpk.onrender.com/api/accounts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch account");
        const data = await res.json();
        setAccount(data);
      } catch (error) {
        console.error("Failed to fetch account:", error);
      }
    };
    fetchAccount();
  }, [id]);

  // ✅ Handle balance update with transaction
  const handleSaveBalance = async () => {
  try {
    const res = await fetch(`https://backend-1-bqpk.onrender.com/api/accounts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: Number(newBalance) }), // 👈 string → number
    });

    if (res.ok) {
      const updated = await res.json();
      setAccount(updated);
      setIsEditing(false);
      setNewBalance("");
    } else {
      console.error("Update failed:", await res.text());
    }
  } catch (error) {
    console.error("Failed to update balance:", error);
  }
};

  if (!account) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Account Card */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-2xl font-bold mb-2">{account.type}</h2>
        <p className="text-sm opacity-80">Card Number</p>
        <p className="text-lg font-mono tracking-widest mb-4">
          {account.number}
        </p>
        <p className="text-sm opacity-80">Balance</p>
        <p className="text-2xl font-bold">₹{account.balance}</p>

        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-white text-teal-700 px-3 py-1 rounded-md text-sm font-medium shadow"
        >
          Edit Details
        </button>
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-3">Update Balance</h3>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="Enter new balance"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBalance}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions */}
<div className="bg-white shadow rounded-xl p-5 mt-6">
  <h3 className="text-lg font-semibold mb-3">All Transactions</h3>
  {account.transactions?.length > 0 ? (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Amount</th>
          <th className="p-2">Type / Status</th>
          <th className="p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {[...account.transactions]
          .reverse() // 👈 latest transaction upper side
          .map((tx, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">₹{tx.amount}</td>
              <td className="p-2">
                <span
                  className={`${
                    tx.type === "Credit" ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {tx.type}
                </span>
                <br />
                <span className="text-xs text-gray-500">{tx.status}</span>
              </td>
              <td className="p-2">
                {new Date(tx.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500 text-sm">No transactions yet.</p>
  )}
</div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md w-full sm:w-auto"
      >
        Back
      </button>
    </div>
  );
}
