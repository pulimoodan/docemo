import styles from '../styles/Home.module.css';

import showcase1 from '../../../assets/img/bg-showcase-1.jpg';
import showcase2 from '../../../assets/img/bg-showcase-2.jpg';
import showcase3 from '../../../assets/img/bg-showcase-3.jpg';
import showcase4 from '../../../assets/img/bg-showcase-4.jpg';

import Product from '../components/product';
import Feature from '../components/feature';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import features from '../constants/features';
import { useEffect, useState } from 'react';
import CartModal from '../components/cartModal/CartModal';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [mailSent, setMailSent] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();

  const navigateToCheckout = () => {
    router.push('/checkout');
  };

  useEffect(() => {
    axios.get('/products').then((res) => {
      console.log(res);
      setProducts(res.data);
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log('hi');
    axios
      .post('/mail/enquiry', {
        email,
      })
      .then((res) => {
        console.log(res);
        setMailSent(true);
      });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {/* Navigation */}
      <Navbar setShowCart={setShowCart} />

      {/* Masthead */}
      <header className={styles.masthead}>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="text-center text-white">
                {/* Page heading */}
                <h1 className="mb-5">
                  Support for your Windows server 2012 2016 2019
                </h1>
                <form
                  className="form-subscribe col-xl-6 mx-auto text-center"
                  id="contactForm"
                  data-sb-form-api-token="API_TOKEN"
                  onSubmit={sendEmail}
                >
                  {/* Email address input */}
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control"
                        id="emailAddress"
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={emailHandler}
                      />
                      {mailSent && (
                        <p className="text-white">Mail sent successfully</p>
                      )}
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-primary"
                        id="submitButton"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className={`${styles.features_icons} bg-light text-center`}>
        <div className="container">
          <h4 className="col-lg-7 mb-2 mx-auto">
            Are you looking for IT support with your Windows Server?
          </h4>
          <p className="col-lg-6 mb-5 mx-auto">
            This service provides remote support with the following Windows
            Server services, problems, and issues.
          </p>
          <div className="row row-cols-5 gx-4 align-items-stretch gy-4">
            {features.map((feature, key) => (
              <Feature feature={feature} key={key} />
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcases */}
      <section className={styles.showcase}>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div
              className={`col-lg-6 order-lg-2 text-white ${styles.showcase_img}`}
              style={{ backgroundImage: `url(${showcase1.src})` }}
            ></div>
            <div
              className={`col-lg-6 order-lg-1 my-auto ${styles.showcase_text}`}
            >
              <h2>Contact us</h2>
              <p className="lead mb-0">
                Please contact before ordering so that we can agree on which
                package your requested services fall under. Thank you for your
                understanding.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className={`col-lg-6 text-white ${styles.showcase_img}`}
              style={{ backgroundImage: `url(${showcase2.src})` }}
            ></div>
            <div className={`col-lg-6 my-auto ${styles.showcase_text}`}>
              <h2>Premises servers only</h2>
              <p className="lead mb-0">
                Please note that this is for on premises servers only, not for
                hybrid or cloud services (Please check out our Azure/Cloud
                services offering).
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className={`col-lg-6 order-lg-2 text-white ${styles.showcase_img}`}
              style={{ backgroundImage: `url(${showcase3.src})` }}
            ></div>
            <div
              className={`col-lg-6 order-lg-1 my-auto ${styles.showcase_text}`}
            >
              <h2>Discuss with us</h2>
              <p className="lead mb-0">
                We will provide a quick 15 minute video call to discuss the
                scope and depth of the project, along with deliverables will be
                associated with the service upon delivery.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className={`col-lg-6 text-white ${styles.showcase_img}`}
              style={{ backgroundImage: `url(${showcase4.src})` }}
            ></div>
            <div className={`col-lg-6 my-auto ${styles.showcase_text}`}>
              <h2>Remote administration</h2>
              <p className="lead mb-0">
                In order for me to assist you, it will require remote
                administration via an application such as AnyDesk or ZOHO
                Assist. It will also require administrator credentials to do
                most tasks. Please have an available administrator account
                available for completion of the tasks or please be available to
                enter credentials when necessary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className={`${styles.products} text-center bg-light`}>
        <div className="container">
          <h2 className="mb-5">Our products</h2>
          <div
            className={`${styles.card_deck} mb-3 text-center row row-cols-3 gx-4`}
          >
            {products.map((product) => (
              <Product
                product={product}
                key={product.id}
                navigateToCheckout={navigateToCheckout}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`${styles.call_to_action} text-white text-center`}
        id="signup"
      >
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <h2>Ready to get started? Order now!</h2>
              <p className="mb-4">
                Thanks for considering our services and we look forward to
                supporting your windows server infrastructure.
              </p>
              {/* Signup form */}
              <form
                className="form-subscribe"
                id="contactFormFooter"
                data-sb-form-api-token="API_TOKEN"
                onSubmit={sendEmail}
              >
                {/* Email address input */}
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control form-control-lg"
                      id="emailAddressBelow"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={emailHandler}
                    />
                    {mailSent && (
                      <p className="text-white">Mail sent successfully</p>
                    )}
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary btn-lg"
                      id="submitButton"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <CartModal show={showCart} setShow={setShowCart} />
    </>
  );
}
