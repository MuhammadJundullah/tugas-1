import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing employees from localStorage
    const existingEmployees = JSON.parse(localStorage.getItem("items")) || [];

    // Add new employee
    const newEmployee = { name, division };
    existingEmployees.push(newEmployee);

    // Save updated list to localStorage
    localStorage.setItem("items", JSON.stringify(existingEmployees));

    // Navigate back to HomePage
    navigate("/");
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h2 className="text-2xl mb-4 font-semibold">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Division Input */}
        <div className="mb-4">
          <label htmlFor="division" className="block text-sm font-medium">
            Division
          </label>
          <input
            id="division"
            type="text"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
            className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:hover:bg-green-700">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
