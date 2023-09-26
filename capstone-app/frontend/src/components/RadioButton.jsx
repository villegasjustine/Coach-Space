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
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={category}
        onChange={handleChange}
      >
        <FormControlLabel value="Footwork" control={<Radio />} label="Footwork" />
        <FormControlLabel value="Racket" control={<Radio />} label="Racket" />
        <FormControlLabel value="Strength" control={<Radio />} label="Strength" />
        <FormControlLabel value="All" control={<Radio />} label="All" />
        
      </RadioGroup>
    </FormControl>
  );
}