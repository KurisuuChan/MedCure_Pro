// src/layouts/FullLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Toaster } from "react-hot-toast"; // Import Toaster

const FullLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {" "}
      {/* Changed background color */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Add the Toaster component here */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#D1FAE5", // emerald-100
                color: "#065F46", // emerald-800
              },
            },
            error: {
              style: {
                background: "#FEE2E2", // red-100
                color: "#991B1B", // red-800
              },
            },
          }}
        />
        <Header />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FullLayout;
