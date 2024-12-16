import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomeDashboard from "./Dashboard/HomeDashboard/HomeDashboard";
import PrivateRoute from "./Components/SignInComponents/PrivateRoute";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
    {!isDashboard && <Header />}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/courses" element={<CoursesPage />} />
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<HomeDashboard />} />
          </Route>
    </Routes>
    {!isDashboard && <Footer />}
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
