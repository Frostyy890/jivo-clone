import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import SignInPage from "@/pages/auth/SignIn";
import SignUpPage from "@/pages/auth/SignUp";
import Home from "@/pages/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
