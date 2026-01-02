import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { paymentMethods, tipOptions } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

const PaymentScreen = () => {
  const { currentTransaction, updateTransactionField, completeTransaction, setCurrentScreen } = useApp();
  const [selectedTip, setSelectedTip] = useState('');
  const [customTip, setCustomTip] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleTipSelection = (value) => {
    setSelectedTip(value);
    if (value === 'custom') {
      setCustomTip('');
      updateTransactionField('tip', 0);
    } else {
      updateTransactionField('tip', value);
      setCustomTip('');
    }
  };

  const handleCustomTipChange = (value) => {
    setCustomTip(value);
    const tipAmount = parseFloat(value) || 0;
    updateTransactionField('tip', tipAmount);
  };

  const handlePaymentMethodSelect = (methodId) => {
    updateTransactionField('paymentMethod', methodId);
    if (methodId === 'qris') {
      setShowQRCode(true);
    } else {
      setShowQRCode(false);
    }
  };

  const handleCompletePayment = () => {
    if (!currentTransaction.paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    // Simulate payment processing
    alert('Processing payment...');
    setTimeout(() => {
      completeTransaction();
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentScreen('transaction')}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Transaction
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Options */}
          <div className="space-y-6">
            {/* Tip Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Tip</h2>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {tipOptions.map(option => (
                  <button
                    key={option.label}
                    onClick={() => handleTipSelection(option.value)}
                    className={`py-3 rounded-lg border-2 transition-colors ${
                      selectedTip === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {selectedTip === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Tip Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={customTip}
                    onChange={(e) => handleCustomTipChange(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Method</h2>
              
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center justify-between ${
                      currentTransaction.paymentMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{method.icon}</span>
                      <span className="font-semibold text-lg">{method.name}</span>
                    </div>
                    {currentTransaction.paymentMethod === method.id && (
                      <span className="text-blue-600 text-2xl">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* QRIS QR Code Display */}
              {showQRCode && (
                <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <div className="bg-gray-100 w-48 h-48 mx-auto mb-3 flex items-center justify-center rounded-lg">
                    <div className="text-gray-400 text-6xl">⬜</div>
                  </div>
                  <p className="text-gray-600">Scan QR code to pay</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {formatCurrency(currentTransaction.total)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Summary</h2>
              
              {/* Client Info */}
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600">Client</p>
                <p className="font-semibold text-lg">{currentTransaction.clientName}</p>
                {currentTransaction.clientPhone && (
                  <p className="text-sm text-gray-600">{currentTransaction.clientPhone}</p>
                )}
              </div>

              {/* Services */}
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Services</p>
                {currentTransaction.services.map((service, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{service.serviceName}</p>
                      <p className="text-sm text-gray-600">
                        {service.duration} min • {service.therapist} • x{service.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(service.price * service.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(currentTransaction.subtotal)}</span>
                </div>
                
                {currentTransaction.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-{formatCurrency(currentTransaction.discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%):</span>
                  <span>{formatCurrency(currentTransaction.tax)}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Tip:</span>
                  <span>{formatCurrency(currentTransaction.tip)}</span>
                </div>
                
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t-2">
                  <span>Total:</span>
                  <span>{formatCurrency(currentTransaction.total)}</span>
                </div>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={!currentTransaction.paymentMethod}
                className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
