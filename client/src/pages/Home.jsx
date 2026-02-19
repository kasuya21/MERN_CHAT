import React from "react";
import { MessageSquare, Settings, LogOut, User } from "lucide-react";
//import { useChatStore } from "../store/useChatStore";
import  useAuthStore  from "../store/useAuthStore";

import Sidebar from "../components/Sidebar";
//import Chat from "../components/Chat"; // Component ที่เราทำไว้ก่อนหน้านี้
import NoChatSelected from "../components/NoChatSelected"; // Component หน้า Welcome

const HomePage = () => {
  //const { selectedUser } = useChatStore();
  const { logout, authUser } = useAuthStore();

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
          {/* User Info (Optional) */}
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <span className="text-sm text-gray-400">
              Hi, {authUser?.fullName}
            </span>
          </div>

          <button className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2">
            <Settings size={18} />{" "}
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2">
            <User size={18} /> <span className="hidden sm:inline">Profile</span>
          </button>

          {/* Logout Button (ใช้งานได้จริง) */}
          <button
            onClick={logout}
            className="btn btn-ghost btn-sm text-gray-400 hover:text-white font-normal gap-2"
          >
            <LogOut size={18} />{" "}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* 2. Sidebar (เรียกใช้ Component ที่แยกไว้) */}
        <Sidebar />

        {/* 3. Main Chat Area */}
        {/* เงื่อนไขสลับหน้า: ถ้าเลือกเพื่อนแล้ว -> แสดง Chat / ถ้ายัง -> แสดง Welcome */}
        {/* {!selectedUser ? <NoChatSelected /> : <Chat />} */}
      </div>
    </div>
  );
};

export default HomePage;
