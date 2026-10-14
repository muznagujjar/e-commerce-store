import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { findOrderByTracking, getStoredOrders } from '../data/orders';
import { Order, TrackingMilestone } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    activeTrackingQuery,
    formatPrice
  } = useShop();

  const [searchQuery, setSearchQuery] = useState(activeTrackingQuery || 'PK-928410');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [allRecentOrders, setAllRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    setAllRecentOrders(getStoredOrders());
  }, [isTrackingModalOpen]);

  useEffect(() => {
    if (activeTrackingQuery) {
      setSearchQuery(activeTrackingQuery);
      handleSearch(activeTrackingQuery);
    } else {
      // Default to the first sample order
      handleSearch('PK-928410');
    }
  }, [activeTrackingQuery, isTrackingModalOpen]);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (query: string) => {
    setSearchError(null);
    if (!query.trim()) {
      setSearchError('Please enter a tracking number, order number, or phone number');
      setCurrentOrder(null);
      return;
    }

    const order = findOrderByTracking(query);
    if (order) {
      setCurrentOrder(order);
    } else {
      setSearchError(`No active shipment found matching "${query}". Check sample tracking IDs below.`);
      setCurrentOrder(null);
    }
  };

  const sampleTrackingNumbers = [
    { code: 'PK-928410', label: 'In Transit (TCS)' },
    { code: 'PK-773192', label: 'Embroidery QC' },
    { code: 'PK-441829', label: 'Out for Delivery' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#DED6C7] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8E2D7] flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#7D705C] flex items-center gap-2">
              <span>National & Diaspora Logistics</span>
              <span aria-hidden="true">·</span>
              <span>TCS · Leopards · Trax · DHL</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A2521]">
              Live Order & Consignment Tracker
            </h2>
          </div>

          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-2 text-[#68736D] hover:text-[#1A2521] hover:bg-[#F4EFE6] rounded transition-colors focus:outline-none"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Sample Prompts */}
        <div className="p-6 bg-[#F5EFE4] border-b border-[#E2D9CB] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#827A6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Consignment ID (e.g. PK-928410) or mobile number (+92 300...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#D5CAB9] rounded text-[#1A2521] placeholder-[#8E8679] focus:outline-none focus:border-[#1A2521]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1A2521] hover:bg-[#2F3E37] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Shipment</span>
            </button>
          </form>

          {/* Quick Sample Tracking buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6D7771] text-[11px]">Quick Try Samples:</span>
            {sampleTrackingNumbers.map((s) => (
              <button
                key={s.code}
                onClick={() => {
                  setSearchQuery(s.code);
                  handleSearch(s.code);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                  searchQuery === s.code
                    ? 'bg-[#1A2521] text-white border-[#1A2521]'
                    : 'bg-white text-[#4A544E] border-[#D8CEBE] hover:border-[#9B7A38]'
                }`}
              >
                {s.code} ({s.label})
              </button>
            ))}
          </div>

          {searchError && (
            <div className="mt-3 p-2.5 bg-red-50 text-red-800 text-xs rounded border border-red-200">
              {searchError}
            </div>
          )}
        </div>

        {/* Tracking Details Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {currentOrder ? (
            <div className="space-y-6">
              {/* Top Order Status Banner */}
              <div className="p-5 bg-white border border-[#E0D7C9] rounded shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7A7365] mb-1">
                    <span>Order #{currentOrder.id}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#1A2521]">
                      Consignment: {currentOrder.trackingNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Carrier: {currentOrder.courier}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A2521] flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#9B7A38]"></span>
                    <span>{currentOrder.status}</span>
                  </h3>
                  <p className="text-xs text-[#5D6761] mt-1">
                    Estimated Delivery:{' '}
                    <strong className="text-[#1A2521]">{currentOrder.estimatedDelivery}</strong>{' '}
                    to {currentOrder.customer.city}, {currentOrder.customer.country}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => window.print()}
                    className="p-2 border border-[#DCD3C3] rounded text-[#4E5852] hover:text-[#1A2521] hover:bg-[#F7F4EE] transition-colors"
                    title="Print Waybill"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <a
                    href={`https://wa.me/923001234567?text=Hello%20Zariya%20Atelier,%20inquiring%20about%20my%20shipment%20${currentOrder.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold text-[#1A2521] bg-[#F3ECE0] hover:bg-[#EAE0CF] rounded border border-[#D5CAB9] flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>

              {/* Visual Milestone Progression */}
              <div className="bg-white p-6 border border-[#E0D7C9] rounded">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#6E7872] mb-6">
                  Consignment Journey Milestones
                </h4>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2D8C8]">
                  {currentOrder.timeline.map((milestone, idx) => {
                    const isLast = idx === currentOrder.timeline.length - 1;
                    return (
                      <div key={idx} className="relative group">
                        {/* Node icon */}
                        <div
                          className={`absolute -left-[27px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                            milestone.completed
                              ? 'bg-[#1A2521] ring-4 ring-[#EFEAE1]'
                              : 'bg-[#D2C8B8] ring-4 ring-white'
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
                          ) : (
                            <Clock className="w-3 h-3 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                milestone.completed ? 'text-[#1A2521]' : 'text-[#87928C]'
                              }`}
                            >
                              {milestone.status}
                            </p>
                            <p className="text-xs text-[#525C56] mt-0.5 leading-relaxed">
                              {milestone.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#7A837E] mt-1">
                              <MapPin className="w-3 h-3 text-[#9B7A38]" />
                              {milestone.location}
                            </span>
                          </div>

                          <div className="text-right text-[11px] text-[#727D77] tabular-nums shrink-0 sm:ml-4">
                            <span>{milestone.date}</span>
                            {milestone.time && <span className="block">{milestone.time}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Two Column Details: Items & Consignee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Consignment Items */}
                <div className="bg-white p-5 border border-[#E0D7C9] rounded space-y-3">
                  <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] border-b border-[#F0EAE0] pb-2">
                    Ensembles in Consignment
                  </h4>
                  {currentOrder.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover rounded-xs border border-[#E4DDD0]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1A2521] line-clamp-1">{item.name}</p>
                        <div className="text-[11px] text-[#707B75] mt-0.5">
                          <span>Size: {item.size}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>{item.stitchingType}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <p className="font-semibold text-[#1A2521] mt-0.5 tabular-nums">
                          {formatPrice(item.pricePKR)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-[#F0EAE0] space-y-1 text-[#5A645E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums">{formatPrice(currentOrder.subtotalPKR)}</span>
                    </div>
                    {currentOrder.discountPKR > 0 && (
                      <div className="flex justify-between text-[#9B7A38]">
                        <span>Festive Discount</span>
                        <span className="tabular-nums">-{formatPrice(currentOrder.discountPKR)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-[#1A2521] pt-1 text-sm">
                      <span>Total Amount</span>
                      <span className="tabular-nums">{formatPrice(currentOrder.totalPKR)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address & Carrier Info */}
                <div className="bg-white p-5 border border-[#E0D7C9] rounded space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] border-b border-[#F0EAE0] pb-2">
                      Consignee & Shipping Destination
                    </h4>
                    <p className="font-bold text-[#1A2521] mt-2">{currentOrder.customer.fullName}</p>
                    <p className="text-[#55605A] mt-0.5">{currentOrder.customer.address}</p>
                    <p className="text-[#55605A]">
                      {currentOrder.customer.city}, {currentOrder.customer.country} ({currentOrder.customer.postalCode})
                    </p>
                    <p className="text-[#55605A] mt-1">📞 {currentOrder.customer.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EAE0]">
                    <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1">
                      Payment Verification
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[#55605A]">{currentOrder.paymentMethod}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EAF4ED] text-[#22673B]">
                        {currentOrder.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* SMS Update Log */}
                  {currentOrder.smsAlerts && currentOrder.smsAlerts.length > 0 && (
                    <div className="pt-3 border-t border-[#F0EAE0]">
                      <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#9B7A38]" />
                        <span>SMS Dispatch Broadcasts</span>
                      </h4>
                      <div className="space-y-1.5">
                        {currentOrder.smsAlerts.map((alert, idx) => (
                          <div key={idx} className="p-2 bg-[#FAF8F5] rounded text-[11px] border border-[#EFEAE1]">
                            <span className="text-[#848E88] block text-[10px]">{alert.timestamp}</span>
                            <span className="text-[#35403A]">{alert.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#68736D]">
              <Package className="w-12 h-12 text-[#9B7A38] mx-auto mb-3 opacity-50" />
              <p className="font-serif text-lg font-medium text-[#1A2521]">Search your consignment number</p>
              <p className="text-xs text-[#747E78] mt-1">
                Enter your order ID or tracking code (e.g. PK-928410) above to see real-time courier checkpoints.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D7] flex items-center justify-between shrink-0">
          <p className="text-xs text-[#6F7973] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#9B7A38]" />
            <span>Official Carrier Partners: TCS Express, Leopards, Trax, DHL</span>
          </p>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A2521] hover:bg-[#2C3B34] rounded transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
