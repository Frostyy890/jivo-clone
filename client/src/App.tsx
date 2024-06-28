import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import SignInPage from "@/pages/auth/SignIn";
import SignUpPage from "@/pages/auth/SignUp";
import Home from "@/pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import { Toaster } from "./components/ui/toaster";
import { useAppSelector } from "./redux/store";

import "./App.css";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const PrivateRoutes = () => {
    return isAuthenticated ? (
      <Layout />
    ) : (
      <Navigate to="/auth/sign-in" replace />
    );
  };
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
