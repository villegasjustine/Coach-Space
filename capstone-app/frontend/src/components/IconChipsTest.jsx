import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import RadioButtons from './RadioButton';

const initialCategory = "all";

export default function IconChipsTest(props) {
  const [category, setCategory] = useState(initialCategory);
  const [fetchedExercises, setFetchedExercises] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSetSelectedExercise = () => {
    props.setSelectedExercises(selectedChips)
  }

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
        // console.log(response.data.data);
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
      // delete clicked chip from box a
      const updatedAvailableChips = availableChips.filter((c) => c.id !== chip.id);

      // add clicked chip to box b
      setSelectedChips([...selectedChips, chip]);

      // state update
      setAvailableChips(updatedAvailableChips);
    } else {
      // check if there are the same id's
      const existingSelectedChip = selectedChips.find((c) => c.id === chip.id);

      if (existingSelectedChip) {
        // if clicked in box b, remove it and put it back in box a
        const updatedSelectedChips = selectedChips.filter((c) => c.id !== chip.id);

        // add clicked chip back in box a
        setAvailableChips([...availableChips, chip]);
       
        // state update
        setSelectedChips(updatedSelectedChips);
        props.setSelectedExercises(updatedSelectedChips)
      }
    }
  };

  
  // console.log(selectedChips)

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
            color="primary"
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
            color = "primary"
            onClick={() => handleChipClick(chip)} // moving chips back
          />
        ))}
      </div>
    </Stack>
  );
}
