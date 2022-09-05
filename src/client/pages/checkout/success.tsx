import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import CartContext from '../../contexts/CartContext';
import { useContext, useEffect, useState } from 'react';
import CartModal from '../../components/cartModal/CartModal';
import Link from 'next/link';

export default function Success() {
  const cartItems = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    cartItems.resetItems();
  }, []);

  return (
    <>
      <Navbar setShowCart={setShowCart} />

      <div className="container">
        <div className="jumbotron text-center py-5">
          <h1 className="display-3">Thank You!</h1>
          <p className="lead">
            <strong>Please check your email</strong> for further instructions on
            how to complete the purchase.
          </p>
          <hr />
          <p>
            Having trouble? <Link href="mailto:example.com">Contact us</Link>
          </p>
          <p className="lead">
            <Link href="/" role="button">
              <button className="btn btn-primary btn-sm">
                Continue to homepage
              </button>
            </Link>
          </p>
        </div>
      </div>

      <Footer />

      <CartModal show={showCart} setShow={setShowCart} />
    </>
  );
}
