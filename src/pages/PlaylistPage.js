import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cover from '../components/Cover';
import Icon from '../components/Icon';
import LoginPrompt from '../components/LoginPrompt';
import PlayCollectionButton from '../components/PlayCollectionButton';
import TrackTable from '../components/TrackTable';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistsContext';
import { useToast } from '../context/ToastContext';
import { colorsFor, getTrack, tracks } from '../data/catalogue';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatTotalDuration, pluralize } from '../utils/time';

const SUGGESTION_COUNT = 5;

function PlaylistPage() {
  const { playlistId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { playlists, isLoading, updatePlaylist, deletePlaylist, addTrack, removeTrack } = usePlaylists();
  const notify = useToast();
  const navigate = useNavigate();
  const [isRenaming, setIsRenaming] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const playlist = playlists.find((item) => item.id === playlistId);
  useDocumentTitle(playlist?.name ?? 'Playlist');

  useEffect(() => {
    setIsRenaming(false);
    setIsConfirmingDelete(false);
  }, [playlistId]);

  if (isAuthLoading || (user && isLoading)) return <p>Loading…</p>;

  if (!user) {
    return <LoginPrompt title="Playlists" message="Log in to see and edit your playlists." />;
  }

  if (!playlist) {
    return (
      <section className="empty-state">
        <h1>Playlist not found</h1>
        <p>It may have been deleted, or it belongs to a different account.</p>
        <Link className="pill-button" to="/playlists">
          Back to Your Library
        </Link>
      </section>
    );
  }

  const playlistTracks = playlist.trackIds.map((id) => getTrack(id)).filter(Boolean);
  const totalSeconds = playlistTracks.reduce((sum, track) => sum + track.duration, 0);
  const suggestions = tracks.filter((track) => !playlist.trackIds.includes(track.id)).slice(0, SUGGESTION_COUNT);

  const startRenaming = () => {
    setDraftName(playlist.name);
    setIsRenaming(true);
  };

  const handleRename = async (event) => {
    event.preventDefault();
    const trimmedName = draftName.trim();
    if (!trimmedName) return;
    try {
      await updatePlaylist(playlist.id, { name: trimmedName });
      setIsRenaming(false);
      notify('Playlist renamed');
    } catch (error) {
      notify(`Couldn't rename playlist: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlaylist(playlist.id);
      notify(`Deleted ${playlist.name}`);
      navigate('/playlists');
    } catch (error) {
      notify(`Couldn't delete playlist: ${error.message}`);
    }
  };

  return (
    <>
      <header className="collection-header">
        <Cover title={playlist.name} subtitle="Playlist" colors={colorsFor(playlist.name)} size="lg" />
        <div className="collection-meta">
          <p className="eyebrow">Playlist</p>
          <h1>{playlist.name}</h1>
          <p className="collection-details">
            {user.name || user.email} · {pluralize(playlistTracks.length, 'track')}
            {totalSeconds > 0 && `, ${formatTotalDuration(totalSeconds)}`}
          </p>
        </div>
      </header>

      <div className="collection-actions">
        {playlistTracks.length > 0 && (
          <PlayCollectionButton trackIds={playlistTracks.map((track) => track.id)} label={playlist.name} />
        )}
        {!isRenaming && (
          <button type="button" className="pill-button pill-button--outline" onClick={startRenaming}>
            <Icon name="edit" size={18} />
            Rename
          </button>
        )}
        {isConfirmingDelete ? (
          <>
            <span>Delete this playlist?</span>
            <button type="button" className="pill-button pill-button--danger" onClick={handleDelete}>
              Yes, delete
            </button>
            <button type="button" className="text-button" onClick={() => setIsConfirmingDelete(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="pill-button pill-button--outline"
            onClick={() => setIsConfirmingDelete(true)}
          >
            <Icon name="delete" size={18} />
            Delete
          </button>
        )}
      </div>

      {isRenaming && (
        <form className="inline-form" onSubmit={handleRename}>
          <div className="field">
            <label htmlFor="rename-playlist">Playlist name</label>
            <input
              id="rename-playlist"
              className="input"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              maxLength={100}
              required
            />
          </div>
          <button type="submit" className="pill-button">
            Save
          </button>
          <button type="button" className="text-button" onClick={() => setIsRenaming(false)}>
            Cancel
          </button>
        </form>
      )}

      {playlistTracks.length > 0 ? (
        <TrackTable
          tracks={playlistTracks}
          caption={`Tracks in ${playlist.name}`}
          renderActions={(track) => (
            <button
              type="button"
              className="icon-button"
              onClick={() => removeTrack(playlist, track.id)}
              aria-label={`Remove ${track.title} from ${playlist.name}`}
              title="Remove from playlist"
            >
              <Icon name="remove" size={20} />
            </button>
          )}
        />
      ) : (
        <section className="empty-state">
          <h2>This playlist is empty</h2>
          <p>Add a recording from the suggestions below, or search the whole catalogue.</p>
          <Link className="pill-button pill-button--outline" to="/search">
            Search recordings
          </Link>
        </section>
      )}

      {suggestions.length > 0 && (
        <section aria-labelledby="suggestions-heading">
          <div className="section-header">
            <h2 id="suggestions-heading">Recommended recordings</h2>
            <p>Add some classics to {playlist.name}.</p>
          </div>
          <TrackTable
            tracks={suggestions}
            caption="Recommended recordings"
            renderActions={(track) => (
              <button
                type="button"
                className="pill-button pill-button--outline pill-button--small"
                onClick={() => addTrack(playlist, track.id)}
                aria-label={`Add ${track.title} to ${playlist.name}`}
              >
                Add
              </button>
            )}
          />
        </section>
      )}
    </>
  );
}

export default PlaylistPage;
