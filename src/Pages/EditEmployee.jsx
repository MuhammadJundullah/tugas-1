import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { index } = useParams(); // Ambil index dari URL
  const [items, setItems] = useState([]); // State untuk menyimpan semua data employees
  const [name, setName] = useState(""); // State untuk name
  const [division, setDivision] = useState(""); // State untuk division

  // Ambil data items dari localStorage pada awal render
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);

    if (index !== undefined && !isNaN(parseInt(index))) {
      const employee = storedItems[parseInt(index)];
      if (employee) {
        setName(employee.name); // Set state name dari data yang ditemukan
        setDivision(employee.division); // Set state division dari data yang ditemukan
      } else {
        alert("Employee not found!");
        navigate("/"); // Redirect jika data tidak ditemukan
      }
    } else {
      navigate("/"); // Redirect jika index tidak valid
    }
  }, [index, navigate]);

  // Fungsi untuk menangani pembaruan data
  const handleUpdate = () => {
    const updatedEmployee = { name, division };
    const updatedItems = [...items];
    updatedItems[parseInt(index)] = updatedEmployee; // Update data pada index yang sesuai
    localStorage.setItem("items", JSON.stringify(updatedItems)); // Simpan kembali ke localStorage
    setItems(updatedItems); // Perbarui state items
    navigate("/"); // Redirect ke halaman utama
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
          value={name} // Terikat ke state name
          onChange={(e) => setName(e.target.value)} // Perbarui state name saat input berubah
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
          value={division} // Terikat ke state division
          onChange={(e) => setDivision(e.target.value)} // Perbarui state division saat input berubah
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
