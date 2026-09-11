import { Link, useLocation } from 'react-router-dom';

function LoginPrompt({ title, message }) {
  const location = useLocation();

  return (
    <section className="empty-state">
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="button-row">
        <Link className="pill-button" to="/login" state={{ from: location }}>
          Log in
        </Link>
        <Link className="pill-button pill-button--outline" to="/signup" state={{ from: location }}>
          Sign up free
        </Link>
      </div>
    </section>
  );
}

export default LoginPrompt;
