import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunk to handle fetching menu tree structural catalog data
export const fetchMenuData = createAsyncThunk(
    'menu/fetchMenuData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/products`);
            const json = await response.json();
            if (json.success && json.data) {
                return json.data;
            }
            return rejectWithValue('Failed to retrieve structured data layout.');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        data: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMenuData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default menuSlice.reducer;