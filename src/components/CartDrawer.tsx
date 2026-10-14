import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotalPKR,
    formatPrice,
    promoCode,
    appliedDiscountPercent,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_PKR = 7500;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - cartSubtotalPKR);
  const freeShippingProgress = Math.min(100, (cartSubtotalPKR / FREE_SHIPPING_THRESHOLD_PKR) * 100);

  const discountAmountPKR = Math.round((cartSubtotalPKR * appliedDiscountPercent) / 100);
  const finalTotalPKR = Math.max(0, cartSubtotalPKR - discountAmountPKR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyPromoCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2D9CB] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8E2D7] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#9B7A38]" />
              <h3 className="font-serif text-lg font-semibold text-[#1A2521]">
                Shopping Bag ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#68736D] hover:text-[#1A2521] hover:bg-[#F4EFE6] rounded transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="p-4 bg-[#F5EFE4] border-b border-[#E4DDD0] text-xs shrink-0">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#55605A] mb-1.5">
                Add <strong className="text-[#1A2521]">{formatPrice(remainingForFreeShipping)}</strong> more for{' '}
                <span className="text-[#9B7A38] font-bold">Complimentary Express Shipping</span> across Pakistan
              </p>
            ) : (
              <p className="text-[#2F6B42] font-semibold flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2F6B42]" />
                <span>You have unlocked Complimentary Express Shipping!</span>
              </p>
            )}
            <div className="w-full bg-[#E2D9CB] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#9B7A38] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#747E78]">
                <ShoppingBag className="w-10 h-10 text-[#C4B9A7] mx-auto mb-3" />
                <p className="font-serif text-lg font-medium text-[#1A2521]">Your bag is empty</p>
                <p className="text-xs text-[#7F8883] mt-1 max-w-xs mx-auto">
                  Explore our luxury festive lawn, raw silk peshwas, and ready-to-wear kurtas.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2 bg-[#1A2521] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-[#E4DCCE] rounded flex gap-3 text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-22 object-cover object-top rounded-xs border border-[#E8E2D7] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#1A2521] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#96A09A] hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Unboxed Metadata */}
                      <div className="text-[11px] text-[#6A746E] mt-1 space-x-1.5">
                        <span className="font-medium text-[#1A2521]">Size: {item.size}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.stitchingType}</span>
                        {item.trouserStyle && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.trouserStyle}</span>
                          </>
                        )}
                      </div>

                      {item.size === 'Custom Stitching' && (
                        <span className="inline-block mt-1 text-[10px] text-[#9B7A38] font-bold">
                          Custom Made-to-Measure (+₨ 3,500 included)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EAE0]">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#D5CAB9] rounded bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EFE9DF] text-[#4F5953] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-bold text-xs tabular-nums text-[#1A2521]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EFE9DF] text-[#4F5953] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-[#1A2521] tabular-nums">
                        {formatPrice(item.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E2D7] space-y-3 shrink-0">
              {/* Promo code form */}
              {promoCode ? (
                <div className="p-2.5 bg-[#F9F5EC] border border-[#DECFB5] rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#9B7A38] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Code {promoCode} (-{appliedDiscountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. EID2026)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CAB9] rounded text-[#1A2521] uppercase focus:outline-none focus:border-[#1A2521]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#9B7A38] hover:bg-[#83672D] text-white text-xs font-semibold rounded transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#525D57]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums">{formatPrice(cartSubtotalPKR)}</span>
                </div>
                {discountAmountPKR > 0 && (
                  <div className="flex justify-between text-[#9B7A38] font-semibold">
                    <span>Festive Discount</span>
                    <span className="tabular-nums">-{formatPrice(discountAmountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0EAE0] font-bold text-base text-[#1A2521]">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(finalTotalPKR)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-[#1A2521] hover:bg-[#2C3B34] active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#78827C] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9B7A38]" />
                <span>JazzCash · EasyPaisa · Visa/Mastercard · COD</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
