import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return {
                cartItems: [],
                totalAmount: 0,
                totalItems: 0,
            };
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error("Could not load cart from localStorage", err);
        return {
            cartItems: [],
            totalAmount: 0,
            totalItems: 0,
        };
    }
};

const saveCartToLocalStorage = (cartState) => {
    try {
        const serializedCart = JSON.stringify(cartState);
        localStorage.setItem('cart', serializedCart);
    } catch (err) {
        console.error("Could not save cart to localStorage", err);
    }
};

const initialState = {
    ...loadCartFromLocalStorage(),
    notifications: {
        message: '',
        type: '', // 'success' or 'error'
        show: false,
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                item => item.id === newItem.id && item.variant.weight === newItem.variant.weight
            );
            const qtyChange = newItem.quantity !== undefined ? newItem.quantity : 1;
            if (existingItem) {
                existingItem.quantity += qtyChange;
                if (existingItem.quantity <= 0) {
                    state.cartItems = state.cartItems.filter(
                        item => !(item.id === newItem.id && item.variant.weight === newItem.variant.weight)
                    );
                }

            } else {
                state.cartItems.push({ ...newItem, qtyChange });
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.variant.price * item.quantity, 0);
            state.totalItems = state.cartItems.reduce(
                (total, item) => total + item.quantity, 0);

            state.notifications.show = true;
            state.notifications.message = `Added ${Math.abs(qtyChange)} x ${newItem.name} (${newItem.variant.weight}) to cart! 🛒`;

            saveCartToLocalStorage(state);
        },

        dismissNotification: (state) => {
            state.notifications.show = false;
        },

        removeFromCart: (state, action) => {
            const { id, variant } = action.payload;
            state.cartItems = state.cartItems.filter(
                item => !(item.id === id && item.variant.weight === variant.weight)
            );
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.variant.price * item.quantity, 0);
            state.totalItems = state.cartItems.reduce(
                (total, item) => total + item.quantity, 0);

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            localStorage.removeItem('cart');
        }

    },


});

export const { addToCart, clearCart, removeFromCart, dismissNotification } = cartSlice.actions;
export default cartSlice.reducer;
