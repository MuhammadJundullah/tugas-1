import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { index } = useParams(); // Ambil index dari URL
  const items = JSON.parse(localStorage.getItem("items")) || []; // Ambil data items dari localStorage

  // Set initial state untuk name dan division
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");

  // Cek apakah index valid dan data ada di localStorage
  useEffect(() => {
    if (index !== undefined) {
      const employee = items[parseInt(index)];
      if (employee) {
        setName(employee.name); // Set name
        setDivision(employee.division); // Set division
      } else {
        alert("Employee not found!");
        navigate("/"); // Redirect ke halaman utama jika data tidak ditemukan
      }
    } else {
      navigate("/"); // Redirect ke halaman utama jika index tidak valid
    }
  }, [index, items, navigate]);

  // Fungsi untuk menangani perubahan data input
  const handleUpdate = () => {
    const updatedEmployee = { name, division };
    items[parseInt(index)] = updatedEmployee; // Update data pada index yang sesuai
    localStorage.setItem("items", JSON.stringify(items)); // Simpan kembali ke localStorage
    navigate("/"); // Redirect kembali ke halaman utama
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-black dark:text-white h-screen">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-lg mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
          value={name} // Binding value ke state name
          onChange={(e) => setName(e.target.value)} // Update state name saat input berubah
        />
      </div>

      <div className="mb-4">
        <label htmlFor="division" className="block text-lg mb-2">
          Division:
        </label>
        <input
          type="text"
          id="division"
          className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
          value={division} // Binding value ke state division
          onChange={(e) => setDivision(e.target.value)} // Update state division saat input berubah
        />
      </div>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
        Update Employee
      </button>
    </div>
  );
};

export default EditEmployee;
