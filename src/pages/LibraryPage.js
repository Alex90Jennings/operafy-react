import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPrompt from '../components/LoginPrompt';
import PlaylistGrid from '../components/PlaylistGrid';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistsContext';
import { useToast } from '../context/ToastContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pluralize } from '../utils/time';

function LibraryPage() {
  useDocumentTitle('Your Library');
  const { user, isLoading: isAuthLoading } = useAuth();
  const { playlists, isLoading, createPlaylist } = usePlaylists();
  const notify = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (isAuthLoading) return <p>Loading…</p>;

  if (!user) {
    return (
      <LoginPrompt
        title="Your Library"
        message="Log in to create playlists and keep them saved to your account."
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setIsSaving(true);
    try {
      const playlist = await createPlaylist(trimmedName);
      navigate(`/playlists/${playlist.id}`);
    } catch (error) {
      notify(`Couldn't create playlist: ${error.message}`);
      setIsSaving(false);
    }
  };

  return (
    <>
      <section className="section-header">
        <h1>Your Library</h1>
        {!isLoading && <p>{pluralize(playlists.length, 'playlist')}</p>}
      </section>

      <section aria-labelledby="create-playlist-heading">
        <h2 id="create-playlist-heading" className="visually-hidden">
          Create a playlist
        </h2>
        <form className="inline-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="new-playlist-name">New playlist name</label>
            <input
              id="new-playlist-name"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Sunday arias"
              maxLength={100}
              required
            />
          </div>
          <button type="submit" className="pill-button" disabled={isSaving}>
            {isSaving ? 'Creating…' : 'Create playlist'}
          </button>
        </form>
      </section>

      <section aria-labelledby="playlists-heading">
        <div className="section-header">
          <h2 id="playlists-heading">Playlists</h2>
        </div>
        {isLoading && <p>Loading your playlists…</p>}
        {!isLoading && playlists.length === 0 && <p>You haven’t created any playlists yet.</p>}
        {!isLoading && playlists.length > 0 && <PlaylistGrid playlists={playlists} />}
      </section>
    </>
  );
}

export default LibraryPage;
