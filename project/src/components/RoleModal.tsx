import React, { useState, useEffect } from 'react';
import { Role, Resource, Permission } from '../types';
import { useRBAC } from '../context/RBACContext';
import { X, Check, Square } from 'lucide-react';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  isCreating: boolean;
}

const RESOURCES: Resource[] = ['users', 'roles', 'permissions'];
const PERMISSIONS: Permission[] = ['create', 'read', 'update', 'delete'];

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role, isCreating }) => {
  const { addRole, updateRole } = useRBAC();
  const [formData, setFormData] = useState<Omit<Role, 'id'>>({
    name: '',
    description: '',
    permissions: {},
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissions: { ...role.permissions },
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: {},
      });
    }
  }, [role]);

  const handlePermissionChange = (
    resource: Resource,
    permission: Permission,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const newPermissions = { ...prev.permissions };
      if (!newPermissions[resource]) {
        newPermissions[resource] = [];
      }
      if (checked) {
        newPermissions[resource] = [...(newPermissions[resource] || []), permission];
      } else {
        newPermissions[resource] = newPermissions[resource]?.filter((p) => p !== permission) || [];
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSelectAll = (resource: Resource) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: [...PERMISSIONS],
      },
    }));
  };

  const handleDeselectAll = (resource: Resource) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: [],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addRole(formData);
    } else if (role) {
      updateRole(role.id, formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create Role' : 'Edit Role'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Define role permissions for different resources
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Resource Permissions
            </label>
            <div className="space-y-4">
              {RESOURCES.map((resource) => (
                <div key={resource} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700 uppercase">
                      {resource}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectAll(resource)}
                        className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeselectAll(resource)}
                        className="text-xs px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Deselect All
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PERMISSIONS.map((permission) => (
                      <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions[resource]?.includes(permission) || false}
                          onChange={(e) =>
                            handlePermissionChange(resource, permission, e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="text-sm text-gray-600 capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Check size={18} />
              {isCreating ? 'Create Role' : 'Update Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;