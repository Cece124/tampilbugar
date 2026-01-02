// Sample services with pricing
export const services = [
  {
    id: 1,
    name: 'Full Body Massage',
    durations: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 60 },
      { minutes: 90, price: 85 }
    ]
  },
  {
    id: 2,
    name: 'Foot Reflex',
    durations: [
      { minutes: 30, price: 25 },
      { minutes: 60, price: 50 }
    ]
  },
  {
    id: 3,
    name: 'Back Massage',
    durations: [
      { minutes: 30, price: 20 },
      { minutes: 60, price: 40 },
      { minutes: 90, price: 55 }
    ]
  }
];

// Sample staff
export const staff = [
  { id: 1, name: 'Siti' },
  { id: 2, name: 'Budi' },
  { id: 3, name: 'Ani' },
  { id: 4, name: 'Rudi' }
];

// Sample clients
export const clients = [
  { id: 1, name: 'Rina', phone: '081234567890', visits: 2, lastVisit: '2024-12-28' },
  { id: 2, name: 'Ahmad', phone: '081234567891', visits: 5, lastVisit: '2024-12-30' },
  { id: 3, name: 'Siti', phone: '081234567892', visits: 1, lastVisit: '2024-12-25' }
];

// Sample transactions for dashboard
export const sampleTransactions = [
  {
    id: 1,
    date: new Date().toISOString(),
    clientName: 'Rina',
    services: [
      { serviceName: 'Full Body Massage', duration: 60, price: 60, therapist: 'Siti', quantity: 1 }
    ],
    subtotal: 60,
    tax: 6,
    tip: 10,
    total: 76,
    paymentMethod: 'Cash'
  },
  {
    id: 2,
    date: new Date().toISOString(),
    clientName: 'Ahmad',
    services: [
      { serviceName: 'Foot Reflex', duration: 30, price: 25, therapist: 'Budi', quantity: 2 }
    ],
    subtotal: 50,
    tax: 5,
    tip: 5,
    total: 60,
    paymentMethod: 'Card'
  },
  {
    id: 3,
    date: new Date(Date.now() - 86400000).toISOString(),
    clientName: 'Siti',
    services: [
      { serviceName: 'Back Massage', duration: 90, price: 55, therapist: 'Ani', quantity: 1 }
    ],
    subtotal: 55,
    tax: 5.5,
    tip: 0,
    total: 60.5,
    paymentMethod: 'QRIS'
  }
];

// Payment methods
export const paymentMethods = [
  { id: 'cash', name: 'Cash', icon: '💵' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'qris', name: 'QRIS', icon: '📱' }
];

// Tip options
export const tipOptions = [
  { label: '$5', value: 5 },
  { label: '$10', value: 10 },
  { label: '$15', value: 15 },
  { label: '$20', value: 20 },
  { label: 'Custom', value: 'custom' }
];
