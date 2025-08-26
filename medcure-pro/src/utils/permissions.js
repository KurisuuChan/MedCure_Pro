// src/utils/permissions.js

// Define all possible permissions in the application
export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: "manage_users",
  VIEW_USERS: "view_users",

  // Inventory
  MANAGE_PRODUCTS: "manage_products",
  ARCHIVE_PRODUCTS: "archive_products",

  // Sales
  CREATE_SALE: "create_sale",

  // Reporting
  VIEW_REPORTS: "view_reports",
  EXPORT_REPORTS: "export_reports",

  // Settings
  MANAGE_BUSINESS_SETTINGS: "manage_business_settings",
};

// Define roles and assign permissions to them
const ROLES = {
  ADMIN: "Admin",
  STAFF: "Staff",
};

// Map roles to their specific permissions
const rolePermissions = {
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.ARCHIVE_PRODUCTS,
    PERMISSIONS.CREATE_SALE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.MANAGE_BUSINESS_SETTINGS,
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.CREATE_SALE,
    PERMISSIONS.VIEW_REPORTS,
  ],
};

/**
 * Checks if a user with a given role has a specific permission.
 * @param {string} role - The role of the user.
 * @param {string} permission - The permission to check for.
 * @returns {boolean} - True if the user has the permission, false otherwise.
 */
export const hasPermission = (role, permission) => {
  if (!role || !rolePermissions[role]) {
    return false; // Role does not exist or is null/undefined
  }
  return rolePermissions[role].includes(permission);
};
