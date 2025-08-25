"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://backend-1-bqpk.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("Reset link sent to your email");
      }
      setLoading(false);
    } catch (err) {
      setMessage("Server error, try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-green-600 mb-5">
          FINEbank.IO
        </h1>
        <h5 className="text-2xl font-bold text-center text-black mb-4">
          Forgot Password ?
        </h5>
          <p className="text-gray-500 text-center mb-10">Enter your email address to get the<br></br> password reset link</p>
        {/* Form */}
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-green-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Message */}
          {message && <p className="text-sm text-center text-red-500">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : "Reset Password"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Remembered your password?{" "}
          <a href="/login" className="text-green-600">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
