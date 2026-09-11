import { isSameQueue, usePlayer } from '../context/PlayerContext';
import Icon from './Icon';

function PlayCollectionButton({ trackIds, label, className = 'play-button-large', iconSize = 28 }) {
  const { queue, isPlaying, playQueue, togglePlay } = usePlayer();
  const isActive = isSameQueue(queue, trackIds);
  const showPause = isActive && isPlaying;

  return (
    <button
      type="button"
      className={className}
      onClick={() => (isActive ? togglePlay() : playQueue(trackIds))}
      aria-label={`${showPause ? 'Pause' : 'Play'} ${label}`}
    >
      <Icon name={showPause ? 'pause' : 'play'} size={iconSize} />
    </button>
  );
}

export default PlayCollectionButton;
