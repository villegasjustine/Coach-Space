import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useExerciseContext } from "../../context/ExerciseContext";



export default function ExerciseFormDialog({handleRefresh}) {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState("");
  const { currentExercise, handleUpdateExercise } = useExerciseContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpen(false);

    console.log(Object.fromEntries(data.entries()))
    // convert form data to object and post to backend
    axios
      .post(
        "http://localhost:8080/api/exercises/create",
        Object.fromEntries(data.entries())
      )
      .then((response) => {
        let result = response.data.result;
        let exercise = response.data.data;
       

        setResult(result);
        if (exercise) {
          handleUpdateExercise(exercise);
          alert("Successfully created a new exercise!") // use toast if have time
          handleRefresh()
        }
      })
      .catch((err) => {
        console.log(err);
        setResult(err.message + ": " + err.response.data.result);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Exercise
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Enter exercise details: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            autoComplete="given-name"
            name="name"
            id="name"
            label="Exercise Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="category"
            name="category"
            id="category"
            label="Category"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            autoComplete="description"
            name="description"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type = "submit">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

