import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/AdminLogin.module.css';
import { AuthService } from '../../utils/AuthService';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthService.login(email, password);
      if (user) setAuthenticated(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (authenticated) router.push('/admin');
  }, [authenticated]);

  useEffect(() => {
    async () => {
      try {
        const user = await AuthService.getUser();
        if (user) router.push('/admin');
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div className={`${styles.auth_wrapper} bg-light`}>
      <div className={`${styles.card} card shadow-sm`}>
        <div className="card-header">
          <h3>Sign In</h3>
        </div>
        <form className="card-body" onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={handlePassword}
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              Username or password is incorrect.
            </div>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
