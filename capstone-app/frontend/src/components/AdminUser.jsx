import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const DataGridUser = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    // Use Axios to fetch data
    axios.get('http://localhost:8080/api/users/')
      .then((response) => {
        const data = response.data.data;
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns = [
    // Define your columns here
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'group', headerName: 'Group', width: 100 },
    // Add more columns as needed
  ];

  const handleCreateUser = () => {
    // Implement user creation logic
    // You can show a dialog or form for creating a new user
    console.log('Create User');
  };

  const handleAddUser = () => {
    // Implement user addition logic
    // This can add a user to the database
    console.log('Add User');
  };

  const handleDeleteUser = () => {
    // Implement user deletion logic
    // Delete users selected in selectedRows
    console.log('Delete User');
  };

  const handleUpdateUser = () => {
    // Implement user update logic
    // Update users selected in selectedRows
    console.log('Update User');
  };

  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <button onClick={handleCreateUser}>Create User</button>
        <button onClick={handleAddUser}>Add User</button>
        <button onClick={handleDeleteUser}>Delete User</button>
        <button onClick={handleUpdateUser}>Update User</button>
      </div>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={handleRowSelectionChange}
        />
      </div>
    </div>
  );
};

export default DataGridUser;
