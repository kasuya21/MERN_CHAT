import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="w-full h-16 border-b border-white/10 flex items-center justify-between px-5 bg-[#181c23]">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullname}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h2 className="font-semibold">{selectedUser.fullname}</h2>
          <p className="text-xs text-gray-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="text-sm text-red-400 hover:text-red-500"
      >
        Close
      </button>
    </div>
  );
};

export default ChatHeader;
