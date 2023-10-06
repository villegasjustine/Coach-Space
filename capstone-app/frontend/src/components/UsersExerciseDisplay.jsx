import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { useProps } from '@mui/x-data-grid/internals';
import EditUserDialog from './user/EditUserDialog';
import { useUserContext } from '../context/UserContext';


const MatEdit = ({ index }) => {

  const handleEditClick = () => {
      // some action
  }


  return <FormControlLabel
             control={
                 <EditUserDialog/>
             }
         />
};


const UserExerciseDisplay = (props) => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const {currentUser} = useUserContext();

  useEffect(() => {
    // Use Axios to fetch data
    axios.get(`http://localhost:8080/api/assignedexercises/user/${currentUser.id}`)
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
    { field: 'name', headerName: 'Exercise', width: 100 },
    { field: 'category', headerName: 'Category', width: 100},
    { field: 'description', headerName: 'Description', width: 200},
    
  ];

  const handleRowSelectionChange = (newSelection) => {
    console.log(newSelection)
    props.setSelectedExercises(newSelection)
    setSelectedRows(newSelection);
  };

  return (
    <div className='gridComponent'
    style={{ height: 500,  color:'#EEF1F6' }}
    >
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          boxShadow: 5,
          border: 2,
          borderWidth: 3,
          color: "black",
          borderColor: "black",
          "& .MuiDataGrid-columnSeparator": {
            color: "Black",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "rgba(229, 145, 145, 1)",
          },
        }}
      />
    </div>
  );
};

export default UserExerciseDisplay;
