import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Loader from './Loader';

const ProductsList = (props) => {
    const { limit, tabs } = props; // tabs true means full shop view with filter sidebar, false means home page summary grid
    const [nestedData, setNestedData] = useState({});
    const [allProductsFlat, setAllProductsFlat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {activeCategory, setActiveCategory} = useSelector(state => state.filters) || {};
    
    // Accordion UI tracking states
    const [openCategories, setOpenCategories] = useState({}); // e.g. { "Dry Fruits & Nuts": true }
    const [activeFilter, setActiveFilter] = useState({ type: 'All', value: 'All' }); // type: 'All' | 'Category' | 'SubCategory'

    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/products`);
                const json = await response.json();

                if (json.success && json.data) {
                    setNestedData(json.data);

                    // --- UPDATED FLATTENING LOGIC FOR NEW BACKEND MAP STRUCTURE ---
                    const flatList = [];
                    Object.keys(json.data).forEach(catKey => {
                        const categoryObj = json.data[catKey];
                        const subcategories = categoryObj.subcategories || {};

                        Object.keys(subcategories).forEach(subCatKey => {
                            const productsArray = subcategories[subCatKey] || [];
                            
                            productsArray.forEach(prod => {
                                flatList.push({
                                    ...prod,
                                    computedCategory: catKey,
                                    computedSubCategory: subCatKey
                                });
                            });
                        });
                    });
                    setAllProductsFlat(flatList);
                }
            } catch (error) {
                console.error("Error fetching products from Node backend:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const [selectedVariantIndexes, setSelectedVariantIndexes] = useState({});
    const [quantities, setQuantities] = useState({});

    const handleVariantSelect = (productId, index) => {
        setSelectedVariantIndexes((prev) => ({ ...prev, [productId]: index }));
    };

    const handleQuantityChange = (productId, delta) => {
        setQuantities((prev) => {
            const current = prev[productId] ?? 1;
            return { ...prev, [productId]: Math.max(1, current + delta) };
        });
    };

    const getWeightDisplayDetails = (weight, currentTierPrice) => {
        if (!weight) return { isWeightBased: false, formattedPrice: currentTierPrice, label: 'unit' };
        const lowerWeight = weight.toLowerCase();
        const value = parseFloat(weight) || 1;
        const isKg = lowerWeight.includes('kg');
        const isGm = lowerWeight.includes('gm') || lowerWeight.includes('gram') || (lowerWeight.includes('g') && !lowerWeight.includes('b') && !lowerWeight.includes('p'));

        if (isKg || isGm) {
            const weightInGrams = isKg ? value * 1000 : value;
            const pricePerKg = Math.round((currentTierPrice / weightInGrams) * 1000);
            return { isWeightBased: true, formattedPrice: pricePerKg, label: 'kg' };
        }

        let unitLabel = 'unit';
        if (lowerWeight.includes('tin')) unitLabel = 'tin';
        else if (lowerWeight.includes('pkt')) unitLabel = 'pkt';
        else if (lowerWeight.includes('btl')) unitLabel = 'btl';
        else if (lowerWeight.includes('pc')) unitLabel = 'pc';

        return { isWeightBased: false, formattedPrice: Math.round(currentTierPrice / value), label: unitLabel };
    };

    // Toggle Category Accordion expansion
    const toggleCategoryAccordion = (categoryName) => {
        setOpenCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    // --- COMPUTATION FILTER LAYER ---
    const filteredProducts = allProductsFlat.filter((product) => {
        // If no filter is set, show everything
        if (!activeCategory) return true;
        
        const matchesCategory = product.category === activeCategory;
        
        // If a subcategory filter is also active, check both
        if (activeSubcategory) {
            return matchesCategory && product.subcategory === activeSubcategory;
        }
        
        return matchesCategory;
    });

    const displayProducts = typeof limit === 'number' && limit > 0
        ? filteredProducts.slice(0, limit)
        : filteredProducts;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4">
            
            {/* Split layout framework if tabs/sidebar flag is active */}
            <div className={`flex flex-col md:flex-row gap-8 ${tabs ? 'items-start' : ''}`}>
                
                {/* --- LEFT SIDEBAR ACCORDION FILTERS --- */}
                {tabs && (
                    <div className="w-full md:w-64 bg-white border border-gray-200 rounded-xl p-4 shrink-0 shadow-xs sticky top-24">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 px-1">
                            Categories
                        </h3>
                        
                        <div className="flex flex-col gap-1">
                            {/* All Items Master Selector Button */}
                            <button
                                onClick={() => setActiveFilter({ type: 'All', value: 'All' })}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                                    activeFilter.type === 'All'
                                        ? 'bg-primary font-semibold'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                All Items
                            </button>

                            {/* Loop down through Nested Map Categories */}
                            {Object.keys(nestedData).map((catName) => {
                                const isExpanded = !!openCategories[catName];
                                const isCurrentCatActive = activeFilter.type === 'Category' && activeFilter.value === catName;
                                const categoryImage = nestedData[catName].category_image;

                                return (
                                    <div key={catName} className="border-b border-gray-50 last:border-0 py-1">
                                        <div className="flex items-center justify-between w-full rounded-lg hover:bg-gray-50 pr-2">
                                            <button
                                                onClick={() => setActiveFilter({ type: 'Category', value: catName })}
                                                className={`grow flex items-center gap-2 text-left px-3 py-2 text-sm font-medium transition ${
                                                    isCurrentCatActive ? 'text-primary font-semibold' : 'text-gray-800'
                                                }`}
                                            >
                                                {/* Optional: Tiny image thumbnail inside the sidebar item */}
                                                <img 
                                                    src={categoryImage} 
                                                    alt="" 
                                                    className="w-5 h-5 rounded-full object-cover border border-gray-100"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <span>{catName}</span>
                                            </button>
                                            
                                            {/* Accordion Arrow Icon Toggle Button */}
                                            <button 
                                                onClick={() => toggleCategoryAccordion(catName)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                {isExpanded ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
                                            </button>
                                        </div>

                                        {/* Sub Categories list drop down container wrapper */}
                                        {isExpanded && (
                                            <div className="ml-4 pl-2 border-l border-gray-200 mt-1 flex flex-col gap-1">
                                                {Object.keys(nestedData[catName].subcategories || {}).map((subCatName) => {
                                                    const isCurrentSubActive = activeFilter.type === 'SubCategory' && activeFilter.value === subCatName;
                                                    return (
                                                        <button
                                                            key={subCatName}
                                                            onClick={() => setActiveFilter({ type: 'SubCategory', value: subCatName })}
                                                            className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition ${
                                                                isCurrentSubActive
                                                                    ? 'bg-primary text-white font-medium shadow-xs'
                                                                    : 'text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {subCatName}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* --- RIGHT SIDE MAIN PRODUCTS GRID LAYER --- */}
                <div className="grow w-full">
                    {isLoading ? (
                        <Loader message="Loading products array..." />
                    ) : displayProducts.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50">
                            No products found matching the selected filter criteria.
                        </div>
                    ) : (
                        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${props.gridColumns || 3} gap-6`}>
                            {displayProducts.map((product) => {
                                const { id, name, computedCategory, variants, image_url } = product || {};
                                const productVariants = variants || [];
                                const finalImageUrl = image_url && image_url.trim() !== ""
                                    ? image_url
                                    : 'https://dummyimage.com/550x700/f5f5f5/000';

                                const activeIndex = selectedVariantIndexes[id] ?? 0;
                                const activeVariant = productVariants.length > 0 ? productVariants[activeIndex] || productVariants[0] : null;

                                if (!activeVariant) return null;

                                const cartItem = {
                                    id: id,
                                    name: name,
                                    variant: activeVariant,
                                    quantity: quantities[id] ?? 1,
                                };

                                return (
                                    <div key={id} className="relative group">
                                        <div className="bg-white rounded-xl shadow-xs hover:shadow-md transition duration-200 p-4 flex flex-col justify-between h-full border border-gray-100">
                                            <div>
                                                <div className="relative overflow-hidden rounded-lg mb-3">
                                                    <Link to={`/products/${id}`}>
                                                        <img src={finalImageUrl} alt={name} className="w-full h-44 object-cover group-hover:scale-105 transition duration-300" />
                                                    </Link>

                                                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">
                                                        {computedCategory}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between bg-gray-100 rounded-md p-1 mb-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 shadow-2xs hover:bg-gray-50 active:scale-95 transition"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </button>

                                                    <span className="text-sm font-semibold text-gray-700 w-8 text-center select-none">
                                                        {quantities[id] ?? 1}
                                                    </span>

                                                    <button
                                                        onClick={() => handleQuantityChange(id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 shadow-2xs hover:bg-gray-50 active:scale-95 transition"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </button>
                                                </div>

                                                <h2 className="category-heading font-semibold text-gray-800 mb-1 text-sm hover:text-primary transition">
                                                    <Link to={`/products/${id}`}>
                                                        {name}
                                                    </Link>
                                                </h2>

                                                <div className="flex items-baseline justify-between gap-1 mt-2 mb-3 bg-gray-50/50 p-2 rounded-md">
                                                    <p className="mb-0 font-bold text-gray-900 text-base">
                                                        ₹{activeVariant.price}
                                                    </p>
                                                    <p className="mb-0 text-xs text-gray-500 font-medium">
                                                        {(() => {
                                                            const { formattedPrice, label } = getWeightDisplayDetails(activeVariant?.weight, activeVariant?.price);
                                                            return <span>₹{formattedPrice}/{label}</span>;
                                                        })()}
                                                    </p>
                                                </div>

                                                {/* Variant Pill Selections Pack sizes */}
                                                <ul className="flex gap-1.5 flex-wrap my-3 min-h-[1.75rem]">
                                                    {productVariants.map((v, idx) => (
                                                        <li
                                                            key={idx}
                                                            className={`cursor-pointer px-2 py-0.5 rounded-sm text-[11px] border transition font-medium ${
                                                                idx === activeIndex
                                                                    ? 'bg-primary text-white border-primary'
                                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                            onClick={() => handleVariantSelect(id, idx)}
                                                        >
                                                            {v.weight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Controls Box Footer layout anchored to lower boundary card */}
                                            <div className="mt-auto space-y-2.5 pt-2 border-t border-gray-50">
                                                <button 
                                                    onClick={() => dispatch(addToCart(cartItem))} 
                                                    className="w-full bg-primary hover:bg-secondary text-white text-xs font-semibold py-2.5 rounded-md shadow-xs active:scale-[0.99] transition cursor-pointer"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductsList;