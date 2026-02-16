import React from "react";
import { MessageSquare, Eye } from "lucide-react";

const SignUpForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 lg:p-16 min-h-screen bg-[#0f1216]">
      <div className="w-full max-w-md mt-16 lg:mt-0">
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800 mb-4 text-orange-500">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-500">Get started with your free account</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400 font-semibold">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400 font-semibold">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400 font-semibold">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered bg-[#1a1d23] border-gray-700 text-white w-full pr-10 focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn w-full bg-[#ff7a50] hover:bg-[#e66a40] text-black border-none font-bold mt-4">
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-[#ff7a50] hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
