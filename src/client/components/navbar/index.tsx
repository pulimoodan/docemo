import { useContext } from 'react';
import CartContext from '../../contexts/CartContext';
import Link from 'next/link';

export default function Navbar({ setShowCart }) {
    const cartItems = useContext(CartContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container justify-content-between">
                <Link href="/" className="navbar-brand">
                    <div style={{ 'cursor': 'pointer' }}>
                        <i className="bi-cpu"></i> &nbsp;
                        Windows Server Support
                    </div>
                </Link>


                <div>
                    <button type="button" className="btn btn-primary position-relative" onClick={() => setShowCart(true)}>
                        <i className={`bi-bag m-auto text-white`}></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartItems.items.length}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}