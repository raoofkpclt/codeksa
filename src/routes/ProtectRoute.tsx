import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase/firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return auth.currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;