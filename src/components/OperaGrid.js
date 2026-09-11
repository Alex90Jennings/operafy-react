import { Link } from 'react-router-dom';
import { getTracksForOpera } from '../data/catalogue';
import Cover from './Cover';
import PlayCollectionButton from './PlayCollectionButton';

function OperaGrid({ operas }) {
  return (
    <ul className="card-grid">
      {operas.map((opera) => (
        <li key={opera.id} className="card">
          <div className="card-cover">
            <Cover
              title={opera.title}
              subtitle={opera.composer}
              colors={opera.colors}
              image={opera.cover?.src}
            />
            <PlayCollectionButton
              trackIds={getTracksForOpera(opera.id).map((track) => track.id)}
              label={opera.title}
              className="card-play"
              iconSize={24}
            />
          </div>
          <h3 className="card-title">
            <Link to={`/operas/${opera.id}`}>{opera.title}</Link>
          </h3>
          <p className="card-subtitle">
            {opera.composer} ({opera.year})
          </p>
        </li>
      ))}
    </ul>
  );
}

export default OperaGrid;
