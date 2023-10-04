import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useProps } from '@mui/x-data-grid/internals';
import EditUserDialog from './user/EditUserDialog';


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


const ExerciseUserGrid = (props) => {
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
    { field: 'firstName', headerName: 'Name', width: 100 },
    // { field: 'lastName', headerName: 'Name', width: 100},
    { field: 'group', headerName: 'Group', width: 100},
    // {
    //   field: "actions",
    //   headerName: "",
    //   sortable: false,
    //   width: 50,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //       return (
    //           <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
    //               <MatEdit index={params.row.id} />
    //            </div>
    //       );
    //    }
    // }
    // Add more columns as needed
  ];

  const handleRowSelectionChange = (newSelection) => {
    // console.log(newSelection)
    props.setSelectedUsers(newSelection)
    setSelectedRows(newSelection);
  };

  return (
    <div 
    style={{ height: 500, width: '100%', color:'#EEF1F6' }}
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
          boxShadow: 2,
          border: 2,
          color:'white',
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </div>
  );
};

export default ExerciseUserGrid;
