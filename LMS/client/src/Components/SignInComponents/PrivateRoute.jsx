import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  // Retrieve token and user details from localStorage
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if the user is authenticated and has the required role
  if (!token || !user || !allowedRoles.includes(user.role)) {
    // Redirect unauthorized users to the SignIn page
    return <Navigate to="/signin" replace />;
  }

  // Render the child components if authorized
  return <Outlet />;
};

export default PrivateRoute;
