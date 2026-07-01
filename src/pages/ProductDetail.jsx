import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import slide1 from '../assets/slider1.jpg';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedVariantIndexes, setSelectedVariantIndexes] = useState({});

    const [quantities, setQuantities] = useState({});
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Ensure this resolves cleanly to your API endpoint prefix (e.g., http://localhost:5000/api)
    const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

    const productId = id; // Store raw string value to match backend parameter matrix types safely

    const handleVariantSelect = (prodId, index) => {
        setSelectedVariantIndexes((prev) => ({
            ...prev,
            [prodId]: index,
        }));
    };

    const handleQuantityChange = (prodId, delta) => {
        setQuantities((prev) => {
            const current = prev[prodId] ?? 1;
            return {
                ...prev,
                [prodId]: Math.max(1, current + delta),
            };
        });
    };

    useEffect(() => {
        let mounted = true;
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch directly from our new targeted single item details route
                const res = await fetch(`${API_URL}/products/${productId}`);
                
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Product not found in system catalogs.');
                    throw new Error('Network response failure.');
                }
                
                const json = await res.json();
                
                if (mounted) {
                    // Pull data tree cleanly out of backend JSON wrapper payload
                    setProduct(json.data || null);
                }
            } catch (err) {
                console.error('Failed to load product:', err);
                if (mounted) setError(err.message || 'Could not load product.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
        return () => { mounted = false; };
    }, [productId, API_URL]);

    const activeIndex = selectedVariantIndexes[productId] ?? 0;
    const activeVariant = product?.variants?.[activeIndex] || product?.variants?.[0] || null;
    const finalImageUrl = product?.image_url || slide1;

    if (isLoading) {
        return (
            <section className='container py-12'>
                <div className='text-center text-gray-600 font-medium'>Loading product specifications...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='container py-12'>
                <div className='text-center text-red-600 font-semibold'>{error}</div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className='container py-12'>
                <div className='text-center text-gray-600'>Product profile not found.</div>
            </section>
        );
    }

    return (
        <section className='container mx-auto px-4 py-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
                {/* IMAGE COLUMN */}
                <div className='flex items-center justify-center bg-gray-50/50 rounded-2xl p-4 border border-gray-100'>
                    <img src={finalImageUrl} alt={product?.name || 'product'} className='max-h-[500px] object-contain rounded-xl shadow-xs' />
                </div>

                {/* DETAILS COLUMN */}
                <div className='flex flex-col justify-center'>
                    <span className='text-xs uppercase tracking-wider text-emerald-600 font-bold mb-1'>{product?.category}</span>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>{product?.name}</h1>
                    <p className='text-gray-600 text-sm leading-relaxed mb-4'>{product?.description || 'Premium quality selection sourced fresh daily.'}</p>

                    <p className='text-xl font-bold text-gray-900 mb-4'>
                        Price: ₹{activeVariant?.price ?? 0}
                        {activeVariant?.originalPrice && (
                            <span className='line-through text-sm font-medium text-gray-400 ml-2.5'>₹{activeVariant.originalPrice}</span>
                        )}
                    </p>

                    {/* VARIANTS PICKER */}
                    <div className='mb-4'>
                        <p className='text-sm font-semibold text-gray-700 mb-2'>Available Weights:</p>
                        <ul className='flex items-center space-x-2 flex-wrap gap-y-2'>
                            {product?.variants?.map((variant, idx) => (
                                <li
                                    key={variant.weight || idx}
                                    className={`px-4 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition ${idx === activeIndex
                                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                    onClick={() => handleVariantSelect(productId, idx)}
                                >
                                    {variant.weight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* QUANTITY PICKER */}
                    <div className="flex items-center mt-2 mb-6">
                        <button
                            onClick={() => handleQuantityChange(productId, -1)}
                            className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-l-lg hover:bg-gray-100 font-bold text-gray-600 transition"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>

                        <input 
                            type="text" 
                            value={quantities[productId] ?? 1} 
                            onChange={(e) => setQuantities((prev) => ({ ...prev, [productId]: parseInt(e.target.value, 10) || 1 }))}
                            className="w-14 py-1.5 border-t border-b border-gray-200 text-center text-sm font-semibold focus:outline-none" 
                        />

                        <button
                            onClick={() => handleQuantityChange(productId, 1)}
                            className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-r-lg hover:bg-gray-100 font-bold text-gray-600 transition"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    {/* ACTIONS */}
                    <div>
                        <button
                            onClick={() => {
                                if (!product || !activeVariant) return;
                                const cartItem = {
                                    id: product.id,
                                    name: product.name,
                                    variant: activeVariant,
                                    quantity: quantities[productId] ?? 1,
                                    image_url: finalImageUrl
                                };
                                dispatch(addToCart(cartItem));
                            }}
                            className='w-full cursor-pointer sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-xs transition'
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;