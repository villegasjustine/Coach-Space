import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import { ExerciseProvider } from "./context/ExerciseContext";
import Navbar from "./components/NavBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <>
      Test: Capstone Project In Progress
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <ExerciseProvider>
            <Navbar />
            <AppRoutes />
          </ExerciseProvider>
        </UserProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
