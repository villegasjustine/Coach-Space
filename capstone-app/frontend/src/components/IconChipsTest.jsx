import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import RadioButtons from './RadioButton';

const initialCategory = "all";

export default function IconChipsTest() {
  const [category, setCategory] = useState(initialCategory);
  const [fetchedExercises, setFetchedExercises] = useState([]);

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
        console.error("Error fetching exercises:", error);
      });
  }, [category]);

  const [availableChips, setAvailableChips] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipClick = (chip) => {
    // Check if the chip with the same id exists in availableChips
    const existingChip = availableChips.find((c) => c.id === chip.id);

    if (existingChip) {
      // Remove the clicked chip from availableChips
      const updatedAvailableChips = availableChips.filter((c) => c.id !== chip.id);

      // Add the clicked chip to selectedChips
      setSelectedChips([...selectedChips, chip]);

      // Update the state
      setAvailableChips(updatedAvailableChips);
    } else {
      // Check if the chip with the same id exists
      const existingSelectedChip = selectedChips.find((c) => c.id === chip.id);

      if (existingSelectedChip) {
        // Remove the clicked chip from selectedChips
        const updatedSelectedChips = selectedChips.filter((c) => c.id !== chip.id);

        // Add the clicked chip back to availableChips
        setAvailableChips([...availableChips, chip]);

        // Update the state
        setSelectedChips(updatedSelectedChips);
      }
    }
  };
  console.log(selectedChips)

  useEffect(() => {
    // Update availableChips when fetchedExercises changes
    setAvailableChips(fetchedExercises);
  }, [fetchedExercises]);

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <div>
        <RadioButtons category={category} handleChange={handleChange} />
        <h2>Box A: Available Exercises</h2>
        {availableChips.map((chip) => (
          <Chip
            key={chip.id}
            label={chip.name}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>
      <div>
        <h2>Box B: Selected Exercises</h2>
        {selectedChips.map((chip) => (
          <Chip
            key={chip.id}
            label={chip.name}
            variant="outlined"
            onClick={() => handleChipClick(chip)} // moving chips back
          />
        ))}
      </div>
    </Stack>
  );
}
