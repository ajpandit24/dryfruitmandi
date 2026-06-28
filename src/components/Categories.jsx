import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryFilter } from '../redux/filterSlice';
import { ChevronRight } from 'lucide-react';

/**
 * Individual Category Card Component
 */
export const CategoryCard = ({ categoryName, subcategories }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        // 1. Update Redux filter state with the clicked category
        dispatch(setCategoryFilter({ category: categoryName, subcategory: null }));
        
        // 2. Redirect user to the products catalog page
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    // Grab up to 3 subcategory strings to list cleanly inside the card layout preview
    const subPreviewList = Object.keys(subcategories || {}).slice(0, 3);

    return (
        <div 
            onClick={handleCategoryClick}
            className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
            <div>
                {/* Visual placeholder icon/badge ring */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    {categoryName.charAt(0).toUpperCase()}
                </div>

                <h3 className="font-semibold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">
                    {categoryName}
                </h3>

                {/* Subcategories list preview */}
                <div className="mt-2 space-y-1">
                    {subPreviewList.map((sub) => (
                        <span key={sub} className="block text-xs text-gray-400 truncate">
                            • {sub}
                        </span>
                    ))}
                    {Object.keys(subcategories || {}).length > 3 && (
                        <span className="block text-[11px] text-emerald-600 font-medium pt-1">
                            +{Object.keys(subcategories).length - 3} More
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Catalog</span>
                <ChevronRight className="w-4 h-4" />
            </div>
        </div>
    );
};

/**
 * Main Category Grid Wrapper Layout
 */
const Categories = ({ limit }) => {
   const menuState = useSelector((state) => state.menu);
    
    // Safely extract the targets with structural defaults
    const menuData = menuState?.data || {};
    const loading = menuState?.loading;

    const categories = Object.keys(menuData);
    const displayedCategories = limit ? categories.slice(0, limit) : categories;

    // 2. Handle background processing state
    if (loading && categories.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">Loading catalog...</span>
            </div>
        );
    }

    // 3. Fallback check if the API succeeds but your DB array configuration returns empty
    if (categories.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                No categories found in the catalogue system map.
            </div>
        );
    }

    return (

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {displayedCategories.map((categoryName) => (
                <CategoryCard 
                    key={categoryName}
                    categoryName={categoryName}
                    subcategories={menuData[categoryName]?.subcategories || {}}
                />
            ))}
        </div>
    );
};

export default Categories;