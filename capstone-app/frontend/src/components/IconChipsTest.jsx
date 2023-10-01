import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import RadioButtons from "./RadioButton";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitbitIcon from "@mui/icons-material/Fitbit";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const initialCategory = "all";

export default function IconExercisesTest(props) {
  const [category, setCategory] = useState(initialCategory);
  const [fetchedExercises, setFetchedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const iconsByCategory = {
    strength: <FitnessCenterIcon />,
    footwork: <DirectionsRunIcon />,
    racket: <FitbitIcon />,
  };

  const colorsByCategory = {
    strength: "warning",
    footwork: "info",
    racket: "secondary",
  };

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
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, [category]);

  const handleChipClick = (chip) => {
    const existingChip = availableExercises.find((c) => c.id === chip.id);
    const existingSelectedChip = selectedExercises.find(
      (c) => c.id === chip.id
    );

    if (existingChip && !existingSelectedChip) {
      const updatedAvailableExercises = availableExercises.filter(
        (c) => c.id !== chip.id
      );

      setSelectedExercises([...selectedExercises, chip]);
      setAvailableExercises(updatedAvailableExercises);
      props.setSelectedExercises([...selectedExercises, chip]);
    } else if (existingSelectedChip) {
      const updatedSelectedExercises = selectedExercises.filter(
        (c) => c.id !== chip.id
      );

      setAvailableExercises([...availableExercises, chip]);
      setSelectedExercises(updatedSelectedExercises);
    }
  };

  if (selectedExercises.length !== 0) {
    props.setSelectedExercises(selectedExercises)
  }

  useEffect(() => {
    // Update availableExercises when fetchedExercises changes
    const filteredExercises = fetchedExercises.filter(
      (exercise) =>
        !selectedExercises.some((selected) => selected.id === exercise.id)
    );
    setAvailableExercises(filteredExercises);
  }, [fetchedExercises, selectedExercises]);

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <div>
        <RadioButtons category={category} handleChange={handleChange} />
        <h2>Box A: Available Exercises</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {availableExercises
          .filter((chip) =>
            chip.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((chip) => (
            <Chip
              key={chip.id}
              label={chip.name}
              icon={iconsByCategory[chip.category]}
              onClick={() => handleChipClick(chip)}
              color={colorsByCategory[chip.category]}
              variant="outlined"
            />
          ))}
      </div>
      <div>
        <h2>Box B: Selected Exercises</h2>
        {selectedExercises.map((chip) => (
          <Chip
            key={chip.id}
            label={chip.name}
            icon={iconsByCategory[chip.category]}
            color={colorsByCategory[chip.category]}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>
    </Stack>
  );
}
