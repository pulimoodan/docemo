import Link from 'next/link';
import logo from '../../../../../assets/img/logo-1.png';
import { AuthService } from '../../../utils/AuthService';

const links = [
  {
    location: '/admin',
    label: 'Dashboard',
  },
  {
    location: '/admin/orders',
    label: 'Orders',
  },
  {
    location: '/admin/products',
    label: 'Products',
  },
  {
    location: '/admin/customers',
    label: 'Customers',
  },
  {
    location: '/admin/settings',
    label: 'Settings',
  },
];

export default function Navbar({ active, router }) {
  const logout = () => {
    AuthService.logout();
    router.push('/admin/login');
  };

  return (
    <nav className="navbar bg-light navbar-light navbar-expand-sm">
      <div className="container">
        <a className="navbar-brand" href="/admin">
          <img src={logo.src} alt="Docemo logo" style={{ width: '100px' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsible"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="collapsible">
          <ul className="navbar-nav ms-auto">
            {links.map((link, key) => (
              <li className="nav-item" key={key}>
                <Link href={link.location}>
                  <a
                    className={`nav-link ${
                      link.location == active ? 'active' : null
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="ms-4">
          <button
            onClick={logout}
            className="btn btn-danger"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-title="log out"
          >
            <i className={`bi-box-arrow-in-left m-auto text-white`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
