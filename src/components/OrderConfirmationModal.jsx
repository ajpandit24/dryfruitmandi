import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';

const OrderConfirmationModal = ({ isOpen, onClose, onProceed, orderData, totalAmount, isSubmitting }) => {
    if (!isOpen) return null;

    // Compute per-item APMC/GST using rates present on each item (fallback 0)
    const round2 = (v) => Math.round(v * 100) / 100;

    const computed = orderData.items.reduce((acc, item) => {
        const qty = Number(item.quantity ?? 0);
        const price = Number(item.variant?.price ?? item.totalprice ?? 0);
        const base = price * qty;
        const apmcRate = parseFloat(item.apmc ?? 0) || 0;
        const gstRate = parseFloat(item.gst ?? 0) || 0;
        const apmc = round2(base * (apmcRate / 100));
        const gst = round2((base + apmc) * (gstRate / 100));
        const total = round2(base + apmc + gst);
        acc.subtotal += base;
        acc.apmc += apmc;
        acc.gst += gst;
        acc.grand += total;
        acc.items.push({ ...item, base, apmc, gst, total, appliedRates: { apmcRate, gstRate } });
        return acc;
    }, { subtotal: 0, apmc: 0, gst: 0, grand: 0, items: [] });

    const apmcCharges = round2(computed.apmc);
    const gstAmount = round2(computed.gst);
    const grandTotal = round2(computed.subtotal + apmcCharges + gstAmount);
    const subtotal = round2(computed.subtotal);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 flex justify-between items-center bg-primary text-white p-6 border-b">
                    <h2 className="text-2xl text-white font-bold">Order Confirmation</h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-primary p-1 rounded-full transition-colors"
                        disabled={isSubmitting}
                    >
                        <CloseIcon className="cursor-pointer" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Items Summary */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {computed.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm text-gray-700">
                                    <span>
                                        {item.name} ({item.variant?.weight || 'N/A'}) × {item.quantity}
                                    </span>
                                    <span className="font-medium text-end">
                                        ₹{Number(item.total).toFixed(2)} <br />
                                        <span className="text-xs text-gray-500">
                                            (Price: ₹{item.variant?.price ?? 0}, APMC: {item.appliedRates?.apmcRate ?? 0}%, GST: {item.appliedRates?.gstRate ?? 0}%)
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Details</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div><strong>Name:</strong> {orderData.customer.name}</div>
                            <div><strong>Email:</strong> {orderData.customer.email}</div>
                            <div><strong>Phone:</strong> {orderData.customer.phone}</div>
                            <div><strong>FSSAI:</strong> {orderData.customer.fssai}</div>
                            <div><strong>GST:</strong> {orderData.customer.gst}</div>
                            <div><strong>Delivery Address:</strong></div>
                            <div className="ml-0 p-3 bg-gray-100 rounded border border-gray-300 whitespace-pre-wrap text-gray-800">
                                {orderData.customer.address}
                            </div>
                        </div>
                    </div>

                    {/* Charges Breakdown */}
                    <div className="border-b pb-4 bg-blue-50 p-4 rounded-lg">
                            <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Subtotal</h3>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-blue-700">
                                <span>APMC Charges:</span>
                                <span className="font-medium">+ ₹{apmcCharges.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-blue-700">
                                <span>GST (on subtotal + APMC):</span>
                                <span className="font-medium">+ ₹{gstAmount.toFixed(2)}</span>
                            </div>
                            <div className="border-t-2 border-blue-200 pt-2 mt-2 flex justify-between">
                                <span className="font-bold text-gray-900">Grand Total:</span>
                                <span className="text-xl font-bold text-emerald-600">₹{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Banking Details */}
                    <div className="border-b pb-4 bg-yellow-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Settlement Banking Channels</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div>
                                <strong>Account Holder Name:</strong> Ananya Enterprises
                            </div>
                            <div>
                                <strong>Bank Account Name:</strong> Kotak Mahindra Bank
                            </div>
                            <div>
                                <strong>Account Number:</strong> 0246207621
                            </div>
                            <div>
                                <strong>IFSC Routing Code:</strong> KKBK0001370
                            </div>
                            <div>
                                <strong>Account Type:</strong> Current Account (Vashi Branch)
                            </div>
                            <div className="mt-3 p-3 bg-yellow-100 rounded border border-yellow-300">
                                <strong className="text-primary">GPay / PhonePe:</strong>
                                <div className="text-primary">77109 45676 (Hiralal Gupta)</div>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Terms & Conditions</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                            <li>100% payment against invoice clearance.</li>
                            <li>Any shortage/damage should be reported within 24 hours of delivery.</li>
                            <li>Interest at 18% p.a. is applicable on delayed payments.</li>
                            <li>Subject to Navi Mumbai Jurisdiction.</li>
                        </ol>
                        <p className="text-xs text-gray-500 mt-3 italic">
                            Declaration: This automated summary acts as our formal order evaluation document. Thank you for your business.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onProceed}
                            disabled={isSubmitting}
                            className="flex-1 cursor-pointer bg-primary hover:bg-primary text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Processing...' : 'Proceed'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;
