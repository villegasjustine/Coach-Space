import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useLocation } from 'react-router-dom';

export default function IconChips({value, category}) {
    const [selectedChips, setSelectedChips] = React.useState([]);

    const handleClick = () => {
        const updatedSelectedChips = [...selectedChips, { value, category }];
        setSelectedChips(updatedSelectedChips);
      };

    let icon;

    if (category == "strength") {
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
      
    </Stack>
    
  );
}

export function SelectedChipsBox({ selectedChips }) {
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