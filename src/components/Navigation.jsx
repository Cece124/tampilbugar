import React from 'react';
import { useApp } from '../contexts/AppContext';

const Navigation = () => {
  const { currentScreen, setCurrentScreen, currentTransaction } = useApp();

  const navItems = [
    { id: 'transaction', label: '🛒 New Transaction', icon: '🛒' },
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'clients', label: '👥 Clients', icon: '👥' }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💆</span>
            <h1 className="text-2xl font-bold">Tampil Bugar</h1>
          </div>
          <div className="flex space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === item.id
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-500'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="hidden md:inline">{item.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
