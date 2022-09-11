import api from '../../utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../components/admin/navbar';
import CustomerModal from '../../components/admin/customerModal';
import { AuthService } from '../../utils/AuthService';

export default function Customers() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    authenticate();
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers');
      console.log(res.data);
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleCreate = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(true);
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
            <h5>Customers</h5>
            <button className="btn btn-primary ms-auto" onClick={handleCreate}>
              Create
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">Zip</th>
              </tr>
            </thead>
            <tbody>
              {customers.length == 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    No record found
                  </td>
                </tr>
              )}
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => handleViewCustomer(customer)}
                >
                  <th scope="row">{customer.id}</th>
                  <td>
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.country}</td>
                  <td>{customer.state}</td>
                  <td>{customer.zip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomerModal
        callback={fetchCustomers}
        show={showCustomerModal}
        setShow={setShowCustomerModal}
        customer={selectedCustomer}
      />
    </div>
  );
}
