import React from 'react'
import slide1 from '../assets/slider1.jpg'

const About = () => {
  return (
    <section className="container">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='col-span-2'>
          <h2>About Us</h2>
          <p>Welcome to our dry fruits store!</p>

          <p>We are passionate about providing the highest quality dry fruits to our customers. Our mission is to offer a wide variety of delicious and nutritious dry fruits sourced from trusted suppliers around the world.</p>

          <p>Whether you're looking for almonds, cashews, walnuts, or any other dry fruit, we have you covered. We take pride in our commitment to freshness and customer satisfaction.</p>
          <p>Thank you for choosing us for your dry fruit needs. We look forward to serving you!</p>

        </div>

        <div className='col-span-1'>
          <img src="https://dummyimage.com/550x400/420e57/fff" alt="About Us" />
        </div>
      </div>


    </section>
  )
}

export default About
