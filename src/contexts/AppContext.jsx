import React, { createContext, useContext, useState } from 'react';
import { sampleTransactions } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('transaction');
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [currentTransaction, setCurrentTransaction] = useState({
    services: [],
    clientName: '',
    clientPhone: '',
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    paymentMethod: '',
    discount: 0,
    promoCode: ''
  });
  const [lastReceipt, setLastReceipt] = useState(null);

  const addServiceToTransaction = (service) => {
    setCurrentTransaction(prev => {
      const newServices = [...prev.services, service];
      const subtotal = newServices.reduce((sum, s) => sum + (s.price * s.quantity), 0);
      const discount = prev.discount || 0;
      const discountedSubtotal = subtotal - discount;
      const tax = parseFloat((discountedSubtotal * 0.1).toFixed(2));
      const total = discountedSubtotal + tax + (prev.tip || 0);
      
      return {
        ...prev,
        services: newServices,
        subtotal,
        tax,
        total
      };
    });
  };

  const removeServiceFromTransaction = (index) => {
    setCurrentTransaction(prev => {
      const newServices = prev.services.filter((_, i) => i !== index);
      const subtotal = newServices.reduce((sum, s) => sum + (s.price * s.quantity), 0);
      const discount = prev.discount || 0;
      const discountedSubtotal = subtotal - discount;
      const tax = parseFloat((discountedSubtotal * 0.1).toFixed(2));
      const total = discountedSubtotal + tax + (prev.tip || 0);
      
      return {
        ...prev,
        services: newServices,
        subtotal,
        tax,
        total
      };
    });
  };

  const updateTransactionField = (field, value) => {
    setCurrentTransaction(prev => {
      const updated = { ...prev, [field]: value };
      
      // Recalculate totals when discount or tip changes
      if (field === 'discount' || field === 'tip') {
        const discount = field === 'discount' ? value : prev.discount;
        const tip = field === 'tip' ? value : prev.tip;
        const discountedSubtotal = prev.subtotal - discount;
        const tax = parseFloat((discountedSubtotal * 0.1).toFixed(2));
        const total = discountedSubtotal + tax + tip;
        
        return {
          ...updated,
          tax,
          total
        };
      }
      
      return updated;
    });
  };

  const completeTransaction = () => {
    const transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString(),
      ...currentTransaction
    };
    
    setTransactions(prev => [transaction, ...prev]);
    setLastReceipt(transaction);
    resetTransaction();
    setCurrentScreen('receipt');
  };

  const resetTransaction = () => {
    setCurrentTransaction({
      services: [],
      clientName: '',
      clientPhone: '',
      subtotal: 0,
      tax: 0,
      tip: 0,
      total: 0,
      paymentMethod: '',
      discount: 0,
      promoCode: ''
    });
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    transactions,
    currentTransaction,
    lastReceipt,
    addServiceToTransaction,
    removeServiceFromTransaction,
    updateTransactionField,
    completeTransaction,
    resetTransaction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
