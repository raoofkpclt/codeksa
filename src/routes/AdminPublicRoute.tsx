import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../config/firebase/firebase";

interface Props {
  children: ReactNode;
}

const AdminPublicRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (user === undefined) return <div>Loading...</div>;

  // Already logged in
const role = localStorage.getItem("role");

if (user && role === "admin") {
  return <Navigate to="/admin/home" replace />;
}

  return <>{children}</>;
};

export default AdminPublicRoute;