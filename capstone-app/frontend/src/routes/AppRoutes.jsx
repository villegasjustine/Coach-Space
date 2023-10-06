import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import UserPage from "../pages/UserPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import ExercisesPage from "../pages/ExercisesPage";
import AdminExercisePage from "../pages/AdminExercisePage";
import LogInPage from "../pages/LoginPage";
import AssignExercisePage from "../pages/AssignExercisePage";
import UAEPage from "../pages/UAEPage";
import AccountPage from "../pages/AccountPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<WelcomePage {...props} />} />
      <Route path="Signup" element={<SignUpPage {...props} />} />
      <Route path="Login" element={<LogInPage {...props} />} />

      <Route path="Home" element={<ProtectedRoute><HomePage {...props} /></ProtectedRoute>} />
      <Route path="Account" element={<ProtectedRoute><AccountPage {...props} /></ProtectedRoute>} />
      <Route path="Users" element={<ProtectedRoute><UserPage {...props} /></ProtectedRoute>} />
     
      
      <Route path="Exercises" element={<ProtectedRoute><ExercisesPage {...props} /></ProtectedRoute>} />
      <Route path="AdminExercise" element={<ProtectedRoute><AdminExercisePage {...props} /></ProtectedRoute>} />
      <Route path="AssignExercise" element={<ProtectedRoute><AssignExercisePage {...props} /></ProtectedRoute>} />
      <Route path="UAE" element={<ProtectedRoute><UAEPage {...props} /></ProtectedRoute>} />
  
    </Routes>
  );
}
