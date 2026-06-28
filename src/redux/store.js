import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from './menuSlice';
import filterReducer from './filterSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
        filters: filterReducer,
    },
});

export default store;