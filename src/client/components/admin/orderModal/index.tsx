import { Modal } from 'react-bootstrap';
import CurrencyList from 'currency-list';
import { useEffect, useState } from 'react';

import api from '../../../utils/api';
import { toast } from 'react-toastify';

export default function OrderModal({ show, setShow, products, order }) {
  const currencies = CurrencyList.getAll('en_US');
  const [customers, setCustomers] = useState([]);

  const [orderDetails, setOrderDetails] = useState({
    customerId: '',
    paymentCurrency: 'USD',
    paymentType: 'stripe',
    paid: false,
    products: [],
  });
  const [newProduct, setNewProduct] = useState({
    id: '',
    quantity: 1,
  });
  const [error, setError] = useState(false);

  const fetchCustomers = async () => {
    const customerRes = await api.get('/customers');
    setCustomers(customerRes.data);
  };

  useEffect(() => {
    if (products.length > 0) {
      setNewProduct({ ...newProduct, id: products[0].id });
    }
  }, [products]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const orderDetailsHandler = (value, key) => {
    setOrderDetails({ ...orderDetails, [key]: value });
  };

  const newProductHandler = (value, key) => {
    setNewProduct({ ...newProduct, [key]: value });
  };

  const addNewProduct = () => {
    const data = orderDetails.products;
    const index = data.findIndex((el) => el.id === newProduct.id);
    if (index > -1) data[index].quantity += newProduct.quantity;
    else data.push(newProduct);
    setOrderDetails({ ...orderDetails, products: data });
    setNewProduct({
      id: products[0].id,
      quantity: 1,
    });
  };

  const deleteProduct = (index) => {
    const data = orderDetails.products;
    data.splice(index, 1);
    setOrderDetails({ ...orderDetails, products: data });
  };

  useEffect(() => {
    if (order) {
      setOrderDetails({
        customerId: order.customer?.id,
        paymentCurrency: order.paymentCurrency,
        paymentType: order.paymentType,
        paid: order.paid,
        products: order.products?.map((product) => {
          return { id: product.productId, quantity: product.quantity };
        }),
      });
    } else {
      setOrderDetails({
        customerId: '',
        paymentCurrency: 'USD',
        paymentType: 'stripe',
        paid: false,
        products: [],
      });
    }
  }, [show]);

  useEffect(() => {
    if (orderDetails.products?.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [orderDetails]);

  const handleForm = (e) => {
    e.preventDefault();
    if (orderDetails.products?.length == 0) {
      return;
    }
    if (order) {
      handleSave();
    } else {
      handleCreate();
    }
  };

  const handleSave = async () => {
    try {
      await api.patch(`/orders/${order.id}`, {
        customerId: Number(orderDetails.customerId),
        productsArray: orderDetails.products,
        paid: orderDetails.paid,
        paymentType: orderDetails.paymentType,
        paymentCurrency: orderDetails.paymentCurrency,
      });
      toast('Saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await api.post(`/orders`, {
        customerId: Number(orderDetails.customerId),
        productsArray: orderDetails.products,
        paid: orderDetails.paid,
        paymentType: orderDetails.paymentType,
        paymentCurrency: orderDetails.paymentCurrency,
      });
      setOrderDetails(res.data);
      toast('Created', { autoClose: 2000, type: 'success' });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async () => {
    try {
      await api.delete(`/orders/${order.id}`);
      toast('Deleted', { autoClose: 2000, type: 'success' });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {order ? `Order #${order.id}` : `New Order`}
        </Modal.Title>

        {order && (
          <button className="btn btn-danger ms-4" onClick={handelDelete}>
            <i className={`bi-x-circle text-white`}></i>
          </button>
        )}
      </Modal.Header>

      <form onSubmit={handleForm}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="customer" className="form-label">
                Customer
              </label>
              <select
                className="form-select"
                id="customer"
                required
                value={orderDetails.customerId}
                onChange={(e) =>
                  orderDetailsHandler(e.target.value, 'customerId')
                }
              >
                <option value="">Choose</option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="paymentType" className="form-label">
                Payment type
              </label>
              <select
                className="form-select"
                id="paymentType"
                required
                value={orderDetails.paymentType}
                onChange={(e) =>
                  orderDetailsHandler(e.target.value, 'paymentType')
                }
              >
                <option value="stripe">Stripe</option>
                <option value="crypto">Crypto</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="paymentCurrency" className="form-label">
                Currency
              </label>
              <select
                className="form-select"
                id="paymentCurrency"
                required
                value={orderDetails.paymentCurrency}
                onChange={(e) =>
                  orderDetailsHandler(e.target.value, 'paymentCurrency')
                }
              >
                {Object.keys(currencies).map((key, index) => (
                  <option value={key} key={index}>{`${String(
                    currencies[key].name,
                  )} - ${String(currencies[key].symbol)}`}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="paid"
                  checked={orderDetails.paid}
                  onChange={(e) =>
                    orderDetailsHandler(e.target.checked, 'paid')
                  }
                />
                <label htmlFor="paid" className="form-check-label">
                  Paid
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="products" className="form-label">
              Products
            </label>
            <div className="input-group">
              <select
                className="form-select"
                id="products"
                value={newProduct.id}
                onChange={(e) => newProductHandler(e.target.value, 'id')}
              >
                {products.map((product) => (
                  <option value={product.id} key={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <span className="input-group-text">x</span>
              <input
                type="number"
                className="form-control"
                placeholder="1"
                min={1}
                value={newProduct.quantity}
                onChange={(e) => newProductHandler(e.target.value, 'quantity')}
              />
              <button
                className="btn btn-dark"
                type="button"
                onClick={addNewProduct}
              >
                Add
              </button>
            </div>
            <ul className="list-group mt-2">
              {orderDetails.products?.map((product, key) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center bg-light"
                  key={key}
                >
                  {products.filter((p) => p.id == product.id)[0].name}
                  &nbsp; x &nbsp;
                  {product.quantity}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(key)}
                    type="button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {error && <p className="text-danger">Add at least one product</p>}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="ms-auto btn btn-primary">
            {order ? `Save` : `Create`}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
