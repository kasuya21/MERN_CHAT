import React, { useState } from "react";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

import Navbar from "../components/Navbar";
import CommunityPanel from "../components/CommunityPanel";

const RegisterPage = () => {
  const { signUp, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validationForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full Name is required");

    if (!formData.email.trim()) return toast.error("Email is required");

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validationForm();
    if (success === true) {
      signUp(formData);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f1216] font-sans relative overflow-hidden">
      <Navbar />

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
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pl-10 pr-10 focus:border-orange-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn w-full bg-[#ff7a50] hover:bg-[#e66a40] text-black border-none font-bold mt-4 shadow-lg shadow-orange-500/20 disabled:opacity-60"
            >
              {isSigningUp ? "Creating..." : "Create Account"}
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

      <CommunityPanel />
    </div>
  );
};

export default RegisterPage;
