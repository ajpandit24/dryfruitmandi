import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryFilter } from '../redux/filterSlice';

export const SubcategoryCard = ({ subCategoryName, parentCategoryName, subCategoryImage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubcategoryClick = () => {
        dispatch(setCategoryFilter({ category: parentCategoryName, subcategory: subCategoryName }));
        navigate(`/products?category=${encodeURIComponent(parentCategoryName)}&subcategory=${encodeURIComponent(subCategoryName)}`);
    };

    const fallbackImage = 'https://dummyimage.com/300x300/f5f5f5/a3a3a3&text=Product';

    return (
        <div 
            onClick={handleSubcategoryClick}
            className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
        >
            <div className="w-full aspect-square max-w-[130px] rounded-full overflow-hidden bg-gray-50 border border-gray-100 mb-3">
                <img 
                    src={subCategoryImage || fallbackImage} 
                    alt={subCategoryName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = fallbackImage; }}
                />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs md:text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors uppercase">
                {subCategoryName}
            </h3>
        </div>
    );
};

const Categories = ({ limit }) => {
    const menuState = useSelector((state) => state.menu.data);
    const menuData = menuState?.data || {};
    const loading = menuState?.loading;

    console.log('Menu Data in Categories:', menuData); // Debugging: Log the menu data structure

    const flatSubcategories = [];

    // --- READ DIRECTLY FROM NEW BACKEND ENDPOINT TREE SCHEMA ---
    if (menuData && typeof menuData === 'object' && !Array.isArray(menuData)) {
        Object.keys(menuData).forEach((parentCatName) => {
            const categoryObj = menuData[parentCatName] || {};
            const subcategoriesObj = categoryObj.subcategories || {};
            const subKeys = Object.keys(subcategoriesObj);

            if (subKeys.length > 0) {
                subKeys.forEach((subCatName) => {
                    const subData = subcategoriesObj[subCatName];
                    flatSubcategories.push({
                        subCategoryName: subCatName,
                        parentCategoryName: parentCatName,
                        image: subData?.subcategory_image || categoryObj?.category_image
                    });
                });
            } else {
                // Standalone parent categories fallback
                flatSubcategories.push({
                    subCategoryName: parentCatName,
                    parentCategoryName: parentCatName,
                    image: categoryObj?.category_image
                });
            }
        });
    }

    const displayedSubcategories = limit ? flatSubcategories.slice(0, limit) : flatSubcategories;

    if (loading && flatSubcategories.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">Loading catalog...</span>
            </div>
        );
    }

    if (flatSubcategories.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                No categories loaded. Check your network requests.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {displayedSubcategories.map((sub, index) => (
                <SubcategoryCard 
                    key={`${sub.parentCategoryName}-${sub.subCategoryName}-${index}`}
                    subCategoryName={sub.subCategoryName}
                    parentCategoryName={sub.parentCategoryName}
                    subCategoryImage={sub.image}
                />
            ))}
        </div>
    );
};

export default Categories;