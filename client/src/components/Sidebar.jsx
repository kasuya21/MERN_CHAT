import { useState } from "react";
import { Users } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore"; // ปิดไว้ก่อนถ้ายังไม่ใช้

const Sidebar = () => {
  // 1. สร้างข้อมูลจำลอง (Mock Data)
  const MOCK_USERS = [
    { _id: "1", fullName: "John Doe", profilePic: "" },
    { _id: "2", fullName: "Jane Smith", profilePic: "" },
    { _id: "3", fullName: "Alice Johnson", profilePic: "" },
    { _id: "4", fullName: "Bob Brown", profilePic: "" },
    { _id: "5", fullName: "Charlie Davis", profilePic: "" },
  ];

  const MOCK_ONLINE_USERS = ["1", "3"]; // สมมติว่า user id 1 กับ 3 ออนไลน์อยู่

  // 2. ใช้ Local State แทน Store ชั่วคราว
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const isUsersLoading = false; // สมมติว่าโหลดเสร็จแล้ว

  // กรองข้อมูล
  const filteredUsers = showOnlineOnly
    ? MOCK_USERS.filter((user) => MOCK_ONLINE_USERS.includes(user._id))
    : MOCK_USERS;

  if (isUsersLoading)
    return (
      <div className="text-center text-gray-500 py-4">Loading contacts...</div>
    );

  return (
    <div className="w-72 border-r border-gray-800 flex flex-col p-5 bg-[#13161c]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-gray-400">
        <Users size={20} />
        <span className="font-medium text-white">Contacts</span>
      </div>

      {/* Filter Toggle */}
      <div className="form-control mb-6">
        <label className="label cursor-pointer justify-start gap-3 p-0">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-xs checkbox-warning rounded-full border-gray-600 checked:border-[#ff7a50] [--chkbg:#ff7a50] [--chkfg:black]"
          />
          <span className="label-text text-gray-400">
            Show online only{" "}
            <span className="text-gray-600 text-xs ml-1">
              ({MOCK_ONLINE_USERS.length} online)
            </span>
          </span>
        </label>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-lg transition-colors
              ${selectedUser?._id === user._id ? "bg-[#2b303b] ring-1 ring-[#ff7a50]" : "hover:bg-[#1f232b]"}
            `}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"} // ต้องมีไฟล์ avatar.png ใน folder public นะครับ
                alt={user.fullName}
                className="size-10 object-cover rounded-full bg-gray-700"
              />
              {MOCK_ONLINE_USERS.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-[#13161c]" />
              )}
            </div>

            <div className="text-left min-w-0">
              <div className="font-medium text-white truncate text-sm">
                {user.fullName}
              </div>
              <div className="text-xs text-gray-500">
                {MOCK_ONLINE_USERS.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 mt-10">
            <div className="text-gray-500 text-sm">No users found</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
