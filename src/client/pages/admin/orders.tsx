import api from '../../utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CurrencyList from 'currency-list';

import Navbar from '../../components/admin/navbar';
import OrderModal from '../../components/admin/orderModal';
import { AuthService } from '../../utils/AuthService';

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState({ symbol: '$' });
  const [website, setWebsite] = useState({
    id: '',
    currency: 'USD',
    baseUrl: '',
  });

  useEffect(() => {
    authenticate();
    fetchWebsiteDetails();
    fetchOrders();
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrency(CurrencyList.get(website.currency));
  }, [website]);

  const fetchWebsiteDetails = async () => {
    const res = await api.get('/website');
    setWebsite(res.data);
  };

  const fetchProducts = async () => {
    const productRes = await api.get('/products');
    setProducts(productRes.data);
  };

  useEffect(() => {
    if (!showOrderModal) {
      fetchOrders();
    }
  }, [showOrderModal]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCreate = () => {
    setSelectedOrder(null);
    setShowOrderModal(true);
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
            <h5>Orders</h5>
            <button className="btn btn-primary ms-auto" onClick={handleCreate}>
              Create
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.length == 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No record found
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} onClick={() => handleViewOrder(order)}>
                  <th scope="row">{order.id}</th>
                  <td>
                    {order.customer.firstName} {order.customer.lastName}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>
                    {currency.symbol}
                    {order.products.length > 0
                      ? order.products.reduce(
                          (total, current) =>
                            total + Number(current.product.price),
                          0,
                        )
                      : 0}
                  </td>
                  <td>
                    {order.products
                      .map(
                        (product) =>
                          `${product.product.name} x ${product.quantity}`,
                      )
                      .join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderModal
        products={products}
        show={showOrderModal}
        setShow={setShowOrderModal}
        order={selectedOrder}
      />
    </div>
  );
}
