import React, { useEffect, useState } from 'react'
import slide1 from '../assets/slider1.jpg'
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // FIX 1: Appended '?populate=*' to the URL so Strapi returns the nested component data
                const response = await fetch(`${import.meta.env.VITE_ADMIN_API_URL}/products?populate=*`);
                const json = await response.json();
                setProducts(json.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
        console.log("Products fetched:", products);
    }, [products.length]); // Added products.length to dependency array to avoid infinite loop while still allowing re-fetch if products change

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

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-6'>
            {products.map((product) => {
                // FIX 2: Strapi structures data inside an attributes object. We destructure it safely here.
                const { name, variant, image } = product || {};

                // Provide a safe array fallback if variants are still compiling or empty
                const productVariants = variant || [];
                const strapiImageUrl = image[0]?.url
                    ? `${import.meta.env.VITE_STRAPI_URL}${image[0].url}`
                    : 'https://dummyimage.com/550x700/f5f5f5/000';

                const activeIndex = selectedVariantIndexes[product.id] ?? 0;
                const activeVariant = productVariants.length > 0 ? productVariants[activeIndex] || productVariants[0] : null;

                const cartItem = {
                    id: product.id,
                    name: name, // Uses destructured name
                    variant: activeVariant,
                    quantity: quantities[product.id] ?? 1,
                };

                // Guard against rendering if data properties aren't loaded yet
                if (!activeVariant) return null;

                const getWeightInGrams = (weight) => {
                    const value = parseFloat(weight);
                    const unit = weight.toLowerCase();

                    return unit.includes('kg') ? value * 1000 : value;
                };

                return (
                    <div key={product.id}>
                        <div className='prod-box bg-white rounded-lg shadow-md p-4'>
                            <div className='product-pic'>
                                <Link to={`/products/${product.id}`}>
                                    <img src={strapiImageUrl} alt='product' className='w-full object-cover rounded-md' />
                                </Link>
                                <div className="prod-counter flex items-center mt-3">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="prod-action"
                                        aria-label={`Decrease quantity of ${name}`}
                                    >
                                        <RemoveIcon />
                                    </button>

                                    <input
                                        type="text"
                                        value={quantities[product.id] ?? 1}
                                        onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: parseInt(e.target.value) || 1 }))}
                                        className="bg-white px-4 py-1 border border-gray-300 text-center max-w-[75px]"
                                    />

                                    <button
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="prod-action"
                                        aria-label={`Increase quantity of ${name}`}
                                    >
                                        <AddIcon />
                                    </button>
                                </div>

                                <button onClick={() => dispatch(addToCart(cartItem))} className='bg-primary prod-add px-4 py-2 mt-4 transition'>
                                    Add to Cart
                                </button>
                            </div>

                            <h2 className='category-heading mb-4'>
                                <Link to={`/products/${product.id}`}>
                                    {name}
                                </Link>
                            </h2>



                            <div className='flex items-center gap-4 mt-2'>

                                <p className='product-price'>₹{activeVariant.price}
                                    {activeVariant.originalPrice && (
                                        <span className='line-through text-gray-500 ml-2'>₹{activeVariant.originalPrice}</span>
                                    )}
                                </p>
                                <p className='mb-1 text-gray-600'>
                                    ₹{Math.round((activeVariant.price / getWeightInGrams(activeVariant.weight)) * 1000)} / kg</p>
                            </div>

                            <ul className='mt-2 flex space-x-2 flex-wrap'>
                                {productVariants.map((variant, idx) => (
                                    <li
                                        key={variant.id || idx}
                                        className={`varient cursor-pointer px-2 py-1 rounded text-sm ${idx === activeIndex
                                            ? 'bg-secondary text-white font-semibold'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        onClick={() => handleVariantSelect(product.id, idx)}
                                    >
                                        {variant.weight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                );
            })}
        </div>
    )
}

export default ProductsList;