import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { getOpera } from '../data/catalogue';
import { formatTime } from '../utils/time';
import AddToPlaylistMenu from './AddToPlaylistMenu';
import Cover from './Cover';
import Icon from './Icon';

const REPEAT_LABELS = {
  off: 'Repeat: off',
  all: 'Repeat: all',
  one: 'Repeat: current track',
};

function PlayerBar() {
  const {
    queue,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
  } = usePlayer();

  const opera = currentTrack ? getOpera(currentTrack.operaId) : null;
  const progressPercent = duration > 0 ? (Math.min(currentTime, duration) / duration) * 100 : 0;
  const audibleVolume = isMuted ? 0 : volume;
  const hasQueue = queue.length > 0;

  return (
    <section className="player" aria-label="Player">
      <div className="now-playing">
        {currentTrack ? (
          <>
            <Cover title={opera.title} colors={opera.colors} image={opera.cover?.src} size="sm" />
            <div className="now-playing-text">
              <p className="now-playing-title">
                <Link to={`/operas/${opera.id}`}>{currentTrack.title}</Link>
              </p>
              <p className="now-playing-artist">
                {currentTrack.performer} · {opera.title}
              </p>
            </div>
            <AddToPlaylistMenu trackId={currentTrack.id} trackTitle={currentTrack.title} />
          </>
        ) : (
          <p className="now-playing-empty">Press play to start listening</p>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button
            type="button"
            className="icon-button player-toggle"
            onClick={toggleShuffle}
            aria-pressed={isShuffle}
            aria-label="Shuffle"
            title="Shuffle"
          >
            <Icon name="shuffle" size={20} />
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={playPrevious}
            disabled={!hasQueue}
            aria-label="Previous track"
            title="Previous"
          >
            <Icon name="previous" />
          </button>
          <button
            type="button"
            className="play-pause"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} />
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={() => playNext()}
            disabled={!hasQueue}
            aria-label="Next track"
            title="Next"
          >
            <Icon name="next" />
          </button>
          <button
            type="button"
            className={`icon-button player-toggle${repeatMode !== 'off' ? ' is-active' : ''}`}
            onClick={cycleRepeat}
            aria-label={REPEAT_LABELS[repeatMode]}
            title={REPEAT_LABELS[repeatMode]}
          >
            <Icon name={repeatMode === 'one' ? 'repeatOne' : 'repeat'} size={20} />
          </button>
        </div>

        <div className="progress">
          <span className="time time--elapsed">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="slider"
            min="0"
            max={duration || 0}
            step="any"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            disabled={!currentTrack || !duration}
            aria-label="Seek"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            style={{ '--progress': `${progressPercent}%` }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <button
          type="button"
          className="icon-button"
          onClick={toggleMute}
          aria-label={audibleVolume === 0 ? 'Unmute' : 'Mute'}
          title={audibleVolume === 0 ? 'Unmute' : 'Mute'}
        >
          <Icon name={audibleVolume === 0 ? 'volumeOff' : 'volume'} size={20} />
        </button>
        <input
          type="range"
          className="slider volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={audibleVolume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          aria-valuetext={`${Math.round(audibleVolume * 100)}%`}
          style={{ '--progress': `${audibleVolume * 100}%` }}
        />
      </div>
    </section>
  );
}

export default PlayerBar;
