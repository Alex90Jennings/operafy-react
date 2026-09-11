import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import OperaGrid from '../components/OperaGrid';
import PlaylistGrid from '../components/PlaylistGrid';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistsContext';
import { getOpera, getTrack, operas, tracks } from '../data/catalogue';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MAX_RECENT_OPERAS = 6;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function HomePage() {
  useDocumentTitle('Home');
  const { user } = useAuth();
  const { playlists } = usePlaylists();
  const { recentTrackIds } = usePlayer();

  const recentOperas = useMemo(() => {
    const operaIds = [...new Set(recentTrackIds.map((id) => getTrack(id).operaId))];
    return operaIds.slice(0, MAX_RECENT_OPERAS).map(getOpera);
  }, [recentTrackIds]);

  return (
    <>
      <section className="hero">
        {user ? (
          <h1>
            {greeting()}, {user.name || 'opera lover'}
          </h1>
        ) : (
          <>
            <h1>The golden age of opera, on demand</h1>
            <p>
              Historic recordings by Enrico Caruso, Beniamino Gigli, Rosa Ponselle and more, all in the
              public domain. Sign up free to build and save your own playlists.
            </p>
            <div className="button-row">
              <Link className="pill-button" to="/signup">
                Sign up free
              </Link>
              <Link className="pill-button pill-button--outline" to="/search">
                Browse recordings
              </Link>
            </div>
          </>
        )}
      </section>

      {recentOperas.length > 0 && (
        <section aria-labelledby="recent-heading">
          <div className="section-header">
            <h2 id="recent-heading">Recently played</h2>
          </div>
          <OperaGrid operas={recentOperas} />
        </section>
      )}

      {user && playlists.length > 0 && (
        <section aria-labelledby="your-playlists-heading">
          <div className="section-header">
            <h2 id="your-playlists-heading">Your playlists</h2>
          </div>
          <PlaylistGrid playlists={playlists} />
        </section>
      )}

      <section aria-labelledby="operas-heading">
        <div className="section-header">
          <h2 id="operas-heading">Operas</h2>
          <p>
            {tracks.length} historic recordings from {operas.length} operas, from Gluck to Puccini.
          </p>
        </div>
        <OperaGrid operas={operas} />
      </section>

      <p className="footnote">
        Every recording is in the public domain and streamed from Wikimedia Commons.{' '}
        <Link to="/credits">See the recording credits</Link>.
      </p>
    </>
  );
}

export default HomePage;
