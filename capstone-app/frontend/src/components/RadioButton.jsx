import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from "react";

export default function RadioButtons({category, handleChange}) {
    

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Exercises</FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={category}
        onChange={handleChange}
      >
        <FormControlLabel value="footwork" control={<Radio />} label="Footwork" />
        <FormControlLabel value="racket" control={<Radio />} label="Racket" />
        <FormControlLabel value="strength" control={<Radio />} label="Strength" />
        <FormControlLabel value="all" control={<Radio />} label="All" />
        
      </RadioGroup>
    </FormControl>
  );
}