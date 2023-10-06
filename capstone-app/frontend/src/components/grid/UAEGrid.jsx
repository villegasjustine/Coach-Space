import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ExerciseFormDialog from "../exercises/ExerciseFormDialog";
import { IconButton, FormControlLabel } from '@mui/material';
import { Button, Container } from "@mui/material";


const UAEGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
const [refresh, setRefresh] = useState(true);
const [validationErrors, setValidationErrors] = useState({});
const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Use Axios to fetch data
    axios
      .get("http://localhost:8080/api/assignedexercises/")
      .then((response) => {
        const data = response.data.data;
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchQuery, refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "firstName", headerName: "Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "name", headerName: "Exercise", width: 100 }, 
    { field: "category", headerName: "Category", width: 100 },
    { field: "group", headerName: "Group", width: 100 },
    { field: "startDate", headerName: "Start Date", width: 170},
    { field: "endDate", headerName: "End Date", width: 170},
  ];

  const handleRefresh = () => {
    setRefresh(!refresh)
    
  }
;
 
  const handleDeleteExercise = (e) => {
   
    console.log(selectedRows)
    axios.delete(`http://localhost:8080/api/assignedexercises/${selectedRows.join(',')}`)
      .then((response) => {
        console.log('Exercise deleted:', response.data.data.data);
        const updatedData = tableData.filter((exercise) => exercise.id !== response.data.data);
        setTableData(updatedData);
        setRefresh(!refresh)
      })
      .catch((error) => {
        console.error('Error deleting exercise:', error);
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
    <div className="gridComponent">
      <h2>Assigned Exercises to Users</h2>
      
        <Button onClick={handleDeleteExercise}>Delete Exercise</Button>
    
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
    </div>
  );
};

export default UAEGrid;

