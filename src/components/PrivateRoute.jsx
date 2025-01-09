import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Mengecek apakah pengguna terautentikasi
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Jika tidak terautentikasi, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Jika terautentikasi, tampilkan konten halaman yang di-protect
  return children;
};

export default PrivateRoute;
