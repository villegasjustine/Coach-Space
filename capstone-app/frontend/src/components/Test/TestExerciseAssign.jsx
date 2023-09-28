import React, { useState } from 'react';

function TestExerciseAssign() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exerciseOptions] = useState([
    "Exercise 1",
    "Exercise 2",
    "Exercise 3",
    // Add more exercise options as needed
  ]);
  const [userOptions] = useState([
    "User 1",
    "User 2",
    "User 3",
    // Add more user options as needed
  ]);

  const handleExerciseChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedExercises(selected);
  };

  const handleUserChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedUsers(selected);
  };

  const assignExercises = () => {
    if (selectedExercises.length > 0 && selectedUsers.length > 0) {
      const newAssignments = selectedUsers.map((user) => ({
        user,
        exercises: [...selectedExercises],
      }));
      setAssignments([...assignments, ...newAssignments]);
      setSelectedExercises([]);
      setSelectedUsers([]);
      console.log(selectedUsers)
      console.log(selectedExercises)
    }
  };

  return (
    <div>
      <h2>Select Exercises and Users</h2>

      <h3>Exercise Selection</h3>
      <select multiple value={selectedExercises} onChange={handleExerciseChange}>
        {exerciseOptions.map((exercise, index) => (
          <option key={index} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <h3>User Selection</h3>
      <select multiple value={selectedUsers} onChange={handleUserChange}>
        {userOptions.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>

      <button onClick={assignExercises}>Assign Exercises</button>

      <h3>Assigned Exercises</h3>
      {assignments.map((assignment, index) => (
        <div key={index}>
          {assignment.user}: {assignment.exercises.join(", ")}
        </div>
      ))}
    </div>
  );
}

export default TestExerciseAssign;
