import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { setCategoryFilter, clearFilters } from '../redux/filterSlice';
import Loader from './Loader';

const ProductsList = (props) => {
    const { limit, tabs } = props;

    // --- STATE TRACKING ---
    const [nestedData, setNestedData] = useState({});
    const [allProductsFlat, setAllProductsFlat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination Metadata State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Extract active filters directly from Redux Store
    const { activeCategory, activeSubcategory } = useSelector(state => state.filters) || {};

    // Accordion UI tracking states for UI expansion
    const [openCategories, setOpenCategories] = useState({});

    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Ref to track the element at the bottom of the list
    const observerTarget = useRef(null);

    // ==========================================
    // EFFECT 1: FETCH CATEGORIES (FIXED DUPLICATION)
    // ==========================================
    useEffect(() => {
        const initializeCategoriesAndData = async () => {
            try {
                const response = await fetch(`${API_URL}/products?page=1&limit=500`);
                const json = await response.json();

                if (json.success && json.data) {
                    const structuralMap = {};
                    json.data.forEach(p => {
                        if (!structuralMap[p.category]) {
                            structuralMap[p.category] = {
                                category_name: p.category,
                                category_image: p.image_url,
                                subcategories: {}
                            };
                        }
                        structuralMap[p.category].subcategories[p.sub_category] = [];
                    });
                    setNestedData(structuralMap);
                }
            } catch (error) {
                console.error("Error setting up menu structure:", error);
            }
        };

        if (tabs) {
            initializeCategoriesAndData();
        }
    }, [tabs, API_URL]);

    // ==========================================
    // CORE FUNCTION: REQUEST CHUNKS FROM API
    // ==========================================
    const loadProductChunk = useCallback(async (pageNum, cat, subCat, isNewFilter = false) => {
        setIsLoading(true);
        try {
            const requestLimit = limit || 12;
            let url = `${API_URL}/products?page=${pageNum}&limit=${requestLimit}`;

            if (cat) url += `&category=${encodeURIComponent(cat)}`;
            if (subCat) url += `&subcategory=${encodeURIComponent(subCat)}`;

            const response = await fetch(url);
            const json = await response.json();

            if (json.success && json.data) {
                // Deduplicate items automatically by tracking unique product IDs
                setAllProductsFlat(prev => {
                    const incomingData = isNewFilter ? json.data : [...prev, ...json.data];

                    // Use a Map to keep only the first occurrence of any product ID
                    const uniqueMap = new Map();
                    incomingData.forEach(item => {
                        if (item && item.id) {
                            uniqueMap.set(item.id, item);
                        }
                    });

                    return Array.from(uniqueMap.values());
                });

                setHasMore(json.pagination.hasMore);

                if (isNewFilter && Object.keys(nestedData).length === 0) {
                    const structuralMap = {};
                    json.data.forEach(p => {
                        if (!structuralMap[p.category]) {
                            structuralMap[p.category] = {
                                category_name: p.category,
                                category_image: p.image_url,
                                subcategories: {}
                            };
                        }
                        structuralMap[p.category].subcategories[p.sub_category] = [];
                    });
                    setNestedData(prev => Object.keys(prev).length === 0 ? structuralMap : prev);
                }
            }
        } catch (error) {
            console.error("Error loading optimized data slice chunk:", error);
        } finally {
            setIsLoading(false);
        }
    }, [limit, API_URL, nestedData]);

    // ==========================================
    // EFFECT 2: RESET LIST WHEN FILTERS ALTER
    // ==========================================
    useEffect(() => {
        setPage(1);
        setAllProductsFlat([]);
        loadProductChunk(1, activeCategory, activeSubcategory, true);
    }, [activeCategory, activeSubcategory, loadProductChunk]);

    // ==========================================
    // EFFECT 3: INFINITE SCROLL OBSERVER
    // ==========================================
    // ==========================================
    // EFFECT 3: INFINITE SCROLL OBSERVER (FIXED DOUBLE FETCH)
    // ==========================================
    useEffect(() => {
        const target = observerTarget.current;

        // CRITICAL GUARD: Stop observer if there's nothing more to fetch,
        // if a network request is active, or if we are currently wiping/resetting the list.
        if (!target || !hasMore || isLoading || limit || allProductsFlat.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => {
                    const nextPage = prevPage + 1;
                    loadProductChunk(nextPage, activeCategory, activeSubcategory, false);
                    return nextPage;
                });
            }
        }, {
            rootMargin: '200px', // Pre-fetch next row before hitting the absolute bottom
            threshold: 0
        });

        observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [hasMore, isLoading, activeCategory, activeSubcategory, loadProductChunk, limit, allProductsFlat.length]);


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

    const toggleCategoryAccordion = (categoryName) => {
        setOpenCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-4">
            <div className={`flex flex-col md:flex-row gap-8 ${tabs ? 'items-start' : ''}`}>

                {/* --- LEFT SIDEBAR ACCORDION FILTERS --- */}
                {tabs && (
                    <div className="w-full md:w-64 bg-white border border-gray-200 rounded-xl p-4 shrink-0 shadow-xs md:sticky top-24">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 pb-3 px-1">
                            Categories
                        </h3>

                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => dispatch(clearFilters())}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${!activeCategory
                                    ? 'bg-primary text-white font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                All Items
                            </button>

                            {Object.keys(nestedData).map((catName) => {
                                const isExpanded = !!openCategories[catName];
                                const isCurrentCatActive = activeCategory === catName && !activeSubcategory;

                                return (
                                    <div key={catName} className="border-b border-gray-50 last:border-0 py-1">
                                        <div className="flex items-center justify-between w-full rounded-lg hover:bg-gray-50 pr-2">
                                            <button
                                                onClick={() => dispatch(setCategoryFilter({ category: catName, subcategory: null }))}
                                                className={`grow flex items-center gap-2 text-left px-3 py-2 text-sm font-medium transition ${isCurrentCatActive ? 'text-primary font-semibold' : 'text-gray-800'
                                                    }`}
                                            >
                                                <span>{catName}</span>
                                            </button>

                                            <button
                                                onClick={() => toggleCategoryAccordion(catName)}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                            >
                                                {isExpanded ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
                                            </button>
                                        </div>

                                        {isExpanded && (
                                            <div className="ml-4 pl-2 border-l border-gray-200 mt-1 flex flex-col gap-1">
                                                {Object.keys(nestedData[catName].subcategories || {}).map((subCatName) => {
                                                    const isCurrentSubActive = activeCategory === catName && activeSubcategory === subCatName;
                                                    return (
                                                        <button
                                                            key={subCatName}
                                                            onClick={() => dispatch(setCategoryFilter({ category: catName, subcategory: subCatName }))}
                                                            className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition ${isCurrentSubActive
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
                    {allProductsFlat.length === 0 && isLoading ? (
                        <Loader message="Loading Products..." />
                    ) : allProductsFlat.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50">
                            No products found matching the selected filter criteria.
                        </div>
                    ) : (
                        <div>
                            <div className={`grid grid-cols-2 md:grid-cols-${props.gridColumns || 3} gap-4`}>
                                {allProductsFlat.map((product, index) => {
                                    const { id, name, category, variants, image_url } = product || {};
                                    const productVariants = variants || [];
                                    const finalImageUrl = image_url && image_url.trim() !== ""
                                        ? image_url
                                        : 'https://dummyimage.com/550x700/f5f5f5/000';

                                    const activeIndex = selectedVariantIndexes[id] ?? 0;
                                    const activeVariant = productVariants.length > 0 ? productVariants[activeIndex] || productVariants[0] : null;

                                    if (!activeVariant) return null;

                                    const base = activeVariant.price || 0;
                                    const apmc = parseFloat(product.apmc || "0") / 100;
                                    const gst = parseFloat(product.gst || "0") / 100;

                                    const finalPrice = (base * (1 + apmc)) * (1 + gst);

                                    const cartItem = {
                                        id: id,
                                        name: name,
                                        variant: activeVariant,
                                        quantity: quantities[id] ?? 1,
                                        gst: product.gst || "0",
                                        apmc: product.apmc || "0",
                                        totalprice: finalPrice,
                                            // activeVariant.price + (activeVariant.price * (parseFloat(product.gst || "0") / 100)) + (activeVariant.price * (parseFloat(product.apmc || "0") / 100))
                                    };

                                    return (
                                        <div key={`${id}-${index}`} className="relative group">
                                            <div className="bg-white rounded-xl shadow-xs hover:shadow-md transition duration-200 p-4 flex flex-col justify-between h-full border border-gray-100">
                                                <div>
                                                    <div className="relative overflow-hidden rounded-lg mb-3">
                                                        <Link to={`/products/${id}`}>
                                                            <img src={finalImageUrl} alt={name} className="w-full h-44 object-cover group-hover:scale-105 transition duration-300" />
                                                        </Link>
                                                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">
                                                            {category}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between bg-gray-100 rounded-md p-1 mb-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(id, -1)}
                                                            className="w-8 h-8 flex items-center justify-center rounded bg-secondary cursor-pointer shadow-2xs active:scale-95 transition"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={quantities[id] ?? 1}
                                                            onChange={(e) => setQuantities((prev) => ({ ...prev, [id]: parseInt(e.target.value, 10) || 1 }))}
                                                            maxLength={3}
                                                            className="w-14 py-1.5 border-t border-b border-gray-200 text-center text-sm font-semibold focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange(id, 1)}
                                                            className="bg-secondary cursor-pointer w-8 h-8 flex items-center justify-center rounded shadow-2xs hover:bg-gray-50 active:scale-95 transition"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </button>
                                                    </div>

                                                    <h2 className="category-heading font-semibold text-gray-800 mb-1 text-sm hover:text-primary transition">
                                                        <Link to={`/products/${id}`}>{name}</Link>
                                                    </h2>

                                                    <div className="flex items-baseline justify-between gap-1 mt-2 mb-3 bg-gray-50/50 p-2 rounded-md">
                                                        <p className="mb-0 font-bold text-gray-900 text-base">₹{activeVariant.price}</p>
                                                        <p className="bg-primary text-white p-1 mb-0 text-xs font-medium">
                                                            {(() => {
                                                                const { formattedPrice, label } = getWeightDisplayDetails(activeVariant?.weight, activeVariant?.price);
                                                                return <span>₹{formattedPrice}/{label}</span>;
                                                            })()}
                                                        </p>
                                                    </div>

                                                    <ul className="flex gap-1.5 flex-wrap my-3 min-h-[1.75rem]">
                                                        {productVariants.map((v, idx) => (
                                                            <li
                                                                key={idx}
                                                                className={`cursor-pointer px-2 py-0.5 rounded-sm text-[11px] border transition font-medium ${idx === activeIndex
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

                                                <div className="mt-auto space-y-2.5 pt-2 border-t border-gray-50">
                                                    <button
                                                        onClick={() => dispatch(addToCart(cartItem))}
                                                        className="w-full btn-primary text-white text-xs font-semibold py-2.5 rounded-md shadow-xs active:scale-[0.99] transition cursor-pointer"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* --- INFINITE SCROLL TARGET EYE --- */}

                            <div ref={observerTarget} className="w-full flex justify-center mt-8 min-h-[40px]">
                                {isLoading && allProductsFlat.length > 0 && (
                                    <div className="text-center text-xs text-primary animate-pulse">
                                        Loading more products...
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsList;