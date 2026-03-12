import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

// รายชื่อธีมทั้งหมดจาก DaisyUI ตามในรูป
const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();
  const [activeTheme, setActiveTheme] = useState(theme);

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setActiveTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className="min-h-screen bg-base-100 text-base-content p-6 lg:p-10 transition-colors duration-200"
      data-theme={activeTheme}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {/* 1. Header & Theme Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Theme</h2>
          <p className="text-base-content/60 text-sm mb-6">
            Choose a theme for your chat interface
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`
                  flex flex-col items-center gap-2 p-2 rounded-lg transition-all
                  ${activeTheme === theme ? "bg-base-300 shadow-md ring-2 ring-primary" : "hover:bg-base-200"}
                `}
              >
                {/* Theme Color Preview Palette */}
                <div
                  className="w-full h-10 rounded-md overflow-hidden flex shadow-sm border border-base-content/10"
                  data-theme={theme}
                >
                  <div className="flex-1 bg-primary"></div>
                  <div className="flex-1 bg-secondary"></div>
                  <div className="flex-1 bg-accent"></div>
                  <div className="flex-1 bg-neutral"></div>
                </div>
                <span className="text-xs font-medium capitalize">{theme}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Preview Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">Preview</h2>

          <div className="max-w-2xl mx-auto bg-base-200/50 rounded-2xl border border-base-300 overflow-hidden shadow-lg">
            {/* Chat Header */}
            <div className="bg-base-200 p-4 flex items-center gap-3 border-b border-base-300">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                J
              </div>
              <div>
                <div className="font-semibold text-sm">John Doe</div>
                <div className="text-xs text-base-content/50">Online</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 bg-base-100 min-h-50">
              {/* Receiver Message */}
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-base-200 bg-base-200 text-base-content text-sm">
                  Hey! How's it going?
                </div>
                <div className="chat-footer opacity-50 text-[10px] mt-1">
                  12:00 PM
                </div>
              </div>

              {/* Sender Message */}
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary bg-primary text-primary-content text-sm">
                  I'm doing great! Just working on some new features.
                </div>
                <div className="chat-footer opacity-50 text-[10px] mt-1">
                  12:00 PM
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-base-200 border-t border-base-300 flex items-center gap-2">
              <input
                type="text"
                placeholder="This is a preview"
                className="input input-sm input-bordered w-full bg-base-100 focus:outline-none"
                readOnly
              />
              <button className="btn btn-sm btn-primary btn-square">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
