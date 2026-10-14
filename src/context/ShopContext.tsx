import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CurrencyCode, CurrencyConfig, CustomMeasurements } from '../types';
import { getStoredOrders, saveOrder } from '../data/orders';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: {
    code: 'PKR',
    symbol: '₨',
    rateFromPKR: 1,
    format: (amountInPKR) => `₨ ${Math.round(amountInPKR).toLocaleString('en-PK')}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromPKR: 0.0036,
    format: (amountInPKR, rate) => `$${(amountInPKR * rate).toFixed(2)}`
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateFromPKR: 0.0028,
    format: (amountInPKR, rate) => `£${(amountInPKR * rate).toFixed(2)}`
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    rateFromPKR: 0.0132,
    format: (amountInPKR, rate) => `AED ${(amountInPKR * rate).toFixed(0)}`
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    rateFromPKR: 0.0049,
    format: (amountInPKR, rate) => `C$${(amountInPKR * rate).toFixed(2)}`
  }
};

interface ShopContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInPKR: number) => string;
  cart: CartItem[];
  addToCart: (params: {
    product: Product;
    size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Stitching';
    stitchingType: 'Stitched' | 'Unstitched';
    trouserStyle?: 'Straight Trouser' | 'Cigarette Pant' | 'Tulip Shalwar' | 'Flared Palazzos';
    customMeasurements?: CustomMeasurements;
    quantity?: number;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotalPKR: number;
  cartCount: number;
  promoCode: string;
  appliedDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  placeNewOrder: (order: Order) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  activeTrackingQuery: string;
  openTrackingModal: (query?: string) => void;
  isSizeGuideModalOpen: boolean;
  sizeGuideInitialCategory: 'women' | 'men' | 'unstitched';
  openSizeGuideModal: (category?: 'women' | 'men' | 'unstitched') => void;
  setIsSizeGuideModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('zariya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('zariya_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeTrackingQuery, setActiveTrackingQuery] = useState('');
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [sizeGuideInitialCategory, setSizeGuideInitialCategory] = useState<'women' | 'men' | 'unstitched'>('women');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('zariya_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zariya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const formatPrice = (amountInPKR: number): string => {
    const config = CURRENCIES[currency];
    return config.format(amountInPKR, config.rateFromPKR);
  };

  const addToCart = ({
    product,
    size,
    stitchingType,
    trouserStyle,
    customMeasurements,
    quantity = 1
  }: {
    product: Product;
    size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Stitching';
    stitchingType: 'Stitched' | 'Unstitched';
    trouserStyle?: 'Straight Trouser' | 'Cigarette Pant' | 'Tulip Shalwar' | 'Flared Palazzos';
    customMeasurements?: CustomMeasurements;
    quantity?: number;
  }) => {
    // Custom stitching surcharge: PKR 3,500 if custom measurements are requested on unstitched fabric
    let finalItemPrice = product.pricePKR;
    if (size === 'Custom Stitching') {
      finalItemPrice += 3500;
    } else if (stitchingType === 'Unstitched' && product.originalPricePKR) {
      // Unstitched is typically slightly cheaper if product base is stitched
      finalItemPrice = Math.max(8000, product.pricePKR - 2500);
    }

    const cartItemId = `${product.id}-${size}-${stitchingType}-${trouserStyle || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          size,
          stitchingType,
          trouserStyle,
          customMeasurements,
          quantity,
          pricePKR: finalItemPrice
        }
      ];
    });

    showToast(`Added "${product.name}" (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setAppliedDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'EID2026') {
      setPromoCode('EID2026');
      setAppliedDiscountPercent(15);
      showToast('Promo code EID2026 applied! (15% OFF)');
      return { success: true, message: '15% Festive Eid discount applied' };
    }
    if (clean === 'WELCOME10') {
      setPromoCode('WELCOME10');
      setAppliedDiscountPercent(10);
      showToast('Promo code WELCOME10 applied! (10% OFF)');
      return { success: true, message: '10% Welcome discount applied' };
    }
    return { success: false, message: 'Invalid or expired promotional code. Try EID2026 or WELCOME10' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setAppliedDiscountPercent(0);
    showToast('Promo code removed');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to saved wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeNewOrder = (newOrder: Order) => {
    saveOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    // Pre-populate tracking query with the new order tracking number
    setActiveTrackingQuery(newOrder.trackingNumber);
  };

  const openTrackingModal = (query?: string) => {
    if (query) {
      setActiveTrackingQuery(query);
    }
    setIsTrackingModalOpen(true);
  };

  const openSizeGuideModal = (category: 'women' | 'men' | 'unstitched' = 'women') => {
    setSizeGuideInitialCategory(category);
    setIsSizeGuideModalOpen(true);
  };

  const cartSubtotalPKR = cart.reduce((acc, item) => acc + item.pricePKR * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotalPKR,
        cartCount,
        promoCode,
        appliedDiscountPercent,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeNewOrder,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        activeTrackingQuery,
        openTrackingModal,
        isSizeGuideModalOpen,
        sizeGuideInitialCategory,
        openSizeGuideModal,
        setIsSizeGuideModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedCategory,
        setSelectedCategory,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
