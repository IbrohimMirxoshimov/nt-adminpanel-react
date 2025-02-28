import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { MainSection } from "./components/MainSection";
import LoginPage from "./pages/LoginPage";
import useAuthStore from "./store/my-store";

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const authState = useAuthStore();
  return (
    <div className="h-screen bg-gray-100">
      {authState.user ? (
        <>
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <div className="flex h-full">
            <Sidebar collapsed={collapsed} />
            <MainSection />
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
