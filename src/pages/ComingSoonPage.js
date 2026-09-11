import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function ComingSoonPage({ title, description }) {
  useDocumentTitle(title);

  return (
    <section className="empty-state">
      <p className="badge">Coming soon</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link className="pill-button" to="/home">
        Back to Home
      </Link>
    </section>
  );
}

export default ComingSoonPage;
