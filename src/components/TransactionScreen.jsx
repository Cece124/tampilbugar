import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { services, staff } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

const TransactionScreen = () => {
  const { currentTransaction, addServiceToTransaction, removeServiceFromTransaction, updateTransactionField, setCurrentScreen } = useApp();
  
  const [selectedService, setSelectedService] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddService = () => {
    if (!selectedService || !selectedDuration || !selectedTherapist) {
      alert('Please select service, duration, and therapist');
      return;
    }

    const service = services.find(s => s.id === parseInt(selectedService));
    const duration = service.durations.find(d => d.minutes === parseInt(selectedDuration));
    const therapist = staff.find(t => t.id === parseInt(selectedTherapist));

    addServiceToTransaction({
      serviceName: service.name,
      duration: duration.minutes,
      price: duration.price,
      therapist: therapist.name,
      quantity: parseInt(quantity)
    });

    // Reset form
    setSelectedService('');
    setSelectedDuration('');
    setSelectedTherapist('');
    setQuantity(1);
  };

  const handleApplyPromo = () => {
    const promoCode = currentTransaction.promoCode.toUpperCase();
    if (promoCode === 'WELCOME10') {
      updateTransactionField('discount', currentTransaction.subtotal * 0.1);
      alert('10% discount applied!');
    } else if (promoCode === 'SAVE5') {
      updateTransactionField('discount', 5);
      alert('$5 discount applied!');
    } else {
      alert('Invalid promo code');
      updateTransactionField('discount', 0);
    }
  };

  const handleProceedToPayment = () => {
    if (currentTransaction.services.length === 0) {
      alert('Please add at least one service');
      return;
    }
    if (!currentTransaction.clientName) {
      alert('Please enter client name');
      return;
    }
    setCurrentScreen('payment');
  };

  const selectedServiceObj = services.find(s => s.id === parseInt(selectedService));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setSelectedDuration('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  disabled={!selectedService}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select duration</option>
                  {selectedServiceObj?.durations.map(duration => (
                    <option key={duration.minutes} value={duration.minutes}>
                      {duration.minutes} min - {formatCurrency(duration.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Therapist
                </label>
                <select
                  value={selectedTherapist}
                  onChange={(e) => setSelectedTherapist(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select therapist</option>
                  {staff.map(therapist => (
                    <option key={therapist.id} value={therapist.id}>
                      {therapist.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleAddService}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Add to Transaction
            </button>
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Client Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={currentTransaction.clientName}
                  onChange={(e) => updateTransactionField('clientName', e.target.value)}
                  placeholder="Enter client name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={currentTransaction.clientPhone}
                  onChange={(e) => updateTransactionField('clientPhone', e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Promo Code</h2>
            
            <div className="flex gap-4">
              <input
                type="text"
                value={currentTransaction.promoCode}
                onChange={(e) => updateTransactionField('promoCode', e.target.value)}
                placeholder="Enter promo code (e.g., WELCOME10, SAVE5)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleApplyPromo}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction Summary</h2>
            
            {/* Services List */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {currentTransaction.services.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No services added yet</p>
              ) : (
                currentTransaction.services.map((service, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{service.serviceName}</p>
                        <p className="text-sm text-gray-600">
                          {service.duration} min • {service.therapist} • Qty: {service.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(service.price * service.quantity)}</p>
                        <button
                          onClick={() => removeServiceFromTransaction(index)}
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2">
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
              
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span>{formatCurrency(currentTransaction.total)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={currentTransaction.services.length === 0}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionScreen;
