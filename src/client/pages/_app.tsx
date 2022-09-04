import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import CartContext from '../contexts/CartContext';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    const [items, setItems] = useState([]);
    const [updatedTrigger, setUpdatedTrigger] = useState(false);

    const addItem = (product) => {
        let index = items.map(item => item.id).indexOf(product.id);
        if (index > -1) {
            let newItems = items;
            newItems[index].quantity += 1
            setItems(newItems);
        } else {
            setItems(oldItems => [...oldItems, { ...product, quantity: 1 }]);
        }
        setUpdatedTrigger((state) => !state);
    }

    const removeItem = (product) => {
        let newItems = items.filter((item) => item.id != product.id);
        setItems(newItems);
    }

    const increaseItem = (product) => {
        let index = items.findIndex(x => x.id === product.id);
        let newItems = items;
        newItems[index].quantity += 1;
        setItems(newItems);
        setUpdatedTrigger((state) => !state);
    }

    const decreaseItem = (product) => {
        let index = items.findIndex(x => x.id === product.id);
        let newItems = items;
        newItems[index].quantity -= 1;
        if (newItems[index].quantity <= 0) {
            removeItem(product);
        } else {
            setItems(newItems);
        }
        setUpdatedTrigger((state) => !state);
    }

    const resetItems = () => {
        setItems([]);
    }

    return (
        <CartContext.Provider value={{ updatedTrigger, items, addItem, removeItem, resetItems, increaseItem, decreaseItem }}>
            <Component {...pageProps} />
        </CartContext.Provider>
    )

}