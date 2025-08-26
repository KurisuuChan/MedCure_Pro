// src/components/modals/PaymentModal.jsx
import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, onConfirm, total, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const handleConfirm = async () => {
    const success = await onConfirm(paymentMethod);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Finalize Sale</h2>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600">Total Amount Due</p>
          <p className="text-5xl font-bold text-emerald-600">
            {formatCurrency(total)}
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md bg-white"
          >
            <option>Cash</option>
            <option>Credit Card</option>
            <option>GCash</option>
          </select>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full px-4 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </button>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
