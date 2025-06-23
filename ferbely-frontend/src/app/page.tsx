'use client';

import { useQuery } from '@tanstack/react-query';
import { userApi, buildingApi, contractApi } from '@/services/api';
import { Building, User, CalendarDays, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll();
      console.log(users);
      return response.data;
    },
  });

  const { data: buildings, isLoading: buildingsLoading, error: buildingsError } = useQuery({
    queryKey: ['buildings'],
    queryFn: async () => {
      const response = await buildingApi.getAll();
      return response.data;
    },
  });

  const { data: contracts, isLoading: contractsLoading, error: contractsError } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const response = await contractApi.getAll();
      return response.data;
    },
  });

  const isLoading = usersLoading || buildingsLoading || contractsLoading;
  const hasError = usersError || buildingsError || contractsError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-4">
            Unable to connect to the backend. Please make sure the Django server is running.
          </p>
          <p className="text-sm text-gray-500">
            Expected backend URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v0'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Ferbely Dashboard</h1>
            <p className="mt-2 text-gray-600">Property Management System</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users?.count || 0}</p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Buildings</p>
                  <p className="text-3xl font-bold text-gray-900">{buildings?.count || 0}</p>
                </div>
                <Building className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {contracts?.results.filter(c => c.status === 'active').length || 0}
                  </p>
                </div>
                <CalendarDays className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Recent Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {
                users != null && (
                  users?.results.slice(0, 5).map((user) => (
                    <div key={user.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              
                {users?.results.length === 0 && (
                  <div className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </div>
                )}
              </div>
            </div>

            {/* Recent Buildings */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Buildings</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {buildings?.results.slice(0, 5).map((building) => (
                  <div key={building.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{building.name}</p>
                        <p className="text-sm text-gray-500">{building.address}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {building.role}
                      </span>
                    </div>
                  </div>
                ))}
                {buildings?.results.length === 0 && (
                  <div className="px-6 py-4 text-center text-gray-500">
                    No buildings found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
