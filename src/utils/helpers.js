// Format currency
export const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toFixed(2)}`;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format time
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date and time
export const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

// Calculate service statistics
export const calculateServiceStats = (transactions) => {
  const stats = {};
  
  transactions.forEach(transaction => {
    transaction.services.forEach(service => {
      if (!stats[service.serviceName]) {
        stats[service.serviceName] = {
          count: 0,
          revenue: 0
        };
      }
      stats[service.serviceName].count += service.quantity;
      stats[service.serviceName].revenue += service.price * service.quantity;
    });
  });
  
  return stats;
};

// Calculate payment method stats
export const calculatePaymentStats = (transactions) => {
  const stats = {};
  
  transactions.forEach(transaction => {
    if (!stats[transaction.paymentMethod]) {
      stats[transaction.paymentMethod] = {
        count: 0,
        total: 0
      };
    }
    stats[transaction.paymentMethod].count += 1;
    stats[transaction.paymentMethod].total += transaction.total;
  });
  
  return stats;
};

// Filter transactions by date range
export const filterTransactionsByDate = (transactions, range) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const transactionDay = new Date(transactionDate.getFullYear(), transactionDate.getMonth(), transactionDate.getDate());
    
    if (range === 'today') {
      return transactionDay.getTime() === today.getTime();
    } else if (range === 'week') {
      return transactionDay >= weekAgo;
    }
    return true;
  });
};
