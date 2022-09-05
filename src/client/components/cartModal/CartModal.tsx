import { useContext } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import CartContext from '../../contexts/CartContext';
import Link from 'next/link';

export default function CartModal({ show, setShow }) {
  const cartItems = useContext(CartContext);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <ListGroup variant="flush">
        {cartItems.items?.length == 0 && (
          <ListGroup.Item className="py-3">Nothing here</ListGroup.Item>
        )}
        {cartItems.items?.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="py-3 d-flex justify-content-between align-items-center"
          >
            {item.name}
            <div>
              <span className="badge bg-secondary rounded-pill me-3">
                {item.quantity}
              </span>
              <div className="btn-group me-3">
                <button
                  className="btn btn-dark"
                  onClick={() => cartItems.decreaseItem(item)}
                >
                  <i className={`bi-dash m-auto text-white`}></i>
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => cartItems.increaseItem(item)}
                >
                  <i className={`bi-plus m-auto text-white`}></i>
                </button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => cartItems.removeItem(item)}
              >
                <i className={`bi-x-lg m-auto text-white`}></i>
              </button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal.Footer>
        <Button
          className="btn-secondary"
          onClick={() => cartItems.resetItems()}
        >
          Reset
        </Button>
        <Link href="/checkout">
          <Button className="ms-auto" disabled={cartItems.items.length == 0}>
            Checkout
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
