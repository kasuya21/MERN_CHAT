import React from "react";
import { MessageSquare, Settings, LogOut, User, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="h-screen bg-[#0f1216] text-white flex flex-col">
      {/* 1. Navbar */}
      <div className="navbar px-6 py-2 border-b border-gray-800 bg-[#0f1216]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl gap-2 normal-case hover:bg-transparent px-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#ff7a50]">
              <MessageSquare size={20} />
            </div>
            <span className="font-bold">SE Chat</span>
          </a>
        </div>
        <div className="flex-none gap-4">
          {/* Action Buttons */}
          <button className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2">
            <Settings size={18} />{" "}
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2">
            <User size={18} /> <span className="hidden sm:inline">Profile</span>
          </button>
          <button className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2">
            <LogOut size={18} />{" "}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Sidebar (Contacts) */}
        <div className="w-72 border-r border-gray-800 flex flex-col p-5 bg-[#13161c]">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <Users size={20} />
            <span className="font-medium text-white">Contacts</span>
          </div>

          {/* Filter Toggle */}
          <div className="form-control mb-6">
            <label className="label cursor-pointer justify-start gap-3 p-0">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning rounded-full border-gray-600 checked:border-[#ff7a50] [--chkbg:#ff7a50] [--chkfg:black]"
              />
              <span className="label-text text-gray-400">
                Show online only{" "}
                <span className="text-gray-600 text-xs ml-1">(0 online)</span>
              </span>
            </label>
          </div>

          {/* User List (Placeholder for now) */}
          <div className="flex-1 flex flex-col items-center justify-center opacity-50">
            <div className="text-gray-500 text-sm">No online users</div>
          </div>
        </div>

        {/* 3. Main Chat Area (Welcome Screen) */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0f1216] p-8 text-center">
          {/* Logo Animation */}
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#ff7a50] mb-6 animate-pulse">
            <MessageSquare size={32} />
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to SE Chat!
          </h2>
          <p className="text-gray-500 max-w-md">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
