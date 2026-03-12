import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
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

        <main className="flex-1 flex flex-col bg-[#13161b] h-screen">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <div className="flex flex-1 justify-center items-center text-center text-gray-400">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
