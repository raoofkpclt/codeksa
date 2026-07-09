import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/client/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;