
import React, { useState } from 'react'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);


    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 font-bold text-2xl text-orange-600">
                        <img src={logo} alt="DryFruits Mandi" className='logo' />
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 space-x-8">
                        
                            {/* Navigation */}
                            <nav className='flex gap-6'>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}>
                                    Home
                                </NavLink>
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}>
                                    About
                                </NavLink>
                                
                                <NavLink to="/products" className={({ isActive }) => isActive ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}>
                                    Products
                                </NavLink>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}>
                                    Contact
                                </NavLink>
                            </nav>

                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 w-40" />
                            <Search className="absolute right-2 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                        <Link to="/cart" className="relative">
                            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition" />
                            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.totalItems}
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <a href="#" className="block text-gray-700 hover:text-orange-600 py-2">Home</a>
                        <a href="#" className="block text-gray-700 hover:text-orange-600 py-2">Products</a>
                        <a href="#" className="block text-gray-700 hover:text-orange-600 py-2">About</a>
                        <a href="#" className="block text-gray-700 hover:text-orange-600 py-2">Contact Us</a>
                        <input type="text" placeholder="Search..." className="w-full bg-gray-100 px-4 py-2 rounded-lg mt-2" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
