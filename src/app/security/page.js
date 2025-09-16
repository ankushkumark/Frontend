"use client";
import Link from "next/link";
import { useState } from "react";

export default function SecurityPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async () => {
    const userId = localStorage.getItem("userId");
    console.log("UserId from localStorage:", userId);

    if (!userId) {
      setMessage("❌ User not found, please login again.");
      return;
    }

    // 🔹 Validations
    if (!oldPassword) {
      setMessage("❌ Please enter your old password");
      return;
    }
    if (newPassword.length < 5) {
      setMessage("❌ New password must be at least 5 characters long");
      return;
    }
    if (!/^[A-Z]/.test(newPassword)) {
      setMessage("❌ New password must start with a capital letter");
      return;
    }
    if (newPassword !== retypePassword) {
      setMessage("❌ New Password and Retype Password do not match");
      return;
    }

    try {
      const res = await fetch(
<<<<<<< HEAD
        `http://localhost:5000/api/password/update/${userId}`,
=======
        `https://backend-1-bqpk.onrender.com/api/password/update/${userId}`,
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setRetypePassword("");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Link
            href="/profile"
            className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
=======
    <div className="p-6 md:p-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <Link
            href="/profile"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
          >
            Account
          </Link>
          <Link
            href="/profile/security"
            className="px-4 py-2 text-sm font-medium text-teal-600 border-b-2 border-teal-600"
          >
            Security
          </Link>
        </div>

        {/* Security form */}
        <div className="space-y-4 max-w-md">
          <div>
<<<<<<< HEAD
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Old Password
            </label>
=======
            <label className="block text-sm text-gray-500">Old Password</label>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
<<<<<<< HEAD
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              New Password
            </label>
=======
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">New Password</label>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
<<<<<<< HEAD
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              Retype Password
            </label>
=======
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Retype Password</label>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
<<<<<<< HEAD
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
=======
              className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            />
          </div>

          <button
            onClick={handleUpdatePassword}
<<<<<<< HEAD
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
=======
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
          >
            Update Password
          </button>

          {/* Status message */}
          {message && (
            <p
              className={`text-sm mt-2 ${
<<<<<<< HEAD
                message.startsWith("✅")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
=======
                message.startsWith("✅") ? "text-green-600" : "text-red-500"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
              }`}
            >
              {message}
            </p>
          )}

          {/* 🔙 Back button */}
          <div className="mt-6">
            <Link
              href="/profile"
<<<<<<< HEAD
              className="inline-block px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
=======
              className="inline-block px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            >
              ⬅ Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
