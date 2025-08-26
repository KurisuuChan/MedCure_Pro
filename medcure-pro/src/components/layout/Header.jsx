// src/components/layout/Header.jsx
import React from "react";
import { Bell, UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <UserCircle className="w-8 h-8 text-gray-400" />
          <div>
            <p className="font-semibold text-sm">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
