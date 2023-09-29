import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useUserContext } from '../context/UserContext';

export default function UserExercises() {
  const { currentUser } = useContext(useUserContext);
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/assignedexercises/user/${currentUser.id}`)
      .then((response) => {
        setAssignedExercises(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching assigned exercises:', error);
      });
  }, [currentUser]);

  useEffect(() => {
    const exerciseIds = assignedExercises.map((assignedExercise) => assignedExercise.ExerciseId);

    
    axios.get(`http://localhost:8080/api/exercises`, {
      params: {
        ids: exerciseIds.join(','), 
      },
    })
      .then((response) => {
        setExerciseData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching exercise data:', error);
      });
  }, [assignedExercises]);

  return (
    <div>
      <h2>Your Assigned Exercises</h2>
      <ul>
        {exerciseData.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - {exercise.category}
            <button onClick={() => handleExerciseComplete(exercise.id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
