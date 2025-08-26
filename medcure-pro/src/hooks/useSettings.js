// src/hooks/useSettings.js
import { useState, useCallback } from "react";
import * as settingsService from "../services/settingsService";

export const useSettings = () => {
  const [businessSettings, setBusinessSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBusinessSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await settingsService.getBusinessSettings();
      setBusinessSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await settingsService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    businessSettings,
    profile,
    loading,
    error,
    fetchBusinessSettings,
    fetchProfile,
    updateBusinessSettings: settingsService.updateBusinessSettings,
    updateProfile: settingsService.updateProfile,
    updateUserPassword: settingsService.updateUserPassword,
  };
};
