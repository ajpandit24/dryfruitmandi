import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunk that accepts current filter parameters and requested page index
export const fetchPaginatedProducts = createAsyncThunk(
    'products/fetchPaginated',
    async ({ category, subcategory, page, limit = 12 }, { rejectWithValue }) => {
        try {
            let url = `${API_URL}/products?page=${page}&limit=${limit}`;
            if (category) url += `&category=${encodeURIComponent(category)}`;
            if (subcategory) url += `&subcategory=${encodeURIComponent(subcategory)}`;

            const response = await fetch(url);
            const json = await response.json();
            
            if (json.success) return json;
            return rejectWithValue('Failed to load products page.');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
        hasMore: true
    },
    reducers: {
        resetProductsList: (state) => {
            state.items = [];
            state.currentPage = 1;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
                state.loading = false;
                // If it's page 1, replace items. If it's a "load more" action, append them!
                if (action.meta.arg.page === 1) {
                    state.items = action.payload.data;
                } else {
                    state.items = [...state.items, ...action.payload.data];
                }
                
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasMore = state.currentPage < state.totalPages;
            })
            .addCase(fetchPaginatedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetProductsList } = productsSlice.actions;
export default productsSlice.reducer;