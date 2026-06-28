import React from 'react';
import Categories from '../components/Categories';


const CategoriesPage = ({ menuData }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">All Product Categories</h1>
                <p className="mt-2 text-sm text-gray-500">Browse through our complete wholesale selection.</p>
            </div>

            {/* Displaying all categories seamlessly */}
            <Categories />
        </div>
    );
};

export default CategoriesPage;