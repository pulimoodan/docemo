import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

import CartContext from '../contexts/CartContext';
import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState([]);
  const [updatedTrigger, setUpdatedTrigger] = useState(false);

  const addItem = (product) => {
    const index = items.map((item) => item.id).indexOf(product.id);
    if (index > -1) {
      const newItems = items;
      newItems[index].quantity += 1;
      setItems(newItems);
    } else {
      setItems((oldItems) => [...oldItems, { ...product, quantity: 1 }]);
    }
    setUpdatedTrigger((state) => !state);
  };

  const removeItem = (product) => {
    const newItems = items.filter((item) => item.id != product.id);
    setItems(newItems);
  };

  const increaseItem = (product) => {
    const index = items.findIndex((x) => x.id === product.id);
    const newItems = items;
    newItems[index].quantity += 1;
    setItems(newItems);
    setUpdatedTrigger((state) => !state);
  };

  const decreaseItem = (product) => {
    const index = items.findIndex((x) => x.id === product.id);
    const newItems = items;
    newItems[index].quantity -= 1;
    if (newItems[index].quantity <= 0) {
      removeItem(product);
    } else {
      setItems(newItems);
    }
    setUpdatedTrigger((state) => !state);
  };

  const resetItems = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        updatedTrigger,
        items,
        addItem,
        removeItem,
        resetItems,
        increaseItem,
        decreaseItem,
      }}
    >
      <Head>
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* bootstrap CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
      <ToastContainer />
    </CartContext.Provider>
  );
}
