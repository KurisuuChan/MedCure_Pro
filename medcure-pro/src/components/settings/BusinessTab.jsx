// src/components/settings/BusinessTab.jsx
import React, { useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const BusinessTab = () => {
  const {
    businessSettings,
    loading,
    fetchBusinessSettings,
    updateBusinessSettings,
  } = useSettings();
  const [formData, setFormData] = useState({
    business_name: "",
    address: "",
    phone_number: "",
  });

  useEffect(() => {
    fetchBusinessSettings();
  }, [fetchBusinessSettings]);

  useEffect(() => {
    if (businessSettings) {
      setFormData({
        business_name: businessSettings.business_name || "",
        address: businessSettings.address || "",
        phone_number: businessSettings.phone_number || "",
      });
    }
  }, [businessSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = updateBusinessSettings(formData);
    toast.promise(promise, {
      loading: "Saving settings...",
      success: "Business settings updated!",
      error: "Failed to update settings.",
    });
  };

  if (loading) return <p>Loading business settings...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">
        Business Information
      </h2>
      <p className="text-gray-500 mt-1">
        Update your business's public information.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="text-right border-t pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessTab;
