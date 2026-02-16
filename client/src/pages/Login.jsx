import React, { useState } from "react";
import { MessageSquare, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Import Components ที่ต้องใช้ในหน้านี้
import Navbar from "../components/Navbar";
import CommunityPanel from "../components/CommunityPanel";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // 1. Container หลัก: คุมทั้งหน้าจอ
    <div
      className="min-h-screen flex bg-[#0f1216] font-sans relative overflow-hidden"
      data-theme="business"
    >
      {/* 2. Navbar: วางลอยอยู่ด้านบนสุดของหน้านี้ */}
      <Navbar />

      {/* 3. ส่วนเนื้อหา (แบ่งซ้าย-ขวา) */}

      {/* --- LEFT SIDE: Login Form --- */}
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
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          {/* Form Inputs */}
          <form className="space-y-5">
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
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 focus:border-orange-500"
                />
              </div>
            </div>

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
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 pr-10 focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt"></span>
                <a
                  href="#"
                  className="label-text-alt link link-hover text-gray-500"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <button className="btn w-full bg-[#ff7a50] hover:bg-[#e66a40] text-black border-none font-bold mt-4">
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#ff7a50] hover:underline font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: Community Panel --- */}
      {/* วาง Component ตรงนี้เลย มันจะไปอยู่ด้านขวาอัตโนมัติเพราะ Flex */}
      <CommunityPanel />
    </div>
  );
};

export default LoginPage;
