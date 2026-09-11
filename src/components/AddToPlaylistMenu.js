import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistsContext';
import Icon from './Icon';

const MENU_HEIGHT_ESTIMATE = 300;

function AddToPlaylistMenu({ trackId, trackTitle }) {
  const { user } = useAuth();
  const { playlists, addTrack } = usePlaylists();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [opensUpwards, setOpensUpwards] = useState(false);
  const containerRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  if (!user) {
    return (
      <Link
        className="icon-button"
        to="/login"
        state={{ from: location }}
        aria-label={`Log in to add ${trackTitle} to a playlist`}
        title="Log in to add to a playlist"
      >
        <Icon name="playlistAdd" size={20} />
      </Link>
    );
  }

  const toggleMenu = () => {
    if (!isOpen && containerRef.current) {
      const { bottom } = containerRef.current.getBoundingClientRect();
      setOpensUpwards(window.innerHeight - bottom < MENU_HEIGHT_ESTIMATE);
    }
    setIsOpen((open) => !open);
  };

  const choosePlaylist = (playlist) => {
    setIsOpen(false);
    addTrack(playlist, trackId);
  };

  return (
    <div className="menu" ref={containerRef}>
      <button
        type="button"
        className="icon-button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={`Add ${trackTitle} to a playlist`}
        title="Add to playlist"
      >
        <Icon name="playlistAdd" size={20} />
      </button>
      {isOpen && (
        <div id={menuId} className={`menu-popover${opensUpwards ? ' menu-popover--up' : ''}`}>
          <p className="menu-heading">Add to playlist</p>
          {playlists.length === 0 ? (
            <p className="menu-empty">
              You don’t have any playlists yet.{' '}
              <Link to="/playlists" onClick={() => setIsOpen(false)}>
                Create one
              </Link>
            </p>
          ) : (
            <ul>
              {playlists.map((playlist) => {
                const isAdded = playlist.trackIds.includes(trackId);
                return (
                  <li key={playlist.id}>
                    <button
                      type="button"
                      className="menu-item"
                      onClick={() => choosePlaylist(playlist)}
                      disabled={isAdded}
                    >
                      {playlist.name}
                      {isAdded && <span className="menu-item-note"> (added)</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AddToPlaylistMenu;
