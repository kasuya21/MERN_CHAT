import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("selectedTheme") || "dark",

  setTheme: (newTheme) => {
    localStorage.setItem("selectedTheme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    set({ theme: newTheme });
  },

  initTheme: () => {
    const savedTheme = localStorage.getItem("selectedTheme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    set({ theme: savedTheme });
  },
}));
