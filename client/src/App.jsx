import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuthStore from "./store/useAuthStore";


const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
