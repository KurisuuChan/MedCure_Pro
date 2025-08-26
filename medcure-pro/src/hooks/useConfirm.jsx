// src/hooks/useConfirm.jsx
import React, { useState, useCallback } from "react";
import ConfirmModal from "../components/modals/ConfirmModal";

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showConfirm = useCallback((title, message, onConfirm) => {
    setTitle(title);
    setMessage(message);
    setOnConfirmCallback(() => onConfirm); // Store the callback
    setIsOpen(true);
  }, []);

  const handleConfirm = async () => {
    if (onConfirmCallback) {
      setIsProcessing(true);
      try {
        await onConfirmCallback();
      } finally {
        setIsProcessing(false);
        setIsOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const ConfirmationDialog = () => (
    <ConfirmModal
      isOpen={isOpen}
      title={title}
      message={message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isProcessing={isProcessing}
    />
  );

  return { showConfirm, ConfirmationDialog };
};
