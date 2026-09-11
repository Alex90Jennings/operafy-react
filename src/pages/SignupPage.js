import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import SetupNotice from '../components/SetupNotice';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { redirectPathFrom } from '../utils/redirect';

const MIN_PASSWORD_LENGTH = 8;

function SignupPage() {
  useDocumentTitle('Sign up');
  const { user, signup } = useAuth();
  const location = useLocation();
  const [name, setName] = useState('');
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
      await signup(name.trim(), email.trim(), password);
    } catch (signupError) {
      setError(signupError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page" aria-labelledby="signup-heading">
      <h1 id="signup-heading">Sign up for free</h1>
      <SetupNotice />
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            className="input"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={128}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={MIN_PASSWORD_LENGTH}
            aria-describedby="signup-password-hint"
            required
          />
          <p id="signup-password-hint" className="field-hint">
            At least {MIN_PASSWORD_LENGTH} characters.
          </p>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="pill-button pill-button--accent" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <Link to="/login" state={location.state}>
          Log in
        </Link>
      </p>
    </section>
  );
}

export default SignupPage;
