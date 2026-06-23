import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../redux/cartSlice';
import { DeleteForever } from '@mui/icons-material';
import { removeFromCart } from '../redux/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  
  // Redux State
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  // Local Form State
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: ''
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

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.phone) {
      alert("Please fill out all contact details before placing your order.");
      return;
    }

    const orderPayload = {
      customer: customer,
      items: cartItems,
      totalAmount: totalAmount
    };

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (data.success && data.whatsappLink) {
        dispatch(clearCart());
        window.location.href = data.whatsappLink;
      } else {
        alert(data.message || "Something went wrong processing your order.");
      }
    } catch (error) {
      console.error("API Error during checkout:", error);
      alert("Could not connect to the backend server.");
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
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      
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
                  Weight: {item.variant.weight}
                </span>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  ₹{item.variant.price} each
                </p>
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
                  ₹{item.variant.price * item.quantity}
                </span>
              </div>

              <div className="text-right sm:min-w-[100px]">
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
        
        <form onSubmit={handleCheckout} className="space-y-4">
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

          <div className="border-t border-gray-200 my-4 pt-4 space-y-2">
            <div className="flex justify-between items-center text-gray-600">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-900">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery Charges:</span>
              <span className="text-sm text-green-600 font-medium">Free</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-bold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-black text-gray-900">₹{totalAmount}</span>
            </div>
          </div>

          <button 
            type="submit" onClick={handleCheckout} 
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-md font-bold text-center transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
          >
            Place Order via WhatsApp 💬
          </button>
        </form>
      </div>

    </div>
  );
}