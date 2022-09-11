import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Country, State } from 'country-state-city';

import api from '../../../utils/api';
import { toast } from 'react-toastify';

export default function CustomerModal({ show, setShow, customer, callback }) {
  const countries = Country.getAllCountries();
  const [states, setStates] = useState(State.getStatesOfCountry(countries[0]));

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: countries[0].isoCode,
    state: '',
    zip: '',
  });

  useEffect(() => {
    setStates(State.getStatesOfCountry(customerDetails.country));
  }, [customerDetails.country]);

  useEffect(() => {
    if (states.length > 0) {
      setCustomerDetails({ ...customerDetails, state: states[0].isoCode });
    }
  }, [states]);

  const customerDetailsHandler = (value, key) => {
    setCustomerDetails({ ...customerDetails, [key]: value });
  };

  useEffect(() => {
    if (customer) {
      setCustomerDetails({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        country: customer.country,
        state: customer.state,
        zip: customer.zip,
      });
    } else {
      setCustomerDetails({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: countries[0].isoCode,
        state: '',
        zip: '',
      });
    }
  }, [show]);

  const handleForm = (e) => {
    e.preventDefault();
    if (customer) {
      handleSave();
    } else {
      handleCreate();
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.patch(`/customers/${customer.id}`, {
        ...customerDetails,
      });
      setCustomerDetails(res.data);
      callback();
      toast('Saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await api.post(`/customers`, {
        ...customerDetails,
      });
      setCustomerDetails(res.data);
      callback();
      toast('Created', { autoClose: 2000, type: 'success' });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async () => {
    try {
      await api.delete(`/customers/${customer.id}`);
      callback();
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
          {customer ? `Customer #${customer.id}` : `New Customer`}
        </Modal.Title>

        {customer && (
          <button className="btn btn-danger ms-4" onClick={handelDelete}>
            <i className={`bi-x-circle text-white`}></i>
          </button>
        )}
      </Modal.Header>

      <form onSubmit={handleForm}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={customerDetails.firstName}
                onChange={(e) =>
                  customerDetailsHandler(e.target.value, 'firstName')
                }
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={customerDetails.lastName}
                onChange={(e) =>
                  customerDetailsHandler(e.target.value, 'lastName')
                }
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              required
              value={customerDetails.email}
              onChange={(e) => customerDetailsHandler(e.target.value, 'email')}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              required
              value={customerDetails.address}
              onChange={(e) =>
                customerDetailsHandler(e.target.value, 'address')
              }
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-select d-block w-100"
                id="country"
                required
                value={customerDetails.country}
                onChange={(e) =>
                  customerDetailsHandler(e.target.value, 'country')
                }
              >
                {countries.map((country, key) => (
                  <option value={country.isoCode} key={key}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select d-block w-100"
                id="state"
                value={customerDetails.state}
                onChange={(e) =>
                  customerDetailsHandler(e.target.value, 'state')
                }
              >
                {states.map((state, key) => (
                  <option value={state.isoCode} key={key}>
                    {state.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="zip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder=""
                required
                value={customerDetails.zip}
                onChange={(e) => customerDetailsHandler(e.target.value, 'zip')}
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {customer && (
            <Link href={`/admin/orders`}>
              <button type="button" className="btn btn-dark position-relative">
                Orders
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {customer.orders?.length}
                  <span className="visually-hidden">orders by customer</span>
                </span>
              </button>
            </Link>
          )}
          <button className="ms-auto btn btn-primary">
            {customer ? `Save` : `Create`}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
