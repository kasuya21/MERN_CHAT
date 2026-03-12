import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    subscribeToDeletedMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    getMessage(selectedUser._id);
    subscribeToMessages();
    subscribeToDeletedMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    );
  }

  if (isMessageLoading) {
    return (
      <div className="flex h-full flex-col bg-[#0f1216]">
        <ChatHeader />

        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-spinner text-orange-500"></span>
        </div>

        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0f1216] text-sm">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#0f1216] border-b border-gray-800">
        <ChatHeader />
      </div>

      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((message, index) => {
          const isSender = String(message.senderId) === String(authUser._id);

          return (
            <div
              key={message._id || index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (receiver) */}
              {!isSender && (
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              {/* Message Block */}
              <div
                className={`flex flex-col max-w-[75%] ${
                  isSender ? "items-end" : "items-start"
                }`}
              >
                {/* Sender Name */}
                <span
                  className={`text-xs text-gray-400 mb-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {isSender ? authUser.name : selectedUser.name}
                </span>

                {/* Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                    isSender
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-br-md"
                      : "bg-[#1f242c] text-gray-200 rounded-bl-md"
                  }`}
                >
                  {message.file && (
                    <img
                      src={message.file}
                      alt="attachment"
                      className="rounded-lg mb-2 max-w-[220px] max-h-[220px] object-cover"
                    />
                  )}

                  {message.text && (
                    <p className="leading-relaxed">{message.text}</p>
                  )}
                </div>

                {/* Time */}
                {message.createdAt && (
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>

              {/* Avatar (sender) */}
              {isSender && (
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 z-20 bg-[#0f1216] border-t border-gray-800">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
