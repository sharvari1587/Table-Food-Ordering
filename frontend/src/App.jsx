import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import Admin_order from "./pages/Admin_order"
import AdminLogin from "./pages/AdminLogin";
import AddMenu from "./pages/AddMenu";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/success"
          element={<ProtectedRoute element={<Success />} />}
        /> */}
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/admin/orders" element={<Admin_order />} />
        <Route path="/admin/adlogin" element={<AdminLogin />} />
        <Route path="/admin/addmenu" element={<AddMenu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;