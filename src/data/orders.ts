import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9842',
    trackingNumber: 'PK-928410',
    createdAt: '2026-10-11T10:30:00Z',
    estimatedDelivery: '2026-10-15',
    status: 'In Transit',
    courier: 'TCS Express',
    courierTrackingUrl: 'https://www.tcsexpress.com/tracking?consignment=7720914810',
    customer: {
      fullName: 'Ayesha Tariq',
      email: 'ayesha.tariq@gmail.com',
      phone: '+92 300 8492014',
      address: 'House 42-B, Khayaban-e-Shamsheer, Phase 5, DHA',
      city: 'Karachi',
      country: 'Pakistan',
      postalCode: '75500'
    },
    items: [
      {
        productId: 'prod-001',
        name: 'Gul-e-Maryam 3-Piece Festive Lawn',
        image: '/src/assets/images/product_embroidered_festive_lawn_1791961614788.jpg',
        size: 'M',
        stitchingType: 'Stitched',
        quantity: 1,
        pricePKR: 16850
      }
    ],
    subtotalPKR: 16850,
    shippingPKR: 0,
    discountPKR: 1685,
    totalPKR: 15165,
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    timeline: [
      {
        status: 'Order Placed',
        date: 'Oct 11, 2026',
        time: '10:30 AM',
        location: 'Zariya Online Atelier',
        description: 'Order received and verified via JazzCash payment gateway.',
        completed: true
      },
      {
        status: 'Fabric Allocation & Cutting',
        date: 'Oct 11, 2026',
        time: '02:15 PM',
        location: 'Gulberg Atelier, Lahore',
        description: 'Selected 80s Egyptian Lawn fabric and organza dupatta dispatched to master cutting station.',
        completed: true
      },
      {
        status: 'Hand Embroidery & Tailoring QC',
        date: 'Oct 12, 2026',
        time: '04:45 PM',
        location: 'Lahore Quality Bureau',
        description: 'Resham embroidery tension verified, pearl embellishments secured, and dimensional check passed.',
        completed: true
      },
      {
        status: 'Dispatched from Lahore Atelier',
        date: 'Oct 13, 2026',
        time: '11:20 AM',
        location: 'TCS Cargo Terminal, Lahore Airport Hub',
        description: 'Consignment handed over to TCS Express under Airway Bill #7720914810.',
        completed: true
      },
      {
        status: 'In Transit',
        date: 'Oct 13, 2026',
        time: '09:40 PM',
        location: 'Karachi Central Express Hub',
        description: 'Arrived at destination sorting facility. Sorting into South Karachi delivery route.',
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: 'Oct 14, 2026',
        time: 'Expected 10:00 AM',
        location: 'DHA Phase 5 Delivery Depot, Karachi',
        description: 'Assigned to delivery officer with tamper-evident seal intact.',
        completed: false
      },
      {
        status: 'Delivered',
        date: 'Oct 14, 2026',
        time: 'Pending Delivery',
        location: 'Customer Address',
        description: 'OTP signature required upon delivery.',
        completed: false
      }
    ],
    smsAlerts: [
      {
        timestamp: 'Oct 11 · 10:31 AM',
        message: 'Zariya: Your order ORD-9842 has been confirmed! Tracking: PK-928410. Thank you for choosing Pakistani couture.'
      },
      {
        timestamp: 'Oct 13 · 11:25 AM',
        message: 'Zariya Logistics: Your parcel is on its way via TCS Express (CN: 7720914810). Estimated delivery: Oct 14-15.'
      }
    ]
  },
  {
    id: 'ORD-9843',
    trackingNumber: 'PK-773192',
    createdAt: '2026-10-12T14:10:00Z',
    estimatedDelivery: '2026-10-18',
    status: 'Hand Embroidery & Tailoring QC',
    courier: 'Leopards Courier',
    customer: {
      fullName: 'Bilal Farooq',
      email: 'bilal.farooq@live.com',
      phone: '+92 333 4109283',
      address: 'House 18, Street 4, Sector F-7/2',
      city: 'Islamabad',
      country: 'Pakistan',
      postalCode: '44000'
    },
    items: [
      {
        productId: 'prod-005',
        name: 'Shahsawar Charcoal Silk Kurta & Prince Waistcoat',
        image: '/src/assets/images/product_menswear_kurta_waistcoat_1791961617208.jpg',
        size: 'L',
        stitchingType: 'Stitched',
        quantity: 1,
        pricePKR: 28500
      }
    ],
    subtotalPKR: 28500,
    shippingPKR: 0,
    discountPKR: 0,
    totalPKR: 28500,
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    timeline: [
      {
        status: 'Order Placed',
        date: 'Oct 12, 2026',
        time: '02:10 PM',
        location: 'Zariya Online Portal',
        description: 'Card payment authorized via 3D Secure (Bank Alfalah gateway).',
        completed: true
      },
      {
        status: 'Fabric Allocation & Cutting',
        date: 'Oct 13, 2026',
        time: '09:00 AM',
        location: 'Menswear Atelier, Lahore',
        description: 'Charcoal raw silk and jacquard canvas cut according to master pattern measurements.',
        completed: true
      },
      {
        status: 'Hand Embroidery & Tailoring QC',
        date: 'Oct 14, 2026',
        time: '08:30 AM',
        location: 'Atelier Tailoring Floor, Lahore',
        description: 'Waistcoat chest interfacing applied. Band collar hand-stitching in progress.',
        completed: true
      },
      {
        status: 'Dispatched from Lahore Atelier',
        date: 'Oct 15, 2026',
        time: 'Estimated',
        location: 'Leopards Courier Express',
        description: 'Awaiting final steam press and luxury gift packaging.',
        completed: false
      },
      {
        status: 'In Transit',
        date: 'Pending',
        time: '',
        location: 'Motorway M2 Transit',
        description: 'Overnight transit from Lahore to Islamabad hub.',
        completed: false
      },
      {
        status: 'Out for Delivery',
        date: 'Pending',
        time: '',
        location: 'Islamabad Central Depot',
        description: 'Dispatched for doorstep handover.',
        completed: false
      },
      {
        status: 'Delivered',
        date: 'Pending',
        time: '',
        location: 'Customer Address',
        description: 'Delivered to recipient.',
        completed: false
      }
    ],
    smsAlerts: [
      {
        timestamp: 'Oct 12 · 02:12 PM',
        message: 'Zariya Atelier: Bespoke order ORD-9843 placed. Our master tailors have begun crafting your Shahsawar ensemble.'
      }
    ]
  },
  {
    id: 'ORD-9844',
    trackingNumber: 'PK-441829',
    createdAt: '2026-10-10T16:00:00Z',
    estimatedDelivery: '2026-10-14',
    status: 'Out for Delivery',
    courier: 'Leopards Courier',
    customer: {
      fullName: 'Zainab Shah',
      email: 'zainab.shah@outlook.com',
      phone: '+92 321 5521990',
      address: 'Apartment 402, Royal Orchard Towers',
      city: 'Rawalpindi',
      country: 'Pakistan',
      postalCode: '46000'
    },
    items: [
      {
        productId: 'prod-003',
        name: 'Nilofer Ivory Chikankari Prêt Kurta',
        image: '/src/assets/images/product_chikankari_pret_kurta_1791961616497.jpg',
        size: 'S',
        stitchingType: 'Stitched',
        quantity: 1,
        pricePKR: 12500
      }
    ],
    subtotalPKR: 12500,
    shippingPKR: 0,
    discountPKR: 1250,
    totalPKR: 11250,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'COD Authorized',
    timeline: [
      {
        status: 'Order Placed',
        date: 'Oct 10, 2026',
        time: '04:00 PM',
        location: 'Zariya Storefront',
        description: 'COD order confirmed via SMS OTP verification.',
        completed: true
      },
      {
        status: 'Fabric Allocation & Cutting',
        date: 'Oct 11, 2026',
        time: '11:00 AM',
        location: 'Lahore Prêt Center',
        description: 'Prêt inventory verified and allocated from ready-to-wear rack.',
        completed: true
      },
      {
        status: 'Hand Embroidery & Tailoring QC',
        date: 'Oct 11, 2026',
        time: '03:30 PM',
        location: 'Finishing Department',
        description: 'Garment steamed, mother-of-pearl buttons inspected, placed in dust bag.',
        completed: true
      },
      {
        status: 'Dispatched from Lahore Atelier',
        date: 'Oct 12, 2026',
        time: '05:00 PM',
        location: 'Leopards Express Hub, Lahore',
        description: 'Handed over for northern regional line-haul.',
        completed: true
      },
      {
        status: 'In Transit',
        date: 'Oct 13, 2026',
        time: '08:00 AM',
        location: 'Rawalpindi Hub',
        description: 'Processed through automated sorting.',
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: 'Oct 14, 2026',
        time: '08:45 AM',
        location: 'Rawalpindi Saddar Branch',
        description: 'Courier Rider Muhammad Usman (+92 345 1192837) is en route with your package. Please keep exact cash of PKR 11,250 ready.',
        completed: true
      },
      {
        status: 'Delivered',
        date: 'Oct 14, 2026',
        time: 'Expected by 02:00 PM',
        location: 'Customer Address',
        description: 'Awaiting cash collection and recipient signature.',
        completed: false
      }
    ],
    smsAlerts: [
      {
        timestamp: 'Oct 10 · 04:02 PM',
        message: 'Zariya: COD order PK-441829 confirmed. Total to collect: PKR 11,250.'
      },
      {
        timestamp: 'Oct 14 · 08:46 AM',
        message: 'Leopards Rider Muhammad Usman is out for delivery with parcel PK-441829. Payment: PKR 11,250.'
      }
    ]
  }
];

const LOCAL_STORAGE_ORDERS_KEY = 'zariya_couture_orders_v1';

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch (err) {
    console.error('Error loading stored orders:', err);
    return INITIAL_ORDERS;
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === 'undefined') return;
  try {
    const currentOrders = getStoredOrders();
    const updated = [order, ...currentOrders.filter(o => o.id !== order.id)];
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving order:', err);
  }
}

export function findOrderByTracking(query: string): Order | undefined {
  const normalized = query.trim().toUpperCase().replace('#', '');
  const orders = getStoredOrders();

  return orders.find(order => {
    return (
      order.trackingNumber.toUpperCase() === normalized ||
      order.id.toUpperCase() === normalized ||
      order.customer.phone.replace(/\s+/g, '').includes(normalized.replace(/\s+/g, '')) ||
      order.customer.email.toLowerCase() === query.trim().toLowerCase()
    );
  });
}
