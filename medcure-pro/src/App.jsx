// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout and Authentication Components
import FullLayout from "./layouts/FullLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Page Components
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Management from "./pages/Management";
import Archived from "./pages/Archived";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// Dummy component for any page not fully built
const UserManagement = () => (
  <h1 className="text-3xl font-bold">User Management</h1>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* All routes inside this element are protected and require authentication */}
        <Route element={<ProtectedRoute />}>
          {/* The FullLayout provides the consistent sidebar and header for all nested pages */}
          <Route path="/" element={<FullLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pos" element={<POS />} />
            <Route path="management" element={<Management />} />
            <Route path="management/archived" element={<Archived />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback route: If no other route matches, redirect to the main page. */}
        {/* The ProtectedRoute will handle redirecting to /login if not authenticated. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
