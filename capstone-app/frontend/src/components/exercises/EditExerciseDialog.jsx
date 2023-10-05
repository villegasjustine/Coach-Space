import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import { IconButton } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState, useEffect } from "react";
import RadioForm from "../user/RadioForm";
import { useExerciseContext } from "../../context/ExerciseContext";




export default function EditExerciseDialog({handleRefresh, id}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [exercise, setExercise] = useState({name: ""});
  const { currentExercise, handleUpdateExercise } = useExerciseContext();




  useEffect(() => {
    if (open) {
    axios
      .get(`http://localhost:8080/api/exercises/${id}`)
      .then((response) => {
        const data = response.data.data;
        setExercise(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });}
  }, [open,id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpen(false);

    // convert form data to object and post to backend
    axios
      .put(
        `http://localhost:8080/api/exercises/${id}`,
        Object.fromEntries(data.entries())
      )
      .then((response) => {
        let result = response.data.result;
        let exercise = response.data.data;
        console.log(exercise);

        setResult(result);
        if (exercise) {
          handleUpdateExercise(exercise);
          alert("Successfully edited a new exercise!") 
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
       <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditNoteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Exercise Details 
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
            value={exercise ? exercise.name : ""}
            onChange={(e) => setExercise({...exercise, name: e.target.value})}
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
            value={exercise ? exercise.category : ""}
            onChange={(e) => setExercise({...exercise, category: e.target.value})}
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
            value={exercise ? exercise.description : ""}
            onChange={(e) => setExercise({...exercise, description: e.target.value})}
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


