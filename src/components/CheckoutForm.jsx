import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { cartItems, totalAmount } = useSelector((state) => state.cart);

    const API_URL = import.meta.env.VITE_API_URL;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const customerDetails = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
        };

        const orderPayload = {
            customer: customerDetails,
            items: cartItems,
            totalAmount,
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
            console.log('Order placed successfully:', data);

            if (data.success && data.whatsappLink) {
                window.location.href = data.whatsappLink;
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className={`bg-green-500 text-white px-6 py-3 rounded-md transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
            >
                {isSubmitting ? 'Placing order...' : 'Place Order'}
            </button>
            {isSubmitting && <Loader message="Placing order..." />}
        </div>
    )
}

export default CheckoutForm
