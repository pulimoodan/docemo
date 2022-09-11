import api from '../../utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../components/admin/navbar';
import ProductModal from '../../components/admin/productModal';
import { AuthService } from '../../utils/AuthService';
import CurrencyList from 'currency-list';

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const [currency, setCurrency] = useState({ symbol: '$' });
  const [website, setWebsite] = useState({
    id: '',
    currency: 'USD',
    baseUrl: '',
  });

  useEffect(() => {
    authenticate();
    fetchWebsiteDetails();
    fetchProducts();
  }, []);

  const fetchWebsiteDetails = async () => {
    const res = await api.get('/website');
    setWebsite(res.data);
  };

  useEffect(() => {
    setCurrency(CurrencyList.get(website.currency));
  }, [website]);

  useEffect(() => {
    if (!showProductModal) {
      fetchProducts();
    }
  }, [showProductModal]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const authenticate = async () => {
    try {
      const user = await AuthService.getUser();
      if (!user) router.push('/admin/login');
    } catch (error) {
      router.push('/admin/login');
    }
  };

  return (
    <div>
      <Navbar router={router} active={router.pathname} />
      <div className="container py-4">
        <div className="card">
          <div className="card-header d-flex align-items-center">
            <h5>Products</h5>
            <button className="btn btn-primary ms-auto" onClick={handleCreate}>
              Create
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Features</th>
              </tr>
            </thead>
            <tbody>
              {products.length == 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No record found
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product.id} onClick={() => handleViewProduct(product)}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>
                    {currency.symbol} {product.price} / {product.per}
                  </td>
                  <td>{product.features.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal
        show={showProductModal}
        setShow={setShowProductModal}
        product={selectedProduct}
      />
    </div>
  );
}
