import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dismissNotification } from '../redux/cartSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const { show, message } = useSelector((state) => state.cart.notifications);

  useEffect(() => {
    if (show) {
      // Automatically hide the custom banner after 3 seconds
      const timer = setTimeout(() => {
        dispatch(dismissNotification());
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce sm:animate-none">
      <div className="bg-emerald-600 text-white px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 max-w-sm border border-emerald-500 transform transition-all duration-300 translate-y-0 opacity-100">
        
        {/* Success Icon */}
        <div className="bg-white/20 p-1.5 rounded-full">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Message */}
        <p className="text-sm font-semibold tracking-wide pr-2">{message}</p>

        {/* Manual Close Cross Button */}
        <button 
          onClick={() => dispatch(dismissNotification())}
          className="ml-auto text-white/70 hover:text-white transition-colors focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
      </div>
    </div>
  );
}