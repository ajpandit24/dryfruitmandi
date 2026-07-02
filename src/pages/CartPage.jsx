import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../redux/cartSlice';
import { DeleteForever } from '@mui/icons-material';
import { removeFromCart } from '../redux/cartSlice';
import Loader from '../components/Loader';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

export default function CartPage() {
  const dispatch = useDispatch();

  // Redux State
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  console.log("Cart Items:", cartItems);

  // Local Form State
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const API_URL = import.meta.env?.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncreaseQty = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleShowConfirmation = (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill out all details including address before placing your order.");
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleProceedCheckout = () => {
    setShowConfirmationModal(false);
    // Create a synthetic event for handleCheckout
    handleCheckout({ preventDefault: () => { } });
    handlePlaceOrder(customer);
  };

  const handlePlaceOrder = async (customerFormData) => {
        // Replace this with your deployed Google Apps Script Web App URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyX04r9z_KvqtVpWW-Pq3hDWF4iPChPzv4Siwx2Z4vCQ0D1f137BXn0UnzcPSYnKJfQnw/exec';

        // 2. Format the payload to match what your Google Script expects
        const orderPayload = {
            invoiceNo: `INV-${Date.now().toString().slice(-6)}`, // Generates a clean temporary invoice number
            name: customerFormData.name,
            phone: customerFormData.phone,
            email: customerFormData.email,
            address: customerFormData.address,
            // Combine cart details neatly for the spreadsheet cell
            details: cartItems.map(item => `${item.quantity}x ${item.name} (${item.variant?.weight})`).join('\n'),
            total: `₹${totalAmount}`
        };

        try {
            // 3. Submit data directly to Google Sheets via standard fetch
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors', // Crucial to prevent Cross-Origin browser blocks
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8', // Apps Script handles text/plain payloads best natively
                },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();

            if (result.status === 'success') {
                console.log('Order placed successfully! Checked into spreadsheet ledger.');
                
                // 4. Clear cart state and redirect user to a confirmation page
                dispatch(clearCart());
                // navigate('/order-success');
            } else {
                console.error("Google Script Error:", result.error);
                alert('There was an issue processing the ledger registry.');
            }

        } catch (error) {
            console.error("Frontend Submission Error:", error);
            alert('Failed to connect to the order ledger. Check internet connections.');
        }
    };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill out all details including address before placing your order.");
      return;
    }

    const orderPayload = {
      customer: customer,
      items: cartItems
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 Your order request has been placed! An automated tax invoice copy has been sent to your email and the store manager.");
        dispatch(clearCart());
      } else {
        alert(data.message || "Something went wrong processing your order.");
      }
    } catch (error) {
      console.error("API Error during checkout:", error);
      alert("Could not connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty 🛒</h2>
        <p className="text-gray-500">Go back to the home page to explore our premium items!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* LEFT COLUMN: Shopping Cart List (Spans 2 columns on medium+ screens) */}
      <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
          Shopping Cart ({cartItems.length} items)
        </h2>

        <div className="divide-y divide-gray-100">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.variant.weight}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4"
            >
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1">
                  Weight: {item.variant?.weight ?? 'N/A'}
                </span>
                {/* <p className="text-sm font-medium text-gray-500 mt-2">
                  ₹{item.variant?.price ?? 0} each
                </p> */}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecreaseQty(item)}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQty(item)}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Total Item Price */}
              <div className="text-right sm:min-w-[100px]">
                <span className="text-lg font-bold text-gray-900">
                  {/* ₹{((item.variant?.price ?? 0) * (item.quantity ?? 0) * (1 + (parseFloat(item.gst) || 0) / 100) * (1 + (parseFloat(item.apmc) || 0) / 100)).toFixed(2)} */}

                  {/* ₹{(item.variant?.price ?? 0) * (item.quantity ?? 0)} */}

                  ₹{parseFloat((item.totalprice ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                  <br />
                  <small>
                    GST ({item.gst || "0"}%) and APMC ({item.apmc || "0"}%) charges
                  </small>
                </span>
              </div>

              <div className="text-right sm:min-w-[30px]">
                <DeleteForever
                  onClick={() => dispatch(removeFromCart({ id: item.id, variant: item.variant }))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => dispatch(clearCart())}
            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Checkout Details Panel */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200/60 h-fit sticky top-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Checkout Details</h3>

        <form onSubmit={handleShowConfirmation} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              placeholder="e.g., 919876543210"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleInputChange}
              placeholder="Enter your complete delivery address"
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm resize-none"
            />
          </div>

          <div className="border-t border-gray-200 my-4 pt-4 space-y-2">
            {/* <div className="flex justify-between items-center text-gray-600">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-900">₹{totalAmount}</span>
            </div> */}
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery Charges:</span>
              <span className="text-sm text-green-600 font-medium">Free</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-bold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-black text-gray-900">₹{parseFloat(totalAmount).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-primary hover:bg-secondary text-white py-3 px-4 rounded-md font-bold text-center transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing order...' : 'Place Order'}
          </button>
          {isSubmitting && <Loader message="Submitting order..." />}
        </form>


      </div>
      <OrderConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onProceed={handleProceedCheckout}
        orderData={{ customer, items: cartItems }}
        totalAmount={totalAmount}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}