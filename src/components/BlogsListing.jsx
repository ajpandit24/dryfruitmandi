import React from 'react'
import { Blogs } from '../data'
import slide1 from '../assets/slider1.jpg'

const BlogListing = ({slider}) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {Blogs.map((blog) => (
                    <div className='bg-white rounded-lg shadow-md' key={blog.id}>
                        <img src={slide1} alt="" />
                        <div className='p-4'>
                            <span className='text-sm text-gray-500'>{blog.date}</span>
                            <h2 className='blog-title mb-2'>{blog.title}</h2>
                            <p className='text-gray-600'>{blog.excerpt}</p>

                            <button className='mt-4 text-primary hover:underline'>Read More ...</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BlogListing
