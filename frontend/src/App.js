import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import RequestStaff from "./pages/RequestStaff";
import Admin from "./pages/Admin";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-staff" element={<RequestStaff />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
