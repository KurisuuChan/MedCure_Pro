// src/pages/Settings.jsx
import React, { useState } from "react";
import ProfileTab from "../components/settings/ProfileTab";
import AppearanceTab from "../components/settings/AppearanceTab";
import BusinessTab from "../components/settings/BusinessTab";
import UserManagementTab from "../components/settings/UserManagementTab";
import PermissionGate from "../components/PermissionGate";
import { PERMISSIONS } from "../utils/permissions";
import { User, Palette, Building, Users } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    {
      id: "business",
      label: "Business Info",
      icon: Building,
      permission: PERMISSIONS.MANAGE_BUSINESS_SETTINGS,
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      permission: PERMISSIONS.MANAGE_USERS,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "appearance":
        return <AppearanceTab />;
      case "business":
        return <BusinessTab />;
      case "users":
        return <UserManagementTab />;
      default:
        return null;
    }
  };

  const TabButton = ({ tab }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          activeTab === tab.id
            ? "bg-emerald-100 text-emerald-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Icon className="w-5 h-5 mr-2" />
        {tab.label}
      </button>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <nav className="flex flex-row md:flex-col gap-2">
            {tabs.map((tab) => {
              if (tab.permission) {
                return (
                  <PermissionGate key={tab.id} permission={tab.permission}>
                    <TabButton tab={tab} />
                  </PermissionGate>
                );
              }
              return <TabButton key={tab.id} tab={tab} />;
            })}
          </nav>
        </aside>

        <main className="flex-1">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default Settings;
