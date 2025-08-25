"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm({ type }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || (type === "signup" && !form.name)) {
      setError("All fields are required");
      return;
    }

    if (type === "signup") {
      if (form.password.length < 5) {
        setError("Password must be at least 5 characters long");
        return;
      }
      if (!/^[A-Z]/.test(form.password)) {
        setError("Password must start with a capital letter");
        return;
      }
    }

    try {
      setLoading(true);
      const res = await fetch(`https://backend-1-bqpk.onrender.com/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (type === "login") {
        // Save token
        localStorage.setItem("token", data.token);

        const user = data.user || data;

        localStorage.setItem("userId", user?._id || user?.id || "");
        localStorage.setItem("name", user?.name || "");
        localStorage.setItem("email", user?.email || "");

        if (user?.profilePic) {
          localStorage.setItem("avatar", user.profilePic);
        } else {
          localStorage.removeItem("avatar");
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: user?._id || user?.id,
            email: user?.email || "",
            name: user?.name || "",
            avatar: user?.profilePic || "",
          })
        );

        router.push("/"); // dashboard (app/page.js)
      } else {
        router.push("/login");
      }

      setForm({ ...form, password: "" });
      setLoading(false);
    } catch (err) {
      console.error("Server error:", err);
      setError("Server error, try again later.");
      setLoading(false);
    }
  };

  // Google login callback handler
  const handleGoogleLogin = () => {
    window.open("https://backend-1-bqpk.onrender.com/api/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          FINEbank.IO
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-green-600"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-3 py-2 focus:outline-green-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-green-600"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {type === "login" && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Keep me signed in</span>
              </label>
              <a href="/forgot-password" className="text-sm text-green-600">
                Forgot Password?
              </a>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : type === "login"
              ? "Login"
              : "Sign up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/*  Google login  */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-600">
                Create an account
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-green-600">
                Sign in here
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
