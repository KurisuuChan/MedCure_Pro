// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart,
  Settings,
  Users,
  Archive,
} from "lucide-react";
import PermissionGate from "../PermissionGate";
import { PERMISSIONS } from "../../utils/permissions";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "POS", path: "/pos", icon: ShoppingCart },
    { name: "Management", path: "/management", icon: Package },
    // Add Archived link as a sub-item
    {
      name: "Archived",
      path: "/management/archived",
      icon: Archive,
      isSubItem: true,
    },
    { name: "Reports", path: "/reports", icon: BarChart },
    {
      name: "User Mgt.",
      path: "/users",
      icon: Users,
      permission: PERMISSIONS.MANAGE_USERS,
    },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const getLinkClass = (path, isSubItem = false) => {
    const isActive = location.pathname === path;
    let classes =
      "flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-emerald-200";
    if (isSubItem) classes += " pl-11"; // Indent sub-items
    if (isActive)
      return `flex items-center px-4 py-2 text-emerald-700 bg-emerald-100 rounded-lg ${
        isSubItem ? "pl-11" : ""
      }`;
    return classes;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-emerald-600">MedCure Pro</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const navLink = (
            <NavLink
              to={link.path}
              className={() => getLinkClass(link.path, link.isSubItem)}
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </NavLink>
          );

          if (link.permission) {
            return (
              <PermissionGate key={link.name} permission={link.permission}>
                {navLink}
              </PermissionGate>
            );
          }

          return <div key={link.name}>{navLink}</div>;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
