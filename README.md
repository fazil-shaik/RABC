# Role-Based Access Control (RBAC) Dashboard

A modern, TypeScript-based RBAC system built with React and Tailwind CSS. This dashboard provides a comprehensive interface for managing users, roles, and permissions in a secure and user-friendly way.


## Features

### User Management
- Create, read, update, and delete users
- Assign roles to users
- Manage user status (active/inactive)
- User list with sorting and filtering
- Real-time updates

### Role Management
- Create and manage roles with custom permissions
- Granular permission control for each resource
- Bulk permission assignment
- Visual permission matrix
- Role-based access restrictions

### Permission System
- Resource-based permissions (users, roles, permissions)
- Action-based controls (create, read, update, delete)
- Dynamic permission checking
- Secure access control

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon system
- **Context API** - State management
- **Vite** - Build tool and development server

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── UserTable.tsx   # User management interface
│   ├── RoleTable.tsx   # Role management interface
│   ├── UserModal.tsx   # User creation/editing modal
│   └── RoleModal.tsx   # Role creation/editing modal
├── context/            # React Context
│   └── RBACContext.tsx # RBAC state and logic
├── types/              # TypeScript types
│   └── index.ts       # Shared type definitions
└── App.tsx            # Main application component
```

## Usage

### Managing Users

1. Click "Add User" to create a new user
2. Fill in the user details:
   - Name
   - Email
   - Role
   - Status
3. Use the action buttons to edit or delete existing users

### Managing Roles

1. Navigate to the Roles section
2. Click "Add Role" to create a new role
3. Define role permissions:
   - Select resources (users, roles, permissions)
   - Choose allowed actions (create, read, update, delete)
4. Use bulk actions to quickly assign permissions

## Security Features

- Role-based access control
- Permission-based action restrictions
- Secure state management
- Type-safe operations

## Best Practices

- Modular component architecture
- TypeScript for type safety
- Context API for state management
- Responsive design
- Accessible UI components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Built with [React](https://reactjs.org) and [TypeScript](https://www.typescriptlang.org)
