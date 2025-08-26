// src/components/modals/ArchiveReasonModal.jsx
import React, { useState } from "react";

const ArchiveReasonModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const commonReasons = ["Expired", "Damaged", "Product Recall", "Overstock"];

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!reason) {
      alert("Please provide a reason for archiving.");
      return;
    }
    setIsConfirming(true);
    try {
      await onConfirm(reason);
      onClose();
    } catch (error) {
      console.error("Failed to archive:", error);
    } finally {
      setIsConfirming(false);
      setReason("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reason for Archiving</h2>
        <p className="mb-4 text-gray-600">
          Please provide a reason. This helps with inventory tracking.
        </p>

        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason
          </label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Expired stock"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {commonReasons.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`px-3 py-1 text-sm border rounded-full ${
                reason === r
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming || !reason}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
          >
            {isConfirming ? "Archiving..." : "Confirm Archive"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveReasonModal;
