import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import IconChipsTest from "./IconChipsTest";
import ExerciseUserGrid from "./ExerciseUserGrid";
import ExerciseCard from "./ExerciseCard";
import ExerciseBox from "./ExerciseBox";
import { DatePicker } from "@mui/x-date-pickers";

export default function AssignExercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedDate, setAssignedDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dataSent, setDataSent] = useState([]);
  console.log("Selected exercises:", selectedExercises);
  console.log("Selected users:", selectedUsers);
  console.log("Assigned date:", assignedDate);

  const handleCheckValues = () => {
    console.log(selectedExercises);
    console.log(selectedUsers);
  };

  const handleSelectedExercisesUpdate = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  const handleAssignedExercises = () => {
    setIsLoading(true);

    // create an object to store assigned exercises and users
    const assignedExercises = selectedUsers
      .map((userId) =>
        selectedExercises.map((exercise) => ({
          UserId: userId,
          ExerciseId: exercise.id,
          assignedDate: assignedDate,
          endDate: endDate,
        }))
      )
      .flat();

    axios
      .post(
        "http://localhost:8080/api/assignedexercises/create",
        assignedExercises
      )

      .then((response) => {
        console.log("Assigned exercises saved:", response.data);
        setAssignedData(response.data);
        setSelectedExercises([]);
        // console.log("Date Response", assignedDate)
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
        setSelectedExercises={handleSelectedExercisesUpdate}
      />

      {/* <ExerciseBox
        selectedExercises={selectedExercises}
        setSelectedExercises={handleSelectedExercisesUpdate}
      ></ExerciseBox>

      <ExerciseCard
        selectedExercises={selectedExercises}
        setSelectedExercises={handleSelectedExercisesUpdate}
      ></ExerciseCard> */}

      <ExerciseUserGrid
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      <DatePicker
        value={assignedDate}
        onChange={(newDate) => setAssignedDate(newDate)}
      ></DatePicker>

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
                User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
