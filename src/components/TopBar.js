import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BROWSE_LINKS } from '../navigation';

function TopBar() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/home');
  };

  let account = null;
  if (!isLoading && user) {
    account = (
      <>
        <span className="topbar-user">{user.name || user.email}</span>
        <button type="button" className="pill-button pill-button--outline" onClick={handleLogout}>
          Log out
        </button>
      </>
    );
  } else if (!isLoading) {
    account = (
      <>
        <Link to="/signup" className="text-button">
          Sign up
        </Link>
        <Link to="/login" className="pill-button">
          Log in
        </Link>
      </>
    );
  }

  return (
    <header className="topbar">
      <Link to="/home" className="topbar-brand">
        <img src="/assets/img/logo.svg" alt="" width="32" height="32" />
        <span>Operafy</span>
      </Link>
      <nav aria-label="Browse" className="browse-nav">
        <ul>
          {BROWSE_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="topbar-account">{account}</div>
    </header>
  );
}

export default TopBar;
