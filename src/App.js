import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";
import EditUsername from "./Pages/EditUsername"; // Import halaman EditUsername
import PrivateRoute from "./components/PrivateRoute"; // Gunakan PrivateRoute untuk proteksi halaman

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  // Cek status login saat komponen dimuat
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    // Menambahkan dark mode class berdasarkan preferensi pengguna
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <Router>
        {/* Navbar hanya tampil jika sudah login */}
        {isAuthenticated && <Navbar setTheme={setTheme} />}{" "}
        {/* Pass setTheme ke Navbar untuk mengubah tema */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-item"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-item/:index"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-username"
            element={
              <PrivateRoute>
                <EditUsername />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
