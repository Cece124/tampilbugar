import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import TransactionScreen from './components/TransactionScreen';
import PaymentScreen from './components/PaymentScreen';
import ReceiptScreen from './components/ReceiptScreen';
import DashboardScreen from './components/DashboardScreen';
import ClientsScreen from './components/ClientsScreen';

const AppContent = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'transaction':
        return <TransactionScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'receipt':
        return <ReceiptScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'clients':
        return <ClientsScreen />;
      default:
        return <TransactionScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="pb-8">
        {renderScreen()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
