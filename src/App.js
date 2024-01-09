import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DataList from './DataList';
import AddDataForm from './AddDataForm';
import UpdateDataForm from './UpdateDataForm';

Modal.setAppElement('#root');

const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://interview.supershinecarcare.lk/api/customer');
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddData = async (newData) => {
    try {
      setLoading(true);
      const response = await axios.post('https://interview.supershinecarcare.lk/api/customer', newData);
      
      if (response.status === 201) {
        fetchData();
        setError(null);
        closeAddModal();
      } else {
        setError('Error adding data. Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error adding data:', error);
      setError('Error adding data. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`https://interview.supershinecarcare.lk/api/customer/${id}`, updatedData);
      
      if (response.status === 200) {
        fetchData();
        setSelectedData(null);
        setError(null);
      } else {
        setError('Error updating data. Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Error updating data. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://interview.supershinecarcare.lk/api/customer/${id}`);
      
      if (response.status === 200) {
        fetchData();
        setError(null);
        closeDeleteModal();
      } else {
        setError('Error deleting data. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Error deleting data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (data) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDataToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">CRUD Application</h1>
        {loading && <div className="text-gray-500">Loading...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <DataList
          data={data}
          setSelectedData={setSelectedData}
          handleDeleteData={handleDeleteData}  // Pass handleDeleteData as a prop
        />
        
        <AddDataForm
          isOpen={isAddModalOpen}
          handleClose={closeAddModal}
          handleAddData={handleAddData}/>
        {selectedData && (
          <UpdateDataForm
            selectedData={selectedData}
            handleUpdateData={handleUpdateData}/>
        )}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Data"
          className="modal fixed inset-0 flex items-center justify-center">
          <div className="modal-container bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            {dataToDelete && (
              <p>Are you sure you want to delete {dataToDelete.Full_Name}?</p>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteData(dataToDelete.id)}>Delete</button>
            <button className="ml-4 px-4 py-2" onClick={closeDeleteModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
