import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../components/admin/navbar';
import api from '../../utils/api';
import { AuthService } from '../../utils/AuthService';

export default function Admin() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers');
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticate();
    fetchProducts();
    fetchCustomers();
    fetchOrders();
  }, []);

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
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header">Orders</div>
              <div className="card-body">{orders.length}</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href="/admin/orders">
                  <a className="small stretched-link">View Details</a>
                </Link>
                <div className="small">
                  <i className={`bi-caret-right-fill m-auto`}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header">Products</div>
              <div className="card-body">{products.length}</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href="/admin/products">
                  <a className="small stretched-link">View Details</a>
                </Link>
                <div className="small">
                  <i className={`bi-caret-right-fill m-auto`}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header">Customers</div>
              <div className="card-body">{customers.length}</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href="/admin/customers">
                  <a className="small stretched-link">View Details</a>
                </Link>
                <div className="small">
                  <i className={`bi-caret-right-fill m-auto`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
