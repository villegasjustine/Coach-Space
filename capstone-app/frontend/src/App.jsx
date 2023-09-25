import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import { ExerciseProvider } from "./context/ExerciseContext";

function App() {
  return (
    <>
      Test: Capstone Project In Progress
      <UserProvider>
        <ExerciseProvider>
          <AppRoutes />
        </ExerciseProvider>
      </UserProvider>
    </>
  );
}

export default App;
