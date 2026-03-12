import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { onlineUsers } = useAuthStore();

  const { users, getUsers, setSelectedUser, isUserLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside className="w-72 md:w-80 bg-[#181c23] border-r border-white/5 flex flex-col shrink-0">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2 text-slate-200 font-medium mb-4">
          <Users className="w-5 h-5" />
          Contacts
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            />

            <div
              className={`block w-10 h-6 rounded-full transition-colors ${
                showOnlineOnly ? "bg-[#ff7b5c]" : "bg-[#2a303c]"
              }`}
            ></div>

            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                showOnlineOnly ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </div>

          <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            Show online only
            <span className="text-green-500">
              ({onlineUsers.length} online)
            </span>
          </span>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isUserLoading && (
          <div className="text-center text-slate-500 mt-4">
            Loading users...
          </div>
        )}

        {!isUserLoading &&
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-[#232730] transition ${
                selectedUser?._id === user._id ? "bg-[#232730]" : ""
              }`}
            >
              <img
                src={user.profilePic || "/avatar.png"}
                className="w-10 h-10 rounded-full"
                alt={user.fullname}
              />

              <div className="text-left">
                <div className="text-sm font-medium">{user.fullname}</div>

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  {onlineUsers.includes(user._id) ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Active now
                    </>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </button>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
