import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CheckoutForm = () => {
    const dispatch = useDispatch();

    const { cartItems, totalAmount } = useSelector((state) => state.cart);

    const API_URL = import.meta.env.VITE_API_URL;

    handlePlaceOrder = async (e) => {
        e.preventDefault();

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
            }else{
                alert('Failed to place order. Please try again.');
            }

        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order. Please try again.');
        }
    };

    return (
        <button onClick={handlePlaceOrder} className='bg-green-500 text-white px-6 py-3 rounded-md transition'>Place Order</button>
    )
}

export default CheckoutForm
