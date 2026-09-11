import { Link } from 'react-router-dom';
import { colorsFor, getTrack } from '../data/catalogue';
import { pluralize } from '../utils/time';
import Cover from './Cover';
import PlayCollectionButton from './PlayCollectionButton';

function PlaylistGrid({ playlists }) {
  return (
    <ul className="card-grid">
      {playlists.map((playlist) => {
        const trackIds = playlist.trackIds.filter((id) => getTrack(id));
        return (
          <li key={playlist.id} className="card">
            <div className="card-cover">
              <Cover title={playlist.name} subtitle="Playlist" colors={colorsFor(playlist.name)} />
              {trackIds.length > 0 && (
                <PlayCollectionButton
                  trackIds={trackIds}
                  label={playlist.name}
                  className="card-play"
                  iconSize={24}
                />
              )}
            </div>
            <h3 className="card-title">
              <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            </h3>
            <p className="card-subtitle">{pluralize(trackIds.length, 'track')}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default PlaylistGrid;
