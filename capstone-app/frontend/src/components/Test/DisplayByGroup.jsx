import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";


export default function DisplayByGroup() {
  const { currentUser } = useUserContext();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/assignedexercises/user/${currentUser.id}`)
      .then((response) => {
        setAssignedExercises(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching assigned exercises:", error);
      });
  }, []);

  useEffect(() => {
    // Organize exercises by assignedDate
    const exercisesByDate = {};
    assignedExercises.forEach((exercise) => {
      if (!exercisesByDate[exercise.assignedDate]) {
        exercisesByDate[exercise.assignedDate] = [];
      }
      exercisesByDate[exercise.assignedDate].push(exercise);
    });

    // Set the organized data in state
    setExerciseData(exercisesByDate);
  }, [assignedExercises]);

  return (
    <div>
      <h2>Your Assigned Exercises</h2>
      {Object.entries(exerciseData).map(([assignedDate, exercises]) => (
        <div key={assignedDate}>
          <h3>Assigned Date: {assignedDate}</h3>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>
                {exercise.name} - {exercise.category}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
