import React, { useState, useEffect } from "react";
import axios from "axios";
import IconChipsTest from "../IconChipsTest";
import ExerciseUserGrid from "../ExerciseUserGrid";

export default function WithDate() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedDate, setAssignedDate] = useState(""); // Add state for assignment date

  const handleCheckValues = () => {
    console.log(selectedExercises);
    console.log(selectedUsers);
    console.log(assignedDate);
  };

  const handleSelectedExercisesUpdate = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  const handleAssignedExercises = () => {
    setIsLoading(true);

    // create an object to store assigned exercises, users and date
    const assignedExercises = 
      selectedUsers.map((userId) =>
      selectedExercises.map((exercise) => ({
        UserId: userId,
        ExerciseId: exercise.id,
        assignedDate: assignedDate,
      }))
    )
    .flat();

    // console.log(selectedExercises, selectedUsers, assignedExercises)

    axios
      .post(
        "http://localhost:8080/api/assignedexercises/create",
        assignedExercises
      )
      .then((response) => {
        console.log("Assigned exercises saved:", response.data);
        setAssignedData(response.data);
        // console.log("With Date", assignedExercises)
        setSelectedExercises([]);
      })
      .catch((error) => {
        console.error("Error saving assigned exercises:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="AssignExercise">
      <IconChipsTest
        selectedExercises={selectedExercises}
        setSelectedExercises={handleSelectedExercisesUpdate}
      />

      <ExerciseUserGrid
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

    
      <label>
        Assigned Date:
        <input
          type="date"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
        />
      </label>

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
                User ID: {item.UserId}, Exercise ID: {item.ExerciseId}, Date: {item.Date}
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
