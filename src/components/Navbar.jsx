import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setCategoryFilter } from '../redux/filterSlice';

const Navbar = ({ Cart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMobileCat, setActiveMobileCat] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    // --- FIXED: Select the actual nested data object from the menu slice ---
    const menuState = useSelector((state) => state.menu);
    const menuData = menuState?.data || {};

    console.log('Menu Tree Data in Navbar:', menuData); // Debugging to see your nested keys

    const handleCategoryClick = (category, subcategory) => {
        dispatch(setCategoryFilter({ category, subcategory }));
        navigate(`/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`);
        setIsOpen(false); // Close mobile drawer when clicking a link
    };

    const handleClearAllFilters = () => {
        dispatch(clearFilters()); // FIXED: Added execution parentheses ()
        setIsOpen(false);
    };

    return (
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* --- LOGO --- */}
                    <div className="flex-shrink-0 font-bold text-2xl text-orange-600">
                        <Link to="/">
                            <img src={logo} alt="DryFruits Mandi" className="h-12 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* --- DESKTOP NAVIGATION --- */}
                    <div className="hidden md:flex items-center gap-1 space-x-2">
                        <nav className="flex gap-1 items-center">
                            <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                                Home
                            </NavLink>

                            {/* DYNAMIC PRODUCTS MULTI-LEVEL DROPDOWN FLYOUT */}
                            {/* --- DYNAMIC MEGA MENU DROPDOWN FLYOUT --- */}
                            <div className="relative group py-4">
                                <NavLink
                                    to="/products"
                                    onClick={handleClearAllFilters}
                                    className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium inline-flex items-center gap-1 transition ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                                >
                                    Products
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </NavLink>

                                {/* MEGA MENU CONTAINER 
        - wide width layout centered under the header structure 
    */}
                                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-6xl bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">

                                    {/* Top bar quick link */}
                                    {/* <div className="pb-4 mb-4 border-b border-gray-50 flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explore Departments</span>
                                        <Link to="/products" onClick={handleClearAllFilters} className="text-xs font-semibold text-primary hover:text-primary hover:underline">
                                            View All Products &rarr;
                                        </Link>
                                    </div> */}

                                    {/* Dynamic Mega Grid Columns Framework */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                                        {Object.keys(menuData).map((categoryName) => {
                                            const subcategoriesObj = menuData[categoryName]?.subcategories || {};
                                            const subcategoryKeys = Object.keys(subcategoriesObj);

                                            return (
                                                <div key={categoryName} className="space-y-3">
                                                    {/* COLUMN HEADER (Parent Category Level) */}
                                                    <div className="border-b border-gray-100 pb-1.5">
                                                        <h4 className="font-bold text-gray-900 text-xs md:text-sm tracking-wide uppercase text-left break-words">
                                                            {categoryName}
                                                        </h4>
                                                    </div>

                                                    {/* COLUMN ITEMS LIST (Subcategory Level Layout) */}
                                                    <div className="flex flex-col space-y-1.5">
                                                        {subcategoryKeys.length > 0 ? (
                                                            subcategoryKeys.map((subCategoryName) => (
                                                                <div
                                                                    key={subCategoryName}
                                                                    onClick={() => handleCategoryClick(categoryName, subCategoryName)}
                                                                    className="text-left text-xs md:text-sm text-gray-600 hover:text-primary rounded transition cursor-pointer font-medium hover:translate-x-0.5 transform duration-150 py-0.5"
                                                                >
                                                                    {subCategoryName}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            /* Fallback link if a category doesn't have child configurations */
                                                            <div
                                                                onClick={() => handleCategoryClick(categoryName, categoryName)}
                                                                className="text-left text-xs text-gray-400 italic cursor-pointer hover:text-primary"
                                                            >
                                                                Browse Section
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                                About
                            </NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                                Contact
                            </NavLink>
                        </nav>
                    </div>

                    {/* --- RIGHT ACTIONS LAYOUT --- */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/cart" className="relative p-1 group">
                            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary transition" />
                            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                                {cart?.totalItems || 0}
                            </span>
                        </Link>
                    </div>

                    {/* --- MOBILE MENU ACTION HAMBURGER --- */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link to="/cart" className="relative p-1">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cart?.totalItems || 0}
                            </span>
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-1">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* --- MOBILE NAVIGATION DRAWER ACCORDIONS --- */}
                {isOpen && (
                    <div className="md:hidden pb-6 border-t border-gray-50 pt-2 space-y-1 animate-fadeIn">
                        <div className="relative my-2 px-1">
                            <input type="text" placeholder="Search items..." className="w-full bg-gray-50 text-sm px-4 py-2 rounded-lg border border-gray-100" />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>

                        <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium py-2 px-2 rounded-md hover:bg-gray-50">Home</Link>

                        {/* Dynamic Accordions Framework on Mobile Menu */}
                        <div className="py-1">
                            <button
                                onClick={() => setActiveMobileCat(activeMobileCat === 'all' ? null : 'all')}
                                className="flex items-center justify-between w-full text-left text-gray-700 font-medium py-2 px-2 rounded-md hover:bg-gray-50"
                            >
                                <span>Products Catalog</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeMobileCat === 'all' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeMobileCat === 'all' && (
                                <div className="pl-4 mt-1 border-l border-gray-100 ml-2 space-y-1">
                                    <Link to="/products" onClick={handleClearAllFilters} className="block text-sm text-gray-600 py-1.5 hover:text-primary">All Items</Link>

                                    {Object.keys(menuData).map((catName) => (
                                        <div key={catName} className="py-0.5">
                                            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 pt-2 pb-1">
                                                {catName}
                                            </div>
                                            {Object.keys(menuData[catName]?.subcategories || {}).map((subCatName) => (
                                                <div
                                                    key={subCatName}
                                                    onClick={() => handleCategoryClick(catName, subCatName)}
                                                    className="cursor-pointer block text-sm text-gray-600 py-1.5 pl-2 hover:text-primary border-b border-gray-50/50"
                                                >
                                                    {subCatName}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium py-2 px-2 rounded-md hover:bg-gray-50">About</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium py-2 px-2 rounded-md hover:bg-gray-50">Contact Us</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;