import React from 'react'

const ShippingPolicy = () => {
    

    return (
        <div>
            <div className="container policy py-8">
                <p>Last Updated: May 2026</p>

                <p>
                    At <strong>Dry Fruits Mundi</strong>, we are committed to delivering
                    premium-quality dry fruits, spices, food products, and grocery essentials
                    safely and efficiently to our customers across India.
                </p>

                <h2 className='text-xl font-bold pb-4'>Order Processing</h2>

                <ul className="list-disc list-inside mb-8">
                    <li>
                        Orders are processed within <strong>1–2 business days</strong> after
                        payment confirmation.
                    </li>
                    <li>
                        Orders placed on Sundays or public holidays will be processed on the next
                        working day.
                    </li>
                    <li>
                        During festive seasons, sales events, or high-demand periods, processing
                        may take slightly longer.
                    </li>
                </ul>

                <h2 className='text-xl font-bold pb-4'>Shipping Coverage</h2>

                <p>
                    We currently ship across <strong>India</strong> through trusted courier and
                    logistics partners.
                </p>

                <h2>Minimum Order Value</h2>

                <ul className="list-disc list-inside mb-8">
                    <li>
                        We accept orders with a minimum cart value of <strong>₹2,000</strong>.
                    </li>
                </ul>

                <h2 className='text-xl font-bold pb-4'>Delivery Timeline</h2>

                <p>Estimated delivery timelines:</p>

                <div className="TyagGW_tableContainer">
                    <div
                        className="group TyagGW_tableWrapper w-fit"
                        tabIndex={-1}
                    >
                        <table className="table mb-4 w-fit min-w-(--thread-content-width)">
                            <thead>
                                <tr>
                                    <th className='pe-4 text-left'>Location</th>
                                    <th>Estimated Delivery Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='pe-4'>Mumbai &amp; Navi Mumbai</td>
                                    <td>1–3 Business Days</td>
                                </tr>
                                <tr>
                                    <td className='pe-4'>Maharashtra</td>
                                    <td>2–5 Business Days</td>
                                </tr>
                                <tr>
                                    <td className='pe-4'>Major Metro Cities</td>
                                    <td>3–7 Business Days</td>
                                </tr>
                                <tr>
                                    <td className='pe-4'>Other Locations in India</td>
                                    <td>4–10 Business Days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p>
                    Delivery timelines may vary depending on courier service availability,
                    weather conditions, remote locations, or unforeseen circumstances.
                </p>

                <h2 className='text-xl font-bold pb-4'>Shipping Charges</h2>

                <ul className="list-disc list-inside mb-8">
                    <li>
                        Shipping charges will be calculated during checkout based on order value,
                        weight, and delivery location.
                    </li>
                    <li>
                        Promotional free shipping offers, if applicable, will be displayed on the
                        website.
                    </li>
                </ul>

                <h2 className='text-xl font-bold pb-4'>Order Tracking</h2>

                <p>Once your order is shipped, tracking details will be shared via:</p>

                <ul className="list-disc list-inside mb-8">
                    <li>Email</li>
                    <li>SMS</li>
                    <li>WhatsApp (where applicable)</li>
                </ul>

                <p>
                    Customers can use the tracking number to monitor their shipment status.
                </p>

                <h2 className='text-xl font-bold pb-4'>Packaging</h2>

                <p>
                    All products are packed carefully to maintain freshness, quality, and
                    hygiene standards during transit.
                </p>

                <h2 className='text-xl font-bold pb-4'>Delayed or Failed Deliveries</h2>

                <p>Delivery may be delayed due to:</p>

                <ul className="list-disc list-inside mb-8">
                    <li>Incorrect shipping address</li>
                    <li>Customer unavailable during delivery attempts</li>
                    <li>Natural disasters, strikes, or logistics disruptions</li>
                    <li>Government restrictions or unforeseen events</li>
                </ul>

                <p>
                    In such cases, our team will coordinate with the courier partner to resolve
                    the issue.
                </p>

                <h2 className='text-xl font-bold pb-4'>Damaged or Missing Items</h2>

                <p>If you receive:</p>

                <ul className="list-disc list-inside mb-8">
                    <li>A damaged package</li>
                    <li>A tampered package</li>
                    <li>Missing items</li>
                </ul>

                <p>
                    Please contact us within <strong>24 hours of delivery</strong> with:
                </p>

                <ul className="list-disc list-inside mb-8">
                    <li>Order Number</li>
                    <li>Product Photos</li>
                    <li>Package Photos</li>
                </ul>

                <p>Our team will investigate and provide a suitable resolution.</p>

                <h2 className='text-xl font-bold pb-4'>Incorrect Shipping Information</h2>

                <p>
                    Customers are responsible for providing accurate shipping details. Dry
                    Fruits Mandy shall not be responsible for delays or non-delivery caused by
                    incorrect addresses or contact information provided by the customer.
                </p>

                <h2 className='text-xl font-bold pb-4'>Contact Us</h2>

                <p>For shipping-related queries, contact:</p>

                <p>
                    <strong>Dry Fruits Mandy</strong>
                    <br />
                    <img
                        draggable={false}
                        role="img"
                        className="emoji"
                        alt="📞"
                        src="https://s.w.org/images/core/emoji/17.0.2/svg/1f4de.svg"
                    />{" "}
                    +91 7208607196
                    <br />
                    <img
                        draggable={false}
                        role="img"
                        className="emoji"
                        alt="📧"
                        src="https://s.w.org/images/core/emoji/17.0.2/svg/1f4e7.svg"
                    />{" "}
                    <a
                        href="mailto:info@dryfruitsmandy.com"
                        className="decorated-link cursor-pointer"
                        rel="noopener noreferrer"
                    >
                        info@dryfruitsmandy.com
                    </a>
                    <br />
                    <img
                        draggable={false}
                        role="img"
                        className="emoji"
                        alt="📍"
                        src="https://s.w.org/images/core/emoji/17.0.2/svg/1f4cd.svg"
                    />{" "}
                    J-20, APMC Market-1, Mudi Bazar, Vashi, Turbhe, Navi Mumbai – 400705
                </p>
            </div>
        </div>
    )
}

export default ShippingPolicy
