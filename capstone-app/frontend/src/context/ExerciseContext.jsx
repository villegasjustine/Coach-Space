import React, { useState, useContext } from "react";

// 1. Create the context
const ExerciseContext = React.createContext();

// Custom provider component for this context.
// Use it in App.jsx like <UserProvider>...</UserProvider>
export const ExerciseProvider = (props) => {
  // store the current user in state at the top level
  const [currentExercise, setCurrentExercise] = useState({});

  // sets user object in state, shared via context
  const handleUpdateExercise = (exercise) => {
    setCurrentExercise(exercise);
  };

  // 2. Provide the context.
  // The Provider component of any context (UserContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current user and an update function
  return (
    <ExerciseContext.Provider value={{ currentExercise, handleUpdateExercise }}>
      {props.children}
    </ExerciseContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useExerciseContext = () => {
  return useContext(ExerciseContext);
};
// Save as UserContext.jsx in a separate 'context' folder
