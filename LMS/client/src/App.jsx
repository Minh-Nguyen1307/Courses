import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import CourseDetailPage from "./Pages/CourseDetailPage/CourseDetailPage";
import Cart from "./Pages/Cart/CartPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/SignInComponents/PrivateRoute";
import ClientsDashboard from "./Dashboard/ClientsDashboard/ClientsDashboard";
import CommunicationDashboard from "./Dashboard/CommunicationDashboard/CommunicationDashboard";
import RevenueDashboard from "./Dashboard/RevenueDashboard/RevenueDashboard";
import SettingDashboard from "./Dashboard/SettingDashboard/SettingDashboard";
import CoursesDashboard from "./Dashboard/CoursesDashboard/CoursesDashboard.JSX";
import UploadCourseForm from "./Dashboard/CoursesDashboard/UploadCourseForm/UploadCourseForm.JSX";
import DashboardLayout from "./Dashboard/DashboardLayout";


function App() {
  const location = useLocation(); // Get current location
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  return (
    <>
      {/* Render the appropriate Header and Footer based on the route */}
      {!isAdminDashboard && <Header />}

      <Routes>
        {/* Public Routes */}
        
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {isLoggedIn ? (
          <Route path="/:userId/courses" element={<CoursesPage />} />
        ) : (
          <Route path="/courses" element={<CoursesPage />} />
        )}
        {isLoggedIn ? (
          <Route path="/:userId/courses/:id" element={<CourseDetailPage />} />
        ) : (
          <Route path="/courses/:id" element={<CourseDetailPage />} />
        )}
         {isLoggedIn && <Route path="/:userId/cart" element={<Cart />} />}

        {isLoggedIn ? (
          <Route path="/:userId" element={<HomePage />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}

        {/* Dynamic User Route */}
        

        {/* Protected Routes for Admin */}
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoute allowedRoles={["admin"]} element={<DashboardLayout />} />
          }
        >
          <Route path="clients" element={<ClientsDashboard />} />
          <Route path="courses" element={<CoursesDashboard />} />
          <Route path="courses/upload" element={<UploadCourseForm />} />
          <Route path="communication" element={<CommunicationDashboard />} />
          <Route path="revenue" element={<RevenueDashboard />} />
          <Route path="settings" element={<SettingDashboard />} />
        </Route>
      </Routes>

      {/* Render Footer for non-admin routes */}
      {!isAdminDashboard && <Footer />}
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
