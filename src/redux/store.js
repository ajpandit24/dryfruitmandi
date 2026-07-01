import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from './menuSlice';
import filterReducer from './filterSlice';
import productsReducer from './productsSlice'; // Import the products reducer

const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
        filters: filterReducer,
        products: productsReducer, // Add the products reducer here
    },
});

export default store;