import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import api from '../../../utils/api';
import { toast } from 'react-toastify';

export default function ProductModal({ show, setShow, product }) {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    per: '',
    features: [],
  });
  const [newFeature, setNewFeature] = useState('');
  const [error, setError] = useState(false);

  const productDetailsHandler = (value, key) => {
    setProductDetails({ ...productDetails, [key]: value });
  };

  const newFeatureHandler = (e) => {
    setNewFeature(e.target.value);
  };

  const addNewFeature = () => {
    const data = productDetails.features;
    data.push(newFeature);
    setProductDetails({ ...productDetails, features: data });
    setNewFeature('');
  };

  const deleteFeature = (index) => {
    const data = productDetails.features;
    data.splice(index, 1);
    setProductDetails({ ...productDetails, features: data });
  };

  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name,
        price: product.price,
        per: product.per,
        features: product.features,
      });
    } else {
      setProductDetails({
        name: '',
        price: '',
        per: '',
        features: [],
      });
    }
  }, [show]);

  useEffect(() => {
    if (productDetails.features?.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [productDetails]);

  const handleForm = (e) => {
    e.preventDefault();
    if (productDetails.features?.length == 0) {
      return;
    }
    if (product) {
      handleSave();
    } else {
      handleCreate();
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.patch(`/products/${product.id}`, {
        ...productDetails,
      });
      setProductDetails(res.data);
      toast('Saved', { autoClose: 2000, type: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await api.post(`/products`, {
        ...productDetails,
      });
      setProductDetails(res.data);
      toast('Created', { autoClose: 2000, type: 'success' });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async () => {
    try {
      await api.delete(`/products/${product.id}`);
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
          {product ? `Product #${product.id}` : `New Product`}
        </Modal.Title>

        {product && (
          <button className="btn btn-danger ms-4" onClick={handelDelete}>
            <i className={`bi-x-circle text-white`}></i>
          </button>
        )}
      </Modal.Header>

      <form onSubmit={handleForm}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={productDetails.name}
                onChange={(e) => productDetailsHandler(e.target.value, 'name')}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={productDetails.price}
                onChange={(e) => productDetailsHandler(e.target.value, 'price')}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="per" className="form-label">
                Per
              </label>
              <input
                type="text"
                className="form-control"
                id="per"
                required
                value={productDetails.per}
                placeholder="hr / day"
                onChange={(e) => productDetailsHandler(e.target.value, 'per')}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="features" className="form-label">
              Features
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="features"
                value={newFeature}
                onChange={newFeatureHandler}
              />
              <button
                className="btn btn-dark"
                type="button"
                onClick={addNewFeature}
              >
                Add
              </button>
            </div>
            <ul className="list-group mt-2">
              {productDetails.features?.map((feature, key) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center bg-light"
                  key={key}
                >
                  {feature}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteFeature(key)}
                    type="button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {error && <p className="text-danger">Add at least one feature</p>}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="ms-auto btn btn-primary">
            {product ? `Save` : `Create`}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
