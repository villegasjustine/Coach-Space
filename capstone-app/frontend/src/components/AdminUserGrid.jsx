import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormDialog from "./user/FormDialog";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, FormControlLabel } from '@mui/material';
import { blue } from "@mui/material/colors";

const MatEdit = ({ index }) => {

    const handleEditClick = () => {
        // some action
    }
  
  
    return <FormControlLabel
               control={
                   <IconButton color="secondary" aria-label="edit-user" onClick={handleEditClick} >
                       <EditIcon style={{ color: blue[500] }} />
                   </IconButton>
               }
           />
  };

const AdminUserGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
const [refresh, setRefresh] = useState(true);
const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Use Axios to fetch data
    axios
      .get("http://localhost:8080/api/users/")
      .then((response) => {
        const data = response.data.data;
        setTableData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "group", headerName: "Group", width: 100 }, 
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            return (
                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                    <MatEdit index={params.row.id} />
                 </div>
            );
         }
      }
    //need to add history exercises later
  ];

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
;

  const handleDeleteUser = (e) => {
    // add delete logic
    // send API request to delete the user
    console.log(selectedRows)
    axios.delete(`http://localhost:8080/api/users/${selectedRows.join(',')}`)
      .then((response) => {
        console.log('User deleted:', response.data.data);
        const updatedData = tableData.filter((user) => user.id !== response.data.data);
        setTableData(updatedData);
        setRefresh(!refresh)
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };


  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleRowSelectionChange = (newSelection) => {
    console.log(newSelection)
    setSelectedRows(newSelection);
  };

  const handleEditField = (params, event) =>{
    console.log(params)
    console.log(event)
  }

  return (
    <div>
      <h2>User Management</h2>
      <div>
      <FormDialog handleRefresh={handleRefresh}>Create User</FormDialog>
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelectionChange}
          onCellDoubleClick={handleEditField}
          disableRowSelectionOnClick
          enableEditing
          editingMode='modal'
          onRowDoubleClick={handleSaveRowEdits}

        />
      </div>
    </div>
  );
};

export default AdminUserGrid;

