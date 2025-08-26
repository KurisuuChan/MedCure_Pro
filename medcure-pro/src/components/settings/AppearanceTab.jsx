// src/components/settings/AppearanceTab.jsx
import React from "react";

const AppearanceTab = () => {
  // Note: Full dark mode implementation requires a theme provider context.
  // This UI is ready for that logic to be added.
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
      <p className="text-gray-500 mt-1">
        Customize the look and feel of your workspace.
      </p>
      <div className="mt-6 border-t pt-6">
        <div className="flex items-center justify-between max-w-lg">
          <div>
            <h3 className="text-md font-medium text-gray-800">
              Interface Theme
            </h3>
            <p className="text-sm text-gray-500">
              Select or customize your interface theme.
            </p>
          </div>
          <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
            <button className="px-3 py-1 text-sm bg-white rounded-md shadow font-semibold text-emerald-700">
              Light
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-300 rounded-md">
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
