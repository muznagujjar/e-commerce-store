export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromPKR: number; // Conversion multiplier from PKR
  format: (amountInPKR: number, rate: number) => string;
}

export type ApparelCategory = 'festive-lawn' | 'luxury-pret' | 'formals' | 'menswear' | 'unstitched';

export type FabricType = 'Lawn' | 'Raw Silk' | 'Chiffon' | 'Organza' | 'Chikankari Cotton' | 'Jacquard';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ApparelCategory;
  categoryLabel: string;
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  secondaryImage?: string;
  fabric: FabricType;
  pieces: '1-Piece' | '2-Piece' | '3-Piece';
  isStitchedAvailable: boolean;
  isUnstitchedAvailable: boolean;
  description: string;
  embroideryDetails: string[];
  fabricSpecs: {
    shirt: string;
    dupatta?: string;
    trouser?: string;
  };
  careInstructions: string[];
  availableSizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  inStock: boolean;
  featured?: boolean;
  tag?: string;
}

export interface CustomMeasurements {
  bust: number;
  waist: number;
  hip: number;
  kameezLength: number;
  shoulder: number;
  sleeveLength: number;
  trouserLength: number;
  notes?: string;
  unit: 'inches' | 'cm';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Stitching';
  stitchingType: 'Stitched' | 'Unstitched';
  trouserStyle?: 'Straight Trouser' | 'Cigarette Pant' | 'Tulip Shalwar' | 'Flared Palazzos';
  customMeasurements?: CustomMeasurements;
  quantity: number;
  pricePKR: number; // Includes stitching surcharge if applied
}

export type CourierCode = 'TCS Express' | 'Leopards Courier' | 'Trax Logistics' | 'DHL Worldwide';

export type OrderTrackingStatus = 
  | 'Order Placed'
  | 'Fabric Allocation & Cutting'
  | 'Hand Embroidery & Tailoring QC'
  | 'Dispatched from Lahore Atelier'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export interface TrackingMilestone {
  status: OrderTrackingStatus;
  date: string;
  time: string;
  location: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  createdAt: string;
  estimatedDelivery: string;
  status: OrderTrackingStatus;
  courier: CourierCode;
  courierTrackingUrl?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  items: {
    productId: string;
    name: string;
    image: string;
    size: string;
    stitchingType: string;
    quantity: number;
    pricePKR: number;
  }[];
  subtotalPKR: number;
  shippingPKR: number;
  discountPKR: number;
  totalPKR: number;
  paymentMethod: 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Credit / Debit Card' | 'Direct Bank / Raast';
  paymentStatus: 'Paid' | 'Pending Verification' | 'COD Authorized';
  timeline: TrackingMilestone[];
  smsAlerts: {
    timestamp: string;
    message: string;
  }[];
}
