import React from "react";

import { Navigate } from "react-router-dom";
import useAuth from "../src/hooks/useAuth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { userProfile } = useAuth();

  // if (!userProfile) {
  //   return <Navigate to="/login" />;
  // }

  return <>{children}</>;
};

export default AuthWrapper;
