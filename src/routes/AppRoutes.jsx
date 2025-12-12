import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import Home from "../pages/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
