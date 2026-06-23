import React, { useState } from 'react'
import { Products } from '../data'
import { useParams } from 'react-router-dom'
import slide1 from '../assets/slider1.jpg'


const ProductDetail = () => {
    const { id } = useParams();
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
    const product = Products.find((p) => p.id === parseInt(id));

    const activeIndex = selectedVariantIndexes[id] ?? 0;
    const activeVariant = product.variants[activeIndex] || product.variants[0];

    return (

        <section className='container'>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div>
                    <img src='https://dummyimage.com/550x700/f5f5f5/000' alt='product' className='w-full object-cover rounded-md' />
                </div>

                <div>

                    <h1 className='section-heading'>{product?.name}</h1>
                    <p>{product?.description}</p>

                    <p className='product-price'>Price: ₹{activeVariant.price}
                        <span className='line-through text-gray-500 ml-2'>₹{activeVariant.originalPrice}</span>
                    </p>
                   

                    <ul className='mt-2 flex items-center space-x-2 flex-wrap'>
                         <p className='mb-0'>Available Variants:</p> &nbsp;
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


                    <div className="flex items-center mt-3">
                        <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-3 py-1 border bg-gray-200 rounded-l hover:bg-gray-300"
                            aria-label={`Decrease quantity of ${product.name}`}
                        >
                            -
                        </button>

                        {/* <div className="px-4 py-1 border-t border-b text-center min-w-[48px]">
                                {quantities[product.id] ?? 1}
                            </div> */}

                        <input type="text" value={quantities[product.id] ?? 1} onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: parseInt(e.target.value) || 1 }))}
                            className="px-4 py-1 border-t border-b text-center max-w-[75px]" />

                        <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="px-3 py-1 border bg-gray-200 rounded-r hover:bg-gray-300"
                            aria-label={`Increase quantity of ${product.name}`}
                        >
                            +
                        </button>

                        
                    </div>

                    <button className='bg-primary text-white px-4 py-2 rounded mt-4 transition'>Add to Cart</button>

                </div>

                {/* Display product images or other details here */}


            </div>

        </section>
    )
}

export default ProductDetail
