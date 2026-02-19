import { useState } from "react";
import { motion } from "framer-motion";
import  useAuthStore from "../store/useAuthStore";
import { Loader, Eye, EyeOff, Mail, Lock } from "lucide-react"; // แถม Icon ให้ครับ\
import CommunityPanel from "../components/CommunityPanel";

const Login = () => {
  // แก้ไขตรงนี้: ปกติ Zustand จะใช้ destructuring จาก function
  const { signIn, isSigningIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ฟังก์ชันอัปเดต State แบบ Dynamic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // กันหน้าเว็บ Refresh
    signIn(formData);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans relative">
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-[#181c23] pt-24 lg:pt-6">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#ff7b5c]/10 flex items-center justify-center rounded-2xl mb-5 shadow-sm">
              <Lock className="w-6 h-6 text-[#ff7b5c]" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-1.5">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400">Sign in to your account</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* อีเมล */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email" // ต้องมี name ให้ตรงกับ key ใน state
                value={formData.email} // ยัด value เข้าไป
                onChange={handleChange} // ดักจับการพิมพ์
                placeholder="you@example.com"
                className="w-full bg-[#1e232b] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7b5c] focus:ring-1 focus:ring-[#ff7b5c] transition-colors"
                required
              />
            </div>

            {/* รหัสผ่าน */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" // ต้องมี name ให้ตรงกับ key ใน state
                  value={formData.password} // ยัด value เข้าไป
                  onChange={handleChange} // ดักจับการพิมพ์
                  placeholder="••••••••"
                  className="w-full bg-[#1e232b] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7b5c] focus:ring-1 focus:ring-[#ff7b5c] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={isSigningIn}
              type="submit"
              className="w-full bg-[#ff7b5c] hover:bg-[#ff6a47] text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSigningIn ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#ff7b5c] hover:underline font-medium ml-1"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Community Panel --- */}
      {/* วาง Component ตรงนี้เลย มันจะไปอยู่ด้านขวาอัตโนมัติเพราะ Flex */}
      <CommunityPanel />
    </div>
  );
};

export default Login;
