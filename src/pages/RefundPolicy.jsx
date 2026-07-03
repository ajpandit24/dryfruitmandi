import React from 'react'

const RefundPolicy = () => {
    return (
        <div>
            <div className="policy py-4 container">
                <ul>
                    <li>
                        <p>
                            <strong>Last Updated: May 2026</strong>
                        </p>

                        <p>
                            At <strong>Dry Fruits Mandy</strong>, customer satisfaction is our
                            priority. We strive to deliver premium-quality dry fruits, spices, and
                            food products. Due to the perishable nature of many of our products, we
                            have established the following Refund and Return Policy.
                        </p>

                        <hr />

                        <h2>Returns</h2>

                        <p>We accept returns only in the following cases:</p>

                        <ul>
                            <li>Product received is damaged during transit.</li>
                            <li>Incorrect product received.</li>
                            <li>Product is missing from the order.</li>
                            <li>Product received is expired or unfit for consumption.</li>
                        </ul>

                        <p>
                            To be eligible for a return, customers must notify us within{" "}
                            <strong>24 hours of delivery</strong> and provide:
                        </p>

                        <ul>
                            <li>Order Number</li>
                            <li>Product photographs</li>
                            <li>Packaging photographs</li>
                            <li>Brief description of the issue</li>
                        </ul>

                        <p>
                            Requests made after 24 hours of delivery may not be eligible for return
                            or replacement.
                        </p>

                        <hr />

                        <h2>Non-Returnable Products</h2>

                        <p>
                            For hygiene and food safety reasons, we do not accept returns for:
                        </p>

                        <ul>
                            <li>Opened or partially consumed products</li>
                            <li>Products damaged due to improper storage by the customer</li>
                            <li>Products returned without original packaging</li>
                            <li>Products purchased during clearance or special sale offers</li>
                        </ul>

                        <hr />

                        <h2>Refunds</h2>

                        <p>
                            Once your complaint is reviewed and approved, the refund will be
                            processed.
                        </p>

                        <p>Refunds may be issued in the following situations:</p>

                        <ul>
                            <li>Product is unavailable after payment has been made.</li>
                            <li>Order is cancelled before dispatch.</li>
                            <li>Return request is approved after inspection.</li>
                        </ul>

                        <p>
                            Approved refunds will be credited to the original payment method within{" "}
                            <strong>7–10 business days</strong>.
                        </p>

                        <hr />

                        <h2>Replacement Policy</h2>

                        <p>
                            Instead of a refund, customers may choose a replacement product if:
                        </p>

                        <ul>
                            <li>The product is damaged during transit.</li>
                            <li>An incorrect product has been delivered.</li>
                            <li>The product quality issue is verified by our team.</li>
                        </ul>

                        <p>Replacement products will be shipped at no additional cost.</p>

                        <hr />

                        <h2>Order Cancellation</h2>

                        <h3>Before Dispatch</h3>

                        <p>
                            Orders can be cancelled before shipment by contacting our support team.
                        </p>

                        <h3>After Dispatch</h3>

                        <p>
                            Once an order has been shipped, cancellation requests may not be
                            accepted.
                        </p>

                        <hr />

                        <h2>Failed Deliveries</h2>

                        <p>If an order is returned due to:</p>

                        <ul>
                            <li>Incorrect address provided by the customer</li>
                            <li>Customer unavailable during delivery attempts</li>
                            <li>Refusal to accept delivery</li>
                        </ul>

                        <p>
                            Any refund, if applicable, will be processed after deducting shipping
                            and handling charges.
                        </p>

                        <hr />

                        <h2>Contact Us</h2>

                        <p>
                            For refund, return, or replacement requests, please contact:
                        </p>

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

                        <p>
                            <strong>Business Hours:</strong> Monday to Saturday, 10:00 AM to 7:00
                            PM
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RefundPolicy
