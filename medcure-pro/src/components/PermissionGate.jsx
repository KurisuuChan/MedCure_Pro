// src/components/PermissionGate.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { hasPermission } from "../utils/permissions";

/**
 * A component that conditionally renders its children based on the user's role and a required permission.
 * @param {object} props
 * @param {string} props.permission - The permission required to render the children.
 * @param {React.ReactNode} props.children - The content to render if the user has permission.
 */
const PermissionGate = ({ permission, children }) => {
  const { session } = useAuth();
  const userRole = session?.user?.user_metadata?.role;

  if (hasPermission(userRole, permission)) {
    return <>{children}</>;
  }

  return null; // Render nothing if the user does not have permission
};

export default PermissionGate;
