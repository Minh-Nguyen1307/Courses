import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, element, ...props }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token, redirect to sign-in page
    navigate("/signin");
    return null;  // Prevent rendering any element
  }

  try {
    // Decode the token to get the user role
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      // If the user's role matches the allowed roles, render the component
      return element; // Render the component passed as 'element' prop
    } else {
      // If the user doesn't have the correct role, redirect to a forbidden or error page
      navigate("/forbidden");
      return null;  // Prevent rendering any element
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    // If error decoding token, redirect to sign-in
    navigate("/signin");
    return null;  // Prevent rendering any element
  }
};

export default PrivateRoute;
