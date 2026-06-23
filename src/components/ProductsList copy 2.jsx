import React, { useState } from 'react'

import { Products } from '../data'
import slide1 from '../assets/slider1.jpg'
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductsList = () => {

    const dispatch = useDispatch();

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

    const productSample = {
        id: 1,
        name: 'Almonds',
        quantity: 1,
        variant: { weight: '250g', price: 200, originalPrice: 250 },

    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-6'>

            {Products.map((product) => {
                const activeIndex = selectedVariantIndexes[product.id] ?? 0;
                const activeVariant = product.variants[activeIndex] || product.variants[0];

                const cartItem = {
                    id: product.id,
                    name: product.name,
                    variant: activeVariant,
                    quantity: quantities[product.id] ?? 1,
                };

                return (
                    <div key={product.id}>
                        <div className='prod-box bg-white rounded-lg shadow-md p-4'>
                            <div className='product-pic'>
                                <Link to={`/products/${product.id}`}>
                                    <img src='https://dummyimage.com/550x700/f5f5f5/000' alt='product' className='w-full object-cover rounded-md' />
                                </Link>
                                <div className="prod-counter flex items-center mt-3">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="prod-action"
                                        aria-label={`Decrease quantity of ${product.name}`}
                                    >
                                        <RemoveIcon />
                                    </button>

                                    <input type="text" value={quantities[product.id] ?? 1} onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: parseInt(e.target.value) || 1 }))}
                                        className="bg-white px-4 py-1 border border-gray-300 text-center max-w-[75px]" />

                                    <button
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="prod-action"
                                        aria-label={`Increase quantity of ${product.name}`}
                                    >
                                        <AddIcon />
                                    </button>
                                </div>



                                <button onClick={() => dispatch(addToCart(cartItem))} className='bg-primary prod-add px-4 py-2 mt-4 transition'>Add to Cart</button>
                            </div>

                            <h2 className='category-heading mb-4'>
                                <Link to={`/products/${product.id}`}>
                                    {product.name}
                                </Link>
                            </h2>
                            {/* <p className='text-gray-600 mt-2'>{product.category}</p> */}

                            <div className='flex items-center gap-4 mt-2'>

                                <p className='product-price'>₹{activeVariant.price}
                                    <span className='line-through text-gray-500 ml-2'>₹{activeVariant.originalPrice}</span>
                                </p>

                                <p className='mb-1 text-gray-600'>₹{Math.round((activeVariant.price / parseInt(activeVariant.weight)) * 1000)} / kg</p>
                            </div>
                            <ul className='mt-2 flex space-x-2 flex-wrap'>
                                {product.variants.map((variant, idx) => (
                                    <li
                                        key={variant.id}
                                        className={`varient ${idx === activeIndex
                                            ? 'bg-secondary text-white'
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

export default ProductsList
