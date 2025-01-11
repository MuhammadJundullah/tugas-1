import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditUsername = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const handleSave = () => {
    if (username.trim() === "") {
      alert("Username cannot be empty.");
      return;
    }
    localStorage.setItem("username", username);
    alert("Username updated successfully.");
    navigate("/"); // Redirect ke halaman utama
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-black dark:text-white h-screen">
      <h2 className="text-2xl font-semibold mb-4">Edit Username</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-lg mb-2">
          New Username:
        </label>
        <input
          type="text"
          id="username"
          className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
          value={username} // Bind ke state username
          onChange={(e) => setUsername(e.target.value)} // Update state username
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
        Save Username
      </button>
    </div>
  );
};

export default EditUsername;
