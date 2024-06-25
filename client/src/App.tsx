import { Route, Routes as Router, Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import SignInPage from "@/pages/auth/SignIn";
import SignUpPage from "@/pages/auth/SignUp";
import Home from "@/pages/Home";
import About from "./pages/About";
import Chat from "./pages/chat";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./store/auth/AuthContext";

import "./App.css";

function App() {
  const { authState } = useAuth();
  const PrivateRoutes = () => {
    if (!authState.isLoggedIn) return <Navigate to="/auth/sign-in" replace />;
    return <Layout />;
  };
  return (
    <div className="app">
      <Router>
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
