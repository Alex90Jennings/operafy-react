import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <section className="empty-state">
      <h1>Page not found</h1>
      <p>We couldn’t find the page you were looking for.</p>
      <Link className="pill-button" to="/home">
        Go home
      </Link>
    </section>
  );
}

export default NotFoundPage;
