import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { Order, OrderTrackingStatus } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotalPKR,
    promoCode,
    appliedDiscountPercent,
    applyPromoCode,
    formatPrice,
    placeNewOrder,
    openTrackingModal
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'otp_verify' | 'confirmation'>('shipping');

  // Customer Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [country, setCountry] = useState('Pakistan');
  const [postalCode, setPostalCode] = useState('54000');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'dhl'>('standard');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<
    'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Credit / Debit Card' | 'Direct Bank / Raast'
  >('Cash on Delivery');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Mobile Wallet
  const [walletPhone, setWalletPhone] = useState('');

  // OTP Verification state
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Promo code in checkout
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCheckoutOpen) return null;

  // Shipping cost calculation
  const shippingCostPKR =
    deliveryMethod === 'express'
      ? 650
      : deliveryMethod === 'dhl'
      ? 4500
      : cartSubtotalPKR >= 7500
      ? 0
      : 250;

  const discountAmountPKR = Math.round((cartSubtotalPKR * appliedDiscountPercent) / 100);
  const finalTotalPKR = Math.max(0, cartSubtotalPKR - discountAmountPKR + shippingCostPKR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applyPromoCode(promoInput);
    setPromoMessage({
      text: result.message,
      isError: !result.success
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep('payment');
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'Credit / Debit Card' || paymentMethod === 'JazzCash' || paymentMethod === 'EasyPaisa') {
      // Trigger 3D Secure / OTP simulation step
      setStep('otp_verify');
    } else {
      // COD or Bank Transfer directly finalize
      finalizeOrder('COD Authorized');
    }
  };

  const handleConfirmOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      finalizeOrder('Paid');
    }, 1200);
  };

  const finalizeOrder = (paymentStatus: 'Paid' | 'Pending Verification' | 'COD Authorized') => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = `PK-${randomSuffix}`;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      trackingNumber: trackingCode,
      createdAt: new Date().toISOString(),
      estimatedDelivery: 'Oct 17, 2026',
      status: 'Order Placed',
      courier: deliveryMethod === 'dhl' ? 'DHL Worldwide' : 'TCS Express',
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        country,
        postalCode
      },
      items: cart.map(item => ({
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        size: item.size,
        stitchingType: item.stitchingType,
        quantity: item.quantity,
        pricePKR: item.pricePKR
      })),
      subtotalPKR: cartSubtotalPKR,
      shippingPKR: shippingCostPKR,
      discountPKR: discountAmountPKR,
      totalPKR: finalTotalPKR,
      paymentMethod,
      paymentStatus,
      timeline: [
        {
          status: 'Order Placed',
          date: 'Just Now',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: 'Zariya Online Portal',
          description: `Order successfully authenticated via ${paymentMethod}.`,
          completed: true
        },
        {
          status: 'Fabric Allocation & Cutting',
          date: 'Scheduled',
          time: 'Tomorrow 10:00 AM',
          location: 'Gulberg Atelier, Lahore',
          description: 'Garment pattern inspection and fabric cutting allocation.',
          completed: false
        },
        {
          status: 'Hand Embroidery & Tailoring QC',
          date: 'Pending',
          time: '',
          location: 'Lahore Quality Bureau',
          description: 'Resham embroidery & stitching quality assurance.',
          completed: false
        },
        {
          status: 'Dispatched from Lahore Atelier',
          date: 'Pending',
          time: '',
          location: 'TCS Cargo Terminal, Lahore Airport Hub',
          description: 'Handoff to national courier line-haul.',
          completed: false
        },
        {
          status: 'In Transit',
          date: 'Pending',
          time: '',
          location: `En route to ${city}`,
          description: 'Transit between regional distribution centers.',
          completed: false
        },
        {
          status: 'Out for Delivery',
          date: 'Pending',
          time: '',
          location: `${city} Central Depot`,
          description: 'Dispatched with delivery rider.',
          completed: false
        },
        {
          status: 'Delivered',
          date: 'Pending',
          time: '',
          location: 'Customer Address',
          description: 'Consignment handed over to recipient.',
          completed: false
        }
      ],
      smsAlerts: [
        {
          timestamp: 'Just Now',
          message: `Zariya Couture: Order ${orderId} confirmed! Consignment ${trackingCode} registered with ${
            deliveryMethod === 'dhl' ? 'DHL' : 'TCS'
          }. Thank you for supporting Pakistani artisan fashion.`
        }
      ]
    };

    placeNewOrder(newOrder);
    setConfirmedOrder(newOrder);
    setStep('confirmation');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Bahawalpur',
    'Abbottabad',
    'Dubai (UAE)',
    'London (UK)',
    'Toronto (Canada)',
    'New York (USA)'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-3xl rounded-sm shadow-2xl border border-[#DED6C7] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E8E2D7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F5EFE4] text-[#9B7A38] rounded-full">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#7D705C] flex items-center gap-1.5">
                <span>256-Bit SSL Encrypted Checkout</span>
                <span aria-hidden="true">·</span>
                <span>PCI-DSS Compliant</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A2521]">
                {step === 'confirmation' ? 'Order Confirmed' : 'Secure Atelier Checkout'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[#68736D] hover:text-[#1A2521] hover:bg-[#F4EFE6] rounded transition-colors focus:outline-none"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (when not confirmed) */}
        {step !== 'confirmation' && (
          <div className="px-6 py-2.5 bg-[#F4EFE6] border-b border-[#E4DDD0] flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  step === 'shipping' ? 'text-[#1A2521]' : 'text-[#8C958F]'
                }`}
              >
                1. Shipping Address
              </span>
              <span className="text-[#BDB4A5]">&rarr;</span>
              <span
                className={`font-semibold ${
                  step === 'payment' || step === 'otp_verify' ? 'text-[#1A2521]' : 'text-[#8C958F]'
                }`}
              >
                2. Secure Payment Gateway
              </span>
            </div>
            <div className="text-[11px] text-[#76807A] hidden sm:block">
              {cart.length} item(s) in bag
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: SHIPPING FORM */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Zahra"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. fatima.zahra@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Mobile Number (SMS updates) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Destination City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  >
                    {pakistaniCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Street Address & Apartment / House # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House 14-B, Street 3, Block 2, Clifton..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#323B36] block mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                  />
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="pt-2">
                <label className="font-semibold text-[#323B36] text-xs block mb-2">
                  Preferred Courier Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      deliveryMethod === 'standard'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[#1A2521]">TCS Standard</span>
                      <span className="font-bold text-[#1A2521]">
                        {cartSubtotalPKR >= 7500 ? 'FREE' : '₨ 250'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#636D67]">2–4 business days across Pakistan</p>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      deliveryMethod === 'express'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[#1A2521]">24-Hour Express</span>
                      <span className="font-bold text-[#1A2521]">₨ 650</span>
                    </div>
                    <p className="text-[11px] text-[#636D67]">Priority overnight flight delivery</p>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('dhl')}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      deliveryMethod === 'dhl'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[#1A2521]">DHL Worldwide</span>
                      <span className="font-bold text-[#1A2521]">₨ 4,500</span>
                    </div>
                    <p className="text-[11px] text-[#636D67]">3–5 days to UK, USA, Gulf, Canada</p>
                  </div>
                </div>
              </div>

              {/* Order summary bar */}
              <div className="p-3 bg-white border border-[#E0D7C9] rounded flex items-center justify-between text-xs">
                <span className="text-[#5B655F]">Estimated Total ({cart.length} items):</span>
                <span className="font-bold text-base text-[#1A2521] tabular-nums">
                  {formatPrice(finalTotalPKR)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A2521] hover:bg-[#2C3B34] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 'payment' && (
            <form onSubmit={handleInitiatePayment} className="space-y-6">
              <div>
                <label className="font-semibold text-[#323B36] text-xs block mb-3">
                  Select Secure Payment Method:
                </label>

                <div className="space-y-2.5">
                  {/* Option 1: Cash on Delivery */}
                  <label
                    className={`p-3.5 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="mt-0.5 accent-[#1A2521]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2521] flex items-center gap-1.5">
                          <Banknote className="w-4 h-4 text-[#9B7A38]" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] font-semibold text-[#2F6B42]">Most Popular in PK</span>
                      </div>
                      <p className="text-[#646E68] mt-1 text-[11px]">
                        Pay safely in cash to the TCS/Leopards courier rider upon doorstep inspection.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: JazzCash Mobile Account */}
                  <label
                    className={`p-3.5 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'JazzCash'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'JazzCash'}
                      onChange={() => setPaymentMethod('JazzCash')}
                      className="mt-0.5 accent-[#1A2521]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2521] flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-[#E21836]" />
                          JazzCash Mobile Account
                        </span>
                        <span className="text-[11px] text-[#7A837E]">Instant Digital</span>
                      </div>
                      <p className="text-[#646E68] mt-1 text-[11px]">
                        Instant wallet deduction via your JazzCash registered mobile number.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: EasyPaisa */}
                  <label
                    className={`p-3.5 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'EasyPaisa'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'EasyPaisa'}
                      onChange={() => setPaymentMethod('EasyPaisa')}
                      className="mt-0.5 accent-[#1A2521]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2521] flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-[#00A859]" />
                          EasyPaisa Wallet
                        </span>
                        <span className="text-[11px] text-[#7A837E]">Telenor / All Networks</span>
                      </div>
                      <p className="text-[#646E68] mt-1 text-[11px]">
                        Instant authorization prompt on your EasyPaisa smartphone app.
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Credit / Debit Card (Visa, Mastercard, PayPak) */}
                  <label
                    className={`p-3.5 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'Credit / Debit Card'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Credit / Debit Card'}
                      onChange={() => setPaymentMethod('Credit / Debit Card')}
                      className="mt-0.5 accent-[#1A2521]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2521] flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#1A2521]" />
                          Debit / Credit Card (Visa, Mastercard, PayPak)
                        </span>
                        <span className="text-[11px] text-[#9B7A38] font-semibold">3D Secure</span>
                      </div>
                      <p className="text-[#646E68] mt-1 text-[11px]">
                        Domestic Pakistani cards (Alfalah, HBL, Meezan) and International diaspora cards.
                      </p>
                    </div>
                  </label>

                  {/* Option 5: Direct Bank / Raast */}
                  <label
                    className={`p-3.5 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'Direct Bank / Raast'
                        ? 'border-[#1A2521] bg-white ring-1 ring-[#1A2521]'
                        : 'border-[#D8CEBE] bg-white hover:border-[#9B7A38]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Direct Bank / Raast'}
                      onChange={() => setPaymentMethod('Direct Bank / Raast')}
                      className="mt-0.5 accent-[#1A2521]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2521] flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-[#7A7365]" />
                          Raast Instant / Bank Transfer (IBAN)
                        </span>
                        <span className="text-[11px] text-[#7A837E]">State Bank of Pakistan</span>
                      </div>
                      <p className="text-[#646E68] mt-1 text-[11px]">
                        Zero-fee instant transfer to Zariya Atelier official Raast ID or Meezan IBAN.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Sub-form depending on payment choice */}
              {paymentMethod === 'Credit / Debit Card' && (
                <div className="p-4 bg-white border border-[#E0D7C9] rounded space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#636D67]">
                      Card Credentials
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-[#7A837E]">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>PayPak</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="font-medium text-[#323B36] block mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FATIMA ZAHRA"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D5CAB9] rounded uppercase"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-medium text-[#323B36] block mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4214 •••• •••• 9018"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D5CAB9] rounded tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[#323B36] block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D5CAB9] rounded tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[#323B36] block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#D5CAB9] rounded tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'JazzCash' || paymentMethod === 'EasyPaisa') && (
                <div className="p-4 bg-white border border-[#E0D7C9] rounded space-y-2 animate-in fade-in duration-200 text-xs">
                  <label className="font-semibold text-[#323B36] block">
                    Registered {paymentMethod} Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={walletPhone}
                    onChange={(e) => setWalletPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CAB9] rounded text-[#1A2521]"
                  />
                  <p className="text-[11px] text-[#69746E]">
                    An approval request with MPIN prompt will be triggered for authorization.
                  </p>
                </div>
              )}

              {paymentMethod === 'Direct Bank / Raast' && (
                <div className="p-4 bg-white border border-[#E0D7C9] rounded space-y-2 text-xs">
                  <p className="font-semibold text-[#1A2521]">Zariya Official Atelier Account:</p>
                  <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#E8E0D2] font-mono text-[11px] space-y-1">
                    <div>Bank: <strong>Meezan Bank Ltd (Gulberg Branch)</strong></div>
                    <div>Account Title: <strong>ZARIYA COUTURE (PVT) LTD</strong></div>
                    <div>IBAN: <strong>PK36 MEZN 0001 0928 4102 9410</strong></div>
                    <div>Raast ID: <strong>zariya@meezan</strong></div>
                  </div>
                  <p className="text-[11px] text-[#65706A]">
                    Transfer receipt will be automatically verified against your order ID.
                  </p>
                </div>
              )}

              {/* Promo code bar inside checkout */}
              <div className="p-4 bg-white border border-[#E0D7C9] rounded space-y-2">
                <span className="text-[11px] font-semibold text-[#323B36] block">
                  Have a Promotional Code?
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. EID2026)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 p-2 text-xs bg-[#FAF8F5] border border-[#D5CAB9] rounded uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#9B7A38] hover:bg-[#83672D] text-white text-xs font-semibold rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.isError ? 'text-red-600' : 'text-[#2A6C41] font-semibold'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Total review */}
              <div className="p-4 bg-white border border-[#E0D7C9] rounded space-y-1.5 text-xs text-[#525D57]">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="tabular-nums">{formatPrice(cartSubtotalPKR)}</span>
                </div>
                {discountAmountPKR > 0 && (
                  <div className="flex justify-between text-[#9B7A38] font-semibold">
                    <span>Discount ({appliedDiscountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountAmountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({deliveryMethod.toUpperCase()})</span>
                  <span className="tabular-nums">
                    {shippingCostPKR === 0 ? 'FREE' : formatPrice(shippingCostPKR)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0EAE0] font-bold text-base text-[#1A2521]">
                  <span>Total Payable</span>
                  <span className="tabular-nums">{formatPrice(finalTotalPKR)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-3 border border-[#D5CAB9] text-[#1A2521] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A2521] hover:bg-[#2C3B34] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                  <span>
                    {paymentMethod === 'Cash on Delivery'
                      ? 'Confirm COD Order'
                      : `Pay ${formatPrice(finalTotalPKR)} Securely`}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: 3D SECURE OTP SIMULATOR (Visa/JazzCash/EasyPaisa) */}
          {step === 'otp_verify' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 bg-[#FAF4EA] text-[#9B7A38] rounded-full mx-auto flex items-center justify-center border border-[#DECFB5]">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A2521]">
                  Bank 3D-Secure Authentication
                </h3>
                <p className="text-xs text-[#5D6761] mt-1 max-w-md mx-auto">
                  A one-time verification passcode has been dispatched to your mobile number{' '}
                  <strong className="text-[#1A2521]">{phone || walletPhone}</strong> for amount{' '}
                  <strong className="text-[#1A2521]">{formatPrice(finalTotalPKR)}</strong>.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP (e.g. 849204)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center text-lg font-mono tracking-widest p-2.5 bg-white border border-[#D5CAB9] rounded text-[#1A2521] focus:outline-none focus:border-[#1A2521]"
                />
                <p className="text-[11px] text-[#78827C]">
                  Demo mode: Enter any 6-digit code or click below to simulate instant bank approval.
                </p>

                <button
                  onClick={handleConfirmOtp}
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#1A2521] hover:bg-[#2C3B34] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isVerifying ? (
                    <span>Authenticating with Bank Gateway...</span>
                  ) : (
                    <span>Authenticate & Place Order</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="text-xs text-[#7A837E] hover:underline"
                >
                  Cancel and change payment method
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CELEBRATION CONFIRMATION */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#EAF4ED] text-[#22673B] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#9B7A38] block mb-1">
                  Mubarak! Order Confirmed
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1A2521]">
                  Thank you, {confirmedOrder.customer.fullName}
                </h3>
                <p className="text-xs text-[#5D6761] mt-1 max-w-md mx-auto">
                  Your artisanal ensemble has been reserved and queued for tailoring inspection at our Lahore Atelier.
                </p>
              </div>

              {/* Waybill / Tracking Card */}
              <div className="bg-white p-5 border border-[#DECFB5] rounded max-w-lg mx-auto text-left space-y-3 shadow-xs">
                <div className="flex justify-between items-center border-b border-[#F0EAE0] pb-2 text-xs">
                  <span className="text-[#68726C]">Consignment Airway Bill:</span>
                  <span className="font-mono font-bold text-sm text-[#1A2521]">
                    {confirmedOrder.trackingNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#525D57]">
                  <div>
                    <span className="block text-[10px] text-[#86908A] uppercase">Carrier</span>
                    <strong className="text-[#1A2521]">{confirmedOrder.courier}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#86908A] uppercase">Estimated Arrival</span>
                    <strong className="text-[#1A2521]">{confirmedOrder.estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#86908A] uppercase">Destination</span>
                    <span className="text-[#1A2521]">{confirmedOrder.customer.city}, PK</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#86908A] uppercase">Payment</span>
                    <span className="text-[#1A2521]">
                      {confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0EAE0] flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1A2521]">Total Paid:</span>
                  <span className="font-bold text-base text-[#1A2521] tabular-nums">
                    {formatPrice(confirmedOrder.totalPKR)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    openTrackingModal(confirmedOrder.trackingNumber);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#1A2521] hover:bg-[#2C3B34] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#C5A869]" />
                  <span>Track Consignment Now</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#D5CAB9] hover:bg-[#F2ECE1] text-[#1A2521] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#7A7365]" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs text-[#58625C] hover:text-[#1A2521]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
