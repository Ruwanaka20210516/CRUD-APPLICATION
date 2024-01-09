import React, { useState, useEffect } from 'react';

const UpdateDataForm = ({ selectedData, handleUpdateData }) => {
  const [updatedData, setUpdatedData] = useState({ ...selectedData });

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateData(selectedData.id, updatedData);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Update Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-600 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="Full_Name"
            value={updatedData.Full_Name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-600 font-semibold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="City"
            value={updatedData.City}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 w-full rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDataForm;
