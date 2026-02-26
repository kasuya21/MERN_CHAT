import React from "react";
import { User, Mail, Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0f1216] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Profile Card Container */}
      <div className="w-full max-w-lg bg-[#13161c] rounded-2xl p-8 border border-gray-800 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1">Profile</h1>
          <p className="text-sm text-gray-400">Your profile information</p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            {/* Avatar Circle */}
            <div className="w-32 h-32 rounded-full border-4 border-gray-700 bg-[#1f232b] flex items-center justify-center overflow-hidden">
              <User size={64} className="text-gray-400 mt-4" />
              {/* ถ้ามีรูปภาพ ใช้แท็ก <img src="..." className="w-full h-full object-cover" /> แทน */}
            </div>

            {/* Camera Button */}
            <button className="absolute bottom-0 right-0 bg-[#2b303b] hover:bg-[#3a4150] p-2.5 rounded-full border-4 border-[#13161c] text-gray-300 transition-colors">
              <Camera size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Click the camera icon to update your photo
          </p>
        </div>

        {/* Form Fields Section */}
        <div className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 px-1">
              <User size={16} /> Full Name
            </label>
            <input
              type="text"
              value="John"
              readOnly
              className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 px-1">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              value="john@mail.com"
              readOnly
              className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
        </div>

        {/* Account Information Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-300 mb-4 px-1">
            Account Information
          </h2>

          <div className="bg-[#1f232b]/30 rounded-lg border border-gray-800/50 p-4 space-y-4">
            {/* Member Since */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-sm text-gray-400">Member Since</span>
              <span className="text-sm text-gray-200">2025-03-11</span>
            </div>

            {/* Account Status */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-gray-400">Account Status</span>
              <span className="text-sm font-medium text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
