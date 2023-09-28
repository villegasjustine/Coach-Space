import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import IconChipsTest from "./IconChipsTest";
import ExerciseUserGrid from "./ExerciseUserGrid";

export default function AssignExercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dataSent, setDataSent] = useState([]);
  console.log(selectedExercises)
  console.log(selectedUsers);
  
  const handleCheckValues = () => {
    console.log(selectedExercises)
    console.log(selectedUsers);
  }

  const handleAssignedExercises = () => {
    setIsLoading(true);

    // create an object to store assigned exercises and users
    const assignedExercises = selectedUsers.map((userId) => (
      selectedExercises.map((exercise) => ({
        UserId: userId,
        ExerciseId: exercise.id,
      }))
    )).flat();
    
   
    axios
      .post("http://localhost:8080/api/assignedexercises/create", assignedExercises)
      
      .then((response) => {
        console.log("Assigned exercises saved:", response.data.data);

        // update assignedData with the response data
        setAssignedData(response.data.data);

        setSelectedExercises([])
       
      
      })
      .catch((error) => {
        console.error("Error saving assigned exercises:", error);
      })
      .finally(() => {
        // setSelectedExercises([]); // clear exercises
        // setSelectedUsers([]); // clear users
        setIsLoading(false);
      });
  };

  return (
    <div className="AssignExercise">
      <IconChipsTest
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
      <ExerciseUserGrid
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <button onClick={handleAssignedExercises} disabled={isLoading}>
        {isLoading ? "Assigning..." : "Assign Exercises"}
      </button>

      <button onClick={handleCheckValues}>Check Check</button>

      {assignedData.length > 0 && (
        <div>
          <h2>Assigned Exercises:</h2>
          <ul>
            {assignedData.map((item) => (
              <li key={item.id}>
                User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
