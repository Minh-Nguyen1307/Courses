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

import Forbidden from "./Components/SignInComponents/Forbidden";
import PrivateRoute from "./Components/SignInComponents/PrivateRoute";
import ClientsDashboard from "./Dashboard/ClientsDashboard/ClientsDashboard";
import CommunicationDashboard from "./Dashboard/CommunicationDashboard/CommunicationDashboard";
import RevenueDashboard from "./Dashboard/RevenueDashboard/RevenueDashboard";
import SettingDashboard from "./Dashboard/SettingDashboard/SettingDashboard";
import CoursesDashboard from "./Dashboard/CoursesDashboard/CoursesDashboard.JSX";
import UploadCourseForm from "./Dashboard/CoursesDashboard/UploadCourseForm/UploadCourseForm.JSX";
import DashboardLayout from "./Dashboard/DashboardLayout";

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
        <Route path="/forbidden" element={<Forbidden />} />

        {/* Protected Routes for Admin */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<DashboardLayout />} />
          <Route path="/admin-dashboard/clients" element={<ClientsDashboard />} />
          <Route path="/admin-dashboard/coursesdashboard" element={<CoursesDashboard />} />
          <Route path="/admin-dashboard/coursesdashboard/uploadCourses" element={<UploadCourseForm />} />
          <Route path="/admin-dashboard/communication" element={<CommunicationDashboard />} />
          <Route path="/admin-dashboard/revenue" element={<RevenueDashboard />} />
          <Route path="/admin-dashboard/setting" element={<SettingDashboard />} />
        </Route>

        {/* Protected Routes for User and Admin */}
        <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/" element={<HomePage />} />
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
