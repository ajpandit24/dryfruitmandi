import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';

const OrderConfirmationModal = ({ isOpen, onClose, onProceed, orderData, totalAmount, isSubmitting }) => {
    if (!isOpen) return null;

    const gstAmount = Math.round(totalAmount * 0.18 * 100) / 100; // 18% GST
    const apmcCharges = Math.round(totalAmount * 0.02 * 100) / 100; // 2% APMC
    const grandTotal = totalAmount + gstAmount + apmcCharges;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 flex justify-between items-center bg-emerald-600 text-white p-6 border-b">
                    <h2 className="text-2xl font-bold">Order Confirmation</h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-emerald-700 p-1 rounded-full transition-colors"
                        disabled={isSubmitting}
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Items Summary */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {orderData.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm text-gray-700">
                                    <span>
                                        {item.name} ({item.variant?.weight || 'N/A'}) × {item.quantity}
                                    </span>
                                    <span className="font-medium text-end">
                                        ₹{((item.totalprice ?? 0) * item.quantity).toFixed(2)} <br />
                                        <span className="text-xs text-gray-500">
                                            (Price: ₹{item.variant?.price ?? 0}, GST: {item.gst ?? 0}%, APMC: {item.apmc ?? 0}%)
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
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Total Amount</h3>
                                <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
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
                                <strong className="text-emerald-600">GPay / PhonePe:</strong>
                                <div className="text-emerald-700">7710945676 (Hiralal Gupta)</div>
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
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onProceed}
                            disabled={isSubmitting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
