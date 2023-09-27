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

const DataGridUser = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
const [refresh, setRefresh] = useState(true);

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
    //need to add history exercises later
  ];

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
  const handleCreateUser = async() => {
    
    // how do i activate formDialog? on click
   
    console.log("Create User");
  };

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


  const handleUpdateUser = (userID) => {
    // axios.post(`http://localhost:8080/api/users/${userID}`)
    // .then((response) => {
    //   console.log('User deleted:', response.data.data);
    //   const updatedData = tableData.filter((user) => user.id !== userID);
    //   setTableData(updatedData);
    // })
    // .catch((error) => {
    //   console.error('Error deleting user:', error);
    // });
    // // update selected user
    // console.log("Update User");
    setRefresh(!refresh)
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

        />
      </div>
    </div>
  );
};

export default DataGridUser;

