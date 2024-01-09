import React from 'react';

const DataList = ({ data, setSelectedData, handleDeleteData }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Data List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="flex items-center justify-between mb-2 p-2 border rounded">
            <div>
              {item.Full_Name} - {item.City}
            </div>
            <div>
              <button
                className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => setSelectedData(item)}> Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteData(item.id)}> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
