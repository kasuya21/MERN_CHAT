import React, { useState } from "react";
import {
  MessageSquare,
  Settings,
  User,
  LogOut,
  Camera,
  Mail,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  // local form state
  const [form, setForm] = useState({
    fullname: authUser?.fullname || "",
  });
  const [preview, setPreview] = useState(authUser?.profilePic || null);
  const fileRef = React.useRef(null);

  // handle profile edit
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (form.fullname && form.fullname !== authUser.fullname) {
      payload.fullname = form.fullname;
    }
    if (preview && preview !== authUser.profilePic) {
      payload.profilePic = preview;
    }
    if (Object.keys(payload).length === 0) {
      toast.error("Nothing to update");
      return;
    }
    await updateProfile(payload);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto p-6 flex justify-center items-start pt-10">
        <div className="w-full max-w-2xl bg-[#181c23] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-sm">
          {/* Header ของ Card Profile */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-1">Profile</h1>
            <p className="text-slate-400 text-sm">Your profile information</p>
          </div>

          {/* ส่วนรูป Profile & ฟอร์มข้อมูล */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-[#2a303c] flex items-center justify-center border-4 border-white/5 overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-slate-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageSelect}
                  className="hidden"
                  id="profilePicInput"
                  ref={fileRef}
                />
                <label
                  htmlFor="profilePicInput"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-[#2a303c] hover:bg-[#343a46] transition-colors rounded-full flex items-center justify-center border-4 border-[#181c23] text-slate-300 hover:text-white cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </label>
              </div>
              <p className="text-xs text-slate-400">
                Click the camera icon to update your photo
              </p>
            </div>

            {/* form fields */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <User className="w-4 h-4 text-slate-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full bg-[#13161b] border border-white/5 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-[#ff7b5c] transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={authUser?.email || ""}
                  readOnly
                  className="w-full bg-[#13161b] border border-white/5 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-[#ff7b5c] transition-colors"
                />
              </div>
            </div>

            {/* account info - display only */}
            <div className="mt-10">
              <h2 className="text-base font-medium text-white mb-4">
                Account Information
              </h2>

              <div className="bg-[#13161b] rounded-xl border border-white/5 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/5">
                  <span className="text-sm text-slate-400">Member Since</span>
                  <span className="text-sm text-slate-200">
                    {authUser?.createdAt?.split("T")[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-slate-400">Account Status</span>
                  <span className="text-sm font-medium text-emerald-500">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
