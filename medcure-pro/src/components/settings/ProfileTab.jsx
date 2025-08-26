// src/components/settings/ProfileTab.jsx
import React, { useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const { profile, loading, fetchProfile, updateProfile, updateUserPassword } =
    useSettings();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const promise = updateProfile({ full_name: fullName });
    toast.promise(promise, {
      loading: "Saving profile...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    const promise = updateUserPassword(password);
    toast.promise(promise, {
      loading: "Updating password...",
      success: "Password updated successfully!",
      error: (err) => err.message || "Failed to update password.",
    });
    setPassword("");
    setConfirmPassword("");
  };

  if (loading && !profile) return <p>Loading profile...</p>;

  return (
    <div className="space-y-10">
      {/* Profile Information Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          Profile Information
        </h2>
        <p className="text-gray-500 mt-1">
          Update your account's profile information and email address.
        </p>
        <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="text-right border-t pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Update Password Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Update Password</h2>
        <p className="text-gray-500 mt-1">
          Ensure your account is using a long, random password to stay secure.
        </p>
        <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="text-right border-t pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
