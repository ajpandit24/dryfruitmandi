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
                <div className="flex justify-between items-center py-2">

                    {/* --- LOGO --- */}
                    <div className="flex-shrink-0 font-bold text-2xl text-orange-600">
                        <Link to="/">
                            <img src={logo} alt="DryFruits Mandi" className="logo h-12 w-auto object-contain" />
                        </Link>
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

                {/* --- DESKTOP NAVIGATION --- */}
                    <div className="hidden md:flex items-center gap-1 space-x-2">
                        <nav className="w-full">
                            {/* Dynamic Horizon Categories Alignment Grid */}
                            <div className="flex flex-wrap items-center justify-between">
                                {Object.keys(menuData).map((categoryName) => {
                                    const subcategoriesObj = menuData[categoryName]?.subcategories || {};
                                    const subcategoryKeys = Object.keys(subcategoriesObj);

                                    // Check if this is a standalone category (e.g., DRYFRUITS with a subcategory also named DRYFRUITS)
                                    const isStandalone =
                                        subcategoryKeys.length === 0 ||
                                        (subcategoryKeys.length === 1 && subcategoryKeys[0].trim().toUpperCase() === categoryName.trim().toUpperCase());

                                    if (isStandalone) {
                                        const targetSubcategory = subcategoryKeys[0] || categoryName;
                                        return (
                                            <button
                                                key={categoryName}
                                                onClick={() => handleCategoryClick(categoryName, targetSubcategory)}
                                                className="px-3 cursor-pointer py-2 rounded-md text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-150 whitespace-nowrap"
                                            >
                                                {categoryName}
                                            </button>
                                        );
                                    }

                                    {/* --- MULTI-LEVEL DROPDOWN / MEGA MENU FOR SPECIFIC GROUPS --- */ }
                                    return (
                                        <div key={categoryName} className="relative group py-2">
                                            <button
                                                className="cursor-pointer px-3 py-2 rounded-md text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center gap-1 transition whitespace-nowrap"
                                            >
                                                {categoryName}
                                                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                                            </button>

                                            {/* DROPDOWN PANEL - Drops down cleanly right beneath its specific item anchor */}
                                            <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-3">
                                                <div className="flex flex-col space-y-1">
                                                    {subcategoryKeys.map((subCategoryName) => (
                                                        <div
                                                            key={subCategoryName}
                                                            onClick={() => handleCategoryClick(categoryName, subCategoryName)}
                                                            className="text-left text-xs md:text-sm text-gray-600 hover:text-primary hover:bg-emerald-50/50 px-3 py-2 rounded-lg transition cursor-pointer font-medium"
                                                        >
                                                            {subCategoryName}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </nav>
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