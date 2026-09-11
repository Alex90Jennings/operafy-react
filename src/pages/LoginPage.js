import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import SetupNotice from '../components/SetupNotice';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { redirectPathFrom } from '../utils/redirect';

function LoginPage() {
  useDocumentTitle('Log in');
  const { user, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) return <Navigate to={redirectPathFrom(location)} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (loginError) {
      setError(loginError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page" aria-labelledby="login-heading">
      <h1 id="login-heading">Log in to Operafy</h1>
      <SetupNotice />
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="pill-button pill-button--accent" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="auth-switch">
        Don’t have an account?{' '}
        <Link to="/signup" state={location.state}>
          Sign up for Operafy
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
