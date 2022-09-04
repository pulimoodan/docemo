import styles from './Product.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../contexts/CartContext';

export default function Product({ product, navigateToCheckout }) {
    const cartItems = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false);

    const addProductToCart = (product) => {
        cartItems.addItem(product);
    }

    const buyNowHandler = (product) => {
        if (cartItems.items.filter((e) => e.id === product.id).length == 0) {
            addProductToCart(product);
        }
        navigateToCheckout();
    }

    useEffect(() => {
        if (cartItems.items.filter((e) => e.id === product.id).length > 0) {
            setAddedToCart(true);
        } else {
            setAddedToCart(false);
        }
    }, [cartItems]);

    return (
        <div className='col'>
            <div className={`${styles.card} card mb-4 box-shadow`}>
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{product.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">${product.price} <small className="text-muted">/ {product.per}</small></h1>
                    <ul className={`${styles.list_group} list-group mt-3 mb-4`}>
                        {
                            product.features.map((feature, key) =>
                                <li className="list-group-item" key={key}>{feature}</li>
                            )
                        }
                    </ul>
                    <div className='btn-group'>
                        {
                            addedToCart ? (
                                <button type="button" className="btn btn-block btn-outline-primary" disabled>Added to cart</button>
                            ) : (
                                <button type="button" className="btn btn-block btn-outline-primary" onClick={() => addProductToCart(product)}>Add to cart</button>
                            )
                        }
                        <button type="button" className="btn btn-block btn-primary" onClick={() => buyNowHandler(product)}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}