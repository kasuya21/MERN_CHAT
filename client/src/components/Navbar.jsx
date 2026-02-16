import React from "react";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router";


const Navbar = () => {


  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">SE Chat</h1>
          </Link>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2">
          {/* ปุ่ม Settings (มีกรอบตามรูป) */}
          <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {/* แสดงปุ่ม Profile และ Logout เฉพาะตอน Login แล้ว */}
          {(
            <>
              {/* ปุ่ม Profile (ไม่มีกรอบ) */}
              <Link to="/profile" className="btn btn-sm btn-ghost gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* ปุ่ม Logout (ไม่มีกรอบ) */}
              <button className="flex gap-2 items-center"
                <LogOut className="size-5"> />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
