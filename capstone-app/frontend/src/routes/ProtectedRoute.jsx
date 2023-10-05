import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


function ProtectedRoute({ redirectPath = "/", children }) {
  const { currentUser } = useUserContext();

  if (!currentUser.firstName) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
// save as routes/ProtectedRoute.jsx
