import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fungsi untuk menghapus item
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems); // Update state untuk mencerminkan perubahan
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          className="p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded w-full"
        />

        {/* List of Items */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <ul>
            {paginatedItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 p-2 border-b border-gray-300 dark:border-gray-600">
                <div>
                  <span>{item.name}</span> - <span>{item.division}</span>
                </div>

                {/* Actions - Edit and Delete */}
                <div className="flex items-center space-x-4">
                  {/* Edit Button */}
                  <Link
                    to={`/edit-item/${index}`}
                    className="text-blue-500 hover:text-blue-700">
                    Edit
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded mr-2">
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
