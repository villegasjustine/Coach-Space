import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import UserPage from "../pages/UserPage";
import VideoPage from "../pages/VideoPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import ExercisesPage from "../pages/ExercisesPage";
import AdminExercisePage from "../pages/AdminExercisePage";
import ForgotPasswordPage from "../pages/ForgotPassword";

export default function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<WelcomePage {...props} />} />
      <Route path="home" element={<HomePage {...props} />} />
      <Route path="users" element={<UserPage {...props} />} />
      <Route path="video" element={<VideoPage {...props} />} />
      <Route path="signup" element={<SignUpPage {...props} />} />
      <Route path="login" element={<VideoPage {...props} />} />
      <Route path="ForgotPassword" element={<ForgotPasswordPage {...props} />} />

      <Route path="exercises" element={<ExercisesPage {...props} />} />
      <Route path="AdminExercise" element={<AdminExercisePage {...props} />} />
    </Routes>
  );
}
