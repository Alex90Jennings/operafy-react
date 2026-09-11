import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistsContext';
import { useToast } from '../context/ToastContext';
import Icon from './Icon';

function Sidebar() {
  const { user } = useAuth();
  const { playlists, createPlaylist } = usePlaylists();
  const notify = useToast();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePlaylist = async () => {
    setIsCreating(true);
    try {
      const playlist = await createPlaylist(`My Playlist #${playlists.length + 1}`);
      navigate(`/playlists/${playlist.id}`);
    } catch (error) {
      notify(`Couldn't create playlist: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <aside className="sidebar">
      <Link to="/home" className="brand">
        <img src="/assets/img/logo.svg" alt="" width="40" height="40" />
        <span className="brand-name">Operafy</span>
      </Link>

      <nav aria-label="Main" className="side-nav">
        <ul>
          <li>
            <NavLink to="/home">
              <Icon name="home" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <Icon name="search" />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlists">
              <Icon name="library" />
              <span>Your Library</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <section className="sidebar-playlists" aria-labelledby="sidebar-playlists-heading">
        <h2 id="sidebar-playlists-heading" className="sidebar-heading">
          Playlists
        </h2>
        {user ? (
          <>
            <button
              type="button"
              className="create-playlist"
              onClick={handleCreatePlaylist}
              disabled={isCreating}
            >
              <span className="create-playlist-icon">
                <Icon name="add" size={20} />
              </span>
              {isCreating ? 'Creating…' : 'Create playlist'}
            </button>
            {playlists.length > 0 && (
              <ul className="sidebar-playlist-list">
                {playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="sidebar-note">
            <Link to="/login">Log in</Link> to create playlists and save them to your account.
          </p>
        )}
      </section>

      <div className="sidebar-footer">
        {user && (
          <p className="sidebar-user">
            <Icon name="user" size={20} />
            <span>{user.name || user.email}</span>
          </p>
        )}
        <Link to="/credits">Recording credits</Link>
      </div>
    </aside>
  );
}

export default Sidebar;
