import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RandomExerciseGenerator = () => {
  const [exerciseData, setExerciseData] = useState([]);
  const [randomExercise, setRandomExercise] = useState(null);

  useEffect(() => {
    // Fetch exercises when the component mounts
    axios.get('http://localhost:8080/api/exercises/')
      .then((response) => {
        console.log('responsedata',response.data.data)
        if (response.data.data && Array.isArray(response.data.data)) {
          setExerciseData(response.data.data);
        } else {
          console.log('No exercise data found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error.message);
      });
  }, []);

  const generateRandomExercise = () => {
    if (exerciseData.length > 0) {
      const randomIndex = getRandomNumber(0, exerciseData.length - 1);
      const selectedExercise = exerciseData[randomIndex];
      const randomReps = getRandomNumber(10, 20);
      setRandomExercise(`${selectedExercise.name} x ${randomReps}`);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Random Exercise Generator</Typography>
          <Typography variant="body2" color="textSecondary">
            {randomExercise ? randomExercise : 'Click the button to generate a random exercise.'}
          </Typography>
          <Button variant="contained" color="primary" onClick={generateRandomExercise}>
            Give me an exercise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomExerciseGenerator;
