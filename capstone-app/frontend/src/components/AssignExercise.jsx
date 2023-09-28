import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  ExerciseProvider,
  useExerciseContext,
} from "../context/ExerciseContext";
import RadioButtons from "../components/RadioButton";
import IconChips from "./IconChips";
import IconChipsTest from "./IconChipsTest";
import ExerciseUserGrid from "./ExerciseUserGrid";

export default function AssignExercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assigned, setAssigned] = useState([])

  const { handleUpdateExercise } = useExerciseContext();

  const handleAssignedExercises = () => {
    const assignedExercises = {
      exercises: selectedExercises.map((exercise) => exercise.id),
      users: selectedUsers.map((user) => user.id),
    };

    axios
      .post("http://localhost:8080/api/assignedexercises", assignedExercises)
      .then((response) => {
        console.log("assignedExercises saved:", response.data);
        let result = response.data.result;
        let posty = response.data.data;
        console.log(result);
        console.log(posty)

        //need to reset somehow after it has been assigned.
      })
      .catch((error) => {
        console.error("Error saving assignedExercises:", error);
      });
      console.log(assignedExercises)
  };


  return (
    <div className="AssignExercise">
      

      <IconChipsTest
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />

      <ExerciseUserGrid
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />


      <button onClick={handleAssignedExercises}>Assign Exercises</button>
    </div>
  );
}
