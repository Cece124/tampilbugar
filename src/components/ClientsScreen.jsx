import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { clients } from '../data/mockData';
import { formatDate } from '../utils/helpers';

const ClientsScreen = () => {
  const { transactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Enhance clients with transaction data
  const enhancedClients = clients.map(client => {
    const clientTransactions = transactions.filter(t => 
      t.clientName.toLowerCase() === client.name.toLowerCase()
    );
    
    const totalSpent = clientTransactions.reduce((sum, t) => sum + t.total, 0);
    const visitCount = clientTransactions.length || client.visits;
    const lastTransaction = clientTransactions[0];
    
    return {
      ...client,
      totalSpent,
      visitCount,
      lastVisit: lastTransaction ? lastTransaction.date : client.lastVisit
    };
  });

  // Filter clients based on search
  const filteredClients = enhancedClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  // Sort by visit count (descending)
  const sortedClients = [...filteredClients].sort((a, b) => b.visitCount - a.visitCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Client History</h1>
        
        {/* Search Bar */}
        <div className="max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Total Clients</h3>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Total Visits</h3>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {enhancedClients.reduce((sum, c) => sum + c.visitCount, 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Avg Visits/Client</h3>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {(enhancedClients.reduce((sum, c) => sum + c.visitCount, 0) / clients.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">All Clients</h2>
        </div>
        
        {sortedClients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No clients found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Visit</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-lg">
                            {client.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          {client.visitCount >= 5 && (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                              VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{client.phone}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                        {client.visitCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(client.lastVisit)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      ${client.totalSpent.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Client Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Clients</h2>
          <div className="space-y-3">
            {sortedClients.slice(0, 5).map((client, index) => (
              <div key={client.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '👤'}
                  </span>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.visitCount} visits</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600">${client.totalSpent.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Clients</h2>
          <div className="space-y-3">
            {enhancedClients
              .sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
              .slice(0, 5)
              .map((client) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">
                        {client.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-600">{formatDate(client.lastVisit)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{client.visitCount} visits</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsScreen;
