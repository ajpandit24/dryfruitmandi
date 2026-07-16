import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className="footer-top bg-secondary border-secondary w-full pt-4 pb-2">
                <div className="footer-note container">

                    <p className='text-center'><b> Shopkeer, trader, hotel, restaurant & caterers can purchase from this website, FSSAI number compulsory to purchase, <br /> for more details read terms & conditions below</b></p>
                </div>
            </div>  

            <footer className="bg-primary border-t-2 border-secondary w-full pt-16 pb-8">
                <div className="container mx-auto">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-gutter px-margin-desktop max-w-max-width mx-auto">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="font-display-lg text-headline-md text-secondary-fixed mb-6">
                                <img src={logo} alt="" className='ftr-logo' />
                            </h3>
                            <p className="font-body-md text-on-primary-fixed-variant mb-8 max-w-xs">Nurturing the earth, harvesting the soul. Join us in the pursuit of pure, organic artisanal quality.</p>
                            {/* <div className="flex space-x-4">
                            <a className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:scale-110 transition-all" href="#"><span className="material-symbols-outlined" data-icon="language">language</span></a>
                            <a className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:scale-110 transition-all" href="#"><span className="material-symbols-outlined" data-icon="link">link</span></a>
                        </div> */}
                        </div>
                        <div>
                            <h4 className="ftr-head">INFORMATION</h4>
                            <ul className="space-y-3">
                                <li><Link to="/about" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">About Us</Link></li>
                                <li><Link to="/privacy-policy" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">Privacy Policy</Link></li>
                                <li><Link to="/shipping-policy" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">Shipping Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="ftr-head">CUSTOMER SERVICE</h4>
                            <ul className="space-y-3">
                                <li><Link to="/sustainability-report" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">Contact Us</Link></li>
                                <li><Link to="/terms-conditions" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">Terms & Conditions</Link></li>
                                <li><Link to="/refund-policy" className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4">Returns Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <h4 className="ftr-head">CONTACT US</h4>
                            <ul className="space-y-3">
                                <li>K-53, Mudi Bazar, Phase-II Market-1, Sector-19,<br />
                                    Vashi APMC, Navi Mumbai - 400703<br /></li>
                                <li>Phone: 720860 7196</li>
                                <li>Email: <a href="mailto:info@dryfruitsmandi.com" className="text-secondary-fixed hover:text-primary-fixed">info@dryfruitsmandi.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-max-width mx-auto px-margin-desktop mt-16 pt-8 border-t border-on-primary/10 text-center">
                        <p className="mb-0 font-label-sm text-on-primary-fixed-variant opacity-60">© 2026 Dry Fruits Mandi. All Rights Reserved.</p>
                    </div>

                </div>
            </footer>
        </div>
    )
}

export default Footer
