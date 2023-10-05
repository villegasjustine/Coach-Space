import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FormControlLabel } from "@mui/material";
import EditUserDialog from "../user/EditUserDialog";
import FormDialog from "../user/FormDialog";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";

const AdminUserGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Use Axios to fetch data
    axios
      .get("http://localhost:8080/api/users/?search=${searchQuery}")
      .then((response) => {
        const data = response.data.data;
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchQuery, refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "group", headerName: "Group", width: 150 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 10,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <Edit id={params.id} />
          </div>
        );
      },
    },
    //need to add history exercises later
  ];

  const handleRefresh = () => {
    setRefresh(!refresh);
    // console.log(id)
  };
  const handleSearch = () => {};

  const Edit = ({ id }) => {
    return (
      <FormControlLabel
        control={<EditUserDialog handleRefresh={handleRefresh} id={id} />}
      />
    );
  };

  const handleDeleteUser = (e) => {
    // add delete logic
    // send API request to delete the user
    console.log(selectedRows);
    axios
      .delete(`http://localhost:8080/api/users/${selectedRows.join(",")}`)
      .then((response) => {
        console.log("User deleted:", response.data.data);
        const updatedData = tableData.filter(
          (user) => user.id !== response.data.data
        );
        setTableData(updatedData);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
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
    console.log(newSelection);
    setSelectedRows(newSelection);
  };

  const handleEditField = (params, event) => {
    console.log(params);
    console.log(event);
  };

  return (
    <div className="gridComponent">
      <h2>COACH-SPACE: USERS</h2>
      <Container>
        <Grid container direction="row" justifyContent="center">
          <FormDialog handleRefresh={handleRefresh}>Create User</FormDialog>
          <Button onClick={handleDeleteUser}>Delete User</Button>
        </Grid>

        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelectionChange}
          onCellDoubleClick={handleEditField}
          disableRowSelectionOnClick
          enableEditing
          editingMode="modal"
          onRowDoubleClick={handleSaveRowEdits}
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
      </Container>
    </div>
  );
};

export default AdminUserGrid;
