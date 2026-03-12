import { BrowserRouter } from "react-router";
import { useEffect } from "react";
import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Router />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
