import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useContext, useEffect, useState } from 'react';

import StripeCheckout from 'react-stripe-checkout';
import CartModal from '../../components/cartModal/CartModal';
import CartContext from '../../contexts/CartContext';
import { Country, State } from 'country-state-city';
import axios from 'axios';

import { baseUrl } from '../../constants/urls';
import { nowPaymentsKey, stripeKey } from '../../constants/secrets';
import { useRef } from 'react';

export default function Checkout() {
    const cartItems = useContext(CartContext);

    const [currencies, setCurrencies] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: countries[0].isoCode,
        state: '',
        zip: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        type: 'crypto',
        currency: 'BTC',
    });

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setStates(State.getStatesOfCountry(customerDetails.country));
    }, [customerDetails.country]);

    useEffect(() => {
        if (cartItems.items?.length > 0) {
            setTotalPrice(cartItems.items?.reduce((total, current) => total += (current.price * current.quantity), 0));
        }
        else {
            setTotalPrice(0);
        }
    }, [cartItems]);

    async function fetchCurrencies() {
        const res = await axios.get('https://api.nowpayments.io/v1/full-currencies',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': nowPaymentsKey
                }
            }
        );
        setCurrencies(res.data.currencies);
    }

    const customerDetailsHandler = (value, key) => {
        setCustomerDetails({ ...customerDetails, [key]: value });
    }

    const paymentDetailsHandler = (value, key) => {
        setPaymentDetails({ ...paymentDetails, [key]: value });
        if (key == 'type' && value == 'stripe') {
            setPaymentDetails({ ...paymentDetails, currency: 'usd', [key]: value });
        }
    }


    const stripeButton = useRef();

    const formHandler = async (e) => {
        e.preventDefault();
        if (cartItems.items.length == 0) return;
        const customer = (await axios.post('/customers', customerDetails)).data;
        const order = (await axios.post('/orders', {
            customerId: customer.id,
            productsArray: cartItems.items.map((item) => { return { id: item.id, quantity: item.quantity } }),
            paymentType: paymentDetails.type,
            paymentCurrency: paymentDetails.currency,
        })).data;
        setOrderId(order.id);
        if (paymentDetails.type == 'crypto') {
            const payment = await axios.post('https://api.nowpayments.io/v1/invoice', {
                price_amount: totalPrice,
                price_currency: 'usd',
                pay_currency: paymentDetails.currency,
                ipn_callback_url: 'https://api.nowpayments.io',
                order_id: order.id,
                order_description: 'windows server support',
                success_url: `${baseUrl}/checkout/success`,
                cancel_url: `${baseUrl}/checkout/`,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                }
            });
            document.location.href = payment.data.invoice_url;
        } else if (paymentDetails.type == 'stripe') {
            return stripeButton.current.children[0].click();
        }
    }

    const stripeOnToken = async (token) => {
        console.log(orderId);
        const res = await axios.post(`/orders/stripe`, {
            token,
            orderId
        });
        console.log(res.data);
        document.location.href = '/checkout/success';
    }

    return (
        <>
            <Navbar setShowCart={setShowCart} />

            <div className="container">

                <div className="row pt-5">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge bg-secondary rounded-pill">{cartItems.items?.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                cartItems.items?.map((item, key) =>
                                    <li key={key} className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{item.name} x {item.quantity}</h6>
                                            <small className="text-muted">{item.features[0]}</small>
                                        </div>
                                        <span className="text-muted">${item.price * item.quantity}</span>
                                    </li>
                                )
                            }
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${totalPrice}</strong>
                            </li>
                        </ul>

                        {
                            cartItems.items?.length == 0 &&
                            <p className='text-danger'>
                                Your cart is empty. Add something to checkout.
                            </p>
                        }
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" onSubmit={formHandler}>
                            <ul className="list-group mb-3">
                                <li className="list-group-item p-4">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstName" className="form-label">First name</label>
                                            <input type="text" className="form-control" id="firstName" required value={customerDetails.firstName} onChange={(e) => customerDetailsHandler(e.target.value, 'firstName')} />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastName" required value={customerDetails.lastName} onChange={(e) => customerDetailsHandler(e.target.value, 'lastName')} />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="you@example.com" required value={customerDetails.email} onChange={(e) => customerDetailsHandler(e.target.value, 'email')} />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required value={customerDetails.address} onChange={(e) => customerDetailsHandler(e.target.value, 'address')} />
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <select className="form-select d-block w-100" id="country" required value={customerDetails.country} onChange={(e) => customerDetailsHandler(e.target.value, 'country')}>
                                                {
                                                    countries.map((country, key) =>
                                                        <option value={country.isoCode} key={key}>{country.name}</option>
                                                    )
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Please select a valid country.
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <select className="form-select d-block w-100" id="state" value={customerDetails.state} onChange={(e) => customerDetailsHandler(e.target.value, 'state')}>
                                                {
                                                    states.map((state, key) =>
                                                        <option value={state.isoCode} key={key}>{state.name}</option>
                                                    )
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Please provide a valid state.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="zip" className="form-label">Zip</label>
                                            <input type="text" className="form-control" id="zip" placeholder="" required value={customerDetails.zip} onChange={(e) => customerDetailsHandler(e.target.value, 'zip')} />
                                            <div className="invalid-feedback">
                                                Zip code required.
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className='list-group-item p-4'>
                                    <h6 className="mb-3">Payment method</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="radio" name="payment-method" id="flexRadioDefault1" value="stripe" checked={paymentDetails.type == 'stripe'} onChange={(e) => paymentDetailsHandler(e.target.value, 'type')} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Stripe
                                                </label>
                                            </div>
                                            <div className="d-grid">
                                                <button className='btn btn-block btn-dark' disabled>Card</button>
                                            </div>
                                            <div ref={stripeButton} style={{ display: 'none', position: 'absolute' }}>
                                                <StripeCheckout
                                                    currency={paymentDetails.currency.toUpperCase()}
                                                    email={customerDetails.email}
                                                    name={`${customerDetails.firstName} ${customerDetails.lastName}`}
                                                    token={stripeOnToken}
                                                    stripeKey={stripeKey}
                                                    amount={totalPrice * 100}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="radio" name="payment-method" id="flexRadioDefault1" value="crypto" checked={paymentDetails.type == 'crypto'} onChange={(e) => paymentDetailsHandler(e.target.value, 'type')} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Crypto
                                                </label>
                                            </div>
                                            <select className="form-select d-block w-100" id="state" value={paymentDetails.currency} onChange={(e) => paymentDetailsHandler(e.target.value, 'currency')} >
                                                {
                                                    currencies.map((currency, key) =>
                                                        <option value={currency.code} key={key}>{currency.name}</option>
                                                    )
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className='list-group-item p-4'>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={cartItems.items?.length == 0}>Continue to checkout</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />

            <CartModal show={showCart} setShow={setShowCart} />
        </>
    );
}