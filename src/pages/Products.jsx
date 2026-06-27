import React from 'react'
import ProductsList from '../components/ProductsList'

const Products = () => {
  return (
    <section className='container'>
      <ProductsList tabs={true} gridColumns={3} />
    </section>
  )
}

export default Products
