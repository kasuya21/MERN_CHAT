import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  // GET USERS
  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Get users failed");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // SEND MESSAGE
  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    try {
      const res = await api.post(
        "/message/send/" + selectedUser._id,
        messageData,
      );

      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Sending message failed");
    }
  },

  // GET MESSAGE HISTORY
  getMessage: async (userId) => {
    set({ isMessageLoading: true });

    try {
      const res = await api.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Getting messages failed");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // SOCKET SUBSCRIBE
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.warn("❌ Socket not connected");
      return;
    }

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      console.log("📨 Message received:", newMessage);

      // ตรวจสอบว่า message เกี่ยวข้องกับ current chat
      // backend ส่ง recipientId ไม่ใช่ receiverId
      const isRelevantMessage =
        String(newMessage.senderId) === String(selectedUser._id) ||
        String(newMessage.recipientId) === String(selectedUser._id);

      console.log("Relevant:", isRelevantMessage, {
        senderId: newMessage.senderId,
        recipientId: newMessage.recipientId,
        selectedUserId: selectedUser._id,
      });

      if (!isRelevantMessage) return;

      set((state) => {
        const exists = state.messages.some((msg) => msg._id === newMessage._id);
        if (exists) return state;

        console.log("✅ Adding message to state");
        return {
          messages: [...state.messages, newMessage],
        };
      });
    });
  },

  // DELETE MESSAGE
  deleteMessage: async (messageId) => {
    try {
      await api.delete(`/message/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  // SOCKET UNSUBSCRIBE
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("messageDeleted");
    }
  },

  // SOCKET SUBSCRIBE FOR DELETED MESSAGES
  subscribeToDeletedMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("messageDeleted");

    socket.on("messageDeleted", ({ messageId }) => {
      console.log("🗑️ Message deleted:", messageId);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
    });
  },
}));
