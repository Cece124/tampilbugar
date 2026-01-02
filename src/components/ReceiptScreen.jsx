import React from 'react';
import { useApp } from '../contexts/AppContext';
import { formatCurrency, formatDateTime } from '../utils/helpers';

const ReceiptScreen = () => {
  const { lastReceipt, setCurrentScreen, resetTransaction } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleNewTransaction = () => {
    resetTransaction();
    setCurrentScreen('transaction');
  };

  if (!lastReceipt) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">No receipt to display</p>
        <button
          onClick={() => setCurrentScreen('transaction')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Transaction
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6 no-print">
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🖨️ Print Receipt
          </button>
          <button
            onClick={handleNewTransaction}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            ➕ New Transaction
          </button>
        </div>

        {/* Receipt */}
        <div className="bg-white rounded-lg shadow-lg p-8 print-area">
          {/* Header */}
          <div className="text-center mb-6 border-b-2 pb-4">
            <h1 className="text-3xl font-bold text-gray-800">Tampil Bugar</h1>
            <p className="text-gray-600">Massage & Reflexology</p>
            <p className="text-sm text-gray-500 mt-2">
              Thank you for your visit!
            </p>
          </div>

          {/* Transaction Info */}
          <div className="mb-6 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Receipt #:</span>
              <span className="font-semibold">{lastReceipt.id.toString().padStart(6, '0')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-semibold">{formatDateTime(lastReceipt.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Client:</span>
              <span className="font-semibold">{lastReceipt.clientName}</span>
            </div>
            {lastReceipt.clientPhone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{lastReceipt.clientPhone}</span>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">Services</h2>
            <div className="space-y-3">
              {lastReceipt.services.map((service, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{service.serviceName}</span>
                    <span className="font-semibold">{formatCurrency(service.price * service.quantity)}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>Duration: {service.duration} minutes</span>
                    <span>Qty: {service.quantity}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Therapist: {service.therapist}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>{formatCurrency(lastReceipt.subtotal)}</span>
            </div>
            
            {lastReceipt.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(lastReceipt.discount)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%):</span>
              <span>{formatCurrency(lastReceipt.tax)}</span>
            </div>
            
            {lastReceipt.tip > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Tip:</span>
                <span>{formatCurrency(lastReceipt.tip)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t-2">
              <span>Total Paid:</span>
              <span>{formatCurrency(lastReceipt.total)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold capitalize">{lastReceipt.paymentMethod}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 border-t-2 pt-4">
            <p className="mb-2">We appreciate your business!</p>
            <p>Please visit us again soon</p>
            <p className="mt-3 text-xs">
              📍 123 Wellness Street, Jakarta<br />
              📞 (021) 1234-5678<br />
              🌐 www.tampilbugar.com
            </p>
          </div>
        </div>

        {/* Additional Actions (No Print) */}
        <div className="mt-6 flex gap-4 no-print">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            📊 View Dashboard
          </button>
          <button
            onClick={() => setCurrentScreen('clients')}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            👥 View Clients
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptScreen;
