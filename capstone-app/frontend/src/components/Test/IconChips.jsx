import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitbitIcon from '@mui/icons-material/Fitbit';

export default function IconChips({ value, category }) {
  const [selectedChips, setSelectedChips] = React.useState([]);
  
  const handleClick = () => {
    // Clone the selectedChips array and add the clicked chip to it
    const updatedSelectedChips = [...selectedChips, { value, category }];
    setSelectedChips(updatedSelectedChips);
  };

  let icon;

  if (category === "strength") {
    icon = <FitnessCenterIcon />;
  } else if (category === "footwork") {
    icon = <DirectionsRunIcon />;
  } else if (category === "racket") {
    icon = <FitbitIcon />;
  }

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Chip icon={icon} label={value} onClick={handleClick} />
      <Chip icon={icon} label={value} variant={"outlined"} onClick={handleClick}/>
      <SelectedChipsBox selectedChips={selectedChips} />
    </Stack>
  );
}

function SelectedChipsBox({ selectedChips }) {
  return (
    <div>
      <h2>Selected Chips:</h2>
      <ul>
        {selectedChips.map((chip, index) => (
          <li key={index}>{chip.value} - {chip.category}</li>
        ))}
      </ul>
    </div>
  );
}