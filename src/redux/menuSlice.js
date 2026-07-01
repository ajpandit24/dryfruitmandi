import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Replace this with your actual API base URL configuration if necessary
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Async Thunk to fetch complete navigation structural map 
 * directly from the dedicated categories sheet tab endpoint.
 */
export const fetchCategoriesAndSubcategories = createAsyncThunk(
    'menu/fetchCategoriesAndSubcategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/categories`); // or whatever your endpoint is
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            // --- FIXED PAYLOAD EXTRACTION ---
            // If your backend returns { success: true, data: { ... } }, we need result.data
            const finalTree = result.data ? result.data : result;

            // Simple validation check: ensure it's a valid object and not empty
            if (!finalTree || typeof finalTree !== 'object' || Object.keys(finalTree).length === 0) {
                console.error("Backend sent an unexpected structure:", result);
                return rejectWithValue('Invalid categories payload received from server');
            }

            return finalTree;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        data: {},        // Stores our structural tree object
        loading: false,
        error: null,
    },
    reducers: {
        // Clear utility if you ever need to purge state on user logout or refresh actions
        clearMenuState: (state) => {
            state.data = {};
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAndSubcategories.pending, (state) => {
                console.log("Categories fetch: PENDING");
                state.loading = true;
            })
            .addCase(fetchCategoriesAndSubcategories.fulfilled, (state, action) => {
                console.log("Categories fetch: FULFILLED with payload:", action.payload);
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategoriesAndSubcategories.rejected, (state, action) => {
                console.error("Categories fetch: REJECTED with error:", action.payload);
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMenuState } = menuSlice.actions;
export default menuSlice.reducer;