export type Permission = 'create' | 'read' | 'update' | 'delete';

export type Resource = 'users' | 'roles' | 'permissions';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    [key in Resource]?: Permission[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface RBACContextType {
  users: User[];
  roles: Role[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  hasPermission: (resource: Resource, permission: Permission) => boolean;
}