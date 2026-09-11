import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { allTrackIds, getTrack } from '../data/catalogue';
import { useToast } from './ToastContext';

const VOLUME_STORAGE_KEY = 'operafy:volume';
const RECENT_STORAGE_KEY = 'operafy:recently-played';
const MAX_RECENT_TRACKS = 20;
const RESTART_THRESHOLD_SECONDS = 3;
const REPEAT_MODES = ['off', 'all', 'one'];

const PlayerContext = createContext(null);

function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the player still works.
  }
}

function readStoredVolume() {
  const volume = Number(readStored(VOLUME_STORAGE_KEY, 0.8));
  return Number.isFinite(volume) ? Math.min(Math.max(volume, 0), 1) : 0.8;
}

function readStoredRecent() {
  const ids = readStored(RECENT_STORAGE_KEY, []);
  return Array.isArray(ids) ? ids.filter((id) => getTrack(id)) : [];
}

function startPlayback(audio, onFailure) {
  const attempt = audio.play();
  if (attempt) attempt.catch(onFailure);
}

export function PlayerProvider({ children }) {
  const notify = useToast();
  const audioRef = useRef(null);
  const historyRef = useRef([]);

  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [loadRequest, setLoadRequest] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(readStoredVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [recentTrackIds, setRecentTrackIds] = useState(readStoredRecent);

  const currentTrack = getTrack(queue[queueIndex]) ?? null;

  // Load and start the current track whenever a new one is requested.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || loadRequest === 0) return;

    audio.src = currentTrack.src;
    setCurrentTime(0);
    setDuration(currentTrack.duration);
    startPlayback(audio, () => setIsPlaying(false));

    setRecentTrackIds((previous) => {
      const next = [currentTrack.id, ...previous.filter((id) => id !== currentTrack.id)].slice(
        0,
        MAX_RECENT_TRACKS
      );
      writeStored(RECENT_STORAGE_KEY, next);
      return next;
    });
  }, [currentTrack, loadRequest]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
    writeStored(VOLUME_STORAGE_KEY, volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repeatMode === 'one';
  }, [repeatMode]);

  const startTrackAt = useCallback(
    (index, { rememberCurrent = true } = {}) => {
      if (rememberCurrent && queueIndex >= 0) historyRef.current.push(queueIndex);
      setQueueIndex(index);
      setLoadRequest((count) => count + 1);
    },
    [queueIndex]
  );

  const playQueue = useCallback((trackIds, startIndex = 0) => {
    if (!trackIds.length) return;
    historyRef.current = [];
    setQueue(trackIds);
    setQueueIndex(startIndex);
    setLoadRequest((count) => count + 1);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentTrack) {
      playQueue(allTrackIds);
    } else if (audio.paused) {
      startPlayback(audio, () => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentTrack, playQueue]);

  const playNext = useCallback(
    ({ auto = false } = {}) => {
      if (!queue.length) return;

      if (isShuffle && queue.length > 1) {
        let nextIndex = queueIndex;
        while (nextIndex === queueIndex) nextIndex = Math.floor(Math.random() * queue.length);
        startTrackAt(nextIndex);
      } else if (queueIndex < queue.length - 1) {
        startTrackAt(queueIndex + 1);
      } else if (repeatMode === 'all' || !auto) {
        startTrackAt(0);
      } else if (audioRef.current) {
        // Reached the end of the queue with repeat off: stop on the last track.
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    },
    [queue.length, queueIndex, isShuffle, repeatMode, startTrackAt]
  );

  const playPrevious = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !queue.length) return;

    if (audio.currentTime > RESTART_THRESHOLD_SECONDS) {
      audio.currentTime = 0;
    } else if (isShuffle && historyRef.current.length) {
      startTrackAt(historyRef.current.pop(), { rememberCurrent: false });
    } else if (queueIndex > 0) {
      startTrackAt(queueIndex - 1, { rememberCurrent: false });
    } else if (repeatMode === 'all') {
      startTrackAt(queue.length - 1, { rememberCurrent: false });
    } else {
      audio.currentTime = 0;
    }
  }, [queue.length, queueIndex, isShuffle, repeatMode, startTrackAt]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((value) => {
    setVolumeState(value);
    if (value > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted || volume === 0) {
      setIsMuted(false);
      if (volume === 0) setVolumeState(0.5);
    } else {
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const toggleShuffle = useCallback(() => setIsShuffle((value) => !value), []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((mode) => REPEAT_MODES[(REPEAT_MODES.indexOf(mode) + 1) % REPEAT_MODES.length]);
  }, []);

  const handleError = useCallback(() => {
    setIsPlaying(false);
    if (currentTrack) notify(`Couldn't play “${currentTrack.title}”. Please try again.`);
  }, [currentTrack, notify]);

  const handleDurationChange = (event) => {
    const { duration: mediaDuration } = event.currentTarget;
    if (Number.isFinite(mediaDuration)) setDuration(mediaDuration);
  };

  const value = useMemo(
    () => ({
      queue,
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      isShuffle,
      repeatMode,
      recentTrackIds,
      playQueue,
      togglePlay,
      playNext,
      playPrevious,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
    }),
    [
      queue,
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      isShuffle,
      repeatMode,
      recentTrackIds,
      playQueue,
      togglePlay,
      playNext,
      playPrevious,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={handleDurationChange}
        onEnded={() => playNext({ auto: true })}
        onError={handleError}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

export function isSameQueue(queue, trackIds) {
  return queue.length === trackIds.length && queue.every((id, index) => id === trackIds[index]);
}
