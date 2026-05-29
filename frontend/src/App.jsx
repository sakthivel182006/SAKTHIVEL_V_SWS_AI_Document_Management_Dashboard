import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import AdminHome from "./pages/admin/AdminHome";

import EmployeeHome from "./pages/employee/EmployeeHome";

function App() {

  const role = localStorage.getItem("role");

  const AdminProtectedRoute = ({ children }) => {

    if (role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  };

  const EmployeeProtectedRoute = ({ children }) => {

    if (role !== "employee") {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <EmployeeProtectedRoute>
              <EmployeeHome />
            </EmployeeProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;