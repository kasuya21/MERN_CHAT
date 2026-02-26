import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const Sidebar = ({ users = [], isUsersLoading = false }) => {
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const onlineCount = onlineUsers.length;

  if (isUsersLoading) {
    return (
      <div className="text-center text-gray-500 py-4">Loading contacts...</div>
    );
  }

  return (
    <div className="w-72 border-r border-gray-800 flex flex-col p-5 bg-[#13161c]">
      {/* Filter Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">Show online only</span>
        <input
          type="checkbox"
          checked={showOnlineOnly}
          onChange={() => setShowOnlineOnly(!showOnlineOnly)}
        />
      </div>

      <div className="overflow-y-auto flex-1 w-full space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 rounded-lg ${
              selectedUser?._id === user._id
                ? "bg-[#2b303b]"
                : "hover:bg-[#1f232b]"
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-10 rounded-full"
              />

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full" />
              )}
            </div>

            <div className="text-left">
              <div>{user.fullName}</div>
              <div className="text-xs text-gray-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ✅ จำนวนคนออนไลน์ */}
      <div className="pt-4 border-t border-gray-700 text-sm text-gray-400 text-center">
        Online users:{" "}
        <span className="text-green-400 font-semibold">{onlineCount}</span>
      </div>
    </div>
  );
};

export default Sidebar;
