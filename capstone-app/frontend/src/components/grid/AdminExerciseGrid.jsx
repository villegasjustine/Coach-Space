import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ExerciseFormDialog from "../exercises/ExerciseFormDialog";
import Grid from "@mui/material/Grid";
import { Container, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";

import EditExerciseDialog from "../exercises/EditExerciseDialog";

const AdminExerciseGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Use Axios to fetch data
    axios
      .get("http://localhost:8080/api/exercises/")
      .then((response) => {
        const data = response.data.data;
        setTableData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchQuery, refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Exercise Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "createdAt", headerName: "Created", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
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
  const Edit = ({ id }) => {
    return (
      <FormControlLabel
        control={<EditExerciseDialog handleRefresh={handleRefresh} id={id} />}
      />
    );
  };

  const handleDeleteExercise = (e) => {
    console.log(selectedRows);
    axios
      .delete(`http://localhost:8080/api/exercises/${selectedRows.join(",")}`)
      .then((response) => {
        console.log("Exercise deleted:", response.data.data);
        const updatedData = tableData.filter(
          (exercise) => exercise.id !== response.data.data
        );
        setTableData(updatedData);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error deleting exercise:", error);
      })
      .finally();
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
        <Container>
        <Grid container direction="row" justifyContent="right">
          <ExerciseFormDialog handleRefresh={handleRefresh}>
            Create User
          </ExerciseFormDialog>
          <Button variant="outlined" onClick={handleDeleteExercise}>Delete Exercise</Button>
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

export default AdminExerciseGrid;
