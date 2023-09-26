import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const DataGridDemo = () => {
  const [tableData, setTableData] = useState([]);

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
    { field: 'firstName', headerName: 'Name', width: 100 },
    { field: 'lastName', headerName: 'Name', width: 100},
    { field: 'group', headerName: 'Group', width: 100},
    // Add more columns as needed
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default DataGridDemo;
