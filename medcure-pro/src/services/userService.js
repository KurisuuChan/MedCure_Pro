// src/services/userService.js
import { supabase } from "../config/supabase";

export const getAllUsers = async () => {
  // This needs to be called from a secure context, like a Supabase function,
  // in a real app. For the tutorial, we'll call a database function.
  // Let's create a placeholder for now and will add the db function later.

  // For now, let's just fetch from profiles table.
  // Note: This exposes user emails, ensure RLS is appropriate for your needs.
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role"); // We don't want to expose avatars here.

  if (error) throw error;
  return data;
};

export const inviteUser = async (email, role) => {
  // Supabase handles the email invitation flow automatically.
  const { data, error } = await supabase.auth.inviteUserByEmail(email, {
    data: { role: role },
  });

  if (error) throw error;
  return data;
};

export const updateUserRole = async (userId, role) => {
  // Note: Updating user roles should be a highly protected operation,
  // ideally done through a server-side function.
  // For this tutorial, we will update the profiles table directly.
  const { data, error } = await supabase
    .from("profiles")
    .update({ role: role })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
