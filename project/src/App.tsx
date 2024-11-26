import React from 'react';
import { RBACProvider } from './context/RBACContext';
import { UserTable } from './components/UserTable';
import { RoleTable } from './components/RoleTable';
import { Shield, Users } from 'lucide-react';

function App() {
  return (
    <RBACProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  RBAC Dashboard
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            <UserTable />
            <RoleTable />
          </div>
        </main>
      </div>
    </RBACProvider>
  );
}

export default App;