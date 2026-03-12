import { useState, useRef } from "react";
import { Send, Image } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { toast } from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    await sendMessage({ text, file: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-3 border-t border-gray-800 bg-[#0f1216]"
    >
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-2 relative inline-block">
          <img
            src={imagePreview}
            alt="preview"
            className="h-20 w-20 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-[#1a1f26] rounded-xl px-3 py-2 shadow-inner">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-[#262c36] transition"
        >
          <Image size={20} className="text-gray-400" />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="p-2 rounded-lg bg-linear-to-r from-orange-500 to-pink-500 hover:opacity-90 transition"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
