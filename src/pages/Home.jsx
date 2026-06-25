import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { A11y, Pagination } from 'swiper/modules';
import slide1 from '../assets/slider1.jpg'
import Categories, { Products } from '../data'
import ProductsList from '../components/ProductsList';
import BlogListing from '../components/BlogsListing';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <img src={slide1} alt='slide' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide1} alt='slide' />
                </SwiperSlide>
            </Swiper>


            <section className='container'>
                <h1 className='section-heading'>Shop By Category</h1>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-6'>
                    {Categories.map((category) => (
                        <div className='category-box border border-gray-300 text-center p-4' key={category.id}>
                            <img src={slide1} alt='category' className='w-full h-48 object-cover mb-4' />
                            <h2 className='category-heading'>{category.category}</h2>
                        </div>
                    ))}
                </div>

                <div className='text-center'>
                    <Link to='/products' className='btn mt-6 bg-primary px-4 py-2 rounded'>View All Categories</Link>
                </div>
            </section>

            <section className='container mt-12'>
                <h1 className='section-heading'>Featured Products</h1>
                <ProductsList limit={4} />

                <div className='text-center'>
                    <Link to='/products' className='btn mt-6 bg-primary px-4 py-2 rounded'>View All Products</Link>
                </div>
            </section>

            {/* <section className='container mt-12'>
                <h1 className='section-heading'>Latest Blogs</h1>
                <p className='text-gray-600 mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <BlogListing />
            </section> */}
        </>
    )
}

export default Home
