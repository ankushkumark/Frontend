"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    photo: null,
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("storedUser:", storedUser);

  if (storedUser?._id) {
    setUserId(storedUser._id);
    fetchUser(storedUser._id);
  }
}, []);



  // API se user ka data fetch
const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://backend-1-bqpk.onrender.com/api/user/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = res.data;

    setProfile({
      fullName: user.name,
      email: user.email,
      phone: user.phone || "",
      photo: user.profilePic || null,
    });

    if (user.name) localStorage.setItem("name", user.name);
    if (user.email) localStorage.setItem("email", user.email);
    if (user.profilePic) localStorage.setItem("avatar", user.profilePic);

  } catch (err) {
    console.error(err);
    alert("Failed to fetch profile");
  }
};

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, photo: file }));
    }
  };

// Profile update handler
const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token"); 

    const res = await axios.put(
      "https://backend-1-bqpk.onrender.com/api/user/update",
      {
        name: profile.fullName,
        phone: profile.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // sending JWT Token
        },
      }
    );

    const updatedUser = res.data?.user;
    if (updatedUser) {
      // 🔹 Local state update
      setProfile((prev) => ({
        ...prev,
        fullName: updatedUser.name || prev.fullName,
        phone: updatedUser.phone || prev.phone,
      }));

      // 🔹 LocalStorage update (Sidebar ke liye)
      if (updatedUser.name) localStorage.setItem("name", updatedUser.name);
      if (updatedUser.email) localStorage.setItem("email", updatedUser.email);
      if (updatedUser.profilePic) localStorage.setItem("avatar", updatedUser.profilePic);
    }

    alert(" Profile updated successfully");
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    alert("❌ Failed to update profile");
  }
};

// Profile photo upload handler
const handleProfileUpload = async () => {
  if (!profile.photo || !(profile.photo instanceof File)) {
    alert("Please select a new profile picture first");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile", profile.photo);

    const res = await axios.post(
      "https://backend-1-bqpk.onrender.com/api/user/upload-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = res.data?.user;
    if (updatedUser) {
      // 🔹 Local state update
      setProfile((prev) => ({
        ...prev,
        photo: updatedUser.profilePic || prev.photo, 
      }));
      // 🔹 LocalStorage update (for Sidebar)
      if (updatedUser.name) localStorage.setItem("name", updatedUser.name);
      if (updatedUser.email) localStorage.setItem("email", updatedUser.email);
      if (updatedUser.profilePic) localStorage.setItem("avatar", updatedUser.profilePic);
    }

    alert("✅ Profile picture uploaded successfully");
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    alert("❌ Failed to upload profile picture");
  }
};
  return (
    <div className="p-6 md:p-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <Link
            href="/profile"
            className="px-4 py-2 text-sm font-medium text-teal-600 border-b-2 border-teal-600"
          >
            Account
          </Link>
          <Link
            href="/security"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Security
          </Link>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500">Full name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                 disabled
                className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>
          </div>

          {/* Right side - Profile Picture */}
          <div className="flex flex-col items-center justify-center">
            <label className="block text-sm text-gray-500 mb-2">
              Your Profile Picture
            </label>
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md relative">
              {profile.photo && !(profile.photo instanceof File) ? (
                <img
                  src={`https://backend-1-bqpk.onrender.com/${profile.photo}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : profile.photo instanceof File ? (
                <img
                  src={URL.createObjectURL(profile.photo)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-sm text-gray-400">Upload your photo</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {/* Upload button */}
<div className="mt-4">
  <button
    type="button"
    onClick={handleProfileUpload}
    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    Upload Profile Picture
  </button>
</div>

          </div>
        </div>

        {/* Update button */}
        <div className="mt-6">
          <button
          type="button"
            onClick={handleUpdate}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Update Profile
          </button>
        </div>
      </div>
      <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-block px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-gray-600"
                  >
                    ⬅ Back
                  </Link>
                </div>
    </div>
  );
}
