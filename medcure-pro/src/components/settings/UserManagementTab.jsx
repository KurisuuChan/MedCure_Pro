// src/components/settings/UserManagementTab.jsx
import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useConfirm } from "../../hooks/useConfirm";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import InviteUserModal from "../modals/InviteUserModal";

const UserManagementTab = () => {
  const { users, loading, error, fetchUsers, inviteUser, updateUserRole } =
    useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showConfirm, ConfirmationDialog } = useConfirm();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleInvite = async (email, role) => {
    const promise = inviteUser(email, role);
    toast.promise(promise, {
      loading: "Sending invitation...",
      success: (data) => {
        fetchUsers(); // Refresh list on success
        return "Invitation sent successfully!";
      },
      error: (err) => err.message || "Failed to send invitation.",
    });
  };

  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) return;

    showConfirm(
      "Change User Role",
      `Are you sure you want to change ${
        user.full_name || "this user"
      }'s role to ${newRole}?`,
      async () => {
        await updateUserRole(user.id, newRole);
        fetchUsers(); // Refresh list
        toast.success("User role updated.");
      }
    );
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <ConfirmationDialog />
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              User Management
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your team members and their account roles.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Invite User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.full_name || (
                      <span className="italic text-gray-500">
                        Pending Invitation
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="p-1 border rounded-md bg-white focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <InviteUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvite={handleInvite}
      />
    </>
  );
};

export default UserManagementTab;
