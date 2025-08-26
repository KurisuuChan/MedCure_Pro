// src/services/settingsService.js
import { supabase } from "../config/supabase";

// --- Business Settings ---
export const getBusinessSettings = async () => {
  const { data, error } = await supabase
    .from("business_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw error;
  return data;
};

export const updateBusinessSettings = async (settingsData) => {
  const { data, error } = await supabase
    .from("business_settings")
    .update({ ...settingsData, updated_at: new Date() })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// --- User Profile Settings ---
export const getProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found.");

  const { data, error } = await supabase
    .from("profiles")
    .select(`full_name, avatar_url`)
    .eq("id", user.id)
    .single();

  if (error) throw error;
  // Combine auth email with profile data
  return { ...data, email: user.email };
};

export const updateProfile = async (profileData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found.");

  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUserPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
};
