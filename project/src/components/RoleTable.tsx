import React, { useState } from 'react';
import { Role, Resource, Permission } from '../types';
import { useRBAC } from '../context/RBACContext';
import { Edit2, Trash2, Shield } from 'lucide-react';
import RoleModal from './RoleModal';

export const RoleTable: React.FC = () => {
  const { roles, deleteRole, hasPermission } = useRBAC();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedRole(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const getPermissionBadge = (permissions: Permission[]) => {
    return (
      <div className="flex gap-1">
        {permissions.map((permission) => (
          <span
            key={permission}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
          >
            {permission}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
        {hasPermission('roles', 'create') && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Shield size={18} />
            Add Role
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{role.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{role.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {Object.entries(role.permissions).map(([resource, permissions]) => (
                      <div key={resource} className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {resource}:
                        </span>
                        {getPermissionBadge(permissions)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    {hasPermission('roles', 'update') && (
                      <button
                        onClick={() => handleEdit(role)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                    {hasPermission('roles', 'delete') && (
                      <button
                        onClick={() => deleteRole(role.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
        isCreating={isCreating}
      />
    </div>
  );
};