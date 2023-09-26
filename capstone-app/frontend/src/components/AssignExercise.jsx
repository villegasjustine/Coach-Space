import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useExerciseContext } from "../context/ExerciseContext";
import RadioButtons from "../components/RadioButton";
import IconChips from "./IconChips";



export default function AssignExercise() {
  const [category, setCategory] = useState("all");
  const [fetchedExercises, setFetchedExercises] = useState([]);

  const { handleUpdateExercise } = useExerciseContext();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    let fetchURL;

    if (category === "all") {
      fetchURL = `http://localhost:8080/api/exercises/`;
    } else {
      fetchURL = `http://localhost:8080/api/exercises/category/${category}`;
    }
    axios
      .get(fetchURL)
      .then((response) => {
        setFetchedExercises(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching group members:", error);
      });
  }, [category]);

  const handleStrengthChange = (event) => {
    setStrength(event.target.value);
  };

  

  return (
    <div className="AssignExercise">
      <RadioButtons category={category} handleChange={handleChange} />

      {fetchedExercises.map((f) => (
        <IconChips key={f.id} value={f.name} category={f.category}></IconChips>
      ))}
    
    </div>
  );
}
