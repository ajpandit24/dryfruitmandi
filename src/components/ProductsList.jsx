import React, { useEffect, useState } from 'react'
import slide1 from '../assets/slider1.jpg'
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Loader from './Loader';

const ProductsList = ( props ) => {
    const { limit, tabs } = props;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Tracks raw categories array from API
    const [selectedCategory, setSelectedCategory] = useState('All'); // Current filter state
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                // Pointing directly to your clean custom Node.js Express API
                const response = await fetch(`${API_URL}/products`);
                const json = await response.json();
                
                // Saving both parts of your node response payload
                setProducts(json.products || []);
                setCategories(json.categories || []);
            } catch (error) {
                console.error("Error fetching products from Node backend:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array prevents loops

    const [selectedVariantIndexes, setSelectedVariantIndexes] = useState({});
    const [quantities, setQuantities] = useState({});

    const handleVariantSelect = (productId, index) => {
        setSelectedVariantIndexes((prev) => ({
            ...prev,
            [productId]: index,
        }));
    };

    const handleQuantityChange = (productId, delta) => {
        setQuantities((prev) => {
            const current = prev[productId] ?? 1;
            return {
                ...prev,
                [productId]: Math.max(1, current + delta),
            };
        });
    };

    const getWeightInGrams = (weight) => {
        if (!weight) return 1000; // Fallback to avoid Division by Zero errors
        const value = parseFloat(weight);
        const unit = weight.toLowerCase();
        return unit.includes('kg') ? value * 1000 : value;
    };

    // Filter computation layer run on every component render
    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const displayProducts = typeof limit === 'number' && limit > 0
        ? filteredProducts.slice(0, limit)
        : filteredProducts;

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            
            {/* --- CATEGORY FILTER TABS ROW --- */}

            {tabs && (
                <div className="flex gap-2 mb-6 overflow-x-auto py-2 border-b border-gray-100">
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap text-sm ${
                            selectedCategory === 'All' 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    All Items
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap text-sm ${
                            selectedCategory === cat 
                                ? 'bg-emerald-600 text-white shadow-sm' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            )}
            

            {/* --- PRODUCTS GRID LAYER --- */}
            {isLoading ? (
                <Loader message="Loading products..." />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-2'>
                    {displayProducts.map((product) => {
                    // Stripped out Strapi data/attributes nesting. Reading directly from flat object keys.
                    const { id, name, category, variants, image_url } = product || {};

                    const productVariants = variants || [];
                    const finalImageUrl = image_url && image_url.trim() !== ""
                        ? image_url
                        : 'https://dummyimage.com/550x700/f5f5f5/000';

                    const activeIndex = selectedVariantIndexes[id] ?? 0;
                    const activeVariant = productVariants.length > 0 ? productVariants[activeIndex] || productVariants[0] : null;

                    // Skip execution safely if row processing isn't ready
                    if (!activeVariant) return null;

                    const cartItem = {
                        id: id,
                        name: name,
                        variant: activeVariant,
                        quantity: quantities[id] ?? 1,
                    };

                    return (
                        <div key={id} className="relative">
                            <div className='prod-box bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full border border-gray-100'>
                                <div className='product-pic relative'>
                                    <Link to={`/products/${id}`}>
                                        <img src={finalImageUrl} alt={name} className='w-full h-48 object-cover rounded-md mb-2' />
                                    </Link>
                                    
                                    {/* Small floating category badge */}
                                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">
                                        {category}
                                    </span>

                                    <div className="prod-counter flex items-center mt-3">
                                        <button
                                            onClick={() => handleQuantityChange(id, -1)}
                                            className="prod-action"
                                            aria-label={`Decrease quantity of ${name}`}
                                        >
                                            <RemoveIcon />
                                        </button>

                                        <input
                                            type="text"
                                            value={quantities[id] ?? 1}
                                            onChange={(e) => setQuantities((prev) => ({ ...prev, [id]: parseInt(e.target.value) || 1 }))}
                                            className="bg-white px-4 py-1 border border-gray-300 text-center max-w-[75px]"
                                        />

                                        <button
                                            onClick={() => handleQuantityChange(id, 1)}
                                            className="prod-action"
                                            aria-label={`Increase quantity of ${name}`}
                                        >
                                            <AddIcon />
                                        </button>
                                    </div>

                                    <button onClick={() => dispatch(addToCart(cartItem))} className='w-full btn bg-secondary py-2 rounded cursor-pointer'>
                                        Add to Cart
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <h2 className='category-heading font-semibold text-gray-800 line-clamp-1 mb-1 text-base'>
                                        <Link to={`/products/${id}`} className="hover:text-emerald-600 transition">
                                            {name}
                                        </Link>
                                    </h2>

                                    <div className='flex items-baseline justify-between gap-2 mt-2'>
                                        <p className='product-price font-bold text-gray-900 text-lg'>
                                            {/* Accessing keys matched directly via csv map keys */}
                                            ₹{activeVariant.price}
                                            {activeVariant.original_price && (
                                                <span className='line-through font-normal text-xs text-gray-400 ml-2'>₹{activeVariant.original_price}</span>
                                            )}
                                        </p>
                                        <p className='text-xs text-gray-400 font-medium'>
                                            ₹{Math.round((activeVariant.price / getWeightInGrams(activeVariant.weight)) * 1000)}/kg
                                        </p>
                                    </div>

                                    {/* Variant Pill Selections */}
                                    <ul className='mt-3 flex gap-1.5 flex-wrap'>
                                        {productVariants.map((v, idx) => (
                                            <li
                                                key={idx}
                                                className={`cursor-pointer px-2 py-1 rounded text-xs tracking-wide transition border font-medium ${
                                                    idx === activeIndex
                                                        ? 'bg-primary border-primary text-white'
                                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                }`}
                                                onClick={() => handleVariantSelect(id, idx)}
                                            >
                                                {v.weight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
            )}
        </div>
    )
}

export default ProductsList;