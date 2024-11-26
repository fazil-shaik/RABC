import React, { createContext, useContext, useState } from 'react';
import { Role, User, Permission, Resource, RBACContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      permissions: ['create', 'read', 'update', 'delete'],
    },
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Limited access',
    permissions: {
      users: ['read','create'],
      roles: ['read','create'],
      permissions: ['read','create'],
    },
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Limited access',
    permissions: {
      users: ['read'],
      roles: ['read'],
      permissions: ['read'],
    },
  },
];

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    roleId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [currentUser] = useState<User>(defaultUsers[0]);

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, updatedFields: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...updatedFields } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const addRole = (role: Omit<Role, 'id'>) => {
    const newRole = {
      ...role,
      id: uuidv4(),
    };
    setRoles([...roles, newRole]);
  };

  const updateRole = (id: string, updatedFields: Partial<Role>) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, ...updatedFields } : role
    ));
  };

  const deleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const hasPermission = (resource: Resource, permission: Permission): boolean => {
    const userRole = roles.find(role => role.id === currentUser.roleId);
    return userRole?.permissions[resource]?.includes(permission) || false;
  };

  return (
    <RBACContext.Provider value={{
      users,
      roles,
      currentUser,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole,
      deleteRole,
      hasPermission,
    }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
};