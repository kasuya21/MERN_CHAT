import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import { useChatStore } from "../store/useChatStore";

const Home = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
const { selectedUser } = useChatStore();
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          showOnlineOnly={showOnlineOnly}
          setShowOnlineOnly={setShowOnlineOnly}
        />

        <main className="flex-1 flex flex-col bg-[#13161b]">

  {selectedUser ? (
    <>
      <ChatHeader />

      <div className="flex-1 flex items-center justify-center text-gray-400">
        Chat messages here
      </div>
    </>
  ) : (
    <div className="flex flex-1 justify-center items-center text-center">
      <p>Select a conversation to start chatting</p>
    </div>
  )}

</main>
      </div>
    </div>
  );
};

export default Home;
