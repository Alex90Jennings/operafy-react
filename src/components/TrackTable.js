import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { getOpera } from '../data/catalogue';
import { formatTime, toIsoDuration } from '../utils/time';
import AddToPlaylistMenu from './AddToPlaylistMenu';
import Icon from './Icon';

function TrackTable({ tracks, caption, showOpera = true, renderActions }) {
  const { currentTrack, isPlaying, playQueue, togglePlay } = usePlayer();
  const trackIds = tracks.map((track) => track.id);

  return (
    <table className="track-table">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="col-index">
            #
          </th>
          <th scope="col">Title</th>
          {showOpera && (
            <th scope="col" className="col-opera">
              Opera
            </th>
          )}
          <th scope="col" className="col-duration">
            <span className="visually-hidden">Duration</span>
            <Icon name="clock" size={18} />
          </th>
          <th scope="col" className="col-actions">
            <span className="visually-hidden">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => {
          const opera = getOpera(track.operaId);
          const isCurrent = currentTrack?.id === track.id;
          const showPause = isCurrent && isPlaying;

          return (
            <tr key={track.id} className={isCurrent ? 'is-current' : undefined}>
              <td className="col-index">
                <button
                  type="button"
                  className="track-play"
                  onClick={() => (isCurrent ? togglePlay() : playQueue(trackIds, index))}
                  aria-label={`${showPause ? 'Pause' : 'Play'} ${track.title}`}
                >
                  <span className="track-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <Icon name={showPause ? 'pause' : 'play'} size={18} />
                </button>
              </td>
              <td>
                <div className="track-main">
                  <span className="track-title">{track.title}</span>
                  <span className="track-performer">
                    {track.performer}
                    {track.year ? ` · ${track.year}` : ''}
                  </span>
                </div>
              </td>
              {showOpera && (
                <td className="col-opera">
                  <Link to={`/operas/${opera.id}`}>{opera.title}</Link>
                </td>
              )}
              <td className="col-duration">
                <time dateTime={toIsoDuration(track.duration)}>{formatTime(track.duration)}</time>
              </td>
              <td className="col-actions">
                <div className="row-actions">
                  {renderActions ? (
                    renderActions(track)
                  ) : (
                    <AddToPlaylistMenu trackId={track.id} trackTitle={track.title} />
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TrackTable;
