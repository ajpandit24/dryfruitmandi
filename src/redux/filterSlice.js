import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategory: null,
    activeSubcategory: null,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryFilter: (state, action) => {
            state.activeCategory = action.payload.category;
            state.activeSubcategory = action.payload.subcategory || null;
        },
        clearFilters: (state) => {
            state.activeCategory = null;
            state.activeSubcategory = null;
        }
    }
});

export const { setCategoryFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;