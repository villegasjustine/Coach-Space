import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import RadioButtons from "./RadioButton";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitbitIcon from '@mui/icons-material/Fitbit';

const initialCategory = "all";

export default function IconChipsTest(props) {
  const [category, setCategory] = useState(initialCategory);
  const [fetchedExercises, setFetchedExercises] = useState([]);
  const [availableChips, setAvailableChips] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const iconsByCategory = {
    strength: <FitnessCenterIcon />,
    footwork: <DirectionsRunIcon />,
    racket: <FitbitIcon />
  };

  const colorsByCategory = {
    strength: 'warning',
    footwork: 'info',
    racket: 'secondary'
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
    const existingChip = availableChips.find((c) => c.id === chip.id);
    const existingSelectedChip = selectedChips.find((c) => c.id === chip.id);

    if (existingChip && !existingSelectedChip) {
      const updatedAvailableChips = availableChips.filter(
        (c) => c.id !== chip.id
      );

      setSelectedChips([...selectedChips, chip]);
      setAvailableChips(updatedAvailableChips);
      props.setSelectedExercises([...selectedChips, chip]);
    } else if (existingSelectedChip) {
      const updatedSelectedChips = selectedChips.filter((c) => c.id !== chip.id);

      setAvailableChips([...availableChips, chip]);
      setSelectedChips(updatedSelectedChips);
    }
  };

  if (selectedChips.length !== 0) {
    props.setSelectedExercises(selectedChips);
  }

  useEffect(() => {
    // Update availableChips when fetchedExercises changes
    const filteredChips = fetchedExercises.filter(
      (exercise) =>
        !selectedChips.some((selected) => selected.id === exercise.id)
    );
    setAvailableChips(filteredChips);
  }, [fetchedExercises, selectedChips]);

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
        {availableChips
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
        {selectedChips.map((chip) => (
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
