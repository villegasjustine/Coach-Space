import axios from 'axios';

import { useUserContext } from "../context/UserContext";
import { useState, useEffect } from 'react';

export default function UserExercisesHistory() {
  const { currentUser } = useUserContext();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/assignedexercises/user/weekly/${currentUser.id}`)
      .then((response) => {
        setAssignedExercises(response.data.data);
        setFetchedData(response.data.data);
        console.log(assignedExercises)
      })
      .catch((error) => {
        console.error('Error fetching assigned exercises:', error);
      });
  }, []);


console.log('Fetched Data', fetchedData)

const groupedExercises = {};

fetchedData.forEach((exercise) => {
  const key = `${exercise.startDate}-${exercise.endDate}`;

  if (!groupedExercises[key]) {
    // If not, create a new array for this group
    groupedExercises[key] = [];
  }

  // Add the exercise to the appropriate group
  groupedExercises[key].push(exercise);

})

console.log('Grouped Exercises', groupedExercises)


  // useEffect(() => {
  //   const exerciseIds = assignedExercises.map((assignedExercise) => assignedExercise.ExerciseId);


  //   axios.get(`http://localhost:8080/api/exercises/`)
  //     .then((response) => {
  //       const userExercises = (response.data.data.filter((exercise) => exerciseIds.includes(exercise.id)))
  //       setExerciseData(userExercises);
  //       // console.log(response.data.data)
  //       // console.log(exerciseData)
  //       // console.log(exerciseIds)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching exercise data:', error);
  //     });
  // }, [assignedExercises]);


  return (
    <div>
      <h2>Your Assigned Exercises</h2>
      <ul>
        
        {exerciseData.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - {exercise.category}
            {exercise.id}

          </li>
        ))}
      </ul>
    </div>
  );
}
