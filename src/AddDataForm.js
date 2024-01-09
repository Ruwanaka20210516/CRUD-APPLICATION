import React, { useState } from 'react';

const AddDataForm = ({ handleAddData }) => {
  const [newData, setNewData] = useState({
    Full_Name: '',
    City: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleAddData(newData);
      setNewData({
        Full_Name: '',
        City: '',
      });
      setError(null);
    } catch (error) {
      setError('Error adding data. Please check your input and try again.');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Data</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            name="Full_Name"
            value={newData.Full_Name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City:</label>
          <input
            type="text"
            name="City"
            value={newData.City}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDataForm;
