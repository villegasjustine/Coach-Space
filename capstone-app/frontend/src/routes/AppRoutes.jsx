import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import UserPage from "../pages/UserPage";
import VideoPage from "../pages/VideoPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import ExercisesPage from "../pages/ExercisesPage";
import AdminExercisePage from "../pages/AdminExercisePage";
import ForgotPasswordPage from "../pages/ForgotPassword";
import AdminLoginPage from "../pages/AdminLoginPage";
import LogInPage from "../pages/LoginPage";
import AssignExercisePage from "../pages/AssignExercisePage";
import UAEPage from "../pages/UAEPage";
import AccountPage from "../pages/AccountPage";

export default function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<WelcomePage {...props} />} />
      <Route path="Home" element={<HomePage {...props} />} />
      <Route path="Account" element={<AccountPage {...props} />} />
      <Route path="Users" element={<UserPage {...props} />} />
      <Route path="Video" element={<VideoPage {...props} />} />
      <Route path="Signup" element={<SignUpPage {...props} />} />
      <Route path="Login" element={<LogInPage {...props} />} />
      <Route path="ForgotPassword" element={<ForgotPasswordPage {...props} />} />
      <Route path="Exercises" element={<ExercisesPage {...props} />} />
      <Route path="AdminExercise" element={<AdminExercisePage {...props} />} />
      <Route path="AssignExercise" element={<AssignExercisePage {...props} />} />
      <Route path="UAE" element={<UAEPage {...props} />} />
      <Route path="AdminLogin" element={<AdminLoginPage {...props} />} />
    </Routes>
  );
}
