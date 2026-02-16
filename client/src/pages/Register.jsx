import React, { useState } from "react";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Import Components
import Navbar from "../components/Navbar";
import CommunityPanel from "../components/CommunityPanel";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex bg-[#0f1216] font-sans relative overflow-hidden"
      data-theme="business"
    >
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Layout */}
      {/* --- LEFT SIDE: Register Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mt-16 lg:mt-0"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800 mb-4 text-orange-500">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">Get started with your free account</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Full Name (เพิ่มมาใหม่สำหรับหน้า Register) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400 font-semibold">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400 font-semibold">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400 font-semibold">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 pr-10 focus:border-orange-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="btn w-full bg-[#ff7a50] hover:bg-[#e66a40] text-black border-none font-bold mt-4 shadow-lg shadow-orange-500/20">
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#ff7a50] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: Community Panel --- */}
      <CommunityPanel />
    </div>
  );
};

export default SignUpPage;
