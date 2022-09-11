import api from '../../utils/api';
import { useRouter } from 'next/router';
import CurrencyList from 'currency-list';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Navbar from '../../components/admin/navbar';
import { AuthService } from '../../utils/AuthService';
export default function Products() {
  const router = useRouter();
  const currencies = CurrencyList.getAll('en_US');

  const [email, setEmail] = useState({
    id: '',
    host: '',
    port: '',
    user: '',
    password: '',
    from: '',
    to: '',
  });
  const [payment, setPayment] = useState({
    id: '',
    nowPayments: '',
    stripe: '',
  });
  const [admin, setAdmin] = useState({
    id: '',
    email: '',
    password: '',
  });
  const [website, setWebsite] = useState({
    id: '',
    currency: '',
    baseUrl: '',
  });

  const emailHandler = (value, key) => {
    setEmail({ ...email, [key]: value });
  };

  const paymentHandler = (value, key) => {
    setPayment({ ...payment, [key]: value });
  };

  const adminHandler = (value, key) => {
    setAdmin({ ...admin, [key]: value });
  };

  const websiteHandler = (value, key) => {
    setWebsite({ ...website, [key]: value });
  };

  useEffect(() => {
    authenticate();
    fetchEmailDetails();
    fetchPaymentDetails();
    fetchAdminDetails();
    fetchWebsiteDetails();
  }, []);

  const fetchEmailDetails = async () => {
    const res = await api.get('/email');
    setEmail(res.data);
  };

  const fetchPaymentDetails = async () => {
    const res = await api.get('/payment');
    setPayment(res.data);
  };

  const fetchAdminDetails = async () => {
    const res = await api.get('/users');
    setAdmin(res.data);
  };

  const fetchWebsiteDetails = async () => {
    const res = await api.get('/website');
    setWebsite(res.data);
  };

  const submitEmailDetails = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/email/${email.id}`, {
        ...email,
        port: Number(email.port),
      });
      toast('Email settings saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  const submitPaymentDetails = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/payment/${payment.id}`, payment);
      toast('Payment settings saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  const submitAdminDetails = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/${admin.id}`, admin);
      toast('Admin settings saved', { autoClose: 2000, type: 'success' });
      setAdmin({ ...admin, password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const submitWebsiteDetails = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/website/${admin.id}`, website);
      toast('Website settings saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
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
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={submitEmailDetails} className="card">
              <div className="card-header">Email</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="host" className="form-label">
                    Host
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="host"
                    placeholder="smtp.gmail.com"
                    value={email.host}
                    onChange={(e) => emailHandler(e.target.value, 'host')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="port" className="form-label">
                    Port
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="port"
                    placeholder="587"
                    value={email.port}
                    onChange={(e) => emailHandler(e.target.value, 'port')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    User
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="user"
                    placeholder="example@gmail.com"
                    value={email.user}
                    onChange={(e) => emailHandler(e.target.value, 'user')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={email.password}
                    onChange={(e) => emailHandler(e.target.value, 'password')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="from" className="form-label">
                    From
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="from"
                    placeholder="noreply@example.com"
                    value={email.from}
                    onChange={(e) => emailHandler(e.target.value, 'from')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="to" className="form-label">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="to"
                    placeholder="example@gmail.com"
                    value={email.to}
                    onChange={(e) => emailHandler(e.target.value, 'to')}
                  />

                  <div className="form-text">
                    You would get notifications of orders in this email
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={submitPaymentDetails} className="card">
              <div className="card-header">Payments</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="stripe" className="form-label">
                    Stripe API key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="stripe"
                    placeholder="xxx-XXXX-xxxx-XXXX-xxxx"
                    value={payment.stripe}
                    required
                    onChange={(e) => paymentHandler(e.target.value, 'stripe')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nowPayments" className="form-label">
                    Now payments API key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nowPayments"
                    placeholder="xxx-XXXX-xxxx-XXXX-xxxx"
                    value={payment.nowPayments}
                    required
                    onChange={(e) =>
                      paymentHandler(e.target.value, 'nowPayments')
                    }
                  />
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
            <form onSubmit={submitAdminDetails} className="card mt-4">
              <div className="card-header">Admin</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="adminEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="adminEmail"
                    placeholder="admin@example.com"
                    value={admin.email}
                    required
                    onChange={(e) => adminHandler(e.target.value, 'email')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="adminPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="adminPassword"
                    value={admin.password}
                    onChange={(e) => adminHandler(e.target.value, 'password')}
                  />
                  <div className="form-text">
                    Password would be changed only if you've made any changes in
                    this field
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={submitWebsiteDetails} className="card mt-4">
              <div className="card-header">Website</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">
                    Currency
                  </label>
                  <select
                    className="form-select"
                    id="currency"
                    required
                    value={website.currency}
                    onChange={(e) => websiteHandler(e.target.value, 'currency')}
                  >
                    {Object.keys(currencies).map((key, index) => (
                      <option value={key} key={index}>{`${String(
                        currencies[key].name,
                      )} - ${String(currencies[key].symbol)}`}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="baseUrl" className="form-label">
                    Base URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="baseUrl"
                    value={website.baseUrl}
                    onChange={(e) => websiteHandler(e.target.value, 'baseUrl')}
                  />
                  <div className="form-text">
                    Enter the domain of your website with htttps://
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
