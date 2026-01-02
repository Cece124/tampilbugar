import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { formatCurrency, calculateServiceStats, calculatePaymentStats, filterTransactionsByDate } from '../utils/helpers';

const DashboardScreen = () => {
  const { transactions } = useApp();
  const [dateRange, setDateRange] = useState('today');

  const filteredTransactions = filterTransactionsByDate(transactions, dateRange);
  const serviceStats = calculateServiceStats(filteredTransactions);
  const paymentStats = calculatePaymentStats(filteredTransactions);

  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = filteredTransactions.length;
  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        
        {/* Date Range Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setDateRange('today')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              dateRange === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateRange('week')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              dateRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold opacity-90">Total Revenue</h3>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold opacity-90">Transactions</h3>
            <span className="text-3xl">🧾</span>
          </div>
          <p className="text-3xl font-bold">{totalTransactions}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold opacity-90">Avg Transaction</h3>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(averageTransaction)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Service Breakdown</h2>
          
          {Object.keys(serviceStats).length === 0 ? (
            <p className="text-gray-500 text-center py-4">No services data available</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(serviceStats).map(([serviceName, stats]) => (
                <div key={serviceName} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{serviceName}</h3>
                    <span className="text-blue-600 font-bold">{formatCurrency(stats.revenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{stats.count} session{stats.count !== 1 ? 's' : ''}</span>
                    <span>Avg: {formatCurrency(stats.revenue / stats.count)}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(stats.revenue / totalRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Method Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Methods</h2>
          
          {Object.keys(paymentStats).length === 0 ? (
            <p className="text-gray-500 text-center py-4">No payment data available</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(paymentStats).map(([method, stats]) => (
                <div key={method} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg capitalize">{method}</h3>
                    <span className="text-green-600 font-bold">{formatCurrency(stats.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{stats.count} transaction{stats.count !== 1 ? 's' : ''}</span>
                    <span>Avg: {formatCurrency(stats.total / stats.count)}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${(stats.total / totalRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Transactions</h2>
          
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No transactions found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Services</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">#{transaction.id.toString().padStart(6, '0')}</td>
                      <td className="px-4 py-3 text-sm font-medium">{transaction.clientName}</td>
                      <td className="px-4 py-3 text-sm">
                        {transaction.services.map(s => s.serviceName).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">{transaction.paymentMethod}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-right">
                        {formatCurrency(transaction.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
