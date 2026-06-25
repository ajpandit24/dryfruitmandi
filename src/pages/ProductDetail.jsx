import React, { useState } from 'react'
// product will be loaded from API instead of local data
import { useParams } from 'react-router-dom'
import slide1 from '../assets/slider1.jpg'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'


const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedVariantIndexes, setSelectedVariantIndexes] = useState({});

    const [quantities, setQuantities] = useState({});
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

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
    const productId = parseInt(id, 10);

    React.useEffect(() => {
        let mounted = true;
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_URL}/products`);
                const json = await res.json();
                const found = (json.products || []).find((p) => Number(p.id) === productId);
                if (mounted) setProduct(found || null);
            } catch (err) {
                console.error('Failed to load product:', err);
                if (mounted) setError('Could not load product.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        fetchProduct();
        return () => { mounted = false; };
    }, [productId, API_URL]);

    const activeIndex = selectedVariantIndexes[productId] ?? 0;
    const activeVariant = product?.variants?.[activeIndex] || product?.variants?.[0] || null;

    const finalImageUrl = product?.image_url || slide1; // Fallback to slide1 if no image_url is provided

    if (isLoading) {
        return (
            <section className='container py-12'>
                <div className='text-center text-gray-600'>Loading product...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='container py-12'>
                <div className='text-center text-red-600'>{error}</div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className='container py-12'>
                <div className='text-center text-gray-600'>Product not found.</div>
            </section>
        );
    }

    return (

        <section className='container'>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div>
                    <img src={finalImageUrl} alt={product?.name || 'product'} className='w-full object-cover rounded-md' />
                </div>

                <div>

                    <h1 className='section-heading'>{product?.name}</h1>
                    <p>{product?.description}</p>

                    <p className='product-price'>Price: ₹{activeVariant?.price ?? 0}
                        <span className='line-through text-gray-500 ml-2'>₹{activeVariant?.originalPrice ?? ''}</span>
                    </p>
                   

                    <ul className='mt-2 flex items-center space-x-2 flex-wrap'>
                         <p className='mb-0'>Available Variants:</p> &nbsp;
                        {product?.variants?.map((variant, idx) => (
                            <li
                                key={variant.id}
                                className={`varient ${idx === activeIndex
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => handleVariantSelect(productId, idx)}
                            >
                                {variant.weight}
                            </li>
                        ))}
                    </ul>


                    <div className="flex items-center mt-3">
                        <button
                            onClick={() => handleQuantityChange(productId, -1)}
                            className="px-3 py-1 border bg-gray-200 rounded-l hover:bg-gray-300"
                            aria-label={`Decrease quantity of ${product?.name}`}
                        >
                            -
                        </button>

                        {/* <div className="px-4 py-1 border-t border-b text-center min-w-[48px]">
                                {quantities[product.id] ?? 1}
                            </div> */}

                        <input type="text" value={quantities[productId] ?? 1} onChange={(e) => setQuantities((prev) => ({ ...prev, [productId]: parseInt(e.target.value) || 1 }))}
                            className="px-4 py-1 border-t border-b text-center max-w-[75px]" />

                        <button
                            onClick={() => handleQuantityChange(productId, 1)}
                            className="px-3 py-1 border bg-gray-200 rounded-r hover:bg-gray-300"
                            aria-label={`Increase quantity of ${product?.name}`}
                        >
                            +
                        </button>

                        
                    </div>

                    <button
                        onClick={() => {
                            if (!product || !activeVariant) return;
                            const cartItem = {
                                id: product.id,
                                name: product.name,
                                variant: activeVariant,
                                quantity: quantities[productId] ?? 1,
                            };
                            dispatch(addToCart(cartItem));
                        }}
                        className='bg-primary text-white px-4 py-2 rounded mt-4 transition'
                    >Add to Cart</button>

                </div>

                {/* Display product images or other details here */}


            </div>

        </section>
    )
}

export default ProductDetail
