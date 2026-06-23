import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div>
            <footer className="bg-primary border-t-2 border-secondary w-full pt-16 pb-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-gutter px-margin-desktop max-w-max-width mx-auto">
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
                            <h4 className="ftr-head">Collection</h4>
                            <ul className="space-y-3">
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Hand-Picked Nuts</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Sun-Dried Fruits</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Gourmet Mixes</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Heritage Gifting</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="ftr-head">Company</h4>
                            <ul className="space-y-3">
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Sustainability Report</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Wholesale</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Shipping &amp; Returns</a></li>
                                <li><a className="font-body-md text-on-primary-fixed-variant hover:text-secondary-fixed hover:translate-x-1 inline-block transition-transform duration-200 hover:underline underline-offset-4" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <h4 className="ftr-head">Stay Updated</h4>
                            <p className="font-body-md text-on-primary-fixed-variant mb-6">Receive seasonal harvest updates and festive recipes.</p>
                            <div className="flex shadow-2xl">
                                <input className="bg-white border-none rounded-l-lg w-full focus:ring-0 text-primary text-sm px-4" placeholder="Email address" type="email" />
                                <button className="bg-secondary text-primary px-6 py-3 rounded-r-lg hover:bg-secondary-fixed transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined" data-icon="send">Send</span>
                                </button>
                            </div>
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
